import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const VERSION = '1.1.0-alpha.1';
const BASE_VERSION = '1.0.30';
const TITLE = 'Post-Freeze Product Expansion Planning Gate';
const RELEASE = `v${VERSION} — ${TITLE}`;
const LOCK_RELEASE = `v${VERSION} — Public Demo Release Lock`;
const ARTIFACT = 'jarbou3i-research-engine-v1.1.0-alpha.1-post-freeze-product-expansion-planning-gate-patch.zip';
const repoRoot = process.cwd();
const read = (file) => fs.readFileSync(path.join(repoRoot, file), 'utf8');
const json = (file) => JSON.parse(read(file));
const exists = (file) => fs.existsSync(path.join(repoRoot, file));

const pkg = json('package.json');
const lock = json('package-lock.json');
const schema = json('schema/research-workflow.schema.json');
const sample = json('fixtures/research/sample-research-workflow-en.json');
const migrationFixture = json('fixtures/migrations/v1.1.0-alpha.1-packet.json');
const privacyFixture = json('fixtures/privacy/browser-generated-export-v1.1.0-alpha.1.json');
const index = read('index.html');
const engine = read('src/research-engine.js');
const publicDemo = read('src/research/public-demo-readiness.js');
const migrations = read('src/research/migrations.js');
const ciNoBrowser = read('scripts/ci-no-browser.sh');
const ciBrowser = read('scripts/ci-browser.sh');
const browserA11y = read('tests/a11y.spec.js');
const smoke = read('tests/smoke.spec.js');
const releaseDoc = read('docs/v1.1.0-alpha.1-post-freeze-product-expansion-planning-gate.md');

for (const [actual, label] of [[pkg.version,'package.json'],[lock.version,'package-lock root'],[lock.packages[''].version,'package-lock package root'],[schema.properties.workflow_version.const,'schema workflow_version'],[sample.workflow_version,'sample workflow'],[migrationFixture.workflow_version,'migration fixture'],[privacyFixture.workflow_version,'privacy fixture']]) assert.equal(actual, VERSION, `${label} must identify v${VERSION}`);

for (const packet of [sample, migrationFixture, privacyFixture]) {
  assert.equal(packet.release_notes.release_title, RELEASE);
  assert.equal(packet.public_demo_release_lock.release_title, LOCK_RELEASE);
  assert.equal(packet.release_apply_integrity.release_title, RELEASE);
  assert.equal(packet.release_apply_integrity.base_version, BASE_VERSION);
  assert.equal(packet.release_apply_integrity.artifact_name, ARTIFACT);
  assert.equal(packet.release_apply_integrity.runtime_capability_change, false);
  assert.equal(packet.release_apply_integrity.provider_behavior_changed, false);
  assert.equal(packet.release_apply_integrity.oauth_behavior_changed, false);
  assert.equal(packet.release_apply_integrity.backend_behavior_changed, false);
  assert.equal(packet.release_apply_integrity.source_behavior_changed, false);
  assert.equal(packet.release_apply_integrity.storage_behavior_changed, false);
  assert.equal(packet.release_apply_integrity.zip_existence_sufficient, false);
  assert.equal(packet.release_provenance_ledger.release_title, RELEASE);
  assert.equal(packet.release_provenance_ledger.base_version, BASE_VERSION);
  assert.equal(packet.release_provenance_ledger.artifact_name, ARTIFACT);
  assert.equal(packet.public_demo_release_lock.screenshots_alone_sufficient, false);
  assert.equal(packet.public_demo_release_lock.zip_existence_sufficient, false);
  assert.equal(packet.public_demo_release_lock.live_scraping_enabled, false);
  assert.equal(packet.public_demo_release_lock.real_oauth_enabled, false);
  assert.equal(packet.public_demo_release_lock.live_source_verification_enabled, false);
}

