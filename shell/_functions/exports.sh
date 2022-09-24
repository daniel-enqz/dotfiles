function export_apps() {
  brew services stop --all
  brew bundle dump --file="$DOTFILES_DIR"/exports/brew/Brewfile --force
  echo "Brew apps exported"

  pip freeze > "$DOTFILES_DIR"/exports/pip/requirements.txt
  echo "Pip apps exported"

  npm list --location=global --depth=0 | grep -v npm > "$DOTFILES_DIR"/exports/npm/npm.txt
  echo "Npm apps exported"
}
