import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {
  CURRENT_VERSION,
  CURRENT_TITLE,
  CURRENT_RELEASE,
  CURRENT_PUBLIC_LABEL,
  CURRENT_RUNTIME_SCOPE,
  assertCurrentReleaseIdentity,
  currentReleaseContract,
  ciGateRegistry,
  versionSuiteRegistry,
  evidenceMatrixConfig
} from './current-release-identity.mjs';

assertCurrentReleaseIdentity(assert);

function read(file) {
  return fs.readFileSync(file, 'utf8');
}

function readJson(file) {
  return JSON.parse(read(file));
}

function loadReleaseCopyContract() {
  const source = read('src/research/release-copy-contract.js');
  const sandbox = {};
  vm.createContext(sandbox);
  vm.runInContext(source, sandbox, { filename: 'src/research/release-copy-contract.js' });
  assert.ok(sandbox.Jarbou3iResearchReleaseCopyContract, 'release copy contract must be loadable');
  return sandbox.Jarbou3iResearchReleaseCopyContract;
}

const packageJson = readJson('package.json');
const manifest = readJson('MANIFEST.json');
const workflow = read('.github/workflows/ci.yml');
const indexHtml = read('index.html');
const releaseCopySource = read('src/research/release-copy-contract.js');
const renderHelpers = read('src/research/render-helpers.js');
const releaseCopy = loadReleaseCopyContract();

const expectedCurrentValues = [
  CURRENT_VERSION,
  CURRENT_TITLE,
  CURRENT_RELEASE,
  CURRENT_PUBLIC_LABEL,
  CURRENT_RUNTIME_SCOPE
];

for (const token of expectedCurrentValues) {
  assert.ok(String(token).length > 0, `current release token must be populated: ${token}`);
}

const exactFieldChecks = [
  ['package.json version', packageJson.version, CURRENT_VERSION],
  ['MANIFEST.json version', manifest.version, CURRENT_VERSION],
  ['MANIFEST.json release_title', manifest.release_title, CURRENT_RELEASE],
  ['MANIFEST.json public_version_label', manifest.public_version_label, CURRENT_PUBLIC_LABEL],
  ['MANIFEST.json runtime_scope', manifest.runtime_scope, CURRENT_RUNTIME_SCOPE],
  ['MANIFEST.json current identity version', manifest.current_release_identity?.version, CURRENT_VERSION],
  ['MANIFEST.json current identity title', manifest.current_release_identity?.title, CURRENT_TITLE],
  ['MANIFEST.json current identity release', manifest.current_release_identity?.release, CURRENT_RELEASE],
  ['MANIFEST.json current identity public label', manifest.current_release_identity?.public_label, CURRENT_PUBLIC_LABEL],
  ['MANIFEST.json current identity runtime scope', manifest.current_release_identity?.runtime_scope, CURRENT_RUNTIME_SCOPE],
  ['current-release contract version', currentReleaseContract.version, CURRENT_VERSION],
  ['current-release contract milestone', currentReleaseContract.milestone_name, CURRENT_TITLE],
  ['current-release contract runtime scope', currentReleaseContract.runtime_scope, CURRENT_RUNTIME_SCOPE],
  ['CI gate registry version', ciGateRegistry.ci_gate_registry_version, CURRENT_VERSION],
  ['CI gate registry release title', ciGateRegistry.release_title, CURRENT_RELEASE],
  ['CI gate runtime optimization version', ciGateRegistry.runtime_optimization?.version, CURRENT_VERSION],
  ['CI gate runtime optimization scope', ciGateRegistry.runtime_optimization?.optimization_scope, CURRENT_RUNTIME_SCOPE],
  ['CI gate runtime optimization name', ciGateRegistry.runtime_optimization?.name, CURRENT_RUNTIME_SCOPE],
  ['CI gate current candidate', ciGateRegistry.runtime_optimization?.current_candidate, CURRENT_VERSION],
  ['version-suite registry version', versionSuiteRegistry.version_suite_registry_version, CURRENT_VERSION],
  ['version-suite registry release title', versionSuiteRegistry.release_title, CURRENT_RELEASE],
  ['evidence matrix config version', evidenceMatrixConfig.evidence_matrix_config_version, CURRENT_VERSION],
  ['evidence matrix internal build version', evidenceMatrixConfig.internal_build_version, CURRENT_VERSION],
  ['evidence matrix public label', evidenceMatrixConfig.public_version_label, CURRENT_PUBLIC_LABEL],
  ['release copy version', releaseCopy.version, CURRENT_VERSION],
  ['release copy release', releaseCopy.release, CURRENT_RELEASE],
  ['release copy release title', releaseCopy.releaseTitle, CURRENT_RELEASE],
  ['release copy milestone', releaseCopy.milestone, CURRENT_TITLE],
  ['release copy English public label', releaseCopy.publicVersionLabels?.en, CURRENT_PUBLIC_LABEL]
];

