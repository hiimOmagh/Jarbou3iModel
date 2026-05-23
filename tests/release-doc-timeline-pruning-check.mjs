import assert from 'node:assert/strict';
import fs from 'node:fs';
import { readReleaseDoc, releaseDocExists, releaseHistory } from './release-docs-loader.mjs';

const VERSION = '1.2.0-alpha.2';
const TITLE = 'Source-to-Brief Intelligence Workbench';
const history = releaseHistory();
const currentRelease = fs.readFileSync('docs/current-release.md', 'utf8');
const releaseEvidence = fs.readFileSync('docs/release-and-evidence.md', 'utf8');
const roadmap = fs.readFileSync('docs/roadmap.md', 'utf8');
const qaMatrix = fs.readFileSync('docs/qa-matrix.md', 'utf8');

assert.ok(releaseDocExists(`docs/v${VERSION}-evidence-pack-export-v3-brief-traceability.md`), 'alpha.19 release doc must exist in release history');
const doc = readReleaseDoc(`docs/v${VERSION}-evidence-pack-export-v3-brief-traceability.md`);
assert.ok(doc.includes(`# v${VERSION} â€” ${TITLE}`));
assert.ok(doc.includes('docs/technical-debt-ledger.md'));
assert.ok(doc.includes('docs/source-refactor-readiness-audit.md'));
assert.ok(doc.includes('tests/language-description-audit-check.mjs'));
assert.ok(doc.includes('No source-file refactor yet'));
assert.ok(doc.includes('No runtime behavior change'));

assert.ok(history.includes('## Pruned timeline index'), 'release history must expose a pruned timeline index');
assert.ok(history.includes('timeline_pruning_policy'), 'release history must document the timeline pruning policy');
assert.ok(history.includes('v1.1.0-alpha.9 â€” Test Matrix Runtime Optimization + Release Doc Timeline Pruning'), 'release history must preserve alpha.9 timeline pruning anchor');
assert.ok(history.includes(`v${VERSION} â€” ${TITLE}`), 'release history must include current alpha.19 title');
assert.equal((history.match(/<!-- release-file:v1\.1\.0-alpha\.7-package-script-compression-ci-gate-registry\.md -->/g) || []).length, 1, 'duplicate alpha.7 release-history section must be pruned');
assert.ok(Buffer.byteLength(history, 'utf8') <= 130 * 1024, 'release history must remain under the alpha.19 timeline budget');

for (const corpus of [currentRelease, releaseEvidence, roadmap, qaMatrix]) {
  assert.ok(corpus.includes(`v${VERSION}`), 'current docs must identify alpha.19');
  assert.ok(corpus.includes(TITLE), 'current docs must identify alpha.19 title');
}

console.log('Release doc timeline pruning checks passed.');
process.exit(0);
