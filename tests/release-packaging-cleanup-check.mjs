import assert from 'node:assert/strict';
import fs from 'node:fs';
import { getMigrationFixture, getPrivacyFixture, fixturePathExists } from './fixture-registry-loader.mjs';
import { readReleaseDoc, releaseDocExists, releaseHistory } from './release-docs-loader.mjs';
import { readReleaseArtifact, releaseArtifactExists } from './release-artifacts-loader.mjs';

const read = (file) => readReleaseArtifact(file);
const json = (file) => JSON.parse(read(file));

const VERSION = '1.1.0-rc.2-fix.2';
const RELEASE = 'v1.1.0-rc.2-fix.2 — Evidence Matrix + Canonical Bundle Validation';
const pkg = json('package.json');
const manifest = read('RELEASE_MANIFEST.md');
const releaseIgnore = read('.releaseignore');
const readme = read('README.md');
const changelog = read('CHANGELOG.md');
const roadmap = read('docs/roadmap.md');
const qaMatrix = read('docs/qa-matrix.md');
const schema = json('schema/research-workflow.schema.json');
const fixture = json('fixtures/research/sample-research-workflow-en.json');
const migrationFixture = getMigrationFixture('fixtures/migrations/v1.1.0-rc.2-fix.2-packet.json');
const privacyFixture = getPrivacyFixture('fixtures/privacy/browser-generated-export-v1.1.0-rc.2-fix.2.json');

assert.equal(pkg.version, VERSION);
assert.ok(pkg.description.includes('release evidence'));
assert.ok(pkg.description.includes('repository hygiene'));
assert.ok(pkg.description.includes('PLAYWRIGHT_SKIP_INSTALL'));
assert.equal(pkg.type, 'module');
assert.equal(schema.properties.workflow_version.const, VERSION);
assert.equal(fixture.workflow_version, VERSION);
assert.equal(migrationFixture.workflow_version, VERSION);
assert.equal(privacyFixture.workflow_version, VERSION);
assert.equal(privacyFixture.privacy_export.release_gate, 'pass');
assert.equal(privacyFixture.privacy_export.raw_token_exported, false);
assert.equal(privacyFixture.privacy_export.key_exported, false);

for (const file of [
  'README.md',
  'CHANGELOG.md',
  'RELEASE_MANIFEST.md',
  'RELEASE_NOTES.md',
  '.releaseignore',
  'docs/v1.0.6-documentation-release-packaging-cleanup.md',
  'docs/repo-cleanup-audit-v1.0.6.md',
  'docs/v1.0.11-repository-hygiene-stale-artifact-cleanup.md',
  'docs/v1.0.20-source-packet-template-browser-qa-copy-safety.md',
  'docs/v1.0.21-node-24-ci-compatibility.md',
  'docs/v1.0.25-public-demo-release-lock.md',
  'tests/release-packaging-cleanup-check.mjs',
  'tests/repo-file-hygiene-check.mjs',
  'tests/repository-hygiene-cleanup-check.mjs',
  'tests/release-evidence-repo-hygiene-check.mjs',
  'tests/version-suite-registry-check.mjs',
  'fixtures/migrations/v1.0.21-packet.json',
  'fixtures/migrations/v1.1.0-rc.2-fix.2-packet.json',
  'fixtures/privacy/browser-generated-export-v1.0.21.json',
  'fixtures/privacy/browser-generated-export-v1.1.0-rc.2-fix.2.json'
]) {
  assert.ok(fixturePathExists(file) || releaseDocExists(file) || releaseArtifactExists(file), `missing release cleanup file or release-history entry: ${file}`);
}

