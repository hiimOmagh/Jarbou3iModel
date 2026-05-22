import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { getMigrationFixture, getPrivacyFixture, fixturePathExists } from './fixture-registry-loader.mjs';
import { readReleaseDoc, releaseDocExists } from './release-docs-loader.mjs';
import { readReleaseArtifact, releaseArtifactExists } from './release-artifacts-loader.mjs';

const VERSION = '1.1.0-fix.2';
const BASE_VERSION = '1.0.30';
const TITLE = 'Public Demo Stable';
const RELEASE = `v${VERSION} — ${TITLE}`;
const LOCK_RELEASE = `v${VERSION} — Public Demo Release Lock`;
const ARTIFACT = 'jarbou3i-research-engine-v1.1.0-evidence-pack-export-v3-brief-traceability-patch.zip';
const repoRoot = process.cwd();
const read = (file) => readReleaseArtifact(file);
const json = (file) => JSON.parse(read(file));
const exists = (file) => fixturePathExists(file) || releaseDocExists(file) || fs.existsSync(path.join(repoRoot, file));

const pkg = json('package.json');
const lock = json('package-lock.json');
const schema = json('schema/research-workflow.schema.json');
const sample = json('fixtures/research/sample-research-workflow-en.json');
const migrationFixture = getMigrationFixture('fixtures/migrations/v1.1.0-packet.json');
const privacyFixture = getPrivacyFixture('fixtures/privacy/browser-generated-export-v1.1.0.json');
const index = read('index.html');
const engine = read('src/research-engine.js');
const publicDemo = read('src/research/public-demo-readiness.js');
const migrations = read('src/research/migrations.js');
const ciNoBrowser = read('scripts/ci-no-browser.sh');
const ciBrowser = read('scripts/ci-browser.sh');
const browserA11y = read('tests/a11y.spec.js');
const smoke = read('tests/smoke.spec.js');
const releaseDoc = readReleaseDoc('docs/v1.1.0-evidence-pack-export-v3-brief-traceability.md');

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
assert.ok(index.includes('v1.1.0 · Public Demo Stable'), 'index badge must expose final freeze audit identity');
assert.ok(index.includes('id="loadSampleBtn"'), 'load sample primary action must remain in DOM');
assert.ok(browserA11y.includes("page.locator('#loadSampleBtn')"), 'runtime a11y smoke must target loadSampleBtn visibility');
assert.ok(browserA11y.includes("await page.locator('#loadSampleBtn').click()"), 'runtime a11y smoke must click loadSampleBtn');
assert.ok(smoke.includes('toBeVisible'), 'smoke test must guard primary action visibility');
assert.ok(smoke.includes('loadSampleBtn'), 'smoke test must guard loadSampleBtn');
assert.ok(index.includes('data-r-i18n="hostedDemoVerificationBody"') && index.includes('لا يوجد استخراج حي'), 'localized index must keep no-live-scraping boundary');
assert.ok(index.includes('OAuth حقيقي'), 'localized index must keep OAuth boundary');
assert.ok(index.includes('لا تكفي اللقطات') && index.includes('ملفات ZIP'), 'localized index must reject screenshot/ZIP-only approval');
for (const text of [publicDemo, releaseDoc, read('README.md'), read('RELEASE_NOTES.md'), read('PUBLIC_DEMO.md'), read('BROWSER_EVIDENCE.md'), read('HOSTED_DEMO_VERIFICATION.md')]) {
  assert.ok(/no live scraping|No live scraping|live scraping/i.test(text), 'public corpus must keep no-live-scraping boundary');
  assert.ok(/No real OAuth|production OAuth|real OAuth/i.test(text), 'public corpus must keep OAuth boundary');
  assert.ok(/screenshots.*alone|screenshots, hosted evidence, and ZIPs|ZIP existence alone|ZIP archive alone/i.test(text), 'public corpus must reject screenshot/ZIP-only approval');
}
assert.ok(migrations.includes("const TARGET_VERSION = '1.1.0-fix.2'"), 'migration target must be v1.1.0');
assert.ok(migrations.includes("'1.0.27','1.0.28','1.0.29','1.0.30','1.1.0-alpha.1','1.1.0-alpha.2','1.1.0-alpha.3','1.1.0-alpha.8','1.1.0-alpha.9','1.1.0-alpha.10','1.1.0-fix.2'"), 'migration order must preserve v1.0.30 freeze baseline and append v1.1.0');
assert.ok(engine.includes("baseVersion:'1.0.30'"), 'engine apply/provenance reports must use v1.0.30 freeze baseline');
assert.ok(ciNoBrowser.includes('ci-gate-runner.mjs no-browser'), 'no-browser CI must run final freeze audit through registry runner');
assert.ok(ciNoBrowser.includes('ci-gate-runner.mjs no-browser'), 'no-browser CI must delegate to registry runner');
assert.ok(ciNoBrowser.includes('ci-gate-runner.mjs no-browser'), 'no-browser CI must delegate to registry runner');
assert.ok(ciBrowser.includes('ci-gate-runner.mjs browser'), 'browser CI must preserve hosted evidence through registry runner');
for (const file of ['fixtures/migrations/v1.0.28-packet.json','fixtures/privacy/browser-generated-export-v1.0.28.json','fixtures/migrations/v1.1.0-packet.json','fixtures/privacy/browser-generated-export-v1.1.0.json','docs/v1.0.28-hosted-demo-evidence-manifest-gate.md','docs/v1.1.0-evidence-pack-export-v3-brief-traceability.md','tests/version-suite-registry-check.mjs']) assert.ok(exists(file), `missing required baseline/current artifact: ${file}`);
for (const file of ['tests/final-public-demo-freeze-audit-check.mjs','tests/version-suite-registry-check.mjs']) { const syntax = spawnSync(process.execPath, ['--check', file], {encoding:'utf8'}); assert.equal(syntax.status, 0, syntax.stderr || syntax.stdout || `${file} syntax failed`); }
console.log('Final public demo freeze audit checks passed.');
process.exit(0);
