import assert from 'node:assert/strict';
import fs from 'node:fs';

const readJson = (file) => JSON.parse(fs.readFileSync(file, 'utf8'));
const pkg = readJson('package.json');
const manifest = readJson('MANIFEST.json');
const registry = readJson('tests/ci-gate-registry.json');
const contract = readJson('tests/current-release-contract.json');

const VERSION = contract.version;
const RELEASE = `v${VERSION} — ${contract.milestone_name}`;
const RUNTIME_SCOPE = registry.runtime_optimization?.optimization_scope || registry.runtime_optimization?.scope;

assert.equal(pkg.name, 'jarbou3i-research-engine');
assert.equal(pkg.version, VERSION);
assert.equal(manifest.version, VERSION);
assert.equal(manifest.release_title, RELEASE);
assert.equal(registry.ci_gate_registry_version, VERSION);
assert.equal(registry.release_title, RELEASE);
assert.equal(registry.runtime_optimization.version, VERSION);
assert.equal(registry.runtime_optimization.current_candidate, VERSION);
assert.equal(RUNTIME_SCOPE, 'adapter_replay_review_pack_compact_navigation_ux');
assert.ok(['release-identity-single-source-contract','adapter-replay-review-pack-ui-export-preview','adapter-replay-review-pack-triage-workbench','adapter-replay-review-pack-handoff-dossier','adapter-replay-review-pack-operator-review-console','adapter-replay-review-pack-compact-navigation-ux'].includes(manifest.release_type));
assert.ok(manifest.release_scope.includes('v1.3.0 — Stable Manual Workflow Release'), 'stable manual workflow baseline continuity must remain documented');
assert.ok(manifest.release_scope.includes('No live scraping'), 'release scope must preserve no-live-scraping boundary');
assert.ok(manifest.release_scope.includes('No production OAuth'), 'release scope must preserve OAuth boundary');
assert.ok(manifest.release_scope.includes('No credential persistence'), 'release scope must preserve credential boundary');
assert.ok(manifest.release_scope.includes('No provider execution expansion'), 'release scope must preserve provider execution boundary');
assert.ok(manifest.release_scope.includes('No backend behavior expansion'), 'release scope must preserve backend boundary');
assert.ok(manifest.release_scope.includes('No storage expansion'), 'release scope must preserve storage boundary');
assert.ok(manifest.release_scope.includes('No source behavior expansion'), 'release scope must preserve source boundary');

for (const gate of ['current-no-browser', 'no-browser', 'browser']) {
  assert.ok(registry.gates[gate], `missing CI gate: ${gate}`);
}

console.log('Stable manual workflow release checks passed.');
