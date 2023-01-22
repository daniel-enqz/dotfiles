# Startup

### First steps
> 1. Check for zsh installation `zsh --version`
> 2. Uninstall any other framework you may have installed (Ex. `uninstall_oh_my_zsh`)

### Install zim in your terminal.
1. Set Zsh as the default shell, if you haven't done so already:
    ```zsh
    chsh -s $(which zsh)
    ````

2. [Set up your `~/.zshrc` file](#set-up-zshrc)

3. [Create your `~/.zimrc` file](#create-zimrc)

4. Restart your terminal and you're done. Enjoy your Zsh IMproved!


#### Set up `~/.zshrc`

Add the lines below to your `~/.zshrc` file, in the following order:

1. To use our `degit` tool by default to install modules:
   ```zsh
   zstyle ':zim:zmodule' use 'degit'
   ````
   This is optional, and only required if you don't have `git` installed (yes,
   Zim works even without `git`!)

2. To set where the directory used by Zim will be located:
   ```zsh
   ZIM_HOME=~/.zim
   ```
   The value of `ZIM_HOME` can be any directory your user has write access to.
   You can even set it to a cache directory like `${XDG_CACHE_HOME}/zim` or
   `~/.cache/zim` if you also include the step below, that automatically
   downloads the `zimfw` plugin manager.

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
