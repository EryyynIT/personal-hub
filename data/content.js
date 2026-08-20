/* =====================================================================
   Personal hub — site content & configuration
   ---------------------------------------------------------------------
   This file is the single source of truth for editable content:
   identity, build areas, projects, current work, socials, team,
   game info, support and footer.

   HOW TO USE
   - Replace every "TODO:" before publishing.
   - Do NOT invent facts that aren't confirmed.
   - After editing, no other file needs to change (rendering reads this).
   ===================================================================== */

'use strict';

const SOCIALS = {
  boosty: "https://boosty.to/eryyynit",
  github: "https://github.com/EryyynIT",
  canonicalUrl: "https://eryyynit.github.io/personal-hub/"
};

/* --- UndeadOverhaul ---------------------------------------------------
   Only fill fields you can confirm. Leave unknown fields null / empty.
   The gallery uses local placeholder SVGs — replace them with real
   screenshots / concept art (webp recommended) in /assets/game.
   -------------------------------------------------------------------- */
const GAME_INFO = {
  title: "UndeadOverhaul",
  tagline: "An indie game in active development.",
  status: "In development",
  description:
    "UndeadOverhaul is a two-person indie game project. EryyynIT handles the code and engineering, " +
    "the artist owns the visual development. We're building it in the open — progress and devlogs " +
    "land on the official Telegram channel.",
  // TODO: fill in only confirmed facts — do not invent:
  release: null,      // e.g. "TBA" or a year once announced
  platforms: [],      // e.g. ["PC"]
  storeUrl: null,     // TODO: Steam / itch.io link once available
  gallery: [
    { src: "assets/game/screenshot-01.svg", alt: "UndeadOverhaul — placeholder screenshot 01", label: "Screenshot" },
    { src: "assets/game/screenshot-02.svg", alt: "UndeadOverhaul — placeholder screenshot 02", label: "Screenshot" },
    { src: "assets/game/concept-01.svg",   alt: "UndeadOverhaul — placeholder concept art 01", label: "Concept art" }
  ]
};

/* --- Site-wide identity ---------------------------------------------- */
const siteConfig = {
  name: "EryyynIT",
  person: "Michael",          // legal/first name — mentioned in About, never the brand
  role: "Backend Developer · Go / Python",
  tagline: "I build software, games, and things that weren't here yesterday."
};

/* --- What I build -----------------------------------------------------
   Three lanes shown instead of skill bars. Each card renders
   automatically: title, description, technology chips.
   -------------------------------------------------------------------- */
const buildAreas = [
  {
    title: "Backend",
    desc: "Services, APIs and the systems that hold things together.",
    tech: ["Go", "Python", "FastAPI", "PostgreSQL", "Redis", "Kafka"]
  },
  {
    title: "Infrastructure",
    desc: "Getting things to build, ship and stay observable.",
    tech: ["Docker", "Kubernetes", "CI/CD", "Prometheus", "Grafana"]
  },
  {
    title: "Experiments",
    desc: "AI tools, game prototypes and small things built to learn something.",
    tech: ["AI", "Game development", "Prototypes", "Tools"]
  }
];

/* --- Projects ---------------------------------------------------------
   Cards are rendered from this array. Add new projects here and they
   appear on the page automatically. Fields: title, type, status,
   description, technologies[], why?, url, urlLabel, image, imageAlt.
   -------------------------------------------------------------------- */
