#!/bin/bash

function ltt {
  for _ in $(seq 1 10); do time zsh -i -c exit; done
}
