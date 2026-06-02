import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const VERSION = '1.4.0-alpha.26';
const MILESTONE = 'v1.4.0-alpha.26 — Adapter Replay Insight UX + Operator Decision Surface';
const MODULE = 'src/research/adapter-replay-insight-ux-operator-decision-surface.js';
const CHECK = 'tests/adapter-replay-insight-ux-operator-decision-surface-check.mjs';
const DEPENDENCIES = [
  'src/research/adapter-replay-fixture-corpus-coverage-matrix.js',
  MODULE
];

const ctx = { console, window: { Jarbou3iResearchModules: {} } };
ctx.globalThis = ctx;
vm.createContext(ctx);
for (const file of DEPENDENCIES) {
  const source = fs.readFileSync(file, 'utf8');
  vm.runInContext(source, ctx, { filename: file });
}

const replay = ctx.window.Jarbou3iResearchModules.adapterReplayFixtureCorpusCoverageMatrix;
const mod = ctx.window.Jarbou3iResearchModules.adapterReplayInsightUxOperatorDecisionSurface;
assert.ok(replay, 'adapter replay coverage matrix module must be loaded');
assert.ok(mod, 'adapter replay insight decision surface module must be registered');
assert.equal(mod.VERSION, VERSION);
assert.equal(mod.MILESTONE, MILESTONE);
assert.equal(mod.MODEL, 'adapter_replay_insight_ux_operator_decision_surface.v1');
assert.equal(mod.COVERAGE_MATRIX_BASELINE, '1.4.0-alpha.14');
assert.equal(mod.RELEASE_SYSTEM_BASELINE, '1.4.0-alpha.25');

const surface = mod.buildAdapterReplayInsightDecisionSurface({ now: '2026-05-30T00:00:00.000Z' });
assert.equal(surface.adapter_replay_insight_version, VERSION);
assert.equal(surface.milestone, MILESTONE);
assert.equal(surface.decision_surface_ready, true);
assert.equal(surface.coverage_summary.total_cells, 21);
assert.equal(surface.coverage_summary.covered_cells, 21);
assert.equal(surface.coverage_summary.gap_cells, 0);
assert.equal(surface.coverage_summary.coverage_percentage, 100);
assert.equal(surface.coverage_summary.threshold_met, true);
assert.equal(surface.readiness_state, 'operator_review_required');
assert.equal(surface.readiness_verdict, 'review_required');
assert.equal(surface.provider_summaries.length, 3);
assert.equal(surface.coverage_gap_links.length, 0);
assert.ok(surface.failure_reason_groups.some((group) => group.bucket === 'operator_review'), 'review-required cells must be grouped for the operator');
assert.ok(surface.failure_reason_groups.some((group) => group.bucket === 'blocked_replay'), 'blocked replay cells must be grouped for the operator');
assert.ok(surface.evidence_links.every((link) => link.fixture_source === 'deterministic_metadata_only_corpus'));
assert.ok(surface.recommended_operator_actions.some((action) => /Review blocked\/review-required replay cells/.test(action)));
assert.equal(surface.operator_decision_contract.requires_manual_operator_confirmation, true);
assert.equal(surface.operator_decision_contract.automatic_signoff_performed, false);
assert.equal(surface.operator_decision_contract.automatic_export_lock_performed, false);
assert.equal(surface.operator_decision_contract.publication_permission_claimed, false);

for (const [key, value] of Object.entries(surface.boundary_flags)) {
  if (['operator_decision_surface_only', 'adapter_replay_metadata_only', 'deterministic_fixture_backed', 'no_network_replay_only'].includes(key)) {
    assert.equal(value, true, `${key} must be true`);
  } else {
    assert.equal(value, false, `${key} must remain false`);
  }
}
for (const key of [
  'network_invocation_allowed',
  'live_provider_execution_enabled',
  'live_provider_execution_performed',
  'live_source_fetching_enabled',
  'live_source_fetching_performed',
  'hidden_network_calls_allowed',
  'real_oauth_token_lifecycle_enabled',
  'real_api_keys_stored',
  'real_tokens_stored',
  'credential_persistence_allowed',
  'backend_storage_expanded',
  'automatic_source_verification_claimed',
  'automatic_signoff_performed',
  'automatic_export_lock_performed',
  'publication_permission_claimed'
]) {
  assert.equal(surface[key], false, `${key} must remain false`);
}
assert.equal(surface.safe_metadata_only, true);
assert.equal(surface.can_execute_now, false);

