
function ga {
  # Find the base branch (assuming 'main' as default)
  local base_branch="main"
  local current_branch=$(git rev-parse --abbrev-ref HEAD)

  # Ensure we're not on the base branch
  if [ "$current_branch" == "$base_branch" ]; then
      echo "You're on the base branch ($base_branch). Switch to a feature branch to use this command."
      return
  fi

  # Fetch all commit messages since divergence from the base branch
  get_commit_messages_since_divergence() {
      git log $base_branch..HEAD --pretty=format:"%s"
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

  # Main
  commit_messages=$(get_commit_messages_since_divergence)
  if [ -z "$commit_messages" ]; then
      echo "No new commits to summarize."
      return
  fi

  summary_message=$(generate_summary_message "$commit_messages")

  if [[ "$1" == "--commit" ]]; then
      echo "Ready to squash and commit with the following summary message:"
      echo "git commit -m \"$summary_message\""
      echo "Press Enter to proceed or Ctrl+C to abort."
      read
      git add .
      git commit -m "$summary_message"
  else
      echo "Generated summary message: $summary_message"
      echo "To squash and commit these changes with the generated summary, run the script with the --commit flag."
  fi
}
