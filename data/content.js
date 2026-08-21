/* =====================================================================
   Personal hub — site content & configuration (EN + RU)
   ---------------------------------------------------------------------
   This file is the single source of truth for editable content:
   identity, build areas, projects, current work, socials, team,
   game info, support, footer and UI labels — in English (primary)
   and Russian.

   HOW TO USE
   - Replace every "TODO:" before publishing.
   - Do NOT invent facts that aren't confirmed.
   - main.js picks the active language from the <html lang> attribute:
     lang="en" -> CONTENT.en, lang="ru" -> CONTENT.ru.
   - Relative asset paths (assets/...) are resolved against the page
     location by main.js, so they work both at the site root and in
     the /ru/ subfolder.
   ===================================================================== */

'use strict';

/* --- Site-wide constants (shared, not localized) --------------------- */
const SITE_BASE = {
  canonicalUrl: "https://eryyynit.github.io/personal-hub/",
  ruUrl: "https://eryyynit.github.io/personal-hub/ru/",
  boosty: "https://boosty.to/eryyynit",
  github: "https://github.com/EryyynIT",
  telegramPersonal: "https://t.me/eprintln"
};

/* =====================================================================
   ENGLISH (primary)
   ===================================================================== */

const CONTENT_EN = {

  /* --- Site-wide identity --- */
  site: {
    name: "EryyynIT",
    person: "Michael",          // legal/first name — mentioned in About, never the brand
    role: "Backend Developer · Go / Python",
    tagline: "I build software, games, and things that weren't here yesterday."
  },

  /* --- UI labels (non-content strings rendered by main.js) ---------- */
  labels: {
    projectsFeatured: "Selected work",
    projectsMore: "More experiments",
    projectsNote: "More projects are in progress — follow the repos",
    projectsOnGithub: "on GitHub",
    supportOnBoosty: "Support on Boosty",
    supportComingSoon: "Support on Boosty — coming soon",
    supportBtnTitle: "Boosty link not set yet — add it in data/content.js (boosty)",
    factStatus: "Status",
    factTeam: "Team",
    factRelease: "Release",
    factPlatforms: "Platforms",
    teamSize: "2 people",
    moreLink: "more",
    viewProject: "View project",
    commercialNote: "Commercial project — details on request."
  },

  /* --- What I build ---------------------------------------------------
     Three lanes shown instead of skill bars. Each card renders
     automatically: title, description, technology chips.
     ------------------------------------------------------------------ */
  buildAreas: [
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
  ],

  /* --- Projects -------------------------------------------------------
     Cards render from this array with a visual hierarchy:
     tier "flagship"  -> full-width featured card
     tier "featured"  -> featured grid card
     tier "compact"   -> compact row (default)
     Fields: title, type, status, description, technologies[], why?,
     url, urlLabel, image, imageAlt, tier, commercial?
     ------------------------------------------------------------------ */
  projects: [
    {
      title: "UndeadOverhaul",
      type: "GameDev",
      status: "In development",
      tier: "flagship",
      description:
        "An indie game built by two people — code and engineering by EryyynIT, " +
        "everything visual by the artist.",
      technologies: ["Indie Game", "Two-person team"],
      why: "Building a game in the open — devlogs on Telegram, progress visible as it happens.",
      url: "#game",
      urlLabel: "See the project",
      image: "assets/game/cover.svg",
      imageAlt: "UndeadOverhaul — placeholder cover art"
    },
    {
      title: "ADNova",
      type: "Commercial · AdTech",
      status: "Commercial",
      tier: "featured",
      commercial: true,
      description:
        "Commercial product in the AdTech / CPA space. My work here is backend and product " +
        "engineering — production development, not a study prototype.",
      technologies: [],
      why: "Commercial experience — production systems, not sandboxes.",
      url: null,
      image: "assets/projects/adnova.svg",
      imageAlt: "ADNova — cover"
    },
    {
      title: "Async Payment Processing Service",
      type: "Backend · Python",
      status: "Experiment",
      tier: "featured",
      description:
        "An event-driven payment microservice built with FastAPI and RabbitMQ — outbox pattern, " +
        "dead letter queue, idempotency and webhook notifications. A hands-on look at reliable " +
        "messaging and retry logic.",
      technologies: ["FastAPI", "RabbitMQ", "PostgreSQL", "Docker"],
      why: "Built to get comfortable with event-driven architecture — and with what happens when a message arrives twice, out of order, or not at all.",
      url: "https://github.com/EryyynIT/async-payment-processing-service",
      urlLabel: "View on GitHub",
      image: "assets/projects/async-payment.svg",
      imageAlt: "Async Payment Processing Service — placeholder cover"
    },
    {
      title: "queue",
      type: "Backend · Go",
      status: "Experiment",
      tier: "featured",
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
      tier: "compact",
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
      tier: "compact",
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
      tier: "compact",
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
  ],

  /* --- Currently building ----------------------------------------------
     Rendered as a terminal-styled block. Only real, verifiable work —
     keep it honest.
     ------------------------------------------------------------------ */
  building: {
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
  },

  /* --- UndeadOverhaul ---------------------------------------------------
     Only fill fields you can confirm. Leave unknown fields null / empty.
     The gallery uses local placeholder SVGs — replace them with real
     screenshots / concept art (webp recommended) in /assets/game.
     ------------------------------------------------------------------ */
  game: {
    title: "UndeadOverhaul",
    tagline: "An indie game in active development.",
    status: "In development",
    description:
      "UndeadOverhaul is a two-person indie game project. EryyynIT handles the code and engineering, " +
      "the artist handles the visual side. We're building it in the open — progress and devlogs " +
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
  },

  /* --- Team --------------------------------------------------------------
     Two people behind UndeadOverhaul. Keep roles and links factual.
     ------------------------------------------------------------------ */
  team: [
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
  ],

  /* --- Find me (social links) ------------------------------------------ */
  socials: [
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
  ],

  /* --- Support -----------------------------------------------------------
     Two separate CTAs on purpose: the developer and the artist are
     supported independently. Never merge them into one button.
     ------------------------------------------------------------------ */
  support: {
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
  },

  /* --- Footer ----------------------------------------------------------- */
  footer: {
    line: "Built by hand — no frameworks, no trackers, no nonsense.",
    links: [
      { id: "x", label: "X", url: "https://x.com/EryyynIT" },
      { id: "github", label: "GitHub", url: "https://github.com/EryyynIT" },
      { id: "boosty", label: "Boosty", url: "https://boosty.to/eryyynit" },
      { id: "game", label: "UndeadOverhaul", url: "#game" },
      { id: "artist", label: "Artist", url: "https://boosty.to/manevr" },
      { id: "support", label: "Support", url: "#support" }
    ]
  },

  /* --- Convenience shortcuts -------------------------------------------- */
  boosty: SITE_BASE.boosty,
  github: SITE_BASE.github,
  canonicalUrl: SITE_BASE.canonicalUrl
};

/* =====================================================================
   RUSSIAN (translation)
   ===================================================================== */

const CONTENT_RU = {

  site: {
    name: "EryyynIT",
    person: "Михаил",          // имя — упоминается в разделе «Обо мне», не бренд
    role: "Backend-разработчик · Go / Python",
    tagline: "Я собираю софт, игры и вещи, которых «вчера не было»."
  },

  labels: {
    projectsFeatured: "Избранные проекты",
    projectsMore: "Другие эксперименты",
    projectsNote: "Ещё проекты в работе — следите за репозиториями",
    projectsOnGithub: "на GitHub",
    supportOnBoosty: "Поддержать на Boosty",
    supportComingSoon: "Поддержать на Boosty — скоро",
    supportBtnTitle: "Ссылка на Boosty ещё не настроена — добавьте её в data/content.js (boosty)",
    factStatus: "Статус",
    factTeam: "Команда",
    factRelease: "Релиз",
    factPlatforms: "Платформы",
    teamSize: "2 человека",
    moreLink: "подробнее",
    viewProject: "Открыть проект",
    commercialNote: "Коммерческий проект — детали по запросу."
  },

  buildAreas: [
    {
      title: "Backend",
      desc: "Сервисы, API и системы, которые держат всё вместе.",
      tech: ["Go", "Python", "FastAPI", "PostgreSQL", "Redis", "Kafka"]
    },
    {
      title: "Инфраструктура",
      desc: "Настройка сборки, деплоя и наблюдаемости.",
      tech: ["Docker", "Kubernetes", "CI/CD", "Prometheus", "Grafana"]
    },
    {
      title: "Эксперименты",
      desc: "AI-инструменты, игровые прототипы и небольшие проекты, сделанные, чтобы чему-то научиться.",
      tech: ["AI", "Game development", "Прототипы", "Инструменты"]
    }
  ],

  projects: [
    {
      title: "UndeadOverhaul",
      type: "GameDev",
      status: "В разработке",
      tier: "flagship",
      description:
        "Инди-игра, которую делают вдвоём, — код и инженерия от EryyynIT, " +
        "весь визуал — от художника.",
      technologies: ["Indie Game", "Команда из двух человек"],
      why: "Игра строится открыто — девлоги в Telegram, прогресс виден в реальном времени.",
      url: "#game",
      urlLabel: "Смотреть проект",
      image: "assets/game/cover.svg",
      imageAlt: "UndeadOverhaul — обложка-заглушка"
    },
    {
      title: "ADNova",
      type: "Коммерческий · AdTech",
      status: "Коммерческий",
      tier: "featured",
      commercial: true,
      description:
        "Коммерческий продукт в сфере AdTech / CPA. Моя работа здесь — backend и product " +
        "engineering: производственная разработка, а не учебный прототип.",
      technologies: [],
      why: "Коммерческий опыт — продакшен-системы, а не песочницы.",
      url: null,
      image: "assets/projects/adnova.svg",
      imageAlt: "ADNova — обложка"
    },
    {
      title: "Async Payment Processing Service",
      type: "Backend · Python",
      status: "Эксперимент",
      tier: "featured",
      description:
        "Событийный платёжный микросервис на FastAPI и RabbitMQ — паттерн outbox, очередь " +
        "мёртвых писем, идемпотентность и вебхук-уведомления. Практический взгляд на надёжный " +
        "обмен сообщениями и логику повторов.",
      technologies: ["FastAPI", "RabbitMQ", "PostgreSQL", "Docker"],
      why: "Создан, чтобы освоить событийную архитектуру — и понять, что происходит, когда сообщение приходит дважды, не в том порядке или не приходит вовсе.",
      url: "https://github.com/EryyynIT/async-payment-processing-service",
      urlLabel: "Смотреть на GitHub",
      image: "assets/projects/async-payment.svg",
      imageAlt: "Async Payment Processing Service — обложка-заглушка"
    },
    {
      title: "queue",
      type: "Backend · Go",
      status: "Эксперимент",
      tier: "featured",
      description:
        "Небольшой in-memory брокер очередей на Go, только стандартная библиотека, HTTP API " +
        "с двумя эндпоинтами. Создан, чтобы понять семантику FIFO и конкурентность без " +
        "фреймворков.",
      technologies: ["Go", "stdlib", "HTTP API"],
      why: "Хотел почувствовать, как очередь работает изнутри, до того как браться за большие инструменты.",
      url: "https://github.com/EryyynIT/queue",
      urlLabel: "Смотреть на GitHub",
      image: "assets/projects/queue.svg",
      imageAlt: "queue — обложка-заглушка"
    },
    {
      title: "MailingTGBot",
      type: "Bot · Python",
      status: "Инструмент",
      tier: "compact",
      description:
        "Telegram-бот для рассылок на aiogram v3 — управление администраторами, субадминами " +
        "и модераторами, плюс система рассылки сообщений пользователям.",
      technologies: ["Python", "aiogram v3"],
      why: "Реальный инструмент, которому пришлось работать с ролями, правами и массовой рассылкой.",
      url: "https://github.com/EryyynIT/MailingTGBot",
      urlLabel: "Смотреть на GitHub",
      image: "assets/projects/mailing-tgbot.svg",
      imageAlt: "MailingTGBot — обложка-заглушка"
    },
    {
      title: "go-exercises",
      type: "Learning · Go",
      status: "В процессе",
      tier: "compact",
      description:
        "Собственные упражнения по Go — горутины, каналы, воркеры, select, отмена операций, " +
        "обработка ошибок и структура проектов: каждая задача с готовым решением.",
      technologies: ["Go", "Конкурентность"],
      why: "Самый честный способ выучить язык — написать упражнения самому.",
      url: "https://github.com/EryyynIT/go-exercises",
      urlLabel: "Смотреть на GitHub",
      image: "assets/projects/go-exercises.svg",
      imageAlt: "go-exercises — обложка-заглушка"
    },
    {
      title: "Tic-Tac-ToeAI",
      type: "Game · Python",
      status: "Прототип",
      tier: "compact",
      description:
        "Крестики-нолики на Pygame, в которые можно играть против ИИ. Ранний эксперимент — " +
        "тот самый, с которого началась привычка собирать маленькие игры.",
      technologies: ["Python", "Pygame"],
      why: "Маленькие игры — лучший способ сохранить в программировании удовольствие.",
      url: "https://github.com/EryyynIT/Tic-Tac-ToeAI",
      urlLabel: "Смотреть на GitHub",
      image: "assets/projects/tic-tac-toe-ai.svg",
      imageAlt: "Tic-Tac-ToeAI — обложка-заглушка"
    }
  ],

  building: {
    lines: [
      {
        text: "UndeadOverhaul — инди-игра в активной разработке.",
        url: "#game",
        label: "смотреть игру"
      },
      {
        text: "Backend-эксперименты — Go queue broker и FastAPI payment microservice.",
        url: "https://github.com/EryyynIT",
        label: "на GitHub"
      },
      {
        text: "Упражнения по Go — горутины, каналы, воркеры и всё остальное.",
        url: "https://github.com/EryyynIT/go-exercises",
        label: "репозиторий"
      }
    ]
  },

  game: {
    title: "UndeadOverhaul",
    tagline: "Инди-игра в активной разработке.",
    status: "В разработке",
    description:
      "UndeadOverhaul — инди-проект команды из двух человек. EryyynIT отвечает за код и " +
      "инженерию, художник — за визуальную часть. Мы строим игру открыто: прогресс и девлоги " +
      "выходят в официальном Telegram-канале.",
    release: null,
    platforms: [],
    storeUrl: null,
    gallery: [
      { src: "assets/game/screenshot-01.svg", alt: "UndeadOverhaul — скриншот-заглушка 01", label: "Скриншот" },
      { src: "assets/game/screenshot-02.svg", alt: "UndeadOverhaul — скриншот-заглушка 02", label: "Скриншот" },
      { src: "assets/game/concept-01.svg",   alt: "UndeadOverhaul — концепт-арт-заглушка 01", label: "Концепт-арт" }
    ]
  },

  team: [
    {
      name: "EryyynIT",
      role: "Разработчик / Программист",
      about: "Код, системы и всё, что заставляет игру действительно работать.",
      avatarText: "E",
      links: [
        { id: "x", label: "X", url: "https://x.com/EryyynIT" },
        { id: "tiktok", label: "TikTok", url: "https://www.tiktok.com/@barbaris.yt" }
      ]
    },
    {
      name: "Художник",
      role: "Художник / Визуальная разработка",
      about: "Визуал, арт-дирекшн и всё, что игрок видит на экране.",
      avatarText: "A",
      note: "На Boosty — Bread Catto.",
      links: [
        { id: "x", label: "X", url: "https://x.com/Gemaglobin1" },
        { id: "boosty", label: "Boosty", url: "https://boosty.to/manevr" }
      ]
    }
  ],

  socials: [
    {
      id: "github",
      label: "GitHub",
      handle: "@EryyynIT",
      url: "https://github.com/EryyynIT",
      note: "Код, проекты и эксперименты — здесь живёт всё, что я создаю."
    },
    {
      id: "boosty",
      label: "Boosty",
      handle: "@EryyynIT",
      url: "https://boosty.to/eryyynit",
      note: "Девлоги, технические заметки и поддержка независимой разработки."
    },
    {
      id: "x",
      label: "X",
      handle: "@EryyynIT",
      url: "https://x.com/EryyynIT",
      note: "Личный аккаунт разработчика — проекты, эксперименты, обновления."
    },
    {
      id: "tiktok",
      label: "TikTok",
      handle: "@barbaris.yt",
      url: "https://www.tiktok.com/@barbaris.yt",
      note: "Контент о разработке и закулисье того, что я создаю."
    },
    {
      id: "telegram",
      label: "Telegram (Канал)",
      handle: "t.me/undeadoverhaul",
      url: "https://t.me/undeadoverhaul",
      note: "Официальный канал разработки UndeadOverhaul — девлоги и новости игры (не личный профиль)."
    },
    {
      id: "telegram-personal",
      label: "Telegram (Личный)",
      handle: "t.me/eprintln",
      url: "https://t.me/eprintln",
      note: "Прямая связь со мной — лучше всего для быстрых вопросов и неформального общения."
    }
  ],

  support: {
    intro: "Если вам нравится то, что я делаю — игра, девлоги, эксперименты — вы можете поддержать людей, которые за этим стоят.",
    me: {
      label: "Поддержать EryyynIT",
      description:
        "Поддержать работу разработчика — игру и проекты, которые будут после неё.",
      url: "https://boosty.to/eryyynit"
    },
    artist: {
      label: "Поддержать художника",
      description:
        "Поддержать художника, который создаёт визуал UndeadOverhaul, — на Boosty он Bread Catto.",
      url: "https://boosty.to/manevr"
    }
  },

  footer: {
    line: "Сделано вручную — без фреймворков, трекеров и лишнего шума.",
    links: [
      { id: "x", label: "X", url: "https://x.com/EryyynIT" },
      { id: "github", label: "GitHub", url: "https://github.com/EryyynIT" },
      { id: "boosty", label: "Boosty", url: "https://boosty.to/eryyynit" },
      { id: "game", label: "UndeadOverhaul", url: "#game" },
      { id: "artist", label: "Художник", url: "https://boosty.to/manevr" },
      { id: "support", label: "Поддержка", url: "#support" }
    ]
  },

  boosty: SITE_BASE.boosty,
  github: SITE_BASE.github,
  canonicalUrl: SITE_BASE.ruUrl
};

/* --- Bundle ------------------------------------------------------------
   main.js picks the active language from the <html lang> attribute.
   Do not edit below this line.
   -------------------------------------------------------------------- */
window.SITE_CONTENT = { en: CONTENT_EN, ru: CONTENT_RU };
window.SITE_BASE = SITE_BASE;
