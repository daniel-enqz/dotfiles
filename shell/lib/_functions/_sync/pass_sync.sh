#!/bin/bash

# Función para determinar el remoto apropiado basado en la red
function get_pass_remote() {
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

# Función: pass_git status
function passsts() {
  # Esta función no necesita remoto, solo muestra estado local
  echo "Verificando estado del repositorio..."
  pass git status
  echo ""
  echo "Remotos configurados:"
  pass git remote -v
  echo ""
  echo "Rama actual:"
  pass git branch -vv
}

functio passst_with_remote() {
  # Esta función sí necesita remoto.
  echo "Verificando estado del repositorio..."
  local REMOTE=$(_get_pass_remote)
  local BRANCH="master"

  pass git status $REMOTE $BRANCH

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
