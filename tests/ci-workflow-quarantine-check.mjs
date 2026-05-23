import assert from 'node:assert/strict';
import fs from 'node:fs';

const RELEASE = 'v1.2.0-alpha.8.1';
const TITLE = 'CI Stabilization + Workflow Quarantine';
const workflowPath = '.github/workflows/ci.yml';
const workflow = fs.readFileSync(workflowPath, 'utf8');
const registry = JSON.parse(fs.readFileSync('tests/ci-gate-registry.json', 'utf8'));
const evidenceMatrix = JSON.parse(fs.readFileSync('tests/evidence/evidence-matrix.config.json', 'utf8'));
const renderHelpers = fs.readFileSync('src/research/render-helpers.js', 'utf8');
const currentRelease = fs.readFileSync('docs/current-release.md', 'utf8');

assert.ok(workflow.includes(`run-name: ${RELEASE} CI quarantine`), 'workflow run-name must expose alpha8.1 quarantine identity');
assert.ok(workflow.includes('workflow_dispatch:'), 'workflow must allow manual dispatch during CI incident recovery');
assert.ok(workflow.includes('concurrency:'), 'workflow must define concurrency to prevent stacked runs');
assert.ok(workflow.includes('cancel-in-progress: true'), 'workflow must cancel prior in-progress runs on the same ref');
assert.match(workflow, /group:\s*\$\{\{ github\.workflow \}\}-\$\{\{ github\.ref \}\}/, 'workflow concurrency group must be workflow/ref scoped');
assert.match(workflow, /no-browser:[\s\S]*?timeout-minutes:\s*20/, 'no-browser job must have a bounded timeout');
assert.match(workflow, /browser:[\s\S]*?needs:\s*no-browser[\s\S]*?timeout-minutes:\s*30/, 'browser job must depend on no-browser and have a bounded timeout');
assert.match(workflow, /lock-evidence-bundle:[\s\S]*?needs:\s*\[no-browser, browser\][\s\S]*?timeout-minutes:\s*15/, 'lock evidence job must remain gated and timeout-bounded');
assert.ok(workflow.includes(`summary.internal_build_version !== '1.2.0-alpha.8.1'`), 'browser matrix guard must validate alpha8.1 internal build version');
assert.ok(workflow.includes(`lock-evidence-bundle_1.2.0-alpha.8.1_`), 'lock evidence artifact must be versioned as alpha8.1');

assert.equal(registry.release_title, `${RELEASE} — ${TITLE}`, 'CI registry release title must identify alpha8.1 quarantine release');
assert.equal(evidenceMatrix.internal_build_version, '1.2.0-alpha.8.1', 'evidence matrix internal version must identify alpha8.1');
assert.equal(evidenceMatrix.public_version_label, `${RELEASE} ${TITLE}`, 'English public label must identify alpha8.1 quarantine release');
assert.equal(evidenceMatrix.public_version_labels.ar, `${RELEASE} تثبيت CI + عزل سير العمل`, 'Arabic public label must identify alpha8.1 quarantine release');
assert.equal(evidenceMatrix.public_version_labels.fr, `${RELEASE} Stabilisation CI + quarantaine du workflow`, 'French public label must identify alpha8.1 quarantine release');

for (const marker of [
  `${RELEASE} ${TITLE}`,
  `${RELEASE} تثبيت CI + عزل سير العمل`,
  `${RELEASE} Stabilisation CI + quarantaine du workflow`
]) {
  assert.ok(renderHelpers.includes(marker), `render helpers missing localized quarantine marker: ${marker}`);
}

for (const marker of [
  'live_fetching_performed: false',
  'provider_execution_performed: false',
  'automatic_source_verification_claimed: false',
  'CI Stabilization + Workflow Quarantine'
]) {
  assert.ok(currentRelease.includes(marker), `current release doc missing quarantine marker: ${marker}`);
}

console.log('CI workflow quarantine checks passed.');
