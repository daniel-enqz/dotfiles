#!/bin/bash

ln -s "$DOTFILES_DIR/git/.gitconfig" "$HOME/.gitconfig"
ln -s "$DOTFILES_DIR/lazy/" "$HOME/.gitignore_global"
ln -s "$DOTFILES_DIR/shell/zsh/.hushlogin" "$HOME/.hushlogin"
ln -s "$DOTFILES_DIR/shell/zsh/.zshrc" "$HOME/.zshrc"
ln -s "$DOTFILES_DIR/shell/zsh/.zshenv" "$HOME/.zshenv"
ln -s "$DOTFILES_DIR/shell/zsh/.zprofile" "$HOME/.zprofile"
ln -s "$DOTFILES_DIR/shell/zsh/.zimrc" "$HOME/.zimrc"
ln -s "$DOTFILES_DIR/shell/zsh/.zim" "$HOME/.zim"
# Recursivity
# ln -s "$HOME/.dotfiles/lazy/" "$HOME/.zim/lazy"
