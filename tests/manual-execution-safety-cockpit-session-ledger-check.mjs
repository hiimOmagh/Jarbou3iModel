import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const VERSION = '1.4.0-alpha.11';
const MILESTONE = 'v1.4.0-alpha.11 — Manual Execution Safety Cockpit + Session Ledger';

const ctx = { console, window: { Jarbou3iResearchModules: {} } };
ctx.globalThis = ctx;
vm.createContext(ctx);
for (const file of [
  'src/research/source-acquisition-control-surface.js',
  'src/research/credential-boundary-runtime-drill.js',
  'src/research/controlled-execution-candidate-gate.js',
  'src/research/limited-manual-live-execution-prototype.js',
  'src/research/manual-execution-safety-cockpit-session-ledger.js'
]) {
  vm.runInContext(fs.readFileSync(file, 'utf8'), ctx, { filename: file });
}

const mod = ctx.window.Jarbou3iResearchModules.manualExecutionSafetyCockpitSessionLedger;
assert.ok(mod, 'manualExecutionSafetyCockpitSessionLedger must be registered');
assert.equal(mod.VERSION, VERSION);
assert.equal(mod.MILESTONE, MILESTONE);
assert.equal(mod.MODEL, 'manual_execution_safety_cockpit_session_ledger.v1');
assert.equal(mod.MANUAL_PROTOTYPE_BASELINE, '1.4.0-alpha.11');
assert.equal(mod.CANDIDATE_GATE_BASELINE, '1.4.0-alpha.9');
assert.equal(mod.CREDENTIAL_BOUNDARY_BASELINE, '1.4.0-alpha.8');
assert.equal(mod.SOURCE_ACQUISITION_BASELINE, '1.4.0-alpha.7');
assert.equal(mod.MOCK_TO_LIVE_BASELINE, '1.4.0-alpha.6');

const expectedStates = [
  'idle',
  'preflight_ready',
  'operator_review_required',
  'operator_armed',
  'simulated_running',
  'abort_requested',
  'kill_switch_triggered',
  'timed_out',
  'completed_no_execution',
  'blocked',
  'failed_precondition'
];
assert.deepEqual(Object.values(mod.SESSION_STATES), expectedStates);
assert.ok(mod.TERMINAL_STATES.includes('kill_switch_triggered'));
assert.ok(mod.TERMINAL_STATES.includes('timed_out'));

const requiredLedgerFields = [
  'session_id',
  'created_at',
  'mode',
  'state',
  'operator_preconditions_summary',
  'source_scope_summary',
  'provider_payload_summary',
  'credential_boundary_summary',
  'budget_summary',
  'timeout_summary',
  'abort_reason',
  'failure_reasons',
  'no_execution_report',
  'checksum'
];
assert.deepEqual(Array.from(mod.ALLOWED_LEDGER_FIELDS), requiredLedgerFields);
for (const forbidden of ['raw_credentials','raw_tokens','raw_api_keys','authorization_headers','raw_provider_payloads_containing_secrets','raw_source_fetch_results','raw_browser_session_secrets']) {
  assert.ok(mod.FORBIDDEN_LEDGER_FIELDS.includes(forbidden));
}

const incomplete = mod.buildManualExecutionSafetyCockpit({ now: '2026-05-28T00:00:00.000Z' });
assert.equal(incomplete.manual_execution_safety_cockpit_version, VERSION);
assert.equal(incomplete.state, 'failed_precondition');
assert.equal(incomplete.can_execute_now, false);
assert.equal(incomplete.live_provider_execution_enabled, false);
assert.equal(incomplete.live_source_fetching_enabled, false);
assert.equal(incomplete.hidden_network_calls_allowed, false);
assert.equal(incomplete.production_oauth_enabled, false);
assert.equal(incomplete.real_token_storage_enabled, false);
assert.equal(incomplete.credential_persistence_allowed, false);
assert.equal(incomplete.safe_metadata_only, true);
assert.ok(incomplete.no_execution_fallback_report.fallback_required);
assert.ok(incomplete.no_execution_fallback_report.execution_remains_blocked);
assert.ok(incomplete.blockers.includes('budget_preview_missing'));
assert.ok(incomplete.blockers.includes('timeout_limit_missing'));
assert.ok(incomplete.blockers.includes('budget_timeout_acknowledgement_missing'));
assert.ok(incomplete.required_continuity_layers.includes('manual_execution_safety_cockpit_session_ledger'));
assert.equal(incomplete.continuity_summary.length, 5);

