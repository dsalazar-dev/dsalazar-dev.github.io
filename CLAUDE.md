# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static portfolio site for Daniel Salazar, AI Systems Engineer. No build step — pure HTML/CSS/JS. Deployed to GitHub Pages from `master` branch at `https://dsalazar-dev.github.io`.

To preview locally, open `index.html` directly in a browser. No dev server or package manager required.

## Architecture

Single-page site. All content is in `index.html`. The CSS and JS are split across purpose-specific files:

- `css/design-system.css` — CSS custom properties (tokens), reset, and typography. **All colors, spacing, radii, shadows, and transitions are defined here as CSS variables.** Always use these tokens rather than hardcoded values.
- `css/components.css` — Nav, cards, buttons, tags, badges.
- `css/sections.css` — Per-section layout and visual treatments.
- `js/main.js` — Nav scroll behavior, mobile menu toggle, smooth scroll, active nav link tracking via `IntersectionObserver`.
- `js/animations.js` — Canvas particle network (hero background, ~52 nodes) and scroll-reveal via `IntersectionObserver`. Both respect `prefers-reduced-motion`.

`config.json` is legacy and unused by the current site.

## Design System

Colors, spacing, radius, shadow, and easing are all CSS variables in `css/design-system.css`. Key accent palette:

- `--accent` `#6366F1` — primary indigo
- `--accent-cyan` `#22D3EE` — secondary cyan
- `--accent-violet` `#A78BFA` — tertiary purple

Tag classes: `.tag` (default), `.tag-cyan`, `.tag-violet`.

Typography: Inter for body/UI, JetBrains Mono for tags/code. Sizes use `clamp()` — no manual breakpoints.

## Content Updates

All content is in `index.html`. Section anchors: `#about`, `#experience`, `#work`, `#systems`, `#contact`.

- **Featured projects** — find `<!-- FEATURED PROJECTS -->`, copy an `<article class="project-card">` block.
- **Archive entries** — find `<!-- MORE EXPERIMENTS -->`, add an `<article class="mini-card">` block.
- **Contact links** — search for `mailto:` and `linkedin.com/in/`.

## Accessibility Requirements

- All interactive icon-only elements need `aria-label`.
- Decorative SVGs and canvas elements need `aria-hidden="true"`.
- New animations must respect `prefers-reduced-motion: reduce`.
- Maintain semantic HTML5 structure (`<section>`, `<article>`, `<header>`, etc.).
- WCAG AA color contrast must be maintained for all text.

## Deployment

Merge to `master`. GitHub Pages auto-deploys from the root of `master`. No build step needed.
