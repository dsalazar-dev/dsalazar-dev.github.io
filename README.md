# Daniel Salazar — AI Portfolio

Personal portfolio site for Daniel Salazar, AI Systems Engineer. Built as a static site deployable on GitHub Pages.

## Adding Your Profile Photo

The hero section expects your photo at `assets/profile.jpg`.

1. Save your photo as `assets/profile.jpg` (JPEG recommended, ~600×800px, portrait orientation)
2. The site will automatically display it in the hero card
3. If the file is missing, a dark gradient placeholder renders instead — the layout stays intact

For best results: crop tightly to head/shoulders, portrait (3:4) orientation.

---

## Deployment (GitHub Pages)

This site deploys automatically via GitHub Pages from the `master` branch.

1. Merge your feature branch to `master`
2. Go to **Settings → Pages** in the repository
3. Set source to `master` branch, root directory (`/`)
4. Your site will be live at `https://dsalazar-dev.github.io`

No build step required — it's pure HTML/CSS/JS.

## File Structure

```
/
├── index.html              # Single-page app — all sections
├── css/
│   ├── design-system.css   # CSS variables, reset, typography, utilities
│   ├── components.css      # Nav, cards, buttons, tags, badges
│   └── sections.css        # Per-section layout and visuals
├── js/
│   ├── main.js             # Nav behavior, smooth scroll, mobile menu
│   └── animations.js       # Canvas particle network, scroll-reveal
├── config.json             # Legacy config (retained, unused by new site)
└── README.md
```

## Updating Content

### Add a new featured project
In `index.html`, find the `<!-- FEATURED PROJECTS -->` section and copy one of the `<article class="project-card">` blocks. Update:
- Project number (`01`, `02`, etc.)
- `<h3>` title
- Impact line (the cyan text)
- Summary paragraph
- Tech tags (use `.tag`, `.tag-cyan`, or `.tag-violet` classes)
- Role
- GitHub link

### Add to the archive
In `index.html`, find the `<!-- MORE EXPERIMENTS -->` section and add a `<article class="mini-card">` block.

### Update the About section
Edit the three `<p class="body-lg">` paragraphs in the `#about` section of `index.html`.

### Update contact links
Search for `mailto:` and `linkedin.com/in/` references in `index.html` and update them.

## Design System

### Color Tokens (in `css/design-system.css`)
| Token | Value | Usage |
|-------|-------|-------|
| `--bg` | `#070B13` | Page background |
| `--surface` | `#0D1421` | Card / section surface |
| `--accent` | `#6366F1` | Primary indigo accent |
| `--accent-cyan` | `#22D3EE` | Secondary cyan highlight |
| `--accent-violet` | `#A78BFA` | Tertiary soft purple |
| `--accent-green` | `#34D399` | Open-to-work / success |
| `--text-1` | `#F1F5F9` | Primary text |
| `--text-2` | `#94A3B8` | Secondary / body text |
| `--text-3` | `#475569` | Muted / labels |

### Typography
- **Body / UI:** Inter (Google Fonts)
- **Code / Tags:** JetBrains Mono (Google Fonts)
- Type sizes use `clamp()` for fluid scaling — no breakpoint jumps

### Animation
- Canvas particle network (hero background): ~52 nodes, lightweight `requestAnimationFrame` loop
- Scroll reveal: `IntersectionObserver` adds `.visible` class → CSS transitions handle the rest
- All animations respect `prefers-reduced-motion: reduce` — canvas is disabled, reveals are instant

## Accessibility
- Semantic HTML5 throughout (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`)
- Skip-to-content link
- `aria-label` on all icon-only interactive elements
- `aria-hidden="true"` on all decorative SVGs and canvas
- Keyboard navigable (all interactive elements reachable by Tab)
- Focus rings visible on `:focus-visible`
- Color contrast: WCAG AA compliant

## Tech Stack
- **No build tools** — open `index.html` directly in a browser
- **No frameworks** — vanilla HTML/CSS/JS
- **No JavaScript libraries** — zero runtime dependencies
- **CDN resources:** Google Fonts only (Inter + JetBrains Mono)

## Design Decisions
- **Dark-first:** `#070B13` deep navy-black eliminates harsh contrast while feeling premium
- **Indigo + Cyan accent palette:** Feels AI-native without falling into hacker-green clichés
- **Canvas animation:** Particle/network background reinforces "AI systems" framing; lightweight enough to not affect performance
- **No glassmorphism abuse:** Used very sparingly (nav frosted glass on scroll only)
- **Storytelling structure:** Hero → Capabilities → About/Principles → Featured Projects → Systems Thinking → Archive → Value → Contact — designed to read like a narrative, not a resume
- **JetBrains Mono for tags/labels:** Signals technical depth without overusing monospace
