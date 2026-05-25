/* Jarbou3i Research Engine guided research session engine v1.3.0-alpha.5. Local/manual only. */
(function(global){
  'use strict';
  const root = global.Jarbou3iResearchModules = global.Jarbou3iResearchModules || {};
  const VERSION = '1.3.0-alpha.5';
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
      session_handoff_files:['source-to-brief/guided-research-session.json','source-to-brief/guided-research-session.md','source-to-brief/brief-assembly-preview.md','source-to-brief/brief-assembly-preview-diff.json','source-to-brief/brief-assembly-preview-diff.md','source-to-brief/export-review-signoff.json','source-to-brief/export-review-signoff.md'],
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
    briefAssemblyExportQaMarkdown,
    briefAssemblyPreviewDiffMarkdown,
    exportReviewSignoffMarkdown,
    buildSessionSteps,
    buildBriefAssemblyPreview,
    guidedSessionMarkdown,
    briefAssemblyMarkdown
  });
})(typeof window !== 'undefined' ? window : globalThis);
