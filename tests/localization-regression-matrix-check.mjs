import assert from 'node:assert/strict';
import fs from 'node:fs';
const matrix=fs.readFileSync('docs/localization-regression-matrix.md','utf8');
for (const token of ['visible-text-ar.json','visible-text-fr.json','visible-text-en.json','JSON','OAuth','PKCE','BYOK','OpenAI']) assert.ok(matrix.includes(token), token);
const spec=fs.readFileSync('tests/hosted-demo-browser-evidence.spec.mjs','utf8');
for (const token of ['collectVisibleTextSnapshot','visible-text-ar.json','visible-text-fr.json','visible-text-en.json','unexpected_english_residuals']) assert.ok(spec.includes(token), token);
assert.ok(!/\bEVIDENCE_DIR\b/.test(spec), 'hosted evidence spec must use EVIDENCE_ROOT for visible-text snapshot writes');
assert.ok(spec.includes('path.join(EVIDENCE_ROOT, VISIBLE_TEXT_SNAPSHOT_FILES[locale])'), 'visible-text snapshots must be written into the hosted evidence artifact root');
for (const residual of [
  'scores explain prioritization not truth',
  'Scores explain prioritization, not truth',
  'Attention = public visibility',
  'Attention = visibilité'
]) assert.ok(spec.includes(residual), `visible-text residual guard must catch ${residual}`);
assert.ok(fs.readFileSync('src/research/render-helpers.js','utf8').includes('scores_explain_prioritization_not_truth'), 'localized status guard must cover scoring policy fallback tokens');

console.log('Localization regression matrix checks passed.');

for (const token of [
  'switchLocaleForVisibleTextSnapshot',
  'expected_locale_markers',
  'locale_snapshot_passed',
  "toMatchObject({ html_lang: 'ar', html_dir: 'rtl', locale_snapshot_passed: true })",
  "toMatchObject({ html_lang: 'fr', html_dir: 'ltr', locale_snapshot_passed: true })",
  "toMatchObject({ html_lang: 'en', html_dir: 'ltr', locale_snapshot_passed: true })"
]) assert.ok(spec.includes(token), token);
assert.ok(!spec.includes("localStorage.setItem('jarbou3i-language'"), 'visible-text snapshots must switch through the real UI language controls, not mutate storage/html directly');
assert.ok(spec.includes("if (node.closest('noscript')) return false;"), 'visible-text snapshots must ignore noscript fallback copy');
