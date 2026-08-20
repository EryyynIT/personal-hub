/* Headless smoke test: runs data/content.js + js/main.js against a minimal DOM shim
   and verifies that all sections render expected content with no broken URLs. */
const fs = require('fs');
const vm = require('vm');

const registry = {};
function makeEl(id) {
  return {
    id,
    innerHTML: '',
    textContent: '',
    offsetTop: 0,
    classList: { add() {}, remove() {}, toggle() {}, contains() { return false; } },
    setAttribute() {}, getAttribute() { return null; },
    addEventListener() {},
    querySelector() { return null; },
    querySelectorAll() { return []; },
    closest() { return null; },
    appendChild() {}
  };
}

['theme-toggle', 'menu-toggle', 'nav-links', 'site-header',
 'build-grid', 'projects-grid', 'projects-note', 'building-lines',
 'game-status-text', 'game-desc', 'game-facts', 'game-gallery',
 'team-grid', 'social-list', 'support-grid', 'support-intro', 'year', 'footer-line', 'footer-links'
].forEach(id => { registry[id] = makeEl(id); });

const rootEl = makeEl('html');
rootEl.setAttribute('data-theme', 'dark');

const sandbox = {
  window: {
    SITE_CONTENT: undefined,
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

const results = {};
results.rootTheme = rootEl.getAttribute('data-theme');

const allContent = [
  registry['build-grid'].innerHTML,
  registry['projects-grid'].innerHTML,
  registry['building-lines'].innerHTML,
  registry['team-grid'].innerHTML,
  registry['social-list'].innerHTML,
  registry['support-grid'].innerHTML,
  registry['game-facts'].innerHTML,
  registry['game-gallery'].innerHTML,
  registry['footer-links'].innerHTML
].join('\n');

// --- Identity: EryyynIT everywhere, old identities nowhere ---
results.brandUsed = /EryyynIT/.test(allContent) && /github\.com\/EryyynIT/.test(allContent);
results.noOldHandle = !/Dexter2038|dexter2038/.test(allContent);
// X's existing handle is @EryyynIT (a real external account) — strip it before checking for brand misspellings.
const contentWithoutXHandle = allContent.replace(/x\.com\/EryyynIT|@EryyynIT/g, '');
results.noMisspelledBrand = !/EryynIT|Eryyn\b|Erynn|EryyynDev|MichaelIT/i.test(contentWithoutXHandle);
results.noOldTitle = !/Michael — Developer/.test(allContent);

// --- Build areas ---
const build = registry['build-grid'].innerHTML;
results.buildAreasRendered = ['Backend', 'Infrastructure', 'Experiments'].every(t => build.includes(t));
results.buildTech = build.includes('FastAPI') && build.includes('Kubernetes');

// --- Projects ---
const proj = registry['projects-grid'].innerHTML;
results.projectsRendered =
  proj.includes('UndeadOverhaul') &&
  proj.includes('Async Payment Processing Service') &&
  proj.includes('queue') &&
  proj.includes('MailingTGBot') &&
  proj.includes('go-exercises') &&
  proj.includes('Tic-Tac-ToeAI');
results.projectsGithubLinks =
  proj.includes('https://github.com/EryyynIT/async-payment-processing-service') &&
  proj.includes('https://github.com/EryyynIT/queue') &&
  proj.includes('https://github.com/EryyynIT/go-exercises');
results.projectsNoUndefined = !/undefined|\[object Object\]/i.test(proj);

// --- Currently building ---
const building = registry['building-lines'].innerHTML;
results.buildingRendered = building.includes('UndeadOverhaul') && building.includes('#game');

// --- Team ---
const team = registry['team-grid'].innerHTML;
results.teamRendered = team.includes('Developer / Programmer') && team.includes('Artist / Visual Development');
results.artistLinks = team.includes('https://x.com/Gemaglobin1') && team.includes('https://boosty.to/manevr');
results.devLinks = team.includes('https://x.com/EryyynIT') && team.includes('https://www.tiktok.com/@barbaris.yt');

// --- Socials (Find me) ---
const socials = registry['social-list'].innerHTML;
results.socialsRendered =
  socials.includes('https://github.com/EryyynIT') &&
  socials.includes('https://boosty.to/eryyynit') &&
  socials.includes('https://x.com/EryyynIT') &&
  socials.includes('https://www.tiktok.com/@barbaris.yt') &&
  socials.includes('https://t.me/undeadoverhaul');

// --- Support ---
const support = registry['support-grid'].innerHTML;
results.supportMeBoosty = support.includes('Support EryyynIT') && support.includes('Support on Boosty') && support.includes('https://boosty.to/eryyynit'); // boosty configured -> real link
results.supportArtist = support.includes('https://boosty.to/manevr');

// --- Game ---
results.gameStatus = registry['game-status-text'].textContent === 'In development';
results.gameFacts = registry['game-facts'].innerHTML.includes('2 people');
const gallery = registry['game-gallery'].innerHTML;
results.galleryRendered = gallery.includes('screenshot-01.svg') && gallery.includes('concept-01.svg');

// --- Footer ---
const footer = registry['footer-links'].innerHTML;
results.footerX = footer.includes('https://x.com/EryyynIT');
results.footerGithub = footer.includes('https://github.com/EryyynIT') && !footer.includes('footer-link-muted'); // github configured -> real, navigable link
results.footerGame = footer.includes('#game') && footer.includes('UndeadOverhaul');

// --- URL integrity: every rendered relative URL must point to an existing file ---
const refs = [...allContent.matchAll(/(?:href|src)="([^"]+)"/g)].map(m => m[1]);
const relative = refs.filter(u => !u.startsWith('#') && !u.startsWith('http'));
const missing = relative.filter(u => !fs.existsSync(u));
results.relativeRefs = relative;
results.missingFiles = missing;
results.allRelativeResolve = missing.length === 0;

// --- External URLs sanity (no placeholder text leaking into links) ---
const badPlaceholders = refs.filter(u => /YOUR-|PUT_|\.\.\/|undefined/i.test(u));
results.placeholderLeakInLinks = badPlaceholders;

console.log(JSON.stringify(results, null, 2));

let pass = true;
Object.entries(results).forEach(([k, v]) => {
  if (k === 'relativeRefs') return;
  if (v === false || (Array.isArray(v) && v.length)) { pass = false; console.error('FAIL:', k, v); }
});
console.log(pass ? '\n✓ ALL CHECKS PASSED' : '\n✗ SOME CHECKS FAILED');
process.exit(pass ? 0 : 1);
