# Startup
[![CI](https://github.com/daniel-enqz/dotfiles/actions/workflows/main.yaml/badge.svg)](https://github.com/daniel-enqz/dotfiles/actions/workflows/main.yaml)

> I use MacOS Terminal with zsh shell, lvim editor and tmux.<br>
> We will be using zim, a super fast framework with useful modules and themes without compromising speed. You can check documentation [here](https://github.com/zimfw/zimfw#manual-installation), but if you follow this guide steps you will be all set up.

### Open 10 terminals in less than 1 second ⚡️⚡️⚡️
![Screenshot 2023-10-03 at 6 32 05 p m](https://github.com/daniel-enqz/dotfiles/assets/72522628/9e6dea4f-b1fc-41f1-b698-605910ea639b)


# Installation
> 1. Check for zsh installation `zsh --version`
> 2. Uninstall any other framework you may have installed (Ex. `uninstall_oh_my_zsh`)
> 3. Set Zsh as the default shell, if you haven't done so already: `chsh -s $(which zsh)`
> 5. `cd ~ && git clone git@github.com:daniel-enqz/dotfiles.git`
> 4. `sh .dotfiles/startup/startup.sh`

## 🎉 You are all set!!! Check the following resources:

### 🪴 About ZIM:

- zimfw plugin manager installs modules at `~/.zim/modules`.
- This modules are installed but need to be initialized, so this creates a static script at `~/.zim/init.zsh`
- The modules you want to use are defined in `~/.zimrc ` (This file just configures our plugin manager zimfw)

So in a nutshell, you can think of `~/.zimrc` as a list of modules you want to use, when you run `zimfw install`, it will download the modules and create a static script at `~/.zim/init.zsh` that will initialize the modules for you.

#### Installing zim Plugins:
- Add new modules to `~/.zimrc`: `zimfw install`
- Remove modules from `~/.zimrc`: `zimfw uninstall`
- Update your modules to their latest revisions: `zimfw update`
- Upgrade zimfw to its latest version: `zimfw upgrade`

### 🪴 About TMUX:

**Plugin management**
- `Ctrl + A + Shift + I`: This will install any plugin defined in this file. `(/.dotfiles/config/tmux/.tmux.conf)` 
- `Ctrl + A + Shift + U`: This will update any plugin defined in this file. `(/.dotfiles/config/tmux/.tmux.conf)`
- `Ctrl + A + R`: Reload Tmux config file.

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
