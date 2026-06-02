import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const VERSION = '1.4.0-alpha.34';
const MILESTONE = 'v1.4.0-alpha.34 — Adapter Replay Review Pack Triage Workbench';
const MODULE = 'src/research/adapter-replay-review-pack-triage-workbench.js';
const CHECK = 'tests/adapter-replay-review-pack-triage-workbench-check.mjs';
const DEPENDENCIES = [
  'src/research/adapter-replay-fixture-corpus-coverage-matrix.js',
  'src/research/adapter-replay-insight-ux-operator-decision-surface.js',
  'src/research/adapter-replay-decision-drilldown-evidence-trace-links.js',
  'src/research/adapter-replay-review-pack-operator-handoff-export.js',
  'src/research/adapter-replay-review-pack-ui-export-preview.js',
  'src/research/adapter-replay-review-pack-operator-workflow-polish.js',
  'src/research/adapter-replay-review-pack-evidence-trace-reader.js',
  'src/research/adapter-replay-review-pack-decision-queue.js',
  MODULE
];

const sandbox = { console, window: { Jarbou3iResearchModules: {} } };
sandbox.globalThis = sandbox;
vm.createContext(sandbox);
for (const file of DEPENDENCIES) {
  vm.runInContext(fs.readFileSync(file, 'utf8'), sandbox, { filename: file });
}

const root = sandbox.window.Jarbou3iResearchModules;
const mod = root.adapterReplayReviewPackTriageWorkbench;
assert.ok(root.adapterReplayReviewPackDecisionQueue, 'alpha.33 decision queue must remain available');
assert.ok(root.adapterReplayReviewPackEvidenceTraceReader, 'alpha.32 evidence trace reader must remain available');
assert.ok(root.adapterReplayReviewPackOperatorWorkflowPolish, 'alpha.31 operator workflow polish must remain available');
assert.ok(mod, 'alpha.34 triage workbench module must be registered');
assert.equal(mod.VERSION, VERSION);
assert.equal(mod.MILESTONE, MILESTONE);
assert.equal(mod.MODEL, 'adapter_replay_review_pack_triage_workbench.v1');
assert.equal(mod.DECISION_QUEUE_BASELINE, '1.4.0-alpha.33');
assert.equal(mod.TRACE_READER_BASELINE, '1.4.0-alpha.32');
assert.equal(mod.WORKFLOW_BASELINE, '1.4.0-alpha.31');
assert.equal(mod.REVIEW_PACK_BASELINE, '1.4.0-alpha.28');
assert.equal(typeof mod.buildAdapterReplayReviewPackTriageWorkbench, 'function');

const workbench = mod.buildAdapterReplayReviewPackTriageWorkbench({ generated_at: '2026-06-01T14:00:00.000Z' });
assert.equal(workbench.adapter_replay_review_pack_triage_workbench_version, VERSION);
assert.equal(workbench.milestone, MILESTONE);
assert.equal(workbench.triage_workbench_ready, true);
assert.ok(workbench.triage_items.length >= 1, 'triage workbench must expose triage items');
assert.ok(workbench.triage_batches.length >= 1, 'triage workbench must expose triage batches');
assert.ok(workbench.triage_items.every((item) => item.inline_trace_preview && Array.isArray(item.inline_trace_preview.trace_ids)), 'triage items must expose inline trace previews');
assert.ok(workbench.triage_items.some((item) => ['blocked','needs_review','ready_for_handoff_review'].includes(item.batch_status)), 'triage items must expose batch statuses');
assert.ok(workbench.triage_items.some((item) => item.review_history_entry && item.review_history_entry.note.includes('Fixture-only')), 'triage items must expose fixture-only review history');
assert.ok(Array.isArray(workbench.triage_filters.priority_bands), 'triage filters must expose priority bands');
assert.ok(Array.isArray(workbench.triage_filters.blocker_types), 'triage filters must expose blocker types');
assert.ok(workbench.triage_summary.total_triage_items === workbench.triage_items.length, 'triage summary must count items');
assert.equal(workbench.triage_summary.manual_review_required, true);
assert.ok(workbench.triage_summary.recommended_operator_path.includes('Resolve') || workbench.triage_summary.recommended_operator_path.includes('Inspect'), 'triage summary must provide operator path');
assert.equal(workbench.export_ready_triage_summary.manual_review_required, true);
assert.ok(workbench.export_ready_triage_summary.export_note.includes('metadata-only'), 'export summary must restate metadata-only boundary');
assert.ok(workbench.manual_triage_workbench_copy.includes('Triage verdict'), 'manual copy must summarize verdict');
assert.ok(workbench.manual_triage_workbench_copy.includes('no live provider calls'), 'manual copy must restate no-live-provider boundary');
assert.equal(workbench.triage_safety_contract.triage_workbench_only, true);
assert.equal(workbench.triage_safety_contract.metadata_only, true);
assert.equal(workbench.triage_safety_contract.manual_operator_review_required, true);
assert.equal(workbench.triage_safety_contract.no_auto_batch_resolution, true);
assert.equal(workbench.triage_safety_contract.no_auto_verification, true);
assert.equal(workbench.triage_safety_contract.no_auto_signoff, true);
assert.equal(workbench.triage_safety_contract.no_auto_export_lock, true);
assert.equal(workbench.triage_safety_contract.no_status_persistence, true);

