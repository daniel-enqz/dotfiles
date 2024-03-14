#!/bin/bash

function load_ibrew() {
  eval "$(arch -x86_64 /usr/local/bin/brew shellenv)"
}
