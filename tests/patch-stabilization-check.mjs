import assert from 'node:assert/strict';
import fs from 'node:fs';
import { getMigrationFixture, fixturePathExists } from './fixture-registry-loader.mjs';

const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const schema = JSON.parse(fs.readFileSync('schema/research-workflow.schema.json', 'utf8'));
const fixture = JSON.parse(fs.readFileSync('fixtures/research/sample-research-workflow-en.json', 'utf8'));
const migrationFixture = getMigrationFixture('fixtures/migrations/v1.0.1-packet.json');
const migrations = fs.readFileSync('src/research/migrations.js', 'utf8');
const renderHelpers = fs.readFileSync('src/research/render-helpers.js', 'utf8');
const ciNoBrowser = fs.readFileSync('scripts/ci-no-browser.sh', 'utf8');
const versionRegistry = JSON.parse(fs.readFileSync('tests/version-suite-registry.json', 'utf8'));
const v103Entry = versionRegistry.entries.find((entry) => entry.id === 'v103');
const release = fs.readFileSync('src/research/release-candidate.js', 'utf8');

assert.equal(pkg.version, '1.1.0-alpha.5');
assert.equal(schema.properties.workflow_version.const, '1.1.0-alpha.5');
assert.equal(fixture.workflow_version, '1.1.0-alpha.5');
assert.equal(fixture.release_candidate.stable_release_version, '1.1.0-alpha.5');
assert.equal(migrationFixture.workflow_version, '1.0.1', 'v1.0.1 migration fixture must preserve the previous patch source version');
assert.ok(migrations.includes("'1.0.0','1.0.1','1.0.2','1.0.3','1.0.4','1.0.5','1.0.6','1.0.7','1.0.8','1.0.9','1.0.10','1.0.11','1.0.12','1.0.13','1.0.14','1.0.15','1.0.16','1.0.17','1.0.18','1.0.19','1.0.20','1.0.21','1.0.22','1.0.23','1.0.24','1.0.25','1.0.26','1.0.27','1.0.28','1.0.29','1.0.30','1.1.0-alpha.1','1.1.0-alpha.2','1.1.0-alpha.3','1.1.0-alpha.5'"), 'migrations must support v1.0.5 → v1.1.0-alpha.5');
assert.ok(ciNoBrowser.includes('tests/version-suite-registry-check.mjs'), 'CI no-browser syntax gate must target v105 suite');
assert.ok(ciNoBrowser.includes('tests/version-suite-registry-check.mjs'), 'CI no-browser syntax gate must target v108 suite');
assert.ok(v103Entry?.checks.includes('tests/patch-stabilization-check.mjs'), 'v103 registry entry must include patch gate');
assert.ok(v103Entry?.checks.includes('tests/ux-stabilization-patch-check.mjs'), 'v103 registry entry must include UX stabilization gate');
assert.ok(pkg.scripts['test:patch'].includes('ux-stabilization-patch-check'), 'patch script must include UX stabilization gate');
assert.ok(renderHelpers.includes("alphaBadge:'v1.1.0-alpha.5 · Version Suite Registry + Package Script Compression'"), 'English stable badge must be fixed');
assert.ok(renderHelpers.includes('بوابة تخطيط ما بعد التجميد'), 'Arabic release badge must be fixed');
assert.ok(renderHelpers.includes('Portail de planification post-gel'), 'French release badge must be fixed');
assert.ok(release.includes("'patch_release'"), 'stable policy must allow patch_release work only after stable');
for (const forbidden of ['new_major_feature','new_live_provider','new_source_connector','oauth_production_enablement','secret_export_weakening']) {
  assert.ok(release.includes(forbidden), `release policy must keep blocked-work guard: ${forbidden}`);
}
assert.ok(pkg.scripts['test:stable'].includes('patch-stabilization-check'), 'test:stable must include patch stabilization gate');
assert.ok(pkg.scripts['test:version-registry']?.includes('version-suite-registry-check.mjs'), 'package must expose v105 no-browser suite');
assert.ok(pkg.scripts['test:version-registry']?.includes('version-suite-registry-check.mjs'), 'package must expose v108 no-browser suite');

console.log('Patch-only stabilization checks passed.');
process.exit(0);
