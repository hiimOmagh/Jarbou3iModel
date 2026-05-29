import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const VERSION = '1.4.0-alpha.13';
const MILESTONE = 'v1.4.0-alpha.13 — Adapter Contract Test Bench + No-Network Invocation Replay QA';

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
  'src/research/manual-provider-adapter-sandbox-ephemeral-invocation-contract.js',
  'src/research/adapter-contract-test-bench-no-network-invocation-replay-qa.js'
]) {
  vm.runInContext(fs.readFileSync(file, 'utf8'), ctx, { filename: file });
}

const mod = ctx.window.Jarbou3iResearchModules.adapterContractTestBenchNoNetworkInvocationReplayQa;
assert.ok(mod, 'adapterContractTestBenchNoNetworkInvocationReplayQa must be registered');
assert.equal(mod.VERSION, VERSION);
assert.equal(mod.MILESTONE, MILESTONE);
assert.equal(mod.MODEL, 'adapter_contract_test_bench_no_network_invocation_replay_qa.v1');
assert.equal(mod.ADAPTER_SANDBOX_BASELINE, '1.4.0-alpha.12');
assert.equal(mod.SAFETY_COCKPIT_BASELINE, '1.4.0-alpha.11');
assert.equal(mod.MANUAL_PROTOTYPE_BASELINE, '1.4.0-alpha.10');
assert.equal(mod.CANDIDATE_GATE_BASELINE, '1.4.0-alpha.9');
assert.equal(mod.CREDENTIAL_BOUNDARY_BASELINE, '1.4.0-alpha.8');
assert.equal(mod.SOURCE_ACQUISITION_BASELINE, '1.4.0-alpha.7');
assert.equal(mod.MOCK_TO_LIVE_BASELINE, '1.4.0-alpha.6');

assert.deepEqual(Object.values(mod.BENCH_STATES), [
  'disabled_by_default',
  'deterministic_fixtures_ready',
  'request_response_envelope_diff_ready',
  'no_network_invocation_replay_ready',
  'adapter_failure_ux_rehearsed',
  'blocked',
  'failed_precondition'
]);

for (const required of [
  'adapter_sandbox_report_available',
  'deterministic_provider_adapter_fixtures_loaded',
  'request_response_envelope_diff_reviewed',
  'no_network_replay_acknowledged',
  'adapter_failure_ux_rehearsed',
  'safe_transcript_comparison_acknowledged',
  'cross_provider_capability_matrix_reviewed',
  'raw_secret_leak_check_passed',
  'operator_no_network_boundary_acknowledged'
]) assert.ok(mod.REQUIRED_PRECONDITIONS.includes(required), `${required} required`);

const expectedLedgerFields = [
  'bench_id',
  'created_at',
  'mode',
  'state',
  'adapter_fixture_summary',
  'request_response_envelope_diff_summary',
  'no_network_replay_summary',
  'failure_ux_rehearsal_summary',
  'safe_transcript_comparison_summary',
  'cross_provider_capability_matrix_summary',
  'failure_reasons',
  'boundary_flags',
  'checksum'
];
assert.deepEqual(Array.from(mod.ALLOWED_LEDGER_FIELDS), expectedLedgerFields);
for (const forbidden of ['raw_credentials','raw_tokens','raw_api_keys','authorization_headers','raw_request_body','raw_response_body','raw_source_fetch_results','raw_network_trace','browser_session_secrets','provider_secret_value']) {
  assert.ok(mod.FORBIDDEN_LEDGER_FIELDS.includes(forbidden));
}

const incomplete = mod.buildAdapterContractTestBench({ now: '2026-05-28T00:00:00.000Z' });
assert.equal(incomplete.adapter_contract_test_bench_version, VERSION);
assert.equal(incomplete.state, 'blocked');
assert.equal(incomplete.readiness_status, 'blocked_no_network_replay_qa');
assert.equal(incomplete.can_execute_now, false);
assert.equal(incomplete.network_invocation_allowed, false);
assert.equal(incomplete.live_provider_execution_enabled, false);
assert.equal(incomplete.live_provider_execution_performed, false);
assert.equal(incomplete.live_source_fetching_enabled, false);
assert.equal(incomplete.hidden_network_calls_allowed, false);
assert.equal(incomplete.real_oauth_token_lifecycle_enabled, false);
assert.equal(incomplete.real_api_keys_stored, false);
assert.equal(incomplete.real_tokens_stored, false);
assert.equal(incomplete.credential_persistence_allowed, false);
assert.equal(incomplete.safe_metadata_only, true);
assert.ok(incomplete.failure_reasons.includes('deterministic_provider_adapter_fixtures_missing'));
assert.ok(incomplete.failure_reasons.includes('no_network_replay_not_acknowledged'));
assert.equal(incomplete.safe_replay_ledger.mode, 'adapter_contract_test_bench_no_network_replay_qa');
assert.equal(mod.validateReplayLedgerSafety(incomplete.safe_replay_ledger).ok, true);
assert.deepEqual(Object.keys(incomplete.safe_replay_ledger).sort(), [...mod.ALLOWED_LEDGER_FIELDS].sort());

const adapterSandbox = ctx.window.Jarbou3iResearchModules.manualProviderAdapterSandboxEphemeralInvocationContract.buildManualProviderAdapterSandbox({
  now: '2026-05-28T00:00:00.000Z',
  session_id: 'adapter-sandbox-ready-for-alpha13',
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
});
assert.equal(adapterSandbox.live_provider_execution_enabled, false);

