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

  # Ask the user to select a type:
  types=("feat" "fix" "chore" "docs" "ref" "style" "test")
  PS3="Select type: "
  select choice in "feat" "fix" "chore" "docs" "ref" "style" "test"
  do
      type=${types[$((choice-1))]}
      break;
  done

  chore=$(whiptail "Enter chore:" 10 30 3>&1 1>&2 2>&3 3>&- )
  description=$(whiptail "Enter description:" 10 30 3>&1 1>&2 2>&3 3>&- )

  # Construct the commit message and commit the changes
  git commit -m "${type}\t<${chore}>\t${description}"
}

# ----------------- Extra Functions -----------------
function ltt {
  for i in $(seq 1 10); do time zsh -i -c exit; done
}
