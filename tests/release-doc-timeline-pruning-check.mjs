import assert from 'node:assert/strict';
import fs from 'node:fs';
import { readReleaseDoc, releaseDocExists, releaseHistory } from './release-docs-loader.mjs';

const VERSION = '1.1.0-alpha.10';
const TITLE = 'Hosted Evidence Capture Polish + Visual Artifact Guard';
const history = releaseHistory();
const currentRelease = fs.readFileSync('docs/current-release.md', 'utf8');
const releaseEvidence = fs.readFileSync('docs/release-and-evidence.md', 'utf8');
const roadmap = fs.readFileSync('docs/roadmap.md', 'utf8');
const qaMatrix = fs.readFileSync('docs/qa-matrix.md', 'utf8');

assert.ok(releaseDocExists(`docs/v${VERSION}-hosted-evidence-capture-polish-visual-artifact-guard.md`), 'alpha.10 release doc must exist in release history');
const doc = readReleaseDoc(`docs/v${VERSION}-hosted-evidence-capture-polish-visual-artifact-guard.md`);
assert.ok(doc.includes(`# v${VERSION} — ${TITLE}`));
assert.ok(doc.includes('waitForEvidenceStable'));
assert.ok(doc.includes('assertNoTransientArtifacts'));
assert.ok(doc.includes('capture_settled'));
assert.ok(doc.includes('visual_artifact_guard_passed'));
assert.ok(doc.includes('No runtime behavior change'));

assert.ok(history.includes('## Pruned timeline index'), 'release history must expose a pruned timeline index');
assert.ok(history.includes('timeline_pruning_policy'), 'release history must document the timeline pruning policy');
assert.ok(history.includes('v1.1.0-alpha.9 — Test Matrix Runtime Optimization + Release Doc Timeline Pruning'), 'release history must preserve alpha.9 timeline pruning anchor');
assert.ok(history.includes(`v${VERSION} — ${TITLE}`), 'release history must include current alpha.10 title');
assert.equal((history.match(/<!-- release-file:v1\.1\.0-alpha\.7-package-script-compression-ci-gate-registry\.md -->/g) || []).length, 1, 'duplicate alpha.7 release-history section must be pruned');
assert.ok(Buffer.byteLength(history, 'utf8') <= 130 * 1024, 'release history must remain under the alpha.10 timeline budget');

for (const corpus of [currentRelease, releaseEvidence, roadmap, qaMatrix]) {
  assert.ok(corpus.includes(`v${VERSION}`), 'current docs must identify alpha.10');
  assert.ok(corpus.includes(TITLE), 'current docs must identify alpha.10 title');
}

console.log('Release doc timeline pruning checks passed.');
process.exit(0);
