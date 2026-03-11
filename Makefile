# Makefile for Jekyll Blog
# Usage: make [target]

# Default target
.DEFAULT_GOAL := help

# Use rvm Ruby if available
RVM_RUBY := $(HOME)/.rvm/rubies/ruby-2.7.5/bin
BUNDLE := $(if $(wildcard $(RVM_RUBY)/ruby),$(RVM_RUBY)/ruby -S bundle,bundle)
JEKYLL := $(BUNDLE) exec jekyll
SERVE_PORT := 4000
SERVE_HOST := localhost

# Colors for output
GREEN := \033[0;32m
YELLOW := \033[1;33m
RED := \033[0;31m
NC := \033[0m # No Color

.PHONY: help install build serve stop clean deploy

# Show help
help: ## Show this help message
	@echo "$(GREEN)Available commands:$(NC)"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  $(YELLOW)%-15s$(NC) %s\n", $$1, $$2}'

# Install dependencies
install: ## Install Ruby gems and dependencies
	@echo "$(GREEN)Installing dependencies...$(NC)"
	$(BUNDLE) install

# Build the site
build: ## Build the Jekyll site
	@echo "$(GREEN)Building site...$(NC)"
	$(JEKYLL) build

# Serve the site locally
serve: ## Start the development server
	@echo "$(GREEN)Starting development server at http://$(SERVE_HOST):$(SERVE_PORT)$(NC)"
	@echo "$(YELLOW)Press Ctrl+C to stop the server$(NC)"
	$(JEKYLL) serve --host $(SERVE_HOST) --port $(SERVE_PORT) --livereload

# Serve the site locally (background)
serve-bg: ## Start the development server in background
	@echo "$(GREEN)Starting development server in background at http://$(SERVE_HOST):$(SERVE_PORT)$(NC)"
	$(JEKYLL) serve --host $(SERVE_HOST) --port $(SERVE_PORT) --livereload --detach

# Stop the development server
stop: ## Stop the development server
	@echo "$(GREEN)Stopping development server...$(NC)"
	@pkill -f "jekyll serve" || echo "$(YELLOW)No Jekyll server found running$(NC)"

# Clean build artifacts
clean: ## Clean build artifacts and temporary files
	@echo "$(GREEN)Cleaning build artifacts...$(NC)"
	rm -rf _site .jekyll-cache .sass-cache

# Clean everything (including gems)
clean-all: clean ## Clean everything including gems
	@echo "$(GREEN)Cleaning gems...$(NC)"
	$(BUNDLE) clean --force

# Build and serve
dev: build serve ## Build and serve the site (alias for build + serve)

# Build for production
build-prod: ## Build the site for production
	@echo "$(GREEN)Building site for production...$(NC)"
	JEKYLL_ENV=production $(JEKYLL) build

# Deploy to GitHub Pages
deploy: build-prod ## Deploy to GitHub Pages
	@echo "$(GREEN)Deploying to GitHub Pages...$(NC)"
	@echo "$(YELLOW)Make sure you have committed your changes to git$(NC)"
	git add .
	git commit -m "Deploy site" || echo "$(YELLOW)No changes to commit$(NC)"
	git push origin main

# Check site health
check: ## Check the site for common issues
	@echo "$(GREEN)Checking site health...$(NC)"
	$(JEKYLL) doctor

# Show site info
info: ## Show information about the site
	@echo "$(GREEN)Site Information:$(NC)"
	@echo "  Title: $(shell grep '^title:' _config.yml | cut -d':' -f2 | xargs)"
	@echo "  Author: $(shell grep '^author:' _config.yml | cut -d':' -f2 | xargs)"
	@echo "  Theme: $(shell grep '^theme:' _config.yml | cut -d':' -f2 | xargs)"
	@echo "  Posts: $(shell find _posts -name "*.md" | wc -l | xargs)"

# Create a new post
new-post: ## Create a new blog post (usage: make new-post TITLE="My Post Title")
	@if [ -z "$(TITLE)" ]; then \
		echo "$(RED)Error: Please provide a title$(NC)"; \
		echo "Usage: make new-post TITLE=\"Your Post Title\""; \
		exit 1; \
	fi
	@echo "$(GREEN)Creating new post: $(TITLE)$(NC)"
	@$(BUNDLE) exec jekyll post "$(TITLE)"

# Show recent posts
posts: ## Show recent blog posts
	@echo "$(GREEN)Recent posts:$(NC)"
	@find _posts -name "*.md" -exec basename {} \; | sort -r | head -10

# Update dependencies
update: ## Update Ruby gems
	@echo "$(GREEN)Updating dependencies...$(NC)"
	$(BUNDLE) update

# Show server status
status: ## Show server status
	@echo "$(GREEN)Server status:$(NC)"
	@if pgrep -f "jekyll serve" > /dev/null; then \
		echo "  $(GREEN)✓ Jekyll server is running$(NC)"; \
		echo "  URL: http://$(SERVE_HOST):$(SERVE_PORT)"; \
	else \
		echo "  $(RED)✗ Jekyll server is not running$(NC)"; \
	fi
