import assert from 'node:assert/strict';
import fs from 'node:fs';

const VERSION = '1.3.0-rc.2';
const RELEASE = 'v1.3.0-rc.2 — RC Evidence Tightening + Release Notes Finalization';
const PUBLIC_LABEL = 'v1.3.0-rc.2 RC Evidence Tightening + Release Notes Finalization';
const LOCKED_BASELINE = 'v1.3.0-rc.1 — Manual Workflow Release Candidate Freeze';
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
assert.ok(pkg.description.includes(PUBLIC_LABEL), 'package description must expose the rc.2 public label');
assert.ok(pkg.description.includes(LOCKED_BASELINE), 'package description must preserve the locked rc.1 baseline identity');
assert.ok(pkg.description.includes(MANUAL_BASELINE), 'package description must preserve the alpha.10 manual workflow baseline identity');
assert.ok(pkg.description.includes('manual workflow baseline') || pkg.description.includes('manual source-to-brief/publication workflow'), 'package description must identify the frozen manual workflow');

assert.equal(manifest.version, VERSION);
assert.equal(manifest.release_title, RELEASE);
assert.match(manifest.release_type, /rc-evidence-tightening|release-notes-finalization/);
assert.equal(manifest.runtime_capability_change, false);
assert.equal(manifest.provider_behavior_changed, false);
assert.equal(manifest.oauth_behavior_changed, false);
assert.equal(manifest.backend_behavior_changed, false);
assert.equal(manifest.source_behavior_changed, false);
assert.equal(manifest.storage_behavior_changed, false);
assert.equal(manifest.public_demo_capability_expansion, false);
assert.ok(manifest.release_scope.includes('RC evidence tightening'));
assert.ok(manifest.release_scope.includes('Brief Publication Pack v4'));

for (const text of [current, roadmap, changelog, publicDemo]) {
  assert.ok(text.includes(RELEASE) || text.includes(PUBLIC_LABEL), 'release docs must expose rc.2 identity');
  assert.ok(text.includes(LOCKED_BASELINE), 'release docs must preserve rc.1 as the locked baseline');
  assert.ok(text.includes(MANUAL_BASELINE), 'release docs must preserve alpha.10 manual workflow baseline');
  assert.ok(/no live scraping|No live scraping/i.test(text), 'release docs must preserve no-live-scraping boundary');
  assert.ok(/no production OAuth|No production OAuth/i.test(text), 'release docs must preserve no-production-OAuth boundary');
  assert.ok(/no backend behavior expansion|No backend behavior expansion/i.test(text), 'release docs must preserve backend boundary');
  assert.ok(/no provider execution expansion|No provider execution expansion/i.test(text), 'release docs must preserve provider boundary');
}

assert.ok(current.includes('Status: built locally. Lock is pending green no-browser CI, green browser CI'), 'current release must remain pre-lock until CI evidence is uploaded');
assert.ok(current.includes(`Last locked release: \`${LOCKED_BASELINE}\``), 'current release must mark rc.1 as last locked baseline');
assert.ok(roadmap.includes('v1.3.0-rc.2 — RC Evidence Tightening + Release Notes Finalization'));
assert.ok(roadmap.includes('v1.3.0 — Manual Workflow Stable Release'));
assert.ok(roadmap.includes('v1.4.0-alpha.1 — Controlled Provider/Source Execution Preparation'));

assert.ok(workflow.includes('lock-evidence-bundle_1.3.0-rc.2_${{ github.run_id }}'), 'CI workflow must upload rc.2 lock bundle');
assert.ok(workflow.includes("summary.internal_build_version !== '1.3.0-rc.2'"), 'CI workflow must assert rc.2 evidence matrix version');

for (const gate of ['no-browser', 'current-no-browser', 'release']) {
  assert.ok(registry.gates[gate].node_checks.includes('tests/rc-evidence-tightening-release-notes-finalization-check.mjs'), `${gate} must run rc.2 evidence tightening check`);
}
assert.ok(registry.syntax_matrix.files.includes('tests/rc-evidence-tightening-release-notes-finalization-check.mjs'), 'syntax matrix must cover rc.2 evidence tightening check');

console.log('RC Evidence Tightening + Release Notes Finalization checks passed.');
process.exit(0);
