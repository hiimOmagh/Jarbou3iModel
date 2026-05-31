import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const VERSION = '1.4.0-alpha.10';
const STABLE_BASELINE = '1.3.0';
const CANDIDATE_GATE_BASELINE = '1.4.0-alpha.9';
const CREDENTIAL_BOUNDARY_BASELINE = '1.4.0-alpha.8';
const SOURCE_ACQUISITION_BASELINE = '1.4.0-alpha.7';
const MOCK_TO_LIVE_BASELINE = '1.4.0-alpha.6';
const MILESTONE = 'v1.4.0-alpha.10 — Limited Manual Live-Execution Prototype';

const ctx = { console, window: { Jarbou3iResearchModules: {} } };
ctx.globalThis = ctx;
vm.createContext(ctx);
for (const file of [
  'src/research/source-acquisition-control-surface.js',
  'src/research/credential-boundary-runtime-drill.js',
  'src/research/controlled-execution-candidate-gate.js',
  'src/research/limited-manual-live-execution-prototype.js'
]) {
  vm.runInContext(fs.readFileSync(file, 'utf8'), ctx, { filename: file });
}

const mod = ctx.window.Jarbou3iResearchModules.limitedManualLiveExecutionPrototype;
assert.ok(mod, 'limitedManualLiveExecutionPrototype must be registered');
assert.equal(mod.VERSION, VERSION);
assert.equal(mod.STABLE_BASELINE, STABLE_BASELINE);
assert.equal(mod.CANDIDATE_GATE_BASELINE, CANDIDATE_GATE_BASELINE);
assert.equal(mod.CREDENTIAL_BOUNDARY_BASELINE, CREDENTIAL_BOUNDARY_BASELINE);
assert.equal(mod.SOURCE_ACQUISITION_BASELINE, SOURCE_ACQUISITION_BASELINE);
assert.equal(mod.MOCK_TO_LIVE_BASELINE, MOCK_TO_LIVE_BASELINE);
assert.equal(mod.MILESTONE, MILESTONE);
assert.equal(mod.MODEL, 'limited_manual_live_execution_prototype.v1');

assert.deepEqual(Array.from(mod.REQUIRED_PRECONDITIONS), [
  'operator_explicit_opt_in_recorded',
  'operator_runtime_abort_acknowledged',
  'operator_cost_timeout_limits_acknowledged',
  'ephemeral_credential_handoff_confirmed_without_storage',
  'source_scope_reviewed_without_auto_fetch',
  'provider_payload_reviewed_without_secrets',
  'failure_ux_reviewed_before_manual_attempt',
  'candidate_gate_locked',
  'credential_boundary_locked',
  'source_acquisition_locked'
]);
assert.ok(mod.HARD_FAILURE_REASONS.includes('manual_live_execution_disabled_by_default'));
assert.ok(mod.HARD_FAILURE_REASONS.includes('credential_storage_forbidden'));
assert.ok(mod.HARD_FAILURE_REASONS.includes('automatic_source_fetching_forbidden'));
assert.ok(mod.HARD_FAILURE_REASONS.includes('publication_permission_claim_forbidden'));

const report = mod.buildLimitedManualLiveExecutionPrototype({ now: '2026-05-28T00:00:00.000Z' });
assert.equal(report.limited_manual_live_execution_prototype_version, VERSION);
assert.equal(report.stable_baseline, STABLE_BASELINE);
assert.equal(report.candidate_gate_baseline, CANDIDATE_GATE_BASELINE);
assert.equal(report.credential_boundary_baseline, CREDENTIAL_BOUNDARY_BASELINE);
assert.equal(report.source_acquisition_baseline, SOURCE_ACQUISITION_BASELINE);
assert.equal(report.mock_to_live_baseline, MOCK_TO_LIVE_BASELINE);
assert.equal(report.milestone, MILESTONE);
assert.equal(report.prototype_state, 'manual_preconditions_missing');
assert.equal(report.manual_only_live_execution_prototype_shell, true);
assert.equal(report.disabled_by_default, true);
assert.equal(report.execution_enabled, false);
assert.equal(report.live_provider_execution_enabled, false);
assert.equal(report.live_provider_execution_performed, false);
assert.equal(report.live_source_fetching_enabled, false);
assert.equal(report.live_source_fetching_performed, false);
assert.equal(report.hidden_network_calls_allowed, false);
assert.equal(report.background_execution_allowed, false);
assert.equal(report.production_oauth_enabled, false);
assert.equal(report.real_api_keys_used, false);
assert.equal(report.real_api_keys_stored, false);
assert.equal(report.real_token_storage_enabled, false);
assert.equal(report.credential_persistence_allowed, false);
assert.equal(report.backend_storage_expanded, false);
assert.equal(report.automatic_source_fetching_enabled, false);
assert.equal(report.automatic_source_verification_claimed, false);
assert.equal(report.provider_suggested_source_auto_acceptance, false);
assert.equal(report.automatic_signoff_performed, false);
assert.equal(report.automatic_export_lock_performed, false);
assert.equal(report.cryptographic_signature_claimed, false);
assert.equal(report.publication_permission_claimed, false);
assert.equal(report.safe_metadata_only, true);
assert.equal(report.can_execute_now, false);
assert.equal(report.ok, true);
assert.equal(report.release_gate, 'limited_manual_live_execution_prototype_shell_ready');
assert.ok(report.missing_preconditions.includes('operator_explicit_opt_in_recorded'));
assert.ok(report.missing_preconditions.includes('ephemeral_credential_handoff_confirmed_without_storage'));
assert.ok(report.hard_failure_reasons.includes('operator_explicit_opt_in_missing'));
assert.ok(report.boundary_statement.includes('disabled-by-default manual opt-in shell'));
assert.ok(report.prototype_shell_checksum.startsWith('fnv1a32:'));