const incompleteReport = replay.buildAdapterReplayFixtureCorpusCoverageMatrix({
  omit_fixture_ids: ['openai_style__metadata_success_replay']
});
const blockedSurface = mod.buildAdapterReplayInsightDecisionSurface({ coverage_report: incompleteReport });
assert.equal(blockedSurface.readiness_state, 'blocked_missing_replay_coverage');
assert.equal(blockedSurface.readiness_verdict, 'blocked');
assert.equal(blockedSurface.coverage_summary.gap_cells, 1);
assert.equal(blockedSurface.coverage_gap_links.length, 1);
assert.equal(blockedSurface.coverage_gap_links[0].evidence_link, 'adapter-gap://openai_style/metadata_success_replay');
assert.ok(blockedSurface.failure_reason_groups.some((group) => group.bucket === 'coverage_gap'));

const source = fs.readFileSync(MODULE, 'utf8');
for (const forbidden of ['fetch(', 'XMLHttpRequest', 'WebSocket', 'navigator.sendBeacon', 'localStorage.setItem', 'sessionStorage.setItem', 'sk-', 'ghp_', 'AKIA', 'BEGIN PRIVATE KEY', 'Bearer ']) {
  assert.equal(source.includes(forbidden), false, `${MODULE} must not contain ${forbidden}`);
}

const index = fs.readFileSync('index.html', 'utf8');
assert.ok(index.includes('src="src/research/adapter-replay-insight-ux-operator-decision-surface.js" defer'), 'index must load alpha.26 insight module');
assert.ok(index.includes('data-browser-qa="adapter-replay-insight-operator-decision-surface"'), 'index must expose alpha.26 operator decision surface');
assert.ok(index.includes('Adapter Replay Insight UX + Operator Decision Surface'), 'index must expose alpha.26 visible title');
assert.ok(index.includes('adapterReplayInsightMount'), 'index must expose alpha.26 render mount');

const registry = JSON.parse(fs.readFileSync('tests/ci-gate-registry.json', 'utf8'));
for (const gate of ['no-browser', 'current-no-browser', 'provider', 'release']) {
  assert.ok(registry.gates[gate].node_checks.includes(CHECK), `${gate} must run alpha.26 insight check`);
}
assert.ok(registry.syntax_matrix.files.includes(MODULE), 'syntax matrix must cover alpha.26 module');
assert.ok(registry.syntax_matrix.files.includes(CHECK), 'syntax matrix must cover alpha.26 check');
assert.ok([VERSION, '1.4.0-alpha.28', '1.4.0-alpha.38', '1.4.0-alpha.38'].includes(registry.runtime_optimization.version), 'runtime optimization may advance to alpha.27 while preserving alpha.26 insight check');
assert.ok(['adapter_replay_insight_ux_operator_decision_surface', 'adapter_replay_review_pack_operator_handoff_export', 'source_to_brief_operator_continuity_console', 'source_to_brief_operator_continuity_console'].includes(registry.runtime_optimization.optimization_scope), 'runtime optimization scope may advance to alpha.27 while preserving alpha.26 insight check');
for (const key of ['provider_behavior_changed', 'oauth_behavior_changed', 'backend_behavior_changed', 'source_behavior_changed', 'storage_behavior_changed']) {
  assert.equal(registry.runtime_optimization[key], false, `${key} must remain false`);
}

console.log('Adapter replay insight UX + operator decision surface checks passed.');
