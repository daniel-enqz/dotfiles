local setup, rspec = pcall(require, "rspec")
if not setup then
	return
end

vim.api.nvim_set_var("rspec_command", "call VtrSendCommand('rspec {spec}')")

rspec.setup({
	command = {
		executable = "bundle",
		args = { "exec", "rspec" },
		env = { "RAILS_ENV=test" },
	},
})
