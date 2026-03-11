serve: ## Serve the site locally via Docker
	docker compose up

stop: ## Stop the Docker server
	docker compose down

clean: ## Clean build artifacts
	rm -rf _site .jekyll-cache .sass-cache
