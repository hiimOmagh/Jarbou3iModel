import assert from 'node:assert/strict';
import fs from 'node:fs';
import { CURRENT_PUBLIC_LABEL, CURRENT_RELEASE, CURRENT_RUNTIME_SCOPE, CURRENT_TITLE, CURRENT_VERSION, assertCurrentReleaseIdentity, ciGateRegistry, currentReleaseContract, evidenceMatrixConfig } from './current-release-identity.mjs';

assertCurrentReleaseIdentity(assert);

const workflow = fs.readFileSync('.github/workflows/ci.yml', 'utf8');
const manifest = JSON.parse(fs.readFileSync('MANIFEST.json', 'utf8'));
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const releaseCopy = fs.readFileSync('src/research/release-copy-contract.js', 'utf8');
const renderHelpers = fs.readFileSync('src/research/render-helpers.js', 'utf8');

assert.equal(manifest.version, CURRENT_VERSION);
assert.equal(manifest.release_title, CURRENT_RELEASE);
assert.ok(manifest.public_version_label.includes(CURRENT_VERSION));
assert.ok(manifest.public_version_label.includes(CURRENT_TITLE));
assert.ok(pkg.description.includes(CURRENT_RELEASE));
assert.ok(workflow.includes(`run-name: v${CURRENT_VERSION} ${CURRENT_TITLE}`));
assert.ok(workflow.includes(`summary.internal_build_version !== '${CURRENT_VERSION}'`));
assert.ok(workflow.includes(`lock-evidence-bundle_${CURRENT_VERSION}_`));
assert.equal(evidenceMatrixConfig.public_version_label, CURRENT_PUBLIC_LABEL);
assert.equal(currentReleaseContract.runtime_scope, CURRENT_RUNTIME_SCOPE);
assert.equal(ciGateRegistry.runtime_optimization.name, CURRENT_RUNTIME_SCOPE);
assert.ok(releaseCopy.includes(CURRENT_VERSION), 'release-copy contract must expose current version');
assert.ok(releaseCopy.includes(CURRENT_TITLE), 'release-copy contract must expose current title');
assert.ok(renderHelpers.includes('Jarbou3iResearchReleaseCopyContract'), 'render helpers must consume release-copy contract');

const highRiskFiles = [
  'tests/ci-gate-registry-check.mjs',
  'tests/version-suite-registry-check.mjs',
  'tests/release-truth-consistency-check.mjs',
  'tests/ci-workflow-quarantine-check.mjs',
  'tests/fixture-registry-consolidation-check.mjs',
  'tests/test-organization-audit-check.mjs',
  'tests/canonical-lock-evidence-bundle-check.mjs',
  'tests/evidence-matrix-canonical-bundle-check.mjs'
];
for (const file of highRiskFiles) {
  const body = fs.readFileSync(file, 'utf8');
  assert.ok(
    body.includes('./current-release-identity.mjs') || body.includes('tests/current-release-contract.json'),
    `${file} must derive current release identity from the canonical contract/helper`
  );
}

console.log('Release identity single source contract checks passed.');
