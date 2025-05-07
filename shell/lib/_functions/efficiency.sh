#!/bin/bash

function ltt {
  for _ in $(seq 1 10); do time zsh -i -c exit; done
}

function run_dart_test {
  if [ -z "$1" ]; then
    echo "Usage: run_dart_test <test_file_path>"
    return 1
  fi

  # Store the current directory
  current_dir=$(pwd)

  # Change to the test/bdc directory
  cd test/bdc || { echo "Failed to change to test/bdc directory"; return 1; }

  # Run the Flutter test
  flutter test --no-sound-null-safety "$1"

  # Return to the original directory
  cd "$current_dir" || { echo "Failed to return to original directory"; return 1; }
}

function cdnu() {
  if [ $# -eq 0 ]; then
    cd $NU_HOME
  else
    cd $NU_HOME/$1
  fi
}

# Password manager function to fetch credentials from CSV file
kam() {
    # Check if an argument was provided
    if [ -z "$1" ]; then
        echo "Usage: kam <site_name>"
        return 1
    fi
    
    # Define the path to your CSV file
    csv_file="$HOME/Downloads/kam.csv"
    
    # Check if the CSV file exists
    if [ ! -f "$csv_file" ]; then
        echo "Error: Password file not found at $csv_file"
        return 1
    fi
    
    # Search for the site in the CSV file (case insensitive)
    # Using awk to read the CSV and match against the first column (Title)
    result=$(awk -F, -v site="$1" 'tolower($1) ~ tolower(site) {print "Title: " $1 ", Site: " $2 ", Email: " $3 ", Password: " $4}' "$csv_file")
    
    # Check if any results were found
    if [ -z "$result" ]; then
        echo "No credentials found for '$1'"
        return 1
    fi
    
    # Count how many matches were found
    match_count=$(echo "$result" | grep -c "Site:")
    
    # Handle clipboard copying based on match count
    if [ "$match_count" -eq 1 ]; then
        # Single match - extract and copy password
        password=$(echo "$result" | grep "Password:" | awk -F "Password: " '{print $2}')
        site=$(echo "$result" | awk -F ", " '{print $2}' | sed 's/Site: //')
        email=$(echo "$result" | awk -F ", " '{print $3}' | sed 's/Email: //')
        
        # Display just the necessary information
        echo "Site: $site, Email: $email, Password: $password"
        
        # Copy to clipboard
        if command -v pbcopy &> /dev/null; then
            echo "$password" | pbcopy # macOS
            echo "Password copied to clipboard."
        elif command -v xclip &> /dev/null; then
            echo "$password" | xclip -selection clipboard # Linux with xclip
            echo "Password copied to clipboard."
        elif command -v clip.exe &> /dev/null; then
            echo "$password" | clip.exe # Windows WSL
            echo "Password copied to clipboard."
        else
            echo "Warning: Could not copy to clipboard (pbcopy/xclip/clip.exe not found)"
        fi
    else
        # Multiple matches - ask which one to copy without showing all details first
        echo "Multiple matches found. Enter number to copy (1-$match_count) or 'q' to quit:"
        
        # Create arrays for sites and passwords using a more compatible approach
        i=1
        while IFS= read -r line; do
            title=$(echo "$line" | awk -F ", " '{print $1}' | sed 's/Title: //')
            site=$(echo "$line" | awk -F ", " '{print $2}' | sed 's/Site: //')
            email=$(echo "$line" | awk -F ", " '{print $3}' | sed 's/Email: //')
            pass=$(echo "$line" | awk -F "Password: " '{print $2}')
            
            echo "[$i] $title"
            
            # Store in associative array (works in zsh)
            sites[$i]="$site"
            emails[$i]="$email"
            passwords[$i]="$pass"
            
            i=$((i+1))
        done <<< "$result"
        
        # Read user selection
        read selection
        
        # Check if input is valid
        if [[ "$selection" =~ ^[0-9]+$ ]] && [ "$selection" -ge 1 ] && [ "$selection" -le "$match_count" ]; then
            # Show the selected credential
            echo "Site: ${sites[$selection]}, Email: ${emails[$selection]}, Password: ${passwords[$selection]}"
            
            # Copy selected password
            if command -v pbcopy &> /dev/null; then
                echo "${passwords[$selection]}" | pbcopy # macOS
                echo "Password copied to clipboard."
            elif command -v xclip &> /dev/null; then
                echo "${passwords[$selection]}" | xclip -selection clipboard # Linux with xclip
                echo "Password copied to clipboard."
            elif command -v clip.exe &> /dev/null; then
                echo "${passwords[$selection]}" | clip.exe # Windows WSL
                echo "Password copied to clipboard."
            else
                echo "Warning: Could not copy to clipboard (pbcopy/xclip/clip.exe not found)"
            fi
        elif [[ "$selection" == "q" ]]; then
            echo "Operation cancelled."
        else
            echo "Invalid selection."
        fi
    fi
}