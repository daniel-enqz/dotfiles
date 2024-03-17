#!/bin/bash

brew install navi
brew install neovim
brew install tmux
brew install make

curl -fsSL https://raw.githubusercontent.com/getnf/getnf/main/install.sh | bash
getnf -i 18

# LunarVim
curl -fsSL https://raw.githubusercontent.com/lunarvim/lunarvim/master/utils/installer/install.sh | bash
