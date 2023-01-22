#!/bin/bash

# Functions
# Remote Search Using FZF
_display_message() {
  dirtomove=$(find . -not -path '*/\.*' -type d -print | fzf)
  cd "$dirtomove" || return
}

# Reverse Search Using FZF
_reverse_search() {
  local selected_command
  selected_command=$(fc -rl 1 | awk '{$1="";print substr($0,2)}' | fzf)
  LBUFFER=$selected_command
}


_git_branches() {
  local branches branch
  branches=$(git branch -a --format='%(refname:short)') &&
  branch=$(echo "$branches" | fzf +s +m) &&
  git checkout "$(echo "$branch" | awk '{print $1}')"
}

zle      -N    _display_message
bindkey  '^h'  _display_message
zle      -N    _reverse_search
bindkey  '^r'  _reverse_search
zle      -N    _git_branches
bindkey  '^b'    _git_branches
