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

> [👆 `~/.zshrc` and  `~/.zimrc` | Content explanation](#content-explanation)



Zim is fast
------------
<a href="https://github.com/zimfw/zimfw/wiki/Speed">
  <img src="https://zimfw.github.io/images/results.svg">
</a>

#### Content explanation

5. To source the static script, that will initialize your modules:
   ```zsh
   # Initialize modules.
   source ${ZIM_HOME}/init.zsh
   ```
