/* Jarbou3i Research Engine adapter replay decision drilldown + evidence trace links v1.4.0-alpha.27. */
/* Operator-facing metadata-only drilldown layer. No network calls, no live provider execution, no OAuth/token lifecycle, no backend/storage/source behavior expansion. */
(function(global){
  'use strict';
  const root = global.Jarbou3iResearchModules = global.Jarbou3iResearchModules || {};

  const VERSION = '1.4.0-alpha.27';
  const MILESTONE = 'v1.4.0-alpha.27 — Adapter Replay Decision Drilldown + Evidence Trace Links';
  const MODEL = 'adapter_replay_decision_drilldown_evidence_trace_links.v1';
  const INSIGHT_BASELINE = '1.4.0-alpha.26';
  const COVERAGE_MATRIX_BASELINE = '1.4.0-alpha.14';
  const FIXED_GENERATED_AT = '2026-05-30T00:00:00.000Z';

  const BOUNDARY_FLAGS = Object.freeze({
    operator_drilldown_only: true,
    evidence_trace_links_only: true,
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
  function titleCaseToken(value){ return String(value || 'unknown').replace(/_/g, ' ').replace(/\b\w/g, (m) => m.toUpperCase()); }

  function getInsightSurface(options = {}){
    if (options.insight_surface) return options.insight_surface;
    const mod = root.adapterReplayInsightUxOperatorDecisionSurface;
    if (mod && typeof mod.buildAdapterReplayInsightDecisionSurface === 'function') {
      return mod.buildAdapterReplayInsightDecisionSurface(options);
    }
    return null;
  }

  function traceId(parts){ return parts.filter(Boolean).join('::').replace(/[^a-zA-Z0-9:_-]+/g, '-'); }

  function buildTraceLinksForItem(item){
    const provider = asString(item.provider_family, 'unknown_provider');
    const scenario = asString(item.scenario_class, 'unknown_scenario');
    const fixture = item.fixture_id || null;
    const base = `${provider}/${scenario}`;
    const links = [
      Object.freeze({ trace_id: traceId(['policy', provider, scenario]), link_type: 'policy_row', label: 'Policy row', href: item.policy_row || `policy://${base}`, provider_family: provider, scenario_class: scenario }),
      Object.freeze({ trace_id: traceId(['matrix', provider, scenario]), link_type: 'coverage_matrix_cell', label: 'Coverage matrix cell', href: `adapter-matrix://${base}`, provider_family: provider, scenario_class: scenario }),
      Object.freeze({ trace_id: traceId(['evidence', provider, scenario]), link_type: 'evidence_artifact', label: 'Evidence artifact', href: item.evidence_link || `adapter-gap://${base}`, provider_family: provider, scenario_class: scenario })
    ];
    if (fixture) {
      links.unshift(Object.freeze({ trace_id: traceId(['fixture', fixture]), link_type: 'fixture', label: 'Replay fixture', href: `adapter-fixture://${fixture}`, provider_family: provider, scenario_class: scenario, fixture_id: fixture }));
    }
    return Object.freeze(links);
  }

  function buildTraceLinkIndex(surface){
    const links = [];
    for (const provider of asArray(surface.provider_summaries)) {
      links.push(Object.freeze({
        trace_id: traceId(['provider', provider.provider_family]),
        link_type: 'provider_summary',
        label: `${provider.label || provider.provider_family} summary`,
        href: `adapter-provider://${provider.provider_family}`,
        provider_family: provider.provider_family,
        readiness_state: provider.readiness_state
      }));
    }
    for (const group of asArray(surface.failure_reason_groups)) {
      links.push(Object.freeze({
        trace_id: traceId(['group', group.bucket]),
        link_type: 'failure_group',
        label: titleCaseToken(group.bucket),
        href: `adapter-failure-group://${group.bucket}`,
        severity: group.severity,
        count: Number(group.count || 0)
      }));
      for (const item of asArray(group.items)) links.push(...buildTraceLinksForItem(item));
    }
    for (const gap of asArray(surface.coverage_gap_links)) {
      links.push(Object.freeze({
        trace_id: traceId(['gap', gap.provider_family, gap.scenario_class]),
        link_type: 'coverage_gap',
        label: 'Coverage gap',
        href: gap.evidence_link || `adapter-gap://${gap.provider_family}/${gap.scenario_class}`,
        provider_family: gap.provider_family,
        scenario_class: gap.scenario_class,
        recommended_action: gap.recommended_action
      }));
    }
    const seen = new Set();
    return Object.freeze(links.filter((link) => {
      const key = `${link.link_type}:${link.href}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    }));
  }

  function buildVerdictDrilldowns(surface, traceLinks){
    const summary = asRecord(surface.coverage_summary);
    const readiness = asString(surface.readiness_state, 'unknown');
    const verdict = asString(surface.readiness_verdict, 'unknown');
    return Object.freeze([
      Object.freeze({
        drilldown_id: 'readiness-verdict',
        title: 'Replay readiness verdict',
        verdict,
        state: readiness,
        explanation: readiness === 'blocked_missing_replay_coverage'
          ? 'Replay review is blocked until missing deterministic fixtures are added.'
          : readiness === 'operator_review_required'
            ? 'Replay coverage is complete, but blocked/review-required cells need a manual operator decision.'
            : 'Replay coverage is ready for no-network operator review.',
        trace_links: Object.freeze(traceLinks.filter((link) => ['failure_group','coverage_gap','provider_summary'].includes(link.link_type)).map((link) => link.trace_id))
      }),
      Object.freeze({
        drilldown_id: 'coverage-summary',
        title: 'Coverage summary',
        verdict: summary.gap_cells > 0 ? 'blocked' : 'covered',
        state: `${Number(summary.covered_cells || 0)}/${Number(summary.total_cells || 0)} replay cells covered`,
        explanation: `${Number(summary.coverage_percentage || 0).toFixed(0)}% deterministic replay coverage with ${Number(summary.gap_cells || 0)} gap cell(s).`,
        trace_links: Object.freeze(traceLinks.filter((link) => ['coverage_matrix_cell','coverage_gap'].includes(link.link_type)).map((link) => link.trace_id))
      }),
      Object.freeze({
        drilldown_id: 'safety-boundary',
        title: 'Safety boundary',
        verdict: 'no_network_only',
        state: 'manual/private replay review only',
        explanation: 'The drilldown links point to metadata-only fixtures, policy rows, and evidence artifacts; they do not execute providers or fetch sources.',
        trace_links: Object.freeze([])
      })
    ]);
  }

  function buildGroupedBlockerExplanations(surface){
    const groups = asArray(surface.failure_reason_groups);
    if (!groups.length) {
      return Object.freeze([Object.freeze({ bucket: 'none', severity: 'pass', count: 0, explanation: 'No replay blockers or review groups are open.', next_step: 'Proceed with manual no-network replay review.' })]);
    }
    return Object.freeze(groups.map((group) => Object.freeze({
      bucket: group.bucket,
      severity: group.severity,
      count: Number(group.count || 0),
      explanation: group.bucket === 'coverage_gap'
        ? 'A deterministic replay fixture is missing; add the fixture before lock.'
        : group.bucket === 'blocked_replay'
          ? 'The replay cell is intentionally blocked and requires explicit operator disposition.'
          : 'The replay cell is covered but requires manual operator review before use.',
      next_step: group.bucket === 'coverage_gap'
        ? 'Open the gap trace link and add a metadata-only fixture.'
        : 'Open fixture, policy row, and evidence links; decide accept, defer, or escalate.',
      trace_links: Object.freeze(asArray(group.items).flatMap((item) => buildTraceLinksForItem(item).map((link) => link.trace_id)))
    })));
  }

  function buildOperatorChecklist(surface){
    const summary = asRecord(surface.coverage_summary);
    const hasGaps = Number(summary.gap_cells || 0) > 0;
    const needsReview = surface.readiness_verdict !== 'ready';
    return Object.freeze([
      Object.freeze({ id: 'confirm-no-network-boundary', label: 'Confirm no-network replay boundary', status: 'required', blocking: false }),
      Object.freeze({ id: 'review-coverage-summary', label: 'Review coverage summary and matrix checksum', status: Number(summary.total_cells || 0) > 0 ? 'ready' : 'blocked', blocking: Number(summary.total_cells || 0) === 0 }),
      Object.freeze({ id: 'open-gap-links', label: 'Open coverage-gap trace links', status: hasGaps ? 'required' : 'not_required', blocking: hasGaps }),
      Object.freeze({ id: 'inspect-fixture-policy-evidence', label: 'Inspect fixture, policy row, and evidence trace links', status: needsReview ? 'required' : 'ready', blocking: false }),
      Object.freeze({ id: 'record-operator-decision', label: 'Record accept/defer/escalate decision manually', status: 'required', blocking: false })
    ]);
  }

  function buildAdapterReplayDecisionDrilldownEvidenceTraceLinks(options = {}){
    const generatedAt = asString(options.generated_at, asString(options.now, FIXED_GENERATED_AT));
    const surface = getInsightSurface(options);
    const normalizedSurface = asRecord(surface);
    const traceLinks = buildTraceLinkIndex(normalizedSurface);
    const verdictDrilldowns = buildVerdictDrilldowns(normalizedSurface, traceLinks);
    const groupedBlockers = buildGroupedBlockerExplanations(normalizedSurface);
    const checklist = buildOperatorChecklist(normalizedSurface);
    return Object.freeze({
      adapter_replay_decision_drilldown_version: VERSION,
      generated_at: generatedAt,
      milestone: MILESTONE,
      model: MODEL,
      insight_baseline: INSIGHT_BASELINE,
      coverage_matrix_baseline: COVERAGE_MATRIX_BASELINE,
      drilldown_surface_ready: !!surface,
      source_readiness_state: normalizedSurface.readiness_state || 'unknown',
      source_readiness_verdict: normalizedSurface.readiness_verdict || 'unknown',
      verdict_drilldowns: verdictDrilldowns,
      grouped_blocker_explanations: groupedBlockers,
      trace_link_index: traceLinks,
      operator_checklist: checklist,
      trace_summary: Object.freeze({
        total_trace_links: traceLinks.length,
        fixture_links: traceLinks.filter((link) => link.link_type === 'fixture').length,
        policy_links: traceLinks.filter((link) => link.link_type === 'policy_row').length,
        evidence_links: traceLinks.filter((link) => link.link_type === 'evidence_artifact').length,
        gap_links: traceLinks.filter((link) => link.link_type === 'coverage_gap').length,
        checklist_items: checklist.length
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

  function renderAdapterReplayDecisionDrilldownEvidenceTraceLinks(target, options = {}){
    const el = typeof target === 'string' && global.document ? global.document.querySelector(target) : target;
    if (!el) return null;
    const drilldown = buildAdapterReplayDecisionDrilldownEvidenceTraceLinks(options);
    const blockers = drilldown.grouped_blocker_explanations;
    const traces = drilldown.trace_link_index.slice(0, 8);
    el.innerHTML = `
      <div class="adapterReplayDrilldownPanel" data-browser-qa="adapter-replay-decision-drilldown-panel">
        <div class="miniGrid">
          <span><strong>${drilldown.trace_summary.total_trace_links}</strong><small>trace links</small></span>
          <span><strong>${drilldown.trace_summary.fixture_links}</strong><small>fixtures</small></span>
          <span><strong>${drilldown.trace_summary.policy_links}</strong><small>policy rows</small></span>
          <span><strong>${drilldown.source_readiness_verdict}</strong><small>source verdict</small></span>
        </div>
        <ul class="compactList adapterReplayDrilldownBlockers">
          ${blockers.map((group) => `<li><strong>${titleCaseToken(group.bucket)}</strong> — ${group.explanation}</li>`).join('')}
        </ul>
        <ul class="compactList adapterReplayTraceLinks">
          ${traces.map((link) => `<li><strong>${link.label}</strong> · ${link.href}</li>`).join('')}
        </ul>
      </div>`;
    el.setAttribute('data-drilldown-ready', String(drilldown.drilldown_surface_ready));
    el.setAttribute('data-trace-link-count', String(drilldown.trace_summary.total_trace_links));
    return drilldown;
  }

  function attach(){
    if (!global.document) return;
    const target = global.document.querySelector('[data-browser-qa="adapter-replay-decision-drilldown-evidence-trace-links"] .adapterReplayDrilldownMount');
    if (target) renderAdapterReplayDecisionDrilldownEvidenceTraceLinks(target);
  }

  root.adapterReplayDecisionDrilldownEvidenceTraceLinks = Object.freeze({
    VERSION,
    MILESTONE,
    MODEL,
    INSIGHT_BASELINE,
    COVERAGE_MATRIX_BASELINE,
    BOUNDARY_FLAGS,
    buildTraceLinksForItem,
    buildTraceLinkIndex,
    buildVerdictDrilldowns,
    buildGroupedBlockerExplanations,
    buildOperatorChecklist,
    buildAdapterReplayDecisionDrilldownEvidenceTraceLinks,
    renderAdapterReplayDecisionDrilldownEvidenceTraceLinks
  });

  if (global.document) {
    if (global.document.readyState === 'loading') global.document.addEventListener('DOMContentLoaded', attach, { once: true });
    else attach();
  }
})(typeof window !== 'undefined' ? window : globalThis);
