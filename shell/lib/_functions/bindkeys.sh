# Functions
# Remote Search Using FZF
_display_message() {
  dirtomove=$(ls | fzf)
  cd "$dirtomove"
}

# Reverse Search Using FZF
_reverse_search() {
  local selected_command=$(fc -rl 1 | awk '{$1="";print substr($0,2)}' | fzf)
  LBUFFER=$selected_command
}

zle         -N    _display_message
bindkey  '^h'  _display_message
zle -N _reverse_search
bindkey '^r' _reverse_search

# ----------------- Git -----------------
# Create a git add with a commit messahe like: "feat<tab>description"
function giaa {
  git add .
  git commit -m "$1<$2>$3"
}

# ----------------- Extra Functions -----------------
function ltt {
  for i in $(seq 1 10); do time zsh -i -c exit; done
}