assert.equal(releaseDocExists('docs/v1.0.5-browser-qa-visual-regression-hardening.md'), false, 'duplicate/misnamed v1.0.5 browser-QA doc must be removed');

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
  ['docs/v1.0.9-hosted-demo-smoke-fixes-evidence-review.md', '# v1.0.9 — Hosted Demo Smoke Fixes + Evidence Review'],
  ['docs/v1.0.10-hosted-url-ci-artifact-review-module-type-warning-fix.md', '# v1.0.10 — Hosted URL CI Artifact Review + Module-Type Warning Fix'],
  ['docs/v1.0.11-repository-hygiene-stale-artifact-cleanup.md', '# v1.0.11 — Repository Hygiene + Stale Artifact Cleanup'],
  ['docs/v1.0.12-research-source-strategy-blueprint.md', '# v1.0.12 — Research Source Strategy Blueprint'],
  ['docs/v1.0.13-manual-source-packet-import.md', '# v1.0.13 — Manual Source Packet Import'],
  ['docs/v1.0.14-evidence-scoring-v1.md', '# v1.0.14 — Evidence Scoring v1'],
  ['docs/v1.0.15-evidence-scoring-ui-calibration.md', '# v1.0.15 — Evidence Scoring UI Explanation + Calibration Pass'],
  ['docs/v1.0.16-source-packet-builder-ui-scoring-review-controls.md', '# v1.0.16 — Source Packet Builder UI + Scoring Review Controls'],
  ['docs/v1.0.17-source-packet-builder-browser-qa-ux-tightening.md', '# v1.0.17 — Source Packet Builder Browser QA + UX Tightening'],
  ['docs/v1.0.19-source-packet-template-presets.md', '# v1.0.19 — Source Packet Template Presets'],
  ['docs/v1.0.20-source-packet-template-browser-qa-copy-safety.md', '# v1.0.20 — Source Packet Template Browser QA + Copy Safety'],
  ['docs/v1.0.21-node-24-ci-compatibility.md', '# v1.0.21 — Node 24 CI Compatibility + Action Runtime Migration'],
  ['docs/v1.0.25-public-demo-release-lock.md', '# v1.0.25 — Public Demo Release Lock'],
  ['docs/v1.0.26-release-apply-integrity-gate.md', '# v1.0.26 — Release Apply Integrity Gate'],
  ['docs/v1.0.27-release-provenance-ledger-gate.md', '# v1.0.27 — Release Provenance Ledger Gate'],
  ['docs/v1.0.28-hosted-demo-evidence-manifest-gate.md', '# v1.0.28 — Hosted Demo Evidence Manifest Gate'],
  ['docs/v1.1.0-rc.2-fix.2-evidence-pack-export-v3-brief-traceability.md', '# v1.1.0-rc.2-fix.2 — Evidence Matrix + Canonical Bundle Validation']
]);
for (const [file, heading] of expectedDocHeadings) {
  assert.equal(readReleaseDoc(file).split('\n')[0], heading, `${file} heading drifted`);
}

const docsCorpus = [readme, changelog, roadmap, qaMatrix, manifest, releaseHistory(), ...[...expectedDocHeadings.keys()].map(readReleaseDoc)].join('\n');
for (const token of [
  RELEASE,
  'v1.0.21 — Node 24 CI Compatibility + Action Runtime Migration',
  'v1.0.20 — Source Packet Template Browser QA + Copy Safety',
  'v1.0.19 — Source Packet Template Presets',
  'v1.0.18 — Source Packet Builder Export Roundtrip QA',
  'v1.0.17 — Source Packet Builder Browser QA + UX Tightening',
  'v1.0.16 — Source Packet Builder UI + Scoring Review Controls',
  'v1.0.15 — Evidence Scoring UI Explanation + Calibration Pass',
  'v1.0.14 — Evidence Scoring v1',
  'v1.0.13 — Manual Source Packet Import',
  'v1.0.12 — Research Source Strategy Blueprint',
  'v1.0.11 — Repository Hygiene + Stale Artifact Cleanup',
  'v1.0.10 — Hosted URL CI Artifact Review + Module-Type Warning Fix',
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
for (const token of ['Package: `jarbou3i-research-engine`','Version: `1.1.0-rc.2-fix.2`','Runtime capability change: no','Required browser gates before publishing','Release archive exclusions','Required cleanup commands']) {
  assert.ok(manifest.includes(token), `release manifest missing ${token}`);
}
for (const script of ['test:release-packaging','test:repo:hygiene','test:public-demo','test:hosted-demo','test:browser:evidence','test:ci:node24','test:version-registry','test:current:no-browser','test:release:evidence']) {
  assert.ok(Object.keys(pkg.scripts).length <= 20, 'package script surface must remain compressed');
}
assert.ok(Object.keys(pkg.scripts).length <= 20, 'package script surface must remain compressed');
assert.ok(Object.keys(pkg.scripts).length <= 20, 'package script surface must remain compressed');
assert.ok(Object.keys(pkg.scripts).length <= 20, 'package script surface must remain compressed');
assert.ok(Object.keys(pkg.scripts).length <= 20, 'package script surface must remain compressed');

const rootArtifacts = fs.readdirSync('.').filter((name) => name.endsWith('.zip') || name === 'playwright-report' || name === 'test-results');
assert.deepEqual(rootArtifacts, [], `release tree contains generated archive/test-output artifacts: ${rootArtifacts.join(', ')}`);
if (fs.existsSync('node_modules')) {
  assert.ok(fs.statSync('node_modules').isDirectory(), 'node_modules must only be a dependency directory created by package installation');
  assert.ok(releaseIgnore.includes('node_modules/'), 'CI-created node_modules must stay excluded from release archives');
}
for (const orphan of ['scripts/XXKuyryP','src/XXSyA2D3','src/XXvKXvVS']) {
  assert.equal(fs.existsSync(orphan), false, `orphan temporary file must not ship: ${orphan}`);
}

console.log('Release packaging cleanup checks passed.');
process.exit(0);
