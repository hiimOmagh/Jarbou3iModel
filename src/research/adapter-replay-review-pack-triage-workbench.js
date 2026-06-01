/* Jarbou3i Research Engine adapter replay review pack triage workbench v1.4.0-alpha.34. */
/* Metadata-only triage workbench. No network calls, no provider execution, no OAuth/token lifecycle, no backend/storage/source behavior expansion. */
(function(global){
  'use strict';
  const root = global.Jarbou3iResearchModules = global.Jarbou3iResearchModules || {};

  const VERSION = '1.4.0-alpha.34';
  const MILESTONE = 'v1.4.0-alpha.34 — Adapter Replay Review Pack Triage Workbench';
  const MODEL = 'adapter_replay_review_pack_triage_workbench.v1';
  const DECISION_QUEUE_BASELINE = '1.4.0-alpha.33';
  const TRACE_READER_BASELINE = '1.4.0-alpha.32';
  const WORKFLOW_BASELINE = '1.4.0-alpha.31';
  const REVIEW_PACK_BASELINE = '1.4.0-alpha.28';
  const FIXED_GENERATED_AT = '2026-06-01T00:00:00.000Z';

  const BOUNDARY_FLAGS = Object.freeze({
    triage_workbench_only: true,
    metadata_preview_only: true,
    deterministic_review_pack_backed: true,
    no_network_replay_only: true,
    manual_operator_review_required: true,
    batch_status_preview_only: true,
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
  function unique(values){ return Object.freeze([...new Set(values.filter(Boolean))]); }
  function getDecisionQueue(options = {}){
    if (options.decision_queue) return options.decision_queue;
    const mod = root.adapterReplayReviewPackDecisionQueue;
    if (mod && typeof mod.buildAdapterReplayReviewPackDecisionQueue === 'function') {
      return mod.buildAdapterReplayReviewPackDecisionQueue(options);
    }
    return null;
  }
  function priorityRank(item){
    const band = asString(item.priority_band, 'reference');
    if (band === 'critical') return 4;
    if (band === 'high') return 3;
    if (band === 'medium') return 2;
    return 1;
  }
  function blockerType(item){
    const reason = asString(item.blocker_reason, 'none').toLowerCase();
    if (reason.includes('missing') || reason.includes('evidence')) return 'missing_evidence';
    if (reason.includes('block')) return 'blocked_decision';
    if (asString(item.evidence_completeness, '').includes('missing')) return 'missing_evidence';
    return item.action_class === 'resolve_blocker' ? 'blocked_decision' : 'none';
  }
  function batchStatus(item){
    if (item.action_class === 'resolve_blocker') return 'blocked';
    if (item.action_class === 'manual_review') return 'needs_review';
    return 'ready_for_handoff_review';
  }
  function inlineTracePreview(item){
    const ids = unique(asArray(item.evidence_trace_ids));
    return Object.freeze({
      trace_ids: ids,
      first_trace_id: ids[0] || null,
      evidence_completeness: asString(item.evidence_completeness, 'unknown'),
      blocker_reason: item.blocker_reason || null,
      recommended_next_action: asString(item.recommended_next_action, 'Record manual review note before handoff.'),
      preview_note: 'Inline trace preview is metadata-only and never opens a network request or verifies the source automatically.'
    });
  }
  function makeTriageItem(item, index){
    const status = batchStatus(item);
    const blocker = blockerType(item);
    return Object.freeze({
      triage_id: `triage-${String(index + 1).padStart(2, '0')}`,
      queue_id: asString(item.queue_id, `decision-queue-${index + 1}`),
      source_card_id: asString(item.source_card_id, `trace-card-${index + 1}`),
      action_class: asString(item.action_class, 'manual_review'),
      priority_band: asString(item.priority_band, 'reference'),
      priority_score: Number.isFinite(item.priority_score) ? item.priority_score : 0,
      batch_status: status,
      batch_label: status === 'blocked' ? 'Resolve blockers' : status === 'needs_review' ? 'Manual review' : 'Ready for handoff review',
      blocker_type: blocker,
      evidence_completeness: asString(item.evidence_completeness, 'unknown'),
      recommended_next_action: asString(item.recommended_next_action, 'Record manual review note before handoff.'),
      inline_trace_preview: inlineTracePreview(item),
      review_history_entry: Object.freeze({
        status,
        actor: 'manual-operator',
        event: status === 'blocked' ? 'queued_for_blocker_resolution' : 'queued_for_manual_triage',
        fixture_timestamp: `2026-06-01T00:00:${String(index).padStart(2, '0')}.000Z`,
        note: 'Fixture-only review history entry; no persistence or backend mutation is performed.'
      })
    });
  }
  function sortTriageItems(items){
    return Object.freeze([...items].sort((a, b) => {
      const statusRank = { blocked: 3, needs_review: 2, ready_for_handoff_review: 1 };
      return (statusRank[b.batch_status] || 0) - (statusRank[a.batch_status] || 0) || priorityRank(b) - priorityRank(a) || b.priority_score - a.priority_score || a.triage_id.localeCompare(b.triage_id);
    }));
  }
  function buildFilters(items){
    return Object.freeze({
      priority_bands: unique(items.map((item) => item.priority_band)),
      batch_statuses: unique(items.map((item) => item.batch_status)),
      blocker_types: unique(items.map((item) => item.blocker_type)),
      evidence_completeness: unique(items.map((item) => item.evidence_completeness)),
      recommended_next_actions: unique(items.map((item) => item.recommended_next_action))
    });
  }
  function groupBatches(items){
    const groups = new Map();
    for (const item of items) {
      const key = item.batch_status;
      const current = groups.get(key) || [];
      current.push(item);
      groups.set(key, current);
    }
    return Object.freeze([...groups.entries()].map(([status, entries]) => Object.freeze({
      batch_id: `batch-${status}`,
      batch_status: status,
      item_count: entries.length,
      blocker_count: entries.filter((item) => item.blocker_type !== 'none').length,
      high_priority_count: entries.filter((item) => ['critical','high'].includes(item.priority_band)).length,
      recommended_batch_action: status === 'blocked' ? 'Resolve blocker reasons before handoff review.' : status === 'needs_review' ? 'Inspect inline traces and record manual status.' : 'Prepare export summary for manual handoff review.',
      item_ids: Object.freeze(entries.map((item) => item.triage_id))
    })));
  }
  function summarizeWorkbench(items, batches){
    const blocked = items.filter((item) => item.batch_status === 'blocked').length;
    const needsReview = items.filter((item) => item.batch_status === 'needs_review').length;
    const ready = items.filter((item) => item.batch_status === 'ready_for_handoff_review').length;
    return Object.freeze({
      total_triage_items: items.length,
      batch_count: batches.length,
      blocked_items: blocked,
      needs_review_items: needsReview,
      ready_for_handoff_review_items: ready,
      manual_review_required: true,
      triage_verdict: blocked ? 'blocked_until_manual_resolution' : needsReview ? 'manual_review_required' : 'ready_for_manual_handoff_review',
      recommended_operator_path: blocked ? 'Resolve blocked batch first, then inspect manual-review items and prepare handoff summary.' : 'Inspect manual-review batch, confirm ready items, then export triage summary for handoff.'
    });
  }
  function buildExportReadyTriageSummary(summary, batches, items){
    return Object.freeze({
      triage_verdict: summary.triage_verdict,
      batch_count: summary.batch_count,
      blocked_items: summary.blocked_items,
      manual_review_required: true,
      export_note: 'Triage workbench summary is metadata-only; it does not verify, sign, lock, publish, fetch sources, persist status, or execute providers.',
      batch_snapshot: Object.freeze(batches.map((batch) => Object.freeze({
        batch_id: batch.batch_id,
        batch_status: batch.batch_status,
        item_count: batch.item_count,
        recommended_batch_action: batch.recommended_batch_action
      }))),
      top_items: Object.freeze(items.slice(0, 5).map((item) => Object.freeze({
        triage_id: item.triage_id,
        queue_id: item.queue_id,
        priority_band: item.priority_band,
        batch_status: item.batch_status,
        blocker_type: item.blocker_type,
        recommended_next_action: item.recommended_next_action
      })))
    });
  }
  function buildManualTriageWorkbenchCopy(summary, exportSummary){
    return [
      `Triage verdict: ${summary.triage_verdict}`,
      `Batches: ${summary.batch_count}; blocked: ${summary.blocked_items}; needs review: ${summary.needs_review_items}; ready: ${summary.ready_for_handoff_review_items}`,
      `Operator path: ${summary.recommended_operator_path}`,
      `Export note: ${exportSummary.export_note}`,
      'Boundary: metadata-only triage workbench; no live provider calls, source fetching, verification, signoff, export lock, status persistence, or publication permission.'
    ].join('\n');
  }
  function buildAdapterReplayReviewPackTriageWorkbench(options = {}){
    const generatedAt = asString(options.generated_at, asString(options.now, FIXED_GENERATED_AT));
    const decisionQueue = asRecord(getDecisionQueue(options));
    const baseItems = asArray(decisionQueue.decision_queue);
    const triageItems = sortTriageItems(baseItems.map(makeTriageItem));
    const batches = groupBatches(triageItems);
    const summary = summarizeWorkbench(triageItems, batches);
    const exportReadyTriageSummary = buildExportReadyTriageSummary(summary, batches, triageItems);
    return Object.freeze({
      adapter_replay_review_pack_triage_workbench_version: VERSION,
      generated_at: generatedAt,
      milestone: MILESTONE,
      model: MODEL,
      decision_queue_baseline: DECISION_QUEUE_BASELINE,
      trace_reader_baseline: TRACE_READER_BASELINE,
      workflow_baseline: WORKFLOW_BASELINE,
      review_pack_baseline: REVIEW_PACK_BASELINE,
      triage_workbench_ready: true,
      triage_items: triageItems,
      triage_batches: batches,
      triage_filters: buildFilters(triageItems),
      triage_summary: summary,
      export_ready_triage_summary: exportReadyTriageSummary,
      manual_triage_workbench_copy: buildManualTriageWorkbenchCopy(summary, exportReadyTriageSummary),
      triage_safety_contract: Object.freeze({
        triage_workbench_only: true,
        metadata_only: true,
        manual_operator_review_required: true,
        no_auto_batch_resolution: true,
        no_auto_verification: true,
        no_auto_signoff: true,
        no_auto_export_lock: true,
        no_publication_permission: true,
        no_status_persistence: true
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
  function renderAdapterReplayReviewPackTriageWorkbench(target, options = {}){
    const el = typeof target === 'string' && global.document ? global.document.querySelector(target) : target;
    if (!el) return null;
    const workbench = buildAdapterReplayReviewPackTriageWorkbench(options);
    el.innerHTML = `
      <div class="adapterReplayTriageWorkbenchPanel" data-browser-qa="adapter-replay-review-pack-triage-workbench-panel">
        <div class="miniGrid">
          <span><strong>${workbench.triage_summary.total_triage_items}</strong><small>triage items</small></span>
          <span><strong>${workbench.triage_summary.batch_count}</strong><small>batches</small></span>
          <span><strong>${workbench.triage_summary.blocked_items}</strong><small>blocked</small></span>
          <span><strong>${workbench.triage_summary.triage_verdict}</strong><small>verdict</small></span>
        </div>
        <ol class="compactList adapterReplayTriageWorkbenchBatches">
          ${workbench.triage_batches.slice(0, 4).map((batch) => `<li>${batch.batch_id}: ${batch.recommended_batch_action}</li>`).join('')}
        </ol>
      </div>`;
    el.setAttribute('data-triage-workbench-ready', 'true');
    el.setAttribute('data-triage-workbench-batch-count', String(workbench.triage_batches.length));
    return workbench;
  }
  root.adapterReplayReviewPackTriageWorkbench = Object.freeze({
    VERSION,
    MILESTONE,
    MODEL,
    DECISION_QUEUE_BASELINE,
    TRACE_READER_BASELINE,
    WORKFLOW_BASELINE,
    REVIEW_PACK_BASELINE,
    buildAdapterReplayReviewPackTriageWorkbench,
    renderAdapterReplayReviewPackTriageWorkbench,
    BOUNDARY_FLAGS
  });
})(typeof window !== 'undefined' ? window : globalThis);
