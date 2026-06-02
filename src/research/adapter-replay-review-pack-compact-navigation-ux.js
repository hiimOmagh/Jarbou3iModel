/* Jarbou3i Research Engine adapter replay review pack compact navigation UX v1.4.0-alpha.39. */
/* Metadata-only compact navigation layer. No network calls, provider execution, OAuth/token lifecycle, backend/storage/source behavior expansion, status persistence, or UI-triggered mutation. */
(function(global){
  'use strict';
  const root = global.Jarbou3iResearchModules = global.Jarbou3iResearchModules || {};

  const VERSION = '1.4.0-alpha.39';
  const MILESTONE = 'v1.4.0-alpha.39 — Source-to-Brief Operator Control Room';
  const MODEL = 'source_to_brief_operator_continuity_console.v1';
  const OPERATOR_REVIEW_CONSOLE_BASELINE = '1.4.0-alpha.36';
  const HANDOFF_DOSSIER_BASELINE = '1.4.0-alpha.35';
  const TRIAGE_WORKBENCH_BASELINE = '1.4.0-alpha.34';
  const DECISION_QUEUE_BASELINE = '1.4.0-alpha.33';
  const TRACE_READER_BASELINE = '1.4.0-alpha.32';
  const FIXED_GENERATED_AT = '2026-06-01T00:00:00.000Z';

  const BOUNDARY_FLAGS = Object.freeze({
    compact_navigation_ux_only: true,
    metadata_preview_only: true,
    operator_review_console_backed: true,
    no_network_replay_only: true,
    manual_operator_review_required: true,
    navigation_compression_only: true,
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
    publication_permission_claimed: false,
    status_persistence_enabled: false,
    batch_mutation_enabled: false,
    navigation_state_persistence_enabled: false
  });

  function asRecord(value){ return Object.prototype.toString.call(value) === '[object Object]' ? value : {}; }
  function asArray(value){ return Array.isArray(value) ? value : []; }
  function asString(value, fallback){ return typeof value === 'string' && value.trim() ? value.trim() : fallback; }
  function freezeRows(rows){ return Object.freeze(rows.map((row) => Object.freeze(row))); }

  function getOperatorReviewConsole(options = {}){
    if (options.operator_review_console) return options.operator_review_console;
    const mod = root.adapterReplayReviewPackOperatorReviewConsole;
    if (mod && typeof mod.buildAdapterReplayReviewPackOperatorReviewConsole === 'function') {
      return mod.buildAdapterReplayReviewPackOperatorReviewConsole(options);
    }
    return null;
  }

  function compactLabel(value, fallback){
    const label = asString(value, fallback);
    if (label.length <= 34) return label;
    return `${label.slice(0, 31).trim()}…`;
  }

  function buildQuickJumpMap(reviewConsole){
    const sections = asArray(reviewConsole.console_sections);
    if (!sections.length) {
      return freezeRows([
        { jump_id: 'overview', label: 'Review overview', compact_label: 'Overview', target_surface: 'operator_review_console', reason: 'Start from the summary rail.', keyboard_hint: '1', scroll_priority: 1, is_preview_only: true }
      ]);
    }
    return freezeRows(sections.map((section, index) => {
      const rec = asRecord(section);
      const label = asString(rec.label || rec.title || rec.section_label, `Review section ${index + 1}`);
      return {
        jump_id: asString(rec.section_id || rec.id, `section-${index + 1}`),
        label,
        compact_label: compactLabel(label, `Section ${index + 1}`),
        target_surface: asString(rec.surface || rec.source_surface, 'operator_review_console'),
        reason: asString(rec.reason || rec.operator_value || rec.description, 'Jump directly to the relevant review block.'),
        keyboard_hint: String(index + 1),
        scroll_priority: index + 1,
        is_preview_only: true
      };
    }));
  }

  function buildFocusRail(reviewConsole){
    const cards = asArray(reviewConsole.unified_review_cards);
    const traceItems = asArray(reviewConsole.trace_navigation);
    const batchControls = asArray(reviewConsole.batch_review_controls);
    const blocked = cards.filter((card) => asString(asRecord(card).batch_status, '').includes('blocked'));
    const needsReview = cards.filter((card) => asString(asRecord(card).batch_status, '').includes('needs'));
    const ready = cards.filter((card) => asString(asRecord(card).batch_status, '').includes('ready'));
    return freezeRows([
      {
        rail_id: 'blocked-first',
        label: 'Blocked first',
        operator_question: 'What prevents handoff?',
        count: blocked.length,
        suggested_jump: blocked[0] ? asString(blocked[0].card_id || blocked[0].case_id, 'blocked-card') : 'batch-blockers',
        action_hint: 'Open blocker appendix before export review.',
        is_preview_only: true
      },
      {
        rail_id: 'needs-review-next',
        label: 'Needs review next',
        operator_question: 'What still requires manual judgment?',
        count: needsReview.length,
        suggested_jump: needsReview[0] ? asString(needsReview[0].card_id || needsReview[0].case_id, 'needs-review-card') : 'decision-queue',
        action_hint: 'Read the trace digest and choose one manual action.',
        is_preview_only: true
      },
      {
        rail_id: 'ready-last',
        label: 'Ready last',
        operator_question: 'What can be prepared for handoff copy?',
        count: ready.length,
        suggested_jump: ready[0] ? asString(ready[0].card_id || ready[0].case_id, 'ready-card') : 'handoff-dossier',
        action_hint: 'Prepare handoff only after blockers and review items are resolved.',
        is_preview_only: true
      },
      {
        rail_id: 'trace-digest',
        label: 'Trace digest',
        operator_question: 'Which evidence traces explain the decision?',
        count: traceItems.length,
        suggested_jump: traceItems[0] ? asString(traceItems[0].trace_id || traceItems[0].target_id, 'trace-reader') : 'trace-reader',
        action_hint: 'Use trace navigation before changing any status outside this preview.',
        is_preview_only: true
      },
      {
        rail_id: 'batch-controls',
        label: 'Preview-only batch controls',
        operator_question: 'Which controls are safe to inspect?',
        count: batchControls.length,
        suggested_jump: batchControls[0] ? asString(batchControls[0].control_id || batchControls[0].label, 'batch-control') : 'batch-controls',
        action_hint: 'Controls are descriptive only; they do not mutate batches or persist status.',
        is_preview_only: true
      }
    ]);
  }

  function buildProgressiveDisclosure(reviewConsole){
    const tabs = asArray(reviewConsole.review_tabs);
    return freezeRows(tabs.map((tab, index) => {
      const rec = asRecord(tab);
      const label = asString(rec.label || rec.tab_label || rec.id, `Review tab ${index + 1}`);
      return {
        disclosure_id: asString(rec.tab_id || rec.id, `tab-${index + 1}`),
        label,
        default_state: index === 0 ? 'expanded' : 'collapsed',
        compact_label: compactLabel(label, `Tab ${index + 1}`),
        reveal_condition: index === 0 ? 'initial overview' : 'operator opens the tab manually',
        preserves_context: true,
        is_preview_only: true
      };
    }));
  }

  function buildKeyboardMap(quickJumpMap){
    return freezeRows(quickJumpMap.slice(0, 9).map((jump) => ({
      shortcut: `Alt+${jump.keyboard_hint}`,
      label: jump.compact_label,
      target_jump_id: jump.jump_id,
      executes_action: false,
      mutates_state: false,
      is_preview_only: true
    })));
  }

  function buildMobileCompressionPlan(focusRail, quickJumpMap){
    return Object.freeze({
      default_density: 'compact',
      first_screen_slots: 4,
      primary_visible_items: quickJumpMap.slice(0, 4).map((jump) => jump.jump_id),
      focus_rail_order: focusRail.map((item) => item.rail_id),
      preserves_trace_access: true,
      preserves_handoff_readiness: true,
      avoids_horizontal_overflow: true,
      mutates_layout_state: false,
      persists_layout_state: false
    });
  }

  function buildExportSummary(reviewConsole, quickJumpMap, focusRail, progressiveDisclosure){
    const readiness = asRecord(reviewConsole.handoff_readiness);
    return Object.freeze({
      summary_id: 'adapter-replay-compact-navigation-export-summary',
      release: MILESTONE,
      generated_at: FIXED_GENERATED_AT,
      operator_review_console_version: asString(reviewConsole.adapter_replay_review_pack_operator_review_console_version, OPERATOR_REVIEW_CONSOLE_BASELINE),
      quick_jump_count: quickJumpMap.length,
      focus_rail_count: focusRail.length,
      progressive_disclosure_count: progressiveDisclosure.length,
      manual_review_required: true,
      handoff_ready_after_manual_review: readiness.handoff_ready_after_manual_review === true,
      export_note: 'metadata-only compact navigation UX: quick jumps, focus rail, progressive disclosure, keyboard hints, and mobile compression without live provider calls or status mutation.',
      safe_to_publish: false,
      verification_claimed: false,
      signoff_performed: false,
      export_lock_performed: false,
      publication_permission_claimed: false
    });
  }

  function buildManualCopy(exportSummary){
    return [
      'Compact navigation UX verdict: metadata-only navigation is ready for manual operator review.',
      `Quick jumps: ${exportSummary.quick_jump_count}. Focus rail items: ${exportSummary.focus_rail_count}.`,
      'Use blocked-first, needs-review, trace digest, and handoff readiness order before preparing export copy.',
      'Boundary: no live provider calls, no hidden network requests, no OAuth/token lifecycle, no source fetching, no status persistence, no batch mutation, no automatic verification, no signoff, no export lock, and no publication permission.'
    ].join('\n');
  }

  function buildAdapterReplayReviewPackCompactNavigationUx(options = {}){
    const reviewConsole = getOperatorReviewConsole(options) || {};
    const quickJumpMap = buildQuickJumpMap(reviewConsole);
    const focusRail = buildFocusRail(reviewConsole);
    const progressiveDisclosure = buildProgressiveDisclosure(reviewConsole);
    const keyboardNavigationMap = buildKeyboardMap(quickJumpMap);
    const mobileCompressionPlan = buildMobileCompressionPlan(focusRail, quickJumpMap);
    const exportSummary = buildExportSummary(reviewConsole, quickJumpMap, focusRail, progressiveDisclosure);

    return Object.freeze({
      source_to_brief_operator_continuity_console_version: VERSION,
      milestone: MILESTONE,
      model: MODEL,
      generated_at: FIXED_GENERATED_AT,
      operator_review_console_baseline: OPERATOR_REVIEW_CONSOLE_BASELINE,
      handoff_dossier_baseline: HANDOFF_DOSSIER_BASELINE,
      triage_workbench_baseline: TRIAGE_WORKBENCH_BASELINE,
      decision_queue_baseline: DECISION_QUEUE_BASELINE,
      trace_reader_baseline: TRACE_READER_BASELINE,
      compact_navigation_ready: true,
      safe_metadata_only: true,
      can_execute_now: false,
      quick_jump_map: quickJumpMap,
      focus_rail: focusRail,
      progressive_disclosure: progressiveDisclosure,
      keyboard_navigation_map: keyboardNavigationMap,
      mobile_compression_plan: mobileCompressionPlan,
      export_compact_navigation_summary: exportSummary,
      manual_compact_navigation_copy: buildManualCopy(exportSummary),
      compact_navigation_safety_contract: Object.freeze({
        compact_navigation_ux_only: true,
        metadata_only: true,
        manual_operator_review_required: true,
        no_auto_verification: true,
        no_auto_signoff: true,
        no_auto_export_lock: true,
        no_status_persistence: true,
        no_batch_mutation: true,
        no_navigation_state_persistence: true,
        no_publication_permission: true
      }),
      boundary_flags: BOUNDARY_FLAGS,
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
      publication_permission_claimed: false,
      status_persistence_enabled: false,
      batch_mutation_enabled: false,
      navigation_state_persistence_enabled: false
    });
  }

  root.adapterReplayReviewPackCompactNavigationUx = Object.freeze({
    VERSION,
    MILESTONE,
    MODEL,
    OPERATOR_REVIEW_CONSOLE_BASELINE,
    HANDOFF_DOSSIER_BASELINE,
    TRIAGE_WORKBENCH_BASELINE,
    DECISION_QUEUE_BASELINE,
    TRACE_READER_BASELINE,
    BOUNDARY_FLAGS,
    buildAdapterReplayReviewPackCompactNavigationUx
  });
})(typeof window !== 'undefined' ? window : globalThis);
