#!/bin/bash

# FONTS FOR ITERM2
(
git clone https://github.com/powerline/fonts.git --depth=1
cd fonts || exit
./install.sh
)
rm -rf fonts

# tmux plugin manager
# git clone https://github.com/tmux-plugins/tpm ~/.tmux/plugins/tpm
