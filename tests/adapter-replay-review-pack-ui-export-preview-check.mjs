import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import { CURRENT_RUNTIME_SCOPE, CURRENT_TITLE, CURRENT_VERSION } from './current-release-identity.mjs';

const VERSION = '1.4.0-alpha.29';
const MILESTONE = 'v1.4.0-alpha.29 — Adapter Replay Review Pack UI Polish + Export Preview';
const MODULE = 'src/research/adapter-replay-review-pack-ui-export-preview.js';
const CHECK = 'tests/adapter-replay-review-pack-ui-export-preview-check.mjs';
const DEPENDENCIES = [
  'src/research/adapter-replay-fixture-corpus-coverage-matrix.js',
  'src/research/adapter-replay-insight-ux-operator-decision-surface.js',
  'src/research/adapter-replay-decision-drilldown-evidence-trace-links.js',
  'src/research/adapter-replay-review-pack-operator-handoff-export.js',
  MODULE
];

const ctx = { console, window: { Jarbou3iResearchModules: {} } };
ctx.globalThis = ctx;
vm.createContext(ctx);
for (const file of DEPENDENCIES) {
  const source = fs.readFileSync(file, 'utf8');
  vm.runInContext(source, ctx, { filename: file });
}

const reviewPack = ctx.window.Jarbou3iResearchModules.adapterReplayReviewPackOperatorHandoffExport;
const mod = ctx.window.Jarbou3iResearchModules.adapterReplayReviewPackUiExportPreview;
assert.ok(reviewPack, 'alpha.28 review pack module must be loaded');
assert.ok(mod, 'alpha.29 UI export preview module must be registered');
assert.equal(mod.VERSION, VERSION);
assert.equal(mod.MILESTONE, MILESTONE);
assert.equal(mod.MODEL, 'adapter_replay_review_pack_ui_export_preview.v1');
assert.equal(mod.REVIEW_PACK_BASELINE, '1.4.0-alpha.28');
assert.equal(mod.DRILLDOWN_BASELINE, '1.4.0-alpha.27');

const preview = mod.buildAdapterReplayReviewPackUiExportPreview({ now: '2026-05-31T00:00:00.000Z' });
assert.equal(preview.adapter_replay_review_pack_ui_export_preview_version, VERSION);
assert.equal(preview.milestone, MILESTONE);
assert.ok(preview.source_review_pack_id.includes('1.4.0-alpha.28'), 'preview must be backed by alpha.28 review pack id');
assert.equal(preview.source_readiness_state, 'operator_review_required');
assert.equal(preview.source_readiness_verdict, 'review_required');
assert.equal(preview.export_preview_summary.preview_cards, 4, 'preview must expose four cards');
assert.equal(preview.export_preview_summary.copy_actions, 4, 'preview must expose copy controls');
assert.equal(preview.export_preview_summary.export_actions, 4, 'preview must expose export controls');
assert.equal(preview.export_preview_summary.enabled_actions, 8, 'all preview controls must be enabled metadata controls');
assert.ok(preview.preview_cards.some((card) => card.preview_id === 'markdown-preview' && card.body.includes('Required actions')), 'markdown preview must include handoff text');
assert.ok(preview.preview_cards.some((card) => card.preview_id === 'json-preview' && card.body.includes('evidence_trace_bundle')), 'JSON preview must include triage workbench bundle');
assert.ok(preview.preview_cards.some((card) => card.preview_id === 'operator-actions-preview'), 'operator action preview must be present');
assert.ok(preview.preview_cards.some((card) => card.preview_id === 'trace-bundle-preview'), 'trace bundle preview must be present');
assert.ok(preview.copy_export_actions.every((action) => action.requires_user_gesture === true), 'preview actions must require user gesture');
assert.ok(preview.copy_export_actions.filter((action) => action.kind === 'export').every((action) => action.metadata_only === true), 'export actions must remain metadata-only');
assert.equal(preview.preview_safety_contract.no_auto_copy, true);
assert.equal(preview.preview_safety_contract.no_auto_download, true);
assert.equal(preview.preview_safety_contract.no_auto_signoff, true);
assert.equal(preview.preview_safety_contract.no_auto_export_lock, true);
assert.equal(preview.preview_safety_contract.no_publication_permission, true);
assert.ok(Object.keys(preview.grouped_action_summary).length > 0, 'grouped action summary must be present');

