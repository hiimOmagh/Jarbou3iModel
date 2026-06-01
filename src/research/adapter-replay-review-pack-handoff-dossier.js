/* Jarbou3i Research Engine adapter replay review pack handoff dossier v1.4.0-alpha.35. */
/* Metadata-only handoff dossier. No network calls, no provider execution, no OAuth/token lifecycle, no backend/storage/source behavior expansion. */
(function(global){
  'use strict';
  const root = global.Jarbou3iResearchModules = global.Jarbou3iResearchModules || {};

  const VERSION = '1.4.0-alpha.35';
  const MILESTONE = 'v1.4.0-alpha.35 — Adapter Replay Review Pack Handoff Dossier';
  const MODEL = 'adapter_replay_review_pack_handoff_dossier.v1';
  const TRIAGE_WORKBENCH_BASELINE = '1.4.0-alpha.34';
  const DECISION_QUEUE_BASELINE = '1.4.0-alpha.33';
  const TRACE_READER_BASELINE = '1.4.0-alpha.32';
  const REVIEW_PACK_BASELINE = '1.4.0-alpha.28';
  const FIXED_GENERATED_AT = '2026-06-01T00:00:00.000Z';

  const BOUNDARY_FLAGS = Object.freeze({
    handoff_dossier_only: true,
    metadata_preview_only: true,
    deterministic_triage_workbench_backed: true,
    no_network_replay_only: true,
    manual_operator_review_required: true,
    export_ready_summary_preview_only: true,
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
    status_persistence_enabled: false
  });

  function asRecord(value){ return Object.prototype.toString.call(value) === '[object Object]' ? value : {}; }
  function asArray(value){ return Array.isArray(value) ? value : []; }
  function asString(value, fallback){ return typeof value === 'string' && value.trim() ? value.trim() : fallback; }
  function unique(values){ return Object.freeze([...new Set(values.filter(Boolean))]); }
  function getTriageWorkbench(options = {}){
    if (options.triage_workbench) return options.triage_workbench;
    const mod = root.adapterReplayReviewPackTriageWorkbench;
    if (mod && typeof mod.buildAdapterReplayReviewPackTriageWorkbench === 'function') {
      return mod.buildAdapterReplayReviewPackTriageWorkbench(options);
    }
    return null;
  }
  function makeDossierSection(id, title, summary, payload){
    return Object.freeze({ section_id: id, title, summary, payload: Object.freeze(payload || {}), manual_review_required: true });
  }
  function buildBlockerAppendix(items){
    const blocked = items.filter((item) => item.batch_status === 'blocked' || item.blocker_type !== 'none');
    return Object.freeze(blocked.map((item, index) => Object.freeze({
      appendix_id: `blocker-${String(index + 1).padStart(2, '0')}`,
      triage_id: item.triage_id,
      queue_id: item.queue_id,
      blocker_type: item.blocker_type || 'unspecified',
      blocker_reason: item.inline_trace_preview?.blocker_reason || item.blocker_reason || 'Manual blocker review required.',
      evidence_completeness: item.evidence_completeness || item.inline_trace_preview?.evidence_completeness || 'unknown',
      recommended_resolution: item.recommended_next_action || 'Resolve blocker before handoff.',
      manual_resolution_required: true
    })));
  }
  function buildTraceDigest(items){
    const rows = items.flatMap((item) => asArray(item.inline_trace_preview?.trace_ids).map((traceId) => Object.freeze({
      trace_id: traceId,
      triage_id: item.triage_id,
      queue_id: item.queue_id,
      priority_band: item.priority_band,
      evidence_completeness: item.inline_trace_preview?.evidence_completeness || item.evidence_completeness || 'unknown',
      network_fetch_performed: false,
      verification_claimed: false
    })));
    return Object.freeze(rows);
  }
  function buildOperatorChecklist(summary, blockerAppendix){
    return Object.freeze([
      Object.freeze({ checklist_id: 'confirm-batch-status', label: 'Confirm batch status before handoff', required: true, complete: false }),
      Object.freeze({ checklist_id: 'review-blocker-appendix', label: 'Review blocker appendix manually', required: blockerAppendix.length > 0, complete: false }),
      Object.freeze({ checklist_id: 'inspect-trace-digest', label: 'Inspect evidence trace digest without claiming verification', required: true, complete: false }),
      Object.freeze({ checklist_id: 'approve-export-copy', label: 'Approve export-ready handoff summary manually', required: true, complete: false }),
      Object.freeze({ checklist_id: 'preserve-boundary', label: `Preserve boundary: ${summary.triage_verdict || 'manual_review_required'}; no live provider calls`, required: true, complete: false })
    ]);
  }
  function buildHandoffExportSummary(workbench, blockerAppendix, traceDigest){
    const summary = asRecord(workbench.triage_summary);
    return Object.freeze({
      dossier_verdict: blockerAppendix.length ? 'blocked_until_appendix_resolved' : summary.triage_verdict || 'manual_handoff_review_required',
      source_triage_verdict: summary.triage_verdict || 'unknown',
      total_triage_items: summary.total_triage_items || asArray(workbench.triage_items).length,
      blocker_appendix_items: blockerAppendix.length,
      evidence_trace_digest_rows: traceDigest.length,
      manual_review_required: true,
      export_note: 'Handoff dossier is metadata-only; it does not verify, sign, lock, publish, fetch sources, persist status, or execute providers.',
      safe_to_export_as_draft: true,
      safe_to_publish: false
    });
  }
  function buildManualHandoffCopy(exportSummary, checklist){
    const required = checklist.filter((item) => item.required).length;
    return [
      `Handoff dossier verdict: ${exportSummary.dossier_verdict}`,
      `Triage items: ${exportSummary.total_triage_items}; blocker appendix: ${exportSummary.blocker_appendix_items}; trace digest rows: ${exportSummary.evidence_trace_digest_rows}`,
      `Required checklist items: ${required}`,
      `Export note: ${exportSummary.export_note}`,
      'Boundary: metadata-only handoff dossier; no live provider calls, source fetching, verification, signoff, export lock, status persistence, or publication permission.'
    ].join('\n');
  }
  function buildAdapterReplayReviewPackHandoffDossier(options = {}){
    const generatedAt = asString(options.generated_at, asString(options.now, FIXED_GENERATED_AT));
    const workbench = asRecord(getTriageWorkbench(options));
    const items = asArray(workbench.triage_items);
    const batches = asArray(workbench.triage_batches);
    const blockerAppendix = buildBlockerAppendix(items);
    const traceDigest = buildTraceDigest(items);
    const exportSummary = buildHandoffExportSummary(workbench, blockerAppendix, traceDigest);
    const checklist = buildOperatorChecklist(asRecord(workbench.triage_summary), blockerAppendix);
    const sections = Object.freeze([
      makeDossierSection('executive-summary', 'Executive summary', 'Operator-facing dossier verdict and release boundary.', { verdict: exportSummary.dossier_verdict, manual_review_required: true }),
      makeDossierSection('batch-triage-snapshot', 'Batch triage snapshot', 'Batch counts and recommended manual batch actions.', { batches }),
      makeDossierSection('blocker-appendix', 'Blocker appendix', 'Unresolved blocker inventory for manual resolution.', { blocker_appendix: blockerAppendix }),
      makeDossierSection('evidence-trace-digest', 'Evidence trace digest', 'Trace IDs copied from local replay metadata without fetching sources.', { trace_digest: traceDigest }),
      makeDossierSection('operator-checklist', 'Operator checklist', 'Manual handoff checklist; no automatic approval.', { checklist }),
      makeDossierSection('export-ready-handoff-summary', 'Export-ready handoff summary', 'Draft handoff export summary for manual review.', { export_summary: exportSummary })
    ]);
    return Object.freeze({
      adapter_replay_review_pack_handoff_dossier_version: VERSION,
      milestone: MILESTONE,
      model: MODEL,
      generated_at: generatedAt,
      source_triage_workbench_version: workbench.adapter_replay_review_pack_triage_workbench_version || TRIAGE_WORKBENCH_BASELINE,
      handoff_dossier_ready: true,
      safe_metadata_only: true,
      can_execute_now: false,
      dossier_sections: sections,
      batch_triage_snapshot: Object.freeze(batches),
      blocker_appendix: blockerAppendix,
      evidence_trace_digest: traceDigest,
      operator_checklist: checklist,
      export_ready_handoff_summary: exportSummary,
      manual_handoff_dossier_copy: buildManualHandoffCopy(exportSummary, checklist),
      handoff_safety_contract: Object.freeze({
        handoff_dossier_only: true,
        metadata_only: true,
        manual_operator_review_required: true,
        no_auto_verification: true,
        no_auto_signoff: true,
        no_auto_export_lock: true,
        no_status_persistence: true,
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
      status_persistence_enabled: false
    });
  }

  root.adapterReplayReviewPackHandoffDossier = Object.freeze({
    VERSION,
    MILESTONE,
    MODEL,
    TRIAGE_WORKBENCH_BASELINE,
    DECISION_QUEUE_BASELINE,
    TRACE_READER_BASELINE,
    REVIEW_PACK_BASELINE,
    BOUNDARY_FLAGS,
    buildAdapterReplayReviewPackHandoffDossier
  });
})(typeof window !== 'undefined' ? window : globalThis);
