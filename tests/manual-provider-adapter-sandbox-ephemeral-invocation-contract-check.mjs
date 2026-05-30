import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const VERSION = '1.4.0-alpha.12';
const MILESTONE = 'v1.4.0-alpha.12 — Manual Provider Adapter Sandbox + Ephemeral Invocation Contract';

const ctx = { console, window: { Jarbou3iResearchModules: {} } };
ctx.globalThis = ctx;
vm.createContext(ctx);
for (const file of [
  'src/research/provider-execution-mock-to-live-equivalence.js',
  'src/research/source-acquisition-control-surface.js',
  'src/research/credential-boundary-runtime-drill.js',
  'src/research/controlled-execution-candidate-gate.js',
  'src/research/limited-manual-live-execution-prototype.js',
  'src/research/manual-execution-safety-cockpit-session-ledger.js',
  'src/research/manual-provider-adapter-sandbox-ephemeral-invocation-contract.js'
]) {
  vm.runInContext(fs.readFileSync(file, 'utf8'), ctx, { filename: file });
}

const mod = ctx.window.Jarbou3iResearchModules.manualProviderAdapterSandboxEphemeralInvocationContract;
assert.ok(mod, 'manualProviderAdapterSandboxEphemeralInvocationContract must be registered');
assert.equal(mod.VERSION, VERSION);
assert.equal(mod.MILESTONE, MILESTONE);
assert.equal(mod.MODEL, 'manual_provider_adapter_sandbox_ephemeral_invocation_contract.v1');
assert.equal(mod.SAFETY_COCKPIT_BASELINE, '1.4.0-alpha.12');
assert.equal(mod.MANUAL_PROTOTYPE_BASELINE, '1.4.0-alpha.10');
assert.equal(mod.CANDIDATE_GATE_BASELINE, '1.4.0-alpha.9');
assert.equal(mod.CREDENTIAL_BOUNDARY_BASELINE, '1.4.0-alpha.8');
assert.equal(mod.SOURCE_ACQUISITION_BASELINE, '1.4.0-alpha.7');
assert.equal(mod.MOCK_TO_LIVE_BASELINE, '1.4.0-alpha.6');

assert.deepEqual(Object.values(mod.SANDBOX_STATES), [
  'disabled_by_default',
  'operator_review_required',
  'ephemeral_contract_ready',
  'dry_invocation_transcript_ready',
  'blocked',
  'failed_precondition'
]);

for (const required of [
  'operator_explicit_opt_in_recorded',
  'ephemeral_credential_handoff_acknowledged_without_storage',
  'provider_request_envelope_reviewed',
  'provider_payload_summary_confirmed_without_raw_secrets',
  'no_network_dry_invocation_acknowledged',
  'manual_response_metadata_only_acknowledged',
  'budget_timeout_request_limits_acknowledged',
  'kill_switch_available_before_invocation',
  'safety_cockpit_locked'
]) assert.ok(mod.REQUIRED_PRECONDITIONS.includes(required), `${required} required`);

const expectedLedgerFields = [
  'session_id',
  'created_at',
  'mode',
  'adapter_id',
  'state',
  'credential_handoff_summary',
  'provider_request_envelope_summary',
  'dry_invocation_transcript_summary',
  'response_metadata_summary',
  'operator_preconditions_summary',
  'failure_reasons',
  'boundary_flags',
  'checksum'
];
assert.deepEqual(Array.from(mod.ALLOWED_LEDGER_FIELDS), expectedLedgerFields);
for (const forbidden of ['raw_credentials','raw_tokens','raw_api_keys','authorization_headers','raw_request_body','raw_response_body','raw_source_fetch_results','raw_network_trace','browser_session_secrets']) {
  assert.ok(mod.FORBIDDEN_LEDGER_FIELDS.includes(forbidden));
}

const incomplete = mod.buildManualProviderAdapterSandbox({ now: '2026-05-28T00:00:00.000Z' });
assert.equal(incomplete.manual_provider_adapter_sandbox_version, VERSION);
assert.equal(incomplete.state, 'blocked');
assert.equal(incomplete.readiness_status, 'blocked_no_network_sandbox');
assert.equal(incomplete.can_execute_now, false);
assert.equal(incomplete.network_invocation_allowed, false);
assert.equal(incomplete.live_provider_execution_enabled, false);
assert.equal(incomplete.live_provider_execution_performed, false);
assert.equal(incomplete.live_source_fetching_enabled, false);
assert.equal(incomplete.hidden_network_calls_allowed, false);
assert.equal(incomplete.production_oauth_enabled, false);
assert.equal(incomplete.real_oauth_token_lifecycle_enabled, false);
assert.equal(incomplete.real_api_keys_stored, false);
assert.equal(incomplete.real_tokens_stored, false);
assert.equal(incomplete.credential_persistence_allowed, false);
assert.equal(incomplete.safe_metadata_only, true);
assert.ok(incomplete.adapter_failure_taxonomy.includes('operator_explicit_opt_in_missing'));
assert.ok(incomplete.adapter_failure_taxonomy.includes('ephemeral_credential_handoff_not_acknowledged'));
assert.ok(incomplete.adapter_failure_taxonomy.includes('no_network_dry_invocation_not_acknowledged'));
assert.equal(incomplete.safe_invocation_ledger.mode, 'manual_provider_adapter_sandbox_no_network');
assert.equal(mod.validateAdapterLedgerSafety(incomplete.safe_invocation_ledger).ok, true);
assert.deepEqual(Object.keys(incomplete.safe_invocation_ledger).sort(), [...mod.ALLOWED_LEDGER_FIELDS].sort());

