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

const VERSION = '1.3.0-alpha.4';
const BASELINE = '1.1.0-alpha.1';
const TITLE = 'Brief Template UX Polish + Matrix Hygiene Cleanup';
const ARTIFACT = 'jarbou3i-research-engine-v1.3.0-alpha.4-post-stable-capability-roadmap-expansion-gate.zip';

const pkg = json('package.json');
const lock = json('package-lock.json');
const index = read('index.html');
const moduleSource = read('src/research/post-freeze-planning-gate.js');
const releaseDoc = readReleaseDoc('docs/v1.1.0-evidence-pack-export-v3-brief-traceability.md');
const migrations = read('src/research/migrations.js');
const schema = json('schema/research-workflow.schema.json');
const migrationFixture = getMigrationFixture('fixtures/migrations/v1.3.0-alpha.4-packet.json');
const privacyFixture = getPrivacyFixture('fixtures/privacy/browser-generated-export-v1.3.0-alpha.4.json');

assert.equal(pkg.version, VERSION);
assert.equal(lock.version, VERSION);
assert.equal(lock.packages[''].version, VERSION);
assert.ok(pkg.description.includes('package script compression and CI gate registry'));
assert.ok(index.includes(`v${VERSION} · ${TITLE}`), 'index badge must expose post-freeze planning identity');
assert.ok(index.includes('data-r-i18n="hostedDemoVerificationBody"') && index.includes('بوابة تخطيط فقط'), 'localized index must state planning gate only');
assert.ok(index.includes('data-r-i18n="stableWorkflowBody"') && index.includes('معايير قبول'), 'localized index must state lane criteria before implementation');
assert.ok(index.includes('يظل التنفيذ محظورًا'), 'localized index must mention implementation boundary');

assert.ok(moduleSource.includes("const VERSION = '1.3.0-alpha.4'"));
assert.ok(moduleSource.includes("const FREEZE_BASELINE = '1.0.30'"));
assert.ok(moduleSource.includes('implementation_allowed:false'));
assert.ok(moduleSource.includes('runtime_capability_change:false'));
assert.ok(moduleSource.includes('Do not claim live scraping'));

await import(`file://${path.join(repoRoot, 'src/research/post-freeze-planning-gate.js')}`);
const gate = globalThis.Jarbou3iResearchModules.postFreezePlanningGate.buildPostFreezePlanningGate({}, {now:'2026-05-05T00:00:00.000Z'});
assert.equal(gate.post_freeze_planning_version, VERSION);
assert.equal(gate.baseline_version, BASELINE);
assert.equal(gate.implementation_allowed, false);
assert.equal(gate.runtime_capability_change, false);
assert.equal(gate.provider_behavior_changed, false);
assert.equal(gate.oauth_behavior_changed, false);
assert.equal(gate.backend_behavior_changed, false);
assert.equal(gate.source_behavior_changed, false);
assert.equal(gate.storage_behavior_changed, false);
assert.equal(gate.public_demo_freeze_preserved, true);
assert.ok(gate.lanes.length >= 5);
assert.ok(gate.lanes.every(lane => lane.implementation_allowed === false));
assert.ok(gate.blocked_claims.some(claim => claim.includes('live scraping')));
assert.equal(gate.release_gate, 'expansion_lane_criteria_ready');
assert.ok(gate.lanes.every(lane => lane.acceptance_criteria.length >= 3));
assert.ok(gate.lanes.every(lane => lane.falsifiers.length >= 2));

for (const packet of [migrationFixture, privacyFixture]) {
  assert.equal(packet.workflow_version, VERSION);
  assert.equal(packet.release_notes.release_title, `v${VERSION} — ${TITLE}`);
  assert.equal(packet.release_apply_integrity.base_version, '1.0.30');
  assert.equal(packet.release_apply_integrity.artifact_name, ARTIFACT);
  assert.equal(packet.release_apply_integrity.runtime_capability_change, false);
  assert.equal(packet.release_apply_integrity.provider_behavior_changed, false);
  assert.equal(packet.release_apply_integrity.oauth_behavior_changed, false);
  assert.equal(packet.release_apply_integrity.backend_behavior_changed, false);
  assert.equal(packet.release_apply_integrity.source_behavior_changed, false);
  assert.equal(packet.release_apply_integrity.storage_behavior_changed, false);
}

assert.equal(schema.properties.workflow_version.const, VERSION);
assert.ok(migrations.includes("const TARGET_VERSION = '1.3.0-alpha.4'"));
assert.ok(migrations.includes("'1.0.29','1.0.30','1.1.0-alpha.1','1.1.0-alpha.2','1.1.0-alpha.3','1.1.0-alpha.8','1.1.0-alpha.9','1.1.0-alpha.10','1.3.0-alpha.4'"), 'migration order must preserve v1.0.30 freeze baseline and append v1.1.0');
assert.ok(releaseDocExists('docs/v1.0.30-mobile-header-geometry-lock-final-public-demo-visual-freeze.md'), 'v1.0.30 freeze doc must remain present');
assert.ok(releaseDoc.includes('fixture registry consolidation'));
assert.ok(releaseDoc.includes('fixture registry'));
assert.ok(releaseDoc.includes('unused oversized'));
assert.ok(releaseDoc.includes('No live scraping'));
assert.ok(releaseDoc.includes('No real OAuth'));

for (const file of ['src/research/post-freeze-planning-gate.js','tests/post-freeze-planning-gate-check.mjs']) {
  const syntax = spawnSync(process.execPath, ['--check', file], { encoding: 'utf8' });
  assert.equal(syntax.status, 0, syntax.stderr || syntax.stdout || `${file} syntax failed`);
}

console.log('Post-freeze planning gate checks passed.');
process.exit(0);
