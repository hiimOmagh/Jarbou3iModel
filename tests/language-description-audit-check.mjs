import assert from 'node:assert/strict';
import fs from 'node:fs';

const VERSION = '1.1.0-alpha.11';
const audit = fs.readFileSync('docs/language-description-audit.md', 'utf8');
const app = fs.readFileSync('src/app.js', 'utf8');
const index = fs.readFileSync('index.html', 'utf8');
const manifest = JSON.parse(fs.readFileSync('manifest.webmanifest', 'utf8'));
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));

function extractI18n(source) {
  const start = source.indexOf('const I18N=');
  assert.notEqual(start, -1, 'I18N catalog missing');
  const valueStart = start + 'const I18N='.length;
  const end = source.indexOf('\nconst PILLARS', valueStart);
  assert.ok(end > valueStart, 'I18N catalog end marker missing');
  let text = source.slice(valueStart, end).trim();
  if (text.endsWith(';')) text = text.slice(0, -1);
  return JSON.parse(text);
}
function flattenKeys(value, prefix = '') {
  if (Array.isArray(value)) return value.map((_, index) => `${prefix}[${index}]`);
  if (value && typeof value === 'object') {
    return Object.entries(value).flatMap(([key, child]) => flattenKeys(child, prefix ? `${prefix}.${key}` : key));
  }
  return [prefix];
}
function allStrings(value) {
  if (typeof value === 'string') return [value];
  if (Array.isArray(value)) return value.flatMap(allStrings);
  if (value && typeof value === 'object') return Object.values(value).flatMap(allStrings);
  return [];
}

const i18n = extractI18n(app);
assert.equal(pkg.version, VERSION);
assert.ok(audit.includes(`Version: \`${VERSION}\``));
assert.deepEqual(Object.keys(i18n).sort(), ['ar', 'en', 'fr']);
const referenceKeys = flattenKeys(i18n.en).sort();
for (const lang of ['ar', 'en', 'fr']) {
  assert.deepEqual(flattenKeys(i18n[lang]).sort(), referenceKeys, `${lang} i18n key structure drifted`);
  for (const text of allStrings(i18n[lang])) {
    assert.equal(text.trim(), text, `${lang} text has leading/trailing whitespace: ${text}`);
    assert.ok(text.length > 0, `${lang} text must not be empty`);
  }
}
for (const [lang, expected] of Object.entries({
  ar: 'مساحة عمل استخباراتية الطابع',
  en: 'inspectable, export-ready strategic review',
  fr: 'revue stratégique vérifiable et exportable'
})) {
  assert.ok(i18n[lang].appSubtitle.includes(expected), `${lang} appSubtitle not professionally localized`);
}
for (const forbidden of ['friendly visual guide', 'convivial', 'رفيق بصري']) {
  assert.equal(app.includes(forbidden), false, `informal product copy must be removed: ${forbidden}`);
}
for (const [lang, text] of Object.entries({ ar: i18n.ar.pillars.interests[1], en: i18n.en.pillars.interests[1], fr: i18n.fr.pillars.interests[1] })) {
  assert.ok(text.length >= 60, `${lang} pillar description must be explanatory, not a label`);
}
assert.ok(index.includes('<html lang="ar" dir="rtl">'), 'Arabic RTL shell must remain default');
assert.ok(index.includes('Jarbou3i Research Engine is a trilingual, source-aware research-to-strategy workspace'), 'index meta description must be accurate and professional');
assert.ok(index.includes('Trilingual, client-side strategic research workbench'), 'OpenGraph description must be accurate and professional');
assert.ok(manifest.description.includes('Trilingual public-demo research-to-strategy workspace'), 'web manifest description must be professional and accurate');
const metadataCorpus = [
  ...Array.from(index.matchAll(/<meta[^>]+content="([^"]*)"/g)).map((match) => match[1]),
  manifest.description
].join('\n').toLowerCase();
for (const unavailableClaim of ['live scraping', 'production OAuth', 'automated source verification']) {
  assert.equal(metadataCorpus.includes(unavailableClaim.toLowerCase()), false, `public metadata must not claim unavailable capability: ${unavailableClaim}`);
}

console.log('Language description audit checks passed.');
process.exit(0);
