/* Jarbou3i Research Engine evidence workspace v1.1.0. Manual-only; no live fetching. */
(function(global){
  'use strict';
  const root = global.Jarbou3iResearchModules = global.Jarbou3iResearchModules || {};
  const VERSION = '1.1.0-fix.1';
  const SOURCE_TYPES = Object.freeze(['official','academic','news','social','market','expert','primary','other']);
  const CONFIDENCE = Object.freeze(['low','medium','high']);

  function text(value, fallback = ''){ return String(value ?? fallback).trim(); }
  function asArray(value){ return Array.isArray(value) ? value.filter(Boolean).map(String) : (value === undefined || value === null || value === '' ? [] : [String(value)]); }
  function nowIso(){ return new Date().toISOString(); }
  function stableHash(value){
    const s = typeof value === 'string' ? value : JSON.stringify(value || {});
    let h = 0;
    for(let i = 0; i < s.length; i += 1) h = Math.imul(31, h) + s.charCodeAt(i) | 0;
    return Math.abs(h).toString(36).padStart(8, '0');
  }
  function validId(id){ return /^[A-Z]+\d+$/.test(text(id)); }
  function normalizeSourceType(value){
    const raw = text(value || 'other').toLowerCase();
    if(['government','regulator','institutional','official_report'].includes(raw)) return 'official';
    if(['paper','journal','study','research_paper'].includes(raw)) return 'academic';
    if(['article','press','web_article'].includes(raw)) return 'news';
    if(['reddit','reddit_thread','x','twitter','youtube','tiktok','hn','hacker_news','social_post'].includes(raw)) return 'social';
    if(['prediction_market','polymarket','price_signal'].includes(raw)) return 'market';
    if(['repo','github','release','commit','primary_document'].includes(raw)) return 'primary';
    if(['interview','testimony','analyst','commentary'].includes(raw)) return 'expert';
    return SOURCE_TYPES.includes(raw) ? raw : 'other';
  }
  function normalizeConfidence(value){
    const raw = text(value || '').toLowerCase();
    return CONFIDENCE.includes(raw) ? raw : 'medium';
  }
  function hasKnownDate(value){
    const v = text(value).toLowerCase();
    return !!v && !['unknown','n/a','na','none','null','undefined'].includes(v);
  }
  function inferSourceConfidence(evidence){
    const type = normalizeSourceType(evidence.source_type);
    const hasUrl = !!text(evidence.source_url);
    const hasDate = hasKnownDate(evidence.source_date);
    const strongType = ['official','academic','primary','news'].includes(type);
    if(hasUrl && hasDate && strongType) return 'high';
    if((hasUrl && strongType) || (hasUrl && hasDate) || (hasDate && strongType)) return 'medium';
    if(hasUrl || hasDate || type !== 'other') return 'medium';
    return 'low';
  }
  function layerFromId(id){
    const prefix = text(id).replace(/[0-9]/g, '');
    return ({I:'interests',A:'actors',T:'tools',N:'narrative',R:'results',F:'feedback',S:'scenarios',C:'contradictions',E:'evidence'})[prefix] || 'unknown';
  }
  function evidenceToClaimLinks(evidence){
    const supports = asArray(evidence.supports).filter(validId).map((target_id) => ({target_id, relationship:'supports', layer:layerFromId(target_id)}));
    const contradicts = asArray(evidence.contradicts).filter(validId).map((target_id) => ({target_id, relationship:'contradicts', layer:layerFromId(target_id)}));
    return supports.concat(contradicts);
  }
  function contradictionMarker(evidence){
    if(asArray(evidence.contradicts).filter(validId).length) return true;
    const blob = `${text(evidence.claim)} ${text(evidence.notes)}`.toLowerCase();
    return /\b(contradict|counter[- ]?evidence|dispute|however|but|weakens|fails to support|opposes|inconsistent)\b/.test(blob);
  }
  function sourceGapWarnings(evidence){
    const warnings = [];
    const type = normalizeSourceType(evidence.source_type);
    const sourceConfidence = normalizeConfidence(evidence.source_confidence || inferSourceConfidence(evidence));
    const links = evidenceToClaimLinks(evidence);
    if(!text(evidence.source_url)) warnings.push('missing_source_url');
    if(!hasKnownDate(evidence.source_date)) warnings.push('missing_source_date');
    if(type === 'other') warnings.push('source_type_other');
    if(sourceConfidence === 'low') warnings.push('low_source_confidence');
    if(!links.length) warnings.push('no_evidence_to_claim_links');
    if(contradictionMarker(evidence) && !asArray(evidence.contradicts).filter(validId).length) warnings.push('contradiction_marker_without_target');
    if((Number(evidence.public_signal_score) || 0) >= 4 && (Number(evidence.evidence_strength) || 0) <= 2) warnings.push('attention_signal_without_reliability');
    return [...new Set(warnings)];
  }
  function normalizeWorkspaceCandidate(candidate, context = {}){
    const evidence = Object.assign({}, candidate || {});
    evidence.supports = asArray(evidence.supports).filter(Boolean);
    evidence.contradicts = asArray(evidence.contradicts).filter(Boolean);
    evidence.source_type = normalizeSourceType(evidence.source_type);
    evidence.source_confidence = normalizeConfidence(evidence.source_confidence || inferSourceConfidence(evidence));
    evidence.contradiction_marker = contradictionMarker(evidence);
    evidence.evidence_to_claim_links = evidenceToClaimLinks(evidence);
    evidence.source_gap_warnings = sourceGapWarnings(evidence);
    evidence.workspace_meta = Object.assign({}, evidence.workspace_meta || {}, {
      workspace_version: VERSION,
      candidate_hash: stableHash({claim:evidence.claim, source_url:evidence.source_url, source_title:evidence.source_title, source_date:evidence.source_date}),
      origin: context.origin || evidence.import_meta?.format || 'manual',
      raw_status: evidence.workspace_meta?.raw_status || 'raw',
      review_status: evidence.workspace_meta?.review_status || 'pending',
      source_classification: {
        type: evidence.source_type,
        confidence: evidence.source_confidence,
        has_url: !!text(evidence.source_url),
        has_date: hasKnownDate(evidence.source_date)
      },
      evidence_link_count: evidence.evidence_to_claim_links.length,
      source_gap_warning_count: evidence.source_gap_warnings.length,
      contradiction_marker: evidence.contradiction_marker,
      manual_review_required: true,
      live_fetching_performed: false,
      verification_claimed: false
    });
    return evidence;
  }
  function buildReviewItem(candidate, options = {}){
    const evidence = normalizeWorkspaceCandidate(candidate, {origin:options.origin || candidate?.import_meta?.format || 'manual_import'});
    const reviewId = options.review_id || `RQ${Number(options.index || 0) + 1}`;
    const status = options.status || 'pending';
    return {
      review_id: reviewId,
      import_id: options.import_id || `IMP-${Date.now()}`,
      created_at: options.created_at || nowIso(),
      status,
      review_stage: status === 'accepted' || status === 'rejected' ? status : 'raw',
      raw_status: 'raw',
      decision_at: null,
      accepted_evidence_id: null,
      evidence,
      raw_evidence: Object.assign({}, evidence),
      contradiction_marker: evidence.contradiction_marker,
      source_confidence: evidence.source_confidence,
      source_gap_warnings: evidence.source_gap_warnings,
      evidence_to_claim_links: evidence.evidence_to_claim_links,
      review_notes: options.review_notes || 'Raw imported evidence candidate; classify, link, and review before promotion.'
    };
  }
  function reviewStage(item){
    if(!item) return 'unknown';
    if(item.status === 'accepted') return 'accepted';
    if(item.status === 'rejected') return 'rejected';
    if(item.status === 'needs_edit') return 'reviewed';
    return item.review_stage || 'raw';
  }
  function reviewReport(queue = [], options = {}){
    const items = Array.isArray(queue) ? queue : [];
    const evidenceItems = items.map((item) => normalizeWorkspaceCandidate(item.evidence || {}, {origin:item.import_id || 'review_queue'}));
    const sourceTypes = [...new Set(evidenceItems.map((item) => item.source_type).filter(Boolean))];
    const confidenceMix = CONFIDENCE.reduce((acc, key) => { acc[key] = evidenceItems.filter((item) => item.source_confidence === key).length; return acc; }, {});
    const stageCounts = ['raw','reviewed','accepted','rejected'].reduce((acc, stage) => { acc[stage] = items.filter((item) => reviewStage(item) === stage).length; return acc; }, {});
    const pending = items.filter((item) => item.status === 'pending' || item.status === 'needs_edit').length;
    const accepted = items.filter((item) => item.status === 'accepted').length;
    const rejected = items.filter((item) => item.status === 'rejected').length;
    const gapWarningCount = evidenceItems.reduce((sum, item) => sum + (item.source_gap_warnings || []).length, 0);
    const linkCount = evidenceItems.reduce((sum, item) => sum + (item.evidence_to_claim_links || []).length, 0);
    const contradictionCount = evidenceItems.filter((item) => item.contradiction_marker).length;
    return {
      review_version: options.version || VERSION,
      workspace_version: VERSION,
      generated_at: options.now || nowIso(),
      queue_count: items.length,
      raw_count: stageCounts.raw,
      reviewed_count: stageCounts.reviewed,
      pending_count: pending,
      accepted_count: accepted,
      rejected_count: rejected,
      resolved_count: accepted + rejected,
      contradiction_candidate_count: contradictionCount,
      source_gap_warning_count: gapWarningCount,
      source_type_count: sourceTypes.length,
      source_types: sourceTypes,
      source_confidence_mix: confidenceMix,
      evidence_link_count: linkCount,
      live_fetching_performed: false,
      verification_claimed: false,
      queue_only: true,
      readiness: pending ? 'review_required' : (items.length ? 'review_resolved' : 'empty'),
      release_gate: pending || gapWarningCount ? 'evidence_workspace_review_required' : 'review_resolved'
    };
  }
  function importReportEnhancement(parsedReport = {}, evidence = []){
    const items = evidence.map((item) => normalizeWorkspaceCandidate(item, {origin:parsedReport.input_format || 'source_import'}));
    return Object.assign({}, parsedReport, {
      import_adapter_model: 'source_import_v2',
      workspace_version: VERSION,
      raw_candidate_count: items.length,
      contradiction_candidate_count: items.filter((item) => item.contradiction_marker).length,
      source_gap_warning_count: items.reduce((sum, item) => sum + (item.source_gap_warnings || []).length, 0),
      evidence_link_count: items.reduce((sum, item) => sum + (item.evidence_to_claim_links || []).length, 0),
      source_confidence_mix: CONFIDENCE.reduce((acc, key) => { acc[key] = items.filter((item) => item.source_confidence === key).length; return acc; }, {}),
      queue_only: true,
      live_fetching_performed: false,
      verification_claimed: false,
      release_gate: 'evidence_workspace_review_required',
      policy: 'manual_source_import_v2_no_fetch_no_verification'
    });
  }
  function workspaceSummary(state = {}, options = {}){
    const evidence = Array.isArray(state.evidence) ? state.evidence : [];
    const queue = Array.isArray(state.evidence_review_queue) ? state.evidence_review_queue : [];
    const normalizedEvidence = evidence.map((item) => normalizeWorkspaceCandidate(item, {origin:'evidence_matrix'}));
    const matrixGapCount = normalizedEvidence.reduce((sum, item) => sum + (item.source_gap_warnings || []).length, 0);
    return {
      workspace_version: options.version || VERSION,
      generated_at: options.now || nowIso(),
      matrix_count: evidence.length,
      review_queue: reviewReport(queue, options),
      accepted_matrix_contradiction_count: normalizedEvidence.filter((item) => item.contradiction_marker).length,
      accepted_matrix_gap_warning_count: matrixGapCount,
      source_import_count: Array.isArray(state.source_imports) ? state.source_imports.length : 0,
      live_fetching_performed: false,
      verification_claimed: false,
      release_gate: queue.some((item) => item.status === 'pending' || item.status === 'needs_edit') || matrixGapCount ? 'evidence_workspace_review_required' : 'workspace_review_resolved'
    };
  }

  root.evidenceWorkspace = Object.freeze({
    VERSION,
    SOURCE_TYPES,
    CONFIDENCE,
    stableHash,
    validId,
    normalizeSourceType,
    normalizeConfidence,
    inferSourceConfidence,
    evidenceToClaimLinks,
    contradictionMarker,
    sourceGapWarnings,
    normalizeWorkspaceCandidate,
    buildReviewItem,
    reviewReport,
    importReportEnhancement,
    workspaceSummary
  });
})(typeof window !== 'undefined' ? window : globalThis);
