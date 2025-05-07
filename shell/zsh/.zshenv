#!/bin/bash
export PATH="$HOME/.local/bin:$PATH"
export NAVI_PATH=/Users/daniel.enriquez/.dotfiles/config/navi
export DOTFILES_DIR=/Users/daniel.enriquez/.dotfiles
export EDITOR='lvim'
export OPENAI_API_KEY="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"

# {mark} Homebrew PATH
export PATH="/opt/homebrew/bin:$PATH"

# GOOGLE CLOUD
export GOOGLE_BIGQUERY_CLIENT_ID="32555940559.apps.googleusercontent.com"
export GOOGLE_BIGQUERY_CLIENT_SECRET="ZmssLNjJy2998hD4CTg2ejr2"

# GPU
export GPG_TTY=$(tty)
export PINENTRY_USER_DATA="USE_CURSES=1"

# IntelliJ IDEA CE PATH
export PATH="/Applications/IntelliJ IDEA CE.app/Contents/MacOS:$PATH"

# {mark} START IT-ENG JAMF SETUP ZSHRC
source $HOME/.nurc
export GOPATH="${NU_HOME}/go"
export PATH="$GOPATH/bin:${PATH}"
export MONOREPO_ROOT="$NU_HOME/mini-meta-repo"
export PATH="$PATH:$MONOREPO_ROOT/monocli/bin"
eval "$(rbenv init -)"
# {mark} END IT-ENG JAMF SETUP ZSHRC

# {mark} START IT-ENG NVM SETUP
export NVM_DIR="/Users/daniel.enriquez/.nvm"
[ -s "/opt/homebrew/opt/nvm/nvm.sh" ] && source "/opt/homebrew/opt/nvm/nvm.sh"
[ -s "/usr/local/opt/nvm/etc/bash_completion.d/nvm" ] && source "/usr/local/opt/nvm/etc/bash_completion.d/nvm" # This loads nvm bash_completion

# {mark} START IT-ENG JAMF SETUP MOBILE ZSHRC
export MONOREPO_ROOT="$NU_HOME/mini-meta-repo"
export PATH="$PATH:$MONOREPO_ROOT/monocli/bin"
export FLUTTER_SDK_HOME="$HOME/sdk-flutter"
export FLUTTER_ROOT="$FLUTTER_SDK_HOME"
export PATH="$PATH:$FLUTTER_SDK_HOME/bin:$NU_HOME/.pub-cache/bin:$FLUTTER_ROOT/bin/cache/dart-sdk/bin"
export ANDROID_HOME="$HOME/Library/Android/sdk"
export ANDROID_SDK="$ANDROID_HOME"
export PATH="$PATH:$ANDROID_HOME/cmdline-tools/latest/bin:$ANDROID_HOME:$ANDROID_HOME/platform-tools:$ANDROID_HOME/emulator"
export FLUTTER_PLATFORM_CLIENT_ENV="staging"
# {mark} END IT-ENG JAMF SETUP MOBILE ZSHRC

. "$HOME/.cargo/env"
