import assert from 'node:assert/strict';
import fs from 'node:fs';

const VERSION = '1.4.0-alpha.3';
const RELEASE = 'v1.4.0-alpha.3 — Provider/Source Dry-Run Execution Harness + Policy Simulator';
const PUBLIC_LABEL = 'v1.4.0-alpha.3 Provider/Source Dry-Run Execution Harness + Policy Simulator';
const STABLE_BASELINE = 'v1.3.0 — Stable Manual Workflow Release';
const LOCKED_RC_BASELINE = 'v1.3.0-rc.2 — RC Evidence Tightening + Release Notes Finalization';
const MANUAL_BASELINE = 'v1.3.0-alpha.10 — Brief Publication Pack v4';
const CONTROL_BASELINE = 'v1.4.0-alpha.2 — Provider/Source Execution Policy Matrix + Failure UX Contracts';
const PREPARATION_BASELINE = 'v1.4.0-alpha.1 — Controlled Provider/Source Execution Preparation';

function read(path) { return fs.readFileSync(path, 'utf8'); }
function json(path) { return JSON.parse(read(path)); }

const pkg = json('package.json');
const manifest = json('MANIFEST.json');
const current = read('docs/current-release.md');
const roadmap = read('docs/roadmap.md');
const readme = read('README.md');
const changelog = read('CHANGELOG.md');
const publicDemo = read('PUBLIC_DEMO.md');
const refactorAudit = read('docs/source-refactor-readiness-audit.md');
const ciRegistry = json('tests/ci-gate-registry.json');

assert.equal(pkg.version, VERSION);
assert.ok(pkg.description.includes(PUBLIC_LABEL), 'package description must expose alpha.3 public label');
assert.ok(pkg.description.includes('release evidence continuity'), 'package description must preserve release evidence token');
assert.ok(pkg.description.includes('package script compression and CI gate registry'), 'package description must preserve CI gate registry token');
assert.ok(pkg.description.includes('source strategy continuity'), 'package description must preserve source strategy token');
assert.ok(pkg.description.includes('cryptographic signature claim'), 'package description must preserve no-crypto-signature boundary');
assert.ok(pkg.description.includes(STABLE_BASELINE), 'package description must preserve locked stable baseline');

assert.equal(manifest.version, VERSION);
assert.equal(manifest.release_title, 'v1.4.0-alpha.3 — Provider/Source Dry-Run Execution Harness + Policy Simulator');
assert.equal(manifest.release_type, 'provider-source-dry-run-policy-simulator');
for (const key of ['runtime_capability_change','provider_behavior_changed','oauth_behavior_changed','backend_behavior_changed','source_behavior_changed','storage_behavior_changed','public_demo_capability_expansion']) assert.equal(manifest[key], false, `${key} must remain false`);
assert.ok(manifest.release_scope.includes('Planning/control-plane milestone') || manifest.release_scope.includes('Planning/preflight milestone'));
assert.ok(manifest.release_scope.includes(STABLE_BASELINE));
assert.ok(manifest.release_scope.includes('cryptographic signing'));

for (const [name, text] of Object.entries({ current, roadmap, readme, changelog, publicDemo })) {
  assert.ok(text.includes(RELEASE) || text.includes(PUBLIC_LABEL), `${name} must expose alpha.3 release identity`);
  assert.ok(text.includes(STABLE_BASELINE), `${name} must preserve v1.3.0 stable baseline`);
  assert.ok(/no live scraping/i.test(text), `${name} must preserve no-live-scraping boundary`);
  assert.ok(/no production OAuth/i.test(text), `${name} must preserve OAuth boundary`);
  assert.ok(/cryptographic/i.test(text), `${name} must preserve no-cryptographic-signature boundary`);
}

