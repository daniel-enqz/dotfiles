# Startup

### First steps
> 1. Check for zsh installation `zsh --version`
> 2. Uninstall any other framework you may have installed (Ex. `uninstall_oh_my_zsh`)
> 3. Set Zsh as the default shell, if you haven't done so already:

```zsh
chsh -s $(which zsh)
````

### Installation
> 1. `cd ~`
> 2. `git clone git@github.com:daniel-enqz/dotfiles.git`
> 3. `sh .dotfiles/startup/startup.sh`


### 🎉 You are all set!!! Check the following resources:

#### How startup.sh works:

1. First, the file will source two important files: 
- link_files.sh
- install_packages.sh

```bash
#!/bin/bash

source "$DOTFILES_DIR/startup/lib/link_files.sh"
source "$DOTFILES_DIR/startup/lib/install_packages.sh"
```
2. About `link_files.sh`: This file will basically create a link from files inside this directory and link them to the `~home/path`.
For example it will create a symbolic link at $HOME/.zshrc that points to $DOTFILES_DIR/shell/zsh/.zshrc file. The existing .zshrc file in your home directory will be replaced by this symbolic link.

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


#### How ZIM works:

- zimfw plugin manager installs modules at `~/.zim/modules`.
- This modules are installed but need to be initialized, so this creates a static script at `~/.zim/init.zsh`
- The modules you want to use are defined in `~/.zimrc ` (This file just configures our plugin manager zimfw)

So in a nutshell, you can think of `~/.zimrc` as a list of modules you want to use, when you run `zimfw install`, it will download the modules and create a static script at `~/.zim/init.zsh` that will initialize the modules for you.

#### Some interesting lines in zshrc

   ```zsh
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

#### More about our zimfw plugin manager:

- Add new modules to `~/.zimrc`: `zimfw install`
- Remove modules from `~/.zimrc`: `zimfw uninstall`
- Update your modules to their latest revisions: `zimfw update`
- Upgrade zimfw to its latest version: `zimfw upgrade`
