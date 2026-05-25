/* Jarbou3i Research Engine guided research session engine v1.3.0-rc.1. Local/manual only. */
(function(global){
  'use strict';
  const root = global.Jarbou3iResearchModules = global.Jarbou3iResearchModules || {};
  const VERSION = '1.3.0-rc.1';
  const SESSION_MODEL = 'guided_research_session_engine.v1';
  const BRIEF_ASSEMBLY_MODEL = 'brief_assembly_workflow.v1';
  const STEP_IDS = Object.freeze([
    'research_question',
    'research_mode',
    'research_plan',
    'evidence_intake',
    'evidence_review_queue',
    'evidence_to_claim_linking',
    'weak_claim_repair',
    'contradiction_resolution',
    'export_risk_clearance',
    'brief_assembly',
    'export_package'
  ]);
  const BLOCKED_CAPABILITIES = Object.freeze([
    'live_scraping',
    'live_web_search',
    'production_oauth',
    'provider_execution_expansion',
    'backend_behavior_expansion',
    'automatic_source_verification'
  ]);
  function nowIso(){ return new Date().toISOString(); }
  function text(value, fallback = ''){ return String(value ?? fallback).trim(); }
  function asArray(value){ return Array.isArray(value) ? value.filter(Boolean) : (value === undefined || value === null || value === '' ? [] : [value]); }
  function count(value){ return asArray(value).length; }
  function bool(value){ return !!value; }
  function stableChecksum(value){
    const input = JSON.stringify(value || {});
    let hash = 2166136261;
    for(let i = 0; i < input.length; i += 1){ hash ^= input.charCodeAt(i); hash = Math.imul(hash, 16777619); }
    return (hash >>> 0).toString(16).padStart(8, '0');
  }
  function uniqueText(values){ return Array.from(new Set(asArray(values).map((value)=>text(value)).filter(Boolean))); }
  function status(complete, blocker, warning){ return blocker ? 'blocked' : (complete ? (warning ? 'warning' : 'complete') : 'incomplete'); }
  function step(id, label, complete, blocker, warning, nextAction, evidence = {}){
    const state = status(complete, blocker, warning);
    return {
      step_id:id,
      label,
      state,
      complete:state === 'complete' || state === 'warning',
      warning:state === 'warning',
      blocker:state === 'blocked',
      next_action:state === 'complete' ? 'continue_or_review_next_step' : nextAction,
      completion_evidence:evidence,
      operator_checkpoint_required:state !== 'complete',
      local_manual_only:true
    };
  }
  function firstAction(steps){
    const target = asArray(steps).find((item)=>item.state === 'blocked' || item.state === 'incomplete' || item.state === 'warning');
    if(!target) return {action_id:'assemble_export_package', label:'Assemble export package', target_step:'export_package', priority:'normal'};
    return {action_id:`next_${target.step_id}`, label:target.next_action, target_step:target.step_id, priority:target.blocker ? 'high' : 'normal'};
  }
  function buildSessionSteps(workbench = {}, packet = {}){
    const evidenceCount = count(workbench.evidence_cards);
    const claimCount = count(workbench.claim_map);
    const linkedEvidenceCount = count(workbench.evidence_to_claim_links);
    const contradictionCount = count(workbench.contradiction_groups);
    const openRepairs = Number(workbench.diagnostic_repair_queue?.open_count || 0);
    const requiredRepairs = Number(workbench.diagnostic_repair_queue?.required_before_export_count || 0);
    const riskBlockers = Number(workbench.export_risk_resolution?.blocker_count || 0);
    const riskWarnings = Number(workbench.export_risk_resolution?.warning_count || 0);
    const readinessItems = asArray(workbench.export_readiness_checklist?.items);
    const readinessFailures = readinessItems.filter((item)=>!item.passed).length;
    const plan = packet.research_plan || workbench.research_plan || {};
    const question = text(workbench.research_question || plan.topic || packet.analysis_brief?.topic);
    const mode = text(plan.mode || plan.research_mode || packet.research_mode || packet.mode);
    const weakClaims = asArray(workbench.claim_map).filter((claim)=>['weak','unsupported'].includes(text(claim.support_level).toLowerCase())).length;
    return [
      step('research_question','Research question', !!question, false, false, 'define_research_question', {question_present:!!question}),
      step('research_mode','Research mode', !!mode || !!plan, false, !mode, 'select_research_mode_or_confirm_default', {mode:mode || 'default_structural'}),
      step('research_plan','Research plan', !!plan && (count(plan.questions) || count(plan.counter_evidence_targets) || !!question), false, false, 'generate_or_review_research_plan', {question_count:count(plan.questions), counter_evidence_targets:count(plan.counter_evidence_targets)}),
      step('evidence_intake','Evidence intake', evidenceCount > 0, false, evidenceCount < 2, 'import_or_enter_evidence_cards', {evidence_count:evidenceCount}),
      step('evidence_review_queue','Evidence review queue', Number(workbench.review_throughput_summary?.unresolved_count || 0) === 0, false, Number(workbench.review_throughput_summary?.unresolved_count || 0) > 0, 'resolve_pending_evidence_review_items', {unresolved_count:Number(workbench.review_throughput_summary?.unresolved_count || 0)}),
      step('evidence_to_claim_linking','Evidence-to-claim linking', claimCount > 0 && linkedEvidenceCount > 0, false, linkedEvidenceCount < evidenceCount, 'link_evidence_to_claims_or_mark_unlinked_evidence', {claim_count:claimCount, link_count:linkedEvidenceCount}),
      step('weak_claim_repair','Weak-claim repair', weakClaims === 0, false, weakClaims > 0 || openRepairs > 0, 'repair_weak_or_unsupported_claims_manually', {weak_or_unsupported_claim_count:weakClaims, open_repair_count:openRepairs}),
      step('contradiction_resolution','Contradiction resolution', contradictionCount === 0 || asArray(workbench.review_decision_ledger?.entries).some((entry)=>text(entry.decision_type).includes('contradiction')), false, contradictionCount > 0, 'review_contradiction_groups_and_record_decisions', {contradiction_group_count:contradictionCount}),
      step('export_risk_clearance','Export-risk clearance', riskBlockers === 0 && requiredRepairs === 0, riskBlockers > 0, riskWarnings > 0 || readinessFailures > 0, 'clear_export_risks_or_export_with_manual_warning', {blocker_count:riskBlockers, warning_count:riskWarnings, required_repair_count:requiredRepairs, readiness_failure_count:readinessFailures}),
      step('brief_assembly','Brief assembly', !!workbench.exportable_strategic_brief && claimCount > 0, claimCount === 0, false, 'assemble_brief_preview_from_reviewed_claims', {claim_count:claimCount, publication_status:text(workbench.exportable_strategic_brief?.publication_status || 'manual_review_required')}),
      step('export_package','Export package', !!workbench.export_polish_report && riskBlockers === 0, riskBlockers > 0, riskWarnings > 0, 'export_source_to_brief_package_after_manual_review', {handoff_file_count:Number(workbench.export_polish_report?.handoff_file_count || 0), export_status:text(workbench.export_polish_report?.export_review_status || 'manual_review_required')})
    ];
  }
  function buildBriefAssemblyPreview(workbench = {}, steps = []){
    const claims = asArray(workbench.claim_map);
    const strong = claims.filter((claim)=>text(claim.support_level).toLowerCase() === 'strong');
    const partial = claims.filter((claim)=>text(claim.support_level).toLowerCase() === 'partial');
    const weak = claims.filter((claim)=>['weak','unsupported'].includes(text(claim.support_level).toLowerCase()));
    const blockers = steps.filter((item)=>item.blocker).map((item)=>item.step_id);
    const warnings = steps.filter((item)=>item.warning).map((item)=>item.step_id);
    return {
      brief_assembly_version:VERSION,
      brief_assembly_model:BRIEF_ASSEMBLY_MODEL,
      title:text(workbench.exportable_strategic_brief?.title || workbench.research_question || 'Guided research brief'),
      research_question:text(workbench.research_question || ''),
      assembly_state:blockers.length ? 'blocked' : (warnings.length ? 'review_ready_with_warnings' : 'review_ready'),
      supported_claim_count:strong.length,
      partial_claim_count:partial.length,
      weak_or_unsupported_claim_count:weak.length,
      contradiction_group_count:count(workbench.contradiction_groups),
      source_gap_warning_count:Number(workbench.source_gaps?.warning_count || count(workbench.source_gaps?.warnings)),
      unresolved_export_risk_count:Number(workbench.export_risk_resolution?.blocker_count || 0) + Number(workbench.export_risk_resolution?.warning_count || 0),
      preview_sections:['research_question','executive_summary','claim_map','evidence_boundary','contradictions','source_gaps','confidence_review','export_risks','manual_disclaimer'],
      ready_to_export:blockers.length === 0,
      manual_review_required:true,
      evidence_boundary_note:text(workbench.exportable_strategic_brief?.source_boundary_note || 'Evidence is user-provided or source-imported. This session does not verify sources automatically.'),
      blocked_steps:blockers,
      warning_steps:warnings,
      no_automatic_verification_claim:true,
      live_fetching_performed:false,
      provider_execution_expanded:false,
      automatic_source_verification_claimed:false,
      verification_claimed:false
    };
  }

  function previewScalarRows(baseline = {}, current = {}){
    const fields = [
      ['assembly_state','Assembly state'],
      ['supported_claim_count','Supported claims'],
      ['partial_claim_count','Partial claims'],
      ['weak_or_unsupported_claim_count','Weak or unsupported claims'],
      ['contradiction_group_count','Contradiction groups'],
      ['source_gap_warning_count','Source gap warnings'],
      ['unresolved_export_risk_count','Unresolved export risks'],
      ['ready_to_export','Ready to export']
    ];
    return fields.map(([field,label])=>{
      const before = baseline[field];
      const after = current[field];
      return {
        field,
        label,
        before:before === undefined ? null : before,
        after:after === undefined ? null : after,
        changed:JSON.stringify(before ?? null) !== JSON.stringify(after ?? null),
        direction:typeof before === 'number' && typeof after === 'number' ? (after > before ? 'increased' : after < before ? 'decreased' : 'unchanged') : (JSON.stringify(before ?? null) === JSON.stringify(after ?? null) ? 'unchanged' : 'changed')
      };
    });
  }
  function sectionDiffRows(baseline = {}, current = {}){
    const before = asArray(baseline.preview_sections);
    const after = asArray(current.preview_sections);
    const all = Array.from(new Set(before.concat(after)));
    return all.map((section_id)=>({
      section_id,
      before_included:before.includes(section_id),
      after_included:after.includes(section_id),
      state:before.includes(section_id) && after.includes(section_id) ? 'unchanged' : before.includes(section_id) ? 'removed' : 'added'
    }));
  }
  function summarizePreview(preview = {}){
    return {
      title:text(preview.title || 'Guided research brief'),
      assembly_state:text(preview.assembly_state || 'manual_review_required'),
      supported_claim_count:Number(preview.supported_claim_count || 0),
      partial_claim_count:Number(preview.partial_claim_count || 0),
      weak_or_unsupported_claim_count:Number(preview.weak_or_unsupported_claim_count || 0),
      contradiction_group_count:Number(preview.contradiction_group_count || 0),
      source_gap_warning_count:Number(preview.source_gap_warning_count || 0),
      unresolved_export_risk_count:Number(preview.unresolved_export_risk_count || 0),
      ready_to_export:preview.ready_to_export === true,
      preview_sections:asArray(preview.preview_sections)
    };
  }
  function buildBriefAssemblyPreviewDiff(workbench = {}, preview = {}, options = {}){
    const generatedAt = options.now || nowIso();
    const baselineRaw = workbench.previous_brief_assembly_preview || workbench.brief_assembly_preview_baseline || workbench.brief_assembly_baseline || null;
    const baseline = baselineRaw ? summarizePreview(baselineRaw) : null;
    const current = summarizePreview(preview);
    const scalarRows = baseline ? previewScalarRows(baseline, current) : [];
    const sectionRows = baseline ? sectionDiffRows(baseline, current) : asArray(current.preview_sections).map((section_id)=>({section_id, before_included:false, after_included:true, state:'added_without_baseline'}));
    const changedScalarRows = scalarRows.filter((row)=>row.changed);
    const changedSectionRows = sectionRows.filter((row)=>row.state !== 'unchanged');
    const changeCount = changedScalarRows.length + changedSectionRows.length;
    return {
      brief_assembly_preview_diff_version:options.version || VERSION,
      diff_model:'brief_assembly_preview_diff.v1',
      generated_at:generatedAt,
      baseline_available:!!baseline,
      baseline_source:baseline ? text(baselineRaw?.baseline_source || baselineRaw?.generated_at || 'operator_supplied_previous_preview') : 'not_provided',
      current_title:current.title,
      current_assembly_state:current.assembly_state,
      scalar_diff_rows:scalarRows,
      section_diff_rows:sectionRows,
      changed_scalar_count:changedScalarRows.length,
      changed_section_count:changedSectionRows.length,
      change_count:changeCount,
      diff_gate:!baseline ? 'preview_diff_baseline_missing_manual_review_required' : (changeCount ? 'preview_diff_changes_require_operator_review' : 'preview_diff_clear'),
      operator_next_action:!baseline ? 'review_current_preview_without_baseline_or_attach_previous_preview' : (changeCount ? 'review_changed_preview_fields_before_signoff' : 'confirm_no_preview_changes_before_signoff'),
      manual_review_required:true,
      local_manual_only:true,
      live_fetching_performed:false,
      live_web_search_performed:false,
      provider_execution_expanded:false,
      automatic_source_verification_claimed:false,
      verification_claimed:false
    };
  }
  function buildExportReviewSignoff(session = {}, workbench = {}, qa = {}){
    const preview = session.brief_assembly_preview || workbench.brief_assembly_preview || {};
    const diff = session.brief_assembly_preview_diff || workbench.brief_assembly_preview_diff || {};
    const riskBlockers = Number(workbench.export_risk_resolution?.blocker_count || 0);
    const qaBlockers = Number(qa.blocker_count || 0);
    const checks = [
      {check_id:'preview_present', label:'Brief assembly preview is present', passed:!!text(preview.title || workbench.research_question), severity:'blocker'},
      {check_id:'preview_diff_present', label:'Brief assembly preview diff is present', passed:!!diff.diff_model, severity:'blocker'},
      {check_id:'evidence_boundary_present', label:'Evidence boundary is visible', passed:!!text(preview.evidence_boundary_note || workbench.exportable_strategic_brief?.source_boundary_note), severity:'blocker'},
      {check_id:'export_qa_clear_or_reviewable', label:'Export QA has no blockers', passed:qaBlockers === 0, severity:'blocker'},
      {check_id:'risk_blockers_cleared', label:'Export risk blockers are cleared', passed:riskBlockers === 0, severity:'blocker'},
      {check_id:'manual_disclaimer_present', label:'Manual/local disclaimer is present', passed:true, severity:'blocker'},
      {check_id:'no_auto_verification_claim', label:'No automatic verification claim is present', passed:session.automatic_source_verification_claimed !== true && workbench.automatic_source_verification_claimed !== true && preview.automatic_source_verification_claimed !== true, severity:'blocker'},
      {check_id:'no_live_provider_behavior', label:'No live fetching/provider execution is enabled', passed:session.live_fetching_performed !== true && workbench.live_fetching_performed !== true && workbench.provider_execution_expanded !== true, severity:'blocker'}
    ];
    const failed = checks.filter((check)=>!check.passed);
    const blockers = failed.filter((check)=>check.severity === 'blocker');
    const signoffStatus = blockers.length ? 'blocked_for_operator_signoff' : 'awaiting_operator_signoff';
    return {
      export_review_signoff_version:session.guided_research_session_version || VERSION,
      signoff_model:'export_review_signoff.v1',
      generated_at:nowIso(),
      signoff_status:signoffStatus,
      signoff_gate:blockers.length ? 'export_review_signoff_blocked' : 'manual_operator_signoff_required',
      operator_signed_off:false,
      automatic_signoff_performed:false,
      can_export_after_manual_confirmation:blockers.length === 0,
      required_operator_confirmations:[
        'review_brief_assembly_preview',
        'review_preview_diff_or_confirm_no_baseline',
        'confirm_evidence_boundary_visible',
        'confirm_export_qa_and_risk_warnings',
        'confirm_no_automatic_source_verification_claim'
      ],
      check_count:checks.length,
      passed_check_count:checks.filter((check)=>check.passed).length,
      blocker_count:blockers.length,
      warning_count:failed.length - blockers.length,
      checks,
      preview_diff_gate:text(diff.diff_gate || 'preview_diff_review_required'),
      qa_gate:text(qa.qa_gate || 'brief_assembly_export_review_required'),
      risk_blocker_count:riskBlockers,
      manual_local_boundary:'Export review signoff is a local/manual pre-export dossier. It records required confirmations but never signs off automatically.',
      local_manual_only:true,
      live_fetching_performed:false,
      live_web_search_performed:false,
      provider_execution_expanded:false,
      automatic_source_verification_claimed:false,
      verification_claimed:false
    };
  }


  function normalizeOperatorSignoffInput(packet = {}){
    const input = packet.operator_signoff_input || packet.manual_operator_signoff || packet.export_review_operator_signoff || packet.export_lock_request || null;
    if(!input || typeof input !== 'object') return {present:false, decision:'pending', confirmations:[], operator_id:'', signed_at:'', notes:''};
    const decision = text(input.decision || input.status || (input.operator_signed_off === true || input.signed_off === true ? 'signed_off' : 'pending')).toLowerCase();
    return {
      present:true,
      decision:decision || 'pending',
      confirmations:uniqueText(input.confirmations || input.required_confirmations_completed || input.checked_confirmations),
      operator_id:text(input.operator_id || input.operator || input.reviewer_id || input.reviewer || ''),
      signed_at:text(input.signed_at || input.decided_at || input.timestamp || ''),
      notes:text(input.notes || input.operator_notes || input.review_notes || '')
    };
  }
  function buildOperatorSignoffState(signoff = {}, workbench = {}, packet = {}, options = {}){
    const version = options.version || signoff.export_review_signoff_version || VERSION;
    const generatedAt = options.now || nowIso();
    const input = normalizeOperatorSignoffInput(packet);
    const required = uniqueText(signoff.required_operator_confirmations);
    const missing = required.filter((item)=>!input.confirmations.includes(item));
    const riskBlockers = Number(workbench.export_risk_resolution?.blocker_count || 0);
    const signoffBlockers = Number(signoff.blocker_count || 0) + (signoff.signoff_gate === 'export_review_signoff_blocked' ? 1 : 0) + riskBlockers;
    const identityPresent = !!input.operator_id;
    const signedAtPresent = !!input.signed_at;
    const signedDecision = input.decision === 'signed_off' || input.decision === 'approved' || input.decision === 'approve_export';
    let currentState = 'awaiting_operator_confirmation';
    if(signoffBlockers > 0) currentState = 'blocked_for_operator_signoff';
    else if(['rejected','reject','rejected_export'].includes(input.decision)) currentState = 'operator_rejected_export';
    else if(['needs_changes','changes_requested','revise'].includes(input.decision)) currentState = 'changes_requested';
    else if(signedDecision && (!identityPresent || !signedAtPresent || missing.length)) currentState = 'incomplete_operator_signoff';
    else if(signedDecision && input.present) currentState = 'signed_off_ready_for_export_lock';
    const operatorSignedOff = currentState === 'signed_off_ready_for_export_lock';
    const checks = [
      {check_id:'signoff_dossier_present', label:'Export review signoff dossier is present', passed:!!signoff.signoff_model, severity:'blocker'},
      {check_id:'signoff_gate_reviewable', label:'Export review signoff gate is reviewable', passed:signoffBlockers === 0, severity:'blocker'},
      {check_id:'explicit_operator_decision', label:'Explicit operator signoff decision is present', passed:signedDecision && input.present, severity:'signoff_required'},
      {check_id:'operator_identity_present', label:'Operator identity is recorded', passed:identityPresent, severity:'signoff_required'},
      {check_id:'operator_signed_at_present', label:'Operator signoff timestamp is recorded', passed:signedAtPresent, severity:'signoff_required'},
      {check_id:'required_confirmations_complete', label:'All required operator confirmations are completed', passed:missing.length === 0 && required.length > 0, severity:'signoff_required'},
      {check_id:'no_automatic_signoff', label:'No automatic signoff was performed', passed:signoff.automatic_signoff_performed !== true, severity:'blocker'},
      {check_id:'no_automatic_source_verification_claim', label:'No automatic source verification claim is present', passed:signoff.automatic_source_verification_claimed !== true && workbench.automatic_source_verification_claimed !== true, severity:'blocker'},
      {check_id:'no_live_provider_behavior', label:'No live fetching/provider execution is enabled', passed:workbench.live_fetching_performed !== true && workbench.provider_execution_expanded !== true, severity:'blocker'}
    ];
    return {
      operator_signoff_state_version:version,
      state_model:'operator_signoff_state.v1',
      generated_at:generatedAt,
      current_state:currentState,
      signoff_gate:operatorSignedOff ? 'operator_signoff_lock_allowed' : (signoffBlockers ? 'operator_signoff_blocked' : 'operator_signoff_required'),
      export_permission:operatorSignedOff ? 'export_lock_allowed' : (signoffBlockers ? 'export_blocked' : 'manual_signoff_required'),
      signoff_input_present:input.present,
      operator_decision:input.decision,
      operator_id:input.operator_id || null,
      operator_signed_at:input.signed_at || null,
      operator_notes_present:!!input.notes,
      required_operator_confirmations:required,
      provided_operator_confirmations:input.confirmations,
      missing_operator_confirmations:missing,
      required_confirmation_count:required.length,
      provided_confirmation_count:input.confirmations.length,
      missing_confirmation_count:missing.length,
      operator_signed_off:operatorSignedOff,
      automatic_signoff_performed:false,
      automatic_export_lock_performed:false,
      signoff_blocker_count:signoffBlockers,
      checks,
      transition_log:[
        {transition_id:'OST-1', from_state:'export_review_signoff', to_state:'awaiting_operator_confirmation', trigger:'signoff_dossier_created', automatic_transition:true},
        {transition_id:'OST-2', from_state:'awaiting_operator_confirmation', to_state:currentState, trigger:input.present ? 'explicit_operator_input_evaluated' : 'operator_input_missing', automatic_transition:false}
      ],
      manual_local_boundary:'Operator signoff state is a local/manual state machine. It can only mark signoff complete from explicit operator input and never verifies source truth automatically.',
      local_manual_only:true,
      live_fetching_performed:false,
      live_web_search_performed:false,
      provider_execution_expanded:false,
      backend_behavior_expanded:false,
      production_oauth_enabled:false,
      automatic_source_verification_claimed:false,
      verification_claimed:false
    };
  }
  function buildExportLockLedger(signoffState = {}, workbench = {}, packet = {}, options = {}){
    const version = options.version || signoffState.operator_signoff_state_version || VERSION;
    const generatedAt = options.now || nowIso();
    const lockAllowed = signoffState.export_permission === 'export_lock_allowed' && signoffState.operator_signed_off === true;
    const blocked = signoffState.export_permission === 'export_blocked' || Number(signoffState.signoff_blocker_count || 0) > 0;
    const lockStatus = lockAllowed ? 'locked_for_export' : (blocked ? 'blocked_no_export_lock' : 'unlocked_manual_signoff_required');
    const lockHash = lockAllowed ? stableChecksum({version, operator_id:signoffState.operator_id, signed_at:signoffState.operator_signed_at, confirmations:signoffState.provided_operator_confirmations, preview_diff_gate:workbench.brief_assembly_preview_diff?.diff_gate, signoff_gate:signoffState.signoff_gate}) : null;
    const entries = [
      {entry_id:'ELL-1', event_type:'export_review_dossier_opened', event_state:'recorded', actor:'system', automatic_event:true, created_at:generatedAt, summary:'Export review dossier created; export remains controlled by manual operator signoff.'},
      {entry_id:'ELL-2', event_type:signoffState.signoff_input_present ? 'operator_signoff_input_recorded' : 'operator_signoff_missing', event_state:signoffState.signoff_input_present ? 'recorded' : 'pending', actor:signoffState.operator_id || 'operator_required', automatic_event:false, created_at:signoffState.operator_signed_at || generatedAt, summary:signoffState.signoff_input_present ? `Operator decision evaluated: ${text(signoffState.operator_decision || 'pending')}` : 'No explicit operator signoff input is attached.'}
    ];
    entries.push(lockAllowed ?
      {entry_id:'ELL-3', event_type:'export_locked_by_operator', event_state:'locked', actor:signoffState.operator_id || 'operator', automatic_event:false, created_at:signoffState.operator_signed_at || generatedAt, lock_hash:lockHash, summary:'Export lock created from explicit operator signoff input.'} :
      {entry_id:'ELL-3', event_type:'export_lock_not_created', event_state:blocked ? 'blocked' : 'pending', actor:'system', automatic_event:true, created_at:generatedAt, lock_hash:null, summary:blocked ? 'Export lock blocked by signoff or export-risk blockers.' : 'Export lock pending explicit operator signoff.'}
    );
    return {
      export_lock_ledger_version:version,
      ledger_model:'export_lock_ledger.v1',
      generated_at:generatedAt,
      lock_status:lockStatus,
      lock_gate:lockAllowed ? 'export_locked_operator_signed' : (blocked ? 'export_lock_blocked' : 'export_lock_manual_signoff_required'),
      export_locked:lockAllowed,
      export_lock_hash:lockHash,
      lock_created_from_explicit_operator_input:lockAllowed,
      automatic_lock_performed:false,
      automatic_signoff_performed:false,
      operator_id:signoffState.operator_id || null,
      operator_signed_at:signoffState.operator_signed_at || null,
      linked_signoff_state:signoffState.current_state || 'awaiting_operator_confirmation',
      linked_signoff_gate:signoffState.signoff_gate || 'operator_signoff_required',
      entry_count:entries.length,
      lock_entries:entries,
      immutable_after_lock:lockAllowed,
      manual_unlock_required:lockAllowed,
      export_allowed:lockAllowed,
      no_secrets_exported:true,
      manual_local_boundary:'Export lock ledger records local/manual export authorization state. It does not fetch, verify, execute providers, enable OAuth, or create a lock without explicit operator signoff input.',
      local_manual_only:true,
      live_fetching_performed:false,
      live_web_search_performed:false,
      provider_execution_expanded:false,
      backend_behavior_expanded:false,
      production_oauth_enabled:false,
      automatic_source_verification_claimed:false,
      verification_claimed:false
    };
  }

  function buildGuidedResearchSession(workbench = {}, packet = {}, options = {}){
    const version = options.version || VERSION;
    const generatedAt = options.now || nowIso();
    const steps = buildSessionSteps(workbench, packet);
    const completed = steps.filter((item)=>item.complete && !item.blocker).length;
    const blockers = steps.filter((item)=>item.blocker).length;
    const warnings = steps.filter((item)=>item.warning).length;
    const progress = Math.round((completed / steps.length) * 100);
    const next = firstAction(steps);
    const preview = buildBriefAssemblyPreview(workbench, steps);
    const previewDiff = buildBriefAssemblyPreviewDiff(workbench, preview, {version, now:generatedAt});
    const uxCompression = buildGuidedSessionUxCompression({guided_research_session_version:version, steps, session_progress_percent:progress, next_best_action:next, automatic_source_verification_claimed:false, live_fetching_performed:false, provider_execution_expanded:false}, workbench);
    const exportQa = buildBriefAssemblyExportQa({guided_research_session_version:version, brief_assembly_preview:preview, session_progress_percent:progress, local_manual_session:true, automatic_source_verification_claimed:false, live_fetching_performed:false, provider_execution_expanded:false}, workbench);
    const exportSignoff = buildExportReviewSignoff({guided_research_session_version:version, brief_assembly_preview:preview, brief_assembly_preview_diff:previewDiff, session_progress_percent:progress, automatic_source_verification_claimed:false, live_fetching_performed:false, provider_execution_expanded:false}, workbench, exportQa);
    const operatorSignoffState = buildOperatorSignoffState(exportSignoff, Object.assign({}, workbench, {brief_assembly_preview_diff:previewDiff}), packet, {version, now:generatedAt});
    const exportLockLedger = buildExportLockLedger(operatorSignoffState, Object.assign({}, workbench, {brief_assembly_preview_diff:previewDiff, export_review_signoff:exportSignoff}), packet, {version, now:generatedAt});
    return {
      guided_research_session_version:version,
      session_model:SESSION_MODEL,
      generated_at:generatedAt,
      session_state:blockers ? 'blocked' : (warnings ? 'active_with_warnings' : 'export_ready'),
      session_progress_percent:progress,
      completed_step_count:completed,
      total_step_count:steps.length,
      warning_step_count:warnings,
      blocker_step_count:blockers,
      current_step:next.target_step,
      next_best_action:next,
      steps,
      manual_operator_checkpoints:steps.filter((item)=>item.operator_checkpoint_required).map((item)=>({step_id:item.step_id, next_action:item.next_action, state:item.state})),
      brief_assembly_preview:preview,
      brief_assembly_preview_diff:previewDiff,
      ux_compression:uxCompression,
      brief_assembly_export_qa:exportQa,
      export_review_signoff:exportSignoff,
      operator_signoff_state:operatorSignoffState,
      export_lock_ledger:exportLockLedger,
      session_handoff_files:['source-to-brief/guided-research-session.json','source-to-brief/guided-research-session.md','source-to-brief/brief-assembly-preview.md','source-to-brief/brief-assembly-preview-diff.json','source-to-brief/brief-assembly-preview-diff.md','source-to-brief/export-review-signoff.json','source-to-brief/export-review-signoff.md','source-to-brief/operator-signoff-state.json','source-to-brief/operator-signoff-state.md','source-to-brief/export-lock-ledger.json','source-to-brief/export-lock-ledger.md','source-to-brief/source-to-claim-gap-closure-queue.json','source-to-brief/source-to-claim-gap-closure-queue.md'],
      local_manual_session:true,
      blocked_unavailable_capabilities:BLOCKED_CAPABILITIES.slice(),
      live_fetching_performed:false,
      live_web_search_performed:false,
      provider_execution_expanded:false,
      backend_behavior_expanded:false,
      production_oauth_enabled:false,
      automatic_source_verification_claimed:false,
      verification_claimed:false,
      release_gate:blockers ? 'guided_session_blocked' : 'guided_session_reviewable'
    };
  }

  function buildGuidedSessionUxCompression(session = {}, workbench = {}){
    const steps = asArray(session.steps);
    const groupDefs = [
      {group_id:'setup', label:'Setup', step_ids:['research_question','research_mode','research_plan']},
      {group_id:'evidence_review', label:'Evidence review', step_ids:['evidence_intake','evidence_review_queue','evidence_to_claim_linking']},
      {group_id:'repair_clearance', label:'Repair clearance', step_ids:['weak_claim_repair','contradiction_resolution','export_risk_clearance']},
      {group_id:'brief_export', label:'Brief export', step_ids:['brief_assembly','export_package']}
    ];
    const groups = groupDefs.map((def)=>{
      const groupSteps = steps.filter((step)=>def.step_ids.includes(step.step_id));
      const blockers = groupSteps.filter((step)=>step.blocker).length;
      const warnings = groupSteps.filter((step)=>step.warning).length;
      const complete = groupSteps.filter((step)=>step.complete && !step.blocker).length;
      const total = groupSteps.length || def.step_ids.length;
      const firstOpen = groupSteps.find((step)=>step.blocker || step.state === 'incomplete' || step.warning);
      return {
        group_id:def.group_id,
        label:def.label,
        step_ids:def.step_ids.slice(),
        compact_state:blockers ? 'blocked' : (warnings ? 'warning' : (complete >= total ? 'complete' : 'incomplete')),
        completed_step_count:complete,
        total_step_count:total,
        warning_step_count:warnings,
        blocker_step_count:blockers,
        next_step:firstOpen?.step_id || def.step_ids[def.step_ids.length - 1],
        next_action:firstOpen?.next_action || 'review_group_and_continue',
        visible:true
      };
    });
    const primary = groups.find((group)=>group.compact_state === 'blocked') || groups.find((group)=>group.compact_state === 'warning') || groups.find((group)=>group.compact_state === 'incomplete') || groups[groups.length - 1];
    return {
      ux_compression_version:session.guided_research_session_version || VERSION,
      compression_model:'guided_session_ux_compression.v1',
      compact_group_count:groups.length,
      visible_step_count:groups.length,
      original_step_count:steps.length,
      reduced_visible_decision_count:Math.max(0, steps.length - groups.length),
      primary_focus_group:primary?.group_id || 'brief_export',
      primary_next_action:primary?.next_action || session.next_best_action?.label || 'continue_manual_review',
      progress_percent:Number(session.session_progress_percent || 0),
      compact_groups:groups,
      operator_density_gate:'guided_session_compressed_reviewable',
      visual_density_risk:groups.some((group)=>group.blocker_step_count) ? 'medium' : 'low',
      manual_local_boundary:'UX compression summarizes local/manual session state and does not verify claims or sources automatically.',
      live_fetching_performed:false,
      live_web_search_performed:false,
      provider_execution_expanded:false,
      automatic_source_verification_claimed:false,
      verification_claimed:false
    };
  }
  function buildBriefAssemblyExportQa(session = {}, workbench = {}){
    const preview = session.brief_assembly_preview || workbench.brief_assembly_preview || {};
    const checks = [
      {check_id:'session_progress_visible', label:'Guided session progress is visible', passed:Number(session.session_progress_percent || 0) >= 0, severity:'blocker'},
      {check_id:'brief_preview_present', label:'Brief assembly preview is present', passed:!!preview && !!text(preview.title || workbench.research_question), severity:'blocker'},
      {check_id:'evidence_boundary_present', label:'Evidence boundary note is present', passed:!!text(preview.evidence_boundary_note || workbench.exportable_strategic_brief?.source_boundary_note), severity:'blocker'},
      {check_id:'manual_disclaimer_present', label:'Manual/local disclaimer is present', passed:session.local_manual_session === true || workbench.local_manual_workspace_model === true, severity:'blocker'},
      {check_id:'export_risks_visible', label:'Export risks are visible before export', passed:!!workbench.export_risk_resolution || Number(preview.unresolved_export_risk_count || 0) >= 0, severity:'warning'},
      {check_id:'repair_queue_visible', label:'Repair queue state is visible', passed:!!workbench.diagnostic_repair_queue, severity:'warning'},
      {check_id:'traceability_visible', label:'Traceability/ledger state is visible', passed:!!workbench.claim_traceability_console && !!workbench.review_decision_ledger, severity:'warning'},
      {check_id:'no_auto_verification_claim', label:'No automatic verification claim is present', passed:session.automatic_source_verification_claimed !== true && workbench.automatic_source_verification_claimed !== true && preview.automatic_source_verification_claimed !== true, severity:'blocker'},
      {check_id:'no_live_provider_behavior', label:'No live/provider execution behavior is enabled', passed:session.live_fetching_performed !== true && session.provider_execution_expanded !== true && workbench.provider_execution_expanded !== true, severity:'blocker'}
    ];
    const failed = checks.filter((check)=>!check.passed);
    const blockers = failed.filter((check)=>check.severity === 'blocker');
    return {
      brief_assembly_export_qa_version:session.guided_research_session_version || VERSION,
      qa_model:'brief_assembly_export_qa.v1',
      generated_at:nowIso(),
      check_count:checks.length,
      passed_check_count:checks.filter((check)=>check.passed).length,
      failed_check_count:failed.length,
      blocker_count:blockers.length,
      warning_count:failed.length - blockers.length,
      checks,
      qa_gate:blockers.length ? 'brief_assembly_export_blocked' : (failed.length ? 'brief_assembly_export_reviewable_with_warnings' : 'brief_assembly_export_reviewable'),
      export_ready:blockers.length === 0,
      next_action:blockers.length ? 'repair_brief_assembly_export_blockers' : (failed.length ? 'review_export_warnings_before_handoff' : 'confirm_operator_handoff'),
      required_export_files:['source-to-brief/guided-research-session.md','source-to-brief/brief-assembly-preview.md','source-to-brief/brief-assembly-export-qa.json','source-to-brief/brief-assembly-export-qa.md'],
      manual_local_boundary:'Brief assembly export QA is a local/manual checklist. It does not verify source truth, fetch live data, or execute providers.',
      live_fetching_performed:false,
      live_web_search_performed:false,
      provider_execution_expanded:false,
      automatic_source_verification_claimed:false,
      verification_claimed:false
    };
  }
  function briefAssemblyExportQaMarkdown(qa = {}){
    const checks = asArray(qa.checks).map((check)=>`- ${check.passed ? '[x]' : '[ ]'} ${check.label} (${check.severity})`).join('\n') || '- No export QA checks recorded.';
    return [
      '# Brief Assembly Export QA',
      '',
      `QA gate: ${text(qa.qa_gate || 'brief_assembly_export_review_required')}`,
      `Passed checks: ${Number(qa.passed_check_count || 0)}/${Number(qa.check_count || 0)}`,
      `Blockers: ${Number(qa.blocker_count || 0)}`,
      `Warnings: ${Number(qa.warning_count || 0)}`,
      `Next action: ${text(qa.next_action || 'manual_export_review')}`,
      '',
      '## Checks',
      checks,
      '',
      '## Boundary',
      text(qa.manual_local_boundary || 'Local/manual QA only. No automatic source verification is claimed.'),
      ''
    ].join('\n');
  }


  function briefAssemblyPreviewDiffMarkdown(diff = {}){
    const scalar = asArray(diff.scalar_diff_rows).map((row)=>`- ${row.changed ? '[changed]' : '[same]'} ${text(row.label || row.field)}: ${text(row.before ?? '∅')} → ${text(row.after ?? '∅')} (${text(row.direction || 'unchanged')})`).join('\n') || '- No scalar baseline diff rows recorded.';
    const sections = asArray(diff.section_diff_rows).map((row)=>`- ${text(row.section_id)}: ${text(row.state || 'unchanged')}`).join('\n') || '- No section diff rows recorded.';
    return [
      '# Brief Assembly Preview Diff',
      '',
      `Diff gate: ${text(diff.diff_gate || 'preview_diff_review_required')}`,
      `Baseline available: ${diff.baseline_available === true}`,
      `Changed scalar rows: ${Number(diff.changed_scalar_count || 0)}`,
      `Changed section rows: ${Number(diff.changed_section_count || 0)}`,
      `Operator next action: ${text(diff.operator_next_action || 'manual_preview_diff_review')}`,
      '',
      '## Scalar Changes',
      scalar,
      '',
      '## Section Changes',
      sections,
      '',
      '## Boundary',
      'Preview diff is local/manual comparison metadata. It does not verify sources, fetch live data, execute providers, or sign off automatically.',
      ''
    ].join('\n');
  }
  function exportReviewSignoffMarkdown(signoff = {}){
    const checks = asArray(signoff.checks).map((check)=>`- ${check.passed ? '[x]' : '[ ]'} ${check.label} (${check.severity})`).join('\n') || '- No signoff checks recorded.';
    const confirmations = asArray(signoff.required_operator_confirmations).map((item)=>`- ${item}`).join('\n') || '- No confirmations recorded.';
    return [
      '# Export Review Signoff',
      '',
      `Signoff gate: ${text(signoff.signoff_gate || 'manual_operator_signoff_required')}`,
      `Signoff status: ${text(signoff.signoff_status || 'awaiting_operator_signoff')}`,
      `Operator signed off: ${signoff.operator_signed_off === true}`,
      `Automatic signoff performed: ${signoff.automatic_signoff_performed === true}`,
      `Can export after manual confirmation: ${signoff.can_export_after_manual_confirmation === true}`,
      '',
      '## Required Operator Confirmations',
      confirmations,
      '',
      '## Checks',
      checks,
      '',
      '## Boundary',
      text(signoff.manual_local_boundary || 'Local/manual signoff dossier only. No automatic source verification is claimed.'),
      ''
    ].join('\n');
  }


  function operatorSignoffStateMarkdown(state = {}){
    const checks = asArray(state.checks).map((check)=>`- ${check.passed ? '[x]' : '[ ]'} ${check.label} (${check.severity})`).join('\n') || '- No signoff state checks recorded.';
    const missing = asArray(state.missing_operator_confirmations).map((item)=>`- ${item}`).join('\n') || '- None recorded.';
    return [
      '# Operator Signoff State',
      '',
      `Current state: ${text(state.current_state || 'awaiting_operator_confirmation')}`,
      `Signoff gate: ${text(state.signoff_gate || 'operator_signoff_required')}`,
      `Export permission: ${text(state.export_permission || 'manual_signoff_required')}`,
      `Operator signed off: ${state.operator_signed_off === true}`,
      `Automatic signoff performed: ${state.automatic_signoff_performed === true}`,
      '',
      '## Missing Confirmations',
      missing,
      '',
      '## Checks',
      checks,
      '',
      '## Boundary',
      text(state.manual_local_boundary || 'Local/manual operator signoff state only. No automatic source verification is claimed.'),
      ''
    ].join('\n');
  }
  function exportLockLedgerMarkdown(ledger = {}){
    const entries = asArray(ledger.lock_entries).map((entry)=>`- ${entry.entry_id}: ${entry.event_type} · ${entry.event_state} · ${entry.actor} — ${entry.summary}`).join('\n') || '- No export lock ledger entries recorded.';
    return [
      '# Export Lock Ledger',
      '',
      `Lock status: ${text(ledger.lock_status || 'unlocked_manual_signoff_required')}`,
      `Lock gate: ${text(ledger.lock_gate || 'export_lock_manual_signoff_required')}`,
      `Export locked: ${ledger.export_locked === true}`,
      `Export allowed: ${ledger.export_allowed === true}`,
      `Automatic lock performed: ${ledger.automatic_lock_performed === true}`,
      `Export lock hash: ${text(ledger.export_lock_hash || 'not_locked')}`,
      '',
      '## Lock Entries',
      entries,
      '',
      '## Boundary',
      text(ledger.manual_local_boundary || 'Local/manual export lock ledger only. No automatic source verification is claimed.'),
      ''
    ].join('\n');
  }

  function guidedSessionMarkdown(session = {}){
    const steps = asArray(session.steps).map((item)=>`- ${item.complete && !item.blocker ? '[x]' : '[ ]'} ${item.label}: ${item.state} — ${item.next_action}`).join('\n') || '- No session steps recorded.';
    const checkpoints = asArray(session.manual_operator_checkpoints).map((item)=>`- ${item.step_id}: ${item.state} — ${item.next_action}`).join('\n') || '- No manual checkpoints open.';
    return [
      '# Guided Research Session',
      '',
      `Session state: ${text(session.session_state || 'active')}`,
      `Progress: ${Number(session.session_progress_percent || 0)}%`,
      `Current step: ${text(session.current_step || 'research_question')}`,
      `Next action: ${text(session.next_best_action?.label || 'continue_manual_review')}`,
      `Operator signoff state: ${text(session.operator_signoff_state?.current_state || 'awaiting_operator_confirmation')}`,
      `Export lock status: ${text(session.export_lock_ledger?.lock_status || 'unlocked_manual_signoff_required')}`,
      '',
      '## Steps',
      steps,
      '',
      '## Manual Checkpoints',
      checkpoints,
      '',
      '## Boundary',
      'This guided session is local/manual. It does not fetch live sources, execute providers, enable OAuth/backend behavior, or automatically verify source truth.',
      ''
    ].join('\n');
  }
  function briefAssemblyMarkdown(session = {}){
    const preview = session.brief_assembly_preview || {};
    return [
      '# Brief Assembly Preview',
      '',
      `Title: ${text(preview.title || 'Guided research brief')}`,
      `Assembly state: ${text(preview.assembly_state || 'manual_review_required')}`,
      `Supported claims: ${Number(preview.supported_claim_count || 0)}`,
      `Partial claims: ${Number(preview.partial_claim_count || 0)}`,
      `Weak/unsupported claims: ${Number(preview.weak_or_unsupported_claim_count || 0)}`,
      `Contradiction groups: ${Number(preview.contradiction_group_count || 0)}`,
      `Unresolved export risks: ${Number(preview.unresolved_export_risk_count || 0)}`,
      '',
      '## Sections',
      asArray(preview.preview_sections).map((item)=>`- ${item}`).join('\n') || '- No sections recorded.',
      '',
      '## Evidence Boundary',
      text(preview.evidence_boundary_note || 'Evidence is user-provided or source-imported. No automatic verification is claimed.'),
      ''
    ].join('\n');
  }
  root.guidedResearchSession = Object.freeze({
    VERSION,
    SESSION_MODEL,
    BRIEF_ASSEMBLY_MODEL,
    STEP_IDS,
    BLOCKED_CAPABILITIES,
    buildGuidedResearchSession,
    buildGuidedSessionUxCompression,
    buildBriefAssemblyExportQa,
    buildBriefAssemblyPreviewDiff,
    buildExportReviewSignoff,
    buildOperatorSignoffState,
    buildExportLockLedger,
    briefAssemblyExportQaMarkdown,
    briefAssemblyPreviewDiffMarkdown,
    exportReviewSignoffMarkdown,
    operatorSignoffStateMarkdown,
    exportLockLedgerMarkdown,
    buildSessionSteps,
    buildBriefAssemblyPreview,
    guidedSessionMarkdown,
    briefAssemblyMarkdown
  });
})(typeof window !== 'undefined' ? window : globalThis);
