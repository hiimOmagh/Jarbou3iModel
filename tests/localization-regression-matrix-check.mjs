import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const matrix=fs.readFileSync('docs/localization-regression-matrix.md','utf8');
for (const token of ['visible-text-ar.json','visible-text-fr.json','visible-text-en.json','JSON','OAuth','PKCE','BYOK','OpenAI']) assert.ok(matrix.includes(token), token);

const matrixConfig = JSON.parse(fs.readFileSync('tests/evidence/evidence-matrix.config.json', 'utf8'));
assert.equal(matrixConfig.public_version_labels.en, 'v1.4.0-alpha.35 Adapter Replay Review Pack Handoff Dossier', 'English public version label must identify v1.4.0-alpha.28');
assert.equal(matrixConfig.public_version_labels.ar, 'v1.4.0-alpha.35 ملف تسليم حزمة مراجعة إعادة التشغيل', 'Arabic public version label must identify the current release');
assert.equal(matrixConfig.public_version_labels.fr, 'v1.4.0-alpha.35 Dossier de handoff du pack de revue de rejeu', 'French public version label must identify the current release');
assert.ok(matrixConfig.language_rules.ar.required.includes('فرق معاينة تجميع الموجز'), 'Arabic evidence matrix must require alpha.5 preview diff copy');
assert.ok(matrixConfig.language_rules.fr.required.includes('Diff aperçu assemblage du brief'), 'French evidence matrix must require alpha.5 preview diff copy');
const renderPublicLabels = fs.readFileSync('src/research/render-helpers.js', 'utf8');
for (const currentLocaleStale of ['alphaBadge:\'v1.1.0 العرض العام المستقر', 'alphaBadge:\'v1.1.0 Démo publique stable']) {
  assert.equal(renderPublicLabels.includes(currentLocaleStale), false, `current localized alpha badge must not expose stale stable label: ${currentLocaleStale}`);
}

const spec=fs.readFileSync('tests/hosted-demo-browser-evidence.spec.mjs','utf8');
const releaseCopyContractSource = fs.readFileSync('src/research/release-copy-contract.js', 'utf8');
for (const token of ['collectVisibleTextSnapshot','visible-text-ar.json','visible-text-fr.json','visible-text-en.json','unexpected_english_residuals','unexpected_non_locale_residuals','MOJIBAKE_MARKERS','has_arabic_unicode','mojibake_markers']) assert.ok(spec.includes(token), token);
assert.ok(!/\bEVIDENCE_DIR\b/.test(spec), 'hosted evidence spec must use EVIDENCE_ROOT for visible-text snapshot writes');
assert.ok(spec.includes('path.join(EVIDENCE_ROOT, VISIBLE_TEXT_SNAPSHOT_FILES[locale])'), 'visible-text snapshots must be written into the hosted evidence artifact root');

for (const staleReleaseLabel of [
  'Pack de rejeu dry-run',
  'simulation d’approbation opérateur',
  'حزمة إعادة تشغيل التجربة الجافة',
  'محاكاة اعتماد المشغّل'
]) {
  assert.ok(spec.includes(staleReleaseLabel), `visible-text stale release-label guard must catch ${staleReleaseLabel}`);
  assert.equal(renderPublicLabels.includes(staleReleaseLabel), false, `render helpers must not expose stale localized release label: ${staleReleaseLabel}`);
}
for (const staleCurrentDescription of [
  'النموذج الأولي المحدود للتنفيذ الحي اليدوي جاهز لأدلة الإصدار',
  'قمرة أمان التنفيذ اليدوي + سجل الجلسة جاهزة لأدلة الإصدار',
  'صندوق رمل محوّل المزوّد اليدوي + عقد الاستدعاء العابر جاهز لأدلة الإصدار'
]) {
  assert.ok(releaseCopyContractSource.includes(staleCurrentDescription), `release-copy contract staleVisibleText guard must catch old release-description phrase: ${staleCurrentDescription}`);
}
for (const validAdvancedSurfaceCopy of [
  'نموذج أولي محدود للتنفيذ الحي اليدوي',
  'هيكل اشتراك يدوي فقط'
]) {
  assert.equal(releaseCopyContractSource.includes(`'${validAdvancedSurfaceCopy}'`), false, `release-copy staleVisibleText must not flag valid advanced-surface copy: ${validAdvancedSurfaceCopy}`);
}
assert.ok(spec.includes('RELEASE_COPY_CONTRACT.staleVisibleText'), 'hosted evidence stale current-release guard must consume release-copy contract staleVisibleText');
const hostedDemoBodies = [...renderPublicLabels.matchAll(/hostedDemoVerificationBody:'([^']+)'/g)].map((match)=>match[1]);
const releaseCopyHostedDemoBodies = [...releaseCopyContractSource.matchAll(/hostedDemoVerificationBody: '([^']+)'/g)].map((match)=>match[1]);
hostedDemoBodies.push(...releaseCopyHostedDemoBodies);
const arabicHostedDemoBodies = releaseCopyHostedDemoBodies.filter((body)=>body.includes('أدلة الإصدار') && /[\u0600-\u06FF]/.test(body));
assert.ok(arabicHostedDemoBodies.length >= 1, 'Arabic hosted release description must be present');
for (const body of arabicHostedDemoBodies) {
  assert.ok(body.includes('ملف تسليم حزمة مراجعة إعادة التشغيل') || body.includes('بطاقات الفرز'), 'Arabic current-release description must identify alpha.33 triage workbench');
  for (const staleCurrentDescription of [
    'النموذج الأولي المحدود للتنفيذ الحي اليدوي جاهز لأدلة الإصدار',
    'قمرة أمان التنفيذ اليدوي + سجل الجلسة جاهزة لأدلة الإصدار',
    'صندوق رمل محوّل المزوّد اليدوي + عقد الاستدعاء العابر جاهز لأدلة الإصدار'
  ]) assert.equal(body.includes(staleCurrentDescription), false, `Arabic current-release description must not carry stale alpha.10/alpha.11 release-description wording: ${staleCurrentDescription}`);
}
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

const scanRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
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
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) output.push(...walkFiles(fullPath));
    else output.push(fullPath);
  }
  return output;
}
const sourceRoot = scanRoot;
const unicodeViolations = [];
for (const file of walkFiles(sourceRoot)) {
  const relative = path.relative(sourceRoot, file).replaceAll(path.sep, '/');
  const ext = relative.slice(relative.lastIndexOf('.'));
  if (!textExtensions.has(ext) && !relative.startsWith('.')) continue;
  if (allowedMojibakeFiles.has(relative)) continue;
  const content = fs.readFileSync(file, 'utf8');
  const found = ['Ø','Ù','Â','Ã','â€”','â†','â—','â€œ','â€'].filter((marker)=>content.includes(marker));
  if (found.length) unicodeViolations.push(`${relative}: ${found.join(',')}`);
}
assert.deepEqual(unicodeViolations, [], 'source files must not contain mojibake markers outside explicit guard tests');
