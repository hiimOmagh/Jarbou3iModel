import assert from 'node:assert/strict';
import vm from 'node:vm';
import fs from 'node:fs';

const VERSION = '1.4.0-alpha.6';
const STABLE_BASELINE = '1.3.0';
const CONTROL_BASELINE = '1.4.0-alpha.6';
const REPLAY_BASELINE = '1.4.0-alpha.5';
const TRACE_BASELINE = '1.4.0-alpha.4';
const MILESTONE = 'v1.4.0-alpha.6 — Provider Execution Harness Mock-to-Live Equivalence';
const dependencies = [
  'src/research/provider-source-execution-policy-matrix.js',
  'src/research/provider-source-failure-ux-contracts.js',
  'src/research/provider-source-dry-run-execution-harness.js',
  'src/research/provider-source-policy-simulator.js',
  'src/research/provider-source-dry-run-trace-inspector.js',
  'src/research/provider-source-execution-readiness-report.js',
  'src/research/provider-source-dry-run-replay-pack.js',
  'src/research/provider-source-operator-approval-simulation.js',
  'src/research/provider-execution-mock-to-live-equivalence.js'
];

const ctx = { console, window: { Jarbou3iResearchModules: {} } };
ctx.globalThis = ctx;
vm.createContext(ctx);

for (const file of dependencies) {
  const source = fs.readFileSync(file, 'utf8');
  new vm.Script(source, { filename: file });
  vm.runInContext(source, ctx, { filename: file });
}

const mod = ctx.window.Jarbou3iResearchModules.providerExecutionMockToLiveEquivalence;
assert.ok(mod, 'providerExecutionMockToLiveEquivalence must be registered');
assert.equal(mod.VERSION, VERSION);
assert.equal(mod.STABLE_BASELINE, STABLE_BASELINE);
assert.equal(mod.CONTROL_BASELINE, CONTROL_BASELINE);
assert.equal(mod.REPLAY_BASELINE, REPLAY_BASELINE);
assert.equal(mod.TRACE_BASELINE, TRACE_BASELINE);
assert.equal(mod.MILESTONE, MILESTONE);
assert.equal(mod.MODEL, 'provider_execution_mock_to_live_equivalence.v1');

const report = mod.buildMockToLiveEquivalenceReport({ now: '2026-05-28T00:00:00.000Z' });
assert.equal(report.mock_to_live_equivalence_version, VERSION);
assert.equal(report.stable_baseline, STABLE_BASELINE);
assert.equal(report.control_baseline, CONTROL_BASELINE);
assert.equal(report.replay_baseline, REPLAY_BASELINE);
assert.equal(report.trace_baseline, TRACE_BASELINE);
assert.equal(report.milestone, MILESTONE);
assert.equal(report.planning_control_plane_only, true);
assert.equal(report.mock_to_live_equivalence_only, true);
assert.equal(report.deterministic_fixture_backed, true);
assert.equal(report.future_live_envelope_only, true);
assert.equal(report.live_execution_enabled, false);
assert.equal(report.live_source_fetching_enabled, false);
assert.equal(report.production_oauth_enabled, false);
assert.equal(report.dependency_summary.replay_pack_available, true);
assert.equal(report.dependency_summary.operator_approval_simulation_available, true);
assert.equal(report.dependency_summary.policy_matrix_available, true);
assert.equal(report.dependency_summary.failure_ux_contracts_available, true);
assert.equal(report.dependency_summary.readiness_report_available, true);
assert.ok(report.dependency_summary.replay_item_count >= 6, 'equivalence report must cover the dry-run replay pack');
assert.ok(report.equivalence_row_count >= 6, 'equivalence rows must cover replay items');
assert.equal(report.equivalent_for_planning_count, report.equivalence_row_count);
assert.equal(report.review_required_count, 0);
assert.equal(report.all_payload_shapes_equivalent, true);
assert.equal(report.all_planned_live_envelopes_secret_safe, true);
assert.equal(report.all_failure_contracts_mapped, true);
assert.equal(report.all_policy_boundaries_preserved, true);
assert.equal(report.all_operator_approval_boundaries_preserved, true);
assert.equal(report.all_live_execution_boundaries_preserved, true);
assert.equal(report.all_readiness_blockers_preserved, true);
assert.equal(report.no_live_network_attempted, true);
assert.equal(report.no_provider_execution_performed, true);
assert.equal(report.no_source_fetch_performed, true);
assert.equal(report.no_credential_read_attempted, true);
assert.equal(report.verification_claimed, false);
assert.equal(report.automatic_source_verification_claimed, false);
assert.equal(report.automatic_signoff_performed, false);
assert.equal(report.automatic_export_lock_performed, false);
assert.equal(report.cryptographic_signature_claimed, false);
assert.equal(report.publication_permission_claimed, false);
assert.equal(report.release_gate, 'mock_to_live_equivalence_passed_for_planning');
assert.ok(report.equivalence_checksum.startsWith('fnv1a32:'), 'equivalence report must expose deterministic non-crypto checksum');
assert.ok(report.boundary_statement.includes('never authorizes live provider execution'));

