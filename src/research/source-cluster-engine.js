/* Jarbou3i Research Engine entity intelligence layer v1.1.0-rc.2-fix.2. No live fetching. */
(function(global){
  'use strict';
  const root = global.Jarbou3iResearchModules = global.Jarbou3iResearchModules || {};
  const VERSION = '1.1.0-rc.2-fix.2';
  const STOPWORDS = new Set('the a an and or but of for to in on at by with from into over under after before between about against through during without within is are was were be been being this that these those as it its their his her our your not no yes do does did has have had will would should could may might can than then if when where what why how'.split(' '));
  const STRATEGIC_SOURCE_TYPES = ['official','academic','primary','news','expert','market','social','other'];

  function text(value, fallback = ''){ return String(value ?? fallback).trim(); }
  function asArray(value){ return Array.isArray(value) ? value.filter(Boolean) : (value === undefined || value === null || value === '' ? [] : [value]); }
  function unique(values){ return [...new Set((values || []).filter(Boolean).map(String))]; }
  function clamp(value, min = 0, max = 100, fallback = 0){ const n = Number(value); return Math.max(min, Math.min(max, Number.isFinite(n) ? n : fallback)); }
  function score5(value, fallback = 3){ return clamp(value, 1, 5, fallback); }
  function hostFromUrl(url){ try { return new URL(text(url)).hostname.replace(/^www\./,''); } catch (_) { return ''; } }
  function normalizeClaim(value){ return text(value).toLowerCase().replace(/https?:\/\/\S+/g, ' ').replace(/[^\p{L}\p{N}\s]/gu, ' ').replace(/\s+/g, ' ').trim(); }
  function claimTokens(value){ return normalizeClaim(value).split(/\s+/).filter((token) => token.length > 2 && !STOPWORDS.has(token)).slice(0, 64); }
  function jaccard(a, b){ const aa = new Set(a || []); const bb = new Set(b || []); if(!aa.size || !bb.size) return 0; let hit = 0; for(const token of aa) if(bb.has(token)) hit += 1; return hit / Math.max(aa.size, bb.size); }
  function average(values, fallback = 0){ const nums = (values || []).map(Number).filter(Number.isFinite); return nums.length ? nums.reduce((sum, value) => sum + value, 0) / nums.length : fallback; }
  function confidenceRank(value){ return ({low:1, medium:2, high:3})[text(value || 'medium').toLowerCase()] || 2; }
  function confidenceFromRank(rank){ return rank >= 2.66 ? 'high' : rank <= 1.33 ? 'low' : 'medium'; }
  function layerFromTarget(target, fallbackLayer){
    if(typeof fallbackLayer === 'function') return fallbackLayer(target);
    const prefix = text(target).replace(/[0-9]/g,'');
    return ({I:'interests',A:'actors',T:'tools',N:'narrative',R:'results',F:'feedback',S:'scenarios',C:'contradictions'})[prefix] || 'other';
  }
  function targetIds(item){ return unique([...asArray(item.supports), ...asArray(item.contradicts)]).filter((id) => /^[A-Z]+\d+$/i.test(id)); }
  function canonicalSourceId(item){
    const host = hostFromUrl(item.source_url);
    if(host) return host;
    const title = text(item.source_title).toLowerCase().replace(/[^a-z0-9]+/gi,'-').replace(/^-|-$/g,'');
    return title || 'unsourced';
  }
  function clusterKeyFor(item){
    const ids = targetIds(item);
    if(ids.length) return `target:${ids.sort().join('+')}`;
    const tokens = claimTokens(item.claim || item.notes || item.source_title).slice(0, 7);
    return `claim:${tokens.join('-') || 'unlinked'}`;
  }
  function duplicateGroups(items, threshold = 0.62){
    const groups = [];
    const used = new Set();
    const rows = items.map((item, index) => ({index, item, tokens: claimTokens(item.claim)}));
    for(const row of rows){
      if(used.has(row.index)) continue;
      const group = [row.index];
      used.add(row.index);
      for(const other of rows){
        if(used.has(other.index)) continue;
        const sameSource = canonicalSourceId(row.item) && canonicalSourceId(row.item) === canonicalSourceId(other.item);
        const similarity = jaccard(row.tokens, other.tokens);
        if(similarity >= threshold || (sameSource && similarity >= 0.42)){
          group.push(other.index);
          used.add(other.index);
        }
      }
      if(group.length > 1) groups.push(group.map((index) => items[index].evidence_id || `E${index + 1}`));
    }
    return groups;
  }
  function clusterGapFlags(items, sourceTypes, domains){
    const flags = [];
    const dated = items.filter((item) => text(item.source_date) && item.source_date !== 'unknown').length;
    const urls = items.filter((item) => text(item.source_url)).length;
    const contradictions = items.filter((item) => asArray(item.contradicts).length).length;
    if(items.length < 2) flags.push('single_evidence_cluster');
    if(sourceTypes.length < 2 && items.length > 1) flags.push('source_type_concentration');
    if(domains.length < 2 && urls > 1) flags.push('domain_concentration');
    if(!sourceTypes.some((type) => ['official','academic','primary'].includes(type))) flags.push('no_primary_or_high_reliability_source');
    if(!contradictions) flags.push('counter_evidence_absent');
    if(dated < Math.min(2, items.length)) flags.push('source_dates_incomplete');
    if(urls < Math.min(2, items.length)) flags.push('source_urls_incomplete');
    if(sourceTypes.includes('social') && !sourceTypes.some((type) => ['official','academic','primary','news'].includes(type))) flags.push('social_only_cluster');
    return flags;
  }
  function clusterScores(items){
    const reliability = average(items.map((item) => item.evidence_scoring?.reliability_score), null);
    const attention = average(items.map((item) => item.evidence_scoring?.attention_signal_score), null);
    const weight = average(items.map((item) => item.evidence_scoring?.synthesis_weight), null);
    const strength = average(items.map((item) => score5(item.evidence_strength, 3)), 3);
    const datedPct = items.length ? items.filter((item) => text(item.source_date) && item.source_date !== 'unknown').length / items.length : 0;
    const urlPct = items.length ? items.filter((item) => text(item.source_url)).length / items.length : 0;
    return {
      reliability_score: Math.round(reliability ?? ((strength / 5) * 70 + urlPct * 20 + datedPct * 10)),
      attention_signal_score: Math.round(attention ?? average(items.map((item) => score5(item.public_signal_score, 1) * 20), 20)),
      synthesis_weight: Math.round(weight ?? ((strength / 5) * 50 + urlPct * 25 + datedPct * 25)),
      traceability_score: Math.round((urlPct * 55) + (datedPct * 45))
    };
  }
  function labelForCluster(target, items){
    if(target && target !== 'UNLINKED') return target;
    const first = text(items[0]?.claim || items[0]?.source_title || 'Unlinked evidence cluster');
    return first.length > 72 ? `${first.slice(0,69)}…` : first;
  }
  function buildClusterRecord(target, items, index, options = {}){
    const sourceTypes = unique(items.map((item) => text(item.source_type || 'other').toLowerCase() || 'other'));
    const domains = unique(items.map(hostFromEvidence).filter(Boolean));
    const titles = unique(items.map((item) => item.source_title || '').filter(Boolean)).slice(0, 12);
    const scores = clusterScores(items);
    const duplicates = duplicateGroups(items);
    const gapFlags = clusterGapFlags(items, sourceTypes, domains);
    const contradictions = items.filter((item) => asArray(item.contradicts).includes(target) || asArray(item.contradicts).length).length;
    const avgStrength = average(items.map((item) => score5(item.evidence_strength, 3)), 3);
    const avgConfidence = confidenceFromRank(average(items.map((item) => confidenceRank(item.confidence)), 2));
    return {
      cluster_id: `CL${index + 1}`,
      cluster_version: VERSION,
      cluster_model: 'source_cluster_gap_intelligence.v1',
      cluster_key: target && target !== 'UNLINKED' ? `target:${target}` : clusterKeyFor(items[0] || {}),
      target_id: target || 'UNLINKED',
      layer: layerFromTarget(target, options.layerFromId),
      cluster_label: labelForCluster(target, items),
      primary_claim: text(items[0]?.claim || items[0]?.source_title || ''),
      evidence_ids: items.map((item, i) => item.evidence_id || `E${i + 1}`),
      claims: items.map((item) => text(item.claim)).filter(Boolean),
      source_types: sourceTypes,
      source_domains: domains,
      source_titles: titles,
      source_count: domains.length || titles.length,
      evidence_count: items.length,
      average_strength: Number(avgStrength.toFixed(2)),
      contradiction_count: contradictions,
      confidence_mix: unique(items.map((item) => item.confidence || 'medium')),
      dominant_confidence: avgConfidence,
      duplicate_groups: duplicates,
      duplicate_count: duplicates.reduce((sum, group) => sum + Math.max(0, group.length - 1), 0),
      overlap_score: Math.round(average(pairwiseSimilarities(items), 0) * 100),
      reliability_score: clamp(scores.reliability_score, 0, 100),
      attention_signal_score: clamp(scores.attention_signal_score, 0, 100),
      synthesis_weight: clamp(scores.synthesis_weight, 0, 100),
      traceability_score: clamp(scores.traceability_score, 0, 100),
      has_counter_evidence: contradictions > 0,
      gap_flags: gapFlags,
      review_gate: gapFlags.length ? 'cluster_review_required' : 'cluster_ready',
      live_fetching_performed: false,
      verification_claimed: false
    };
  }
  function hostFromEvidence(item){ return hostFromUrl(item.source_url); }
  function pairwiseSimilarities(items){
    const sims = [];
    const tokens = items.map((item) => claimTokens(item.claim));
    for(let i = 0; i < tokens.length; i += 1){
      for(let j = i + 1; j < tokens.length; j += 1) sims.push(jaccard(tokens[i], tokens[j]));
    }
    return sims;
  }
  function groupEvidence(items){
    const map = new Map();
    for(const item of items || []){
      const ids = targetIds(item);
      const targets = ids.length ? ids : ['UNLINKED'];
      for(const target of targets){
        if(!map.has(target)) map.set(target, []);
        map.get(target).push(item);
      }
    }
    return map;
  }
  function buildSourceClusters(evidence = [], options = {}){
    const groups = groupEvidence(evidence);
    return [...groups.entries()].map(([target, items], index) => buildClusterRecord(target, items, index, options));
  }
  function globalGapFlags(evidence = [], clusters = []){
    const sourceTypes = unique(evidence.map((item) => text(item.source_type || 'other').toLowerCase() || 'other'));
    const domains = unique(evidence.map(hostFromEvidence).filter(Boolean));
    const flags = [];
    if(!evidence.length) flags.push('evidence_empty');
    if(evidence.length > 0 && evidence.length < 5) flags.push('evidence_volume_below_research_threshold');
    if(sourceTypes.length < 3 && evidence.length >= 3) flags.push('source_type_diversity_low');
    if(!sourceTypes.some((type) => ['official','academic','primary'].includes(type))) flags.push('high_reliability_source_gap');
    if(!evidence.some((item) => asArray(item.contradicts).length)) flags.push('counter_evidence_missing');
    if(evidence.filter((item) => text(item.source_url)).length < Math.min(3, evidence.length)) flags.push('source_urls_below_traceability_threshold');
    if(evidence.filter((item) => text(item.source_date) && item.source_date !== 'unknown').length < Math.min(3, evidence.length)) flags.push('source_dates_below_traceability_threshold');
    if(domains.length <= 1 && evidence.filter((item) => text(item.source_url)).length > 1) flags.push('domain_concentration_risk');
    if(clusters.some((cluster) => cluster.duplicate_count > 0)) flags.push('duplicate_or_overlap_review_required');
    if(clusters.some((cluster) => cluster.gap_flags.includes('social_only_cluster'))) flags.push('social_attention_without_confirmation');
    return unique(flags);
  }
  function buildGapRecommendations(flags = []){
    const map = {
      evidence_empty: 'Add evidence before generating source clusters.',
      evidence_volume_below_research_threshold: 'Add at least five reviewed evidence items before treating the synthesis as publication-ready.',
      source_type_diversity_low: 'Add sources from at least three source types to reduce monoculture bias.',
      high_reliability_source_gap: 'Add at least one official, academic, or primary source for traceability.',
      counter_evidence_missing: 'Add explicit counter-evidence or contradiction-linked evidence before final synthesis.',
      source_urls_below_traceability_threshold: 'Add URLs for source-based claims or mark claims as manual notes.',
      source_dates_below_traceability_threshold: 'Add publication/capture dates for time-sensitive claims.',
      domain_concentration_risk: 'Diversify domains so one site does not dominate the evidence set.',
      duplicate_or_overlap_review_required: 'Review duplicate/overlapping evidence before weighing clusters.',
      social_attention_without_confirmation: 'Confirm social-only signals with stronger source types before using them as evidence of fact.'
    };
    return unique(flags.map((flag) => map[flag] || `Review source gap: ${flag}`));
  }
  function buildSourceGapReport(evidence = [], clusters = [], options = {}){
    const flags = globalGapFlags(evidence, clusters);
    const clusterRiskFlags = unique(clusters.flatMap((cluster) => cluster.gap_flags || []));
    const releaseGate = flags.length || clusterRiskFlags.length ? 'review_required' : 'source_clusters_ready';
    return {
      source_gap_report_version: options.version || VERSION,
      source_cluster_report_version: options.version || VERSION,
      cluster_model: 'source_cluster_gap_intelligence.v1',
      generated_at: options.now || new Date().toISOString(),
      evidence_count: evidence.length,
      cluster_count: clusters.length,
      duplicate_cluster_count: clusters.filter((cluster) => cluster.duplicate_count > 0).length,
      review_required_cluster_count: clusters.filter((cluster) => cluster.review_gate !== 'cluster_ready').length,
      source_type_count: unique(evidence.map((item) => item.source_type || 'other')).length,
      domain_count: unique(evidence.map(hostFromEvidence).filter(Boolean)).length,
      global_gap_flags: flags,
      cluster_gap_flags: clusterRiskFlags,
      recommendations: buildGapRecommendations([...flags, ...clusterRiskFlags]),
      release_gate: releaseGate,
      live_fetching_performed: false,
      verification_claimed: false,
      policy: 'local_review_only_source_cluster_gap_intelligence_no_fetch_no_verification'
    };
  }
  function buildSourceClusterIntelligence(evidence = [], options = {}){
    const clusters = buildSourceClusters(evidence, options);
    const gap_report = buildSourceGapReport(evidence, clusters, options);
    return {source_cluster_version: options.version || VERSION, clusters, gap_report, live_fetching_performed:false, verification_claimed:false};
  }

  root.sourceClusterEngine = Object.freeze({
    VERSION,
    STRATEGIC_SOURCE_TYPES,
    buildSourceClusters,
    buildSourceGapReport,
    buildSourceClusterIntelligence,
    duplicateGroups,
    claimTokens,
    jaccard
  });
})(typeof window !== 'undefined' ? window : globalThis);
