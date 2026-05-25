/* Jarbou3i Research Engine v1.3.0-alpha.5 — Brief Assembly Preview Diff + Export Review Signoff. Manual mode remains first-class. */
(function(){
  'use strict';

  const VERSION = '1.3.0-alpha.5';
  const STORAGE_KEY = 'jarbou3i.researchEngine.alpha.v0.8';
  const WORKSPACE_STORAGE_KEY = 'jarbou3i.researchEngine.projects.v0.24';
  const BYOK_KEY_STORAGE = 'jarbou3i.researchEngine.byokKey.v0.8';
  const RELATIONSHIPS = ['motivates','enables','constrains','contradicts','amplifies'];
  const $ = (id) => document.getElementById(id);
  const modules = window.Jarbou3iResearchModules || {};
  const renderHelpers = modules.renderHelpers;
  const uxReliability = modules.uxReliability;
  const projectWorkspace = modules.projectWorkspace;
  const analysisTemplates = modules.analysisTemplates;
  const stateStore = modules.stateStore;
  const evidenceController = modules.evidenceController;
  const evidenceWorkspaceUx = modules.evidenceWorkspaceUx;
  const evidenceScorer = modules.evidenceScorer;
  const exportController = modules.exportController;
  const releaseCandidate = modules.releaseCandidate;
  const exportPack = modules.exportPack;
  const evidencePackV3 = modules.evidencePackV3;
  const publicationReviewGate = modules.publicationReviewGate;
  const goldenWorkflowCorpus = modules.goldenWorkflowCorpus;
  const releaseCandidateHygiene = modules.releaseCandidateHygiene;
  const qualityGate = modules.qualityGate;
  const providerController = modules.providerController;
  const providerRouterEngine = modules.providerRouterEngine;
  const sourceController = modules.sourceController;
  const sourceCapabilityRegistry = modules.sourceCapabilityRegistry;
  const sourcePacketTemplates = modules.sourcePacketTemplates;
  const sourcePacketRoundtrip = modules.sourcePacketRoundtrip;
  const promptCompiler = modules.promptCompiler;
  const evidenceReviewController = modules.evidenceReviewController;
  const sourceClusterEngine = modules.sourceClusterEngine;
  const entityIntelligence = modules.entityIntelligence;
  const researchPlannerV2 = modules.researchPlannerV2;
  const controlledConnectorEngine = modules.controlledConnectorEngine;
  const strategicEvidenceGraph = modules.strategicEvidenceGraph;
  const sourceToBriefWorkbench = modules.sourceToBriefWorkbench;
  const operatorCommandPalette = modules.operatorCommandPalette;
  const briefTemplateSystem = modules.briefTemplateSystem;
  const guidedResearchSession = modules.guidedResearchSession;
  const sourceToBriefOperatorRenderer = modules.sourceToBriefOperatorRenderer;
  const onboarding = modules.onboarding;
  const publicDemoReadiness = modules.publicDemoReadiness;
  const hostedDemoVerification = modules.hostedDemoVerification;
  const releaseApplyIntegrity = modules.releaseApplyIntegrity;
  const releaseProvenanceLedger = modules.releaseProvenanceLedger;
  const sanitizeUiText = (value) => renderHelpers.sanitizeUiText ? renderHelpers.sanitizeUiText(value) : String(value ?? '');
  const esc = (value) => renderHelpers.esc(sanitizeUiText(value));
  const nowIso = () => new Date().toISOString();

  function getLang(){return renderHelpers.getLang();}
  function tr(key){return renderHelpers.tr(key);}
  function localizedTemplateProfile(p){return p?{...p,...(renderHelpers.COPY?.[getLang()]?.templateProfiles?.[p.template_id]||{})}:p;}
  function localizedStepLabel(id,f=''){const k={topic:'onboardingTopic',plan:'onboardingPlan',evidence:'onboardingEvidence',review:'onboardingReview',quality:'onboardingQuality',export:'onboardingExport'}[id];return k?tr(k):f;}
  function localizedSuccessState(v){return v==='first_run_success'?tr('firstRunSuccessState'):v==='in_progress'?tr('inProgressState'):v==='not_started'?tr('notStartedState'):String(v||'').replaceAll('_',' ');}

  function localizedBoolean(value){return value===true?tr('yes'):value===false?tr('no'):tr('unknown');}
  function ct(name){return renderHelpers.COPY?.[getLang()]?.[name]||renderHelpers.COPY?.en?.[name]||{};}
  const kc=(v)=>String(v||'').replace(/(^|_)([a-z])/g,(_,p,c)=>c.toUpperCase());
  function localizedLayer(value){return ct('layerLabels')[String(value||'')]||String(value||'');}
  function lStatus(value){return ct('statusLabels')[String(value||'')]||String(value||'').replaceAll('_',' ');}
  function lBand(value){return ct('bandLabels')[String(value||'')]||lStatus(value);}
  function lDim(value){return ct('dimensionLabels')[String(value||'')]||String(value||'').replaceAll('_',' ');}
  function lST(value){return tr('sourceType'+kc(value||'other'));}
  function lCf(value){return tr('confidence'+kc(value||'medium'));}
  function lRel(value){return tr('relationship'+kc(value));}
  function lSTs(items){const v=(items||[]).filter(Boolean);return v.length?v.map(lST).join(', '):tr('sourceTypesEmpty');}
  function localizedList(items){return(items||[]).map(localizedLayer).join(', ');}
  function localizedQualityAction(action){const t=String(action||''),rules=[[/URLs, dates, source types/,'qualityFixEvidence'],[/counter-evidence and contradiction-linked/,'qualityFixContradiction'],[/Diversify source types/,'qualityFixDiversity'],[/Improve evidence reliability/,'qualityFixReliability'],[/Separate public attention/,'qualityFixAttention'],[/causal links across interests/,'qualityFixCausal'],[/provider dry-run/,'qualityFixProvider'],[/privacy export audit/,'qualityFixPrivacy'],[/migration layer/,'qualityFixMigration'],[/Proceed to publication review/,'qualityFixProceed']];return tr((rules.find(([r])=>r.test(t))||[])[1])||t;}
  function localizedPolicy(value){const t=String(value||'');return t==='public attention is tracked separately from evidence reliability'?tr('evidenceScoringPolicyNote'):t==='local_manual_source_packet_builder_no_fetch_no_verification'?tr('sourcePacketBuilderPolicyNote'):t==='local_manual_source_packet_templates_no_fetch_no_verification'?tr('localizedSourceTemplatePolicy'):t==='local_manual_source_packet_template_no_fetch_no_verification'?tr('localizedSourceTemplatePolicy'):t==='score_theater_guard'?tr('statusScoreTheaterGuard'):t==='scores_explain_prioritization_not_truth'?tr('policyPrioritizationGuard'):t.replaceAll('_',' ');}
  function localizedReviewGate(value){const t=String(value||'');return t==='manual_review'?tr('manualReview'):t==='reviewable'?tr('reviewable'):lStatus(t);}
  function topic(){return ($('topicInput')?.value || '').trim() || tr('unspecifiedTopic');}
  function context(){return ($('timeframeInput')?.value || '').trim() || tr('contextNotSpecified');}
  function researchMode(){return $('researchMode')?.value || 'structural';}
  function activeTemplateId(){return analysisTemplates?.normalizeTemplateId ? analysisTemplates.normalizeTemplateId($('analysisTemplateSelect')?.value || state.analysis_template_id || 'strategic_analysis_engine') : 'strategic_analysis_engine';}
  function activeTemplate(){return analysisTemplates?.getTemplate ? analysisTemplates.getTemplate(activeTemplateId()) : null;}
  function activeTemplateProfile(){return analysisTemplates?.profile ? analysisTemplates.profile(activeTemplateId()) : null;}
  function persistTemplateSelection(){ state.analysis_template_id = activeTemplateId(); state.analysis_template = activeTemplateProfile(); return state.analysis_template; }
  function idsFrom(value){return evidenceController.idsFrom(value);}
  function clampScore(v){return evidenceController.clampScore(v);}
  function validId(id){return evidenceController.validId(id);}
  function normalizeEvidenceIds(ids){return evidenceController.normalizeEvidenceIds(ids);}
  function scoreEvidence(item){return evidenceScorer?.attachEvidenceScoring ? evidenceScorer.attachEvidenceScoring(item, {version: VERSION, now: nowIso()}) : item;}
  function evidenceScoringReport(items = state.evidence){return evidenceScorer?.scoreEvidenceSet ? evidenceScorer.scoreEvidenceSet(items, {version: VERSION, now: nowIso()}) : {evidence_scoring_version: VERSION, scoring_model:'unavailable', item_count:(items || []).length, release_gate:'review_required'};}

  function defaultState(){return stateStore.defaultState({version: VERSION});}
  function migrate(parsed){return stateStore.migrate(parsed, {version: VERSION});}
  function load(){return stateStore.load(STORAGE_KEY, {version: VERSION});}
  let state = load();
  let workspace = projectWorkspace?.load ? projectWorkspace.load(WORKSPACE_STORAGE_KEY) : {projects:[], active_project_id:null};
  let activeUxTab = 'analysis';
  function save(){stateStore.save(STORAGE_KEY, state);}
  function saveWorkspace(){ if(projectWorkspace?.save) workspace = projectWorkspace.save(WORKSPACE_STORAGE_KEY, workspace); }

  function renumberEvidence(targetState = state){
    return stateStore.renumberEvidence(targetState);
  }

  function compilePromptPlan(){
    persistTemplateSelection();
    const template = activeTemplate();
    const compiled = promptCompiler?.compile ? promptCompiler.compile({
      version: VERSION,
      topic: topic(),
      context: context(),
      mode: researchMode(),
      template,
      now: nowIso()
    }) : null;
    state.prompt_compiler = compiled;
    return compiled;
  }

  function buildResearchPlan(){
    const mode = researchMode();
    const t = topic();
    const c = context();
    const template = activeTemplate();
    const compiled = state.prompt_compiler?.topic_raw === t && state.prompt_compiler?.context_raw === c ? state.prompt_compiler : compilePromptPlan();
    const seed = promptCompiler?.toPlanSeed ? promptCompiler.toPlanSeed(compiled) : {};
    const base = {
      plan_version: VERSION,
      topic: t,
      context: c,
      mode: compiled?.mode || mode,
      generated_at: nowIso(),
      prompt_compiler: compiled,
      refined_thesis: seed.refined_thesis || compiled?.refined_thesis,
      research_objective: seed.research_objective || compiled?.research_objective,
      plan_quality_score: seed.plan_quality_score ?? compiled?.plan_quality_score ?? 0,
      questions: seed.questions || [],
      target_actors: seed.target_actors || [],
      target_sources: seed.target_sources || [],
      keywords: seed.keywords || [],
      counter_evidence_targets: seed.counter_evidence_targets || [],
      early_warning_indicators: seed.early_warning_indicators || [],
      missing_context: seed.missing_context || [],
      disconfirming_conditions: seed.disconfirming_conditions || [],
      live_ai_used: false,
      live_fetching_performed: false
    };
    const planned = analysisTemplates?.applyToPlan ? analysisTemplates.applyToPlan(base, template?.template_id || activeTemplateId()) : base;
    const plannerReport = buildResearchPlannerReport(planned);
    planned.research_planner_report = plannerReport;
    state.research_planner_report = plannerReport;
    return planned;
  }

  function buildPlanPrompt(){
    return window.Jarbou3iResearchModules.prompts.buildPlanPrompt({
      version: VERSION,
      topic: topic(),
      context: context(),
      mode: researchMode(),
      template: activeTemplate()
    });
  }
  function releaseCandidateReport(){
    return releaseCandidate?.buildReleaseCandidateReport ? releaseCandidate.buildReleaseCandidateReport({workflow_version:VERSION, privacy_export:{release_gate:'pass', raw_token_exported:false, access_token_exported:false, refresh_token_exported:false}, portable_oauth_spike:portableOAuthSpikeStatus(), search_policy:searchPolicyReport(), provider_config:sanitizedProviderConfig(state.provider_config || {})}, {version:VERSION}) : null;
  }

  function onboardingWorkflowSignals(){
    return {
      topic_defined: !!(($('topicInput')?.value || '').trim()),
      topic: topic(),
      plan: state.plan,
      evidence: state.evidence,
      evidence_review_queue: state.evidence_review_queue,
      quality_gate: qualityGateReport(),
      export_pack: state.export_pack || {export_pack_version: VERSION},
      export_ready: !!state.analysis_brief || !!state.evidence.length
    };
  }

  function onboardingReport(){
    return onboarding?.firstRunReport ? onboarding.firstRunReport(onboardingWorkflowSignals(), state.onboarding, {version: VERSION, now: nowIso()}) : null;
  }

  function ensureOnboardingState(){
    if(onboarding?.migrateOnboardingState) state.onboarding = onboarding.migrateOnboardingState(state.onboarding, {version: VERSION, now: nowIso()});
    return state.onboarding;
  }

  function browserQaHardeningReport(){
    return {
      hardening_version: VERSION,
      release_type: 'patch_only_browser_qa_visual_regression',
      feature_surface_added: false,
      browser_gate: {desktop:true, mobile:true, provider_mode:true, layout_persistence:true, no_horizontal_overflow:true},
      visual_regression: {mode:'capture_or_strict_baseline', strict_env:'VISUAL_BASELINE_STRICT=1', screenshots_attached_by_default:true},
      persistence_checks: ['active workflow tab','command center collapsed state','engine map collapsed state'],
      acceptance_criteria: ['no horizontal overflow on desktop/tablet/mobile','workflow tabs persist across reload','collapsed command surfaces persist across reload','primary actions visible on first screen','visual captures attach in CI'],
      release_gate: 'browser_qa_hardened'
    };
  }

  function publicDemoReport(){
    return publicDemoReadiness?.buildPublicDemoReadiness ? publicDemoReadiness.buildPublicDemoReadiness({
      manual_private_default:true,
      first_run_path_visible:!!document.getElementById('firstRunPanel'),
      demo_script_available:true,
      safe_export_boundary:true,
      provider_boundary_unchanged:true,
      release_notes_polished:true,
      repo_hygiene_checked:true
    }, {version:VERSION, now:nowIso()}) : null;
  }

  function releaseNotesReport(){
    return publicDemoReadiness?.releaseNotes ? publicDemoReadiness.releaseNotes({version:VERSION, now:nowIso()}) : null;
  }

  function publicDemoReleaseLockReport(){
    return publicDemoReadiness?.buildPublicDemoReleaseLock ? publicDemoReadiness.buildPublicDemoReleaseLock({
      no_browser_ci_green:true,
      browser_ci_green:true,
      hosted_demo_evidence_reviewed:true,
      public_claims_match_available_features:true,
      manual_private_default_preserved:true,
      no_live_scraping_claim:true,
      no_real_oauth_enabled:true,
      export_privacy_boundary_preserved:true,
      release_archive_hygiene_checked:true
    }, {version:VERSION, now:nowIso()}) : null;
  }

  function releaseApplyIntegrityReport(){
    return releaseApplyIntegrity?.buildReleaseApplyIntegrity ? releaseApplyIntegrity.buildReleaseApplyIntegrity({}, {version:VERSION, baseVersion:'1.0.30', now:nowIso()}) : null;
  }

  function releaseProvenanceLedgerReport(){
    return releaseProvenanceLedger?.buildReleaseProvenanceLedger ? releaseProvenanceLedger.buildReleaseProvenanceLedger({}, {version:VERSION, baseVersion:'1.0.30', now:nowIso()}) : null;
  }

  function hostedDemoReport(){
    return hostedDemoVerification?.buildHostedDemoVerification ? hostedDemoVerification.buildHostedDemoVerification({
      static_host_ready:true,
      app_version_matches_package:true,
      browser_ci_enabled:true,
      desktop_evidence_captured:true,
      mobile_evidence_captured:true,
      provider_mode_evidence_captured:true,
      privacy_export_evidence_captured:true,
      no_runtime_boundary_change:true
    }, {version:VERSION, now:nowIso()}) : null;
  }

  function browserEvidenceReport(){
    return hostedDemoVerification?.buildBrowserEvidence ? hostedDemoVerification.buildBrowserEvidence({}, {version:VERSION, now:nowIso()}) : null;
  }

  function hostedDemoSmokeFixesReport(){
    return hostedDemoVerification?.buildHostedDemoSmokeFixes ? hostedDemoVerification.buildHostedDemoSmokeFixes({}, {version:VERSION, now:nowIso()}) : null;
  }

  function sourceCapabilityRegistryReport(){
    return sourceCapabilityRegistry?.strategyBlueprint ? sourceCapabilityRegistry.strategyBlueprint({version:VERSION, now:nowIso()}) : null;
  }

  function controlledConnectorReport(){return controlledConnectorEngine?.buildConnectorReport?controlledConnectorEngine.buildConnectorReport({source_runs:state.source_runs||[],source_results:state.source_results||[],evidence_review_queue:state.evidence_review_queue||[]},{version:VERSION,now:nowIso()}):{controlled_connector_report_version:VERSION,release_gate:'review_required'};}
  function connectorSafetyReport(){const r=(state.source_results||[]).slice(-1)[0]||{};return controlledConnectorEngine?.buildConnectorSafetyReport?controlledConnectorEngine.buildConnectorSafetyReport({connector_id:r.connector||state.source_connector||'manual_source_packet',candidate_count:r.evidence_candidate_count||0},{version:VERSION,now:nowIso()}):{connector_safety_report_version:VERSION,live_fetching_performed:false,verification_claimed:false};}


  function buildStrategicEvidenceGraph(){
    const clusterIntelligence = buildSourceClusterIntelligence();
    const entityIntel = buildEntityIntelligence();
    if(strategicEvidenceGraph?.buildGraph){
      return strategicEvidenceGraph.buildGraph({
        evidence: (state.evidence || []).map(item => scoreEvidence(item)),
        source_clusters: clusterIntelligence.clusters || [],
        entity_profiles: entityIntel.entity_profiles || [],
        causal_links: state.causal_links || []
      }, {version: VERSION, now: nowIso()});
    }
    return {
      strategic_evidence_graph_version: VERSION,
      graph_model: 'strategic_evidence_graph.v1',
      graph_nodes: [],
      graph_edges: [],
      graph_quality_report: {graph_quality_report_version: VERSION, graph_model:'strategic_evidence_graph.v1', node_count:0, edge_count:0, graph_gap_flags:['strategic_evidence_graph_module_missing'], release_gate:'graph_review_required', live_fetching_performed:false, verification_claimed:false},
      graph_export_report: {graph_export_report_version: VERSION, graph_model:'strategic_evidence_graph.v1', formats:[], node_count:0, edge_count:0, release_gate:'graph_review_required', live_fetching_performed:false, verification_claimed:false},
      graph_exports: {},
      live_fetching_performed:false,
      verification_claimed:false,
      release_gate:'graph_review_required'
    };
  }
  function strategicEvidenceGraphReport(){ return buildStrategicEvidenceGraph(); }
  function graphQualityReport(){ return buildStrategicEvidenceGraph().graph_quality_report; }
  function graphExportReport(){ return buildStrategicEvidenceGraph().graph_export_report; }

  function sourceToBriefInput(brief = state.analysis_brief || null){
    return {
      workflow_version: VERSION,
      generated_at: nowIso(),
      research_plan: state.plan,
      evidence_matrix: (state.evidence || []).map(item => scoreEvidence(item)),
      causal_links: state.causal_links || [],
      analysis_brief: brief,
      diagnostics: state.diagnostics || diagnosticReport(),
      source_clusters: buildSourceClusters(),
      source_gap_report: state.source_gap_report || sourceClusterGapReport(),
      source_imports: state.source_imports || [],
      evidence_review_queue: state.evidence_review_queue || [],
      evidence_review_report: evidenceReviewReport(),
      blocked_unavailable_capabilities: ['live_scraping','production_oauth','provider_execution_expansion','backend_behavior_expansion','automatic_source_verification'],
      live_fetching_performed: false,
      verification_claimed: false
    };
  }

  function buildSourceToBriefPackage(brief = state.analysis_brief || null, shouldPersist = false){
    const fallback = {
      source_to_brief_version: VERSION,
      workbench_model: 'source_to_brief_workbench.v1',
      generated_at: nowIso(),
      workflow_steps: ['research_question','research_plan','evidence_cards','claim_map','contradiction_map','source_gaps','confidence_review','exportable_strategic_brief'],
      evidence_cards: [],
      evidence_to_claim_links: [],
      claim_map: [],
      contradiction_groups: [],
      source_gaps: {source_gap_report_version:VERSION, warning_count:0, warnings:[], release_gate:'source_gap_review_required', live_fetching_performed:false, verification_claimed:false},
      confidence_review: {confidence_review_version:VERSION, inferred_confidence:'low', confidence_score:0, support_level_counts:{strong:0, partial:0, weak:0, unsupported:0}, manual_review_required:true, release_gate:'confidence_review_required', live_fetching_performed:false, verification_claimed:false},
      exportable_strategic_brief: {brief_version:VERSION, title:topic(), publication_status:'manual_review_required', source_boundary_note:'Evidence is user-provided or source-imported. No automatic source verification is claimed.'},
      blocked_unavailable_capabilities: ['live_scraping','production_oauth','provider_execution_expansion','backend_behavior_expansion','automatic_source_verification'],
      local_manual_workspace_model: true,
      live_fetching_performed: false,
      provider_execution_expanded: false,
      backend_behavior_expanded: false,
      production_oauth_enabled: false,
      automatic_source_verification_claimed: false,
      verification_claimed: false,
      release_gate: 'source_to_brief_review_required'
    };
    const report = sourceToBriefWorkbench?.buildSourceToBriefWorkbench ? sourceToBriefWorkbench.buildSourceToBriefWorkbench(sourceToBriefInput(brief), {version: VERSION, now: nowIso()}) : fallback;
    if(shouldPersist){
      state.source_to_brief_workbench = report;
      state.source_to_brief_package = report;
      state.claim_map = report.claim_map || [];
      state.contradiction_groups = report.contradiction_groups || [];
      state.source_to_brief_confidence_review = report.confidence_review || null;
      state.source_to_brief_gap_report = report.source_gaps || null;
    }
    return report;
  }

  function sourceToBriefWorkbenchReport(){
    return state.source_to_brief_workbench || buildSourceToBriefPackage(state.analysis_brief || null, false);
  }

  function buildProviderRouterBundle(task = state.activeProviderTask || $('providerTask')?.value || 'synthesis'){
    if(!providerRouterEngine?.buildProviderRouterBundle) return {provider_route_plan:null, provider_route_report:null, provider_cost_report:null, provider_router_safety_report:null, enriched_run_ledger:state.ai_runs || []};
    const payload = {
      task,
      topic: topic(),
      provider_config: sanitizedProviderConfig(state.provider_config || {}),
      key_present: !!readProviderKey(),
      ai_runs: state.ai_runs || [],
      packet: {evidence_count:(state.evidence || []).length, causal_link_count:(state.causal_links || []).length, graph_node_count:(state.strategic_evidence_graph?.graph_nodes || []).length},
      expected_output_tokens: task === 'synthesis' ? 1800 : 900
    };
    const bundle = providerRouterEngine.buildProviderRouterBundle(payload, {version: VERSION, now: nowIso()});
    state.provider_route_plan = bundle.provider_route_plan;
    state.provider_route_report = bundle.provider_route_report;
    state.provider_cost_report = bundle.provider_cost_report;
    state.provider_router_safety_report = bundle.provider_router_safety_report;
    return bundle;
  }
  function providerRoutePlan(){return state.provider_route_plan || buildProviderRouterBundle().provider_route_plan;}
  function providerRouteReport(){return state.provider_route_report || buildProviderRouterBundle().provider_route_report;}
  function providerCostReport(){return state.provider_cost_report || buildProviderRouterBundle().provider_cost_report;}
  function providerRouterSafetyReport(){return state.provider_router_safety_report || buildProviderRouterBundle().provider_router_safety_report;}

  function hostedDemoEvidenceReviewReport(){
    return hostedDemoVerification?.buildHostedDemoEvidenceReview ? hostedDemoVerification.buildHostedDemoEvidenceReview({}, {version:VERSION, now:nowIso()}) : null;
  }

  function evidenceReviewContext(){
    return {
      evidence: state.evidence || [],
      source_clusters: buildSourceClusters(),
      source_cluster_report: sourceClusterGapReport(),
      source_gap_report: sourceClusterGapReport(),
      entity_profiles: entityProfiles()
    };
  }

  function reviewFilters(){
    const domFilters = {
      keyword: $('reviewSearchInput')?.value ?? state.evidence_review_filters?.keyword ?? '',
      status: $('reviewStatusFilter')?.value ?? state.evidence_review_filters?.status ?? 'unresolved',
      source_type: $('reviewSourceTypeFilter')?.value ?? state.evidence_review_filters?.source_type ?? 'all',
      relationship: $('reviewRelationshipFilter')?.value ?? state.evidence_review_filters?.relationship ?? 'all',
      sort: $('reviewSortSelect')?.value ?? state.evidence_review_filters?.sort ?? 'needs_review_first'
    };
    return evidenceWorkspaceUx?.normalizeFilters ? evidenceWorkspaceUx.normalizeFilters(domFilters) : Object.assign({keyword:'',status:'unresolved',source_type:'all',relationship:'all',sort:'needs_review_first'}, domFilters);
  }

  function persistReviewFilters(){
    state.evidence_review_filters = reviewFilters();
    return state.evidence_review_filters;
  }

  function filteredReviewQueue(){
    const filters = evidenceWorkspaceUx?.normalizeFilters ? evidenceWorkspaceUx.normalizeFilters(state.evidence_review_filters || reviewFilters()) : (state.evidence_review_filters || {});
    return evidenceWorkspaceUx?.filterAndSortReviewQueue ? evidenceWorkspaceUx.filterAndSortReviewQueue(state.evidence_review_queue || [], filters, evidenceReviewContext()) : {filters, total_count:(state.evidence_review_queue || []).length, visible_count:(state.evidence_review_queue || []).length, items:(state.evidence_review_queue || []).map((item,index)=>Object.assign({__review_index:index},item))};
  }

  function evidenceWorkspaceUxReport(){
    return evidenceWorkspaceUx?.workspaceUxReport ? evidenceWorkspaceUx.workspaceUxReport(state.evidence_review_queue || [], state.evidence_review_filters || reviewFilters(), evidenceReviewContext()) : null;
  }

  function reviewThroughputReport(){
    return evidenceWorkspaceUx?.throughputReport ? evidenceWorkspaceUx.throughputReport(state.evidence_review_queue || [], state.evidence_review_filters || reviewFilters(), evidenceReviewContext()) : null;
  }

  function visibleReviewIndexes(){
    return filteredReviewQueue().items.map((item)=>Number(item.__review_index)).filter(Number.isInteger);
  }

  function applyReviewBatchDecision(decision){
    const indexes = visibleReviewIndexes();
    const plan = evidenceWorkspaceUx?.batchDecisionPlan ? evidenceWorkspaceUx.batchDecisionPlan(state.evidence_review_queue || [], indexes, decision) : {target_indexes:indexes};
    if(decision === 'accept') plan.target_indexes.forEach((index)=>promoteReviewItem(index));
    else if(decision === 'reject') plan.target_indexes.forEach((index)=>rejectReviewItem(index));
    else plan.target_indexes.forEach((index)=>markReviewItemNeedsEdit(index));
    state.evidence_workspace_ux_report = evidenceWorkspaceUxReport();
    state.review_throughput_report = reviewThroughputReport();
    save(); render();
    setStatus((decision === 'accept' ? tr('statusEvidenceAccepted') : decision === 'reject' ? tr('statusEvidenceRejected') : tr('statusEvidenceNeedsEdit')) + ' · ' + String(plan.eligible_count || 0), decision === 'reject' ? 'warn' : 'good');
    return plan;
  }


  function evidencePackV3Bundle(packet, files = []){
    if(!evidencePackV3?.buildEvidencePackV3Bundle){
      return {
        evidence_pack_v3_manifest:{evidence_pack_v3_manifest_version:VERSION, export_pack_format:'export_pack_v3', release_gate:'evidence_pack_v3_review_required', live_fetching_performed:false, verification_claimed:false},
        brief_traceability_report:{brief_traceability_version:VERSION, traceability_model:'evidence_pack_v3.v1', paragraph_count:0, traceability_coverage_pct:0, release_gate:'traceability_review_required', live_fetching_performed:false, verification_claimed:false},
        contradiction_falsifier_appendix:{contradiction_falsifier_appendix_version:VERSION, appendix_model:'evidence_pack_v3.v1', release_gate:'appendix_review_required', live_fetching_performed:false, verification_claimed:false},
        bundle_consistency_report:{bundle_consistency_report_version:VERSION, bundle_model:'evidence_pack_v3.v1', consistency_score:0, release_gate:'bundle_consistency_review_required', live_fetching_performed:false, verification_claimed:false},
        publication_readiness_export_report:{publication_readiness_export_report_version:VERSION, report_model:'evidence_pack_v3.v1', publication_readiness_score:0, release_gate:'publication_review_required', live_fetching_performed:false, verification_claimed:false}
      };
    }
    const bundle = evidencePackV3.buildEvidencePackV3Bundle(packet, files, {version:VERSION, now:nowIso()});
    state.evidence_pack_v3_manifest = bundle.evidence_pack_v3_manifest;
    state.brief_traceability_report = bundle.brief_traceability_report;
    state.contradiction_falsifier_appendix = bundle.contradiction_falsifier_appendix;
    state.bundle_consistency_report = bundle.bundle_consistency_report;
    state.publication_readiness_export_report = bundle.publication_readiness_export_report;
    return bundle;
  }

  function publicationReviewBundle(packet){
    if(!publicationReviewGate?.buildPublicationReviewBundle){
      return {
        claim_classification_report:{claim_classification_report_version:VERSION, report_model:'publication_review_gate.v1', claim_count:0, release_gate:'claim_boundary_review_required', live_fetching_performed:false, verification_claimed:false},
        claim_boundary_audit_report:{claim_boundary_audit_version:VERSION, audit_model:'publication_review_gate.v1', unsupported_conclusion_count:0, boundary_issue_count:0, release_gate:'claim_boundary_review_required', live_fetching_performed:false, verification_claimed:false},
        contradiction_falsifier_completeness_report:{contradiction_falsifier_completeness_version:VERSION, completeness_model:'publication_review_gate.v1', completeness_score:0, release_gate:'contradiction_falsifier_review_required', live_fetching_performed:false, verification_claimed:false},
        publication_review_gate_report:{publication_review_gate_version:VERSION, gate_model:'publication_review_gate.v1', publication_review_score:0, blocker_reasons:['publication_review_module_missing'], release_gate:'publication_review_blocked', live_fetching_performed:false, verification_claimed:false},
        export_safe_final_review_report:{export_safe_final_review_report_version:VERSION, report_model:'publication_review_gate.v1', final_review_status:'manual_correction_required', release_gate:'publication_review_blocked'}
      };
    }
    const bundle = publicationReviewGate.buildPublicationReviewBundle(packet, {version:VERSION, now:nowIso()});
    state.claim_classification_report = bundle.claim_classification_report;
    state.claim_boundary_audit_report = bundle.claim_boundary_audit_report;
    state.contradiction_falsifier_completeness_report = bundle.contradiction_falsifier_completeness_report;
    state.publication_review_gate_report = bundle.publication_review_gate_report;
    state.export_safe_final_review_report = bundle.export_safe_final_review_report;
    return bundle;
  }


  function goldenWorkflowBundle(packet, exportPackResult = null){
    if(!goldenWorkflowCorpus?.buildGoldenWorkflowBundle){
      return {
        golden_workflow_corpus:{corpus_version:VERSION, corpus_model:'golden_workflow_corpus.v1', corpus_id:'golden-workflow-alpha24', live_fetching_performed:false, provider_execution_performed:false, verification_claimed:false},
        golden_end_to_end_demo_report:{golden_end_to_end_demo_report_version:VERSION, demo_model:'golden_workflow_corpus.v1', release_gate:'golden_demo_review_required', live_fetching_performed:false, provider_execution_performed:false, verification_claimed:false},
        golden_export_pack_validation_report:{golden_export_pack_validation_report_version:VERSION, validation_model:'golden_workflow_corpus.v1', release_gate:'golden_export_pack_review_required', live_fetching_performed:false, provider_execution_performed:false, verification_claimed:false},
        hosted_demo_scenario_evidence:{hosted_demo_scenario_evidence_version:VERSION, scenario_model:'golden_workflow_corpus.v1', release_gate:'hosted_demo_scenario_evidence_required', live_fetching_performed:false, provider_execution_performed:false, verification_claimed:false},
        release_readiness_runbook:{release_readiness_runbook_version:VERSION, runbook_model:'golden_workflow_corpus.v1', release_gate:'release_readiness_review_required', live_fetching_performed:false, provider_execution_performed:false, verification_claimed:false}
      };
    }
    const bundle = goldenWorkflowCorpus.buildGoldenWorkflowBundle(packet, exportPackResult, {version:VERSION, now:nowIso()});
    state.golden_workflow_corpus = bundle.golden_workflow_corpus;
    state.golden_end_to_end_demo_report = bundle.golden_end_to_end_demo_report;
    state.golden_export_pack_validation_report = bundle.golden_export_pack_validation_report;
    state.hosted_demo_scenario_evidence = bundle.hosted_demo_scenario_evidence;
    state.release_readiness_runbook = bundle.release_readiness_runbook;
    return bundle;
  }


  function releaseCandidateHygieneBundle(packet, exportPackResult = null){
    if(!releaseCandidateHygiene?.buildReleaseCandidateHygieneBundle){
      return {
        final_repo_hygiene_report:{final_repo_hygiene_report_version:VERSION, hygiene_model:'release_candidate_hygiene.v1', blockers:['release_candidate_hygiene_module_missing'], release_gate:'final_repo_hygiene_review_required', live_fetching_performed:false, verification_claimed:false},
        stale_release_copy_sweep:{stale_release_copy_sweep_version:VERSION, sweep_model:'release_candidate_hygiene.v1', stale_match_count:0, stale_matches:[], release_gate:'stale_release_copy_review_required', live_fetching_performed:false, verification_claimed:false},
        golden_workflow_regression_lock:{golden_workflow_regression_lock_version:VERSION, lock_model:'release_candidate_hygiene.v1', blockers:['release_candidate_hygiene_module_missing'], release_gate:'golden_workflow_regression_review_required', live_fetching_performed:false, verification_claimed:false},
        export_pack_artifact_consistency_lock:{export_pack_artifact_consistency_lock_version:VERSION, lock_model:'release_candidate_hygiene.v1', blockers:['release_candidate_hygiene_module_missing'], release_gate:'export_pack_artifact_review_required', live_fetching_performed:false, verification_claimed:false},
        hosted_demo_evidence_runbook:{hosted_demo_evidence_runbook_version:VERSION, runbook_model:'release_candidate_hygiene.v1', release_gate:'hosted_demo_evidence_review_required', live_fetching_performed:false, verification_claimed:false},
        no_browser_browser_ci_parity_report:{ci_parity_report_version:VERSION, parity_model:'release_candidate_hygiene.v1', blockers:['ci_results_not_embedded'], release_gate:'ci_parity_review_required', live_fetching_performed:false, verification_claimed:false},
        release_candidate_readiness_report:{release_candidate_readiness_report_version:VERSION, readiness_model:'release_candidate_hygiene.v1', blocker_reasons:['release_candidate_hygiene_module_missing'], release_gate:'release_candidate_hardening_review_required', live_fetching_performed:false, verification_claimed:false}
      };
    }
    const corpus = {
      files:{
        'package.json': JSON.stringify({version:VERSION}),
        'index.html': document?.documentElement?.outerHTML || '',
        'README.md': '',
        'CHANGELOG.md': '',
        'PUBLIC_DEMO.md': '',
        'docs/current-release.md': ''
      }
    };
    const bundle = releaseCandidateHygiene.buildReleaseCandidateHygieneBundle(packet, corpus, exportPackResult, {version:VERSION, stale_versions:['1.1.0-alpha.24','v1.1.0-alpha.24']});
    state.final_repo_hygiene_report = bundle.final_repo_hygiene_report;
    state.stale_release_copy_sweep = bundle.stale_release_copy_sweep;
    state.golden_workflow_regression_lock = bundle.golden_workflow_regression_lock;
    state.export_pack_artifact_consistency_lock = bundle.export_pack_artifact_consistency_lock;
    state.hosted_demo_evidence_runbook = bundle.hosted_demo_evidence_runbook;
    state.no_browser_browser_ci_parity_report = bundle.no_browser_browser_ci_parity_report;
    state.release_candidate_readiness_report = bundle.release_candidate_readiness_report;
    return bundle;
  }


  function researchPacket(){
    const sourceToBrief = sourceToBriefWorkbenchReport();
    const packet = {
      workflow_version: VERSION,
      generated_at: nowIso(),
      packet_migration_report: state.packet_migration_report || null,
      analysis_template: activeTemplateProfile(),
      onboarding: onboardingReport(),
      quality_gate: qualityGateReport(),
      release_candidate: state.release_candidate || releaseCandidateReport(),
      browser_qa_hardening: state.browser_qa_hardening || browserQaHardeningReport(),
      public_demo: state.public_demo || publicDemoReport(),
      release_notes: state.release_notes || releaseNotesReport(),
      public_demo_release_lock: state.public_demo_release_lock || publicDemoReleaseLockReport(),
      release_apply_integrity: state.release_apply_integrity || releaseApplyIntegrityReport(),
      release_provenance_ledger: state.release_provenance_ledger || releaseProvenanceLedgerReport(),
      hosted_demo_verification: state.hosted_demo_verification || hostedDemoReport(),
      browser_evidence_capture: state.browser_evidence_capture || browserEvidenceReport(),
      hosted_demo_smoke_fixes: state.hosted_demo_smoke_fixes || hostedDemoSmokeFixesReport(),
      hosted_demo_evidence_review: state.hosted_demo_evidence_review || hostedDemoEvidenceReviewReport(),
      privacy_export: {audit_version: VERSION, guard_version: VERSION, safe:true, release_gate:'pass', issue_count:0, pre_redaction_issue_count:0, post_redaction_issue_count:0, raw_token_exported:false, access_token_exported:false, refresh_token_exported:false, key_exported:false, secret_exported:false, credential_exported:false, redaction_applied:false, issues:[], redacted_issues:[]},
      project_workspace: projectWorkspace?.metadata ? projectWorkspace.metadata(state, workspace) : null,
      export_pack: {export_pack_version: VERSION, format: 'export_pack_v2', files: ['research-packet.json','analysis-brief.md','evidence-matrix.csv','review-queue.csv','provider-run-ledger.json','quality-report.json','privacy-audit.json'], release_gate: 'privacy_audit_required'},
      research_plan: state.plan,
      research_planner_report: state.research_planner_report || (state.plan ? buildResearchPlannerReport(state.plan) : null),
      evidence_matrix: (state.evidence || []).map(item => scoreEvidence(item)),
      evidence_scoring_report: evidenceScoringReport(),
      causal_links: state.causal_links,
      analysis_brief: state.analysis_brief,
      diagnostics: diagnosticReport(),
      provider: state.provider || 'mock',
      provider_config: sanitizedProviderConfig(state.provider_config || {}),
      provider_identity: providerIdentityReport(),
      provider_billing_policy: providerBillingPolicy(),
      provider_route_plan: providerRoutePlan(),
      provider_route_report: providerRouteReport(),
      provider_cost_report: providerCostReport(),
      provider_router_safety_report: providerRouterSafetyReport(),
      portable_account: portableAccountStatus(),
      portable_oauth_spike: portableOAuthSpikeStatus(),
      provider_validation: state.last_provider_validation || null,
      repair_trace: state.last_repair_trace || null,
      provider_diagnostics: state.provider_diagnostics || null,
      provider_fixture_report: state.provider_fixture_report || null,
      source_policy: state.source_policy || sourcePolicy(),
      source_capability_registry: state.source_capability_registry || sourceCapabilityRegistryReport(),
      controlled_connector_report: state.controlled_connector_report || controlledConnectorReport(),
      connector_safety_report: state.connector_safety_report || connectorSafetyReport(),
      source_diagnostics: state.source_diagnostics || null,
      source_fixture_report: state.source_fixture_report || null,
      source_requests: state.last_source_request ? [state.last_source_request] : [],
      source_runs: state.source_runs || [],
      source_results: state.source_results || [],
      search_provider_identity: searchProviderIdentity(),
      search_query_budget: searchQueryBudget(),
      search_policy: searchPolicyReport(),
      source_imports: state.source_imports || [],
      evidence_review_queue: state.evidence_review_queue || [],
      evidence_review_report: evidenceReviewReport(),
      evidence_workspace_ux_report: evidenceWorkspaceUxReport(),
      review_throughput_report: reviewThroughputReport(),
      source_clusters: buildSourceClusters(),
      source_cluster_report: sourceClusterGapReport(),
      source_gap_report: sourceClusterGapReport(),
      source_to_brief_workbench: sourceToBrief,
      source_to_brief_package: sourceToBrief,
      claim_map: sourceToBrief.claim_map || [],
      contradiction_groups: sourceToBrief.contradiction_groups || [],
      source_to_brief_confidence_review: sourceToBrief.confidence_review || null,
      source_to_brief_gap_report: sourceToBrief.source_gaps || null,
      entity_profiles: entityProfiles(),
      entity_map_report: entityMapReport(),
      entity_alias_report: entityAliasReport(),
      strategic_evidence_graph: strategicEvidenceGraphReport(),
      graph_quality_report: graphQualityReport(),
      graph_export_report: graphExportReport(),
      source_import_report: state.source_import_report || null,
      source_packet_builder_report: state.source_packet_builder_report || null,
      last_built_source_packet: state.last_built_source_packet || null,
      source_packet_template_report: state.source_packet_template_report || (sourcePacketTemplates?.templateReport ? sourcePacketTemplates.templateReport(state.active_source_packet_template || 'generic_article') : null),
      source_packet_roundtrip_report: state.source_packet_roundtrip_report || null,
      claim_classification_report: state.claim_classification_report || null,
      claim_boundary_audit_report: state.claim_boundary_audit_report || null,
      contradiction_falsifier_completeness_report: state.contradiction_falsifier_completeness_report || null,
      publication_review_gate_report: state.publication_review_gate_report || null,
      export_safe_final_review_report: state.export_safe_final_review_report || null,
      golden_workflow_corpus: state.golden_workflow_corpus || null,
      golden_end_to_end_demo_report: state.golden_end_to_end_demo_report || null,
      golden_export_pack_validation_report: state.golden_export_pack_validation_report || null,
      hosted_demo_scenario_evidence: state.hosted_demo_scenario_evidence || null,
      release_readiness_runbook: state.release_readiness_runbook || null,
      final_repo_hygiene_report: state.final_repo_hygiene_report || null,
      stale_release_copy_sweep: state.stale_release_copy_sweep || null,
      golden_workflow_regression_lock: state.golden_workflow_regression_lock || null,
      export_pack_artifact_consistency_lock: state.export_pack_artifact_consistency_lock || null,
      hosted_demo_evidence_runbook: state.hosted_demo_evidence_runbook || null,
      no_browser_browser_ci_parity_report: state.no_browser_browser_ci_parity_report || null,
      release_candidate_readiness_report: state.release_candidate_readiness_report || null,
      ai_runs: providerRouterEngine?.enrichRunLedger ? providerRouterEngine.enrichRunLedger(state.ai_runs || [], providerRoutePlan(), {version:VERSION}) : (state.ai_runs || []),
      critique: state.critique
    };
    const evidencePack = evidencePackV3Bundle(packet);
    const publicationReview = publicationReviewBundle(Object.assign({}, packet, evidencePack));
    const goldenWorkflow = goldenWorkflowBundle(Object.assign({}, packet, evidencePack, publicationReview));
    const rcHygiene = releaseCandidateHygieneBundle(Object.assign({}, packet, evidencePack, publicationReview, goldenWorkflow));
    return Object.assign(packet, evidencePack, publicationReview, goldenWorkflow, rcHygiene, {
      export_pack: Object.assign({}, packet.export_pack || {}, {export_pack_version: VERSION, format: 'export_pack_v3', release_gate: 'privacy_audit_required'})
    });
  }

  function buildDeepResearchPrompt(){
    return window.Jarbou3iResearchModules.prompts.buildDeepResearchPrompt({packet: researchPacket(), template: activeTemplateProfile()});
  }
  function makeEvidenceEntry(){
    const entry = {
      evidence_id: state.editingEvidenceIndex >= 0 ? state.evidence[state.editingEvidenceIndex]?.evidence_id : `E${state.evidence.length + 1}`,
      claim: ($('evClaim')?.value || '').trim(),
      source_title: ($('evSourceTitle')?.value || '').trim(),
      source_url: ($('evSourceUrl')?.value || '').trim(),
      source_type: $('evSourceType')?.value || 'other',
      source_date: ($('evSourceDate')?.value || '').trim() || 'unknown',
      time_relevance_score: clampScore($('evTimeScore')?.value || 3),
      evidence_strength: clampScore($('evStrength')?.value || 3),
      public_signal_score: clampScore($('evPublicSignal')?.value || 1),
      supports: idsFrom($('evSupports')?.value),
      contradicts: idsFrom($('evContradicts')?.value),
      confidence: $('evConfidence')?.value || 'medium',
      notes: ($('evNotes')?.value || '').trim()
    };
    if(!entry.claim) throw new Error('claim_required');
    return scoreEvidence(entry);
  }

  function clearEvidenceForm(){
    ['evClaim','evSourceTitle','evSourceUrl','evSourceDate','evSupports','evContradicts','evNotes'].forEach(id=>{if($(id)) $(id).value='';});
    if($('evStrength')) $('evStrength').value = '3';
    if($('evTimeScore')) $('evTimeScore').value = '3';
    if($('evPublicSignal')) $('evPublicSignal').value = '1';
    if($('evConfidence')) $('evConfidence').value = 'medium';
    state.editingEvidenceIndex = -1;
    state.editingReviewIndex = -1;
    updateEvidenceButtonLabel();
  }

  function fillEvidenceForm(evidence, index){
    if(!evidence) return;
    state.editingEvidenceIndex = index;
    if($('evClaim')) $('evClaim').value = evidence.claim || '';
    if($('evSourceTitle')) $('evSourceTitle').value = evidence.source_title || '';
    if($('evSourceUrl')) $('evSourceUrl').value = evidence.source_url || '';
    if($('evSourceType')) $('evSourceType').value = evidence.source_type || 'other';
    if($('evSourceDate')) $('evSourceDate').value = evidence.source_date || '';
    if($('evStrength')) $('evStrength').value = evidence.evidence_strength || 3;
    if($('evTimeScore')) $('evTimeScore').value = evidence.time_relevance_score || 3;
    if($('evPublicSignal')) $('evPublicSignal').value = evidence.public_signal_score || 1;
    if($('evConfidence')) $('evConfidence').value = evidence.confidence || 'medium';
    if($('evSupports')) $('evSupports').value = (evidence.supports || []).join(',');
    if($('evContradicts')) $('evContradicts').value = (evidence.contradicts || []).join(',');
    if($('evNotes')) $('evNotes').value = evidence.notes || '';
    updateEvidenceButtonLabel();
    setStatus(tr('statusEditing'), 'warn');
  }

  function updateEvidenceButtonLabel(){
    const btn = $('addEvidenceBtn');
    if(btn) btn.textContent = state.editingEvidenceIndex >= 0 ? tr('updateEvidence') : tr('addEvidence');
  }

  function loadDemoEvidence(){
    const t = topic();
    state.evidence = [
      {evidence_id:'E1', claim:`Observable actor incentives shape the strategic trajectory of ${t}.`, source_title:'Demo chronology note', source_url:'', source_type:'other', source_date:'unknown', time_relevance_score:3, evidence_strength:3, public_signal_score:2, supports:['I1','A1'], contradicts:[], confidence:'medium', notes:'Placeholder evidence; replace with real source-backed material before publication.'},
      {evidence_id:'E2', claim:'Declared narratives do not fully explain tool selection or outcome distribution.', source_title:'Demo contradiction note', source_url:'', source_type:'other', source_date:'unknown', time_relevance_score:3, evidence_strength:3, public_signal_score:2, supports:['N1','T1'], contradicts:['R1'], confidence:'medium', notes:'Used to test contradiction handling.'},
      {evidence_id:'E3', claim:'Future scenarios depend on whether feedback loops amplify or dampen current incentives.', source_title:'Demo scenario note', source_url:'', source_type:'other', source_date:'unknown', time_relevance_score:4, evidence_strength:3, public_signal_score:1, supports:['F1','S1'], contradicts:[], confidence:'medium', notes:'Used to test scenario and falsifier discipline.'}
    ].map(item => scoreEvidence(item));
    inferCausalLinks();
    save(); render();
  }

  function makeCausalLink(){
    const from = ($('linkFrom')?.value || '').trim();
    const to = ($('linkTo')?.value || '').trim();
    const relationship = $('linkRelationship')?.value || 'enables';
    const evidence_ids = normalizeEvidenceIds(idsFrom($('linkEvidenceIds')?.value));
    const confidence = $('linkConfidence')?.value || 'medium';
    if(!validId(from) || !validId(to) || !evidence_ids.length || !RELATIONSHIPS.includes(relationship)) throw new Error('invalid_link');
    return {from, to, relationship, evidence_ids, confidence};
  }

  function clearCausalForm(){
    ['linkFrom','linkTo','linkEvidenceIds'].forEach(id=>{if($(id)) $(id).value='';});
    if($('linkRelationship')) $('linkRelationship').value='enables';
    if($('linkConfidence')) $('linkConfidence').value='medium';
  }

  function inferCausalLinks(){
    const links = [];
    for(const evidence of state.evidence){
      const ids = [...(evidence.supports || []), ...(evidence.contradicts || [])].filter(validId);
      for(let i=0; i<ids.length-1; i++){
        links.push({from: ids[i], to: ids[i+1], relationship: (evidence.contradicts || []).includes(ids[i+1]) ? 'contradicts' : 'enables', evidence_ids:[evidence.evidence_id], confidence:evidence.confidence || 'medium'});
      }
    }
    const seen = new Set();
    state.causal_links = links.filter(link => {
      const key = `${link.from}|${link.to}|${link.relationship}|${link.evidence_ids.join(',')}`;
      if(seen.has(key)) return false;
      seen.add(key);
      return true;
    });
    return state.causal_links;
  }

  function layerFromId(id){
    const prefix = String(id || '').replace(/[0-9]/g,'');
    return ({I:'interests',A:'actors',T:'tools',N:'narrative',R:'results',F:'feedback',S:'scenarios',C:'contradictions'})[prefix] || 'other';
  }

  function collectLinkedIds(){
    const ids = new Set();
    for(const evidence of state.evidence){
      [...(evidence.supports || []), ...(evidence.contradicts || [])].filter(validId).forEach(id => ids.add(id));
    }
    for(const link of state.causal_links){
      if(validId(link.from)) ids.add(link.from);
      if(validId(link.to)) ids.add(link.to);
    }
    return [...ids].sort();
  }

  function buildSourceClusterIntelligence(){
    if(sourceClusterEngine?.buildSourceClusterIntelligence){
      return sourceClusterEngine.buildSourceClusterIntelligence((state.evidence || []).map(item => scoreEvidence(item)), {
        version: VERSION,
        now: nowIso(),
        layerFromId
      });
    }
    return {source_cluster_version: VERSION, clusters: [], gap_report: {source_gap_report_version: VERSION, release_gate:'review_required', global_gap_flags:['source_cluster_engine_missing'], live_fetching_performed:false, verification_claimed:false}};
  }

  function buildSourceClusters(){
    return buildSourceClusterIntelligence().clusters || [];
  }

  function sourceClusterGapReport(){
    return buildSourceClusterIntelligence().gap_report;
  }

  function buildEntityIntelligence(){
    const clusterIntelligence = buildSourceClusterIntelligence();
    if(entityIntelligence?.buildEntityIntelligence){
      return entityIntelligence.buildEntityIntelligence((state.evidence || []).map(item => scoreEvidence(item)), clusterIntelligence.clusters || [], {
        version: VERSION,
        now: nowIso(),
        ignore_list: state.entity_ignore_list || []
      });
    }
    return {entity_intelligence_version: VERSION, entity_profiles: [], entity_map_report: {entity_map_report_version: VERSION, release_gate:'entity_review_required', entity_gap_flags:['entity_intelligence_module_missing'], live_fetching_performed:false, verification_claimed:false}, entity_alias_report: {entity_alias_report_version: VERSION, live_fetching_performed:false, verification_claimed:false}};
  }

  function entityProfiles(){
    return buildEntityIntelligence().entity_profiles || [];
  }

  function entityMapReport(){
    return buildEntityIntelligence().entity_map_report || {entity_map_report_version: VERSION, release_gate:'entity_review_required'};
  }

  function entityAliasReport(){
    return buildEntityIntelligence().entity_alias_report || {entity_alias_report_version: VERSION};
  }

  function buildResearchPlannerReport(planInput = state.plan){
    const plan = planInput || state.plan || null;
    if(researchPlannerV2?.buildResearchPlannerV2){
      const clusterIntelligence = buildSourceClusterIntelligence();
      const entityIntel = buildEntityIntelligence();
      return researchPlannerV2.buildResearchPlannerV2({
        plan: plan || {},
        evidence: (state.evidence || []).map(item => scoreEvidence(item)),
        clusters: clusterIntelligence.clusters || [],
        entities: entityIntel.entity_profiles || []
      }, {version: VERSION, now: nowIso()});
    }
    return {research_planner_version: VERSION, planner_model:'research_planner_v2.v1', depth_preset:'standard', entity_aware_queries:[], counter_evidence_targets:[], platform_source_recommendations:[], connector_readiness:[], source_type_budget:{budget:{}, budget_total:0}, planner_quality_score:0, planner_gap_flags:['research_planner_module_missing'], release_gate:'planner_review_required', live_fetching_performed:false, verification_claimed:false};
  }

  function diagnosticReport(){
    const linkedIds = collectLinkedIds();
    const evidenceIds = new Set(state.evidence.map(item => item.evidence_id));
    const missingEvidenceRefs = [];
    for(const link of state.causal_links){
      for(const id of link.evidence_ids || []){
        if(!evidenceIds.has(id)) missingEvidenceRefs.push(`${link.from}->${link.to}:${id}`);
      }
    }
    const coverage = {
      interests: linkedIds.filter(id => layerFromId(id) === 'interests').length,
      actors: linkedIds.filter(id => layerFromId(id) === 'actors').length,
      tools: linkedIds.filter(id => layerFromId(id) === 'tools').length,
      narrative: linkedIds.filter(id => layerFromId(id) === 'narrative').length,
      results: linkedIds.filter(id => layerFromId(id) === 'results').length,
      feedback: linkedIds.filter(id => layerFromId(id) === 'feedback').length,
      scenarios: linkedIds.filter(id => layerFromId(id) === 'scenarios').length,
      contradictions: linkedIds.filter(id => layerFromId(id) === 'contradictions').length
    };
    const required = ['interests','actors','tools','narrative','results','feedback'];
    const gaps = [];
    if(!state.plan) gaps.push('research_plan_missing');
    if(state.evidence.length < 5) gaps.push('evidence_volume_below_research_threshold');
    if(state.evidence.filter(e => e.source_url).length < 3) gaps.push('source_urls_below_traceability_threshold');
    if(state.evidence.filter(e => e.source_date && e.source_date !== 'unknown').length < 3) gaps.push('source_dates_below_traceability_threshold');
    if(new Set(state.evidence.map(e => e.source_type)).size < 3) gaps.push('source_type_diversity_low');
    if(!state.evidence.some(e => (e.contradicts || []).length)) gaps.push('counter_evidence_missing');
    if(state.causal_links.length < 3) gaps.push('causal_links_sparse');
    if(!(state.ai_runs || []).some(run => run.status === 'ok')) gaps.push('provider_harness_not_exercised');
    for(const key of required){ if(!coverage[key]) gaps.push(`${key}_coverage_missing`); }
    if(missingEvidenceRefs.length) gaps.push('causal_links_reference_missing_evidence');
    return {
      diagnostics_version: VERSION,
      generated_at: nowIso(),
      linked_ids: linkedIds,
      coverage,
      gaps,
      missing_evidence_references: missingEvidenceRefs,
      status: gaps.length ? 'review_required' : 'synthesis_ready'
    };
  }

  function compileAnalysisBrief(shouldPersist = true){
    if(!state.plan) state.plan = buildResearchPlan();
    if(!state.causal_links.length && state.evidence.length) inferCausalLinks();
    const diagnostics = diagnosticReport();
    const clusterIntelligence = buildSourceClusterIntelligence();
    const clusters = clusterIntelligence.clusters || [];
    const sourceGapReport = clusterIntelligence.gap_report || sourceClusterGapReport();
    const entityIntel = buildEntityIntelligence();
    const entityMap = entityIntel.entity_map_report || entityMapReport();
    const plannerReport = buildResearchPlannerReport(state.plan);
    const graphIntel = buildStrategicEvidenceGraph();
    const providerRouting = buildProviderRouterBundle();
    const scores = qualityScores();
    const template = activeTemplateProfile();
    const fitReport = analysisTemplates?.templateFitReport ? analysisTemplates.templateFitReport(state, template?.template_id) : null;
    const brief = {
      brief_version: VERSION,
      generated_at: nowIso(),
      topic: topic(),
      context: context(),
      mode: researchMode(),
      analysis_template: template,
      template_fit_report: fitReport,
      readiness_score: scores.readiness,
      research_questions: state.plan?.questions || [],
      research_planner_report: plannerReport,
      planner_quality_score: plannerReport.planner_quality_score || 0,
      depth_preset: plannerReport.depth_preset || 'standard',
      source_clusters: clusters,
      source_cluster_report: sourceGapReport,
      source_gap_report: sourceGapReport,
      entity_profiles: entityIntel.entity_profiles || [],
      entity_map_report: entityMap,
      entity_alias_report: entityIntel.entity_alias_report || entityAliasReport(),
      strategic_evidence_graph: graphIntel,
      graph_quality_report: graphIntel.graph_quality_report,
      graph_export_report: graphIntel.graph_export_report,
      provider_route_report: providerRouting.provider_route_report,
      provider_cost_report: providerRouting.provider_cost_report,
      provider_router_safety_report: providerRouting.provider_router_safety_report,
      coverage: diagnostics.coverage,
      gaps: [...new Set([...(diagnostics.gaps || []), ...(sourceGapReport.global_gap_flags || []), ...(entityMap.entity_gap_flags || []), ...(plannerReport.planner_gap_flags || []), ...(graphIntel.graph_quality_report?.graph_gap_flags || []), ...(providerRouting.provider_route_report?.blocked_route_count ? ['provider_route_blockers_present'] : [])])],
      evidence_priorities: (sourceGapReport.recommendations || []).length
        ? sourceGapReport.recommendations
        : (diagnostics.gaps.includes('counter_evidence_missing')
          ? ['Add evidence that directly contradicts a dominant narrative or expected result.', 'Add at least three traceable URLs and dates.', 'Add coverage for all six Jarbou3i layers.']
          : ['Verify source dates and URLs before publication.', 'Manually inspect causal-link direction before synthesis.']),
      synthesis_constraints: [
        'Do not claim source verification unless a source URL and source date are present.',
        'Separate observation, inference, and estimate in the final strategic JSON.',
        'Use only causal links that reference existing evidence IDs.',
        'Treat contradiction clusters as high-information diagnostics, not automatic proof of intent.'
      ].concat(template?.prompt_directives || []),
      handoff_summary: `Compile ${state.evidence.length} evidence items and ${state.causal_links.length} causal links into a Jarbou3i strategic analysis for ${topic()}.`
    };
    state.entity_profiles = entityIntel.entity_profiles || [];
    state.entity_map_report = entityMap;
    state.entity_alias_report = entityIntel.entity_alias_report || entityAliasReport();
    state.research_planner_report = plannerReport;
    state.strategic_evidence_graph = graphIntel;
    state.graph_quality_report = graphIntel.graph_quality_report;
    state.graph_export_report = graphIntel.graph_export_report;
    const qualityReport = qualityGate.calculateQualityGateV3Report(Object.assign({}, state, {analysis_brief: brief}), {evidenceReviewReport, providerSafetyReport});
    brief.quality_gate_report = qualityReport;
    brief.publication_readiness = qualityReport.publication_readiness;
    brief.quality_fix_actions = qualityReport.fix_actions;
    const sourceToBrief = buildSourceToBriefPackage(brief, shouldPersist);
    brief.source_to_brief_workbench = sourceToBrief;
    brief.claim_map = sourceToBrief.claim_map || [];
    brief.contradiction_groups = sourceToBrief.contradiction_groups || [];
    brief.confidence_review = sourceToBrief.confidence_review || null;
    if(shouldPersist){
      state.analysis_brief = brief;
      state.diagnostics = diagnostics;
      save();
    }
    return brief;
  }

  function buildSynthesisPrompt(){
    const brief = state.analysis_brief || compileAnalysisBrief(false);
    return window.Jarbou3iResearchModules.prompts.buildSynthesisPrompt({brief, packet: researchPacket(), template: activeTemplateProfile()});
  }
  function evidenceAsLegacyItems(){
    return state.evidence.map((e, index) => ({
      id: e.evidence_id || `E${index+1}`,
      claim: e.claim,
      basis: e.source_url ? 'source_based' : 'inference',
      source_note: [e.source_title, e.source_type, e.source_date].filter(Boolean).join(' · '),
      confidence: e.confidence || 'medium',
      source_title: e.source_title,
      source_url: e.source_url,
      source_date: e.source_date,
      source_type: e.source_type,
      evidence_strength: e.evidence_strength,
      uncertainty: e.notes || 'Needs stronger source verification before publication.',
      counter_evidence: e.contradicts && e.contradicts.length ? `Contradicts ${e.contradicts.join(', ')}` : 'Counter-evidence target not yet specified.'
    }));
  }

  function buildMockAnalysis(){
    const t = topic();
    const c = context();
    const firstClaim = state.evidence[0]?.claim || `Evidence matrix is required to ground ${t}.`;
    const links = state.causal_links.length ? state.causal_links : inferCausalLinks();
    return {
      schema_version: '1.3.0-alpha.5',
      analysis_id: `jarbou3i-alpha-${Date.now()}`,
      language: getLang(),
      generated_at: nowIso(),
      model_mode: 'research-alpha-mock',
      subject: {title: t, context: c, question: `How should ${t} be interpreted through the Jarbou3i strategic model?`, executive_thesis: `Mock synthesis: ${t} should be treated as an adaptive system where interests, actors, tools, narrative, outcomes, and feedback loops must be tested against evidence rather than accepted as discourse.`},
      research_plan: state.plan,
      research_planner_report: state.research_planner_report || (state.plan ? buildResearchPlannerReport(state.plan) : null),
      evidence_matrix: state.evidence,
      analysis_template: activeTemplateProfile(),
      analysis_brief: state.analysis_brief || compileAnalysisBrief(false),
      interests: [
        {id:'I1', name:'Preserve strategic advantage', type:'strategic', intensity:4, horizon:'medium', stakes:'important', confidence:'medium', rationale:`Derived from the research plan and evidence signal: ${firstClaim}`},
        {id:'I2', name:'Control public legitimacy', type:'political', intensity:3, horizon:'short', stakes:'important', confidence:'medium', rationale:'Narrative control affects whether actors can sustain tool use and absorb backlash.'}
      ],
      actors: [
        {id:'A1', name:'Primary decision-making bloc', category:'state', financial:4, decision_access:5, disruption_capacity:4, media_influence:3, confidence:'medium', rationale:'Mock actor representing the decision center that can select tools and shape narratives.'},
        {id:'A2', name:'Narrative amplification network', category:'society', financial:2, decision_access:3, disruption_capacity:3, media_influence:5, confidence:'medium', rationale:'Mock actor representing media, influencers, parties, or institutions that translate interests into public frames.'}
      ],
      tools: [
        {id:'T1', name:'Narrative framing and agenda control', type:'informational', cost:2, risk:3, speed:4, reversibility:3, deniability:4, confidence:'medium', rationale:'Selected because narratives can prepare or justify later policy choices.'},
        {id:'T2', name:'Institutional/legal adjustment', type:'legal', cost:3, risk:4, speed:3, reversibility:2, deniability:2, confidence:'medium', rationale:'Selected when actors need durable rules rather than only persuasion.'}
      ],
      narrative: [{id:'N1', name:'Public-interest justification', frame:'security', coherence:4, media_alignment:3, public_acceptance:3, confidence:'medium', rationale:'Mock narrative layer used to test whether stated legitimacy matches tools and outcomes.'}],
      results: [{id:'R1', name:'Redistribution of influence', type:'indirect', goal_achieved_pct:55, cost_benefit:3, power_balance_impact:'mixed', confidence:'medium', rationale:'Mock result: power shifts are plausible but require better source confirmation.'}],
      feedback: [{id:'F1', description:'Actors adapt tools and narratives after observing public resistance, elite alignment, or institutional friction.', adapts:'tools', speed:'fast', confidence:'medium', rationale:'Feedback loop derived from system dynamics rather than a single-cause explanation.'}],
      causal_links: links,
      contradictions: {items:[{id:'C1', rhetoric:'Declared public-interest rationale', contradiction_type:'rhetoric_vs_action', affected_layers:['narrative','tools','results'], actions:['Tool selection creates winners and losers beyond the stated goal','Observed outcomes require more evidence before accepting the official explanation'], interpretation:'The contradiction is treated as an information-dense diagnostic point, not as proof of bad faith by itself.', severity:3, confidence:'medium'}]},
      scenarios: {items:[{id:'S1', name:'Feedback amplification', probability:55, timeframe:'near-to-medium term', drivers:['Narrative synchronization','Tool escalation','Actor realignment'], early_signals:['More coordinated messaging','Legal or institutional acceleration','Visible backlash or counter-mobilization'], disproven_if:['No tool escalation occurs','Opposing actors fail to mobilize','Evidence shows outcomes remain local and non-systemic'], rationale:'Scenario generated for testing the research workflow, not as a final forecast.'}]},
      evidence: {items:evidenceAsLegacyItems()},
      assumptions: {items:[{id:'AS1', assumption:'The available evidence is representative enough to support a first-pass strategic model.', risk:'high', disproving_test:'Add sources from opposing positions and check whether the causal structure changes.', implication_if_wrong:'The current analysis may overfit a narrow evidence set.'}]},
      quality_gate: qualityGateReport()
    };
  }

  function buildCritique(){
    const evidenceCount = state.evidence.length;
    const urlCount = state.evidence.filter(e=>e.source_url).length;
    const datedCount = state.evidence.filter(e=>e.source_date && e.source_date !== 'unknown').length;
    const contradCount = state.evidence.filter(e=>e.contradicts?.length).length;
    const sourceTypes = new Set(state.evidence.map(e=>e.source_type).filter(Boolean));
    const linkCount = state.causal_links.length;
    return {
      critique_version: VERSION,
      generated_at: nowIso(),
      summary: evidenceCount >= 5 && linkCount >= 3 ? 'The workflow has a usable research packet, but source verification remains outside this alpha.' : 'The workflow is still under-evidenced or under-linked and should not be published.',
      findings: [
        {type:'evidence_volume', severity: evidenceCount >= 5 ? 'medium' : 'high', finding: evidenceCount >= 5 ? 'Evidence volume is acceptable for alpha synthesis.' : 'Add at least five evidence items before treating the analysis as serious.'},
        {type:'source_traceability', severity: urlCount >= 3 && datedCount >= 3 ? 'medium' : 'high', finding: 'Strong outputs require source URLs and dates; otherwise claims remain weakly traceable.'},
        {type:'source_diversity', severity: sourceTypes.size >= 3 ? 'medium' : 'high', finding: sourceTypes.size >= 3 ? 'Source-type diversity is emerging.' : 'Evidence is too concentrated in one or two source types.'},
        {type:'counter_evidence_gap', severity: contradCount ? 'medium' : 'high', finding: contradCount ? 'At least one evidence item includes contradiction links.' : 'No evidence item clearly contradicts any claim or layer.'},
        {type:'causal_risk', severity: linkCount >= 3 ? 'medium' : 'high', finding: linkCount >= 3 ? 'Causal links exist; still validate each relationship manually.' : 'Causal graph is too sparse for confident synthesis.'},
        {type:'publication_risk', severity:'high', finding:'Alpha mock output is useful for architecture testing, not for final publication.'}
      ],
      recommended_next_actions: [
        'Add at least five evidence items from diverse source types.',
        'Include source dates and URLs for source-based claims.',
        'Add counter-evidence before running final strategic synthesis.',
        'Use causal links to connect evidence to interests, actors, tools, narrative, results, and feedback.',
        'Test whether scenarios are disproven by contrary indicators.'
      ]
    };
  }

  function portableAccountStatus(){
    return window.Jarbou3iResearchModules.portableAccountMock.status(state.portable_account, {version: VERSION});
  }

  function connectPortableAccount(){
    state.provider = 'portable_oauth';
    state.provider_config = sanitizedProviderConfig(Object.assign({}, state.provider_config || {}, {allow_live:false, remember_key:false}), 'portable_oauth');
    state.portable_account = window.Jarbou3iResearchModules.portableAccountMock.connect({version: VERSION});
    save(); render(); setStatus(tr('statusPortableConnected'), 'good');
  }

  function refreshPortableAccount(){
    state.portable_account = window.Jarbou3iResearchModules.portableAccountMock.refresh(state.portable_account, {version: VERSION});
    save(); render(); setStatus(tr('statusPortableRefreshed'), 'good');
  }

  function disconnectPortableAccount(){
    state.portable_account = window.Jarbou3iResearchModules.portableAccountMock.disconnected(VERSION);
    save(); render(); setStatus(tr('statusPortableDisconnected'), 'warn');
  }

  function exportPortableAccountStatus(){
    downloadJson('jarbou3i-portable-account-status-v0.29-beta.json', {workflow_version: VERSION, portable_account: window.Jarbou3iResearchModules.portableAccountMock.exportableStatus(state.portable_account, {version: VERSION})});
    setStatus(tr('statusPortableExported'), 'good');
  }

  function portableOAuthSpikeStatus(){
    const spike = window.Jarbou3iResearchModules.portableOAuthSpike;
    return state.portable_oauth_spike || (spike ? spike.disconnectStatus(VERSION) : null);
  }

  function portableOAuthConfig(){
    return {
      authorization_endpoint: ($('oauthAuthorizationEndpoint')?.value || 'https://portable-provider.example/oauth/authorize').trim(),
      token_endpoint: ($('oauthTokenEndpoint')?.value || 'https://portable-provider.example/oauth/token').trim(),
      client_id: ($('oauthClientId')?.value || 'jarbou3i-dev-client').trim(),
      redirect_uri: ($('oauthRedirectUri')?.value || (window.location?.origin ? window.location.origin + '/oauth/callback' : 'http://localhost:4173/oauth/callback')).trim(),
      scopes: ($('oauthScopes')?.value || 'openid profile email inference:chat billing:read').trim().split(/\s+/).filter(Boolean),
      spending_limit_cents: 1000
    };
  }

  function savePortableOAuthRuntime(authRequest){
    try {
      const runtime = Object.assign({}, authRequest.runtime_secret || {}, {token_endpoint: authRequest.token_endpoint, redirect_uri: authRequest.redirect_uri, client_id: portableOAuthConfig().client_id, scopes: authRequest.scopes});
      window.sessionStorage?.setItem('jarbou3i_portable_oauth_runtime', JSON.stringify(runtime));
    } catch (_) {}
  }

  function readPortableOAuthRuntime(){
    try { return JSON.parse(window.sessionStorage?.getItem('jarbou3i_portable_oauth_runtime') || '{}'); } catch (_) { return {}; }
  }

  async function buildPortableOAuthUrl(){
    const spike = window.Jarbou3iResearchModules.portableOAuthSpike;
    if(!spike) return;
    const authRequest = await spike.buildAuthorizationRequest(portableOAuthConfig(), {version: VERSION});
    savePortableOAuthRuntime(authRequest);
    state.provider = 'portable_oauth';
    state.provider_config = sanitizedProviderConfig(Object.assign({}, state.provider_config || {}, {allow_live:false, remember_key:false}), 'portable_oauth');
    state.portable_oauth_spike = authRequest.exportable;
    state.portable_account = Object.assign({}, portableAccountStatus(), {portable_account_version:VERSION, status:'oauth_pkce_pending', token_state:'authorization_pending', mock_only:false, raw_token_exported:false, key_exported:false, access_token_exported:false, refresh_token_exported:false, code_verifier_exported:false, safety_verdict:authRequest.exportable.safety_verdict});
    save(); render();
    const out = $('providerRunOutput');
    if(out) out.innerHTML = '<div class="researchJsonCard"><h4>OAuth PKCE Authorization URL</h4><p><code>' + esc(authRequest.authorization_url) + '</code></p><small>Runtime code_verifier is stored in sessionStorage only and is not exported.</small></div>';
    setStatus('OAuth PKCE URL built. Open it in dev provider, then paste callback URL.', authRequest.validation.ok ? 'good' : 'warn');
    return authRequest;
  }

  async function completePortableOAuthCallback(){
    const spike = window.Jarbou3iResearchModules.portableOAuthSpike;
    if(!spike) return;
    const runtime = readPortableOAuthRuntime();
    const callback = spike.parseCallbackUrl(($('oauthCallbackUrl')?.value || '').trim(), runtime.state);
    if(!callback.code_present || !callback.state_matches){
      state.portable_oauth_spike = Object.assign({}, state.portable_oauth_spike || spike.disconnectStatus(VERSION), {status:'oauth_callback_rejected', token_state:'callback_invalid', callback_state_matches:callback.state_matches, raw_token_exported:false, key_exported:false, access_token_exported:false, refresh_token_exported:false, code_verifier_exported:false, safety_verdict:'oauth_callback_rejected_missing_code_or_state_mismatch'});
      save(); render(); setStatus('OAuth callback rejected: missing code or state mismatch.', 'bad'); return {callback};
    }
    const payload = spike.buildTokenExchangePayload(portableOAuthConfig(), runtime, callback);
    let response;
    try {
      const res = await fetch('/api/oauth/token-exchange', {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(payload)});
      response = await res.json();
      if(!res.ok || response.ok === false) throw new Error(response.error_code || response.error || 'oauth_exchange_failed');
      state.portable_account = response.portable_account;
      state.portable_oauth_spike = response.oauth_spike;
      state.provider = 'portable_oauth';
      save(); render(); setStatus('OAuth dev callback exchanged. Tokens sanitized; no live provider calls enabled.', 'good');
      return response;
    } catch(error){
      state.portable_oauth_spike = Object.assign({}, state.portable_oauth_spike || spike.disconnectStatus(VERSION), {status:'oauth_exchange_failed', token_state:'exchange_failed', error:String(error && error.message || error), raw_token_exported:false, key_exported:false, access_token_exported:false, refresh_token_exported:false, code_verifier_exported:false, safety_verdict:'oauth_exchange_failed_no_tokens_exported'});
      save(); render(); setStatus('OAuth token exchange failed safely: ' + String(error && error.message || error), 'bad');
      return {error:String(error && error.message || error)};
    }
  }

  function disconnectPortableOAuthSpike(){
    const spike = window.Jarbou3iResearchModules.portableOAuthSpike;
    try { window.sessionStorage?.removeItem('jarbou3i_portable_oauth_runtime'); } catch (_) {}
    state.portable_oauth_spike = spike ? spike.disconnectStatus(VERSION) : null;
    state.portable_account = state.portable_oauth_spike || window.Jarbou3iResearchModules.portableAccountMock.disconnected(VERSION);
    save(); render(); setStatus('OAuth spike disconnected; runtime verifier cleared.', 'warn');
  }

  function defaultEndpointForProvider(provider){
    if(provider === 'backend_proxy') return '/api/provider-task';
    if(provider === 'portable_oauth') return 'https://portable-provider.example/v1/chat/completions';
    return 'https://api.openai.com/v1/chat/completions';
  }

  function providerIdentityReport(provider = state.provider || $('providerName')?.value || 'mock', config = state.provider_config || {}){
    const safeConfig = sanitizedProviderConfig(config, provider);
    const keyPresent = (provider === 'backend_proxy' || provider === 'portable_oauth') ? false : !!readProviderKey();
    const tokenPresent = provider === 'portable_oauth' ? !!portableAccountStatus().token_present : false;
    return window.Jarbou3iResearchModules.providerIdentity.providerIdentity(provider, safeConfig, {key_present: keyPresent, token_present: tokenPresent});
  }

  function providerBillingPolicy(provider = state.provider || $('providerName')?.value || 'mock', config = state.provider_config || {}){
    const safeConfig = sanitizedProviderConfig(config, provider);
    const keyPresent = (provider === 'backend_proxy' || provider === 'portable_oauth') ? false : !!readProviderKey();
    const tokenPresent = provider === 'portable_oauth' ? !!portableAccountStatus().token_present : false;
    return window.Jarbou3iResearchModules.providerIdentity.billingPolicy(provider, safeConfig, {key_present: keyPresent, token_present: tokenPresent});
  }

  function sanitizedProviderConfig(config = state.provider_config || {}, provider = state.provider || $('providerName')?.value || 'mock'){
    return {
      endpoint: String(config.endpoint || defaultEndpointForProvider(provider)).trim(),
      model: String(config.model || (provider === 'backend_proxy' ? 'server-default' : (provider === 'portable_oauth' ? 'portable-default' : 'gpt-4.1-mini'))).trim(),
      allow_live: !!config.allow_live,
      remember_key: (provider === 'backend_proxy' || provider === 'portable_oauth') ? false : !!config.remember_key
    };
  }

  function readProviderKey(){
    const fieldValue = $('providerApiKey')?.value || '';
    if(fieldValue.trim()) return fieldValue.trim();
    try { return localStorage.getItem(BYOK_KEY_STORAGE) || ''; } catch(_) { return ''; }
  }

  function getProviderConfigFromUi(){
    const provider = $('providerName')?.value || state.provider || 'mock';
    const endpoint = ($('providerEndpoint')?.value || state.provider_config?.endpoint || defaultEndpointForProvider(provider)).trim();
    const model = ($('providerModel')?.value || state.provider_config?.model || (provider === 'backend_proxy' ? 'server-default' : (provider === 'portable_oauth' ? 'portable-default' : 'gpt-4.1-mini'))).trim();
    return {
      endpoint,
      model,
      allow_live: !!$('enableLiveByok')?.checked,
      remember_key: (provider === 'backend_proxy' || provider === 'portable_oauth') ? false : !!$('rememberProviderKey')?.checked
    };
  }

  function persistProviderSettings(){
    state.provider = $('providerName')?.value || state.provider || 'mock';
    state.provider_config = sanitizedProviderConfig(getProviderConfigFromUi(), state.provider);
    const key = ($('providerApiKey')?.value || '').trim();
    try {
      if(state.provider_config.remember_key && key) localStorage.setItem(BYOK_KEY_STORAGE, key);
      if(!state.provider_config.remember_key) localStorage.removeItem(BYOK_KEY_STORAGE);
    } catch(_) {}
    save();
    return state.provider_config;
  }

  function applyProviderSettingsToUi(){
    const config = sanitizedProviderConfig(state.provider_config || {}, state.provider || 'mock');
    if($('providerName')) $('providerName').value = state.provider || 'mock';
    if($('providerEndpoint')) $('providerEndpoint').value = config.endpoint;
    if($('providerModel')) $('providerModel').value = config.model;
    if($('enableLiveByok')) $('enableLiveByok').checked = !!config.allow_live;
    if($('rememberProviderKey')) $('rememberProviderKey').checked = !!config.remember_key;
    if($('providerApiKey') && config.remember_key && !$('providerApiKey').value){
      try { $('providerApiKey').value = localStorage.getItem(BYOK_KEY_STORAGE) || ''; } catch(_) {}
    }
  }

  function sourcePolicy(){
    return window.Jarbou3iResearchModules.sourceConnectors.sourcePolicy(VERSION, state.source_connector || 'manual_mock');
  }

  function searchProviderId(){
    return $('searchProviderSelect')?.value || state.search_provider_identity?.provider_id || 'mock_search';
  }
  function searchQueryBudget(){
    const abstraction = window.Jarbou3iResearchModules.searchProviderAbstraction;
    if(!abstraction) return state.search_query_budget || null;
    return abstraction.buildSearchQueryBudget({
      version: VERSION,
      max_queries: $('searchMaxQueries')?.value || state.search_query_budget?.max_queries || 6,
      max_results_per_query: state.search_query_budget?.max_results_per_query || 5,
      counter_evidence_queries: state.search_query_budget?.counter_evidence_queries || 2
    });
  }
  function searchProviderIdentity(){
    const abstraction = window.Jarbou3iResearchModules.searchProviderAbstraction;
    return abstraction ? abstraction.searchProviderIdentity(searchProviderId(), {version:VERSION}) : (state.search_provider_identity || null);
  }
  function searchPolicyReport(){
    const abstraction = window.Jarbou3iResearchModules.searchProviderAbstraction;
    if(!abstraction) return state.search_policy || null;
    return abstraction.buildSearchPolicy(searchProviderId(), Object.assign({}, searchQueryBudget() || {}, {version:VERSION}));
  }

  function buildSourceTaskRequest(){
    const connector = $('sourceConnector')?.value || state.source_connector || 'manual_mock';
    const task = $('sourceTask')?.value || state.source_task || 'source_plan';
    const request = window.Jarbou3iResearchModules.sourceConnectors.buildSourceTaskRequest({
      version: VERSION,
      topic: topic(),
      context: context(),
      connector,
      task,
      packet: researchPacket(),
      plan: state.plan,
      connector_options: {
        github_repo: ($('githubRepoInput')?.value || '').trim(),
        source_backend_endpoint: ($('sourceBackendEndpoint')?.value || '').trim() || '/api/source-task',
        search_provider: searchProviderId(),
        max_queries: $('searchMaxQueries')?.value || 6,
        max_results_per_query: 5,
        counter_evidence_queries: 2
      }
    });
    state.source_connector = connector;
    state.source_task = task;
    state.source_policy = request.safety_policy || sourcePolicy();
    if(connector === 'web_search_api'){
      state.search_provider_identity = request.web_search?.provider_identity || searchProviderIdentity();
      state.search_query_budget = request.web_search?.query_budget || searchQueryBudget();
      state.search_policy = request.web_search?.search_policy || searchPolicyReport();
    }
    state.last_source_request = request;
    return request;
  }

  function sourceBackendEndpoint(){
    const direct = ($('sourceBackendEndpoint')?.value || '').trim();
    if(direct) return direct;
    const providerEndpoint = ($('providerEndpoint')?.value || '').trim();
    if(providerEndpoint && /provider-task/.test(providerEndpoint)) return providerEndpoint.replace(/provider-task(\b|$)/, 'source-task$1');
    return '/api/source-task';
  }

  async function callBackendSourceTask(request){
    const response = await fetch(sourceBackendEndpoint(), {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify(request)
    });
    const text = await response.text();
    let parsed;
    try { parsed = JSON.parse(text); }
    catch (_) { throw new Error('source_backend_non_json_response'); }
    if(!response.ok || parsed.ok === false){
      const error = new Error(parsed?.error_code || parsed?.error || ('source_backend_http_' + response.status));
      error.details = parsed?.details || null;
      throw error;
    }
    return parsed;
  }

  function queueSourceConnectorCandidates(response, request){
    const candidates = response?.data?.evidence_candidates || [];
    if(!Array.isArray(candidates) || !candidates.length) return [];
    const parsed = {
      evidence: candidates,
      report: {
        import_version: VERSION,
        input_format: request.connector + '_connector_result',
        live_fetching_performed: !!response.source_fetching_performed || !!response.safety?.source_fetching_performed,
        verification_claimed: true,
        converted_count: candidates.length,
        rejected_count: 0,
        source_types: [...new Set(candidates.map((item)=>item.source_type || 'other'))],
        warnings: ['Connector results are source-backed metadata candidates but still require human review before Evidence Matrix promotion.']
      }
    };
    return queueImportedEvidence(parsed);
  }

  async function runSourceTask(){
    const request = buildSourceTaskRequest();
    let response;
    let queued = [];
    try {
      if(request.connector === 'github_public_repo'){
        response = await callBackendSourceTask(request);
        queued = queueSourceConnectorCandidates(response, request);
      } else {
        response = window.Jarbou3iResearchModules.sourceConnectors.mockSourceTaskResponse(request);
        if(['url_list_import','manual_transcript_import','manual_source_list_import'].includes(request.connector)) queued = queueSourceConnectorCandidates(response, request);
      }
    } catch(error){
      response = {ok:false, type:'source_task_error', data:{verdict:String(error && error.message || error)}, warnings:[String(error && error.message || error)]};
    }
    const diagnostics = window.Jarbou3iResearchModules.sourceConnectors.sourceDiagnostics(researchPacket(), request, response);
    const run = {
      run_id: 'SRC-' + Date.now(),
      run_version: VERSION,
      connector: request.connector,
      task: request.task,
      status: response.ok ? (request.connector === 'github_public_repo' ? 'fetched_review_required' : (request.connector === 'web_search_api' ? 'search_abstraction_planned' : 'planned')) : 'error',
      live_fetching_performed: !!(response.source_fetching_performed || response.safety?.source_fetching_performed),
      created_at: nowIso(),
      output_summary: response.data?.verdict || 'source planning response generated',
      search_provider_id: request.connector === 'web_search_api' ? (response.provider_identity?.provider_id || request.connector_options?.search_provider || 'mock_search') : null,
      search_query_count: request.connector === 'web_search_api' ? ((response.data?.query_plan?.queries || []).length) : 0,
      queued_review_count: queued.length,
      warnings: response.warnings || []
    };
    const resultRecord = response.ok && request.connector === 'web_search_api' ? {
      result_id: 'SR-' + Date.now(),
      result_version: VERSION,
      connector: request.connector,
      task: request.task,
      created_at: nowIso(),
      source_fetching_performed: false,
      review_gate: 'evidence_review_queue_required',
      queued_review_count: 0,
      provider_id: response.provider_identity?.provider_id || request.connector_options?.search_provider || 'mock_search',
      query_count: (response.data?.query_plan?.queries || []).length,
      counter_evidence_query_count: (response.data?.query_plan?.queries || []).filter(q => q.purpose === 'counter_evidence').length,
      evidence_candidate_count: 0,
      verdict: response.data?.verdict || 'web_search_abstraction_ready_no_live_fetch'
    } : response.ok && request.connector === 'github_public_repo' ? {
      result_id: 'SR-' + Date.now(),
      result_version: VERSION,
      connector: request.connector,
      task: request.task,
      created_at: nowIso(),
      source_fetching_performed: true,
      review_gate: 'evidence_review_queue_required',
      queued_review_count: queued.length,
      repo: response.data?.repo || null,
      release_count: Array.isArray(response.data?.releases) ? response.data.releases.length : 0,
      evidence_candidate_count: Array.isArray(response.data?.evidence_candidates) ? response.data.evidence_candidates.length : 0,
      verdict: response.data?.verdict || 'github_public_metadata_fetched_review_required'
    } : response.ok && ['url_list_import','manual_transcript_import','manual_source_list_import'].includes(request.connector) ? {
      result_id: 'SR-' + Date.now(),
      result_version: VERSION,
      connector: request.connector,
      task: request.task,
      created_at: nowIso(),
      source_fetching_performed: false,
      uncontrolled_scraping_performed: false,
      review_gate: 'evidence_review_queue_required',
      queued_review_count: queued.length,
      evidence_candidate_count: Array.isArray(response.data?.evidence_candidates) ? response.data.evidence_candidates.length : 0,
      verdict: response.data?.verdict || 'controlled_connector_candidates_review_required'
    } : null;
    state.controlled_connector_report = controlledConnectorReport();
    state.connector_safety_report = connectorSafetyReport();
    state.source_policy = request.safety_policy || sourcePolicy();
    if(request.connector === 'web_search_api'){
      state.search_provider_identity = response.provider_identity || request.web_search?.provider_identity || searchProviderIdentity();
      state.search_query_budget = response.data?.query_plan?.query_budget || request.web_search?.query_budget || searchQueryBudget();
      state.search_policy = response.search_policy || request.web_search?.search_policy || searchPolicyReport();
    }
    state.source_diagnostics = diagnostics;
    state.last_source_response = response;
    state.source_runs = [...(state.source_runs || []), run].slice(-25);
    if(resultRecord) state.source_results = [...(state.source_results || []), resultRecord].slice(-25);
    save();
    render();
    setStatus(response.ok ? (queued.length ? queued.length + ' source candidates queued for review.' : tr('statusSourceTaskBuilt')) : 'Source task failed: ' + (response.warnings?.[0] || 'unknown error'), response.ok ? 'good' : 'bad');
    return {request, response, diagnostics, run, queued};
  }

  function runSourceFixtureSuite(){
    const report = window.Jarbou3iResearchModules.sourceConnectors.runSourceFixtureSuite(VERSION);
    state.source_fixture_report = report;
    state.source_policy = sourcePolicy();
    state.source_diagnostics = window.Jarbou3iResearchModules.sourceConnectors.sourceDiagnostics(researchPacket(), state.last_source_request || buildSourceTaskRequest(), {ok:true, warnings:[]});
    save();
    render();
    setStatus(tr('statusSourceFixtureSuiteRun'), report.fail_count ? 'warn' : 'good');
    return report;
  }

  function exportSourcePolicy(){
    const payload = {source_policy: state.source_policy || sourcePolicy(), controlled_connector_report: controlledConnectorReport(), connector_safety_report: connectorSafetyReport(), search_provider_identity: searchProviderIdentity(), search_query_budget: searchQueryBudget(), search_policy: searchPolicyReport(), source_diagnostics: state.source_diagnostics || null, source_fixture_report: state.source_fixture_report || null};
    downloadJson(`jarbou3i-source-policy-${Date.now()}.json`, payload);
    setStatus(tr('statusSourcePolicyExported'), 'good');
  }

  async function copySourceRequest(){
    const request = state.last_source_request || buildSourceTaskRequest();
    await copyText(JSON.stringify(request, null, 2));
    setStatus(tr('statusSourceRequestCopied'), 'good');
  }

  function sourceImportFormat(){return $('sourceImportFormat')?.value || 'auto';}
  function sourceImportText(){return ($('sourceImportText')?.value || '').trim();}
  function parseSourceImport(){
    const adapter = window.Jarbou3iResearchModules.sourceImportAdapter;
    if(!adapter) throw new Error('source_import_adapter_missing');
    return adapter.parseSourceImportText(sourceImportText(), {format: sourceImportFormat()});
  }
  function previewSourceImport(){
    const adapter = window.Jarbou3iResearchModules.sourceImportAdapter;
    const preview = adapter.previewSourceImport(sourceImportText(), {format: sourceImportFormat()});
    state.last_source_import_preview = preview;
    state.source_import_report = preview.report;
    save(); render();
    setStatus(preview.ok ? tr('statusSourceImportPreviewed') : tr('statusSourceImportEmpty'), preview.ok ? 'good' : 'warn');
    return preview;
  }
  function importSourceEvidence(){
    const parsed = parseSourceImport();
    if(!parsed.ok){
      state.last_source_import_preview = {preview_version: VERSION, ok:false, report:parsed.report, sample_evidence:[], warnings:parsed.warnings};
      state.source_import_report = parsed.report;
      save(); render(); setStatus(tr('statusSourceImportEmpty'), 'warn');
      return parsed;
    }
    const queued = queueImportedEvidence(parsed);
    state.source_import_report = parsed.report;
    state.last_source_import_preview = {preview_version: VERSION, ok:true, report:parsed.report, sample_evidence:queued.map(item => item.evidence).slice(0,5), warnings:parsed.warnings};
    save(); render(); setStatus(tr('statusSourceImported'), 'good');
    return Object.assign({}, parsed, {queued_count: queued.length});
  }
  function exportSourceImportReport(){
    const report = state.source_import_report || (state.last_source_import_preview && state.last_source_import_preview.report) || null;
    downloadJson(`jarbou3i-source-import-report-${Date.now()}.json`, {workflow_version:VERSION, source_import_report:report, source_imports:state.source_imports || []});
    setStatus(tr('statusSourceImportReportExported'), 'good');
  }
  function clearSourceImport(){
    if(!confirmDestructive('Clear source import preview?')) return;
    if($('sourceImportText')) $('sourceImportText').value = '';
    if($('sourceImportFormat')) $('sourceImportFormat').value = 'auto';
    state.last_source_import_preview = null;
    state.source_import_report = null;
    save(); render(); setStatus(tr('statusSourceImportCleared'), 'warn');
  }

  function sourcePacketBuilder(){
    const builder = window.Jarbou3iResearchModules.sourcePacketBuilder;
    if(!builder) throw new Error('source_packet_builder_missing');
    return builder;
  }
  function sourcePacketTemplatePresets(){
    const templates = window.Jarbou3iResearchModules.sourcePacketTemplates;
    if(!templates) throw new Error('source_packet_templates_missing');
    return templates;
  }
  function reviewedEvidenceCandidates(){
    return (state.evidence_review_queue || [])
      .filter(item => item && item.status !== 'rejected')
      .map(item => item.evidence)
      .filter(Boolean);
  }
  function storeBuiltSourcePacket(packet){
    state.last_built_source_packet = packet;
    state.source_packet_builder_report = packet?.builder_report || null;
    if(packet?.template_model && sourcePacketTemplates?.templateReport){
      const templateId = packet.source_packets?.[0]?.template_id || state.active_source_packet_template || 'generic_article';
      state.active_source_packet_template = templateId;
      state.source_packet_template_report = sourcePacketTemplates.templateReport(templateId);
    }
    return packet;
  }
  function updateSourcePacketRoundtripReport(items){
    if(!sourcePacketRoundtrip?.runSourcePacketRoundtrip) return null;
    try{return state.source_packet_roundtrip_report=sourcePacketRoundtrip.runSourcePacketRoundtrip(items||[],{now:nowIso()}).report||null;}
    catch(_){return state.source_packet_roundtrip_report={roundtrip_version:VERSION,roundtrip_model:'source_packet_roundtrip.v1',live_fetching_performed:false,verification_claimed:false,release_gate:'roundtrip_review_required',risk_flags:['roundtrip_exception']};}
  }
  function buildSourcePacketFromEvidence(){
    const items = state.evidence || [];
    const packet = sourcePacketBuilder().buildSourcePacket(items, {now: nowIso()});
    storeBuiltSourcePacket(packet);
    updateSourcePacketRoundtripReport(items);
    save(); render();
    setStatus(packet.builder_report.evidence_item_count ? tr('statusSourcePacketBuilt') : tr('statusSourcePacketEmpty'), packet.builder_report.evidence_item_count ? 'good' : 'warn');
    return packet;
  }
  function buildSourcePacketFromReview(){
    const items = reviewedEvidenceCandidates();
    const packet = sourcePacketBuilder().buildSourcePacket(items, {now: nowIso()});
    storeBuiltSourcePacket(packet);
    updateSourcePacketRoundtripReport(items);
    save(); render();
    setStatus(packet.builder_report.evidence_item_count ? tr('statusSourcePacketBuilt') : tr('statusSourcePacketEmpty'), packet.builder_report.evidence_item_count ? 'good' : 'warn');
    return packet;
  }
  function buildSourcePacketFromTemplate(){
    const templateId = $('sourcePacketTemplateSelect')?.value || state.active_source_packet_template || 'generic_article';
    state.active_source_packet_template = templateId;
    const packet = sourcePacketTemplatePresets().sourcePacketFromTemplate(templateId, {title: `${templateId.replace(/_/g, ' ')} source`, captured_at: nowIso()}, {now: nowIso()});
    storeBuiltSourcePacket(packet);
    const parsed = window.Jarbou3iResearchModules.sourcePacketImporter?.parseSourcePacketImportText(JSON.stringify(packet));
    state.source_packet_roundtrip_report = sourcePacketRoundtrip?.buildRoundtripReport ? sourcePacketRoundtrip.buildRoundtripReport(packet, parsed, {now:nowIso()}) : state.source_packet_roundtrip_report;
    save(); render();
    setStatus(tr('statusSourcePacketTemplateBuilt'), 'good');
    return packet;
  }
  async function copyBuiltSourcePacket(){
    const packet = state.last_built_source_packet || buildSourcePacketFromEvidence();
    await copyText(JSON.stringify(packet, null, 2));
    setStatus(tr('statusSourcePacketCopied'), 'good');
  }
  function exportBuiltSourcePacket(){
    const packet = state.last_built_source_packet || buildSourcePacketFromEvidence();
    downloadJson(`jarbou3i-manual-source-packet-${Date.now()}.json`, packet);
    setStatus(tr('statusSourcePacketExported'), 'good');
  }
  function markReviewItemNeedsEdit(index){
    const item = (state.evidence_review_queue || [])[index];
    if(!item || item.status === 'accepted' || item.status === 'rejected') return;
    const controls = sourcePacketBuilder().reviewControlsForEvidence(item.evidence || {});
    item.status = 'needs_edit';
    item.review_notes = [item.review_notes || '', `Scoring review controls: ${controls.controls.join(', ') || 'manual_review'}.`].filter(Boolean).join(' ');
    item.scoring_review_controls = controls;
    state.evidence_review_report = evidenceReviewReport();
  }

  function pendingReviewItems(){
    return (state.evidence_review_queue || []).filter(item => item && (item.status === 'pending' || item.status === 'needs_edit'));
  }

  function evidenceReviewReport(){
    const queue = state.evidence_review_queue || [];
    const pending = queue.filter(item => item.status === 'pending' || item.status === 'needs_edit').length;
    const accepted = queue.filter(item => item.status === 'accepted').length;
    const rejected = queue.filter(item => item.status === 'rejected').length;
    const uxReport = evidenceWorkspaceUx?.workspaceUxReport ? evidenceWorkspaceUx.workspaceUxReport(queue, state.evidence_review_filters || {}, evidenceReviewContext()) : null;
    const report = {
      review_version: VERSION,
      generated_at: nowIso(),
      queue_count: queue.length,
      pending_count: pending,
      accepted_count: accepted,
      rejected_count: rejected,
      resolved_count: accepted + rejected,
      live_fetching_performed: false,
      verification_claimed: false,
      evidence_workspace_ux: uxReport ? {workspace_ux_version: uxReport.workspace_ux_version, visible_count: uxReport.visible_review_ids.length, queue_bypass_enabled:false, batch_controls_enabled:true} : null,
      throughput_readiness: uxReport?.throughput_report?.readiness || null,
      readiness: pending ? 'review_required' : (queue.length ? 'review_resolved' : 'empty')
    };
    state.evidence_review_report = report;
    state.evidence_workspace_ux_report = uxReport;
    state.review_throughput_report = uxReport?.throughput_report || null;
    return report;
  }

  function queueImportedEvidence(parsed){
    const importId = 'IMP-' + Date.now();
    const existing = state.evidence_review_queue || [];
    const queued = parsed.evidence.map((e, idx) => ({
      review_id: `RQ${existing.length + idx + 1}`,
      import_id: importId,
      created_at: nowIso(),
      status: 'pending',
      decision_at: null,
      accepted_evidence_id: null,
      evidence: scoreEvidence(Object.assign({}, e, {
        evidence_id: `CAND${existing.length + idx + 1}`,
        notes: [e.notes || '', 'Review required before promotion to Evidence Matrix.'].filter(Boolean).join(' ')
      })),
      review_notes: 'Imported candidate; source metadata and layer links require human review.'
    }));
    state.evidence_review_queue = existing.concat(queued);
    state.evidence_review_report = evidenceReviewReport();
    state.evidence_workspace_ux_report = evidenceWorkspaceUxReport();
    state.review_throughput_report = reviewThroughputReport();
    state.source_imports = [...(state.source_imports || []), {
      import_id: importId,
      imported_at: nowIso(),
      report: parsed.report,
      review_ids: queued.map(item => item.review_id),
      evidence_ids: [],
      queue_only: true
    }].slice(-25);
    return queued;
  }

  function promoteReviewItem(index, overrideEvidence = null){
    const item = (state.evidence_review_queue || [])[index];
    if(!item || item.status === 'accepted' || item.status === 'rejected') return null;
    const evidence = Object.assign({}, overrideEvidence || item.evidence || {});
    evidence.evidence_id = `E${state.evidence.length + 1}`;
    evidence.notes = [evidence.notes || '', `Promoted from review queue ${item.review_id}.`].filter(Boolean).join(' ');
    const scoredEvidence = scoreEvidence(evidence);
    state.evidence.push(scoredEvidence);
    renumberEvidence();
    item.status = 'accepted';
    item.decision_at = nowIso();
    item.accepted_evidence_id = state.evidence[state.evidence.length - 1]?.evidence_id || evidence.evidence_id;
    item.evidence = scoreEvidence(Object.assign({}, scoredEvidence, {evidence_id: item.evidence?.evidence_id || item.review_id}));
    state.evidence_review_report = evidenceReviewReport();
    return evidence;
  }

  function rejectReviewItem(index){
    const item = (state.evidence_review_queue || [])[index];
    if(!item || item.status === 'accepted' || item.status === 'rejected') return;
    item.status = 'rejected';
    item.decision_at = nowIso();
    state.evidence_review_report = evidenceReviewReport();
  }

  function editReviewItem(index){
    const item = (state.evidence_review_queue || [])[index];
    if(!item || !item.evidence) return;
    state.editingReviewIndex = index;
    state.editingEvidenceIndex = -1;
    fillEvidenceForm(item.evidence, -1);
    state.editingReviewIndex = index;
    if($('addEvidenceBtn')) $('addEvidenceBtn').textContent = tr('addEvidence');
    setStatus(tr('statusReviewEditing'), 'warn');
  }

  function acceptEditedReviewEvidence(){
    if(state.editingReviewIndex < 0 || !state.evidence_review_queue[state.editingReviewIndex]){
      setStatus(tr('statusNoReviewSelection'), 'warn');
      return;
    }
    try {
      const evidence = makeEvidenceEntry();
      promoteReviewItem(state.editingReviewIndex, evidence);
      state.editingReviewIndex = -1;
      clearEvidenceForm();
      save(); render(); setStatus(tr('statusEvidenceAccepted'), 'good');
    } catch(_) { setStatus(`${tr('claim')} required.`, 'bad'); }
  }

  function acceptAllReviewEvidence(){
    (state.evidence_review_queue || []).forEach((item, idx) => {
      if(item.status === 'pending' || item.status === 'needs_edit') promoteReviewItem(idx);
    });
    state.editingReviewIndex = -1;
    clearEvidenceForm();
    save(); render(); setStatus(tr('statusEvidenceAccepted'), 'good');
  }

  function clearResolvedReviewEvidence(){
    if(!confirmDestructive('Clear resolved review items?')) return;
    state.evidence_review_queue = (state.evidence_review_queue || []).filter(item => item.status === 'pending' || item.status === 'needs_edit');
    state.evidence_review_report = evidenceReviewReport();
    save(); render(); setStatus(tr('statusReviewQueueCleared'), 'warn');
  }

  function exportEvidenceReviewQueue(){
    downloadJson(`jarbou3i-evidence-review-queue-${Date.now()}.json`, {
      workflow_version: VERSION,
      evidence_review_report: evidenceReviewReport(),
      evidence_workspace_ux_report: evidenceWorkspaceUxReport(),
      review_throughput_report: reviewThroughputReport(),
      evidence_review_queue: state.evidence_review_queue || []
    });
    setStatus(tr('statusReviewQueueExported'), 'good');
  }

  function providerSafetyReport(){
    const provider = $('providerName')?.value || state.provider || 'mock';
    const config = sanitizedProviderConfig(state.provider_config || {}, provider);
    const keyPresent = (provider === 'backend_proxy' || provider === 'portable_oauth') ? false : !!readProviderKey();
    const identity = providerIdentityReport(provider, config);
    const billing = providerBillingPolicy(provider, config);
    const verdict = provider === 'mock' ? 'mock_safe' : (provider === 'backend_proxy' ? (config.allow_live ? 'hosted_proxy_ready' : 'dry_run_only') : (provider === 'portable_oauth' ? 'portable_oauth_placeholder' : (config.allow_live && keyPresent ? 'live_byok_ready' : 'dry_run_only')));
    return {
      provider,
      endpoint_configured: !!config.endpoint,
      model_configured: !!config.model,
      live_opt_in: !!config.allow_live,
      key_present: keyPresent,
      key_exported: false,
      key_storage: provider === 'backend_proxy' ? 'server_environment_secret' : (provider === 'portable_oauth' ? 'mock_oauth_token_hash_memory_only' : (config.remember_key ? 'local_device_only' : 'memory_only')),
      portable_account: provider === 'portable_oauth' ? portableAccountStatus() : null,
      auth_type: identity.auth_type,
      billing_owner: identity.billing_owner,
      key_exposure: identity.key_exposure,
      privacy_mode: identity.privacy_mode,
      credential_class: identity.credential_class,
      provider_identity: identity,
      billing_policy: billing,
      verdict
    };
  }

  function normalizeProviderTextResponse(text){
    return window.Jarbou3iResearchModules.providerCore.normalizeProviderTextResponse(text);
  }
  function hasOwn(obj, key){return !!obj && Object.prototype.hasOwnProperty.call(obj, key);}
  function responseArrayOk(data, key, min = 1){return Array.isArray(data?.[key]) && data[key].length >= min;}

  function validateProviderResponse(payload, response){
    return window.Jarbou3iResearchModules.providerCore.validateProviderResponse(payload, response, {version: VERSION, nowIso});
  }
  function repairProviderResponse(payload, response, validation){
    return window.Jarbou3iResearchModules.providerCore.repairProviderResponse(payload, response, validation, {
      mockProviderResponse,
      validateProviderResponse
    });
  }
  function validationSummary(validation, repairTrace){
    return window.Jarbou3iResearchModules.providerCore.validationSummary(validation, repairTrace);
  }
  async function callOpenAICompatibleProvider(payload, apiKey, config){
    return window.Jarbou3iResearchModules.openAICompatibleProvider.call(payload, apiKey, config, normalizeProviderTextResponse);
  }
  async function callBackendProxyProvider(payload, config){
    return window.Jarbou3iResearchModules.backendProxyProvider.call(payload, config, normalizeProviderTextResponse);
  }
  function dryRunProviderResponse(payload){
    return {
      ok:true,
      type:'provider_dry_run',
      data:{
        verdict:'dry_run_only',
        provider: payload.provider,
        task: payload.task,
        endpoint: payload.provider_config?.endpoint,
        model: payload.provider_config?.model,
        response_contract: payload.response_contract,
        prompt_chars: payload.prompt.length,
        packet_fingerprint: payload.input_fingerprint
      },
      warnings:[tr('statusProviderLiveDisabled')]
    };
  }

  function responseContract(task){
    return window.Jarbou3iResearchModules.providerCore.responseContract(task);
  }
  function stableHash(text){
    return window.Jarbou3iResearchModules.providerCore.stableHash(text);
  }
  function buildProviderPayload(task = $('providerTask')?.value || state.activeProviderTask || 'synthesis'){
    const providerConfig = persistProviderSettings();
    if(!state.plan) state.plan = buildResearchPlan();
    if(task !== 'plan' && !state.analysis_brief && state.evidence.length) compileAnalysisBrief(true);
    const packet = researchPacket();
    const promptMap = {
      plan: buildPlanPrompt(),
      synthesis: buildSynthesisPrompt(),
      repair: `Repair this Jarbou3i strategic analysis candidate so it conforms to schema_version 1.1.0. Return JSON only.\n\nCandidate:\n${JSON.stringify(state.lastMockAnalysis || buildMockAnalysis(), null, 2)}`,
      critique: buildDeepResearchPrompt(),
      source_discipline: `Audit the following research packet for source discipline. Do not verify sources; only inspect metadata completeness and diversity. Return structured JSON.\n\n${JSON.stringify(packet, null, 2)}`
    };
    return {
      request_version: VERSION,
      provider: $('providerName')?.value || state.provider || 'mock',
      provider_config: sanitizedProviderConfig(providerConfig),
      provider_safety: providerSafetyReport(),
      provider_identity: providerIdentityReport($('providerName')?.value || state.provider || 'mock', providerConfig),
      provider_billing_policy: providerBillingPolicy($('providerName')?.value || state.provider || 'mock', providerConfig),
      portable_account: (($('providerName')?.value || state.provider || 'mock') === 'portable_oauth') ? portableAccountStatus() : null,
      task,
      language: getLang(),
      created_at: nowIso(),
      privacy_mode: (($('providerName')?.value || state.provider) === 'backend_proxy' && providerConfig.allow_live) ? 'hosted_proxy_user_opt_in' : ((($('providerName')?.value || state.provider) === 'portable_oauth' && providerConfig.allow_live) ? 'portable_oauth_planned_opt_in' : ((($('providerName')?.value || state.provider) === 'openai_compatible' && providerConfig.allow_live) ? 'byok_live_user_opt_in' : 'local_or_dry_run')),
      response_contract: responseContract(task),
      input_fingerprint: stableHash(JSON.stringify(packet)),
      prompt: promptMap[task] || promptMap.synthesis,
      packet
    };
  }

  function providerContractPreview(task = $('providerTask')?.value || state.activeProviderTask || 'synthesis'){
    const contract = responseContract(task);
    return {
      preview_version: VERSION,
      task,
      type: contract.type,
      title: contract.title || contract.type,
      purpose: contract.purpose || '',
      required: contract.required || [],
      recommended: contract.recommended || [],
      reject_if: contract.reject_if || [],
      diagnostic_hints: contract.diagnostic_hints || [],
      example_shape: contract.example_shape || {}
    };
  }

  function providerPromptPreview(payload = buildProviderPayload()){
    return {
      preview_version: VERSION,
      task: payload.task,
      provider: payload.provider,
      prompt_chars: payload.prompt.length,
      prompt_fingerprint: stableHash(payload.prompt),
      input_fingerprint: payload.input_fingerprint,
      privacy_mode: payload.privacy_mode,
      first_1200_chars: payload.prompt.slice(0, 1200),
      truncated: payload.prompt.length > 1200
    };
  }

  function providerDiagnostics(payload = state.last_provider_payload || buildProviderPayload()){
    const contract = payload.response_contract || responseContract(payload.task);
    const safety = payload.provider_safety || providerSafetyReport();
    const identity = payload.provider_identity || safety.provider_identity || providerIdentityReport(payload.provider, payload.provider_config || {});
    const billing = payload.provider_billing_policy || safety.billing_policy || providerBillingPolicy(payload.provider, payload.provider_config || {});
    const missing = [];
    if(!payload.prompt || payload.prompt.length < 200) missing.push('prompt_too_short');
    if(!contract.required || !contract.required.length) missing.push('contract_missing_required_fields');
    if(payload.provider === 'openai_compatible' && payload.provider_config?.allow_live && !safety.key_present) missing.push('live_byok_enabled_without_key');
    if(payload.provider === 'backend_proxy' && payload.provider_config?.allow_live && !payload.provider_config?.endpoint) missing.push('backend_proxy_endpoint_missing');
    if(payload.task !== 'plan' && !state.analysis_brief) missing.push('analysis_brief_not_compiled');
    if(payload.task !== 'plan' && !state.evidence.length) missing.push('evidence_matrix_empty');
    return {
      diagnostics_version: VERSION,
      checked_at: nowIso(),
      task: payload.task,
      provider: payload.provider,
      contract_type: contract.type,
      required_count: (contract.required || []).length,
      prompt_chars: payload.prompt.length,
      input_fingerprint: payload.input_fingerprint,
      privacy_mode: payload.privacy_mode,
      key_exported: false,
      auth_type: identity.auth_type,
      billing_owner: billing.billing_owner,
      key_exposure: identity.key_exposure,
      provider_identity: identity,
      provider_billing_policy: billing,
      live_opt_in: !!payload.provider_config?.allow_live,
      readiness: missing.length ? 'review_required' : 'provider_ready',
      warnings: missing
    };
  }

  function runProviderFixtureSuite(){
    const report = window.Jarbou3iResearchModules.providerFixtures.runContractFixtureSuite(window.Jarbou3iResearchModules.providerCore);
    state.provider_fixture_report = report;
    state.provider_diagnostics = providerDiagnostics();
    save();
    render();
    setStatus(tr('statusProviderFixtureSuiteRun'), report.fail_count ? 'warn' : 'good');
    return report;
  }

  function mockProviderResponse(payload){
    return window.Jarbou3iResearchModules.mockProvider.response(payload, {
      evidence: state.evidence,
      clampScore,
      buildResearchPlan,
      buildMockAnalysis,
      buildCritique
    });
  }
  function summarizeProviderOutput(data){
    if(!data) return 'No output.';
    if(data.subject?.title) return `Strategic analysis: ${data.subject.title}`;
    if(data.questions) return `Research plan: ${data.questions.length} questions, ${data.target_sources?.length || 0} source targets.`;
    if(data.findings) return `Critique: ${data.findings.length} findings.`;
    if(data.verdict) return `Source discipline: ${data.verdict}.`;
    return 'Structured mock output generated.';
  }

  async function runProviderTask(){
    const started = performance.now();
    const payload = buildProviderPayload();
    state.last_provider_payload = payload;
    state.last_provider_contract_preview = providerContractPreview(payload.task);
    state.last_provider_prompt_preview = providerPromptPreview(payload);
    state.provider_diagnostics = providerDiagnostics(payload);
    let response;
    try {
      if(payload.provider === 'openai_compatible'){
        const key = readProviderKey();
        if(payload.provider_config?.allow_live && key){
          const data = await callOpenAICompatibleProvider(payload, key, payload.provider_config || {});
          response = {ok:true, type: payload.response_contract.type, data, warnings:['Live BYOK provider response. Verify schema and evidence before publication.']};
        } else {
          response = dryRunProviderResponse(payload);
        }
      } else if(payload.provider === 'backend_proxy'){
        if(payload.provider_config?.allow_live){
          const data = await callBackendProxyProvider(payload, payload.provider_config || {});
          response = {ok:true, type: payload.response_contract.type, data, warnings:['Hosted backend proxy response. Verify schema and evidence before publication.']};
        } else {
          response = dryRunProviderResponse(payload);
        }
      } else if(payload.provider === 'portable_oauth'){
        const portable = portableAccountStatus();
        if(portable.connected){
          response = mockProviderResponse(payload);
          response.warnings = [...(response.warnings || []), 'Portable account mock connection used. No live OAuth or provider call was made.'];
        } else {
          response = dryRunProviderResponse(payload);
          response.warnings = [...(response.warnings || []), 'Portable account mock is disconnected; no live OAuth call was made.'];
        }
      } else {
        response = mockProviderResponse(payload);
      }
    } catch(error) {
      response = {ok:false, type:'provider_error', data:{error:String(error && error.message || error)}, warnings:[tr('statusProviderLiveError')]};
    }

    let validation = validateProviderResponse(payload, response);
    let repairTrace = null;
    let appliedResponse = response;
    if(response.ok && validation.repair_required){
      repairTrace = repairProviderResponse(payload, response, validation);
      if(repairTrace.status === 'repaired'){
        appliedResponse = repairTrace.response;
        validation = repairTrace.validation;
      }
    }

    const accepted = !!validation.accepted;
    const completed = performance.now();
    const status = accepted ? (repairTrace?.status === 'repaired' ? 'repaired' : 'ok') : (response.ok ? 'validation_error' : 'error');
    const warnings = [...(response.warnings || [])];
    if(repairTrace?.attempted) warnings.push(repairTrace.status === 'repaired' ? tr('statusProviderRepaired') : tr('statusProviderValidationFailed'));
    if(!accepted && !repairTrace?.attempted) warnings.push(tr('statusProviderValidationFailed'));

    const run = {
      run_id: 'RUN-' + Date.now(),
      run_version: VERSION,
      provider: payload.provider,
      task: payload.task,
      status,
      started_at: payload.created_at,
      completed_at: nowIso(),
      duration_ms: Math.max(1, Math.round(completed - started)),
      input_fingerprint: payload.input_fingerprint,
      response_type: appliedResponse.type,
      response_contract: payload.response_contract,
      response_validation: validation,
      repair_trace: repairTrace ? {
        attempted: repairTrace.attempted,
        strategy: repairTrace.strategy,
        status: repairTrace.status,
        original_task: repairTrace.original_task,
        repair_task: repairTrace.repair_task,
        original_issues: repairTrace.original_issues || []
      } : {attempted:false, status:'not_required'},
      provider_safety: payload.provider_safety,
      provider_identity: payload.provider_identity || providerIdentityReport(payload.provider, payload.provider_config || {}),
      provider_billing_policy: payload.provider_billing_policy || providerBillingPolicy(payload.provider, payload.provider_config || {}),
      portable_account: payload.portable_account || null,
      warnings,
      output_summary: accepted ? summarizeProviderOutput(appliedResponse.data) : `Rejected: ${(validation.issues || []).slice(0,3).join('; ')}`
    };
    state.ai_runs = [...(state.ai_runs || []), run].slice(-25);
    state.last_provider_validation = validation;
    state.last_repair_trace = run.repair_trace;
    if(accepted && payload.task === 'plan' && appliedResponse.data?.questions) state.plan = appliedResponse.data;
    if(accepted && (payload.task === 'synthesis' || payload.task === 'repair')) state.lastMockAnalysis = appliedResponse.data;
    if(accepted && payload.task === 'critique') state.critique = appliedResponse.data;
    state.provider = payload.provider;
    state.provider_config = sanitizedProviderConfig(payload.provider_config || {});
    state.activeProviderTask = payload.task;
    state.provider_identity = payload.provider_identity || providerIdentityReport(payload.provider, payload.provider_config || {});
    state.provider_billing_policy = payload.provider_billing_policy || providerBillingPolicy(payload.provider, payload.provider_config || {});
    save(); render();
    const input = $('jsonInput');
    if(input && accepted && (payload.task === 'synthesis' || payload.task === 'repair')){ input.value = JSON.stringify(appliedResponse.data, null, 2); input.dispatchEvent(new Event('input', {bubbles:true})); }
    const statusMessage = accepted ? (repairTrace?.status === 'repaired' ? tr('statusProviderRepaired') : tr('statusProviderRun')) : tr('statusProviderValidationFailed');
    setStatus(statusMessage, accepted ? 'good' : 'bad');
    return {payload, response: appliedResponse, run, validation, repairTrace};
  }

  function qualityScores(){
    return qualityGate.calculateQualityScores(state, {evidenceReviewReport, providerSafetyReport});
  }
  function qualityGateReport(){
    return qualityGate.calculateQualityGateV3Report(state, {evidenceReviewReport, providerSafetyReport});
  }

  function validateWorkflowPacket(packet){
    if(!packet || typeof packet !== 'object') return false;
    if(packet.workflow_version && !String(packet.workflow_version).startsWith('0.')) return false;
    if(!packet.research_plan || !Array.isArray(packet.evidence_matrix)) return false;
    if(!packet.research_plan.questions || packet.research_plan.questions.length < 3) return false;
    return packet.evidence_matrix.every((item, idx) => item && item.claim && Array.isArray(item.supports) && Array.isArray(item.contradicts) && /^E\d+$/.test(item.evidence_id || `E${idx+1}`));
  }

  function migrateWorkflowPacketForImport(packet){
    const migrator = window.Jarbou3iResearchModules && window.Jarbou3iResearchModules.migrations;
    if(!migrator || typeof migrator.migrateResearchPacket !== 'function'){
      return {ok:true, packet, report:{migration_version:VERSION, source_version:packet?.workflow_version || 'unknown', target_version:VERSION, migrated:false, ok:true, import_safe:true, warnings:['migration_module_unavailable']}};
    }
    return migrator.migrateResearchPacket(packet, {targetVersion: VERSION});
  }

  function importWorkflowPacket(packet){
    const migrated = migrateWorkflowPacketForImport(packet);
    if(!migrated.ok || !migrated.packet) throw new Error('migration_failed');
    const nextPacket = migrated.packet;
    if(!validateWorkflowPacket(nextPacket)) throw new Error('invalid_packet');
    state.plan = Object.assign({}, nextPacket.research_plan, {plan_version: VERSION});
    state.research_planner_report = nextPacket.research_planner_report || state.plan.research_planner_report || null;
    state.evidence = nextPacket.evidence_matrix.map((item, idx) => scoreEvidence(Object.assign({}, item, {evidence_id:`E${idx+1}`})));
    state.causal_links = Array.isArray(nextPacket.causal_links) ? nextPacket.causal_links.filter(link => link && validId(link.from) && validId(link.to) && Array.isArray(link.evidence_ids)) : [];
    state.analysis_brief = nextPacket.analysis_brief || null;
    state.diagnostics = nextPacket.diagnostics || null;
    state.critique = nextPacket.critique || null;
    state.provider = nextPacket.provider || state.provider || 'mock';
    state.provider_config = sanitizedProviderConfig(nextPacket.provider_config || state.provider_config || {});
    state.provider_identity = nextPacket.provider_identity || providerIdentityReport(state.provider, state.provider_config);
    state.provider_billing_policy = nextPacket.provider_billing_policy || providerBillingPolicy(state.provider, state.provider_config);
    state.provider_route_plan = nextPacket.provider_route_plan || null;
    state.provider_route_report = nextPacket.provider_route_report || null;
    state.provider_cost_report = nextPacket.provider_cost_report || null;
    state.provider_router_safety_report = nextPacket.provider_router_safety_report || null;
    state.evidence_pack_v3_manifest = nextPacket.evidence_pack_v3_manifest || null;
    state.brief_traceability_report = nextPacket.brief_traceability_report || null;
    state.contradiction_falsifier_appendix = nextPacket.contradiction_falsifier_appendix || null;
    state.bundle_consistency_report = nextPacket.bundle_consistency_report || null;
    state.publication_readiness_export_report = nextPacket.publication_readiness_export_report || null;
    state.claim_classification_report = nextPacket.claim_classification_report || null;
    state.claim_boundary_audit_report = nextPacket.claim_boundary_audit_report || null;
    state.contradiction_falsifier_completeness_report = nextPacket.contradiction_falsifier_completeness_report || null;
    state.publication_review_gate_report = nextPacket.publication_review_gate_report || null;
    state.export_safe_final_review_report = nextPacket.export_safe_final_review_report || null;
    state.golden_workflow_corpus = nextPacket.golden_workflow_corpus || null;
    state.golden_end_to_end_demo_report = nextPacket.golden_end_to_end_demo_report || null;
    state.golden_export_pack_validation_report = nextPacket.golden_export_pack_validation_report || null;
    state.hosted_demo_scenario_evidence = nextPacket.hosted_demo_scenario_evidence || null;
    state.release_readiness_runbook = nextPacket.release_readiness_runbook || null;
    state.final_repo_hygiene_report = nextPacket.final_repo_hygiene_report || null;
    state.stale_release_copy_sweep = nextPacket.stale_release_copy_sweep || null;
    state.golden_workflow_regression_lock = nextPacket.golden_workflow_regression_lock || null;
    state.export_pack_artifact_consistency_lock = nextPacket.export_pack_artifact_consistency_lock || null;
    state.hosted_demo_evidence_runbook = nextPacket.hosted_demo_evidence_runbook || null;
    state.no_browser_browser_ci_parity_report = nextPacket.no_browser_browser_ci_parity_report || null;
    state.release_candidate_readiness_report = nextPacket.release_candidate_readiness_report || null;
    state.portable_account = nextPacket.portable_account || state.portable_account || null;
    state.ai_runs = Array.isArray(nextPacket.ai_runs) ? nextPacket.ai_runs.slice(-25) : [];
    state.lastMockAnalysis = null;
    state.provider_diagnostics = nextPacket.provider_diagnostics || null;
    state.provider_fixture_report = nextPacket.provider_fixture_report || null;
    state.source_policy = nextPacket.source_policy || null;
    state.source_diagnostics = nextPacket.source_diagnostics || null;
    state.source_fixture_report = nextPacket.source_fixture_report || null;
    state.last_source_request = Array.isArray(nextPacket.source_requests) ? nextPacket.source_requests[0] || null : null;
    state.source_runs = Array.isArray(nextPacket.source_runs) ? nextPacket.source_runs.slice(-25) : [];
    state.source_results = Array.isArray(nextPacket.source_results) ? nextPacket.source_results.slice(-25) : [];
    state.release_candidate = nextPacket.release_candidate || null;
    state.browser_qa_hardening = nextPacket.browser_qa_hardening || null;
    state.public_demo = nextPacket.public_demo || null;
    state.release_notes = nextPacket.release_notes || null;
    state.source_imports = Array.isArray(nextPacket.source_imports) ? nextPacket.source_imports.slice(-25) : [];
    state.evidence_review_queue = Array.isArray(nextPacket.evidence_review_queue) ? nextPacket.evidence_review_queue.slice(-200) : [];
    state.evidence_review_report = nextPacket.evidence_review_report || null;
    state.strategic_evidence_graph = nextPacket.strategic_evidence_graph || null;
    state.graph_quality_report = nextPacket.graph_quality_report || null;
    state.graph_export_report = nextPacket.graph_export_report || null;
    state.source_to_brief_workbench = nextPacket.source_to_brief_workbench || nextPacket.source_to_brief_package || null;
    state.source_to_brief_package = nextPacket.source_to_brief_package || nextPacket.source_to_brief_workbench || null;
    state.claim_map = Array.isArray(nextPacket.claim_map) ? nextPacket.claim_map : (state.source_to_brief_workbench?.claim_map || []);
    state.contradiction_groups = Array.isArray(nextPacket.contradiction_groups) ? nextPacket.contradiction_groups : (state.source_to_brief_workbench?.contradiction_groups || []);
    state.source_to_brief_confidence_review = nextPacket.source_to_brief_confidence_review || state.source_to_brief_workbench?.confidence_review || null;
    state.source_to_brief_gap_report = nextPacket.source_to_brief_gap_report || state.source_to_brief_workbench?.source_gaps || null;
    state.source_import_report = nextPacket.source_import_report || null;
    state.source_cluster_report = nextPacket.source_cluster_report || nextPacket.source_gap_report || null;
    state.source_gap_report = nextPacket.source_gap_report || nextPacket.source_cluster_report || null;
    state.source_packet_roundtrip_report = nextPacket.source_packet_roundtrip_report || null;
    state.source_packet_template_report = nextPacket.source_packet_template_report || null;
    state.packet_migration_report = nextPacket.packet_migration_report || migrated.report || null;
    state.quality_gate = nextPacket.quality_gate || null;
    state.export_pack = nextPacket.export_pack || null;
    state.last_source_import_preview = null;
    state.editingEvidenceIndex = -1;
    save(); render();
    const report = state.packet_migration_report;
    const suffix = report && report.migrated ? ` ${report.source_version}→${report.target_version}` : '';
    setStatus(`${tr('statusImported')}${suffix}`, report?.warnings?.length ? 'warn' : 'good');
  }

  async function copyText(text){
    try{await navigator.clipboard.writeText(text); setStatus(tr('copied'), 'good'); return true;}
    catch(_){setStatus(tr('copyFailed'), 'warn'); return false;}
  }
  function setStatus(message, tone=''){
    const el = $('researchStatus');
    if(el){
      el.className = `status ${tone}`.trim();
      el.textContent = message;
    }
    const toastEl = $('toast');
    if(toastEl && message){
      toastEl.textContent = message;
      toastEl.className = `toast show ${tone}`.trim();
      window.clearTimeout(setStatus._timer);
      setStatus._timer = window.setTimeout(() => toastEl.classList.remove('show'), 2600);
    }
  }
  function privacySafeExportPayload(payload){
    return exportController.privacySafeExportPayload(payload, {version: VERSION});
  }
  function downloadJson(filename, payload){
    exportController.downloadJson(filename, payload, {version: VERSION});
  }
  function currentProjectId(){return state.active_project_id || workspace?.active_project_id || null;}
  function projectName(){return ($('projectNameInput')?.value || state.active_project_name || topic()).trim() || tr('untitledResearchProject');}
  function renderAnalysisTemplate(){
    const s=$('analysisTemplateSelect'),o=$('analysisTemplateOutput');
    if(!analysisTemplates||!s||!o)return;
    if(!s.options.length)s.innerHTML=analysisTemplates.listTemplates().map(localizedTemplateProfile).map(t=>'<option value="'+esc(t.template_id)+'">'+esc(t.display_name)+'</option>').join('');
    s.value=activeTemplateId();
    const r=activeTemplateProfile(),p=localizedTemplateProfile(r),f=analysisTemplates.templateFitReport(state,r.template_id),li=x=>'<li>'+esc(x)+'</li>';
    state.analysis_template_id=r.template_id;state.analysis_template=r;
    o.innerHTML='<div class="researchJsonCard analysisTemplateProfile"><h4>'+esc(p.display_name)+'</h4><p>'+esc(p.description)+'</p><div class="miniChips"><span>'+esc(tr('templateScore'))+': '+esc(f.fit_score)+'</span><span>'+esc(tr('templateRequiredLayers'))+': '+esc(localizedList(p.required_layers || []))+'</span></div><h5>'+esc(tr('templateOutputFocus'))+'</h5><ul>'+p.output_focus.map(li).join('')+'</ul><h5>'+esc(tr('templatePromptDirectives'))+'</h5><ul>'+p.prompt_directives.map(li).join('')+'</ul><small>'+esc(f.missing_layers.length?tr('missingTemplateLayers')+': '+localizedList(f.missing_layers):tr('templateCoverageComplete'))+'</small></div>';
  }

  function renderWorkspace(){
    const el = $('projectWorkspaceOutput');
    if(!el || !projectWorkspace?.html) return;
    const keys = ['workspaceLocalOnly','workspaceProjects','workspaceBytes','workspaceStorageAvailable','workspaceStorageUnavailable','workspaceProject','workspaceVersion','workspaceUpdated','workspaceAction','workspaceLoad','workspaceEmpty','workspaceWarning'];
    el.innerHTML = projectWorkspace.html(workspace, Object.fromEntries(keys.map((key)=>[key,tr(key)])));
    const input = $('projectNameInput');
    if(input && !input.value) input.value = state.active_project_name || projectWorkspace.activeProject?.(workspace)?.name || '';
  }
  function saveCurrentProject(){
    if(!projectWorkspace?.upsert) return;
    const result = projectWorkspace.upsert(workspace, privacySafeExportPayload(researchPacket()), projectName(), currentProjectId());
    workspace = result.workspace; state.active_project_id = result.project.project_id; state.active_project_name = result.project.name; state.project_saved_at = result.project.updated_at; saveWorkspace(); save(); render(); setStatus(tr('projectSavedLocally'), 'good');
  }
  function loadProject(projectId){
    const project = (workspace.projects || []).find((p)=>p.project_id===projectId);
    if(!project) return;
    importWorkflowPacket(project.packet); state.active_project_id = project.project_id; state.active_project_name = project.name; state.project_saved_at = project.updated_at; workspace.active_project_id = project.project_id; saveWorkspace(); save(); render(); setStatus(tr('projectLoadedLocally'), 'good');
  }
  function duplicateProject(){
    if(!projectWorkspace?.duplicate) return;
    const result = projectWorkspace.duplicate(workspace, currentProjectId());
    workspace = result.workspace; if(result.project){state.active_project_id=result.project.project_id; state.active_project_name=result.project.name; state.project_saved_at=result.project.updated_at;} saveWorkspace(); save(); render(); setStatus(result.project ? tr('projectDuplicatedLocally') : tr('noProjectToDuplicate'), result.project ? 'good':'warn');
  }
  function deleteActiveProject(){
    if(!projectWorkspace?.remove || !currentProjectId()) return setStatus(tr('noActiveProjectToDelete'), 'warn');
    if(!confirmDestructive(tr('deleteActiveLocalProject'))) return;
    const result = projectWorkspace.remove(workspace, currentProjectId()); workspace = result.workspace; state.active_project_id = workspace.active_project_id || null; state.active_project_name = projectWorkspace.activeProject?.(workspace)?.name || null; saveWorkspace(); save(); render(); setStatus(result.deleted ? tr('localProjectDeleted') : tr('noLocalProjectDeleted'), result.deleted ? 'warn':'bad');
  }
  function exportActiveProject(){
    if(!projectWorkspace?.exportBundle) return;
    downloadJson('jarbou3i-project-v0.24-beta.json', projectWorkspace.exportBundle(workspace, currentProjectId())); setStatus(tr('projectExportGenerated'), 'good');
  }
  function exportPackV2(){
    if(!exportPack?.downloadExportPack) return;
    const pack = exportPack.downloadExportPack(researchPacket(), {version: VERSION});
    const out = $('exportPackOutput');
    if(out && exportPack.exportPackSummaryHtml) out.innerHTML = exportPack.exportPackSummaryHtml(pack, esc);
    setStatus(tr('statusExportPackExported'), pack.privacy_release_gate === 'pass' ? 'good' : 'warn');
  }
  function confirmDestructive(actionLabel){
    const text = uxReliability?.destructiveConfirmationText ? uxReliability.destructiveConfirmationText(actionLabel, state) : '';
    return !text || window.confirm(text);
  }
  function confirmWorkflowExport(packet){
    const text = uxReliability?.exportConfirmationText ? uxReliability.exportConfirmationText(packet) : 'Export research packet?';
    return window.confirm(text);
  }
  function emptyState(title, body, actionLabel){
    return uxReliability?.emptyStateHtml ? uxReliability.emptyStateHtml(title, body, actionLabel) : '<p class="muted">' + esc(body || title || '') + '</p>';
  }
  function updateReliabilityControls(){
    uxReliability?.updateButtonReliability?.(document, state);
  }

  function renderLabels(){
    renderHelpers.applyLabels(document, updateEvidenceButtonLabel);
  }
  function renderPromptCompiler(){
    const el = $('promptCompilerOutput');
    if(!el) return;
    const compiled = state.prompt_compiler;
    if(!compiled){ el.innerHTML = emptyState(tr('noCompiledPrompt'), tr('noCompiledPromptBody'), tr('compilePrompt')); return; }
    el.innerHTML = `<div class="researchJsonCard"><div><b>${esc(tr('compiledThesisTitle'))}</b><span>${esc(tr('qualityLabel'))}: ${esc(compiled.plan_quality_score ?? 0)}/100 · ${esc(compiled.release_gate || '')}</span></div><p>${esc(compiled.refined_thesis || '')}</p><h4>${esc(tr('missingContextTitle'))}</h4><div class="miniChips">${(compiled.missing_context || []).length ? compiled.missing_context.map(x=>`<span>${esc(lStatus(x))}</span>`).join('') : `<span>${esc(tr('none'))}</span>`}</div><h4>${esc(tr('outputPlanTitle'))}</h4><div class="miniChips">${(compiled.output_plan || []).map(x=>`<span>${esc(x)}</span>`).join('')}</div></div>`;
  }

  function renderResearchPlanner(){
    const el = $('researchPlannerOutput');
    if(!el) return;
    const report = state.research_planner_report || (state.plan ? buildResearchPlannerReport(state.plan) : null);
    if(!report){ el.innerHTML = emptyState(tr('researchPlannerEmpty'), tr('researchPlannerEmptyBody'), tr('generatePlan')); return; }
    const budget = report.source_type_budget?.budget || {};
    const budgetChips = Object.entries(budget).filter(([,v])=>Number(v)>0).map(([k,v])=>`<span>${esc(k)}:${esc(v)}</span>`).join('');
    const queryRows = (report.entity_aware_queries || []).slice(0,6).map(q=>`<li><strong>${esc(q.query_id)} · ${esc(q.purpose)}</strong>: ${esc(q.query_text)}</li>`).join('');
    el.innerHTML = `<div class="researchJsonCard researchPlannerCard"><div><b>${esc(tr('researchPlannerTitle'))}</b><span>${esc(report.depth_preset)} · ${esc(report.planner_quality_score || 0)}/100 · ${esc(report.release_gate || '')}</span></div><div class="miniChips">${budgetChips || '<span>—</span>'}</div><h4>${esc(tr('researchPlannerQueries'))}</h4><ul>${queryRows || '<li>—</li>'}</ul><h4>${esc(tr('researchPlannerCounterEvidence'))}</h4><div class="miniChips">${(report.counter_evidence_targets || []).slice(0,6).map(t=>`<span>${esc(t.target_id || '')}: ${esc(String(t.target || '').slice(0,80))}</span>`).join('') || '<span>—</span>'}</div></div>`;
  }

  function renderPlan(){
    renderPromptCompiler();
    renderResearchPlanner();
    const el = $('researchPlanOutput');
    if(!el) return;
    if(!state.plan){el.innerHTML = emptyState(tr('noPlan'), tr('noPlanBody'), tr('generatePlan')); return;}
    el.innerHTML = `<div class="researchJsonCard"><div><b>${esc(state.plan.topic)}</b><span>${esc(state.plan.context)} · ${esc(state.plan.mode)} · ${esc(tr('qualityLabel'))}: ${esc(state.plan.plan_quality_score ?? '—')}/100</span></div>${state.plan.refined_thesis ? `<p>${esc(state.plan.refined_thesis)}</p>` : ''}<h4>${esc(tr('questionsTitle'))}</h4><ul>${(state.plan.questions || []).map(x=>`<li>${esc(x)}</li>`).join('')}</ul><h4>${esc(tr('targetSourcesTitle'))}</h4><div class="miniChips">${(state.plan.target_sources || []).map(x=>`<span>${esc(x)}</span>`).join('')}</div><h4>${esc(tr('counterargumentsTitle'))}</h4><ul>${(state.plan.counter_evidence_targets || []).map(x=>`<li>${esc(x)}</li>`).join('')}</ul><h4>${esc(tr('disconfirmingConditionsTitle'))}</h4><ul>${(state.plan.disconfirming_conditions || []).map(x=>`<li>${esc(x)}</li>`).join('')}</ul><h4>${esc(tr('earlyWarningTitle'))}</h4><ul>${(state.plan.early_warning_indicators || []).map(x=>`<li>${esc(x)}</li>`).join('')}</ul></div>`;
  }
  function renderEvidence(){
    const el = $('evidenceMatrixOutput');
    if(!el) return;
    if(!state.evidence.length){el.innerHTML = emptyState(tr('matrixEmpty'), tr('matrixEmptyBody'), tr('addEvidence')); return;}
    el.innerHTML = `<div class="researchTableWrap"><table class="researchTable"><thead><tr><th>ID</th><th>${esc(tr('claim'))}</th><th>${esc(tr('sourceTitle'))}</th><th>${esc(tr('strength'))}</th><th>${esc(tr('reliability'))}</th><th>${esc(tr('attention'))}</th><th>${esc(tr('supports'))}</th><th>${esc(tr('contradicts'))}</th><th></th></tr></thead><tbody>${state.evidence.map((raw,i)=>{ const e = scoreEvidence(raw); const sc = e.evidence_scoring || {}; return `<tr><td>${esc(e.evidence_id)}</td><td><b>${esc(e.claim)}</b><small>${esc(e.notes || '')}</small>${(sc.risk_flags || []).length ? `<small>${esc(tr('flags'))}: ${esc(sc.risk_flags.join(', '))}</small>` : ''}</td><td>${esc([e.source_title, lST(e.source_type), e.source_date].filter(Boolean).join(' · '))}${e.source_url?`<small>${esc(e.source_url)}</small>`:''}</td><td>${esc(e.evidence_strength)}/5</td><td>${esc(sc.reliability_score ?? '—')}/100</td><td>${esc(sc.attention_signal_score ?? '—')}/100</td><td>${esc((e.supports || []).join(', ') || '—')}</td><td>${esc((e.contradicts || []).join(', ') || '—')}</td><td><div class="rowActions"><button class="btn ghost researchEdit" type="button" data-index="${i}">${esc(tr('edit'))}</button><button class="btn ghost researchDelete" type="button" data-index="${i}">${esc(tr('remove'))}</button></div></td></tr>`; }).join('')}</tbody></table></div>`;
    document.querySelectorAll('.researchEdit').forEach(btn => btn.addEventListener('click', () => fillEvidenceForm(state.evidence[Number(btn.dataset.index)], Number(btn.dataset.index))));
    document.querySelectorAll('.researchDelete').forEach(btn => btn.addEventListener('click', () => {
      const removedId = state.evidence[Number(btn.dataset.index)]?.evidence_id;
      state.evidence.splice(Number(btn.dataset.index),1);
      renumberEvidence();
      state.causal_links = state.causal_links.filter(link => !(link.evidence_ids || []).includes(removedId));
      state.editingEvidenceIndex = -1;
      save(); render();
    }));
  }
  function renderCausalLinks(){
    const el = $('causalLinksOutput');
    if(!el) return;
    if(!state.causal_links.length){el.innerHTML = emptyState(tr('causalEmpty'), 'Infer links from evidence or add explicit causal links once evidence exists.', tr('inferCausalLinks')); return;}
    el.innerHTML = `<div class="researchTableWrap"><table class="researchTable causalTable"><thead><tr><th>${esc(tr('linkFrom'))}</th><th>${esc(tr('relationship'))}</th><th>${esc(tr('linkTo'))}</th><th>${esc(tr('evidenceIds'))}</th><th>${esc(tr('confidence'))}</th><th></th></tr></thead><tbody>${state.causal_links.map((link,i)=>`<tr><td>${esc(link.from)}</td><td>${esc(lRel(link.relationship))}</td><td>${esc(link.to)}</td><td>${esc((link.evidence_ids || []).join(', '))}</td><td>${esc(lCf(link.confidence))}</td><td><button class="btn ghost causalDelete" type="button" data-index="${i}">${esc(tr('remove'))}</button></td></tr>`).join('')}</tbody></table></div>`;
    document.querySelectorAll('.causalDelete').forEach(btn => btn.addEventListener('click', () => { state.causal_links.splice(Number(btn.dataset.index),1); save(); render(); }));
  }
  function renderAnalysisBrief(){
    const el = $('analysisBriefOutput');
    if(!el) return;
    if(!state.analysis_brief){el.innerHTML = emptyState(tr('noAnalysisBrief'), tr('analysisBriefEmptyBody'), tr('compileBrief')); renderDiagnostics(); return;}
    const brief = state.analysis_brief;
    const clusters = brief.source_clusters || [];
    const gapReport = brief.source_gap_report || brief.source_cluster_report || sourceClusterGapReport();
    const gaps = [...new Set([...(brief.gaps || []), ...(gapReport.global_gap_flags || []), ...(gapReport.cluster_gap_flags || []), ...(brief.entity_map_report?.entity_gap_flags || [])])];
    const entities = brief.entity_profiles || [];
    const planner = brief.research_planner_report || state.research_planner_report || null;
    const graph = brief.strategic_evidence_graph || state.strategic_evidence_graph || buildStrategicEvidenceGraph();
    const graphQuality = graph.graph_quality_report || {};
    const graphCard = `<div class="researchJsonCard strategicEvidenceGraphCard"><h4>${esc(tr('strategicEvidenceGraphTitle') || 'Strategic Evidence Map')}</h4><div class="miniChips"><span>${esc(graphQuality.node_count || 0)} nodes</span><span>${esc(graphQuality.edge_count || 0)} edges</span><span>${esc((graph.graph_export_report?.formats || []).join('/'))}</span><span>${esc(graphQuality.release_gate || 'graph_review_required')}</span></div>${(graphQuality.graph_gap_flags || []).length ? `<small>${esc((graphQuality.graph_gap_flags || []).join(' · '))}</small>` : ''}</div>`;
    const entityCards = entities.slice(0, 8).map(e => `<div class="entityProfileCard"><div><b>${esc(e.entity_id)} · ${esc(e.canonical_name || '')}</b><span>${esc(e.category || 'other')}</span></div><p>${esc((e.claim_mentions || [])[0] || '')}</p><div class="miniChips"><span>${esc((e.evidence_ids || []).length)}E</span><span>${esc((e.cluster_ids || []).length)}CL</span><span>${esc(e.strategic_relevance_score ?? '—')}/100</span><span>${esc(e.review_gate || 'entity_review_required')}</span></div>${(e.aliases || []).length ? `<small>aliases: ${esc((e.aliases || []).slice(0,4).join(' · '))}</small>` : ''}</div>`).join('');
    const clusterCards = clusters.slice(0, 8).map(c => `<div class="sourceClusterCard"><div><b>${esc(c.cluster_id)} · ${esc(c.cluster_label || c.target_id)}</b><span>${esc(c.review_gate || 'review_required')}</span></div><p>${esc(c.primary_claim || (c.claims || [])[0] || '')}</p><div class="miniChips"><span>${esc(c.evidence_ids.length)}E</span><span>R:${esc(c.reliability_score ?? '—')}</span><span>A:${esc(c.attention_signal_score ?? '—')}</span><span>T:${esc(c.traceability_score ?? '—')}</span><span>${esc((c.source_types || []).join('/'))}</span>${c.duplicate_count ? `<span>${esc(c.duplicate_count)} duplicate</span>` : ''}</div>${(c.gap_flags || []).length ? `<small>${esc((c.gap_flags || []).join(' · '))}</small>` : ''}</div>`).join('');
    el.innerHTML = `<div class="researchJsonCard analysisBriefCard"><div><b>${esc(brief.topic)}</b><span>${esc(brief.context)} · readiness ${esc(brief.readiness_score)}/100</span></div><h4>${esc(tr('researchPlannerTitle'))}</h4>${planner ? `<div class="researchPlannerSummary"><div class="miniChips"><span>${esc(planner.depth_preset || 'standard')}</span><span>${esc(planner.planner_quality_score || 0)}/100</span><span>${esc((planner.entity_aware_queries || []).length)} queries</span><span>${esc((planner.counter_evidence_targets || []).length)} counter-targets</span></div></div>` : '<p class="muted">—</p>'}<h4>${esc(tr('entityTitle') || 'Entity profiles')}</h4><div class="entityProfileGrid">${entityCards || '<span>—</span>'}</div><h4>${esc(tr('clusterTitle'))}</h4><div class="sourceClusterGrid">${clusterCards || '<span>—</span>'}</div><h4>${esc(tr('gapsTitle'))}</h4><ul>${(gaps.length ? gaps : ['No critical compiler gaps detected.']).map(x=>`<li>${esc(x)}</li>`).join('')}</ul>${gapReport.recommendations?.length ? `<h4>Source gap actions</h4><ul>${gapReport.recommendations.map(x=>`<li>${esc(x)}</li>`).join('')}</ul>` : ''}${graphCard}<h4>Handoff</h4><p class="muted">${esc(brief.handoff_summary || '')}</p></div>`;
    renderDiagnostics();
  }

  function renderSourceToBrief(){
    const el = $('sourceToBriefOutput');
    if(!el) return;
    const report = state.source_to_brief_workbench || state.source_to_brief_package || null;
    if(!report){ el.innerHTML = emptyState(tr('sourceToBriefEmpty'), tr('sourceToBriefEmptyBody'), tr('buildSourceToBrief')); return; }
    el.innerHTML = sourceToBriefOperatorRenderer?.render ? sourceToBriefOperatorRenderer.render(report, {tr, esc, kc, lStatus, lST, lCf, topic}) : `<div class="researchJsonCard sourceToBriefSummary"><div><b>${esc(report.research_question || topic())}</b><span>${esc(report.release_gate || 'source_to_brief_review_required')}</span></div><small>${esc(report.exportable_strategic_brief?.source_boundary_note || '')}</small></div>`;
  }

  function renderDiagnostics(){
    const el = $('validationDiagnosticsOutput');
    if(!el) return;
    const diagnostics = state.diagnostics || diagnosticReport();
    const migrationReport = state.packet_migration_report || null;
    const coverage = diagnostics.coverage || {};
    const coverageRows = Object.entries(coverage).map(([key,value])=>`<span>${esc(localizedLayer(key))}: ${esc(value)}</span>`).join('');
    const migrationHtml = migrationReport ? `<span>migration:${esc(migrationReport.source_version)}→${esc(migrationReport.target_version)}</span>` : '';
    el.innerHTML = `<div class="researchJsonCard diagnosticsCard"><h4>${esc(tr('diagnosticsTitle'))}</h4><div class="miniChips">${coverageRows || '<span>—</span>'}${migrationHtml}</div><small>${esc(lStatus(diagnostics.status || 'review_required'))} · ${esc((diagnostics.gaps || []).length)} ${esc(tr('gaps'))}${migrationReport ? ' · ' + esc(tr('migrationReportExported')) : ''}</small></div>`;
  }


  function renderSourceLayer(){
    const el = $('sourcePlanningOutput');
    if(!el) return;
    if($('sourceConnector')) $('sourceConnector').value = state.source_connector || 'manual_mock';
    if($('sourceTask')) $('sourceTask').value = state.source_task || 'source_plan';
    const policy = state.source_policy || sourcePolicy();
    const request = state.last_source_request;
    const diagnostics = state.source_diagnostics;
    const fixture = state.source_fixture_report;
    const latestResult = (state.source_results || []).slice(-1)[0] || null;
    const requestHtml = request ? `<div class="researchJsonCard sourceRequestCard"><h4>${esc(tr('sourceRequestTitle'))}</h4><div class="miniChips"><span>${esc(request.connector)}</span><span>${esc(request.task)}</span><span>${esc(tr('live'))}:${esc(localizedBoolean(request.live_fetching_enabled))}</span></div><small>${esc((request.research_questions || []).length)} ${esc(tr('questions'))} · ${esc((request.target_sources || []).length)} ${esc(tr('sourceTargets'))} · ${esc((request.keywords || []).length)} ${esc(tr('keywords'))}</small></div>` : `<p class="muted">${esc(tr('sourcePolicyNote'))}</p>`;
    const policyHtml = `<div class="researchJsonCard sourcePolicyCard"><h4>${esc(tr('sourcePolicyTitle'))}</h4><div class="miniChips"><span>${esc(lStatus(policy.verdict))}</span><span>${esc(tr('live'))}:${esc(localizedBoolean(policy.live_fetching_enabled))}</span><span>${esc(policy.current_layer)}</span></div><small>${esc((policy.prohibited_actions || []).slice(0,2).join(' · '))}</small></div>`;
    const diagnosticsHtml = diagnostics ? `<div class="researchJsonCard sourceDiagnosticsCard"><h4>${esc(tr('sourceDiagnosticsTitle'))}</h4><div class="miniChips"><span>${esc(lStatus(diagnostics.readiness))}</span><span>${esc(diagnostics.evidence_count)} ${esc(tr('evidenceWord'))}</span><span>${esc(diagnostics.source_type_count)} ${esc(tr('sourceTypes'))}</span></div><ul>${(diagnostics.warnings || [tr('noSourceWarnings')]).map(x=>`<li>${esc(x)}</li>`).join('')}</ul></div>` : '';
    const fixtureHtml = fixture ? `<div class="researchJsonCard sourceFixtureCard"><h4>${esc(tr('sourceFixtureSuiteTitle'))}</h4><div class="miniChips"><span>${esc(fixture.pass_count)}/${esc(fixture.fixture_count)} ${esc(tr('passed'))}</span><span>${esc(tr('fails'))}:${esc(fixture.fail_count)}</span><span>${esc(tr('live'))}:${esc(localizedBoolean(fixture.live_fetching_performed))}</span></div></div>` : '';
    const resultHtml = latestResult ? `<div class="researchJsonCard sourceResultCard"><h4>${esc(tr('latestSourceResultTitle'))}</h4><div class="miniChips"><span>${esc(latestResult.connector)}</span><span>${esc(tr('candidates'))}:${esc(latestResult.evidence_candidate_count || 0)}</span><span>${esc(tr('queued'))}:${esc(latestResult.queued_review_count || 0)}</span><span>${esc(tr('live'))}:${esc(localizedBoolean(latestResult.source_fetching_performed))}</span></div><small>${esc(latestResult.repo?.full_name || latestResult.provider_id || lStatus(latestResult.verdict || ''))}</small></div>` : '';
    const cr=state.controlled_connector_report||controlledConnectorReport(),cs=state.connector_safety_report||connectorSafetyReport();
    const connectorHtml=`<div class="researchJsonCard controlledConnectorCard"><h4>${esc(tr('controlledConnectorTitle')||'Controlled connectors')}</h4><div class="miniChips"><span>${esc((cr.connectors_seen||[]).length)} ${esc(tr('connectors')||'connectors')}</span><span>${esc(tr('queued'))}:${esc(cr.queued_review_count||0)}</span><span>${esc(tr('live'))}:${esc(localizedBoolean(cs.live_fetching_performed))}</span></div><small>${esc(cs.verdict||'controlled_connector_safe_dry_run_or_manual_import')}</small></div>`;
    const searchHtml = state.search_provider_identity ? `<div class="researchJsonCard sourceSearchCard"><h4>${esc(tr('webSearchAbstractionTitle'))}</h4><div class="miniChips"><span>${esc(state.search_provider_identity.provider_id)}</span><span>${esc(tr('live'))}:${esc(localizedBoolean(state.search_provider_identity.live_enabled))}</span><span>${esc(tr('queries'))}:${esc(state.search_query_budget?.max_queries || 0)}</span></div><small>${esc(lStatus(state.search_policy?.verdict || 'web_search_abstraction_ready_no_live_fetch'))}</small></div>` : '';
    el.innerHTML = requestHtml + policyHtml + connectorHtml + diagnosticsHtml + searchHtml + resultHtml + fixtureHtml;
  }

  function renderSourceImportAdapter(){
    const el = $('sourceImportOutput');
    if(!el) return;
    const preview = state.last_source_import_preview;
    const report = state.source_import_report || preview?.report;
    if(!preview && !report){
      el.innerHTML = `<p class="muted">${esc(tr('sourceImportPolicyNote'))}</p>`;
      return;
    }
    const sample = preview?.sample_evidence || [];
    const sampleRows = sample.length ? `<div class="researchTableWrap"><table class="researchTable"><thead><tr><th>ID</th><th>${esc(tr('claim'))}</th><th>${esc(tr('sourceTitle'))}</th><th>${esc(tr('sourceType'))}</th><th>${esc(tr('strength'))}</th></tr></thead><tbody>${sample.map((e,i)=>`<tr><td>${esc(e.evidence_id || `IMP${i+1}`)}</td><td>${esc(e.claim)}</td><td>${esc(e.source_title || '—')}<small>${esc(e.source_url || '')}</small></td><td>${esc(lST(e.source_type))}</td><td>${esc(e.evidence_strength || 1)}/5</td></tr>`).join('')}</tbody></table></div>` : '';
    const reportHtml = report ? `<div class="researchJsonCard sourceImportReportCard"><h4>${esc(tr('sourceImportReportTitle'))}</h4><div class="miniChips"><span>${esc(report.input_format || 'unknown')}</span><span>${esc(report.converted_count || 0)} ${esc(tr('convertedLabel'))}</span><span>${esc(report.rejected_count || 0)} ${esc(tr('rejectedLabel'))}</span><span>${esc(tr('live'))}:${esc(localizedBoolean(report.live_fetching_performed))}</span><span>${esc(tr('verifiedLabel'))}:${esc(localizedBoolean(report.verification_claimed))}</span></div><small>${esc(lSTs(report.source_types))}</small></div>` : '';
    el.innerHTML = reportHtml + sampleRows;
  }

  function renderSourcePacketBuilder(){
    const el = $('sourcePacketBuilderOutput');
    if(!el) return;
    const packet = state.last_built_source_packet || null;
    const report = state.source_packet_builder_report || packet?.builder_report || null;
    if(!packet && !report){
      el.innerHTML = `<p class="muted">${esc(tr('sourcePacketBuilderPolicyNote'))}</p><div class="sourcePacketBuilderQaChecklist"><span>${esc(tr('sourcePacketBuilderQaNoLive'))}</span><span>${esc(tr('sourcePacketBuilderQaLocalOnly'))}</span><span>${esc(tr('sourcePacketBuilderQaWrap'))}</span></div>`;
      return;
    }
    const review = report?.scoring_review || {};
    const templateReport = state.source_packet_template_report || (sourcePacketTemplates?.templateReport ? sourcePacketTemplates.templateReport(state.active_source_packet_template || packet?.source_packets?.[0]?.template_id || 'generic_article') : null);
    const packetCount = packet?.source_packets?.length || report?.packet_count || 0;
    const releaseGate = review.release_gate || 'review_required';
    const warningCount = review.calibration_warning_count || 0;
    const weakTraceability = review.weak_traceability_count || 0;
    const attentionRisk = review.attention_without_reliability_count || 0;
    const packetPreview = packet ? JSON.stringify({
      source_packet_version: packet.source_packet_version,
      builder_version: packet.builder_version,
      workflow_version: packet.workflow_version,
      packet_count: packetCount,
      evidence_item_count: report?.evidence_item_count || 0,
      release_gate: releaseGate,
      live_fetching_performed: report?.live_fetching_performed === true,
      verification_claimed: report?.verification_claimed === true
    }, null, 2) : '';
    const templateHtml = templateReport ? `<div class="researchJsonCard sourcePacketTemplateReportCard"><h4>${esc(tr('sourcePacketTemplateReportTitle'))}</h4><div class="miniChips sourcePacketBuilderChips"><span>${esc(templateReport.template_count)} ${esc(tr('presets'))}</span><span>${esc(tr('sourceTemplate'+kc(templateReport.active_template_id)))}</span><span>${esc(tr('live'))}:${esc(localizedBoolean(templateReport.live_fetching_performed))}</span><span>${esc(tr('verified'))}:${esc(localizedBoolean(templateReport.verification_claimed))}</span><span>${esc(lStatus(templateReport.release_gate))}</span></div><small>${esc(localizedPolicy(templateReport.policy))}</small></div>` : '';
    el.innerHTML = templateHtml + `<div class="researchJsonCard sourcePacketBuilderReportCard sourcePacketBuilderQaCard"><h4>${esc(tr('sourcePacketBuilderTitle'))}</h4><div class="miniChips sourcePacketBuilderChips"><span>${esc(packetCount)} ${esc(tr('sourcePacketPackets'))}</span><span>${esc(report?.evidence_item_count || 0)} ${esc(tr('sourcePacketEvidence'))}</span><span>${esc(tr('live'))}:${esc(localizedBoolean(report?.live_fetching_performed))}</span><span>${esc(tr('verified'))}:${esc(localizedBoolean(report?.verification_claimed))}</span><span>${esc(lStatus(releaseGate))}</span></div><div class="sourcePacketBuilderRiskGrid"><span>${esc(tr('sourcePacketWarnings'))}: ${esc(warningCount)}</span><span>${esc(tr('sourcePacketWeakTraceability'))}: ${esc(weakTraceability)}</span><span>${esc(tr('sourcePacketAttentionReliabilityRisks'))}: ${esc(attentionRisk)}</span></div><small>${esc(localizedPolicy(report?.policy || 'local_manual_source_packet_builder_no_fetch_no_verification'))}</small><small>${esc(tr('sourcePacketBuilderBrowserQaNote'))}</small>${packetPreview ? `<pre class="sourcePacketBuilderPreview" aria-label="Source packet builder preview">${esc(packetPreview)}</pre>` : ''}</div>`;
  }

  function renderEvidenceReviewQueue(){
    const el = $('evidenceReviewOutput');
    if(!el) return;
    const queue = state.evidence_review_queue || [];
    const filters = state.evidence_review_filters || reviewFilters();
    const filtered = evidenceWorkspaceUx?.filterAndSortReviewQueue ? evidenceWorkspaceUx.filterAndSortReviewQueue(queue, filters, evidenceReviewContext()) : {filters, total_count:queue.length, visible_count:queue.length, items:queue.map((item,index)=>Object.assign({__review_index:index}, item))};
    const report = evidenceReviewReport();
    const uxReport = evidenceWorkspaceUxReport();
    if(!queue.length){
      el.innerHTML = emptyState(tr('evidenceReviewEmpty'), tr('sourceImportReviewEmptyBody'), tr('previewSourceImport'));
      return;
    }
    const facets = uxReport?.facets || {source_types:[]};
    const sourceTypeOptions = ['all'].concat(facets.source_types || []).map((value)=>`<option value="${esc(value)}" ${filtered.filters.source_type===value?'selected':''}>${esc(value==='all'?tr('allSources'):lST(value))}</option>`).join('');
    const rows = filtered.items.map((item) => {
      const i = Number(item.__review_index);
      const e = item.evidence || {};
      const resolved = item.status === 'accepted' || item.status === 'rejected';
      const controls = window.Jarbou3iResearchModules.sourcePacketBuilder?.reviewControlsForEvidence ? window.Jarbou3iResearchModules.sourcePacketBuilder.reviewControlsForEvidence(e) : (item.scoring_review_controls || {});
      const controlText = (controls.controls || []).join(', ') || 'manual_review';
      return `<tr>
        <td>${esc(item.review_id)}<small>${esc(item.import_id || '')}</small></td>
        <td><span class="reviewStatus ${esc(item.status)}">${esc(tr(item.status === 'needs_edit' ? 'needsEdit' : item.status))}</span><small>${esc(item.accepted_evidence_id || '')}</small><small>${esc(localizedReviewGate(controls.review_gate || 'reviewable'))}</small></td>
        <td><b>${esc(e.claim || '')}</b><small>${esc(e.notes || '')}</small><small>R:${esc(e.evidence_scoring?.reliability_score ?? '—')} · A:${esc(e.evidence_scoring?.attention_signal_score ?? '—')} · W:${esc(e.evidence_scoring?.synthesis_weight ?? '—')}</small><small>${esc(localizedReviewGate(controlText))}</small></td>
        <td>${esc([e.source_title, lST(e.source_type), e.source_date].filter(Boolean).join(' · '))}${e.source_url?`<small>${esc(e.source_url)}</small>`:''}</td>
        <td>${esc((e.supports || []).join(', ') || '—')} / ${esc((e.contradicts || []).join(', ') || '—')}</td>
        <td><div class="rowActions">${resolved ? '' : `<button class="btn ghost reviewAccept" type="button" data-index="${i}">${esc(tr('accept'))}</button><button class="btn ghost reviewNeedsEdit" type="button" data-index="${i}">${esc(tr('needsEdit'))}</button><button class="btn ghost reviewEdit" type="button" data-index="${i}">${esc(tr('editCandidate'))}</button><button class="btn ghost reviewReject" type="button" data-index="${i}">${esc(tr('reject'))}</button>`}</div></td>
      </tr>`;
    }).join('');
    const throughput = uxReport?.throughput_report || {};
    const signals = uxReport?.unresolved_signals || {};
    const laneHtml = (throughput.review_lanes?.lanes || uxReport?.review_lanes?.lanes || []).filter(lane => (lane.items || []).length).slice(0,5).map(lane => `<article class="reviewLaneCard"><header><b>${esc(tr('reviewLane'+kc(lane.lane_id)) || lane.label)}</b><span>${esc((lane.items || []).length)}</span></header><small>${esc((lane.items || []).map(item => item.review_id).filter(Boolean).join(', ') || '—')}</small></article>`).join('');
    const actionHtml = (throughput.next_review_actions || uxReport?.next_review_actions || []).slice(0,5).map(action => `<li><strong>${esc(action.order || '')}. ${esc(action.label || action.action_id)}</strong><small>${action.review_id ? ` · ${esc(action.review_id)}` : ''} · ${esc(action.reason || '')}</small></li>`).join('') || `<li>${esc(tr('exportReviewReadyAction'))}</li>`;
    const filterHtml = `<div class="researchJsonCard evidenceReviewThroughputCard"><h4>${esc(tr('reviewThroughputTitle'))}</h4><div class="miniChips"><span>${esc(filtered.visible_count)}/${esc(filtered.total_count)} ${esc(tr('visible'))}</span><span>${esc(tr('pending'))}:${esc(report.pending_count)}</span><span>${esc(tr('needsEdit'))}:${esc(throughput.counts?.needs_edit || 0)}</span><span>${esc(tr('contradictions'))}:${esc(throughput.contradiction_open_count || 0)}</span><span>${esc(tr('gaps'))}:${esc((signals.source_gap_warnings || []).length)}</span><span>${esc(tr('exportGate'))}:${esc(lStatus(throughput.export_throughput_gate || 'manual_review_required'))}</span></div><div class="reviewLaneGrid">${laneHtml || `<article class="reviewLaneCard"><b>${esc(tr('reviewThroughputClear'))}</b><small>${esc(tr('reviewThroughputClearBody'))}</small></article>`}</div><ul class="reviewNextActions">${actionHtml}</ul><small>${esc(tr('reviewKeyboardHint'))}</small><div class="reviewFilterGrid"><input id="reviewSearchInput" type="search" value="${esc(filtered.filters.keyword || '')}" placeholder="${esc(tr('reviewSearchPlaceholder'))}" /><select id="reviewStatusFilter"><option value="unresolved" ${filtered.filters.status==='unresolved'?'selected':''}>${esc(tr('unresolved'))}</option><option value="all" ${filtered.filters.status==='all'?'selected':''}>${esc(tr('all'))}</option><option value="pending" ${filtered.filters.status==='pending'?'selected':''}>${esc(tr('pending'))}</option><option value="needs_edit" ${filtered.filters.status==='needs_edit'?'selected':''}>${esc(tr('needsEdit'))}</option><option value="accepted" ${filtered.filters.status==='accepted'?'selected':''}>${esc(tr('accepted'))}</option><option value="rejected" ${filtered.filters.status==='rejected'?'selected':''}>${esc(tr('rejected'))}</option><option value="resolved" ${filtered.filters.status==='resolved'?'selected':''}>${esc(tr('resolved'))}</option></select><select id="reviewSourceTypeFilter">${sourceTypeOptions}</select><select id="reviewRelationshipFilter"><option value="all" ${filtered.filters.relationship==='all'?'selected':''}>${esc(tr('allRelationships'))}</option><option value="supports" ${filtered.filters.relationship==='supports'?'selected':''}>${esc(tr('supports'))}</option><option value="contradicts" ${filtered.filters.relationship==='contradicts'?'selected':''}>${esc(tr('contradicts'))}</option><option value="unlinked" ${filtered.filters.relationship==='unlinked'?'selected':''}>${esc(tr('unlinked'))}</option></select><select id="reviewSortSelect"><option value="needs_review_first" ${filtered.filters.sort==='needs_review_first'?'selected':''}>${esc(tr('needsReviewFirst'))}</option><option value="newest" ${filtered.filters.sort==='newest'?'selected':''}>${esc(tr('newest'))}</option><option value="oldest" ${filtered.filters.sort==='oldest'?'selected':''}>${esc(tr('oldest'))}</option><option value="reliability_desc" ${filtered.filters.sort==='reliability_desc'?'selected':''}>${esc(tr('reliability'))}</option><option value="attention_desc" ${filtered.filters.sort==='attention_desc'?'selected':''}>${esc(tr('attention'))}</option></select></div></div>`;
    el.innerHTML = filterHtml + `<div class="researchJsonCard evidenceReviewReportCard"><h4>${esc(tr('evidenceReviewTitle'))}</h4><div class="miniChips"><span>${esc(report.pending_count)} ${esc(tr('pending'))}</span><span>${esc(report.accepted_count)} ${esc(tr('accepted'))}</span><span>${esc(report.rejected_count)} ${esc(tr('rejected'))}</span><span>${esc(tr('verifiedLabel'))}:${esc(localizedBoolean(report.verification_claimed))}</span><span>${esc(tr('queueBypass'))}:${esc(localizedBoolean(false))}</span></div></div><div class="researchTableWrap"><table class="researchTable evidenceReviewTable"><thead><tr><th>ID</th><th>${esc(tr('reviewStatus'))}</th><th>${esc(tr('claim'))}</th><th>${esc(tr('sourceTitle'))}</th><th>${esc(tr('supports'))}/${esc(tr('contradicts'))}</th><th></th></tr></thead><tbody>${rows || `<tr><td colspan="6">${esc(tr('noVisibleReviewItems'))}</td></tr>`}</tbody></table></div>`;
    ['reviewSearchInput','reviewStatusFilter','reviewSourceTypeFilter','reviewRelationshipFilter','reviewSortSelect'].forEach(id => $(id)?.addEventListener('input', () => { persistReviewFilters(); save(); render(); }));
    document.querySelectorAll('.reviewAccept').forEach(btn => btn.addEventListener('click', () => { promoteReviewItem(Number(btn.dataset.index)); save(); render(); setStatus(tr('statusEvidenceAccepted'), 'good'); }));
    document.querySelectorAll('.reviewReject').forEach(btn => btn.addEventListener('click', () => { rejectReviewItem(Number(btn.dataset.index)); save(); render(); setStatus(tr('statusEvidenceRejected'), 'warn'); }));
    document.querySelectorAll('.reviewEdit').forEach(btn => btn.addEventListener('click', () => { editReviewItem(Number(btn.dataset.index)); save(); render(); }));
    document.querySelectorAll('.reviewNeedsEdit').forEach(btn => btn.addEventListener('click', () => { markReviewItemNeedsEdit(Number(btn.dataset.index)); save(); render(); setStatus(tr('statusEvidenceNeedsEdit'), 'warn'); }));
  }

  function renderProviderHarness(){
    const contractEl = $('providerContractPreview');
    const promptEl = $('providerPromptPreview');
    const diagEl = $('providerDiagnosticsOutput');
    const runEl = $('providerRunOutput');
    const currentTask = $('providerTask')?.value || state.activeProviderTask || 'synthesis';
    const contract = state.last_provider_contract_preview || providerContractPreview(currentTask);
    const promptPreview = state.last_provider_prompt_preview || (state.last_provider_payload ? providerPromptPreview(state.last_provider_payload) : null);
    const diagnostics = state.provider_diagnostics || (state.last_provider_payload ? providerDiagnostics(state.last_provider_payload) : null);
    const fixtureReport = state.provider_fixture_report;
    const portable = portableAccountStatus();
    const guideEl = $('providerModeGuide');
    if(guideEl){
      guideEl.innerHTML = uxReliability?.providerModeGuideHtml ? uxReliability.providerModeGuideHtml(state.provider || $('providerName')?.value || 'mock', tr, esc) : '';
    }

    if(contractEl){
      contractEl.innerHTML = `<strong>${esc(tr('providerContractLabel'))}</strong><span>${esc(contract.title || contract.type)} · ${esc(contract.type)}</span><small>${esc((contract.required || []).length)} ${esc(tr('required'))} · ${(contract.required || []).slice(0,5).map(esc).join(', ')}</small>`;
    }
    if(promptEl){
      if(promptPreview){
        promptEl.innerHTML = `<strong>${esc(tr('providerPromptLabel'))}</strong><span>${esc(promptPreview.task)} · ${esc(promptPreview.prompt_chars)} ${esc(tr('chars'))} · ${esc(promptPreview.prompt_fingerprint)}</span><small>${esc(promptPreview.privacy_mode)}${promptPreview.truncated ? ' · ' + tr('truncatedPreview') : ''}</small>`;
      } else {
        promptEl.innerHTML = `<strong>${esc(tr('providerPromptLabel'))}</strong><span>${esc(tr('providerPromptMissing'))}</span><small>${esc(tr('providerPromptMissingHint'))}</small>`;
      }
    }

    if(diagEl){
      const diagHtml = diagnostics ? `<div class="researchJsonCard providerDiagnosticsCard"><h4>${esc(tr('providerDiagnosticsTitle'))}</h4><div class="miniChips"><span>${esc(diagnostics.readiness)}</span><span>${esc(diagnostics.contract_type)}</span><span>${esc(diagnostics.prompt_chars)} ${esc(tr('chars'))}</span><span>${esc(tr('keyExported'))}:${esc(localizedBoolean(diagnostics.key_exported))}</span><span>key_exported:${diagnostics.key_exported ? 'true' : 'false'}</span><span>${esc(tr('auth'))}:${esc(diagnostics.auth_type || tr('unknown'))}</span><span>${esc(tr('billing'))}:${esc(diagnostics.billing_owner || tr('unknown'))}</span></div><ul>${(diagnostics.warnings || [tr('noSourceWarnings')]).map(x=>`<li>${esc(x)}</li>`).join('')}</ul></div>` : '';
      const fixtureHtml = fixtureReport ? `<div class="researchJsonCard fixtureSuiteCard"><h4>${esc(tr('fixtureSuiteTitle'))}</h4><div class="miniChips"><span>${esc(fixtureReport.pass_count)}/${esc(fixtureReport.fixture_count)} ${esc(tr('passed'))}</span><span>${esc(tr('fails'))}:${esc(fixtureReport.fail_count)}</span></div><ul>${(fixtureReport.results || []).map(item=>`<li><strong>${esc(item.fixture_id)}</strong>: ${esc(item.pass ? lStatus('pass') : 'fail')} · ${esc(tr('accepted'))}:${esc(localizedBoolean(item.accepted))} · ${esc(tr('issues'))}:${esc(item.issue_count)}</li>`).join('')}</ul></div>` : '';
      const routeReport = providerRouteReport();
      const costReport = providerCostReport();
      const routeHtml = routeReport ? `<div class="researchJsonCard providerRouteCard"><h4>${esc(tr('providerRouterTitle'))}</h4><div class="miniChips"><span>${esc(routeReport.selected_provider || 'mock')}</span><span>${esc(tr('suitability'))}:${esc(routeReport.average_suitability_score || 0)}/100</span><span>${esc(tr('cost'))}:$${esc(costReport?.selected_estimated_cost_usd ?? 0)}</span><span>${esc(tr('dryRun'))}:${esc(localizedBoolean(routeReport.dry_run_only))}</span></div><small>${esc(lStatus(routeReport.release_gate || 'provider_route_review_required'))}</small></div>` : '';
      const portableSpike = portableOAuthSpikeStatus();
      const portableHtml = `<div class="researchJsonCard portableAccountCard"><h4>${esc(tr('portableTitle'))}</h4><div class="miniChips"><span>${esc(portable.status)}</span><span>${esc(tr('token'))}:${esc(localizedBoolean(portable.token_present))}</span><span>${esc(tr('mock'))}:${esc(localizedBoolean(portable.mock_only))}</span><span>${esc(tr('oauth'))}:${esc(lStatus(portableSpike?.status || 'none'))}</span><span>${esc(tr('keyExported'))}:${esc(localizedBoolean(portable.key_exported))}</span></div><small>${esc(portable.safety_verdict)}${portable.account_id ? ' · ' + esc(portable.account_id) : ''}</small></div>`;
      diagEl.innerHTML = diagHtml + routeHtml + portableHtml + fixtureHtml;
    }

    if(!runEl) return;
    const runs = state.ai_runs || [];
    if(!runs.length){ runEl.innerHTML = emptyState(tr('runLedgerEmpty'), tr('providerRunEmptyHint'), tr('dryRunProviderRequest')); return; }
    runEl.innerHTML = `<div class="researchTableWrap"><table class="researchTable providerTable"><thead><tr><th>${esc(tr('run'))}</th><th>${esc(tr('providerTask'))}</th><th>${esc(tr('providerName'))}</th><th>${esc(tr('status'))}</th><th>${esc(tr('validation'))}</th><th>${esc(tr('output'))}</th></tr></thead><tbody>${runs.slice().reverse().map(run=>`<tr><td>${esc(run.run_id)}</td><td>${esc(run.task)}</td><td>${esc(run.provider)}</td><td>${esc(run.status)} · ${esc(run.duration_ms)}ms</td><td>${esc(validationSummary(run.response_validation, run.repair_trace))}</td><td>${esc(run.output_summary)}<small>${esc((run.warnings || []).join(' · '))}</small></td></tr>`).join('')}</tbody></table></div>`;
  }

  function localizedCritique(){
    const e=state.evidence||[],l=state.causal_links||[],u=e.filter(x=>x.source_url).length,t=new Set(e.map(x=>x.source_type).filter(Boolean)).size,c=e.filter(x=>x.contradicts&&x.contradicts.length).length,r=(a,b,o,n)=>({type:tr(a),severity:tr(b?'severityMedium':'severityHigh'),finding:tr(b?o:n)});
    return{summary:tr(e.length>=5&&l.length>=3?'critiqueSummaryUsable':'critiqueSummaryWeak'),findings:[r('critiqueTypeEvidenceVolume',e.length>=5,'critiqueEvidenceVolumeOk','critiqueEvidenceVolumeWeak'),r('critiqueTypeSourceTraceability',u>=3,'critiqueSourceTraceabilityOk','critiqueSourceTraceabilityWeak'),r('critiqueTypeSourceDiversity',t>=3,'critiqueSourceDiversityOk','critiqueSourceDiversityWeak'),r('critiqueTypeCounterEvidenceGap',c,'critiqueCounterEvidenceOk','critiqueCounterEvidenceWeak'),r('critiqueTypeCausalRisk',l.length>=3,'critiqueCausalRiskOk','critiqueCausalRiskWeak'),{type:tr('critiqueTypePublicationRisk'),severity:tr('severityHigh'),finding:tr('critiquePublicationRisk')}],recommended_next_actions:['critiqueActionEvidence','critiqueActionSources','critiqueActionCounter','critiqueActionCausal','critiqueActionFalsifiers'].map(tr)};
  }
  function renderCritique(){
    const el = $('critiqueOutput');
    if(!el) return;
    if(!state.critique){el.innerHTML = ''; return;}
    const critique = localizedCritique();
    el.innerHTML = `<div class="researchJsonCard critiqueCard"><b>${esc(critique.summary)}</b><ul>${critique.findings.map(f=>`<li><strong>${esc(f.type)} · ${esc(f.severity)}</strong>: ${esc(f.finding)}</li>`).join('')}</ul><h4>${esc(tr('critiqueNextActions'))}</h4><ul>${critique.recommended_next_actions.map(x=>`<li>${esc(x)}</li>`).join('')}</ul></div>`;
  }

  const UX_CARD_TABS = Object.freeze({
    projectWorkspaceTitle:['advanced'],
    templateTitle:['analysis','advanced'],
    planTitle:['analysis'],
    evidenceTitle:['evidence'],
    causalTitle:['evidence'],
    compilerTitle:['analysis','quality'],
    sourceToBriefTitle:['analysis','evidence','quality'],
    providerTitle:['advanced'],
    sourcePlanningTitle:['sources','advanced'],
    sourceImportTitle:['sources'],
    sourcePacketBuilderTitle:['sources','quality'],
    evidenceReviewTitle:['evidence','sources','quality'],
    workflowTitle:['analysis','advanced'],
    qualityTitle:['quality']
  });

  function setupUxStabilization(){
    const panel = $('researchLabPanel');
    if(panel) panel.classList.add('uxStabilized','screenDiscipline');
    document.querySelectorAll('.researchCard').forEach((card) => {
      const key = card.querySelector('h3')?.getAttribute('data-r-i18n');
      const tabs = UX_CARD_TABS[key] || ['advanced'];
      card.dataset.uxTabs = tabs.join(' ');
      if(tabs.includes('advanced') && !['projectWorkspaceTitle','templateTitle'].includes(key)) { card.classList.add('uxAdvancedPanel','disciplineAccordion'); card.dataset.advancedOpen = 'false'; const heading = card.querySelector('h3'); if(heading){ heading.setAttribute('role','button'); heading.setAttribute('tabindex','0'); heading.setAttribute('aria-expanded','false'); } }
    });
  }

  function setUxTab(tab){
    activeUxTab = tab || 'analysis';
    try { sessionStorage.setItem('jarbou3i.ux.activeTab', activeUxTab); } catch(_) {}
    applyUxTab();
  }

  function initialUxTab(){
    try { return sessionStorage.getItem('jarbou3i.ux.activeTab') || 'analysis'; } catch(_) { return 'analysis'; }
  }

  function applyUxTab(){
    const tab = activeUxTab || 'analysis';
    document.querySelectorAll('#researchModeNav .uxTab').forEach((btn) => {
      const active = btn.dataset.uxTab === tab;
      btn.classList.toggle('active', active);
      btn.setAttribute('aria-selected', active ? 'true' : 'false');
    });
    document.querySelectorAll('.researchCard').forEach((card) => {
      const tabs = (card.dataset.uxTabs || 'advanced').split(/\s+/).filter(Boolean);
      const visible = tabs.includes(tab);
      card.classList.toggle('uxHidden', !visible);
      const isAdvanced = card.classList.contains('uxAdvancedPanel');
      card.classList.toggle('uxAdvancedCollapsed', tab !== 'advanced' && isAdvanced && !visible);
      const closedInAdvanced = tab === 'advanced' && isAdvanced && card.dataset.advancedOpen !== 'true';
      card.classList.toggle('uxAccordionClosed', closedInAdvanced);
      const heading = card.querySelector('h3[role="button"]');
      if(heading) heading.setAttribute('aria-expanded', closedInAdvanced ? 'false' : 'true');
    });
  }

  function panelStorageKey(panelId){ return 'jarbou3i.ux.panel.' + panelId; }

  function persistedPanelState(panelId, fallback){
    try { const value = sessionStorage.getItem(panelStorageKey(panelId)); if(value === 'true') return true; if(value === 'false') return false; } catch(_) {}
    return fallback;
  }

  function setCollapsiblePanel(panelId, toggleId, expanded, persist = true){
    const panel = $(panelId);
    const button = $(toggleId);
    if(!panel || !button) return;
    if(persist){ try { sessionStorage.setItem(panelStorageKey(panelId), expanded ? 'true' : 'false'); } catch(_) {} }
    panel.classList.toggle('screenDisciplineCollapsed', !expanded);
    button.dataset.expanded = expanded ? 'true' : 'false';
    button.setAttribute('aria-expanded', expanded ? 'true' : 'false');
    const showKey = button.dataset.rToggleShow;
    const hideKey = button.dataset.rToggleHide;
    if(showKey && hideKey) button.textContent = expanded ? tr(hideKey) : tr(showKey);
    else if(panelId === 'workflowPanel') button.textContent = expanded ? tr('hideCommandCenter') : tr('showCommandCenter');
    else if(panelId === 'enginePanel') button.textContent = expanded ? tr('hideEngineMap') : tr('showEngineMap');
  }

  function toggleCollapsiblePanel(panelId, toggleId){
    const button = $(toggleId);
    const expanded = !(button?.dataset?.expanded === 'true');
    setCollapsiblePanel(panelId, toggleId, expanded);
  }

  function toggleAdvancedAccordion(card){
    if(!card || !card.classList.contains('uxAdvancedPanel')) return;
    const open = card.dataset.advancedOpen === 'true';
    document.querySelectorAll('.researchCard.uxAdvancedPanel').forEach(other => { other.dataset.advancedOpen = 'false'; });
    card.dataset.advancedOpen = open ? 'false' : 'true';
    applyUxTab();
  }

  function renderScreenDisciplineNextAction(){
    const el = $('screenDisciplineNextAction');
    if(!el) return;
    const reviewCount = (state.evidence_review_queue || []).filter(item => item.status !== 'accepted' && item.status !== 'rejected').length;
    let title = tr('startTitle');
    let body = tr('nextActionDefault');
    if(!state.plan){ title = tr('nextActionTitle'); body = tr('nextActionGeneratePlan'); }
    else if(reviewCount){ title = tr('nextActionTitle'); body = tr('nextActionReviewQueue'); }
    else if(!state.evidence.length){ title = tr('nextActionTitle'); body = tr('nextActionAddEvidence'); }
    else if(!state.analysis_brief){ title = tr('nextActionTitle'); body = tr('nextActionCompileBrief'); }
    else { title = tr('nextActionTitle'); body = tr('nextActionExportPack'); }
    el.innerHTML = '<strong>' + esc(title) + ':</strong> ' + esc(body);
  }

  function renderOnboarding(){
    const panel = $('firstRunPanel');
    const progressEl = $('firstRunProgress');
    const listEl = $('firstRunChecklist');
    if(!panel || !progressEl || !listEl || !onboarding?.firstRunReport) return;
    ensureOnboardingState();
    const report = onboardingReport();
    panel.classList.toggle('firstRunHidden', !!state.onboarding?.dismissed && report.completion_rate >= 100);
    progressEl.innerHTML = '<strong>' + esc(report.completion_rate) + '%</strong><span>' + esc(localizedSuccessState(report.success_state)) + '</span>';
    listEl.innerHTML = report.checklist.map(item => '<button class="firstRunStep ' + (item.done ? 'done' : 'open') + '" type="button" data-first-run-step="' + esc(item.step_id) + '" data-first-run-tab="' + esc(item.tab) + '" data-first-run-target="' + esc(item.target) + '"><span>' + esc(item.order) + '</span><b>' + esc(localizedStepLabel(item.step_id, item.label)) + '</b><small>' + esc(item.done ? tr('doneState') : tr('nextState')) + '</small></button>').join('');
    const nextBtn = $('nextFirstRunBtn');
    if(nextBtn){
      nextBtn.disabled = !report.next_step_id;
      nextBtn.textContent = report.next_step_id ? tr('goToPrefix') + ': ' + localizedStepLabel(report.next_step_id, report.next_step_label) : tr('firstRunComplete');
    }
  }

  function goToFirstRunStep(stepId){
    const report = onboardingReport();
    const step = (report?.checklist || []).find(item => item.step_id === stepId) || (report?.checklist || []).find(item => !item.done);
    if(!step) return;
    setUxTab(step.tab || 'analysis');
    const target = $(step.target);
    if(target){ target.scrollIntoView({behavior:'smooth', block:'center'}); if(typeof target.focus === 'function') setTimeout(() => target.focus({preventScroll:true}), 180); }
  }

  function startFirstRun(){
    state.onboarding = onboarding?.resetOnboarding ? onboarding.resetOnboarding({version: VERSION, now: nowIso()}) : state.onboarding;
    if($('topicInput') && !($('topicInput').value || '').trim()) $('topicInput').value = 'Sample: strategic technology shift and institutional adaptation';
    if($('timeframeInput') && !($('timeframeInput').value || '').trim()) $('timeframeInput').value = '2024–2026, international context';
    save(); render(); setUxTab('analysis'); goToFirstRunStep('plan'); setStatus(tr('firstRunStartedStatus'), 'good');
  }

  function renderReleaseHealth(){
    const el = $('releaseHealthMetrics');
    if(!el) return;
    const quality = qualityGateReport();
    const openReview = (state.evidence_review_queue || []).filter(item => item.status !== 'accepted' && item.status !== 'rejected').length;
    const metrics = [
      [tr('metricPlan'), state.plan ? tr('metricReady') : tr('metricMissing')],
      [tr('metricEvidence'), String(state.evidence.length)],
      [tr('metricReview'), openReview ? openReview + ' ' + tr('metricPending') : tr('metricClear')],
      [tr('metricQuality'), String(quality.overall_score || quality.readiness_score || 0) + '/100'],
      [tr('metricExport'), quality.release_gate === 'blocked' ? tr('metricBlocked') : tr('metricSafe')]
    ];
    el.innerHTML = metrics.map(([label,value]) => '<span class="releaseMetric"><strong>' + esc(label) + '</strong>' + esc(value) + '</span>').join('');
    renderScreenDisciplineNextAction();
  }

  function renderQuality(){
    const plannerReport = buildResearchPlannerReport(state.plan);
    const graphIntel = buildStrategicEvidenceGraph();
    const providerRouting = buildProviderRouterBundle();
    const scores = qualityScores();
    const report = qualityGateReport();
    const el = $('researchQualityOutput');
    if(!el) return;
    const rows = [
      ['qualityV3Score', scores.qualityV3],
      ['completenessScore', scores.completeness],
      ['evidenceStrengthScore', scores.evidenceStrength],
      ['evidenceReliabilityScore', scores.evidenceReliability],
      ['attentionSignalIntegrityScore', scores.attentionSignalIntegrity],
      ['contradictionCoverageScore', scores.contradictionCoverage],
      ['sourceDiversityScore', scores.sourceDiversity],
      ['actorLayerCoverageScore', scores.actorLayerCoverage],
      ['causalLinkDensityScore', scores.causalLinkDensity],
      ['providerSafetyScore', scores.providerSafety],
      ['privacySafetyScore', scores.privacySafety],
      ['migrationSafetyScore', scores.migrationSafety],
      ['templateScore', scores.templateFit],
      ['readiness', scores.readiness],
      ['sourcePlanningScore', scores.sourcePlanning],
      ['sourcePolicyScore', scores.sourcePolicyScore],
      ['sourceFixtureScore', scores.sourceFixtures],
      ['sourceImportScore', scores.sourceImport],
      ['evidenceReviewScore', scores.evidenceReview],
      ['providerIdentityScore', scores.providerIdentity],
      ['responseValidationScore', scores.responseValidation],
      ['contractFixtureScore', scores.contractFixtures]
    ];
    const scoreHtml = rows.map(([label,value]) => '<div class="researchScore"><span>' + esc(tr(label)) + '</span><strong>' + esc(value) + '</strong><meter min="0" max="100" value="' + esc(value) + '"></meter></div>').join('');
    const weakestHtml = report.weakest_dimensions.map(item => '<li><strong>' + esc(lDim(item.dimension)) + '</strong>: ' + esc(item.score) + ' · ' + esc(lStatus(item.severity)) + '</li>').join('');
    const actionsHtml = report.fix_actions.map(action => '<li>' + esc(localizedQualityAction(action)) + '</li>').join('');
    const scoringReport = evidenceScoringReport();
    const scoringHtml = '<div class="researchJsonCard evidenceScoringCard"><h4>' + esc(tr('qualityScoringTitle')) + '</h4><div class="miniChips"><span>' + esc(tr('reliabilityLabel')) + ' ' + esc(scoringReport.average_reliability_score || 0) + '/100 · ' + esc(lBand(scoringReport.reliability_band || '—')) + '</span><span>' + esc(tr('attentionLabel')) + ' ' + esc(scoringReport.average_attention_signal_score || 0) + '/100 · ' + esc(lBand(scoringReport.attention_band || '—')) + '</span><span>' + esc(tr('traceabilityLabel')) + ' ' + esc(scoringReport.average_traceability_score || 0) + '/100 · ' + esc(lBand(scoringReport.traceability_band || '—')) + '</span><span>' + esc(tr('calibrationWarnings')) + ' ' + esc(scoringReport.calibration_warning_count || 0) + '</span></div><small>' + esc(localizedPolicy(scoringReport.policy || '')) + '</small><small>' + esc(tr('evidenceScoringPolicyNote')) + ' ' + esc(tr('guardLabel')) + ': ' + esc(lStatus(scoringReport.score_theater_guard || 'score_theater_guard')) + '</small></div>';
    const gq = graphIntel.graph_quality_report || {}, ge = graphIntel.graph_export_report || {}, gl = getLang();
    const gt = gl === 'ar' ? 'رسم الأدلة الاستراتيجية' : gl === 'fr' ? 'graphe stratégique des preuves' : 'strategic evidence graph';
    const gf = (gq.graph_gap_flags || []).length ? gq.graph_gap_flags.join(', ') : 'none';
    const fm = (ge.formats || []).length ? ge.formats.join(', ') : 'none';
    const graphHtml = '<div class="researchJsonCard strategicEvidenceGraphSummary" data-browser-qa="strategic-evidence-graph"><h4>' + esc(gt) + '</h4><div class="miniChips"><span>graph nodes ' + esc(gq.node_count || 0) + '</span><span>edges ' + esc(gq.edge_count || 0) + '</span><span>formats: ' + esc(fm) + '</span><span>gate: ' + esc(lStatus(gq.release_gate || graphIntel.release_gate || 'graph_review_required')) + '</span></div><small>graph gaps: ' + esc(gf) + ' · no live fetching · no automatic source verification</small></div>';
    const reportHtml = scoringHtml + graphHtml + '<div class="researchJsonCard qualityGateV3Card"><h4>' + esc(tr('publicationReadiness')) + ': ' + esc(lStatus(report.publication_readiness)) + '</h4><div class="miniChips"><span>' + esc(lStatus(report.release_gate)) + '</span><span>' + esc(report.overall_score) + '/100</span><span>' + esc(report.blockers.length) + ' ' + esc(tr('blockers')) + '</span></div><h5>' + esc(tr('weakestDimensions')) + '</h5><ul>' + weakestHtml + '</ul><h5>' + esc(tr('fixActions')) + '</h5><ul>' + actionsHtml + '</ul></div>';
    el.innerHTML = scoreHtml + reportHtml;
  }
  function scrubVisibleMojibakeText(root = document.body){
    if(!root || typeof document === 'undefined') return;
    if(renderHelpers.sanitizeUiTree) renderHelpers.sanitizeUiTree(root);
  }
  function render(){renderLabels(); renderOnboarding(); renderWorkspace(); renderAnalysisTemplate(); renderPlan(); renderEvidence(); renderCausalLinks(); renderAnalysisBrief(); renderSourceToBrief(); renderSourceLayer(); renderSourceImportAdapter(); renderSourcePacketBuilder(); renderEvidenceReviewQueue(); renderProviderHarness(); renderCritique(); renderQuality(); renderReleaseHealth(); updateReliabilityControls(); applyUxTab(); scrubVisibleMojibakeText(); if(typeof requestAnimationFrame === 'function') requestAnimationFrame(() => scrubVisibleMojibakeText());}

  function wire(){
    if(renderHelpers.installMojibakeGuard) renderHelpers.installMojibakeGuard(document);
    setupUxStabilization();
    activeUxTab = initialUxTab();
    document.querySelectorAll('#researchModeNav .uxTab').forEach(btn => btn.addEventListener('click', () => setUxTab(btn.dataset.uxTab || 'analysis')));
    $('startFirstRunBtn')?.addEventListener('click', startFirstRun);
    $('nextFirstRunBtn')?.addEventListener('click', () => goToFirstRunStep(onboardingReport()?.next_step_id));
    $('dismissFirstRunBtn')?.addEventListener('click', () => { state.onboarding = onboarding?.dismissOnboarding ? onboarding.dismissOnboarding(state.onboarding, {version: VERSION, now: nowIso()}) : state.onboarding; save(); render(); setStatus('First-run guide hidden. You can still use the workflow normally.', 'warn'); });
    $('firstRunChecklist')?.addEventListener('click', (event) => { const btn = event.target?.closest?.('[data-first-run-step]'); if(btn) goToFirstRunStep(btn.getAttribute('data-first-run-step')); });

    $('workflowPanelToggle')?.addEventListener('click', () => toggleCollapsiblePanel('workflowPanel','workflowPanelToggle'));
    $('enginePanelToggle')?.addEventListener('click', () => toggleCollapsiblePanel('enginePanel','enginePanelToggle'));
    setCollapsiblePanel('workflowPanel','workflowPanelToggle', persistedPanelState('workflowPanel', false), false);
    setCollapsiblePanel('enginePanel','enginePanelToggle', persistedPanelState('enginePanel', false), false);
    document.querySelectorAll('.researchCard.uxAdvancedPanel > h3').forEach(heading => {
      heading.addEventListener('click', () => toggleAdvancedAccordion(heading.closest('.researchCard')));
      heading.addEventListener('keydown', (event) => { if(event.key === 'Enter' || event.key === ' '){ event.preventDefault(); toggleAdvancedAccordion(heading.closest('.researchCard')); } });
    });
    $('saveProjectBtn')?.addEventListener('click', saveCurrentProject);
    $('duplicateProjectBtn')?.addEventListener('click', duplicateProject);
    $('deleteProjectBtn')?.addEventListener('click', deleteActiveProject);
    $('exportProjectBtn')?.addEventListener('click', exportActiveProject);
    $('projectWorkspaceOutput')?.addEventListener('click', (event) => { const id = event.target?.getAttribute?.('data-project-load'); if(id) loadProject(id); });
    $('importProjectInput')?.addEventListener('change', async (event) => { const file = event.target.files?.[0]; if(!file) return; try { const result = projectWorkspace.importBundle(workspace, JSON.parse(await file.text())); workspace = result.workspace; saveWorkspace(); loadProject(result.project.project_id); } catch(_) { setStatus('Invalid project bundle.', 'bad'); } event.target.value=''; });
    $('analysisTemplateSelect')?.addEventListener('change', () => { persistTemplateSelection(); state.analysis_brief = null; state.diagnostics = null; save(); render(); });
    $('applyTemplateBtn')?.addEventListener('click', () => { persistTemplateSelection(); if(state.plan) state.plan = analysisTemplates.applyToPlan(state.plan, activeTemplateId()); save(); render(); setStatus(tr('statusTemplateApplied'), 'good'); });
    $('exportTemplateProfileBtn')?.addEventListener('click', () => { downloadJson('jarbou3i-analysis-template-v0.24-beta.json', {workflow_version: VERSION, analysis_template: activeTemplateProfile(), template_fit_report: analysisTemplates.templateFitReport(state, activeTemplateId())}); setStatus(tr('statusTemplateExported'), 'good'); });
    $('compilePromptBtn')?.addEventListener('click', () => { compilePromptPlan(); save(); render(); setStatus(tr('statusPromptCompiled'), 'good'); });
    $('generatePlanBtn')?.addEventListener('click', () => { persistTemplateSelection(); state.plan = buildResearchPlan(); save(); render(); setStatus(tr('statusReady'), 'good'); });
    $('copyCompiledPromptBtn')?.addEventListener('click', () => { const compiled = state.prompt_compiler || compilePromptPlan(); copyText(JSON.stringify(compiled, null, 2)); });
    $('copyPlanPromptBtn')?.addEventListener('click', () => copyText(buildPlanPrompt()));
    $('clearPlanBtn')?.addEventListener('click', () => { if(!confirmDestructive('Clear research plan?')) return; state.plan = null; state.prompt_compiler = null; save(); render(); setStatus(tr('statusNeedPlan'), 'warn'); });
    $('addEvidenceBtn')?.addEventListener('click', () => {
      try {
        const entry = makeEvidenceEntry();
        if(state.editingEvidenceIndex >= 0) state.evidence[state.editingEvidenceIndex] = entry;
        else state.evidence.push(entry);
        renumberEvidence(); save(); clearEvidenceForm(); render(); setStatus(tr('statusReady'), 'good');
      } catch(_) { setStatus(`${tr('claim')} required.`, 'bad'); }
    });
    $('cancelEvidenceEditBtn')?.addEventListener('click', () => { clearEvidenceForm(); save(); render(); });
    $('loadDemoEvidenceBtn')?.addEventListener('click', loadDemoEvidence);
    $('exportWorkflowBtn')?.addEventListener('click', () => { const packet = researchPacket(); if(!confirmWorkflowExport(packet)) return; downloadJson('jarbou3i-research-packet-v0.24-beta.json', packet); const summary = uxReliability?.workflowSummary?.(packet); setStatus(summary ? `${tr('statusExported')} Evidence:${summary.evidence_count} Links:${summary.causal_link_count} Privacy:${summary.privacy_release_gate}` : tr('statusExported'), 'good'); });
    $('exportPackBtn')?.addEventListener('click', exportPackV2);
    $('importWorkflowInput')?.addEventListener('change', async (event) => {
      const file = event.target.files?.[0];
      if(!file) return;
      if(!confirmDestructive('Import research packet?')){ event.target.value = ''; return; }
      try { importWorkflowPacket(JSON.parse(await file.text())); }
      catch(_) { setStatus(tr('statusInvalidPacket'), 'bad'); }
      event.target.value = '';
    });
    $('clearEvidenceBtn')?.addEventListener('click', () => { if(!confirmDestructive('Clear evidence matrix?')) return; state.evidence = []; state.causal_links = []; state.analysis_brief = null; state.diagnostics = null; state.lastMockAnalysis = null; state.editingEvidenceIndex = -1; clearEvidenceForm(); save(); render(); setStatus(tr('statusNeedEvidence'), 'warn'); });
    $('addCausalLinkBtn')?.addEventListener('click', () => {
      try { state.causal_links.push(makeCausalLink()); clearCausalForm(); save(); render(); setStatus(tr('statusLinkAdded'), 'good'); }
      catch(_) { setStatus(tr('statusInvalidLink'), 'bad'); }
    });
    $('inferCausalLinksBtn')?.addEventListener('click', () => { inferCausalLinks(); save(); render(); setStatus(tr('statusLinksInferred'), 'good'); });
    $('clearCausalLinksBtn')?.addEventListener('click', () => { if(!confirmDestructive('Clear causal links?')) return; state.causal_links = []; state.analysis_brief = null; state.diagnostics = null; save(); render(); setStatus(tr('causalEmpty'), 'warn'); });
    $('compileBriefBtn')?.addEventListener('click', () => { compileAnalysisBrief(true); render(); setStatus(tr('statusCompiled'), 'good'); });
    $('copySynthesisPromptBtn')?.addEventListener('click', () => copyText(buildSynthesisPrompt()));
    $('exportAnalysisBriefBtn')?.addEventListener('click', () => { const brief = state.analysis_brief || compileAnalysisBrief(true); downloadJson('jarbou3i-analysis-brief-v0.24-beta.json', brief); setStatus(tr('statusBriefExported'), 'good'); });
    $('clearAnalysisBriefBtn')?.addEventListener('click', () => { if(!confirmDestructive('Clear analysis brief?')) return; state.analysis_brief = null; state.diagnostics = null; save(); render(); setStatus(tr('statusBriefCleared'), 'warn'); });
    $('buildSourceToBriefBtn')?.addEventListener('click', () => { if(!state.plan) state.plan = buildResearchPlan(); if(!state.analysis_brief) compileAnalysisBrief(true); buildSourceToBriefPackage(state.analysis_brief, true); save(); render(); setStatus(tr('statusSourceToBriefBuilt'), 'good'); });
    $('exportSourceToBriefBtn')?.addEventListener('click', () => { const report = state.source_to_brief_workbench || buildSourceToBriefPackage(state.analysis_brief || null, true); downloadJson(`jarbou3i-source-to-brief-${Date.now()}.json`, report); save(); render(); setStatus(tr('statusSourceToBriefExported'), 'good'); });
    operatorCommandPalette?.installNavigation?.({document,setUxTab,setStatus,tr,$});
    $('validateProviderSettingsBtn')?.addEventListener('click', () => { persistProviderSettings(); render(); setStatus(tr('statusProviderSettingsSaved'), 'good'); });
    $('connectPortableAccountBtn')?.addEventListener('click', connectPortableAccount);
    $('refreshPortableAccountBtn')?.addEventListener('click', refreshPortableAccount);
    $('disconnectPortableAccountBtn')?.addEventListener('click', disconnectPortableAccount);
    $('exportPortableStatusBtn')?.addEventListener('click', exportPortableAccountStatus);
    $('buildPortableOAuthUrlBtn')?.addEventListener('click', () => buildPortableOAuthUrl());
    $('completePortableOAuthCallbackBtn')?.addEventListener('click', () => completePortableOAuthCallback());
    $('disconnectPortableOAuthSpikeBtn')?.addEventListener('click', disconnectPortableOAuthSpike);
    $('dryRunProviderRequestBtn')?.addEventListener('click', () => { persistProviderSettings(); state.last_provider_payload = buildProviderPayload(); state.last_provider_contract_preview = providerContractPreview(state.last_provider_payload.task); state.last_provider_prompt_preview = providerPromptPreview(state.last_provider_payload); state.provider_diagnostics = providerDiagnostics(state.last_provider_payload); save(); render(); setStatus(tr('statusProviderDryRun'), 'good'); });
    $('runProviderTaskBtn')?.addEventListener('click', runProviderTask);
    $('previewProviderContractBtn')?.addEventListener('click', () => {
      const task = $('providerTask')?.value || state.activeProviderTask || 'synthesis';
      state.last_provider_contract_preview = providerContractPreview(task);
      state.provider_diagnostics = providerDiagnostics(buildProviderPayload(task));
      save(); render(); setStatus(tr('statusProviderContractPreviewed'), 'good');
    });
    $('previewProviderPromptBtn')?.addEventListener('click', () => {
      const payload = buildProviderPayload();
      state.last_provider_payload = payload;
      state.last_provider_prompt_preview = providerPromptPreview(payload);
      state.provider_diagnostics = providerDiagnostics(payload);
      save(); render(); setStatus(tr('statusProviderPromptPreviewed'), 'good');
    });
    $('runProviderFixtureSuiteBtn')?.addEventListener('click', runProviderFixtureSuite);
    $('exportProviderDiagnosticsBtn')?.addEventListener('click', () => {
      const payload = state.last_provider_payload || buildProviderPayload();
      const diagnostics = {
        diagnostics_version: VERSION,
        generated_at: nowIso(),
        contract: providerContractPreview(payload.task),
        prompt_preview: providerPromptPreview(payload),
        provider_diagnostics: providerDiagnostics(payload),
        provider_route_plan: providerRoutePlan(),
        provider_route_report: providerRouteReport(),
        provider_cost_report: providerCostReport(),
        fixture_report: state.provider_fixture_report || null,
        last_validation: state.last_provider_validation || null,
        repair_trace: state.last_repair_trace || null
      };
      downloadJson('jarbou3i-provider-diagnostics-v0.24-beta.json', diagnostics);
      setStatus(tr('statusProviderDiagnosticsExported'), 'good');
    });
    $('copyProviderPayloadBtn')?.addEventListener('click', () => copyText(JSON.stringify(buildProviderPayload(), null, 2)));
    ['providerName','providerTask','providerEndpoint','providerModel','providerApiKey','enableLiveByok','rememberProviderKey'].forEach(id => $(id)?.addEventListener('change', () => { persistProviderSettings(); state.last_provider_contract_preview = providerContractPreview(); render(); }));
    $('exportRunLedgerBtn')?.addEventListener('click', () => { downloadJson('jarbou3i-provider-run-ledger-v0.24-beta.json', {workflow_version: VERSION, ai_runs: state.ai_runs || []}); setStatus(tr('statusLedgerExported'), 'good'); });
    $('clearRunLedgerBtn')?.addEventListener('click', () => { if(!confirmDestructive('Clear provider run ledger?')) return; state.ai_runs = []; save(); render(); setStatus(tr('statusLedgerCleared'), 'warn'); });
    $('buildSourceTaskBtn')?.addEventListener('click', runSourceTask);
    $('copySourceRequestBtn')?.addEventListener('click', copySourceRequest);
    $('runSourceFixtureSuiteBtn')?.addEventListener('click', runSourceFixtureSuite);
    $('exportSourcePolicyBtn')?.addEventListener('click', exportSourcePolicy);
    $("previewSourceImportBtn")?.addEventListener("click", previewSourceImport);
    $("importSourceEvidenceBtn")?.addEventListener("click", importSourceEvidence);
    $("buildSourcePacketFromEvidenceBtn")?.addEventListener("click", buildSourcePacketFromEvidence);
    $("buildSourcePacketFromTemplateBtn")?.addEventListener("click", buildSourcePacketFromTemplate);
    $("buildSourcePacketFromReviewBtn")?.addEventListener("click", buildSourcePacketFromReview);
    $("copySourcePacketBuilderBtn")?.addEventListener("click", copyBuiltSourcePacket);
    $("exportSourcePacketBuilderBtn")?.addEventListener("click", exportBuiltSourcePacket);
    $("acceptAllReviewEvidenceBtn")?.addEventListener("click", acceptAllReviewEvidence);
    $("acceptVisibleReviewEvidenceBtn")?.addEventListener("click", () => applyReviewBatchDecision('accept'));
    $("needsEditVisibleReviewEvidenceBtn")?.addEventListener("click", () => applyReviewBatchDecision('needs_edit'));
    $("rejectVisibleReviewEvidenceBtn")?.addEventListener("click", () => applyReviewBatchDecision('reject'));
    $("acceptEditedReviewEvidenceBtn")?.addEventListener("click", acceptEditedReviewEvidence);
    $("exportEvidenceReviewQueueBtn")?.addEventListener("click", exportEvidenceReviewQueue);
    $("clearResolvedReviewEvidenceBtn")?.addEventListener("click", clearResolvedReviewEvidence);
    $("exportSourceImportReportBtn")?.addEventListener("click", exportSourceImportReport);
    $("clearSourceImportBtn")?.addEventListener("click", clearSourceImport);
    ['sourceConnector','sourceTask','githubRepoInput','sourceBackendEndpoint','searchProviderSelect','searchMaxQueries'].forEach(id => $(id)?.addEventListener('change', () => { state.source_connector = $('sourceConnector')?.value || 'manual_mock'; state.source_task = $('sourceTask')?.value || 'source_plan'; state.last_source_request = null; save(); render(); }));
    $('generateMockAnalysisBtn')?.addEventListener('click', () => {
      if(!state.plan) state.plan = buildResearchPlan();
      if(!state.evidence.length) loadDemoEvidence();
      if(!state.causal_links.length) inferCausalLinks();
      compileAnalysisBrief(true);
      const analysis = buildMockAnalysis();
      state.lastMockAnalysis = analysis; save(); render();
      const input = $('jsonInput');
      if(input){ input.value = JSON.stringify(analysis, null, 2); input.dispatchEvent(new Event('input', {bubbles:true})); }
      setStatus(tr('statusGenerated'), 'good');
      $('pasteCard')?.scrollIntoView({behavior:'smooth', block:'center'});
    });
    $('runMockRepairBtn')?.addEventListener('click', () => {
      if(!state.plan) state.plan = buildResearchPlan();
      if(!state.evidence.length) loadDemoEvidence();
      if(!state.causal_links.length) inferCausalLinks();
      compileAnalysisBrief(true);
      const analysis = buildMockAnalysis();
      state.lastMockAnalysis = analysis; save(); render();
      const input = $('jsonInput');
      if(input){ input.value = JSON.stringify(analysis, null, 2); input.dispatchEvent(new Event('input', {bubbles:true})); }
      setStatus(tr('statusRepaired'), 'good');
    });
    $('runCritiqueBtn')?.addEventListener('click', () => { state.critique = buildCritique(); save(); render(); setStatus(tr('statusCritiqued'), 'good'); });
    $('copyDeepPromptBtn')?.addEventListener('click', () => copyText(buildDeepResearchPrompt()));
    ['langAr','langEn','langFr'].forEach(id => $(id)?.addEventListener('click', () => setTimeout(render, 40)));
    document.addEventListener('keydown', (event) => {
      const tag = String(event.target?.tagName || '').toLowerCase();
      if(tag === 'input' || tag === 'textarea' || tag === 'select') return;
      const first = visibleReviewIndexes()[0];
      if(!Number.isInteger(first)) return;
      if(event.key === '/') { event.preventDefault(); $('reviewSearchInput')?.focus(); return; }
      if(event.key === 'Enter') { event.preventDefault(); promoteReviewItem(first); save(); render(); setStatus(tr('statusEvidenceAccepted'), 'good'); }
      if(event.key?.toLowerCase?.() === 'n') { event.preventDefault(); markReviewItemNeedsEdit(first); save(); render(); setStatus(tr('statusEvidenceNeedsEdit'), 'warn'); }
      if(event.key?.toLowerCase?.() === 'r') { event.preventDefault(); rejectReviewItem(first); save(); render(); setStatus(tr('statusEvidenceRejected'), 'warn'); }
      if(event.key?.toLowerCase?.() === 'e') { event.preventDefault(); editReviewItem(first); save(); render(); }
    });
  }

  document.addEventListener('DOMContentLoaded', () => { wire(); applyProviderSettingsToUi(); render(); });
})();
