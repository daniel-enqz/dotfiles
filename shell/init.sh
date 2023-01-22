#!/bin/bash

alias sudo='sudo '

# register all aliases and functions
for aliasToSource in "$DOTFILES_DIR/shell/lib/_aliases/"*; do
  source "$aliasToSource"
done

for functionToSource in "$DOTFILES_DIR/shell/lib/_functions/"*; do
  source "$functionToSource"
done
