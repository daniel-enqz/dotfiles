#!/bin/bash

# Función para determinar el remoto apropiado basado en la red
function _get_pass_remote() {
  local PI_LOCAL_IP="192.168.0.14"
  local PI_HOSTNAME="raspberry"
  local TIMEOUT=1
  
  # Verificar si estamos en la red local
  if ping -c 1 -W $TIMEOUT $PI_LOCAL_IP &> /dev/null || 
     ping -c 1 -W $TIMEOUT $PI_HOSTNAME &> /dev/null; then
    echo "origin"
    echo "Red local detectada. Usando remoto: origin" >&2
  else
    echo "origin-remote"
    echo "Red externa detectada. Usando remoto: origin-remote" >&2
  fi
}

function passt() {
  echo "Verificando estado del repositorio pass..."
  local REMOTE=$(_get_pass_remote)
  local BRANCH="master"
  
  cd ~/.password-store
  
  # Fetch from remote first
  git fetch $REMOTE $BRANCH
  
  # Check if local is behind remote
  local BEHIND=$(git rev-list --count HEAD..$REMOTE/$BRANCH)
  # Check if local is ahead of remote
  local AHEAD=$(git rev-list --count $REMOTE/$BRANCH..HEAD)
  
  echo "Estado del repositorio:"
  if [ $BEHIND -gt 0 ] && [ $AHEAD -gt 0 ]; then
    echo "⚠️ Repositorio divergido: Tienes $AHEAD commit(s) local(es) no enviado(s) y $BEHIND commit(s) remoto(s) no integrado(s)"
    echo "Recomendación: Ejecuta 'passpl' y después 'passpsh' para sincronizar (puede requerir resolver conflictos)"
  elif [ $BEHIND -gt 0 ]; then
    echo "⬇️ Repositorio detrás: Hay $BEHIND commit(s) remoto(s) pendiente(s) de integrar"
    echo "Recomendación: Ejecuta 'passpl' para actualizar tu repositorio local"
  elif [ $AHEAD -gt 0 ]; then
    echo "⬆️ Repositorio adelantado: Tienes $AHEAD commit(s) local(es) pendiente(s) de enviar"
    echo "Recomendación: Ejecuta 'passpsh' para actualizar el repositorio remoto"
  else
    echo "✅ Repositorio sincronizado: Tu repositorio local está al día con el remoto"
  fi
  
  # Show modified files in working directory
  local MODIFIED=$(git status --porcelain | wc -l)
  if [ $MODIFIED -gt 0 ]; then
    echo -e "\n📝 Archivos modificados no confirmados:"
    git status --short
    echo "Recomendación: Confirma los cambios con 'pass git commit -a -m \"mensaje\"' antes de sincronizar"
  fi
  
  # Show actual diff if requested
  echo -e "\n¿Quieres ver los cambios detallados? (s/N)"
  read -r response
  if [[ "$response" =~ ^([sS])$ ]]; then
    echo -e "\nCambios entre local y remoto:"
    git diff $REMOTE/$BRANCH
  fi
}

# Función: pass_git pull
function passpl() {
  local REMOTE=$(_get_pass_remote)
  local BRANCH="master"

  echo "Sincronizando cambios desde el servidor (pull)..."
  pass git pull $REMOTE $BRANCH
}

# Función: pass_git push
function passpsh() {
  local REMOTE=$(_get_pass_remote)
  local BRANCH="master"
  
  echo "Enviando cambios al servidor (push)..."
  pass git push $REMOTE $BRANCH
}

# Search Passwords
passf() {
  local password=$(find ~/.password-store -name "*.gpg" | \
                  sed 's/.*\.password-store\///;s/\.gpg$//' | \
                  fzf)
  if [ -n "$password" ]; then
    pass -c "$password"
  fi
}
