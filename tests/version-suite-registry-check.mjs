import assert from 'node:assert/strict';
import fs from 'node:fs';
import { spawnSync } from 'node:child_process';

const VERSION = '1.3.0-rc.1';
const RELEASE = 'v1.3.0-rc.1 — Manual Workflow Release Candidate Freeze';
const registry = JSON.parse(fs.readFileSync('tests/version-suite-registry.json', 'utf8'));
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));

assert.equal(registry.version_suite_registry_version, VERSION);
assert.equal(registry.release_title, RELEASE);
assert.equal(registry.registry_type, 'version_suite_registry');
assert.equal(registry.replacement_for, 'tests/v*-no-browser-suite.mjs');
assert.equal(registry.wrapper_files_removed, true);
assert.equal(registry.package_script_compression, true);
assert.equal(registry.runtime_capability_change, false);
assert.equal(registry.provider_behavior_changed, false);
assert.equal(registry.oauth_behavior_changed, false);
assert.equal(registry.backend_behavior_changed, false);
assert.equal(registry.source_behavior_changed, false);
assert.equal(registry.storage_behavior_changed, false);
assert.equal(registry.entry_count, registry.entries.length);
assert.ok(registry.entries.length >= 40, 'historical version-suite coverage must be preserved in registry');

const oldWrappers = fs.readdirSync('tests').filter((name) => /^v.*-no-browser-suite\.mjs$/.test(name));
assert.equal(oldWrappers.length, 0, 'historical version-specific no-browser wrapper files must be removed');

const ids = new Set(registry.entries.map((entry) => entry.id));
for (const id of ['v018','v105','v110a4','v125','v129','v130']) {
  assert.ok(ids.has(id), `registry must preserve historical suite entry: ${id}`);
}

for (const entry of registry.entries) {
  assert.ok(entry.former_file.startsWith('tests/'), `former file must be tracked for ${entry.id}`);
  assert.equal(entry.preserved_as, 'registry_entry');
  assert.equal(entry.check_count, entry.checks.length);
  assert.ok(Array.isArray(entry.checks));
  for (const file of entry.checks) {
    assert.ok(fs.existsSync(file), `registry entry ${entry.id} references missing check ${file}`);
  }
}

const versionScripts = Object.keys(pkg.scripts).filter((name) => /^test:v[0-9]/.test(name));
assert.equal(versionScripts.length, 0, 'package.json must not keep historical numeric test:v* script sprawl');
assert.ok(pkg.scripts['test:current:no-browser']?.includes('ci-gate-runner.mjs current-no-browser'));
assert.ok(pkg.scripts['test:ci:no-browser']?.includes('scripts/ci-no-browser.sh'));
assert.ok(pkg.scripts['test:ci:browser']?.includes('scripts/ci-browser.sh'));
assert.ok(Object.keys(pkg.scripts).length <= 20, 'package script count must be compressed to the operational command surface');

const ciNoBrowser = fs.readFileSync('scripts/ci-no-browser.sh', 'utf8');
const ciGateRegistry = JSON.parse(fs.readFileSync('tests/ci-gate-registry.json', 'utf8'));
assert.ok(ciNoBrowser.includes('node tests/ci-gate-runner.mjs no-browser'), 'CI must delegate no-browser composition to CI gate runner');
assert.ok(ciGateRegistry.gates['no-browser'].node_checks.includes('tests/version-suite-registry-check.mjs'), 'CI gate registry must run version suite registry check');
assert.ok(ciGateRegistry.syntax_matrix.files.includes('tests/version-suite-registry-check.mjs'), 'CI gate registry syntax matrix must cover version registry check');
assert.equal(/v.*-no-browser-suite\.mjs/.test(ciNoBrowser), false, 'CI must not reference removed historical wrapper files');

for (const file of ['tests/version-suite-registry-check.mjs','tests/ci-gate-runner.mjs','tests/ci-gate-registry-check.mjs']) {
  const syntax = spawnSync(process.execPath, ['--check', file], {encoding:'utf8'});
  assert.equal(syntax.status, 0, syntax.stderr || syntax.stdout || `syntax failed: ${file}`);
}

console.log('Version suite registry and package script compression checks passed.');
process.exit(0);
