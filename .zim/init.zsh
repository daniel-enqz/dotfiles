zimfw() { source /Users/daniel-enqz/.zim/zimfw.zsh "${@}" }
zmodule() { source /Users/daniel-enqz/.zim/zimfw.zsh "${@}" }
typeset -g _zim_fpath=(/Users/daniel-enqz/.zim/modules/git/functions /Users/daniel-enqz/.zim/modules/utility/functions /Users/daniel-enqz/.zim/modules/duration-info/functions /Users/daniel-enqz/.zim/modules/git-info/functions /Users/daniel-enqz/.zim/modules/zsh-completions/src)
fpath=(${_zim_fpath} ${fpath})
autoload -Uz -- git-alias-lookup git-branch-current git-branch-delete-interactive git-branch-remote-tracking git-dir git-ignore-add git-root git-stash-clear-interactive git-stash-recover git-submodule-move git-submodule-remove mkcd mkpw duration-info-precmd duration-info-preexec coalesce git-action git-info
source /Users/daniel-enqz/.zim/modules/environment/init.zsh
source /Users/daniel-enqz/.zim/modules/git/init.zsh
source /Users/daniel-enqz/.zim/modules/input/init.zsh
source /Users/daniel-enqz/.zim/modules/termtitle/init.zsh
source /Users/daniel-enqz/.zim/modules/utility/init.zsh
source /Users/daniel-enqz/.zim/modules/duration-info/init.zsh
source /Users/daniel-enqz/.zim/modules/steeef/steeef.zsh-theme
source /Users/daniel-enqz/.zim/modules/completion/init.zsh
source /Users/daniel-enqz/.zim/modules/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh
source /Users/daniel-enqz/.zim/modules/zsh-history-substring-search/zsh-history-substring-search.zsh
source /Users/daniel-enqz/.zim/modules/zsh-autosuggestions/zsh-autosuggestions.zsh
