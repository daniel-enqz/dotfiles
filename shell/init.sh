alias sudo='sudo '

# register all aliases and functions
for aliasToSource in "$HOME/.dotfiles/shell/_aliases/"*; do
  source "$aliasToSource"
done

for functionToSource in "$HOME/.dotfiles/shell/_functions/"*; do
  source "$functionToSource"
done
