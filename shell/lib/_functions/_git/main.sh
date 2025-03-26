#!/bin/bash

SCRIPT_DIR="$(dirname "$0")"

function ga {
  source "${SCRIPT_DIR}/commit_message.sh"
  source "${SCRIPT_DIR}/branch_summary_message.sh"

  if [[ "$1" == "--commit" ]]; then
    local diff_data=$(git diff)
    if [ -z "$diff_data" ]; then
      echo "No changes to commit."
      return
    fi
    local commit_message=$(generate_commit_message "$diff_data")
    commit_changes "$commit_message"
    echo "Changes committed. ✅"
  elif [[ "$1" == "--summary" ]]; then
    local remote=origin
    local default_branch=$(git remote show $remote | grep 'HEAD branch' | cut -d' ' -f5)
    if [ -z "$default_branch" ]; then
      echo "Default branch not detected, falling back to 'main'."
      default_branch="main"
    fi
    local commit_messages=$(get_commit_messages_since_divergence "$default_branch")
    if [ -z "$commit_messages" ]; then
      echo "No new commits to summarize."
      return
    fi

    local summary_message=$(generate_summary_message "$commit_messages")
    printf "\033[0;36m$summary_message\n033[0m\n"

    echo "Press Enter to copy the summary message to the clipboard or Ctrl+C to cancel."
    read -r

    # Use pbcopy for macOS, xclip or xsel for Linux
    echo "$summary_message" | pbcopy
    echo "Summary message copied to clipboard. ✅"
  else
    echo "Invalid option. Use --commit for individual commits or --summary for a summary of all commits."
  fi
}

# Git push with clipboard fallback for no upstream branch
gp() {
    output=$(git push 2>&1)
    if [[ $output == *"has no upstream branch"* ]]; then
        # Extract the suggested command from the error message
        suggested_cmd=$(echo "$output" | grep -o "git push --set-upstream origin [^ ]*")
        
        # Copy the command to clipboard based on OS
        if [[ "$OSTYPE" == "darwin"* ]]; then
            echo "$suggested_cmd" | pbcopy
            echo "No upstream branch. Command copied to clipboard:"
            echo "$suggested_cmd"
        else
            echo "No upstream branch. Please run:"
            echo "$suggested_cmd"
        fi
    else
        # If successful or other error, just output the result
        echo "$output"
    fi
}

