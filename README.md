# Startup

# First steps
> 1. Check for zsh installation `zsh --version`
> 2. Uninstall any other framework you may have installed (Ex. `uninstall_oh_my_zsh`)
> 3. Set Zsh as the default shell, if you haven't done so already:

```zsh
chsh -s $(which zsh)
````

> We will be using zim, a super fast framework with useful modules and themes without compromising speed. You can check documentation [here](https://github.com/zimfw/zimfw#set-up-zshrc), but if you follow this documentation steps you will be all set up.

# Installation
> 1. `cd ~`
> 2. `git clone git@github.com:daniel-enqz/dotfiles.git`
> 3. `sh .dotfiles/startup/startup.sh`


## 🎉 You are all set!!! Check the following resources:

### How startup.sh works:

1. First, the file will source two important files: 
- link_files.sh
- install_packages.sh

```bash
#!/bin/bash

source "$DOTFILES_DIR/startup/lib/link_files.sh"
source "$DOTFILES_DIR/startup/lib/install_packages.sh"
```
2. About `link_files.sh`: This file will basically create a link from files inside this directory and link them to the `~home/path`.
For example it will create a symbolic link at $HOME/.zshrc that points to $DOTFILES_DIR/shell/zsh/.zshrc file. The existing .zshrc file in your home directory will be replaced by this symbolic link. More detail about the content of each of the next files down. 👇

```bash
TEMP_DOTFILES_DIR=/Users/daniel-enqz/.dotfiles

ln -s "$TEMP_DOTFILES_DIR/shell/zsh/.zshenv" "$HOME/.zshenv"
ln -s "$DOTFILES_DIR/git/.gitconfig" "$HOME/.gitconfig"
ln -s "$DOTFILES_DIR/lazy/" "$HOME/.gitignore_global"
ln -s "$DOTFILES_DIR/shell/zsh/.hushlogin" "$HOME/.hushlogin"
ln -s "$DOTFILES_DIR/shell/zsh/.zshrc" "$HOME/.zshrc"
ln -s "$DOTFILES_DIR/shell/zsh/.zprofile" "$HOME/.zprofile"
ln -s "$DOTFILES_DIR/shell/zsh/.zimrc" "$HOME/.zimrc"
ln -s "$DOTFILES_DIR/shell/zsh/.zim" "$HOME/.zim"
```

3. Finally the `install_packages.sh` its very interesting as well 👀,  in here, we are installing all dependencies and pacakges specified in 3 different files (you can check each one of them before installation):<br>

> 🪴 Important: If you ever want to include all your current dependencies in this 3 files, you can run `export_packages`, this file is inside exports.sh, file that is explained further in this documentation.


🍺 Brewfile: _(Cool packages such as: tldr, rbenv, navi, redis, wget)_<br> 
🐍 Pip for Python<br>
🧼 npm for node packages

```bash

brew services stop --all
brew bundle --file="$DOTFILES_DIR"/exports/brew/Brewfile --force

pip install -r "$DOTFILES_DIR/exports/pip/requirements.txt"

xargs -I_ npm install -g "_" < "$DOTFILES_DIR/exports/npm/npm.txt"

```

### How linked_files work:

## .zsrc (Your main terminal config, this are some of the most imprtant lines)

```zsh
# Import all shell partials isnide shell/lib (functions and aliases, check them out)
source "$HOME/.dotfiles/shell/init.sh"



# -----------------Import functions inside shell/lib/functions/imports.sh
iruby
# inode
# ipython

# You are setting the Zim location here:
ZIM_HOME=${ZDOTDIR:-${HOME}}/.zim

# This is a large code bit checks if zimfw plugin manager if missing, and downloads it.
if [[ ! -e ${ZIM_HOME}/zimfw.zsh ]]; then
# [...]
fi

# This is super important, it downloads missing modules and updates ${ZIM_HOME}/init.zsh if missing or outdated.
if [[ ! ${ZIM_HOME}/init.zsh -nt ${ZDOTDIR:-${HOME}}/.zimrc ]]; then
  source ${ZIM_HOME}/zimfw.zsh init -q
fi


# This will initialize modules for you.
source ${ZIM_HOME}/init.zsh
```


### How ZIM works:

- zimfw plugin manager installs modules at `~/.zim/modules`.
- This modules are installed but need to be initialized, so this creates a static script at `~/.zim/init.zsh`
- The modules you want to use are defined in `~/.zimrc ` (This file just configures our plugin manager zimfw)

So in a nutshell, you can think of `~/.zimrc` as a list of modules you want to use, when you run `zimfw install`, it will download the modules and create a static script at `~/.zim/init.zsh` that will initialize the modules for you.

#### More about our zimfw plugin manager:

- Add new modules to `~/.zimrc`: `zimfw install`
- Remove modules from `~/.zimrc`: `zimfw uninstall`
- Update your modules to their latest revisions: `zimfw update`
- Upgrade zimfw to its latest version: `zimfw upgrade`
