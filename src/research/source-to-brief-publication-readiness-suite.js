/* Jarbou3i Research Engine source-to-brief publication readiness suite v1.4.0-alpha.42. */
/* Metadata-only publication readiness suite. No network calls, provider execution, OAuth/token lifecycle, backend/storage/source behavior expansion, status persistence, batch mutation, automatic verification, automatic signoff, automatic export lock, cryptographic signature claim, or publication permission action. */
(function(global){
  'use strict';
  const root = global.Jarbou3iResearchModules = global.Jarbou3iResearchModules || {};

  const VERSION = '1.4.0-alpha.42';
  const MILESTONE = 'v1.4.0-alpha.42 — Manual Workflow UX Consolidation';
  const MODEL = 'manual_workflow_ux_consolidation.v1';
  const SOURCE_TO_BRIEF_BASELINE = '1.3.0';
  const CONTINUITY_CONSOLE_BASELINE = '1.4.0-alpha.38';
  const CONTROL_ROOM_BASELINE = '1.4.0-alpha.39';
  const COMPACT_NAVIGATION_BASELINE = '1.4.0-alpha.37';
  const FIXED_GENERATED_AT = '2026-06-01T00:00:00.000Z';

  const BOUNDARY_FLAGS = Object.freeze({
    manual_workflow_ux_consolidation_only: true,
    metadata_preview_only: true,
    control_room_backed: true,
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
  function freezeRows(rows){ return Object.freeze(rows.map((row) => Object.freeze(row))); }
  function num(value, fallback = 0){ const n = Number(value); return Number.isFinite(n) ? n : fallback; }
  function clamp(value, min, max){ return Math.max(min, Math.min(max, value)); }

  function getControlRoom(options = {}){
    if (options.control_room) return options.control_room;
    const mod = root.sourceToBriefOperatorControlRoom;
    if (mod && typeof mod.buildSourceToBriefOperatorControlRoom === 'function') {
      return mod.buildSourceToBriefOperatorControlRoom(options);
    }
    throw new Error('Source-to-brief publication readiness suite requires source-to-brief operator control room metadata.');
  }

  function publicationSeverity(score, blockerCount){
    if (blockerCount >= 3 || score < 45) return 'high';
    if (blockerCount > 0 || score < 75) return 'medium';
    return 'low';
  }

  function buildPublicationRiskMatrix(controlRoom){
    const scorecard = asRecord(controlRoom.readiness_scorecard);
    const blockers = asArray(controlRoom.blocker_register);
    const lanes = asArray(controlRoom.intervention_lanes);
    const blockerCount = blockers.filter((b)=>asRecord(b).blocks_export !== false).length;
    const readinessScore = num(scorecard.readiness_score, 0);
    return freezeRows([
      {
        risk_id:'unsupported-or-undercovered-claims',
        label:'Unsupported or undercovered claims',
        severity: publicationSeverity(readinessScore, blockerCount),
        blocker_count: blockerCount,
        affected_area:'claims/evidence',
        publication_impact:'Blocks publication until each material claim is supported, revised, or explicitly deferred.',
        next_operator_action:'Use the blocker map and source coverage digest to close unsupported claims manually.',
        is_preview_only:true
      },
      {
        risk_id:'claim-boundary-overreach',
        label:'Claim-boundary overreach',
        severity:'high',
        blocker_count: 1,
        affected_area:'claim language',
        publication_impact:'Prevents the brief from implying verification, signoff, or publication permission not performed by a human.',
        next_operator_action:'Downgrade absolute claims, mark uncertainty, and keep verification/signoff/publication permission unclaimed.',
        is_preview_only:true
      },
      {
        risk_id:'source-coverage-imbalance',
        label:'Source coverage imbalance',
        severity: lanes.some((lane)=>asRecord(lane).lane_id === 'evidence-gap-closure' && num(asRecord(lane).blocker_count)>0) ? 'medium' : 'low',
        blocker_count: lanes.reduce((sum,lane)=>sum + (asRecord(lane).lane_id === 'evidence-gap-closure' ? num(asRecord(lane).blocker_count) : 0), 0),
        affected_area:'source coverage',
        publication_impact:'Weakens confidence when official, academic, counter-evidence, or recent-source coverage is incomplete.',
        next_operator_action:'Review source coverage by type and add manual deferrals where source material is missing.',
        is_preview_only:true
      },
      {
        risk_id:'operator-decision-missing',
        label:'Operator publication decision missing',
        severity:'medium',
        blocker_count: 1,
        affected_area:'operator review',
        publication_impact:'The system may prepare a report, but publication remains blocked until a human explicitly decides.',
        next_operator_action:'Record a manual publish / hold / revise recommendation without claiming automatic permission.',
        is_preview_only:true
      }
    ]);
  }

  function buildClaimBoundaryChecklist(controlRoom){
    const summary = asRecord(controlRoom.export_control_room_summary);
    return freezeRows([
      { check_id:'no-verification-claim', label:'No automatic verification claim', passed: summary.verification_claimed === false, required_operator_action:'Keep all source verification as manual-review-required.', publication_blocker: summary.verification_claimed !== false, is_preview_only:true },
      { check_id:'no-signoff-claim', label:'No automatic signoff claim', passed: summary.signoff_performed === false, required_operator_action:'Do not present the brief as signed off until a human signs manually.', publication_blocker: summary.signoff_performed !== false, is_preview_only:true },
      { check_id:'no-export-lock-claim', label:'No automatic export-lock claim', passed: summary.export_lock_performed === false, required_operator_action:'Keep export lock as a manual readiness decision.', publication_blocker: summary.export_lock_performed !== false, is_preview_only:true },
      { check_id:'no-publication-permission-claim', label:'No publication permission claim', passed: summary.publication_permission_claimed === false, required_operator_action:'Do not imply publication authorization from the tool.', publication_blocker: summary.publication_permission_claimed !== false, is_preview_only:true },
      { check_id:'manual-review-required', label:'Manual review required remains visible', passed: summary.manual_review_required === true, required_operator_action:'Keep manual review visible in the publication readiness report.', publication_blocker: summary.manual_review_required !== true, is_preview_only:true }
    ]);
  }

  function buildSourceCoverageDigest(controlRoom){
    const stageBoard = asArray(controlRoom.stage_board);
    const gaps = stageBoard.find((stage)=>asRecord(stage).stage_id === 'evidence-gaps') || {};
    const repair = stageBoard.find((stage)=>asRecord(stage).stage_id === 'repair-state') || {};
    const blockerCount = num(asRecord(gaps).blocker_count) + num(asRecord(repair).blocker_count);
    const sufficiency = blockerCount === 0 ? 'sufficient_for_manual_review' : blockerCount <= 2 ? 'partially_sufficient' : 'insufficient';
    return Object.freeze({
      digest_id:'source-coverage-digest',
      sufficiency_band:sufficiency,
      unresolved_gap_count:num(asRecord(gaps).blocker_count),
      open_repair_count:num(asRecord(repair).blocker_count),
      source_coverage_ready_for_publication:false,
      source_coverage_ready_for_manual_review:blockerCount === 0,
      source_sufficiency_verdict: blockerCount === 0 ? 'Manual review may proceed; publication still requires explicit human decision.' : 'Publication blocked until evidence gaps and repair items are resolved or explicitly deferred.',
      is_preview_only:true
    });
  }

  function buildUnresolvedGapBlockerMap(controlRoom){
    const blockers = asArray(controlRoom.blocker_register);
    const lanes = asArray(controlRoom.intervention_lanes);
    const rows = blockers.map((blocker, index) => {
      const rec = asRecord(blocker);
      const lane = lanes.find((item)=>asRecord(item).lane_id === rec.mapped_lane) || {};
      return {
        blocker_id: asString(rec.blocker_id, `blocker-${index+1}`),
        mapped_lane: asString(rec.mapped_lane, 'operator-review'),
        severity: asString(rec.severity, 'medium'),
        blocks_publication: rec.blocks_export !== false,
        blocks_export: rec.blocks_export !== false,
        source: asString(rec.source, 'control_room'),
        label: asString(rec.label, 'Publication blocker'),
        next_operator_action: asString(rec.next_operator_action, asString(asRecord(lane).recommended_operator_action, 'Review manually.')),
        is_preview_only:true
      };
    });
    if (!rows.length) {
      rows.push({ blocker_id:'manual-publication-decision-required', mapped_lane:'publication-review', severity:'medium', blocks_publication:true, blocks_export:false, source:'publication_readiness_suite', label:'Manual publication decision required', next_operator_action:'Record an explicit human publication decision before publishing.', is_preview_only:true });
    }
    return freezeRows(rows);
  }

  function buildEvidenceSufficiencyBands(digest, riskMatrix){
    const riskCount = riskMatrix.filter((risk)=>asRecord(risk).severity === 'high').length;
    return freezeRows([
      { band_id:'ready-for-export-review', label:'Ready for export review', active:digest.unresolved_gap_count === 0 && digest.open_repair_count === 0, definition:'No open evidence gaps or repair items remain, but manual signoff and publication authorization are still required.', is_preview_only:true },
      { band_id:'needs-source-repair', label:'Needs source repair', active:digest.unresolved_gap_count > 0 || digest.open_repair_count > 0, definition:'Open gaps or repair items must be resolved, revised, or explicitly deferred before publication.', is_preview_only:true },
      { band_id:'high-risk-publication', label:'High-risk publication', active:riskCount > 0, definition:'At least one claim-boundary or coverage risk can create false certainty if published unchanged.', is_preview_only:true },
      { band_id:'manual-decision-required', label:'Manual decision required', active:true, definition:'The tool never grants publication permission or claims automatic verification.', is_preview_only:true }
    ]);
  }

  function buildOperatorPublicationDecisionSummary(riskMatrix, checklist, digest, blockerMap){
    const blockingRisks = riskMatrix.filter((risk)=>num(asRecord(risk).blocker_count)>0 || asRecord(risk).severity === 'high').length;
    const checklistBlockers = checklist.filter((check)=>asRecord(check).publication_blocker).length;
    const publicationBlockers = blockerMap.filter((blocker)=>asRecord(blocker).blocks_publication !== false).length;
    const shouldHold = blockingRisks > 0 || checklistBlockers > 0 || publicationBlockers > 0 || digest.sufficiency_band !== 'sufficient_for_manual_review';
    return Object.freeze({
      decision_id:'operator-publication-decision-summary',
      recommended_publication_decision: shouldHold ? 'hold_for_manual_repair' : 'ready_for_manual_publication_review',
      publication_blocker_count: publicationBlockers + checklistBlockers,
      blocking_risk_count: blockingRisks,
      evidence_sufficiency_band:digest.sufficiency_band,
      manual_review_required:true,
      safe_to_publish:false,
      verification_claimed:false,
      signoff_performed:false,
      export_lock_performed:false,
      publication_permission_claimed:false,
      next_operator_action: shouldHold ? 'Resolve blockers, revise overreaching claims, or explicitly defer weak claims before publication review.' : 'Perform final manual publication review; do not treat the suite as publication permission.',
      is_preview_only:true
    });
  }

  function buildReadinessReport(controlRoom, riskMatrix, checklist, digest, blockerMap, sufficiencyBands, decisionSummary){
    return Object.freeze({
      report_id:'source-to-brief-publication-readiness-report',
      generated_at: FIXED_GENERATED_AT,
      source_control_room_version: asString(controlRoom.source_to_brief_operator_control_room_version, CONTROL_ROOM_BASELINE),
      publication_risk_count:riskMatrix.length,
      claim_boundary_check_count:checklist.length,
      unresolved_gap_blocker_count:blockerMap.length,
      evidence_sufficiency_band:digest.sufficiency_band,
      recommended_publication_decision:decisionSummary.recommended_publication_decision,
      manual_review_required:true,
      safe_to_publish:false,
      verification_claimed:false,
      signoff_performed:false,
      export_lock_performed:false,
      publication_permission_claimed:false,
      export_ready:true,
      export_allowed:false,
      is_preview_only:true
    });
  }

  function buildManualCopy(decisionSummary, digest, blockerMap){
    return [
      'Source-to-brief publication readiness verdict',
      `Decision: ${decisionSummary.recommended_publication_decision}`,
      `Evidence sufficiency: ${digest.sufficiency_band}`,
      `Publication blockers: ${decisionSummary.publication_blocker_count}`,
      `Open blocker map entries: ${blockerMap.length}`,
      'Boundaries: no live provider calls, no live source fetching, no automatic verification, no automatic signoff, no export lock, no publication permission claim.'
    ].join('\n');
  }

  function buildSourceToBriefPublicationReadinessSuite(options = {}){
    const controlRoom = getControlRoom(options);
    const riskMatrix = buildPublicationRiskMatrix(controlRoom);
    const checklist = buildClaimBoundaryChecklist(controlRoom);
    const digest = buildSourceCoverageDigest(controlRoom);
    const blockerMap = buildUnresolvedGapBlockerMap(controlRoom);
    const sufficiencyBands = buildEvidenceSufficiencyBands(digest, riskMatrix);
    const decisionSummary = buildOperatorPublicationDecisionSummary(riskMatrix, checklist, digest, blockerMap);
    const readinessReport = buildReadinessReport(controlRoom, riskMatrix, checklist, digest, blockerMap, sufficiencyBands, decisionSummary);
    return Object.freeze({
      manual_workflow_ux_consolidation_version: VERSION,
      milestone: MILESTONE,
      model: MODEL,
      source_to_brief_baseline: SOURCE_TO_BRIEF_BASELINE,
      continuity_console_baseline: CONTINUITY_CONSOLE_BASELINE,
      control_room_baseline: CONTROL_ROOM_BASELINE,
      compact_navigation_baseline: COMPACT_NAVIGATION_BASELINE,
      generated_at: asString(options.generated_at, FIXED_GENERATED_AT),
      publication_readiness_ready: true,
      safe_metadata_only: true,
      publication_risk_matrix: riskMatrix,
      claim_boundary_checklist: checklist,
      source_coverage_digest: digest,
      unresolved_gap_blocker_map: blockerMap,
      evidence_sufficiency_bands: sufficiencyBands,
      operator_publication_decision_summary: decisionSummary,
      export_readiness_report: readinessReport,
      next_operator_action: decisionSummary.next_operator_action,
      manual_publication_readiness_copy: buildManualCopy(decisionSummary, digest, blockerMap),
      publication_readiness_safety_contract: Object.freeze({
        manual_workflow_ux_consolidation_only: true,
        metadata_only: true,
        no_live_fetching: true,
        no_provider_execution: true,
        no_auto_verification: true,
        no_auto_signoff: true,
        no_auto_export_lock: true,
        no_publication_permission_claim: true,
        no_status_persistence: true,
        no_batch_mutation: true
      }),
      boundary_flags: BOUNDARY_FLAGS
    });
  }

  root.sourceToBriefPublicationReadinessSuite = Object.freeze({
    VERSION,
    MILESTONE,
    MODEL,
    SOURCE_TO_BRIEF_BASELINE,
    CONTINUITY_CONSOLE_BASELINE,
    CONTROL_ROOM_BASELINE,
    COMPACT_NAVIGATION_BASELINE,
    BOUNDARY_FLAGS,
    buildSourceToBriefPublicationReadinessSuite
  });
})(typeof window !== 'undefined' ? window : globalThis);
