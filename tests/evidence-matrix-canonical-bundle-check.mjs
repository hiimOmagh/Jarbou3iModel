import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { spawnSync } from 'node:child_process';

const VERSION = '1.4.0-alpha.8';
const TITLE = 'Credential Boundary Runtime Drill';
const PUBLIC_LABEL = 'v1.4.0-alpha.8 Credential Boundary Runtime Drill';
const config = JSON.parse(fs.readFileSync('tests/evidence/evidence-matrix.config.json', 'utf8'));
const spec = fs.readFileSync('tests/hosted-demo-browser-evidence.spec.mjs', 'utf8');
const script = fs.readFileSync('scripts/build-lock-evidence-bundle.mjs', 'utf8');
const workflow = fs.readFileSync('.github/workflows/ci.yml', 'utf8');
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const registry = JSON.parse(fs.readFileSync('tests/ci-gate-registry.json', 'utf8'));

assert.equal(pkg.version, VERSION);
assert.ok(pkg.description.includes(TITLE));
assert.equal(config.evidence_matrix_config_version, VERSION);
assert.equal(config.internal_build_version, VERSION);
assert.equal(config.public_version_label, PUBLIC_LABEL);
assert.deepEqual(config.locales, ['en','ar','fr']);
assert.equal(config.surfaces.length, 13);
assert.equal(config.required_rows, 39);
assert.equal(new Set(config.surfaces.map((surface) => surface.id)).size, 13);
assert.equal(new Set(config.surfaces.map((surface) => surface.slug)).size, 13);
for (const locale of config.locales) {
  assert.ok(config.language_rules[locale], `missing language rules for ${locale}`);
  assert.ok(config.language_rules[locale].required.length >= 2, `missing required language tokens for ${locale}`);
  assert.ok(config.language_rules[locale].forbidden.length >= 2, `missing forbidden language tokens for ${locale}`);
}

for (const token of [
  'MATRIX_CONFIG',
  'generateEvidenceMatrix',
  'captureMatrixRow',
  'matrix-summary.json',
  'dom-facts.json',
  'validation.json',
  'language_purity_passed',
  'stale_version_residue_detected',
  'expected_rows',
  'passed_rows',
  'writeExportEvidence',
  'export-pack-v3-manifest.json'
]) assert.ok(spec.includes(token), `browser evidence spec missing ${token}`);
assert.ok(spec.includes('expect(matrixSummary.expected_rows).toBe(39);'));
assert.ok(spec.includes('HOSTED_EVIDENCE_TEST_TIMEOUT_MS = 180_000'));

for (const token of [
  'normalizeCaptureSanity',
  'metadata?.evidence_matrix?.captures',
  'metadata?.screenshot_sanity',
  'metadata?.captures',
  'matrix-summary.json',
  'expectedMatrixRows = 39',
  'evidence_matrix',
  'exports',
  'lockable:true',
  'RUNNER_TEMP || os.tmpdir()'
]) assert.ok(script.includes(token), `bundle script missing ${token}`);
assert.equal(script.includes("|| 'ci-artifacts/lock-evidence-input'"), false);
assert.equal(script.includes("|| 'ci-artifacts/lock-evidence-bundle'"), false);

for (const token of [
  'lock-evidence-bundle_1.4.0-alpha.8_${{ github.run_id }}',
  'lock-evidence-bundle-decision',
  'playwright-install-deps-log',
  'playwright-install-log',
  '${{ runner.temp }}/lock-evidence-input/logs',
  '${{ runner.temp }}/hosted-demo-evidence',
  '${{ runner.temp }}/lock-evidence-bundle'
]) assert.ok(workflow.includes(token), `workflow missing ${token}`);
assert.equal(workflow.includes('ci-artifacts/lock-evidence-input'), false);
assert.equal(workflow.includes('ci-artifacts/lock-evidence-bundle'), false);
assert.equal(workflow.includes('actions/cache@v6'), false, 'workflow must not use unsupported cache action major v6');

