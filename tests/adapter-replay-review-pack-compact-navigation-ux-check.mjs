import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const VERSION = '1.4.0-alpha.37';
const MILESTONE = 'v1.4.0-alpha.37 — Adapter Replay Review Pack Compact Navigation UX';
const MODULE = 'src/research/adapter-replay-review-pack-compact-navigation-ux.js';
const CHECK = 'tests/adapter-replay-review-pack-compact-navigation-ux-check.mjs';
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
  'src/research/adapter-replay-review-pack-handoff-dossier.js',
  'src/research/adapter-replay-review-pack-operator-review-console.js',
  MODULE
];

const sandbox = { console, window: { Jarbou3iResearchModules: {} } };
sandbox.globalThis = sandbox;
vm.createContext(sandbox);
for (const file of DEPENDENCIES) {
  vm.runInContext(fs.readFileSync(file, 'utf8'), sandbox, { filename: file });
}

const root = sandbox.window.Jarbou3iResearchModules;
const mod = root.adapterReplayReviewPackCompactNavigationUx;
assert.ok(root.adapterReplayReviewPackOperatorReviewConsole, 'alpha.36 operator review console must remain available');
assert.ok(root.adapterReplayReviewPackHandoffDossier, 'alpha.35 handoff dossier must remain available');
assert.ok(root.adapterReplayReviewPackTriageWorkbench, 'alpha.34 triage workbench must remain available');
assert.ok(root.adapterReplayReviewPackDecisionQueue, 'alpha.33 decision queue must remain available');
assert.ok(root.adapterReplayReviewPackEvidenceTraceReader, 'alpha.32 evidence trace reader must remain available');
assert.ok(mod, 'alpha.37 compact navigation UX module must be registered');
assert.equal(mod.VERSION, VERSION);
assert.equal(mod.MILESTONE, MILESTONE);
assert.equal(mod.MODEL, 'adapter_replay_review_pack_compact_navigation_ux.v1');
assert.equal(mod.OPERATOR_REVIEW_CONSOLE_BASELINE, '1.4.0-alpha.36');
assert.equal(mod.HANDOFF_DOSSIER_BASELINE, '1.4.0-alpha.35');
assert.equal(mod.TRIAGE_WORKBENCH_BASELINE, '1.4.0-alpha.34');
assert.equal(mod.DECISION_QUEUE_BASELINE, '1.4.0-alpha.33');
assert.equal(mod.TRACE_READER_BASELINE, '1.4.0-alpha.32');
assert.equal(typeof mod.buildAdapterReplayReviewPackCompactNavigationUx, 'function');

const compactUx = mod.buildAdapterReplayReviewPackCompactNavigationUx({ generated_at: '2026-06-01T16:00:00.000Z' });
assert.equal(compactUx.adapter_replay_review_pack_compact_navigation_ux_version, VERSION);
assert.equal(compactUx.milestone, MILESTONE);
assert.equal(compactUx.compact_navigation_ready, true);
assert.equal(compactUx.safe_metadata_only, true);
assert.equal(compactUx.can_execute_now, false);
assert.ok(compactUx.quick_jump_map.length >= 1, 'compact navigation must expose quick jump map');
assert.ok(compactUx.focus_rail.length >= 4, 'compact navigation must expose focus rail');
assert.ok(compactUx.progressive_disclosure.length >= 1, 'compact navigation must expose progressive disclosure');
assert.ok(compactUx.keyboard_navigation_map.length >= 1, 'compact navigation must expose keyboard map');
assert.equal(compactUx.mobile_compression_plan.default_density, 'compact');
assert.equal(compactUx.mobile_compression_plan.avoids_horizontal_overflow, true);
assert.equal(compactUx.mobile_compression_plan.mutates_layout_state, false);
assert.equal(compactUx.mobile_compression_plan.persists_layout_state, false);
assert.ok(compactUx.quick_jump_map.every((jump) => jump.is_preview_only === true), 'quick jumps must be preview only');
assert.ok(compactUx.focus_rail.every((item) => item.is_preview_only === true), 'focus rail must be preview only');
assert.ok(compactUx.keyboard_navigation_map.every((entry) => entry.executes_action === false && entry.mutates_state === false), 'keyboard map must not execute or mutate');
assert.equal(compactUx.export_compact_navigation_summary.manual_review_required, true);
assert.equal(compactUx.export_compact_navigation_summary.safe_to_publish, false);
assert.equal(compactUx.export_compact_navigation_summary.verification_claimed, false);
assert.equal(compactUx.export_compact_navigation_summary.signoff_performed, false);
assert.equal(compactUx.export_compact_navigation_summary.export_lock_performed, false);
assert.ok(compactUx.export_compact_navigation_summary.export_note.includes('metadata-only'), 'export summary must restate metadata-only boundary');
assert.ok(compactUx.manual_compact_navigation_copy.includes('Compact navigation UX verdict'), 'manual copy must summarize navigation verdict');
assert.ok(compactUx.manual_compact_navigation_copy.includes('no live provider calls'), 'manual copy must restate no-live-provider boundary');
assert.equal(compactUx.compact_navigation_safety_contract.compact_navigation_ux_only, true);
assert.equal(compactUx.compact_navigation_safety_contract.metadata_only, true);
assert.equal(compactUx.compact_navigation_safety_contract.manual_operator_review_required, true);
assert.equal(compactUx.compact_navigation_safety_contract.no_auto_verification, true);
assert.equal(compactUx.compact_navigation_safety_contract.no_auto_signoff, true);
assert.equal(compactUx.compact_navigation_safety_contract.no_auto_export_lock, true);
assert.equal(compactUx.compact_navigation_safety_contract.no_status_persistence, true);
assert.equal(compactUx.compact_navigation_safety_contract.no_batch_mutation, true);
assert.equal(compactUx.compact_navigation_safety_contract.no_navigation_state_persistence, true);

