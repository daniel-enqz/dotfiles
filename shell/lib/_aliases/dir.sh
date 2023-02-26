#!/bin/bash

# Jumps
alias o.='open .'
alias vs='code .'
alias cdc='cd $HOME/main'
alias cdt='cd $HOME/main/telos'
alias cdw='cd $HOME/main/lewagon'
alias cdd='cd $HOME/.dotfiles'

# Search
alias la='ls -la'
alias nv='navi'
alias info='htop'

# Tmux shortcuts
alias tls='tmux ls'
alias td='tmux detach'
alias tns='tmux new -s'
alias tnds='tmux new-session -d -s'
alias tas='tmux attach -t'
alias tks='tmux kill-session -t'
alias tds='tmux detach -s'

# Git
alias g='git'
alias gis='git status'
alias gl='git lg'
alias gll='git lg --all'

# Shell Scripts
alias run_symbolic='sh $DOTFILES_DIR/startup/lib/link_files.sh'
