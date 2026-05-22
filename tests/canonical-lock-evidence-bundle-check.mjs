import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { spawnSync } from 'node:child_process';

const VERSION = '1.1.0-rc.2';
const TITLE = 'Canonical Lock Evidence Bundle + Final Stable Handoff';
const RELEASE = `v${VERSION} — ${TITLE}`;
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const workflow = fs.readFileSync('.github/workflows/ci.yml', 'utf8');
const script = fs.readFileSync('scripts/build-lock-evidence-bundle.mjs', 'utf8');
const registry = JSON.parse(fs.readFileSync('tests/ci-gate-registry.json', 'utf8'));

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
  'lock-evidence-bundle_1.1.0-rc.2_${{ github.run_id }}',
  'needs: [no-browser, browser]'
]) assert.ok(workflow.includes(token), `workflow missing ${token}`);

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
const metadata = {
  evidence_review_version: VERSION,
  capture_polish_version: VERSION,
  capture_count: 4,
  all_required_captures_present: true,
  visual_artifact_guard_required: true,
  capture_settle_required: true,
  page: { app_version: VERSION },
  captures: [
    {name:'desktop-first-screen', horizontal_overflow_px:0, visual_artifact_guard_passed:true},
    {name:'mobile-first-screen', horizontal_overflow_px:0, visual_artifact_guard_passed:true},
    {name:'provider-mode', horizontal_overflow_px:0, visual_artifact_guard_passed:true},
    {name:'quality-export', horizontal_overflow_px:0, visual_artifact_guard_passed:true}
  ]
};
fs.writeFileSync(path.join(hosted, 'hosted-demo-metadata.json'), JSON.stringify(metadata, null, 2));
for (const locale of ['en','ar','fr']) fs.writeFileSync(path.join(hosted, `visible-text-${locale}.json`), JSON.stringify({visible_text:[`v${VERSION} visible ${locale}`]}, null, 2));
for (const image of ['desktop-first-screen.png','mobile-first-screen.png','provider-mode.png','quality-export.png']) fs.writeFileSync(path.join(hosted, image), 'png-placeholder');
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
assert.equal(manifest.bundle_validation.status, 'passed');
assert.equal(manifest.bundle_validation.lock_artifact_ready, true);
assert.ok(fs.existsSync(path.join(bundleDir, 'checksums', 'SHA256SUMS.txt')));
assert.ok(fs.existsSync(path.join(bundleDir, 'hosted-demo-evidence', 'hosted-demo-metadata.json')));
assert.ok(fs.existsSync(path.join(bundleDir, 'logs', 'no-browser.log')));
assert.ok(fs.existsSync(path.join(bundleDir, 'logs', 'browser.log')));

const syntax = spawnSync(process.execPath, ['--check', 'scripts/build-lock-evidence-bundle.mjs'], {encoding:'utf8'});
assert.equal(syntax.status, 0, syntax.stderr || syntax.stdout);
console.log('Canonical lock evidence bundle checks passed.');
process.exit(0);
