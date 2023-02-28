-- import gitsigns plugin safely
local setup, copilot = pcall(require, "copilot")
if not setup then
	return
end

-- configure/enable gitsigns
copilot.setup()
