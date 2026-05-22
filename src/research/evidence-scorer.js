/* Jarbou3i Research Engine source packet builder browser QA and UX tightening — v1.1.0-rc.2. Separates attention from reliability and explains score meaning. */
(function(global){
  'use strict';
  const root = global.Jarbou3iResearchModules = global.Jarbou3iResearchModules || {};
  const VERSION = '1.1.0-rc.2';
  const SCORING_VERSION = 'evidence_scoring.v1';
  const CALIBRATION_VERSION = 'evidence_scoring_calibration.v1';
  const SOURCE_RELIABILITY_BASE = Object.freeze({
    official: 86,
    academic: 84,
    primary: 82,
    news: 66,
    expert: 60,
    market: 56,
    social: 38,
    other: 28
  });
  const CONFIDENCE_WEIGHT = Object.freeze({low: 35, medium: 62, high: 85});
  const CALIBRATION_THRESHOLDS = Object.freeze({
    low: 0,
    moderate: 45,
    strong: 70,
    very_strong: 85,
    attention_warning: 70,
    reliability_floor_for_high_attention: 55,
    traceability_warning: 55
  });
  const EXPLANATION_POLICY = Object.freeze({
    reliability: 'Reliability = source strength, traceability, specificity, confidence, and recency.',
    attention: 'Attention = public visibility only. It is not a truth score.',
    synthesis_weight: 'Synthesis weight = prioritization aid, not automated truth.',
    review_gate: 'Scores are calibration aids; human review remains required for publication.'
  });

  function clamp(value, min = 0, max = 100){
    const n = Number(value);
    if(!Number.isFinite(n)) return min;
    return Math.max(min, Math.min(max, n));
  }
  function clamp5(value, fallback = 3){
    const n = Number(value);
    return Math.max(1, Math.min(5, Number.isFinite(n) ? n : fallback));
  }
  function arr(value){ return Array.isArray(value) ? value : []; }
  function text(value){ return String(value ?? '').trim(); }
  function sourceType(value){
    const v = text(value || 'other').toLowerCase();
    return Object.prototype.hasOwnProperty.call(SOURCE_RELIABILITY_BASE, v) ? v : 'other';
  }
  function confidenceScore(value){ return CONFIDENCE_WEIGHT[text(value || 'medium').toLowerCase()] || CONFIDENCE_WEIGHT.medium; }
  function round(value){ return Math.round(clamp(value)); }
  function hasKnownDate(value){
    const v = text(value).toLowerCase();
    return !!v && v !== 'unknown' && v !== 'n/a' && v !== 'null';
  }
  function engagementFrom(item = {}){
    return Object.assign({}, item.engagement || {}, item.import_meta?.engagement || {}, item.evidence_scoring?.engagement || {});
  }
  function numeric(value){ const n = Number(value); return Number.isFinite(n) && n >= 0 ? n : 0; }
  function engagementAttention(engagement = {}){
    const direct = numeric(engagement.upvotes) + numeric(engagement.likes) + numeric(engagement.comments) + numeric(engagement.shares) + numeric(engagement.saves);
    const views = numeric(engagement.views);
    const odds = numeric(engagement.odds_pct || engagement.probability_pct);
    if(views >= 1000000 || direct >= 20000) return 96;
    if(views >= 250000 || direct >= 7500) return 86;
    if(views >= 100000 || direct >= 5000) return 76;
    if(views >= 10000 || direct >= 1000) return 62;
    if(views > 0 || direct > 0) return 42;
    if(odds > 0) return Math.max(35, Math.min(80, odds));
    return 20;
  }
  function bandFor(value){
    const v = clamp(value);
    if(v >= CALIBRATION_THRESHOLDS.very_strong) return 'very_strong';
    if(v >= CALIBRATION_THRESHOLDS.strong) return 'strong';
    if(v >= CALIBRATION_THRESHOLDS.moderate) return 'moderate';
    return 'low';
  }
  function traceabilityScore(item = {}){
    return round(
      (text(item.source_url) ? 35 : 0) +
      (text(item.source_title) ? 20 : 0) +
      (hasKnownDate(item.source_date) ? 20 : 0) +
      (text(item.notes).includes('Quote/excerpt:') || text(item.import_meta?.raw_fingerprint || item.import_meta?.raw_hash) ? 15 : 0) +
      (text(item.source_type) ? 10 : 0)
    );
  }
  function specificityScore(item = {}){
    const strength = clamp5(item.evidence_strength, 3) * 20;
    const claim = text(item.claim);
    const claimSpecificity = claim.length >= 120 ? 85 : claim.length >= 70 ? 70 : claim.length >= 35 ? 55 : 35;
    return round((strength * 0.65) + (claimSpecificity * 0.35));
  }
  function recencyScore(item = {}){ return round(clamp5(item.time_relevance_score, hasKnownDate(item.source_date) ? 4 : 3) * 20); }
  function attentionSignalScore(item = {}){
    const fieldScore = clamp5(item.public_signal_score, 1) * 20;
    const engagement = engagementAttention(engagementFrom(item));
    return round(Math.max(fieldScore, engagement));
  }
  function contradictionValueScore(item = {}){
    const contrad = arr(item.contradicts).filter(Boolean).length;
    const supports = arr(item.supports).filter(Boolean).length;
    return round((contrad ? 70 + Math.min(20, contrad * 10) : 35) + Math.min(10, supports * 4));
  }
  function reliabilityScore(item = {}){
    const base = SOURCE_RELIABILITY_BASE[sourceType(item.source_type)];
    const trace = traceabilityScore(item);
    const specificity = specificityScore(item);
    const confidence = confidenceScore(item.confidence);
    const recency = recencyScore(item);
    return round((base * 0.32) + (trace * 0.25) + (specificity * 0.20) + (confidence * 0.15) + (recency * 0.08));
  }
  function riskFlags(item = {}, scores = {}){
    const flags = [];
    if(!text(item.source_url)) flags.push('no_source_url');
    if(!hasKnownDate(item.source_date)) flags.push('unknown_source_date');
    if(!arr(item.supports).length && !arr(item.contradicts).length) flags.push('no_layer_links');
    if(sourceType(item.source_type) === 'social' && scores.attention_signal_score >= CALIBRATION_THRESHOLDS.attention_warning) flags.push('high_attention_social_signal');
    if(scores.attention_signal_score >= CALIBRATION_THRESHOLDS.attention_warning && scores.reliability_score < CALIBRATION_THRESHOLDS.reliability_floor_for_high_attention) flags.push('attention_without_reliability');
    if(scores.traceability_score < CALIBRATION_THRESHOLDS.traceability_warning) flags.push('weak_traceability');
    return flags;
  }
  function calibrationWarnings(scores = {}){
    const warnings = [];
    if(scores.attention_signal_score >= CALIBRATION_THRESHOLDS.attention_warning && scores.reliability_score < CALIBRATION_THRESHOLDS.reliability_floor_for_high_attention) warnings.push('attention_signal_must_not_be_read_as_truth');
    if(scores.traceability_score < CALIBRATION_THRESHOLDS.traceability_warning) warnings.push('low_traceability_limits_publication_confidence');
    if(scores.reliability_score >= CALIBRATION_THRESHOLDS.strong && scores.attention_signal_score < CALIBRATION_THRESHOLDS.moderate) warnings.push('strong_low_attention_evidence_should_not_be_buried');
    if(scores.synthesis_weight >= CALIBRATION_THRESHOLDS.strong && scores.reliability_score < CALIBRATION_THRESHOLDS.strong) warnings.push('synthesis_weight_requires_reliability_context');
    return warnings;
  }
  function calibrateScores(scores = {}){
    const calibrated = {
      calibration_version: CALIBRATION_VERSION,
      reliability_band: bandFor(scores.reliability_score),
      attention_band: bandFor(scores.attention_signal_score),
      traceability_band: bandFor(scores.traceability_score),
      synthesis_band: bandFor(scores.synthesis_weight),
      calibration_warnings: calibrationWarnings(scores),
      calibration_profile: 'conservative_editorial_research',
      calibration_thresholds: CALIBRATION_THRESHOLDS,
      score_theater_guard: 'scores_explain_prioritization_not_truth',
      explanation_policy: EXPLANATION_POLICY
    };
    return calibrated;
  }
  function scoreEvidenceItem(item = {}, options = {}){
    const attention = attentionSignalScore(item);
    const trace = traceabilityScore(item);
    const specificity = specificityScore(item);
    const recency = recencyScore(item);
    const contradiction = contradictionValueScore(item);
    const reliability = reliabilityScore(item);
    const synthesis = round((reliability * 0.62) + (contradiction * 0.16) + (recency * 0.12) + (attention * 0.10));
    const scores = {
      scoring_version: SCORING_VERSION,
      scorer_version: VERSION,
      generated_at: options.now || new Date().toISOString(),
      attention_signal_score: attention,
      reliability_score: reliability,
      traceability_score: trace,
      specificity_score: specificity,
      recency_score: recency,
      contradiction_value_score: contradiction,
      synthesis_weight: synthesis,
      attention_is_truth_score: false,
      policy: 'attention_signal_is_not_evidence_reliability',
      risk_flags: []
    };
    scores.risk_flags = riskFlags(item, scores);
    return Object.assign(scores, calibrateScores(scores));
  }
  function attachEvidenceScoring(item = {}, options = {}){
    const existing = item && typeof item === 'object' ? item : {};
    return Object.assign({}, existing, { evidence_scoring: scoreEvidenceItem(existing, options) });
  }
  function scoreEvidenceSet(items = [], options = {}){
    const scored = arr(items).map((item) => attachEvidenceScoring(item, options));
    const scores = scored.map((item) => item.evidence_scoring || scoreEvidenceItem(item, options));
    const avg = (key) => scores.length ? round(scores.reduce((sum, score) => sum + Number(score[key] || 0), 0) / scores.length) : 0;
    const attentionDominance = scores.filter((score) => score.risk_flags.includes('attention_without_reliability')).length;
    const highReliability = scores.filter((score) => score.reliability_score >= CALIBRATION_THRESHOLDS.strong).length;
    const weakTraceability = scores.filter((score) => score.traceability_score < CALIBRATION_THRESHOLDS.traceability_warning).length;
    const socialHighAttention = scores.filter((score) => score.risk_flags.includes('high_attention_social_signal')).length;
    const calibrationWarningCount = scores.reduce((sum, score) => sum + arr(score.calibration_warnings).length, 0);
    return {
      evidence_scoring_version: VERSION,
      scoring_model: SCORING_VERSION,
      calibration_version: CALIBRATION_VERSION,
      generated_at: options.now || new Date().toISOString(),
      item_count: scored.length,
      average_reliability_score: avg('reliability_score'),
      average_attention_signal_score: avg('attention_signal_score'),
      average_traceability_score: avg('traceability_score'),
      average_synthesis_weight: avg('synthesis_weight'),
      high_reliability_count: highReliability,
      attention_dominance_risk_count: attentionDominance,
      high_attention_social_signal_count: socialHighAttention,
      weak_traceability_count: weakTraceability,
      calibration_warning_count: calibrationWarningCount,
      reliability_band: bandFor(avg('reliability_score')),
      attention_band: bandFor(avg('attention_signal_score')),
      traceability_band: bandFor(avg('traceability_score')),
      synthesis_band: bandFor(avg('synthesis_weight')),
      calibration_profile: 'conservative_editorial_research',
      calibration_thresholds: CALIBRATION_THRESHOLDS,
      score_theater_guard: 'scores_explain_prioritization_not_truth',
      explanation_policy: EXPLANATION_POLICY,
      policy: 'public attention is tracked separately from evidence reliability',
      release_gate: attentionDominance || weakTraceability ? 'review_required' : 'pass',
      risk_flags: [
        attentionDominance ? 'attention_without_reliability_present' : '',
        weakTraceability ? 'weak_traceability_present' : '',
        socialHighAttention ? 'social_attention_requires_context' : '',
        calibrationWarningCount ? 'calibration_warning_present' : ''
      ].filter(Boolean)
    };
  }
  root.evidenceScorer = Object.freeze({
    VERSION,
    SCORING_VERSION,
    CALIBRATION_VERSION,
    SOURCE_RELIABILITY_BASE,
    CALIBRATION_THRESHOLDS,
    EXPLANATION_POLICY,
    scoreEvidenceItem,
    attachEvidenceScoring,
    scoreEvidenceSet,
    calibrateScores,
    bandFor,
    attentionSignalScore,
    reliabilityScore,
    traceabilityScore,
    contradictionValueScore
  });
})(typeof window !== 'undefined' ? window : globalThis);
