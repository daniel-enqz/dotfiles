# ----------------- Git -----------------
function ga {
  git add .

  # Ask the user to select a type:
  typeset -A types=(["feat"]="feat" ["fix"]="fix" ["chore"]="chore" ["docs"]="docs" ["ref"]="ref" ["style"]="style" ["test"]="test")
  PS3="🍀 Select type: "
  select choice in "feat" "fix" "chore" "docs" "ref" "style" "test"
  do
      type="${types[$choice]}"
      break;
  done

  echo "🌲 Scope:"
  read scope

  echo "🧼 Description:"
  read description

  # Construct the commit message and commit the changes
  git commit -m "${type}<${scope}>${description}"

  # Push the changes
  git push
}
