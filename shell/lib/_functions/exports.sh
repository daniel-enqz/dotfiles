#!/bin/bash

function export_packages() {
  brew services stop --all
  brew bundle dump --file="$DOTFILES_DIR"/exports/brew/Brewfile --force
  echo "Brew apps exported"

  ipython
  rm -rf "$DOTFILES_DIR"/exports/pip/requirements.txt
  pip freeze > "$DOTFILES_DIR"/exports/pip/requirements.txt
  echo "Pip apps exported"


  rm -rf "$DOTFILES_DIR"/exports/npm/npm.txt
  # npm list -location=global --depth 0
  ls -1 /Users/daniel-enqz/.nvm/versions/node/v18.13.0/lib/node_modules | grep -v npm > "$DOTFILES_DIR"/exports/npm/npm.txt
  echo "Npm apps exported"
}
