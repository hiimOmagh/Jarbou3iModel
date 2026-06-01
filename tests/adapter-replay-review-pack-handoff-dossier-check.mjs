import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const VERSION = '1.4.0-alpha.35';
const MILESTONE = 'v1.4.0-alpha.35 — Adapter Replay Review Pack Handoff Dossier';
const MODULE = 'src/research/adapter-replay-review-pack-handoff-dossier.js';
const CHECK = 'tests/adapter-replay-review-pack-handoff-dossier-check.mjs';
const DEPENDENCIES = [
  'src/research/adapter-replay-fixture-corpus-coverage-matrix.js',
  'src/research/adapter-replay-insight-ux-operator-decision-surface.js',
  'src/research/adapter-replay-decision-drilldown-evidence-trace-links.js',
  'src/research/adapter-replay-review-pack-operator-handoff-export.js',
  'src/research/adapter-replay-review-pack-ui-export-preview.js',
  'src/research/adapter-replay-review-pack-operator-workflow-polish.js',
  'src/research/adapter-replay-review-pack-evidence-trace-reader.js',
  'src/research/adapter-replay-review-pack-decision-queue.js',
  'src/research/adapter-replay-review-pack-triage-workbench.js',
  MODULE
];

const sandbox = { console, window: { Jarbou3iResearchModules: {} } };
sandbox.globalThis = sandbox;
vm.createContext(sandbox);
for (const file of DEPENDENCIES) {
  vm.runInContext(fs.readFileSync(file, 'utf8'), sandbox, { filename: file });
}

const root = sandbox.window.Jarbou3iResearchModules;
const mod = root.adapterReplayReviewPackHandoffDossier;
assert.ok(root.adapterReplayReviewPackTriageWorkbench, 'alpha.34 triage workbench must remain available');
assert.ok(root.adapterReplayReviewPackDecisionQueue, 'alpha.33 decision queue must remain available');
assert.ok(root.adapterReplayReviewPackEvidenceTraceReader, 'alpha.32 evidence trace reader must remain available');
assert.ok(mod, 'alpha.35 handoff dossier module must be registered');
assert.equal(mod.VERSION, VERSION);
assert.equal(mod.MILESTONE, MILESTONE);
assert.equal(mod.MODEL, 'adapter_replay_review_pack_handoff_dossier.v1');
assert.equal(mod.TRIAGE_WORKBENCH_BASELINE, '1.4.0-alpha.34');
assert.equal(mod.DECISION_QUEUE_BASELINE, '1.4.0-alpha.33');
assert.equal(mod.TRACE_READER_BASELINE, '1.4.0-alpha.32');
assert.equal(mod.REVIEW_PACK_BASELINE, '1.4.0-alpha.28');
assert.equal(typeof mod.buildAdapterReplayReviewPackHandoffDossier, 'function');

const dossier = mod.buildAdapterReplayReviewPackHandoffDossier({ generated_at: '2026-06-01T15:00:00.000Z' });
assert.equal(dossier.adapter_replay_review_pack_handoff_dossier_version, VERSION);
assert.equal(dossier.milestone, MILESTONE);
assert.equal(dossier.handoff_dossier_ready, true);
assert.equal(dossier.safe_metadata_only, true);
assert.equal(dossier.can_execute_now, false);
assert.ok(dossier.dossier_sections.length >= 6, 'handoff dossier must expose dossier sections');
assert.ok(dossier.dossier_sections.some((section) => section.section_id === 'blocker-appendix'), 'dossier must include blocker appendix section');
assert.ok(dossier.dossier_sections.some((section) => section.section_id === 'evidence-trace-digest'), 'dossier must include evidence trace digest section');
assert.ok(dossier.dossier_sections.some((section) => section.section_id === 'operator-checklist'), 'dossier must include operator checklist section');
assert.ok(Array.isArray(dossier.batch_triage_snapshot), 'dossier must expose batch triage snapshot');
assert.ok(Array.isArray(dossier.blocker_appendix), 'dossier must expose blocker appendix');
assert.ok(Array.isArray(dossier.evidence_trace_digest), 'dossier must expose evidence trace digest');
assert.ok(Array.isArray(dossier.operator_checklist), 'dossier must expose operator checklist');
assert.ok(dossier.operator_checklist.every((item) => item.required === true || item.required === false), 'checklist must expose required flags');
assert.equal(dossier.export_ready_handoff_summary.manual_review_required, true);
assert.equal(dossier.export_ready_handoff_summary.safe_to_publish, false);
assert.equal(dossier.export_ready_handoff_summary.safe_to_export_as_draft, true);
assert.ok(dossier.export_ready_handoff_summary.export_note.includes('metadata-only'), 'handoff export summary must restate metadata-only boundary');
assert.ok(dossier.manual_handoff_dossier_copy.includes('Handoff dossier verdict'), 'manual copy must summarize dossier verdict');
assert.ok(dossier.manual_handoff_dossier_copy.includes('no live provider calls'), 'manual copy must restate no-live-provider boundary');
assert.equal(dossier.handoff_safety_contract.handoff_dossier_only, true);
assert.equal(dossier.handoff_safety_contract.no_auto_verification, true);
assert.equal(dossier.handoff_safety_contract.no_auto_signoff, true);
assert.equal(dossier.handoff_safety_contract.no_auto_export_lock, true);
assert.equal(dossier.handoff_safety_contract.no_status_persistence, true);
assert.equal(dossier.handoff_safety_contract.no_publication_permission, true);

