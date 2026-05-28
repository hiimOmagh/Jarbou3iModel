import assert from 'node:assert/strict';
import vm from 'node:vm';
import fs from 'node:fs';

const VERSION = '1.4.0-alpha.4';
const STABLE_BASELINE = '1.3.0';
const CONTROL_BASELINE = '1.4.0-alpha.1';
const MILESTONE = 'v1.4.0-alpha.4 — Dry-Run Trace Inspector + Execution Readiness Report';
const source = fs.readFileSync('src/research/provider-source-failure-ux-contracts.js', 'utf8');

new vm.Script(source, { filename: 'src/research/provider-source-failure-ux-contracts.js' });
const ctx = { console, window: { Jarbou3iResearchModules: {} } };
ctx.globalThis = ctx;
vm.createContext(ctx);
vm.runInContext(source, ctx, { filename: 'src/research/provider-source-failure-ux-contracts.js' });

const mod = ctx.window.Jarbou3iResearchModules.providerSourceFailureUxContracts;
assert.ok(mod, 'providerSourceFailureUxContracts must be registered');
assert.equal(mod.VERSION, VERSION);
assert.equal(mod.STABLE_BASELINE, STABLE_BASELINE);
assert.equal(mod.CONTROL_BASELINE, CONTROL_BASELINE);
assert.equal(mod.MILESTONE, MILESTONE);
assert.equal(mod.MODEL, 'provider_source_failure_ux_contracts.v1');

const dossier = mod.buildFailureUxContracts({ now: '2026-05-25T00:00:00.000Z' });
assert.equal(dossier.failure_ux_contract_version, VERSION);
assert.equal(dossier.stable_baseline, STABLE_BASELINE);
assert.equal(dossier.control_baseline, CONTROL_BASELINE);
assert.equal(dossier.milestone, MILESTONE);
assert.equal(dossier.planning_control_plane_only, true);
assert.equal(dossier.live_execution_enabled, false);
assert.equal(dossier.live_source_fetching_enabled, false);
assert.equal(dossier.production_oauth_enabled, false);
assert.equal(dossier.failure_ux_specified, true);
assert.equal(dossier.silent_failure_allowed, false);
assert.equal(dossier.automatic_retry_allowed, false);
assert.equal(dossier.all_contracts_preserve_review_boundary, true);
assert.equal(dossier.all_contracts_define_operator_action, true);
assert.equal(dossier.all_contracts_define_state_transition, true);
assert.ok(dossier.boundary_statement.includes('does not enable live provider or source execution'));
assert.ok(dossier.contract_count >= 8, 'failure UX must cover provider/source/credential failures');
assert.ok(dossier.severity_summary.critical >= 1, 'must define at least one critical failure contract');
assert.ok(dossier.severity_summary.blocking >= 4, 'must define multiple blocking failure contracts');

const requiredIds = [
  'provider_timeout',
  'provider_auth_missing',
  'provider_rate_limited',
  'provider_cost_budget_exceeded',
  'provider_invalid_response',
  'source_fetch_blocked',
  'source_rate_limited',
  'credential_boundary_violation'
];
for (const id of requiredIds) {
  const contract = mod.getContract(id);
  assert.ok(contract, `contract ${id} must exist`);
  assert.equal(contract.verification_claimed, false, `${id} must not claim verification`);
  assert.ok(contract.user_message.length > 10, `${id} must define user message`);
  assert.ok(contract.operator_action.length > 20, `${id} must define operator action`);
  assert.ok(contract.retry_policy.length > 5, `${id} must define retry policy`);
  assert.ok(contract.state_transition.length > 5, `${id} must define state transition`);
}

const credential = mod.getContract('credential_boundary_violation');
assert.equal(credential.severity, 'critical');
assert.equal(credential.secret_handling, 'redact_and_abort');
assert.ok(credential.operator_action.includes('block export'));

assert.equal(mod.getContract('unknown_contract_xyz'), null);
assert.ok(mod.getCriticalContracts().some(contract => contract.id === 'credential_boundary_violation'));

console.log('Provider/source failure UX contract checks passed.');
process.exit(0);
