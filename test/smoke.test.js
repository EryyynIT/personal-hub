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
 'projects-grid', 'projects-note', 'game-status-text', 'game-desc', 'game-facts', 'game-gallery',
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

// --- Projects ---
const proj = registry['projects-grid'].innerHTML;
results.projectsRendered = proj.includes('UndeadOverhaul') && proj.includes('GameDev') && proj.includes('In development');
results.projectsNoUndefined = !/undefined|\[object Object\]/i.test(proj);

// --- Team ---
const team = registry['team-grid'].innerHTML;
results.teamRendered = team.includes('Developer / Programmer') && team.includes('Artist / Visual Development');
results.artistLinks = team.includes('https://x.com/Gemaglobin1') && team.includes('https://boosty.to/manevr');
results.michaelLinks = team.includes('https://x.com/Eryyyn_IT') && team.includes('https://www.tiktok.com/@barbaris.yt');

// --- Socials ---
const socials = registry['social-list'].innerHTML;
results.socialsRendered = socials.includes('https://x.com/Eryyyn_IT') &&
  socials.includes('https://www.tiktok.com/@barbaris.yt') &&
  socials.includes('https://t.me/undeadoverhaul');

// --- Support ---
const support = registry['support-grid'].innerHTML;
results.supportMePlaceholder = support.includes('Support me — coming soon'); // boosty empty -> disabled button
results.supportArtist = support.includes('https://boosty.to/manevr');
results.supportSeparated = !/support me on boosty[\s\S]*support the artist[\s\S]*support me on boosty/i.test('');

// --- Game ---
results.gameStatus = registry['game-status-text'].textContent === 'In development';
results.gameFacts = registry['game-facts'].innerHTML.includes('2 people');
const gallery = registry['game-gallery'].innerHTML;
results.galleryRendered = gallery.includes('screenshot-01.svg') && gallery.includes('concept-01.svg');

// --- Footer ---
const footer = registry['footer-links'].innerHTML;
results.footerX = footer.includes('https://x.com/Eryyyn_IT');
results.footerGithubMuted = footer.includes('footer-link-muted'); // placeholder, non-navigating
results.footerGame = footer.includes('#game') && footer.includes('UndeadOverhaul');

// --- URL integrity: every rendered relative URL must point to an existing file ---
const allHtml = [proj, team, socials, support, gallery, footer].join('\n');
const refs = [...allHtml.matchAll(/(?:href|src)="([^"]+)"/g)].map(m => m[1]);
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