for (const [key, value] of Object.entries(dossier.boundary_flags)) {
  if (['handoff_dossier_only','metadata_preview_only','deterministic_triage_workbench_backed','no_network_replay_only','manual_operator_review_required','export_ready_summary_preview_only'].includes(key)) {
    assert.equal(value, true, `${key} must be true`);
  } else {
    assert.equal(value, false, `${key} must remain false`);
  }
}
for (const key of [
  'network_invocation_allowed','live_provider_execution_enabled','live_provider_execution_performed','live_source_fetching_enabled','live_source_fetching_performed','hidden_network_calls_allowed','real_oauth_token_lifecycle_enabled','real_api_keys_stored','real_tokens_stored','credential_persistence_allowed','backend_storage_expanded','automatic_source_verification_claimed','automatic_signoff_performed','automatic_export_lock_performed','cryptographic_signature_claimed','publication_permission_claimed','status_persistence_enabled'
]) {
  assert.equal(dossier[key], false, `${key} must remain false`);
}

const source = fs.readFileSync(MODULE, 'utf8');
for (const forbidden of ['fetch(', 'XMLHttpRequest', 'WebSocket', 'navigator.sendBeacon', 'localStorage.setItem', 'sessionStorage.setItem', 'sk-', 'ghp_', 'AKIA', 'BEGIN PRIVATE KEY', 'Bearer ']) {
  assert.equal(source.includes(forbidden), false, `${MODULE} must not contain ${forbidden}`);
}

const index = fs.readFileSync('index.html', 'utf8');
assert.ok(index.includes('src="src/research/adapter-replay-review-pack-handoff-dossier.js" defer'), 'index must load alpha.35 handoff dossier module');
assert.ok(index.includes('data-browser-qa="adapter-replay-review-pack-handoff-dossier"'), 'index must expose alpha.35 handoff dossier surface');
assert.ok(index.includes('adapterReplayHandoffDossierMount'), 'index must expose alpha.35 render mount');
assert.ok(index.includes('Adapter Replay Review Pack Handoff Dossier'), 'index must expose alpha.35 visible title');

const registry = JSON.parse(fs.readFileSync('tests/ci-gate-registry.json', 'utf8'));
for (const gate of ['no-browser', 'current-no-browser', 'provider', 'release']) {
  assert.ok(registry.gates[gate].node_checks.includes(CHECK), `${gate} must run alpha.35 handoff dossier check`);
}
assert.ok(registry.syntax_matrix.files.includes(MODULE), 'syntax matrix must cover alpha.35 module');
assert.ok(registry.syntax_matrix.files.includes(CHECK), 'syntax matrix must cover alpha.35 check');
assert.ok([VERSION, '1.4.0-alpha.37'].includes(registry.runtime_optimization.version), 'runtime optimization may advance to alpha.36 while preserving alpha.35 handoff dossier');
assert.ok(['adapter_replay_review_pack_handoff_dossier', 'adapter_replay_review_pack_compact_navigation_ux'].includes(registry.runtime_optimization.optimization_scope), 'runtime optimization may advance to alpha.36 operator review console while preserving alpha.35 handoff dossier');
for (const key of ['provider_behavior_changed', 'oauth_behavior_changed', 'backend_behavior_changed', 'source_behavior_changed', 'storage_behavior_changed']) {
  assert.equal(registry.runtime_optimization[key], false, `${key} must remain false`);
}

console.log('Adapter replay review pack handoff dossier checks passed.');
