# Startup
[![CI](https://github.com/daniel-enqz/dotfiles/actions/workflows/main.yaml/badge.svg)](https://github.com/daniel-enqz/dotfiles/actions/workflows/main.yaml)
### Hello, Im @daniel_enqz 👋. <br>
### This guide has help me learn more about bash and overall have better management of my day-to-day workspace. Hope it helps to whoever finds this. 🍀

> I use Iterm2 with zsh shell, neovim editor and tmux.<br>
> We will be using zim, a super fast framework with useful modules and themes without compromising speed. You can check documentation [here](https://github.com/zimfw/zimfw#manual-installation), but if you follow this guide steps you will be all set up.

### This are the efficiency numbers that you can approximately achieve with this guide. <br> (Opens 10 terminals in less than 1 second) ⚡️⚡️⚡️
![Screenshot 2023-02-26 at 12 51 45](https://user-images.githubusercontent.com/72522628/221430646-8f050482-9824-482f-87f6-b9ade4c4710a.jpg)

# Nice Terminal, Nice Theme:
> 1. brew install --cask iterm2
> 2. `curl https://raw.githubusercontent.com/josean-dev/dev-environment-files/main/coolnight.itermcolors --output ~/Downloads/coolnight.itermcolors` (Import this theme from iTerm2 settings)

# First steps
> 1. Check for zsh installation `zsh --version`
> 2. Uninstall any other framework you may have installed (Ex. `uninstall_oh_my_zsh`)
> 3. Set Zsh as the default shell, if you haven't done so already:

```zsh
chsh -s $(which zsh)
````

# Installation
- Be sure that you have installed [brew](https://github.com/lewagon/setup/blob/master/macos.md#homebrew), [python](https://github.com/lewagon/data-setup/blob/master/macOS.md#installing-python-with-pyenv), [node](https://github.com/lewagon/setup/blob/master/macos.md#nodejs), [yarn](https://github.com/lewagon/setup/blob/master/macos.md#yarn) and [PostgreSQL](https://github.com/lewagon/setup/blob/master/macos.md#postgresql).

> 1. `cd ~`
> 2. `git clone git@github.com:daniel-enqz/dotfiles.git`
> 3. `sh .dotfiles/startup/startup.sh`
> 4. Run `brew update && brew upgrade && zimfw update && zimfw upgrade`
> 5. After all this commands you can consider installing your rbenv, node, python versions, [gems](https://github.com/lewagon/setup/blob/master/macos.md#ruby), *zim modules*, etc.

## 🎉 You are all set!!! Check the following resources:
> IMPORTANT: I will not cover all the files under shell/lib, but there's some interesting stuff like _aliases and functions_ you can give it an glance 👀.
- [About startup.sh](https://github.com/daniel-enqz/dotfiles/blob/main/README.md#-everything-starts-with-startupsh)
- [About .zshrc](https://github.com/daniel-enqz/dotfiles/blob/main/README.md#-everything-starts-with-startupsh)
- [About .zim](https://github.com/daniel-enqz/dotfiles/blob/main/README.md#-everything-starts-with-startupsh)
- [About TMUX](https://github.com/daniel-enqz/dotfiles/blob/main/README.md#-about-tmux)

### 🌱 Everything starts with `startup.sh`:

#### It will source two important files:
- link_files.sh
- install_packages.sh

```bash
#!/bin/bash

source "$DOTFILES_DIR/startup/lib/link_files.sh"
source "$DOTFILES_DIR/startup/lib/install_packages.sh"
source "$DOTFILES_DIR/startup/lib/install_dependencies.sh"
```

#### 🦦 About `link_files.sh` (alias to run: `run_sybmolic`)

```bash
TEMP_DOTFILES_DIR=/Users/daniel-enqz/.dotfiles

ln -s "$TEMP_DOTFILES_DIR/shell/zsh/.zshenv" "$HOME/.zshenv"
ln -s "$DOTFILES_DIR/lazy/" "$HOME/.gitignore_global"
ln -s "$DOTFILES_DIR/shell/zsh/.hushlogin" "$HOME/.hushlogin"
ln -s "$DOTFILES_DIR/shell/zsh/.zshrc" "$HOME/.zshrc"
ln -s "$DOTFILES_DIR/shell/zsh/.zprofile" "$HOME/.zprofile"
ln -s "$DOTFILES_DIR/shell/zsh/.zimrc" "$HOME/.zimrc"
ln -s "$DOTFILES_DIR/shell/zsh/.zim" "$HOME/.zim"
ln -s "$DOTFILES_DIR/config/git/.gitconfig" "$HOME/.gitconfig"
ln -s "$DOTFILES_DIR/config/tmux/.tmux.conf" "$HOME/.tmux.conf"
ln -s "$DOTFILES_DIR/config/tmux/.tmux" "$HOME/.tmux"
```

> This file creates symbolic links of files in this repo to your home_path `~`. <br>
> For example it will create a symbolic link at `$HOME/.zshrc` that points to `$DOTFILES_DIR/shell/zsh/.zshrc` file. <br>
> **🪴 Important:** The existing .zshrc file in your home directory will be replaced by this symbolic link.<br>
> **🪴 Important:** If in the future you have new config files, add them at .dotfiles and remember to add the symbolic link in this file.

#### 🦦 About `install_packages.sh`

```bash

brew services stop --all
brew bundle --file="$DOTFILES_DIR"/exports/brew/Brewfile --force

pip install -r "$DOTFILES_DIR/exports/pip/requirements.txt"

xargs -I_ npm install -g "_" < "$DOTFILES_DIR/exports/npm/npm.txt"

```

> In here, we are installing all dependencies and pacakges from:<br>
> 🍺 Brewfile: _(Cool packages such as: git, tmux, fzf, tldr, rbenv, navi, redis, wget)_ <br>
> 🐍 Pip for Python <br>
> 🧼 npm for node packages <br>
> **🪴 Important:** If you ever want to include all your current dependencies in this 3 files, you can run `export_packages`, this file is inside exports.sh, file that is explained further in this documentation.

#### 🦦 About `install_dependecies.sh`

```bash
#!/bin/bash

# FONTS FOR ITERM2
git clone https://github.com/powerline/fonts.git --depth=1
cd fonts
./install.sh
cd ..
rm -rf fonts

# tmux plugin manager
git clone https://github.com/tmux-plugins/tpm ~/.tmux/plugins/tpm

```
> This file is incharged of installing powerline fonts for Iterm2 and our plugin manager for tmux.

#### 🦦 About `.zshrc`(Your main terminal config, here we are configuring zim plus bringing some dependencies)

```zsh
# Import all shell partials isnide shell/lib (functions and aliases, check them out)
source "$HOME/.dotfiles/shell/init.sh"



# -----------------Import Lazy functions inside shell/lib/functions/imports.sh
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
#### 🦦 About [ZIM](https://github.com/zimfw/zimfw#set-up-zshrc):

- zimfw plugin manager installs modules at `~/.zim/modules`.
- This modules are installed but need to be initialized, so this creates a static script at `~/.zim/init.zsh`
- The modules you want to use are defined in `~/.zimrc ` (This file just configures our plugin manager zimfw)

So in a nutshell, you can think of `~/.zimrc` as a list of modules you want to use, when you run `zimfw install`, it will download the modules and create a static script at `~/.zim/init.zsh` that will initialize the modules for you.

#### More about our zimfw plugin manager:

- Add new modules to `~/.zimrc`: `zimfw install`
- Remove modules from `~/.zimrc`: `zimfw uninstall`
- Update your modules to their latest revisions: `zimfw update`
- Upgrade zimfw to its latest version: `zimfw upgrade`

#### 🦦 About [TMUX](https://github.com/tmux):
> Tmux is allready configured in `config/tmux/tmux.config`<br>
> Here, we are setting stuff like key bindings, themes and plugins.<br>
> **🪴 Important:** Be sure to install plugin manager `git clone https://github.com/tmux-plugins/tpm ~/.tmux/plugins/tpm`.<br>
> **🪴 Important:** Also you may need to run `Ctrl + A + Shift + I`(This will install any plugin defined in this file).

### Cool TMUX Commands:

**Navigation**
- `Ctrl + A + S`: See all sessions.
- `Ctrl + A + W`: See all windows.
- `Ctrl + A + (J, I, K, L)`: Resize the pane.
- `Ctrl + A + (H, J, K, L)`: Move between panes.
- `Ctrl + A + (P, N, number)`: Move between windows.

**Creaion and deletion**
- `Ctrl + A + X`: To close a pane.
- `Ctrl + A + |`: This will split the window horizontally (creating new panes).
- `Ctrl + A + -`: This will split the window vertically (creating new panes)
- `Ctrl + A + C`: This will create a new window.

**Plugin management**
- `Ctrl + A + Shift + I`: This will install any plugin defined in this file.
- `Ctrl + A + Shift + U`: This will update any plugin defined in this file.