const readyOptions = {
  now: '2026-05-28T00:00:00.000Z',
  session_id: 'adapter-sandbox-test-001',
  adapter_id: 'manual-provider-sandbox-test',
  manual_operator_controls: {
    operator_explicit_opt_in_recorded: true,
    ephemeral_credential_handoff_acknowledged_without_storage: true,
    provider_request_envelope_reviewed: true,
    provider_payload_summary_confirmed_without_raw_secrets: true,
    no_network_dry_invocation_acknowledged: true,
    manual_response_metadata_only_acknowledged: true,
    budget_timeout_request_limits_acknowledged: true,
    kill_switch_available_before_invocation: true,
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
  }
};
const ready = mod.buildManualProviderAdapterSandbox(readyOptions);
assert.equal(ready.state, 'dry_invocation_transcript_ready');
assert.equal(ready.readiness_status, 'dry_invocation_transcript_ready_no_network');
assert.equal(ready.can_execute_now, false, 'ready transcript must still not authorize execution');
assert.equal(ready.credential_handoff_summary.raw_credential_persisted, false);
assert.equal(ready.credential_handoff_summary.authorization_header_constructed, false);
assert.equal(ready.provider_request_envelope_preview.network_invocation_allowed, false);
assert.equal(ready.provider_request_envelope_preview.network_invocation_performed, false);
assert.equal(ready.provider_request_envelope_preview.raw_request_body_included, false);
assert.equal(ready.no_network_dry_invocation_transcript.provider_call_performed, false);
assert.equal(ready.no_network_dry_invocation_transcript.network_request_count, 0);
assert.equal(ready.no_network_dry_invocation_transcript.response_metadata_summary.raw_response_exported, false);
assert.equal(ready.safe_invocation_ledger.session_id, 'adapter-sandbox-test-001');
assert.equal(ready.safe_invocation_ledger.adapter_id, 'manual-provider-sandbox-test');
assert.ok(ready.safe_invocation_ledger.checksum.startsWith('fnv1a32:'));
assert.equal(mod.validateAdapterLedgerSafety(ready.safe_invocation_ledger).ok, true);
assert.equal(ready.checksum.startsWith('fnv1a32:'), true);

for (const [key, value] of Object.entries(ready.boundary_flags)) {
  if (['manual_provider_adapter_sandbox_only','no_network_dry_invocation_only','disabled_by_default','safe_metadata_only','ephemeral_credential_handoff_without_storage'].includes(key)) {
    assert.equal(value, true, `${key} must be true`);
  } else {
    assert.equal(value, false, `${key} must remain false`);
  }
}

const unsafeLedger = Object.assign({}, ready.safe_invocation_ledger, { raw_tokens: 'blocked', raw_request_body: 'blocked' });
assert.equal(mod.validateAdapterLedgerSafety(unsafeLedger).ok, false);
assert.ok(mod.validateAdapterLedgerSafety(unsafeLedger).forbidden_present.includes('raw_tokens'));

const source = fs.readFileSync('src/research/manual-provider-adapter-sandbox-ephemeral-invocation-contract.js', 'utf8');
for (const forbidden of ['fetch(', 'XMLHttpRequest', 'WebSocket', 'localStorage.setItem', 'sessionStorage.setItem', 'navigator.sendBeacon']) {
  assert.equal(source.includes(forbidden), false, `adapter sandbox must not contain ${forbidden}`);
}
for (const forbidden of ['sk-', 'ghp_', 'AKIA', 'BEGIN PRIVATE KEY', 'Bearer ']) {
  assert.equal(JSON.stringify(ready).includes(forbidden), false, `report must not contain credential-like token ${forbidden}`);
}

const index = fs.readFileSync('index.html', 'utf8');
const registry = JSON.parse(fs.readFileSync('tests/ci-gate-registry.json', 'utf8'));
assert.ok(index.includes('src="src/research/manual-provider-adapter-sandbox-ephemeral-invocation-contract.js" defer'), 'index must load alpha.12 module');
assert.ok(index.includes('Manual Provider Adapter Sandbox + Ephemeral Invocation Contract'), 'index must expose alpha.12 label');
assert.ok(index.includes('data-browser-qa="manual-provider-adapter-sandbox-ephemeral-invocation-contract"'), 'index must expose browser QA alpha.12 card');
for (const gate of ['no-browser', 'current-no-browser', 'privacy', 'provider', 'source', 'release']) {
  assert.ok(registry.gates[gate].node_checks.includes('tests/manual-provider-adapter-sandbox-ephemeral-invocation-contract-check.mjs'), `${gate} must run alpha.12 adapter sandbox check`);
}
assert.ok(registry.syntax_matrix.files.includes('src/research/manual-provider-adapter-sandbox-ephemeral-invocation-contract.js'));
assert.ok(registry.syntax_matrix.files.includes('tests/manual-provider-adapter-sandbox-ephemeral-invocation-contract-check.mjs'));
assert.ok(['manual_provider_adapter_sandbox_ephemeral_invocation_contract','adapter_contract_test_bench_no_network_invocation_replay_qa','adapter_replay_fixture_corpus_coverage_matrix','manual_provider_adapter_ux_compression_evidence_runtime_budget'].includes(registry.runtime_optimization.optimization_scope), 'runtime optimization scope may point to current alpha while preserving alpha.12 check');
assert.ok([VERSION,'1.4.0-alpha.22'].includes(registry.runtime_optimization.version), 'runtime optimization version may point to current alpha while preserving alpha.12 check');

console.log('Manual provider adapter sandbox + ephemeral invocation contract checks passed.');
process.exit(0);
