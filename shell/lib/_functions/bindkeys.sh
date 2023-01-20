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
function giaa {
  git add .

  # Prompt for input for the three parts of the commit message
  read -p "Enter the type of commit (feat, fix, chore, docs, ref, style, test): " type
  read -p "Enter chore name: " chore
  read -p "Enter the description: " description

  # Construct the commit message and commit the changes
  git commit -m "${type}\t${chore}\t${description}"
}

# ----------------- Extra Functions -----------------
function ltt {
  for i in $(seq 1 10); do time zsh -i -c exit; done
}
