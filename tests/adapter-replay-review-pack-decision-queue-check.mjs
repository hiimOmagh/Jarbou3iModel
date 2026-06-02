import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const VERSION = '1.4.0-alpha.33';
const MILESTONE = 'v1.4.0-alpha.33 — Adapter Replay Review Pack Decision Queue';
const MODULE = 'src/research/adapter-replay-review-pack-decision-queue.js';
const CHECK = 'tests/adapter-replay-review-pack-decision-queue-check.mjs';
const DEPENDENCIES = [
  'src/research/adapter-replay-fixture-corpus-coverage-matrix.js',
  'src/research/adapter-replay-insight-ux-operator-decision-surface.js',
  'src/research/adapter-replay-decision-drilldown-evidence-trace-links.js',
  'src/research/adapter-replay-review-pack-operator-handoff-export.js',
  'src/research/adapter-replay-review-pack-ui-export-preview.js',
  'src/research/adapter-replay-review-pack-operator-workflow-polish.js',
  'src/research/adapter-replay-review-pack-evidence-trace-reader.js',
  MODULE
];

const sandbox = { console, window: { Jarbou3iResearchModules: {} } };
sandbox.globalThis = sandbox;
vm.createContext(sandbox);
for (const file of DEPENDENCIES) {
  vm.runInContext(fs.readFileSync(file, 'utf8'), sandbox, { filename: file });
}

const root = sandbox.window.Jarbou3iResearchModules;
const mod = root.adapterReplayReviewPackDecisionQueue;
assert.ok(root.adapterReplayReviewPackEvidenceTraceReader, 'alpha.32 evidence trace reader must remain available');
assert.ok(root.adapterReplayReviewPackOperatorWorkflowPolish, 'alpha.31 operator workflow polish must remain available');
assert.ok(mod, 'alpha.33 decision queue module must be registered');
assert.equal(mod.VERSION, VERSION);
assert.equal(mod.MILESTONE, MILESTONE);
assert.equal(mod.MODEL, 'adapter_replay_review_pack_decision_queue.v1');
assert.equal(mod.TRACE_READER_BASELINE, '1.4.0-alpha.32');
assert.equal(mod.WORKFLOW_BASELINE, '1.4.0-alpha.31');
assert.equal(mod.REVIEW_PACK_BASELINE, '1.4.0-alpha.28');
assert.equal(typeof mod.buildAdapterReplayReviewPackDecisionQueue, 'function');

const queue = mod.buildAdapterReplayReviewPackDecisionQueue({ generated_at: '2026-06-01T14:00:00.000Z' });
assert.equal(queue.adapter_replay_review_pack_decision_queue_version, VERSION);
assert.equal(queue.milestone, MILESTONE);
assert.equal(queue.decision_queue_ready, true);
assert.ok(queue.decision_queue.length >= 1, 'decision queue must expose queue items');
assert.ok(queue.decision_queue.some((item) => item.evidence_trace_ids.length > 0), 'queue items must link evidence trace ids');
assert.ok(queue.decision_queue.every((item) => Number.isFinite(item.priority_score)), 'queue items must expose numeric priority score');
assert.ok(queue.decision_queue.some((item) => ['critical','high','medium','reference'].includes(item.priority_band)), 'queue items must expose priority bands');
assert.ok(queue.decision_queue.some((item) => item.recommended_next_action.includes('trace') || item.recommended_next_action.includes('Trace') || item.recommended_next_action.includes('blocker')), 'queue items must provide operator next action');
assert.ok(queue.queue_summary.total_queue_items === queue.decision_queue.length, 'queue summary must count items');
assert.equal(queue.queue_summary.manual_review_required, true);
assert.ok(queue.queue_summary.recommended_operator_path.includes('Review') || queue.queue_summary.recommended_operator_path.includes('Resolve'), 'queue summary must provide operator path');
assert.equal(queue.export_ready_queue_summary.manual_review_required, true);
assert.ok(queue.export_ready_queue_summary.export_note.includes('metadata-only'), 'export summary must restate metadata-only boundary');
assert.ok(queue.manual_decision_queue_copy.includes('Decision queue verdict'), 'manual copy must summarize verdict');
assert.ok(queue.manual_decision_queue_copy.includes('no live provider calls'), 'manual copy must restate no-live-provider boundary');
assert.equal(queue.queue_safety_contract.decision_queue_only, true);
assert.equal(queue.queue_safety_contract.metadata_only, true);
assert.equal(queue.queue_safety_contract.manual_operator_review_required, true);
assert.equal(queue.queue_safety_contract.no_auto_verification, true);
assert.equal(queue.queue_safety_contract.no_auto_signoff, true);
assert.equal(queue.queue_safety_contract.no_auto_export_lock, true);

