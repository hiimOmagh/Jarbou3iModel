import assert from 'node:assert/strict';
import vm from 'node:vm';
import fs from 'node:fs';

const VERSION = '1.4.0-alpha.6';
const STABLE_BASELINE = '1.3.0';
const CONTROL_BASELINE = '1.4.0-alpha.6';
const MILESTONE = 'v1.4.0-alpha.6 — Provider Execution Harness Mock-to-Live Equivalence';
const source = fs.readFileSync('src/research/provider-source-dry-run-execution-harness.js', 'utf8');

new vm.Script(source, { filename: 'src/research/provider-source-dry-run-execution-harness.js' });
const ctx = { console, window: { Jarbou3iResearchModules: {} } };
ctx.globalThis = ctx;
vm.createContext(ctx);
vm.runInContext(source, ctx, { filename: 'src/research/provider-source-dry-run-execution-harness.js' });

const mod = ctx.window.Jarbou3iResearchModules.providerSourceDryRunExecutionHarness;
assert.ok(mod, 'providerSourceDryRunExecutionHarness must be registered');
assert.equal(mod.VERSION, VERSION);
assert.equal(mod.STABLE_BASELINE, STABLE_BASELINE);
assert.equal(mod.CONTROL_BASELINE, CONTROL_BASELINE);
assert.equal(mod.MILESTONE, MILESTONE);
assert.equal(mod.MODEL, 'provider_source_dry_run_execution_harness.v1');

const dossier = mod.runDryRunHarness({ now: '2026-05-25T00:00:00.000Z' });
assert.equal(dossier.dry_run_harness_version, VERSION);
assert.equal(dossier.stable_baseline, STABLE_BASELINE);
assert.equal(dossier.control_baseline, CONTROL_BASELINE);
assert.equal(dossier.milestone, MILESTONE);
assert.equal(dossier.planning_control_plane_only, true);
assert.equal(dossier.dry_run_only, true);
assert.equal(dossier.live_execution_enabled, false);
assert.equal(dossier.live_source_fetching_enabled, false);
assert.equal(dossier.production_oauth_enabled, false);
assert.equal(dossier.no_live_network_attempted, true);
assert.equal(dossier.no_provider_execution_performed, true);
assert.equal(dossier.no_source_fetch_performed, true);
assert.equal(dossier.no_credential_read_attempted, true);
assert.equal(dossier.all_blocked_have_operator_message, true);
assert.equal(dossier.all_blocked_have_failure_contract, true);
assert.ok(dossier.trace_count >= 6, 'dry-run harness must include provider/source/credential traces');
assert.ok(dossier.passed_dry_run_count >= 2, 'manual/mock dry-runs must remain passable');
assert.ok(dossier.blocked_count >= 4, 'live/provider/source/OAuth/backend paths must remain blocked');
assert.ok(dossier.boundary_statement.includes('deterministic fixtures only'));

for (const [key, value] of Object.entries(dossier.boundary_flags)) {
  if (key === 'dry_run_only' || key === 'deterministic_fixture_backed') {
    assert.equal(value, true, `${key} must be true`);
  } else {
    assert.equal(value, false, `boundary flag ${key} must remain false`);
  }
}

for (const id of ['mock_provider_success', 'manual_source_import_success']) {
  const trace = mod.simulateScenario(id, { now: '2026-05-25T00:00:00.000Z' });
  assert.equal(trace.allowed_to_proceed, true, `${id} must pass as dry-run/manual-only`);
  assert.equal(trace.live_network_attempted, false);
  assert.equal(trace.provider_execution_performed, false);
  assert.equal(trace.source_fetch_performed, false);
  assert.equal(trace.credential_read_attempted, false);
}

for (const id of ['live_provider_blocked', 'live_source_blocked', 'credential_boundary_violation_blocked']) {
  const trace = mod.simulateScenario(id, { now: '2026-05-25T00:00:00.000Z' });
  assert.equal(trace.allowed_to_proceed, false, `${id} must stay blocked`);
  assert.equal(trace.live_network_attempted, false, `${id} must block before network`);
  assert.equal(trace.provider_execution_performed, false, `${id} must not execute provider`);
  assert.equal(trace.source_fetch_performed, false, `${id} must not fetch source`);
  assert.ok(trace.failure_contract_id, `${id} must map to a failure contract`);
}

const unknown = mod.simulateScenario('unknown_scenario_xyz', { now: '2026-05-25T00:00:00.000Z' });
assert.equal(unknown.allowed_to_proceed, false);
assert.equal(unknown.live_network_attempted, false);
assert.equal(unknown.state_transition, 'unknown_scenario_blocked');
assert.equal(mod.getDryRunScenario('unknown_scenario_xyz'), null);

console.log('Provider/source dry-run execution harness checks passed.');
process.exit(0);
