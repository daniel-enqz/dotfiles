#!/bin/bash

manage_tmux_session() {
  # Check if already inside a tmux session
  if [ -z "$TMUX" ]; then
    # Check if a tmux session named "Code" exists
    if tmux has-session -t Code 2>/dev/null; then
      tmux attach -t Code
    else
      tmux new -s Code
    fi
  fi
}
