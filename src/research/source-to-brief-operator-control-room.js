/* Jarbou3i Research Engine source-to-brief operator control room v1.4.0-alpha.40. */
/* Metadata-only source-to-brief control room. No network calls, provider execution, OAuth/token lifecycle, backend/storage/source behavior expansion, status persistence, batch mutation, or automatic signoff/export/publication action. */
(function(global){
  'use strict';
  const root = global.Jarbou3iResearchModules = global.Jarbou3iResearchModules || {};

  const VERSION = '1.4.0-alpha.40';
  const MILESTONE = 'v1.4.0-alpha.40 — Source-to-Brief Publication Readiness Suite';
  const MODEL = 'source_to_brief_operator_control_room.v1';
  const SOURCE_TO_BRIEF_BASELINE = '1.3.0';
  const CONTINUITY_CONSOLE_BASELINE = '1.4.0-alpha.38';
  const COMPACT_NAVIGATION_BASELINE = '1.4.0-alpha.37';
  const FIXED_GENERATED_AT = '2026-06-01T00:00:00.000Z';

  const BOUNDARY_FLAGS = Object.freeze({
    source_to_brief_publication_readiness_suite_only: true,
    metadata_preview_only: true,
    continuity_console_backed: true,
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

  function getContinuityConsole(options = {}){
    if (options.continuity_console) return options.continuity_console;
    const mod = root.sourceToBriefOperatorContinuityConsole;
    if (mod && typeof mod.buildSourceToBriefOperatorContinuityConsole === 'function') {
      return mod.buildSourceToBriefOperatorContinuityConsole(options);
    }
    throw new Error('Source-to-brief operator control room requires source-to-brief operator continuity console metadata.');
  }

  function laneStatus(blockerCount, ready){
    if (blockerCount > 0) return 'blocked';
    if (ready) return 'ready_for_manual_review';
    return 'needs_operator_review';
  }

  function buildStageBoard(consolePayload){
    const stage = asRecord(consolePayload.brief_stage_summary);
    const gaps = asRecord(consolePayload.unresolved_evidence_gap_summary);
    const repair = asRecord(consolePayload.source_to_claim_repair_state);
    const signoff = asRecord(consolePayload.operator_signoff_readiness);
    const publication = asRecord(consolePayload.export_publication_readiness);
    return freezeRows([
      { stage_id:'brief-stage', label:'Brief stage', value:asString(stage.current_brief_stage,'unknown'), status: stage.ready_to_export ? 'ready_for_manual_review' : 'needs_operator_review', blocker_count:0, next_operator_action:asString(stage.next_stage_hint,'review current stage'), is_preview_only:true },
      { stage_id:'evidence-gaps', label:'Evidence gaps', value:String(num(gaps.unresolved_gap_count)), status: laneStatus(num(gaps.unresolved_gap_count), false), blocker_count:num(gaps.unresolved_gap_count), next_operator_action:'Close or explicitly defer required evidence gaps.', is_preview_only:true },
      { stage_id:'repair-state', label:'Repair state', value:String(num(repair.open_repair_count)+num(repair.open_gap_count)), status: laneStatus(num(repair.open_repair_count)+num(repair.open_gap_count), false), blocker_count:num(repair.open_repair_count)+num(repair.open_gap_count), next_operator_action:asString(repair.next_repair_action,'review repair queue'), is_preview_only:true },
      { stage_id:'operator-signoff', label:'Operator signoff', value: signoff.operator_signed_off ? 'signed' : 'missing', status: signoff.operator_signed_off ? 'ready_for_manual_review' : 'blocked', blocker_count: signoff.operator_signed_off ? 0 : 1, next_operator_action:'Collect explicit manual operator signoff.', is_preview_only:true },
      { stage_id:'export-publication', label:'Export/publication', value:asString(publication.publication_release_gate,'manual_review_required'), status: publication.export_allowed ? 'ready_for_manual_review' : 'needs_operator_review', blocker_count: publication.export_allowed ? 0 : 1, next_operator_action:'Prepare export handoff only after evidence and signoff checks pass.', is_preview_only:true }
    ]);
  }

  function buildInterventionLanes(consolePayload){
    const gaps = asRecord(consolePayload.unresolved_evidence_gap_summary);
    const repair = asRecord(consolePayload.source_to_claim_repair_state);
    const signoff = asRecord(consolePayload.operator_signoff_readiness);
    const publication = asRecord(consolePayload.export_publication_readiness);
    return freezeRows([
      { lane_id:'evidence-gap-closure', label:'Evidence gap closure', priority: num(gaps.unresolved_gap_count) > 0 ? 1 : 4, blocker_count:num(gaps.unresolved_gap_count), recommended_operator_action:'Map every unsupported claim to evidence, counter-evidence, or explicit deferral.', output_artifact:'gap-closure-note', is_preview_only:true },
      { lane_id:'source-to-claim-repair', label:'Source-to-claim repair', priority: num(repair.open_gap_count)+num(repair.open_repair_count) > 0 ? 2 : 5, blocker_count:num(repair.open_gap_count)+num(repair.open_repair_count), recommended_operator_action:asString(repair.next_repair_action,'review repair queue'), output_artifact:'repair-decision-log', is_preview_only:true },
      { lane_id:'signoff-collection', label:'Signoff collection', priority: signoff.operator_signed_off ? 5 : 3, blocker_count: signoff.operator_signed_off ? 0 : 1, recommended_operator_action:'Confirm manual review, no automatic signing, and export-lock readiness.', output_artifact:'manual-signoff-checklist', is_preview_only:true },
      { lane_id:'export-handoff', label:'Export handoff', priority: publication.export_allowed ? 4 : 6, blocker_count: publication.export_allowed ? 0 : 1, recommended_operator_action:'Prepare handoff summary after blockers are cleared.', output_artifact:'export-handoff-summary', is_preview_only:true },
      { lane_id:'publication-review', label:'Publication review', priority: 7, blocker_count: publication.publication_permission_claimed ? 1 : 0, recommended_operator_action:'Keep publication permission unclaimed until a human explicitly authorizes it.', output_artifact:'publication-risk-note', is_preview_only:true }
    ].sort((a,b)=>a.priority-b.priority));
  }

  function buildBlockerRegister(consolePayload, stageBoard, lanes){
    const riskRail = asArray(consolePayload.continuity_risk_rail);
    const fromRisks = riskRail.map((risk, index) => {
      const rec = asRecord(risk);
      return {
        blocker_id: asString(rec.risk_id, `risk-${index+1}`),
        source: 'continuity_risk_rail',
        label: asString(rec.label, 'Continuity risk'),
        severity: asString(rec.severity, 'medium'),
        blocks_export: rec.blocks_export !== false,
        mapped_lane: rec.risk_id === 'evidence-gaps-open' ? 'evidence-gap-closure' : rec.risk_id === 'repair-queue-open' ? 'source-to-claim-repair' : rec.risk_id === 'operator-signoff-missing' ? 'signoff-collection' : 'publication-review',
        next_operator_action: asString(rec.next_operator_action, 'Review manually.'),
        is_preview_only: true
      };
    });
    const fromStage = stageBoard.filter((stage) => num(stage.blocker_count) > 0).map((stage) => ({
      blocker_id: `stage-${stage.stage_id}`,
      source: 'stage_board',
      label: `${stage.label} blocker`,
      severity: stage.stage_id === 'evidence-gaps' ? 'high' : 'medium',
      blocks_export: true,
      mapped_lane: lanes.find((lane) => lane.blocker_count > 0)?.lane_id || 'operator-review',
      next_operator_action: stage.next_operator_action,
      is_preview_only: true
    }));
    return freezeRows([...fromRisks, ...fromStage]);
  }

  function buildReadinessScorecard(stageBoard, lanes, blockers){
    const blockerCount = blockers.filter((b)=>b.blocks_export).length;
    const readyStages = stageBoard.filter((s)=>s.status === 'ready_for_manual_review').length;
    const totalStages = stageBoard.length || 1;
    const score = Math.max(0, Math.round((readyStages / totalStages) * 100) - blockerCount * 10);
    return Object.freeze({
      scorecard_id:'source-to-brief-control-room-readiness',
      readiness_score: score,
      ready_stage_count: readyStages,
      total_stage_count: totalStages,
      export_blocker_count: blockerCount,
      intervention_lane_count: lanes.length,
      safe_for_manual_handoff: blockerCount === 0 && readyStages === totalStages,
      safe_to_publish: false,
      manual_review_required: true,
      is_preview_only: true
    });
  }

  function buildOperatorRunbook(stageBoard, lanes, blockers, scorecard){
    const steps = [];
    steps.push({ step_id:'review-stage-board', order:1, label:'Review stage board', instruction:'Confirm the current brief stage and whether export readiness is blocked.', is_preview_only:true });
    const topLane = lanes.find((lane)=>lane.blocker_count > 0) || lanes[0];
    steps.push({ step_id:'work-top-intervention-lane', order:2, label:'Work top intervention lane', instruction:topLane ? topLane.recommended_operator_action : 'Review lanes manually.', lane_id: topLane ? topLane.lane_id : 'none', is_preview_only:true });
    steps.push({ step_id:'clear-blocker-register', order:3, label:'Clear blocker register', instruction:`Resolve or document ${blockers.length} blocker entries before export lock.`, is_preview_only:true });
    steps.push({ step_id:'collect-signoff', order:4, label:'Collect signoff', instruction:'Collect explicit manual operator signoff. Do not auto-sign or auto-lock export.', is_preview_only:true });
    steps.push({ step_id:'prepare-export-summary', order:5, label:'Prepare export summary', instruction: scorecard.safe_for_manual_handoff ? 'Prepare the export-ready control-room summary for review.' : 'Prepare only a blocked handoff summary until blockers are cleared.', is_preview_only:true });
    return freezeRows(steps);
  }

  function buildExportSummary(consolePayload, stageBoard, lanes, blockers, scorecard){
    return Object.freeze({
      summary_id:'source-to-brief-publication-readiness-suite-export-summary',
      release:MILESTONE,
      generated_at:FIXED_GENERATED_AT,
      source_to_brief_baseline:SOURCE_TO_BRIEF_BASELINE,
      continuity_console_baseline:CONTINUITY_CONSOLE_BASELINE,
      current_brief_stage:asString(asRecord(consolePayload.brief_stage_summary).current_brief_stage,'unknown'),
      readiness_score:scorecard.readiness_score,
      export_blocker_count:scorecard.export_blocker_count,
      intervention_lane_count:lanes.length,
      stage_count:stageBoard.length,
      manual_review_required:true,
      safe_for_manual_handoff:scorecard.safe_for_manual_handoff,
      safe_to_publish:false,
      verification_claimed:false,
      signoff_performed:false,
      export_lock_performed:false,
      publication_permission_claimed:false
    });
  }

  function buildManualCopy(summary, runbook){
    const firstStep = runbook[0] ? runbook[0].instruction : 'Review manually.';
    return [
      'Source-to-brief operator control room verdict: metadata-only manual review surface is ready.',
      `Readiness score: ${summary.readiness_score}. Export blockers: ${summary.export_blocker_count}. Stage: ${summary.current_brief_stage}.`,
      `First operator step: ${firstStep}`,
      'Boundary: no live provider calls, no hidden network requests, no source fetching, no automatic verification, no automatic signoff, no export lock, no status persistence, no batch mutation, and no publication permission.'
    ].join('\n');
  }

  function buildSourceToBriefOperatorControlRoom(options = {}){
    const continuity = getContinuityConsole(options);
    const stageBoard = buildStageBoard(continuity);
    const lanes = buildInterventionLanes(continuity);
    const blockers = buildBlockerRegister(continuity, stageBoard, lanes);
    const scorecard = buildReadinessScorecard(stageBoard, lanes, blockers);
    const runbook = buildOperatorRunbook(stageBoard, lanes, blockers, scorecard);
    const exportSummary = buildExportSummary(continuity, stageBoard, lanes, blockers, scorecard);
    const payload = {
      source_to_brief_publication_readiness_suite_version: VERSION,
      milestone: MILESTONE,
      model: MODEL,
      generated_at: asString(options.generated_at, FIXED_GENERATED_AT),
      control_room_ready: true,
      safe_metadata_only: true,
      source_to_brief_baseline: SOURCE_TO_BRIEF_BASELINE,
      continuity_console_baseline: CONTINUITY_CONSOLE_BASELINE,
      compact_navigation_baseline: COMPACT_NAVIGATION_BASELINE,
      stage_board: stageBoard,
      intervention_lanes: lanes,
      blocker_register: blockers,
      readiness_scorecard: scorecard,
      operator_runbook: runbook,
      next_operator_action: runbook[1] ? runbook[1].instruction : 'Review source-to-brief control room manually.',
      export_control_room_summary: exportSummary,
      manual_control_room_copy: buildManualCopy(exportSummary, runbook),
      control_room_safety_contract: Object.freeze({
        source_to_brief_publication_readiness_suite_only: true,
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

  root.sourceToBriefOperatorControlRoom = Object.freeze({
    VERSION,
    MILESTONE,
    MODEL,
    SOURCE_TO_BRIEF_BASELINE,
    CONTINUITY_CONSOLE_BASELINE,
    COMPACT_NAVIGATION_BASELINE,
    BOUNDARY_FLAGS,
    buildSourceToBriefOperatorControlRoom
  });
})(typeof window !== 'undefined' ? window : globalThis);
