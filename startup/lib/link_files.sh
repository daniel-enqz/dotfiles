#!/bin/bash

DOTFILES_DIR=/Users/daniel-enqz/.dotfiles

# remove files from home directory first
rm -rf "$HOME/.zimrc"
rm -rf "$HOME/.zshenv"
rm -rf "$HOME/.hushlogin"
rm -rf "$HOME/.zshrc"
rm -rf "$HOME/.zprofile"
rm -rf "$HOME/.gitconfig"
rm -rf "$HOME/.config"
rm -rf "$HOME/.tmux.conf"
rm -rf "$HOME/.tmux"

ln -s "$DOTFILES_DIR/shell/zsh/.zimrc" "$HOME/.zimrc"
ln -s "$DOTFILES_DIR/shell/zsh/.zshenv" "$HOME/.zshenv"
ln -s "$DOTFILES_DIR/shell/zsh/.hushlogin" "$HOME/.hushlogin"
ln -s "$DOTFILES_DIR/shell/zsh/.zshrc" "$HOME/.zshrc"
ln -s "$DOTFILES_DIR/shell/zsh/.zprofile" "$HOME/.zprofile"
ln -s "$DOTFILES_DIR/config/git/.gitconfig" "$HOME/.gitconfig"
ln -s "$DOTFILES_DIR/config/tmux/.tmux.conf" "$HOME/.tmux.conf"


git clone https://github.com/tmux-plugins/tpm ~/.tmux/plugins/tpm
mkdir -p "$HOME/.config/lvim"
ln -s "$DOTFILES_DIR/config/lvim/config.lua" "$HOME/.config/lvim/config.lua"

