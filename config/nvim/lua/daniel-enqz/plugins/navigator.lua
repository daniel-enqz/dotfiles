vim.api.nvim_set_var("tmux_navigator_no_mappings", 1)

vim.api.nvim_set_keymap("n", "C-J", ":<C-U>TmuxNavigateLeft<cr>", { silent = true, noremap = true })
vim.api.nvim_set_keymap("n", "C-K", ":<C-U>TmuxNavigateDown<cr>", { silent = true, noremap = true })
vim.api.nvim_set_keymap("n", "C-L", ":<C-U>TmuxNavigateUp<cr>", { silent = true, noremap = true })
vim.api.nvim_set_keymap("n", "C-I", ":<C-U>TmuxNavigateRight<cr>", { silent = true, noremap = true })