assert.ok(workflow.includes('set +e'), 'workflow must explicitly preserve command exit status during log capture');
assert.ok(workflow.includes('status=$?'), 'workflow must capture command exit status after log capture');
assert.ok(workflow.includes('exit $status'), 'workflow must return the captured command status');
assert.equal(workflow.includes('| tee "$RUNNER_TEMP/lock-evidence-input/logs/no-browser.log"'), false, 'no-browser gate must not mask failures through tee pipeline');
assert.equal(workflow.includes('| tee "$RUNNER_TEMP/lock-evidence-input/logs/browser.log"'), false, 'browser gate must not mask failures through tee pipeline');
assert.ok(workflow.includes('test -f "$RUNNER_TEMP/hosted-demo-evidence/matrix-summary.json"'), 'browser job must require matrix-summary.json before artifact upload');
assert.ok(workflow.includes('Browser gate pending: Playwright install has not completed yet.'), 'browser job must initialize browser.log before setup can fail');
assert.ok(workflow.includes('Browser gate started: HOSTED_DEMO_EVIDENCE_DIR with PLAYWRIGHT_SKIP_INSTALL=1 npm run test:ci:browser'), 'browser job must stamp browser.log when the browser gate starts');
assert.ok(workflow.includes('uses: actions/cache@v4'), 'browser job must cache Playwright browser binaries');
assert.ok(workflow.includes('path: ~/.cache/ms-playwright'), 'browser job must cache Playwright browser binaries under ~/.cache/ms-playwright');
assert.ok(workflow.includes("key: ${{ runner.os }}-ms-playwright-${{ steps.playwright-cache-key.outputs.version }}-${{ hashFiles('package-lock.json') }}"), 'Playwright cache key must include OS, Playwright version, and package-lock hash');
assert.ok(workflow.includes('npx playwright install-deps chromium'), 'browser job must split system dependency install from browser install');
assert.ok(workflow.includes('npx playwright install chromium'), 'browser job must install browser binaries separately');
assert.ok(workflow.includes('timeout 10m npx playwright install-deps chromium'), 'install-deps step must be timeout-bounded');
assert.ok(workflow.includes('timeout 8m npx playwright install chromium'), 'browser install step must be timeout-bounded');
assert.ok(workflow.includes('retrying once after 15 seconds'), 'browser install must retry once only');
assert.ok(workflow.includes('Download Playwright install-deps evidence log'), 'canonical bundle must download playwright install-deps evidence log');
assert.ok(workflow.includes('Download Playwright install evidence log'), 'canonical bundle must download playwright install evidence log');
assert.ok(workflow.includes('canonical bundle policy: upload only when no-browser and browser both pass'), 'canonical bundle skip path must emit an explicit decision');
assert.ok(workflow.includes("summary.internal_build_version !== '1.4.0-alpha.8'"), 'browser job must assert matrix summary version');
assert.ok(workflow.includes('summary.expected_rows !== 39'), 'browser job must assert matrix row activation');


