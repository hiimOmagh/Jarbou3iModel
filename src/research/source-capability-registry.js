/* Jarbou3i Research Engine source capability registry v1.1.0-alpha.9. No live source expansion. */
(function(global){
  'use strict';
  const root = global.Jarbou3iResearchModules = global.Jarbou3iResearchModules || {};
  const VERSION = '1.1.0-alpha.9';

  const ALLOWED = Object.freeze({
    availability:['local','mock','manual','external','unavailable','controlled_backend'],
    auth_mode:['none','api_key','browser_session','oauth_pkce','user_token','not_supported'],
    freshness:['static','user_supplied','live','planned'],
    evidence_type:['article','social','transcript','market','code','manual_note','metadata','mixed'],
    privacy_risk:['low','medium','high'],
    demo_visibility:['show','hide','disabled_with_reason']
  });

  const CAPABILITIES = Object.freeze({
    manual_private: {
      source_id:'manual_private',
      label:'Manual / private analysis workspace',
      availability:'local',
      auth_mode:'none',
      freshness:'user_supplied',
      evidence_type:'manual_note',
      privacy_risk:'low',
      demo_visibility:'show',
      live_fetching_enabled:false,
      export_allowed:true,
      status:'available_default',
      notes:['Default path. User-supplied material only. No network fetch.']
    },
    demo_static: {
      source_id:'demo_static',
      label:'Static public demo fixtures',
      availability:'mock',
      auth_mode:'none',
      freshness:'static',
      evidence_type:'mixed',
      privacy_risk:'low',
      demo_visibility:'show',
      live_fetching_enabled:false,
      export_allowed:true,
      status:'available_demo_only',
      notes:['Static/local evidence only. Must not be described as live.']
    },
    manual_source_packet: {
      source_id:'manual_source_packet',
      label:'Evidence scoring v1',
      availability:'manual',
      auth_mode:'none',
      freshness:'user_supplied',
      evidence_type:'mixed',
      privacy_risk:'low',
      demo_visibility:'show',
      live_fetching_enabled:false,
      export_allowed:true,
      status:'available_manual_import',
      notes:['Available in v1.1.0-alpha.9. Imports structured user-collected source packets into the review queue. No live fetching, scraping, or verification claims.']
    },
    web_search_api_dry_run: {
      source_id:'web_search_api_dry_run',
      label:'Web search provider abstraction dry-run',
      availability:'mock',
      auth_mode:'api_key',
      freshness:'planned',
      evidence_type:'article',
      privacy_risk:'medium',
      demo_visibility:'disabled_with_reason',
      live_fetching_enabled:false,
      export_allowed:true,
      status:'dry_run_only',
      notes:['Query planning exists. Live web search remains disabled in stable public demo mode.']
    },
    github_public_repo: {
      source_id:'github_public_repo',
      label:'GitHub public repository metadata',
      availability:'controlled_backend',
      auth_mode:'none',
      freshness:'live',
      evidence_type:'code',
      privacy_risk:'medium',
      demo_visibility:'disabled_with_reason',
      live_fetching_enabled:true,
      export_allowed:true,
      status:'existing_controlled_backend_metadata',
      notes:['Existing controlled backend path for public metadata only. No private repositories, no token export, review queue required.']
    },
    reddit_planned: {
      source_id:'reddit_planned', label:'Reddit public discourse signals', availability:'unavailable', auth_mode:'not_supported', freshness:'planned', evidence_type:'social', privacy_risk:'medium', demo_visibility:'hide', live_fetching_enabled:false, export_allowed:false, status:'strategy_only', notes:['Do not show as available until compliant collection, rate limits, and privacy disclosure exist.']
    },
    youtube_transcript_planned: {
      source_id:'youtube_transcript_planned', label:'YouTube transcript/source signals', availability:'unavailable', auth_mode:'not_supported', freshness:'planned', evidence_type:'transcript', privacy_risk:'medium', demo_visibility:'hide', live_fetching_enabled:false, export_allowed:false, status:'strategy_only', notes:['No live transcript collection in this build.']
    },
    hn_planned: {
      source_id:'hn_planned', label:'Hacker News discussion signals', availability:'unavailable', auth_mode:'not_supported', freshness:'planned', evidence_type:'social', privacy_risk:'medium', demo_visibility:'hide', live_fetching_enabled:false, export_allowed:false, status:'strategy_only', notes:['No live HN connector in this build.']
    },
    polymarket_planned: {
      source_id:'polymarket_planned', label:'Prediction-market probability signals', availability:'unavailable', auth_mode:'not_supported', freshness:'planned', evidence_type:'market', privacy_risk:'medium', demo_visibility:'hide', live_fetching_enabled:false, export_allowed:false, status:'strategy_only', notes:['Market odds must be separated from truth/reliability scoring.']
    },
    notebooklm_external_export: {
      source_id:'notebooklm_external_export', label:'External NotebookLM/RAG handoff', availability:'external', auth_mode:'browser_session', freshness:'user_supplied', evidence_type:'mixed', privacy_risk:'high', demo_visibility:'disabled_with_reason', live_fetching_enabled:false, export_allowed:false, status:'handoff_strategy_only', notes:['Optional future export route. Must not become a hidden dependency of the core engine.']
    },
    portable_auth_planned: {
      source_id:'portable_auth_planned', label:'Portable auth / user-paid provider account', availability:'unavailable', auth_mode:'oauth_pkce', freshness:'planned', evidence_type:'metadata', privacy_risk:'high', demo_visibility:'hide', live_fetching_enabled:false, export_allowed:false, status:'future_spike_only', notes:['BrainLink/OpenRouter-style PKCE belongs in a later threat-modeled spike, not this patch.']
    }
  });

  function clone(value){ return JSON.parse(JSON.stringify(value)); }
  function values(){ return Object.values(CAPABILITIES).map(clone); }
  function capability(id){ return clone(CAPABILITIES[id] || CAPABILITIES.manual_private); }
  function visibleCapabilities(){ return values().filter((item) => item.demo_visibility === 'show'); }

  function validateCapability(item){
    const issues = [];
    const sourceId = item && item.source_id ? String(item.source_id) : '<missing>';
    for(const key of Object.keys(ALLOWED)){
      if(!ALLOWED[key].includes(item?.[key])) issues.push(`${sourceId}:${key}_invalid`);
    }
    if(item?.live_fetching_enabled && !['controlled_backend'].includes(item.availability)) issues.push(`${sourceId}:live_requires_controlled_backend`);
    if(item?.privacy_risk === 'high' && item?.demo_visibility === 'show') issues.push(`${sourceId}:high_risk_must_not_be_visible_in_demo`);
    if(item?.auth_mode === 'oauth_pkce' && item?.availability !== 'unavailable') issues.push(`${sourceId}:oauth_pkce_must_remain_unavailable_in_v1_0_13`);
    if(item?.auth_mode === 'user_token') issues.push(`${sourceId}:user_token_not_allowed_in_v1_0_13`);
    if(item?.export_allowed && item?.auth_mode === 'oauth_pkce') issues.push(`${sourceId}:oauth_export_not_allowed`);
    return {source_id:sourceId, ok:issues.length === 0, issues};
  }

  function auditRegistry(registry = CAPABILITIES){
    const items = Object.values(registry).map(clone);
    const reports = items.map(validateCapability);
    const issues = reports.flatMap((report) => report.issues);
    const visible = items.filter((item) => item.demo_visibility === 'show').map((item) => item.source_id);
    const hidden = items.filter((item) => item.demo_visibility === 'hide').map((item) => item.source_id);
    const disabled = items.filter((item) => item.demo_visibility === 'disabled_with_reason').map((item) => item.source_id);
    return {
      registry_version:VERSION,
      generated_at:new Date().toISOString(),
      capability_count:items.length,
      visible_demo_capabilities:visible,
      hidden_capabilities:hidden,
      disabled_capabilities:disabled,
      live_capabilities:items.filter((item) => item.live_fetching_enabled).map((item) => item.source_id),
      new_live_connector_enabled:false,
      production_oauth_enabled:false,
      auth_material_export_allowed:false,
      reports,
      issues,
      ok:issues.length === 0,
      verdict:issues.length ? 'source_capability_registry_blocked' : 'source_capability_registry_ready_manual_packet_import'
    };
  }

  function strategyBlueprint({version = VERSION, now = new Date().toISOString()} = {}){
    const audit = auditRegistry();
    return {
      source_strategy_version:version,
      generated_at:now,
      release_gate:'source_strategy_blueprint_checked',
      runtime_capability_change:false,
      provider_behavior_changed:false,
      oauth_behavior_changed:false,
      backend_behavior_changed:false,
      source_behavior_changed:false,
      registry:values(),
      audit,
      next_safe_increment:'v1.1.0-alpha.9 source packet builder browser QA and UX tightening',
      blocked_until_threat_modeled:['production OAuth / portable account auth','live Reddit/X/YouTube/TikTok scraping','external RAG dependency as core runtime'],
      scoring_warning:'Attention/engagement is not truth. Evidence reliability must remain separate from public signal strength.'
    };
  }

  root.sourceCapabilityRegistry = Object.freeze({VERSION, ALLOWED, CAPABILITIES, values, capability, visibleCapabilities, validateCapability, auditRegistry, strategyBlueprint});
})(typeof window !== 'undefined' ? window : globalThis);
