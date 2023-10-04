# Startup
[![CI](https://github.com/daniel-enqz/dotfiles/actions/workflows/main.yaml/badge.svg)](https://github.com/daniel-enqz/dotfiles/actions/workflows/main.yaml)

> I use Iterm2 with zsh shell, neovim editor and tmux.<br>
> We will be using zim, a super fast framework with useful modules and themes without compromising speed. You can check documentation [here](https://github.com/zimfw/zimfw#manual-installation), but if you follow this guide steps you will be all set up.

### Open 10 terminals in less than 1 second ⚡️⚡️⚡️
![Screenshot 2023-02-26 at 12 51 45](https://user-images.githubusercontent.com/72522628/221430646-8f050482-9824-482f-87f6-b9ade4c4710a.jpg)

![Screenshot 2023-03-07 at 18 19 56](https://user-images.githubusercontent.com/72522628/223586414-25d14975-526d-46c8-ad36-1c3a67f4428e.jpg)


### 🌱 First steps
> 1. brew install --cask iterm2
> 2. Theme: `curl https://raw.githubusercontent.com/josean-dev/dev-environment-files/main/coolnight.itermcolors --output ~/Downloads/coolnight.itermcolors` (Import this theme from iTerm2 settings)
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

🪴 If you ever want to include all your current dependencies in this 3 files, you can run `export_packages`.

> 🍺 Brewfile: _(Cool packages such as: git, tmux, fzf, tldr, rbenv, navi, redis, wget)_ <br>
> 🐍 Pip for Python <br>
> 🧼 npm for node packages <br>

🪴 About [ZIM](https://github.com/zimfw/zimfw#set-up-zshrc):

- zimfw plugin manager installs modules at `~/.zim/modules`.
- This modules are installed but need to be initialized, so this creates a static script at `~/.zim/init.zsh`
- The modules you want to use are defined in `~/.zimrc ` (This file just configures our plugin manager zimfw)

So in a nutshell, you can think of `~/.zimrc` as a list of modules you want to use, when you run `zimfw install`, it will download the modules and create a static script at `~/.zim/init.zsh` that will initialize the modules for you.

#### More about our zimfw plugin manager:

- Add new modules to `~/.zimrc`: `zimfw install`
- Remove modules from `~/.zimrc`: `zimfw uninstall`
- Update your modules to their latest revisions: `zimfw update`
- Upgrade zimfw to its latest version: `zimfw upgrade`

### 🧞‍♂️ About our main installations, TMUX and NVIM!!! 

![Screenshot 2023-03-17 at 17 47 39](https://user-images.githubusercontent.com/72522628/226070780-0eeee011-d598-49d6-9cc5-7631363d10c2.jpg)


> **🪴 Important:** Be sure to install plugin manager `git clone https://github.com/tmux-plugins/tpm ~/.tmux/plugins/tpm`.<br>
> **🪴 Important:** Also you may need to run `Ctrl + A + Shift + I`(This will install any plugin defined in this file).

### TMUX Commands:
**Navigation**
- `Ctrl + A + S`: See all sessions.
- `Ctrl + A + W`: See all windows.
- `Ctrl + A + (J, I, K, L)`: Resize the pane.
- `Ctrl + A + M`: Maximize pane.
- `Ctrl + (H, J, K, L)`: Move between panes.
- `Ctrl + A + (P, N, number)`: Move between windows.

**Creaion and deletion**
- `Ctrl + A + X`: To close a pane.
- `Ctrl + A + |`: This will split the window horizontally (creating new panes).
- `Ctrl + A + -`: This will split the window vertically (creating new panes)
- `Ctrl + A + C`: This will create a new window.

**Plugin management**
- `Ctrl + A + Shift + I`: This will install any plugin defined in this file. `(/.dotfiles/config/tmux/.tmux.conf)` 
- `Ctrl + A + Shift + U`: This will update any plugin defined in this file. `(/.dotfiles/config/tmux/.tmux.conf)`
- `Ctrl + A + R`: Reload Tmux config file.
