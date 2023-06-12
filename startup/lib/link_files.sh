#!/bin/bash

TEMP_DOTFILES_DIR=/Users/daniel-enqz/.dotfiles

ln -s "$TEMP_DOTFILES_DIR/shell/zsh/.zshenv" "$HOME/.zshenv"
ln -s "$DOTFILES_DIR/shell/zsh/.hushlogin" "$HOME/.hushlogin"
ln -s "$DOTFILES_DIR/shell/zsh/.zshrc" "$HOME/.zshrc"
ln -s "$DOTFILES_DIR/shell/zsh/.zprofile" "$HOME/.zprofile"
ln -s "$DOTFILES_DIR/shell/zsh/.zimrc" "$HOME/.zimrc"
ln -s "$DOTFILES_DIR/shell/zsh/.zim" "$HOME/.zim"
ln -s "$DOTFILES_DIR/config/git/.gitconfig" "$HOME/.gitconfig"
ln -s "$DOTFILES_DIR/config/tmux/.tmux.conf" "$HOME/.tmux.conf"
ln -s "$DOTFILES_DIR/config/tmux/.tmux" "$HOME/.tmux"
ln -s "$DOTFILES_DIR/config/nvim" "$HOME/.config"
ln -s "$DOTFILES_DIR/config/ruby/.pryrc" "$HOME/.pryrc"
