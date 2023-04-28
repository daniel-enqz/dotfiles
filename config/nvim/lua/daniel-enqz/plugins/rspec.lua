local setup, rspec = pcall(require, "rspec")
if not setup then
	return
end

rspec.setup()
