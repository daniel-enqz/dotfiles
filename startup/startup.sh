#!/bin/bash

read -p "Are you sure you want to start installation? (y/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]
then
    exit 1
fi

mv "$HOME/dotfiles" "$HOME/.dotfiles"
DOTFILES_DIR=/Users/daniel-enqz/.dotfiles

printf "\033[0;36mInstalling Dependencies 🐦‍🔥\033[0m\n"
source "$DOTFILES_DIR/startup/lib/install_dependencies.sh"

printf "\033[0;36mLinking Files 📂\033[0m\n"
source "$DOTFILES_DIR/startup/lib/link_files.sh"

echo -e "\033[0;32mLast Touches ✨\033[0m"
git clone https://github.com/tmux-plugins/tpm ~/.tmux/plugins/tpm

# Last messages to user:
printf "\033[0;32m------------------------------------------------------\033[0m\n"
printf "\033[1;32mInstallation complete! ✅\033[0m\n"
printf "Please restart your terminal to see changes.\n"
printf "\033[0;36mRun: Ctrl + shift + A + I to install TMUX plugins\033[0m\n"

