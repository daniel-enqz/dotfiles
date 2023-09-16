local status, _ = pcall(vim.cmd.colorscheme, "catppuccin")
if not status then
	print("Colorscheme not found!")
	return
end

require("catppuccin").setup({
	flavour = "mocha", -- latte, frappe, macchiato, mocha
})
