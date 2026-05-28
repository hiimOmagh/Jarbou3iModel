import assert from 'node:assert/strict';
import vm from 'node:vm';
import fs from 'node:fs';

const VERSION = '1.4.0-alpha.5';
const STABLE_BASELINE = '1.3.0';
const CONTROL_BASELINE = '1.4.0-alpha.5';
const DRY_RUN_BASELINE = '1.4.0-alpha.3';
const MILESTONE = 'v1.4.0-alpha.5 — Dry-Run Replay Pack + Operator Approval Simulation';
const dependencies = [
  'src/research/provider-source-dry-run-execution-harness.js',
  'src/research/provider-source-dry-run-trace-inspector.js'
];

const ctx = { console, window: { Jarbou3iResearchModules: {} } };
ctx.globalThis = ctx;
vm.createContext(ctx);

for (const file of dependencies) {
  const source = fs.readFileSync(file, 'utf8');
  new vm.Script(source, { filename: file });
  vm.runInContext(source, ctx, { filename: file });
}

const mod = ctx.window.Jarbou3iResearchModules.providerSourceDryRunTraceInspector;
assert.ok(mod, 'providerSourceDryRunTraceInspector must be registered');
assert.equal(mod.VERSION, VERSION);
assert.equal(mod.STABLE_BASELINE, STABLE_BASELINE);
assert.equal(mod.CONTROL_BASELINE, CONTROL_BASELINE);
assert.equal(mod.DRY_RUN_BASELINE, DRY_RUN_BASELINE);
assert.equal(mod.MILESTONE, MILESTONE);
assert.equal(mod.MODEL, 'provider_source_dry_run_trace_inspector.v1');

const report = mod.inspectDryRunTraces({ now: '2026-05-25T00:00:00.000Z' });
assert.equal(report.trace_inspector_version, VERSION);
assert.equal(report.stable_baseline, STABLE_BASELINE);
assert.equal(report.control_baseline, CONTROL_BASELINE);
assert.equal(report.dry_run_baseline, DRY_RUN_BASELINE);
assert.equal(report.milestone, MILESTONE);
assert.equal(report.planning_control_plane_only, true);
assert.equal(report.trace_inspection_only, true);
assert.equal(report.deterministic_fixture_backed, true);
assert.equal(report.live_execution_enabled, false);
assert.equal(report.live_source_fetching_enabled, false);
assert.equal(report.production_oauth_enabled, false);
assert.ok(report.trace_count >= 6, 'trace inspector must inspect deterministic dry-run traces');
assert.ok(report.info_count >= 2, 'manual/mock traces should remain informational');
assert.ok(report.review_count >= 3, 'blocked dry-run traces should require review');
assert.equal(report.side_effect_violation_count, 0, 'deterministic traces must not contain side-effect violations');
assert.equal(report.no_live_network_attempted, true);
assert.equal(report.no_provider_execution_performed, true);
assert.equal(report.no_source_fetch_performed, true);
assert.equal(report.no_credential_read_attempted, true);
assert.equal(report.no_verification_claimed, true);
assert.equal(report.no_automatic_signoff, true);
assert.equal(report.no_automatic_export_lock, true);
assert.equal(report.all_review_items_have_failure_contract, true);
assert.ok(report.boundary_statement.includes('Trace inspector reviews deterministic dry-run traces only'));

for (const [key, value] of Object.entries(report.boundary_flags)) {
  if (key === 'trace_inspection_only' || key === 'deterministic_fixture_backed') {
    assert.equal(value, true, `${key} must be true`);
  } else {
    assert.equal(value, false, `boundary flag ${key} must remain false`);
  }
}

const violation = mod.inspectTrace({
  scenario_id: 'bad_trace',
  surface: 'provider',
  requested_mode: 'live_provider_execution',
  live_network_attempted: true,
  provider_execution_performed: true,
  source_fetch_performed: false,
  credential_read_attempted: true,
  verification_claimed: true
}, 0);
assert.equal(violation.level, mod.TRACE_LEVELS.BLOCKING);
assert.equal(violation.side_effect_violation_count, 3);
assert.equal(violation.requires_operator_review, true);
assert.equal(violation.live_network_attempted, true);
assert.equal(violation.provider_execution_performed, true);
assert.equal(violation.credential_read_attempted, true);

console.log('Provider/source dry-run trace inspector checks passed.');
process.exit(0);