for (const [key, value] of Object.entries(queue.boundary_flags)) {
  if (['decision_queue_only','metadata_preview_only','deterministic_review_pack_backed','no_network_replay_only','manual_operator_review_required'].includes(key)) {
    assert.equal(value, true, `${key} must be true`);
  } else {
    assert.equal(value, false, `${key} must remain false`);
  }
}
for (const key of [
  'network_invocation_allowed','live_provider_execution_enabled','live_provider_execution_performed','live_source_fetching_enabled','live_source_fetching_performed','hidden_network_calls_allowed','real_oauth_token_lifecycle_enabled','real_api_keys_stored','real_tokens_stored','credential_persistence_allowed','backend_storage_expanded','automatic_source_verification_claimed','automatic_signoff_performed','automatic_export_lock_performed','cryptographic_signature_claimed','publication_permission_claimed'
]) {
  assert.equal(queue[key], false, `${key} must remain false`);
}
assert.equal(queue.safe_metadata_only, true);
assert.equal(queue.can_execute_now, false);

const source = fs.readFileSync(MODULE, 'utf8');
for (const forbidden of ['fetch(', 'XMLHttpRequest', 'WebSocket', 'navigator.sendBeacon', 'localStorage.setItem', 'sessionStorage.setItem', 'sk-', 'ghp_', 'AKIA', 'BEGIN PRIVATE KEY', 'Bearer ']) {
  assert.equal(source.includes(forbidden), false, `${MODULE} must not contain ${forbidden}`);
}

const index = fs.readFileSync('index.html', 'utf8');
assert.ok(index.includes('src="src/research/adapter-replay-review-pack-decision-queue.js" defer'), 'index must load alpha.33 decision queue module');
assert.ok(index.includes('data-browser-qa="adapter-replay-review-pack-decision-queue"'), 'index must expose alpha.33 decision queue surface');
assert.ok(index.includes('adapterReplayDecisionQueueMount'), 'index must expose alpha.33 render mount');
assert.ok(index.includes('Adapter Replay Review Pack Decision Queue'), 'index must expose alpha.33 visible title');

const registry = JSON.parse(fs.readFileSync('tests/ci-gate-registry.json', 'utf8'));
for (const gate of ['no-browser', 'current-no-browser', 'provider', 'release']) {
  assert.ok(registry.gates[gate].node_checks.includes(CHECK), `${gate} must run alpha.33 decision queue check`);
}
assert.ok(registry.syntax_matrix.files.includes(MODULE), 'syntax matrix must cover alpha.33 module');
assert.ok(registry.syntax_matrix.files.includes(CHECK), 'syntax matrix must cover alpha.33 check');
assert.ok(registry.runtime_optimization.version >= VERSION, 'runtime optimization should point to the current release while preserving alpha.33 decision queue check');
assert.ok(['adapter_replay_review_pack_decision_queue','source_to_brief_operator_continuity_console', 'source_to_brief_operator_continuity_console'].includes(registry.runtime_optimization.optimization_scope), 'runtime optimization must preserve decision queue lineage or current triage scope');
for (const key of ['provider_behavior_changed', 'oauth_behavior_changed', 'backend_behavior_changed', 'source_behavior_changed', 'storage_behavior_changed']) {
  assert.equal(registry.runtime_optimization[key], false, `${key} must remain false`);
}

console.log('Adapter replay review pack decision queue checks passed.');
