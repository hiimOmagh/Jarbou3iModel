import assert from 'node:assert/strict';
import vm from 'node:vm';
import fs from 'node:fs';

const VERSION = '1.4.0-alpha.5';
const STABLE_BASELINE = '1.3.0';
const CONTROL_BASELINE = '1.4.0-alpha.5';
const DRY_RUN_BASELINE = '1.4.0-alpha.4';
const MILESTONE = 'v1.4.0-alpha.5 — Dry-Run Replay Pack + Operator Approval Simulation';
const dependencies = [
  'src/research/provider-source-dry-run-execution-harness.js',
  'src/research/provider-source-dry-run-trace-inspector.js',
  'src/research/provider-source-execution-readiness-report.js',
  'src/research/provider-source-dry-run-replay-pack.js',
  'src/research/provider-source-operator-approval-simulation.js'
];

const ctx = { console, window: { Jarbou3iResearchModules: {} } };
ctx.globalThis = ctx;
vm.createContext(ctx);

for (const file of dependencies) {
  const source = fs.readFileSync(file, 'utf8');
  new vm.Script(source, { filename: file });
  vm.runInContext(source, ctx, { filename: file });
}

const mod = ctx.window.Jarbou3iResearchModules.providerSourceOperatorApprovalSimulation;
assert.ok(mod, 'providerSourceOperatorApprovalSimulation must be registered');
assert.equal(mod.VERSION, VERSION);
assert.equal(mod.STABLE_BASELINE, STABLE_BASELINE);
assert.equal(mod.CONTROL_BASELINE, CONTROL_BASELINE);
assert.equal(mod.DRY_RUN_BASELINE, DRY_RUN_BASELINE);
assert.equal(mod.MILESTONE, MILESTONE);
assert.equal(mod.MODEL, 'provider_source_operator_approval_simulation.v1');

const sim = mod.simulateOperatorApproval({ now: '2026-05-28T00:00:00.000Z' });
assert.equal(sim.operator_approval_simulation_version, VERSION);
assert.equal(sim.stable_baseline, STABLE_BASELINE);
assert.equal(sim.control_baseline, CONTROL_BASELINE);
assert.equal(sim.dry_run_baseline, DRY_RUN_BASELINE);
assert.equal(sim.milestone, MILESTONE);
assert.equal(sim.planning_control_plane_only, true);
assert.equal(sim.operator_approval_simulation_only, true);
assert.equal(sim.deterministic_fixture_backed, true);
assert.equal(sim.live_execution_enabled, false);
assert.equal(sim.live_source_fetching_enabled, false);
assert.equal(sim.production_oauth_enabled, false);
assert.equal(sim.replay_pack_summary.available, true);
assert.ok(sim.approval_record_count >= 6, 'approval simulation must cover replay pack items');
assert.ok(sim.simulated_approved_count >= 2, 'safe mock/manual replay items should be simulated-approved for review');
assert.ok(sim.simulated_held_count >= 3, 'blocked policy/preflight items should be held for review');
assert.equal(sim.simulated_rejected_count, 0, 'locked fixture pack should not include side-effect-rejected items');
assert.equal(sim.all_live_execution_authorizations_false, true);
assert.equal(sim.all_source_fetch_authorizations_false, true);
assert.equal(sim.all_credential_access_authorizations_false, true);
assert.equal(sim.all_export_lock_authorizations_false, true);
assert.equal(sim.all_publication_authorizations_false, true);
assert.equal(sim.no_live_network_attempted, true);
assert.equal(sim.no_provider_execution_performed, true);
assert.equal(sim.no_source_fetch_performed, true);
assert.equal(sim.no_credential_read_attempted, true);
assert.equal(sim.verification_claimed, false);
assert.equal(sim.automatic_source_verification_claimed, false);
assert.equal(sim.automatic_signoff_performed, false);
assert.equal(sim.automatic_export_lock_performed, false);
assert.equal(sim.cryptographic_signature_claimed, false);
assert.equal(sim.publication_permission_claimed, false);
assert.equal(sim.release_gate, 'operator_review_required');
assert.ok(sim.boundary_statement.includes('does not perform real signoff'));

for (const [key, value] of Object.entries(sim.boundary_flags)) {
  if (key === 'operator_approval_simulation_only' || key === 'deterministic_fixture_backed') {
    assert.equal(value, true, `${key} must be true`);
  } else {
    assert.equal(value, false, `boundary flag ${key} must remain false`);
  }
}

const approved = sim.approval_records.filter(item => item.simulated_approval_state === mod.APPROVAL_STATES.SIMULATED_APPROVED_FOR_REPLAY_REVIEW);
const held = sim.approval_records.filter(item => item.simulated_approval_state === mod.APPROVAL_STATES.SIMULATED_HELD_FOR_OPERATOR_REVIEW);
assert.equal(approved.every(item => item.operator_comment_required === false && item.live_execution_authorized === false), true);
assert.equal(held.every(item => item.operator_comment_required === true && item.live_execution_authorized === false), true);

const rejectedState = mod.classifyApproval({ replay_state: 'blocked' });
assert.equal(rejectedState, mod.APPROVAL_STATES.SIMULATED_REJECTED_FOR_LIVE_EXECUTION);
const rejected = mod.buildApprovalRecord({ replay_id: 'r1', scenario_id: 'unsafe', replay_state: 'blocked', requested_mode: 'live_provider_execution' }, 0);
assert.equal(rejected.simulated_rejected_for_live_execution, true);
assert.equal(rejected.live_execution_authorized, false);
assert.equal(rejected.credential_access_authorized, false);

console.log('Provider/source operator approval simulation checks passed.');
process.exit(0);
