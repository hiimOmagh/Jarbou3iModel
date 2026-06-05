/* Extracted from src/research-engine.js for v1.4.0-alpha.45. */
(function(global){
  'use strict';

  function renderQuality(ctx){
    const { buildResearchPlannerReport, state, buildStrategicEvidenceGraph, buildProviderRouterBundle, qualityScores, qualityGateReport, $, esc, tr, lDim, lStatus, localizedQualityAction, evidenceScoringReport, lBand, localizedPolicy, getLang } = ctx;
    const plannerReport = buildResearchPlannerReport(state.plan);
    const graphIntel = buildStrategicEvidenceGraph();
    const providerRouting = buildProviderRouterBundle();
    const scores = qualityScores();
    const report = qualityGateReport();
    const el = $('researchQualityOutput');
    if(!el) return;
    const rows = [
      ['qualityV3Score', scores.qualityV3],
      ['completenessScore', scores.completeness],
      ['evidenceStrengthScore', scores.evidenceStrength],
      ['evidenceReliabilityScore', scores.evidenceReliability],
      ['attentionSignalIntegrityScore', scores.attentionSignalIntegrity],
      ['contradictionCoverageScore', scores.contradictionCoverage],
      ['sourceDiversityScore', scores.sourceDiversity],
      ['actorLayerCoverageScore', scores.actorLayerCoverage],
      ['causalLinkDensityScore', scores.causalLinkDensity],
      ['providerSafetyScore', scores.providerSafety],
      ['privacySafetyScore', scores.privacySafety],
      ['migrationSafetyScore', scores.migrationSafety],
      ['templateScore', scores.templateFit],
      ['readiness', scores.readiness],
      ['sourcePlanningScore', scores.sourcePlanning],
      ['sourcePolicyScore', scores.sourcePolicyScore],
      ['sourceFixtureScore', scores.sourceFixtures],
      ['sourceImportScore', scores.sourceImport],
      ['evidenceReviewScore', scores.evidenceReview],
      ['providerIdentityScore', scores.providerIdentity],
      ['responseValidationScore', scores.responseValidation],
      ['contractFixtureScore', scores.contractFixtures]
    ];
    const scoreHtml = rows.map(([label,value]) => '<div class="researchScore"><span>' + esc(tr(label)) + '</span><strong>' + esc(value) + '</strong><meter min="0" max="100" value="' + esc(value) + '"></meter></div>').join('');
    const weakestHtml = report.weakest_dimensions.map(item => '<li><strong>' + esc(lDim(item.dimension)) + '</strong>: ' + esc(item.score) + ' · ' + esc(lStatus(item.severity)) + '</li>').join('');
    const actionsHtml = report.fix_actions.map(action => '<li>' + esc(localizedQualityAction(action)) + '</li>').join('');
    const scoringReport = evidenceScoringReport();
    const scoringHtml = '<div class="researchJsonCard evidenceScoringCard"><h4>' + esc(tr('qualityScoringTitle')) + '</h4><div class="miniChips"><span>' + esc(tr('reliabilityLabel')) + ' ' + esc(scoringReport.average_reliability_score || 0) + '/100 · ' + esc(lBand(scoringReport.reliability_band || '—')) + '</span><span>' + esc(tr('attentionLabel')) + ' ' + esc(scoringReport.average_attention_signal_score || 0) + '/100 · ' + esc(lBand(scoringReport.attention_band || '—')) + '</span><span>' + esc(tr('traceabilityLabel')) + ' ' + esc(scoringReport.average_traceability_score || 0) + '/100 · ' + esc(lBand(scoringReport.traceability_band || '—')) + '</span><span>' + esc(tr('calibrationWarnings')) + ' ' + esc(scoringReport.calibration_warning_count || 0) + '</span></div><small>' + esc(localizedPolicy(scoringReport.policy || '')) + '</small><small>' + esc(tr('evidenceScoringPolicyNote')) + ' ' + esc(tr('guardLabel')) + ': ' + esc(lStatus(scoringReport.score_theater_guard || 'score_theater_guard')) + '</small></div>';
    const gq = graphIntel.graph_quality_report || {}, ge = graphIntel.graph_export_report || {}, gl = getLang();
    const gt = gl === 'ar' ? 'رسم الأدلة الاستراتيجية' : gl === 'fr' ? 'graphe stratégique des preuves' : 'strategic evidence graph';
    const gf = (gq.graph_gap_flags || []).length ? gq.graph_gap_flags.join(', ') : 'none';
    const fm = (ge.formats || []).length ? ge.formats.join(', ') : 'none';
    const graphHtml = '<div class="researchJsonCard strategicEvidenceGraphSummary" data-browser-qa="strategic-evidence-graph"><h4>' + esc(gt) + '</h4><div class="miniChips"><span>graph nodes ' + esc(gq.node_count || 0) + '</span><span>edges ' + esc(gq.edge_count || 0) + '</span><span>formats: ' + esc(fm) + '</span><span>gate: ' + esc(lStatus(gq.release_gate || graphIntel.release_gate || 'graph_review_required')) + '</span></div><small>graph gaps: ' + esc(gf) + ' · no live fetching · no automatic source verification</small></div>';
    const reportHtml = scoringHtml + graphHtml + '<div class="researchJsonCard qualityGateV3Card"><h4>' + esc(tr('publicationReadiness')) + ': ' + esc(lStatus(report.publication_readiness)) + '</h4><div class="miniChips"><span>' + esc(lStatus(report.release_gate)) + '</span><span>' + esc(report.overall_score) + '/100</span><span>' + esc(report.blockers.length) + ' ' + esc(tr('blockers')) + '</span></div><h5>' + esc(tr('weakestDimensions')) + '</h5><ul>' + weakestHtml + '</ul><h5>' + esc(tr('fixActions')) + '</h5><ul>' + actionsHtml + '</ul></div>';
    const proofSurfaceHtml = '<div class="qualityExportProofSurface" data-browser-qa="quality-export-proof-surface" style="box-sizing:border-box;display:flex;align-items:center;gap:12px;width:100%;min-height:56px;padding:10px 14px;"><span>Quality</span><span>Evidence scoring calibration</span><span>Publication</span></div>';
    el.innerHTML = proofSurfaceHtml + scoreHtml + reportHtml;
  }

  global.Jarbou3iResearchModules = global.Jarbou3iResearchModules || {};
  global.Jarbou3iResearchModules.qualityRenderer = Object.freeze({
    renderQuality
  });
})(typeof window !== 'undefined' ? window : globalThis);
