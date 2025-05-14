#!/bin/bash
# Función para determinar el remoto apropiado basado en la red
function _get_pass_remote() {
  local PI_LOCAL_IP="192.168.0.14"
  local PI_HOSTNAME="raspberry"
  local PI_TAILSCALE_IP="100.107.150.77"
  local TIMEOUT=1
  
  # First check if we're on the local network
  if ping -c 1 -W $TIMEOUT $PI_LOCAL_IP &> /dev/null || 
     ping -c 1 -W $TIMEOUT $PI_HOSTNAME &> /dev/null; then
    echo "origin"
    echo "Red local detectada. Usando remoto: origin" >&2
    return 0
  # Then check if Tailscale is connected
  elif ping -c 1 -W $TIMEOUT $PI_TAILSCALE_IP &> /dev/null; then
    echo "origin-remote"
    echo "Red externa detectada. Usando remoto: origin-remote" >&2
    return 0
  else
    echo "none"
    echo "No se detectó conexión a Raspberry Pi (ni local ni Tailscale)" >&2
    return 1
  fi
}

function passt() {
  echo "Verificando estado del repositorio pass..."
  
  # Call _get_pass_remote and capture both output and exit code
  local REMOTE
  REMOTE=$(_get_pass_remote)
  local EXIT_CODE=$?
  
  # Check if connection failed
  if [ $EXIT_CODE -ne 0 ]; then
    echo "Error: No se puede conectar al repositorio remoto. Verifique su conexión."
    return 1
  fi
  
  local BRANCH="master"
  
  # Fetch from remote first
  if ! git fetch "$REMOTE" "$BRANCH"; then
    echo "Error: No se pudo hacer fetch del repositorio remoto."
    return 1
  fi
  
  # Check if local is behind remote (safely with error handling)
  local BEHIND=0
  BEHIND=$(git rev-list --count "HEAD..$REMOTE/$BRANCH" 2>/dev/null || echo 0)
  
  # Check if local is ahead of remote (safely with error handling)
  local AHEAD=0
  AHEAD=$(git rev-list --count "$REMOTE/$BRANCH..HEAD" 2>/dev/null || echo 0)
  
  echo "Estado del repositorio:"
  if [ "$BEHIND" -gt 0 ] && [ "$AHEAD" -gt 0 ]; then
    echo "⚠️ Repositorio divergido: Tienes $AHEAD commit(s) local(es) no enviado(s) y $BEHIND commit(s) remoto(s) no integrado(s)"
    echo "Recomendación: Ejecuta 'passpl' y después 'passpsh' para sincronizar (puede requerir resolver conflictos)"
  elif [ "$BEHIND" -gt 0 ]; then
    echo "⬇️ Repositorio detrás: Hay $BEHIND commit(s) remoto(s) pendiente(s) de integrar"
    echo "Recomendación: Ejecuta 'passpl' para actualizar tu repositorio local"
  elif [ "$AHEAD" -gt 0 ]; then
    echo "⬆️ Repositorio adelantado: Tienes $AHEAD commit(s) local(es) pendiente(s) de enviar"
    echo "Recomendación: Ejecuta 'passpsh' para actualizar el repositorio remoto"
  else
    echo "✅ Repositorio sincronizado: Tu repositorio local está al día con el remoto"
  fi
}

# Función: pass_git pull
function passpl() {
  local REMOTE
  REMOTE=$(_get_pass_remote)
  local EXIT_CODE=$?
  
  if [ $EXIT_CODE -ne 0 ]; then
    echo "Error: No se puede conectar al repositorio remoto. Verifique su conexión."
    return 1
  fi
  
  local BRANCH="master"
  echo "Sincronizando cambios desde el servidor (pull)..."
  pass git pull "$REMOTE" "$BRANCH"
}

# Función: pass_git push
function passpsh() {
  local REMOTE
  REMOTE=$(_get_pass_remote)
  local EXIT_CODE=$?
  
  if [ $EXIT_CODE -ne 0 ]; then
    echo "Error: No se puede conectar al repositorio remoto. Verifique su conexión."
    return 1
  fi
  
  local BRANCH="master"
  echo "Enviando cambios al servidor (push)..."
  pass git push "$REMOTE" "$BRANCH"
}

# Search Passwords
function passf() {
  local password
  password=$(find ~/.password-store -name "*.gpg" | \
            sed 's/.*\.password-store\///;s/\.gpg$//' | \
            fzf)
  if [ -n "$password" ]; then
    pass -c "$password"
  fi
}