for (const [key, value] of Object.entries(preview.boundary_flags)) {
  if (['ui_export_preview_only', 'metadata_preview_only', 'operator_review_pack_polish_only', 'deterministic_review_pack_backed', 'no_network_replay_only'].includes(key)) {
    assert.equal(value, true, `${key} must be true`);
  } else {
    assert.equal(value, false, `${key} must remain false`);
  }
}
for (const key of [
  'network_invocation_allowed','live_provider_execution_enabled','live_provider_execution_performed','live_source_fetching_enabled','live_source_fetching_performed','hidden_network_calls_allowed','real_oauth_token_lifecycle_enabled','real_api_keys_stored','real_tokens_stored','credential_persistence_allowed','backend_storage_expanded','automatic_source_verification_claimed','automatic_signoff_performed','automatic_export_lock_performed','cryptographic_signature_claimed','publication_permission_claimed'
]) {
  assert.equal(preview[key], false, `${key} must remain false`);
}
assert.equal(preview.safe_metadata_only, true);
assert.equal(preview.can_execute_now, false);

const source = fs.readFileSync(MODULE, 'utf8');
for (const forbidden of ['fetch(', 'XMLHttpRequest', 'WebSocket', 'navigator.sendBeacon', 'localStorage.setItem', 'sessionStorage.setItem', 'sk-', 'ghp_', 'AKIA', 'BEGIN PRIVATE KEY', 'Bearer ']) {
  assert.equal(source.includes(forbidden), false, `${MODULE} must not contain ${forbidden}`);
}

const index = fs.readFileSync('index.html', 'utf8');
assert.ok(index.includes('src="src/research/adapter-replay-review-pack-ui-export-preview.js" defer'), 'index must load alpha.29 UI export preview module');
assert.ok(index.includes('data-browser-qa="adapter-replay-review-pack-ui-export-preview"'), 'index must expose alpha.29 export preview surface');
assert.ok(index.includes(CURRENT_TITLE) || index.includes('Adapter Replay Review Pack UI Polish + Export Preview') || index.includes('Targeted Hosted Evidence Capture'), 'index must expose alpha.29 preview or current release identity title');
assert.ok(index.includes('adapterReplayExportPreviewMount'), 'index must expose alpha.29 render mount');

const registry = JSON.parse(fs.readFileSync('tests/ci-gate-registry.json', 'utf8'));
for (const gate of ['no-browser', 'current-no-browser', 'provider', 'release']) {
  assert.ok(registry.gates[gate].node_checks.includes(CHECK), `${gate} must run alpha.29 UI export preview check`);
}
assert.ok(registry.syntax_matrix.files.includes(MODULE), 'syntax matrix must cover alpha.29 module');
assert.ok(registry.syntax_matrix.files.includes(CHECK), 'syntax matrix must cover alpha.29 check');
assert.ok([CURRENT_RUNTIME_SCOPE, CURRENT_VERSION, VERSION, '1.4.0-alpha.43', '1.4.0-alpha.43'].includes(registry.runtime_optimization.version), 'runtime optimization may advance to alpha.30 while preserving alpha.29 export-preview check');
assert.ok([CURRENT_RUNTIME_SCOPE, 'adapter_replay_review_pack_ui_export_preview', 'source_to_brief_operator_continuity_console', 'targeted_hosted_evidence_capture', 'source_to_brief_operator_continuity_console', 'targeted_hosted_evidence_capture'].includes(registry.runtime_optimization.optimization_scope), 'runtime optimization may advance to alpha.30 while preserving alpha.29 export-preview check');
for (const key of ['provider_behavior_changed', 'oauth_behavior_changed', 'backend_behavior_changed', 'source_behavior_changed', 'storage_behavior_changed']) {
  assert.equal(registry.runtime_optimization[key], false, `${key} must remain false`);
}

console.log('Adapter replay review pack UI polish + export preview checks passed.');
