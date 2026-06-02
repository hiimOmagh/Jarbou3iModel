/* Jarbou3i Research Engine manual workflow UX consolidation 1.4.0-alpha.42. */
/* Metadata-only manual workflow consolidation. No network calls, provider execution, OAuth/token lifecycle, backend/storage/source behavior expansion, status persistence, batch mutation, navigation-state persistence, automatic verification, automatic signoff, automatic export lock, cryptographic signature claim, or publication permission action. */
(function(global){
  'use strict';
  const root = global.Jarbou3iResearchModules = global.Jarbou3iResearchModules || {};

  const VERSION = '1.4.0-alpha.42';
  const MILESTONE = 'v1.4.0-alpha.42 — Manual Workflow UX Consolidation';
  const MODEL = 'manual_workflow_ux_consolidation.v1';
  const STABLE_MANUAL_WORKFLOW_BASELINE = '1.3.0';
  const ADAPTER_REPLAY_CLOSURE_BASELINE = '1.4.0-alpha.37';
  const SOURCE_TO_BRIEF_CONTINUITY_BASELINE = '1.4.0-alpha.38';
  const SOURCE_TO_BRIEF_CONTROL_ROOM_BASELINE = '1.4.0-alpha.39';
  const PUBLICATION_READINESS_BASELINE = '1.4.0-alpha.40';
  const FIXED_GENERATED_AT = '2026-06-01T00:00:00.000Z';

  const BOUNDARY_FLAGS = Object.freeze({
    manual_workflow_ux_consolidation_only: true,
    metadata_preview_only: true,
    consolidation_not_new_execution_surface: true,
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
  function freezeRows(rows){ return Object.freeze(rows.map((row) => Object.freeze(row))); }
  function asString(value, fallback){ return typeof value === 'string' && value.trim() ? value.trim() : fallback; }

  function getPublicationReadiness(options = {}){
    if (options.publication_readiness_suite) return options.publication_readiness_suite;
    const mod = root.sourceToBriefPublicationReadinessSuite;
    if (mod && typeof mod.buildSourceToBriefPublicationReadinessSuite === 'function') {
      return mod.buildSourceToBriefPublicationReadinessSuite(options);
    }
    return {
      publication_readiness_ready: true,
      operator_publication_decision_summary: { manual_review_required: true, safe_to_publish: false },
      export_readiness_report: { export_ready: true, export_allowed: false },
      unresolved_gap_blocker_map: [],
      source_coverage_digest: { sufficiency_band: 'manual-review-required' }
    };
  }

  function buildPrimaryWorkflowPath(publicationReadiness){
    const decision = asRecord(publicationReadiness.operator_publication_decision_summary);
    const exportReport = asRecord(publicationReadiness.export_readiness_report);
    return freezeRows([
      { step_id:'intake-source-packet', label:'Intake / source packet', primary_surface:'source packet builder', action:'create or import a manual source packet', collapsed_surfaces:['source packet templates','source packet roundtrip'], status:'ready' },
      { step_id:'evidence-review', label:'Evidence review', primary_surface:'evidence workspace', action:'score sources and identify weak support', collapsed_surfaces:['evidence scoring','evidence review queue'], status:'ready' },
      { step_id:'brief-assembly', label:'Brief assembly', primary_surface:'source-to-brief workbench', action:'assemble the brief draft from reviewed material', collapsed_surfaces:['guided session','brief template system'], status:'ready' },
      { step_id:'claim-repair', label:'Claim repair', primary_surface:'source-to-claim gap closure', action:'repair unsupported claims and contradictions', collapsed_surfaces:['diagnostic repair queue','traceability console'], status:'manual_review_required' },
      { step_id:'publication-readiness', label:'Publication readiness', primary_surface:'publication readiness suite', action: decision.safe_to_publish ? 'perform final operator review before export' : 'resolve publication blockers before export', collapsed_surfaces:['operator continuity console','operator control room'], status: decision.safe_to_publish ? 'review_ready' : 'blocked' },
      { step_id:'export-handoff', label:'Export / handoff', primary_surface:'final review export bundle', action: exportReport.export_allowed ? 'export after explicit operator signoff' : 'prepare summary without export lock', collapsed_surfaces:['signed export handoff','publication pack v4'], status: exportReport.export_allowed ? 'manual_signoff_required' : 'preview_only' }
    ]);
  }

  function buildSurfaceConsolidationMap(){
    return freezeRows([
      { area_id:'adapter-replay-review', current_surfaces:['decision queue','triage workbench','evidence trace reader','handoff dossier','operator review console','compact navigation UX'], consolidated_into:'Adapter Replay Review Console', duplicate_risk:'medium', consolidation_rule:'keep as support workflow; do not add more adapter replay surfaces before v1.4.0 stable' },
      { area_id:'source-to-brief-operation', current_surfaces:['continuity console','operator control room','publication readiness suite'], consolidated_into:'Source-to-Brief Manual Workflow', duplicate_risk:'high', consolidation_rule:'show one primary workflow path and expose control/readiness as progressive disclosure' },
      { area_id:'evidence-and-claim-quality', current_surfaces:['evidence workspace','evidence scoring','claim traceability','diagnostic repair queue'], consolidated_into:'Evidence Review + Claim Repair', duplicate_risk:'medium', consolidation_rule:'surface weak claims before export and keep details expandable' },
      { area_id:'export-and-publication', current_surfaces:['publication pack v4','signed export handoff','publication readiness report'], consolidated_into:'Final Review + Export Handoff', duplicate_risk:'medium', consolidation_rule:'never imply verification, signoff, export lock, or publication permission automatically' }
    ]);
  }

  function buildCognitiveLoadReductionPlan(){
    return freezeRows([
      { rule_id:'one-primary-path', label:'One primary workflow path', effect:'operators see Intake → Evidence → Brief → Repair → Readiness → Export before secondary surfaces' },
      { rule_id:'progressive-disclosure', label:'Progressive disclosure', effect:'blocker and evidence details remain expandable instead of visible in every card' },
      { rule_id:'decision-first-cards', label:'Decision-first cards', effect:'each card starts with status, blocker, next action, then supporting details' },
      { rule_id:'boundary-rail', label:'Persistent safety boundary rail', effect:'no-live/no-provider/no-auto-signoff boundaries remain visible without repeating full legal copy everywhere' },
      { rule_id:'mobile-rtl-compression', label:'Mobile/RTL compression', effect:'primary actions stay visible, labels remain short, and horizontal overflow remains forbidden' }
    ]);
  }

  function buildOperatorNavigationModel(path){
    return freezeRows(path.map((step, index) => ({
      nav_id: step.step_id,
      order: index + 1,
      label: step.label,
      target_surface: step.primary_surface,
      next_action: step.action,
      status: step.status,
      keyboard_hint: `Alt+${index + 1}`,
      mobile_priority: index < 3 ? 'primary' : 'secondary'
    }))); 
  }

  function buildManualWorkflowUxConsolidation(options = {}){
    const publicationReadiness = getPublicationReadiness(options);
    const generatedAt = asString(options.generated_at, FIXED_GENERATED_AT);
    const primaryPath = buildPrimaryWorkflowPath(publicationReadiness);
    const surfaceMap = buildSurfaceConsolidationMap();
    const cognitivePlan = buildCognitiveLoadReductionPlan();
    const navigationModel = buildOperatorNavigationModel(primaryPath);
    const unresolvedBlockers = asArray(publicationReadiness.unresolved_gap_blocker_map).length;

    const exportSummary = Object.freeze({
      summary_id:'manual-workflow-ux-consolidation-export-summary',
      generated_at: generatedAt,
      primary_workflow_steps: primaryPath.length,
      consolidated_surface_groups: surfaceMap.length,
      unresolved_blocker_count: unresolvedBlockers,
      next_operator_action: unresolvedBlockers > 0 ? 'Use the primary workflow path to resolve blockers before export handoff.' : 'Run final manual review before export handoff.',
      export_ready: true,
      export_allowed: false,
      manual_review_required: true,
      verification_claimed: false,
      signoff_performed: false,
      export_lock_performed: false,
      publication_permission_claimed: false,
      live_provider_calls: false,
      live_source_fetching: false
    });

    const mobileRtl = Object.freeze({
      contract_id:'mobile-rtl-visibility-contract',
      horizontal_overflow_allowed:false,
      primary_actions_visible:true,
      rtl_labels_shortened:true,
      keyboard_hints_visible:true,
      duplicate_surface_labels_collapsed:true,
      locales:Object.freeze(['en','ar','fr'])
    });

    return Object.freeze({
      manual_workflow_ux_consolidation_version: VERSION,
      milestone: MILESTONE,
      model: MODEL,
      generated_at: generatedAt,
      stable_manual_workflow_baseline: STABLE_MANUAL_WORKFLOW_BASELINE,
      adapter_replay_closure_baseline: ADAPTER_REPLAY_CLOSURE_BASELINE,
      source_to_brief_continuity_baseline: SOURCE_TO_BRIEF_CONTINUITY_BASELINE,
      source_to_brief_control_room_baseline: SOURCE_TO_BRIEF_CONTROL_ROOM_BASELINE,
      publication_readiness_baseline: PUBLICATION_READINESS_BASELINE,
      consolidation_ready: true,
      safe_metadata_only: true,
      primary_workflow_path: primaryPath,
      surface_consolidation_map: surfaceMap,
      cognitive_load_reduction_plan: cognitivePlan,
      operator_navigation_model: navigationModel,
      mobile_rtl_visibility_contract: mobileRtl,
      export_ready_ux_consolidation_summary: exportSummary,
      manual_workflow_ux_copy: [
        'Manual workflow UX consolidation verdict: use one primary workflow path before adding new surfaces.',
        `Primary workflow path contains ${primaryPath.length} steps and ${surfaceMap.length} consolidated surface groups.`,
        'Boundary: no live provider calls, no hidden network requests, no automatic verification, no automatic signoff, no export lock, no publication permission claim.',
        exportSummary.next_operator_action
      ].join('\n'),
      ux_consolidation_safety_contract: Object.freeze({
        manual_workflow_ux_consolidation_only:true,
        metadata_only:true,
        no_new_execution_surface:true,
        no_auto_verification:true,
        no_auto_signoff:true,
        no_auto_export_lock:true,
        no_publication_permission_claim:true,
        no_persistence:true,
        no_batch_mutation:true,
        no_navigation_state_persistence:true
      }),
      boundary_flags: BOUNDARY_FLAGS
    });
  }

  root.manualWorkflowUxConsolidation = Object.freeze({
    VERSION,
    MILESTONE,
    MODEL,
    STABLE_MANUAL_WORKFLOW_BASELINE,
    ADAPTER_REPLAY_CLOSURE_BASELINE,
    SOURCE_TO_BRIEF_CONTINUITY_BASELINE,
    SOURCE_TO_BRIEF_CONTROL_ROOM_BASELINE,
    PUBLICATION_READINESS_BASELINE,
    BOUNDARY_FLAGS,
    buildManualWorkflowUxConsolidation
  });
})(typeof window !== 'undefined' ? window : globalThis);
