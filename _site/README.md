# yaworsw.github.io

A blog about software engineering in an agentic AI world, built with Jekyll.

## Quick Start

This project uses a Makefile to simplify common development tasks. Run `make help` to see all available commands.

### First Time Setup

```bash
make install    # Install Ruby gems and dependencies
make serve      # Start the development server
```

Visit `http://localhost:4000` to view your blog.

## Available Commands

### Development Commands

| Command | Description |
|---------|-------------|
| `make serve` | Start the development server with live reload |
| `make serve-bg` | Start the development server in background |
| `make stop` | Stop the development server |
| `make status` | Check if the server is running |
| `make dev` | Build and serve the site (alias for build + serve) |

### Building Commands

| Command | Description |
|---------|-------------|
| `make build` | Build the Jekyll site |
| `make build-prod` | Build the site for production |
| `make clean` | Clean build artifacts and temporary files |
| `make clean-all` | Clean everything including gems |

### Content Management

| Command | Description |
|---------|-------------|
| `make new-post TITLE="My Post Title"` | Create a new blog post |
| `make posts` | Show recent blog posts |
| `make info` | Show site information (title, author, theme, post count) |

### Deployment

| Command | Description |
|---------|-------------|
| `make deploy` | Deploy to GitHub Pages (builds for production, commits, and pushes) |

### Maintenance

| Command | Description |
|---------|-------------|
| `make install` | Install Ruby gems and dependencies |
| `make update` | Update Ruby gems |
| `make check` | Check the site for common issues |

## Usage Examples

### Starting Development

```bash
# Install dependencies (first time only)
make install

# Start development server
make serve

# Or start in background
make serve-bg
```

### Creating Content

```bash
# Create a new blog post
make new-post TITLE="My New Blog Post"

# View recent posts
make posts

# Check site information
make info
```

### Building and Deploying

```bash
# Build for development
make build

# Build for production
make build-prod

# Deploy to GitHub Pages
make deploy
```

### Troubleshooting

```bash
# Check if server is running
make status

# Stop the server
make stop

# Clean build artifacts
make clean

# Check site health
make check
```

## Project Structure

```
.
├── _config.yml          # Jekyll configuration
├── _layouts/            # HTML layouts
├── _posts/             # Blog posts
├── assets/             # Static assets (CSS, JS, images)
├── Gemfile             # Ruby dependencies
├── Makefile            # Development commands
└── README.md           # This file
```

## Prerequisites

- Ruby (2.4 or higher)
- Bundler (`gem install bundler`)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test with `make serve`
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).
