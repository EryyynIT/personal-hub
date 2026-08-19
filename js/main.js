/* =====================================================================
   Personal hub — vanilla JS
   ---------------------------------------------------------------------
   Renders projects, team, socials, support and footer from
   data/content.js. Handles theme switching, mobile menu, header state,
   active nav highlighting and reveal-on-scroll. No dependencies.
   ===================================================================== */

(function () {
  'use strict';

  var CONTENT = window.SITE_CONTENT || {};
  var root = document.documentElement;

  // Mark that JS is active: .js .reveal rules only apply from now on,
  // so content is never hidden when JavaScript is unavailable.
  root.classList.add('js');

  /* ---------- helpers ---------- */
  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $$(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }

  function esc(str) {
    return String(str == null ? '' : str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  /* ---------- inline SVG icons (no external assets) ---------- */
  var ICONS = {
    x: '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>',
    tiktok: '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>',
    telegram: '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>',
    'telegram-personal': '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21.5 2.5 11 13"/><path d="M21.5 2.5 15 21.5l-4-8.5-8.5-4 19-6.5z"/></svg>',
    github: '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>',
    boosty: '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>',
    external: '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><path d="M15 3h6v6"/><path d="M10 14L21 3"/></svg>'
  };

  function icon(id) {
    return ICONS[id] || ICONS.external;
  }

  function isExternal(url) {
    return String(url).indexOf('http') === 0;
  }

  /* ---------- Theme ---------- */
  var themeToggle = $('#theme-toggle');
  var metaTheme = document.querySelector('meta[name="theme-color"]');

  function setTheme(theme) {
    root.setAttribute('data-theme', theme);
    var dark = theme === 'dark';
    if (themeToggle) {
      themeToggle.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
      themeToggle.setAttribute('title', dark ? 'Switch to light theme' : 'Switch to dark theme');
    }
    if (metaTheme) metaTheme.setAttribute('content', dark ? '#0b0e12' : '#faf9f6');
    try { localStorage.setItem('theme', theme); } catch (e) { /* private mode */ }
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      setTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
    });
    // Sync aria-label / title / theme-color with the theme chosen on load.
    setTheme(root.getAttribute('data-theme') || 'dark');
  }

  /* ---------- Mobile menu ---------- */
  var menuToggle = $('#menu-toggle');
  var navLinks = $('#nav-links');
  var headerEl = $('#site-header');

  function setMenu(open) {
    if (!menuToggle || !navLinks || !headerEl) return;
    navLinks.classList.toggle('open', open);
    headerEl.classList.toggle('menu-open', open);
    menuToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    menuToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', function () {
      setMenu(!navLinks.classList.contains('open'));
    });
    $$('.nav-link', navLinks).forEach(function (a) {
      a.addEventListener('click', function () { setMenu(false); });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setMenu(false);
    });
    document.addEventListener('click', function (e) {
      if (navLinks.classList.contains('open') && !e.target.closest('.nav')) setMenu(false);
    });
    window.addEventListener('resize', function () {
      if (window.innerWidth >= 768) setMenu(false);
    });
  }

  /* ---------- Header scrolled state ---------- */
  function onScroll() {
    if (headerEl) headerEl.classList.toggle('is-scrolled', window.scrollY > 8);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Render: projects ---------- */
  function renderProjects() {
    var grid = $('#projects-grid');
    if (!grid) return;
    var list = CONTENT.projects || [];
    if (!list.length) return;

    grid.innerHTML = list.map(function (p) {
      var href = p.url || '#';
      var external = isExternal(href);
      var rel = external ? ' target="_blank" rel="noopener noreferrer"' : '';
      var tech = (p.technologies || []).map(function (t) {
        return '<span class="chip">' + esc(t) + '</span>';
      }).join('');
      var arrow = external ? icon('external') : '<span class="arrow" aria-hidden="true">→</span>';

      return (
        '<article class="card project-card reveal">' +
          '<a class="project-media" href="' + esc(href) + '"' + rel + ' tabindex="-1" aria-hidden="true">' +
            '<img src="' + esc(p.image) + '" alt="' + esc(p.imageAlt || '') + '" loading="lazy" width="640" height="360">' +
            '<span class="project-type">' + esc(p.type || '') + '</span>' +
          '</a>' +
          '<div class="project-body">' +
            '<div class="project-title-row">' +
              '<h3 class="project-title">' + esc(p.title) + '</h3>' +
              (p.status ? '<span class="status-badge">' + esc(p.status) + '</span>' : '') +
            '</div>' +
            '<p class="project-desc">' + esc(p.description) + '</p>' +
            (p.why ? '<p class="project-why">' + esc(p.why) + '</p>' : '') +
            (tech ? '<div class="project-tech">' + tech + '</div>' : '') +
            (href !== '#' ? '<a class="project-link" href="' + esc(href) + '"' + rel + '>' + esc(p.urlLabel || 'View project') + arrow + '</a>' : '') +
          '</div>' +
        '</article>'
      );
    }).join('');
  }

  /* ---------- Render: projects note ---------- */
  function renderProjectsNote() {
    var note = $('#projects-note');
    if (!note) return;
    var gh = CONTENT.github;
    if (gh) {
      note.innerHTML = 'More projects are in progress — follow the repos ' +
        '<a href="' + esc(gh) + '" target="_blank" rel="noopener noreferrer">on GitHub</a>.';
    }
  }

  /* ---------- Render: build areas ---------- */
  function renderBuildAreas() {
    var grid = $('#build-grid');
    if (!grid) return;
    var list = CONTENT.buildAreas || [];

    grid.innerHTML = list.map(function (a) {
      var tech = (a.tech || []).map(function (t) {
        return '<span class="chip">' + esc(t) + '</span>';
      }).join('');
      return (
        '<article class="card build-card reveal">' +
          '<h3 class="build-title">' + esc(a.title) + '</h3>' +
          '<p class="build-desc">' + esc(a.desc) + '</p>' +
          '<div class="build-tech">' + tech + '</div>' +
        '</article>'
      );
    }).join('');
  }

  /* ---------- Render: currently building ---------- */
  function renderBuilding() {
    var linesEl = $('#building-lines');
    if (!linesEl) return;
    var data = CONTENT.building || {};

    linesEl.innerHTML = (data.lines || []).map(function (l) {
      var link = l.url
        ? '<a class="term-link" href="' + esc(l.url) + '"' +
          (isExternal(l.url) ? ' target="_blank" rel="noopener noreferrer"' : '') + '>' +
          esc(l.label || 'more') + '</a>'
        : '';
      return (
        '<p class="term-line" role="listitem">' +
          '<span class="term-bullet" aria-hidden="true">▸</span>' +
          '<span class="term-text">' + esc(l.text) + '</span>' +
          link +
        '</p>'
      );
    }).join('');
  }

  /* ---------- Render: game ---------- */
  function renderGame() {
    var info = CONTENT.game || {};

    var statusText = $('#game-status-text');
    if (statusText && info.status) statusText.textContent = info.status;

    var desc = $('#game-desc');
    if (desc && info.description) desc.textContent = info.description;

    var facts = $('#game-facts');
    if (facts) {
      var rows = [
        { k: 'Status', v: info.status },
        { k: 'Team', v: '2 people' },
        { k: 'Release', v: info.release },
        { k: 'Platforms', v: info.platforms && info.platforms.length ? info.platforms.join(' / ') : null }
      ].filter(function (r) { return r.v; });
      facts.innerHTML = rows.map(function (r) {
        return '<li><span class="fact-label">' + esc(r.k) + '</span><span>' + esc(r.v) + '</span></li>';
      }).join('');
    }

    var gallery = $('#game-gallery');
    if (gallery) {
      var items = (info.gallery || []);
      gallery.innerHTML = items.map(function (g, i) {
        var num = i + 1;
        num = num < 10 ? '0' + num : String(num);
        return (
          '<figure class="game-shot">' +
            '<img src="' + esc(g.src) + '" alt="' + esc(g.alt) + '" loading="lazy" width="640" height="360">' +
            '<figcaption>' + esc(g.label) + ' — ' + num + '</figcaption>' +
          '</figure>'
        );
      }).join('');
    }
  }

  /* ---------- Render: team ---------- */
  function renderTeam() {
    var grid = $('#team-grid');
    if (!grid) return;
    var list = CONTENT.team || [];

    grid.innerHTML = list.map(function (m) {
      var links = (m.links || []).map(function (l) {
        return (
          '<a class="btn btn-ghost btn-sm team-link" href="' + esc(l.url) + '" target="_blank" rel="noopener noreferrer">' +
            '<span class="team-link-icon">' + icon(l.id) + '</span>' +
            '<span>' + esc(l.label) + '</span>' +
            '<span class="team-link-ext">' + icon('external') + '</span>' +
          '</a>'
        );
      }).join('');

      return (
        '<article class="card team-card reveal">' +
          '<div class="team-top">' +
            '<span class="team-avatar" aria-hidden="true">' + esc(m.avatarText || '?') + '</span>' +
            '<div>' +
              '<h3 class="team-name">' + esc(m.name) + '</h3>' +
              '<p class="team-role">' + esc(m.role) + '</p>' +
            '</div>' +
          '</div>' +
          '<p class="team-about">' + esc(m.about) + '</p>' +
          (m.note ? '<p class="team-note">' + esc(m.note) + '</p>' : '') +
          '<div class="team-links">' + links + '</div>' +
        '</article>'
      );
    }).join('');
  }

  /* ---------- Render: socials ---------- */
  function renderSocials() {
    var listEl = $('#social-list');
    if (!listEl) return;
    var list = CONTENT.socials || [];

    listEl.innerHTML = list.map(function (s) {
      return (
        '<li>' +
          '<a class="social-row" href="' + esc(s.url) + '" target="_blank" rel="noopener noreferrer">' +
            '<span class="social-icon">' + icon(s.id) + '</span>' +
            '<span class="social-text">' +
              '<span class="social-label">' + esc(s.label) + '</span>' +
              '<span class="social-handle">' + esc(s.handle || '') + '</span>' +
              '<span class="social-note">' + esc(s.note || '') + '</span>' +
            '</span>' +
            '<span class="social-arrow" aria-hidden="true">' + icon('external') + '</span>' +
          '</a>' +
        '</li>'
      );
    }).join('');
  }

  /* ---------- Render: support ---------- */
  function renderSupport() {
    var grid = $('#support-grid');
    if (!grid) return;
    var sp = CONTENT.support || {};

    var intro = $('#support-intro');
    if (intro && sp.intro) intro.textContent = sp.intro;

    var meUrl = CONTENT.boosty;
    var meBtn = meUrl
      ? '<a class="btn btn-primary btn-block" href="' + esc(meUrl) + '" target="_blank" rel="noopener noreferrer">' + icon('boosty') + '<span>Support on Boosty</span>' + icon('external') + '</a>'
      : '<button class="btn btn-primary btn-block" type="button" disabled title="Boosty link not set yet — add it in data/content.js (boosty)">' + icon('boosty') + '<span>Support on Boosty — coming soon</span></button>';

    var artistUrl = sp.artist && sp.artist.url;
    grid.innerHTML =
      '<div class="card support-card reveal">' +
        '<h3 class="support-title">' + esc((sp.me && sp.me.label) || 'Support me') + '</h3>' +
        '<p class="support-desc">' + esc((sp.me && sp.me.description) || '') + '</p>' +
        meBtn +
      '</div>' +
      '<div class="card support-card reveal">' +
        '<h3 class="support-title">' + esc((sp.artist && sp.artist.label) || 'Support the artist') + '</h3>' +
        '<p class="support-desc">' + esc((sp.artist && sp.artist.description) || '') + '</p>' +
        (artistUrl
          ? '<a class="btn btn-ghost btn-block" href="' + esc(artistUrl) + '" target="_blank" rel="noopener noreferrer">' + icon('boosty') + '<span>Support on Boosty</span>' + icon('external') + '</a>'
          : '') +
      '</div>';
  }

  /* ---------- Render: footer ---------- */
  function renderFooter() {
    var year = $('#year');
    if (year) year.textContent = String(new Date().getFullYear());

    var line = $('#footer-line');
    if (line && CONTENT.footer) line.textContent = CONTENT.footer.line || '';

    var listEl = $('#footer-links');
    if (!listEl) return;
    var links = (CONTENT.footer && CONTENT.footer.links) || [];

    listEl.innerHTML = links.map(function (l) {
      var url = l.url;
      if (l.id === 'github' && !url) url = CONTENT.github || '';
      if (!url) {
        // Placeholder entry (GitHub): muted, non-navigating until configured.
        return (
          '<li><span class="footer-link footer-link-muted" title="GitHub link not set yet — add it in data/content.js (github)">' +
            icon(l.id) + '<span>' + esc(l.label) + '</span>' +
          '</span></li>'
        );
      }
      var external = isExternal(url);
      var rel = external ? ' target="_blank" rel="noopener noreferrer"' : '';
      return (
        '<li><a class="footer-link" href="' + esc(url) + '"' + rel + '>' +
          icon(l.id) + '<span>' + esc(l.label) + '</span>' +
        '</a></li>'
      );
    }).join('');
  }

  /* ---------- Reveal-on-scroll ---------- */
  function initReveal() {
    var els = $$('.reveal');
    if (!els.length) return;
    if (!('IntersectionObserver' in window)) {
      els.forEach(function (el) { el.classList.add('in'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -32px 0px' });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Active nav highlight ---------- */
  function initActiveNav() {
    var links = $$('.nav-link[data-nav]');
    if (!links.length) return;
    var map = {};
    links.forEach(function (a) { map[a.getAttribute('href').slice(1)] = a; });
    var ids = Object.keys(map);
    var ticking = false;

    function update() {
      var pos = window.scrollY + 130;
      var current = ids[0];
      ids.forEach(function (id) {
        var el = document.getElementById(id);
        if (el && el.offsetTop <= pos) current = id;
      });
      links.forEach(function (a) {
        a.classList.toggle('is-active', map[current] === a);
      });
      ticking = false;
    }
    window.addEventListener('scroll', function () {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    }, { passive: true });
    window.addEventListener('resize', update, { passive: true });
    update();
  }

  /* ---------- Init ---------- */
  renderBuildAreas();
  renderProjects();
  renderProjectsNote();
  renderBuilding();
  renderGame();
  renderTeam();
  renderSocials();
  renderSupport();
  renderFooter();
  initReveal();
  initActiveNav();
})();
