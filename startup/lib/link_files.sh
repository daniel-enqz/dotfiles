#!/bin/bash

TEMP_DOTFILES_DIR=/Users/daniel-enqz/.dotfiles

# remove files from home directory first
rm -rf "$HOME/.zshenv"
rm -rf "$HOME/.hushlogin"
rm -rf "$HOME/.zshrc"
rm -rf "$HOME/.zprofile"
rm -rf "$HOME/.zimrc"
rm -rf "$HOME/.zim"
rm -rf "$HOME/.gitconfig"
rm -rf "$HOME/.tmux.conf"
rm -rf "$HOME/.tmux"
rm -rf "$HOME/.config"
rm -rf "$HOME/.pryrc"

ln -s "$TEMP_DOTFILES_DIR/shell/zsh/.zshenv" "$HOME/.zshenv"
ln -s "$TEMP_DOTFILES_DIR/shell/zsh/.hushlogin" "$HOME/.hushlogin"
ln -s "$TEMP_DOTFILES_DIR/shell/zsh/.zshrc" "$HOME/.zshrc"
ln -s "$TEMP_DOTFILES_DIR/shell/zsh/.zprofile" "$HOME/.zprofile"
ln -s "$TEMP_DOTFILES_DIR/shell/zsh/.zimrc" "$HOME/.zimrc"
ln -s "$TEMP_DOTFILES_DIR/shell/zsh/.zim" "$HOME/.zim"
ln -s "$TEMP_DOTFILES_DIR/config/git/.gitconfig" "$HOME/.gitconfig"
ln -s "$TEMP_DOTFILES_DIR/config/tmux/.tmux.conf" "$HOME/.tmux.conf"
ln -s "$TEMP_DOTFILES_DIR/config/nvim" "$HOME/.config"
ln -s "$TEMP_DOTFILES_DIR/config/ruby/.pryrc" "$HOME/.pryrc"
