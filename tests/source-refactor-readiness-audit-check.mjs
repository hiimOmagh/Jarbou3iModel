import assert from 'node:assert/strict';
import fs from 'node:fs';

const CURRENT_VERSION = '1.4.0-alpha.27';
const CURRENT_TITLE = 'Adapter Replay Decision Drilldown + Evidence Trace Links';
const VERSION = '1.3.0';
const TITLE = 'Stable Manual Workflow Release';
const audit = fs.readFileSync('docs/source-refactor-readiness-audit.md', 'utf8');
const ci = JSON.parse(fs.readFileSync('tests/ci-gate-registry.json', 'utf8'));
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));

assert.equal(pkg.version, CURRENT_VERSION);
assert.ok(audit.includes(`# Source-File Refactor Readiness Audit`));
assert.ok(audit.includes(`v${VERSION} — ${TITLE}`));
assert.ok(audit.includes('audit-only, no source-file refactor yet'));
for (const file of ['src/app.js', 'src/research-engine.js', 'src/styles.css']) {
  assert.ok(audit.includes(file), `readiness audit missing ${file}`);
  assert.ok(fs.existsSync(file), `${file} must exist`);
}
for (const token of [
  'No behavioral split',
  'No module split before a dedicated refactor milestone',
  'No redesign',
  'Golden fixture kit',
  'Browser evidence baselines',
  'One-file-at-a-time refactor plan',
  'Rollback condition'
]) {
  assert.ok(audit.includes(token), `readiness audit missing ${token}`);
}
const coreFiles = ['src/app.js', 'src/research-engine.js'];
for (const file of coreFiles) {
  assert.ok(ci.syntax_matrix.files.includes(file), `${file} must remain syntax-matrix covered before future refactor`);
  assert.ok(Buffer.byteLength(fs.readFileSync(file), 'utf8') > 50 * 1024, `${file} still requires refactor-readiness tracking`);
}
assert.ok(Buffer.byteLength(fs.readFileSync('src/styles.css'), 'utf8') > 50 * 1024, 'src/styles.css still requires refactor-readiness tracking');
assert.equal(ci.runtime_capability_change, false);
assert.equal(ci.provider_behavior_changed, false);
assert.equal(ci.oauth_behavior_changed, false);
assert.equal(ci.backend_behavior_changed, false);
assert.equal(ci.source_behavior_changed, false);
assert.equal(ci.storage_behavior_changed, false);

console.log('Source-file refactor readiness audit checks passed.');
process.exit(0);
