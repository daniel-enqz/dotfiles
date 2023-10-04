#!/bin/bash
TEMP_DOTFILES_DIR=/Users/daniel-enqz/.dotfiles

brew services stop --all
brew bundle --file="$TEMP_DOTFILES_DIR"/exports/brew/Brewfile --force

pip install -r "$TEMP_DOTFILES_DIR/exports/pip/requirements.txt"

xargs -I_ npm install -g "_" < "$TEMP_DOTFILES_DIR/exports/npm/npm.txt"

# RUBY GEMS
gem install colored faker http pry-byebug rake rails rest-client rspec rubocop-performance sqlite3
brew update && brew upgrade && zimfw update && zimfw upgrade
