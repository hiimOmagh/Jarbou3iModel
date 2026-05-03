import assert from 'node:assert/strict';
import fs from 'node:fs';
import { spawnSync } from 'node:child_process';

const read = (file) => fs.readFileSync(file, 'utf8');
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
const doc = read('docs/v1.0.21-node-24-ci-compatibility.md');

assert.equal(pkg.version, '1.0.21', 'package.json must identify v1.0.21');
assert.equal(lock.version, '1.0.21', 'package-lock root version must identify v1.0.21');
assert.equal(lock.packages[''].version, '1.0.21', 'package-lock package root must identify v1.0.21');

for (const forbidden of [
  'actions/checkout@v4',
  'actions/setup-node@v4',
  'actions/upload-artifact@v4',
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
  'PLAYWRIGHT_SKIP_INSTALL=1 npm run test:ci:browser'
]) {
  assert.ok(workflow.includes(required), `CI workflow must contain Node 24 compatible token: ${required}`);
}

const validateIndex = workflow.indexOf('node tests/lockfile-public-registry-check.mjs');
const installIndex = workflow.indexOf('npm ci --no-audit --no-fund --ignore-scripts');
const playwrightInstallIndex = workflow.indexOf('npx playwright install --with-deps');
const browserIndex = workflow.indexOf('PLAYWRIGHT_SKIP_INSTALL=1 npm run test:ci:browser');
assert.ok(validateIndex < installIndex, 'lockfile registry validation must run before npm ci');
assert.ok(installIndex < playwrightInstallIndex, 'npm ci must run before Playwright browser installation');
assert.ok(playwrightInstallIndex < browserIndex, 'browser workflow must install Playwright once before skipping duplicate install in ci-browser.sh');

assert.ok(pkg.scripts['test:ci:node24']?.includes('tests/node24-ci-compat-check.mjs'), 'package script for Node 24 CI compatibility check missing');
assert.ok(pkg.scripts['test:v121:no-browser']?.includes('tests/v121-no-browser-suite.mjs'), 'package script for v1.0.21 no-browser suite missing');
assert.ok(ciNoBrowser.includes('tests/node24-ci-compat-check.mjs'), 'no-browser CI must include Node 24 compatibility guard');
assert.equal(ciNoBrowser.includes('run_node tests/v121-no-browser-suite.mjs'), false, 'no-browser CI must not recursively invoke v121 wrapper');
assert.ok(ciNoBrowser.includes('run_node --check tests/v121-no-browser-suite.mjs'), 'no-browser CI must syntax-check v121 wrapper');

for (const text of [releaseNotes, changelog, manifest, roadmap, qaMatrix, doc]) {
  assert.ok(text.includes('v1.0.21'), 'release documentation must mention v1.0.21');
  assert.ok(text.includes('Node 24'), 'release documentation must mention Node 24');
}

for (const file of ['tests/node24-ci-compat-check.mjs', 'tests/v121-no-browser-suite.mjs']) {
  const syntax = spawnSync(process.execPath, ['--check', file], { encoding: 'utf8' });
  assert.equal(syntax.status, 0, syntax.stderr || syntax.stdout || `${file} syntax check failed`);
}

console.log('Node 24 CI compatibility checks passed.');
process.exit(0);
