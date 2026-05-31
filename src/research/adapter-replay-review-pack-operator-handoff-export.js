/* Jarbou3i Research Engine adapter replay review pack + operator handoff export v1.4.0-alpha.28. */
/* Metadata-only handoff pack layer. No network calls, no live provider execution, no OAuth/token lifecycle, no backend/storage/source behavior expansion. */
(function(global){
  'use strict';
  const root = global.Jarbou3iResearchModules = global.Jarbou3iResearchModules || {};

  const VERSION = '1.4.0-alpha.28';
  const MILESTONE = 'v1.4.0-alpha.28 — Adapter Replay Review Pack + Operator Handoff Export';
  const MODEL = 'adapter_replay_review_pack_operator_handoff_export.v1';
  const DRILLDOWN_BASELINE = '1.4.0-alpha.27';
  const INSIGHT_BASELINE = '1.4.0-alpha.26';
  const FIXED_GENERATED_AT = '2026-05-31T00:00:00.000Z';

  const BOUNDARY_FLAGS = Object.freeze({
    operator_handoff_pack_only: true,
    metadata_export_payload_only: true,
    evidence_trace_bundle_only: true,
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
    cryptographic_signature_claimed: false,
    publication_permission_claimed: false
  });

  function asRecord(value){ return Object.prototype.toString.call(value) === '[object Object]' ? value : {}; }
  function asArray(value){ return Array.isArray(value) ? value : []; }
  function asString(value, fallback){ return typeof value === 'string' && value.trim() ? value.trim() : fallback; }
  function getDrilldownSurface(options = {}){
    if (options.drilldown_surface) return options.drilldown_surface;
    const mod = root.adapterReplayDecisionDrilldownEvidenceTraceLinks;
    if (mod && typeof mod.buildAdapterReplayDecisionDrilldownEvidenceTraceLinks === 'function') {
      return mod.buildAdapterReplayDecisionDrilldownEvidenceTraceLinks(options);
    }
    return null;
  }
  function bucketTraceLinks(drilldown){
    const buckets = { fixture: [], policy_row: [], evidence_artifact: [], coverage_gap: [], provider_summary: [], failure_group: [], coverage_matrix_cell: [] };
    for (const link of asArray(drilldown.trace_link_index)) {
      const type = link.link_type || 'unknown';
      if (!buckets[type]) buckets[type] = [];
      buckets[type].push(Object.freeze({ trace_id: link.trace_id, href: link.href, label: link.label, provider_family: link.provider_family || null, scenario_class: link.scenario_class || null }));
    }
    return Object.freeze(Object.fromEntries(Object.entries(buckets).map(([key, value]) => [key, Object.freeze(value)])));
  }
  function buildRequiredActions(drilldown){
    const actions = [];
    for (const item of asArray(drilldown.operator_checklist)) {
      if (item.status === 'required' || item.blocking) {
        actions.push(Object.freeze({ id: item.id, label: item.label, blocking: !!item.blocking, status: item.status }));
      }
    }
    for (const group of asArray(drilldown.grouped_blocker_explanations)) {
      if (group.severity && group.severity !== 'pass') {
        actions.push(Object.freeze({ id: `resolve-${group.bucket}`, label: group.next_step || group.explanation, blocking: group.severity === 'blocker', status: group.severity }));
      }
    }
    const seen = new Set();
    return Object.freeze(actions.filter((action) => {
      if (seen.has(action.id)) return false;
      seen.add(action.id);
      return true;
    }));
  }
  function buildHandoffSections(drilldown, traceBundle, requiredActions){
    const summary = asRecord(drilldown.trace_summary);
    return Object.freeze([
      Object.freeze({ id: 'readiness', title: 'Replay readiness', body: `${drilldown.source_readiness_verdict || 'unknown'} · ${drilldown.source_readiness_state || 'unknown'}` }),
      Object.freeze({ id: 'trace-bundle', title: 'Evidence trace bundle', body: `${summary.total_trace_links || 0} trace links · ${traceBundle.fixture.length} fixtures · ${traceBundle.policy_row.length} policy rows · ${traceBundle.evidence_artifact.length} evidence artifacts` }),
      Object.freeze({ id: 'required-actions', title: 'Required operator actions', body: requiredActions.length ? `${requiredActions.length} manual review action(s) remain.` : 'No blocking manual action detected.' }),
      Object.freeze({ id: 'boundary', title: 'Execution boundary', body: 'Metadata-only handoff export. No provider execution, source fetching, credential persistence, automatic verification, signoff, export lock, or publication permission.' })
    ]);
  }
  function buildReviewPackMarkdown(pack){
    return [
      `# ${pack.milestone}`,
      `Generated: ${pack.generated_at}`,
      `Readiness: ${pack.source_readiness_verdict} (${pack.source_readiness_state})`,
      '',
      '## Handoff sections',
      ...pack.handoff_sections.map((section) => `- ${section.title}: ${section.body}`),
      '',
      '## Required actions',
      ...(pack.required_operator_actions.length ? pack.required_operator_actions.map((action) => `- [${action.status}] ${action.label}`) : ['- None']),
      '',
      '## Boundary',
      '- No live provider calls, no hidden network requests, no OAuth/token lifecycle, no credential persistence, no source fetching, no automatic verification, no automatic signoff, no export lock, no publication permission.'
    ].join('\n');
  }
  function buildAdapterReplayReviewPackOperatorHandoffExport(options = {}){
    const generatedAt = asString(options.generated_at, asString(options.now, FIXED_GENERATED_AT));
    const drilldown = asRecord(getDrilldownSurface(options));
    const traceBundle = bucketTraceLinks(drilldown);
    const requiredActions = buildRequiredActions(drilldown);
    const handoffSections = buildHandoffSections(drilldown, traceBundle, requiredActions);
    const pack = {
      adapter_replay_review_pack_version: VERSION,
      generated_at: generatedAt,
      milestone: MILESTONE,
      model: MODEL,
      drilldown_baseline: DRILLDOWN_BASELINE,
      insight_baseline: INSIGHT_BASELINE,
      review_pack_id: `adapter-replay-review-pack-${VERSION}`,
      source_readiness_state: drilldown.source_readiness_state || 'unknown',
      source_readiness_verdict: drilldown.source_readiness_verdict || 'unknown',
      handoff_sections: handoffSections,
      required_operator_actions: requiredActions,
      evidence_trace_bundle: traceBundle,
      review_pack_summary: Object.freeze({
        total_trace_links: Number(asRecord(drilldown.trace_summary).total_trace_links || 0),
        fixture_links: traceBundle.fixture.length,
        policy_links: traceBundle.policy_row.length,
        evidence_links: traceBundle.evidence_artifact.length,
        required_actions: requiredActions.length,
        handoff_sections: handoffSections.length
      }),
      export_payload: null,
      handoff_markdown: '',
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
      cryptographic_signature_claimed: false,
      publication_permission_claimed: false
    };
    pack.export_payload = JSON.stringify({
      version: pack.adapter_replay_review_pack_version,
      generated_at: pack.generated_at,
      milestone: pack.milestone,
      review_pack_id: pack.review_pack_id,
      source_readiness_state: pack.source_readiness_state,
      source_readiness_verdict: pack.source_readiness_verdict,
      summary: pack.review_pack_summary,
      required_operator_actions: pack.required_operator_actions,
      evidence_trace_bundle: pack.evidence_trace_bundle,
      boundary_flags: pack.boundary_flags
    }, null, 2);
    pack.handoff_markdown = buildReviewPackMarkdown(pack);
    return Object.freeze(pack);
  }
  function renderAdapterReplayReviewPackOperatorHandoffExport(target, options = {}){
    const el = typeof target === 'string' && global.document ? global.document.querySelector(target) : target;
    if (!el) return null;
    const pack = buildAdapterReplayReviewPackOperatorHandoffExport(options);
    el.innerHTML = `
      <div class="adapterReplayReviewPackPanel" data-browser-qa="adapter-replay-review-pack-panel">
        <div class="miniGrid">
          <span><strong>${pack.review_pack_summary.total_trace_links}</strong><small>trace links</small></span>
          <span><strong>${pack.review_pack_summary.required_actions}</strong><small>review actions</small></span>
          <span><strong>${pack.review_pack_summary.handoff_sections}</strong><small>handoff sections</small></span>
          <span><strong>${pack.source_readiness_verdict}</strong><small>verdict</small></span>
        </div>
        <ul class="compactList adapterReplayReviewPackSections">
          ${pack.handoff_sections.map((section) => `<li><strong>${section.title}</strong> — ${section.body}</li>`).join('')}
        </ul>
      </div>`;
    el.setAttribute('data-review-pack-ready', 'true');
    el.setAttribute('data-review-pack-trace-links', String(pack.review_pack_summary.total_trace_links));
    return pack;
  }
  function attach(){
    if (!global.document) return;
    const target = global.document.querySelector('[data-browser-qa="adapter-replay-review-pack-operator-handoff-export"] .adapterReplayReviewPackMount');
    if (target) renderAdapterReplayReviewPackOperatorHandoffExport(target);
  }
  root.adapterReplayReviewPackOperatorHandoffExport = Object.freeze({
    VERSION,
    MILESTONE,
    MODEL,
    DRILLDOWN_BASELINE,
    INSIGHT_BASELINE,
    BOUNDARY_FLAGS,
    bucketTraceLinks,
    buildRequiredActions,
    buildHandoffSections,
    buildReviewPackMarkdown,
    buildAdapterReplayReviewPackOperatorHandoffExport,
    renderAdapterReplayReviewPackOperatorHandoffExport
  });
  if (global.document) {
    if (global.document.readyState === 'loading') global.document.addEventListener('DOMContentLoaded', attach, { once: true });
    else attach();
  }
})(typeof window !== 'undefined' ? window : globalThis);