for (const [key, value] of Object.entries(report.boundary_flags)) {
  if (['manual_only_live_execution_prototype_shell','disabled_by_default','safe_metadata_only','deterministic_fixture_backed','hard_failure_reasons_required'].includes(key)) {
    assert.equal(value, true, `${key} must be true`);
  } else {
    assert.equal(value, false, `${key} must remain false`);
  }
}
for (const row of report.manual_preconditions) {
  assert.equal(row.live_execution_enabled, false, `${row.id} must not enable execution`);
  assert.equal(row.authorizes_execution_now, false, `${row.id} must not authorize execution now`);
  assert.equal(row.credential_persistence_allowed, false, `${row.id} must not allow credential persistence`);
  assert.equal(row.automatic_source_fetching_enabled, false, `${row.id} must not allow automatic source fetching`);
  assert.equal(row.background_execution_allowed, false, `${row.id} must not allow background execution`);
}

const readyForReview = mod.evaluateLimitedManualLiveExecutionPrototype({
  now: '2026-05-28T00:00:00.000Z',
  manual_operator_controls: {
    operator_explicit_opt_in_recorded: true,
    operator_runtime_abort_acknowledged: true,
    operator_cost_timeout_limits_acknowledged: true,
    ephemeral_credential_handoff_confirmed_without_storage: true,
    source_scope_reviewed_without_auto_fetch: true,
    provider_payload_reviewed_without_secrets: true,
    failure_ux_reviewed_before_manual_attempt: true
  }
});
assert.equal(readyForReview.prototype_shell_ready_for_manual_review, true);
assert.equal(readyForReview.prototype_state, 'manual_prototype_ready_for_review');
assert.equal(readyForReview.can_execute_now, false, 'manual review readiness must not execute now');
assert.equal(readyForReview.execution_enabled, false, 'manual review readiness must not enable execution');
assert.equal(readyForReview.live_provider_execution_performed, false);
assert.equal(readyForReview.live_source_fetching_performed, false);

const source = fs.readFileSync('src/research/limited-manual-live-execution-prototype.js', 'utf8');
for (const forbidden of ['fetch(', 'XMLHttpRequest', 'WebSocket', 'localStorage.setItem', 'sessionStorage.setItem', 'navigator.sendBeacon']) {
  assert.equal(source.includes(forbidden), false, `manual live prototype shell must not contain ${forbidden}`);
}

const index = fs.readFileSync('index.html', 'utf8');
const registry = JSON.parse(fs.readFileSync('tests/ci-gate-registry.json', 'utf8'));
assert.ok(index.includes('src="src/research/limited-manual-live-execution-prototype.js" defer'), 'index must load limited manual live execution prototype module');
assert.ok(index.includes('Limited Manual Live-Execution Prototype'), 'index must expose alpha.10 label');
for (const gate of ['no-browser', 'current-no-browser', 'privacy', 'provider', 'source', 'release']) {
  assert.ok(registry.gates[gate].node_checks.includes('tests/limited-manual-live-execution-prototype-check.mjs'), `${gate} must run limited manual live execution prototype check`);
}
assert.ok(registry.syntax_matrix.files.includes('src/research/limited-manual-live-execution-prototype.js'));
assert.ok(registry.syntax_matrix.files.includes('tests/limited-manual-live-execution-prototype-check.mjs'));
assert.ok(['limited_manual_live_execution_prototype','manual_execution_safety_cockpit_session_ledger','adapter_contract_test_bench_no_network_invocation_replay_qa','adapter_replay_fixture_corpus_coverage_matrix','manual_provider_adapter_ux_compression_evidence_runtime_budget','handoff_productivity_runbook_gate', 'adapter_replay_insight_ux_operator_decision_surface', 'adapter_replay_review_pack_operator_handoff_export', 'adapter_replay_review_pack_ui_export_preview'].includes(registry.runtime_optimization.optimization_scope), 'runtime optimization may point to current alpha while preserving alpha.10 check');
assert.ok(['1.4.0-alpha.10','1.4.0-alpha.11','1.4.0-alpha.28', '1.4.0-alpha.29'].includes(registry.runtime_optimization.version), 'runtime optimization version may point to current alpha while preserving alpha.10 check');

console.log('Limited manual live-execution prototype checks passed.');
process.exit(0);
