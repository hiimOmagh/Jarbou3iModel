import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const VERSION = '1.4.0-alpha.9';
const STABLE_BASELINE = '1.3.0';
const CREDENTIAL_BOUNDARY_BASELINE = '1.4.0-alpha.8';
const SOURCE_ACQUISITION_BASELINE = '1.4.0-alpha.7';
const MOCK_TO_LIVE_BASELINE = '1.4.0-alpha.6';
const REPLAY_BASELINE = '1.4.0-alpha.5';
const MILESTONE = 'v1.4.0-alpha.9 — Controlled Execution Candidate Gate';

const ctx = { console, window: { Jarbou3iResearchModules: {} } };
ctx.globalThis = ctx;
vm.createContext(ctx);
for (const file of [
  'src/research/source-acquisition-control-surface.js',
  'src/research/credential-boundary-runtime-drill.js',
  'src/research/controlled-execution-candidate-gate.js'
]) {
  vm.runInContext(fs.readFileSync(file, 'utf8'), ctx, { filename: file });
}

const mod = ctx.window.Jarbou3iResearchModules.controlledExecutionCandidateGate;
assert.ok(mod, 'controlledExecutionCandidateGate must be registered');
assert.equal(mod.VERSION, VERSION);
assert.equal(mod.STABLE_BASELINE, STABLE_BASELINE);
assert.equal(mod.CREDENTIAL_BOUNDARY_BASELINE, CREDENTIAL_BOUNDARY_BASELINE);
assert.equal(mod.SOURCE_ACQUISITION_BASELINE, SOURCE_ACQUISITION_BASELINE);
assert.equal(mod.MOCK_TO_LIVE_BASELINE, MOCK_TO_LIVE_BASELINE);
assert.equal(mod.REPLAY_BASELINE, REPLAY_BASELINE);
assert.equal(mod.MILESTONE, MILESTONE);
assert.equal(mod.MODEL, 'controlled_execution_candidate_gate.v1');

assert.deepEqual(Array.from(mod.REQUIRED_DEPENDENCIES), [
  'stable_manual_workflow_locked',
  'source_acquisition_control_surface_locked',
  'credential_boundary_runtime_drill_locked',
  'mock_to_live_equivalence_locked',
  'policy_matrix_present',
  'failure_ux_contracts_present',
  'dry_run_replay_pack_present',
  'operator_approval_simulation_present',
  'execution_readiness_report_present'
]);
assert.ok(mod.FAILURE_TO_ENABLE_REASONS.includes('live_provider_execution_disabled_by_policy'));
assert.ok(mod.FAILURE_TO_ENABLE_REASONS.includes('real_credentials_absent_by_design'));
assert.ok(mod.FAILURE_TO_ENABLE_REASONS.includes('automatic_signoff_export_lock_publication_blocked'));

