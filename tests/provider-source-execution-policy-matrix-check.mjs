import assert from 'node:assert/strict';
import vm from 'node:vm';
import fs from 'node:fs';

const VERSION = '1.4.0-alpha.4';
const STABLE_BASELINE = '1.3.0';
const CONTROL_BASELINE = '1.4.0-alpha.1';
const MILESTONE = 'v1.4.0-alpha.4 — Dry-Run Trace Inspector + Execution Readiness Report';
const source = fs.readFileSync('src/research/provider-source-execution-policy-matrix.js', 'utf8');

new vm.Script(source, { filename: 'src/research/provider-source-execution-policy-matrix.js' });
const ctx = { console, window: { Jarbou3iResearchModules: {} } };
ctx.globalThis = ctx;
vm.createContext(ctx);
vm.runInContext(source, ctx, { filename: 'src/research/provider-source-execution-policy-matrix.js' });

const mod = ctx.window.Jarbou3iResearchModules.providerSourceExecutionPolicyMatrix;
assert.ok(mod, 'providerSourceExecutionPolicyMatrix must be registered');
assert.equal(mod.VERSION, VERSION);
assert.equal(mod.STABLE_BASELINE, STABLE_BASELINE);
assert.equal(mod.CONTROL_BASELINE, CONTROL_BASELINE);
assert.equal(mod.MILESTONE, MILESTONE);
assert.equal(mod.MODEL, 'provider_source_execution_policy_matrix.v1');

const matrix = mod.buildPolicyMatrix({ now: '2026-05-25T00:00:00.000Z' });
assert.equal(matrix.policy_matrix_version, VERSION);
assert.equal(matrix.stable_baseline, STABLE_BASELINE);
assert.equal(matrix.control_baseline, CONTROL_BASELINE);
assert.equal(matrix.milestone, MILESTONE);
assert.equal(matrix.planning_control_plane_only, true);
assert.equal(matrix.live_execution_enabled, false);
assert.equal(matrix.live_source_fetching_enabled, false);
assert.equal(matrix.production_oauth_enabled, false);
assert.equal(matrix.all_live_network_disabled, true);
assert.equal(matrix.all_blocked_have_unlock_requirements, true);
assert.ok(matrix.boundary_statement.includes('planning/control-plane'));
assert.ok(matrix.row_count >= 7, 'policy matrix must include provider/source/credential/backend rows');
assert.ok(matrix.allowed_count >= 2, 'manual/mock planning rows must remain allowed');
assert.ok(matrix.blocked_count >= 4, 'live execution/source/OAuth/backend rows must remain blocked');

for (const [key, value] of Object.entries(matrix.boundary_flags)) {
  assert.equal(value, false, `boundary flag ${key} must remain false`);
}

const requiredBlocked = [
  'live_provider_execution',
  'live_source_fetching',
  'production_oauth',
  'backend_proxy_live_execution'
];
for (const id of requiredBlocked) {
  const row = mod.getPolicy(id);
  assert.ok(row, `policy row ${id} must exist`);
  assert.equal(row.allowed_now, false, `${id} must be blocked in alpha.2`);
  assert.equal(row.live_network_allowed, false, `${id} must not allow live network in alpha.2`);
  assert.ok(Array.isArray(row.unlock_requires) && row.unlock_requires.length >= 3, `${id} must define unlock requirements`);
}

for (const id of ['manual_source_import', 'mock_provider_response', 'provider_dry_run_preflight']) {
  const row = mod.getPolicy(id);
  assert.ok(row, `policy row ${id} must exist`);
  assert.equal(row.allowed_now, true, `${id} must remain allowed as manual/mock/planning flow`);
  assert.equal(row.live_network_allowed, false, `${id} must not use live network`);
}

assert.equal(mod.getPolicy('unknown_policy_xyz'), null);
assert.ok(mod.getAllowedPolicies().every(row => row.allowed_now === true));
assert.ok(mod.getBlockedPolicies().every(row => row.allowed_now === false));

console.log('Provider/source execution policy matrix checks passed.');
process.exit(0);
