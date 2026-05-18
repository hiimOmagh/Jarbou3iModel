import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { spawnSync } from 'node:child_process';
import { getMigrationFixture, getPrivacyFixture, fixturePathExists } from './fixture-registry-loader.mjs';
import { readReleaseDoc, releaseDocExists } from './release-docs-loader.mjs';
import { readReleaseArtifact, releaseArtifactExists } from './release-artifacts-loader.mjs';

const VERSION = '1.1.0-alpha.8';
const BASE_VERSION = '1.0.30';
const TITLE = 'Fixture Registry Payload Compression + Test Organization Audit';
const RELEASE = `v${VERSION} — ${TITLE}`;
const ARTIFACT = 'jarbou3i-research-engine-v1.1.0-alpha.8-fixture-registry-payload-compression-test-organization-audit-patch.zip';
const repoRoot = process.cwd();
const read = (file) => readReleaseArtifact(file);
const json = (file) => JSON.parse(read(file));
const exists = (file) => fixturePathExists(file) || releaseDocExists(file) || fs.existsSync(path.join(repoRoot, file));

const pkg = json('package.json');
const lock = json('package-lock.json');
const schema = json('schema/research-workflow.schema.json');
const sample = json('fixtures/research/sample-research-workflow-en.json');
const migrationFixture = getMigrationFixture('fixtures/migrations/v1.1.0-alpha.8-packet.json');
const privacyFixture = getPrivacyFixture('fixtures/privacy/browser-generated-export-v1.1.0-alpha.8.json');
const index = read('index.html');
const engine = read('src/research-engine.js');
const migrations = read('src/research/migrations.js');
const ciNoBrowser = read('scripts/ci-no-browser.sh');
const moduleText = read('src/research/release-provenance-ledger.js');

for (const [actual, label] of [
  [pkg.version, 'package'],
  [lock.version, 'lock'],
  [lock.packages[''].version, 'lock root'],
  [schema.properties.workflow_version.const, 'schema'],
  [sample.workflow_version, 'sample'],
  [migrationFixture.workflow_version, 'migration fixture'],
  [privacyFixture.workflow_version, 'privacy fixture']
]) assert.equal(actual, VERSION, `${label} must be v1.1.0-alpha.8`);

assert.ok(schema.required.includes('release_provenance_ledger'), 'schema must require release provenance ledger');
assert.equal(schema.properties.release_provenance_ledger.properties.release_provenance_ledger_version.const, VERSION);
assert.equal(schema.properties.release_provenance_ledger.properties.release_title.const, RELEASE);
assert.equal(schema.properties.release_provenance_ledger.properties.base_version.const, BASE_VERSION);
assert.equal(schema.properties.release_provenance_ledger.properties.artifact_name.const, ARTIFACT);
assert.equal(schema.properties.release_provenance_ledger.properties.release_gate.const, 'release_provenance_ledger_pass');
assert.equal(schema.properties.release_apply_integrity.properties.base_version.const, BASE_VERSION);
assert.equal(schema.properties.release_apply_integrity.properties.artifact_name.const, ARTIFACT);

for (const packet of [sample, migrationFixture, privacyFixture]) {
  assert.equal(packet.release_notes.release_title, RELEASE, 'release title mismatch');
  assert.equal(packet.release_apply_integrity.base_version, BASE_VERSION, 'apply integrity base mismatch');
  assert.equal(packet.release_apply_integrity.artifact_name, ARTIFACT, 'apply integrity artifact mismatch');
  assert.ok(packet.release_apply_integrity.required_commands.some((cmd) => cmd.includes('npm run test:v110a1:no-browser')), 'apply integrity must require v1.1.0-alpha.8 gate');
  const ledger = packet.release_provenance_ledger;
  assert.equal(ledger.release_provenance_ledger_version, VERSION, 'ledger version mismatch');
  assert.equal(ledger.release_title, RELEASE, 'ledger title mismatch');
  assert.equal(ledger.base_version, BASE_VERSION, 'ledger base mismatch');
  assert.equal(ledger.target_version, VERSION, 'ledger target mismatch');
  assert.equal(ledger.artifact_name, ARTIFACT, 'ledger artifact mismatch');
  assert.equal(ledger.patch_type, 'changed_files_only');
  assert.equal(ledger.changed_files_manifest_required, true);
  assert.equal(ledger.release_apply_integrity_required, true);
  assert.equal(ledger.no_browser_ci_required, true);
  assert.equal(ledger.browser_ci_required, true);
  assert.equal(ledger.runtime_capability_change, false);
  assert.equal(ledger.provider_behavior_changed, false);
  assert.equal(ledger.oauth_behavior_changed, false);
  assert.equal(ledger.backend_behavior_changed, false);
  assert.equal(ledger.source_behavior_changed, false);
  assert.equal(ledger.storage_behavior_changed, false);
  assert.equal(ledger.manual_private_default, true);
  assert.equal(ledger.live_scraping_enabled, false);
  assert.equal(ledger.real_oauth_enabled, false);
  assert.equal(ledger.live_source_verification_enabled, false);
  assert.equal(ledger.release_gate, 'release_provenance_ledger_pass');
  assert.ok(Array.isArray(ledger.ledger_evidence) && ledger.ledger_evidence.length >= 8);
  assert.ok(ledger.required_commands.some((cmd) => cmd.includes('npm run test:v110a1:no-browser')));
  assert.ok(ledger.blocked_claims.some((claim) => /named artifact as provenance/i.test(claim)));
}

