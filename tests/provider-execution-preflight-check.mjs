import assert from 'node:assert/strict';
import vm from 'node:vm';
import fs from 'node:fs';

const VERSION = '1.4.0-alpha.6';
const STABLE_BASELINE = '1.3.0';
const MILESTONE = 'v1.4.0-alpha.6 — Provider Execution Harness Mock-to-Live Equivalence';
const source = fs.readFileSync('src/research/provider-execution-preflight.js', 'utf8');

new vm.Script(source, { filename: 'src/research/provider-execution-preflight.js' });
const ctx = { console, window: { Jarbou3iResearchModules: {} } };
ctx.globalThis = ctx;
vm.createContext(ctx);
vm.runInContext(source, ctx, { filename: 'src/research/provider-execution-preflight.js' });

const mod = ctx.window.Jarbou3iResearchModules.providerExecutionPreflight;
assert.ok(mod, 'providerExecutionPreflight must be registered');
assert.equal(mod.VERSION, VERSION);
assert.equal(mod.STABLE_BASELINE, STABLE_BASELINE);
assert.equal(mod.MILESTONE, MILESTONE);
assert.equal(mod.MODEL, 'provider_execution_preflight.v1');

// Planning mode: preflight must not pass (no live execution configured)
const planningResult = mod.runPreflight({ planning_mode: true }, { now: '2026-05-25T00:00:00.000Z' });
assert.equal(planningResult.preflight_version, VERSION);
assert.equal(planningResult.alpha_milestone, MILESTONE);
assert.equal(planningResult.planning_mode, true);
assert.equal(planningResult.live_execution_enabled, false);
assert.equal(planningResult.provider_behavior_changed, false);
assert.equal(planningResult.runtime_capability_change, false);
assert.equal(planningResult.preflight_passed, false, 'planning mode must not pass preflight');
assert.ok(planningResult.failed_required.length >= 1, 'planning mode must have failed required checks');
assert.ok(planningResult.boundary_statement.includes('planning mode'));

// Default (no config) also fails
const defaultResult = mod.runPreflight({}, { now: '2026-05-25T00:00:00.000Z' });
assert.equal(defaultResult.preflight_passed, false);
assert.equal(defaultResult.live_execution_enabled, false);

// Required check IDs all present
const requiredCheckIds = [
  'credential_presence',
  'cost_controls_configured',
  'timeout_controls_configured',
  'mock_equivalence_tested',
  'privacy_review_completed',
  'failure_ux_specified',
  'no_automatic_verification_claim',
  'boundary_flags_reviewed'
];
const definitions = mod.getCheckDefinitions();
const definedIds = definitions.map(c => c.id);
for (const id of requiredCheckIds) {
  assert.ok(definedIds.includes(id), `check '${id}' must be defined`);
}

// All checks marked required_for_live
const required = mod.getRequiredChecks();
assert.ok(required.length === definitions.length, 'all checks must be required_for_live');
assert.ok(required.every(c => c.required_for_live === true));

// Check counts
assert.ok(planningResult.check_count >= 8);
assert.ok(planningResult.failed_count >= 1);

// no_automatic_verification_claim passes in planning mode (it's the one safe default)
const noAutoVerifyCheck = planningResult.checks.find(c => c.id === 'no_automatic_verification_claim');
assert.ok(noAutoVerifyCheck, 'no_automatic_verification_claim check must be in result');
assert.equal(noAutoVerifyCheck.passed, true, 'no_automatic_verification_claim must pass in planning mode');

// Hypothetical fully-configured result passes (unit test only — not live execution)
const fullConfig = {
  planning_mode: false,
  credential_presence: true,
  cost_controls_configured: true,
  timeout_controls_configured: true,
  mock_equivalence_tested: true,
  privacy_review_completed: true,
  failure_ux_specified: true,
  no_automatic_verification_claim: true,
  boundary_flags_reviewed: true
};
const fullResult = mod.runPreflight(fullConfig, { now: '2026-05-25T00:00:00.000Z' });
assert.equal(fullResult.preflight_passed, true, 'fully configured preflight must pass');
assert.equal(fullResult.failed_count, 0);
assert.ok(fullResult.boundary_statement.includes('All preflight checks passed'));

console.log('Provider execution preflight checks passed.');
process.exit(0);
