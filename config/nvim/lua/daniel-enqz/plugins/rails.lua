local setup, rails = pcall(require, "rails")
if not setup then
	return
end

rails.setup()
