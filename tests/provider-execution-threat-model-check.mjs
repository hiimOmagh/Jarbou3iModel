import assert from 'node:assert/strict';
import vm from 'node:vm';
import fs from 'node:fs';

const VERSION = '1.4.0-alpha.5';
const STABLE_BASELINE = '1.3.0';
const MILESTONE = 'v1.4.0-alpha.5 — Dry-Run Replay Pack + Operator Approval Simulation';
const source = fs.readFileSync('src/research/provider-execution-threat-model.js', 'utf8');

new vm.Script(source, { filename: 'src/research/provider-execution-threat-model.js' });
const ctx = { console, window: { Jarbou3iResearchModules: {} } };
ctx.globalThis = ctx;
vm.createContext(ctx);
vm.runInContext(source, ctx, { filename: 'src/research/provider-execution-threat-model.js' });

const mod = ctx.window.Jarbou3iResearchModules.providerExecutionThreatModel;
assert.ok(mod, 'providerExecutionThreatModel must be registered');
assert.equal(mod.VERSION, VERSION);
assert.equal(mod.STABLE_BASELINE, STABLE_BASELINE);
assert.equal(mod.MILESTONE, MILESTONE);
assert.equal(mod.MODEL, 'provider_execution_threat_model.v1');

// buildThreatModel returns correct boundary state
const model = mod.buildThreatModel({ now: '2026-05-25T00:00:00.000Z' });
assert.equal(model.threat_model_version, VERSION);
assert.equal(model.alpha_milestone, MILESTONE);
assert.equal(model.live_execution_enabled, false);
assert.equal(model.provider_behavior_changed, false);
assert.equal(model.runtime_capability_change, false);
assert.ok(model.boundary_statement.includes('planning-gate only'));

// Threat coverage
assert.ok(model.threat_count >= 6, 'must cover at least 6 threat categories');
assert.ok(model.all_require_live_prerequisite, 'all threats must require live execution prerequisite');

// Required threat IDs present
const requiredIds = [
  'credential_leak',
  'cost_runaway',
  'timeout_hang',
  'pii_in_prompt',
  'automatic_verification_claim',
  'uncontrolled_source_acquisition'
];
for (const id of requiredIds) {
  const threat = mod.getThreat(id);
  assert.ok(threat, `threat '${id}' must be defined`);
  assert.ok(Array.isArray(threat.vectors) && threat.vectors.length >= 2, `${id} must have >=2 vectors`);
  assert.ok(Array.isArray(threat.mitigations) && threat.mitigations.length >= 2, `${id} must have >=2 mitigations`);
  assert.ok(Array.isArray(threat.ci_gates) && threat.ci_gates.length >= 1, `${id} must reference >=1 CI gate`);
  assert.equal(threat.live_execution_prerequisite, true, `${id} must be a live execution prerequisite`);
}

// Severity summary includes at least one critical
assert.ok(model.severity_summary.critical >= 1, 'must have at least 1 critical-severity threat');

// getCriticalThreats / getHighThreats helpers
const critical = mod.getCriticalThreats();
assert.ok(critical.length >= 1);
assert.ok(critical.every(t => t.severity === 'critical'));
const high = mod.getHighThreats();
assert.ok(high.length >= 1);
assert.ok(high.every(t => t.severity === 'high'));

// getThreat returns null for unknown id
assert.equal(mod.getThreat('nonexistent_threat_xyz'), null);

console.log('Provider execution threat model checks passed.');
process.exit(0);
