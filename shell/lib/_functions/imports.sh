#!/bin/bash

# -----------------
# Lazy Imports
function iruby {
  fname=$(declare -f -F load_ruby)

  [ -n "$fname" ] || source "$DOTFILES_DIR/lazy/ruby.sh"

  load_ruby
}

function ipython {

  fname=$(declare -f -F load_python)

  [ -n "$fname" ] || source "$DOTFILES_DIR/lazy/python.sh"

  load_python
}

function inode {
  fname=$(declare -f -F load_node)

  [ -n "$fname" ] || source "$DOTFILES_DIR/lazy/node.sh"

  load_node
}

function web-setup-official {
  iruby
  inode
  nvm use 16.19.1
  source ~/.zshrc
}

function iibrew {
  fname=$(declare -f -F load_ibrew)

  [ -n "$fname" ] || source "$DOTFILES_DIR/lazy/brew.sh"

  load_ibrew
}
