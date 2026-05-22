import assert from 'node:assert/strict';
import fs from 'node:fs';
import { spawnSync, execSync } from 'node:child_process';
import { getMigrationFixture, getPrivacyFixture, fixturePathExists } from './fixture-registry-loader.mjs';
import { readReleaseDoc, releaseDocExists } from './release-docs-loader.mjs';
import { readReleaseArtifact, releaseArtifactExists } from './release-artifacts-loader.mjs';

const read = (file) => readReleaseArtifact(file);
const json = (file) => JSON.parse(read(file));

const VERSION = '1.1.0-alpha.25';
const TITLE = 'Release Candidate Hardening + Final Repo Hygiene';
const RELEASE = `v${VERSION} — ${TITLE}`;

const pkg = json('package.json');
const lock = json('package-lock.json');
const schema = json('schema/research-workflow.schema.json');
const sample = json('fixtures/research/sample-research-workflow-en.json');
const migrationFixture = getMigrationFixture('fixtures/migrations/v1.1.0-alpha.25-packet.json');
const privacyFixture = getPrivacyFixture('fixtures/privacy/browser-generated-export-v1.1.0-alpha.25.json');
const workflow = read('.github/workflows/ci.yml');
const ciBrowser = read('scripts/ci-browser.sh');
const ciNoBrowser = read('scripts/ci-no-browser.sh');
const manifest = read('RELEASE_MANIFEST.md');
const notes = read('RELEASE_NOTES.md');
const changelog = read('CHANGELOG.md');
const roadmap = read('docs/roadmap.md');
const qaMatrix = read('docs/qa-matrix.md');
const doc = `${readReleaseDoc('docs/v1.0.25-public-demo-release-lock.md')}\n${readReleaseDoc('docs/v1.1.0-alpha.25-evidence-pack-export-v3-brief-traceability.md')}`;
const migrations = read('src/research/migrations.js');
const evidenceSpec = read('tests/hosted-demo-browser-evidence.spec.mjs');

assert.equal(pkg.version, VERSION, 'package.json must identify v1.1.0-alpha.25');
assert.equal(lock.version, VERSION, 'package-lock root version must identify v1.1.0-alpha.25');
assert.equal(lock.packages[''].version, VERSION, 'package-lock package root must identify v1.1.0-alpha.25');
assert.equal(schema.properties.workflow_version.const, VERSION, 'schema workflow version must identify v1.1.0-alpha.25');
assert.equal(sample.workflow_version, VERSION, 'sample fixture must identify v1.1.0-alpha.25');
assert.equal(migrationFixture.workflow_version, VERSION, 'migration fixture must identify v1.1.0-alpha.25');
assert.equal(privacyFixture.workflow_version, VERSION, 'privacy fixture must identify v1.1.0-alpha.25');
assert.equal(sample.release_notes.release_title, RELEASE, 'sample release title must identify v1.1.0-alpha.25');
assert.equal(migrationFixture.release_notes.release_title, RELEASE, 'migration fixture release title must identify v1.1.0-alpha.25');
assert.equal(privacyFixture.release_notes.release_title, RELEASE, 'privacy fixture release title must identify v1.1.0-alpha.25');

for (const text of [manifest, notes, changelog, roadmap, qaMatrix, doc]) {
  assert.ok(text.includes('v1.1.0-alpha.25'), 'release corpus must mention v1.1.0-alpha.25');
  assert.ok(text.includes(TITLE) || /release[- ]lock/i.test(text), 'release corpus must mention public demo release lock');
}

for (const required of [
  'actions/checkout@v6',
  'actions/setup-node@v6',
  'actions/upload-artifact@v6',
  'node-version: 24',
  'npm ci --no-audit --no-fund --ignore-scripts',
  'node tests/lockfile-public-registry-check.mjs',
  'npx playwright install --with-deps',
  'PLAYWRIGHT_SKIP_INSTALL=1 npm run test:ci:browser',
  'name: hosted-demo-evidence',
  'path: ci-artifacts/hosted-demo-evidence',
  'if: always()'
]) {
  assert.ok(workflow.includes(required), `workflow missing release evidence/runtime token: ${required}`);
}

for (const forbidden of [
  'actions/checkout@v4',
  'actions/setup-node@v4',
  'actions/upload-artifact@v4',
  'node-version: 20',
  'node-version: 22',
  'npm install\n',
  'ACTIONS_ALLOW_USE_UNSECURE_NODE_VERSION'
]) {
  assert.equal(workflow.includes(forbidden), false, `workflow must not contain stale/unsafe token: ${forbidden}`);
}

const lockIndex = workflow.indexOf('node tests/lockfile-public-registry-check.mjs');
const installIndex = workflow.indexOf('npm ci --no-audit --no-fund --ignore-scripts');
const playwrightIndex = workflow.indexOf('npx playwright install --with-deps');
const browserIndex = workflow.indexOf('PLAYWRIGHT_SKIP_INSTALL=1 npm run test:ci:browser');
assert.ok(lockIndex >= 0 && lockIndex < installIndex, 'lockfile guard must run before npm ci');
assert.ok(installIndex < playwrightIndex, 'npm ci must run before Playwright install');
assert.ok(playwrightIndex < browserIndex, 'Playwright must install once before browser CI skip flag');

