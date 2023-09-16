local status, _ = pcall(vim.cmd.colorscheme, "catppuccin")
if not status then
	print("Colorscheme not found!")
	return
end

require("catppuccin").setup({
	flavour = "mocha", -- latte, frappe, macchiato, mocha
	background = { -- :h background
		light = "latte",
		dark = "mocha",
	},
	integrations = {
		treesitter = true,
		gitsigns = true, -- :h gitsigns-integration
		telescope = true, -- :h telescope-integration
		neogit = false, -- :h neogit-integration
		nvimtree = true, -- :h nvimtree-integration
		which_key = true, -- :h which_key-integration
	},
})