const projects = [
  {
    title: "UndeadOverhaul",
    type: "GameDev",
    status: "In development",
    description:
      "An indie game project in active development, built as a two-person team — " +
      "code and engineering by EryyynIT, art and visual development by the artist.",
    technologies: ["Indie Game", "Two-person team"],
    why: "Building a game in the open — devlogs on Telegram, progress visible as it happens.",
    url: "#game",
    urlLabel: "See the project",
    image: "assets/game/cover.svg",
    imageAlt: "UndeadOverhaul — placeholder cover art"
  },
  {
    title: "Async Payment Processing Service",
    type: "Backend · Python",
    status: "Experiment",
    description:
      "An event-driven payment microservice built with FastAPI and RabbitMQ — outbox pattern, " +
      "dead letter queue, idempotency and webhook notifications. A deep-dive into reliable " +
      "messaging and retry logic.",
    technologies: ["FastAPI", "RabbitMQ", "PostgreSQL", "Docker"],
    why: "Built to get comfortable with event-driven architecture and failure handling in real systems.",
    url: "https://github.com/EryyynIT/async-payment-processing-service",
    urlLabel: "View on GitHub",
    image: "assets/projects/async-payment.svg",
    imageAlt: "Async Payment Processing Service — placeholder cover"
  },
  {
    title: "queue",
    type: "Backend · Go",
    status: "Experiment",
    description:
      "A small in-memory queue broker written in Go, stdlib only, exposed over an HTTP API " +
      "with two endpoints. Built to understand FIFO semantics and concurrency without a " +
      "framework in the way.",
    technologies: ["Go", "stdlib", "HTTP API"],
    why: "Wanted to feel how a queue works from the inside before reaching for the big tools.",
    url: "https://github.com/EryyynIT/queue",
    urlLabel: "View on GitHub",
    image: "assets/projects/queue.svg",
    imageAlt: "queue — placeholder cover"
  },
  {
    title: "MailingTGBot",
    type: "Bot · Python",
    status: "Tool",
    description:
      "A Telegram broadcasting bot in aiogram v3 — admin, sub-admin and moderator management, " +
      "plus a mailing system that sends messages to users.",
    technologies: ["Python", "aiogram v3"],
    why: "A real-world tool that had to handle roles, permissions and bulk messaging.",
    url: "https://github.com/EryyynIT/MailingTGBot",
    urlLabel: "View on GitHub",
    image: "assets/projects/mailing-tgbot.svg",
    imageAlt: "MailingTGBot — placeholder cover"
  },
  {
    title: "go-exercises",
    type: "Learning · Go",
    status: "Ongoing",
    description:
      "Self-made Go exercises — goroutines, channels, workers, select, cancellation, error " +
      "handling and project layout — each one a small task with a written solution.",
    technologies: ["Go", "Concurrency"],
    why: "The most honest way to learn a language: write the exercises yourself.",
    url: "https://github.com/EryyynIT/go-exercises",
    urlLabel: "View on GitHub",
    image: "assets/projects/go-exercises.svg",
    imageAlt: "go-exercises — placeholder cover"
  },
  {
    title: "Tic-Tac-ToeAI",
    type: "Game · Python",
    status: "Prototype",
    description:
      "A Pygame tic-tac-toe you can play against an AI. An early experiment — the one that " +
      "started the habit of building small games.",
    technologies: ["Python", "Pygame"],
    why: "Small games are the best way to keep the fun in programming.",
    url: "https://github.com/EryyynIT/Tic-Tac-ToeAI",
    urlLabel: "View on GitHub",
    image: "assets/projects/tic-tac-toe-ai.svg",
    imageAlt: "Tic-Tac-ToeAI — placeholder cover"
  }
];

/* --- Currently building ----------------------------------------------
   Rendered as a terminal-styled block. Only real, verifiable work —
   keep it honest.
   -------------------------------------------------------------------- */
const building = {
  lines: [
    {
      text: "UndeadOverhaul — an indie game in active development.",
      url: "#game",
      label: "see the game"
    },
    {
      text: "Backend experiments — a Go queue broker and a FastAPI payment microservice.",
      url: "https://github.com/EryyynIT",
      label: "on GitHub"
    },
    {
      text: "Go exercises — goroutines, channels, workers and the rest.",
      url: "https://github.com/EryyynIT/go-exercises",
      label: "repo"
    }
  ]
};

/* --- Team --------------------------------------------------------------
   Two people behind UndeadOverhaul. Keep roles and links factual.
   -------------------------------------------------------------------- */
