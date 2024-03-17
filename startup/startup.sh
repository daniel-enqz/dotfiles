#!/bin/bash

# Ask before running
read -p "Are you sure you want to start installation? (y/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]
then
    exit 1
fi

DOTFILES_DIR=/Users/daniel-enqz/.dotfiles
source "$DOTFILES_DIR/startup/lib/link_files.sh"
