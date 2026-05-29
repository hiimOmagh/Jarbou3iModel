import assert from 'node:assert/strict';
import fs from 'node:fs';
import { spawnSync } from 'node:child_process';
import { fixturePathExists } from './fixture-registry-loader.mjs';
import { readReleaseDoc, releaseDocExists, releaseHistory } from './release-docs-loader.mjs';
import { readReleaseArtifact, releaseArtifactExists } from './release-artifacts-loader.mjs';

const read = (file) => readReleaseArtifact(file);
const json = (file) => JSON.parse(read(file));

const CURRENT_VERSION = '1.4.0-alpha.16';
const HISTORICAL_VERSION = '1.0.23';
const HISTORICAL_TITLE = 'CI Result Review + Browser Evidence Artifact Audit';
const CURRENT_TITLE = 'Evidence Surface Budget Enforcement';

const pkg = json('package.json');
const lock = json('package-lock.json');
const schema = json('schema/research-workflow.schema.json');
const sample = json('fixtures/research/sample-research-workflow-en.json');
const workflow = read('.github/workflows/ci.yml');
const ciBrowser = read('scripts/ci-browser.sh');
const ciNoBrowser = read('scripts/ci-no-browser.sh');
const manifest = read('RELEASE_MANIFEST.md');
const roadmap = read('docs/roadmap.md');
const qaMatrix = read('docs/qa-matrix.md');
const historicalDoc = readReleaseDoc('docs/v1.0.23-ci-result-review-browser-evidence-artifact-audit.md');
const migrations = read('src/research/migrations.js');

assert.equal(pkg.version, CURRENT_VERSION, 'package.json must identify current release');
assert.equal(lock.version, CURRENT_VERSION, 'package-lock root version must identify current release');
assert.equal(lock.packages[''].version, CURRENT_VERSION, 'package-lock package root must identify current release');
assert.equal(schema.properties.workflow_version.const, '1.3.0', 'schema workflow version must preserve stable manual workflow baseline');
assert.equal(sample.workflow_version, '1.3.0', 'sample fixture must preserve stable manual workflow baseline');
assert.equal(sample.release_notes.release_title, 'v1.3.0 — Stable Manual Workflow Release', 'sample release title must preserve stable manual workflow baseline');

for (const required of [
  'GitHub Actions',
  'commit SHA',
  'no-browser job',
  'browser job',
  'browser evidence artifact',
  'evidence upload is not release approval',
  'public repository state matches the release archive',
  'actions/checkout@v4',
  'actions/setup-node@v4',
  'node-version: 22',
  'npm install'
]) {
  assert.ok(historicalDoc.includes(required), `v1.0.23 audit doc missing required audit token: ${required}`);
}

for (const required of [
  'actions/checkout@v6',
  'actions/setup-node@v6',
  'actions/upload-artifact@v6',
  'node-version: 24',
  'npm ci --no-audit --no-fund --ignore-scripts',
  'node tests/lockfile-public-registry-check.mjs',
  'actions/cache@v4',
  'path: ~/.cache/ms-playwright',
  'npx playwright install-deps chromium',
  'npx playwright install chromium',
  'timeout 10m npx playwright install-deps chromium',
  'timeout 8m npx playwright install chromium',
  'playwright-install-deps.log',
  'playwright-install.log',
  'name: playwright-install-deps-log',
  'name: playwright-install-log',
  'PLAYWRIGHT_SKIP_INSTALL=1 npm run test:ci:browser',
  'name: hosted-demo-evidence',
  'path: ${{ runner.temp }}/hosted-demo-evidence',
  'if: always()'
]) {
  assert.ok(workflow.includes(required), `workflow missing CI review token: ${required}`);
}

for (const forbidden of [
  'actions/checkout@v4',
  'actions/setup-node@v4',
  'actions/upload-artifact@v4',
  'actions/cache@v6',
  'node-version: 20',
  'node-version: 22',
  'npm install\n',
  'ACTIONS_ALLOW_USE_UNSECURE_NODE_VERSION'
]) {
  assert.equal(workflow.includes(forbidden), false, `workflow must not contain stale CI token: ${forbidden}`);
}

const installIndex = workflow.indexOf('npm ci --no-audit --no-fund --ignore-scripts');
const playwrightDepsIndex = workflow.indexOf('npx playwright install-deps chromium');
const playwrightIndex = workflow.indexOf('npx playwright install chromium');
const browserIndex = workflow.indexOf('PLAYWRIGHT_SKIP_INSTALL=1 npm run test:ci:browser');
assert.ok(installIndex >= 0 && installIndex < playwrightDepsIndex, 'npm ci must run before Playwright dependency install');
assert.ok(playwrightDepsIndex >= 0 && playwrightDepsIndex < playwrightIndex, 'Playwright dependencies must install before browser binaries');
assert.ok(playwrightIndex < browserIndex, 'Playwright browser binaries must install before skip-flag browser CI');

