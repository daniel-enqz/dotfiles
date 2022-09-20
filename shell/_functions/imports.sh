# -----------------
# Lazy Imports
function i_ruby {
  fname=$(declare -f -F load_ruby)

  [ -n "$fname" ] || source "$HOME/.dotfiles/lazy/ruby.sh"

  load_ruby
}

function i_python {

  fname=$(declare -f -F load_python)

  [ -n "$fname" ] || source "$HOME/.dotfiles/lazy/python.sh"

  load_python
}

function i_node {
  fname=$(declare -f -F load_node)

  [ -n "$fname" ] || source "$HOME/.dotfiles/lazy/node.sh"

  load_node
}

function i_all {
  i_ruby
  i_python
  i_node
}
