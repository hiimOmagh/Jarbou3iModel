/* Jarbou3i Research Engine golden workflow corpus and end-to-end demo run v1.1.0. */
(function(global){
  'use strict';
  const root = global.Jarbou3iResearchModules = global.Jarbou3iResearchModules || {};
  const VERSION = '1.3.0-alpha.8';
  const MODEL = 'golden_workflow_corpus.v1';
  function nowIso(){ return new Date().toISOString(); }
  function asArray(value){ return Array.isArray(value) ? value : []; }
  function text(value, fallback=''){ return String(value ?? fallback).trim(); }
  function unique(values){ return [...new Set(asArray(values).filter(Boolean).map(String))]; }
  function bool(value){ return value === true; }
  function goldenEvidenceMatrix(){
    return [
      {evidence_id:'E1', claim:'Official policy brief published the baseline position on 2026-05-01.', claim_type:'observation', source_title:'Official Policy Brief', source_type:'official', source_url:'https://example.org/official-policy-brief', source_date:'2026-05-01', confidence:'high', evidence_strength:4, supports:['I1'], contradicts:[]},
      {evidence_id:'E2', claim:'Independent expert analysis indicates implementation risk if procurement timelines slip.', claim_type:'inference', source_title:'Independent Expert Analysis', source_type:'expert', source_url:'https://example.org/expert-analysis', source_date:'2026-05-02', confidence:'medium', evidence_strength:3, supports:['R1'], contradicts:['N1']},
      {evidence_id:'E3', claim:'Public attention increased after social discussion amplified unresolved trade-offs.', claim_type:'observation', source_title:'Public Attention Snapshot', source_type:'social', source_url:'https://example.org/public-attention', source_date:'2026-05-03', confidence:'medium', evidence_strength:2, supports:['A1'], contradicts:[]},
      {evidence_id:'E4', claim:'Counter-source argues the risk is overstated because implementation capacity is undercounted.', claim_type:'inference', source_title:'Counter-Assessment Note', source_type:'expert', source_url:'https://example.org/counter-assessment', source_date:'2026-05-04', confidence:'medium', evidence_strength:3, supports:['N1'], contradicts:['R1']},
      {evidence_id:'E5', claim:'Scenario risk could rise if the official timeline slips by more than one quarter.', claim_type:'estimate', source_title:'Scenario Stress Test', source_type:'analyst', source_url:'https://example.org/scenario-stress-test', source_date:'2026-05-05', confidence:'medium', evidence_strength:3, supports:['S1'], contradicts:['F1']}
    ];
  }
  function buildGoldenWorkflowCorpus(options = {}){
    const version = options.version || VERSION;
    const evidence = goldenEvidenceMatrix();
    return {
      workflow_version:version,
      corpus_version:version,
      corpus_model:MODEL,
      corpus_id:'golden-workflow-alpha24',
      topic:'Golden workflow demo: source-grounded strategic brief reliability',
      context:'Deterministic public-demo corpus for end-to-end validation; no live fetching or provider execution.',
      generated_at:nowIso(),
      research_plan:{plan_version:version, topic:'Golden workflow demo: source-grounded strategic brief reliability', context:'Deterministic alpha.24 demo corpus', mode:'golden_demo', target_actors:['Official institution','Independent expert','Public attention cluster'], target_sources:['official','expert','social','analyst'], disconfirming_conditions:['Disproven if E4 invalidates E2 and no additional accepted evidence supports R1.'], live_fetching_performed:false},
      evidence_matrix:evidence,
      evidence_review_queue:evidence.map((item,index)=>({review_id:`GRQ${index+1}`, status:index === 3 ? 'needs_edit' : 'accepted', evidence:item, accepted_evidence_id:index === 3 ? null : item.evidence_id})),
      entity_profiles:[{entity_id:'ENT1', name:'Official institution', evidence_ids:['E1']},{entity_id:'ENT2', name:'Independent expert bloc', evidence_ids:['E2','E4']},{entity_id:'ENT3', name:'Public attention cluster', evidence_ids:['E3']}],
      source_clusters:[{cluster_id:'CL1', target_id:'I1', source_types:['official'], evidence_ids:['E1']},{cluster_id:'CL2', target_id:'R1', source_types:['expert','analyst'], evidence_ids:['E2','E5']},{cluster_id:'CL3', target_id:'N1', source_types:['expert'], evidence_ids:['E4']}],
      causal_links:[{from:'I1', to:'R1', relationship:'supports', evidence_ids:['E1','E2'], confidence:'medium'},{from:'N1', to:'R1', relationship:'contradicts', evidence_ids:['E4'], confidence:'medium'},{from:'S1', to:'R1', relationship:'amplifies', evidence_ids:['E5'], confidence:'medium'}],
      strategic_evidence_graph:{graph_version:version, graph_nodes:[{id:'EV-E1', type:'evidence'},{id:'EV-E2', type:'evidence'},{id:'EV-E4', type:'evidence'},{id:'I1', type:'claim'},{id:'R1', type:'risk'},{id:'N1', type:'counter_evidence'}], graph_edges:[{from:'EV-E1', to:'I1', relationship:'supports'},{from:'EV-E2', to:'R1', relationship:'supports'},{from:'EV-E4', to:'R1', relationship:'contradicts'}], live_fetching_performed:false},
      analysis_brief:{brief_version:version, topic:'Golden workflow demo: source-grounded strategic brief reliability', handoff_summary:'The golden demo conclusion is traceable to E1, E2, E4, and E5. It remains publication-gated until contradiction N1 and falsifier F1 are reviewed.', evidence_priorities:['Validate E1 as official baseline evidence.','Review E2 against E4 before publication.','Use E5 only as estimate, not observation.'], gaps:['Manual review still required for the E2/E4 contradiction.'], synthesis_constraints:['Do not convert scenario estimate E5 into verified fact.'], quality_fix_actions:['Resolve contradiction N1 before publication.']},
      privacy_export:{privacy_export_version:version, release_gate:'pass', raw_token_exported:false, secret_exported:false, live_fetching_performed:false},
      release_gate:'golden_workflow_review_required',
      live_fetching_performed:false,
      provider_execution_performed:false,
      verification_claimed:false
    };
  }
  function evidenceIds(packet){ return asArray(packet.evidence_matrix).map((item,index)=>item.evidence_id || `E${index+1}`); }
  function buildGoldenEndToEndDemoReport(packet = {}, options = {}){
    const version = options.version || VERSION;
    const ids = new Set(evidenceIds(packet));
    const stageChecks = [
      {stage:'research_plan', passed:!!packet.research_plan?.topic},
      {stage:'evidence_matrix', passed:asArray(packet.evidence_matrix).length >= 3},
      {stage:'evidence_review_queue', passed:asArray(packet.evidence_review_queue).length >= 1 || asArray(packet.evidence_review?.queue).length >= 1},
      {stage:'entity_profiles', passed:asArray(packet.entity_profiles).length >= 1},
      {stage:'source_clusters', passed:asArray(packet.source_clusters).length >= 1},
      {stage:'strategic_evidence_graph', passed:!!packet.strategic_evidence_graph || !!packet.graph_export_report},
      {stage:'analysis_brief', passed:!!packet.analysis_brief?.handoff_summary},
      {stage:'publication_review_gate', passed:!!packet.publication_review_gate_report || !!packet.export_safe_final_review_report},
      {stage:'export_pack_v3', passed:(packet.export_pack?.format === 'export_pack_v3') || !!packet.evidence_pack_v3_manifest}
    ];
    const missingEvidenceReferences = [];
    asArray(packet.source_clusters).forEach((cluster)=>asArray(cluster.evidence_ids).forEach((id)=>{ if(!ids.has(id)) missingEvidenceReferences.push(`cluster:${cluster.cluster_id}:${id}`); }));
    asArray(packet.entity_profiles).forEach((entity)=>asArray(entity.evidence_ids).forEach((id)=>{ if(!ids.has(id)) missingEvidenceReferences.push(`entity:${entity.entity_id}:${id}`); }));
    const passed = stageChecks.filter((item)=>item.passed).length;
    return {golden_end_to_end_demo_report_version:version, demo_model:MODEL, generated_at:nowIso(), stage_count:stageChecks.length, passed_stage_count:passed, failed_stage_count:stageChecks.length-passed, stage_checks:stageChecks, missing_evidence_references:unique(missingEvidenceReferences), deterministic:true, live_fetching_performed:false, provider_execution_performed:false, verification_claimed:false, release_gate:(passed === stageChecks.length && !missingEvidenceReferences.length) ? 'golden_demo_reviewable' : 'golden_demo_review_required'};
  }
  function buildGoldenExportPackValidationReport(packet = {}, exportPack = null, options = {}){
    const version = options.version || VERSION;
    const files = asArray(exportPack?.files || packet.export_pack_files || []);
    const paths = new Set(files.map((file)=>file.path));
    const requiredPaths = ['export-manifest.json','research-packet.json','analysis-brief.md','evidence-matrix.csv','traceability/brief-traceability-report.json','publication-review/publication-review-gate-report.json'];
    const missingFiles = requiredPaths.filter((path)=>!paths.has(path));
    const manifestFormat = exportPack?.manifest?.export_pack_format || packet.evidence_pack_v3_manifest?.export_pack_format || packet.export_pack?.format;
    return {golden_export_pack_validation_report_version:version, validation_model:MODEL, generated_at:nowIso(), export_pack_format:manifestFormat || 'unknown', expected_format:'export_pack_v3', file_count:files.length || packet.evidence_pack_v3_manifest?.file_count || 0, required_paths:requiredPaths, missing_required_paths:missingFiles, publication_review_report_present:!!packet.publication_review_gate_report, traceability_report_present:!!packet.brief_traceability_report, privacy_release_gate:packet.privacy_export?.release_gate || 'unknown', live_fetching_performed:false, provider_execution_performed:false, verification_claimed:false, release_gate:missingFiles.length ? 'golden_export_pack_review_required' : 'golden_export_pack_reviewable'};
  }
  function buildHostedDemoScenarioEvidence(packet = {}, options = {}){
    const version = options.version || VERSION;
    return {hosted_demo_scenario_evidence_version:version, scenario_model:MODEL, generated_at:nowIso(), scenario_id:'alpha24-golden-public-demo', required_captures:['desktop-first-screen.png','mobile-first-screen.png','provider-mode.png','quality-export.png'], required_visible_text_snapshots:['visible-text-ar.json','visible-text-fr.json','visible-text-en.json'], expected_visible_tokens:['v1.1.0','Golden Workflow Corpus','End-to-End Demo Run'], expected_demo_actions:['load_golden_corpus','review_golden_evidence','inspect_publication_gate','export_pack_v3'], app_version_expected:version, live_fetching_performed:false, provider_execution_performed:false, verification_claimed:false, release_gate:'hosted_demo_scenario_evidence_required'};
  }
  function buildReleaseReadinessRunbook(packet = {}, options = {}){
    const version = options.version || VERSION;
    return {release_readiness_runbook_version:version, runbook_model:MODEL, generated_at:nowIso(), release:'v1.3.0-alpha.8 — Signed Export Handoff Pack + Lock Ledger Review Surface', steps:['Run node tests/golden-workflow-corpus-check.mjs.','Run node tests/ci-gate-runner.mjs no-browser.','Run GitHub browser CI.','Capture hosted-demo evidence.','Confirm hosted metadata app_version is 1.1.0.','Reject lock if visible-text snapshots contain stale alpha.23 release copy.'], blocker_policy:['Screenshots alone are insufficient.','ZIP existence alone is insufficient.','No live scraping/provider execution/OAuth expansion is allowed.'], live_fetching_performed:false, provider_execution_performed:false, verification_claimed:false, release_gate:'release_readiness_review_required'};
  }
  function buildGoldenWorkflowBundle(packet = {}, exportPack = null, options = {}){
    const base = packet && Object.keys(packet).length ? packet : buildGoldenWorkflowCorpus(options);
    const corpus = buildGoldenWorkflowCorpus(options);
    return {golden_workflow_corpus:corpus, golden_end_to_end_demo_report:buildGoldenEndToEndDemoReport(base, options), golden_export_pack_validation_report:buildGoldenExportPackValidationReport(base, exportPack, options), hosted_demo_scenario_evidence:buildHostedDemoScenarioEvidence(base, options), release_readiness_runbook:buildReleaseReadinessRunbook(base, options)};
  }
  root.goldenWorkflowCorpus = Object.freeze({VERSION, MODEL, buildGoldenWorkflowCorpus, buildGoldenEndToEndDemoReport, buildGoldenExportPackValidationReport, buildHostedDemoScenarioEvidence, buildReleaseReadinessRunbook, buildGoldenWorkflowBundle});
  if(typeof module !== 'undefined' && module.exports) module.exports = root.goldenWorkflowCorpus;
})(typeof window !== 'undefined' ? window : globalThis);
