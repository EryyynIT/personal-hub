# personal-hub

Michael's personal developer hub — a static one-page site that works as a portfolio,
social links hub and showcase for the indie game **UndeadOverhaul**.

Built with plain **HTML + CSS + vanilla JS**. No frameworks, no build step, no backend.

```
Michael / Developer
│
├── About
├── Projects
│   └── UndeadOverhaul
├── GameDev
├── Backend / Software
├── Socials
└── Support
```

## Features

- **Light / dark themes** — toggle, saved to `localStorage`, defaults to `prefers-color-scheme`
- **Responsive** — 320px → 1440px+, mobile hamburger menu
- **Data-driven UI** — projects, team, socials, support and footer render from `data/content.js`
- **SEO** — semantic HTML, Open Graph, Twitter card, favicon, sitemap, robots.txt
- **Accessible** — skip link, aria labels, focus states, keyboard navigation, `prefers-reduced-motion`
- **Fast** — zero external dependencies, inline SVG icons, local placeholder assets

## Structure

```
/
├── index.html              # page structure, hero + About copy
├── css/
│   └── styles.css          # design tokens (colors) in :root / [data-theme="dark"]
├── js/
│   └── main.js             # rendering, theme, menu, reveal, active nav
├── data/
│   └── content.js          # ← edit content here (single source of truth)
├── assets/
│   ├── game/               # UndeadOverhaul media (placeholders now)
│   ├── images/             # og-cover placeholder
│   ├── profile/            # reserved
│   └── icons/              # reserved
├── favicon.svg
├── robots.txt
├── sitemap.xml
└── .github/workflows/pages.yml
```

## Edit content

| What                | Where                                              |
| ------------------- | -------------------------------------------------- |
| Socials, projects, team, game info, support, footer | `data/content.js` |
| Hero headline, About text, page structure | `index.html` |
| Colors, spacing, dark/light tokens | `css/styles.css` |

Add a new project by appending an object to the `projects` array in `data/content.js` — the card renders automatically.

## Placeholders to replace before publishing

- `data/content.js` → `boosty` (your Boosty URL), `github` (profile URL), `canonicalUrl`
- `data/content.js` → `game.release`, `game.platforms`, `game.storeUrl` (only when confirmed — don't invent)
- `index.html` → `og:url`, `canonical`, `og:image`
- `sitemap.xml` + `robots.txt` → your GitHub Pages URL
- `assets/game/*.svg` → real screenshots / concept art (webp recommended)
- `favicon.svg` → optional

## Run locally

```bash
# from the project root
python3 -m http.server 8080
# open http://localhost:8080
```

No build step. Opening `index.html` directly also works (all scripts are plain, non-module).

## Publish on GitHub Pages

### Option A — branch deploy (simplest)

```bash
git init
git add .
git commit -m "initial personal hub"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
git push -u origin main
```

Then: repo **Settings → Pages → Source: "Deploy from a branch" → branch `main` → folder `/ (root)` → Save**.

Your site will be at `https://YOUR-USERNAME.github.io/YOUR-REPO/`.

### Option B — GitHub Actions (included)

The repo ships with `.github/workflows/pages.yml`. Enable it via
**Settings → Pages → Source: "GitHub Actions"**. After that, every push to `main` deploys automatically.

## Roadmap (future, not implemented)

- Blog / game devlog / changelog
- itch.io / Steam links (fields already reserved in `GAME_INFO`)
- Discord, YouTube, Twitch
- Newsletter / contact
- Real game media (screenshots, trailer)
- GitHub repository cards

---

Built by hand — no frameworks, no trackers, no nonsense.
