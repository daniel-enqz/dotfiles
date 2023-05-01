#!/bin/bash


# -----------------
function tod {
  tmux new-session -d -s dotfiles -n dotfiles
  tmux send-keys -t dotfiles:dotfiles "cd $DOTFILES_DIR" C-m
  tmux attach -t dotfiles
}

