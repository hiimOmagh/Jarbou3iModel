/* Jarbou3i Research Engine adapter replay fixture corpus + coverage matrix v1.4.0-alpha.14. */
/* Metadata-only replay coverage matrix. No real provider calls, OAuth/token lifecycle, credential persistence, hidden network calls, live source fetching, backend, or storage expansion enabled. */
(function(global){
  'use strict';
  const root = global.Jarbou3iResearchModules = global.Jarbou3iResearchModules || {};

  const VERSION = '1.4.0-alpha.14';
  const MILESTONE = 'v1.4.0-alpha.14 — Adapter Replay Fixture Corpus + Coverage Matrix';
  const MODEL = 'adapter_replay_fixture_corpus_coverage_matrix.v1';
  const ADAPTER_CONTRACT_BENCH_BASELINE = '1.4.0-alpha.13';
  const ADAPTER_SANDBOX_BASELINE = '1.4.0-alpha.12';
  const SAFETY_COCKPIT_BASELINE = '1.4.0-alpha.11';
  const STABLE_BASELINE = '1.3.0';
  const FIXED_GENERATED_AT = '2026-05-29T00:00:00.000Z';
  const MINIMUM_COVERAGE_THRESHOLD_PERCENT = 100;

  const PROVIDER_FAMILIES = Object.freeze([
    'openai_style',
    'anthropic_style',
    'local_llm_style'
  ]);

  const SCENARIO_CLASSES = Object.freeze([
    'metadata_success_replay',
    'request_envelope_shape_drift',
    'response_envelope_shape_drift',
    'missing_fixture_block',
    'adapter_failure_ux_rehearsal',
    'safe_transcript_comparison',
    'capability_matrix_mapping'
  ]);

  const SCENARIO_DEFINITIONS = Object.freeze({
    metadata_success_replay: Object.freeze({
      contract_surface: 'fixture_metadata_replay',
      expected_replay_state: 'covered',
      replay_allowed: true,
      operator_review_required: false,
      has_request_envelope_metadata: true,
      has_response_envelope_metadata: true,
      has_failure_contract: false,
      has_provider_family_mapping: true
    }),
    request_envelope_shape_drift: Object.freeze({
      contract_surface: 'request_envelope_shape_guard',
      expected_replay_state: 'review_required',
      replay_allowed: false,
      operator_review_required: true,
      has_request_envelope_metadata: true,
      has_response_envelope_metadata: false,
      has_failure_contract: true,
      has_provider_family_mapping: true
    }),
    response_envelope_shape_drift: Object.freeze({
      contract_surface: 'response_envelope_shape_guard',
      expected_replay_state: 'review_required',
      replay_allowed: false,
      operator_review_required: true,
      has_request_envelope_metadata: false,
      has_response_envelope_metadata: true,
      has_failure_contract: true,
      has_provider_family_mapping: true
    }),
    missing_fixture_block: Object.freeze({
      contract_surface: 'fixture_presence_guard',
      expected_replay_state: 'blocked',
      replay_allowed: false,
      operator_review_required: true,
      has_request_envelope_metadata: false,
      has_response_envelope_metadata: false,
      has_failure_contract: true,
      has_provider_family_mapping: true
    }),
    adapter_failure_ux_rehearsal: Object.freeze({
      contract_surface: 'adapter_failure_ux_contract',
      expected_replay_state: 'review_required',
      replay_allowed: false,
      operator_review_required: true,
      has_request_envelope_metadata: true,
      has_response_envelope_metadata: true,
      has_failure_contract: true,
      has_provider_family_mapping: true
    }),
    safe_transcript_comparison: Object.freeze({
      contract_surface: 'safe_transcript_metadata_comparison',
      expected_replay_state: 'covered',
      replay_allowed: true,
      operator_review_required: true,
      has_request_envelope_metadata: true,
      has_response_envelope_metadata: true,
      has_failure_contract: false,
      has_provider_family_mapping: true
    }),
    capability_matrix_mapping: Object.freeze({
      contract_surface: 'cross_provider_capability_matrix_mapping',
      expected_replay_state: 'covered',
      replay_allowed: true,
      operator_review_required: false,
      has_request_envelope_metadata: true,
      has_response_envelope_metadata: true,
      has_failure_contract: false,
      has_provider_family_mapping: true
    })
  });

  const MATRIX_STATES = Object.freeze(['covered', 'gap', 'blocked', 'review_required']);

  const FORBIDDEN_FIELDS = Object.freeze([
    'raw_credentials',
    'raw_tokens',
    'raw_api_keys',
    'authorization_headers',
    'authorization_header',
    'raw_request_body',
    'raw_response_body',
    'raw_source_fetch_results',
    'raw_network_trace',
    'browser_session_secrets',
    'provider_secret_value',
    'access_token',
    'refresh_token',
    'api_key',
    'bearer_token'
  ]);

  const BOUNDARY_FLAGS = Object.freeze({
    adapter_replay_fixture_corpus_coverage_matrix_only: true,
    deterministic_fixture_corpus_only: true,
    metadata_only_replay_coverage_only: true,
    coverage_matrix_only: true,
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

  function asRecord(value){ return Object.prototype.toString.call(value) === '[object Object]' ? value : {}; }
  function asArray(value){ return Array.isArray(value) ? value : []; }
  function asString(value, fallback){ return typeof value === 'string' && value.trim() ? value.trim() : fallback; }

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

  function freezeItem(item){ return Object.freeze(Object.assign({}, item)); }

  function buildCorpusItem(providerFamily, scenarioClass, index){
    const definition = SCENARIO_DEFINITIONS[scenarioClass];
    const fixture_id = `${providerFamily}__${scenarioClass}`;
    const scenario_id = `${scenarioClass}__v1`;
    const item = {
      fixture_id,
      provider_family: providerFamily,
      scenario_id,
      scenario_class: scenarioClass,
      scenario_index: index,
      contract_surface: definition.contract_surface,
      expected_replay_state: definition.expected_replay_state,
      replay_allowed: definition.replay_allowed,
      operator_review_required: definition.operator_review_required,
      has_request_envelope_metadata: definition.has_request_envelope_metadata,
      has_response_envelope_metadata: definition.has_response_envelope_metadata,
      has_failure_contract: definition.has_failure_contract,
      has_provider_family_mapping: definition.has_provider_family_mapping,
      network_invocation_allowed: false,
      live_provider_execution_performed: false,
      live_source_fetching_performed: false,
      raw_request_body_included: false,
      raw_response_body_included: false,
      authorization_header_included: false,
      secret_material_included: false,
      safe_metadata_only: true
    };
    item.checksum = deterministicChecksum(item);
    return freezeItem(item);
  }

  function buildAdapterReplayFixtureCorpus(options = {}){
    const providerFamilies = asArray(options.provider_families).length ? asArray(options.provider_families) : PROVIDER_FAMILIES;
    const scenarioClasses = asArray(options.scenario_classes).length ? asArray(options.scenario_classes) : SCENARIO_CLASSES;
    const overrides = asArray(options.corpus_overrides);
    const omitted = new Set(asArray(options.omit_fixture_ids));
    const items = [];
    providerFamilies.forEach((providerFamily) => {
      scenarioClasses.forEach((scenarioClass, index) => {
        if (!PROVIDER_FAMILIES.includes(providerFamily) || !SCENARIO_CLASSES.includes(scenarioClass)) return;
        const item = buildCorpusItem(providerFamily, scenarioClass, index + 1);
        if (!omitted.has(item.fixture_id)) items.push(item);
      });
    });
    for (const override of overrides) {
      const record = asRecord(override);
      if (record.fixture_id && !omitted.has(record.fixture_id)) {
        const next = Object.assign({}, record);
        if (!next.checksum) next.checksum = deterministicChecksum(next);
        items.push(freezeItem(next));
      }
    }
    return Object.freeze(items);
  }

  function buildCoverageMatrix(corpus, options = {}){
    const providerFamilies = asArray(options.provider_families).length ? asArray(options.provider_families) : PROVIDER_FAMILIES;
    const scenarioClasses = asArray(options.scenario_classes).length ? asArray(options.scenario_classes) : SCENARIO_CLASSES;
    const items = asArray(corpus);
    const rows = providerFamilies.map((providerFamily) => {
      const cells = {};
      scenarioClasses.forEach((scenarioClass) => {
        const item = items.find((candidate) => candidate.provider_family === providerFamily && candidate.scenario_class === scenarioClass);
        let state = 'gap';
        if (item) {
          if (item.expected_replay_state === 'blocked') state = 'blocked';
          else if (item.operator_review_required) state = 'review_required';
          else state = 'covered';
        }
        cells[scenarioClass] = Object.freeze({
          scenario_class: scenarioClass,
          state,
          fixture_id: item ? item.fixture_id : null,
          operator_review_required: !!(item && item.operator_review_required),
          replay_allowed: !!(item && item.replay_allowed)
        });
      });
      const coveredCount = Object.values(cells).filter((cell) => cell.state !== 'gap').length;
      const gapCount = Object.values(cells).filter((cell) => cell.state === 'gap').length;
      const reviewRequiredCount = Object.values(cells).filter((cell) => cell.state === 'review_required').length;
      const blockedCount = Object.values(cells).filter((cell) => cell.state === 'blocked').length;
      return Object.freeze({
        provider_family: providerFamily,
        cells: Object.freeze(cells),
        total_scenarios: scenarioClasses.length,
        covered_count: coveredCount,
        gap_count: gapCount,
        review_required_count: reviewRequiredCount,
        blocked_count: blockedCount,
        coverage_percentage: Number(((coveredCount / scenarioClasses.length) * 100).toFixed(2))
      });
    });
    const totalCells = providerFamilies.length * scenarioClasses.length;
    const coveredCells = rows.reduce((sum, row) => sum + row.covered_count, 0);
    const gapCells = rows.reduce((sum, row) => sum + row.gap_count, 0);
    const reviewRequiredCells = rows.reduce((sum, row) => sum + row.review_required_count, 0);
    const blockedCells = rows.reduce((sum, row) => sum + row.blocked_count, 0);
    const coveragePercentage = totalCells === 0 ? 0 : Number(((coveredCells / totalCells) * 100).toFixed(2));
    const matrix = {
      provider_families: Object.freeze(providerFamilies.slice()),
      scenario_columns: Object.freeze(scenarioClasses.slice()),
      allowed_cell_states: MATRIX_STATES,
      rows: Object.freeze(rows),
      total_cells: totalCells,
      covered_cells: coveredCells,
      gap_cells: gapCells,
      review_required_cells: reviewRequiredCells,
      blocked_cells: blockedCells,
      coverage_percentage: coveragePercentage,
      minimum_threshold_percent: MINIMUM_COVERAGE_THRESHOLD_PERCENT,
      threshold_met: coveragePercentage >= MINIMUM_COVERAGE_THRESHOLD_PERCENT
    };
    matrix.matrix_checksum = deterministicChecksum(matrix);
    return Object.freeze(matrix);
  }

  function buildCoverageGapWarnings(matrix){
    const warnings = [];
    const rows = asArray(asRecord(matrix).rows);
    rows.forEach((row) => {
      const cells = asRecord(row.cells);
      Object.keys(cells).forEach((scenarioClass) => {
        const cell = asRecord(cells[scenarioClass]);
        if (cell.state === 'gap') {
          warnings.push(Object.freeze({
            provider_family: row.provider_family,
            scenario_class: scenarioClass,
            warning: `missing coverage for ${row.provider_family}/${scenarioClass}`
          }));
        }
      });
    });
    return Object.freeze(warnings);
  }

  function scanForbidden(value, path, findings){
    if (value === null || typeof value !== 'object') return;
    if (Array.isArray(value)) {
      value.forEach((entry, index) => scanForbidden(entry, `${path}[${index}]`, findings));
      return;
    }
    Object.keys(value).forEach((key) => {
      const lower = key.toLowerCase();
      if (FORBIDDEN_FIELDS.includes(lower)) findings.push(`${path}.${key}`);
      scanForbidden(value[key], `${path}.${key}`, findings);
    });
  }

  function validateCorpusSafety(reportOrCorpus){
    const target = reportOrCorpus;
    const findings = [];
    scanForbidden(target, '$', findings);
    const records = Array.isArray(target) ? target : asArray(asRecord(target).corpus);
    records.forEach((item, index) => {
      const record = asRecord(item);
      if (record.network_invocation_allowed !== false) findings.push(`$.corpus[${index}].network_invocation_allowed`);
      if (record.live_provider_execution_performed !== false) findings.push(`$.corpus[${index}].live_provider_execution_performed`);
      if (record.live_source_fetching_performed !== false) findings.push(`$.corpus[${index}].live_source_fetching_performed`);
      if (record.raw_request_body_included !== false) findings.push(`$.corpus[${index}].raw_request_body_included`);
      if (record.raw_response_body_included !== false) findings.push(`$.corpus[${index}].raw_response_body_included`);
      if (record.authorization_header_included !== false) findings.push(`$.corpus[${index}].authorization_header_included`);
      if (record.secret_material_included !== false) findings.push(`$.corpus[${index}].secret_material_included`);
      if (record.safe_metadata_only !== true) findings.push(`$.corpus[${index}].safe_metadata_only`);
    });
    const report = asRecord(target);
    for (const flag of [
      'network_invocation_allowed',
      'live_provider_execution_enabled',
      'live_provider_execution_performed',
      'live_source_fetching_enabled',
      'live_source_fetching_performed',
      'hidden_network_calls_allowed',
      'real_oauth_token_lifecycle_enabled',
      'real_api_keys_stored',
      'real_tokens_stored',
      'credential_persistence_allowed',
      'backend_storage_expanded',
      'automatic_source_verification_claimed',
      'automatic_signoff_performed',
      'automatic_export_lock_performed',
      'publication_permission_claimed'
    ]) {
      if (Object.prototype.hasOwnProperty.call(report, flag) && report[flag] !== false) findings.push(`$.${flag}`);
    }
    if (Object.prototype.hasOwnProperty.call(report, 'safe_metadata_only') && report.safe_metadata_only !== true) findings.push('$.safe_metadata_only');
    return Object.freeze({ ok: findings.length === 0, forbidden_present: Object.freeze(findings) });
  }

  function getAdapterContractBenchSummary(){
    const mod = root.adapterContractTestBenchNoNetworkInvocationReplayQa;
    if (!mod || typeof mod.buildAdapterContractTestBench !== 'function') return null;
    return Object.freeze({
      baseline: ADAPTER_CONTRACT_BENCH_BASELINE,
      module_available: true,
      model: mod.MODEL || 'adapter_contract_test_bench_no_network_invocation_replay_qa.v1',
      no_network_replay_qa_only: true
    });
  }

  function withoutGeneratedAtForChecksum(report){
    const clone = Object.assign({}, report);
    delete clone.generated_at;
    clone.checksum = null;
    return clone;
  }

  function buildAdapterReplayFixtureCorpusCoverageMatrix(options = {}){
    const generatedAt = asString(options.generated_at, asString(options.now, FIXED_GENERATED_AT));
    const corpus = buildAdapterReplayFixtureCorpus(options);
    const coverageMatrix = buildCoverageMatrix(corpus, options);
    const gapWarnings = buildCoverageGapWarnings(coverageMatrix);
    const adapterBenchSummary = getAdapterContractBenchSummary();
    const report = {
      adapter_replay_fixture_corpus_coverage_matrix_version: VERSION,
      generated_at: generatedAt,
      milestone: MILESTONE,
      model: MODEL,
      adapter_contract_bench_summary_available: !!adapterBenchSummary,
      adapter_contract_bench_summary: adapterBenchSummary,
      corpus,
      coverage_matrix: coverageMatrix,
      coverage_gap_warnings: gapWarnings,
      required_preconditions: Object.freeze([
        'adapter_contract_test_bench_baseline_locked',
        'deterministic_replay_fixture_corpus_loaded',
        'provider_family_coverage_matrix_reviewed',
        'coverage_gap_warnings_reviewed',
        'operator_no_network_boundary_acknowledged'
      ]),
      operator_preconditions: Object.freeze([
        Object.freeze({ id: 'review_fixture_corpus', required: true, satisfied_by_default: false }),
        Object.freeze({ id: 'review_coverage_matrix', required: true, satisfied_by_default: false }),
        Object.freeze({ id: 'acknowledge_no_network_no_live_execution', required: true, satisfied_by_default: false })
      ]),
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
    };
    report.safety_validation = validateCorpusSafety(report);
    report.checksum = deterministicChecksum(withoutGeneratedAtForChecksum(report));
    return Object.freeze(report);
  }

  root.adapterReplayFixtureCorpusCoverageMatrix = Object.freeze({
    VERSION,
    MILESTONE,
    MODEL,
    ADAPTER_CONTRACT_BENCH_BASELINE,
    ADAPTER_SANDBOX_BASELINE,
    SAFETY_COCKPIT_BASELINE,
    STABLE_BASELINE,
    FIXED_GENERATED_AT,
    PROVIDER_FAMILIES,
    SCENARIO_CLASSES,
    SCENARIO_DEFINITIONS,
    MATRIX_STATES,
    FORBIDDEN_FIELDS,
    BOUNDARY_FLAGS,
    MINIMUM_COVERAGE_THRESHOLD_PERCENT,
    deterministicChecksum,
    buildAdapterReplayFixtureCorpus,
    buildCoverageMatrix,
    buildCoverageGapWarnings,
    validateCorpusSafety,
    buildAdapterReplayFixtureCorpusCoverageMatrix
  });
})(typeof window !== 'undefined' ? window : globalThis);
