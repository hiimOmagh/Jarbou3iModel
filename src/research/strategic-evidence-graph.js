/* Jarbou3i Research Engine strategic evidence graph v1.1.0-alpha.22. Local graph export only. */
(function(global){
  'use strict';
  const root = global.Jarbou3iResearchModules = global.Jarbou3iResearchModules || {};
  const VERSION = '1.1.0-alpha.22';
  const GRAPH_MODEL = 'strategic_evidence_graph.v1';

  function text(value, fallback=''){return String(value ?? fallback).trim();}
  function asArray(value){return Array.isArray(value)?value.filter(Boolean):(value===undefined||value===null||value===''?[]:[value]);}
  function unique(values){return [...new Set(asArray(values).map(String).filter(Boolean))];}
  function clamp(value,min=0,max=100,fallback=0){const n=Number(value);return Math.max(min,Math.min(max,Number.isFinite(n)?n:fallback));}
  function escCsv(value){const s=Array.isArray(value)?value.join('|'):text(value);return /[",\n\r]/.test(s)?'"'+s.replace(/"/g,'""')+'"':s;}
  function rowsToCsv(rows){return rows.map((row)=>row.map(escCsv).join(',')).join('\n')+'\n';}
  function hostFromUrl(url){try{return new URL(text(url)).hostname.replace(/^www\./,'');}catch(_){return '';}}
  function nodeId(type,id){return `${type}:${id}`;}
  function addNode(map,node){if(!node||!node.id)return; if(!map.has(node.id))map.set(node.id,node);}
  function addEdge(edges,edge){if(!edge||!edge.source||!edge.target)return; edges.push(Object.assign({edge_model:GRAPH_MODEL,live_fetching_performed:false,verification_claimed:false},edge));}
  function layerFromId(id){const prefix=text(id).replace(/[0-9]/g,'');return ({I:'interests',A:'actors',T:'tools',N:'narrative',R:'results',F:'feedback',S:'scenarios',C:'contradictions'})[prefix]||'analysis_target';}
  function evidenceNode(e){return {id:nodeId('evidence',e.evidence_id), raw_id:e.evidence_id, node_type:'evidence', label:e.claim||e.evidence_id, source_type:e.source_type||'other', source_title:e.source_title||'', source_url:e.source_url||'', source_domain:hostFromUrl(e.source_url), confidence:e.confidence||'medium', reliability_score:e.evidence_scoring?.reliability_score??null, attention_signal_score:e.evidence_scoring?.attention_signal_score??null, synthesis_weight:e.evidence_scoring?.synthesis_weight??null};}
  function clusterNode(c){return {id:nodeId('cluster',c.cluster_id), raw_id:c.cluster_id, node_type:'source_cluster', label:c.cluster_label||c.target_id||c.cluster_id, review_gate:c.review_gate||'review_required', reliability_score:c.reliability_score??null, attention_signal_score:c.attention_signal_score??null, traceability_score:c.traceability_score??null, gap_flags:asArray(c.gap_flags)};}
  function entityNode(p){return {id:nodeId('entity',p.entity_id), raw_id:p.entity_id, node_type:'entity', label:p.canonical_name||p.entity_id, category:p.category||'other', aliases:asArray(p.aliases), strategic_relevance_score:p.strategic_relevance_score??0, review_gate:p.review_gate||'entity_review_required'};}
  function targetNode(id){return {id:nodeId('target',id), raw_id:id, node_type:'analysis_target', label:id, layer:layerFromId(id)};}
  function causalNode(link,index){const raw=link.link_id||`L${index+1}`;return {id:nodeId('causal',raw), raw_id:raw, node_type:'causal_link', label:`${link.from||'?'} ${link.relationship||'relates_to'} ${link.to||'?'}`, relationship:link.relationship||'relates_to', confidence:link.confidence||'medium'};}
  function buildGraph(input={},options={}){
    const evidence=asArray(input.evidence||input.evidence_matrix).filter(Boolean);
    const clusters=asArray(input.source_clusters).filter(Boolean);
    const entities=asArray(input.entity_profiles).filter(Boolean);
    const links=asArray(input.causal_links).filter(Boolean);
    const nodes=new Map(); const edges=[];

    for(const e of evidence){
      if(!e.evidence_id)continue;
      addNode(nodes,evidenceNode(e));
      for(const target of asArray(e.supports)){addNode(nodes,targetNode(target));addEdge(edges,{id:`edge:supports:${e.evidence_id}:${target}`,source:nodeId('evidence',e.evidence_id),target:nodeId('target',target),edge_type:'supports',label:'supports',evidence_ids:[e.evidence_id]});}
      for(const target of asArray(e.contradicts)){addNode(nodes,targetNode(target));addEdge(edges,{id:`edge:contradicts:${e.evidence_id}:${target}`,source:nodeId('evidence',e.evidence_id),target:nodeId('target',target),edge_type:'contradicts',label:'contradicts',evidence_ids:[e.evidence_id]});}
    }
    for(const c of clusters){
      if(!c.cluster_id)continue;
      addNode(nodes,clusterNode(c));
      for(const eid of asArray(c.evidence_ids)){addEdge(edges,{id:`edge:cluster-evidence:${c.cluster_id}:${eid}`,source:nodeId('cluster',c.cluster_id),target:nodeId('evidence',eid),edge_type:'clusters_evidence',label:'clusters',evidence_ids:[eid]});}
      if(c.target_id&&c.target_id!=='UNLINKED'){addNode(nodes,targetNode(c.target_id));addEdge(edges,{id:`edge:cluster-target:${c.cluster_id}:${c.target_id}`,source:nodeId('cluster',c.cluster_id),target:nodeId('target',c.target_id),edge_type:'summarizes_target',label:'summarizes'});}
    }
    for(const p of entities){
      if(!p.entity_id)continue;
      addNode(nodes,entityNode(p));
      for(const eid of asArray(p.evidence_ids)){addEdge(edges,{id:`edge:entity-evidence:${p.entity_id}:${eid}`,source:nodeId('entity',p.entity_id),target:nodeId('evidence',eid),edge_type:'mentioned_in_evidence',label:'mentioned in',evidence_ids:[eid]});}
      for(const cid of asArray(p.cluster_ids)){addEdge(edges,{id:`edge:entity-cluster:${p.entity_id}:${cid}`,source:nodeId('entity',p.entity_id),target:nodeId('cluster',cid),edge_type:'appears_in_cluster',label:'appears in'});}
    }
    links.forEach((link,index)=>{
      if(!link.from||!link.to)return;
      addNode(nodes,targetNode(link.from)); addNode(nodes,targetNode(link.to));
      const causal=causalNode(link,index); addNode(nodes,causal);
      addEdge(edges,{id:`edge:causal-from:${causal.raw_id}:${link.from}`,source:nodeId('target',link.from),target:causal.id,edge_type:'causal_from',label:'from',evidence_ids:asArray(link.evidence_ids)});
      addEdge(edges,{id:`edge:causal-to:${causal.raw_id}:${link.to}`,source:causal.id,target:nodeId('target',link.to),edge_type:link.relationship||'relates_to',label:link.relationship||'relates_to',evidence_ids:asArray(link.evidence_ids)});
    });

    const graph_nodes=[...nodes.values()];
    const graph_edges=edges;
    const quality=buildGraphQualityReport(graph_nodes,graph_edges,input,{version:options.version||VERSION,now:options.now});
    const exports=buildGraphExports(graph_nodes,graph_edges,{version:options.version||VERSION,now:options.now});
    return {
      strategic_evidence_graph_version:options.version||VERSION,
      graph_model:GRAPH_MODEL,
      generated_at:options.now||new Date().toISOString(),
      graph_nodes,
      graph_edges,
      graph_quality_report:quality,
      graph_export_report:exports.graph_export_report,
      graph_exports:exports.graph_exports,
      live_fetching_performed:false,
      verification_claimed:false,
      release_gate:quality.release_gate
    };
  }
  function buildGraphQualityReport(nodes=[],edges=[],input={},options={}){
    const nodeIds=new Set(nodes.map((n)=>n.id));
    const dangling=edges.filter((e)=>!nodeIds.has(e.source)||!nodeIds.has(e.target));
    const connected=new Set(edges.flatMap((e)=>[e.source,e.target]));
    const isolated=nodes.filter((n)=>!connected.has(n.id));
    const evidenceNodes=nodes.filter((n)=>n.node_type==='evidence').length;
    const entityNodes=nodes.filter((n)=>n.node_type==='entity').length;
    const clusterNodes=nodes.filter((n)=>n.node_type==='source_cluster').length;
    const causalNodes=nodes.filter((n)=>n.node_type==='causal_link').length;
    const flags=[];
    if(!nodes.length)flags.push('graph_empty');
    if(evidenceNodes&&entityNodes===0)flags.push('entity_layer_missing_from_graph');
    if(evidenceNodes&&clusterNodes===0)flags.push('source_cluster_layer_missing_from_graph');
    if(evidenceNodes&&causalNodes===0)flags.push('causal_link_layer_missing_from_graph');
    if(dangling.length)flags.push('dangling_graph_edges');
    if(isolated.length)flags.push('isolated_graph_nodes');
    return {
      graph_quality_report_version:options.version||VERSION,
      graph_model:GRAPH_MODEL,
      generated_at:options.now||new Date().toISOString(),
      node_count:nodes.length,
      edge_count:edges.length,
      evidence_node_count:evidenceNodes,
      entity_node_count:entityNodes,
      source_cluster_node_count:clusterNodes,
      causal_link_node_count:causalNodes,
      isolated_node_count:isolated.length,
      dangling_edge_count:dangling.length,
      graph_gap_flags:unique(flags),
      release_gate:flags.length?'graph_review_required':'graph_export_ready',
      live_fetching_performed:false,
      verification_claimed:false
    };
  }
  function buildGraphExports(nodes=[],edges=[],options={}){
    const gephiNodes=rowsToCsv([['Id','Label','Type','Category','Score'],...nodes.map((n)=>[n.id,n.label,n.node_type,n.category||n.layer||'',n.strategic_relevance_score??n.reliability_score??''])]);
    const gephiEdges=rowsToCsv([['Source','Target','Type','Label','Weight'],...edges.map((e)=>[e.source,e.target,e.edge_type,e.label||e.edge_type,asArray(e.evidence_ids).length||1])]);
    const kumuJson=JSON.stringify({elements:nodes.map((n)=>({id:n.id,label:n.label,type:n.node_type,tags:[n.node_type,n.category,n.layer].filter(Boolean)})),connections:edges.map((e)=>({from:e.source,to:e.target,label:e.label||e.edge_type,type:e.edge_type}))},null,2);
    const neo4jNodes=rowsToCsv([['id:ID','label','node_type:LABEL','category','score:int'],...nodes.map((n)=>[n.id,n.label,n.node_type,n.category||n.layer||'',Math.round(Number(n.strategic_relevance_score??n.reliability_score??0)||0)])]);
    const neo4jEdges=rowsToCsv([[':START_ID',':END_ID',':TYPE','label','evidence_ids'],...edges.map((e)=>[e.source,e.target,String(e.edge_type||'RELATES_TO').toUpperCase().replace(/[^A-Z0-9_]/g,'_'),e.label||e.edge_type,asArray(e.evidence_ids).join('|')])]);
    const graph_exports={gephi_nodes_csv:gephiNodes,gephi_edges_csv:gephiEdges,kumu_json:kumuJson,neo4j_nodes_csv:neo4jNodes,neo4j_edges_csv:neo4jEdges};
    const graph_export_report={graph_export_report_version:options.version||VERSION,graph_model:GRAPH_MODEL,generated_at:options.now||new Date().toISOString(),formats:['gephi_csv','kumu_json','neo4j_csv'],node_count:nodes.length,edge_count:edges.length,live_fetching_performed:false,verification_claimed:false,release_gate:'graph_exports_ready'};
    return {graph_exports,graph_export_report};
  }
  root.strategicEvidenceGraph=Object.freeze({VERSION,GRAPH_MODEL,buildGraph,buildGraphQualityReport,buildGraphExports,rowsToCsv});
})(typeof window !== 'undefined' ? window : globalThis);
