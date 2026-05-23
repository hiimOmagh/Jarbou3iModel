/* Jarbou3i Research Engine publication review gate and claim boundary audit v1.1.0. */
(function(global){
  'use strict';
  const root = global.Jarbou3iResearchModules = global.Jarbou3iResearchModules || {};
  const VERSION = '1.2.0-alpha.8';
  const MODEL = 'publication_review_gate.v1';

  function nowIso(){ return new Date().toISOString(); }
  function asArray(value){ return Array.isArray(value) ? value : []; }
  function text(value, fallback = ''){ return String(value ?? fallback).trim(); }
  function unique(values){ return [...new Set(asArray(values).filter(Boolean).map(String))]; }
  function idsFromText(value, prefix = 'E'){
    const pattern = prefix === 'E' ? /\bE\d+\b/g : /\b[A-Z]{1,4}\d+\b/g;
    return unique(text(value).match(pattern) || []);
  }
  function clampPct(value){ const n = Number(value); return Math.max(0, Math.min(100, Number.isFinite(n) ? Math.round(n) : 0)); }
  function evidenceItems(packet){ return asArray(packet.evidence_matrix); }
  function lower(value){ return text(value).toLowerCase(); }
  function classifyClaimText(value){
    const t = lower(value);
    if(!t) return 'unclear';
    if(/\b(may|might|could|likely|unlikely|probab|estimate|forecast|scenario|risk|expected|plausible|possibly|chance|if|would|could)\b/.test(t)) return 'estimate';
    if(/\b(indicates|suggests|implies|therefore|because|drives|enables|constrains|motivates|reflects|shows that|means that|likely because)\b/.test(t)) return 'inference';
    if(/\b(reported|published|announced|stated|according|observed|documented|recorded|captured|source|url|date|filed|released)\b/.test(t)) return 'observation';
    if(/\d{4}|https?:\/\//.test(t)) return 'observation';
    return 'inference';
  }
  function evidenceStrengthBand(item){
    const score = Number(item.evidence_strength ?? item.evidence_scoring?.reliability_score ?? 0);
    if(score >= 70 || score >= 4) return 'high';
    if(score >= 40 || score >= 3) return 'medium';
    return 'low';
  }
  function evidenceIndex(packet){
    const map = new Map();
    evidenceItems(packet).forEach((item, index) => map.set(item.evidence_id || `E${index + 1}`, item));
    return map;
  }
  function classifyEvidenceClaims(packet = {}, options = {}){
    const rows = evidenceItems(packet).map((item, index) => {
      const claimType = item.claim_type || item.boundary_type || classifyClaimText(item.claim || item.notes || '');
      const sourceTraceable = !!text(item.source_url) && !!text(item.source_date) && text(item.source_date) !== 'unknown';
      const hasSupport = asArray(item.supports).length > 0;
      const hasContradiction = asArray(item.contradicts).length > 0;
      const boundaryWarnings = [];
      if(claimType !== 'observation' && !hasSupport) boundaryWarnings.push('non_observation_without_support_link');
      if(!sourceTraceable) boundaryWarnings.push('source_traceability_incomplete');
      if(claimType === 'estimate' && !hasContradiction) boundaryWarnings.push('estimate_without_counter_evidence_target');
      return {
        claim_id:item.evidence_id || `E${index + 1}`,
        claim:item.claim || '',
        claim_type:claimType,
        confidence:item.confidence || 'medium',
        evidence_strength_band:evidenceStrengthBand(item),
        source_traceable:sourceTraceable,
        supports:asArray(item.supports),
        contradicts:asArray(item.contradicts),
        boundary_warnings:boundaryWarnings,
        review_gate:boundaryWarnings.length ? 'claim_boundary_review_required' : 'claim_boundary_reviewable'
      };
    });
    const counts = rows.reduce((acc, item) => { acc[item.claim_type] = (acc[item.claim_type] || 0) + 1; return acc; }, {});
    return {
      claim_classification_report_version:options.version || VERSION,
      report_model:MODEL,
      generated_at:nowIso(),
      claim_count:rows.length,
      observation_count:counts.observation || 0,
      inference_count:counts.inference || 0,
      estimate_count:counts.estimate || 0,
      unclear_count:counts.unclear || 0,
      boundary_warning_count:rows.reduce((sum, item) => sum + item.boundary_warnings.length, 0),
      claim_classifications:rows,
      release_gate:rows.some((item) => item.boundary_warnings.length) ? 'claim_boundary_review_required' : 'claim_boundary_reviewable',
      live_fetching_performed:false,
      verification_claimed:false
    };
  }
  function briefParagraphs(packet){
    const trace = packet.brief_traceability_report || {};
    if(asArray(trace.paragraph_links).length) return asArray(trace.paragraph_links).map((item) => ({
      paragraph_id:item.paragraph_id,
      section:item.section,
      text:item.paragraph_text || '',
      evidence_ids:asArray(item.evidence_ids)
    }));
    const brief = packet.analysis_brief || {};
    return [
      ['handoff_summary', brief.handoff_summary],
      ['evidence_priorities', asArray(brief.evidence_priorities).join(' ')],
      ['synthesis_constraints', asArray(brief.synthesis_constraints).join(' ')],
      ['quality_fix_actions', asArray(brief.quality_fix_actions || brief.quality_gate_report?.fix_actions).join(' ')]
    ].filter(([, value]) => text(value)).map(([section, value], index) => ({paragraph_id:`P${index + 1}`, section, text:text(value), evidence_ids:idsFromText(value, 'E')}));
  }
  function auditClaimBoundaries(packet = {}, options = {}){
    const eMap = evidenceIndex(packet);
    const paragraphs = briefParagraphs(packet);
    const unsupported = [];
    const boundaryIssues = [];
    paragraphs.forEach((p) => {
      const claimType = classifyClaimText(p.text);
      const evidenceIds = unique(p.evidence_ids);
      if(!evidenceIds.length) unsupported.push({paragraph_id:p.paragraph_id, section:p.section, issue:'paragraph_has_no_evidence_ids', claim_type:claimType});
      const missing = evidenceIds.filter((id) => !eMap.has(id));
      if(missing.length) boundaryIssues.push({paragraph_id:p.paragraph_id, section:p.section, issue:'paragraph_references_missing_evidence', missing_evidence_ids:missing});
      if(claimType === 'estimate' && !/disproven|falsif|weakens|if\b/i.test(p.text)) boundaryIssues.push({paragraph_id:p.paragraph_id, section:p.section, issue:'estimate_without_visible_falsifier'});
    });
    evidenceItems(packet).forEach((item) => {
      const claimType = item.claim_type || classifyClaimText(item.claim);
      if(claimType !== 'observation' && !asArray(item.supports).length) boundaryIssues.push({evidence_id:item.evidence_id, issue:'non_observation_evidence_without_layer_support', claim_type:claimType});
      if(!text(item.source_url) && claimType === 'observation') boundaryIssues.push({evidence_id:item.evidence_id, issue:'observation_without_source_url', claim_type:claimType});
    });
    const issueCount = unsupported.length + boundaryIssues.length;
    return {
      claim_boundary_audit_version:options.version || VERSION,
      audit_model:MODEL,
      generated_at:nowIso(),
      paragraph_count:paragraphs.length,
      unsupported_conclusion_count:unsupported.length,
      boundary_issue_count:boundaryIssues.length,
      unsupported_conclusions:unsupported,
      boundary_issues:boundaryIssues,
      release_gate:issueCount ? 'claim_boundary_review_required' : 'claim_boundary_passed_review_required',
      live_fetching_performed:false,
      verification_claimed:false
    };
  }
  function contradictionFalsifierCompleteness(packet = {}, options = {}){
    const appendix = packet.contradiction_falsifier_appendix || {};
    const contradictionEvidence = evidenceItems(packet).filter((item) => asArray(item.contradicts).length);
    const contradictoryLinks = asArray(packet.causal_links).filter((link) => link.relationship === 'contradicts');
    const falsifiers = asArray(appendix.falsifiers).length ? asArray(appendix.falsifiers) : asArray(packet.research_plan?.disconfirming_conditions).map((condition, index) => ({falsifier_id:`FAL${index + 1}`, condition:text(condition), linked_evidence_ids:idsFromText(condition, 'E')}));
    const missing = [];
    if(!contradictionEvidence.length && !contradictoryLinks.length) missing.push('counter_evidence_or_contradiction_missing');
    if(!falsifiers.length) missing.push('falsifier_conditions_missing');
    falsifiers.forEach((item) => { if(!asArray(item.linked_evidence_ids).length) missing.push(`falsifier_unlinked:${item.falsifier_id || text(item.condition).slice(0,24)}`); });
    return {
      contradiction_falsifier_completeness_version:options.version || VERSION,
      completeness_model:MODEL,
      generated_at:nowIso(),
      contradiction_evidence_count:contradictionEvidence.length,
      contradictory_causal_link_count:contradictoryLinks.length,
      falsifier_count:falsifiers.length,
      missing_completeness_items:unique(missing),
      completeness_score:clampPct(100 - unique(missing).length * 25),
      release_gate:missing.length ? 'contradiction_falsifier_review_required' : 'contradiction_falsifier_reviewable',
      live_fetching_performed:false,
      verification_claimed:false
    };
  }
  function buildPublicationReviewGate(packet = {}, options = {}){
    const classification = packet.claim_classification_report || classifyEvidenceClaims(packet, options);
    const boundary = packet.claim_boundary_audit_report || auditClaimBoundaries(packet, options);
    const completeness = packet.contradiction_falsifier_completeness_report || contradictionFalsifierCompleteness(packet, options);
    const readiness = packet.publication_readiness_export_report || {};
    const blockers = unique([
      ...asArray(readiness.blockers),
      ...(boundary.unsupported_conclusion_count ? ['unsupported_conclusions_present'] : []),
      ...(boundary.boundary_issue_count ? ['claim_boundary_issues_present'] : []),
      ...(classification.boundary_warning_count ? ['claim_classification_warnings_present'] : []),
      ...asArray(completeness.missing_completeness_items)
    ]);
    const score = clampPct(100 - blockers.length * 12 - Math.max(0, 75 - (readiness.publication_readiness_score || 75)));
    const warnings = unique([
      ...(boundary.unsupported_conclusion_count ? ['Some conclusion paragraphs lack evidence-ID support.'] : []),
      ...(classification.estimate_count && completeness.falsifier_count === 0 ? ['Estimate claims need visible falsifier conditions.'] : []),
      ...(completeness.missing_completeness_items.length ? ['Contradiction/falsifier completeness requires review.'] : [])
    ]);
    return {
      publication_review_gate_version:options.version || VERSION,
      gate_model:MODEL,
      generated_at:nowIso(),
      publication_review_score:score,
      blocker_count:blockers.length,
      blocker_reasons:blockers,
      visible_traceability_warnings:warnings,
      claim_classification_summary:{
        claim_count:classification.claim_count,
        observation_count:classification.observation_count,
        inference_count:classification.inference_count,
        estimate_count:classification.estimate_count,
        boundary_warning_count:classification.boundary_warning_count
      },
      unsupported_conclusion_count:boundary.unsupported_conclusion_count,
      boundary_issue_count:boundary.boundary_issue_count,
      contradiction_falsifier_completeness_score:completeness.completeness_score,
      release_gate:blockers.length ? 'publication_review_blocked' : 'publication_review_passed_manual_review_required',
      live_fetching_performed:false,
      verification_claimed:false,
      evidence_review_queue_required:true
    };
  }
  function buildExportSafeFinalReviewReport(packet = {}, options = {}){
    const classification = classifyEvidenceClaims(packet, options);
    const boundary = auditClaimBoundaries(packet, options);
    const completeness = contradictionFalsifierCompleteness(packet, options);
    const gate = buildPublicationReviewGate(Object.assign({}, packet, {claim_classification_report:classification, claim_boundary_audit_report:boundary, contradiction_falsifier_completeness_report:completeness}), options);
    return {
      export_safe_final_review_report_version:options.version || VERSION,
      report_model:MODEL,
      generated_at:nowIso(),
      publication_review_gate:gate,
      claim_classification_report:classification,
      claim_boundary_audit_report:boundary,
      contradiction_falsifier_completeness_report:completeness,
      export_safety:{
        raw_token_exported:false,
        access_token_exported:false,
        refresh_token_exported:false,
        secret_exported:false,
        automatic_source_verification_claimed:false,
        live_fetching_performed:false,
        provider_execution_expanded:false,
        oauth_backend_expanded:false
      },
      final_review_status:gate.release_gate === 'publication_review_blocked' ? 'manual_correction_required' : 'export_safe_manual_review_required',
      release_gate:gate.release_gate
    };
  }
  function buildPublicationReviewBundle(packet = {}, options = {}){
    const finalReport = buildExportSafeFinalReviewReport(packet, options);
    return {
      claim_classification_report:finalReport.claim_classification_report,
      claim_boundary_audit_report:finalReport.claim_boundary_audit_report,
      contradiction_falsifier_completeness_report:finalReport.contradiction_falsifier_completeness_report,
      publication_review_gate_report:finalReport.publication_review_gate,
      export_safe_final_review_report:finalReport
    };
  }

  root.publicationReviewGate = Object.freeze({VERSION, MODEL, classifyClaimText, classifyEvidenceClaims, auditClaimBoundaries, contradictionFalsifierCompleteness, buildPublicationReviewGate, buildExportSafeFinalReviewReport, buildPublicationReviewBundle});
  if(typeof module !== 'undefined' && module.exports) module.exports = root.publicationReviewGate;
})(typeof window !== 'undefined' ? window : globalThis);
