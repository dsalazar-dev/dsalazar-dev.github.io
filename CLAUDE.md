# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Static GitHub personal portfolio page for Daniel Salazar (@dsalazar-dev), hosted at `dsalazar-dev.github.io`. No build step, no package manager, no framework — two files served directly.

## Files

- `index.html` — Main page. Sidebar profile (`<aside>`) + main content (`<main>`): Work, Skills, and Blog sections. Project cards are hardcoded `<article>` elements, not dynamically fetched.
- `index.css` — All styles. CSS Grid two-column layout, CSS custom properties for theming, three breakpoints (1100px, 800px, 480px).

## Architecture

**Layout**: CSS Grid on `body` — `300px` sidebar + `1fr` main column. The `<aside id="profile">` is `position: sticky; height: 100vh` so it stays fixed while the right column scrolls. At ≤800px it collapses to a single stacked column.

**CSS custom properties** (defined in `:root`):
- `--accent: #00D4FF` — cyan used for all interactive states, icons, and brand moments
- `--card-bg`, `--border-color`, `--muted-color` — dark-theme card and text palette
- `--accent-subtle`, `--accent-border` — low-opacity accent for backgrounds and borders

**External dependencies (CDN only):**
- Font Awesome 5.7.1 — icons (has SRI `integrity` attribute)
- Google Fonts (Poppins, Questrial) — loaded via `<link>` with `preconnect` + `display=swap`

No jQuery, no magic-grid, no animate.css — all removed. Blog posts load via native `fetch('blog.json')` inside a `DOMContentLoaded` listener using DOM API construction (no innerHTML with user data).

**Blog section** (`#blog_section`): hidden if `blog.json` is missing or empty. Blog post pages are expected at `./blog/<url_title>/`.

**Sidebar background**: CSS `radial-gradient` — no external image dependency.

## Development

Open `index.html` directly in a browser for the main page. A local HTTP server is needed only to test the blog JSON fetch:

```powershell
python -m http.server 8080
```

**To add/update projects**: edit `<article>` cards inside `#work_section` in `index.html`.

**To update profile info**: edit the `<aside id="profile">` block in `index.html`.

**To change the accent color or theme**: edit `--accent` and related custom properties in the `:root` block at the top of `index.css`.

**Resume**: the sidebar links to `/resume.pdf` — drop a `resume.pdf` file in the repo root to activate it.
