#!/bin/bash

alias sudo='sudo '

# register all aliases and functions
for aliasToSource in "$DOTFILES_DIR/shell/lib/_aliases/"*; do
  source "$aliasToSource"
done

for functionToSource in "$DOTFILES_DIR/shell/lib/_functions/"*; do
  source "$functionToSource"
done

for gitFunctionsToSource in "$DOTFILES_DIR/shell/lib/_functions/_git/"*; do
  source "$gitFunctionsToSource"
done

for syncFunctionsToSource in "$DOTFILES_DIR/shell/lib/_functions/_sync/"*; do
  source "$syncFunctionsToSource"
done
