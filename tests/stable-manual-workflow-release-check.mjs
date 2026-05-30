import assert from 'node:assert/strict';
import fs from 'node:fs';

const VERSION = '1.4.0-alpha.22';
const RELEASE = 'v1.4.0-alpha.22 — Alpha.21 Lock Completion + Handoff Productivity Command Center';
const PUBLIC_LABEL = 'v1.4.0-alpha.22 Handoff Productivity Command Center';
const LOCKED_ALPHA14 = 'v1.4.0-alpha.14 — Adapter Replay Fixture Corpus + Coverage Matrix';
const STABLE_BASELINE = 'v1.3.0 — Stable Manual Workflow Release';
const LOCKED_RC_BASELINE = 'v1.3.0-rc.2 — RC Evidence Tightening + Release Notes Finalization';
const MANUAL_BASELINE = 'v1.3.0-alpha.10 — Brief Publication Pack v4';

const read = (path) => fs.readFileSync(path, 'utf8');
const pkg = JSON.parse(read('package.json'));
const manifest = JSON.parse(read('MANIFEST.json'));
const registry = JSON.parse(read('tests/ci-gate-registry.json'));
const current = read('docs/current-release.md');
const roadmap = read('docs/roadmap.md');
const changelog = read('CHANGELOG.md');
const publicDemo = read('PUBLIC_DEMO.md');
const workflow = read('.github/workflows/ci.yml');

assert.equal(pkg.version, VERSION);
assert.ok(pkg.description.includes(PUBLIC_LABEL), 'package description must expose alpha.15 public label');
assert.ok(pkg.description.includes(LOCKED_ALPHA14), 'package description must record locked alpha.14 baseline');
assert.ok(pkg.description.includes(STABLE_BASELINE), 'package description must preserve locked stable baseline identity');
assert.ok(pkg.description.includes(MANUAL_BASELINE), 'package description must preserve alpha.10 manual workflow baseline identity');

assert.equal(manifest.version, VERSION);
assert.equal(manifest.release_title, RELEASE);
assert.equal(manifest.release_type, 'alpha20-lock-completion-handoff-productivity-command-center');
for (const key of ['runtime_capability_change','provider_behavior_changed','oauth_behavior_changed','backend_behavior_changed','source_behavior_changed','storage_behavior_changed','public_demo_capability_expansion']) assert.equal(manifest[key], false, `${key} must remain false`);
assert.ok(manifest.release_scope.includes('Planning/control-plane milestone'));
assert.ok(manifest.release_scope.includes(STABLE_BASELINE));
assert.ok(manifest.release_scope.includes(LOCKED_ALPHA14));

for (const text of [current, roadmap, changelog, publicDemo]) {
  assert.ok(text.includes(RELEASE) || text.includes(PUBLIC_LABEL), 'release docs must expose alpha.15 identity');
  assert.ok(text.includes(LOCKED_ALPHA14), 'release docs must record locked alpha.14 baseline');
  assert.ok(text.includes(STABLE_BASELINE), 'release docs must preserve v1.3.0 stable baseline');
  assert.ok(text.includes(LOCKED_RC_BASELINE), 'release docs must preserve rc.2 as locked baseline');
  assert.ok(text.includes(MANUAL_BASELINE), 'release docs must preserve alpha.10 manual workflow baseline');
  assert.ok(/no live scraping/i.test(text), 'release docs must preserve no-live-scraping boundary');
  assert.ok(/no production OAuth|No real OAuth|no real OAuth/i.test(text), 'release docs must preserve no-production-OAuth boundary');
  assert.ok(/no backend behavior expansion/i.test(text), 'release docs must preserve backend boundary');
  assert.ok(/no provider execution expansion/i.test(text), 'release docs must preserve provider boundary');
}

assert.ok(current.includes('Status: current candidate. Lock is pending green no-browser CI, green browser CI'), 'alpha.15 current release must remain pre-lock until CI evidence is uploaded');
assert.ok(!current.includes('Status: built locally. Lock is pending'), 'stale alpha.14 local-build wording must not remain');
assert.ok(current.includes(`Last locked stable baseline: \`${STABLE_BASELINE}\``), 'current release must mark v1.3.0 as last locked stable baseline');
assert.ok(current.includes(LOCKED_ALPHA14), 'current release must mark alpha.14 as locked baseline');
assert.ok(roadmap.includes(RELEASE));
assert.ok(roadmap.includes(LOCKED_ALPHA14));
assert.ok(!roadmap.includes('No alpha.14 should start'), 'roadmap must not retain alpha.14 blocker after lock');

assert.ok(workflow.includes('lock-evidence-bundle_1.4.0-alpha.22_${{ github.run_id }}'), 'CI workflow must upload alpha.15 lock bundle');
assert.ok(workflow.includes("summary.internal_build_version !== '1.4.0-alpha.22'"), 'CI workflow must assert alpha.15 evidence matrix version');

for (const gate of ['no-browser', 'current-no-browser', 'release']) {
  assert.ok(registry.gates[gate].node_checks.includes('tests/stable-manual-workflow-release-check.mjs'), `${gate} must run baseline continuity check`);
}
assert.ok(registry.syntax_matrix.files.includes('tests/stable-manual-workflow-release-check.mjs'), 'syntax matrix must cover baseline continuity check');

console.log('Stable baseline continuity checks passed.');
process.exit(0);
