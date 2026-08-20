/* Headless smoke test: runs data/content.js + js/main.js against a minimal DOM shim
   in both languages (en / ru) and verifies that all sections render expected content
   with no broken relative URLs. */
const fs = require('fs');
const vm = require('vm');

function makeEl(id) {
  const attrs = {};
  return {
    id,
    innerHTML: '',
    textContent: '',
    offsetTop: 0,
    classList: { add() {}, remove() {}, toggle() {}, contains() { return false; } },
    setAttribute(k, v) { attrs[k] = v; },
    getAttribute(k) { return attrs[k] || null; },
    addEventListener() {},
    querySelector() { return null; },
    querySelectorAll() { return []; },
    closest() { return null; },
    appendChild() {}
  };
}

const ELEMENT_IDS = [
  'theme-toggle', 'menu-toggle', 'nav-links', 'site-header',
  'build-grid', 'projects-grid', 'projects-note', 'building-lines',
  'game-status-text', 'game-desc', 'game-facts', 'game-gallery',
  'team-grid', 'social-list', 'support-grid', 'support-intro', 'year', 'footer-line', 'footer-links'
];

function run(lang) {
  const registry = {};
  ELEMENT_IDS.forEach(id => { registry[id] = makeEl(id); });

  const rootEl = makeEl('html');
  rootEl.setAttribute('data-theme', 'dark');
  rootEl.setAttribute('lang', lang);

  const sandbox = {
    window: {
      SITE_CONTENT: undefined,
      SITE_BASE: undefined,
      location: { pathname: lang === 'ru' ? '/personal-hub/ru/' : '/personal-hub/' },
      matchMedia: () => ({ matches: false }),
      addEventListener() {},
      requestAnimationFrame: (cb) => cb(),
      scrollY: 0,
      innerWidth: 1440
    },
    document: {
      documentElement: rootEl,
      querySelector(sel) {
        if (sel.startsWith('#')) return registry[sel.slice(1)] || null;
        return null; // meta[name="theme-color"] etc.
      },
      querySelectorAll() { return []; },
      addEventListener() {}
    },
    localStorage: { getItem: () => null, setItem() {} },
    console
  };
  sandbox.window.document = sandbox.document;

  const code = fs.readFileSync('data/content.js', 'utf8') + '\n' + fs.readFileSync('js/main.js', 'utf8');
  vm.runInNewContext(code, sandbox, { filename: 'bundle.js' });

  const results = { lang, rootTheme: rootEl.getAttribute('data-theme') };

  const allContent = [
    registry['build-grid'].innerHTML,
    registry['projects-grid'].innerHTML,
    registry['projects-note'].innerHTML,
    registry['building-lines'].innerHTML,
    registry['team-grid'].innerHTML,
    registry['social-list'].innerHTML,
    registry['support-grid'].innerHTML,
    registry['game-facts'].innerHTML,
    registry['game-gallery'].innerHTML,
    registry['footer-links'].innerHTML
  ].join('\n');

  // --- Identity ---
  results.brandUsed = /EryyynIT/.test(allContent) && /github\.com\/EryyynIT/.test(allContent);
  results.noOldHandle = !/Dexter2038|dexter2038/.test(allContent);
  const contentWithoutXHandle = allContent.replace(/x\.com\/EryyynIT|@EryyynIT/g, '');
  results.noMisspelledBrand = !/EryynIT|Eryyn\b|Erynn|EryyynDev|MichaelIT/i.test(contentWithoutXHandle);

  // --- Build areas ---
  const build = registry['build-grid'].innerHTML;
  results.buildAreasRendered = build.includes('Backend') && build.includes('FastAPI') && build.includes('Kubernetes');

  // --- Projects: all 7 present, hierarchy rendered ---
  const proj = registry['projects-grid'].innerHTML;
  results.projectsRendered =
    proj.includes('UndeadOverhaul') &&
    proj.includes('ADNova') &&
    proj.includes('Async Payment Processing Service') &&
    proj.includes('queue') &&
    proj.includes('MailingTGBot') &&
    proj.includes('go-exercises') &&
    proj.includes('Tic-Tac-ToeAI');
  results.projectsHierarchy =
    proj.includes('projects-featured') &&
    proj.includes('projects-compact') &&
    proj.includes('project-card--flagship') &&
    proj.includes('group-title');
  results.adnovaCommercial = proj.includes('status-badge commercial') && proj.includes('commercial-note');
  results.projectsGithubLinks =
    proj.includes('https://github.com/EryyynIT/async-payment-processing-service') &&
    proj.includes('https://github.com/EryyynIT/queue') &&
    proj.includes('https://github.com/EryyynIT/MailingTGBot') &&
    proj.includes('https://github.com/EryyynIT/go-exercises') &&
    proj.includes('https://github.com/EryyynIT/Tic-Tac-ToeAI');
  results.projectsNoUndefined = !/undefined|\[object Object\]/i.test(proj);

  // --- Group titles in the right language ---
  if (lang === 'ru') {
    results.ruLabels = proj.includes('Избранные проекты') && proj.includes('Другие эксперименты');
    results.ruNoEnLabels = !/Selected work|More experiments/.test(proj);
  } else {
    results.enLabels = proj.includes('Selected work') && proj.includes('More experiments');
  }

  // --- Currently building ---
  const building = registry['building-lines'].innerHTML;
  results.buildingRendered = building.includes('UndeadOverhaul') && building.includes('#game');

  // --- Team ---
  const team = registry['team-grid'].innerHTML;
  results.teamRendered = team.includes('EryyynIT');
  results.artistLinks = team.includes('https://x.com/Gemaglobin1') && team.includes('https://boosty.to/manevr');
  results.devLinks = team.includes('https://x.com/EryyynIT') && team.includes('https://www.tiktok.com/@barbaris.yt');
  results.artistNote = team.includes('Bread Catto');

  // --- Socials (Find me) ---
  const socials = registry['social-list'].innerHTML;
  results.socialsRendered =
    socials.includes('https://github.com/EryyynIT') &&
    socials.includes('https://boosty.to/eryyynit') &&
    socials.includes('https://x.com/EryyynIT') &&
    socials.includes('https://www.tiktok.com/@barbaris.yt') &&
    socials.includes('https://t.me/undeadoverhaul') &&
    socials.includes('https://t.me/eprintln');

  // --- Support ---
  const support = registry['support-grid'].innerHTML;
  results.supportMeBoosty = support.includes('https://boosty.to/eryyynit') && support.includes('btn-primary');
  results.supportArtist = support.includes('https://boosty.to/manevr');

  // --- Game ---
  results.gameStatus = lang === 'ru'
    ? registry['game-status-text'].textContent === 'В разработке'
    : registry['game-status-text'].textContent === 'In development';
  results.gameFacts = registry['game-facts'].innerHTML.length > 0;
  const gallery = registry['game-gallery'].innerHTML;
  results.galleryRendered = gallery.includes('screenshot-01.svg') && gallery.includes('concept-01.svg');

  // --- Footer ---
  const footer = registry['footer-links'].innerHTML;
  results.footerX = footer.includes('https://x.com/EryyynIT');
  results.footerGithub = footer.includes('https://github.com/EryyynIT') && !footer.includes('footer-link-muted');
  results.footerGame = footer.includes('#game') && footer.includes('UndeadOverhaul');

  // --- URL integrity: every rendered relative URL must point to an existing file.
  //     Inside /ru/ and /en/ subfolders main.js prefixes assets with "../",
  //     so strip that prefix before checking against the repo root. ---
  const refs = [...allContent.matchAll(/(?:href|src)="([^"]+)"/g)].map(m => m[1]);
  const relative = refs.filter(u => !u.startsWith('#') && !u.startsWith('http'));
  const missing = relative
    .map(u => u.startsWith('../') ? u.slice(3) : u)
    .filter(u => !fs.existsSync(u));
  results.relativeRefs = relative;
  results.missingFiles = missing;
  results.allRelativeResolve = missing.length === 0;

  // --- External URLs sanity (no placeholder text leaking into links) ---
  const badPlaceholders = refs.filter(u => /YOUR-|PUT_|undefined/i.test(u));
  results.placeholderLeakInLinks = badPlaceholders;

  return results;
}

const allResults = { en: run('en'), ru: run('ru') };

console.log(JSON.stringify(allResults, null, 2));

let pass = true;
Object.entries(allResults).forEach(([lang, results]) => {
  Object.entries(results).forEach(([k, v]) => {
    if (k === 'relativeRefs' || k === 'lang' || k === 'rootTheme') return;
    if (v === false || (Array.isArray(v) && v.length)) { pass = false; console.error(`FAIL [${lang}]:`, k, v); }
  });
});
console.log(pass ? '\n✓ ALL CHECKS PASSED' : '\n✗ SOME CHECKS FAILED');
process.exit(pass ? 0 : 1);