const team = [
  {
    name: "EryyynIT",
    role: "Developer / Programmer",
    about: "Code, systems and everything that makes the game actually run.",
    avatarText: "E",
    links: [
      { id: "x", label: "X", url: "https://x.com/EryyynIT" },
      { id: "tiktok", label: "TikTok", url: "https://www.tiktok.com/@barbaris.yt" }
    ]
  },
  {
    name: "Artist",
    role: "Artist / Visual Development",
    about: "Visuals, art direction and everything the player sees on screen.",
    avatarText: "A",
    note: "Shown as Bread Catto on Boosty.",
    links: [
      { id: "x", label: "X", url: "https://x.com/Gemaglobin1" },
      { id: "boosty", label: "Boosty", url: "https://boosty.to/manevr" }
    ]
  }
];

/* --- Find me (social links) ------------------------------------------ */
const socials = [
  {
    id: "github",
    label: "GitHub",
    handle: "@EryyynIT",
    url: "https://github.com/EryyynIT",
    note: "Code, projects and experiments — everything I build lives here."
  },
  {
    id: "boosty",
    label: "Boosty",
    handle: "@EryyynIT",
    url: "https://boosty.to/eryyynit",
    note: "Devlogs, technical notes and support for independent development."
  },
  {
    id: "x",
    label: "X",
    handle: "@EryyynIT",
    url: "https://x.com/EryyynIT",
    note: "Personal developer account — projects, experiments, updates."
  },
  {
    id: "tiktok",
    label: "TikTok",
    handle: "@barbaris.yt",
    url: "https://www.tiktok.com/@barbaris.yt",
    note: "Dev content and behind-the-scenes of what I build."
  },
  {
    id: "telegram",
    label: "Telegram (Channel)",
    handle: "t.me/undeadoverhaul",
    url: "https://t.me/undeadoverhaul",
    note: "Official UndeadOverhaul development channel — devlogs and game updates (not a personal profile)."
  },
  {
    id: "telegram-personal",
    label: "Telegram (Personal)",
    handle: "t.me/eprintln",
    url: "https://t.me/eprintln",
    note: "Direct line to me — best for quick questions and casual chat."
  }
];

/* --- Support -----------------------------------------------------------
   Two separate CTAs on purpose: the developer and the artist are
   supported independently. Never merge them into one button.
   -------------------------------------------------------------------- */
const support = {
  intro: "If you enjoy what I build — the game, the devlogs, the experiments — you can support the people behind it.",
  me: {
    label: "Support EryyynIT",
    description:
      "Support the developer's work — the game and the projects that come after it.",
    url: "https://boosty.to/eryyynit"
  },
  artist: {
    label: "Support the artist",
    description:
      "Support the artist behind UndeadOverhaul's visuals — known as Bread Catto on Boosty.",
    url: "https://boosty.to/manevr"
  }
};

/* --- Footer ----------------------------------------------------------- */
const footer = {
  line: "Built by hand — no frameworks, no trackers, no nonsense.",
  links: [
    { id: "x", label: "X", url: "https://x.com/EryyynIT" },
    { id: "github", label: "GitHub", url: "https://github.com/EryyynIT" },
    { id: "boosty", label: "Boosty", url: "https://boosty.to/eryyynit" },
    { id: "game", label: "UndeadOverhaul", url: "#game" },
    { id: "artist", label: "Artist", url: "https://boosty.to/manevr" },
    { id: "support", label: "Support", url: "#support" }
  ]
};

/* --- Bundle ------------------------------------------------------------
   Exposed to main.js. Do not edit below this line.
   -------------------------------------------------------------------- */
window.SITE_CONTENT = {
  site: siteConfig,
  buildAreas: buildAreas,
  building: building,
  socials: socials,
  projects: projects,
  game: GAME_INFO,
  team: team,
  support: support,
  footer: footer,
  boosty: SOCIALS.boosty,
  github: SOCIALS.github,
  canonicalUrl: SOCIALS.canonicalUrl
};
