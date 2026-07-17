# AGENTS.md

Guidance for AI coding agents working in this repository.

## Project Overview

This is **Haichuan Liu's personal academic website**, built with **Jekyll** on top of the
[Academic Pages](https://github.com/academicpages/academicpages.github.io) template
(a fork of the Minimal Mistakes theme). It is a static site with no server-side application
code. It deploys automatically via **GitHub Pages** from the `lhaic/lhaic.github.io`
repository to <https://www.haichuanliu.top> (custom domain set in `CNAME`).

The site contains: an about/home page, a publications list, an Activities (news & awards) blog
archive, and a CV page. All other stock template surfaces (talks, teaching, portfolio,
tag/category archives, JSON CV, talk map, etc.) were **deleted** in a 2026-07 cleanup —
see "Site Surface Conventions".

## Technology Stack

- **Jekyll** (Ruby, `github-pages` gem) — static site generator. See `Gemfile`.
- **Liquid** templates — `_layouts/`, `_includes/`, and HTML pages in `_pages/`.
- **Markdown (kramdown + GFM)** with **Rouge** highlighting for content files.
- **Sass/SCSS** — styles in `_sass/` (compiled by Jekyll, `style: compressed`);
  entry point `assets/css/main.scss`. Themes live in `_sass/theme/` (`_default.scss`,
  `_dark.scss`), layout partials in `_sass/layout/`, mixins in `_sass/include/`.
- **Node/npm** — used *only* to bundle the front-end JS (`assets/js/main.min.js`)
  via `uglify-js` and `onchange`. Not involved in the site build itself.

## Key Configuration Files

- `_config.yml` — all site-wide settings: author profile/social links, analytics,
  collections, permalinks, Jekyll plugins, Sass options, and the `exclude` list.
  **Not hot-reloaded** by `jekyll serve`; restart after edits.
- `Gemfile` / `Gemfile.lock` — Ruby dependencies (`github-pages`, `jekyll-feed`,
  `jekyll-sitemap`, `jekyll-redirect-from`, `jemoji`, `webrick`, pinned
  `connection_pool 2.5.0`). Note: `Gemfile.lock` is listed in `.gitignore` but is
  currently committed; leave it as-is.
- `package.json` — npm scripts for the JS bundle (`uglify`, `build:js`, `watch:js`).
- `_data/navigation.yml` — top-nav links (currently Publications, Activities, CV).
- `_data/authors.yml`, `_data/ui-text.yml` — linked-author metadata and UI strings.
- `.bundle/config` — gems install to `vendor/bundle` (local path).
- `Dockerfile` / `docker-compose.yaml` / `.devcontainer/` — containerized dev options.

## Repository Layout / Content Model

Content is plain files with YAML front matter; there is no database or backend.

- `_pages/about.md` — home page (`permalink: /`). Uses Liquid to list recent posts.
- `_pages/publications.html` — publications page; iterates `site.publications` grouped
  by the `publication_category` map in `_config.yml` (`books`, `manuscripts` →
  "Journal Articles", `conferences` → "Conference Papers").
- `_pages/activities.html` — Activities (news & awards) archive (`/activities/`)
  listing all `_posts` grouped by year; `/highlights/`, `/news/` and `/year-archive/`
  redirect here.
- `_pages/cv.md` — Markdown CV (`/cv/`), rendered with the `cv-layout` layout.
- `_publications/` — one Markdown file per paper. Front matter: `title`,
  `collection: publications`, `category` (must match a `publication_category` key),
  `permalink: /publication/<slug>`, `date`, `venue`, `authors`
  (`†` = equal contribution, `*` = corresponding author), `paperurl`/`slidesurl`/`bibtexurl`.
- `_posts/` — Activities (news & awards) entries, named `YYYY-MM-DD-slug.md`, with
  `permalink: /posts/YYYY/MM/slug/` and `tags`.
- `_layouts/` — `default`, `single`, `archive`, `cv-layout`,
  `compress` (HTML compression wrapper).
- `_includes/` — reusable Liquid partials (author profile, SEO, navigation,
  archive items, `linked-authors.html`, analytics providers, etc.).
- `files/` — static downloads (PDFs), served at `/files/<name>`.
- `images/` — static images, referenced as `/images/<name>`.
- `assets/js/_main.js` + `assets/js/plugins/` — JS sources; `npm run build:js`
  produces `assets/js/main.min.js`. `assets/js/theme.js` and `collapse.js` are standalone.

## Build and Development Commands

Prerequisites: Ruby + Bundler + Node.js (`sudo apt install ruby-dev ruby-bundler nodejs`,
plus `build-essential gcc make` on Linux). Gems are installed locally:
`bundle config set --local path 'vendor/bundle'` (already set in `.bundle/config`).

```bash
bundle install                                # install Ruby deps (into vendor/bundle)
bundle exec jekyll serve -l -H localhost      # dev server with live reload at localhost:4000
bundle exec jekyll build                      # production build into _site/
npm install && npm run build:js               # rebuild assets/js/main.min.js after editing JS
npm run watch:js                              # auto-rebuild JS on change

# Docker alternative (no local Ruby needed)
docker compose build
PUID=$(id -u) PGID=$(id -g) docker compose up # dev server at http://localhost:4000
PUID=$(id -u) PGID=$(id -g) docker compose run --rm jekyll-site jekyll build
```

Note: Ruby may not be installed in every local environment. The Docker workflow above
has been verified locally and avoids conflicts with `.bundle/config`/`vendor/bundle`.
If `bundle exec jekyll build` cannot run locally, fall back to static checks and rely
on the GitHub Pages build. `_config.yml` changes require restarting `jekyll serve`.

## Testing and Verification

There is no automated test suite. Verification is by building and checking the output:

```bash
bundle exec jekyll build
```

Expected output includes `_site/index.html`, `_site/publications/index.html`,
`_site/activities/index.html`, `_site/cv/index.html`, `_site/sitemap/index.html`,
`_site/sitemap.xml`, `_site/feed.xml`. No other content pages should appear
(e.g. no `_site/talks/`, `_site/teaching/`, `_site/portfolio/`, `_site/categories/`,
`_site/tags/` — those template surfaces were deleted, not just hidden).

Also verify pages render correctly with `jekyll serve` before pushing; deployment is
automatic on push to the default branch via GitHub Pages.

## Site Surface Conventions (important)

The stock Academic Pages surfaces that this site does not use were **deleted outright**
in a 2026-07 cleanup (previously they were merely hidden via `exclude` /
`output: false`). Per `SITE_PAGE_CLEANUP.md` (written in Chinese — the canonical
reference for this):

- Deleted: all template example pages, the `_talks/`/`_teaching/`/`_portfolio/`/
  `_drafts/` collections, `talkmap*` tooling, `markdown_generator/`, `scripts/`,
  the JSON CV (`_pages/cv-json.md` + `_data/cv.json`), the comment system
  (`comments*.html`, `comments-providers/`, `_data/comments/`, `staticman:` config),
  unused layouts (`splash`, `talk`, `archive-taxonomy`), and unused template images.
- Only the `publications` collection exists in `_config.yml`; only `publications`
  and `posts` produce content pages.
- To restore a deleted surface, recover it from git history (`git log -- <path>`,
  then `git checkout <pre-deletion-commit> -- <path>`) and re-add the corresponding
  collection/config entries.
- Do **not** delete `_layouts/`, `_includes/`, `_sass/`, `assets/`, `_data/`,
  `images/`, or `files/` — the live theme depends on them even where they look unused.

## Code Style Guidelines

- Content files: YAML front matter + Markdown (kramdown/GFM). Match the existing front
  matter field order and quoting style of neighboring files (e.g. existing entries in
  `_publications/` and `_posts/`).
- Liquid templates: follow the existing indentation and `{% include base_path %}`
  pattern used in `_pages/*.html`; prefix internal links with `base_path`.
- SCSS: extend the existing partial structure under `_sass/` (`layout/`, `theme/`,
  `include/`); Jekyll compiles with `style: compressed`.
- When editing JS sources, always regenerate `assets/js/main.min.js` with
  `npm run build:js` — the site loads the minified bundle, and `assets/js/_main.js`
  plus `assets/js/plugins/` are excluded from Jekyll output.
- Site content is written in English (with occasional Chinese names); README and config
  comments are in English; `SITE_PAGE_CLEANUP.md` is in Chinese. Follow the language of
  the file you are editing.

## Security and Maintenance Notes

- No secrets belong in this repo: it is a **public** website repository. `_config.yml`
  intentionally contains public analytics IDs and site-verification tokens — that is normal.
- Email addresses in `_config.yml` are published; keep them as the site owner set them.
- Do not hand-edit generated artifacts (`_site/`, `assets/js/main.min.js`).
- Upstream template syncing causes merge conflicts; this repo is a detached fork —
  prefer manual patching over pulling upstream wholesale.
