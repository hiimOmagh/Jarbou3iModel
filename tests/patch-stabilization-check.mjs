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
const ciGateRegistry = JSON.parse(fs.readFileSync('tests/ci-gate-registry.json', 'utf8'));
const v103Entry = versionRegistry.entries.find((entry) => entry.id === 'v103');
const release = fs.readFileSync('src/research/release-candidate.js', 'utf8');

assert.equal(pkg.version, '1.4.0-alpha.6');
assert.equal(schema.properties.workflow_version.const, '1.3.0');
assert.equal(fixture.workflow_version, '1.3.0');
assert.equal(fixture.release_candidate.stable_release_version, '1.3.0');
assert.equal(migrationFixture.workflow_version, '1.0.1', 'v1.0.1 migration fixture must preserve the previous patch source version');
assert.ok(migrations.includes("'1.0.0','1.0.1','1.0.2','1.0.3','1.0.4','1.0.5','1.0.6','1.0.7','1.0.8','1.0.9','1.0.10','1.0.11','1.0.12','1.0.13','1.0.14','1.0.15','1.0.16','1.0.17','1.0.18','1.0.19','1.0.20','1.0.21','1.0.22','1.0.23','1.0.24','1.0.25','1.0.26','1.0.27','1.0.28','1.0.29','1.0.30','1.1.0-alpha.1','1.1.0-alpha.2','1.1.0-alpha.3','1.1.0-alpha.8','1.1.0-alpha.9','1.1.0-alpha.10','1.3.0'"), 'migrations must support v1.0.5 → v1.1.0');
assert.ok(ciNoBrowser.includes('ci-gate-runner.mjs no-browser'), 'CI no-browser shell must delegate to registry runner');
assert.ok(ciGateRegistry.gates['no-browser'].node_checks.includes('tests/version-suite-registry-check.mjs'), 'CI no-browser registry must run version suite registry');
assert.ok(v103Entry?.checks.includes('tests/patch-stabilization-check.mjs'), 'v103 registry entry must include patch gate');
assert.ok(v103Entry?.checks.includes('tests/ux-stabilization-patch-check.mjs'), 'v103 registry entry must include UX stabilization gate');
assert.ok(ciGateRegistry.gates.release.node_checks.includes('tests/ux-stabilization-patch-check.mjs'), 'release registry must include UX stabilization gate');
assert.ok(renderHelpers.includes('v1.3.0 Stable Manual Workflow Release') && renderHelpers.includes('Diagnostic Repair Queue + Export Risk Resolution'), 'English stable badge must be fixed');
assert.ok(renderHelpers.includes('مرشح مستقر'), 'Arabic release badge must be professional and current');
assert.ok(renderHelpers.includes('candidat stable'), 'French release badge must be professional and current');
assert.ok(renderHelpers.includes('Stable consolidation') && renderHelpers.includes('v1.1.0'), 'English hosted evidence body must describe rc.1 canonical evidence bundling scope');
assert.ok(renderHelpers.includes('الدمج المستقر') && renderHelpers.includes('v1.1.0'), 'Arabic hosted evidence body must describe rc.1 canonical evidence bundling scope');
assert.ok(renderHelpers.includes('consolidation stable') && renderHelpers.includes('v1.1.0'), 'French hosted evidence body must describe rc.1 canonical evidence bundling scope');
assert.ok(renderHelpers.includes('no live search') || renderHelpers.includes('aucune recherche live'), 'release note must preserve no live search boundary');

assert.ok(release.includes("'patch_release'"), 'stable policy must allow patch_release work only after stable');
for (const forbidden of ['new_major_feature','new_live_provider','new_source_connector','oauth_production_enablement','secret_export_weakening']) {
  assert.ok(release.includes(forbidden), `release policy must keep blocked-work guard: ${forbidden}`);
}
assert.ok(Object.keys(pkg.scripts).length <= 20, 'package script surface must remain compressed');
assert.ok(ciGateRegistry.gates.release.node_checks.includes('tests/patch-stabilization-check.mjs'), 'release registry must include patch stabilization gate');
assert.ok(ciGateRegistry.gates['no-browser'].node_checks.includes('tests/version-suite-registry-check.mjs'), 'no-browser registry must include version suite registry');

console.log('Patch-only stabilization checks passed.');
process.exit(0);


assert.ok(renderHelpers.includes("v1.1.0 · Candidat démo publique"), 'French alpha badge must reflect Diagnostic Repair Queue + Export Risk Resolution');
assert.ok(renderHelpers.includes('verrou cohérence export') || renderHelpers.includes('cohérence Export Pack v3'), 'French rc.0 hosted evidence body must describe export consistency lock');
assert.equal(renderHelpers.includes("evidenceReviewGateBody:'v1.1.0 preserves the public-demo freeze"), false, 'French evidence review copy must not inherit English alpha.20 prose');
