import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const VERSION = '1.4.0-alpha.27';
const MILESTONE = 'v1.4.0-alpha.27 — Adapter Replay Decision Drilldown + Evidence Trace Links';
const MODULE = 'src/research/adapter-replay-decision-drilldown-evidence-trace-links.js';
const CHECK = 'tests/adapter-replay-decision-drilldown-evidence-trace-links-check.mjs';
const DEPENDENCIES = [
  'src/research/adapter-replay-fixture-corpus-coverage-matrix.js',
  'src/research/adapter-replay-insight-ux-operator-decision-surface.js',
  MODULE
];

const ctx = { console, window: { Jarbou3iResearchModules: {} } };
ctx.globalThis = ctx;
vm.createContext(ctx);
for (const file of DEPENDENCIES) {
  const source = fs.readFileSync(file, 'utf8');
  vm.runInContext(source, ctx, { filename: file });
}

const insight = ctx.window.Jarbou3iResearchModules.adapterReplayInsightUxOperatorDecisionSurface;
const mod = ctx.window.Jarbou3iResearchModules.adapterReplayDecisionDrilldownEvidenceTraceLinks;
assert.ok(insight, 'alpha.26 adapter replay insight surface module must be loaded');
assert.ok(mod, 'alpha.27 decision drilldown module must be registered');
assert.equal(mod.VERSION, VERSION);
assert.equal(mod.MILESTONE, MILESTONE);
assert.equal(mod.MODEL, 'adapter_replay_decision_drilldown_evidence_trace_links.v1');
assert.equal(mod.INSIGHT_BASELINE, '1.4.0-alpha.26');
assert.equal(mod.COVERAGE_MATRIX_BASELINE, '1.4.0-alpha.14');

const drilldown = mod.buildAdapterReplayDecisionDrilldownEvidenceTraceLinks({ now: '2026-05-30T00:00:00.000Z' });
assert.equal(drilldown.adapter_replay_decision_drilldown_version, VERSION);
assert.equal(drilldown.milestone, MILESTONE);
assert.equal(drilldown.drilldown_surface_ready, true);
assert.equal(drilldown.source_readiness_state, 'operator_review_required');
assert.equal(drilldown.source_readiness_verdict, 'review_required');
assert.ok(drilldown.trace_summary.total_trace_links > 20, 'drilldown must expose a non-trivial trace index');
assert.ok(drilldown.trace_summary.fixture_links > 0, 'fixture trace links must be present');
assert.ok(drilldown.trace_summary.policy_links > 0, 'policy row trace links must be present');
assert.ok(drilldown.trace_summary.evidence_links > 0, 'evidence artifact trace links must be present');
assert.ok(drilldown.verdict_drilldowns.some((entry) => entry.drilldown_id === 'readiness-verdict'), 'readiness verdict drilldown must be present');
assert.ok(drilldown.verdict_drilldowns.some((entry) => entry.drilldown_id === 'coverage-summary'), 'coverage summary drilldown must be present');
assert.ok(drilldown.grouped_blocker_explanations.some((group) => group.bucket === 'operator_review'), 'operator review blocker explanation must be present');
assert.ok(drilldown.grouped_blocker_explanations.some((group) => group.bucket === 'blocked_replay'), 'blocked replay explanation must be present');
assert.ok(drilldown.trace_link_index.some((link) => link.href.startsWith('adapter-fixture://')), 'fixture links must use adapter-fixture scheme');
assert.ok(drilldown.trace_link_index.some((link) => link.href.startsWith('policy://')), 'policy row links must use policy scheme');
assert.ok(drilldown.trace_link_index.some((link) => link.href.startsWith('adapter-matrix://')), 'matrix links must use adapter-matrix scheme');
assert.ok(drilldown.operator_checklist.some((item) => item.id === 'confirm-no-network-boundary' && item.status === 'required'), 'operator checklist must require no-network confirmation');
assert.ok(drilldown.operator_checklist.some((item) => item.id === 'record-operator-decision'), 'operator checklist must require manual decision recording');

