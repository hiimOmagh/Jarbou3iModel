import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { getMigrationFixture, getPrivacyFixture, fixturePathExists } from './fixture-registry-loader.mjs';
import { readReleaseDoc, releaseDocExists } from './release-docs-loader.mjs';

const repoRoot = process.cwd();
const read = (file) => fs.readFileSync(path.join(repoRoot, file), 'utf8');
const json = (file) => JSON.parse(read(file));
const exists = (file) => fixturePathExists(file) || fs.existsSync(path.join(repoRoot, file));

const VERSION = '1.2.0-alpha.1';
const PREVIOUS_VERSION = '1.1.0-alpha.1';
const FREEZE_BASELINE = '1.0.30';
const TITLE = 'Post-Stable Capability Roadmap + Expansion Gate';
const DOC = 'docs/v1.1.0-evidence-pack-export-v3-brief-traceability.md';
const ARTIFACT = 'jarbou3i-research-engine-v1.2.0-alpha.1-post-stable-capability-roadmap-expansion-gate.zip';

const pkg = json('package.json');
const lock = json('package-lock.json');
const index = read('index.html');
const moduleSource = read('src/research/post-freeze-planning-gate.js');
const releaseDoc = readReleaseDoc(DOC);
const migrationFixture = getMigrationFixture('fixtures/migrations/v1.2.0-alpha.1-packet.json');
const privacyFixture = getPrivacyFixture('fixtures/privacy/browser-generated-export-v1.2.0-alpha.1.json');

assert.equal(pkg.version, VERSION);
assert.equal(lock.version, VERSION);
assert.equal(lock.packages[''].version, VERSION);
assert.ok(pkg.description.includes('package script compression and CI gate registry'));
assert.ok(index.includes(`v${VERSION} · ${TITLE}`), 'index badge must expose alpha.2 lane criteria identity');
assert.ok(index.includes('data-r-i18n="stableWorkflowTitle"') && index.includes('تدقيق الاحتفاظ بالملفات'), 'localized index must keep repository audit workflow visible');
assert.ok(index.includes('إثبات الدمج الآمن'), 'localized index must mention proof before reduction');
assert.ok(moduleSource.includes("const VERSION = '1.2.0-alpha.1'"));
assert.ok(moduleSource.includes("const PREVIOUS_VERSION = '1.1.0-alpha.1'"));
assert.ok(moduleSource.includes("const FREEZE_BASELINE = '1.0.30'"));
assert.ok(moduleSource.includes('acceptance_criteria'));
assert.ok(moduleSource.includes('falsifiers'));
assert.ok(moduleSource.includes('implementation_allowed:false'));
assert.ok(moduleSource.includes('runtime_capability_change:false'));
assert.ok(moduleSource.includes('Do not start implementation'));

await import(`file://${path.join(repoRoot, 'src/research/post-freeze-planning-gate.js')}`);
const gateApi = globalThis.Jarbou3iResearchModules.postFreezePlanningGate;
const gate = gateApi.buildPostFreezePlanningGate({}, {now:'2026-05-05T00:00:00.000Z'});
assert.equal(gate.post_freeze_planning_version, VERSION);
assert.equal(gate.previous_version, PREVIOUS_VERSION);
assert.equal(gate.freeze_baseline_version, FREEZE_BASELINE);
assert.equal(gate.baseline_version, PREVIOUS_VERSION);
assert.equal(gate.stage, 'expansion_lane_acceptance_matrix');
assert.equal(gate.implementation_allowed, false);
assert.equal(gate.runtime_capability_change, false);
assert.equal(gate.provider_behavior_changed, false);
assert.equal(gate.oauth_behavior_changed, false);
assert.equal(gate.backend_behavior_changed, false);
assert.equal(gate.source_behavior_changed, false);
assert.equal(gate.storage_behavior_changed, false);
assert.equal(gate.public_demo_freeze_preserved, true);
assert.equal(gate.release_gate, 'expansion_lane_criteria_ready');
assert.ok(gate.lanes.length >= 5);
assert.ok(gate.lanes.every(lane => lane.implementation_allowed === false));
assert.ok(gate.lanes.every(lane => lane.capability_expansion === false));
assert.ok(gate.lanes.every(lane => lane.criteria_ready === true));
assert.ok(gate.lanes.every(lane => lane.acceptance_criteria.length >= gateApi.MIN_ACCEPTANCE_CRITERIA));
assert.ok(gate.lanes.every(lane => lane.falsifiers.length >= gateApi.MIN_FALSIFIERS));
assert.ok(gate.lanes.every(lane => lane.evidence_required.length >= 2));
assert.ok(gate.lanes.every(lane => lane.decision_owner));
assert.ok(gate.blocked_claims.some(claim => claim.includes('live scraping')));
assert.ok(gate.blocked_claims.some(claim => claim.includes('start implementation')));

const subset = gateApi.buildPostFreezePlanningGate({selected_lanes:['source_strategy']}, {now:'2026-05-05T00:00:00.000Z'});
assert.equal(subset.selected_lane_count, 1);
assert.equal(subset.lanes.find(lane => lane.lane_id === 'source_strategy').selected, true);
assert.equal(subset.lanes.find(lane => lane.lane_id === 'ux_polish').selected, false);
assert.equal(subset.release_gate, 'expansion_lane_criteria_ready');

for (const packet of [migrationFixture, privacyFixture]) {
  assert.equal(packet.workflow_version, VERSION);
  assert.equal(packet.release_notes.release_title, `v${VERSION} — ${TITLE}`);
  assert.equal(packet.release_apply_integrity.base_version, FREEZE_BASELINE);
  assert.equal(packet.release_apply_integrity.artifact_name, ARTIFACT);
  assert.equal(packet.release_apply_integrity.runtime_capability_change, false);
  assert.equal(packet.release_apply_integrity.provider_behavior_changed, false);
  assert.equal(packet.release_apply_integrity.oauth_behavior_changed, false);
  assert.equal(packet.release_apply_integrity.backend_behavior_changed, false);
  assert.equal(packet.release_apply_integrity.source_behavior_changed, false);
  assert.equal(packet.release_apply_integrity.storage_behavior_changed, false);
}

assert.ok(releaseDocExists('docs/v1.1.0-alpha.1-post-freeze-product-expansion-planning-gate.md'), 'alpha.1 baseline doc must remain present');
assert.ok(releaseDocExists(DOC), 'alpha.2 release doc must exist');
assert.ok(releaseDoc.includes('fixture registry'));
assert.ok(releaseDoc.includes('MERGE_TO_REGISTRY'));
assert.ok(releaseDoc.includes('No live scraping'));
assert.ok(releaseDoc.includes('No files are deleted'));

for (const file of ['src/research/post-freeze-planning-gate.js','tests/expansion-lane-acceptance-matrix-check.mjs','tests/post-freeze-planning-gate-check.mjs','tests/version-suite-registry-check.mjs']) {
  const syntax = spawnSync(process.execPath, ['--check', file], { encoding: 'utf8' });
  assert.equal(syntax.status, 0, syntax.stderr || syntax.stdout || `${file} syntax failed`);
}

console.log('Expansion lane acceptance criteria matrix checks passed.');
process.exit(0);
