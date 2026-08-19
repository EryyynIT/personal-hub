/* =====================================================================
   Personal hub — site content & configuration
   ---------------------------------------------------------------------
   This file is the single source of truth for editable content:
   placeholders, socials, projects, team, game info, support and footer.

   HOW TO USE
   - Replace every "TODO:" before publishing.
   - Do NOT invent facts that aren't confirmed.
   - After editing, no other file needs to change (rendering reads this).
   ===================================================================== */

'use strict';

/* --- Placeholders that need your input --------------------------------
   These stay empty until you add real URLs. The UI handles empty values
   gracefully (buttons render as "coming soon", links are hidden).
   -------------------------------------------------------------------- */
const SOCIALS = {
  boosty: "",        // TODO: put your Boosty URL here, e.g. "https://boosty.to/your-name"
  github: "",        // TODO: put your GitHub profile URL here, e.g. "https://github.com/your-name"
  canonicalUrl: ""   // TODO: your canonical URL, e.g. "https://your-name.github.io/personal-hub/"
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
    "UndeadOverhaul is a two-person indie game project. Michael handles the code and engineering, " +
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
  name: "Michael",
  role: "Developer · GameDev · Builder",
  tagline: "I build software, games, and things that weren't here yesterday."
};

/* --- Projects ---------------------------------------------------------
   Cards are rendered from this array. Add new projects here and they
   appear on the page automatically. Fields: title, type, status,
   description, technologies[], url, urlLabel, image, imageAlt.
   -------------------------------------------------------------------- */
const projects = [
  {
    title: "UndeadOverhaul",
    type: "GameDev",
    status: "In development",
    description:
      "An indie game project in active development, built as a two-person team — " +
      "code and engineering by Michael, art and visual development by the artist.",
    technologies: ["Indie Game", "Two-person team"],
    url: "#game",
    urlLabel: "See the project",
    image: "assets/game/cover.svg",
    imageAlt: "UndeadOverhaul — placeholder cover art"
  }
];

/* --- Team --------------------------------------------------------------
   Two people behind UndeadOverhaul. Keep roles and links factual.
   -------------------------------------------------------------------- */
const team = [
  {
    name: "Michael",
    role: "Developer / Programmer",
    about: "Code, systems and everything that makes the game actually run.",
    avatarText: "M",
    links: [
      { id: "x", label: "X", url: "https://x.com/Eryyyn_IT" },
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

/* --- Social links (Find me section) ---------------------------------- */
const socials = [
  {
    id: "x",
    label: "X",
    handle: "@Eryyyn_IT",
    url: "https://x.com/Eryyyn_IT",
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
    label: "Telegram",
    handle: "t.me/undeadoverhaul",
    url: "https://t.me/undeadoverhaul",
    note: "Official UndeadOverhaul development channel — devlogs and game updates (not a personal profile)."
  }
];

/* --- Support -----------------------------------------------------------
   Two separate CTAs on purpose: the developer and the artist are
   supported independently. Never merge them into one button.
   -------------------------------------------------------------------- */
const support = {
  intro: "If you enjoy what I build — the game, the devlogs, the experiments — you can support the people behind it.",
  me: {
    label: "Support me",
    description:
      "Support Michael's work — the game and the projects that come after it. " +
      "Your Boosty link appears here once configured."
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
    { id: "x", label: "X", url: "https://x.com/Eryyyn_IT" },
    { id: "github", label: "GitHub", url: "" }, // filled from SOCIALS.github — hidden until set
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
