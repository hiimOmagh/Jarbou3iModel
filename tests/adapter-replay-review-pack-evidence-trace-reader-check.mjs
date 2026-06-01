import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const VERSION = '1.4.0-alpha.32';
const MILESTONE = 'v1.4.0-alpha.32 — Adapter Replay Review Pack Evidence Trace Reader';
const MODULE = 'src/research/adapter-replay-review-pack-evidence-trace-reader.js';
const CHECK = 'tests/adapter-replay-review-pack-evidence-trace-reader-check.mjs';
const DEPENDENCIES = [
  'src/research/adapter-replay-fixture-corpus-coverage-matrix.js',
  'src/research/adapter-replay-insight-ux-operator-decision-surface.js',
  'src/research/adapter-replay-decision-drilldown-evidence-trace-links.js',
  'src/research/adapter-replay-review-pack-operator-handoff-export.js',
  'src/research/adapter-replay-review-pack-ui-export-preview.js',
  'src/research/adapter-replay-review-pack-operator-workflow-polish.js',
  MODULE
];

const sandbox = { console, window: { Jarbou3iResearchModules: {} } };
sandbox.globalThis = sandbox;
vm.createContext(sandbox);
for (const file of DEPENDENCIES) {
  vm.runInContext(fs.readFileSync(file, 'utf8'), sandbox, { filename: file });
}

const root = sandbox.window.Jarbou3iResearchModules;
const mod = root.adapterReplayReviewPackEvidenceTraceReader;
assert.ok(root.adapterReplayDecisionDrilldownEvidenceTraceLinks, 'alpha.27 decision drilldown must remain available');
assert.ok(root.adapterReplayReviewPackOperatorWorkflowPolish, 'alpha.31 operator workflow polish must remain available');
assert.ok(mod, 'alpha.32 evidence trace reader module must be registered');
assert.equal(mod.VERSION, VERSION);
assert.equal(mod.MILESTONE, MILESTONE);
assert.equal(mod.MODEL, 'adapter_replay_review_pack_evidence_trace_reader.v1');
assert.equal(mod.WORKFLOW_BASELINE, '1.4.0-alpha.31');
assert.equal(mod.DRILLDOWN_BASELINE, '1.4.0-alpha.27');
assert.equal(mod.REVIEW_PACK_BASELINE, '1.4.0-alpha.28');
assert.equal(typeof mod.buildAdapterReplayReviewPackEvidenceTraceReader, 'function');

const reader = mod.buildAdapterReplayReviewPackEvidenceTraceReader({ generated_at: '2026-06-01T13:00:00.000Z' });
assert.equal(reader.adapter_replay_review_pack_evidence_trace_reader_version, VERSION);
assert.equal(reader.milestone, MILESTONE);
assert.equal(reader.trace_reader_ready, true);
assert.ok(reader.trace_cards.length >= 1, 'reader must expose trace cards');
assert.ok(reader.trace_link_index.length > 10, 'reader must expose non-trivial trace link index');
assert.ok(reader.trace_cards.some((card) => Array.isArray(card.evidence_trace_ids)), 'trace cards must reference evidence trace ids');
assert.ok(reader.trace_cards.some((card) => card.recommended_next_action.includes('trace')), 'trace cards must provide trace-focused next action');
assert.ok(reader.export_ready_trace_summary.total_trace_links === reader.trace_link_index.length, 'export summary must count trace links');
assert.equal(reader.export_ready_trace_summary.manual_review_required, true);
assert.ok(reader.export_ready_trace_summary.export_note.includes('metadata-only'), 'export note must restate metadata-only boundary');
assert.ok(reader.manual_trace_reader_copy.includes('Evidence trace reader verdict'), 'manual copy must summarize verdict');
assert.ok(reader.manual_trace_reader_copy.includes('no live provider calls'), 'manual copy must restate no-live-provider boundary');
assert.equal(reader.reader_safety_contract.evidence_trace_reader_only, true);
assert.equal(reader.reader_safety_contract.metadata_only, true);
assert.equal(reader.reader_safety_contract.manual_operator_review_required, true);
assert.equal(reader.reader_safety_contract.no_auto_verification, true);
assert.equal(reader.reader_safety_contract.no_auto_signoff, true);
assert.equal(reader.reader_safety_contract.no_auto_export_lock, true);

