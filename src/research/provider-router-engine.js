/* Jarbou3i Research Engine provider router and cost-aware run ledger v1.1.0-rc.1. Dry-run only. */
(function(global){
  'use strict';
  const root = global.Jarbou3iResearchModules = global.Jarbou3iResearchModules || {};
  const VERSION = '1.1.0-rc.1';
  const ROUTER_MODEL = 'provider_router.v1';
  const TASK_CAPABILITIES = Object.freeze({
    plan:['structured_output','reasoning','long_context'],
    synthesis:['reasoning','long_context','structured_output'],
    repair:['json_repair','structured_output'],
    critique:['reasoning','adversarial_review','structured_output'],
    source_discipline:['classification','structured_output','source_metadata_review'],
    extraction:['classification','structured_output'],
    graph_export:['structured_output','deterministic_transform']
  });
  const PROVIDER_CAPABILITIES = Object.freeze({
    mock:{provider_id:'mock', model:'local-mock', capabilities:['structured_output','json_repair','classification','deterministic_transform'], cost_per_1k_input:0, cost_per_1k_output:0, latency_ms:20, live_supported:false, risk:'low', privacy_mode:'local_only', execution_mode:'local_dry_run'},
    openai_compatible:{provider_id:'openai_compatible', model:'external-model', capabilities:['reasoning','long_context','structured_output','json_repair','classification','adversarial_review'], cost_per_1k_input:0.005, cost_per_1k_output:0.015, latency_ms:1800, live_supported:true, risk:'medium', privacy_mode:'direct_provider_if_user_opt_in', execution_mode:'dry_run_route_only'},
    backend_proxy:{provider_id:'backend_proxy', model:'server-routed-model', capabilities:['reasoning','long_context','structured_output','json_repair','classification','adversarial_review','source_metadata_review'], cost_per_1k_input:0.006, cost_per_1k_output:0.018, latency_ms:2200, live_supported:true, risk:'medium_high', privacy_mode:'hosted_proxy_if_enabled', execution_mode:'dry_run_route_only'},
    portable_oauth:{provider_id:'portable_oauth', model:'portable-account-model', capabilities:['reasoning','long_context','structured_output','classification'], cost_per_1k_input:0.004, cost_per_1k_output:0.012, latency_ms:2000, live_supported:false, risk:'medium', privacy_mode:'portable_oauth_planned', execution_mode:'mock_or_dry_run_only'}
  });
  function nowIso(){return new Date().toISOString();}
  function asArray(value){return Array.isArray(value)?value:[];}
  function text(value,fallback=''){return String(value ?? fallback).trim();}
  function clamp(value,min,max){const n=Number(value);return Math.max(min,Math.min(max,Number.isFinite(n)?n:min));}
  function unique(items){return [...new Set(asArray(items).filter(Boolean).map(String))];}
  function estimateTokenCount(input){
    const textValue=typeof input==='string'?input:JSON.stringify(input||{});
    return Math.max(1,Math.ceil(textValue.length/4));
  }
  function requiredCapabilities(task){return TASK_CAPABILITIES[task] || TASK_CAPABILITIES.synthesis;}
  function capabilityScore(providerRecord, required){
    const available=new Set(providerRecord.capabilities||[]);
    const matched=required.filter(cap=>available.has(cap));
    return Math.round((matched.length/Math.max(1,required.length))*100);
  }
  function riskPenalty(providerId, config={}, options={}){
    const allowLive=!!config.allow_live;
    if(providerId==='mock') return 0;
    if(providerId==='portable_oauth') return 20;
    if(!allowLive) return 12;
    if(providerId==='openai_compatible' && !options.key_present) return 35;
    if(providerId==='backend_proxy' && !config.endpoint) return 35;
    return 18;
  }
  function estimateCost(providerRecord,inputTokens,outputTokens){
    const inputCost=(inputTokens/1000)*(providerRecord.cost_per_1k_input||0);
    const outputCost=(outputTokens/1000)*(providerRecord.cost_per_1k_output||0);
    return Number((inputCost+outputCost).toFixed(6));
  }
  function routeCandidate(providerId, context={}){
    const providerRecord=PROVIDER_CAPABILITIES[providerId]||PROVIDER_CAPABILITIES.mock;
    const task=text(context.task,'synthesis');
    const required=requiredCapabilities(task);
    const inputTokens=estimateTokenCount(context.prompt||context.packet||context.topic||task);
    const outputTokens=clamp(context.expected_output_tokens||1200,200,12000);
    const cap=capabilityScore(providerRecord,required);
    const penalty=riskPenalty(providerId,context.provider_config||{},context);
    const cost=estimateCost(providerRecord,inputTokens,outputTokens);
    const latency=providerRecord.latency_ms + Math.round(outputTokens/20);
    const suitability=Math.max(0,Math.min(100,cap - penalty - Math.min(20,Math.round(cost*100))));
    const blockers=[];
    if(providerId==='openai_compatible' && context.provider_config?.allow_live && !context.key_present) blockers.push('live_byok_route_requires_key');
    if(providerId==='backend_proxy' && context.provider_config?.allow_live && !context.provider_config?.endpoint) blockers.push('backend_proxy_endpoint_required');
    if(providerId==='portable_oauth') blockers.push('portable_oauth_live_route_not_enabled');
    return {
      route_id:`route_${providerId}_${task}`,
      provider_id:providerId,
      task,
      model:context.provider_config?.model || providerRecord.model,
      required_capabilities:required,
      matched_capabilities:required.filter(cap=>(providerRecord.capabilities||[]).includes(cap)),
      missing_capabilities:required.filter(cap=>!(providerRecord.capabilities||[]).includes(cap)),
      capability_match_score:cap,
      suitability_score:suitability,
      estimated_cost_usd:cost,
      estimated_latency_ms:latency,
      risk_level:providerRecord.risk,
      privacy_mode:providerRecord.privacy_mode,
      execution_mode:providerRecord.execution_mode,
      live_supported:!!providerRecord.live_supported,
      live_opt_in:!!context.provider_config?.allow_live,
      route_blockers:blockers,
      automatic_paid_call_performed:false,
      live_execution_performed:false,
      secrets_exported:false
    };
  }
  function buildProviderRoutePlan(input={}, options={}){
    const version=options.version||VERSION;
    const task=text(input.task || input.activeProviderTask || input.provider_task,'synthesis');
    const providers=unique(input.providers || ['mock','openai_compatible','backend_proxy','portable_oauth']);
    const context={
      task,
      topic:input.topic,
      prompt:input.prompt,
      packet:input.packet,
      expected_output_tokens:input.expected_output_tokens,
      provider_config:input.provider_config||{},
      key_present:!!input.key_present
    };
    const candidates=providers.map(providerId=>routeCandidate(providerId,context)).sort((a,b)=>b.suitability_score-a.suitability_score || a.estimated_cost_usd-b.estimated_cost_usd);
    const selected=candidates.find(candidate=>candidate.provider_id==='mock') || candidates[0] || routeCandidate('mock',context);
    const totalCost=candidates.reduce((sum,item)=>sum+item.estimated_cost_usd,0);
    const warnings=[];
    if(candidates.some(item=>item.live_opt_in)) warnings.push('live_opt_in_detected_but_router_is_dry_run_only');
    if(selected.provider_id==='mock' && requiredCapabilities(task).some(cap=>!selected.matched_capabilities.includes(cap))) warnings.push('mock_selected_with_capability_gap_for_safe_dry_run');
    return {
      provider_route_plan_version:version,
      route_model:ROUTER_MODEL,
      generated_at:options.now||nowIso(),
      task,
      selected_route:selected,
      candidate_routes:candidates,
      provider_capability_matrix:providers.map(providerId=>PROVIDER_CAPABILITIES[providerId]||PROVIDER_CAPABILITIES.mock),
      task_capabilities:requiredCapabilities(task),
      model_suitability_score:selected.suitability_score,
      cost_preview:{currency:'USD', selected_estimated_cost_usd:selected.estimated_cost_usd, route_set_estimated_cost_usd:Number(totalCost.toFixed(6)), automatic_paid_call_performed:false, requires_user_approval_before_live_call:true},
      latency_preview:{selected_estimated_latency_ms:selected.estimated_latency_ms, route_set_max_latency_ms:Math.max(...candidates.map(x=>x.estimated_latency_ms),0)},
      risk_preview:{selected_risk_level:selected.risk_level, route_blockers:selected.route_blockers, secrets_exported:false, key_exported:false, credential_exported:false},
      safety_report:{provider_router_safety_version:version, dry_run_only:true, live_execution_performed:false, automatic_paid_call_performed:false, provider_execution_required:false, user_approval_required_before_live_execution:true, secrets_exported:false, release_gate:'provider_route_review_required'},
      warnings,
      release_gate:'provider_route_review_required',
      live_execution_performed:false,
      automatic_paid_call_performed:false,
      provider_execution_required:false,
      verification_claimed:false
    };
  }
  function buildProviderRouteReport(plan, options={}){
    const routePlan=plan && plan.provider_route_plan_version ? plan : buildProviderRoutePlan(plan||{}, options);
    const candidates=asArray(routePlan.candidate_routes);
    const blocked=candidates.filter(item=>asArray(item.route_blockers).length).length;
    return {
      provider_route_report_version:options.version||routePlan.provider_route_plan_version||VERSION,
      route_model:ROUTER_MODEL,
      generated_at:options.now||nowIso(),
      selected_provider:routePlan.selected_route?.provider_id||'mock',
      selected_task:routePlan.task||'synthesis',
      candidate_count:candidates.length,
      blocked_route_count:blocked,
      average_suitability_score:candidates.length?Math.round(candidates.reduce((s,i)=>s+(i.suitability_score||0),0)/candidates.length):0,
      cost_ceiling_usd:options.cost_ceiling_usd ?? 0,
      dry_run_only:true,
      live_execution_performed:false,
      automatic_paid_call_performed:false,
      release_gate:blocked?'provider_route_review_required':'provider_route_review_ready',
      recommendations:blocked?['Resolve route blockers before enabling any live provider execution.','Keep mock route as safe default for public-demo and CI paths.']:['Review selected route, cost preview, and privacy mode before live opt-in.']
    };
  }
  function buildProviderCostReport(plan, options={}){
    const routePlan=plan && plan.provider_route_plan_version ? plan : buildProviderRoutePlan(plan||{}, options);
    const candidates=asArray(routePlan.candidate_routes);
    return {
      provider_cost_report_version:options.version||routePlan.provider_route_plan_version||VERSION,
      generated_at:options.now||nowIso(),
      currency:'USD',
      selected_provider:routePlan.selected_route?.provider_id||'mock',
      selected_estimated_cost_usd:routePlan.cost_preview?.selected_estimated_cost_usd ?? 0,
      route_set_estimated_cost_usd:routePlan.cost_preview?.route_set_estimated_cost_usd ?? 0,
      route_costs:candidates.map(item=>({provider_id:item.provider_id, task:item.task, estimated_cost_usd:item.estimated_cost_usd, estimated_latency_ms:item.estimated_latency_ms, suitability_score:item.suitability_score})),
      automatic_paid_call_performed:false,
      requires_user_approval_before_live_call:true,
      secrets_exported:false,
      release_gate:'cost_preview_review_required'
    };
  }
  function enrichRunLedger(aiRuns=[], plan, options={}){
    const routePlan=plan && plan.provider_route_plan_version ? plan : buildProviderRoutePlan(plan||{}, options);
    return asArray(aiRuns).map((run)=>Object.assign({},run,{
      provider_route_snapshot:{provider_id:routePlan.selected_route?.provider_id||run.provider||'mock', route_model:ROUTER_MODEL, suitability_score:routePlan.selected_route?.suitability_score||0, estimated_cost_usd:routePlan.selected_route?.estimated_cost_usd||0, live_execution_performed:false, automatic_paid_call_performed:false},
      estimated_cost_usd:routePlan.selected_route?.estimated_cost_usd||0,
      cost_currency:'USD',
      route_quality_score:routePlan.model_suitability_score||0,
      automatic_paid_call_performed:false,
      secrets_exported:false
    }));
  }
  function buildProviderRouterBundle(input={}, options={}){
    const plan=buildProviderRoutePlan(input, options);
    const report=buildProviderRouteReport(plan, options);
    const cost=buildProviderCostReport(plan, options);
    return {provider_route_plan:plan, provider_route_report:report, provider_cost_report:cost, provider_router_safety_report:plan.safety_report, enriched_run_ledger:enrichRunLedger(input.ai_runs||[], plan, options)};
  }
  root.providerRouterEngine=Object.freeze({VERSION,ROUTER_MODEL,TASK_CAPABILITIES,PROVIDER_CAPABILITIES,buildProviderRoutePlan,buildProviderRouteReport,buildProviderCostReport,enrichRunLedger,buildProviderRouterBundle});
  if(typeof module !== 'undefined' && module.exports) module.exports=root.providerRouterEngine;
})(typeof window !== 'undefined' ? window : globalThis);
