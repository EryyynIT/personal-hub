# personal-hub

**EryyynIT's** personal developer hub — a static one-page site that works as a portfolio,
social links hub and showcase for the indie game **UndeadOverhaul**.

> EryyynIT is the public developer identity (pronounced roughly like "Eryn"). Michael is the person behind it.

Built with plain **HTML + CSS + vanilla JS**. No frameworks, no build step, no backend.

```
EryyynIT / Backend Developer · Go / Python
│
├── About
├── Work with me (contact CTA)
├── What I build (Backend / Infrastructure / Experiments)
├── Projects
│   ├── Selected work
│   │   ├── UndeadOverhaul (flagship — game)
│   │   ├── ADNova (commercial · AdTech)
│   │   ├── Async Payment Processing Service (FastAPI / RabbitMQ)
│   │   └── queue (Go)
│   └── More experiments
│       ├── MailingTGBot
│       ├── go-exercises
│       └── Tic-Tac-ToeAI
├── Currently building
├── Game (UndeadOverhaul)
├── Find me (GitHub · Boosty · X · TikTok · Telegram)
└── Support
```

## Languages

- **English (primary)** — `index.html` at the site root (`https://eryyynit.github.io/personal-hub/`)
- **Russian** — `ru/index.html` (`https://eryyynit.github.io/personal-hub/ru/`)

Both pages share one content source — `data/content.js` holds EN + RU data, and `js/main.js`
picks the active language from the `<html lang>` attribute. The compact `EN / RU` switcher
in the header links between the two versions.

## Features

- **Light / dark themes** — toggle, saved to `localStorage`, defaults to `prefers-color-scheme`
- **Responsive** — 320px → 1440px+, mobile hamburger menu
- **Data-driven UI** — build areas, projects, current work, team, socials, support and footer render from `data/content.js` (EN + RU)
- **Project hierarchy** — flagship card, featured grid, compact rows (commercial / selected work / experiments)
- **SEO** — semantic HTML, Open Graph (per-language 1200×630 image), Twitter card, hreflang, favicon, sitemap, robots.txt
- **Accessible** — skip link, aria labels, focus states, keyboard navigation, `prefers-reduced-motion`
- **Fast** — zero external dependencies, inline SVG icons, local placeholder assets

## Structure

```
/
├── index.html              # English page (structure, hero + About copy)
├── ru/
│   └── index.html          # Russian page (full translation)
├── css/
│   └── styles.css          # design tokens (colors) in :root / [data-theme="dark"]
├── js/
│   └── main.js             # rendering (EN/RU), theme, menu, reveal, active nav
├── data/
│   └── content.js          # ← edit content here (single source of truth, EN + RU)
├── assets/
│   ├── game/               # UndeadOverhaul media (placeholders now)
│   ├── projects/           # project card covers (placeholders now)
│   ├── og/                 # Open Graph images (text-generated SVG + PNG render)
│   ├── images/             # legacy og-cover placeholder
│   ├── profile/            # reserved
│   └── icons/              # reserved
├── favicon.svg
├── robots.txt
├── sitemap.xml
└── .github/workflows/pages.yml
```

## Edit content

Everything editable lives in `data/content.js` — identity, build areas, projects, current
work, game info, team, socials, support, footer and UI labels, in **both** languages:

- `CONTENT_EN` — English (primary)
- `CONTENT_RU` — Russian

Add a project in both blocks and it appears on both pages automatically. Relative asset
paths (`assets/...`) are resolved against the page location by `main.js`, so they work both
at the site root and in the `/ru/` subfolder.

## Test

```
node test/smoke.test.js
```

Runs `data/content.js` + `js/main.js` against a minimal DOM shim for both languages and
verifies that all sections render expected content with no broken relative URLs.
