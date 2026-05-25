import assert from 'node:assert/strict';
import fs from 'node:fs';
const matrix=fs.readFileSync('docs/localization-regression-matrix.md','utf8');
for (const token of ['visible-text-ar.json','visible-text-fr.json','visible-text-en.json','JSON','OAuth','PKCE','BYOK','OpenAI']) assert.ok(matrix.includes(token), token);

const matrixConfig = JSON.parse(fs.readFileSync('tests/evidence/evidence-matrix.config.json', 'utf8'));
assert.equal(matrixConfig.public_version_labels.en, 'v1.3.0-rc.1 Manual Workflow Release Candidate Freeze', 'English public version label must identify v1.3.0-rc.1');
assert.equal(matrixConfig.public_version_labels.ar, 'v1.3.0-rc.1 قائمة إغلاق فجوات المصدر إلى الادعاء', 'Arabic public version label must identify v1.3.0-rc.1');
assert.equal(matrixConfig.public_version_labels.fr, 'v1.3.0-rc.1 File de clôture des écarts source-affirmation', 'French public version label must identify v1.3.0-rc.1');
assert.ok(matrixConfig.language_rules.ar.required.includes('فرق معاينة تجميع الموجز'), 'Arabic evidence matrix must require alpha.5 preview diff copy');
assert.ok(matrixConfig.language_rules.fr.required.includes('Diff aperçu assemblage du brief'), 'French evidence matrix must require alpha.5 preview diff copy');
const renderPublicLabels = fs.readFileSync('src/research/render-helpers.js', 'utf8');
for (const currentLocaleStale of ['alphaBadge:\'v1.1.0 العرض العام المستقر', 'alphaBadge:\'v1.1.0 Démo publique stable']) {
  assert.equal(renderPublicLabels.includes(currentLocaleStale), false, `current localized alpha badge must not expose stale stable label: ${currentLocaleStale}`);
}

const spec=fs.readFileSync('tests/hosted-demo-browser-evidence.spec.mjs','utf8');
for (const token of ['collectVisibleTextSnapshot','visible-text-ar.json','visible-text-fr.json','visible-text-en.json','unexpected_english_residuals','unexpected_non_locale_residuals','MOJIBAKE_MARKERS','has_arabic_unicode','mojibake_markers']) assert.ok(spec.includes(token), token);
assert.ok(!/\bEVIDENCE_DIR\b/.test(spec), 'hosted evidence spec must use EVIDENCE_ROOT for visible-text snapshot writes');
assert.ok(spec.includes('path.join(EVIDENCE_ROOT, VISIBLE_TEXT_SNAPSHOT_FILES[locale])'), 'visible-text snapshots must be written into the hosted evidence artifact root');
for (const residual of [
  'scores explain prioritization not truth',
  'Scores explain prioritization, not truth',
  'Attention = public visibility',
  'Attention = visibilité',
  'fixture/test debt ledger',
  'source-file refactor readiness',
  'audit repo retention',
  'سجل دين الاختبارات/الفيكستشرات'
]) assert.ok(spec.includes(residual), `visible-text residual guard must catch ${residual}`);
assert.ok(fs.readFileSync('src/research/render-helpers.js','utf8').includes('scores_explain_prioritization_not_truth'), 'localized status guard must cover scoring policy fallback tokens');

console.log('Localization regression matrix checks passed.');

for (const token of [
  'assertNoMojibake',
  'ARABIC_UNICODE_RE',
  'switchLocaleForVisibleTextSnapshot',
  'expected_locale_markers',
  'locale_snapshot_passed',
  "toMatchObject({ html_lang: 'ar', html_dir: 'rtl', has_arabic_unicode: true, mojibake_markers: [], locale_snapshot_passed: true })",
  "toMatchObject({ html_lang: 'fr', html_dir: 'ltr', locale_snapshot_passed: true })",
  "toMatchObject({ html_lang: 'en', html_dir: 'ltr', locale_snapshot_passed: true })"
]) assert.ok(spec.includes(token), token);
assert.ok(!spec.includes("localStorage.setItem('jarbou3i-language'"), 'visible-text snapshots must switch through the real UI language controls, not mutate storage/html directly');
assert.ok(spec.includes("if (node.closest('noscript')) return false;"), 'visible-text snapshots must ignore noscript fallback copy');

for (const token of ['VISIBLE_TEXT_FORBIDDEN_NON_LOCALE_RESIDUALS', 'unexpected_non_locale_residuals', 'إظهار مركز القيادة']) assert.ok(spec.includes(token), `visible-text locale leakage guard must include ${token}`);
const renderSource = fs.readFileSync('src/research/render-helpers.js', 'utf8');
for (const stale of ['fixture/test debt ledger, source-file refactor readiness', 'audit repo retention', 'سجل دين الاختبارات/الفيكستشرات', 'تدقيق جاهزية تفكيك ملفات المصدر']) assert.equal(renderSource.includes(stale), false, `alpha.13 visible copy must not carry stale alpha.11/alpha.10 wording: ${stale}`);
assert.ok(renderSource.includes('data-r-toggle-show') && renderSource.includes('data-r-toggle-hide'), 'visible-text snapshots must relocalize collapse toggles after language switching');

for (const marker of ['Ø','Ù','Â','Ã','â€”','â†','â—','â€œ','â€']) assert.ok(spec.includes(marker), `mojibake guard must reject ${marker}`);
assert.ok(spec.includes('isolated Â'), 'mojibake guard must distinguish isolated C2/Â artifacts from legitimate French uppercase Â');

const scanRoot = new URL('..', import.meta.url);
const allowedMojibakeFiles = new Set([
  'tests/hosted-demo-browser-evidence.spec.mjs',
  'tests/localization-regression-matrix-check.mjs'
]);
const generatedDirs = new Set(['node_modules', 'test-results', 'playwright-report', '.git', 'dist']);
const textExtensions = new Set(['.js', '.mjs', '.json', '.md', '.html', '.css', '.txt', '.yml', '.yaml', '.toml', '.webmanifest']);
function walkFiles(dir) {
  const output = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (generatedDirs.has(entry.name)) continue;
    const fullPath = `${dir}/${entry.name}`;
    if (entry.isDirectory()) output.push(...walkFiles(fullPath));
    else output.push(fullPath);
  }
  return output;
}
const sourceRoot = scanRoot.pathname.replace(/\/$/, '');
const unicodeViolations = [];
for (const file of walkFiles(sourceRoot)) {
  const relative = file.slice(sourceRoot.length + 1);
  const ext = relative.slice(relative.lastIndexOf('.'));
  if (!textExtensions.has(ext) && !relative.startsWith('.')) continue;
  if (allowedMojibakeFiles.has(relative)) continue;
  const content = fs.readFileSync(file, 'utf8');
  const found = ['Ø','Ù','Â','Ã','â€”','â†','â—','â€œ','â€'].filter((marker)=>content.includes(marker));
  if (found.length) unicodeViolations.push(`${relative}: ${found.join(',')}`);
}
assert.deepEqual(unicodeViolations, [], 'source files must not contain mojibake markers outside explicit guard tests');
