import assert from 'node:assert/strict';
import fs from 'node:fs';

const RELEASE = 'v1.4.0-alpha.1';
const TITLE = 'Controlled Provider/Source Execution Preparation';
const workflowPath = '.github/workflows/ci.yml';
const workflow = fs.readFileSync(workflowPath, 'utf8');
const registry = JSON.parse(fs.readFileSync('tests/ci-gate-registry.json', 'utf8'));
const evidenceMatrix = JSON.parse(fs.readFileSync('tests/evidence/evidence-matrix.config.json', 'utf8'));
const renderHelpers = fs.readFileSync('src/research/render-helpers.js', 'utf8');
const currentRelease = fs.readFileSync('docs/current-release.md', 'utf8');

assert.ok(workflow.includes(`run-name: ${RELEASE} Controlled provider/source execution preparation`), 'workflow run-name must expose v1.4.0-alpha.1 controlled provider/source execution preparation identity');
assert.ok(workflow.includes('workflow_dispatch:'), 'workflow must allow manual dispatch during CI incident recovery');
assert.ok(workflow.includes('concurrency:'), 'workflow must define concurrency to prevent stacked runs');
assert.ok(workflow.includes('cancel-in-progress: true'), 'workflow must cancel prior in-progress runs on the same ref');
assert.match(workflow, /group:\s*\$\{\{ github\.workflow \}\}-\$\{\{ github\.ref \}\}/, 'workflow concurrency group must be workflow/ref scoped');
assert.match(workflow, /no-browser:[\s\S]*?timeout-minutes:\s*20/, 'no-browser job must have a bounded timeout');
assert.match(workflow, /browser:[\s\S]*?needs:\s*no-browser[\s\S]*?timeout-minutes:\s*30/, 'browser job must depend on no-browser and have a bounded timeout');
assert.match(workflow, /lock-evidence-bundle:[\s\S]*?needs:\s*\[no-browser, browser\][\s\S]*?timeout-minutes:\s*15/, 'lock evidence job must remain gated and timeout-bounded');
assert.ok(workflow.includes(`summary.internal_build_version !== '1.4.0-alpha.1'`), 'browser matrix guard must validate v1.4.0-alpha.1 internal build version');
assert.ok(workflow.includes(`lock-evidence-bundle_1.4.0-alpha.1_`), 'lock evidence artifact must be versioned as v1.4.0-alpha.1');

assert.equal(registry.release_title, `${RELEASE} — ${TITLE}`, 'CI registry release title must identify v1.4.0-alpha.1 controlled provider/source execution preparation release');
assert.equal(evidenceMatrix.internal_build_version, '1.4.0-alpha.1', 'evidence matrix internal version must identify v1.4.0-alpha.1');
assert.equal(evidenceMatrix.public_version_label, `${RELEASE} ${TITLE}`, 'English public label must identify v1.4.0-alpha.1 controlled provider/source execution preparation release');
assert.equal(evidenceMatrix.public_version_labels.ar, `${RELEASE} تحضير تنفيذ المزود/المصدر المضبوط`, 'Arabic public label must identify v1.4.0-alpha.1 controlled provider/source execution preparation release');
assert.equal(evidenceMatrix.public_version_labels.fr, `${RELEASE} Préparation contrôlée fournisseur/source`, 'French public label must identify v1.4.0-alpha.1 controlled provider/source execution preparation release');

for (const marker of [
  `${RELEASE} ${TITLE}`,
  `${RELEASE} تحضير تنفيذ المزود/المصدر المضبوط`,
  `${RELEASE} Préparation contrôlée fournisseur/source`
]) {
  assert.ok(renderHelpers.includes(marker), `render helpers missing localized alpha.1 release marker: ${marker}`);
}

for (const marker of [
  'live_fetching_performed: false',
  'provider_execution_performed: false',
  'automatic_source_verification_claimed: false',
  'Controlled Provider/Source Execution Preparation'
]) {
  assert.ok(currentRelease.includes(marker), `current release doc missing controlled provider/source preparation marker: ${marker}`);
}

console.log('CI workflow quarantine checks passed.');
