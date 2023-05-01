local setup, rspec = pcall(require, "rspec")
if not setup then
	return
end

rspec.setup({
	command = {
		vim = {
			"call VtrSendCommand('rspec {spec}')",
		},
		nvim = {
			"lua require('rspec').run()",
		},
	},
})
