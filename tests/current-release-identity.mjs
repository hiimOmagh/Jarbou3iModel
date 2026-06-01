import assert from 'node:assert/strict';
import fs from 'node:fs';

export function readJson(file) {
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

export const packageJson = readJson('package.json');
export const currentReleaseContract = readJson('tests/current-release-contract.json');
export const ciGateRegistry = readJson('tests/ci-gate-registry.json');
export const versionSuiteRegistry = readJson('tests/version-suite-registry.json');
export const evidenceMatrixConfig = readJson('tests/evidence/evidence-matrix.config.json');

export const CURRENT_VERSION = currentReleaseContract.version;
export const CURRENT_TITLE = currentReleaseContract.milestone_name;
export const CURRENT_RELEASE = `v${CURRENT_VERSION} — ${CURRENT_TITLE}`;
export const CURRENT_PUBLIC_LABEL = `v${CURRENT_VERSION} ${CURRENT_TITLE}`;
export const CURRENT_RUNTIME_SCOPE = currentReleaseContract.runtime_scope || ciGateRegistry.runtime_optimization?.optimization_scope;

export function assertCurrentReleaseIdentity(customAssert = assert) {
  customAssert.equal(packageJson.version, CURRENT_VERSION, 'package version must match current release contract');
  customAssert.equal(ciGateRegistry.ci_gate_registry_version, CURRENT_VERSION, 'CI registry version must match current release contract');
  customAssert.equal(ciGateRegistry.release_title, CURRENT_RELEASE, 'CI registry title must match current release contract');
  customAssert.equal(versionSuiteRegistry.version_suite_registry_version, CURRENT_VERSION, 'version-suite registry version must match current release contract');
  customAssert.equal(versionSuiteRegistry.release_title, CURRENT_RELEASE, 'version-suite registry title must match current release contract');
  customAssert.equal(evidenceMatrixConfig.internal_build_version, CURRENT_VERSION, 'evidence matrix version must match current release contract');
  customAssert.equal(ciGateRegistry.runtime_optimization.optimization_scope, CURRENT_RUNTIME_SCOPE, 'runtime optimization scope must match current release contract');
}