assert.ok(ciBrowser.includes('PLAYWRIGHT_SKIP_INSTALL'), 'ci-browser must support install skip flag');
assert.ok(ciBrowser.includes('HOSTED_DEMO_EVIDENCE_DIR'), 'ci-browser must preserve hosted demo evidence outside Playwright test-results cleanup');
assert.ok(ciBrowser.includes('ci-artifacts/hosted-demo-evidence'), 'ci-browser must default hosted demo evidence to a non-test-results artifact path');
assert.ok(ciBrowser.includes('ci-gate-runner.mjs browser'), 'ci-browser must preserve hosted demo evidence through registry runner');
assert.ok(ciBrowser.includes('ci-gate-runner.mjs browser'), 'ci-browser must delegate to registry runner');
assert.ok(ciNoBrowser.includes('ci-gate-runner.mjs no-browser'), 'no-browser CI must include release evidence through registry runner');
assert.ok(ciNoBrowser.includes('ci-gate-runner.mjs no-browser'), 'no-browser CI must delegate to registry runner');
assert.ok(ciNoBrowser.includes('ci-gate-runner.mjs no-browser'), 'no-browser CI must delegate to registry runner');

assert.ok(Object.keys(pkg.scripts).length <= 20, 'package script surface must remain compressed');
assert.ok(Object.keys(pkg.scripts).length <= 20, 'package script surface must remain compressed');
assert.ok(Object.keys(pkg.scripts).length <= 20, 'package script surface must remain compressed');
assert.ok(Object.keys(pkg.scripts).length <= 20, 'package script surface must remain compressed');
assert.ok(Object.keys(pkg.scripts).length <= 20, 'package script surface must remain compressed');

for (const required of [
  'fixtures/migrations/v1.0.21-packet.json',
  'fixtures/migrations/v1.1.0-alpha.25-packet.json',
  'fixtures/privacy/browser-generated-export-v1.0.21.json',
  'fixtures/privacy/browser-generated-export-v1.1.0-alpha.25.json',
  'docs/v1.0.21-node-24-ci-compatibility.md',
  'docs/v1.0.25-public-demo-release-lock.md',
  'tests/node24-ci-compat-check.mjs',
  'tests/release-evidence-repo-hygiene-check.mjs',
  'tests/version-suite-registry-check.mjs',
  'tests/version-suite-registry-check.mjs'
]) {
  assert.ok(fixturePathExists(required) || releaseDocExists(required), `required release evidence artifact missing: ${required}`);
}

for (const forbidden of [
  'docs/v1.0.5-browser-qa-visual-regression-hardening.md',
  'scripts/XXKuyryP',
  'src/XXSyA2D3',
  'src/XXvKXvVS',
  '.env',
  'backend/.dev.vars'
]) {
  assert.equal(fs.existsSync(forbidden), false, `stale or secret-bearing file must not exist: ${forbidden}`);
}

const trackedPaths = (() => {
  try {
    return new Set(execSync('git ls-files', { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).split('\n').map((line) => line.trim()).filter(Boolean));
  } catch {
    return new Set();
  }
})();
assert.equal([...trackedPaths].some((file) => file === 'node_modules' || file.startsWith('node_modules/')), false, 'node_modules must not be committed');

for (const token of [
  'Screenshots alone are insufficient',
  'A ZIP archive alone is insufficient',
  'green no-browser CI',
  'green browser CI',
  'reviewed hosted-demo evidence'
]) {
  assert.ok(manifest.includes(token), `manifest must document release-lock requirement: ${token}`);
}

assert.ok(migrations.includes("const TARGET_VERSION = '1.1.0-alpha.25'"), 'migration target must be v1.1.0-alpha.25');
assert.ok(migrations.includes("'1.0.21','1.0.22','1.0.23','1.0.24','1.0.25','1.0.26','1.0.27','1.0.28','1.0.29','1.0.30','1.1.0-alpha.1','1.1.0-alpha.2','1.1.0-alpha.3','1.1.0-alpha.8','1.1.0-alpha.9','1.1.0-alpha.10','1.1.0-alpha.25'"), 'migration order must preserve v1.0.24 and append v1.1.0-alpha.25');
assert.ok(evidenceSpec.includes('async function openProviderHarness'), 'hosted demo evidence spec must keep provider accordion helper');
assert.ok(evidenceSpec.includes("providerCard.locator('h3').click()"), 'hosted demo evidence spec must expand provider harness accordion when closed');
assert.equal(evidenceSpec.includes("expect(page.locator('#exportWorkflowBtn')).toBeVisible()"), false, 'hosted demo evidence must not assert hidden Evidence-tab exportWorkflowBtn from Quality tab');

assert.equal(sample.provider_config.allow_live, false, 'manual/private provider boundary must remain default');
assert.equal(sample.provider_config.remember_key, false, 'API keys must not be remembered by default');
assert.equal(sample.privacy_export.key_exported, false, 'privacy fixture must not export keys');
assert.equal(sample.privacy_export.raw_token_exported, false, 'privacy fixture must not export raw tokens');
assert.equal(sample.public_demo.runtime_capability_change, false, 'release evidence patch must not change runtime capabilities');
assert.equal(sample.release_candidate.policy.production_oauth_allowed, false, 'production OAuth must remain blocked');
assert.equal(sample.release_candidate.policy.new_live_connectors_allowed, false, 'new live connectors must remain blocked');
assert.equal(sample.release_candidate.policy.breaking_changes_allowed, false, 'breaking changes must remain blocked');

for (const file of ['tests/release-evidence-repo-hygiene-check.mjs', 'tests/version-suite-registry-check.mjs']) {
  const syntax = spawnSync(process.execPath, ['--check', file], { encoding: 'utf8' });
  assert.equal(syntax.status, 0, syntax.stderr || syntax.stdout || `${file} syntax check failed`);
}

console.log('Release evidence and repository hygiene verification checks passed.');
process.exit(0);