assert.ok(ciBrowser.includes('PLAYWRIGHT_SKIP_INSTALL'), 'ci-browser must support install skip flag');
assert.ok(ciBrowser.includes('HOSTED_DEMO_EVIDENCE_DIR'), 'ci-browser must preserve hosted demo evidence outside Playwright cleanup');
assert.ok(ciBrowser.includes('ci-artifacts/hosted-demo-evidence'), 'ci-browser must default hosted demo evidence to CI artifact path');
assert.ok(ciBrowser.includes('ci-gate-runner.mjs browser'), 'ci-browser must delegate to registry runner');
assert.ok(ciBrowser.includes('ci-gate-runner.mjs browser'), 'ci-browser must delegate to registry runner');
assert.ok(ciNoBrowser.includes('ci-gate-runner.mjs no-browser'), 'no-browser CI must include CI-result review through registry runner');
assert.ok(Object.keys(pkg.scripts).length <= 20, 'package script surface must remain compressed');
assert.ok(Object.keys(pkg.scripts).length <= 20, 'package script surface must remain compressed');
assert.ok(Object.keys(pkg.scripts).length <= 20, 'package script surface must remain compressed');

for (const required of [
  'fixtures/migrations/v1.0.23-packet.json',
  'fixtures/privacy/browser-generated-export-v1.0.23.json',
  'docs/v1.0.23-ci-result-review-browser-evidence-artifact-audit.md',
  'tests/ci-result-review-browser-evidence-audit-check.mjs',
  'tests/version-suite-registry-check.mjs',
  'fixtures/migrations/v1.3.0-packet.json',
  'fixtures/privacy/browser-generated-export-v1.3.0.json',
  'docs/v1.0.25-public-demo-release-lock.md',
  'tests/public-demo-release-lock-check.mjs',
  'tests/version-suite-registry-check.mjs'
]) {
  assert.ok(fixturePathExists(required) || releaseDocExists(required), `required CI/hygiene artifact missing: ${required}`);
}

assert.ok(migrations.includes("const TARGET_VERSION = '1.3.0'"), 'migration target must preserve stable manual workflow baseline');
assert.ok(migrations.includes("'1.0.21','1.0.22','1.0.23','1.0.24','1.0.25','1.0.26','1.0.27','1.0.28','1.0.29','1.0.30','1.1.0-alpha.1','1.1.0-alpha.2','1.1.0-alpha.3','1.1.0-alpha.8','1.1.0-alpha.9','1.1.0-alpha.10','1.3.0'"), 'migration order must preserve v1.0.24 and append v1.1.0');
const releaseCorpus = [manifest, roadmap, qaMatrix, releaseHistory(), historicalDoc].join('\n');
assert.ok(releaseCorpus.includes(`v${HISTORICAL_VERSION}`), 'release corpus must preserve v1.0.23 audit history');
assert.ok(releaseCorpus.includes(HISTORICAL_TITLE), 'release corpus must preserve v1.0.23 audit title');

assert.equal(sample.provider_config.allow_live, false, 'manual/private provider boundary must remain default');
assert.equal(sample.provider_config.remember_key, false, 'API keys must not be remembered by default');
assert.equal(sample.privacy_export.key_exported, false, 'privacy fixture must not export keys');
assert.equal(sample.privacy_export.raw_token_exported, false, 'privacy fixture must not export raw tokens');
assert.equal(sample.public_demo.runtime_capability_change, false, 'audit patch must not change runtime capabilities');
assert.equal(sample.release_candidate.policy.production_oauth_allowed, false, 'production OAuth must remain blocked');
assert.equal(sample.release_candidate.policy.new_live_connectors_allowed, false, 'new live connectors must remain blocked');
assert.equal(sample.release_candidate.policy.breaking_changes_allowed, false, 'breaking changes must remain blocked');

for (const file of ['tests/ci-result-review-browser-evidence-audit-check.mjs', 'tests/version-suite-registry-check.mjs']) {
  const syntax = spawnSync(process.execPath, ['--check', file], { encoding: 'utf8' });
  assert.equal(syntax.status, 0, syntax.stderr || syntax.stdout || `${file} syntax check failed`);
}

console.log('CI result review and browser evidence artifact audit checks passed.');
process.exit(0);
