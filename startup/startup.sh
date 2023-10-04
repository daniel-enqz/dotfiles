#!/bin/bash

# Ask before running
read -p "Are you sure you want to start installation? (y/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]
then
    exit 1
fi

TEMP_DOTFILES_DIR=/Users/daniel-enqz/.dotfiles

source "$TEMP_DOTFILES_DIR/startup/lib/link_files.sh"
source "$TEMP_DOTFILES_DIR/startup/lib/install_packages.sh"
source "$TEMP_DOTFILES_DIR/startup/lib/install_dependencies.sh"

gh auth login
gh auth status