assert.ok(registry.gates['no-browser'].node_checks.includes('tests/evidence-matrix-canonical-bundle-check.mjs'));
assert.ok(registry.gates.release.node_checks.includes('tests/evidence-matrix-canonical-bundle-check.mjs'));
assert.ok(registry.syntax_matrix.files.includes('tests/evidence-matrix-canonical-bundle-check.mjs'));

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'evidence-matrix-bundle-check-'));
const hosted = path.join(tmp, 'hosted-demo-evidence');
const logs = path.join(tmp, 'lock-evidence-input', 'logs');
const out = path.join(tmp, 'bundle-output');
fs.mkdirSync(hosted, {recursive:true});
fs.mkdirSync(logs, {recursive:true});
fs.writeFileSync(path.join(logs, 'no-browser.log'), `Registry: v${VERSION} — ${TITLE}\nCI gate passed: no-browser\nchecks=101\n`);
fs.writeFileSync(path.join(logs, 'playwright-install-deps.log'), 'Playwright install-deps started: timeout 10m npx playwright install-deps chromium\n');
fs.writeFileSync(path.join(logs, 'playwright-install.log'), 'Playwright browser install started: timeout 8m npx playwright install chromium\n');
fs.writeFileSync(path.join(logs, 'browser.log'), `Browser gate started: HOSTED_DEMO_EVIDENCE_DIR with PLAYWRIGHT_SKIP_INSTALL=1 npm run test:ci:browser\nRegistry: v${VERSION} — ${TITLE}\nCI gate passed: browser\nchecks=13\n`);
const rows = [];
for (const locale of config.locales) {
  fs.mkdirSync(path.join(hosted, locale), {recursive:true});
  for (const surface of config.surfaces) {
    const row = {matrix_id:`${surface.id}-${locale}`, locale, surface:surface.slug, surface_id:surface.id, internal_build_version:VERSION, public_version_label:PUBLIC_LABEL, screenshot:`${locale}/${surface.slug}.png`, visible_text_file:`${locale}/${surface.slug}.visible-text.json`, dom_facts_file:`${locale}/${surface.slug}.dom-facts.json`, required_copy_present:true, version_visible:true, language_purity_passed:true, stale_version_residue_detected:false, horizontal_overflow_px:0, capture_settled:true, visual_artifact_guard_passed:true, required_state_present:true, pass:true};
    rows.push(row);
    fs.writeFileSync(path.join(hosted, row.screenshot), 'png-placeholder');
    fs.writeFileSync(path.join(hosted, row.visible_text_file), JSON.stringify({visible_text:[VERSION, PUBLIC_LABEL, locale]}, null, 2));
    fs.writeFileSync(path.join(hosted, row.dom_facts_file), JSON.stringify({app_version:VERSION, public_version_label:PUBLIC_LABEL, required_selector_present:true}, null, 2));
    fs.writeFileSync(path.join(hosted, locale, `${surface.slug}.validation.json`), JSON.stringify(row, null, 2));
  }
}
const matrixSummary = {internal_build_version:VERSION, public_version_label:PUBLIC_LABEL, languages:config.locales, surface_count:13, surfaces:config.surfaces, expected_rows:39, actual_rows:39, passed_rows:39, failed_rows:0, all_required_surfaces_present:true, all_required_languages_present:true, language_purity_passed:true, visual_guard_passed:true, horizontal_overflow_max_px:0, stale_version_residue_detected:false, golden_workflow_loaded:true, export_pack_v3_valid:true, publication_review_valid:true, rows};
fs.writeFileSync(path.join(hosted, 'matrix-summary.json'), JSON.stringify(matrixSummary, null, 2));
const metadata = {evidence_review_version:VERSION, capture_polish_version:VERSION, capture_count:4, all_required_captures_present:true, visual_artifact_guard_required:true, capture_settle_required:true, public_version_label:PUBLIC_LABEL, page:{app_version:VERSION}, captures:[
  {name:'desktop-first-screen', horizontal_overflow_px:0, visual_artifact_guard_passed:true, pass:true},
  {name:'mobile-first-screen', horizontal_overflow_px:0, visual_artifact_guard_passed:true, pass:true},
  {name:'provider-mode', horizontal_overflow_px:0, visual_artifact_guard_passed:true, pass:true},
  {name:'quality-export', horizontal_overflow_px:0, visual_artifact_guard_passed:true, pass:true}
], evidence_matrix:{captures:rows, expected_rows:39, actual_rows:39, passed_rows:39, failed_rows:0, language_purity_passed:true, visual_guard_passed:true, horizontal_overflow_max_px:0, stale_version_residue_detected:false}};
fs.writeFileSync(path.join(hosted, 'hosted-demo-metadata.json'), JSON.stringify(metadata, null, 2));
for (const locale of config.locales) fs.writeFileSync(path.join(hosted, `visible-text-${locale}.json`), JSON.stringify({visible_text:[VERSION, PUBLIC_LABEL, locale]}, null, 2));
for (const image of ['desktop-first-screen.png','mobile-first-screen.png','provider-mode.png','quality-export.png']) fs.writeFileSync(path.join(hosted, image), 'png-placeholder');
fs.mkdirSync(path.join(hosted, 'exports'), {recursive:true});
for (const file of ['export-pack-v3-manifest.json','golden-workflow-export-validation.json','publication-review-report.json','export-artifact-consistency.json']) fs.writeFileSync(path.join(hosted, 'exports', file), JSON.stringify({valid:true, internal_build_version:VERSION}, null, 2));
const result = spawnSync(process.execPath, ['scripts/build-lock-evidence-bundle.mjs'], {encoding:'utf8', env:{...process.env, HOSTED_DEMO_EVIDENCE_DIR:hosted, LOCK_EVIDENCE_INPUT_DIR:path.join(tmp, 'lock-evidence-input'), LOCK_EVIDENCE_BUNDLE_DIR:out, GITHUB_RUN_ID:'654321', GITHUB_RUN_ATTEMPT:'1', GITHUB_SHA:'abc123', GITHUB_REF_NAME:'rc2-fix2'}});
assert.equal(result.status, 0, result.stderr || result.stdout);
const bundleDir = path.join(out, `lock-evidence-bundle_${VERSION}_654321`);
const manifest = JSON.parse(fs.readFileSync(path.join(bundleDir, 'evidence-manifest.json'), 'utf8'));
assert.equal(manifest.internal_build_version, VERSION);
assert.equal(manifest.public_version_label, PUBLIC_LABEL);
assert.equal(manifest.evidence_matrix.expected_rows, 39);
assert.equal(manifest.evidence_matrix.failed_rows, 0);
assert.equal(manifest.evidence_matrix.language_purity_passed, true);
assert.equal(manifest.evidence_matrix.horizontal_overflow_max_px, 0);
assert.equal(manifest.exports.export_pack_v3_valid, true);
assert.equal(manifest.bundle_validation.lockable, true);
assert.equal(manifest.browser.playwright_install_deps_log_file, 'logs/playwright-install-deps.log');
assert.equal(manifest.browser.playwright_install_log_file, 'logs/playwright-install.log');
assert.ok(fs.existsSync(path.join(bundleDir, 'logs', 'playwright-install-deps.log')));
assert.ok(fs.existsSync(path.join(bundleDir, 'logs', 'playwright-install.log')));
assert.ok(fs.existsSync(path.join(bundleDir, 'hosted-demo-evidence', 'en', 'landing.validation.json')));
assert.ok(fs.existsSync(path.join(bundleDir, 'exports', 'export-pack-v3-manifest.json')));
assert.ok(fs.existsSync(path.join(bundleDir, 'checksums', 'SHA256SUMS.txt')));

console.log('Evidence matrix canonical bundle checks passed.');
process.exit(0);
