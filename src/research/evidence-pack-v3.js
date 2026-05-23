/* Jarbou3i Research Engine publication review gate and claim boundary audit v1.1.0. */
(function(global){
  'use strict';
  const root = global.Jarbou3iResearchModules = global.Jarbou3iResearchModules || {};
  const VERSION = '1.2.0-alpha.8.1';
  const MODEL = 'evidence_pack_v3.v1';

  function nowIso(){ return new Date().toISOString(); }
  function asArray(value){ return Array.isArray(value) ? value : []; }
  function text(value, fallback = ''){ return String(value ?? fallback).trim(); }
  function unique(values){ return [...new Set(asArray(values).filter(Boolean).map(String))]; }
  function stableHash(value){
    const s = typeof value === 'string' ? value : JSON.stringify(value || {});
    let h = 0;
    for(let i = 0; i < s.length; i += 1) h = Math.imul(31, h) + s.charCodeAt(i) | 0;
    return Math.abs(h).toString(36).padStart(6, '0');
  }
  function idListFromText(value){
    const matches = text(value).match(/\bE\d+\b/g) || [];
    return unique(matches);
  }
  function evidenceIndex(packet){
    const map = new Map();
    asArray(packet.evidence_matrix).forEach((item, index) => {
      map.set(item.evidence_id || `E${index + 1}`, item);
    });
    return map;
  }
  function allEvidenceIds(packet){ return asArray(packet.evidence_matrix).map((item, index) => item.evidence_id || `E${index + 1}`); }
  function paragraphEvidenceFallback(packet, paragraph, index){
    const evidenceIds = allEvidenceIds(packet);
    if(!evidenceIds.length) return [];
    const lower = text(paragraph).toLowerCase();
    const matched = asArray(packet.evidence_matrix).filter((item) => {
      const claimTerms = text(item.claim).toLowerCase().split(/\W+/).filter((term) => term.length > 5).slice(0, 8);
      return claimTerms.some((term) => lower.includes(term));
    }).map((item) => item.evidence_id).filter(Boolean);
    if(matched.length) return unique(matched).slice(0, 5);
    return index === 0 ? evidenceIds.slice(0, Math.min(3, evidenceIds.length)) : [];
  }
  function paragraphRecords(packet){
    const brief = packet.analysis_brief || {};
    const candidates = [
      {section:'handoff_summary', text:brief.handoff_summary},
      {section:'evidence_priorities', text:asArray(brief.evidence_priorities).join(' ')},
      {section:'coverage_gaps', text:asArray(brief.gaps || packet.diagnostics?.gaps).join(' ')},
      {section:'synthesis_constraints', text:asArray(brief.synthesis_constraints).join(' ')},
      {section:'quality_fix_actions', text:asArray(brief.quality_fix_actions || brief.quality_gate_report?.fix_actions).join(' ')}
    ].filter((item) => text(item.text));
    return candidates.map((item, index) => {
      const explicit = idListFromText(item.text);
      const evidence_ids = explicit.length ? explicit : paragraphEvidenceFallback(packet, item.text, index);
      return {
        paragraph_id:`P${index + 1}`,
        section:item.section,
        paragraph_text:text(item.text).slice(0, 640),
        evidence_ids,
        traceability_status:evidence_ids.length ? 'traceable' : 'needs_evidence_link',
        source_cluster_ids: asArray(packet.source_clusters).filter((cluster) => asArray(cluster.evidence_ids).some((id) => evidence_ids.includes(id))).map((cluster) => cluster.cluster_id).filter(Boolean),
        entity_ids: asArray(packet.entity_profiles).filter((entity) => asArray(entity.evidence_ids).some((id) => evidence_ids.includes(id))).map((entity) => entity.entity_id).filter(Boolean)
      };
    });
  }
  function buildBriefTraceabilityReport(packet = {}, options = {}){
    const paragraphs = paragraphRecords(packet);
    const traceable = paragraphs.filter((item) => item.traceability_status === 'traceable').length;
    const total = paragraphs.length;
    const coverage = total ? Math.round((traceable / total) * 100) : 0;
    const unlinked = paragraphs.filter((item) => item.traceability_status !== 'traceable').map((item) => item.paragraph_id);
    return {
      brief_traceability_version:options.version || VERSION,
      traceability_model:MODEL,
      generated_at:nowIso(),
      paragraph_count:total,
      traceable_paragraph_count:traceable,
      traceability_coverage_pct:coverage,
      unlinked_paragraph_ids:unlinked,
      paragraph_links:paragraphs,
      evidence_to_conclusion_traceability_blocks:paragraphs.map((item) => ({
        block_id:`TB-${item.paragraph_id}`,
        conclusion_section:item.section,
        paragraph_id:item.paragraph_id,
        evidence_ids:item.evidence_ids,
        source_cluster_ids:item.source_cluster_ids,
        entity_ids:item.entity_ids,
        confidence:item.evidence_ids.length ? 'medium' : 'low',
        disproven_if:item.evidence_ids.length ? ['Linked evidence is rejected or contradicted by higher-reliability source material.'] : ['No accepted evidence can be linked to this conclusion paragraph.']
      })),
      release_gate:coverage >= 60 ? 'traceability_review_required' : 'traceability_blocked',
      live_fetching_performed:false,
      verification_claimed:false
    };
  }
  function buildContradictionFalsifierAppendix(packet = {}, options = {}){
    const evidenceMap = evidenceIndex(packet);
    const contradictionEvidence = asArray(packet.evidence_matrix).filter((item) => asArray(item.contradicts).length).map((item) => ({
      evidence_id:item.evidence_id,
      claim:item.claim,
      contradicts:asArray(item.contradicts),
      source_title:item.source_title || '',
      confidence:item.confidence || 'medium'
    }));
    const contradictoryLinks = asArray(packet.causal_links).filter((link) => link.relationship === 'contradicts').map((link) => ({from:link.from, to:link.to, evidence_ids:asArray(link.evidence_ids), confidence:link.confidence || 'medium'}));
    const planFalsifiers = asArray(packet.research_plan?.disconfirming_conditions || packet.analysis_brief?.disconfirming_conditions);
    const graphFlags = asArray(packet.graph_quality_report?.graph_gap_flags);
    return {
      contradiction_falsifier_appendix_version:options.version || VERSION,
      appendix_model:MODEL,
      generated_at:nowIso(),
      contradiction_evidence_count:contradictionEvidence.length,
      contradictory_causal_link_count:contradictoryLinks.length,
      falsifier_count:planFalsifiers.length,
      contradiction_evidence:contradictionEvidence,
      contradictory_causal_links:contradictoryLinks,
      falsifiers:planFalsifiers.map((condition, index) => ({falsifier_id:`FAL${index + 1}`, condition:text(condition), linked_evidence_ids:idListFromText(condition), status:'review_required'})),
      unresolved_items:[
        ...contradictionEvidence.map((item) => `contradiction:${item.evidence_id}`),
        ...contradictoryLinks.map((item, index) => `causal_contradiction:${index + 1}`),
        ...graphFlags.map((flag) => `graph_gap:${flag}`)
      ],
      release_gate:(contradictionEvidence.length || contradictoryLinks.length || planFalsifiers.length) ? 'appendix_review_required' : 'appendix_empty_review_required',
      live_fetching_performed:false,
      verification_claimed:false,
      evidence_index_count:evidenceMap.size
    };
  }
  function buildBundleConsistencyReport(packet = {}, options = {}){
    const evidenceIds = new Set(allEvidenceIds(packet));
    const clusterEvidence = new Set(asArray(packet.source_clusters).flatMap((cluster) => asArray(cluster.evidence_ids)));
    const entityEvidence = new Set(asArray(packet.entity_profiles).flatMap((entity) => asArray(entity.evidence_ids)));
    const graphEvidence = new Set(asArray(packet.strategic_evidence_graph?.graph_nodes).filter((node) => node.type === 'evidence').map((node) => String(node.id || '').replace(/^EV-/, '')));
    const causalEvidence = new Set(asArray(packet.causal_links).flatMap((link) => asArray(link.evidence_ids)));
    const missing = [];
    for(const id of [...clusterEvidence]) if(!evidenceIds.has(id)) missing.push(`cluster_missing_evidence:${id}`);
    for(const id of [...entityEvidence]) if(!evidenceIds.has(id)) missing.push(`entity_missing_evidence:${id}`);
    for(const id of [...causalEvidence]) if(!evidenceIds.has(id)) missing.push(`causal_missing_evidence:${id}`);
    const coverage = {
      evidence_count:evidenceIds.size,
      cluster_linked_evidence_count:[...clusterEvidence].filter((id) => evidenceIds.has(id)).length,
      entity_linked_evidence_count:[...entityEvidence].filter((id) => evidenceIds.has(id)).length,
      graph_evidence_node_count:[...graphEvidence].filter((id) => evidenceIds.has(id)).length,
      causal_linked_evidence_count:[...causalEvidence].filter((id) => evidenceIds.has(id)).length
    };
    const consistencyScore = Math.max(0, Math.min(100, 100 - missing.length * 15 - (evidenceIds.size && !coverage.graph_evidence_node_count ? 10 : 0)));
    return {
      bundle_consistency_report_version:options.version || VERSION,
      bundle_model:MODEL,
      generated_at:nowIso(),
      coverage,
      missing_references:missing,
      consistency_score:consistencyScore,
      release_gate:missing.length ? 'bundle_consistency_review_required' : 'bundle_consistent_review_required',
      live_fetching_performed:false,
      verification_claimed:false
    };
  }
  function buildPublicationReadinessExportReport(packet = {}, traceabilityReport = null, consistencyReport = null, appendix = null, options = {}){
    const trace = traceabilityReport || buildBriefTraceabilityReport(packet, options);
    const consistency = consistencyReport || buildBundleConsistencyReport(packet, options);
    const contradictions = appendix || buildContradictionFalsifierAppendix(packet, options);
    const quality = packet.quality_gate || packet.analysis_brief?.quality_gate_report || {};
    const blockers = [];
    if(!asArray(packet.evidence_matrix).length) blockers.push('evidence_matrix_empty');
    if(trace.traceability_coverage_pct < 60) blockers.push('brief_traceability_low');
    if(consistency.missing_references.length) blockers.push('bundle_missing_references');
    if(packet.privacy_export?.release_gate === 'fail') blockers.push('privacy_export_failed');
    if((quality.overall_score || 0) < 60) blockers.push('quality_gate_below_publication_threshold');
    const score = Math.max(0, Math.min(100, Math.round(((quality.overall_score || 60) + trace.traceability_coverage_pct + consistency.consistency_score) / 3) - blockers.length * 5));
    return {
      publication_readiness_export_report_version:options.version || VERSION,
      report_model:MODEL,
      generated_at:nowIso(),
      publication_readiness_score:score,
      release_gate:blockers.length ? 'publication_review_required' : 'publication_export_ready_review_required',
      blockers,
      traceability_coverage_pct:trace.traceability_coverage_pct,
      bundle_consistency_score:consistency.consistency_score,
      contradiction_appendix_status:contradictions.release_gate,
      privacy_release_gate:packet.privacy_export?.release_gate || 'unknown',
      recommended_actions:blockers.length ? blockers.map((flag) => `Resolve ${flag.replaceAll('_', ' ')} before publication.`) : ['Manually review final brief wording before publication.'],
      live_fetching_performed:false,
      verification_claimed:false
    };
  }
  function buildEvidencePackV3Manifest(packet = {}, files = [], reports = {}, options = {}){
    return {
      evidence_pack_v3_manifest_version:options.version || VERSION,
      export_pack_version:options.version || VERSION,
      export_pack_format:'export_pack_v3',
      manifest_model:MODEL,
      generated_at:nowIso(),
      workflow_version:packet.workflow_version || options.version || VERSION,
      topic:packet.research_plan?.topic || packet.analysis_brief?.topic || 'Untitled research packet',
      file_count:asArray(files).length,
      files:asArray(files).map((file) => ({path:file.path, kind:file.kind, mime_type:file.mime_type, bytes:file.bytes || 0, checksum:file.checksum || stableHash(file.path || '')})),
      traceability_coverage_pct:reports.brief_traceability_report?.traceability_coverage_pct || 0,
      bundle_consistency_score:reports.bundle_consistency_report?.consistency_score || 0,
      publication_readiness_score:reports.publication_readiness_export_report?.publication_readiness_score || 0,
      privacy_release_gate:packet.privacy_export?.release_gate || 'unknown',
      release_gate:'evidence_pack_v3_review_required',
      live_fetching_performed:false,
      verification_claimed:false
    };
  }
  function buildEvidencePackV3Bundle(packet = {}, files = [], options = {}){
    const trace = buildBriefTraceabilityReport(packet, options);
    const appendix = buildContradictionFalsifierAppendix(packet, options);
    const consistency = buildBundleConsistencyReport(packet, options);
    const readiness = buildPublicationReadinessExportReport(packet, trace, consistency, appendix, options);
    const manifest = buildEvidencePackV3Manifest(packet, files, {
      brief_traceability_report:trace,
      contradiction_falsifier_appendix:appendix,
      bundle_consistency_report:consistency,
      publication_readiness_export_report:readiness
    }, options);
    return {
      evidence_pack_v3_manifest:manifest,
      brief_traceability_report:trace,
      contradiction_falsifier_appendix:appendix,
      bundle_consistency_report:consistency,
      publication_readiness_export_report:readiness
    };
  }

  root.evidencePackV3 = Object.freeze({
    VERSION, MODEL,
    buildBriefTraceabilityReport,
    buildContradictionFalsifierAppendix,
    buildBundleConsistencyReport,
    buildPublicationReadinessExportReport,
    buildEvidencePackV3Manifest,
    buildEvidencePackV3Bundle
  });
  if(typeof module !== 'undefined' && module.exports) module.exports = root.evidencePackV3;
})(typeof window !== 'undefined' ? window : globalThis);
