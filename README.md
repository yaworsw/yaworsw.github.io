# yaworsw.github.io

Personal site of Will Yaworsky, built with Jekyll and served via Docker.
Published at <https://yaworsw.github.io>.

## Running locally

The site runs in a Docker container so no local Ruby install is required.

```bash
make serve    # build + serve at http://localhost:4000 (live reload via polling)
make stop     # tear down the container
make clean    # remove _site, .jekyll-cache, .sass-cache
```

`make serve` runs `docker compose up` in the foreground. First boot installs
gems inside the container and takes a minute or two; subsequent starts are
fast. The `docker-compose.yml` mounts the repo at `/srv/jekyll`, so edits on
the host are picked up immediately.

## Structure

```
_config.yml        Jekyll config
_layouts/          default, page, post, project
_posts/            blog posts (permalink: /blog/:title/)
_projects/         projects collection (permalink: /projects/:title/)
assets/
  css/             styles
  img/             images + icons/ for timeline logos
  js/              timeline.js and friends
code/              companion source for blog posts
index.html
about.md, blog.html, projects.html
```
