#!/bin/bash

alias sudo='sudo '

# register all aliases and functions
for aliasToSource in "$DOTFILES_DIR/shell/lib/_aliases/"*; do
  # shellcheck source=./shell/lib/_aliases/alias.sh
  source "$aliasToSource"
done

for functionToSource in "$DOTFILES_DIR/shell/lib/_functions/"*; do
  # shellcheck source=./shell/lib/_functions/function.sh
  source "$functionToSource"
done