for (const [key, value] of Object.entries(workbench.boundary_flags)) {
  if (['triage_workbench_only','metadata_preview_only','deterministic_review_pack_backed','no_network_replay_only','manual_operator_review_required','batch_status_preview_only'].includes(key)) {
    assert.equal(value, true, `${key} must be true`);
  } else {
    assert.equal(value, false, `${key} must remain false`);
  }
}
for (const key of [
  'network_invocation_allowed','live_provider_execution_enabled','live_provider_execution_performed','live_source_fetching_enabled','live_source_fetching_performed','hidden_network_calls_allowed','real_oauth_token_lifecycle_enabled','real_api_keys_stored','real_tokens_stored','credential_persistence_allowed','backend_storage_expanded','automatic_source_verification_claimed','automatic_signoff_performed','automatic_export_lock_performed','cryptographic_signature_claimed','publication_permission_claimed'
]) {
  assert.equal(workbench[key], false, `${key} must remain false`);
}
assert.equal(workbench.safe_metadata_only, true);
assert.equal(workbench.can_execute_now, false);

const source = fs.readFileSync(MODULE, 'utf8');
for (const forbidden of ['fetch(', 'XMLHttpRequest', 'WebSocket', 'navigator.sendBeacon', 'localStorage.setItem', 'sessionStorage.setItem', 'sk-', 'ghp_', 'AKIA', 'BEGIN PRIVATE KEY', 'Bearer ']) {
  assert.equal(source.includes(forbidden), false, `${MODULE} must not contain ${forbidden}`);
}

const index = fs.readFileSync('index.html', 'utf8');
assert.ok(index.includes('src="src/research/adapter-replay-review-pack-triage-workbench.js" defer'), 'index must load alpha.34 triage workbench module');
assert.ok(index.includes('data-browser-qa="adapter-replay-review-pack-triage-workbench"'), 'index must expose alpha.34 triage workbench surface');
assert.ok(index.includes('adapterReplayTriageWorkbenchMount'), 'index must expose alpha.34 render mount');
assert.ok(index.includes('Adapter Replay Review Pack Triage Workbench'), 'index must expose alpha.34 visible title');

const registry = JSON.parse(fs.readFileSync('tests/ci-gate-registry.json', 'utf8'));
for (const gate of ['no-browser', 'current-no-browser', 'provider', 'release']) {
  assert.ok(registry.gates[gate].node_checks.includes(CHECK), `${gate} must run alpha.34 triage workbench check`);
}
assert.ok(registry.syntax_matrix.files.includes(MODULE), 'syntax matrix must cover alpha.34 module');
assert.ok(registry.syntax_matrix.files.includes(CHECK), 'syntax matrix must cover alpha.34 check');
assert.ok([VERSION, '1.4.0-alpha.43'].includes(registry.runtime_optimization.version), 'runtime optimization may advance to alpha.35 while preserving alpha.34 triage workbench');
assert.ok(['adapter_replay_review_pack_triage_workbench', 'source_to_brief_operator_continuity_console', 'targeted_hosted_evidence_capture'].includes(registry.runtime_optimization.optimization_scope), 'runtime optimization may advance to alpha.35 handoff dossier while preserving alpha.34 triage workbench');
for (const key of ['provider_behavior_changed', 'oauth_behavior_changed', 'backend_behavior_changed', 'source_behavior_changed', 'storage_behavior_changed']) {
  assert.equal(registry.runtime_optimization[key], false, `${key} must remain false`);
}

console.log('Adapter replay review pack triage workbench checks passed.');
