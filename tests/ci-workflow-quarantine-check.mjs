import assert from 'node:assert/strict';
import fs from 'node:fs';

const RELEASE = 'v1.4.0-alpha.24';
const TITLE = 'Alpha.23 Lock Completion + Changed-Files Patch Hygiene Guard';
const PUBLIC_TITLE = 'Changed-Files Patch Hygiene Guard';
const workflowPath = '.github/workflows/ci.yml';
const workflow = fs.readFileSync(workflowPath, 'utf8');
const registry = JSON.parse(fs.readFileSync('tests/ci-gate-registry.json', 'utf8'));
const evidenceMatrix = JSON.parse(fs.readFileSync('tests/evidence/evidence-matrix.config.json', 'utf8'));
const renderHelpers = fs.readFileSync('src/research/render-helpers.js', 'utf8');
const currentRelease = fs.readFileSync('docs/current-release.md', 'utf8');

assert.ok(workflow.includes(`run-name: ${RELEASE} ${TITLE} — \${{ github.ref_name }} @ \${{ github.sha }}`), 'workflow run-name must expose v1.4.0-alpha.24 provider execution equivalence identity');
assert.ok(workflow.includes('workflow_dispatch:'), 'workflow must allow manual dispatch during CI incident recovery');
assert.ok(workflow.includes('concurrency:'), 'workflow must define concurrency to prevent stacked runs');
assert.ok(workflow.includes('cancel-in-progress: true'), 'workflow must cancel prior in-progress runs on the same ref');
assert.match(workflow, /group:\s*\$\{\{ github\.workflow \}\}-\$\{\{ github\.ref \}\}/, 'workflow concurrency group must be workflow/ref scoped');
assert.match(workflow, /no-browser:[\s\S]*?timeout-minutes:\s*20/, 'no-browser job must have a bounded timeout');
assert.match(workflow, /browser:[\s\S]*?needs:\s*no-browser[\s\S]*?timeout-minutes:\s*30/, 'browser job must depend on no-browser and have a bounded timeout');
assert.match(workflow, /lock-evidence-bundle:[\s\S]*?needs:\s*\[no-browser, browser\][\s\S]*?timeout-minutes:\s*15/, 'lock evidence job must remain gated and timeout-bounded');
assert.ok(workflow.includes(`summary.internal_build_version !== '1.4.0-alpha.24'`), 'browser matrix guard must validate v1.4.0-alpha.24 internal build version');
assert.ok(workflow.includes(`lock-evidence-bundle_1.4.0-alpha.24_`), 'lock evidence artifact must be versioned as v1.4.0-alpha.24');

assert.equal(registry.release_title, `${RELEASE} — ${TITLE}`, 'CI registry release title must identify v1.4.0-alpha.24 controlled provider/source execution preparation release');
assert.equal(evidenceMatrix.internal_build_version, '1.4.0-alpha.24', 'evidence matrix internal version must identify v1.4.0-alpha.24');
assert.equal(evidenceMatrix.public_version_label, `${RELEASE} ${PUBLIC_TITLE}`, 'English public label must identify v1.4.0-alpha.24 controlled provider/source execution preparation release');
assert.equal(evidenceMatrix.public_version_labels.ar, `${RELEASE} حارس نظافة حزمة الملفات المعدلة`, 'Arabic public label must identify v1.4.0-alpha.24 controlled provider/source execution preparation release');
assert.equal(evidenceMatrix.public_version_labels.fr, `${RELEASE} Garde d’hygiène des patchs à fichiers modifiés`, 'French public label must identify v1.4.0-alpha.24 controlled provider/source execution preparation release');

for (const marker of [
  `${RELEASE} ${PUBLIC_TITLE}`,
  `${RELEASE} حارس نظافة حزمة الملفات المعدلة`,
  `${RELEASE} Garde d’hygiène des patchs à fichiers modifiés`
]) {
  assert.ok(renderHelpers.includes(marker), `render helpers missing localized alpha.1 release marker: ${marker}`);
}

for (const marker of [
  'live_fetching_performed: false',
  'provider_execution_performed: false',
  'automatic_source_verification_claimed: false',
  'Changed-Files Patch Hygiene Guard'
]) {
  assert.ok(currentRelease.includes(marker), `current release doc missing controlled provider/source preparation marker: ${marker}`);
}

console.log('CI workflow quarantine checks passed.');
