import assert from 'node:assert/strict';
import fs from 'node:fs';

const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const schema = JSON.parse(fs.readFileSync('schema/research-workflow.schema.json', 'utf8'));
const fixture = JSON.parse(fs.readFileSync('fixtures/research/sample-research-workflow-en.json', 'utf8'));
const migrationFixture = JSON.parse(fs.readFileSync('fixtures/migrations/v1.0.1-packet.json', 'utf8'));
const migrations = fs.readFileSync('src/research/migrations.js', 'utf8');
const renderHelpers = fs.readFileSync('src/research/render-helpers.js', 'utf8');
const ciNoBrowser = fs.readFileSync('scripts/ci-no-browser.sh', 'utf8');
const v102 = fs.readFileSync('tests/v103-no-browser-suite.mjs', 'utf8');
const release = fs.readFileSync('src/research/release-candidate.js', 'utf8');

assert.equal(pkg.version, '1.0.29');
assert.equal(schema.properties.workflow_version.const, '1.0.29');
assert.equal(fixture.workflow_version, '1.0.29');
assert.equal(fixture.release_candidate.stable_release_version, '1.0.29');
assert.equal(migrationFixture.workflow_version, '1.0.1', 'v1.0.1 migration fixture must preserve the previous patch source version');
assert.ok(migrations.includes("'1.0.0','1.0.1','1.0.2','1.0.3','1.0.4','1.0.5','1.0.6','1.0.7','1.0.8','1.0.9','1.0.10','1.0.11','1.0.12','1.0.13','1.0.14','1.0.15','1.0.16','1.0.17','1.0.18','1.0.19','1.0.20','1.0.21','1.0.22','1.0.23','1.0.24','1.0.25','1.0.26','1.0.27','1.0.28','1.0.29'"), 'migrations must support v1.0.5 → v1.0.29');
assert.ok(ciNoBrowser.includes('tests/v105-no-browser-suite.mjs'), 'CI no-browser syntax gate must target v105 suite');
assert.ok(ciNoBrowser.includes('tests/v108-no-browser-suite.mjs'), 'CI no-browser syntax gate must target v108 suite');
assert.ok(v102.includes('patch-stabilization-check.mjs'), 'v103 no-browser suite must include patch gate');
assert.ok(v102.includes('ux-stabilization-patch-check.mjs'), 'v103 no-browser suite must include UX stabilization gate');
assert.ok(pkg.scripts['test:patch'].includes('ux-stabilization-patch-check'), 'patch script must include UX stabilization gate');
assert.ok(renderHelpers.includes("alphaBadge:'v1.0.29 · Final Public Demo Hardening / Release Freeze Audit'"), 'English stable badge must be fixed');
assert.ok(renderHelpers.includes('بيان أدلة العرض'), 'Arabic release badge must be fixed');
assert.ok(renderHelpers.includes('Manifeste de preuves'), 'French release badge must be fixed');
assert.ok(release.includes("'patch_release'"), 'stable policy must allow patch_release work only after stable');
for (const forbidden of ['new_major_feature','new_live_provider','new_source_connector','oauth_production_enablement','secret_export_weakening']) {
  assert.ok(release.includes(forbidden), `release policy must keep blocked-work guard: ${forbidden}`);
}
assert.ok(pkg.scripts['test:stable'].includes('patch-stabilization-check'), 'test:stable must include patch stabilization gate');
assert.ok(pkg.scripts['test:v105:no-browser'].includes('v105-no-browser-suite'), 'package must expose v105 no-browser suite');
assert.ok(pkg.scripts['test:v108:no-browser'].includes('v108-no-browser-suite'), 'package must expose v108 no-browser suite');

console.log('Patch-only stabilization checks passed.');
process.exit(0);
