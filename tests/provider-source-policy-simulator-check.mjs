import assert from 'node:assert/strict';
import vm from 'node:vm';
import fs from 'node:fs';

const VERSION = '1.4.0-alpha.3';
const STABLE_BASELINE = '1.3.0';
const CONTROL_BASELINE = '1.4.0-alpha.3';
const MILESTONE = 'v1.4.0-alpha.3 — Provider/Source Dry-Run Execution Harness + Policy Simulator';
const source = fs.readFileSync('src/research/provider-source-policy-simulator.js', 'utf8');

new vm.Script(source, { filename: 'src/research/provider-source-policy-simulator.js' });
const ctx = { console, window: { Jarbou3iResearchModules: {} } };
ctx.globalThis = ctx;
vm.createContext(ctx);
vm.runInContext(source, ctx, { filename: 'src/research/provider-source-policy-simulator.js' });

const mod = ctx.window.Jarbou3iResearchModules.providerSourcePolicySimulator;
assert.ok(mod, 'providerSourcePolicySimulator must be registered');
assert.equal(mod.VERSION, VERSION);
assert.equal(mod.STABLE_BASELINE, STABLE_BASELINE);
assert.equal(mod.CONTROL_BASELINE, CONTROL_BASELINE);
assert.equal(mod.MILESTONE, MILESTONE);
assert.equal(mod.MODEL, 'provider_source_policy_simulator.v1');

const report = mod.buildPolicySimulationReport({ now: '2026-05-25T00:00:00.000Z' });
assert.equal(report.policy_simulation_version, VERSION);
assert.equal(report.stable_baseline, STABLE_BASELINE);
assert.equal(report.control_baseline, CONTROL_BASELINE);
assert.equal(report.milestone, MILESTONE);
assert.equal(report.planning_control_plane_only, true);
assert.equal(report.policy_simulation_only, true);
assert.equal(report.live_execution_enabled, false);
assert.equal(report.live_source_fetching_enabled, false);
assert.equal(report.production_oauth_enabled, false);
assert.equal(report.all_live_network_blocked, true);
assert.equal(report.all_credential_value_access_blocked, true);
assert.equal(report.all_blocked_define_failure_contract, true);
assert.equal(report.all_blocked_require_future_gate, true);
assert.ok(report.decision_count >= 6, 'policy simulator must include provider/source/OAuth/backend cases');
assert.ok(report.allowed_count >= 2, 'manual/mock cases must remain allowed');
assert.ok(report.blocked_count >= 4, 'live/source/OAuth/backend cases must remain blocked');
assert.ok(report.boundary_statement.includes('side-effect-free'));

for (const [key, value] of Object.entries(report.boundary_flags)) {
  if (key === 'policy_simulation_only' || key === 'policy_decision_side_effect_free') {
    assert.equal(value, true, `${key} must be true`);
  } else {
    assert.equal(value, false, `boundary flag ${key} must remain false`);
  }
}

const manual = mod.simulatePolicyDecision({ mode: 'manual_source_import' }, { now: '2026-05-25T00:00:00.000Z' });
assert.equal(manual.allowed, true);
assert.equal(manual.decision, mod.DECISIONS.ALLOW_MANUAL_ONLY);
assert.equal(manual.manual_source_import_allowed, true);
assert.equal(manual.live_network_allowed, false);

const mock = mod.simulatePolicyDecision({ mode: 'mock_provider_response' }, { now: '2026-05-25T00:00:00.000Z' });
assert.equal(mock.allowed, true);
assert.equal(mock.decision, mod.DECISIONS.ALLOW_DRY_RUN);
assert.equal(mock.provider_execution_allowed, true, 'mock provider simulation may be allowed without live execution');
assert.equal(mock.live_network_allowed, false);

for (const mode of ['live_provider_execution', 'live_source_fetching', 'production_oauth', 'backend_proxy_live_execution']) {
  const decision = mod.simulatePolicyDecision({ mode }, { now: '2026-05-25T00:00:00.000Z' });
  assert.equal(decision.allowed, false, `${mode} must remain blocked`);
  assert.equal(decision.live_network_allowed, false, `${mode} must block live network`);
  assert.equal(decision.credential_value_access_allowed, false, `${mode} must not allow credential value access`);
  assert.equal(decision.provider_execution_allowed, false, `${mode} must not allow provider execution`);
  assert.equal(decision.source_fetch_allowed, false, `${mode} must not allow source fetch`);
  assert.equal(decision.unlock_gate_required, true, `${mode} must require future gate`);
  assert.ok(decision.failure_contract_id, `${mode} must map to a failure contract`);
}

const unknown = mod.simulatePolicyDecision({ mode: 'unknown_live_thing', live_network_requested: true }, { now: '2026-05-25T00:00:00.000Z' });
assert.equal(unknown.allowed, false);
assert.equal(unknown.decision, mod.DECISIONS.REQUIRE_FUTURE_GATE);
assert.equal(unknown.live_network_allowed, false);
assert.equal(mod.getSimulationCase('unknown_case_xyz'), null);

console.log('Provider/source policy simulator checks passed.');
process.exit(0);