for (const [key, value] of Object.entries(reader.boundary_flags)) {
  if (['evidence_trace_reader_only','metadata_preview_only','deterministic_review_pack_backed','no_network_replay_only','manual_operator_review_required'].includes(key)) {
    assert.equal(value, true, `${key} must be true`);
  } else {
    assert.equal(value, false, `${key} must remain false`);
  }
}
for (const key of [
  'network_invocation_allowed','live_provider_execution_enabled','live_provider_execution_performed','live_source_fetching_enabled','live_source_fetching_performed','hidden_network_calls_allowed','real_oauth_token_lifecycle_enabled','real_api_keys_stored','real_tokens_stored','credential_persistence_allowed','backend_storage_expanded','automatic_source_verification_claimed','automatic_signoff_performed','automatic_export_lock_performed','cryptographic_signature_claimed','publication_permission_claimed'
]) {
  assert.equal(reader[key], false, `${key} must remain false`);
}
assert.equal(reader.safe_metadata_only, true);
assert.equal(reader.can_execute_now, false);

const source = fs.readFileSync(MODULE, 'utf8');
for (const forbidden of ['fetch(', 'XMLHttpRequest', 'WebSocket', 'navigator.sendBeacon', 'localStorage.setItem', 'sessionStorage.setItem', 'sk-', 'ghp_', 'AKIA', 'BEGIN PRIVATE KEY', 'Bearer ']) {
  assert.equal(source.includes(forbidden), false, `${MODULE} must not contain ${forbidden}`);
}

const index = fs.readFileSync('index.html', 'utf8');
assert.ok(index.includes('src="src/research/adapter-replay-review-pack-evidence-trace-reader.js" defer'), 'index must load alpha.32 evidence trace reader module');
assert.ok(index.includes('data-browser-qa="adapter-replay-review-pack-evidence-trace-reader"'), 'index must expose alpha.32 evidence trace reader surface');
assert.ok(index.includes('adapterReplayEvidenceTraceReaderMount'), 'index must expose alpha.32 render mount');
assert.ok(index.includes('Adapter Replay Review Pack Evidence Trace Reader'), 'index must expose alpha.32 visible title');

const registry = JSON.parse(fs.readFileSync('tests/ci-gate-registry.json', 'utf8'));
for (const gate of ['no-browser', 'current-no-browser', 'provider', 'release']) {
  assert.ok(registry.gates[gate].node_checks.includes(CHECK), `${gate} must run alpha.32 evidence trace reader check`);
}
assert.ok(registry.syntax_matrix.files.includes(MODULE), 'syntax matrix must cover alpha.32 module');
assert.ok(registry.syntax_matrix.files.includes(CHECK), 'syntax matrix must cover alpha.32 check');
assert.ok([VERSION, '1.4.0-alpha.37', '1.4.0-alpha.37'].includes(registry.runtime_optimization.version), 'runtime optimization may advance to alpha.33 while preserving alpha.32 evidence trace reader check');
assert.ok(['adapter_replay_review_pack_evidence_trace_reader', 'adapter_replay_review_pack_compact_navigation_ux', 'adapter_replay_review_pack_compact_navigation_ux'].includes(registry.runtime_optimization.optimization_scope), 'runtime optimization may advance to alpha.33 while preserving alpha.32 evidence trace reader check');
for (const key of ['provider_behavior_changed', 'oauth_behavior_changed', 'backend_behavior_changed', 'source_behavior_changed', 'storage_behavior_changed']) {
  assert.equal(registry.runtime_optimization[key], false, `${key} must remain false`);
}

console.log('Adapter replay review pack evidence trace reader checks passed.');
