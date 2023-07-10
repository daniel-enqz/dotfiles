#!/bin/bash

# ----------------- Git -----------------
function ga {
  git add .

  # Ask the user to select a type:
  PS3="🍀 Select type: "
  select choice in "feat" "fix" "chore" "docs" "ref" "style" "test"
  do
      type="$choice"
      break;
  done

  echo "🌲 Scope:"
  read -r scope

  echo "🧼 Description:"
  read -r description

  # Construct the commit message and commit the changes
  git commit -m "${type}<${scope}>${description}"

}

function gfcm {
  # find a commit by its message
  git log --all --grep="$1"
}
