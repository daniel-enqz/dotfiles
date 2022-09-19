function load_node() {
  # Load nvm (to manage your node versions)
  export NVM_DIR="$HOME/.nvm"
  [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
  [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

  # Call `nvm use` automatically in a directory with a `.nvmrc` file
  autoload -U add-zsh-hook
  load-nvmrc() {
    if nvm -v &> /dev/null; then
      local node_version="$(nvm version)"
      local nvmrc_path="$(nvm_find_nvmrc)"

      if [ -n "$nvmrc_path" ]; then
        local nvmrc_node_version=$(nvm version "$(cat "${nvmrc_path}")")

        if [ "$nvmrc_node_version" = "N/A" ]; then
          nvm install
        elif [ "$nvmrc_node_version" != "$node_version" ]; then
          nvm use --silent
        fi
      elif [ "$node_version" != "$(nvm version default)" ]; then
        nvm use default --silent
      fi
    fi
  }
  type -a nvm > /dev/null && add-zsh-hook chpwd load-nvmrc
  type -a nvm > /dev/null && load-nvmrc

  # Rails and Ruby uses the local `bin` folder to store binstubs.
  # So instead of running `bin/rails` like the doc says, just run `rails`
  # Same for `./node_modules/.bin` and nodejs
  export PATH="./bin:./node_modules/.bin:${PATH}:/usr/local/sbin"
}
