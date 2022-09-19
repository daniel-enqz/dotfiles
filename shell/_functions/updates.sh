function update_all {
  zimfw update && zimfw upgrade && brew update
}

function update_zim {
  zimfw update && zimfw upgrade
}

function zim_modules {
  zimfw uninstall -f && zimfw install -f
}