const ready = mod.buildAdapterContractTestBench({
  now: '2026-05-28T00:00:00.000Z',
  bench_id: 'adapter-contract-bench-test-001',
  adapter_sandbox_report: adapterSandbox,
  deterministic_provider_adapter_fixtures_loaded: true,
  request_response_envelope_diff_reviewed: true,
  no_network_replay_acknowledged: true,
  adapter_failure_ux_rehearsed: true,
  safe_transcript_comparison_acknowledged: true,
  cross_provider_capability_matrix_reviewed: true,
  raw_secret_leak_check_passed: true,
  operator_no_network_boundary_acknowledged: true
});
assert.equal(ready.state, 'no_network_invocation_replay_ready');
assert.equal(ready.readiness_status, 'no_network_invocation_replay_ready');
assert.equal(ready.can_execute_now, false, 'replay readiness must still not authorize execution');
assert.equal(ready.adapter_fixture_summary.loaded, true);
assert.equal(ready.adapter_fixture_summary.fixture_count, 3);
assert.equal(ready.request_response_envelope_diff.envelope_shapes_match, true);
assert.equal(ready.no_network_invocation_replay.provider_call_performed, false);
assert.equal(ready.no_network_invocation_replay.network_request_count, 0);
assert.equal(ready.no_network_invocation_replay.raw_response_body_recorded, false);
assert.equal(ready.adapter_failure_ux_rehearsal.operator_rehearsed, true);
assert.equal(ready.safe_transcript_comparison.raw_request_compared, false);
assert.equal(ready.safe_transcript_comparison.raw_response_compared, false);
assert.equal(ready.cross_provider_capability_matrix.live_invocation_supported_in_this_release, false);
assert.equal(ready.safe_replay_ledger.bench_id, 'adapter-contract-bench-test-001');
assert.ok(ready.safe_replay_ledger.checksum.startsWith('fnv1a32:'));
assert.equal(mod.validateReplayLedgerSafety(ready.safe_replay_ledger).ok, true);
assert.equal(ready.checksum.startsWith('fnv1a32:'), true);

for (const [key, value] of Object.entries(ready.boundary_flags)) {
  if (['adapter_contract_test_bench_only','no_network_invocation_replay_qa_only','deterministic_fixtures_only','disabled_by_default','safe_metadata_only'].includes(key)) {
    assert.equal(value, true, `${key} must be true`);
  } else {
    assert.equal(value, false, `${key} must remain false`);
  }
}

const unsafeLedger = Object.assign({}, ready.safe_replay_ledger, { raw_tokens: 'blocked', raw_response_body: 'blocked' });
assert.equal(mod.validateReplayLedgerSafety(unsafeLedger).ok, false);
assert.ok(mod.validateReplayLedgerSafety(unsafeLedger).forbidden_present.includes('raw_tokens'));

const source = fs.readFileSync('src/research/adapter-contract-test-bench-no-network-invocation-replay-qa.js', 'utf8');
for (const forbidden of ['fetch(', 'XMLHttpRequest', 'WebSocket', 'localStorage.setItem', 'sessionStorage.setItem', 'navigator.sendBeacon']) {
  assert.equal(source.includes(forbidden), false, `adapter contract test bench must not contain ${forbidden}`);
}
for (const forbidden of ['sk-', 'ghp_', 'AKIA', 'BEGIN PRIVATE KEY', 'Bearer ']) {
  assert.equal(JSON.stringify(ready).includes(forbidden), false, `report must not contain credential-like token ${forbidden}`);
}

const index = fs.readFileSync('index.html', 'utf8');
const registry = JSON.parse(fs.readFileSync('tests/ci-gate-registry.json', 'utf8'));
assert.ok(index.includes('src="src/research/adapter-contract-test-bench-no-network-invocation-replay-qa.js" defer'), 'index must load alpha.13 module');
assert.ok(index.includes('Evidence Budget Dashboard Actionability') || index.includes('Adapter Contract Test Bench + No-Network Invocation Replay QA'), 'index must expose current adapter replay/contract QA label');
assert.ok(index.includes('data-browser-qa="adapter-replay-fixture-corpus-coverage-matrix"') || index.includes('data-browser-qa="adapter-contract-test-bench-no-network-invocation-replay-qa"'), 'index must expose browser QA adapter replay/contract card');
for (const gate of ['no-browser', 'current-no-browser', 'privacy', 'provider', 'source', 'release']) {
  assert.ok(registry.gates[gate].node_checks.includes('tests/adapter-contract-test-bench-no-network-invocation-replay-qa-check.mjs'), `${gate} must run alpha.13 adapter contract check`);
}
assert.ok(registry.syntax_matrix.files.includes('src/research/adapter-contract-test-bench-no-network-invocation-replay-qa.js'));
assert.ok(registry.syntax_matrix.files.includes('tests/adapter-contract-test-bench-no-network-invocation-replay-qa-check.mjs'));
assert.ok(['adapter_contract_test_bench_no_network_invocation_replay_qa', 'adapter_replay_fixture_corpus_coverage_matrix','manual_provider_adapter_ux_compression_evidence_runtime_budget'].includes(registry.runtime_optimization.optimization_scope), 'runtime optimization may advance to alpha.14 while preserving alpha.13 check');
assert.ok([VERSION, '1.4.0-alpha.18'].includes(registry.runtime_optimization.version), 'runtime optimization may advance to alpha.14 while preserving alpha.13 check');

console.log('Adapter contract test bench + no-network invocation replay QA checks passed.');
process.exit(0);
