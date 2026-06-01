/* Jarbou3i Research Engine adapter replay review pack operator review console v1.4.0-alpha.37. */
/* Metadata-only operator review console. No network calls, provider execution, OAuth/token lifecycle, backend/storage/source behavior expansion, or status persistence. */
(function(global){
  'use strict';
  const root = global.Jarbou3iResearchModules = global.Jarbou3iResearchModules || {};

  const VERSION = '1.4.0-alpha.37';
  const MILESTONE = 'v1.4.0-alpha.37 — Adapter Replay Review Pack Compact Navigation UX';
  const MODEL = 'adapter_replay_review_pack_compact_navigation_ux.v1';
  const HANDOFF_DOSSIER_BASELINE = '1.4.0-alpha.35';
  const TRIAGE_WORKBENCH_BASELINE = '1.4.0-alpha.34';
  const DECISION_QUEUE_BASELINE = '1.4.0-alpha.33';
  const TRACE_READER_BASELINE = '1.4.0-alpha.32';
  const REVIEW_PACK_BASELINE = '1.4.0-alpha.28';
  const FIXED_GENERATED_AT = '2026-06-01T00:00:00.000Z';

  const BOUNDARY_FLAGS = Object.freeze({
    operator_review_console_only: true,
    metadata_preview_only: true,
    deterministic_handoff_dossier_backed: true,
    no_network_replay_only: true,
    manual_operator_review_required: true,
    review_console_navigation_only: true,
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
    publication_permission_claimed: false,
    status_persistence_enabled: false,
    batch_mutation_enabled: false
  });

  function asRecord(value){ return Object.prototype.toString.call(value) === '[object Object]' ? value : {}; }
  function asArray(value){ return Array.isArray(value) ? value : []; }
  function asString(value, fallback){ return typeof value === 'string' && value.trim() ? value.trim() : fallback; }
  function freezeRows(rows){ return Object.freeze(rows.map((row) => Object.freeze(row))); }

  function getHandoffDossier(options = {}){
    if (options.handoff_dossier) return options.handoff_dossier;
    const mod = root.adapterReplayReviewPackHandoffDossier;
    if (mod && typeof mod.buildAdapterReplayReviewPackHandoffDossier === 'function') {
      return mod.buildAdapterReplayReviewPackHandoffDossier(options);
    }
    return null;
  }
  function getTriageWorkbench(options = {}){
    if (options.triage_workbench) return options.triage_workbench;
    const mod = root.adapterReplayReviewPackTriageWorkbench;
    if (mod && typeof mod.buildAdapterReplayReviewPackTriageWorkbench === 'function') {
      return mod.buildAdapterReplayReviewPackTriageWorkbench(options);
    }
    return null;
  }
  function getTraceReader(options = {}){
    if (options.evidence_trace_reader) return options.evidence_trace_reader;
    const mod = root.adapterReplayReviewPackEvidenceTraceReader;
    if (mod && typeof mod.buildAdapterReplayReviewPackEvidenceTraceReader === 'function') {
      return mod.buildAdapterReplayReviewPackEvidenceTraceReader(options);
    }
    return null;
  }
  function makeSection(id, title, summary, payload){
    return Object.freeze({ section_id: id, title, summary, payload: Object.freeze(payload || {}), manual_review_required: true });
  }
  function buildReviewTabs(dossier, workbench, traceReader){
    const sections = asArray(dossier.dossier_sections);
    const tabs = sections.map((section, index) => Object.freeze({
      tab_id: `review-${String(index + 1).padStart(2, '0')}-${section.section_id}`,
      source_section_id: section.section_id,
      label: section.title,
      summary: section.summary,
      badge: section.section_id.includes('blocker') ? `${asArray(dossier.blocker_appendix).length} blockers` : 'manual',
      default_open: index === 0,
      manual_review_required: true
    }));
    return Object.freeze([
      Object.freeze({ tab_id: 'review-overview', source_section_id: 'console-overview', label: 'Console overview', summary: 'Unified review entry point for queue, triage, trace, and handoff dossier.', badge: 'overview', default_open: true, manual_review_required: true }),
      ...tabs,
      Object.freeze({ tab_id: 'review-trace-navigation', source_section_id: 'trace-navigation', label: 'Trace navigation', summary: 'Jump from triage and handoff items to local evidence trace IDs.', badge: `${asArray(traceReader.trace_cards).length || asArray(dossier.evidence_trace_digest).length} traces`, default_open: false, manual_review_required: true }),
      Object.freeze({ tab_id: 'review-batch-controls', source_section_id: 'batch-controls', label: 'Batch controls', summary: 'Preview-only batch review actions; no status mutation or persistence.', badge: `${asArray(workbench.triage_batches).length} batches`, default_open: false, manual_review_required: true })
    ]);
  }
  function buildUnifiedReviewCards(dossier, workbench){
    const items = asArray(workbench.triage_items);
    const appendix = asArray(dossier.blocker_appendix);
    return freezeRows(items.map((item, index) => {
      const blocker = appendix.find((entry) => entry.triage_id === item.triage_id || entry.queue_id === item.queue_id);
      return {
        card_id: `review-card-${String(index + 1).padStart(2, '0')}`,
        triage_id: item.triage_id,
        queue_id: item.queue_id,
        priority_band: item.priority_band || 'unknown',
        batch_status: item.batch_status || 'manual_review_required',
        blocker_type: blocker?.blocker_type || item.blocker_type || 'none',
        blocker_reason: blocker?.blocker_reason || item.inline_trace_preview?.blocker_reason || 'No blocker recorded.',
        evidence_completeness: item.evidence_completeness || item.inline_trace_preview?.evidence_completeness || 'unknown',
        trace_ids: Object.freeze(asArray(item.inline_trace_preview?.trace_ids)),
        recommended_next_action: item.recommended_next_action || blocker?.recommended_resolution || 'Inspect review card manually.',
        handoff_ready: item.batch_status === 'ready_for_handoff_review' && !blocker,
        manual_review_required: true,
        status_mutation_allowed: false
      };
    }));
  }
  function buildTraceNavigation(dossier){
    return freezeRows(asArray(dossier.evidence_trace_digest).map((trace, index) => ({
      nav_id: `trace-nav-${String(index + 1).padStart(2, '0')}`,
      trace_id: trace.trace_id,
      triage_id: trace.triage_id,
      queue_id: trace.queue_id,
      label: `${trace.trace_id} → ${trace.triage_id}`,
      evidence_completeness: trace.evidence_completeness || 'unknown',
      network_fetch_performed: false,
      verification_claimed: false,
      manual_inspection_required: true
    })));
  }
  function buildBatchControls(workbench){
    return freezeRows(asArray(workbench.triage_batches).map((batch, index) => ({
      control_id: `batch-control-${String(index + 1).padStart(2, '0')}`,
      batch_id: batch.batch_id || `batch-${index + 1}`,
      label: batch.label || batch.batch_status || 'Manual batch review',
      batch_status: batch.batch_status || 'manual_review_required',
      item_count: batch.item_count || asArray(batch.triage_ids).length || 0,
      recommended_action: batch.recommended_action || 'Review batch manually.',
      available_manual_actions: Object.freeze(['inspect', 'assign_reviewer', 'draft_handoff_note']),
      applies_status_mutation: false,
      persists_status: false,
      manual_review_required: true
    })));
  }
  function buildHandoffReadiness(dossier, reviewCards){
    const blockers = asArray(dossier.blocker_appendix).length;
    const readyCards = reviewCards.filter((card) => card.handoff_ready).length;
    const totalCards = reviewCards.length;
    return Object.freeze({
      readiness_verdict: blockers ? 'blocked_until_manual_resolution' : 'ready_for_manual_handoff_review',
      total_review_cards: totalCards,
      handoff_ready_cards: readyCards,
      blocker_count: blockers,
      checklist_required: asArray(dossier.operator_checklist).filter((item) => item.required).length,
      manual_review_required: true,
      safe_to_export_as_draft: true,
      safe_to_publish: false,
      export_lock_performed: false,
      verification_claimed: false
    });
  }
  function buildExportReviewConsoleSummary(dossier, readiness, reviewTabs){
    return Object.freeze({
      console_verdict: readiness.readiness_verdict,
      dossier_verdict: asRecord(dossier.export_ready_handoff_summary).dossier_verdict || 'manual_review_required',
      review_tabs: reviewTabs.length,
      blocker_count: readiness.blocker_count,
      trace_digest_rows: asArray(dossier.evidence_trace_digest).length,
      manual_review_required: true,
      export_note: 'Operator review console is metadata-only; it does not execute providers, fetch sources, verify, sign off, lock exports, persist status, or publish.',
      safe_to_export_as_draft: true,
      safe_to_publish: false
    });
  }
  function buildManualConsoleCopy(summary, readiness){
    return [
      `Operator review console verdict: ${summary.console_verdict}`,
      `Review tabs: ${summary.review_tabs}; blockers: ${summary.blocker_count}; trace rows: ${summary.trace_digest_rows}`,
      `Handoff readiness: ${readiness.handoff_ready_cards}/${readiness.total_review_cards} cards ready for manual handoff review`,
      `Export note: ${summary.export_note}`,
      'Boundary: review console is metadata-only; no live provider calls, source fetching, verification, signoff, export lock, status persistence, or publication permission.'
    ].join('\n');
  }
  function buildAdapterReplayReviewPackOperatorReviewConsole(options = {}){
    const generatedAt = asString(options.generated_at, asString(options.now, FIXED_GENERATED_AT));
    const dossier = asRecord(getHandoffDossier(options));
    const workbench = asRecord(getTriageWorkbench(options));
    const traceReader = asRecord(getTraceReader(options));
    const reviewTabs = buildReviewTabs(dossier, workbench, traceReader);
    const reviewCards = buildUnifiedReviewCards(dossier, workbench);
    const traceNavigation = buildTraceNavigation(dossier);
    const batchControls = buildBatchControls(workbench);
    const handoffReadiness = buildHandoffReadiness(dossier, reviewCards);
    const exportSummary = buildExportReviewConsoleSummary(dossier, handoffReadiness, reviewTabs);
    const consoleSections = Object.freeze([
      makeSection('console-overview', 'Console overview', 'Single operator review surface over queue, triage, traces, and dossier.', { handoff_readiness: handoffReadiness }),
      makeSection('decision-queue-review', 'Decision queue review', 'Prioritized replay cases with blocker and evidence completeness fields.', { review_cards: reviewCards }),
      makeSection('triage-batch-controls', 'Triage batch controls', 'Preview-only batch controls and recommended manual actions.', { batch_controls: batchControls }),
      makeSection('trace-navigation', 'Trace navigation', 'Local trace navigation without live fetching or verification claims.', { trace_navigation: traceNavigation }),
      makeSection('handoff-dossier-summary', 'Handoff dossier summary', 'Dossier verdict, checklist, blocker appendix, and export-ready summary.', { dossier_summary: dossier.export_ready_handoff_summary || {} }),
      makeSection('export-review-summary', 'Export review summary', 'Draft export summary for manual review; no publication permission.', { export_summary: exportSummary })
    ]);
    return Object.freeze({
      adapter_replay_review_pack_compact_navigation_ux_version: VERSION,
      milestone: MILESTONE,
      model: MODEL,
      generated_at: generatedAt,
      source_handoff_dossier_version: dossier.adapter_replay_review_pack_handoff_dossier_version || HANDOFF_DOSSIER_BASELINE,
      source_triage_workbench_version: workbench.adapter_replay_review_pack_triage_workbench_version || TRIAGE_WORKBENCH_BASELINE,
      operator_review_console_ready: true,
      safe_metadata_only: true,
      can_execute_now: false,
      console_sections: consoleSections,
      review_tabs: reviewTabs,
      unified_review_cards: reviewCards,
      trace_navigation: traceNavigation,
      batch_review_controls: batchControls,
      handoff_readiness: handoffReadiness,
      export_review_console_summary: exportSummary,
      manual_operator_review_console_copy: buildManualConsoleCopy(exportSummary, handoffReadiness),
      operator_review_console_safety_contract: Object.freeze({
        operator_review_console_only: true,
        metadata_only: true,
        manual_operator_review_required: true,
        no_auto_verification: true,
        no_auto_signoff: true,
        no_auto_export_lock: true,
        no_status_persistence: true,
        no_batch_mutation: true,
        no_publication_permission: true
      }),
      boundary_flags: BOUNDARY_FLAGS,
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
      publication_permission_claimed: false,
      status_persistence_enabled: false,
      batch_mutation_enabled: false
    });
  }

  root.adapterReplayReviewPackOperatorReviewConsole = Object.freeze({
    VERSION,
    MILESTONE,
    MODEL,
    HANDOFF_DOSSIER_BASELINE,
    TRIAGE_WORKBENCH_BASELINE,
    DECISION_QUEUE_BASELINE,
    TRACE_READER_BASELINE,
    REVIEW_PACK_BASELINE,
    BOUNDARY_FLAGS,
    buildAdapterReplayReviewPackOperatorReviewConsole
  });
})(typeof window !== 'undefined' ? window : globalThis);