assert.equal(schema.properties.release_notes.properties.release_title.const, RELEASE);
assert.equal(schema.properties.public_demo_release_lock.properties.release_title.const, LOCK_RELEASE);
assert.equal(schema.properties.release_apply_integrity.properties.base_version.const, BASE_VERSION);
assert.equal(schema.properties.release_apply_integrity.properties.artifact_name.const, ARTIFACT);
assert.equal(schema.properties.release_provenance_ledger.properties.base_version.const, BASE_VERSION);
assert.equal(schema.properties.release_provenance_ledger.properties.artifact_name.const, ARTIFACT);
assert.ok(index.includes('v1.1.0-alpha.1 · Post-Freeze Product Expansion Planning Gate'), 'index badge must expose final freeze audit identity');
assert.ok(index.includes('id="loadSampleBtn"'), 'load sample primary action must remain in DOM');
assert.ok(browserA11y.includes("page.locator('#loadSampleBtn')"), 'runtime a11y smoke must target loadSampleBtn visibility');
assert.ok(browserA11y.includes("await page.locator('#loadSampleBtn').click()"), 'runtime a11y smoke must click loadSampleBtn');
assert.ok(smoke.includes('toBeVisible'), 'smoke test must guard primary action visibility');
assert.ok(smoke.includes('loadSampleBtn'), 'smoke test must guard loadSampleBtn');
for (const text of [index, publicDemo, releaseDoc, read('README.md'), read('RELEASE_NOTES.md'), read('PUBLIC_DEMO.md'), read('BROWSER_EVIDENCE.md'), read('HOSTED_DEMO_VERIFICATION.md')]) {
  assert.ok(/no live scraping|No live scraping|live scraping/i.test(text), 'public corpus must keep no-live-scraping boundary');
  assert.ok(/No real OAuth|production OAuth|real OAuth/i.test(text), 'public corpus must keep OAuth boundary');
  assert.ok(/screenshots.*alone|screenshots, hosted evidence, and ZIPs|ZIP existence alone|ZIP archive alone/i.test(text), 'public corpus must reject screenshot/ZIP-only approval');
}
assert.ok(migrations.includes("const TARGET_VERSION = '1.1.0-alpha.1'"), 'migration target must be v1.1.0-alpha.1');
assert.ok(migrations.includes("'1.0.27','1.0.28','1.0.29','1.0.30','1.1.0-alpha.1'"), 'migration order must preserve v1.0.30 freeze baseline and append v1.1.0-alpha.1');
assert.ok(engine.includes("baseVersion:'1.0.30'"), 'engine apply/provenance reports must use v1.0.30 freeze baseline');
assert.ok(ciNoBrowser.includes('tests/final-public-demo-freeze-audit-check.mjs'), 'no-browser CI must run final freeze audit');
assert.ok(ciNoBrowser.includes('run_node --check tests/final-public-demo-freeze-audit-check.mjs'), 'no-browser syntax gate must cover final freeze audit');
assert.ok(ciNoBrowser.includes('run_node --check tests/v129-no-browser-suite.mjs'), 'no-browser syntax gate must cover v129 wrapper');
assert.ok(ciBrowser.includes('npm run test:browser:evidence'), 'browser CI must preserve hosted evidence capture');
for (const file of ['fixtures/migrations/v1.0.28-packet.json','fixtures/privacy/browser-generated-export-v1.0.28.json','fixtures/migrations/v1.1.0-alpha.1-packet.json','fixtures/privacy/browser-generated-export-v1.1.0-alpha.1.json','docs/v1.0.28-hosted-demo-evidence-manifest-gate.md','docs/v1.1.0-alpha.1-post-freeze-product-expansion-planning-gate.md','tests/v129-no-browser-suite.mjs']) assert.ok(exists(file), `missing required baseline/current artifact: ${file}`);
for (const file of ['tests/final-public-demo-freeze-audit-check.mjs','tests/v129-no-browser-suite.mjs']) { const syntax = spawnSync(process.execPath, ['--check', file], {encoding:'utf8'}); assert.equal(syntax.status, 0, syntax.stderr || syntax.stdout || `${file} syntax failed`); }
console.log('Final public demo freeze audit checks passed.');
process.exit(0);