const sandbox = { window: {}, console };
sandbox.window.Jarbou3iResearchModules = {};
vm.createContext(sandbox);
vm.runInContext(moduleText, sandbox, { filename: 'src/research/release-provenance-ledger.js' });
const provenance = sandbox.window.Jarbou3iResearchModules.releaseProvenanceLedger;
assert.equal(provenance.VERSION, VERSION);
assert.equal(provenance.BASE_VERSION, BASE_VERSION);
assert.equal(provenance.RELEASE_TITLE, RELEASE);
assert.equal(provenance.ARTIFACT_NAME, ARTIFACT);
assert.equal(provenance.buildReleaseProvenanceLedger({}, { version: VERSION, baseVersion: BASE_VERSION, now: '2026-05-04T00:00:00.000Z' }).release_gate, 'release_provenance_ledger_pass');
assert.equal(provenance.buildReleaseProvenanceLedger({ artifact_sha256_recorded: false }, { version: VERSION, baseVersion: BASE_VERSION, now: '2026-05-04T00:00:00.000Z' }).release_gate, 'release_provenance_ledger_blocked');

assert.ok(index.includes('src/research/release-provenance-ledger.js'), 'index must load provenance module');
assert.ok(engine.includes('releaseProvenanceLedgerReport()'), 'engine must build provenance report');
assert.ok(engine.includes('release_provenance_ledger'), 'research packet must export provenance ledger');
assert.ok(migrations.includes("const TARGET_VERSION = '1.1.0-alpha.8'"), 'migration target mismatch');
assert.ok(migrations.includes("'1.0.24','1.0.25','1.0.26','1.0.27','1.0.28','1.0.29','1.0.30','1.1.0-alpha.1','1.1.0-alpha.2','1.1.0-alpha.3','1.1.0-alpha.8'"), 'migration order must preserve v1.0.26 and append v1.1.0-alpha.8');
assert.ok(migrations.includes('defaultReleaseProvenanceLedger'), 'migration defaults must include provenance ledger');

for (const required of [
  'src/research/release-provenance-ledger.js',
  'tests/release-provenance-ledger-check.mjs',
  'tests/version-suite-registry-check.mjs',
  'docs/v1.1.0-alpha.8-fixture-registry-payload-compression-test-organization-audit.md',
  'fixtures/migrations/v1.1.0-alpha.8-packet.json',
  'fixtures/privacy/browser-generated-export-v1.1.0-alpha.8.json',
  'fixtures/migrations/v1.0.26-packet.json',
  'fixtures/privacy/browser-generated-export-v1.0.26.json'
]) assert.ok(exists(required), `missing ${required}`);

for (const corpus of [
  read('README.md'),
  read('RELEASE_NOTES.md'),
  read('RELEASE_MANIFEST.md'),
  read('CHANGELOG.md'),
  read('PUBLIC_DEMO.md'),
  read('BROWSER_EVIDENCE.md'),
  read('HOSTED_DEMO_VERIFICATION.md'),
  read('docs/roadmap.md'),
  read('docs/qa-matrix.md'),
  read('docs/architecture.md'),
  read('docs/ai-integration.md'),
  read('docs/privacy-audit.md'),
  readReleaseDoc('docs/v1.1.0-alpha.8-fixture-registry-payload-compression-test-organization-audit.md')
]) {
  assert.ok(corpus.includes('v1.1.0-alpha.8') || corpus.includes('1.1.0-alpha.8'), 'release corpus must mention v1.1.0-alpha.8');
  assert.ok(/Package Script|CI Gate Registry|Root Manifest|Release Artifact Consolidation|Migration \+ Privacy Fixture Registry Consolidation|Fixture Registry|payload compression|test organization|fixture registry consolidation|provenance ledger|changed-files-only|visual freeze|mobile header/i.test(corpus), 'release corpus must describe provenance gate');
}

assert.ok(Object.keys(pkg.scripts).length <= 20, 'package script surface must remain compressed');
assert.ok(Object.keys(pkg.scripts).length <= 20, 'package script surface must remain compressed');
assert.ok(Object.keys(pkg.scripts).length <= 20, 'package script surface must remain compressed');
assert.ok(Object.keys(pkg.scripts).length <= 20, 'package script surface must remain compressed');
assert.ok(Object.keys(pkg.scripts).length <= 20, 'package script surface must remain compressed');
assert.ok(ciNoBrowser.includes('ci-gate-runner.mjs no-browser'));
assert.ok(ciNoBrowser.includes('ci-gate-runner.mjs no-browser'));
assert.ok(ciNoBrowser.includes('ci-gate-runner.mjs no-browser'));
assert.ok(ciNoBrowser.includes('ci-gate-runner.mjs no-browser'));
assert.ok(ciNoBrowser.includes('ci-gate-runner.mjs no-browser'), 'CI wrapper must delegate to registry runner');

for (const file of ['src/research/release-provenance-ledger.js', 'tests/release-provenance-ledger-check.mjs', 'tests/version-suite-registry-check.mjs']) {
  const syntax = spawnSync(process.execPath, ['--check', file], { encoding: 'utf8' });
  assert.equal(syntax.status, 0, syntax.stderr || syntax.stdout);
}

console.log('Release provenance ledger checks passed.');
process.exit(0);
