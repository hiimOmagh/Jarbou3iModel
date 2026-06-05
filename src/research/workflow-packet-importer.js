/* Extracted from src/research-engine.js for v1.4.0-alpha.45. */
(function(global){
  'use strict';

  function importWorkflowPacket(packet, ctx){
    const {
      VERSION,
      state,
      migrateWorkflowPacketForImport,
      validateWorkflowPacket,
      scoreEvidence,
      validId,
      sanitizedProviderConfig,
      providerIdentityReport,
      providerBillingPolicy,
      save,
      render,
      setStatus,
      tr
    } = ctx;
    const migrated = migrateWorkflowPacketForImport(packet);
    if(!migrated.ok || !migrated.packet) throw new Error('migration_failed');
    const nextPacket = migrated.packet;
    if(!validateWorkflowPacket(nextPacket)) throw new Error('invalid_packet');
    state.plan = Object.assign({}, nextPacket.research_plan, {plan_version: VERSION});
    state.research_planner_report = nextPacket.research_planner_report || state.plan.research_planner_report || null;
    state.evidence = nextPacket.evidence_matrix.map((item, idx) => scoreEvidence(Object.assign({}, item, {evidence_id:`E${idx+1}`})));
    state.causal_links = Array.isArray(nextPacket.causal_links) ? nextPacket.causal_links.filter(link => link && validId(link.from) && validId(link.to) && Array.isArray(link.evidence_ids)) : [];
    state.analysis_brief = nextPacket.analysis_brief || null;
    state.diagnostics = nextPacket.diagnostics || null;
    state.critique = nextPacket.critique || null;
    state.provider = nextPacket.provider || state.provider || 'mock';
    state.provider_config = sanitizedProviderConfig(nextPacket.provider_config || state.provider_config || {});
    state.provider_identity = nextPacket.provider_identity || providerIdentityReport(state.provider, state.provider_config);
    state.provider_billing_policy = nextPacket.provider_billing_policy || providerBillingPolicy(state.provider, state.provider_config);
    state.provider_route_plan = nextPacket.provider_route_plan || null;
    state.provider_route_report = nextPacket.provider_route_report || null;
    state.provider_cost_report = nextPacket.provider_cost_report || null;
    state.provider_router_safety_report = nextPacket.provider_router_safety_report || null;
    state.evidence_pack_v3_manifest = nextPacket.evidence_pack_v3_manifest || null;
    state.brief_traceability_report = nextPacket.brief_traceability_report || null;
    state.contradiction_falsifier_appendix = nextPacket.contradiction_falsifier_appendix || null;
    state.bundle_consistency_report = nextPacket.bundle_consistency_report || null;
    state.publication_readiness_export_report = nextPacket.publication_readiness_export_report || null;
    state.claim_classification_report = nextPacket.claim_classification_report || null;
    state.claim_boundary_audit_report = nextPacket.claim_boundary_audit_report || null;
    state.contradiction_falsifier_completeness_report = nextPacket.contradiction_falsifier_completeness_report || null;
    state.publication_review_gate_report = nextPacket.publication_review_gate_report || null;
    state.export_safe_final_review_report = nextPacket.export_safe_final_review_report || null;
    state.golden_workflow_corpus = nextPacket.golden_workflow_corpus || null;
    state.golden_end_to_end_demo_report = nextPacket.golden_end_to_end_demo_report || null;
    state.golden_export_pack_validation_report = nextPacket.golden_export_pack_validation_report || null;
    state.hosted_demo_scenario_evidence = nextPacket.hosted_demo_scenario_evidence || null;
    state.release_readiness_runbook = nextPacket.release_readiness_runbook || null;
    state.final_repo_hygiene_report = nextPacket.final_repo_hygiene_report || null;
    state.stale_release_copy_sweep = nextPacket.stale_release_copy_sweep || null;
    state.golden_workflow_regression_lock = nextPacket.golden_workflow_regression_lock || null;
    state.export_pack_artifact_consistency_lock = nextPacket.export_pack_artifact_consistency_lock || null;
    state.hosted_demo_evidence_runbook = nextPacket.hosted_demo_evidence_runbook || null;
    state.no_browser_browser_ci_parity_report = nextPacket.no_browser_browser_ci_parity_report || null;
    state.release_candidate_readiness_report = nextPacket.release_candidate_readiness_report || null;
    state.portable_account = nextPacket.portable_account || state.portable_account || null;
    state.ai_runs = Array.isArray(nextPacket.ai_runs) ? nextPacket.ai_runs.slice(-25) : [];
    state.lastMockAnalysis = null;
    state.provider_diagnostics = nextPacket.provider_diagnostics || null;
    state.provider_fixture_report = nextPacket.provider_fixture_report || null;
    state.source_policy = nextPacket.source_policy || null;
    state.source_diagnostics = nextPacket.source_diagnostics || null;
    state.source_fixture_report = nextPacket.source_fixture_report || null;
    state.last_source_request = Array.isArray(nextPacket.source_requests) ? nextPacket.source_requests[0] || null : null;
    state.source_runs = Array.isArray(nextPacket.source_runs) ? nextPacket.source_runs.slice(-25) : [];
    state.source_results = Array.isArray(nextPacket.source_results) ? nextPacket.source_results.slice(-25) : [];
    state.release_candidate = nextPacket.release_candidate || null;
    state.browser_qa_hardening = nextPacket.browser_qa_hardening || null;
    state.public_demo = nextPacket.public_demo || null;
    state.release_notes = nextPacket.release_notes || null;
    state.source_imports = Array.isArray(nextPacket.source_imports) ? nextPacket.source_imports.slice(-25) : [];
    state.evidence_review_queue = Array.isArray(nextPacket.evidence_review_queue) ? nextPacket.evidence_review_queue.slice(-200) : [];
    state.evidence_review_report = nextPacket.evidence_review_report || null;
    state.strategic_evidence_graph = nextPacket.strategic_evidence_graph || null;
    state.graph_quality_report = nextPacket.graph_quality_report || null;
    state.graph_export_report = nextPacket.graph_export_report || null;
    state.source_to_brief_workbench = nextPacket.source_to_brief_workbench || nextPacket.source_to_brief_package || null;
    state.source_to_brief_package = nextPacket.source_to_brief_package || nextPacket.source_to_brief_workbench || null;
    state.claim_map = Array.isArray(nextPacket.claim_map) ? nextPacket.claim_map : (state.source_to_brief_workbench?.claim_map || []);
    state.contradiction_groups = Array.isArray(nextPacket.contradiction_groups) ? nextPacket.contradiction_groups : (state.source_to_brief_workbench?.contradiction_groups || []);
    state.source_to_brief_confidence_review = nextPacket.source_to_brief_confidence_review || state.source_to_brief_workbench?.confidence_review || null;
    state.source_to_brief_gap_report = nextPacket.source_to_brief_gap_report || state.source_to_brief_workbench?.source_gaps || null;
    state.source_import_report = nextPacket.source_import_report || null;
    state.source_cluster_report = nextPacket.source_cluster_report || nextPacket.source_gap_report || null;
    state.source_gap_report = nextPacket.source_gap_report || nextPacket.source_cluster_report || null;
    state.source_packet_roundtrip_report = nextPacket.source_packet_roundtrip_report || null;
    state.source_packet_template_report = nextPacket.source_packet_template_report || null;
    state.packet_migration_report = nextPacket.packet_migration_report || migrated.report || null;
    state.quality_gate = nextPacket.quality_gate || null;
    state.export_pack = nextPacket.export_pack || null;
    state.last_source_import_preview = null;
    state.editingEvidenceIndex = -1;
    save(); render();
    const report = state.packet_migration_report;
    const suffix = report && report.migrated ? ` ${report.source_version}→${report.target_version}` : '';
    setStatus(`${tr('statusImported')}${suffix}`, report?.warnings?.length ? 'warn' : 'good');
  }

  global.Jarbou3iResearchModules = global.Jarbou3iResearchModules || {};
  global.Jarbou3iResearchModules.workflowPacketImporter = Object.freeze({
    importWorkflowPacket
  });
})(typeof window !== 'undefined' ? window : globalThis);
