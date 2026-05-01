import assert from 'node:assert/strict';
import fs from 'node:fs';

const read = (file) => fs.readFileSync(file, 'utf8');
const json = (file) => JSON.parse(read(file));

const pkg = json('package.json');
const manifest = read('RELEASE_MANIFEST.md');
const releaseIgnore = read('.releaseignore');
const readme = read('README.md');
const changelog = read('CHANGELOG.md');
const roadmap = read('docs/roadmap.md');
const qaMatrix = read('docs/qa-matrix.md');
const schema = json('schema/research-workflow.schema.json');
const fixture = json('fixtures/research/sample-research-workflow-en.json');
const migrationFixture = json('fixtures/migrations/v1.0.9-packet.json');
const privacyFixture = json('fixtures/privacy/browser-generated-export-v1.0.9.json');

assert.equal(pkg.version, '1.0.9');
assert.ok(pkg.description.includes('hosted demo smoke/evidence review patch'));
assert.equal(schema.properties.workflow_version.const, '1.0.9');
assert.equal(fixture.workflow_version, '1.0.9');
assert.equal(migrationFixture.workflow_version, '1.0.9');
assert.equal(privacyFixture.workflow_version, '1.0.9');
assert.equal(privacyFixture.privacy_export.release_gate, 'pass');
assert.equal(privacyFixture.privacy_export.raw_token_exported, false);
assert.equal(privacyFixture.privacy_export.key_exported, false);

for (const file of [
  'README.md',
  'CHANGELOG.md',
  'RELEASE_MANIFEST.md',
  '.releaseignore',
  'docs/v1.0.6-documentation-release-packaging-cleanup.md',
  'docs/repo-cleanup-audit-v1.0.6.md',
  'tests/release-packaging-cleanup-check.mjs',
  'tests/repo-file-hygiene-check.mjs'
]) {
  assert.ok(fs.existsSync(file), `missing release cleanup file: ${file}`);
}
assert.equal(fs.existsSync('docs/v1.0.5-browser-qa-visual-regression-hardening.md'), false, 'duplicate/misnamed v1.0.5 browser-QA doc must be removed');

const expectedDocHeadings = new Map([
  ['docs/v1.0.0-public-beta-stable-research-engine.md', '# v1.0.0 — Public Beta / Stable Research Engine'],
  ['docs/v1.0.1-patch-only-stabilization.md', '# v1.0.1 — Patch-only Stabilization'],
  ['docs/v1.0.2-ux-stabilization-patch.md', '# v1.0.2 — UX Stabilization Patch'],
  ['docs/v1.0.3-screen-discipline-patch.md', '# v1.0.3 — Screen Discipline Patch'],
  ['docs/v1.0.4-browser-qa-visual-regression-hardening.md', '# v1.0.4 — Browser QA + Visual Regression Hardening'],
  ['docs/v1.0.5-onboarding-first-run-success.md', '# v1.0.5 — Onboarding + First-Run Success'],
  ['docs/v1.0.6-documentation-release-packaging-cleanup.md', '# v1.0.6 — Documentation + Release Packaging Cleanup'],
  ['docs/v1.0.7-public-demo-readiness-release-notes.md', '# v1.0.7 — Public Demo Readiness + Release Notes Polish'],
  ['docs/v1.0.8-hosted-demo-deployment-browser-evidence.md', '# v1.0.8 — Hosted Demo Deployment Verification + Browser Evidence Capture'],
  ['docs/v1.0.9-hosted-demo-smoke-fixes-evidence-review.md', '# v1.0.9 — Hosted Demo Smoke Fixes + Evidence Review']
]);
for (const [file, heading] of expectedDocHeadings) {
  assert.equal(read(file).split('\n')[0], heading, `${file} heading drifted`);
}

const docsCorpus = [readme, changelog, roadmap, qaMatrix, ...[...expectedDocHeadings.keys()].map(read)].join('\n');
for (const token of [
  'v1.0.9 — Hosted Demo Smoke Fixes + Evidence Review',
  'v1.0.8 — Hosted Demo Deployment Verification + Browser Evidence Capture',
  'v1.0.7 — Public Demo Readiness + Release Notes Polish',
  'v1.0.6 — Documentation + Release Packaging Cleanup',
  'v1.0.5 — Onboarding + First-Run Success',
  'v1.0.4 — Browser QA + Visual Regression Hardening',
  'v1.0.3 — Screen Discipline Patch',
  'v1.0.2 — UX Stabilization Patch',
  'v1.0.1 — Patch-only Stabilization',
  'v1.0.0 — Public Beta / Stable Research Engine',
  'v0.29.0-rc.1 — Release Candidate Freeze',
  'v0.28.0-beta — Real Portable OAuth Spike',
  'v0.27.0-beta — Web Search Provider Abstraction',
  'v0.26.0-beta — Real Source Connector Prototype',
  'v0.25.0-beta — Real Backend Provider Hardening',
  'v0.24.0-beta — Export Pack v2',
  'v0.23.0-beta — Advanced Quality Gate v3'
]) {
  assert.ok(docsCorpus.includes(token), `release history map missing ${token}`);
}

for (const token of ['node_modules/','playwright-report/','test-results/','*.zip','backend/.dev.vars']) {
  assert.ok(releaseIgnore.includes(token), `.releaseignore missing ${token}`);
}
for (const token of ['Package: `jarbou3i-research-engine`','Version: `1.0.9`','Runtime capability change: no','Required browser gates before publishing','Release archive exclusions']) {
  assert.ok(manifest.includes(token), `release manifest missing ${token}`);
}
for (const script of ['test:release-packaging','test:repo:hygiene','test:public-demo','test:hosted-demo','test:browser:evidence','test:v107:no-browser','test:v107','test:v108:no-browser','test:v108','test:v109:no-browser','test:v109','test:hosted-demo:evidence-review']) {
  assert.ok(pkg.scripts[script], `missing package script ${script}`);
}
assert.ok(pkg.scripts['test:patch'].includes('release-packaging-cleanup-check.mjs'));
assert.ok(pkg.scripts['test:stable'].includes('release-packaging-cleanup-check.mjs'));

const rootFiles = fs.readdirSync('.').filter((name) => name.endsWith('.zip') || name === 'node_modules' || name === 'playwright-report' || name === 'test-results');
assert.deepEqual(rootFiles, [], `release tree contains generated archive/dependency/test-output artifacts: ${rootFiles.join(', ')}`);
for (const orphan of ['scripts/XXKuyryP','src/XXSyA2D3','src/XXvKXvVS']) {
  assert.equal(fs.existsSync(orphan), false, `orphan temporary file must not ship: ${orphan}`);
}

console.log('Release packaging cleanup checks passed.');
process.exit(0);
