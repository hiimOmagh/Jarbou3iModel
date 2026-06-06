import assert from 'node:assert/strict';
import fs from 'node:fs';
import {
  CURRENT_VERSION,
  CURRENT_RELEASE,
  assertCurrentReleaseIdentity,
  ciGateRegistry,
  versionSuiteRegistry
} from './current-release-identity.mjs';

assertCurrentReleaseIdentity(assert);

const workflow = fs.readFileSync('.github/workflows/ci.yml', 'utf8');
const buildScript = fs.readFileSync('scripts/build-lock-evidence-bundle.mjs', 'utf8');
const schemaScript = fs.readFileSync('scripts/release-lock-dashboard-schema-contract.mjs', 'utf8');

const buildStep = 'Build canonical lock evidence bundle';
const enforceStep = 'Enforce lock bundle dashboard schema contract';
const uploadStep = 'Upload canonical lock evidence bundle';

assert.ok(workflow.includes(buildStep), 'workflow must keep canonical lock evidence bundle build step');
assert.ok(workflow.includes(enforceStep), 'workflow must include explicit schema enforcement step');
assert.ok(workflow.includes(uploadStep), 'workflow must keep canonical lock evidence bundle upload step');
assert.ok(
  workflow.indexOf(buildStep) < workflow.indexOf(enforceStep) && workflow.indexOf(enforceStep) < workflow.indexOf(uploadStep),
  'schema enforcement must run after bundle build and before bundle upload'
);
assert.ok(
  workflow.includes(`lock-evidence-bundle_${CURRENT_VERSION}_\${GITHUB_RUN_ID}`),
  'schema enforcement step must target the current-version canonical bundle path'
);
assert.ok(
  workflow.includes('node scripts/release-lock-dashboard-schema-contract.mjs --bundle-dir'),
  'schema enforcement step must invoke the dashboard schema contract CLI'
);
assert.ok(
  workflow.includes("if: ${{ needs.no-browser.result == 'success' && needs.browser.result == 'success' }}"),
  'schema enforcement must stay gated behind green no-browser and browser jobs'
);

assert.ok(
  buildScript.includes("import { validateReleaseLockDashboardBundle } from './release-lock-dashboard-schema-contract.mjs';"),
  'bundle builder must import the dashboard schema validator'
);
assert.ok(
  buildScript.includes('validateReleaseLockDashboardBundle(bundleDir)'),
  'bundle builder must validate the generated bundle before reporting success'
);
assert.ok(
  buildScript.indexOf("fs.writeFileSync(path.join(bundleDir,'checksums','SHA256SUMS.txt'), checksumLines)") < buildScript.indexOf('validateReleaseLockDashboardBundle(bundleDir)'),
  'bundle builder must validate after checksum manifest generation so digest files are covered'
);
assert.ok(
  buildScript.indexOf('validateReleaseLockDashboardBundle(bundleDir)') < buildScript.indexOf('Canonical lock evidence bundle built'),
  'bundle builder must enforce schema before announcing canonical bundle success'
);
assert.ok(
  buildScript.includes('Release lock dashboard schema contract enforced'),
  'bundle builder must announce schema enforcement in operator logs'
);

for (const token of [
  'release lock dashboard JSON digest missing',
  'release lock dashboard Markdown digest missing',
  'checksum manifest must include dashboard digest file',
  'digest lockable decision must match gate/stale-residue contract'
]) {
  assert.ok(schemaScript.includes(token), `schema validator must retain clear failure token: ${token}`);
}

assert.ok(
  ciGateRegistry.gates['no-browser'].node_checks.includes('tests/lock-bundle-schema-enforcement-ci-check.mjs'),
  'no-browser gate must include lock bundle schema enforcement CI check'
);
assert.ok(
  ciGateRegistry.gates['current-no-browser'].node_checks.includes('tests/lock-bundle-schema-enforcement-ci-check.mjs'),
  'current-no-browser gate must include lock bundle schema enforcement CI check'
);
assert.ok(
  ciGateRegistry.gates.release.node_checks.includes('tests/lock-bundle-schema-enforcement-ci-check.mjs'),
  'release gate must include lock bundle schema enforcement CI check'
);
assert.ok(
  ciGateRegistry.syntax_matrix.files.includes('tests/lock-bundle-schema-enforcement-ci-check.mjs'),
  'syntax matrix must include lock bundle schema enforcement CI check'
);
assert.ok(
  versionSuiteRegistry.entries.some((entry) => entry.checks?.includes('tests/lock-bundle-schema-enforcement-ci-check.mjs')),
  'version suite registry must preserve the alpha.53 enforcement check surface'
);

console.log(`Lock bundle schema enforcement in CI checks passed for ${CURRENT_RELEASE}.`);
