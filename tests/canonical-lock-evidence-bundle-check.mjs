import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { spawnSync } from 'node:child_process';

const VERSION = '1.2.0-alpha.4';
const TITLE = 'Evidence Review Throughput + Source-to-Brief Export Polish';
const RELEASE = `v${VERSION} — ${TITLE}`;
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const workflow = fs.readFileSync('.github/workflows/ci.yml', 'utf8');
const script = fs.readFileSync('scripts/build-lock-evidence-bundle.mjs', 'utf8');
const registry = JSON.parse(fs.readFileSync('tests/ci-gate-registry.json', 'utf8'));
const matrixConfig = JSON.parse(fs.readFileSync('tests/evidence/evidence-matrix.config.json', 'utf8'));
const PUBLIC_LABEL = 'v1.2.0-alpha.4 Evidence Review Throughput + Source-to-Brief Export Polish';

assert.equal(pkg.version, VERSION);
assert.ok(pkg.description.includes(TITLE));
assert.ok(pkg.description.includes('canonical lock evidence bundle'));
assert.ok(pkg.description.includes('Product surface is frozen'));

for (const token of [
  'lock-evidence-bundle',
  'no-browser-lock-evidence-log',
  'browser-lock-evidence-log',
  'hosted-demo-evidence',
  'download-artifact@v6',
  'upload-artifact@v6',
  'Build canonical lock evidence bundle',
  'lock-evidence-bundle_1.2.0-alpha.4_${{ github.run_id }}',
  'needs: [no-browser, browser]'
]) assert.ok(workflow.includes(token), `workflow missing ${token}`);

for (const forbidden of [
  'ci-artifacts/lock-evidence-input',
  'ci-artifacts/lock-evidence-bundle',
  'path: ci-artifacts/hosted-demo-evidence'
]) assert.equal(workflow.includes(forbidden), false, `workflow must not write lock evidence through repo tree path: ${forbidden}`);

for (const token of [
  '$RUNNER_TEMP/lock-evidence-input/logs',
  '${{ runner.temp }}/lock-evidence-input/logs',
  '${{ runner.temp }}/hosted-demo-evidence',
  '${{ runner.temp }}/lock-evidence-bundle',
  'LOCK_EVIDENCE_INPUT_DIR: ${{ runner.temp }}/lock-evidence-input',
  'HOSTED_DEMO_EVIDENCE_DIR: ${{ runner.temp }}/hosted-demo-evidence',
  'LOCK_EVIDENCE_BUNDLE_DIR: ${{ runner.temp }}/lock-evidence-bundle'
]) assert.ok(workflow.includes(token), `workflow missing temp workspace token: ${token}`);

for (const token of [
  'evidence-manifest.json',
  'evidence-manifest.md',
  'SHA256SUMS.txt',
  'hosted-demo-metadata.json',
  'visible-text-en.json',
  'visible-text-ar.json',
  'visible-text-fr.json',
  'CI gate passed: no-browser',
  'CI gate passed: browser',
  'stale_version_residue_detected',
  'lock_artifact_ready'
]) assert.ok(script.includes(token), `bundle script missing ${token}`);
assert.equal(script.includes("|| 'ci-artifacts/lock-evidence-input'"), false, 'bundle script must not default lock input to repo tree');
assert.equal(script.includes("|| 'ci-artifacts/lock-evidence-bundle'"), false, 'bundle script must not default bundle output to repo tree');
assert.ok(script.includes('process.env.RUNNER_TEMP || os.tmpdir()'), 'bundle script must default to runner temp/os temp');

assert.ok(workflow.includes('set +e'), 'workflow must explicitly preserve command exit status during log capture');
assert.ok(workflow.includes('status=$?'), 'workflow must capture command exit status after log capture');
assert.ok(workflow.includes('exit $status'), 'workflow must return the captured command status');
assert.equal(workflow.includes('| tee "$RUNNER_TEMP/lock-evidence-input/logs/no-browser.log"'), false, 'no-browser gate must not mask failures through tee pipeline');
assert.equal(workflow.includes('| tee "$RUNNER_TEMP/lock-evidence-input/logs/browser.log"'), false, 'browser gate must not mask failures through tee pipeline');
assert.ok(workflow.includes('test -f "$RUNNER_TEMP/hosted-demo-evidence/matrix-summary.json"'), 'browser job must require matrix-summary.json before artifact upload');
assert.ok(workflow.includes("summary.internal_build_version !== '1.2.0-alpha.4'"), 'browser job must assert matrix summary version');
assert.ok(workflow.includes('summary.expected_rows !== 39'), 'browser job must assert matrix row activation');


