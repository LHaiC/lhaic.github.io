# Haichuan Liu's Personal Website

Source of [www.haichuanliu.top](https://www.haichuanliu.top) — Haichuan Liu's
personal academic homepage, built with Jekyll on top of the
[Academic Pages](https://github.com/academicpages/academicpages.github.io)
template and deployed automatically via GitHub Pages.

## Local development

```bash
bundle install
bundle exec jekyll serve -l -H localhost   # http://localhost:4000
```

Docker alternative (no local Ruby needed):

```bash
docker compose build
PUID=$(id -u) PGID=$(id -g) docker compose up
```

See `AGENTS.md` for the full repository guide (layout, conventions, build
commands) and `SITE_PAGE_CLEANUP.md` for which template surfaces are in use.
