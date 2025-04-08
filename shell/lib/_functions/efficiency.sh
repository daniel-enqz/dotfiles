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
