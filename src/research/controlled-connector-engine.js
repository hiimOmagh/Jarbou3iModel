/* Jarbou3i Research Engine controlled connector architecture v1.1.0-rc.1-copyfix.1. Local/manual and review-gated; no uncontrolled scraping. */
(function(global){
  'use strict';
  const root = global.Jarbou3iResearchModules = global.Jarbou3iResearchModules || {};
  const VERSION = '1.1.0-rc.1-copyfix.1';
  const MODEL = 'controlled_connector_architecture.v1';
  const REVIEW_GATE = 'evidence_review_queue_required';
  const CONNECTOR_CAPABILITIES = Object.freeze({
    manual_source_packet:{connector_id:'manual_source_packet',label:'Manual source packet',status:'available_manual_import',execution_mode:'manual_import_only',input_modes:['json_source_packet'],output:'evidence_review_candidates',live_fetching_performed:false,verification_claimed:false,review_gate:REVIEW_GATE},
    url_list_import:{connector_id:'url_list_import',label:'URL list import',status:'available_manual_import',execution_mode:'manual_import_only',input_modes:['url_list','markdown_links','plain_text'],output:'evidence_review_candidates',live_fetching_performed:false,verification_claimed:false,review_gate:REVIEW_GATE},
    manual_transcript_import:{connector_id:'manual_transcript_import',label:'Manual transcript import',status:'available_manual_import',execution_mode:'manual_import_only',input_modes:['transcript_text','speaker_notes'],output:'evidence_review_candidates',live_fetching_performed:false,verification_claimed:false,review_gate:REVIEW_GATE},
    manual_source_list_import:{connector_id:'manual_source_list_import',label:'Manual source-list import',status:'available_manual_import',execution_mode:'manual_import_only',input_modes:['source_list','bibliography','notes'],output:'evidence_review_candidates',live_fetching_performed:false,verification_claimed:false,review_gate:REVIEW_GATE},
    web_search_api:{connector_id:'web_search_api',label:'Web search provider abstraction',status:'dry_run_only',execution_mode:'query_plan_only',input_modes:['query_plan'],output:'query_plan',live_fetching_performed:false,verification_claimed:false,review_gate:REVIEW_GATE},
    github_public_repo:{connector_id:'github_public_repo',label:'GitHub public metadata',status:'controlled_backend_review_gated',execution_mode:'controlled_backend_public_metadata_if_enabled',input_modes:['owner_repo'],output:'evidence_review_candidates',live_fetching_performed:false,verification_claimed:false,review_gate:REVIEW_GATE}
  });
  const URL_RE=/https?:\/\/[^\s)\]>"']+/gi;
  const text=(v,f='')=>String(v??f).trim();
  const asArray=(v)=>Array.isArray(v)?v.filter(Boolean):(v===undefined||v===null||v===''?[]:[v]);
  const unique=(v)=>[...new Set((v||[]).map((x)=>text(x)).filter(Boolean))];
  function stableHash(value){const s=typeof value==='string'?value:JSON.stringify(value||{});let h=0;for(let i=0;i<s.length;i+=1)h=Math.imul(31,h)+s.charCodeAt(i)|0;return Math.abs(h).toString(36).padStart(6,'0');}
  function normalizeConnectorId(value){const v=text(value||'manual_source_packet').toLowerCase();return CONNECTOR_CAPABILITIES[v]?v:'manual_source_packet';}
  function connectorCapabilityRegistry(options={}){
    return {
      connector_registry_version:options.version||VERSION,
      registry_model:MODEL,
      generated_at:options.now||new Date().toISOString(),
      connectors:Object.values(CONNECTOR_CAPABILITIES).map((c)=>Object.assign({},c)),
      safety_boundary:{uncontrolled_scraping_allowed:false,live_web_search_enabled:false,provider_execution_enabled:false,oauth_required:false,backend_expansion:false,automatic_source_verification:false,review_queue_required:true},
      release_gate:'controlled_connector_review_ready'
    };
  }
  function buildConnectorInterfaceContract(connectorId='manual_source_packet', options={}){
    const id=normalizeConnectorId(connectorId); const cap=CONNECTOR_CAPABILITIES[id];
    return {
      connector_contract_version:options.version||VERSION,
      connector_model:MODEL,
      connector_id:id,
      label:cap.label,
      status:cap.status,
      execution_mode:cap.execution_mode,
      input_modes:cap.input_modes.slice(),
      output_contract:cap.output,
      review_gate:REVIEW_GATE,
      required_output_fields:['claim','source_title','source_url','source_type','source_date','evidence_strength','supports','contradicts','confidence'],
      prohibited_actions:['uncontrolled scraping','live web search by default','private data collection','automatic source verification claims','direct Evidence Matrix promotion without review'],
      live_fetching_performed:false,
      verification_claimed:false
    };
  }
  function inferSourceType(line,url){const blob=(line+' '+(url||'')).toLowerCase();if(/github\.com/.test(blob))return'primary';if(/youtube|youtu\.be|transcript|podcast|video/.test(blob))return'video';if(/\.gov|europa\.eu|un\.org|official|ministry|commission|regulator/.test(blob))return'official';if(/doi\.org|arxiv|journal|paper|university|academic/.test(blob))return'academic';if(/reuters|apnews|bbc|bloomberg|ft\.com|dw\.com|aljazeera|guardian|nytimes/.test(blob))return'news';if(/reddit|x\.com|twitter|hacker news|news\.ycombinator|tiktok/.test(blob))return'social';return'other';}
  function claimFromLine(line){const cleaned=text(line).replace(URL_RE,'').replace(/^\s*[-*•\d.)]+\s*/,'').replace(/\s+/g,' ').trim();return cleaned.length>240?cleaned.slice(0,237)+'…':cleaned;}
  function titleFromLine(line,url,index){const md=text(line).match(/\[([^\]]{3,120})\]\(https?:\/\/[^\s)]+\)/);if(md)return md[1].trim();if(url){try{return new URL(url).hostname.replace(/^www\./,'');}catch(_){}}return claimFromLine(line)||`Manual connector source ${index}`;}
  function normalizeConnectorCandidate(candidate={}, options={}){
    const connectorId=normalizeConnectorId(options.connector_id||candidate.connector_id||candidate.import_meta?.connector_id||'manual_source_packet');
    const line=text(candidate.raw_text||candidate.line||candidate.claim||candidate.source_title||candidate.source_url);
    const urls=unique(asArray(candidate.source_urls).concat(text(candidate.source_url).match(URL_RE)||line.match(URL_RE)||[]));
    const url=text(candidate.source_url||urls[0]||'');
    const claim=text(candidate.claim||claimFromLine(line)||candidate.source_title||url||'Manual connector candidate');
    const sourceType=text(candidate.source_type||inferSourceType(line,url));
    const sourceDate=text(candidate.source_date||candidate.published_at||candidate.captured_at||'unknown');
    return {
      evidence_id:text(candidate.evidence_id||`CAND-${stableHash({claim,url,connectorId}).slice(0,8)}`),
      claim,
      source_title:text(candidate.source_title||titleFromLine(line,url,1)),
      source_url:url,
      source_type:sourceType,
      source_date:sourceDate,
      time_relevance_score:Number(candidate.time_relevance_score||3),
      evidence_strength:Number(candidate.evidence_strength|| (url?3:2)),
      public_signal_score:Number(candidate.public_signal_score||1),
      supports:asArray(candidate.supports).map(String),
      contradicts:asArray(candidate.contradicts).map(String),
      confidence:text(candidate.confidence|| (url?'medium':'low')),
      notes:[text(candidate.notes),`Normalized by ${connectorId}; review required before Evidence Matrix promotion.`].filter(Boolean).join(' '),
      import_meta:Object.assign({},candidate.import_meta||{},{connector_id:connectorId, connector_model:MODEL, review_gate:REVIEW_GATE, raw_fingerprint:stableHash({line,claim,url,connectorId}), live_fetching_performed:false, verification_claimed:false})
    };
  }
  function linesFromInput(input){
    if(Array.isArray(input))return input.map(String).filter(Boolean);
    return text(input).split(/\n+/).map((x)=>x.trim()).filter(Boolean);
  }
  function normalizeConnectorResults(input={}, options={}){
    const connectorId=normalizeConnectorId(options.connector_id||input.connector_id||input.connector||'manual_source_packet');
    const raw=input.raw_text||input.text||input.url_list||input.transcript_text||input.source_list||input.lines||'';
    let items=asArray(input.evidence_candidates||input.candidates);
    if(!items.length){
      const lines=linesFromInput(raw);
      items=lines.map((line)=>({raw_text:line, source_urls:line.match(URL_RE)||[]}));
    }
    const evidence=items.map((item)=>normalizeConnectorCandidate(item,{connector_id:connectorId})).filter((item)=>item.claim&&item.claim.length>=6);
    const sourceTypes=unique(evidence.map((item)=>item.source_type));
    const report={
      connector_report_version:options.version||VERSION,
      connector_model:MODEL,
      connector_id:connectorId,
      generated_at:options.now||new Date().toISOString(),
      converted_count:evidence.length,
      rejected_count:Math.max(0,items.length-evidence.length),
      source_types:sourceTypes,
      url_count:evidence.filter((item)=>item.source_url).length,
      review_gate:REVIEW_GATE,
      queue_only:true,
      live_fetching_performed:false,
      verification_claimed:false,
      release_gate:evidence.length?'review_queue_ready':'review_required'
    };
    return {ok:evidence.length>0,evidence,report,warnings:evidence.length?[]:['no_connector_candidates_detected']};
  }
  function dryRunConnectorExecution(request={}, options={}){
    const connectorId=normalizeConnectorId(request.connector||request.connector_id||options.connector_id);
    const contract=buildConnectorInterfaceContract(connectorId,{version:options.version||VERSION});
    const raw=request.connector_options?.url_list||request.connector_options?.transcript_text||request.connector_options?.source_list||request.connector_options?.raw_text||'';
    const normalized=normalizeConnectorResults({connector_id:connectorId, raw_text:raw, evidence_candidates:request.connector_options?.evidence_candidates||[]},{version:options.version||VERSION, now:options.now});
    return {
      ok:true,
      type:'controlled_connector_dry_run',
      connector:connectorId,
      data:{
        connector_id:connectorId,
        connector_contract:contract,
        evidence_candidates:normalized.evidence,
        connector_report:normalized.report,
        review_gate:REVIEW_GATE,
        live_fetching_performed:false,
        verification_claimed:false,
        verdict:normalized.evidence.length?'controlled_connector_candidates_review_required':'controlled_connector_ready_no_candidates'
      },
      safety:buildConnectorSafetyReport({connector_id:connectorId, candidate_count:normalized.evidence.length},{version:options.version||VERSION}),
      warnings:normalized.warnings
    };
  }
  function buildConnectorSafetyReport(input={}, options={}){
    const connectorId=normalizeConnectorId(input.connector_id||input.connector||'manual_source_packet');
    return {
      connector_safety_report_version:options.version||VERSION,
      connector_model:MODEL,
      generated_at:options.now||new Date().toISOString(),
      connector_id:connectorId,
      candidate_count:Number(input.candidate_count||0),
      uncontrolled_scraping_performed:false,
      live_web_search_performed:false,
      live_fetching_performed:false,
      provider_execution_performed:false,
      oauth_required:false,
      backend_expansion:false,
      automatic_source_verification_claimed:false,
      review_queue_required:true,
      raw_credentials_exported:false,
      verdict:'controlled_connector_safe_dry_run_or_manual_import'
    };
  }
  function buildConnectorReport(input={}, options={}){
    const runs=asArray(input.source_runs); const results=asArray(input.source_results); const queue=asArray(input.evidence_review_queue);
    return {
      controlled_connector_report_version:options.version||VERSION,
      connector_model:MODEL,
      generated_at:options.now||new Date().toISOString(),
      registry:connectorCapabilityRegistry({version:options.version||VERSION, now:options.now}),
      run_count:runs.length,
      result_count:results.length,
      queued_review_count:queue.filter((item)=>item&&item.status!=='accepted'&&item.status!=='rejected').length,
      connectors_seen:unique(runs.map((r)=>r.connector).concat(results.map((r)=>r.connector))),
      live_fetching_performed:false,
      uncontrolled_scraping_performed:false,
      verification_claimed:false,
      release_gate:'controlled_connector_review_ready'
    };
  }
  root.controlledConnectorEngine=Object.freeze({VERSION,MODEL,REVIEW_GATE,CONNECTOR_CAPABILITIES,normalizeConnectorId,connectorCapabilityRegistry,buildConnectorInterfaceContract,normalizeConnectorCandidate,normalizeConnectorResults,dryRunConnectorExecution,buildConnectorSafetyReport,buildConnectorReport});
})(typeof window !== 'undefined' ? window : globalThis);
