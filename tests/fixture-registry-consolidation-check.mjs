import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { migrationRegistry, privacyRegistry, getMigrationFixture, getPrivacyFixture, fixturePathExists } from './fixture-registry-loader.mjs';
import { readReleaseDoc, releaseDocExists } from './release-docs-loader.mjs';

const VERSION = '1.3.0';
const TITLE = 'Stable Manual Workflow Release';
const PATCH_ARTIFACT = 'jarbou3i-research-engine-v1.3.0-manual-workflow-release.zip';

assert.equal(migrationRegistry.registry_version, VERSION);
assert.equal(migrationRegistry.registry_type, 'migration_fixture_registry');
assert.equal(migrationRegistry.entry_count, migrationRegistry.entries.length);
assert.ok(migrationRegistry.entries.length >= 58, 'migration registry preserves historical packets plus current alpha.19');
assert.equal(privacyRegistry.registry_version, VERSION);
assert.equal(privacyRegistry.registry_type, 'privacy_export_fixture_registry');
assert.equal(privacyRegistry.entry_count, privacyRegistry.entries.length);
assert.ok(privacyRegistry.entries.length >= 48, 'privacy registry preserves historical exports plus current alpha.19');

assert.equal(fs.readdirSync('fixtures/migrations').filter((name) => /^v.+-packet\.json$/.test(name)).length, 0, 'old migration packet files must be removed');
assert.equal(fs.readdirSync('fixtures/privacy').filter((name) => /^browser-generated-export-.+\.json$/.test(name)).length, 0, 'old privacy export files must be removed');
assert.equal(fs.existsSync('assets/jarbou3i-mascot.png'), false, 'unused oversized mascot source asset must be removed');
for (const activeAsset of ['assets/jarbou3i-mascot-192.png','assets/jarbou3i-mascot-512.png','assets/favicon-32.png','assets/apple-touch-icon.png']) {
  assert.equal(fs.existsSync(activeAsset), true, `${activeAsset} must remain`);
}

for (const version of ['v0.11.0','v1.0.30','v1.1.0-alpha.3','v1.1.0']) {
  assert.ok(getMigrationFixture(`fixtures/migrations/${version}-packet.json`), `${version} migration fixture must load from registry`);
}
for (const version of ['v1.0.24','v1.0.30','v1.1.0-alpha.3','v1.1.0']) {
  assert.ok(getPrivacyFixture(`fixtures/privacy/browser-generated-export-${version}.json`), `${version} privacy fixture must load from registry`);
}

const currentMigration = getMigrationFixture('fixtures/migrations/v1.3.0-packet.json');
const currentPrivacy = getPrivacyFixture('fixtures/privacy/browser-generated-export-v1.3.0.json');
for (const packet of [currentMigration, currentPrivacy]) {
  assert.equal(packet.workflow_version, VERSION);
  assert.equal(packet.release_notes.release_title, `v${VERSION} — ${TITLE}`);
  assert.equal(packet.release_apply_integrity.target_version, VERSION);
  assert.equal(packet.release_apply_integrity.artifact_name, PATCH_ARTIFACT);
  assert.equal(packet.release_apply_integrity.runtime_capability_change, false);
  assert.equal(packet.release_apply_integrity.provider_behavior_changed, false);
  assert.equal(packet.release_apply_integrity.oauth_behavior_changed, false);
  assert.equal(packet.release_apply_integrity.backend_behavior_changed, false);
  assert.equal(packet.release_apply_integrity.source_behavior_changed, false);
  assert.equal(packet.release_apply_integrity.storage_behavior_changed, false);
}

const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
assert.equal(pkg.version, VERSION);
assert.ok(pkg.scripts['test:fixtures']?.includes('ci-gate-runner.mjs fixtures'));
assert.ok(pkg.scripts['test:current:no-browser']?.includes('ci-gate-runner.mjs current-no-browser'));
assert.ok(Object.keys(pkg.scripts).length <= 20, 'package script surface must remain compressed');
const schema = JSON.parse(fs.readFileSync('schema/research-workflow.schema.json', 'utf8'));
assert.equal(schema.properties.workflow_version.const, VERSION);
assert.ok(fs.readFileSync('index.html', 'utf8').includes(`v${VERSION} · ${TITLE}`));
assert.ok(releaseDocExists(`docs/v${VERSION}-evidence-pack-export-v3-brief-traceability.md`));

console.log('Fixture registry consolidation checks passed.');
process.exit(0);
