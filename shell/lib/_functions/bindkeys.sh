#!/bin/bash

# Functions

# Reverse Search Using FZF
_reverse_search() {
  local selected_command
  selected_command=$(fc -rl 1 | awk '{$1="";print substr($0,2)}' | fzf)
  LBUFFER=$selected_command
}


_git_branches() {
  local branches branch
  branches=$(git branch -a --format='%(refname:short)' | awk -F'/' '{print $NF}') &&
  branch=$(echo "$branches" | fzf +s +m) &&
  git checkout "$branch"
}


zle      -N    _reverse_search
bindkey  '^r'  _reverse_search
zle      -N    _git_branches
bindkey  '^b'    _git_branches
