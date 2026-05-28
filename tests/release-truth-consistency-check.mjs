import assert from 'node:assert/strict';
import fs from 'node:fs';

const VERSION = '1.4.0-alpha.8';
const RELEASE = 'v1.4.0-alpha.8 — Credential Boundary Runtime Drill';
const PUBLIC_LABEL = 'v1.4.0-alpha.8 Credential Boundary Runtime Drill';
const STABLE_BASELINE = 'v1.3.0 — Stable Manual Workflow Release';
const SOURCE_ACQUISITION_BASELINE = 'v1.4.0-alpha.7 — Source Acquisition Control Surface';
const MOCK_TO_LIVE_BASELINE = 'v1.4.0-alpha.6 — Provider Execution Harness Mock-to-Live Equivalence';
const REPLAY_BASELINE = 'v1.4.0-alpha.5 — Dry-Run Replay Pack + Operator Approval Simulation';
const TRACE_BASELINE = 'v1.4.0-alpha.4 — Dry-Run Trace Inspector + Execution Readiness Report';
const DRY_RUN_BASELINE = 'v1.4.0-alpha.3 — Provider/Source Dry-Run Execution Harness + Policy Simulator';
const CONTROL_BASELINE = 'v1.4.0-alpha.2 — Provider/Source Execution Policy Matrix + Failure UX Contracts';
const PREPARATION_BASELINE = 'v1.4.0-alpha.1 — Controlled Provider/Source Execution Preparation';
const MANUAL_BASELINE = 'v1.3.0-alpha.10 — Brief Publication Pack v4';

function read(path) { return fs.readFileSync(path, 'utf8'); }
function json(path) { return JSON.parse(read(path)); }

const pkg = json('package.json');
const manifest = json('MANIFEST.json');
const current = read('docs/current-release.md');
const roadmap = read('docs/roadmap.md');
const readme = read('README.md');
const changelog = read('CHANGELOG.md');
const publicDemo = read('PUBLIC_DEMO.md');
const qa = read('docs/qa-matrix.md');
const ciRegistry = json('tests/ci-gate-registry.json');
const versionRegistry = json('tests/version-suite-registry.json');
const index = read('index.html');
const render = read('src/research/render-helpers.js');

assert.equal(pkg.version, VERSION);
assert.ok(pkg.description.includes(PUBLIC_LABEL), 'package description must expose alpha.8 public label');
for (const token of ['source strategy continuity','release evidence continuity','package script compression and CI gate registry','cryptographic signature claim', STABLE_BASELINE, MOCK_TO_LIVE_BASELINE]) {
  assert.ok(pkg.description.includes(token), `package description missing token: ${token}`);
}

assert.equal(manifest.version, VERSION);
assert.equal(manifest.release_title, RELEASE);
assert.equal(manifest.release_type, 'credential-boundary-runtime-drill');
for (const key of ['runtime_capability_change','provider_behavior_changed','oauth_behavior_changed','backend_behavior_changed','source_behavior_changed','storage_behavior_changed','public_demo_capability_expansion']) assert.equal(manifest[key], false, `${key} must remain false`);
for (const token of ['Planning/control-plane milestone', SOURCE_ACQUISITION_BASELINE, MOCK_TO_LIVE_BASELINE, STABLE_BASELINE, 'real API keys', 'cryptographic signing']) {
  assert.ok(manifest.release_scope.includes(token), `manifest release scope missing ${token}`);
}

for (const [name, text] of Object.entries({ current, roadmap, readme, changelog, publicDemo, qa })) {
  assert.ok(text.includes(RELEASE) || text.includes(PUBLIC_LABEL), `${name} must expose alpha.8 release identity`);
  assert.ok(text.includes(STABLE_BASELINE), `${name} must preserve v1.3.0 stable baseline`);
  assert.ok(text.includes(SOURCE_ACQUISITION_BASELINE), `${name} must preserve alpha.7 lock baseline`);
  assert.ok(text.includes(MOCK_TO_LIVE_BASELINE), `${name} must preserve alpha.6 lock baseline`);
  assert.ok(/no live scraping/i.test(text), `${name} must preserve no-live-scraping boundary`);
  assert.ok(/No production OAuth|no production OAuth|No real OAuth|no real OAuth/i.test(text), `${name} must preserve OAuth boundary`);
  assert.ok(/No real API keys|no real API keys/i.test(text), `${name} must preserve real API key boundary`);
  assert.ok(/cryptographic/i.test(text), `${name} must preserve no-cryptographic-signature boundary`);
  assert.ok(/automatic source verification/i.test(text), `${name} must preserve no-auto-verification boundary`);
}

