/* Jarbou3i Research Engine source-to-brief intelligence workbench v1.2.0-alpha.5. Local/manual only. */
(function(global){
  'use strict';
  const root = global.Jarbou3iResearchModules = global.Jarbou3iResearchModules || {};
  const VERSION = '1.2.0-alpha.5';
  const MODEL = 'source_to_brief_workbench.v1';
  const UX_MODEL = 'source_to_brief_operator_flow.v1';
  const EXPORT_POLISH_MODEL = 'source_to_brief_export_polish.v1';
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

  function buildOperatorFlow(packet = {}, evidenceCards = [], claimMap = [], contradictionGroups = [], sourceGaps = {}, confidenceReview = {}){
    const hasQuestion = !!text(packet.research_plan?.topic || packet.analysis_brief?.topic);
    const hasPlan = !!packet.research_plan;
    const hasEvidence = evidenceCards.length > 0;
    const hasClaims = claimMap.length > 0;
    const hasContradictions = contradictionGroups.length > 0;
    const hasGaps = (sourceGaps.warning_count || 0) > 0;
    const confidenceScore = Number(confidenceReview.confidence_score || 0);
    const supportedClaims = claimMap.filter((claim)=>['strong','partial'].includes(claim.support_level)).length;
    const weakClaims = claimMap.filter((claim)=>claim.support_level === 'weak').length;
    const unsupportedClaims = claimMap.filter((claim)=>claim.support_level === 'unsupported').length;
    const steps = [
      {step_id:'question', label:'Question', complete:hasQuestion, status:hasQuestion ? 'complete' : 'missing', next_action:hasQuestion ? 'review_research_question_scope' : 'define_research_question'},
      {step_id:'plan', label:'Plan', complete:hasPlan, status:hasPlan ? 'complete' : 'missing', next_action:hasPlan ? 'review_plan_budget_and_counter_evidence_targets' : 'generate_research_plan'},
      {step_id:'evidence', label:'Evidence', complete:hasEvidence, status:hasEvidence ? 'complete' : 'missing', next_action:hasEvidence ? 'review_evidence_cards' : 'add_or_import_evidence'},
      {step_id:'claims', label:'Claims', complete:hasClaims && supportedClaims > 0, status:hasClaims ? (supportedClaims > 0 ? 'reviewable' : 'unsupported') : 'missing', next_action:hasClaims ? 'review_claim_support_levels' : 'build_source_to_brief_package'},
      {step_id:'contradictions', label:'Contradictions', complete:hasContradictions, status:hasContradictions ? 'review_required' : 'empty_reviewable', next_action:hasContradictions ? 'review_contradiction_groups' : 'confirm_no_contradictions_or_add_counter_evidence'},
      {step_id:'gaps', label:'Gaps', complete:!hasGaps, status:hasGaps ? 'warning' : 'clear', next_action:hasGaps ? 'review_source_gap_warnings' : 'continue_to_confidence_review'},
      {step_id:'confidence', label:'Confidence', complete:confidenceScore >= 45, status:confidenceScore >= 70 ? 'strong' : (confidenceScore >= 45 ? 'partial' : 'weak'), next_action:'review_confidence_notes_and_manual_boundaries'},
      {step_id:'export', label:'Export', complete:hasEvidence && hasClaims, status:hasEvidence && hasClaims ? 'ready_with_manual_review' : 'not_ready', next_action:hasEvidence && hasClaims ? 'run_pre_export_readiness_checklist' : 'complete_evidence_and_claim_mapping'}
    ];
    return {
      operator_flow_version:VERSION,
      operator_flow_model:UX_MODEL,
      workflow_steps:steps,
      completed_step_count:steps.filter((step)=>step.complete).length,
      warning_step_count:steps.filter((step)=>['warning','review_required','unsupported','weak','not_ready'].includes(step.status)).length,
      next_best_action:(steps.find((step)=>!step.complete || ['warning','review_required','unsupported','weak','not_ready'].includes(step.status)) || steps[steps.length - 1]).next_action,
      ux_compression_policy:'show_primary_operator_state_first_collapse_secondary_detail',
      manual_local_boundary:'local_manual_workspace_no_live_fetch_no_automatic_verification',
      live_fetching_performed:false,
      verification_claimed:false,
      summary:{supported_claims:supportedClaims, weak_claims:weakClaims, unsupported_claims:unsupportedClaims, contradiction_groups:contradictionGroups.length, source_gap_warnings:sourceGaps.warning_count || 0}
    };
  }

  function buildExportReadinessChecklist(claimMap = [], contradictionGroups = [], sourceGaps = {}, confidenceReview = {}){
    const supportedClaims = claimMap.filter((claim)=>['strong','partial'].includes(claim.support_level));
    const weakClaims = claimMap.filter((claim)=>claim.support_level === 'weak');
    const unsupportedClaims = claimMap.filter((claim)=>claim.support_level === 'unsupported');
    const items = [
      {check_id:'supported_claims_present', label:'Supported claims present', passed:supportedClaims.length > 0, severity:'blocker', detail:`${supportedClaims.length} strong/partial claim(s)`},
      {check_id:'weak_or_unsupported_claims_flagged', label:'Weak or unsupported claims flagged', passed:weakClaims.length + unsupportedClaims.length === 0, severity:(weakClaims.length + unsupportedClaims.length ? 'warning' : 'info'), detail:`${weakClaims.length} weak, ${unsupportedClaims.length} unsupported`},
      {check_id:'contradictions_reviewed', label:'Contradictions reviewed', passed:contradictionGroups.length === 0, severity:(contradictionGroups.length ? 'warning' : 'info'), detail:`${contradictionGroups.length} contradiction group(s)`},
      {check_id:'source_gaps_reviewed', label:'Source gaps reviewed', passed:(sourceGaps.warning_count || 0) === 0, severity:(sourceGaps.warning_count ? 'warning' : 'info'), detail:`${sourceGaps.warning_count || 0} source gap warning(s)`},
      {check_id:'confidence_notes_present', label:'Confidence notes present', passed:!!confidenceReview.inferred_confidence, severity:'info', detail:`confidence ${confidenceReview.inferred_confidence || 'unknown'}`},
      {check_id:'manual_local_disclaimer_present', label:'Manual/local evidence disclaimer present', passed:true, severity:'blocker', detail:'user-provided or source-imported evidence only'},
      {check_id:'no_automatic_verification_claim', label:'No automatic verification claim present', passed:confidenceReview.verification_claimed !== true, severity:'blocker', detail:'verification_claimed=false'}
    ];
    return {
      checklist_version:VERSION,
      checklist_model:UX_MODEL,
      items,
      blocker_count:items.filter((item)=>!item.passed && item.severity === 'blocker').length,
      warning_count:items.filter((item)=>!item.passed && item.severity === 'warning').length,
      export_readiness_status:items.some((item)=>!item.passed && item.severity === 'blocker') ? 'not_ready' : (items.some((item)=>!item.passed) ? 'ready_with_warnings' : 'ready_for_manual_export'),
      manual_review_required:true,
      automatic_source_verification_claimed:false,
      live_fetching_performed:false,
      verification_claimed:false
    };
  }

  function buildEmptyStateGuidance(workbench = {}){
    const cards = asArray(workbench.evidence_cards);
    const claims = asArray(workbench.claim_map);
    const contradictions = asArray(workbench.contradiction_groups);
    return {
      no_evidence:{visible:cards.length === 0, next_action:'add_or_import_evidence_before_claim_mapping'},
      no_claims:{visible:claims.length === 0, next_action:'build_source_to_brief_package_after_evidence'},
      no_contradictions:{visible:contradictions.length === 0, next_action:'add_counter_evidence_or_confirm_no_contradiction'},
      no_export_ready_package:{visible:workbench.release_gate !== 'source_to_brief_reviewable', next_action:'resolve_blockers_or_export_with_manual_warning'}
    };
  }
  function reviewThroughputSummary(packet = {}){
    const report = packet.review_throughput_report || packet.evidence_workspace_ux_report?.throughput_report || {};
    const ux = packet.evidence_workspace_ux_report || {};
    const counts = report.counts || {};
    const lanes = report.review_lanes || ux.review_lanes || {lanes:[]};
    const actions = asArray(report.next_review_actions || ux.next_review_actions);
    return {
      review_throughput_summary_version:VERSION,
      model:'source_to_brief_review_throughput_summary.v1',
      pending_count:Number(counts.pending || 0),
      needs_edit_count:Number(counts.needs_edit || 0),
      unresolved_count:Number(counts.unresolved || 0),
      contradiction_open_count:Number(report.contradiction_open_count || 0),
      low_traceability_open_count:Number(report.low_traceability_open_count || 0),
      unlinked_open_count:Number(report.unlinked_open_count || 0),
      review_pressure:Number(report.review_pressure || 0),
      export_throughput_gate:report.export_throughput_gate || (Number(counts.unresolved || 0) ? 'manual_review_queue_open' : 'manual_export_review_ready'),
      priority_lanes:asArray(lanes.lanes).map((lane)=>({lane_id:lane.lane_id, label:lane.label, item_count:asArray(lane.items).length, review_ids:asArray(lane.items).map((item)=>item.review_id).filter(Boolean)})),
      next_review_actions:actions.slice(0,5),
      queue_bypass_enabled:false,
      local_only:true,
      live_fetching_performed:false,
      verification_claimed:false
    };
  }
  function exportPolishReport(workbench = {}, reviewSummary = {}){
    const checklist = workbench.export_readiness_checklist || {};
    const items = asArray(checklist.items);
    const failed = items.filter((item)=>!item.passed);
    const files = [
      'source-to-brief/source-to-brief-package.json',
      'source-to-brief/strategic-brief.md',
      'source-to-brief/claim-map.csv',
      'source-to-brief/source-gaps.json',
      'source-to-brief/confidence-review.json',
      'source-to-brief/export-readiness.json',
      'source-to-brief/claim-traceability-console.json',
      'source-to-brief/claim-traceability.csv',
      'source-to-brief/review-decision-ledger.json',
      'source-to-brief/review-decision-ledger.md',
      'source-to-brief/operator-handoff.md'
    ];
    if(Number(reviewSummary.unresolved_count || 0) > 0) files.push('source-to-brief/review-throughput-summary.json');
    const blockers = failed.filter((item)=>item.severity === 'blocker').map((item)=>item.check_id);
    const warnings = failed.filter((item)=>item.severity !== 'blocker').map((item)=>item.check_id);
    if(Number(reviewSummary.unresolved_count || 0) > 0) warnings.push('review_queue_unresolved');
    return {
      export_polish_version:VERSION,
      export_polish_model:EXPORT_POLISH_MODEL,
      handoff_file_plan:files,
      handoff_file_count:files.length,
      blockers:unique(blockers),
      warnings:unique(warnings),
      unresolved_review_count:Number(reviewSummary.unresolved_count || 0),
      contradiction_review_count:Number(reviewSummary.contradiction_open_count || 0),
      export_review_status:blockers.length ? 'blocked_for_manual_export' : (warnings.length ? 'ready_with_manual_warnings' : 'ready_for_manual_handoff'),
      operator_handoff_note:'Review throughput, source gaps, contradictions, confidence notes, and the manual/local evidence boundary before sharing or publishing.',
      manual_local_disclaimer:'Evidence is user-provided or source-imported; export polish does not verify, fetch, scrape, or execute providers automatically.',
      no_automatic_verification_claim:true,
      local_only:true,
      live_fetching_performed:false,
      provider_execution_expanded:false,
      verification_claimed:false,
      automatic_source_verification_claimed:false
    };
  }


  function traceabilityStatusForClaim(claim = {}, evidence = []){
    const linkedIds = unique([].concat(asArray(claim.supporting_evidence_ids), asArray(claim.contradicting_evidence_ids)));
    const linked = evidence.filter((item)=>linkedIds.includes(item.evidence_id));
    if(!linkedIds.length) return 'missing_evidence_links';
    if(!linked.length) return 'linked_evidence_not_found';
    const complete = linked.filter((item)=>item.traceability_complete === true || traceable(item)).length;
    if(complete === linked.length) return 'complete_traceability';
    if(complete > 0) return 'partial_traceability';
    return 'traceability_missing';
  }
  function claimDecisionState(claim = {}, contradictionGroups = []){
    const hasContradiction = contradictionGroups.some((group)=>group.target_claim_id === claim.claim_id);
    if(hasContradiction) return 'contradiction_review_required';
    if(claim.support_level === 'strong') return 'provisionally_supported_manual_review';
    if(claim.support_level === 'partial') return 'partial_support_manual_review';
    if(claim.support_level === 'weak') return 'weak_support_decision_required';
    return 'unsupported_decision_required';
  }
  function buildClaimTraceabilityConsole(workbench = {}, packet = {}){
    const evidence = asArray(workbench.evidence_cards || packet.evidence_matrix || packet.evidence);
    const contradictions = asArray(workbench.contradiction_groups);
    const rows = asArray(workbench.claim_map).map((claim, index)=>{
      const linkedIds = unique([].concat(asArray(claim.supporting_evidence_ids), asArray(claim.contradicting_evidence_ids)));
      const linkedEvidence = evidence.filter((item)=>linkedIds.includes(item.evidence_id));
      const missingIds = linkedIds.filter((id)=>!linkedEvidence.some((item)=>item.evidence_id === id));
      const warningSet = unique([].concat(asArray(claim.source_gap_warnings), missingIds.length ? ['linked_evidence_missing_from_package'] : []));
      return {
        row_id:`CTR${index + 1}`,
        claim_id:claim.claim_id,
        claim_text:claim.claim_text,
        support_level:claim.support_level,
        support_score:claim.support_score,
        inferred_confidence:claim.inferred_confidence,
        evidence_link_count:linkedIds.length,
        supporting_evidence_ids:asArray(claim.supporting_evidence_ids),
        contradicting_evidence_ids:asArray(claim.contradicting_evidence_ids),
        source_types:unique(linkedEvidence.map((item)=>item.source_type || 'other')),
        traceability_status:traceabilityStatusForClaim(claim, evidence),
        decision_state:claimDecisionState(claim, contradictions),
        warnings:warningSet,
        manual_review_required:true,
        evidence_boundary:'user_provided_or_source_imported_evidence',
        live_fetching_performed:false,
        verification_claimed:false
      };
    });
    const counts = {
      total_claims:rows.length,
      complete_traceability:rows.filter((row)=>row.traceability_status === 'complete_traceability').length,
      partial_traceability:rows.filter((row)=>row.traceability_status === 'partial_traceability').length,
      missing_traceability:rows.filter((row)=>['missing_evidence_links','linked_evidence_not_found','traceability_missing'].includes(row.traceability_status)).length,
      decision_required:rows.filter((row)=>/required/.test(row.decision_state)).length,
      contradiction_review_required:rows.filter((row)=>row.decision_state === 'contradiction_review_required').length
    };
    return {
      claim_traceability_console_version:VERSION,
      traceability_model:'claim_traceability_console.v1',
      generated_at:nowIso(),
      rows,
      counts,
      release_gate:counts.missing_traceability || counts.decision_required || counts.contradiction_review_required ? 'claim_traceability_review_required' : 'claim_traceability_reviewable',
      operator_next_action:counts.missing_traceability ? 'repair_missing_claim_evidence_links' : (counts.contradiction_review_required ? 'review_claim_contradictions' : 'review_decision_ledger'),
      manual_local_boundary:'claim traceability is derived from local evidence links and does not verify source truth',
      local_only:true,
      live_fetching_performed:false,
      provider_execution_expanded:false,
      automatic_source_verification_claimed:false,
      verification_claimed:false
    };
  }
  function ledgerEntry(entry_id, decision_type, target_id, label, state, details = {}){
    return Object.assign({
      entry_id,
      decision_type,
      target_id,
      label:text(label || target_id),
      decision_state:state,
      human_review_required:true,
      decided_by:'operator_pending',
      decided_at:null,
      decision_basis:'local_manual_evidence_traceability',
      live_fetching_performed:false,
      verification_claimed:false
    }, details);
  }
  function buildReviewDecisionLedger(workbench = {}, packet = {}){
    const entries = [];
    asArray(workbench.evidence_cards).forEach((item, index)=>{
      const linked = unique([].concat(asArray(item.supports), asArray(item.contradicts)));
      const state = linked.length && item.traceability_complete ? 'evidence_review_ready' : 'evidence_traceability_decision_required';
      entries.push(ledgerEntry(`DL-E${index + 1}`, 'evidence_review_decision', item.evidence_id, item.claim || item.source_title, state, {
        evidence_id:item.evidence_id,
        source_type:item.source_type,
        linked_claim_ids:linked,
        warnings:asArray(item.source_gap_warnings)
      }));
    });
    asArray(workbench.claim_traceability_console?.rows).forEach((row, index)=>{
      entries.push(ledgerEntry(`DL-C${index + 1}`, 'claim_traceability_decision', row.claim_id, row.claim_text, row.decision_state, {
        claim_id:row.claim_id,
        support_level:row.support_level,
        support_score:row.support_score,
        supporting_evidence_ids:asArray(row.supporting_evidence_ids),
        contradicting_evidence_ids:asArray(row.contradicting_evidence_ids),
        traceability_status:row.traceability_status,
        warnings:asArray(row.warnings)
      }));
    });
    asArray(workbench.contradiction_groups).forEach((group, index)=>{
      entries.push(ledgerEntry(`DL-X${index + 1}`, 'contradiction_resolution_decision', group.group_id, group.target_claim_text || group.target_claim_id, 'contradiction_resolution_required', {
        contradiction_group_id:group.group_id,
        target_claim_id:group.target_claim_id,
        supporting_evidence_ids:asArray(group.supporting_evidence_ids),
        contradicting_evidence_ids:asArray(group.contradicting_evidence_ids),
        severity:group.severity
      }));
    });
    asArray(workbench.source_gaps?.warnings).slice(0,12).forEach((gap, index)=>{
      entries.push(ledgerEntry(`DL-G${index + 1}`, 'source_gap_decision', gap.claim_id || gap.evidence_id || `gap-${index + 1}`, gap.warning, 'gap_accept_or_repair_decision_required', {
        gap_scope:gap.scope,
        claim_id:gap.claim_id || null,
        evidence_id:gap.evidence_id || null,
        warning:gap.warning
      }));
    });
    const polish = workbench.export_polish_report || {};
    entries.push(ledgerEntry('DL-EXPORT-1', 'export_handoff_decision', 'source-to-brief-export', 'Export handoff readiness', polish.export_review_status || 'manual_export_review_required', {
      blockers:asArray(polish.blockers),
      warnings:asArray(polish.warnings),
      handoff_file_count:Number(polish.handoff_file_count || 0),
      no_automatic_verification_claim:polish.no_automatic_verification_claim === true
    }));
    const unresolved = entries.filter((entry)=>!/ready$|reviewable$|supported/.test(entry.decision_state)).length;
    return {
      review_decision_ledger_version:VERSION,
      ledger_model:'review_decision_ledger.v1',
      generated_at:nowIso(),
      entries,
      entry_count:entries.length,
      unresolved_decision_count:unresolved,
      decision_types:unique(entries.map((entry)=>entry.decision_type)),
      release_gate:unresolved ? 'review_decision_ledger_open' : 'review_decision_ledger_reviewable',
      operator_next_action:unresolved ? 'resolve_open_review_decisions_before_publication' : 'confirm_export_handoff_boundary',
      queue_bypass_enabled:false,
      local_only:true,
      live_fetching_performed:false,
      provider_execution_expanded:false,
      automatic_source_verification_claimed:false,
      verification_claimed:false
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
    const operatorFlow = buildOperatorFlow(packet, evidenceCards, claimMap, contradictionGroups, sourceGaps, confidenceReview);
    const exportReadinessChecklist = buildExportReadinessChecklist(claimMap, contradictionGroups, sourceGaps, confidenceReview);
    const reviewSummary = reviewThroughputSummary(packet);
    const releaseGate = evidenceCards.length && claimMap.length && confidenceReview.release_gate === 'confidence_reviewable' && sourceGaps.release_gate === 'source_gap_reviewable' ? 'source_to_brief_reviewable' : 'source_to_brief_review_required';
    const exportPolish = exportPolishReport({export_readiness_checklist:exportReadinessChecklist, release_gate:releaseGate}, reviewSummary);
    const traceabilityBase = {claim_map:claimMap, evidence_cards:evidenceCards, contradiction_groups:contradictionGroups, source_gaps:sourceGaps, export_polish_report:exportPolish};
    const claimTraceabilityConsole = buildClaimTraceabilityConsole(traceabilityBase, packet);
    const reviewDecisionLedger = buildReviewDecisionLedger(Object.assign({}, traceabilityBase, {claim_traceability_console:claimTraceabilityConsole}), packet);
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
      operator_flow:operatorFlow,
      export_readiness_checklist:exportReadinessChecklist,
      review_throughput_summary:reviewSummary,
      export_polish_report:exportPolish,
      claim_traceability_console:claimTraceabilityConsole,
      review_decision_ledger:reviewDecisionLedger,
      ux_compression_model:'source_to_brief_operator_flow.v1',
      export_polish_model:EXPORT_POLISH_MODEL,
      empty_state_guidance:buildEmptyStateGuidance({evidence_cards:evidenceCards, claim_map:claimMap, contradiction_groups:contradictionGroups, release_gate:releaseGate}),
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
      '## Export Polish Review',
      `- Export review status: ${text(workbench.export_polish_report?.export_review_status || 'manual_review_required')}`,
      `- Handoff files: ${Number(workbench.export_polish_report?.handoff_file_count || 0)}`,
      `- Review queue unresolved: ${Number(workbench.review_throughput_summary?.unresolved_count || 0)}`,
      `- Manual boundary: ${text(workbench.export_polish_report?.manual_local_disclaimer || brief.source_boundary_note || '')}`,
      '',
      '## Claim Traceability Console',
      `- Traceability rows: ${Number(workbench.claim_traceability_console?.rows?.length || 0)}`,
      `- Missing traceability: ${Number(workbench.claim_traceability_console?.counts?.missing_traceability || 0)}`,
      `- Decision required: ${Number(workbench.claim_traceability_console?.counts?.decision_required || 0)}`,
      '',
      '## Review Decision Ledger',
      `- Ledger entries: ${Number(workbench.review_decision_ledger?.entry_count || 0)}`,
      `- Open decisions: ${Number(workbench.review_decision_ledger?.unresolved_decision_count || 0)}`,
      `- Ledger gate: ${text(workbench.review_decision_ledger?.release_gate || 'review_decision_ledger_open')}`,
      '',
      '## Blocked Capabilities',
      asArray(workbench.blocked_unavailable_capabilities).map((item)=>`- ${item}`).join('\n')
    ].join('\n') + '\n';
  }

  root.sourceToBriefWorkbench = Object.freeze({
    VERSION,
    MODEL,
    UX_MODEL,
    EXPORT_POLISH_MODEL,
    SUPPORT_LEVELS,
    BLOCKED_CAPABILITIES,
    buildSourceToBriefWorkbench,
    buildClaimMap,
    buildEvidenceLinks,
    buildContradictionGroups,
    buildSourceGaps,
    buildConfidenceReview,
    buildOperatorFlow,
    buildExportReadinessChecklist,
    buildClaimTraceabilityConsole,
    buildReviewDecisionLedger,
    buildEmptyStateGuidance,
    reviewThroughputSummary,
    exportPolishReport,
    claimMapRows,
    markdownBrief
  });
})(typeof window !== 'undefined' ? window : globalThis);
