alias sudo='sudo '

# register all aliases and functions
for aliasToSource in "$HOME/.dotfiles/shell/lib/_aliases/"*; do
  source "$aliasToSource"
done

for functionToSource in "$HOME/.dotfiles/shell/lib/_functions/"*; do
  source "$functionToSource"
done