const readyOptions = {
  now: '2026-05-28T00:00:00.000Z',
  session_id: 'manual-session-test-001',
  manual_operator_controls: {
    operator_review_completed: true,
    operator_explicit_start_requested: true,
    operator_abort_control_acknowledged: true,
    operator_no_execution_fallback_acknowledged: true,
    source_scope_reviewed_without_auto_fetch: true,
    provider_payload_summary_reviewed_without_raw_secrets: true,
    operator_explicit_opt_in_recorded: true,
    operator_runtime_abort_acknowledged: true,
    operator_cost_timeout_limits_acknowledged: true,
    ephemeral_credential_handoff_confirmed_without_storage: true,
    provider_payload_reviewed_without_secrets: true,
    failure_ux_reviewed_before_manual_attempt: true
  },
  budget_controls: {
    budget_preview: { currency: 'EUR', max_estimated_cost: 0 },
    max_request_count: 1,
    timeout_limit_ms: 30000,
    operator_budget_timeout_acknowledged: true
  },
  mock_to_live_report: { ok: true, mock_to_live_equivalence_version: '1.4.0-alpha.6', equivalence_checksum: 'fnv1a32:00000006' }
};
const ready = mod.buildManualExecutionSafetyCockpit(readyOptions);
assert.equal(ready.state, 'operator_armed');
assert.equal(ready.readiness_status, 'armed_for_simulation_only');
assert.equal(ready.can_execute_now, false, 'armed state must remain simulation-only');
assert.equal(ready.live_provider_execution_performed, false);
assert.equal(ready.live_source_fetching_performed, false);
assert.equal(ready.safe_session_ledger.session_id, 'manual-session-test-001');
assert.equal(ready.safe_session_ledger.mode, 'manual_execution_safety_cockpit_simulation_only');
assert.equal(ready.safe_session_ledger.provider_payload_summary.raw_payload_exported, false);
assert.equal(ready.safe_session_ledger.credential_boundary_summary.raw_credentials_persisted, false);
assert.equal(ready.safe_session_ledger.budget_summary.live_cost_api_connected, false);
assert.ok(ready.safe_session_ledger.checksum.startsWith('fnv1a32:'));
assert.equal(mod.validateLedgerSafety(ready.safe_session_ledger).ok, true);
assert.deepEqual(Object.keys(ready.safe_session_ledger).sort(), [...mod.ALLOWED_LEDGER_FIELDS].sort());

const abortTransition = mod.transitionSession({ state: 'simulated_running' }, 'operator_abort', { abort_reason: 'operator_pressed_abort' });
assert.equal(abortTransition.state, 'kill_switch_triggered');
assert.equal(abortTransition.can_rearm_same_session, false);
const timeoutTransition = mod.transitionSession({ state: 'simulated_running' }, 'timeout');
assert.equal(timeoutTransition.state, 'timed_out');
assert.equal(timeoutTransition.can_rearm_same_session, false);
const blockedTransition = mod.transitionSession({ state: 'operator_review_required' }, 'failed_precondition');
assert.equal(blockedTransition.state, 'blocked');
const killedCannotRearm = mod.transitionSession({ state: 'kill_switch_triggered' }, 'arm');
assert.equal(killedCannotRearm.transition_blocked, true);
assert.equal(killedCannotRearm.requires_new_session_id, true);
assert.equal(killedCannotRearm.can_rearm_same_session, false);

