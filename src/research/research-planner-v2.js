/* Jarbou3i Research Engine Research Planner V2 v1.1.0. Local-only planning; no live search execution. */
(function(global){
  'use strict';
  const root = global.Jarbou3iResearchModules = global.Jarbou3iResearchModules || {};
  const VERSION = '1.2.0-alpha.5';
  const MODEL = 'research_planner_v2.v1';
  const SOURCE_TYPES = ['official','academic','primary','news','expert','market','social','video','github','dataset','other'];
  const DEPTH_PRESETS = Object.freeze({
    quick:{depth_preset:'quick', max_queries:6, max_sources:8, review_budget:'small', source_budget:{official:1, academic:0, primary:1, news:2, expert:0, market:0, social:1, video:0, github:0, dataset:0, other:1}},
    standard:{depth_preset:'standard', max_queries:12, max_sources:18, review_budget:'medium', source_budget:{official:2, academic:2, primary:2, news:4, expert:1, market:1, social:2, video:1, github:1, dataset:1, other:1}},
    deep:{depth_preset:'deep', max_queries:24, max_sources:36, review_budget:'large', source_budget:{official:4, academic:4, primary:4, news:6, expert:3, market:2, social:4, video:3, github:2, dataset:2, other:2}}
  });
  const text=(v,f='')=>String(v??f).trim();
  const asArray=(v)=>Array.isArray(v)?v.filter(Boolean):(v===undefined||v===null||v===''?[]:[v]);
  const unique=(values)=>[...new Set((values||[]).map((v)=>text(v)).filter(Boolean))];
  const clamp=(v,min=0,max=100,f=0)=>{const n=Number(v);return Math.max(min,Math.min(max,Number.isFinite(n)?n:f));};
  function tokens(value){return text(value).toLowerCase().replace(/https?:\/\/\S+/g,' ').replace(/[^\p{L}\p{N}\s]/gu,' ').split(/\s+/).filter((x)=>x.length>2).slice(0,32);}
  function inferDepthPreset(plan={}, options={}){
    if(options.depth_preset && DEPTH_PRESETS[options.depth_preset]) return options.depth_preset;
    const blob=[plan.mode, plan.topic, plan.context, ...(plan.questions||[]), ...(plan.target_sources||[])].join(' ').toLowerCase();
    if(/deep|comprehensive|thorough|adversarial|source-heavy|source heavy|osint|multi-source/.test(blob)) return 'deep';
    if(/quick|brief|fast|overview|starter/.test(blob)) return 'quick';
    return 'standard';
  }
  function normalizeSourceBudget(depth, plan={}){
    const base=Object.assign({}, DEPTH_PRESETS[depth].source_budget);
    const blob=[plan.topic, plan.context, ...(plan.keywords||[]), ...(plan.target_sources||[])].join(' ').toLowerCase();
    if(/technology|software|github|repo|code|api|model|llm|ai/.test(blob)) base.github += depth==='deep'?2:1;
    if(/election|policy|law|regulation|government|state|security|war|china|us|eu/.test(blob)) { base.official += depth==='deep'?2:1; base.news += 1; }
    if(/market|price|odds|prediction|economic|finance/.test(blob)) base.market += depth==='quick'?1:2;
    const total=Object.values(base).reduce((a,b)=>a+b,0);
    return {source_budget_version:VERSION, depth_preset:depth, source_types:SOURCE_TYPES, max_sources:DEPTH_PRESETS[depth].max_sources, budget:base, budget_total:total, live_fetching_performed:false, verification_claimed:false};
  }
  function entityTerms(entities=[]){
    return (entities||[]).slice(0,12).map((e)=>({entity_id:e.entity_id||'', name:e.canonical_name||e.name||'', category:e.category||'other', aliases:asArray(e.aliases).slice(0,3)})).filter((e)=>e.name);
  }
  function baseTerms(plan={}){
    return unique([plan.topic, ...(plan.keywords||[]), ...(plan.target_actors||[]), ...(plan.target_sources||[])].flatMap((x)=>tokens(x))).slice(0,18);
  }
  function makeQuery(id,purpose,query,sourceTypes,priority=3,entityIds=[]){return {query_id:id, purpose, query_text:query.replace(/\s+/g,' ').trim(), recommended_source_types:sourceTypes, priority:clamp(priority,1,5,3), entity_ids:entityIds, live_fetching_performed:false, execution_mode:'dry_run_plan_only'};}
  function buildEntityAwareQueries(plan={}, entities=[], depth='standard'){
    const out=[]; let id=1; const terms=baseTerms(plan); const topic=text(plan.topic,'research topic'); const ents=entityTerms(entities);
    out.push(makeQuery(`Q${id++}`,'official_primary_sources',`${topic} official report primary source`,['official','primary'],5));
    out.push(makeQuery(`Q${id++}`,'recent_reliable_context',`${topic} recent analysis 2024 2025 2026`,['news','academic','expert'],4));
    out.push(makeQuery(`Q${id++}`,'counter_evidence',`${topic} criticism counter evidence limitations`,['academic','news','expert','official'],5));
    for(const ent of ents.slice(0, depth==='quick'?3:depth==='deep'?10:6)){
      out.push(makeQuery(`Q${id++}`,'entity_context',`${ent.name} ${topic} role evidence`,['official','news','primary','expert'],4,[ent.entity_id]));
      if(ent.aliases.length) out.push(makeQuery(`Q${id++}`,'entity_alias_check',`(${[ent.name,...ent.aliases].join(' OR ')}) ${terms.slice(0,4).join(' ')}`,['news','primary','social'],3,[ent.entity_id]));
      if(ent.category==='organization' || ent.category==='platform') out.push(makeQuery(`Q${id++}`,'platform_or_organization_signal',`${ent.name} GitHub release changelog policy source`,['github','primary','official'],3,[ent.entity_id]));
    }
    for(const question of asArray(plan.questions).slice(0, depth==='deep'?6:3)) out.push(makeQuery(`Q${id++}`,'question_specific',`${question} evidence source`,['official','academic','news','expert'],3));
    return out.slice(0, DEPTH_PRESETS[depth].max_queries);
  }
  function counterEvidenceTargets(plan={}, clusters=[], entities=[]){
    const targets=[];
    asArray(plan.counter_evidence_targets).forEach((t,i)=>targets.push({target_id:`CE${targets.length+1}`, target:text(t), source:'plan', priority:i<3?5:4, linked_entity_ids:[]}));
    asArray(plan.disconfirming_conditions).forEach((t)=>targets.push({target_id:`CE${targets.length+1}`, target:text(t), source:'disconfirming_condition', priority:5, linked_entity_ids:[]}));
    (clusters||[]).filter((c)=>!(c.has_counter_evidence)).slice(0,6).forEach((c)=>targets.push({target_id:`CE${targets.length+1}`, target:`Find counter-evidence for cluster ${c.cluster_id}: ${c.cluster_label||c.primary_claim||c.target_id}`, source:'cluster_gap', priority:4, linked_cluster_id:c.cluster_id, linked_entity_ids:[]}));
    (entities||[]).filter((e)=>asArray(e.review_flags).length).slice(0,6).forEach((e)=>targets.push({target_id:`CE${targets.length+1}`, target:`Verify entity role and aliases for ${e.canonical_name}`, source:'entity_review_flag', priority:3, linked_entity_ids:[e.entity_id]}));
    return targets.slice(0,18);
  }
  function platformRecommendations(plan={}, depth='standard'){
    const blob=[plan.topic, plan.context, ...(plan.keywords||[])].join(' ').toLowerCase();
    const recs=[
      {source_id:'official_sources', label:'Official / primary documents', reason:'Establishes provenance and baseline claims.', recommended_for:['official_primary_sources','counter_evidence'], review_gate:'required'},
      {source_id:'academic_sources', label:'Academic / policy research', reason:'Improves reliability and false-analogy checks.', recommended_for:['counter_evidence','question_specific'], review_gate:'recommended'},
      {source_id:'news_sources', label:'Reputable news / chronology', reason:'Builds recent timeline and actor-position changes.', recommended_for:['recent_reliable_context'], review_gate:'recommended'},
      {source_id:'social_public_signal', label:'Social/public attention signals', reason:'Tracks public salience without treating attention as truth.', recommended_for:['recent_signal'], review_gate:'review_required'}
    ];
    if(/github|software|code|api|ai|model|open source/.test(blob)) recs.push({source_id:'github_public_metadata', label:'GitHub public metadata', reason:'Useful for release/repo/person-mode signals; still requires review.', recommended_for:['platform_or_organization_signal'], review_gate:'review_required'});
    if(/video|youtube|interview|speech|podcast/.test(blob) || depth==='deep') recs.push({source_id:'video_transcript_import', label:'Video transcript import', reason:'Captures speeches, interviews, tutorials, and long-form expert signals.', recommended_for:['expert_context'], review_gate:'review_required'});
    if(/market|prediction|odds|forecast/.test(blob)) recs.push({source_id:'market_signal_import', label:'Market / prediction signal import', reason:'Useful as public expectation signal, not proof.', recommended_for:['attention_signal'], review_gate:'review_required'});
    return recs.map((r)=>Object.assign({live_fetching_performed:false, verification_claimed:false},r));
  }
  function connectorReadiness(plan={}, depth='standard'){
    const recs=platformRecommendations(plan,depth).map((r)=>r.source_id);
    return [
      {connector:'manual_source_packet', status:'available_manual_import', execution_mode:'manual_only', live_fetching_performed:false, verification_claimed:false},
      {connector:'web_search_api', status:'planned_dry_run_only', execution_mode:'dry_run_plan_only', query_budget:DEPTH_PRESETS[depth].max_queries, live_fetching_performed:false, verification_claimed:false},
      {connector:'github_public_repo', status:recs.includes('github_public_metadata')?'review_gated_candidate':'not_required_by_plan', execution_mode:'backend_review_gated_if_enabled_later', live_fetching_performed:false, verification_claimed:false},
      {connector:'video_transcript_import', status:recs.includes('video_transcript_import')?'manual_import_candidate':'not_required_by_plan', execution_mode:'manual_import_only', live_fetching_performed:false, verification_claimed:false}
    ];
  }
  function plannerScore(report){
    let score=30;
    if(report.entity_aware_queries.length>=6) score+=20;
    if(report.counter_evidence_targets.length>=3) score+=20;
    if(report.source_type_budget.budget_total>=10) score+=10;
    if(report.platform_source_recommendations.length>=4) score+=10;
    if(report.connector_readiness.every(c=>c.live_fetching_performed===false)) score+=10;
    return clamp(score,0,100,0);
  }
  function buildResearchPlannerV2(input={}, options={}){
    const plan=input.plan||{}; const evidence=input.evidence||[]; const clusters=input.clusters||[]; const entities=input.entities||[];
    const depth=inferDepthPreset(plan, options); const budget=normalizeSourceBudget(depth, plan); const queries=buildEntityAwareQueries(plan, entities, depth); const ce=counterEvidenceTargets(plan, clusters, entities); const platforms=platformRecommendations(plan, depth); const readiness=connectorReadiness(plan, depth);
    const flags=[]; if(!asArray(plan.questions).length) flags.push('planner_questions_missing'); if(!entities.length) flags.push('entity_context_missing'); if(!ce.length) flags.push('counter_evidence_targets_missing'); if(!queries.length) flags.push('query_plan_empty'); if(!evidence.length) flags.push('evidence_context_empty');
    const report={research_planner_version:options.version||VERSION, planner_model:MODEL, generated_at:options.now||new Date().toISOString(), topic:plan.topic||'', context:plan.context||'', depth_preset:depth, source_type_budget:budget, entity_aware_queries:queries, counter_evidence_targets:ce, platform_source_recommendations:platforms, connector_readiness:readiness, planner_gap_flags:flags, release_gate:flags.length?'planner_review_required':'planner_ready', policy:'local_research_planner_no_live_search_no_fetch_no_verification', live_fetching_performed:false, verification_claimed:false};
    report.planner_quality_score=plannerScore(report);
    report.recommendations=[...flags.map((flag)=>({planner_questions_missing:'Add research questions before executing any source plan.',entity_context_missing:'Run entity intelligence before relying on entity-aware query plans.',counter_evidence_targets_missing:'Add explicit counter-evidence targets.',query_plan_empty:'Generate at least one query plan before source work.',evidence_context_empty:'Use reviewed evidence when available to calibrate the planner.'}[flag]||`Review planner gap: ${flag}`)), `Use ${depth} depth with ${budget.max_sources} maximum source candidates before evidence review.`];
    return report;
  }
  root.researchPlannerV2=Object.freeze({VERSION, MODEL, DEPTH_PRESETS, inferDepthPreset, normalizeSourceBudget, buildEntityAwareQueries, counterEvidenceTargets, platformRecommendations, connectorReadiness, buildResearchPlannerV2});
})(typeof window !== 'undefined' ? window : globalThis);
