brew services stop --all
brew bundle --file="$DOTFILES_DIR"/exports/brew/Brewfile --force

pip install -r "$DOTFILES_DIR/exports/pip/requirements.txt"

xargs -I_ npm install -g "_" < "$DOTFILES_DIR/exports/npm/npm.txt"
