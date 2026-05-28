import assert from 'node:assert/strict';
import vm from 'node:vm';
import fs from 'node:fs';

const VERSION = '1.4.0-alpha.6';
const STABLE_BASELINE = '1.3.0';
const CONTROL_BASELINE = '1.4.0-alpha.6';
const DRY_RUN_BASELINE = '1.4.0-alpha.3';
const MILESTONE = 'v1.4.0-alpha.6 — Provider Execution Harness Mock-to-Live Equivalence';
const dependencies = [
  'src/research/provider-source-dry-run-execution-harness.js',
  'src/research/provider-source-dry-run-trace-inspector.js',
  'src/research/provider-source-execution-readiness-report.js'
];

const ctx = { console, window: { Jarbou3iResearchModules: {} } };
ctx.globalThis = ctx;
vm.createContext(ctx);

for (const file of dependencies) {
  const source = fs.readFileSync(file, 'utf8');
  new vm.Script(source, { filename: file });
  vm.runInContext(source, ctx, { filename: file });
}

const mod = ctx.window.Jarbou3iResearchModules.providerSourceExecutionReadinessReport;
assert.ok(mod, 'providerSourceExecutionReadinessReport must be registered');
assert.equal(mod.VERSION, VERSION);
assert.equal(mod.STABLE_BASELINE, STABLE_BASELINE);
assert.equal(mod.CONTROL_BASELINE, CONTROL_BASELINE);
assert.equal(mod.DRY_RUN_BASELINE, DRY_RUN_BASELINE);
assert.equal(mod.MILESTONE, MILESTONE);
assert.equal(mod.MODEL, 'provider_source_execution_readiness_report.v1');

const report = mod.buildExecutionReadinessReport({ now: '2026-05-25T00:00:00.000Z' });
assert.equal(report.execution_readiness_report_version, VERSION);
assert.equal(report.stable_baseline, STABLE_BASELINE);
assert.equal(report.control_baseline, CONTROL_BASELINE);
assert.equal(report.dry_run_baseline, DRY_RUN_BASELINE);
assert.equal(report.milestone, MILESTONE);
assert.equal(report.planning_control_plane_only, true);
assert.equal(report.readiness_report_only, true);
assert.equal(report.deterministic_fixture_backed, true);
assert.equal(report.live_execution_enabled, false);
assert.equal(report.live_source_fetching_enabled, false);
assert.equal(report.production_oauth_enabled, false);
assert.equal(report.manual_workflow_ready, true);
assert.equal(report.dry_run_ready, true);
assert.equal(report.live_execution_ready, false);
assert.equal(report.live_source_fetching_ready, false);
assert.equal(report.production_oauth_ready, false);
assert.equal(report.readiness_state, mod.READINESS_STATES.LIVE_EXECUTION_BLOCKED);
assert.ok(report.requirement_count >= 8, 'readiness report must include provider/source/backend/credential requirements');
assert.ok(report.passed_requirement_count >= 5, 'planning prerequisites should be represented as passed');
assert.ok(report.blocker_count >= 3, 'live execution must remain blocked by explicit requirements');
assert.ok(report.blocker_ids.includes('live_provider_credentials_absent'));
assert.ok(report.blocker_ids.includes('source_acquisition_runtime_absent'));
assert.ok(report.blocker_ids.includes('backend_runtime_contract_absent'));
assert.equal(report.trace_inspection_summary.available, true);
assert.ok(report.trace_inspection_summary.trace_count >= 6);
assert.equal(report.trace_inspection_summary.side_effect_violation_count, 0);
assert.equal(report.trace_inspection_summary.no_live_network_attempted, true);
assert.equal(report.trace_inspection_summary.no_provider_execution_performed, true);
assert.equal(report.trace_inspection_summary.no_source_fetch_performed, true);
assert.equal(report.trace_inspection_summary.no_credential_read_attempted, true);
assert.equal(report.release_gate, 'review_required');
assert.equal(report.verification_claimed, false);
assert.equal(report.automatic_source_verification_claimed, false);
assert.equal(report.automatic_signoff_performed, false);
assert.equal(report.automatic_export_lock_performed, false);
assert.equal(report.cryptographic_signature_claimed, false);
assert.equal(report.publication_permission_claimed, false);
assert.ok(report.boundary_statement.includes('readiness gaps'));

for (const [key, value] of Object.entries(report.boundary_flags)) {
  if (key === 'readiness_report_only' || key === 'deterministic_fixture_backed') {
    assert.equal(value, true, `${key} must be true`);
  } else {
    assert.equal(value, false, `boundary flag ${key} must remain false`);
  }
}

const requirements = mod.getReadinessRequirements();
assert.equal(requirements.some(item => item.status === 'blocked' && item.blocks_live_execution === true), true);
assert.equal(requirements.every(item => typeof item.evidence === 'string' && item.evidence.length > 10), true);

console.log('Provider/source execution readiness report checks passed.');
process.exit(0);
