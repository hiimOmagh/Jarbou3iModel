import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const CONTRACT_PATH = 'tests/current-release-contract.json';
const contract = JSON.parse(fs.readFileSync(CONTRACT_PATH, 'utf8'));
const version = contract.version;
const milestone = contract.milestone_name;
const releaseTitle = `v${version} — ${milestone}`;

function read(file) {
  return fs.readFileSync(file, 'utf8');
}

function exists(file) {
  return fs.existsSync(file);
}

function listFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  const out = [];
  const stack = [dir];
  while (stack.length) {
    const current = stack.pop();
    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      const full = path.join(current, entry.name);
      if (entry.isDirectory()) stack.push(full);
      else out.push(full.replaceAll('\\', '/'));
    }
  }
  return out;
}

function parseReleaseCopyContract() {
  const source = read('src/research/release-copy-contract.js');
  const sandbox = {};
  vm.createContext(sandbox);
  vm.runInContext(source, sandbox, { filename: 'src/research/release-copy-contract.js' });
  const releaseCopy = sandbox.Jarbou3iResearchReleaseCopyContract;
  assert.equal(releaseCopy.version, version, 'release copy contract must declare current version');
  assert.ok(releaseCopy.publicVersionLabels.en.includes(milestone), 'release copy contract must declare current milestone label');
  return releaseCopy;
}

assert.equal(contract.release_type, 'consolidation', 'alpha.25 must be a consolidation release');
assert.ok(Array.isArray(contract.allowed_scope) && contract.allowed_scope.length > 0, 'allowed_scope must be populated');
assert.ok(Array.isArray(contract.forbidden_scope) && contract.forbidden_scope.length > 0, 'forbidden_scope must be populated');

const pkg = JSON.parse(read('package.json'));
assert.equal(pkg.version, version, 'package.json version must match current-release contract');
assert.ok(pkg.description.includes(releaseTitle), 'package.json description must include release title');

const manifest = JSON.parse(read('MANIFEST.json'));
assert.equal(manifest.version, version, 'MANIFEST.json version must match current-release contract');
assert.equal(manifest.release_title, releaseTitle, 'MANIFEST release_title must match current-release contract');
assert.ok(manifest.public_version_label.includes(version), 'MANIFEST public label must include version');
assert.ok(manifest.public_version_label.includes(milestone), 'MANIFEST public label must include milestone');

const ciRegistry = JSON.parse(read('tests/ci-gate-registry.json'));
assert.equal(ciRegistry.ci_gate_registry_version, version, 'CI gate registry version must match contract');
assert.equal(ciRegistry.release_title, releaseTitle, 'CI gate registry title must match contract');

const suiteRegistry = JSON.parse(read('tests/version-suite-registry.json'));
assert.equal(suiteRegistry.version_suite_registry_version, version, 'version-suite registry version must match contract');
assert.equal(suiteRegistry.release_title, releaseTitle, 'version-suite registry title must match contract');

const evidenceMatrix = JSON.parse(read('tests/evidence/evidence-matrix.config.json'));
assert.equal(evidenceMatrix.internal_build_version, version, 'evidence matrix internal version must match contract');
assert.ok(evidenceMatrix.public_version_label.includes(version), 'evidence matrix public label must include version');

for (const file of contract.required_docs) {
  assert.ok(exists(file), `required doc missing: ${file}`);
  const body = read(file);
  assert.ok(body.includes(releaseTitle) || body.includes(`v${version}`), `${file} must expose current release identity`);
}

for (const file of contract.required_tests) {
  assert.ok(exists(file), `required test missing: ${file}`);
}

for (const file of contract.expected_deleted_files) {
  assert.ok(!exists(file), `expected deleted file still exists: ${file}`);
}

const testFiles = listFiles('tests');
const staleLockCompletionFiles = testFiles.filter((file) => {
  if (file === 'tests/current-release-lock-completion-check.mjs') return false;
  return /lock-completion-check\.mjs$/.test(file) || /alpha\d+.*check\.mjs$/i.test(path.basename(file));
});
assert.deepEqual(staleLockCompletionFiles, [], 'stale alpha/version-specific lock-completion tests must be absent');

const allGateChecks = Object.values(ciRegistry.gates || {}).flatMap((gate) => gate.node_checks || []);
assert.ok(allGateChecks.includes('tests/current-release-lock-completion-check.mjs'), 'generic current-release check must be wired into at least one CI gate');
assert.ok(allGateChecks.includes('tests/effective-diff-check.mjs'), 'effective diff check must be wired into at least one CI gate');
assert.ok(!allGateChecks.includes('tests/changed-files-patch-hygiene-guard-lock-completion-check.mjs'), 'old alpha.24-specific check must not be wired into CI gates');

const index = read('index.html');
assert.ok(index.includes(`content="${version}"`), 'index app-version meta must match contract');
assert.ok(index.includes('src/research/release-copy-contract.js'), 'index must load release-copy-contract.js before render helpers');
assert.ok(index.indexOf('src/research/release-copy-contract.js') < index.indexOf('src/research/render-helpers.js'), 'release copy contract must load before render helpers');

const releaseCopy = parseReleaseCopyContract();
const renderHelpers = read('src/research/render-helpers.js');
assert.ok(renderHelpers.includes('Jarbou3iResearchReleaseCopyContract'), 'render helpers must consume release copy contract');
assert.ok(renderHelpers.includes('Object.assign(COPY[locale], releaseCopyContract.copy[locale])'), 'render helpers must override locale copy from release contract');

const browserEvidence = read('tests/hosted-demo-browser-evidence.spec.mjs');
assert.ok(browserEvidence.includes('loadReleaseCopyContract()'), 'hosted demo evidence must consume release copy contract');
assert.ok(browserEvidence.includes('RELEASE_COPY_CONTRACT'), 'hosted demo evidence must use release copy contract values');

const visibleCopyPayload = JSON.stringify(releaseCopy.copy || {});
for (const stale of contract.stale_current_release_tokens || []) {
  assert.ok(!visibleCopyPayload.includes(stale), `release copy visible copy must not contain stale token: ${stale}`);
}

const browserRunner = read('scripts/ci-browser.sh');
for (const required of contract.windows_portability_rules || []) {
  assert.ok(browserRunner.includes(required), `browser runner missing portability rule token: ${required}`);
}
assert.ok(!browserRunner.includes('./node_modules/.bin/playwright install'), 'browser runner must not rely on Bash shim for Playwright install');

console.log(`current-release lock completion passed: v${version} — ${milestone}`);
