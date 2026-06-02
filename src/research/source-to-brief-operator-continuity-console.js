/* Jarbou3i Research Engine source-to-brief operator continuity console v1.4.0-alpha.43. */
/* Metadata-only continuity surface. No network calls, provider execution, OAuth/token lifecycle, backend/storage/source behavior expansion, status persistence, or UI-triggered mutation. */
(function(global){
  'use strict';
  const root = global.Jarbou3iResearchModules = global.Jarbou3iResearchModules || {};

  const VERSION = '1.4.0-alpha.43';
  const MILESTONE = 'v1.4.0-alpha.43 — Targeted Hosted Evidence Capture';
  const MODEL = 'source_to_brief_operator_continuity_console.v1';
  const SOURCE_TO_BRIEF_BASELINE = '1.3.0';
  const OPERATOR_REVIEW_CONSOLE_BASELINE = '1.4.0-alpha.36';
  const COMPACT_NAVIGATION_BASELINE = '1.4.0-alpha.37';
  const FIXED_GENERATED_AT = '2026-06-01T00:00:00.000Z';

  const BOUNDARY_FLAGS = Object.freeze({
    source_to_brief_continuity_console_only: true,
    metadata_preview_only: true,
    source_to_brief_workbench_backed: true,
    operator_review_layer_continuity: true,
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
    source_behavior_expanded: false,
    automatic_source_verification_claimed: false,
    automatic_signoff_performed: false,
    automatic_export_lock_performed: false,
    cryptographic_signature_claimed: false,
    publication_permission_claimed: false,
    status_persistence_enabled: false,
    batch_mutation_enabled: false,
    navigation_state_persistence_enabled: false
  });

  function asRecord(value){ return Object.prototype.toString.call(value) === '[object Object]' ? value : {}; }
  function asArray(value){ return Array.isArray(value) ? value : []; }
  function asString(value, fallback){ return typeof value === 'string' && value.trim() ? value.trim() : fallback; }
  function count(value){ return asArray(value).length; }
  function freezeRows(rows){ return Object.freeze(rows.map((row) => Object.freeze(row))); }

  function getSourceToBriefWorkbench(options = {}){
    if (options.source_to_brief_workbench) return options.source_to_brief_workbench;
    if (options.workbench) return options.workbench;
    const api = root.sourceToBriefWorkbench;
    if (api && typeof api.buildSourceToBriefWorkbench === 'function') {
      return api.buildSourceToBriefWorkbench(options.packet || {}, {
        version: SOURCE_TO_BRIEF_BASELINE,
        now: options.generated_at || FIXED_GENERATED_AT
      });
    }
    return {};
  }

  function classifyBriefStage(workbench){
    const preview = asRecord(workbench.brief_assembly_preview_diff);
    const signoff = asRecord(workbench.operator_signoff_state);
    const lock = asRecord(workbench.export_lock_ledger);
    const publication = asRecord(workbench.brief_publication_pack_v4);
    if (lock.export_locked === true) return 'export_locked';
    if (signoff.operator_signed_off === true) return 'signed_off_ready_for_export_lock';
    if (preview.ready_to_export === true || asString(preview.diff_gate, '').includes('ready')) return 'preview_review_ready';
    if (publication.publication_pack_status === 'manual_publication_review_required') return 'publication_review_required';
    return 'manual_review_in_progress';
  }

  function buildBriefStageSummary(workbench){
    const stage = classifyBriefStage(workbench);
    const preview = asRecord(workbench.brief_assembly_preview_diff);
    const checklist = asRecord(workbench.export_readiness_checklist);
    return Object.freeze({
      stage_id: stage,
      label: stage.replaceAll('_', ' '),
      current_brief_stage: stage,
      ready_to_export: preview.ready_to_export === true || checklist.ready_to_export === true,
      manual_review_required: true,
      next_stage_hint: stage === 'export_locked' ? 'prepare publication review copy' : 'resolve gaps before export lock',
      is_preview_only: true
    });
  }

  function buildEvidenceGapSummary(workbench){
    const gapQueue = asRecord(workbench.source_to_claim_gap_closure_queue);
    const sourceGaps = asRecord(workbench.source_gaps);
    const diagnostics = asRecord(workbench.review_quality_diagnostics);
    const items = asArray(gapQueue.items);
    const countFromQueue = Number(gapQueue.required_before_export_count || 0);
    return Object.freeze({
      summary_id: 'unresolved-evidence-gaps',
      unresolved_gap_count: countFromQueue || count(items) || Number(sourceGaps.count || 0),
      source_gap_warning_count: Number(sourceGaps.count || sourceGaps.warning_count || 0),
      diagnostic_blocker_count: Number(diagnostics.blocker_count || diagnostics.warning_count || 0),
      categories: Object.freeze([...new Set(items.map((item) => asString(asRecord(item).category, 'uncategorized')))]),
      required_before_export: countFromQueue > 0,
      manual_repair_required: true,
      is_preview_only: true
    });
  }

  function buildRepairStateOverview(workbench){
    const repairQueue = asRecord(workbench.diagnostic_repair_queue);
    const gapQueue = asRecord(workbench.source_to_claim_gap_closure_queue);
    const risks = asRecord(workbench.export_risk_resolution);
    return Object.freeze({
      overview_id: 'source-to-claim-repair-state',
      repair_queue_gate: asString(repairQueue.release_gate, 'manual_repair_queue_review_required'),
      gap_closure_gate: asString(gapQueue.release_gate, 'source_to_claim_gap_closure_review_required'),
      open_repair_count: Number(repairQueue.required_before_export_count || repairQueue.open_item_count || 0),
      open_gap_count: Number(gapQueue.required_before_export_count || 0),
      export_risk_count: count(risks.risk_items),
      next_repair_action: Number(gapQueue.required_before_export_count || 0) > 0 ? 'close source-to-claim gaps first' : 'review diagnostic repair queue',
      manual_repair_required: true,
      is_preview_only: true
    });
  }

  function buildSignoffReadiness(workbench){
    const signoff = asRecord(workbench.operator_signoff_state);
    const exportSignoff = asRecord(workbench.export_review_signoff);
    const lock = asRecord(workbench.export_lock_ledger);
    return Object.freeze({
      readiness_id: 'operator-signoff-readiness',
      current_state: asString(signoff.current_state || exportSignoff.signoff_gate, 'awaiting_operator_confirmation'),
      operator_signed_off: signoff.operator_signed_off === true || exportSignoff.operator_signed_off === true,
      missing_confirmation_count: Number(signoff.missing_confirmation_count || 0),
      export_lock_status: asString(lock.lock_status, 'unlocked_manual_signoff_required'),
      export_locked: lock.export_locked === true,
      automatic_signoff_performed: false,
      automatic_export_lock_performed: false,
      manual_operator_review_required: true,
      is_preview_only: true
    });
  }

  function buildExportPublicationReadiness(workbench){
    const handoff = asRecord(workbench.signed_export_handoff_pack);
    const lockSurface = asRecord(workbench.lock_ledger_review_surface);
    const publication = asRecord(workbench.brief_publication_pack_v4);
    const publicationSummary = asRecord(publication.publication_readiness_summary);
    return Object.freeze({
      readiness_id: 'export-publication-readiness',
      handoff_status: asString(handoff.handoff_status, 'manual_handoff_review_required'),
      lock_ledger_gate: asString(lockSurface.release_gate, 'lock_ledger_review_required'),
      publication_pack_status: asString(publication.publication_pack_status, 'manual_publication_review_required'),
      publication_release_gate: asString(publicationSummary.publication_release_gate, 'manual_publication_review_required'),
      export_allowed: handoff.handoff_status === 'ready' || handoff.handoff_status === 'locked',
      publication_permission_claimed: false,
      verification_claimed: false,
      is_preview_only: true
    });
  }

  function buildContinuityRiskRail(stage, gapSummary, repairState, signoffReadiness, exportReadiness){
    const rail = [];
    if (gapSummary.unresolved_gap_count > 0) rail.push({ risk_id: 'evidence-gaps-open', label: 'Evidence gaps open', severity: 'high', next_operator_action: 'Close required source-to-claim gaps before export review.', blocks_export: true });
    if (repairState.open_repair_count > 0) rail.push({ risk_id: 'repair-queue-open', label: 'Repair queue open', severity: 'medium', next_operator_action: 'Resolve diagnostic repair items or document deferral.', blocks_export: true });
    if (!signoffReadiness.operator_signed_off) rail.push({ risk_id: 'operator-signoff-missing', label: 'Operator signoff missing', severity: 'medium', next_operator_action: 'Review required confirmations and sign off manually.', blocks_export: true });
    if (exportReadiness.publication_release_gate !== 'publication_review_ready') rail.push({ risk_id: 'publication-review-required', label: 'Publication review required', severity: 'medium', next_operator_action: 'Prepare publication review only after export lock state is safe.', blocks_export: false });
    if (!rail.length) rail.push({ risk_id: 'continuity-clear', label: 'Continuity clear for manual handoff', severity: 'low', next_operator_action: 'Prepare export-ready continuity summary for operator review.', blocks_export: false });
    return freezeRows(rail.map((item, index) => Object.assign({ order: index + 1, current_stage: stage.current_brief_stage, is_preview_only: true }, item)));
  }

  function buildNextAction(stage, gapSummary, repairState, signoffReadiness, exportReadiness){
    if (gapSummary.unresolved_gap_count > 0) return 'Close unresolved evidence gaps before export review.';
    if (repairState.open_repair_count > 0) return 'Resolve diagnostic repair queue before operator signoff.';
    if (!signoffReadiness.operator_signed_off) return 'Collect explicit operator signoff confirmations.';
    if (!exportReadiness.export_allowed) return 'Review export lock ledger and handoff pack before publication review.';
    return 'Prepare continuity summary for manual publication review.';
  }

  function buildExportSummary(stage, gapSummary, repairState, signoffReadiness, exportReadiness, riskRail){
    return Object.freeze({
      summary_id: 'source-to-brief-operator-continuity-export-summary',
      release: MILESTONE,
      generated_at: FIXED_GENERATED_AT,
      source_to_brief_baseline: SOURCE_TO_BRIEF_BASELINE,
      current_brief_stage: stage.current_brief_stage,
      unresolved_gap_count: gapSummary.unresolved_gap_count,
      open_repair_count: repairState.open_repair_count,
      operator_signed_off: signoffReadiness.operator_signed_off,
      export_allowed: exportReadiness.export_allowed,
      publication_release_gate: exportReadiness.publication_release_gate,
      continuity_risk_count: riskRail.length,
      manual_review_required: true,
      safe_to_publish: false,
      verification_claimed: false,
      signoff_performed: false,
      export_lock_performed: false,
      publication_permission_claimed: false
    });
  }

  function buildManualCopy(exportSummary, nextAction){
    return [
      'Source-to-brief continuity verdict: metadata-only continuity console is ready for manual operator review.',
      `Stage: ${exportSummary.current_brief_stage}. Evidence gaps: ${exportSummary.unresolved_gap_count}. Repair items: ${exportSummary.open_repair_count}.`,
      `Next operator action: ${nextAction}`,
      'Boundary: no live provider calls, no hidden network requests, no source fetching, no automatic verification, no automatic signoff, no export lock, and no publication permission.'
    ].join('\n');
  }

  function buildSourceToBriefOperatorContinuityConsole(options = {}){
    const workbench = getSourceToBriefWorkbench(options);
    const briefStage = buildBriefStageSummary(workbench);
    const gapSummary = buildEvidenceGapSummary(workbench);
    const repairState = buildRepairStateOverview(workbench);
    const signoffReadiness = buildSignoffReadiness(workbench);
    const exportReadiness = buildExportPublicationReadiness(workbench);
    const riskRail = buildContinuityRiskRail(briefStage, gapSummary, repairState, signoffReadiness, exportReadiness);
    const nextAction = buildNextAction(briefStage, gapSummary, repairState, signoffReadiness, exportReadiness);
    const exportSummary = buildExportSummary(briefStage, gapSummary, repairState, signoffReadiness, exportReadiness, riskRail);
    const payload = {
      source_to_brief_operator_continuity_console_version: VERSION,
      milestone: MILESTONE,
      model: MODEL,
      generated_at: asString(options.generated_at, FIXED_GENERATED_AT),
      continuity_console_ready: true,
      safe_metadata_only: true,
      source_to_brief_workbench_baseline: SOURCE_TO_BRIEF_BASELINE,
      operator_review_console_baseline: OPERATOR_REVIEW_CONSOLE_BASELINE,
      compact_navigation_baseline: COMPACT_NAVIGATION_BASELINE,
      brief_stage_summary: briefStage,
      unresolved_evidence_gap_summary: gapSummary,
      source_to_claim_repair_state: repairState,
      operator_signoff_readiness: signoffReadiness,
      export_publication_readiness: exportReadiness,
      continuity_risk_rail: riskRail,
      next_operator_action: nextAction,
      export_continuity_summary: exportSummary,
      manual_continuity_copy: buildManualCopy(exportSummary, nextAction),
      continuity_safety_contract: Object.freeze({
        source_to_brief_continuity_console_only: true,
        metadata_only: true,
        manual_operator_review_required: true,
        no_live_provider_calls: true,
        no_live_source_fetching: true,
        no_auto_verification: true,
        no_auto_signoff: true,
        no_auto_export_lock: true,
        no_publication_permission: true,
        no_status_persistence: true,
        no_batch_mutation: true,
        no_navigation_state_persistence: true
      }),
      boundary_flags: BOUNDARY_FLAGS
    };
    for (const [key, value] of Object.entries(BOUNDARY_FLAGS)) payload[key] = value;
    return Object.freeze(payload);
  }

  root.sourceToBriefOperatorContinuityConsole = Object.freeze({
    VERSION,
    MILESTONE,
    MODEL,
    SOURCE_TO_BRIEF_BASELINE,
    OPERATOR_REVIEW_CONSOLE_BASELINE,
    COMPACT_NAVIGATION_BASELINE,
    BOUNDARY_FLAGS,
    buildSourceToBriefOperatorContinuityConsole
  });
})(typeof window !== 'undefined' ? window : globalThis);
