import assert from 'node:assert/strict';
import fs from 'node:fs';

const RELEASE = 'v1.3.0-alpha.2';
const TITLE = 'Guided Session UX Compression + Brief Assembly Export QA';
const workflowPath = '.github/workflows/ci.yml';
const workflow = fs.readFileSync(workflowPath, 'utf8');
const registry = JSON.parse(fs.readFileSync('tests/ci-gate-registry.json', 'utf8'));
const evidenceMatrix = JSON.parse(fs.readFileSync('tests/evidence/evidence-matrix.config.json', 'utf8'));
const renderHelpers = fs.readFileSync('src/research/render-helpers.js', 'utf8');
const currentRelease = fs.readFileSync('docs/current-release.md', 'utf8');

assert.ok(workflow.includes(`run-name: ${RELEASE} guided session`), 'workflow run-name must expose v1.3.0-alpha.2 guided session identity');
assert.ok(workflow.includes('workflow_dispatch:'), 'workflow must allow manual dispatch during CI incident recovery');
assert.ok(workflow.includes('concurrency:'), 'workflow must define concurrency to prevent stacked runs');
assert.ok(workflow.includes('cancel-in-progress: true'), 'workflow must cancel prior in-progress runs on the same ref');
assert.match(workflow, /group:\s*\$\{\{ github\.workflow \}\}-\$\{\{ github\.ref \}\}/, 'workflow concurrency group must be workflow/ref scoped');
assert.match(workflow, /no-browser:[\s\S]*?timeout-minutes:\s*20/, 'no-browser job must have a bounded timeout');
assert.match(workflow, /browser:[\s\S]*?needs:\s*no-browser[\s\S]*?timeout-minutes:\s*30/, 'browser job must depend on no-browser and have a bounded timeout');
assert.match(workflow, /lock-evidence-bundle:[\s\S]*?needs:\s*\[no-browser, browser\][\s\S]*?timeout-minutes:\s*15/, 'lock evidence job must remain gated and timeout-bounded');
assert.ok(workflow.includes(`summary.internal_build_version !== '1.3.0-alpha.2'`), 'browser matrix guard must validate v1.3.0-alpha.2 internal build version');
assert.ok(workflow.includes(`lock-evidence-bundle_1.3.0-alpha.2_`), 'lock evidence artifact must be versioned as v1.3.0-alpha.2');

assert.equal(registry.release_title, `${RELEASE} — ${TITLE}`, 'CI registry release title must identify v1.3.0-alpha.2 guided session release');
assert.equal(evidenceMatrix.internal_build_version, '1.3.0-alpha.2', 'evidence matrix internal version must identify v1.3.0-alpha.2');
assert.equal(evidenceMatrix.public_version_label, `${RELEASE} ${TITLE}`, 'English public label must identify v1.3.0-alpha.2 guided session release');
assert.equal(evidenceMatrix.public_version_labels.ar, `${RELEASE} ضغط تجربة الجلسة الموجّهة + تدقيق تصدير تجميع الموجز`, 'Arabic public label must identify v1.3.0-alpha.2 guided session release');
assert.equal(evidenceMatrix.public_version_labels.fr, `${RELEASE} Compression UX de session guidée + QA export assemblage du brief`, 'French public label must identify v1.3.0-alpha.2 guided session release');

for (const marker of [
  `${RELEASE} ${TITLE}`,
  `${RELEASE} ضغط تجربة الجلسة الموجّهة + تدقيق تصدير تجميع الموجز`,
  `${RELEASE} Compression UX de session guidée + QA export assemblage du brief`
]) {
  assert.ok(renderHelpers.includes(marker), `render helpers missing localized guided session marker: ${marker}`);
}

for (const marker of [
  'live_fetching_performed: false',
  'provider_execution_performed: false',
  'automatic_source_verification_claimed: false',
  'Guided Session UX Compression + Brief Assembly Export QA'
]) {
  assert.ok(currentRelease.includes(marker), `current release doc missing guided session marker: ${marker}`);
}

console.log('CI workflow quarantine checks passed.');
