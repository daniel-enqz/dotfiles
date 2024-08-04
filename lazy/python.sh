#!/bin/bash

function load_python() {
  export PYENV_ROOT="$HOME/.pyenv"
  export PATH="$PYENV_ROOT/bin:$PATH"
  # Load pyenv (to manage your Python versions)
  export PYENV_VIRTUALENV_DISABLE_PROMPT=1
  type -a pyenv > /dev/null && eval "$(pyenv init -)" && eval "$(pyenv virtualenv-init -)"
  # Set ipdb as the default Python debugger
  export PYTHONBREAKPOINT=ipdb.set_trace
}
