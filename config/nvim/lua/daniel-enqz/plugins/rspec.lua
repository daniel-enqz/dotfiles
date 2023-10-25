-- local setup, rspec = pcall(require, "vim-rspec")
-- if not setup then
--	return
-- end

vim.api.nvim_set_var("rspec_command", "call VtrSendCommand('bundle exec rspec {spec} --format documentation')")
-- rspec.setup()
