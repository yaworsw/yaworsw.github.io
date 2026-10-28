# yaworsw.github.io

Personal site of Will Yaworsky, built with Jekyll and served via Docker.
Published at <https://will.yaworsky.works> (the custom domain in `CNAME`; yaworsw.github.io redirects there).

## Running locally

The site runs in a Docker container so no local Ruby install is required.

```bash
make serve    # build + serve at http://localhost:4000 (live reload via polling)
make drafts   # same as serve, but also renders posts in _drafts/
make stop     # tear down the container
make clean    # remove _site, .jekyll-cache, .sass-cache
```

`make serve` runs `docker compose up` in the foreground. First boot installs
gems inside the container and takes a minute or two; subsequent starts are
fast. The `docker-compose.yml` mounts the repo at `/srv/jekyll`, so edits on
the host are picked up immediately.

`_drafts/` is gitignored, so drafts (and any companion source code for them)
stay local and never land in the public repo. Use `make drafts` to preview them;
the Writing nav link only appears when drafts are rendered.

## Structure

```
_config.yml        Jekyll config
_layouts/          default, page, post, project
_posts/            blog posts (permalink: /blog/:title/)
_drafts/           unpublished posts (gitignored, local only)
_projects/         projects collection, rendered on the home page timeline
assets/
  css/             styles
  img/             images + icons/ for timeline logos
  js/              timeline.js
index.html         home page / project timeline
blog.html          blog index
```
