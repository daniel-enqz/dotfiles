function ga {
  # Function to generate a commit message based on git diff
  generate_commit_message() {
    local diff_data="$1"
    local json_diff_data=$(jq -aRs . <<< "$diff_data")
    local data_json=$(jq -cn --arg jsonDiffData "$json_diff_data" '{
      "model": "gpt-4-turbo-preview",
      "messages": [
        {
          "role": "system",
          "content": "You are a commit message assistant. Your task is to generate a concise and informative commit message based on the provided git diff data. Keep your commit inline and less than 50 characters."
        },
        {
          "role": "user",
          "content": $jsonDiffData
        }
      ]
    }')

    local response=$(curl -s \
      -H "Content-Type: application/json" \
      -H "Authorization: Bearer $OPENAI_API_KEY" \
      -d "$data_json" \
      "https://api.openai.com/v1/chat/completions")

    echo $response | jq -r '.choices[0].message.content'
  }

  # Function to prompt and execute git commit
  commit_changes() {
    echo "Ready to commit with the following message:"
    echo "git commit -m \"$1\""
    echo "Press Enter to proceed or Ctrl+C to abort."
    read
    git add .
    git commit -m "$1"
  }

  # Function to generate a summary based on commit messages
  generate_summary_message() {
    local commit_messages="$1"
    local json_commit_messages=$(jq -aRs . <<< "$commit_messages")
    local data_json=$(jq -cn --arg jsonCommitMessages "$json_commit_messages" '{
      "model": "gpt-4-turbo-preview",
      "messages": [
        {
          "role": "system",
          "content": "You are a summary assistant. Your task is to generate a concise and informative summary based on the provided commit messages. More than just a list of commit messages, your summary should provide context and a high-level overview of the changes. Explaining the importance of the changes and how they fit into the project is also helpful. Keep your summary inline and less than 300 characters."
        },
        {
          "role": "user",
          "content": $jsonCommitMessages
        }
      ]
    }')

    local response=$(curl -s \
      -H "Content-Type: application/json" \
      -H "Authorization: Bearer $OPENAI_API_KEY" \
      -d "$data_json" \
      "https://api.openai.com/v1/chat/completions")

    echo $response | jq -r '.choices[0].message.content'
  }

  # Function to get commit messages since divergence from the default branch
  get_commit_messages_since_divergence() {
    local base_branch="$1"
    git log $base_branch..HEAD --pretty=format:"%s"
  }

  # Main logic
  if [[ "$1" == "--commit" ]]; then
    local diff_data=$(git diff)
    if [ -z "$diff_data" ]; then
      echo "No changes to commit."
      return
    fi
    local commit_message=$(generate_commit_message "$diff_data")
    commit_changes "$commit_message"
    echo "Changes committed. ✅"
  elif [[ "$1" == "--squash" ]]; then
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
    printf "$summary_message\n"

    echo "Press Enter to copy the summary message to the clipboard or Ctrl+C to cancel."
    read -r

    echo $summary_message | pbcopy
    echo "Summary message copied to clipboard. ✅"
  else
    echo "Invalid option. Use --commit for individual commits or --squash for a summary of all commits."
  fi
}
