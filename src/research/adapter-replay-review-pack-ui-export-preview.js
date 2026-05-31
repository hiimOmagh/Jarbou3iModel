/* Jarbou3i Research Engine adapter replay review pack UI polish + export preview v1.4.0-alpha.29. */
/* Metadata-only preview layer. No network calls, no live provider execution, no OAuth/token lifecycle, no backend/storage/source behavior expansion. */
(function(global){
  'use strict';
  const root = global.Jarbou3iResearchModules = global.Jarbou3iResearchModules || {};

  const VERSION = '1.4.0-alpha.29';
  const MILESTONE = 'v1.4.0-alpha.29 — Adapter Replay Review Pack UI Polish + Export Preview';
  const MODEL = 'adapter_replay_review_pack_ui_export_preview.v1';
  const REVIEW_PACK_BASELINE = '1.4.0-alpha.28';
  const DRILLDOWN_BASELINE = '1.4.0-alpha.27';
  const FIXED_GENERATED_AT = '2026-05-31T00:00:00.000Z';

  const BOUNDARY_FLAGS = Object.freeze({
    ui_export_preview_only: true,
    metadata_preview_only: true,
    operator_review_pack_polish_only: true,
    deterministic_review_pack_backed: true,
    no_network_replay_only: true,
    can_execute_now: false,
    network_invocation_allowed: false,
    live_provider_execution_enabled: false,
    live_provider_execution_performed: false,
    live_source_fetching_enabled: false,
    live_source_fetching_performed: false,
    hidden_network_calls_allowed: false,
    real_oauth_token_lifecycle_enabled: false,
    real_api_keys_stored: false,
    real_tokens_stored: false,
    credential_persistence_allowed: false,
    backend_storage_expanded: false,
    automatic_source_verification_claimed: false,
    automatic_signoff_performed: false,
    automatic_export_lock_performed: false,
    cryptographic_signature_claimed: false,
    publication_permission_claimed: false
  });

  function asRecord(value){ return Object.prototype.toString.call(value) === '[object Object]' ? value : {}; }
  function asArray(value){ return Array.isArray(value) ? value : []; }
  function asString(value, fallback){ return typeof value === 'string' && value.trim() ? value.trim() : fallback; }
  function getReviewPack(options = {}){
    if (options.review_pack) return options.review_pack;
    const mod = root.adapterReplayReviewPackOperatorHandoffExport;
    if (mod && typeof mod.buildAdapterReplayReviewPackOperatorHandoffExport === 'function') {
      return mod.buildAdapterReplayReviewPackOperatorHandoffExport(options);
    }
    return null;
  }
  function parseExportPayload(pack){
    if (!pack || typeof pack.export_payload !== 'string') return {};
    try { return JSON.parse(pack.export_payload); }
    catch (_) { return {}; }
  }
  function buildPreviewCards(pack){
    const payload = parseExportPayload(pack);
    const summary = asRecord(pack.review_pack_summary);
    const markdown = asString(pack.handoff_markdown, '# Review pack unavailable');
    const json = asString(pack.export_payload, JSON.stringify(payload, null, 2));
    const requiredActions = asArray(pack.required_operator_actions);
    return Object.freeze([
      Object.freeze({
        preview_id: 'markdown-preview',
        label: 'Markdown preview',
        format: 'markdown',
        copy_action_id: 'copy-markdown-preview',
        export_action_id: 'export-markdown-preview',
        line_count: markdown.split('\n').length,
        char_count: markdown.length,
        body: markdown
      }),
      Object.freeze({
        preview_id: 'json-preview',
        label: 'JSON preview',
        format: 'json',
        copy_action_id: 'copy-json-preview',
        export_action_id: 'export-json-preview',
        line_count: json.split('\n').length,
        char_count: json.length,
        body: json
      }),
      Object.freeze({
        preview_id: 'operator-actions-preview',
        label: 'Operator actions',
        format: 'summary',
        copy_action_id: 'copy-operator-actions',
        export_action_id: 'export-operator-actions',
        line_count: Math.max(requiredActions.length, 1),
        char_count: JSON.stringify(requiredActions).length,
        body: requiredActions.length ? requiredActions.map((action) => `${action.id}: ${action.label}`).join('\n') : 'No operator action required.'
      }),
      Object.freeze({
        preview_id: 'trace-bundle-preview',
        label: 'Evidence trace bundle',
        format: 'summary',
        copy_action_id: 'copy-trace-bundle',
        export_action_id: 'export-trace-bundle',
        line_count: 4,
        char_count: JSON.stringify(pack.evidence_trace_bundle || {}).length,
        body: `${Number(summary.total_trace_links || 0)} trace links · ${Number(summary.fixture_links || 0)} fixtures · ${Number(summary.policy_links || 0)} policy rows · ${Number(summary.evidence_links || 0)} evidence artifacts`
      })
    ]);
  }
  function buildCopyExportActions(previewCards){
    const actions = [];
    for (const card of asArray(previewCards)) {
      actions.push(Object.freeze({ action_id: card.copy_action_id, kind: 'copy', label: `Copy ${card.label}`, preview_id: card.preview_id, enabled: true, writes_to_clipboard: false, requires_user_gesture: true }));
      actions.push(Object.freeze({ action_id: card.export_action_id, kind: 'export', label: `Export ${card.label}`, preview_id: card.preview_id, enabled: true, metadata_only: true, requires_user_gesture: true }));
    }
    return Object.freeze(actions);
  }
  function buildGroupedActionSummary(pack){
    const actions = asArray(pack.required_operator_actions);
    const buckets = actions.reduce((acc, action) => {
      const bucket = action.blocking ? 'blocking' : action.status || 'required';
      acc[bucket] = acc[bucket] || [];
      acc[bucket].push(Object.freeze({ id: action.id, label: action.label, status: action.status, blocking: !!action.blocking }));
      return acc;
    }, {});
    if (!Object.keys(buckets).length) buckets.none = [Object.freeze({ id: 'none', label: 'No required operator action detected.', status: 'clear', blocking: false })];
    return Object.freeze(Object.fromEntries(Object.entries(buckets).map(([key, value]) => [key, Object.freeze(value)])));
  }
  function buildAdapterReplayReviewPackUiExportPreview(options = {}){
    const generatedAt = asString(options.generated_at, asString(options.now, FIXED_GENERATED_AT));
    const pack = asRecord(getReviewPack(options));
    const previewCards = buildPreviewCards(pack);
    const copyExportActions = buildCopyExportActions(previewCards);
    const groupedActionSummary = buildGroupedActionSummary(pack);
    return Object.freeze({
      adapter_replay_review_pack_ui_export_preview_version: VERSION,
      generated_at: generatedAt,
      milestone: MILESTONE,
      model: MODEL,
      review_pack_baseline: REVIEW_PACK_BASELINE,
      drilldown_baseline: DRILLDOWN_BASELINE,
      source_review_pack_id: pack.review_pack_id || null,
      source_readiness_state: pack.source_readiness_state || 'unknown',
      source_readiness_verdict: pack.source_readiness_verdict || 'unknown',
      preview_cards: previewCards,
      copy_export_actions: copyExportActions,
      grouped_action_summary: groupedActionSummary,
      export_preview_summary: Object.freeze({
        preview_cards: previewCards.length,
        copy_actions: copyExportActions.filter((action) => action.kind === 'copy').length,
        export_actions: copyExportActions.filter((action) => action.kind === 'export').length,
        enabled_actions: copyExportActions.filter((action) => action.enabled).length,
        markdown_chars: (previewCards.find((card) => card.preview_id === 'markdown-preview') || {}).char_count || 0,
        json_chars: (previewCards.find((card) => card.preview_id === 'json-preview') || {}).char_count || 0
      }),
      preview_safety_contract: Object.freeze({
        preview_only: true,
        metadata_only: true,
        user_gesture_required: true,
        no_auto_copy: true,
        no_auto_download: true,
        no_auto_signoff: true,
        no_auto_export_lock: true,
        no_publication_permission: true
      }),
      boundary_flags: BOUNDARY_FLAGS,
      safe_metadata_only: true,
      can_execute_now: false,
      network_invocation_allowed: false,
      live_provider_execution_enabled: false,
      live_provider_execution_performed: false,
      live_source_fetching_enabled: false,
      live_source_fetching_performed: false,
      hidden_network_calls_allowed: false,
      real_oauth_token_lifecycle_enabled: false,
      real_api_keys_stored: false,
      real_tokens_stored: false,
      credential_persistence_allowed: false,
      backend_storage_expanded: false,
      automatic_source_verification_claimed: false,
      automatic_signoff_performed: false,
      automatic_export_lock_performed: false,
      cryptographic_signature_claimed: false,
      publication_permission_claimed: false
    });
  }
  function renderAdapterReplayReviewPackUiExportPreview(target, options = {}){
    const el = typeof target === 'string' && global.document ? global.document.querySelector(target) : target;
    if (!el) return null;
    const preview = buildAdapterReplayReviewPackUiExportPreview(options);
    el.innerHTML = `
      <div class="adapterReplayExportPreviewPanel" data-browser-qa="adapter-replay-review-pack-export-preview-panel">
        <div class="miniGrid">
          <span><strong>${preview.export_preview_summary.preview_cards}</strong><small>preview cards</small></span>
          <span><strong>${preview.export_preview_summary.copy_actions}</strong><small>copy controls</small></span>
          <span><strong>${preview.export_preview_summary.export_actions}</strong><small>export controls</small></span>
          <span><strong>${preview.source_readiness_verdict}</strong><small>verdict</small></span>
        </div>
        <ul class="compactList adapterReplayExportPreviewCards">
          ${preview.preview_cards.map((card) => `<li><strong>${card.label}</strong> · ${card.format} · ${card.line_count} lines</li>`).join('')}
        </ul>
      </div>`;
    el.setAttribute('data-export-preview-ready', 'true');
    el.setAttribute('data-export-preview-card-count', String(preview.export_preview_summary.preview_cards));
    return preview;
  }
  function attach(){
    if (!global.document) return;
    const target = global.document.querySelector('[data-browser-qa="adapter-replay-review-pack-ui-export-preview"] .adapterReplayExportPreviewMount');
    if (target) renderAdapterReplayReviewPackUiExportPreview(target);
  }
  root.adapterReplayReviewPackUiExportPreview = Object.freeze({
    VERSION,
    MILESTONE,
    MODEL,
    REVIEW_PACK_BASELINE,
    DRILLDOWN_BASELINE,
    BOUNDARY_FLAGS,
    buildPreviewCards,
    buildCopyExportActions,
    buildGroupedActionSummary,
    buildAdapterReplayReviewPackUiExportPreview,
    renderAdapterReplayReviewPackUiExportPreview
  });
  if (global.document) {
    if (global.document.readyState === 'loading') global.document.addEventListener('DOMContentLoaded', attach, { once: true });
    else attach();
  }
})(typeof window !== 'undefined' ? window : globalThis);