for (const [key, value] of Object.entries(report.boundary_flags)) {
  if (key === 'mock_to_live_equivalence_only' || key === 'deterministic_fixture_backed' || key === 'future_live_envelope_only') {
    assert.equal(value, true, `${key} must be true`);
  } else {
    assert.equal(value, false, `boundary flag ${key} must remain false`);
  }
}

for (const row of report.equivalence_rows) {
  assert.equal(row.equivalence_state, mod.EQUIVALENCE_STATES.EQUIVALENT_FOR_PLANNING);
  assert.equal(row.payload_shape_equivalent, true);
  assert.equal(row.planned_live_envelope_secret_safe, true);
  assert.equal(row.failure_contract_mapped, true);
  assert.equal(row.policy_boundary_preserved, true);
  assert.equal(row.operator_approval_boundary_preserved, true);
  assert.equal(row.live_execution_boundary_preserved, true);
  assert.equal(row.readiness_blockers_preserved, true);
  assert.equal(row.planned_live_envelope.live_execution_enabled, false);
  assert.equal(row.planned_live_envelope.live_network_allowed, false);
  assert.equal(row.planned_live_envelope.provider_execution_allowed, false);
  assert.equal(row.planned_live_envelope.source_fetch_allowed, false);
  assert.equal(row.planned_live_envelope.credential_value_access_allowed, false);
  assert.equal(row.planned_live_envelope.credential_reference_present, false);
  assert.equal(row.planned_live_envelope.raw_secret_value_present, false);
  assert.equal(row.planned_live_envelope.network_invocation_present, false);
  assert.equal(row.planned_live_envelope.automatic_source_verification_claimed, false);
  assert.equal(row.planned_live_envelope.automatic_signoff_authorized, false);
  assert.equal(row.planned_live_envelope.automatic_export_lock_authorized, false);
  assert.equal(row.planned_live_envelope.cryptographic_signature_claimed, false);
  assert.equal(row.planned_live_envelope.publication_permission_claimed, false);
  assert.ok(row.planned_live_envelope.envelope_checksum.startsWith('fnv1a32:'));
}

const badShape = mod.comparePayloadShape(
  { scenario_id: 'bad', surface: 'provider' },
  { scenario_id: 'bad', surface: 'provider', requested_mode: 'live_provider_execution', policy_state: 'blocked', state_transition: 'blocked', failure_contract_id: 'provider_auth_missing', operator_message: 'safe', api_key: 'SHOULD_NOT_EXIST' }
);
assert.equal(badShape.payload_shape_equivalent, false);
assert.equal(badShape.planned_live_envelope_secret_safe, false);
assert.ok(badShape.forbidden_envelope_key_hits.includes('api_key'));

console.log('Provider execution mock-to-live equivalence checks passed.');
process.exit(0);
