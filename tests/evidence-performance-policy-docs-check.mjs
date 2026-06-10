import assert from 'node:assert/strict';
import fs from 'node:fs';
import { CURRENT_RELEASE, CURRENT_RUNTIME_SCOPE, CURRENT_VERSION } from './current-release-identity.mjs';

const DOC = 'docs/evidence-performance-policy-playbook.md';
const CHECK = 'tests/evidence-performance-policy-docs-check.mjs';
const THRESHOLD_CHECK = 'tests/hosted-evidence-performance-threshold-policy-check.mjs';
const TREND_DIFF_CHECK = 'tests/hosted-evidence-performance-trend-diff-check.mjs';
const TREND_DIFF_SCRIPT = 'scripts/hosted-evidence-performance-trend-diff.mjs';

const doc = fs.readFileSync(DOC, 'utf8');

for (const token of [
  CURRENT_RELEASE,
  'pass',
  'warn',
  'fail',
  'Total hosted-evidence duration regression',
  'Per-phase duration regression',
  'Per-phase budget utilization',
  '10%',
  '20%',
  '15%',
  '30%',
  '75%',
  '90%',
  'total-duration regression',
  'phase-duration regression',
  'phase-utilization regression',
  'Do not merge the release branch',
  TREND_DIFF_SCRIPT,
  THRESHOLD_CHECK,
  TREND_DIFF_CHECK
]) {
  assert.ok(doc.includes(token), `${DOC} must include operator-policy token: ${token}`);
}

for (const forbidden of [
  'enable live provider',
  'enable OAuth',
  'enable backend mutation',
  'enable source fetching',
  'automatic source verification is enabled'
]) {
  assert.equal(doc.includes(forbidden), false, `${DOC} must not imply forbidden behavior: ${forbidden}`);
}

const contract = JSON.parse(fs.readFileSync('tests/current-release-contract.json', 'utf8'));
const registry = JSON.parse(fs.readFileSync('tests/ci-gate-registry.json', 'utf8'));
const versionSuite = JSON.parse(fs.readFileSync('tests/version-suite-registry.json', 'utf8'));

assert.equal(contract.version, CURRENT_VERSION, 'contract version must match current release');
assert.equal(contract.runtime_scope, CURRENT_RUNTIME_SCOPE, 'contract runtime scope must match current release');
assert.ok(contract.required_docs.includes(DOC), 'current release contract must require evidence performance playbook');
assert.ok(contract.required_tests.includes(CHECK), 'current release contract must require docs policy check');
assert.ok(contract.expected_changed_files.includes(DOC), 'expected changed files must include evidence performance playbook');
assert.ok(contract.expected_changed_files.includes(CHECK), 'expected changed files must include docs policy check');
assert.ok(contract.lock_assertions.some((assertion) => assertion.includes('operator playbook')), 'lock assertions must mention operator playbook');
assert.ok(contract.lock_assertions.some((assertion) => assertion.includes('pass/warn/fail')), 'lock assertions must mention pass/warn/fail interpretation');

for (const gate of ['no-browser', 'current-no-browser', 'source', 'release']) {
  assert.ok(registry.gates[gate].node_checks.includes(CHECK), `${gate} gate must run evidence performance policy docs check`);
}
assert.ok(registry.syntax_matrix.files.includes(CHECK), 'syntax matrix must cover docs policy check');
assert.equal(registry.evidence_performance_policy_enforcement_wiring.version, CURRENT_VERSION);
assert.equal(registry.evidence_performance_policy_enforcement_wiring.runtime_capability_change, false);
assert.equal(registry.evidence_performance_policy_enforcement_wiring.provider_behavior_changed, false);
assert.equal(registry.evidence_performance_policy_enforcement_wiring.oauth_behavior_changed, false);
assert.equal(registry.evidence_performance_policy_enforcement_wiring.backend_behavior_changed, false);
assert.equal(registry.evidence_performance_policy_enforcement_wiring.storage_behavior_changed, false);
assert.equal(registry.evidence_performance_policy_enforcement_wiring.source_behavior_changed, false);

const suiteEntry = versionSuite.entries.find((entry) => entry.id === 'v140-alpha62');
assert.ok(suiteEntry, 'version suite registry must include alpha62 policy docs entry');
assert.ok(suiteEntry.checks.includes(CHECK), 'alpha62 suite entry must include docs policy check');

console.log(`Evidence performance policy docs checks passed for ${CURRENT_RELEASE}.`);
