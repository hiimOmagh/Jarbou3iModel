/* Jarbou3i Research Engine adapter replay insight UX + operator decision surface v1.4.0-alpha.26. */
/* Operator-facing metadata-only replay insight layer. No network calls, no live provider execution, no OAuth/token lifecycle, no backend/storage/source behavior expansion. */
(function(global){
  'use strict';
  const root = global.Jarbou3iResearchModules = global.Jarbou3iResearchModules || {};

  const VERSION = '1.4.0-alpha.26';
  const MILESTONE = 'v1.4.0-alpha.26 — Adapter Replay Insight UX + Operator Decision Surface';
  const MODEL = 'adapter_replay_insight_ux_operator_decision_surface.v1';
  const COVERAGE_MATRIX_BASELINE = '1.4.0-alpha.14';
  const RELEASE_SYSTEM_BASELINE = '1.4.0-alpha.25';
  const FIXED_GENERATED_AT = '2026-05-30T00:00:00.000Z';

  const BOUNDARY_FLAGS = Object.freeze({
    operator_decision_surface_only: true,
    adapter_replay_metadata_only: true,
    deterministic_fixture_backed: true,
    no_network_replay_only: true,
    can_execute_now: false,
    network_invocation_allowed: false,
    live_provider_execution_enabled: false,
    live_provider_execution_performed: false,
    live_source_fetching_enabled: false,
    live_source_fetching_performed: false,
    hidden_network_calls_allowed: false,
    real_oauth_token_lifecycle_enabled: false,
    real_api_keys_stored: false,
    real_tokens_stored: false,
    credential_persistence_allowed: false,
    backend_storage_expanded: false,
    automatic_source_verification_claimed: false,
    automatic_signoff_performed: false,
    automatic_export_lock_performed: false,
    publication_permission_claimed: false
  });

  function asRecord(value){ return Object.prototype.toString.call(value) === '[object Object]' ? value : {}; }
  function asArray(value){ return Array.isArray(value) ? value : []; }
  function asString(value, fallback){ return typeof value === 'string' && value.trim() ? value.trim() : fallback; }
  function pct(value){ return `${Number(value || 0).toFixed(0)}%`; }
  function titleCaseToken(value){
    return String(value || 'unknown').replace(/_/g, ' ').replace(/\b\w/g, (m) => m.toUpperCase());
  }

  function getCoverageReport(options = {}){
    if (options.coverage_report) return options.coverage_report;
    const mod = root.adapterReplayFixtureCorpusCoverageMatrix;
    if (mod && typeof mod.buildAdapterReplayFixtureCorpusCoverageMatrix === 'function') {
      return mod.buildAdapterReplayFixtureCorpusCoverageMatrix(options);
    }
    return null;
  }

  function classifyCell(cell){
    const state = asString(asRecord(cell).state, 'gap');
    if (state === 'gap') return { severity: 'blocking', bucket: 'coverage_gap', reason: 'missing replay fixture coverage' };
    if (state === 'blocked') return { severity: 'blocking', bucket: 'blocked_replay', reason: 'replay is intentionally blocked pending operator review' };
    if (state === 'review_required') return { severity: 'review', bucket: 'operator_review', reason: 'fixture exists but requires operator review before use' };
    return { severity: 'pass', bucket: 'covered', reason: 'fixture metadata is covered by replay corpus' };
  }

  function buildFailureReasonGroups(matrix){
    const groups = new Map();
    for (const row of asArray(asRecord(matrix).rows)) {
      const cells = asRecord(row.cells);
      for (const scenarioClass of Object.keys(cells)) {
        const cell = asRecord(cells[scenarioClass]);
        const classification = classifyCell(cell);
        if (classification.severity === 'pass') continue;
        if (!groups.has(classification.bucket)) {
          groups.set(classification.bucket, {
            bucket: classification.bucket,
            severity: classification.severity,
            reason: classification.reason,
            count: 0,
            items: []
          });
        }
        const group = groups.get(classification.bucket);
        group.count += 1;
        group.items.push(Object.freeze({
          provider_family: row.provider_family,
          scenario_class: scenarioClass,
          state: cell.state,
          fixture_id: cell.fixture_id || null,
          evidence_link: cell.fixture_id ? `adapter-fixture://${cell.fixture_id}` : `adapter-gap://${row.provider_family}/${scenarioClass}`,
          policy_row: `policy://${row.provider_family}/${scenarioClass}`,
          operator_review_required: cell.operator_review_required === true
        }));
      }
    }
    return Object.freeze(Array.from(groups.values()).map((group) => Object.freeze(Object.assign({}, group, { items: Object.freeze(group.items) }))));
  }

  function buildCoverageGapLinks(matrix){
    const links = [];
    for (const row of asArray(asRecord(matrix).rows)) {
      const cells = asRecord(row.cells);
      for (const scenarioClass of Object.keys(cells)) {
        const cell = asRecord(cells[scenarioClass]);
        if (cell.state !== 'gap') continue;
        links.push(Object.freeze({
          provider_family: row.provider_family,
          scenario_class: scenarioClass,
          evidence_link: `adapter-gap://${row.provider_family}/${scenarioClass}`,
          recommended_action: 'add deterministic metadata-only replay fixture before publication lock'
        }));
      }
    }
    return Object.freeze(links);
  }

  function buildProviderSummaries(matrix){
    return Object.freeze(asArray(asRecord(matrix).rows).map((row) => Object.freeze({
      provider_family: row.provider_family,
      label: titleCaseToken(row.provider_family),
      total_scenarios: row.total_scenarios || 0,
      covered_count: row.covered_count || 0,
      gap_count: row.gap_count || 0,
      review_required_count: row.review_required_count || 0,
      blocked_count: row.blocked_count || 0,
      coverage_percentage: row.coverage_percentage || 0,
      readiness_state: row.gap_count > 0 ? 'blocked' : (row.review_required_count > 0 || row.blocked_count > 0 ? 'operator_review_required' : 'ready')
    })));
  }

  function determineReadiness(matrix, safetyValidation){
    const gapCells = Number(asRecord(matrix).gap_cells || 0);
    const blockedCells = Number(asRecord(matrix).blocked_cells || 0);
    const reviewCells = Number(asRecord(matrix).review_required_cells || 0);
    const safetyOk = asRecord(safetyValidation).ok === true;
    if (!safetyOk) return 'blocked_safety_boundary';
    if (gapCells > 0) return 'blocked_missing_replay_coverage';
    if (blockedCells > 0 || reviewCells > 0) return 'operator_review_required';
    return 'ready_for_no_network_replay_review';
  }

  function buildRecommendedActions(readinessState, groups){
    const actions = [];
    if (readinessState === 'blocked_safety_boundary') actions.push('Stop: inspect safety boundary findings before any replay review.');
    if (readinessState === 'blocked_missing_replay_coverage') actions.push('Add missing metadata-only fixtures for all coverage gaps before release lock.');
    if (readinessState === 'operator_review_required') actions.push('Review blocked/review-required replay cells and decide whether to accept, defer, or add fixtures.');
    if (!groups.length) actions.push('Proceed with operator review: coverage is complete and no replay gap group is open.');
    actions.push('Keep the run no-network: do not enable live provider calls, source fetching, OAuth, credential persistence, or backend/storage expansion.');
    return Object.freeze(actions);
  }

  function buildAdapterReplayInsightDecisionSurface(options = {}){
    const generatedAt = asString(options.generated_at, asString(options.now, FIXED_GENERATED_AT));
    const report = getCoverageReport(options);
    const matrix = asRecord(asRecord(report).coverage_matrix);
    const safetyValidation = asRecord(asRecord(report).safety_validation);
    const failureReasonGroups = buildFailureReasonGroups(matrix);
    const coverageGapLinks = buildCoverageGapLinks(matrix);
    const providerSummaries = buildProviderSummaries(matrix);
    const readinessState = determineReadiness(matrix, safetyValidation);
    const recommendedActions = buildRecommendedActions(readinessState, failureReasonGroups);
    const totalCells = Number(matrix.total_cells || 0);
    const coveredCells = Number(matrix.covered_cells || 0);

    return Object.freeze({
      adapter_replay_insight_version: VERSION,
      generated_at: generatedAt,
      milestone: MILESTONE,
      model: MODEL,
      coverage_matrix_baseline: COVERAGE_MATRIX_BASELINE,
      release_system_baseline: RELEASE_SYSTEM_BASELINE,
      decision_surface_ready: !!report,
      readiness_state: readinessState,
      readiness_verdict: readinessState === 'ready_for_no_network_replay_review' ? 'ready' : (readinessState === 'operator_review_required' ? 'review_required' : 'blocked'),
      coverage_summary: Object.freeze({
        total_cells: totalCells,
        covered_cells: coveredCells,
        gap_cells: Number(matrix.gap_cells || 0),
        blocked_cells: Number(matrix.blocked_cells || 0),
        review_required_cells: Number(matrix.review_required_cells || 0),
        coverage_percentage: Number(matrix.coverage_percentage || 0),
        threshold_met: matrix.threshold_met === true,
        matrix_checksum: matrix.matrix_checksum || null
      }),
      provider_summaries: providerSummaries,
      failure_reason_groups: failureReasonGroups,
      coverage_gap_links: coverageGapLinks,
      evidence_links: Object.freeze(providerSummaries.map((provider) => Object.freeze({
        provider_family: provider.provider_family,
        matrix_row: `adapter-matrix://${provider.provider_family}`,
        fixture_source: 'deterministic_metadata_only_corpus',
        policy_surface: `policy://${provider.provider_family}`
      }))),
      recommended_operator_actions: recommendedActions,
      operator_decision_contract: Object.freeze({
        decision_options: Object.freeze(['accept_no_network_replay_review','defer_for_fixture_gap','escalate_safety_boundary']),
        default_decision: readinessState === 'ready_for_no_network_replay_review' ? 'accept_no_network_replay_review' : 'defer_for_fixture_gap',
        requires_manual_operator_confirmation: true,
        automatic_signoff_performed: false,
        automatic_export_lock_performed: false,
        publication_permission_claimed: false
      }),
      boundary_flags: BOUNDARY_FLAGS,
      safe_metadata_only: true,
      can_execute_now: false,
      network_invocation_allowed: false,
      live_provider_execution_enabled: false,
      live_provider_execution_performed: false,
      live_source_fetching_enabled: false,
      live_source_fetching_performed: false,
      hidden_network_calls_allowed: false,
      real_oauth_token_lifecycle_enabled: false,
      real_api_keys_stored: false,
      real_tokens_stored: false,
      credential_persistence_allowed: false,
      backend_storage_expanded: false,
      automatic_source_verification_claimed: false,
      automatic_signoff_performed: false,
      automatic_export_lock_performed: false,
      publication_permission_claimed: false
    });
  }

  function renderAdapterReplayInsightDecisionSurface(target, options = {}){
    const el = typeof target === 'string' && global.document ? global.document.querySelector(target) : target;
    if (!el) return null;
    const surface = buildAdapterReplayInsightDecisionSurface(options);
    const summary = surface.coverage_summary;
    const groups = surface.failure_reason_groups;
    const providers = surface.provider_summaries;
    el.innerHTML = `
      <div class="adapterReplayInsightPanel" data-browser-qa="adapter-replay-insight-panel">
        <div class="miniGrid">
          <span><strong>${pct(summary.coverage_percentage)}</strong><small>coverage</small></span>
          <span><strong>${summary.gap_cells}</strong><small>gaps</small></span>
          <span><strong>${summary.review_required_cells + summary.blocked_cells}</strong><small>review cells</small></span>
          <span><strong>${surface.readiness_verdict}</strong><small>verdict</small></span>
        </div>
        <ul class="compactList adapterReplayProviderList">
          ${providers.map((provider) => `<li><strong>${provider.label}</strong> — ${pct(provider.coverage_percentage)} · ${provider.readiness_state}</li>`).join('')}
        </ul>
        <ul class="compactList adapterReplayReasonGroups">
          ${(groups.length ? groups : [{ bucket: 'no_open_replay_gaps', severity: 'pass', count: 0, reason: 'no replay gap group is open' }]).map((group) => `<li><strong>${titleCaseToken(group.bucket)}</strong> — ${group.reason}</li>`).join('')}
        </ul>
      </div>`;
    el.setAttribute('data-replay-readiness', surface.readiness_state);
    el.setAttribute('data-replay-coverage', String(summary.coverage_percentage));
    el.setAttribute('data-replay-gaps', String(summary.gap_cells));
    return surface;
  }

  function attach(){
    if (!global.document) return;
    const target = global.document.querySelector('[data-browser-qa="adapter-replay-insight-operator-decision-surface"] .adapterReplayInsightMount');
    if (target) renderAdapterReplayInsightDecisionSurface(target);
  }

  root.adapterReplayInsightUxOperatorDecisionSurface = Object.freeze({
    VERSION,
    MILESTONE,
    MODEL,
    COVERAGE_MATRIX_BASELINE,
    RELEASE_SYSTEM_BASELINE,
    BOUNDARY_FLAGS,
    buildFailureReasonGroups,
    buildCoverageGapLinks,
    buildProviderSummaries,
    buildAdapterReplayInsightDecisionSurface,
    renderAdapterReplayInsightDecisionSurface
  });

  if (global.document) {
    if (global.document.readyState === 'loading') global.document.addEventListener('DOMContentLoaded', attach, { once: true });
    else attach();
  }
})(typeof window !== 'undefined' ? window : globalThis);
