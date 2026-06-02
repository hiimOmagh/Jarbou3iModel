import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import { getMigrationFixture, getPrivacyFixture, registryHasMigrationFixture, registryHasPrivacyFixture, fixturePathExists } from './fixture-registry-loader.mjs';
import { readReleaseDoc, releaseDocExists } from './release-docs-loader.mjs';
import { readReleaseArtifact, releaseArtifactExists } from './release-artifacts-loader.mjs';

const read = (file) => readReleaseArtifact(file);
const json = (file) => JSON.parse(read(file));

const pkg = json('package.json');
const schema = json('schema/research-workflow.schema.json');
const fixture = json('fixtures/research/sample-research-workflow-en.json');
const migrationFixture = getMigrationFixture('fixtures/migrations/v1.3.0-packet.json');
const privacyFixture = getPrivacyFixture('fixtures/privacy/browser-generated-export-v1.3.0.json');
const index = read('index.html');
const engine = read('src/research-engine.js');
const moduleSource = read('src/research/source-capability-registry.js');
const ciNoBrowser = read('scripts/ci-no-browser.sh');
const manifest = read('RELEASE_MANIFEST.md');
const changelog = read('CHANGELOG.md');
const roadmap = read('docs/roadmap.md');
const qaMatrix = read('docs/qa-matrix.md');

const context = { console, window: {} };
context.globalThis = context;
context.window = context;
vm.createContext(context);
vm.runInContext(moduleSource, context, { filename: 'src/research/source-capability-registry.js' });
const registry = context.Jarbou3iResearchModules.sourceCapabilityRegistry;

assert.equal(pkg.version, '1.4.0-alpha.40');
assert.ok(pkg.description.includes('source strategy'));
assert.equal(registry.VERSION, '1.3.0');
assert.equal(typeof registry.strategyBlueprint, 'function');
assert.equal(typeof registry.auditRegistry, 'function');
assert.ok(index.includes('src/research/source-capability-registry.js'));
assert.ok(engine.includes('sourceCapabilityRegistryReport'));
assert.ok(engine.includes('source_capability_registry'));
assert.ok(releaseDocExists('docs/v1.0.20-source-packet-template-browser-qa-copy-safety.md'));
assert.ok(fs.existsSync('tests/version-suite-registry-check.mjs'));
assert.ok(registryHasMigrationFixture('fixtures/migrations/v1.3.0-packet.json'));
assert.ok(registryHasPrivacyFixture('fixtures/privacy/browser-generated-export-v1.3.0.json'));

const blueprint = registry.strategyBlueprint({version:'1.3.0', now:'2026-05-02T00:00:00.000Z'});
assert.equal(blueprint.source_strategy_version, '1.3.0');
assert.equal(blueprint.runtime_capability_change, false);
assert.equal(blueprint.provider_behavior_changed, false);
assert.equal(blueprint.oauth_behavior_changed, false);
assert.equal(blueprint.backend_behavior_changed, false);
assert.equal(blueprint.source_behavior_changed, false);
assert.equal(blueprint.audit.ok, true);
assert.equal(blueprint.audit.new_live_connector_enabled, false);
assert.equal(blueprint.audit.production_oauth_enabled, false);
assert.equal(blueprint.audit.auth_material_export_allowed, false);
assert.equal(blueprint.audit.verdict, 'source_capability_registry_ready_manual_packet_import');
assert.ok(blueprint.registry.some((item) => item.source_id === 'manual_private' && item.demo_visibility === 'show'));
assert.ok(blueprint.registry.some((item) => item.source_id === 'manual_source_packet' && item.status === 'available_manual_import'));
assert.ok(blueprint.registry.some((item) => item.source_id === 'portable_auth_planned' && item.auth_mode === 'oauth_pkce' && item.availability === 'unavailable'));
assert.ok(blueprint.blocked_until_threat_modeled.includes('production OAuth / portable account auth'));
assert.ok(blueprint.scoring_warning.toLowerCase().includes('engagement is not truth'));

for (const item of blueprint.registry) {
  const report = registry.validateCapability(item);
  assert.equal(report.ok, true, `${item.source_id} failed registry validation: ${report.issues.join(', ')}`);
  if (item.privacy_risk === 'high') assert.notEqual(item.demo_visibility, 'show');
  if (item.auth_mode === 'oauth_pkce') {
    assert.equal(item.availability, 'unavailable');
    assert.equal(item.export_allowed, false);
  }
}

for (const packet of [fixture, migrationFixture, privacyFixture]) {
  assert.equal(packet.workflow_version, '1.3.0');
  assert.equal(packet.source_capability_registry.source_strategy_version, '1.3.0');
  assert.equal(packet.source_capability_registry.runtime_capability_change, false);
  assert.equal(packet.source_capability_registry.audit.new_live_connector_enabled, false);
  assert.equal(packet.source_capability_registry.audit.production_oauth_enabled, false);
  assert.equal(packet.source_capability_registry.audit.auth_material_export_allowed, false);
  assert.equal(packet.source_capability_registry.audit.verdict, 'source_capability_registry_ready_manual_packet_import');
  assert.equal(packet.release_notes.release_title, 'v1.3.0 — Stable Manual Workflow Release');
}

assert.equal(schema.properties.workflow_version.const, '1.3.0');
assert.ok(schema.required.includes('source_capability_registry'));
assert.equal(schema.$defs.source_capability_registry.properties.source_strategy_version.const, '1.3.0');
assert.equal(schema.$defs.source_capability_registry.properties.runtime_capability_change.const, false);
assert.ok(Object.keys(pkg.scripts).length <= 20, 'package script surface must remain compressed');
assert.ok(Object.keys(pkg.scripts).length <= 20, 'package script surface must remain compressed');
assert.ok(Object.keys(pkg.scripts).length <= 20, 'package script surface must remain compressed');
assert.ok(Object.keys(pkg.scripts).length <= 20, 'package script surface must remain compressed');
assert.ok(ciNoBrowser.includes('ci-gate-runner.mjs no-browser'));
assert.ok(ciNoBrowser.includes('ci-gate-runner.mjs no-browser'));
for (const corpus of [manifest, changelog, roadmap, qaMatrix]) {
  assert.ok(corpus.includes('v1.4.0-alpha.28') || corpus.includes('v1.3.0'), 'release corpus missing current alpha.1 or stable baseline');
  assert.ok(corpus.includes('Source-to-Brief Publication Readiness Suite') || corpus.includes('Stable Manual Workflow Release'), 'release corpus missing current alpha.1 or stable baseline title');
}

console.log('Source capability registry checks passed.');
process.exit(0);