const killSwitch = mod.buildKillSwitchReport({ now: '2026-05-28T00:00:00.000Z', session: ready.safe_session_ledger, operator_abort_requested: true, abort_reason: 'operator_abort_button' });
assert.equal(killSwitch.to_state, 'kill_switch_triggered');
assert.equal(killSwitch.safe_metadata_only, true);
assert.equal(killSwitch.raw_credentials_recorded, false);
assert.equal(killSwitch.raw_tokens_recorded, false);
assert.equal(killSwitch.provider_call_performed, false);
assert.equal(killSwitch.live_source_fetching_performed, false);

for (const [key, value] of Object.entries(ready.boundary_flags)) {
  if (['safety_cockpit_simulation_only','disabled_by_default','safe_metadata_only','no_execution_fallback_required','kill_switch_drill_required','session_ledger_safe_metadata_only'].includes(key)) {
    assert.equal(value, true, `${key} must be true`);
  } else {
    assert.equal(value, false, `${key} must remain false`);
  }
}

const source = fs.readFileSync('src/research/manual-execution-safety-cockpit-session-ledger.js', 'utf8');
for (const forbidden of ['fetch(', 'XMLHttpRequest', 'WebSocket', 'localStorage.setItem', 'sessionStorage.setItem', 'navigator.sendBeacon']) {
  assert.equal(source.includes(forbidden), false, `safety cockpit must not contain ${forbidden}`);
}
for (const forbidden of ['sk-', 'ghp_', 'AKIA', 'BEGIN PRIVATE KEY', 'Bearer ']) {
  assert.equal(JSON.stringify(ready).includes(forbidden), false, `report must not contain credential-like token ${forbidden}`);
}

const index = fs.readFileSync('index.html', 'utf8');
const registry = JSON.parse(fs.readFileSync('tests/ci-gate-registry.json', 'utf8'));
assert.ok(index.includes('src="src/research/manual-execution-safety-cockpit-session-ledger.js" defer'), 'index must load alpha.11 module');
assert.ok(index.includes('Manual Execution Safety Cockpit + Session Ledger'), 'index must expose alpha.11 label');
assert.ok(index.includes('data-browser-qa="manual-execution-safety-cockpit-session-ledger"'), 'index must expose browser QA cockpit card');
for (const gate of ['no-browser', 'current-no-browser', 'privacy', 'provider', 'source', 'release']) {
  assert.ok(registry.gates[gate].node_checks.includes('tests/manual-execution-safety-cockpit-session-ledger-check.mjs'), `${gate} must run alpha.11 safety cockpit check`);
}
assert.ok(registry.syntax_matrix.files.includes('src/research/manual-execution-safety-cockpit-session-ledger.js'));
assert.ok(registry.syntax_matrix.files.includes('tests/manual-execution-safety-cockpit-session-ledger-check.mjs'));
assert.ok(['manual_execution_safety_cockpit_session_ledger','adapter_contract_test_bench_no_network_invocation_replay_qa','adapter_replay_fixture_corpus_coverage_matrix','manual_provider_adapter_ux_compression_evidence_runtime_budget','handoff_productivity_runbook_gate', 'adapter_replay_insight_ux_operator_decision_surface', 'adapter_replay_review_pack_operator_handoff_export', 'adapter_replay_review_pack_triage_workbench'].includes(registry.runtime_optimization.optimization_scope), 'runtime optimization may point to current alpha while preserving alpha.11 check');
assert.ok([VERSION,'1.4.0-alpha.28', '1.4.0-alpha.34'].includes(registry.runtime_optimization.version), 'runtime optimization version may point to current alpha while preserving alpha.11 check');

console.log('Manual execution safety cockpit + session ledger checks passed.');
process.exit(0);
