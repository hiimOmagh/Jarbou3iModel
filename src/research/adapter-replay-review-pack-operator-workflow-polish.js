/* Jarbou3i Research Engine adapter replay review pack operator workflow polish v1.4.0-alpha.31. */
/* Metadata-only operator workflow polish. No network calls, no provider execution, no OAuth/token lifecycle, no backend/storage/source behavior expansion. */
(function(global){
  'use strict';
  const root = global.Jarbou3iResearchModules = global.Jarbou3iResearchModules || {};

  const VERSION = '1.4.0-alpha.31';
  const MILESTONE = 'v1.4.0-alpha.31 — Adapter Replay Review Pack Operator Workflow Polish';
  const MODEL = 'adapter_replay_review_pack_operator_workflow_polish.v1';
  const PREVIEW_BASELINE = '1.4.0-alpha.29';
  const REVIEW_PACK_BASELINE = '1.4.0-alpha.28';
  const FIXED_GENERATED_AT = '2026-06-01T00:00:00.000Z';

  const BOUNDARY_FLAGS = Object.freeze({
    operator_workflow_polish_only: true,
    metadata_preview_only: true,
    deterministic_review_pack_backed: true,
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
  function getPreview(options = {}){
    if (options.preview) return options.preview;
    const mod = root.adapterReplayReviewPackUiExportPreview;
    if (mod && typeof mod.buildAdapterReplayReviewPackUiExportPreview === 'function') {
      return mod.buildAdapterReplayReviewPackUiExportPreview(options);
    }
    return null;
  }
  function laneForAction(action){
    if (action.blocking || action.status === 'fail') return 'blockers';
    if (action.status === 'review_required' || action.status === 'warn') return 'review_required';
    if (action.status === 'pass' || action.status === 'clear') return 'ready';
    return 'triage';
  }
  function priorityFor(action, index){
    if (action.blocking || action.status === 'fail') return 100 - index;
    if (action.status === 'review_required') return 80 - index;
    if (action.status === 'warn') return 60 - index;
    if (action.status === 'pass' || action.status === 'clear') return 20 - index;
    return 40 - index;
  }
  function normalizeActions(preview){
    const grouped = asRecord(preview.grouped_action_summary);
    const flat = [];
    for (const [sourceLane, items] of Object.entries(grouped)) {
      asArray(items).forEach((item, index) => {
        const action = asRecord(item);
        const lane = laneForAction(action);
        flat.push(Object.freeze({
          id: asString(action.id, `${sourceLane}-${index + 1}`),
          label: asString(action.label, 'Review required'),
          status: asString(action.status, sourceLane),
          lane,
          source_lane: sourceLane,
          blocking: !!action.blocking,
          priority: priorityFor(action, flat.length)
        }));
      });
    }
    if (!flat.length) {
      flat.push(Object.freeze({ id: 'review-pack-ready', label: 'Review pack ready for manual operator review.', status: 'ready', lane: 'ready', source_lane: 'none', blocking: false, priority: 20 }));
    }
    return Object.freeze(flat.sort((a, b) => b.priority - a.priority || a.id.localeCompare(b.id)));
  }
  function buildDecisionLanes(actions){
    const lanes = {
      blockers: { label: 'Blockers first', actions: [] },
      review_required: { label: 'Needs operator review', actions: [] },
      triage: { label: 'Triage / clarify', actions: [] },
      ready: { label: 'Ready / reference', actions: [] }
    };
    for (const action of actions) lanes[action.lane].actions.push(action);
    return Object.freeze(Object.fromEntries(Object.entries(lanes).map(([key, lane]) => [key, Object.freeze({ label: lane.label, action_count: lane.actions.length, actions: Object.freeze(lane.actions) })])));
  }
  function buildReviewFocus(preview, actions){
    const summary = asRecord(preview.export_preview_summary);
    const blockers = actions.filter((action) => action.lane === 'blockers').length;
    const reviewRequired = actions.filter((action) => action.lane === 'review_required').length;
    const ready = actions.filter((action) => action.lane === 'ready').length;
    const topAction = actions[0] || {};
    return Object.freeze({
      readiness_verdict: asString(preview.source_readiness_verdict, 'unknown'),
      readiness_state: asString(preview.source_readiness_state, 'unknown'),
      blocker_count: blockers,
      review_required_count: reviewRequired,
      ready_count: ready,
      preview_cards: Number(summary.preview_cards || 0),
      copy_actions: Number(summary.copy_actions || 0),
      export_actions: Number(summary.export_actions || 0),
      top_priority_action_id: topAction.id || null,
      top_priority_action_label: topAction.label || 'No required operator action detected.'
    });
  }
  function buildHandoffChecklist(actions, focus){
    const checklist = [];
    if (focus.blocker_count) checklist.push('Resolve blocker lane before export review.');
    if (focus.review_required_count) checklist.push('Review warning/review-required lane and record operator judgement.');
    checklist.push('Open Markdown preview and confirm human-readable handoff copy.');
    checklist.push('Open JSON preview and confirm metadata-only export payload.');
    checklist.push('Copy next-step summary manually; do not auto-sign, auto-lock, or publish.');
    return Object.freeze(checklist.map((label, index) => Object.freeze({ id: `handoff-${index + 1}`, label, manual: true, completed_by_default: false })));
  }
  function buildManualNextStepCopy(focus, checklist){
    return [
      `Review pack verdict: ${focus.readiness_verdict}`,
      `Top priority: ${focus.top_priority_action_label}`,
      `Blockers: ${focus.blocker_count}; review-required: ${focus.review_required_count}; ready references: ${focus.ready_count}`,
      `Manual checklist: ${checklist.map((item) => item.label).join(' | ')}`,
      'Boundary: metadata-only operator workflow polish; no live provider calls, source fetching, signoff, export lock, or publication permission.'
    ].join('\n');
  }
  function buildAdapterReplayReviewPackOperatorWorkflowPolish(options = {}){
    const generatedAt = asString(options.generated_at, asString(options.now, FIXED_GENERATED_AT));
    const preview = asRecord(getPreview(options));
    const prioritizedActions = normalizeActions(preview);
    const decisionLanes = buildDecisionLanes(prioritizedActions);
    const reviewFocus = buildReviewFocus(preview, prioritizedActions);
    const handoffChecklist = buildHandoffChecklist(prioritizedActions, reviewFocus);
    const manualNextStepCopy = buildManualNextStepCopy(reviewFocus, handoffChecklist);
    return Object.freeze({
      adapter_replay_review_pack_operator_workflow_polish_version: VERSION,
      generated_at: generatedAt,
      milestone: MILESTONE,
      model: MODEL,
      preview_baseline: PREVIEW_BASELINE,
      review_pack_baseline: REVIEW_PACK_BASELINE,
      source_review_pack_id: preview.source_review_pack_id || null,
      prioritized_operator_actions: prioritizedActions,
      decision_lanes: decisionLanes,
      review_focus_summary: reviewFocus,
      handoff_checklist: handoffChecklist,
      manual_next_step_copy: manualNextStepCopy,
      workflow_safety_contract: Object.freeze({
        workflow_polish_only: true,
        metadata_only: true,
        manual_operator_review_required: true,
        no_auto_copy: true,
        no_auto_download: true,
        no_auto_signoff: true,
        no_auto_export_lock: true,
        no_publication_permission: true
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
      cryptographic_signature_claimed: false,
      publication_permission_claimed: false
    });
  }
  function renderAdapterReplayReviewPackOperatorWorkflowPolish(target, options = {}){
    const el = typeof target === 'string' && global.document ? global.document.querySelector(target) : target;
    if (!el) return null;
    const workflow = buildAdapterReplayReviewPackOperatorWorkflowPolish(options);
    el.innerHTML = `
      <div class="adapterReplayOperatorWorkflowPanel" data-browser-qa="adapter-replay-review-pack-operator-workflow-polish-panel">
        <div class="miniGrid">
          <span><strong>${workflow.review_focus_summary.blocker_count}</strong><small>blockers</small></span>
          <span><strong>${workflow.review_focus_summary.review_required_count}</strong><small>review required</small></span>
          <span><strong>${workflow.handoff_checklist.length}</strong><small>handoff steps</small></span>
          <span><strong>${workflow.review_focus_summary.readiness_verdict}</strong><small>verdict</small></span>
        </div>
        <ol class="compactList adapterReplayOperatorWorkflowChecklist">
          ${workflow.handoff_checklist.map((item) => `<li>${item.label}</li>`).join('')}
        </ol>
      </div>`;
    el.setAttribute('data-operator-workflow-polish-ready', 'true');
    el.setAttribute('data-operator-workflow-action-count', String(workflow.prioritized_operator_actions.length));
    return workflow;
  }
  root.adapterReplayReviewPackOperatorWorkflowPolish = Object.freeze({
    VERSION,
    MILESTONE,
    MODEL,
    PREVIEW_BASELINE,
    REVIEW_PACK_BASELINE,
    buildAdapterReplayReviewPackOperatorWorkflowPolish,
    renderAdapterReplayReviewPackOperatorWorkflowPolish,
    BOUNDARY_FLAGS
  });
})(typeof window !== 'undefined' ? window : globalThis);
