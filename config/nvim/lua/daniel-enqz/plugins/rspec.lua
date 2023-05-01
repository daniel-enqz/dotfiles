local setup, rspec = pcall(require, "rspec")
if not setup then
	return
end

-- If you have a tmux runner pane attached to your vim session, you can send the current line to it with <leader>trl.
-- For sending rspec tests you need to enable the next in setup
rspec.setup({
	on_start = function()
		vim.cmd("VtrAttachToPane")
	end,
	on_job_complete = function()
		vim.cmd("VtrDetach")
	end,
	file_pattern = "%w+_%d+_spec.rb",
	command = "bundle exec rspec",
	closest_file = function()
		return vim.fn.expand("%:p"):match("spec/.+_spec")
	end,
})

-- Now if you want to send the current spec to the runner pane, you can use <leader>rsf.