for (const [key, value] of Object.entries(compactUx.boundary_flags)) {
  if (['compact_navigation_ux_only','metadata_preview_only','operator_review_console_backed','no_network_replay_only','manual_operator_review_required','navigation_compression_only'].includes(key)) {
    assert.equal(value, true, `${key} must be true`);
  } else {
    assert.equal(value, false, `${key} must remain false`);
  }
}
for (const key of [
  'network_invocation_allowed','live_provider_execution_enabled','live_provider_execution_performed','live_source_fetching_enabled','live_source_fetching_performed','hidden_network_calls_allowed','real_oauth_token_lifecycle_enabled','real_api_keys_stored','real_tokens_stored','credential_persistence_allowed','backend_storage_expanded','automatic_source_verification_claimed','automatic_signoff_performed','automatic_export_lock_performed','cryptographic_signature_claimed','publication_permission_claimed','status_persistence_enabled','batch_mutation_enabled','navigation_state_persistence_enabled'
]) {
  assert.equal(compactUx[key], false, `${key} must remain false`);
}

const source = fs.readFileSync(MODULE, 'utf8');
for (const forbidden of ['fetch(', 'XMLHttpRequest', 'WebSocket', 'navigator.sendBeacon', 'localStorage.setItem', 'sessionStorage.setItem', 'sk-', 'ghp_', 'AKIA', 'BEGIN PRIVATE KEY', 'Bearer ']) {
  assert.equal(source.includes(forbidden), false, `${MODULE} must not contain ${forbidden}`);
}

const index = fs.readFileSync('index.html', 'utf8');
assert.ok(index.includes('src="src/research/adapter-replay-review-pack-compact-navigation-ux.js" defer'), 'index must load alpha.37 compact navigation UX module');
assert.ok(index.includes('data-browser-qa="adapter-replay-review-pack-compact-navigation-ux"'), 'index must expose alpha.37 compact navigation UX surface');
assert.ok(index.includes('adapterReplayCompactNavigationUxMount'), 'index must expose alpha.37 render mount');
assert.ok(index.includes('Adapter Replay Review Pack Compact Navigation UX'), 'index must expose alpha.37 visible title');

const registry = JSON.parse(fs.readFileSync('tests/ci-gate-registry.json', 'utf8'));
for (const gate of ['no-browser', 'current-no-browser', 'provider', 'release']) {
  assert.ok(registry.gates[gate].node_checks.includes(CHECK), `${gate} must run alpha.37 compact navigation UX check`);
}
assert.ok(registry.syntax_matrix.files.includes(MODULE), 'syntax matrix must cover alpha.37 module');
assert.ok(registry.syntax_matrix.files.includes(CHECK), 'syntax matrix must cover alpha.37 check');
assert.equal(registry.runtime_optimization.version, VERSION);
assert.equal(registry.runtime_optimization.optimization_scope, 'adapter_replay_review_pack_compact_navigation_ux');
for (const key of ['provider_behavior_changed', 'oauth_behavior_changed', 'backend_behavior_changed', 'source_behavior_changed', 'storage_behavior_changed']) {
  assert.equal(registry.runtime_optimization[key], false, `${key} must remain false`);
}

const releaseCopy = fs.readFileSync('src/research/release-copy-contract.js', 'utf8');
for (const token of ['Adapter Replay Review Pack Compact Navigation UX', 'compact navigation UX', 'quick jump map', 'no live provider calls']) {
  assert.ok(releaseCopy.includes(token), `release copy must include ${token}`);
}

console.log('Adapter replay review pack compact navigation UX checks passed.');