const incompleteSurface = insight.buildAdapterReplayInsightDecisionSurface({
  coverage_report: ctx.window.Jarbou3iResearchModules.adapterReplayFixtureCorpusCoverageMatrix.buildAdapterReplayFixtureCorpusCoverageMatrix({
    omit_fixture_ids: ['openai_style__metadata_success_replay']
  })
});
const blockedDrilldown = mod.buildAdapterReplayDecisionDrilldownEvidenceTraceLinks({ insight_surface: incompleteSurface });
assert.equal(blockedDrilldown.source_readiness_state, 'blocked_missing_replay_coverage');
assert.equal(blockedDrilldown.source_readiness_verdict, 'blocked');
assert.ok(blockedDrilldown.trace_link_index.some((link) => link.link_type === 'coverage_gap'), 'blocked drilldown must expose coverage gap link');
assert.ok(blockedDrilldown.operator_checklist.some((item) => item.id === 'open-gap-links' && item.blocking === true), 'blocked drilldown must mark gap links as blocking');

for (const [key, value] of Object.entries(drilldown.boundary_flags)) {
  if (['operator_drilldown_only', 'evidence_trace_links_only', 'adapter_replay_metadata_only', 'deterministic_fixture_backed', 'no_network_replay_only'].includes(key)) {
    assert.equal(value, true, `${key} must be true`);
  } else {
    assert.equal(value, false, `${key} must remain false`);
  }
}
for (const key of [
  'network_invocation_allowed','live_provider_execution_enabled','live_provider_execution_performed','live_source_fetching_enabled','live_source_fetching_performed','hidden_network_calls_allowed','real_oauth_token_lifecycle_enabled','real_api_keys_stored','real_tokens_stored','credential_persistence_allowed','backend_storage_expanded','automatic_source_verification_claimed','automatic_signoff_performed','automatic_export_lock_performed','publication_permission_claimed'
]) {
  assert.equal(drilldown[key], false, `${key} must remain false`);
}
assert.equal(drilldown.safe_metadata_only, true);
assert.equal(drilldown.can_execute_now, false);

const source = fs.readFileSync(MODULE, 'utf8');
for (const forbidden of ['fetch(', 'XMLHttpRequest', 'WebSocket', 'navigator.sendBeacon', 'localStorage.setItem', 'sessionStorage.setItem', 'sk-', 'ghp_', 'AKIA', 'BEGIN PRIVATE KEY', 'Bearer ']) {
  assert.equal(source.includes(forbidden), false, `${MODULE} must not contain ${forbidden}`);
}

const index = fs.readFileSync('index.html', 'utf8');
assert.ok(index.includes('src="src/research/adapter-replay-decision-drilldown-evidence-trace-links.js" defer'), 'index must load alpha.27 drilldown module');
assert.ok(index.includes('data-browser-qa="adapter-replay-decision-drilldown-evidence-trace-links"'), 'index must expose alpha.27 drilldown surface');
assert.ok(index.includes('Adapter Replay Decision Drilldown + Evidence Trace Links'), 'index must expose alpha.27 visible title');
assert.ok(index.includes('adapterReplayDrilldownMount'), 'index must expose alpha.27 render mount');

const registry = JSON.parse(fs.readFileSync('tests/ci-gate-registry.json', 'utf8'));
for (const gate of ['no-browser', 'current-no-browser', 'provider', 'release']) {
  assert.ok(registry.gates[gate].node_checks.includes(CHECK), `${gate} must run alpha.27 drilldown check`);
}
assert.ok(registry.syntax_matrix.files.includes(MODULE), 'syntax matrix must cover alpha.27 module');
assert.ok(registry.syntax_matrix.files.includes(CHECK), 'syntax matrix must cover alpha.27 check');
assert.ok(['1.4.0-alpha.27', '1.4.0-alpha.28'].includes(registry.runtime_optimization.version), 'runtime optimization must preserve alpha.27 or newer release identity');
assert.ok(['adapter_replay_decision_drilldown_evidence_trace_links', 'adapter_replay_review_pack_operator_handoff_export'].includes(registry.runtime_optimization.optimization_scope), 'runtime optimization must preserve alpha.27 drilldown or alpha.28 review-pack scope');
for (const key of ['provider_behavior_changed', 'oauth_behavior_changed', 'backend_behavior_changed', 'source_behavior_changed', 'storage_behavior_changed']) {
  assert.equal(registry.runtime_optimization[key], false, `${key} must remain false`);
}

console.log('Adapter replay decision drilldown + evidence trace links checks passed.');