for (const [label, actual, expected] of exactFieldChecks) {
  assert.equal(actual, expected, `${label} must match current release identity`);
}

const currentSensitiveFiles = [
  'package.json',
  'MANIFEST.json',
  'index.html',
  '.github/workflows/ci.yml',
  'src/research/release-copy-contract.js',
  'src/research/render-helpers.js',
  'tests/current-release-contract.json',
  'tests/ci-gate-registry.json',
  'tests/version-suite-registry.json',
  'tests/evidence/evidence-matrix.config.json'
];

for (const file of currentSensitiveFiles) {
  const body = read(file);
  assert.ok(body.includes(CURRENT_VERSION), `${file} must expose the current version`);
  assert.ok(body.includes(CURRENT_TITLE) || body.includes(CURRENT_RUNTIME_SCOPE), `${file} must expose the current title or runtime scope`);
}

assert.ok(packageJson.description.includes(CURRENT_RELEASE), 'package description must include current release title');
assert.ok(packageJson.description.includes(CURRENT_PUBLIC_LABEL), 'package description must include current public label');
assert.ok(indexHtml.includes(`content="${CURRENT_VERSION}"`), 'index meta app-version must expose current version');
assert.ok(indexHtml.includes(CURRENT_PUBLIC_LABEL), 'index hidden browser QA surface must expose current public label');
assert.ok(workflow.includes(`run-name: v${CURRENT_VERSION} ${CURRENT_TITLE}`), 'workflow run-name must expose current identity');
assert.ok(workflow.includes(`summary.internal_build_version !== '${CURRENT_VERSION}'`), 'workflow matrix assertion must use current version');
assert.ok(workflow.includes(`lock-evidence-bundle_${CURRENT_VERSION}_`), 'workflow lock bundle artifact name must use current version');
assert.ok(releaseCopySource.includes(`runtimeScope: '${CURRENT_RUNTIME_SCOPE}'`), 'release copy source must expose current runtime scope');
assert.ok(renderHelpers.includes('Jarbou3iResearchReleaseCopyContract'), 'render helpers must consume release copy contract');

const visibleCopyPayload = JSON.stringify(releaseCopy.copy || {});
for (const stale of currentReleaseContract.stale_current_release_tokens || []) {
  assert.ok(!visibleCopyPayload.includes(stale), `visible release copy contains stale current-release token: ${stale}`);
}

const currentAssertionPayload = JSON.stringify({
  manifest,
  currentReleaseContract: {
    version: currentReleaseContract.version,
    milestone_name: currentReleaseContract.milestone_name,
    runtime_scope: currentReleaseContract.runtime_scope,
    lock_assertions: currentReleaseContract.lock_assertions,
    artifact_identity_rules: currentReleaseContract.artifact_identity_rules
  },
  ciGateRegistry: {
    ci_gate_registry_version: ciGateRegistry.ci_gate_registry_version,
    release_title: ciGateRegistry.release_title,
    runtime_optimization: ciGateRegistry.runtime_optimization,
    hosted_evidence_capture_polish: ciGateRegistry.hosted_evidence_capture_polish
  },
  versionSuiteRegistry: {
    version_suite_registry_version: versionSuiteRegistry.version_suite_registry_version,
    release_title: versionSuiteRegistry.release_title
  },
  evidenceMatrixConfig: {
    evidence_matrix_config_version: evidenceMatrixConfig.evidence_matrix_config_version,
    internal_build_version: evidenceMatrixConfig.internal_build_version,
    public_version_label: evidenceMatrixConfig.public_version_label,
    public_version_labels: evidenceMatrixConfig.public_version_labels
  }
});

for (const stale of currentReleaseContract.stale_current_release_tokens || []) {
  assert.ok(!currentAssertionPayload.includes(stale), `current assertion payload contains stale release identity token: ${stale}`);
}

console.log(`Current release identity sweep checks passed: ${CURRENT_RELEASE}`);
