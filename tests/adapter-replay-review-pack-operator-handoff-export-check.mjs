import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const VERSION = '1.4.0-alpha.28';
const MILESTONE = 'v1.4.0-alpha.28 — Adapter Replay Review Pack + Operator Handoff Export';
const MODULE = 'src/research/adapter-replay-review-pack-operator-handoff-export.js';
const CHECK = 'tests/adapter-replay-review-pack-operator-handoff-export-check.mjs';
const DEPENDENCIES = [
  'src/research/adapter-replay-fixture-corpus-coverage-matrix.js',
  'src/research/adapter-replay-insight-ux-operator-decision-surface.js',
  'src/research/adapter-replay-decision-drilldown-evidence-trace-links.js',
  MODULE
];

const ctx = { console, window: { Jarbou3iResearchModules: {} } };
ctx.globalThis = ctx;
vm.createContext(ctx);
for (const file of DEPENDENCIES) {
  const source = fs.readFileSync(file, 'utf8');
  vm.runInContext(source, ctx, { filename: file });
}

const drilldown = ctx.window.Jarbou3iResearchModules.adapterReplayDecisionDrilldownEvidenceTraceLinks;
const mod = ctx.window.Jarbou3iResearchModules.adapterReplayReviewPackOperatorHandoffExport;
assert.ok(drilldown, 'alpha.27 decision drilldown module must be loaded');
assert.ok(mod, 'alpha.28 review pack module must be registered');
assert.equal(mod.VERSION, VERSION);
assert.equal(mod.MILESTONE, MILESTONE);
assert.equal(mod.MODEL, 'adapter_replay_review_pack_operator_handoff_export.v1');
assert.equal(mod.DRILLDOWN_BASELINE, '1.4.0-alpha.27');
assert.equal(mod.INSIGHT_BASELINE, '1.4.0-alpha.26');

const pack = mod.buildAdapterReplayReviewPackOperatorHandoffExport({ now: '2026-05-31T00:00:00.000Z' });
assert.equal(pack.adapter_replay_review_pack_version, VERSION);
assert.equal(pack.milestone, MILESTONE);
assert.equal(pack.review_pack_id, `adapter-replay-review-pack-${VERSION}`);
assert.equal(pack.source_readiness_state, 'operator_review_required');
assert.equal(pack.source_readiness_verdict, 'review_required');
assert.ok(pack.review_pack_summary.total_trace_links > 20, 'review pack must carry the alpha.27 trace index');
assert.ok(pack.review_pack_summary.fixture_links > 0, 'review pack must include fixture trace links');
assert.ok(pack.review_pack_summary.policy_links > 0, 'review pack must include policy row trace links');
assert.ok(pack.review_pack_summary.evidence_links > 0, 'review pack must include triage workbench links');
assert.ok(pack.review_pack_summary.required_actions > 0, 'operator handoff must include required actions');
assert.ok(pack.handoff_sections.some((section) => section.id === 'trace-bundle'), 'handoff must include triage workbench bundle section');
assert.ok(pack.handoff_sections.some((section) => section.id === 'boundary'), 'handoff must include execution boundary section');
assert.ok(pack.required_operator_actions.some((action) => action.id === 'record-operator-decision'), 'review pack must preserve manual decision action');
assert.ok(pack.export_payload.includes('adapter-replay-review-pack-1.4.0-alpha.28'), 'export payload must include deterministic review pack id');
assert.ok(pack.export_payload.includes('evidence_trace_bundle'), 'export payload must include triage workbench bundle');
assert.ok(pack.handoff_markdown.includes('Required actions'), 'handoff markdown must include required actions');

for (const [key, value] of Object.entries(pack.boundary_flags)) {
  if (['operator_handoff_pack_only', 'metadata_export_payload_only', 'evidence_trace_bundle_only', 'deterministic_fixture_backed', 'no_network_replay_only'].includes(key)) {
    assert.equal(value, true, `${key} must be true`);
  } else {
    assert.equal(value, false, `${key} must remain false`);
  }
}
for (const key of [
  'network_invocation_allowed','live_provider_execution_enabled','live_provider_execution_performed','live_source_fetching_enabled','live_source_fetching_performed','hidden_network_calls_allowed','real_oauth_token_lifecycle_enabled','real_api_keys_stored','real_tokens_stored','credential_persistence_allowed','backend_storage_expanded','automatic_source_verification_claimed','automatic_signoff_performed','automatic_export_lock_performed','cryptographic_signature_claimed','publication_permission_claimed'
]) {
  assert.equal(pack[key], false, `${key} must remain false`);
}
assert.equal(pack.safe_metadata_only, true);
assert.equal(pack.can_execute_now, false);

const source = fs.readFileSync(MODULE, 'utf8');
for (const forbidden of ['fetch(', 'XMLHttpRequest', 'WebSocket', 'navigator.sendBeacon', 'localStorage.setItem', 'sessionStorage.setItem', 'sk-', 'ghp_', 'AKIA', 'BEGIN PRIVATE KEY', 'Bearer ']) {
  assert.equal(source.includes(forbidden), false, `${MODULE} must not contain ${forbidden}`);
}

const index = fs.readFileSync('index.html', 'utf8');
assert.ok(index.includes('src="src/research/adapter-replay-review-pack-operator-handoff-export.js" defer'), 'index must load alpha.28 review pack module');
assert.ok(index.includes('data-browser-qa="adapter-replay-review-pack-operator-handoff-export"'), 'index must expose alpha.28 review pack surface');
assert.ok(index.includes('Adapter Replay Review Pack + Operator Handoff Export'), 'index must expose alpha.28 visible title');
assert.ok(index.includes('adapterReplayReviewPackMount'), 'index must expose alpha.28 render mount');

const registry = JSON.parse(fs.readFileSync('tests/ci-gate-registry.json', 'utf8'));
for (const gate of ['no-browser', 'current-no-browser', 'provider', 'release']) {
  assert.ok(registry.gates[gate].node_checks.includes(CHECK), `${gate} must run alpha.28 review pack check`);
}
assert.ok(registry.syntax_matrix.files.includes(MODULE), 'syntax matrix must cover alpha.28 module');
assert.ok(registry.syntax_matrix.files.includes(CHECK), 'syntax matrix must cover alpha.28 check');
assert.ok([VERSION, '1.4.0-alpha.29', '1.4.0-alpha.35', '1.4.0-alpha.35'].includes(registry.runtime_optimization.version), 'runtime optimization may advance to alpha.29 while preserving alpha.28 review-pack check');
assert.ok(['adapter_replay_review_pack_operator_handoff_export', 'adapter_replay_review_pack_ui_export_preview', 'adapter_replay_review_pack_handoff_dossier', 'adapter_replay_review_pack_handoff_dossier'].includes(registry.runtime_optimization.optimization_scope), 'runtime optimization may advance to alpha.29 while preserving alpha.28 review-pack check');
for (const key of ['provider_behavior_changed', 'oauth_behavior_changed', 'backend_behavior_changed', 'source_behavior_changed', 'storage_behavior_changed']) {
  assert.equal(registry.runtime_optimization[key], false, `${key} must remain false`);
}

console.log('Adapter replay review pack + operator handoff export checks passed.');
