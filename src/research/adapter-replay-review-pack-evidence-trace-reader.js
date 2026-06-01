/* Jarbou3i Research Engine adapter replay review pack evidence trace reader v1.4.0-alpha.32. */
/* Metadata-only evidence trace reader. No network calls, no provider execution, no OAuth/token lifecycle, no backend/storage/source behavior expansion. */
(function(global){
  'use strict';
  const root = global.Jarbou3iResearchModules = global.Jarbou3iResearchModules || {};

  const VERSION = '1.4.0-alpha.32';
  const MILESTONE = 'v1.4.0-alpha.32 — Adapter Replay Review Pack Evidence Trace Reader';
  const MODEL = 'adapter_replay_review_pack_evidence_trace_reader.v1';
  const WORKFLOW_BASELINE = '1.4.0-alpha.31';
  const DRILLDOWN_BASELINE = '1.4.0-alpha.27';
  const REVIEW_PACK_BASELINE = '1.4.0-alpha.28';
  const FIXED_GENERATED_AT = '2026-06-01T00:00:00.000Z';

  const BOUNDARY_FLAGS = Object.freeze({
    evidence_trace_reader_only: true,
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

  function getWorkflow(options = {}){
    if (options.workflow) return options.workflow;
    const mod = root.adapterReplayReviewPackOperatorWorkflowPolish;
    if (mod && typeof mod.buildAdapterReplayReviewPackOperatorWorkflowPolish === 'function') {
      return mod.buildAdapterReplayReviewPackOperatorWorkflowPolish(options);
    }
    return null;
  }
  function getDrilldown(options = {}){
    if (options.drilldown) return options.drilldown;
    const mod = root.adapterReplayDecisionDrilldownEvidenceTraceLinks;
    if (mod && typeof mod.buildAdapterReplayDecisionDrilldownEvidenceTraceLinks === 'function') {
      return mod.buildAdapterReplayDecisionDrilldownEvidenceTraceLinks(options);
    }
    return null;
  }
  function indexTraceLinks(drilldown){
    const links = asArray(asRecord(drilldown).trace_link_index);
    return Object.freeze(links.map((link, index) => Object.freeze({
      trace_id: asString(link.trace_id, `trace-${index + 1}`),
      link_type: asString(link.link_type, 'metadata_trace'),
      label: asString(link.label, 'Evidence trace'),
      href: asString(link.href, `adapter-trace://${index + 1}`),
      provider_family: link.provider_family || null,
      scenario_class: link.scenario_class || null,
      severity: link.severity || null,
      recommended_action: link.recommended_action || null
    })));
  }
  function chooseTraceIds(action, traceLinks, index){
    const lane = action.lane || action.source_lane || 'review';
    const preferred = traceLinks.filter((link) => {
      if (lane === 'blockers') return ['coverage_gap','failure_group','evidence_artifact'].includes(link.link_type);
      if (lane === 'review_required') return ['fixture','policy_row','evidence_artifact','coverage_matrix_cell'].includes(link.link_type);
      return ['provider_summary','coverage_matrix_cell','fixture'].includes(link.link_type);
    });
    const selected = (preferred.length ? preferred : traceLinks).slice(index, index + 4);
    return unique(selected.map((link) => link.trace_id));
  }
  function buildTraceCards(workflow, drilldown, traceLinks){
    const actions = asArray(asRecord(workflow).prioritized_operator_actions);
    const fallbackActions = actions.length ? actions : [Object.freeze({ id: 'review-pack-ready', label: 'Review pack ready for manual operator inspection.', lane: 'ready', status: 'ready', blocking: false })];
    return Object.freeze(fallbackActions.map((action, index) => {
      const traceIds = chooseTraceIds(asRecord(action), traceLinks, index % Math.max(traceLinks.length, 1));
      const lane = asString(action.lane, asString(action.source_lane, 'review_required'));
      const status = asString(action.status, lane);
      const blocking = !!action.blocking || lane === 'blockers' || status === 'fail';
      return Object.freeze({
        card_id: `trace-card-${index + 1}`,
        action_id: asString(action.id, `operator-action-${index + 1}`),
        lane,
        status,
        blocking,
        decision_reason: blocking ? 'Blocking or failed replay-review action requires operator disposition before handoff.' : lane === 'review_required' ? 'Review-required replay action needs manual judgement with trace evidence.' : 'Ready/reference action can be inspected as supporting trace context.',
        evidence_trace_ids: traceIds,
        missing_evidence: traceIds.length === 0,
        blocker_reason: blocking ? 'Open blocker evidence trace before export review.' : null,
        recommended_next_action: blocking ? 'Open blocker trace, record accept/defer/escalate decision, then update manual handoff copy.' : 'Inspect linked trace cards and preserve manual review note in export summary.'
      });
    }));
  }
  function buildMissingEvidenceSummary(traceCards, drilldown){
    const grouped = asArray(asRecord(drilldown).grouped_blocker_explanations);
    const missingCards = traceCards.filter((card) => card.missing_evidence || card.blocking);
    return Object.freeze({
      missing_trace_card_count: missingCards.length,
      blocker_buckets: unique(grouped.filter((group) => Number(group.count || 0) > 0).map((group) => group.bucket || 'review')),
      recommended_next_action: missingCards.length ? 'Resolve blocker/missing-evidence cards before handoff export review.' : 'Proceed with manual review; preserve evidence trace summary in export notes.'
    });
  }
  function buildExportReadyTraceSummary(workflow, drilldown, traceCards, traceLinks){
    const focus = asRecord(asRecord(workflow).review_focus_summary);
    return Object.freeze({
      readiness_verdict: asString(focus.readiness_verdict, asString(asRecord(drilldown).source_readiness_verdict, 'unknown')),
      readiness_state: asString(focus.readiness_state, asString(asRecord(drilldown).source_readiness_state, 'unknown')),
      total_trace_links: traceLinks.length,
      trace_cards: traceCards.length,
      blocking_trace_cards: traceCards.filter((card) => card.blocking).length,
      manual_review_required: true,
      export_note: 'Evidence trace reader summary is metadata-only; it supports manual review and does not verify, sign, lock, publish, fetch sources, or execute providers.'
    });
  }
  function buildManualTraceReaderCopy(summary, missingSummary, cards){
    const top = cards[0] || {};
    return [
      `Evidence trace reader verdict: ${summary.readiness_verdict}`,
      `Trace cards: ${summary.trace_cards}; blocking cards: ${summary.blocking_trace_cards}; trace links: ${summary.total_trace_links}`,
      `Top trace card: ${top.card_id || 'none'} → ${top.recommended_next_action || 'No action'}`,
      `Missing evidence: ${missingSummary.missing_trace_card_count}; next: ${missingSummary.recommended_next_action}`,
      'Boundary: metadata-only evidence trace reader; no live provider calls, source fetching, verification, signoff, export lock, or publication permission.'
    ].join('\n');
  }
  function buildAdapterReplayReviewPackEvidenceTraceReader(options = {}){
    const generatedAt = asString(options.generated_at, asString(options.now, FIXED_GENERATED_AT));
    const workflow = asRecord(getWorkflow(options));
    const drilldown = asRecord(getDrilldown(options));
    const traceLinks = indexTraceLinks(drilldown);
    const traceCards = buildTraceCards(workflow, drilldown, traceLinks);
    const missingEvidenceSummary = buildMissingEvidenceSummary(traceCards, drilldown);
    const exportReadyTraceSummary = buildExportReadyTraceSummary(workflow, drilldown, traceCards, traceLinks);
    return Object.freeze({
      adapter_replay_review_pack_evidence_trace_reader_version: VERSION,
      generated_at: generatedAt,
      milestone: MILESTONE,
      model: MODEL,
      workflow_baseline: WORKFLOW_BASELINE,
      drilldown_baseline: DRILLDOWN_BASELINE,
      review_pack_baseline: REVIEW_PACK_BASELINE,
      trace_reader_ready: true,
      trace_cards: traceCards,
      trace_link_index: traceLinks,
      missing_evidence_summary: missingEvidenceSummary,
      export_ready_trace_summary: exportReadyTraceSummary,
      manual_trace_reader_copy: buildManualTraceReaderCopy(exportReadyTraceSummary, missingEvidenceSummary, traceCards),
      reader_safety_contract: Object.freeze({
        evidence_trace_reader_only: true,
        metadata_only: true,
        manual_operator_review_required: true,
        no_auto_trace_resolution: true,
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
  function renderAdapterReplayReviewPackEvidenceTraceReader(target, options = {}){
    const el = typeof target === 'string' && global.document ? global.document.querySelector(target) : target;
    if (!el) return null;
    const reader = buildAdapterReplayReviewPackEvidenceTraceReader(options);
    el.innerHTML = `
      <div class="adapterReplayEvidenceTraceReaderPanel" data-browser-qa="adapter-replay-review-pack-evidence-trace-reader-panel">
        <div class="miniGrid">
          <span><strong>${reader.export_ready_trace_summary.trace_cards}</strong><small>trace cards</small></span>
          <span><strong>${reader.export_ready_trace_summary.blocking_trace_cards}</strong><small>blocking</small></span>
          <span><strong>${reader.export_ready_trace_summary.total_trace_links}</strong><small>trace links</small></span>
          <span><strong>${reader.export_ready_trace_summary.readiness_verdict}</strong><small>verdict</small></span>
        </div>
        <ol class="compactList adapterReplayEvidenceTraceReaderCards">
          ${reader.trace_cards.slice(0, 4).map((card) => `<li>${card.action_id}: ${card.recommended_next_action}</li>`).join('')}
        </ol>
      </div>`;
    el.setAttribute('data-evidence-trace-reader-ready', 'true');
    el.setAttribute('data-evidence-trace-card-count', String(reader.trace_cards.length));
    return reader;
  }
  root.adapterReplayReviewPackEvidenceTraceReader = Object.freeze({
    VERSION,
    MILESTONE,
    MODEL,
    WORKFLOW_BASELINE,
    DRILLDOWN_BASELINE,
    REVIEW_PACK_BASELINE,
    buildAdapterReplayReviewPackEvidenceTraceReader,
    renderAdapterReplayReviewPackEvidenceTraceReader,
    BOUNDARY_FLAGS
  });
})(typeof window !== 'undefined' ? window : globalThis);
