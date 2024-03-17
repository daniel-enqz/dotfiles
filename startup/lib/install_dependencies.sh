#!/bin/bash

git clone https://github.com/tmux-plugins/tpm ~/.tmux/plugins/tpm
curl -fsSL https://raw.githubusercontent.com/getnf/getnf/main/install.sh | bash
getnf

brew install navi
brew install neovim
brew install tmux
brew install make
