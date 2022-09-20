# -----------------
# Lazy Imports
function iruby {
  fname=$(declare -f -F load_ruby)

  [ -n "$fname" ] || source "$HOME/.dotfiles/lazy/ruby.sh"

  load_ruby
}

function ipython {

  fname=$(declare -f -F load_python)

  [ -n "$fname" ] || source "$HOME/.dotfiles/lazy/python.sh"

  load_python
}

function inode {
  fname=$(declare -f -F load_node)

  [ -n "$fname" ] || source "$HOME/.dotfiles/lazy/node.sh"

  load_node
}

function iall {
  i_ruby
  i_python
  i_node
}
