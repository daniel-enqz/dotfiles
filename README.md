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

### Content explanation

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

   
   # This will initialize modules for you, its in tour ~/.zshrc
   source ${ZIM_HOME}/init.zsh
   ```