const report = mod.buildNoExecutionDryCandidateReport({ now: '2026-05-28T00:00:00.000Z' });
assert.equal(report.controlled_execution_candidate_gate_version, VERSION);
assert.equal(report.stable_baseline, STABLE_BASELINE);
assert.equal(report.credential_boundary_baseline, CREDENTIAL_BOUNDARY_BASELINE);
assert.equal(report.source_acquisition_baseline, SOURCE_ACQUISITION_BASELINE);
assert.equal(report.mock_to_live_baseline, MOCK_TO_LIVE_BASELINE);
assert.equal(report.replay_baseline, REPLAY_BASELINE);
assert.equal(report.milestone, MILESTONE);
assert.equal(report.candidate_state, 'no_execution_candidate_ready');
assert.equal(report.no_execution_dry_candidate_report, true);
assert.equal(report.controlled_execution_candidate_only, true);
assert.equal(report.execution_enabled, false);
assert.equal(report.live_provider_execution_enabled, false);
assert.equal(report.live_source_fetching_enabled, false);
assert.equal(report.real_oauth_enabled, false);
assert.equal(report.real_api_keys_used, false);
assert.equal(report.real_token_storage_enabled, false);
assert.equal(report.backend_storage_expanded, false);
assert.equal(report.automatic_source_verification_claimed, false);
assert.equal(report.automatic_signoff_performed, false);
assert.equal(report.automatic_export_lock_performed, false);
assert.equal(report.cryptographic_signature_claimed, false);
assert.equal(report.publication_permission_claimed, false);
assert.equal(report.safe_metadata_only, true);
assert.equal(report.manual_operator_preconditions_required, true);
assert.equal(report.future_live_execution_blocked, true);
assert.equal(report.release_gate, 'controlled_execution_candidate_gate_ready');
assert.equal(report.ok, true);
assert.equal(report.failure_to_enable_reason_count, 10);
assert.ok(report.unsatisfied_operator_preconditions.includes('manual_operator_intent_recorded'));
assert.ok(report.unsatisfied_operator_preconditions.includes('source_permissions_reviewed'));
assert.ok(report.unsatisfied_operator_preconditions.includes('cost_timeout_abort_controls_defined'));
assert.equal(report.dependency_failure_count, 0);
assert.ok(report.boundary_statement.includes('no-execution dry candidate report'));
assert.ok(report.candidate_report_checksum.startsWith('fnv1a32:'));

for (const [key, value] of Object.entries(report.boundary_flags)) {
  if (['controlled_execution_candidate_gate_only','no_execution_dry_candidate_report','manual_operator_preconditions_required','deterministic_fixture_backed','failure_to_enable_reasons_required'].includes(key)) {
    assert.equal(value, true, `${key} must be true`);
  } else {
    assert.equal(value, false, `${key} must remain false`);
  }
}

for (const row of report.dependency_checklist) {
  assert.equal(row.live_execution_enabled, undefined, 'checklist rows must not expose live enablement flags');
  assert.equal(row.passed_for_no_execution_candidate, true, `${row.id} must pass for no-execution candidate review`);
}
for (const row of report.operator_preconditions) {
  assert.equal(row.live_execution_enabled, false, `${row.id} must not enable execution`);
  assert.equal(row.future_live_execution_authorized_now, false, `${row.id} must not authorize future live execution now`);
}

const blocked = mod.evaluateControlledExecutionCandidate({
  now: '2026-05-28T00:00:00.000Z',
  source_acquisition_audit: { ok: false },
  credential_boundary_report: { ok: false }
});
assert.equal(blocked.ok, false);
assert.equal(blocked.release_gate, 'controlled_execution_candidate_gate_review_required');
assert.ok(blocked.dependency_failures.includes('source_acquisition_control_surface_locked'));
assert.ok(blocked.dependency_failures.includes('credential_boundary_runtime_drill_locked'));
assert.equal(blocked.execution_enabled, false);

const index = fs.readFileSync('index.html', 'utf8');
const registry = JSON.parse(fs.readFileSync('tests/ci-gate-registry.json', 'utf8'));
assert.ok(index.includes('src="src/research/controlled-execution-candidate-gate.js" defer'), 'index must load controlled execution candidate gate module');
assert.ok(index.includes('Controlled Execution Candidate Gate'), 'index must expose alpha.9 label');
for (const gate of ['no-browser', 'current-no-browser', 'privacy', 'provider', 'source', 'release']) {
  assert.ok(registry.gates[gate].node_checks.includes('tests/controlled-execution-candidate-gate-check.mjs'), `${gate} must run controlled execution candidate gate check`);
}
assert.ok(registry.syntax_matrix.files.includes('src/research/controlled-execution-candidate-gate.js'));
assert.ok(registry.syntax_matrix.files.includes('tests/controlled-execution-candidate-gate-check.mjs'));
assert.equal(registry.runtime_optimization.optimization_scope, 'controlled_execution_candidate_gate');
assert.equal(registry.runtime_optimization.version, VERSION);

console.log('Controlled execution candidate gate checks passed.');
process.exit(0);
