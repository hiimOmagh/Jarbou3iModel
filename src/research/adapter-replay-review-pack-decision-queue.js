/* Jarbou3i Research Engine adapter replay review pack decision queue v1.4.0-alpha.33. */
/* Metadata-only decision queue. No network calls, no provider execution, no OAuth/token lifecycle, no backend/storage/source behavior expansion. */
(function(global){
  'use strict';
  const root = global.Jarbou3iResearchModules = global.Jarbou3iResearchModules || {};

  const VERSION = '1.4.0-alpha.33';
  const MILESTONE = 'v1.4.0-alpha.33 — Adapter Replay Review Pack Decision Queue';
  const MODEL = 'adapter_replay_review_pack_decision_queue.v1';
  const TRACE_READER_BASELINE = '1.4.0-alpha.32';
  const WORKFLOW_BASELINE = '1.4.0-alpha.31';
  const REVIEW_PACK_BASELINE = '1.4.0-alpha.28';
  const FIXED_GENERATED_AT = '2026-06-01T00:00:00.000Z';

  const BOUNDARY_FLAGS = Object.freeze({
    decision_queue_only: true,
    metadata_preview_only: true,
    deterministic_review_pack_backed: true,
    no_network_replay_only: true,
    manual_operator_review_required: true,
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

  function getTraceReader(options = {}){
    if (options.trace_reader) return options.trace_reader;
    const mod = root.adapterReplayReviewPackEvidenceTraceReader;
    if (mod && typeof mod.buildAdapterReplayReviewPackEvidenceTraceReader === 'function') {
      return mod.buildAdapterReplayReviewPackEvidenceTraceReader(options);
    }
    return null;
  }
  function getWorkflow(options = {}){
    if (options.workflow) return options.workflow;
    const mod = root.adapterReplayReviewPackOperatorWorkflowPolish;
    if (mod && typeof mod.buildAdapterReplayReviewPackOperatorWorkflowPolish === 'function') {
      return mod.buildAdapterReplayReviewPackOperatorWorkflowPolish(options);
    }
    return null;
  }
  function scoreCard(card, index){
    const lane = asString(card.lane, 'review_required');
    const status = asString(card.status, lane);
    const traceCount = asArray(card.evidence_trace_ids).length;
    let score = 40;
    if (card.blocking || status === 'fail' || lane === 'blockers') score += 45;
    if (card.missing_evidence) score += 25;
    if (lane === 'review_required') score += 14;
    if (lane === 'ready') score -= 8;
    score += Math.min(traceCount, 5) * 3;
    score -= index;
    return Math.max(0, score);
  }
  function classifyItem(card){
    if (card.blocking || card.missing_evidence) return 'resolve_blocker';
    if (asString(card.lane, '').includes('review')) return 'manual_review';
    return 'ready_reference';
  }
  function normalizeQueueItem(card, index){
    const traceIds = unique(asArray(card.evidence_trace_ids));
    const priorityScore = scoreCard(card, index);
    const actionClass = classifyItem(card);
    return Object.freeze({
      queue_id: `decision-queue-${String(index + 1).padStart(2, '0')}`,
      source_card_id: asString(card.card_id, `trace-card-${index + 1}`),
      action_id: asString(card.action_id, `operator-action-${index + 1}`),
      action_class: actionClass,
      lane: asString(card.lane, 'review_required'),
      status: asString(card.status, actionClass),
      priority_score: priorityScore,
      priority_band: priorityScore >= 85 ? 'critical' : priorityScore >= 65 ? 'high' : priorityScore >= 40 ? 'medium' : 'reference',
      blocker_reason: card.blocker_reason || (actionClass === 'resolve_blocker' ? 'Trace card requires manual blocker disposition before handoff.' : null),
      evidence_trace_ids: traceIds,
      evidence_completeness: traceIds.length > 0 && !card.missing_evidence ? 'trace-linked' : 'missing-or-blocked',
      recommended_next_action: asString(card.recommended_next_action, 'Inspect evidence trace and record manual decision.'),
      export_note: 'Queue item is metadata-only and supports manual review; it does not verify, sign off, lock export, publish, fetch sources, or execute providers.'
    });
  }
  function buildDecisionQueue(traceReader){
    const cards = asArray(asRecord(traceReader).trace_cards);
    return Object.freeze(cards.map(normalizeQueueItem).sort((a, b) => b.priority_score - a.priority_score || a.queue_id.localeCompare(b.queue_id)));
  }
  function summarizeQueue(queue, traceReader, workflow){
    const bands = queue.reduce((acc, item) => { acc[item.priority_band] = (acc[item.priority_band] || 0) + 1; return acc; }, {});
    const blockers = queue.filter((item) => item.action_class === 'resolve_blocker');
    const review = queue.filter((item) => item.action_class === 'manual_review');
    const focus = asRecord(asRecord(workflow).review_focus_summary);
    const exportSummary = asRecord(asRecord(traceReader).export_ready_trace_summary);
    return Object.freeze({
      total_queue_items: queue.length,
      blocker_items: blockers.length,
      manual_review_items: review.length,
      reference_items: queue.filter((item) => item.action_class === 'ready_reference').length,
      priority_bands: Object.freeze(bands),
      top_priority_queue_id: queue[0] ? queue[0].queue_id : null,
      readiness_verdict: asString(exportSummary.readiness_verdict, asString(focus.readiness_verdict, 'unknown')),
      manual_review_required: true,
      recommended_operator_path: blockers.length ? 'Resolve blocker queue items first, then review high-priority trace-linked decisions before handoff export.' : 'Review high-priority trace-linked decisions, preserve notes, then proceed to handoff export review.'
    });
  }
  function buildExportReadyQueueSummary(queue, queueSummary){
    return Object.freeze({
      queue_items: queue.length,
      critical_or_high_items: queue.filter((item) => ['critical','high'].includes(item.priority_band)).length,
      blocker_items: queueSummary.blocker_items,
      manual_review_required: true,
      export_note: 'Decision queue summary is metadata-only; it prioritizes manual operator review and does not verify, sign, lock, publish, fetch sources, or execute providers.',
      queue_snapshot: Object.freeze(queue.slice(0, 5).map((item) => Object.freeze({
        queue_id: item.queue_id,
        priority_band: item.priority_band,
        action_class: item.action_class,
        evidence_completeness: item.evidence_completeness,
        recommended_next_action: item.recommended_next_action
      })))
    });
  }
  function buildManualDecisionQueueCopy(summary, exportSummary, queue){
    const top = queue[0] || {};
    return [
      `Decision queue verdict: ${summary.readiness_verdict}`,
      `Queue items: ${summary.total_queue_items}; blockers: ${summary.blocker_items}; manual review: ${summary.manual_review_items}`,
      `Top priority: ${top.queue_id || 'none'} (${top.priority_band || 'none'}) → ${top.recommended_next_action || 'No action'}`,
      `Operator path: ${summary.recommended_operator_path}`,
      'Boundary: metadata-only decision queue; no live provider calls, source fetching, verification, signoff, export lock, or publication permission.'
    ].join('\n');
  }
  function buildAdapterReplayReviewPackDecisionQueue(options = {}){
    const generatedAt = asString(options.generated_at, asString(options.now, FIXED_GENERATED_AT));
    const traceReader = asRecord(getTraceReader(options));
    const workflow = asRecord(getWorkflow(options));
    const queue = buildDecisionQueue(traceReader);
    const queueSummary = summarizeQueue(queue, traceReader, workflow);
    const exportReadyQueueSummary = buildExportReadyQueueSummary(queue, queueSummary);
    return Object.freeze({
      adapter_replay_review_pack_decision_queue_version: VERSION,
      generated_at: generatedAt,
      milestone: MILESTONE,
      model: MODEL,
      trace_reader_baseline: TRACE_READER_BASELINE,
      workflow_baseline: WORKFLOW_BASELINE,
      review_pack_baseline: REVIEW_PACK_BASELINE,
      decision_queue_ready: true,
      decision_queue: queue,
      queue_summary: queueSummary,
      export_ready_queue_summary: exportReadyQueueSummary,
      manual_decision_queue_copy: buildManualDecisionQueueCopy(queueSummary, exportReadyQueueSummary, queue),
      queue_safety_contract: Object.freeze({
        decision_queue_only: true,
        metadata_only: true,
        manual_operator_review_required: true,
        no_auto_queue_resolution: true,
        no_auto_verification: true,
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
  function renderAdapterReplayReviewPackDecisionQueue(target, options = {}){
    const el = typeof target === 'string' && global.document ? global.document.querySelector(target) : target;
    if (!el) return null;
    const queue = buildAdapterReplayReviewPackDecisionQueue(options);
    el.innerHTML = `
      <div class="adapterReplayDecisionQueuePanel" data-browser-qa="adapter-replay-review-pack-decision-queue-panel">
        <div class="miniGrid">
          <span><strong>${queue.queue_summary.total_queue_items}</strong><small>queue items</small></span>
          <span><strong>${queue.queue_summary.blocker_items}</strong><small>blockers</small></span>
          <span><strong>${queue.export_ready_queue_summary.critical_or_high_items}</strong><small>high priority</small></span>
          <span><strong>${queue.queue_summary.readiness_verdict}</strong><small>verdict</small></span>
        </div>
        <ol class="compactList adapterReplayDecisionQueueCards">
          ${queue.decision_queue.slice(0, 4).map((item) => `<li>${item.queue_id}: ${item.recommended_next_action}</li>`).join('')}
        </ol>
      </div>`;
    el.setAttribute('data-decision-queue-ready', 'true');
    el.setAttribute('data-decision-queue-item-count', String(queue.decision_queue.length));
    return queue;
  }
  root.adapterReplayReviewPackDecisionQueue = Object.freeze({
    VERSION,
    MILESTONE,
    MODEL,
    TRACE_READER_BASELINE,
    WORKFLOW_BASELINE,
    REVIEW_PACK_BASELINE,
    buildAdapterReplayReviewPackDecisionQueue,
    renderAdapterReplayReviewPackDecisionQueue,
    BOUNDARY_FLAGS
  });
})(typeof window !== 'undefined' ? window : globalThis);
