serve: ## Serve the site locally via Docker
	@echo "Starting Jekyll server at http://localhost:4000"
	docker compose up

stop: ## Stop the Docker server
	docker compose down

clean: ## Clean build artifacts
	rm -rf _site .jekyll-cache .sass-cache
