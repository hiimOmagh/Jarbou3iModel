import assert from 'node:assert/strict';
import fs from 'node:fs';

const VERSION = '1.3.0-alpha.8';
const RELEASE = 'v1.3.0-alpha.8 — Signed Export Handoff Pack + Lock Ledger Review Surface';
const PUBLIC_LABEL = 'v1.3.0-alpha.8 Signed Export Handoff Pack + Lock Ledger Review Surface';
const LOCKED_BASELINE = 'v1.3.0-alpha.7 — Release Truth Sweep + Roadmap Compression';

function read(path) {
  return fs.readFileSync(path, 'utf8');
}

const pkg = JSON.parse(read('package.json'));
const manifest = JSON.parse(read('MANIFEST.json'));
const current = read('docs/current-release.md');
const roadmap = read('docs/roadmap.md');
const readme = read('README.md');
const changelog = read('CHANGELOG.md');
const publicDemo = read('PUBLIC_DEMO.md');
const refactorAudit = read('docs/source-refactor-readiness-audit.md');
const ciRegistry = JSON.parse(read('tests/ci-gate-registry.json'));

assert.equal(pkg.version, VERSION);
assert.ok(pkg.description.includes(PUBLIC_LABEL), 'package description must expose alpha.8 public label');
assert.ok(pkg.description.includes('release evidence continuity'), 'package description must preserve release evidence token');
assert.ok(pkg.description.includes('package script compression and CI gate registry'), 'package description must preserve CI gate registry token');
assert.ok(pkg.description.includes('source strategy continuity'), 'package description must preserve source strategy token');
assert.ok(pkg.description.includes('cryptographic signature claim'), 'package description must preserve no-crypto-signature boundary');

assert.equal(manifest.version, VERSION);
assert.equal(manifest.release_title, RELEASE);
assert.equal(manifest.runtime_capability_change, false);
assert.equal(manifest.provider_behavior_changed, false);
assert.equal(manifest.oauth_behavior_changed, false);
assert.equal(manifest.backend_behavior_changed, false);
assert.equal(manifest.source_behavior_changed, false);
assert.equal(manifest.storage_behavior_changed, false);
assert.ok(manifest.release_scope.includes('Signed export handoff and lock-ledger review surface pass'));
assert.ok(manifest.release_scope.includes('cryptographic signing'));

for (const [name, text] of Object.entries({ current, roadmap, readme, changelog, publicDemo })) {
  assert.ok(text.includes(RELEASE) || text.includes(PUBLIC_LABEL), `${name} must expose alpha.8 release identity`);
  assert.ok(text.includes('no live scraping') || text.includes('No live scraping'), `${name} must preserve no-live boundary`);
  assert.ok(text.includes('no production OAuth') || text.includes('No production OAuth'), `${name} must preserve OAuth boundary`);
  assert.ok(text.includes('cryptographic') || text.includes('Cryptographic'), `${name} must preserve no-cryptographic-signature boundary`);
}

assert.ok(current.includes(`Last locked release: \`${LOCKED_BASELINE}\``), 'current-release must explicitly mark alpha.7 as locked baseline');
assert.equal(current.includes('built locally, no-browser validated pending browser lock evidence'), false, 'current-release must not keep stale pending-browser wording');
assert.ok(current.includes('Status: built locally. Lock is pending green no-browser CI, green browser CI'), 'current-release must describe alpha.8 lock state precisely');
assert.ok(current.includes('Signed Export Handoff Pack'));
assert.ok(current.includes('Lock Ledger Review Surface'));

assert.ok(roadmap.includes('v1.3.0-alpha.9 — Source-to-Claim Gap Closure Queue'));
assert.ok(roadmap.includes('v1.3.0-alpha.10 — Brief Publication Pack v4'));
assert.ok(roadmap.includes('v1.4.0-alpha.1 — Controlled Provider/Source Execution Preparation'));
assert.equal(roadmap.includes('only after alpha.5 no-browser CI'), false, 'roadmap must not preserve stale alpha.5 dependency text');
assert.equal(roadmap.includes('Next valid milestone:'), false, 'roadmap should use compressed next milestones rather than stale next-valid milestone wording');

assert.equal(refactorAudit.includes('Forbidden in alpha.11'), false, 'source refactor audit must not reference stale alpha.11 ban column');
assert.equal(refactorAudit.includes('alpha.11 changes runtime behavior'), false, 'source refactor audit must not use stale alpha.11 invalidation wording');
assert.ok(refactorAudit.includes('Forbidden before explicit refactor milestone'));

assert.ok(ciRegistry.gates['no-browser'].node_checks.includes('tests/release-truth-consistency-check.mjs'), 'no-browser CI must run release-truth consistency check');
assert.ok(ciRegistry.gates['current-no-browser'].node_checks.includes('tests/release-truth-consistency-check.mjs'), 'current no-browser gate must run release-truth consistency check');
assert.ok(ciRegistry.gates.release.node_checks.includes('tests/release-truth-consistency-check.mjs'), 'release gate must run release-truth consistency check');
assert.ok(ciRegistry.syntax_matrix.files.includes('tests/release-truth-consistency-check.mjs'), 'syntax matrix must cover release-truth consistency check');

console.log('Release truth consistency checks passed.');
process.exit(0);
