import assert from 'node:assert/strict';
import fs from 'node:fs';
import { CURRENT_RELEASE, CURRENT_RUNTIME_SCOPE, CURRENT_VERSION, assertCurrentReleaseIdentity } from './current-release-identity.mjs';

assertCurrentReleaseIdentity(assert);

const HOSTED_SPEC = 'tests/hosted-demo-browser-evidence.spec.mjs';
const TARGETED_CHECK = 'tests/targeted-hosted-evidence-capture-check.mjs';
const CONTRACT = 'tests/current-release-contract.json';
const REGISTRY = 'tests/ci-gate-registry.json';
const spec = fs.readFileSync(HOSTED_SPEC, 'utf8');
const targetedCheck = fs.readFileSync(TARGETED_CHECK, 'utf8');
const contract = JSON.parse(fs.readFileSync(CONTRACT, 'utf8'));
const registry = JSON.parse(fs.readFileSync(REGISTRY, 'utf8'));

assert.ok(CURRENT_VERSION.startsWith('1.4.0-alpha.'), 'timeout budget guard check must run against the current alpha release');
assert.ok(CURRENT_RELEASE.includes('Evidence'), 'timeout budget guard check must run against current release evidence scope');

for (const token of [
  'HOSTED_EVIDENCE_PHASE_BUDGETS_MS',
  'HOSTED_EVIDENCE_TIMING_BUDGET_GUARD',
  'createHostedEvidenceTimingRecorder',
  'summarizeHostedEvidenceTiming',
  'timing_budget_guard',
  'phase_records',
  'total_capture_budget_ms',
  'all_phases_within_budget',
  'over_budget_phases',
  'targeted-region-capture',
  'metadata-write',
  'HOSTED_EVIDENCE_PHASE_BUDGETS_MS.total_capture',
  'expect(metadata.timing_budget_guard.all_phases_within_budget).toBe(true)',
  'expect(metadata.targeted_region_evidence.timing_budget_guard.all_phases_within_budget).toBe(true)'
]) {
  assert.ok(spec.includes(token), `${HOSTED_SPEC} must include timeout-budget token: ${token}`);
}

for (const phase of [
  'page_ready',
  'full_page_capture',
  'localization_snapshots',
  'evidence_matrix',
  'targeted_region_capture',
  'metadata_write',
  'total_capture'
]) {
  assert.match(spec, new RegExp(`${phase}\\s*:\\s*[0-9_]+`), `hosted evidence phase budget missing: ${phase}`);
}

const budgetMatch = spec.match(/total_capture:\s*([0-9_]+)/);
const timeoutMatch = spec.match(/HOSTED_EVIDENCE_TEST_TIMEOUT_MS\s*=\s*([0-9_]+)/);
assert.ok(budgetMatch, 'total capture budget must be declared');
assert.ok(timeoutMatch, 'hosted evidence test timeout must be declared');
const parseNumber = (value) => Number(String(value).replaceAll('_', ''));
const totalBudgetMs = parseNumber(budgetMatch[1]);
const testTimeoutMs = parseNumber(timeoutMatch[1]);
assert.ok(totalBudgetMs >= 360_000, 'total budget must be high enough for real hosted evidence capture on GitHub Actions');
assert.ok(totalBudgetMs < testTimeoutMs, 'total budget must fail before Playwright test timeout');

function assertBudgetRecord(record) {
  assert.equal(typeof record.phase, 'string');
  assert.ok(record.phase.length > 0);
  assert.equal(typeof record.duration_ms, 'number');
  assert.equal(typeof record.budget_ms, 'number');
  assert.equal(record.within_budget, record.duration_ms <= record.budget_ms);
}

const syntheticRecords = [
  { phase: 'full-page-capture:desktop-first-screen', duration_ms: 1000, budget_ms: 45000, within_budget: true },
  { phase: 'targeted-region-capture', duration_ms: 1000, budget_ms: 180000, within_budget: true },
  { phase: 'targeted-region:quality-export-surface', duration_ms: 1000, budget_ms: 180000, within_budget: true }
];
for (const record of syntheticRecords) assertBudgetRecord(record);

const overBudget = { phase: 'targeted-region-capture', duration_ms: 181000, budget_ms: 180000, within_budget: false };
assertBudgetRecord(overBudget);
assert.equal(overBudget.within_budget, false, 'synthetic over-budget phase must be rejected deterministically');

assert.equal(contract.version, CURRENT_VERSION);
assert.equal(contract.runtime_scope, CURRENT_RUNTIME_SCOPE);
assert.ok(contract.required_tests.includes('tests/hosted-evidence-capture-timeout-budget-guard-check.mjs'));
assert.ok(contract.required_tests.includes(HOSTED_SPEC));
assert.ok(contract.expected_changed_files.includes(HOSTED_SPEC));
assert.ok(contract.lock_assertions.some((assertion) => assertion.includes('timeout budget')));

for (const gate of ['no-browser', 'current-no-browser', 'source', 'release']) {
  assert.ok(registry.gates[gate].node_checks.includes('tests/hosted-evidence-capture-timeout-budget-guard-check.mjs'), `${gate} gate must run timeout budget guard before browser evidence`);
}
assert.ok(registry.syntax_matrix.files.includes('tests/hosted-evidence-capture-timeout-budget-guard-check.mjs'), 'syntax matrix must cover timeout budget guard');
assert.equal(registry.hosted_evidence_capture_timeout_budget_guard.version, CURRENT_VERSION);
assert.equal(registry.hosted_evidence_capture_timeout_budget_guard.timing_metadata_required, true);
assert.equal(registry.hosted_evidence_capture_timeout_budget_guard.phase_budget_records_required, true);
assert.equal(registry.hosted_evidence_capture_timeout_budget_guard.targeted_region_budget_records_required, true);

for (const token of [
  'timing_budget_guard',
  'targeted-region-capture',
  'HOSTED_EVIDENCE_PHASE_BUDGETS_MS.targeted_region_capture'
]) {
  assert.ok(spec.includes(token), `hosted browser spec must preserve ${token}`);
}
assert.ok(targetedCheck.includes('CURRENT_RELEASE'), 'targeted hosted evidence check must derive release identity from the single current-release source');

console.log(`Hosted evidence capture timeout budget guard checks passed for ${CURRENT_RELEASE}.`);
