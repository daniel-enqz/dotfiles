function load_python() {
  # Load pyenv (to manage your Python versions)
  export PYENV_VIRTUALENV_DISABLE_PROMPT=1
  type -a pyenv > /dev/null && eval "$(pyenv init -)" && eval "$(pyenv virtualenv-init -)" && RPROMPT+='[🐍 $(pyenv version-name)]'
  # Set ipdb as the default Python debugger
  export PYTHONBREAKPOINT=ipdb.set_trace
}
