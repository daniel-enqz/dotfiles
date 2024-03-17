function ga {
  get_diff_data() {
      git diff
  }

  generate_commit_message() {
      local diff_data="$1"
      # Use jq to properly escape and encode the diff data as a JSON string
      local json_diff_data=$(jq -aRs . <<< "$diff_data")

      # Prepare the data for sending as JSON, correctly incorporating json_diff_data
      local data_json=$(jq -cn --arg jsonDiffData "$json_diff_data" '{
        "model": "gpt-4-turbo-preview",
        "messages": [
          {
            "role": "system",
            "content": "You are a commit message assistant. Your task is to generate a concise and informative commit message based on the provided git diff data."
          },
          {
            "role": "user",
            "content": $jsonDiffData
          }
        ]
      }')

      # Make the call to OpenAI's Chat API
      local response=$(curl -s \
        -H "Content-Type: application/json" \
        -H "Authorization: Bearer $OPENAI_API_KEY" \
        -d "$data_json" \
        "https://api.openai.com/v1/chat/completions")

      # Extract the text from the response, ensuring to parse the correct field
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

  diff_data=$(get_diff_data)
  commit_message=$(generate_commit_message "$diff_data")

  if [[ "$1" == "--commit" ]]; then
      commit_changes "$commit_message"
  else
      echo "To commit these changes, run the script with the --commit flag."
  fi
}
