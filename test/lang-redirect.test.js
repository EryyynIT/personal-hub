/* Headless test for the language bootstrap embedded in <head> of index.html
   and ru/index.html.

   Behavior under test:
   - Without an explicit choice, the page matches the browser's preferred
     language: EN -> RU for Russian-preferring browsers, RU -> EN for everyone
     else (so shared /ru/ links never trap non-Russian visitors).
   - An explicit choice saved by the EN/RU switcher (localStorage 'lang')
     always wins and redirects to the chosen version regardless of the
     browser language.
   - A broken localStorage must not crash the page or redirect.
*/
const fs = require('fs');
const vm = require('vm');

const enHtml = fs.readFileSync('index.html', 'utf8');
const ruHtml = fs.readFileSync('ru/index.html', 'utf8');

function extractBootstrap(html) {
  const marker = 'Language bootstrap';
  const markerPos = html.indexOf(marker);
  if (markerPos === -1) throw new Error('Language bootstrap marker missing');
  const open = html.indexOf('<script>', markerPos);
  const close = html.indexOf('</script>', open);
  return html.slice(open + '<script>'.length, close).trim();
}

const enScript = extractBootstrap(enHtml);
const ruScript = extractBootstrap(ruHtml);

function run(script, pageLang, opts) {
  opts = opts || {};
  const store = {};
  if (opts.saved) store.lang = opts.saved;

  const calls = [];
  const sandbox = {
    document: {
      documentElement: { getAttribute: (k) => (k === 'lang' ? pageLang : null) }
    },
    navigator: {
      languages: opts.languages,
      language: opts.language,
      userLanguage: opts.userLanguage
    },
    location: { replace: (u) => calls.push(String(u)) },
    localStorage: {
      getItem: (k) => {
        if (opts.brokenStorage) throw new Error('SecurityError');
        return k in store ? store[k] : null;
      },
      setItem: () => { if (opts.brokenStorage) throw new Error('SecurityError'); }
    }
  };

  let threw = false;
  try {
    vm.runInNewContext(script, sandbox, { filename: 'lang-bootstrap.js' });
  } catch (e) {
    threw = true;
  }
  return { calls, threw };
}

const results = { bootstrapIdenticalInBothPages: enScript === ruScript, cases: [] };

function check(name, script, pageLang, opts, expectedCalls) {
  const r = run(script, pageLang, opts);
  const pass = !r.threw && JSON.stringify(r.calls) === JSON.stringify(expectedCalls);
  results.cases.push({ name, pass, expected: expectedCalls, calls: r.calls, threw: r.threw });
}

/* --- No explicit choice: auto-detection (EN page only) --- */
check('en page, ru-preferred browser (navigator.languages) -> redirect to ru/',
  enScript, 'en', { languages: ['ru-RU', 'en-US'], language: 'ru-RU' }, ['ru/']);
check('en page, ru-preferred browser (navigator.language only) -> redirect to ru/',
  enScript, 'en', { language: 'ru' }, ['ru/']);
check('en page, en-preferred browser -> stay', enScript, 'en',
  { languages: ['en-US'], language: 'en-US' }, []);
check('en page, fr-preferred browser -> stay', enScript, 'en',
  { language: 'fr-FR' }, []);
check('en page, ru only second in list -> stay (first preference wins)',
  enScript, 'en', { languages: ['en-US', 'ru'], language: 'en-US' }, []);

/* --- No explicit choice: the RU page sends non-Russian visitors to EN --- */
check('ru page, ru-preferred browser -> stay', ruScript, 'ru', { language: 'ru-RU' }, []);
check('ru page, en-preferred browser -> redirect to ../', ruScript, 'ru',
  { language: 'en-US' }, ['../']);
check('ru page, fr-preferred browser -> redirect to ../', ruScript, 'ru',
  { language: 'fr-FR' }, ['../']);
check('ru page, unknown browser language -> redirect to ../ (falls back to en)',
  ruScript, 'ru', { languages: [], language: undefined }, ['../']);

/* --- Explicit choice stored by the switcher always wins --- */
check('en page, saved=en, ru-preferred browser -> stay', enScript, 'en',
  { saved: 'en', language: 'ru' }, []);
check('en page, saved=ru, en-preferred browser -> redirect to ru/', enScript, 'en',
  { saved: 'ru', language: 'en' }, ['ru/']);
check('ru page, saved=ru, en-preferred browser -> stay', ruScript, 'ru',
  { saved: 'ru', language: 'en' }, []);
check('ru page, saved=en, ru-preferred browser -> redirect to ../', ruScript, 'ru',
  { saved: 'en', language: 'ru' }, ['../']);

/* --- Broken storage must not crash or redirect --- */
check('en page, broken localStorage, ru-preferred browser -> no crash, no redirect',
  enScript, 'en', { brokenStorage: true, language: 'ru' }, []);

let pass = results.bootstrapIdenticalInBothPages;
results.cases.forEach((c) => { if (!c.pass) pass = false; });

console.log(JSON.stringify(results, null, 2));
console.log(pass ? '\n✓ LANGUAGE REDIRECT CHECKS PASSED' : '\n✗ SOME CHECKS FAILED');
process.exit(pass ? 0 : 1);
