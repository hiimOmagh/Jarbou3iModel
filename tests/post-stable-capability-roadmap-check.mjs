import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const CURRENT_VERSION = '1.4.0-alpha.33';
const CURRENT_TITLE = 'Adapter Replay Review Pack Decision Queue';
const VERSION = '1.3.0';
const RELEASE = 'v1.3.0 — Stable Manual Workflow Release';
const read = (file) => fs.readFileSync(file, 'utf8');
const json = (file) => JSON.parse(read(file));

const pkg = json('package.json');
const lock = json('package-lock.json');
const manifest = json('MANIFEST.json');
const schema = json('schema/research-workflow.schema.json');
const index = read('index.html');
const source = read('src/research/post-stable-expansion-gate.js');
const roadmap = read('docs/roadmap.md');
const currentRelease = read('docs/current-release.md');
const changelog = read('CHANGELOG.md');
const registry = json('tests/ci-gate-registry.json');
const fixture = json('fixtures/research/sample-research-workflow-en.json');

assert.equal(pkg.version, CURRENT_VERSION);
assert.equal(lock.version, CURRENT_VERSION);
assert.equal(lock.packages[''].version, CURRENT_VERSION);
assert.equal(schema.properties.workflow_version.const, VERSION);
assert.equal(manifest.version, CURRENT_VERSION);
assert.equal(manifest.release_title, `v${CURRENT_VERSION} — ${CURRENT_TITLE}`);
assert.equal(manifest.runtime_capability_change, false);
assert.equal(manifest.provider_behavior_changed, false);
assert.equal(manifest.oauth_behavior_changed, false);
assert.equal(manifest.backend_behavior_changed, false);
assert.equal(manifest.source_behavior_changed, false);
assert.equal(manifest.storage_behavior_changed, false);
assert.equal(manifest.public_demo_capability_expansion, false);
assert.equal(fixture.workflow_version, VERSION);
assert.equal(fixture.release_notes.release_title, RELEASE);

assert.ok(index.includes('src="src/research/post-stable-expansion-gate.js" defer'));
assert.ok(index.includes('v1.3.0 · Stable Manual Workflow Release'));
assert.ok(source.includes("const VERSION = '1.3.0'"));
assert.ok(source.includes('No live scraping or uncontrolled source fetching'));
assert.ok(source.includes('automatic_source_verification_claimed:false'));
assert.ok(source.includes('implementation_allowed:false'));

new vm.Script(source, {filename:'src/research/post-stable-expansion-gate.js'});
const sandbox = {console, window:{Jarbou3iResearchModules:{}}, globalThis:null};
sandbox.globalThis = sandbox;
vm.createContext(sandbox);
vm.runInContext(source, sandbox, {filename:'src/research/post-stable-expansion-gate.js'});
const gateApi = sandbox.window.Jarbou3iResearchModules.postStableExpansionGate;
assert.equal(gateApi.VERSION, VERSION);
assert.equal(gateApi.STABLE_BASELINE, '1.1.0');
assert.ok(gateApi.ROADMAP_LANES.length >= 6);
assert.ok(gateApi.ROADMAP_LANES.every((lane) => lane.implementation_allowed === false));
assert.ok(gateApi.ROADMAP_LANES.every((lane) => lane.capability_available === false));
assert.ok(gateApi.ROADMAP_LANES.every((lane) => lane.acceptance_criteria.length >= gateApi.MIN_ACCEPTANCE_CRITERIA));
assert.ok(gateApi.ROADMAP_LANES.every((lane) => lane.falsifiers.length >= gateApi.MIN_FALSIFIERS));
assert.ok(gateApi.ROADMAP_LANES.every((lane) => lane.evidence_required.length >= gateApi.MIN_EVIDENCE_REQUIREMENTS));

const gate = gateApi.buildPostStableExpansionGate({selected_lanes:['source_strategy_v2','provider_execution_path']}, {now:'2026-05-23T00:00:00.000Z'});
assert.equal(gate.expansion_gate_version, VERSION);
assert.equal(gate.release_title, RELEASE);
assert.equal(gate.stable_baseline_version, '1.1.0');
assert.equal(gate.stage, 'post_stable_capability_roadmap_expansion_gate');
assert.equal(gate.implementation_allowed, false);
assert.equal(gate.capability_expansion_enabled, false);
assert.equal(gate.runtime_capability_change, false);
assert.equal(gate.provider_behavior_changed, false);
assert.equal(gate.oauth_behavior_changed, false);
assert.equal(gate.backend_behavior_changed, false);
assert.equal(gate.source_behavior_changed, false);
assert.equal(gate.storage_behavior_changed, false);
assert.equal(gate.automatic_source_verification_claimed, false);
assert.equal(gate.live_scraping_enabled, false);
assert.equal(gate.selected_lane_count, 2);
assert.equal(gate.release_gate, 'post_stable_expansion_gate_ready');
assert.ok(gate.global_blockers.some((item) => item.includes('No live scraping')));
assert.ok(gate.disproven_if.some((item) => item.includes('provider execution expansion')));
assert.ok(gate.lanes.find((lane) => lane.lane_id === 'source_strategy_v2').selected);
assert.ok(gate.lanes.find((lane) => lane.lane_id === 'provider_execution_path').selected);
assert.ok(gate.lanes.every((lane) => lane.readiness_score === 100));

for (const doc of [roadmap,currentRelease,changelog]) {
  assert.ok(doc.includes(RELEASE));
  assert.ok(/no live scraping/i.test(doc));
  assert.ok(/no production OAuth/i.test(doc) || /production OAuth/i.test(doc));
  assert.ok(/no backend/i.test(doc) || /backend behavior expansion/i.test(doc));
}

assert.ok(registry.gates['no-browser'].node_checks.includes('tests/post-stable-capability-roadmap-check.mjs'));
assert.ok(registry.gates.release.node_checks.includes('tests/post-stable-capability-roadmap-check.mjs'));
assert.ok(registry.syntax_matrix.files.includes('src/research/post-stable-expansion-gate.js'));
assert.ok(registry.syntax_matrix.files.includes('tests/post-stable-capability-roadmap-check.mjs'));

console.log('Post-stable capability roadmap and expansion gate checks passed.');
process.exit(0);