assert.ok(current.includes(`Last locked stable baseline: \`${STABLE_BASELINE}\``), 'current-release must mark v1.3.0 as locked stable baseline');
assert.ok(current.includes(LOCKED_RC_BASELINE), 'current-release must preserve rc.2 lock baseline');
assert.ok(current.includes(CONTROL_BASELINE), 'current-release must preserve alpha.2 control baseline');
assert.ok(current.includes(PREPARATION_BASELINE), 'current-release must preserve alpha.1 preparation baseline');
assert.ok(current.includes(MANUAL_BASELINE), 'current-release must preserve alpha.10 manual workflow baseline');
assert.equal(current.includes('built locally, no-browser validated pending browser lock evidence'), false, 'current-release must not keep stale pending-browser wording');
assert.ok(current.includes('Status: built locally. Lock is pending green no-browser CI, green browser CI'), 'current-release must describe alpha.2 pre-lock state precisely');
assert.ok(current.includes('Provider execution threat model'));
assert.ok(current.includes('Provider execution preflight gate') || current.includes('Preserve alpha.1 provider execution threat model and preflight gate'));
assert.ok(current.includes('Provider/source execution policy matrix'));
assert.ok(current.includes('Provider/source failure UX contracts'));
assert.ok(current.includes('Provider/source dry-run execution harness'));
assert.ok(current.includes('Provider/source policy simulator'));

assert.ok(roadmap.includes(RELEASE));
assert.ok(roadmap.includes(CONTROL_BASELINE));
assert.ok(roadmap.includes(PREPARATION_BASELINE));
assert.ok(roadmap.includes(STABLE_BASELINE));
assert.ok(roadmap.includes(MANUAL_BASELINE));
assert.equal(roadmap.includes('only after alpha.5 no-browser CI'), false, 'roadmap must not preserve stale alpha.5 dependency text');
assert.equal(roadmap.includes('Next valid milestone:'), false, 'roadmap should use compressed next milestones rather than stale next-valid milestone wording');

assert.equal(refactorAudit.includes('Forbidden in alpha.11'), false, 'source refactor audit must not reference stale alpha.11 ban column');
assert.equal(refactorAudit.includes('alpha.11 changes runtime behavior'), false, 'source refactor audit must not use stale alpha.11 invalidation wording');
assert.ok(refactorAudit.includes('Forbidden before explicit refactor milestone'));

for (const gate of ['no-browser','current-no-browser','source','release']) {
  assert.ok(ciRegistry.gates[gate].node_checks.includes('tests/provider-execution-threat-model-check.mjs'), `${gate} must run provider threat-model check`);
  assert.ok(ciRegistry.gates[gate].node_checks.includes('tests/provider-execution-preflight-check.mjs'), `${gate} must run provider preflight check`);
  assert.ok(ciRegistry.gates[gate].node_checks.includes('tests/provider-source-execution-policy-matrix-check.mjs'), `${gate} must run provider/source policy matrix check`);
  assert.ok(ciRegistry.gates[gate].node_checks.includes('tests/provider-source-failure-ux-contracts-check.mjs'), `${gate} must run provider/source failure UX contracts check`);
  assert.ok(ciRegistry.gates[gate].node_checks.includes('tests/provider-source-dry-run-execution-harness-check.mjs'), `${gate} must run provider/source dry-run harness check`);
  assert.ok(ciRegistry.gates[gate].node_checks.includes('tests/provider-source-policy-simulator-check.mjs'), `${gate} must run provider/source policy simulator check`);
}
assert.ok(ciRegistry.syntax_matrix.files.includes('tests/release-truth-consistency-check.mjs'), 'syntax matrix must cover release-truth consistency check');
assert.ok(ciRegistry.syntax_matrix.files.includes('src/research/provider-execution-threat-model.js'), 'syntax matrix must cover provider threat model');
assert.ok(ciRegistry.syntax_matrix.files.includes('src/research/provider-execution-preflight.js'), 'syntax matrix must cover provider preflight');
assert.ok(ciRegistry.syntax_matrix.files.includes('src/research/provider-source-execution-policy-matrix.js'), 'syntax matrix must cover provider/source policy matrix');
assert.ok(ciRegistry.syntax_matrix.files.includes('src/research/provider-source-failure-ux-contracts.js'), 'syntax matrix must cover provider/source failure UX contracts');
assert.ok(ciRegistry.syntax_matrix.files.includes('src/research/provider-source-dry-run-execution-harness.js'), 'syntax matrix must cover provider/source dry-run execution harness');
assert.ok(ciRegistry.syntax_matrix.files.includes('src/research/provider-source-policy-simulator.js'), 'syntax matrix must cover provider/source policy simulator');

console.log('Release truth consistency checks passed.');
process.exit(0);