for (const baseline of [SOURCE_ACQUISITION_BASELINE, REPLAY_BASELINE, TRACE_BASELINE, DRY_RUN_BASELINE, CONTROL_BASELINE, PREPARATION_BASELINE, MANUAL_BASELINE]) {
  assert.ok(current.includes(baseline), `current release must preserve ${baseline}`);
  assert.ok(roadmap.includes(baseline), `roadmap must preserve ${baseline}`);
}

for (const token of ['fake secret injection','export leak','log leak','browser-visible text leak','fixture leak','provider payload secret-boundary','release bundle secret-boundary','ADR-014']) {
  assert.ok(current.includes(token) || readme.includes(token) || changelog.includes(token), `alpha.8 credential boundary token missing: ${token}`);
}
for (const token of ['manual_source','provider_proposed_source','future_controlled_fetch','ADR-013']) {
  assert.ok(current.includes(token) || readme.includes(token) || changelog.includes(token), `alpha.7 source acquisition continuity token missing: ${token}`);
}

assert.ok(index.includes('v1.4.0-alpha.8 Credential Boundary Runtime Drill'));
assert.ok(render.includes('v1.4.0-alpha.8 Credential Boundary Runtime Drill'));
assert.ok(render.includes('سطح التحكم في اكتساب المصادر'));
assert.ok(render.includes('Surface de contrôle d’acquisition des sources'));
assert.equal(render.includes('v1.4.0-alpha.8 Pack de rejeu dry-run'), false, 'stale FR alpha.5 label must not return');
assert.equal(render.includes('حزمة إعادة تشغيل التجربة الجافة'), false, 'stale AR alpha.5 label must not return');

assert.equal(ciRegistry.ci_gate_registry_version, VERSION);
assert.equal(ciRegistry.release_title, RELEASE);
assert.equal(versionRegistry.version_suite_registry_version, VERSION);
assert.equal(versionRegistry.release_title, RELEASE);

for (const gate of ['no-browser','current-no-browser','privacy','provider','release']) {
  assert.ok(ciRegistry.gates[gate].node_checks.includes('tests/credential-boundary-runtime-drill-check.mjs'), `${gate} must run credential boundary runtime drill check`);
}
for (const gate of ['no-browser','current-no-browser','source','release']) {
  assert.ok(ciRegistry.gates[gate].node_checks.includes('tests/source-acquisition-control-surface-check.mjs'), `${gate} must preserve source acquisition control surface check`);
  assert.ok(ciRegistry.gates[gate].node_checks.includes('tests/provider-execution-mock-to-live-equivalence-check.mjs'), `${gate} must preserve provider execution mock-to-live equivalence check`);
}
assert.ok(ciRegistry.syntax_matrix.files.includes('src/research/source-acquisition-control-surface.js'), 'syntax matrix must cover source acquisition module');
assert.ok(ciRegistry.syntax_matrix.files.includes('tests/source-acquisition-control-surface-check.mjs'), 'syntax matrix must cover source acquisition check');
assert.ok(ciRegistry.syntax_matrix.files.includes('src/research/credential-boundary-runtime-drill.js'), 'syntax matrix must cover credential boundary module');
assert.ok(ciRegistry.syntax_matrix.files.includes('tests/credential-boundary-runtime-drill-check.mjs'), 'syntax matrix must cover credential boundary check');

for (const key of ['runtime_capability_change','provider_behavior_changed','oauth_behavior_changed','backend_behavior_changed','source_behavior_changed','storage_behavior_changed','source_connector_behavior_changed']) {
  assert.equal(ciRegistry[key], false, `${key} must remain false in CI registry`);
}

console.log('Release truth consistency checks passed.');
process.exit(0);
