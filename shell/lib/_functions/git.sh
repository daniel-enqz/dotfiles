function ga {
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

  commit_changes() {
      echo "Ready to commit with the following message:"
      echo "git commit -m \"$1\""
      echo "Press Enter to proceed or Ctrl+C to abort."
      read
      git add .
      git commit -m "$1"
  }

  generate_summary_message() {
      local commit_messages="$1"
      local json_commit_messages=$(jq -aRs . <<< "$commit_messages")
      local data_json=$(jq -cn --arg jsonCommitMessages "$json_commit_messages" '{
        "model": "gpt-4-turbo-preview",
        "messages": [
          {
            "role": "system",
            "content": "You are a summary assistant. Your task is to generate a concise and informative summary based on the provided commit messages."
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

  get_commit_messages_since_divergence() {
      local base_branch=${2:-"main"}
      git log $base_branch..HEAD --pretty=format:"%s"
  }

  if [[ "$1" == "--commit" ]]; then
      diff_data=$(git diff)
      if [ -z "$diff_data" ]; then
          echo "No changes to commit."
          return
      fi
      commit_message=$(generate_commit_message "$diff_data")
      commit_changes "$commit_message"
  elif [[ "$1" == "--squash" ]]; then
      local remote=${1:-origin} # Default to 'origin' but allows overriding
      local default_branch=$(git remote show $remote | grep 'HEAD branch' | cut -d' ' -f5)
      local base_branch=${2:-$default_branch} # Use detected default or provided base branch
      commit_messages=$(get_commit_messages_since_divergence "$base_branch")
      if [ -z "$commit_messages" ]; then
          echo "No new commits to summarize."
          return
      fi

      summary_message=$(generate_summary_message "$commit_messages")
      echo "\"$summary_message\""
  else
      echo "Invalid option. Use --commit for individual commits or --squash for a summary of all commits."
  fi
}
