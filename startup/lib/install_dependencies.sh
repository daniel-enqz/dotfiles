#!/bin/bash

brew update
brew upgrade

brew install navi
brew install neovim
brew install tmux
brew install make

curl -fsSL https://raw.githubusercontent.com/getnf/getnf/main/install.sh | bash
getnf -i DroidSansMono

# LunarVim
curl -fsSL https://raw.githubusercontent.com/lunarvim/lunarvim/master/utils/installer/install.sh | bash
