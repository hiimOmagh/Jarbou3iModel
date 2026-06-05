/* Extracted from src/research-engine.js for v1.4.0-alpha.45. */
(function(global){
  'use strict';

  function buildCritique(ctx){
    const { VERSION, state, nowIso } = ctx;
    const evidenceCount = state.evidence.length;
    const urlCount = state.evidence.filter(e=>e.source_url).length;
    const datedCount = state.evidence.filter(e=>e.source_date && e.source_date !== 'unknown').length;
    const contradCount = state.evidence.filter(e=>e.contradicts?.length).length;
    const sourceTypes = new Set(state.evidence.map(e=>e.source_type).filter(Boolean));
    const linkCount = state.causal_links.length;
    return {
      critique_version: VERSION,
      generated_at: nowIso(),
      summary: evidenceCount >= 5 && linkCount >= 3 ? 'The workflow has a usable research packet, but source verification remains outside this alpha.' : 'The workflow is still under-evidenced or under-linked and should not be published.',
      findings: [
        {type:'evidence_volume', severity: evidenceCount >= 5 ? 'medium' : 'high', finding: evidenceCount >= 5 ? 'Evidence volume is acceptable for alpha synthesis.' : 'Add at least five evidence items before treating the analysis as serious.'},
        {type:'source_traceability', severity: urlCount >= 3 && datedCount >= 3 ? 'medium' : 'high', finding: 'Strong outputs require source URLs and dates; otherwise claims remain weakly traceable.'},
        {type:'source_diversity', severity: sourceTypes.size >= 3 ? 'medium' : 'high', finding: sourceTypes.size >= 3 ? 'Source-type diversity is emerging.' : 'Evidence is too concentrated in one or two source types.'},
        {type:'counter_evidence_gap', severity: contradCount ? 'medium' : 'high', finding: contradCount ? 'At least one evidence item includes contradiction links.' : 'No evidence item clearly contradicts any claim or layer.'},
        {type:'causal_risk', severity: linkCount >= 3 ? 'medium' : 'high', finding: linkCount >= 3 ? 'Causal links exist; still validate each relationship manually.' : 'Causal graph is too sparse for confident synthesis.'},
        {type:'publication_risk', severity:'high', finding:'Alpha mock output is useful for architecture testing, not for final publication.'}
      ],
      recommended_next_actions: [
        'Add at least five evidence items from diverse source types.',
        'Include source dates and URLs for source-based claims.',
        'Add counter-evidence before running final strategic synthesis.',
        'Use causal links to connect evidence to interests, actors, tools, narrative, results, and feedback.',
        'Test whether scenarios are disproven by contrary indicators.'
      ]
    };
  }

  global.Jarbou3iResearchModules = global.Jarbou3iResearchModules || {};
  global.Jarbou3iResearchModules.critiqueBuilder = Object.freeze({
    buildCritique
  });
})(typeof window !== 'undefined' ? window : globalThis);
