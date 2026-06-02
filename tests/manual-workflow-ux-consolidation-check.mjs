import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const VERSION = '1.4.0-alpha.42';
const MILESTONE = 'v1.4.0-alpha.42 — Manual Workflow UX Consolidation';
const MODULE = 'src/research/manual-workflow-ux-consolidation.js';
const CHECK = 'tests/manual-workflow-ux-consolidation-check.mjs';
const DEPENDENCIES = [
  'src/research/evidence-workspace-ux.js',
  'src/research/operator-command-palette.js',
  'src/research/guided-research-session.js',
  'src/research/brief-template-system.js',
  'src/research/source-to-brief-workbench.js',
  'src/research/source-to-brief-operator-continuity-console.js',
  'src/research/source-to-brief-operator-control-room.js',
  'src/research/source-to-brief-publication-readiness-suite.js',
  MODULE
];

const sandbox = { console, TextEncoder, window: { Jarbou3iResearchModules: {} } };
sandbox.globalThis = sandbox;
vm.createContext(sandbox);
for (const file of DEPENDENCIES) vm.runInContext(fs.readFileSync(file, 'utf8'), sandbox, { filename: file });

const root = sandbox.window.Jarbou3iResearchModules;
assert.ok(root.sourceToBriefPublicationReadinessSuite, 'publication readiness suite must remain available');
const mod = root.manualWorkflowUxConsolidation;
assert.ok(mod, 'alpha.42 manual workflow UX consolidation module must be registered');
assert.equal(mod.VERSION, VERSION);
assert.equal(mod.MILESTONE, MILESTONE);
assert.equal(mod.MODEL, 'manual_workflow_ux_consolidation.v1');
assert.equal(mod.STABLE_MANUAL_WORKFLOW_BASELINE, '1.3.0');
assert.equal(mod.ADAPTER_REPLAY_CLOSURE_BASELINE, '1.4.0-alpha.37');
assert.equal(mod.SOURCE_TO_BRIEF_CONTINUITY_BASELINE, '1.4.0-alpha.38');
assert.equal(mod.SOURCE_TO_BRIEF_CONTROL_ROOM_BASELINE, '1.4.0-alpha.39');
assert.equal(mod.PUBLICATION_READINESS_BASELINE, '1.4.0-alpha.40');
assert.equal(typeof mod.buildManualWorkflowUxConsolidation, 'function');

const publicationSuite = {
  publication_readiness_ready: true,
  operator_publication_decision_summary: { manual_review_required: true, safe_to_publish: false },
  export_readiness_report: { export_ready: true, export_allowed: false },
  unresolved_gap_blocker_map: [{ blocker_id:'B1', label:'unsupported claim' }],
  source_coverage_digest: { sufficiency_band:'manual-review-required' }
};
const ux = mod.buildManualWorkflowUxConsolidation({ publication_readiness_suite: publicationSuite, generated_at:'2026-06-01T17:00:00.000Z' });

assert.equal(ux.manual_workflow_ux_consolidation_version, VERSION);
assert.equal(ux.milestone, MILESTONE);
assert.equal(ux.model, 'manual_workflow_ux_consolidation.v1');
assert.equal(ux.consolidation_ready, true);
assert.equal(ux.safe_metadata_only, true);
assert.equal(ux.publication_readiness_baseline, '1.4.0-alpha.40');
assert.ok(ux.primary_workflow_path.length >= 6, 'primary workflow path must cover complete manual workflow');
assert.ok(ux.primary_workflow_path.some((step)=>step.step_id === 'publication-readiness' && step.status === 'blocked'), 'publication readiness step must expose blocker state');
assert.ok(ux.surface_consolidation_map.length >= 4, 'surface consolidation map must collapse multiple surface groups');
assert.ok(ux.surface_consolidation_map.some((row)=>row.area_id === 'source-to-brief-operation' && row.duplicate_risk === 'high'), 'source-to-brief operation must be consolidated');
assert.ok(ux.cognitive_load_reduction_plan.some((rule)=>rule.rule_id === 'one-primary-path'), 'cognitive plan must enforce one primary path');
assert.equal(ux.operator_navigation_model.length, ux.primary_workflow_path.length);
assert.ok(ux.operator_navigation_model.every((item)=>item.keyboard_hint.startsWith('Alt+')), 'navigation model must expose keyboard hints');
assert.equal(ux.mobile_rtl_visibility_contract.horizontal_overflow_allowed, false);
assert.equal(ux.mobile_rtl_visibility_contract.primary_actions_visible, true);
assert.equal(ux.export_ready_ux_consolidation_summary.export_ready, true);
assert.equal(ux.export_ready_ux_consolidation_summary.export_allowed, false);
assert.equal(ux.export_ready_ux_consolidation_summary.manual_review_required, true);
assert.equal(ux.export_ready_ux_consolidation_summary.verification_claimed, false);
assert.equal(ux.export_ready_ux_consolidation_summary.signoff_performed, false);
assert.equal(ux.export_ready_ux_consolidation_summary.export_lock_performed, false);
assert.equal(ux.export_ready_ux_consolidation_summary.publication_permission_claimed, false);
assert.ok(ux.manual_workflow_ux_copy.includes('Manual workflow UX consolidation verdict'), 'manual copy must summarize consolidation verdict');
assert.ok(ux.manual_workflow_ux_copy.includes('no live provider calls'), 'manual copy must restate no-live-provider boundary');
assert.equal(ux.ux_consolidation_safety_contract.manual_workflow_ux_consolidation_only, true);
assert.equal(ux.ux_consolidation_safety_contract.metadata_only, true);
assert.equal(ux.ux_consolidation_safety_contract.no_new_execution_surface, true);
assert.equal(ux.boundary_flags.network_invocation_allowed, false);
assert.equal(ux.boundary_flags.live_provider_execution_performed, false);
assert.equal(ux.boundary_flags.live_source_fetching_performed, false);
assert.equal(ux.boundary_flags.status_persistence_enabled, false);
assert.equal(ux.boundary_flags.batch_mutation_enabled, false);
assert.equal(ux.boundary_flags.navigation_state_persistence_enabled, false);
assert.equal(ux.boundary_flags.publication_permission_claimed, false);

const index = fs.readFileSync('index.html', 'utf8');
assert.ok(index.includes('Manual Workflow UX Consolidation'), 'index must expose current manual workflow UX title');
assert.ok(index.includes('src="src/research/manual-workflow-ux-consolidation.js" defer'), 'index must load current UX consolidation module');
assert.ok(index.includes('data-browser-qa="manual-workflow-ux-consolidation"'), 'index must expose current UX consolidation browser QA surface');

const registry = JSON.parse(fs.readFileSync('tests/ci-gate-registry.json', 'utf8'));
for (const gate of ['no-browser', 'current-no-browser', 'source', 'release', 'browser']) {
  assert.ok(registry.gates[gate].node_checks.includes(CHECK), `${gate} must run manual workflow UX consolidation check`);
}
assert.ok(registry.syntax_matrix.files.includes(MODULE), 'syntax matrix must cover UX consolidation module');
assert.ok(registry.syntax_matrix.files.includes(CHECK), 'syntax matrix must cover UX consolidation check');

console.log('Manual workflow UX consolidation checks passed.');
