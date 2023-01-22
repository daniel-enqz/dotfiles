# Startup

### First steps
> 1. Check for zsh installation `zsh --version`
> 2. Uninstall any other framework you may have installed (Ex. `uninstall_oh_my_zsh`)

### Install zim in your terminal.
1. Set Zsh as the default shell, if you haven't done so already:
    ```zsh
    chsh -s $(which zsh)
    ````

2. [👆 `~/.zshrc` | Content explanation](#zshrc-content-explanation)

3. [👆 `~/.zimrc` | Content explanation](#create-zimrc)

4. Restart your terminal and you're done. Enjoy your Zsh IMproved!


#### `~/.zshrc` content explanation

1. Optionl if you do not have git installed:
   ```zsh
   zstyle ':zim:zmodule' use 'degit'
   ````

2. The default location of Zim will be in our home directory, we are not including it in our dotfiles because it has a lot of information:
   ```zsh
   ZIM_HOME=~/.zim
   ```

3. To automatically download the `zimfw` plugin manager if missing:
   ```zsh
   # Download zimfw plugin manager if missing.
   if [[ ! -e ${ZIM_HOME}/zimfw.zsh ]]; then
     curl -fsSL --create-dirs -o ${ZIM_HOME}/zimfw.zsh \
         https://github.com/zimfw/zimfw/releases/latest/download/zimfw.zsh
   fi
   ```
   Or if you use `wget` instead of `curl`:
   ```zsh
   # Download zimfw plugin manager if missing.
   if [[ ! -e ${ZIM_HOME}/zimfw.zsh ]]; then
     mkdir -p ${ZIM_HOME} && wget -nv -O ${ZIM_HOME}/zimfw.zsh \
         https://github.com/zimfw/zimfw/releases/latest/download/zimfw.zsh
   fi
   ```
   This is optional. If you choose to not include this step, you should manually
   download the `zimfw.zsh` script once and keep it at `${ZIM_HOME}`.

4. To automatically install missing modules and update the static initialization
   script if missing or outdated:
   ```zsh
   # Install missing modules, and update ${ZIM_HOME}/init.zsh if missing or outdated.
   if [[ ! ${ZIM_HOME}/init.zsh -nt ${ZDOTDIR:-${HOME}}/.zimrc ]]; then
     source ${ZIM_HOME}/zimfw.zsh init -q
   fi
   ```
   This step is optional, but highly recommended. If you choose to not include
   it, you must remember to manually run `zimfw install` every time after you
   update your [`~/.zimrc`](#create-zimrc) file.

5. To source the static script, that will initialize your modules:
   ```zsh
   # Initialize modules.
   source ${ZIM_HOME}/init.zsh
   ```


### Installation
> 1. `cd ~`
> 2. `git clone git@github.com:daniel-enqz/dotfiles.git`
> 3. `sh .dotfiles/startup/startup.sh`


Zim is fast
------------
<a href="https://github.com/zimfw/zimfw/wiki/Speed">
  <img src="https://zimfw.github.io/images/results.svg">
</a>
