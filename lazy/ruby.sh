function load_ruby() {
  # Load rbenv if installed (to manage your Ruby versions)
  export PATH="${HOME}/.rbenv/bin:${PATH}" # Needed for Linux/WSL
  type -a rbenv > /dev/null && eval "$(rbenv init -)"
}
