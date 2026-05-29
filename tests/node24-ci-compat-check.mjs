import assert from 'node:assert/strict';
import fs from 'node:fs';
import { spawnSync } from 'node:child_process';
import { readReleaseDoc, releaseDocExists } from './release-docs-loader.mjs';
import { readReleaseArtifact, releaseArtifactExists } from './release-artifacts-loader.mjs';

const read = (file) => readReleaseArtifact(file);
const json = (file) => JSON.parse(read(file));

const pkg = json('package.json');
const lock = json('package-lock.json');
const workflow = read('.github/workflows/ci.yml');
const ciNoBrowser = read('scripts/ci-no-browser.sh');
const releaseNotes = read('RELEASE_NOTES.md');
const changelog = read('CHANGELOG.md');
const manifest = read('RELEASE_MANIFEST.md');
const roadmap = read('docs/roadmap.md');
const qaMatrix = read('docs/qa-matrix.md');
const node24Doc = readReleaseDoc('docs/v1.0.21-node-24-ci-compatibility.md');

assert.equal(pkg.version, '1.4.0-alpha.16', 'package.json must identify v1.4.0-alpha.16');
assert.equal(lock.version, '1.4.0-alpha.16', 'package-lock root version must identify v1.4.0-alpha.16');
assert.equal(lock.packages[''].version, '1.4.0-alpha.16', 'package-lock package root must identify v1.4.0-alpha.16');

for (const forbidden of [
  'actions/checkout@v4',
  'actions/setup-node@v4',
  'actions/upload-artifact@v4',
  'actions/cache@v6',
  'node-version: 20',
  'node-version: 22',
  'FORCE_JAVASCRIPT_ACTIONS_TO_NODE24',
  'ACTIONS_ALLOW_USE_UNSECURE_NODE_VERSION'
]) {
  assert.equal(workflow.includes(forbidden), false, `CI workflow must not contain stale Node 20 migration token: ${forbidden}`);
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
  'PLAYWRIGHT_SKIP_INSTALL=1 npm run test:ci:browser'
]) {
  assert.ok(workflow.includes(required), `CI workflow must contain Node 24 compatible token: ${required}`);
}

const validateIndex = workflow.indexOf('node tests/lockfile-public-registry-check.mjs');
const installIndex = workflow.indexOf('npm ci --no-audit --no-fund --ignore-scripts');
const playwrightDepsIndex = workflow.indexOf('npx playwright install-deps chromium');
const playwrightInstallIndex = workflow.indexOf('npx playwright install chromium');
const browserIndex = workflow.indexOf('PLAYWRIGHT_SKIP_INSTALL=1 npm run test:ci:browser');
assert.ok(validateIndex < installIndex, 'lockfile registry validation must run before npm ci');
assert.ok(installIndex < playwrightDepsIndex, 'npm ci must run before Playwright system dependency installation');
assert.ok(playwrightDepsIndex < playwrightInstallIndex, 'Playwright system dependencies must install before browser binaries');
assert.ok(playwrightInstallIndex < browserIndex, 'browser workflow must install Playwright once before skipping duplicate install in ci-browser.sh');

assert.ok(Object.keys(pkg.scripts).length <= 20, 'package script surface must remain compressed');
assert.ok(Object.keys(pkg.scripts).length <= 20, 'package script surface must remain compressed');
assert.ok(ciNoBrowser.includes('ci-gate-runner.mjs no-browser'), 'no-browser CI must include Node 24 compatibility through registry runner');
assert.ok(ciNoBrowser.includes('ci-gate-runner.mjs no-browser'), 'no-browser CI must delegate to registry runner');
assert.ok(ciNoBrowser.includes('ci-gate-runner.mjs no-browser'), 'no-browser CI must delegate to registry runner');

for (const text of [releaseNotes, changelog, manifest, roadmap, qaMatrix]) {
  assert.ok(text.includes('v1.4.0-alpha.16') || text.includes('v1.3.0'), 'release documentation must mention current alpha.1 or stable baseline');
  assert.ok(text.includes('Node 24'), 'release documentation must mention Node 24');
}
assert.ok(node24Doc.includes('v1.0.21'), 'retained Node 24 compatibility doc must keep its original release identity');
assert.ok(node24Doc.includes('Node 24'), 'retained Node 24 compatibility doc must mention Node 24');

for (const file of ['tests/node24-ci-compat-check.mjs', 'tests/version-suite-registry-check.mjs']) {
  const syntax = spawnSync(process.execPath, ['--check', file], { encoding: 'utf8' });
  assert.equal(syntax.status, 0, syntax.stderr || syntax.stdout || `${file} syntax check failed`);
}

console.log('Node 24 CI compatibility checks passed.');
process.exit(0);
