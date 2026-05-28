/* Jarbou3i Research Engine source acquisition control surface v1.4.0-alpha.7. */
/* Deterministic source-mode control only. No live fetch, scraping, OAuth, backend, or storage expansion enabled. */
(function(global){
  'use strict';
  const root = global.Jarbou3iResearchModules = global.Jarbou3iResearchModules || {};

  const VERSION = '1.4.0-alpha.7';
  const STABLE_BASELINE = '1.3.0';
  const CONTROL_BASELINE = '1.4.0-alpha.7';
  const MOCK_TO_LIVE_BASELINE = '1.4.0-alpha.6';
  const REPLAY_BASELINE = '1.4.0-alpha.5';
  const MILESTONE = 'v1.4.0-alpha.7 — Source Acquisition Control Surface';
  const MODEL = 'source_acquisition_control_surface.v1';

  const ACQUISITION_MODES = Object.freeze({
    MANUAL_SOURCE: 'manual_source',
    IMPORTED_EVIDENCE: 'imported_evidence',
    FIXTURE_SOURCE: 'fixture_source',
    PROVIDER_PROPOSED_SOURCE: 'provider_proposed_source',
    BLOCKED_SOURCE: 'blocked_source',
    FUTURE_CONTROLLED_FETCH: 'future_controlled_fetch'
  });

  const REVIEW_STATES = Object.freeze({
    QUEUED_FOR_REVIEW: 'queued_for_review',
    ACCEPTED_FOR_MATRIX: 'accepted_for_matrix',
    REJECTED_BY_OPERATOR: 'rejected_by_operator',
    BLOCKED_BY_POLICY: 'blocked_by_policy',
    FUTURE_GATE_REQUIRED: 'future_gate_required'
  });

  const PROVENANCE_STATES = Object.freeze({
    USER_SUPPLIED: 'user_supplied',
    IMPORTED_LOCAL_ARTIFACT: 'imported_local_artifact',
    DETERMINISTIC_FIXTURE: 'deterministic_fixture',
    PROVIDER_SUGGESTED_UNFETCHED: 'provider_suggested_unfetched',
    POLICY_BLOCKED: 'policy_blocked',
    FUTURE_CONTROLLED_FETCH_DISABLED: 'future_controlled_fetch_disabled'
  });

  const REQUIRED_MODE_IDS = Object.freeze(Object.values(ACQUISITION_MODES));

  const BOUNDARY_FLAGS = Object.freeze({
    runtime_capability_change: false,
    provider_behavior_changed: false,
    oauth_behavior_changed: false,
    backend_behavior_changed: false,
    source_behavior_changed: false,
    storage_behavior_changed: false,
    source_connector_behavior_changed: false,
    live_source_fetching_enabled: false,
    uncontrolled_scraping_enabled: false,
    hidden_background_fetching_enabled: false,
    production_oauth_enabled: false,
    automatic_source_verification_claimed: false,
    provider_suggested_sources_auto_accepted: false,
    source_acquisition_control_surface_only: true,
    review_queue_required: true,
    deterministic_fixture_backed: true
  });

  const MODE_DEFINITIONS = Object.freeze({
    manual_source: Object.freeze({
      mode: ACQUISITION_MODES.MANUAL_SOURCE,
      label: 'Manual source',
      acquisition_surface: 'user_supplied_local_input',
      permission_state: 'operator_supplied_content_only',
      provenance_state: PROVENANCE_STATES.USER_SUPPLIED,
      review_state: REVIEW_STATES.QUEUED_FOR_REVIEW,
      risk_label: 'low',
      review_queue_required: true,
      source_to_claim_linkage_required: true,
      gap_warning_enabled: true,
      provider_proposal: false,
      live_fetch_allowed: false,
      hidden_background_fetch_allowed: false,
      automatic_verification_allowed: false,
      auto_accept_allowed: false,
      export_allowed_after_review: true,
      operator_message: 'Manual source material is user supplied and must be reviewed before matrix acceptance.'
    }),
    imported_evidence: Object.freeze({
      mode: ACQUISITION_MODES.IMPORTED_EVIDENCE,
      label: 'Imported evidence artifact',
      acquisition_surface: 'local_import_adapter_or_source_packet',
      permission_state: 'operator_imported_artifact',
      provenance_state: PROVENANCE_STATES.IMPORTED_LOCAL_ARTIFACT,
      review_state: REVIEW_STATES.QUEUED_FOR_REVIEW,
      risk_label: 'medium',
      review_queue_required: true,
      source_to_claim_linkage_required: true,
      gap_warning_enabled: true,
      provider_proposal: false,
      live_fetch_allowed: false,
      hidden_background_fetch_allowed: false,
      automatic_verification_allowed: false,
      auto_accept_allowed: false,
      export_allowed_after_review: true,
      operator_message: 'Imported artifacts are local candidates only; they remain unverified until operator review.'
    }),
    fixture_source: Object.freeze({
      mode: ACQUISITION_MODES.FIXTURE_SOURCE,
      label: 'Fixture source',
      acquisition_surface: 'deterministic_fixture',
      permission_state: 'test_fixture_only',
      provenance_state: PROVENANCE_STATES.DETERMINISTIC_FIXTURE,
      review_state: REVIEW_STATES.QUEUED_FOR_REVIEW,
      risk_label: 'low',
      review_queue_required: true,
      source_to_claim_linkage_required: true,
      gap_warning_enabled: true,
      provider_proposal: false,
      live_fetch_allowed: false,
      hidden_background_fetch_allowed: false,
      automatic_verification_allowed: false,
      auto_accept_allowed: false,
      export_allowed_after_review: true,
      operator_message: 'Fixture sources exist for deterministic QA and must not be presented as live retrieval.'
    }),
    provider_proposed_source: Object.freeze({
      mode: ACQUISITION_MODES.PROVIDER_PROPOSED_SOURCE,
      label: 'Provider-proposed source',
      acquisition_surface: 'provider_suggestion_unfetched',
      permission_state: 'proposal_only_no_fetch_permission',
      provenance_state: PROVENANCE_STATES.PROVIDER_SUGGESTED_UNFETCHED,
      review_state: REVIEW_STATES.QUEUED_FOR_REVIEW,
      risk_label: 'high',
      review_queue_required: true,
      source_to_claim_linkage_required: true,
      gap_warning_enabled: true,
      provider_proposal: true,
      live_fetch_allowed: false,
      hidden_background_fetch_allowed: false,
      automatic_verification_allowed: false,
      auto_accept_allowed: false,
      export_allowed_after_review: false,
      operator_message: 'Provider-proposed sources are unfetched suggestions and cannot bypass review.'
    }),
    blocked_source: Object.freeze({
      mode: ACQUISITION_MODES.BLOCKED_SOURCE,
      label: 'Blocked source',
      acquisition_surface: 'policy_blocked',
      permission_state: 'blocked_by_policy',
      provenance_state: PROVENANCE_STATES.POLICY_BLOCKED,
      review_state: REVIEW_STATES.BLOCKED_BY_POLICY,
      risk_label: 'blocked',
      review_queue_required: false,
      source_to_claim_linkage_required: false,
      gap_warning_enabled: true,
      provider_proposal: false,
      live_fetch_allowed: false,
      hidden_background_fetch_allowed: false,
      automatic_verification_allowed: false,
      auto_accept_allowed: false,
      export_allowed_after_review: false,
      operator_message: 'Policy-blocked sources cannot enter review, synthesis, or export.'
    }),
    future_controlled_fetch: Object.freeze({
      mode: ACQUISITION_MODES.FUTURE_CONTROLLED_FETCH,
      label: 'Future controlled fetch',
      acquisition_surface: 'future_controlled_fetch_disabled',
      permission_state: 'future_gate_required',
      provenance_state: PROVENANCE_STATES.FUTURE_CONTROLLED_FETCH_DISABLED,
      review_state: REVIEW_STATES.FUTURE_GATE_REQUIRED,
      risk_label: 'high',
      review_queue_required: true,
      source_to_claim_linkage_required: true,
      gap_warning_enabled: true,
      provider_proposal: false,
      live_fetch_allowed: false,
      hidden_background_fetch_allowed: false,
      automatic_verification_allowed: false,
      auto_accept_allowed: false,
      export_allowed_after_review: false,
      operator_message: 'Future controlled fetch remains disabled until a separate execution gate explicitly authorizes it.'
    })
  });

  function clone(value){ return JSON.parse(JSON.stringify(value)); }
  function asArray(value){ return Array.isArray(value) ? value : []; }
  function text(value, fallback = ''){ return String(value ?? fallback).trim(); }

  function stableStringify(value) {
    if (value === null || typeof value !== 'object') return JSON.stringify(value);
    if (Array.isArray(value)) return '[' + value.map(stableStringify).join(',') + ']';
    return '{' + Object.keys(value).sort().map((key) => JSON.stringify(key) + ':' + stableStringify(value[key])).join(',') + '}';
  }

  function deterministicChecksum(value) {
    const body = stableStringify(value);
    let hash = 2166136261;
    for (let i = 0; i < body.length; i += 1) {
      hash ^= body.charCodeAt(i);
      hash = Math.imul(hash, 16777619) >>> 0;
    }
    return `fnv1a32:${hash.toString(16).padStart(8, '0')}`;
  }

  function normalizeMode(mode){
    const candidate = text(mode || '').toLowerCase().replace(/[-\s]+/g, '_');
    if (MODE_DEFINITIONS[candidate]) return candidate;
    return ACQUISITION_MODES.MANUAL_SOURCE;
  }

  function inferMode(candidate = {}){
    const explicit = candidate.mode || candidate.acquisition_mode || candidate.source_acquisition_mode;
    if (explicit) return normalizeMode(explicit);
    if (candidate.blocked === true || candidate.policy_blocked === true) return ACQUISITION_MODES.BLOCKED_SOURCE;
    if (candidate.fixture === true || candidate.source_fixture === true) return ACQUISITION_MODES.FIXTURE_SOURCE;
    if (candidate.provider_proposed === true || candidate.provider_suggestion === true || candidate.origin === 'provider') return ACQUISITION_MODES.PROVIDER_PROPOSED_SOURCE;
    if (candidate.future_controlled_fetch === true || candidate.requested_live_fetch === true) return ACQUISITION_MODES.FUTURE_CONTROLLED_FETCH;
    if (candidate.import_meta || candidate.imported === true || candidate.origin === 'source_import_adapter') return ACQUISITION_MODES.IMPORTED_EVIDENCE;
    return ACQUISITION_MODES.MANUAL_SOURCE;
  }

  function modeDefinition(mode){ return clone(MODE_DEFINITIONS[normalizeMode(mode)]); }

  function sourceGapWarnings(candidate = {}, definition = {}){
    const warnings = [];
    const claim = text(candidate.claim || candidate.title || candidate.summary);
    const url = text(candidate.source_url || candidate.url);
    const date = text(candidate.source_date || candidate.date);
    const supports = asArray(candidate.supports);
    const contradicts = asArray(candidate.contradicts);
    if (!claim) warnings.push('missing_claim_or_summary');
    if (!url && definition.mode !== ACQUISITION_MODES.MANUAL_SOURCE) warnings.push('missing_source_url_or_locator');
    if (!date) warnings.push('missing_source_date');
    if (definition.source_to_claim_linkage_required && !supports.length && !contradicts.length) warnings.push('missing_source_to_claim_linkage');
    if (definition.provider_proposal) warnings.push('provider_proposal_requires_operator_review_before_use');
    if (definition.mode === ACQUISITION_MODES.FUTURE_CONTROLLED_FETCH) warnings.push('future_controlled_fetch_disabled_until_later_gate');
    if (definition.mode === ACQUISITION_MODES.BLOCKED_SOURCE) warnings.push('blocked_source_cannot_enter_synthesis');
    return Object.freeze(warnings);
  }

  function normalizeSourceAcquisitionCandidate(candidate = {}, options = {}){
    const mode = inferMode(candidate);
    const definition = modeDefinition(mode);
    const warnings = sourceGapWarnings(candidate, definition);
    const decision = {
      acquisition_decision_version: VERSION,
      decision_id: text(candidate.evidence_id || candidate.source_id || candidate.id, `source_acquisition_${mode}`),
      mode,
      label: definition.label,
      acquisition_surface: definition.acquisition_surface,
      permission_state: definition.permission_state,
      provenance_state: definition.provenance_state,
      review_state: definition.review_state,
      risk_label: definition.risk_label,
      queue_destination: definition.review_state === REVIEW_STATES.BLOCKED_BY_POLICY ? 'blocked_sources' : 'evidence_review_queue',
      review_queue_required: definition.review_queue_required,
      source_to_claim_linkage_required: definition.source_to_claim_linkage_required,
      source_gap_warnings: warnings,
      source_gap_warning_count: warnings.length,
      provider_proposal: definition.provider_proposal,
      live_fetch_allowed: false,
      live_fetching_performed: false,
      hidden_background_fetch_allowed: false,
      hidden_background_fetching_performed: false,
      source_fetching_performed: false,
      uncontrolled_scraping_performed: false,
      automatic_verification_allowed: false,
      automatic_source_verification_claimed: false,
      auto_accept_allowed: false,
      auto_accepted: false,
      export_allowed_after_review: definition.export_allowed_after_review,
      operator_message: definition.operator_message,
      claim_reference_count: asArray(candidate.supports).length + asArray(candidate.contradicts).length,
      notes: text(options.note || candidate.notes),
      boundary_flags: BOUNDARY_FLAGS
    };
    return Object.freeze(Object.assign(decision, { decision_checksum: deterministicChecksum(decision) }));
  }

  function buildModeRows(){
    return REQUIRED_MODE_IDS.map((mode) => {
      const definition = modeDefinition(mode);
      const row = Object.assign({}, definition, {
        release: VERSION,
        no_live_fetch: definition.live_fetch_allowed === false,
        no_hidden_background_fetch: definition.hidden_background_fetch_allowed === false,
        no_auto_verification: definition.automatic_verification_allowed === false,
        no_auto_accept: definition.auto_accept_allowed === false,
        review_gate_preserved: definition.mode === ACQUISITION_MODES.BLOCKED_SOURCE || definition.review_queue_required === true || definition.review_state === REVIEW_STATES.FUTURE_GATE_REQUIRED
      });
      return Object.freeze(Object.assign(row, { row_checksum: deterministicChecksum(row) }));
    });
  }

  function auditSourceAcquisitionControlSurface(options = {}){
    const rows = buildModeRows();
    const issues = [];
    const modes = rows.map((row) => row.mode);
    REQUIRED_MODE_IDS.forEach((mode) => { if (!modes.includes(mode)) issues.push(`missing_mode:${mode}`); });
    rows.forEach((row) => {
      if (row.live_fetch_allowed !== false) issues.push(`${row.mode}:live_fetch_must_remain_false`);
      if (row.hidden_background_fetch_allowed !== false) issues.push(`${row.mode}:hidden_background_fetch_must_remain_false`);
      if (row.automatic_verification_allowed !== false) issues.push(`${row.mode}:automatic_verification_must_remain_false`);
      if (row.auto_accept_allowed !== false) issues.push(`${row.mode}:auto_accept_must_remain_false`);
      if (row.mode === ACQUISITION_MODES.PROVIDER_PROPOSED_SOURCE && row.review_queue_required !== true) issues.push('provider_proposed_source:review_queue_required');
      if (row.mode === ACQUISITION_MODES.BLOCKED_SOURCE && row.export_allowed_after_review !== false) issues.push('blocked_source:export_must_remain_false');
      if (row.mode === ACQUISITION_MODES.FUTURE_CONTROLLED_FETCH && row.review_state !== REVIEW_STATES.FUTURE_GATE_REQUIRED) issues.push('future_controlled_fetch:future_gate_required');
    });
    const report = {
      source_acquisition_control_surface_version: VERSION,
      generated_at: options.now || new Date().toISOString(),
      stable_baseline: STABLE_BASELINE,
      control_baseline: CONTROL_BASELINE,
      mock_to_live_baseline: MOCK_TO_LIVE_BASELINE,
      replay_baseline: REPLAY_BASELINE,
      milestone: MILESTONE,
      model: MODEL,
      mode_count: rows.length,
      modes,
      rows,
      issues,
      ok: issues.length === 0,
      release_gate: issues.length ? 'source_acquisition_control_surface_blocked' : 'source_acquisition_control_surface_ready',
      boundary_flags: BOUNDARY_FLAGS,
      live_source_fetching_enabled: false,
      uncontrolled_scraping_enabled: false,
      hidden_background_fetching_enabled: false,
      production_oauth_enabled: false,
      automatic_source_verification_claimed: false,
      provider_suggested_sources_auto_accepted: false,
      review_queue_required: true,
      source_gap_warnings_enabled: true,
      source_to_claim_linkage_preserved: true,
      boundary_statement: 'Source acquisition modes classify and route source candidates only; they never fetch, scrape, verify, auto-accept, or authorize provider-suggested sources.'
    };
    return Object.freeze(Object.assign(report, { control_surface_checksum: deterministicChecksum(report) }));
  }

  function buildSourceAcquisitionControlSurface(options = {}){
    const audit = auditSourceAcquisitionControlSurface(options);
    const candidates = asArray(options.candidates).map((candidate) => normalizeSourceAcquisitionCandidate(candidate, options));
    const summary = {
      mode_count: audit.mode_count,
      candidate_count: candidates.length,
      queued_for_review_count: candidates.filter((item) => item.queue_destination === 'evidence_review_queue').length,
      blocked_count: candidates.filter((item) => item.queue_destination === 'blocked_sources').length,
      provider_proposal_count: candidates.filter((item) => item.provider_proposal).length,
      source_gap_warning_count: candidates.reduce((sum, item) => sum + item.source_gap_warning_count, 0)
    };
    const surface = {
      source_acquisition_control_surface_version: VERSION,
      generated_at: options.now || new Date().toISOString(),
      milestone: MILESTONE,
      model: MODEL,
      audit,
      candidates: Object.freeze(candidates),
      summary: Object.freeze(summary),
      boundary_flags: BOUNDARY_FLAGS,
      live_fetching_performed: false,
      source_fetching_performed: false,
      uncontrolled_scraping_performed: false,
      automatic_source_verification_claimed: false,
      provider_suggested_sources_auto_accepted: false,
      publication_permission_claimed: false
    };
    return Object.freeze(Object.assign(surface, { surface_checksum: deterministicChecksum(surface) }));
  }

  root.sourceAcquisitionControlSurface = Object.freeze({
    VERSION,
    STABLE_BASELINE,
    CONTROL_BASELINE,
    MOCK_TO_LIVE_BASELINE,
    REPLAY_BASELINE,
    MILESTONE,
    MODEL,
    ACQUISITION_MODES,
    REVIEW_STATES,
    PROVENANCE_STATES,
    BOUNDARY_FLAGS,
    MODE_DEFINITIONS,
    modeDefinition,
    inferMode,
    normalizeSourceAcquisitionCandidate,
    buildModeRows,
    auditSourceAcquisitionControlSurface,
    buildSourceAcquisitionControlSurface
  });

})(typeof window !== 'undefined' ? window : (typeof globalThis !== 'undefined' ? globalThis : global));
