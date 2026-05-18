import assert from 'node:assert/strict';
import fs from 'node:fs';
import { readReleaseDoc, releaseDocExists, releaseHistory } from './release-docs-loader.mjs';

const VERSION = '1.1.0-alpha.9';
const TITLE = 'Test Matrix Runtime Optimization + Release Doc Timeline Pruning';
const history = releaseHistory();
const currentRelease = fs.readFileSync('docs/current-release.md', 'utf8');
const releaseEvidence = fs.readFileSync('docs/release-and-evidence.md', 'utf8');
const roadmap = fs.readFileSync('docs/roadmap.md', 'utf8');
const qaMatrix = fs.readFileSync('docs/qa-matrix.md', 'utf8');

assert.ok(releaseDocExists(`docs/v${VERSION}-test-matrix-runtime-optimization-release-doc-timeline-pruning.md`), 'alpha.9 release doc must exist in release history');
const doc = readReleaseDoc(`docs/v${VERSION}-test-matrix-runtime-optimization-release-doc-timeline-pruning.md`);
assert.ok(doc.includes(`# v${VERSION} — ${TITLE}`));
assert.ok(doc.includes('tests/syntax-matrix-check.mjs'));
assert.ok(doc.includes('parallel syntax matrix'));
assert.ok(doc.includes('No runtime behavior change'));
assert.ok(doc.includes('Release Doc Timeline Pruning'));

assert.ok(history.includes('## Pruned timeline index'), 'release history must expose a pruned timeline index');
assert.ok(history.includes('timeline_pruning_policy'), 'release history must document the timeline pruning policy');
assert.ok(history.includes(`v${VERSION} — ${TITLE}`), 'release history must include current alpha.9 title');
assert.equal((history.match(/<!-- release-file:v1\.1\.0-alpha\.7-package-script-compression-ci-gate-registry\.md -->/g) || []).length, 1, 'duplicate alpha.7 release-history section must be pruned');
assert.ok(Buffer.byteLength(history, 'utf8') <= 125 * 1024, 'release history must remain under the alpha.9 timeline budget');

for (const corpus of [currentRelease, releaseEvidence, roadmap, qaMatrix]) {
  assert.ok(corpus.includes(`v${VERSION}`), 'current docs must identify alpha.9');
  assert.ok(corpus.includes(TITLE), 'current docs must identify alpha.9 title');
}

console.log('Release doc timeline pruning checks passed.');
process.exit(0);
