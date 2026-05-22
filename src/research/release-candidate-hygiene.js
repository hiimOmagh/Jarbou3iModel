/* Jarbou3i Research Engine release candidate hardening and final repo hygiene v1.1.0. */
(function(global){
  'use strict';
  const root = global.Jarbou3iResearchModules = global.Jarbou3iResearchModules || {};
  const VERSION = '1.1.0-fix.1';
  const MODEL = 'release_candidate_hygiene.v1';
  const REQUIRED_EXPORT_PATHS = Object.freeze([
    'export-manifest.json',
    'research-packet.json',
    'analysis-brief.md',
    'evidence-matrix.csv',
    'traceability/brief-traceability-report.json',
    'publication-review/publication-review-gate-report.json',
    'golden/golden-end-to-end-demo-report.json'
  ]);
  const FORBIDDEN_RUNTIME_EXPANSIONS = Object.freeze([
    'live_connector_expansion',
    'live_provider_execution_expansion',
    'oauth_backend_expansion',
    'broad_ui_redesign',
    'automatic_source_verification_claims'
  ]);
  function nowIso(){ return new Date().toISOString(); }
  function asArray(value){ return Array.isArray(value) ? value : []; }
  function text(value, fallback = ''){ return String(value ?? fallback).trim(); }
  function unique(values){ return [...new Set(asArray(values).filter(Boolean).map(String))]; }
  function bool(value){ return value === true; }
  function fileText(corpus, file){ return text(corpus?.files?.[file]); }
  function includesAny(value, terms){ const hay = text(value).toLowerCase(); return asArray(terms).some((term) => hay.includes(text(term).toLowerCase())); }
  function buildStaleReleaseCopySweep(corpus = {}, options = {}){
    const current = options.version || VERSION;
    const staleVersions = asArray(options.stale_versions || ['1.1.0-alpha.24','v1.1.0-alpha.24']);
    const protectedHistorical = asArray(options.protected_historical_files || ['docs/release-history.md']);
    const checkedFiles = Object.keys(corpus.files || {}).filter((file) => !protectedHistorical.includes(file));
    const staleMatches = [];
    for(const file of checkedFiles){
      const body = fileText(corpus, file);
      staleVersions.forEach((needle) => {
        if(body.includes(needle)) staleMatches.push({file, stale_token:needle});
      });
    }
    return {
      stale_release_copy_sweep_version:current,
      sweep_model:MODEL,
      generated_at:nowIso(),
      checked_file_count:checkedFiles.length,
      protected_historical_files:protectedHistorical,
      stale_match_count:staleMatches.length,
      stale_matches:staleMatches,
      release_gate:staleMatches.length ? 'stale_release_copy_review_required' : 'stale_release_copy_clear',
      live_fetching_performed:false,
      verification_claimed:false
    };
  }
  function buildFinalRepoHygieneReport(corpus = {}, options = {}){
    const current = options.version || VERSION;
    const files = Object.keys(corpus.files || {});
    const generatedRiskPatterns = ['node_modules/','playwright-report/','test-results/','dist/','.env','.dev.vars'];
    const archiveRiskPatterns = ['.zip','.tar.gz','.7z'];
    const generatedMatches = files.filter((file) => generatedRiskPatterns.some((pattern) => file.includes(pattern)) || archiveRiskPatterns.some((pattern) => file.endsWith(pattern)));
    const requiredDocs = ['README.md','CHANGELOG.md','PUBLIC_DEMO.md','docs/current-release.md','docs/qa-matrix.md'];
    const missingDocs = requiredDocs.filter((file) => !files.includes(file));
    const requiredModules = ['src/research/golden-workflow-corpus.js','src/research/publication-review-gate.js','src/research/evidence-pack-v3.js','src/research/export-pack.js'];
    const missingModules = requiredModules.filter((file) => !files.includes(file));
    const blockers = unique([
      ...generatedMatches.map((file) => `generated_or_archive_artifact:${file}`),
      ...missingDocs.map((file) => `required_doc_missing:${file}`),
      ...missingModules.map((file) => `required_module_missing:${file}`)
    ]);
    return {
      final_repo_hygiene_report_version:current,
      hygiene_model:MODEL,
      generated_at:nowIso(),
      checked_file_count:files.length,
      generated_artifact_match_count:generatedMatches.length,
      missing_required_doc_count:missingDocs.length,
      missing_required_module_count:missingModules.length,
      blockers,
      dead_cleanup_policy:{delete_generated_logs:true, delete_local_archives:true, preserve_release_history:true, preserve_golden_fixture:true},
      release_gate:blockers.length ? 'final_repo_hygiene_review_required' : 'final_repo_hygiene_clear',
      live_fetching_performed:false,
      verification_claimed:false
    };
  }
  function buildGoldenWorkflowRegressionLock(packet = {}, options = {}){
    const current = options.version || VERSION;
    const demo = packet.golden_end_to_end_demo_report || {};
    const exportValidation = packet.golden_export_pack_validation_report || {};
    const corpus = packet.golden_workflow_corpus || {};
    const blockers = [];
    if(demo.failed_stage_count !== 0) blockers.push('golden_demo_failed_stage_count_nonzero');
    if(asArray(exportValidation.missing_required_paths).length) blockers.push('golden_export_missing_required_paths');
    if(corpus.live_fetching_performed || demo.live_fetching_performed) blockers.push('golden_workflow_live_fetching_detected');
    if(corpus.provider_execution_performed || demo.provider_execution_performed) blockers.push('golden_workflow_provider_execution_detected');
    return {
      golden_workflow_regression_lock_version:current,
      lock_model:MODEL,
      generated_at:nowIso(),
      golden_demo_failed_stage_count:Number(demo.failed_stage_count || 0),
      golden_export_missing_required_path_count:asArray(exportValidation.missing_required_paths).length,
      deterministic:corpus.deterministic !== false,
      blockers,
      release_gate:blockers.length ? 'golden_workflow_regression_review_required' : 'golden_workflow_regression_locked',
      live_fetching_performed:false,
      provider_execution_performed:false,
      verification_claimed:false
    };
  }
  function buildExportPackArtifactConsistencyLock(packet = {}, exportPackResult = null, options = {}){
    const current = options.version || VERSION;
    const pack = exportPackResult || packet.export_pack_result || {};
    const files = asArray(pack.files).map((file) => file.path).filter(Boolean);
    const manifest = pack.manifest || packet.evidence_pack_v3_manifest || {};
    const missingRequiredPaths = REQUIRED_EXPORT_PATHS.filter((path) => !files.includes(path));
    const blockers = [];
    if((manifest.export_pack_format || packet.export_pack?.format) !== 'export_pack_v3') blockers.push('export_pack_format_not_v3');
    missingRequiredPaths.forEach((path) => blockers.push(`export_pack_missing:${path}`));
    if(packet.privacy_export?.release_gate && packet.privacy_export.release_gate !== 'pass') blockers.push('privacy_export_gate_not_pass');
    return {
      export_pack_artifact_consistency_lock_version:current,
      lock_model:MODEL,
      generated_at:nowIso(),
      required_export_paths:REQUIRED_EXPORT_PATHS.slice(),
      file_count:files.length,
      export_pack_format:manifest.export_pack_format || packet.export_pack?.format || 'unknown',
      missing_required_paths:missingRequiredPaths,
      blockers,
      release_gate:blockers.length ? 'export_pack_artifact_review_required' : 'export_pack_artifact_consistency_locked',
      live_fetching_performed:false,
      verification_claimed:false
    };
  }
  function buildHostedDemoEvidenceRunbook(packet = {}, options = {}){
    const current = options.version || VERSION;
    return {
      hosted_demo_evidence_runbook_version:current,
      runbook_model:MODEL,
      generated_at:nowIso(),
      required_metadata:{evidence_review_version:current, capture_polish_version:current, app_version:current, capture_count:4, all_required_captures_present:true, visual_artifact_guard_required:true, capture_settle_required:true},
      required_visible_text:['visible-text-en.json','visible-text-ar.json','visible-text-fr.json'],
      required_capture_files:['desktop-first-screen.png','desktop-analysis-brief.png','mobile-first-screen.png','mobile-provider-harness.png'],
      rejection_conditions:['metadata_version_mismatch','missing_required_capture','horizontal_overflow_detected','stale_release_copy_detected','browser_gate_failed'],
      review_order:['no-browser CI','browser CI','hosted metadata','visible-text snapshots','screenshot sanity','lock verdict'],
      release_gate:'hosted_demo_evidence_review_required',
      live_fetching_performed:false,
      verification_claimed:false
    };
  }
  function buildCiParityReport(ci = {}, options = {}){
    const current = options.version || VERSION;
    const noBrowser = bool(ci.no_browser_passed || ci.noBrowserPassed || ci.no_browser_green);
    const browser = bool(ci.browser_passed || ci.browserPassed || ci.browser_green);
    const hosted = bool(ci.hosted_evidence_accepted || ci.hostedEvidenceAccepted || ci.hosted_green);
    const blockers = [];
    if(!noBrowser) blockers.push('no_browser_ci_not_confirmed');
    if(!browser) blockers.push('browser_ci_not_confirmed');
    if(!hosted) blockers.push('hosted_evidence_not_confirmed');
    return {ci_parity_report_version:current, parity_model:MODEL, generated_at:nowIso(), no_browser_ci_passed:noBrowser, browser_ci_passed:browser, hosted_evidence_accepted:hosted, blockers, release_gate:blockers.length ? 'ci_parity_review_required' : 'ci_parity_ready_for_lock', live_fetching_performed:false, verification_claimed:false};
  }
  function buildReleaseCandidateReadinessReport(packet = {}, corpus = {}, exportPackResult = null, options = {}){
    const current = options.version || VERSION;
    const hygiene = packet.final_repo_hygiene_report || buildFinalRepoHygieneReport(corpus, options);
    const stale = packet.stale_release_copy_sweep || buildStaleReleaseCopySweep(corpus, options);
    const golden = packet.golden_workflow_regression_lock || buildGoldenWorkflowRegressionLock(packet, options);
    const exportLock = packet.export_pack_artifact_consistency_lock || buildExportPackArtifactConsistencyLock(packet, exportPackResult, options);
    const ci = packet.no_browser_browser_ci_parity_report || buildCiParityReport(packet.ci_validation || {}, options);
    const blockers = unique([...(hygiene.blockers || []), ...(stale.stale_matches || []).map((item) => `stale_release_copy:${item.file}`), ...(golden.blockers || []), ...(exportLock.blockers || []), ...(ci.blockers || [])]);
    return {
      release_candidate_readiness_report_version:current,
      readiness_model:MODEL,
      generated_at:nowIso(),
      readiness_score:Math.max(0, Math.min(100, 100 - blockers.length * 10)),
      blocker_count:blockers.length,
      blocker_reasons:blockers,
      release_gate:blockers.length ? 'release_candidate_hardening_review_required' : 'release_candidate_ready_for_browser_lock',
      required_next_steps:['Run GitHub no-browser CI','Run GitHub browser CI','Review hosted-demo evidence metadata','Review visible-text snapshots','Lock only after metadata version matches current release'],
      no_new_major_feature_surface:true,
      live_connector_expansion:false,
      live_provider_execution_expansion:false,
      oauth_backend_expansion:false,
      broad_ui_redesign:false,
      automatic_source_verification_claimed:false,
      live_fetching_performed:false,
      verification_claimed:false
    };
  }
  function buildReleaseCandidateHygieneBundle(packet = {}, corpus = {}, exportPackResult = null, options = {}){
    const stale = buildStaleReleaseCopySweep(corpus, options);
    const hygiene = buildFinalRepoHygieneReport(corpus, options);
    const golden = buildGoldenWorkflowRegressionLock(packet, options);
    const exportLock = buildExportPackArtifactConsistencyLock(packet, exportPackResult, options);
    const runbook = buildHostedDemoEvidenceRunbook(packet, options);
    const ci = buildCiParityReport(packet.ci_validation || {}, options);
    const readiness = buildReleaseCandidateReadinessReport(Object.assign({}, packet, {final_repo_hygiene_report:hygiene, stale_release_copy_sweep:stale, golden_workflow_regression_lock:golden, export_pack_artifact_consistency_lock:exportLock, no_browser_browser_ci_parity_report:ci}), corpus, exportPackResult, options);
    return {stale_release_copy_sweep:stale, final_repo_hygiene_report:hygiene, golden_workflow_regression_lock:golden, export_pack_artifact_consistency_lock:exportLock, hosted_demo_evidence_runbook:runbook, no_browser_browser_ci_parity_report:ci, release_candidate_readiness_report:readiness};
  }
  root.releaseCandidateHygiene = Object.freeze({VERSION, MODEL, REQUIRED_EXPORT_PATHS, FORBIDDEN_RUNTIME_EXPANSIONS, buildStaleReleaseCopySweep, buildFinalRepoHygieneReport, buildGoldenWorkflowRegressionLock, buildExportPackArtifactConsistencyLock, buildHostedDemoEvidenceRunbook, buildCiParityReport, buildReleaseCandidateReadinessReport, buildReleaseCandidateHygieneBundle});
  if(typeof module !== 'undefined' && module.exports) module.exports = root.releaseCandidateHygiene;
})(typeof window !== 'undefined' ? window : globalThis);