assert.ok(registry.gates['no-browser'].node_checks.includes('tests/canonical-lock-evidence-bundle-check.mjs'));
assert.ok(registry.gates.release.node_checks.includes('tests/canonical-lock-evidence-bundle-check.mjs'));
assert.ok(registry.syntax_matrix.files.includes('scripts/build-lock-evidence-bundle.mjs'));
assert.ok(registry.syntax_matrix.files.includes('tests/canonical-lock-evidence-bundle-check.mjs'));

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'lock-evidence-bundle-check-'));
const hosted = path.join(tmp, 'hosted-demo-evidence');
const logs = path.join(tmp, 'lock-evidence-input', 'logs');
const out = path.join(tmp, 'bundle-output');
fs.mkdirSync(hosted, {recursive:true});
fs.mkdirSync(logs, {recursive:true});
fs.writeFileSync(path.join(logs, 'no-browser.log'), `Registry: ${RELEASE}\nCI gate passed: no-browser\nchecks=101\n`);
fs.writeFileSync(path.join(logs, 'browser.log'), `Registry: ${RELEASE}\nCI gate passed: browser\nchecks=13\n`);
const matrixRows = [];
for (const locale of matrixConfig.locales) {
  fs.mkdirSync(path.join(hosted, locale), {recursive:true});
  for (const surface of matrixConfig.surfaces) {
    const row = {matrix_id:`${surface.id}-${locale}`, locale, surface:surface.slug, surface_id:surface.id, internal_build_version:VERSION, public_version_label:PUBLIC_LABEL, screenshot:`${locale}/${surface.slug}.png`, visible_text_file:`${locale}/${surface.slug}.visible-text.json`, dom_facts_file:`${locale}/${surface.slug}.dom-facts.json`, required_copy_present:true, version_visible:true, language_purity_passed:true, stale_version_residue_detected:false, horizontal_overflow_px:0, capture_settled:true, visual_artifact_guard_passed:true, required_state_present:true, pass:true};
    matrixRows.push(row);
    fs.writeFileSync(path.join(hosted, row.screenshot), 'png-placeholder');
    fs.writeFileSync(path.join(hosted, row.visible_text_file), JSON.stringify({visible_text:[`v${VERSION} visible ${locale}`, PUBLIC_LABEL]}, null, 2));
    fs.writeFileSync(path.join(hosted, row.dom_facts_file), JSON.stringify({app_version:VERSION, public_version_label:PUBLIC_LABEL, required_selector_present:true}, null, 2));
    fs.writeFileSync(path.join(hosted, locale, `${surface.slug}.validation.json`), JSON.stringify(row, null, 2));
  }
}
const matrixSummary = {internal_build_version:VERSION, public_version_label:PUBLIC_LABEL, languages:matrixConfig.locales, surface_count:matrixConfig.surfaces.length, surfaces:matrixConfig.surfaces, expected_rows:39, actual_rows:39, passed_rows:39, failed_rows:0, language_purity_passed:true, visual_guard_passed:true, horizontal_overflow_max_px:0, stale_version_residue_detected:false, golden_workflow_loaded:true, export_pack_v3_valid:true, publication_review_valid:true, rows:matrixRows};
fs.writeFileSync(path.join(hosted, 'matrix-summary.json'), JSON.stringify(matrixSummary, null, 2));
const metadata = {
  evidence_review_version: VERSION,
  capture_polish_version: VERSION,
  capture_count: 4,
  all_required_captures_present: true,
  visual_artifact_guard_required: true,
  capture_settle_required: true,
  public_version_label: PUBLIC_LABEL,
  page: { app_version: VERSION },
  captures: [
    {name:'desktop-first-screen', horizontal_overflow_px:0, visual_artifact_guard_passed:true, pass:true},
    {name:'mobile-first-screen', horizontal_overflow_px:0, visual_artifact_guard_passed:true, pass:true},
    {name:'provider-mode', horizontal_overflow_px:0, visual_artifact_guard_passed:true, pass:true},
    {name:'quality-export', horizontal_overflow_px:0, visual_artifact_guard_passed:true, pass:true}
  ],
  evidence_matrix:{captures:matrixRows, expected_rows:39, actual_rows:39, passed_rows:39, failed_rows:0, language_purity_passed:true, visual_guard_passed:true, horizontal_overflow_max_px:0, stale_version_residue_detected:false}
};
fs.writeFileSync(path.join(hosted, 'hosted-demo-metadata.json'), JSON.stringify(metadata, null, 2));
for (const locale of ['en','ar','fr']) fs.writeFileSync(path.join(hosted, `visible-text-${locale}.json`), JSON.stringify({visible_text:[`v${VERSION} visible ${locale}`, PUBLIC_LABEL]}, null, 2));
for (const image of ['desktop-first-screen.png','mobile-first-screen.png','provider-mode.png','quality-export.png']) fs.writeFileSync(path.join(hosted, image), 'png-placeholder');
fs.mkdirSync(path.join(hosted, 'exports'), {recursive:true});
for (const file of ['export-pack-v3-manifest.json','golden-workflow-export-validation.json','publication-review-report.json','export-artifact-consistency.json']) fs.writeFileSync(path.join(hosted, 'exports', file), JSON.stringify({valid:true, internal_build_version:VERSION}, null, 2));
const result = spawnSync(process.execPath, ['scripts/build-lock-evidence-bundle.mjs'], {
  encoding:'utf8',
  env:{...process.env, HOSTED_DEMO_EVIDENCE_DIR:hosted, LOCK_EVIDENCE_INPUT_DIR:path.join(tmp, 'lock-evidence-input'), LOCK_EVIDENCE_BUNDLE_DIR:out, GITHUB_RUN_ID:'123456', GITHUB_RUN_ATTEMPT:'1', GITHUB_SHA:'abc123', GITHUB_REF_NAME:'rc2-check'}
});
assert.equal(result.status, 0, result.stderr || result.stdout);
const bundleDir = path.join(out, `lock-evidence-bundle_${VERSION}_123456`);
const manifest = JSON.parse(fs.readFileSync(path.join(bundleDir, 'evidence-manifest.json'), 'utf8'));
assert.equal(manifest.version, VERSION);
assert.equal(manifest.release, RELEASE);
assert.equal(manifest.hosted_demo.page_app_version, VERSION);
assert.equal(manifest.hosted_demo.capture_count, 4);
assert.equal(manifest.hosted_demo.max_horizontal_overflow_px, 0);
assert.equal(manifest.evidence_matrix.expected_rows, 39);
assert.equal(manifest.evidence_matrix.failed_rows, 0);
assert.equal(manifest.evidence_matrix.language_purity_passed, true);
assert.equal(manifest.bundle_validation.status, 'passed');
assert.equal(manifest.bundle_validation.lock_artifact_ready, true);
assert.ok(fs.existsSync(path.join(bundleDir, 'checksums', 'SHA256SUMS.txt')));
assert.ok(fs.existsSync(path.join(bundleDir, 'hosted-demo-evidence', 'hosted-demo-metadata.json')));
assert.ok(fs.existsSync(path.join(bundleDir, 'hosted-demo-evidence', 'matrix-summary.json')));
assert.ok(fs.existsSync(path.join(bundleDir, 'hosted-demo-evidence', 'en', 'landing.validation.json')));
assert.ok(fs.existsSync(path.join(bundleDir, 'logs', 'no-browser.log')));
assert.ok(fs.existsSync(path.join(bundleDir, 'logs', 'browser.log')));

const syntax = spawnSync(process.execPath, ['--check', 'scripts/build-lock-evidence-bundle.mjs'], {encoding:'utf8'});
assert.equal(syntax.status, 0, syntax.stderr || syntax.stdout);
console.log('Canonical lock evidence bundle checks passed.');
process.exit(0);
