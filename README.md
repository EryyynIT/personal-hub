# personal-hub

**EryyynIT's** personal developer hub — a static one-page site that works as a portfolio,
social links hub and showcase for the indie game **UndeadOverhaul**.

> EryyynIT is the public developer identity (pronounced roughly like "Eryn"). Michael is the person behind it.

Built with plain **HTML + CSS + vanilla JS**. No frameworks, no build step, no backend.

```
EryyynIT / Backend Developer · Go / Python
│
├── About
├── What I build (Backend / Infrastructure / Experiments)
├── Projects
│   ├── UndeadOverhaul (game)
│   ├── Async Payment Processing Service (FastAPI / RabbitMQ)
│   ├── queue (Go)
│   ├── MailingTGBot
│   ├── go-exercises
│   └── Tic-Tac-ToeAI
├── Currently building
├── Game (UndeadOverhaul)
├── Find me (GitHub · Boosty · X · TikTok · Telegram)
└── Support
```

## Features

- **Light / dark themes** — toggle, saved to `localStorage`, defaults to `prefers-color-scheme`
- **Responsive** — 320px → 1440px+, mobile hamburger menu
- **Data-driven UI** — build areas, projects, current work, team, socials, support and footer render from `data/content.js`
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
│   ├── projects/           # project card covers (placeholders now)
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
| Identity, build areas, projects, current work, team, socials, support, footer | `data/content.js` |
| Hero headline, About text, page structure | `index.html` |
| Colors, spacing, dark/light tokens | `css/styles.css` |

Add a new project by appending an object to the `projects` array in `data/content.js` — the card renders automatically.

## Placeholders to replace before publishing

- `data/content.js` → `game.release`, `game.platforms`, `game.storeUrl` (only when confirmed — don't invent)
- `assets/projects/*.svg` → real project screenshots (webp recommended)
- `assets/game/*.svg` → real screenshots / concept art (webp recommended)
- `index.html` → `og:image` (real 1200x630 cover)
- `favicon.svg` → optional

## Run locally

```bash
# from the project root
python3 -m http.server 8080
# open http://localhost:8080
```

No build step. Opening `index.html` directly also works (all scripts are plain, non-module).

## Smoke test

```bash
node test/smoke.test.js
```

Runs `data/content.js` + `js/main.js` against a DOM shim and verifies that all sections render, the brand is consistent (no old identity leakage), and no relative URLs are broken.

## Publish on GitHub Pages

The repo ships with `.github/workflows/pages.yml`. Enable it via
**Settings → Pages → Source: "GitHub Actions"**. After that, every push to `main` deploys automatically.

## Roadmap (future, not implemented)

- Blog / game devlog / changelog
- itch.io / Steam links (fields already reserved in `GAME_INFO`)
- Discord, YouTube, Twitch
- Newsletter / contact
- Real game media (screenshots, trailer)
- GitHub repository cards (live from the API)

---

Built by hand — no frameworks, no trackers, no nonsense.
