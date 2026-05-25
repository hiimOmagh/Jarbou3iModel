/* Jarbou3i Research Engine source packet builder v1.1.0. Local/manual only. */
(function(global){
  'use strict';
  const root = global.Jarbou3iResearchModules = global.Jarbou3iResearchModules || {};
  const VERSION = '1.3.0-alpha.4';
  const BUILDER_VERSION = 'source_packet_builder.v1';
  const PACKET_SCHEMA = 'manual_source_packet.v1';
  function text(value, fallback = ''){ return String(value ?? fallback).trim(); }
  function arr(value){ return Array.isArray(value) ? value : (value === undefined || value === null || value === '' ? [] : [value]); }
  function now(options = {}){ return options.now || new Date().toISOString(); }
  function stableHash(value){ const s = typeof value === 'string' ? value : JSON.stringify(value || {}); let h = 0; for(let i = 0; i < s.length; i += 1) h = Math.imul(31, h) + s.charCodeAt(i) | 0; return Math.abs(h).toString(36).padStart(6, '0'); }
  function sourceType(value){ return text(value || 'other').toLowerCase().replace(/\s+/g, '_'); }
  function engagementFromEvidence(item = {}){
    const score = Number(item.public_signal_score || item.evidence_scoring?.attention_signal_score || 0);
    return {
      upvotes: 0,
      comments: 0,
      views: 0,
      attention_signal_score: Number.isFinite(score) ? score : 0,
      derived_from_manual_score: true
    };
  }
  function evidenceToPacketEvidence(item = {}){
    const scoring = item.evidence_scoring || {};
    return {
      claim: text(item.claim),
      quote: text(item.notes || '').replace(/^Quote\/excerpt:\s*/i, '').slice(0, 500),
      confidence: text(item.confidence || 'medium'),
      supports: arr(item.supports).map(String),
      contradicts: arr(item.contradicts).map(String),
      scoring_review: {
        reliability_score: Number(scoring.reliability_score || 0),
        attention_signal_score: Number(scoring.attention_signal_score || 0),
        traceability_score: Number(scoring.traceability_score || 0),
        synthesis_weight: Number(scoring.synthesis_weight || 0),
        reliability_band: text(scoring.reliability_band || 'low'),
        attention_band: text(scoring.attention_band || 'low'),
        risk_flags: arr(scoring.risk_flags).map(String),
        calibration_warnings: arr(scoring.calibration_warnings).map(String),
        attention_is_truth_score: false
      }
    };
  }
  function groupEvidence(items = []){
    const groups = new Map();
    arr(items).forEach((item) => {
      if(!item || typeof item !== 'object') return;
      const key = [sourceType(item.source_type), text(item.source_title || 'Untitled source'), text(item.source_url || '')].join('||');
      if(!groups.has(key)){
        groups.set(key, {
          packet_id: 'packet-' + stableHash(key),
          source_type: sourceType(item.source_type),
          title: text(item.source_title || 'Untitled source'),
          url: text(item.source_url || ''),
          captured_at: text(item.source_date) && text(item.source_date) !== 'unknown' ? text(item.source_date) : now(),
          freshness_window_days: Number(item.time_relevance_score || 3) >= 4 ? 30 : 90,
          engagement: engagementFromEvidence(item),
          evidence: []
        });
      }
      groups.get(key).evidence.push(evidenceToPacketEvidence(item));
    });
    return [...groups.values()];
  }
  function scoringReviewSummary(items = []){
    const evidence = arr(items).filter((item) => item && typeof item === 'object');
    const flags = evidence.flatMap((item) => arr(item.evidence_scoring?.risk_flags));
    const warnings = evidence.flatMap((item) => arr(item.evidence_scoring?.calibration_warnings));
    const weakTraceability = evidence.filter((item) => Number(item.evidence_scoring?.traceability_score || 0) < 45).length;
    const attentionWithoutReliability = evidence.filter((item) => arr(item.evidence_scoring?.risk_flags).includes('attention_without_reliability')).length;
    const highReliability = evidence.filter((item) => Number(item.evidence_scoring?.reliability_score || 0) >= 70).length;
    const needsReview = weakTraceability + attentionWithoutReliability + warnings.length;
    return {
      review_version: VERSION,
      builder_version: BUILDER_VERSION,
      item_count: evidence.length,
      high_reliability_count: highReliability,
      weak_traceability_count: weakTraceability,
      attention_without_reliability_count: attentionWithoutReliability,
      calibration_warning_count: warnings.length,
      risk_flags: [...new Set(flags.map(String).filter(Boolean))],
      calibration_warnings: [...new Set(warnings.map(String).filter(Boolean))],
      release_gate: needsReview ? 'review_required' : 'builder_review_pass',
      explanation: 'Builder review summarizes scoring flags. It does not verify source truth or perform live fetching.'
    };
  }
  function reviewControlsForEvidence(item = {}){
    const scoring = item.evidence_scoring || {};
    const flags = arr(scoring.risk_flags);
    const warnings = arr(scoring.calibration_warnings);
    const reliability = Number(scoring.reliability_score || 0);
    const trace = Number(scoring.traceability_score || 0);
    const controls = [];
    if(trace < 45 || flags.includes('weak_traceability')) controls.push('request_source_metadata');
    if(flags.includes('attention_without_reliability')) controls.push('downgrade_attention_claim');
    if(warnings.length) controls.push('review_calibration_warning');
    if(reliability >= 70 && !warnings.length) controls.push('eligible_for_acceptance');
    return {
      controls_version: VERSION,
      review_gate: controls.length && !controls.includes('eligible_for_acceptance') ? 'needs_edit' : 'reviewable',
      recommended_action: controls.includes('request_source_metadata') || controls.includes('downgrade_attention_claim') ? 'needs_edit' : 'accept_or_reject',
      controls,
      attention_is_truth_score: false
    };
  }
  function buildSourcePacket(items = [], options = {}){
    const evidence = arr(items).filter((item) => item && typeof item === 'object' && text(item.claim));
    const sourcePackets = groupEvidence(evidence);
    const review = scoringReviewSummary(evidence);
    const builtAt = now(options);
    return {
      source_packet_version: PACKET_SCHEMA,
      builder_version: BUILDER_VERSION,
      workflow_version: VERSION,
      built_at: builtAt,
      source_packets: sourcePackets,
      builder_report: {
        builder_version: VERSION,
        packet_schema: PACKET_SCHEMA,
        built_at: builtAt,
        packet_count: sourcePackets.length,
        evidence_item_count: evidence.length,
        live_fetching_performed: false,
        verification_claimed: false,
        queue_only_recommended: true,
        scoring_review: review,
        policy: 'local_manual_source_packet_builder_no_fetch_no_verification'
      }
    };
  }
  root.sourcePacketBuilder = Object.freeze({
    VERSION,
    BUILDER_VERSION,
    PACKET_SCHEMA,
    buildSourcePacket,
    scoringReviewSummary,
    reviewControlsForEvidence,
    evidenceToPacketEvidence
  });
})(typeof window !== 'undefined' ? window : globalThis);
