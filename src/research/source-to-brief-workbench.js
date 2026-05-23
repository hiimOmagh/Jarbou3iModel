/* Jarbou3i Research Engine source-to-brief intelligence workbench v1.2.0-alpha.2. Local/manual only. */
(function(global){
  'use strict';
  const root = global.Jarbou3iResearchModules = global.Jarbou3iResearchModules || {};
  const VERSION = '1.2.0-alpha.2';
  const MODEL = 'source_to_brief_workbench.v1';
  const SUPPORT_LEVELS = Object.freeze(['strong','partial','weak','unsupported']);
  const BLOCKED_CAPABILITIES = Object.freeze([
    'live_scraping',
    'production_oauth',
    'provider_execution_expansion',
    'backend_behavior_expansion',
    'automatic_source_verification'
  ]);

  function nowIso(){ return new Date().toISOString(); }
  function text(value, fallback = ''){ return String(value ?? fallback).trim(); }
  function asArray(value){ return Array.isArray(value) ? value.filter(Boolean) : (value === undefined || value === null || value === '' ? [] : [value]); }
  function unique(values){ return [...new Set(asArray(values).map((value)=>String(value || '').trim()).filter(Boolean))]; }
  function clamp(value, min = 0, max = 100, fallback = 0){ const n = Number(value); return Math.max(min, Math.min(max, Number.isFinite(n) ? n : fallback)); }
  function avg(values, fallback = 0){ const nums = asArray(values).map(Number).filter(Number.isFinite); return nums.length ? nums.reduce((sum, value)=>sum + value, 0) / nums.length : fallback; }
  function confidenceRank(value){ return ({low:1, medium:2, high:3})[text(value || 'medium').toLowerCase()] || 2; }
  function confidenceFromScore(score){
    const n = clamp(score, 0, 100, 0);
    if(n >= 75) return 'high';
    if(n >= 45) return 'medium';
    return 'low';
  }
  function layerFromId(id){
    const prefix = text(id).replace(/[0-9]/g,'').toUpperCase();
    return ({I:'interests',A:'actors',T:'tools',N:'narrative',R:'results',F:'feedback',S:'scenarios',C:'contradictions'})[prefix] || 'generated_claim';
  }
  function knownDate(value){
    const v = text(value).toLowerCase();
    return !!v && !['unknown','n/a','na','none','null','undefined'].includes(v);
  }
  function traceable(item){ return !!text(item.source_url) && knownDate(item.source_date); }
  function sourceGapWarnings(item){
    const warnings = [];
    if(!text(item.source_url)) warnings.push('missing_source_url');
    if(!knownDate(item.source_date)) warnings.push('missing_source_date');
    if(!text(item.source_type) || text(item.source_type).toLowerCase() === 'other') warnings.push('source_type_other');
    if(!asArray(item.supports).length && !asArray(item.contradicts).length) warnings.push('no_evidence_to_claim_links');
    if((Number(item.public_signal_score) || 0) >= 4 && (Number(item.evidence_strength) || 0) <= 2) warnings.push('attention_signal_without_reliability');
    return unique(warnings);
  }
  function evidenceScore(item){
    const scoring = item.evidence_scoring || {};
    const reliability = scoring.reliability_score ?? ((Number(item.evidence_strength) || 0) * 20);
    const traceability = scoring.traceability_score ?? (traceable(item) ? 100 : (!!text(item.source_url) || knownDate(item.source_date) ? 55 : 10));
    const confidence = confidenceRank(item.confidence) * 20;
    return clamp((Number(reliability) * 0.52) + (Number(traceability) * 0.32) + confidence, 0, 100, 0);
  }
  function evidenceCard(item, index){
    return {
      evidence_id: item.evidence_id || `E${index + 1}`,
      claim: text(item.claim),
      source_title: text(item.source_title),
      source_url: text(item.source_url),
      source_type: text(item.source_type || 'other').toLowerCase(),
      source_date: text(item.source_date || 'unknown'),
      confidence: text(item.confidence || 'medium').toLowerCase(),
      evidence_strength: Number(item.evidence_strength || 0),
      public_signal_score: Number(item.public_signal_score || 0),
      supports: unique(item.supports),
      contradicts: unique(item.contradicts),
      source_gap_warnings: sourceGapWarnings(item),
      traceability_complete: traceable(item),
      source_provenance: 'user_provided_or_source_imported_evidence',
      live_fetching_performed: false,
      verification_claimed: false
    };
  }
  function targetLabel(id, packet){
    const brief = packet.analysis_brief || {};
    const clusters = asArray(packet.source_clusters).concat(asArray(brief.source_clusters));
    const cluster = clusters.find((item)=>item.target_id === id || item.cluster_id === id);
    if(cluster) return text(cluster.cluster_label || cluster.primary_claim || cluster.target_id || id);
    return `${layerFromId(id)} ${id}`;
  }
  function collectClaimIds(evidence, packet){
    const ids = new Set();
    evidence.forEach((item)=>{
      unique(item.supports).forEach((id)=>ids.add(id));
      unique(item.contradicts).forEach((id)=>ids.add(id));
    });
    asArray(packet.causal_links).forEach((link)=>{
      if(text(link.from)) ids.add(text(link.from));
      if(text(link.to)) ids.add(text(link.to));
    });
    asArray(packet.research_plan?.counter_evidence_targets).slice(0, 6).forEach((_, index)=>ids.add(`RQ${index + 1}`));
    return [...ids].filter(Boolean).sort((a,b)=>a.localeCompare(b, undefined, {numeric:true}));
  }
  function supportLevel(supporting, contradicting){
    if(!supporting.length) return 'unsupported';
    const traceableCount = supporting.filter(traceable).length;
    const strongCount = supporting.filter((item)=>evidenceScore(item) >= 70).length;
    const avgScore = avg(supporting.map(evidenceScore), 0);
    if(supporting.length >= 2 && strongCount >= 1 && traceableCount >= 1 && contradicting.length <= supporting.length) return 'strong';
    if(avgScore >= 48 || supporting.length >= 2 || traceableCount >= 1) return 'partial';
    return 'weak';
  }
  function claimGapWarnings(claim, supporting, contradicting){
    const warnings = [];
    if(!supporting.length) warnings.push('claim_without_supporting_evidence');
    if(supporting.some((item)=>!traceable(item))) warnings.push('supporting_evidence_traceability_incomplete');
    if(supporting.every((item)=>text(item.source_type || 'other').toLowerCase() === 'other')) warnings.push('claim_source_type_other_only');
    if(contradicting.length && !supporting.length) warnings.push('contradiction_without_supporting_evidence');
    if(claim.support_level === 'weak') warnings.push('weak_claim_support');
    return unique(warnings);
  }
  function buildClaimMap(packet = {}, evidence = []){
    const claimIds = collectClaimIds(evidence, packet);
    return claimIds.map((claimId)=>{
      const supporting = evidence.filter((item)=>unique(item.supports).includes(claimId));
      const contradicting = evidence.filter((item)=>unique(item.contradicts).includes(claimId));
      const score = Math.round(avg(supporting.map(evidenceScore), 0) - Math.min(30, contradicting.length * 8));
      const level = supportLevel(supporting, contradicting);
      const claim = {
        claim_id: claimId,
        claim_text: targetLabel(claimId, packet),
        claim_origin: /^RQ\d+$/.test(claimId) ? 'generated_from_research_question' : 'generated_from_evidence_links',
        layer: layerFromId(claimId),
        support_level: level,
        support_score: clamp(score, 0, 100, 0),
        supporting_evidence_ids: supporting.map((item)=>item.evidence_id),
        contradicting_evidence_ids: contradicting.map((item)=>item.evidence_id),
        evidence_link_count: supporting.length + contradicting.length,
        source_types: unique(supporting.concat(contradicting).map((item)=>item.source_type || 'other')),
        inferred_confidence: confidenceFromScore(score),
        manual_review_required: true,
        live_fetching_performed: false,
        verification_claimed: false
      };
      claim.source_gap_warnings = claimGapWarnings(claim, supporting, contradicting);
      return claim;
    });
  }
  function buildEvidenceLinks(evidence = []){
    const links = [];
    evidence.forEach((item)=>{
      unique(item.supports).forEach((target_id)=>{
        links.push({link_id:`${item.evidence_id}:supports:${target_id}`, evidence_id:item.evidence_id, claim_id:target_id, relationship:'supports', layer:layerFromId(target_id), source_provenance:'user_provided_or_source_imported_evidence'});
      });
      unique(item.contradicts).forEach((target_id)=>{
        links.push({link_id:`${item.evidence_id}:contradicts:${target_id}`, evidence_id:item.evidence_id, claim_id:target_id, relationship:'contradicts', layer:layerFromId(target_id), source_provenance:'user_provided_or_source_imported_evidence'});
      });
    });
    return links;
  }
  function buildContradictionGroups(packet = {}, evidence = [], claimMap = []){
    const groups = [];
    const contradictionTargets = unique(evidence.flatMap((item)=>unique(item.contradicts)));
    contradictionTargets.forEach((target_id, index)=>{
      const counterEvidence = evidence.filter((item)=>unique(item.contradicts).includes(target_id));
      const supportEvidence = evidence.filter((item)=>unique(item.supports).includes(target_id));
      const claim = claimMap.find((item)=>item.claim_id === target_id) || {};
      groups.push({
        group_id:`CG${index + 1}`,
        target_claim_id:target_id,
        target_claim_text:claim.claim_text || targetLabel(target_id, packet),
        contradiction_type:supportEvidence.length ? 'supported_claim_with_counter_evidence' : 'unsupported_claim_with_counter_evidence',
        supporting_evidence_ids:supportEvidence.map((item)=>item.evidence_id),
        contradicting_evidence_ids:counterEvidence.map((item)=>item.evidence_id),
        support_level:claim.support_level || 'unsupported',
        severity: counterEvidence.length > supportEvidence.length ? 'high' : 'medium',
        review_gate:'contradiction_group_manual_review_required',
        tension_summary:`${counterEvidence.length} evidence item(s) contradict ${target_id}; ${supportEvidence.length} support item(s) are linked.`,
        live_fetching_performed:false,
        verification_claimed:false
      });
    });
    asArray(packet.causal_links).filter((link)=>link.relationship === 'contradicts').forEach((link, index)=>{
      groups.push({
        group_id:`CLG${index + 1}`,
        target_claim_id:text(link.to),
        target_claim_text:targetLabel(link.to, packet),
        contradiction_type:'causal_link_contradiction',
        supporting_evidence_ids:[],
        contradicting_evidence_ids:unique(link.evidence_ids),
        support_level:'partial',
        severity:'medium',
        review_gate:'contradiction_group_manual_review_required',
        tension_summary:`Causal link ${text(link.from)} contradicts ${text(link.to)} with evidence ${unique(link.evidence_ids).join(', ') || 'none'}.`,
        live_fetching_performed:false,
        verification_claimed:false
      });
    });
    return groups;
  }
  function buildSourceGaps(packet = {}, evidence = [], claimMap = []){
    const evidenceWarnings = evidence.flatMap((item)=>sourceGapWarnings(item).map((warning)=>({scope:'evidence', evidence_id:item.evidence_id, warning})));
    const claimWarnings = claimMap.flatMap((claim)=>asArray(claim.source_gap_warnings).map((warning)=>({scope:'claim', claim_id:claim.claim_id, warning})));
    const inherited = unique([
      ...asArray(packet.source_gap_report?.global_gap_flags),
      ...asArray(packet.source_gap_report?.cluster_gap_flags),
      ...asArray(packet.analysis_brief?.source_gap_report?.global_gap_flags),
      ...asArray(packet.analysis_brief?.source_gap_report?.cluster_gap_flags),
      ...asArray(packet.diagnostics?.gaps)
    ]).map((warning)=>({scope:'workflow', warning}));
    const warnings = evidenceWarnings.concat(claimWarnings, inherited);
    return {
      source_gap_report_version:VERSION,
      gap_model:MODEL,
      generated_at:nowIso(),
      warning_count:warnings.length,
      warnings,
      release_gate:warnings.length ? 'source_gap_review_required' : 'source_gap_reviewable',
      live_fetching_performed:false,
      verification_claimed:false
    };
  }
  function buildConfidenceReview(claimMap = [], contradictionGroups = [], sourceGaps = {}){
    const counts = SUPPORT_LEVELS.reduce((acc, level)=>{ acc[level] = claimMap.filter((claim)=>claim.support_level === level).length; return acc; }, {});
    const blockerCount = counts.unsupported + Math.ceil(counts.weak / 2) + contradictionGroups.length + Math.ceil((sourceGaps.warning_count || 0) / 4);
    const score = clamp(100 - blockerCount * 8, 0, 100, 0);
    const warnings = [];
    if(counts.unsupported) warnings.push('unsupported_claims_present');
    if(counts.weak) warnings.push('weak_claims_present');
    if(contradictionGroups.length) warnings.push('contradiction_groups_require_review');
    if(sourceGaps.warning_count) warnings.push('source_gap_warnings_present');
    return {
      confidence_review_version:VERSION,
      confidence_model:MODEL,
      generated_at:nowIso(),
      claim_count:claimMap.length,
      support_level_counts:counts,
      contradiction_group_count:contradictionGroups.length,
      source_gap_warning_count:sourceGaps.warning_count || 0,
      inferred_confidence:confidenceFromScore(score),
      confidence_score:score,
      confidence_warnings:warnings,
      manual_review_required:true,
      release_gate:warnings.length ? 'confidence_review_required' : 'confidence_reviewable',
      live_fetching_performed:false,
      verification_claimed:false
    };
  }
  function strategicBrief(packet = {}, claimMap = [], contradictionGroups = [], sourceGaps = {}, confidenceReview = {}){
    const brief = packet.analysis_brief || {};
    const topic = text(brief.topic || packet.research_plan?.topic || 'Untitled research question');
    return {
      brief_version:VERSION,
      brief_model:MODEL,
      title:topic,
      research_question:topic,
      summary:text(brief.handoff_summary || `Source-to-brief package for ${topic}.`),
      strongest_claim_ids:claimMap.filter((claim)=>claim.support_level === 'strong').map((claim)=>claim.claim_id),
      unsupported_claim_ids:claimMap.filter((claim)=>claim.support_level === 'unsupported').map((claim)=>claim.claim_id),
      contradiction_group_ids:contradictionGroups.map((group)=>group.group_id),
      source_gap_warning_count:sourceGaps.warning_count || 0,
      inferred_confidence:confidenceReview.inferred_confidence || 'low',
      publication_status:confidenceReview.release_gate === 'confidence_reviewable' ? 'manual_review_required' : 'not_publication_ready',
      source_boundary_note:'Evidence is user-provided or source-imported. The package does not verify, fetch, scrape, or execute providers automatically.'
    };
  }
  function buildSourceToBriefWorkbench(packet = {}, options = {}){
    const version = options.version || VERSION;
    const generatedAt = options.now || nowIso();
    const evidenceCards = asArray(packet.evidence_matrix || packet.evidence).map(evidenceCard);
    const claimMap = buildClaimMap(packet, evidenceCards);
    const links = buildEvidenceLinks(evidenceCards);
    const contradictionGroups = buildContradictionGroups(packet, evidenceCards, claimMap);
    const sourceGaps = Object.assign(buildSourceGaps(packet, evidenceCards, claimMap), {generated_at:generatedAt, source_gap_report_version:version});
    const confidenceReview = Object.assign(buildConfidenceReview(claimMap, contradictionGroups, sourceGaps), {generated_at:generatedAt, confidence_review_version:version});
    const strategic = strategicBrief(packet, claimMap, contradictionGroups, sourceGaps, confidenceReview);
    const releaseGate = confidenceReview.release_gate === 'confidence_reviewable' && sourceGaps.release_gate === 'source_gap_reviewable' ? 'source_to_brief_reviewable' : 'source_to_brief_review_required';
    return {
      source_to_brief_version:version,
      workbench_model:MODEL,
      generated_at:generatedAt,
      workflow_stage:'research_question_to_exportable_strategic_brief',
      workflow_steps:['research_question','research_plan','evidence_cards','claim_map','contradiction_map','source_gaps','confidence_review','exportable_strategic_brief'],
      research_question:text(packet.research_plan?.topic || packet.analysis_brief?.topic || strategic.research_question),
      research_plan: packet.research_plan || null,
      evidence_cards:evidenceCards,
      evidence_to_claim_links:links,
      claim_map:claimMap,
      contradiction_groups:contradictionGroups,
      source_gaps:sourceGaps,
      confidence_review:confidenceReview,
      exportable_strategic_brief:strategic,
      blocked_unavailable_capabilities:BLOCKED_CAPABILITIES.slice(),
      local_manual_workspace_model:true,
      live_fetching_performed:false,
      provider_execution_expanded:false,
      backend_behavior_expanded:false,
      production_oauth_enabled:false,
      automatic_source_verification_claimed:false,
      verification_claimed:false,
      release_gate:releaseGate
    };
  }
  function claimMapRows(workbench = {}){
    return [['claim_id','claim_text','support_level','support_score','inferred_confidence','supporting_evidence_ids','contradicting_evidence_ids','source_gap_warnings']]
      .concat(asArray(workbench.claim_map).map((claim)=>[
        claim.claim_id,
        claim.claim_text,
        claim.support_level,
        claim.support_score,
        claim.inferred_confidence,
        asArray(claim.supporting_evidence_ids).join('|'),
        asArray(claim.contradicting_evidence_ids).join('|'),
        asArray(claim.source_gap_warnings).join('|')
      ]));
  }
  function markdownBrief(workbench = {}){
    const brief = workbench.exportable_strategic_brief || {};
    const claims = asArray(workbench.claim_map).map((claim)=>`- ${claim.claim_id}: ${claim.support_level} support, ${claim.inferred_confidence} confidence; evidence ${asArray(claim.supporting_evidence_ids).join(', ') || 'none'}`).join('\n') || '- No claims mapped';
    const groups = asArray(workbench.contradiction_groups).map((group)=>`- ${group.group_id}: ${group.target_claim_id} (${group.severity}); counter-evidence ${asArray(group.contradicting_evidence_ids).join(', ') || 'none'}`).join('\n') || '- No contradiction groups';
    return [
      `# ${text(brief.title || workbench.research_question || 'Source-to-Brief Package')}`,
      '',
      `Confidence: ${text(brief.inferred_confidence || workbench.confidence_review?.inferred_confidence || 'low')}`,
      `Publication status: ${text(brief.publication_status || 'manual_review_required')}`,
      '',
      '## Evidence Boundary',
      'Evidence is user-provided or source-imported. This package does not perform live fetching, provider execution, OAuth, backend expansion, or automatic source verification.',
      '',
      '## Claim Map',
      claims,
      '',
      '## Contradiction Groups',
      groups,
      '',
      '## Source Gaps',
      `Warnings: ${Number(workbench.source_gaps?.warning_count || 0)}`,
      '',
      '## Blocked Capabilities',
      asArray(workbench.blocked_unavailable_capabilities).map((item)=>`- ${item}`).join('\n')
    ].join('\n') + '\n';
  }

  root.sourceToBriefWorkbench = Object.freeze({
    VERSION,
    MODEL,
    SUPPORT_LEVELS,
    BLOCKED_CAPABILITIES,
    buildSourceToBriefWorkbench,
    buildClaimMap,
    buildEvidenceLinks,
    buildContradictionGroups,
    buildSourceGaps,
    buildConfidenceReview,
    claimMapRows,
    markdownBrief
  });
})(typeof window !== 'undefined' ? window : globalThis);
