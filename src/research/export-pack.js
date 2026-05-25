/* Jarbou3i Research Engine Export Pack v3 — v1.1.0. */
(function(global){
  'use strict';
  const root = global.Jarbou3iResearchModules = global.Jarbou3iResearchModules || {};
  const EXPORT_PACK_VERSION = '1.3.0-alpha.10';
  const EXPORT_PACK_NAME = 'Export Pack v3';

  function nowIso(){ return new Date().toISOString(); }
  function isPlainObject(value){ return Object.prototype.toString.call(value) === '[object Object]'; }
  function clone(value){ return value === undefined ? undefined : JSON.parse(JSON.stringify(value)); }
  function asArray(value){ return Array.isArray(value) ? value : []; }
  function safeString(value){ return String(value ?? ''); }
  function csvCell(value){
    const text = Array.isArray(value) ? value.join('|') : safeString(value);
    return /[",\n\r]/.test(text) ? '"' + text.replace(/"/g, '""') + '"' : text;
  }
  function rowsToCsv(rows){ return rows.map((row) => row.map(csvCell).join(',')).join('\n') + '\n'; }
  function jsonContent(value){ return JSON.stringify(value, null, 2) + '\n'; }
  function byteLength(text){ return new TextEncoder().encode(String(text ?? '')).length; }
  function checksum(text){
    const input = String(text ?? '');
    let hash = 2166136261;
    for(let i = 0; i < input.length; i += 1){ hash ^= input.charCodeAt(i); hash = Math.imul(hash, 16777619); }
    return (hash >>> 0).toString(16).padStart(8, '0');
  }
  function privacySafeObject(payload, options = {}){
    if(root.exportController && typeof root.exportController.privacySafeExportPayload === 'function') return root.exportController.privacySafeExportPayload(payload, {version:options.version || EXPORT_PACK_VERSION});
    if(root.privacyAudit && typeof root.privacyAudit.createPrivacySafeExportPayload === 'function') return root.privacyAudit.createPrivacySafeExportPayload(payload, {version:options.version || EXPORT_PACK_VERSION});
    return clone(payload);
  }
  function privacySafeText(text, options = {}){
    const audit = root.privacyAudit;
    if(audit && typeof audit.sanitizeAndAuditPrivacyPayload === 'function'){
      const result = audit.sanitizeAndAuditPrivacyPayload({file_content:safeString(text)}, {version:options.version || EXPORT_PACK_VERSION});
      return safeString(result.sanitized_payload?.file_content ?? text);
    }
    return safeString(text);
  }
  function fileEntry(path, mimeType, content, kind){
    const safeContent = privacySafeText(content);
    return {path, kind:kind || 'artifact', mime_type:mimeType, content:safeContent, bytes:byteLength(safeContent), checksum:checksum(safeContent)};
  }
  function markdownList(items){ return asArray(items).length ? asArray(items).map((item) => `- ${safeString(item)}`).join('\n') : '- None recorded'; }
  function evidenceMatrixCsv(packet){
    const rows = [['evidence_id','claim','source_title','source_url','source_type','source_date','time_relevance_score','evidence_strength','public_signal_score','confidence','supports','contradicts','notes']];
    asArray(packet.evidence_matrix).forEach((item) => rows.push([item.evidence_id, item.claim, item.source_title, item.source_url, item.source_type, item.source_date, item.time_relevance_score, item.evidence_strength, item.public_signal_score, item.confidence, asArray(item.supports).join('|'), asArray(item.contradicts).join('|'), item.notes]));
    return rowsToCsv(rows);
  }
  function reviewQueueCsv(packet){
    const rows = [['review_id','import_id','status','created_at','decision_at','accepted_evidence_id','claim','source_title','source_url','source_type','source_date','review_notes']];
    asArray(packet.evidence_review_queue).forEach((item) => {
      const evidence = item.evidence || item.candidate || {};
      rows.push([item.review_id, item.import_id, item.status, item.created_at, item.decision_at, item.accepted_evidence_id, evidence.claim, evidence.source_title, evidence.source_url, evidence.source_type, evidence.source_date, item.review_notes]);
    });
    return rowsToCsv(rows);
  }
  function providerRunLedger(packet){
    return privacySafeObject({workflow_version:packet.workflow_version || EXPORT_PACK_VERSION, generated_at:nowIso(), ledger_version:EXPORT_PACK_VERSION, provider:packet.provider || 'mock', provider_identity:packet.provider_identity || null, provider_diagnostics:packet.provider_diagnostics || null, provider_validation:packet.provider_validation || null, repair_trace:packet.repair_trace || null, ai_runs:asArray(packet.ai_runs)});
  }
  function qualityReport(packet){
    return privacySafeObject({workflow_version:packet.workflow_version || EXPORT_PACK_VERSION, generated_at:nowIso(), quality_report_version:EXPORT_PACK_VERSION, quality_gate:packet.quality_gate || null, analysis_brief_quality_gate_report:packet.analysis_brief?.quality_gate_report || null, diagnostics:packet.diagnostics || null, evidence_review_report:packet.evidence_review_report || null});
  }
  function privacyAuditReport(packet, files){
    const audit = root.privacyAudit;
    const fileReports = asArray(files).map((file) => {
      const report = audit && typeof audit.scanPrivacyPayload === 'function' ? audit.scanPrivacyPayload({path:file.path, content:file.content}) : {safe:true, issue_count:0, issues:[]};
      return {path:file.path, mime_type:file.mime_type, bytes:file.bytes, checksum:file.checksum, safe:report.safe, issue_count:report.issue_count, issues:report.issues || []};
    });
    const allSafe = fileReports.every((item) => item.safe);
    return privacySafeObject({workflow_version:packet.workflow_version || EXPORT_PACK_VERSION, generated_at:nowIso(), privacy_audit_version:EXPORT_PACK_VERSION, export_pack_version:EXPORT_PACK_VERSION, release_gate:allSafe && packet.privacy_export?.release_gate !== 'fail' ? 'pass' : 'fail', packet_privacy_export:packet.privacy_export || null, file_reports:fileReports, raw_token_exported:false, access_token_exported:false, refresh_token_exported:false, key_exported:false, secret_exported:false, credential_exported:false});
  }
  function analysisBriefMarkdown(packet){
    const brief = packet.analysis_brief || {};
    const template = packet.analysis_template || {};
    const quality = packet.quality_gate || brief.quality_gate_report || {};
    const clusters = asArray(brief.source_clusters).map((cluster) => `- ${safeString(cluster.cluster_id || cluster.layer || 'cluster')}: ${asArray(cluster.claims).join('; ') || 'No claims recorded'} (${asArray(cluster.evidence_ids).join(', ') || 'no evidence IDs'})`).join('\n') || '- No source clusters recorded';
    const links = asArray(packet.causal_links).map((link) => `- ${safeString(link.from)} ${safeString(link.relationship)} ${safeString(link.to)} — evidence: ${asArray(link.evidence_ids).join(', ') || 'none'}; confidence: ${safeString(link.confidence || 'unknown')}`).join('\n') || '- No causal links recorded';
    const evidence = asArray(packet.evidence_matrix).map((item) => `- ${safeString(item.evidence_id)}: ${safeString(item.claim)} — ${safeString(item.source_title || 'untitled source')}`).join('\n') || '- No evidence recorded';
    return [
      `# ${safeString(brief.topic || packet.research_plan?.topic || 'Jarbou3i Analysis Brief')}`,
      '',
      `**Context:** ${safeString(brief.context || packet.research_plan?.context || 'Not specified')}`,
      `**Template:** ${safeString(template.display_name || template.template_id || 'Strategic Analysis Engine')}`,
      `**Workflow version:** ${safeString(packet.workflow_version || EXPORT_PACK_VERSION)}`,
      `**Publication readiness:** ${safeString(quality.publication_readiness || 'review_required')} (${safeString(quality.overall_score ?? 'n/a')}/100)`,
      '',
      '## Handoff Summary',
      safeString(brief.handoff_summary || 'No handoff summary recorded.'),
      '',
      '## Research Questions',
      markdownList(brief.research_questions || packet.research_plan?.questions),
      '',
      '## Evidence Matrix',
      evidence,
      '',
      '## Brief Traceability',
      `- Traceability coverage: ${safeString(packet.brief_traceability_report?.traceability_coverage_pct ?? 0)}%`,
      `- Traceable paragraphs: ${safeString(packet.brief_traceability_report?.traceable_paragraph_count ?? 0)}/${safeString(packet.brief_traceability_report?.paragraph_count ?? 0)}`,
      `- Publication readiness export score: ${safeString(packet.publication_readiness_export_report?.publication_readiness_score ?? 0)}/100`,
      '',
      '## Release Candidate Hardening',
      `- Readiness score: ${safeString(packet.release_candidate_readiness_report?.readiness_score ?? 0)}/100`,
      `- Release gate: ${safeString(packet.release_candidate_readiness_report?.release_gate || 'release_candidate_hardening_review_required')}`,
      `- Hygiene gate: ${safeString(packet.final_repo_hygiene_report?.release_gate || 'final_repo_hygiene_review_required')}`,
      `- Stale release-copy matches: ${safeString(packet.stale_release_copy_sweep?.stale_match_count ?? 0)}`,
      '',
      '## Publication Review Gate',
      `- Review score: ${safeString(packet.publication_review_gate_report?.publication_review_score ?? 0)}/100`,
      `- Release gate: ${safeString(packet.publication_review_gate_report?.release_gate || 'publication_review_required')}`,
      `- Blockers: ${asArray(packet.publication_review_gate_report?.blocker_reasons).join(', ') || 'none recorded'}`,
      `- Unsupported conclusions: ${safeString(packet.claim_boundary_audit_report?.unsupported_conclusion_count ?? 0)}`,
      `- Claim classification warnings: ${safeString(packet.claim_classification_report?.boundary_warning_count ?? 0)}`,
      '',
      '## Golden Workflow Demo',
      `- End-to-end stages: ${safeString(packet.golden_end_to_end_demo_report?.passed_stage_count ?? 0)}/${safeString(packet.golden_end_to_end_demo_report?.stage_count ?? 0)}`,
      `- Golden export gate: ${safeString(packet.golden_export_pack_validation_report?.release_gate || 'golden_export_pack_review_required')}`,
      `- Hosted scenario gate: ${safeString(packet.hosted_demo_scenario_evidence?.release_gate || 'hosted_demo_scenario_evidence_required')}`,
      '',
      '## Source Clusters',
      clusters,
      '',
      '## Causal Links',
      links,
      '',
      '## Strategic Evidence Graph',
      `- Nodes: ${safeString(packet.graph_quality_report?.node_count ?? packet.strategic_evidence_graph?.graph_nodes?.length ?? 0)}`,
      `- Edges: ${safeString(packet.graph_quality_report?.edge_count ?? packet.strategic_evidence_graph?.graph_edges?.length ?? 0)}`,
      `- Export formats: ${asArray(packet.graph_export_report?.formats).join(', ') || 'none recorded'}`,
      `- Release gate: ${safeString(packet.graph_quality_report?.release_gate || 'graph_review_required')}`,
      '',
      '## Source-to-Brief Workbench',
      `- Claim map entries: ${safeString(packet.source_to_brief_workbench?.claim_map?.length ?? packet.source_to_brief_package?.claim_map?.length ?? 0)}`,
      `- Contradiction groups: ${safeString(packet.source_to_brief_workbench?.contradiction_groups?.length ?? packet.source_to_brief_package?.contradiction_groups?.length ?? 0)}`,
      `- Source gap warnings: ${safeString(packet.source_to_brief_workbench?.source_gaps?.warning_count ?? packet.source_to_brief_package?.source_gaps?.warning_count ?? 0)}`,
      `- Inferred confidence: ${safeString(packet.source_to_brief_workbench?.confidence_review?.inferred_confidence ?? packet.source_to_brief_package?.confidence_review?.inferred_confidence ?? 'low')}`,
      `- Automatic source verification claimed: ${safeString(packet.source_to_brief_workbench?.automatic_source_verification_claimed === true || packet.source_to_brief_package?.automatic_source_verification_claimed === true)}`,
      '',
      '## Provider Routing',
      `- Selected provider: ${safeString(packet.provider_route_report?.selected_provider || 'mock')}`,
      `- Cost preview: $${safeString(packet.provider_cost_report?.selected_estimated_cost_usd ?? 0)}`,
      `- Dry-run only: ${safeString(packet.provider_route_report?.dry_run_only !== false)}`,
      `- Paid calls performed: ${safeString(packet.provider_cost_report?.automatic_paid_call_performed === true)}`, 

      '',
      '## Coverage Gaps',
      markdownList(brief.gaps || packet.diagnostics?.gaps),
      '',
      '## Synthesis Constraints',
      markdownList(brief.synthesis_constraints),
      '',
      '## Quality Gate Fix Actions',
      markdownList(quality.fix_actions),
      '',
      '## Privacy Status',
      `- Release gate: ${safeString(packet.privacy_export?.release_gate || 'unknown')}`,
      `- Post-redaction issues: ${safeString(packet.privacy_export?.post_redaction_issue_count ?? 'unknown')}`,
      ''
    ].join('\n');
  }
  function baseManifest(packet, files){
    return {export_pack_version:EXPORT_PACK_VERSION, name:EXPORT_PACK_NAME, generated_at:nowIso(), workflow_version:packet.workflow_version || EXPORT_PACK_VERSION, topic:packet.research_plan?.topic || packet.analysis_brief?.topic || 'Untitled research packet', file_count:files.length, files:files.map((file) => ({path:file.path, kind:file.kind, mime_type:file.mime_type, bytes:file.bytes, checksum:file.checksum})), privacy_release_gate:packet.privacy_export?.release_gate || 'unknown', quality_publication_readiness:packet.quality_gate?.publication_readiness || 'review_required'};
  }

  function graphExportFiles(packet){
    const graph = packet.strategic_evidence_graph || {};
    const exports = graph.graph_exports || {};
    const files = [];
    if(exports.gephi_nodes_csv) files.push(fileEntry('graph/gephi-nodes.csv', 'text/csv', exports.gephi_nodes_csv, 'graph-gephi'));
    if(exports.gephi_edges_csv) files.push(fileEntry('graph/gephi-edges.csv', 'text/csv', exports.gephi_edges_csv, 'graph-gephi'));
    if(exports.kumu_json) files.push(fileEntry('graph/kumu-map.json', 'application/json', exports.kumu_json, 'graph-kumu'));
    if(exports.neo4j_nodes_csv) files.push(fileEntry('graph/neo4j-nodes.csv', 'text/csv', exports.neo4j_nodes_csv, 'graph-neo4j'));
    if(exports.neo4j_edges_csv) files.push(fileEntry('graph/neo4j-edges.csv', 'text/csv', exports.neo4j_edges_csv, 'graph-neo4j'));
    if(packet.graph_quality_report) files.push(fileEntry('graph/graph-quality-report.json', 'application/json', jsonContent(packet.graph_quality_report), 'graph-quality'));
    if(packet.graph_export_report) files.push(fileEntry('graph/graph-export-report.json', 'application/json', jsonContent(packet.graph_export_report), 'graph-export-report'));
    return files;
  }

  function sourceToBriefHandoffMarkdown(workbench = {}){
    const polish = workbench.export_polish_report || {};
    const review = workbench.review_throughput_summary || {};
    return [
      `# Source-to-Brief Operator Handoff`,
      '',
      `Research question: ${safeString(workbench.research_question || 'Untitled')}`,
      `Export review status: ${safeString(polish.export_review_status || 'manual_review_required')}`,
      `Unresolved review items: ${safeString(review.unresolved_count ?? 0)}`,
      `Traceability console rows: ${safeString(workbench.claim_traceability_console?.rows?.length ?? 0)}`,
      `Open ledger decisions: ${safeString(workbench.review_decision_ledger?.unresolved_decision_count ?? 0)}`,
      `Command palette commands: ${safeString(workbench.operator_command_palette?.enabled_command_count ?? 0)}`,
      `Navigation shortcuts: ${safeString(workbench.review_navigation_shortcuts?.shortcut_count ?? 0)}`,
      `Diagnostic repair queue open: ${safeString(workbench.diagnostic_repair_queue?.open_count ?? 0)}`,
      `Export risk blockers: ${safeString(workbench.export_risk_resolution?.blocker_count ?? 0)}`,
      `Guided session state: ${safeString(workbench.guided_research_session?.session_state ?? 'manual_review_required')}`,
      `Guided session progress: ${safeString(workbench.guided_research_session?.session_progress_percent ?? 0)}%`,
      `Guided UX focus: ${safeString(workbench.guided_session_ux_compression?.primary_focus_group ?? 'manual_review')}`,
      `Brief export QA gate: ${safeString(workbench.brief_assembly_export_qa?.qa_gate ?? 'brief_assembly_export_review_required')}`,
      `Preview diff gate: ${safeString(workbench.brief_assembly_preview_diff?.diff_gate ?? 'preview_diff_review_required')}`,
      `Export signoff gate: ${safeString(workbench.export_review_signoff?.signoff_gate ?? 'manual_operator_signoff_required')}`,
      `Operator signed off: ${safeString(workbench.export_review_signoff?.operator_signed_off === true || workbench.operator_signoff_state?.operator_signed_off === true)}`,
      `Operator signoff state: ${safeString(workbench.operator_signoff_state?.current_state ?? 'awaiting_operator_confirmation')}`,
      `Export lock status: ${safeString(workbench.export_lock_ledger?.lock_status ?? 'unlocked_manual_signoff_required')}`,
      `Lock ledger review gate: ${safeString(workbench.lock_ledger_review_surface?.release_gate ?? 'lock_ledger_review_unlocked')}`,
      `Signed export handoff status: ${safeString(workbench.signed_export_handoff_pack?.handoff_status ?? 'unlocked')}`,
      `Brief publication pack status: ${safeString(workbench.brief_publication_pack_v4?.publication_pack_status ?? 'manual_publication_review_required')}`,
      `Brief publication release gate: ${safeString(workbench.brief_publication_pack_v4?.publication_readiness_summary?.publication_release_gate ?? 'brief_publication_pack_manual_review_required')}`,
      `Source-to-claim gaps open: ${safeString(workbench.source_to_claim_gap_closure_queue?.open_count ?? 0)}`,
      `Source-to-claim export blockers: ${safeString(workbench.source_to_claim_gap_closure_queue?.required_before_export_count ?? 0)}`,
      `Export locked: ${safeString(workbench.export_lock_ledger?.export_locked === true)}`, 
      `Brief template UX gate: ${safeString(workbench.brief_template_ux_polish?.density_gate ?? 'brief_template_ux_review_required')}`,
      `Assembly variants compared: ${safeString(workbench.assembly_variant_comparison?.variant_count ?? 0)}`,
      `Contradiction review items: ${safeString(review.contradiction_open_count ?? 0)}`,
      `Low-traceability review items: ${safeString(review.low_traceability_open_count ?? 0)}`,
      '',
      '## Next Review Actions',
      markdownList(asArray(review.next_review_actions).map((action)=>`${safeString(action.label || action.action_id)}${action.review_id ? ` — ${safeString(action.review_id)}` : ''}`)),
      '',
      '## Handoff Files',
      markdownList(polish.handoff_file_plan),
      '',
      '## Export Boundary',
      safeString(polish.manual_local_disclaimer || 'Evidence is user-provided or source-imported. No automatic source verification is claimed.'),
      '',
      '## Blockers',
      markdownList(polish.blockers),
      '',
      '## Warnings',
      markdownList(polish.warnings),
      ''
    ].join('\n');
  }


  function claimTraceabilityCsv(workbench = {}){
    const rows = [['row_id','claim_id','support_level','support_score','traceability_status','decision_state','supporting_evidence_ids','contradicting_evidence_ids','warnings']];
    asArray(workbench.claim_traceability_console?.rows).forEach((row)=>rows.push([row.row_id, row.claim_id, row.support_level, row.support_score, row.traceability_status, row.decision_state, asArray(row.supporting_evidence_ids).join('|'), asArray(row.contradicting_evidence_ids).join('|'), asArray(row.warnings).join('|')]));
    return rowsToCsv(rows);
  }
  function reviewDecisionLedgerMarkdown(workbench = {}){
    const ledger = workbench.review_decision_ledger || {};
    const entries = asArray(ledger.entries).slice(0, 80).map((entry)=>`- ${safeString(entry.entry_id)} · ${safeString(entry.decision_type)} · ${safeString(entry.target_id)} · ${safeString(entry.decision_state)}`).join('\n') || '- No decision entries recorded';
    return [
      '# Review Decision Ledger',
      '',
      `Ledger gate: ${safeString(ledger.release_gate || 'review_decision_ledger_open')}`,
      `Open decisions: ${safeString(ledger.unresolved_decision_count ?? 0)}`,
      `Entry count: ${safeString(ledger.entry_count ?? 0)}`,
      '',
      '## Decision Entries',
      entries,
      '',
      '## Boundary',
      'Ledger entries are local/manual review decisions. They do not verify source truth, fetch live data, execute providers, or enable OAuth/backend behavior.',
      ''
    ].join('\n');
  }

  function sourceToBriefFiles(packet){
    const files = [];
    const workbenchApi = root.sourceToBriefWorkbench;
    const existingWorkbench = packet.source_to_brief_package || packet.source_to_brief_workbench || null;
    const generatedWorkbench = workbenchApi?.buildSourceToBriefWorkbench ? workbenchApi.buildSourceToBriefWorkbench(packet, {version:EXPORT_PACK_VERSION}) : null;
    const workbench = generatedWorkbench ? Object.assign({}, existingWorkbench || {}, generatedWorkbench) : existingWorkbench;
    if(!workbench) return files;
    files.push(fileEntry('source-to-brief/source-to-brief-package.json', 'application/json', jsonContent(workbench), 'source-to-brief-package'));
    const markdown = workbenchApi?.markdownBrief ? workbenchApi.markdownBrief(workbench) : jsonContent(workbench.exportable_strategic_brief || {});
    files.push(fileEntry('source-to-brief/strategic-brief.md', 'text/markdown', markdown, 'source-to-brief-brief'));
    const claimRows = workbenchApi?.claimMapRows ? workbenchApi.claimMapRows(workbench) : [['claim_id','support_level','supporting_evidence_ids','contradicting_evidence_ids']].concat(asArray(workbench.claim_map).map((claim)=>[claim.claim_id, claim.support_level, asArray(claim.supporting_evidence_ids).join('|'), asArray(claim.contradicting_evidence_ids).join('|')]));
    files.push(fileEntry('source-to-brief/claim-map.csv', 'text/csv', rowsToCsv(claimRows), 'source-to-brief-claim-map'));
    if(workbench.source_gaps) files.push(fileEntry('source-to-brief/source-gaps.json', 'application/json', jsonContent(workbench.source_gaps), 'source-to-brief-gaps'));
    if(workbench.confidence_review) files.push(fileEntry('source-to-brief/confidence-review.json', 'application/json', jsonContent(workbench.confidence_review), 'source-to-brief-confidence'));
    if(workbench.export_readiness_checklist) files.push(fileEntry('source-to-brief/export-readiness.json', 'application/json', jsonContent(workbench.export_readiness_checklist), 'source-to-brief-export-readiness'));
    if(workbench.export_polish_report) files.push(fileEntry('source-to-brief/export-polish-report.json', 'application/json', jsonContent(workbench.export_polish_report), 'source-to-brief-export-polish'));
    if(workbench.review_throughput_summary) files.push(fileEntry('source-to-brief/review-throughput-summary.json', 'application/json', jsonContent(workbench.review_throughput_summary), 'source-to-brief-review-throughput'));
    if(workbench.claim_traceability_console) files.push(fileEntry('source-to-brief/claim-traceability-console.json', 'application/json', jsonContent(workbench.claim_traceability_console), 'source-to-brief-claim-traceability-console'));
    if(workbench.claim_traceability_console) files.push(fileEntry('source-to-brief/claim-traceability.csv', 'text/csv', claimTraceabilityCsv(workbench), 'source-to-brief-claim-traceability-csv'));
    if(workbench.review_decision_ledger) files.push(fileEntry('source-to-brief/review-decision-ledger.json', 'application/json', jsonContent(workbench.review_decision_ledger), 'source-to-brief-review-decision-ledger'));
    if(workbench.review_decision_ledger) files.push(fileEntry('source-to-brief/review-decision-ledger.md', 'text/markdown', reviewDecisionLedgerMarkdown(workbench), 'source-to-brief-review-decision-ledger-md'));
    if(workbench.operator_command_palette) files.push(fileEntry('source-to-brief/operator-command-palette.json', 'application/json', jsonContent(workbench.operator_command_palette), 'source-to-brief-command-palette'));
    if(workbench.review_navigation_shortcuts) files.push(fileEntry('source-to-brief/review-navigation-shortcuts.json', 'application/json', jsonContent(workbench.review_navigation_shortcuts), 'source-to-brief-navigation-shortcuts'));
    if(workbench.review_quality_diagnostics) files.push(fileEntry('source-to-brief/review-quality-diagnostics.json', 'application/json', jsonContent(workbench.review_quality_diagnostics), 'source-to-brief-review-quality-diagnostics'));
    if(workbench.weak_claim_repair_suggestions) files.push(fileEntry('source-to-brief/weak-claim-repair-suggestions.json', 'application/json', jsonContent(workbench.weak_claim_repair_suggestions), 'source-to-brief-weak-claim-repair-suggestions'));
    if(workbench.review_quality_diagnostics && workbenchApi?.weakClaimRepairMarkdown) files.push(fileEntry('source-to-brief/weak-claim-repair-suggestions.md', 'text/markdown', workbenchApi.weakClaimRepairMarkdown(workbench), 'source-to-brief-weak-claim-repair-suggestions-md'));
    if(workbench.source_to_claim_gap_closure_queue) files.push(fileEntry('source-to-brief/source-to-claim-gap-closure-queue.json', 'application/json', jsonContent(workbench.source_to_claim_gap_closure_queue), 'source-to-brief-source-to-claim-gap-closure-queue'));
    if(workbench.source_to_claim_gap_closure_queue && workbenchApi?.sourceToClaimGapClosureQueueMarkdown) files.push(fileEntry('source-to-brief/source-to-claim-gap-closure-queue.md', 'text/markdown', workbenchApi.sourceToClaimGapClosureQueueMarkdown(workbench), 'source-to-brief-source-to-claim-gap-closure-queue-md'));
    if(workbench.diagnostic_repair_queue) files.push(fileEntry('source-to-brief/diagnostic-repair-queue.json', 'application/json', jsonContent(workbench.diagnostic_repair_queue), 'source-to-brief-diagnostic-repair-queue'));
    if(workbench.diagnostic_repair_queue && workbenchApi?.diagnosticRepairQueueMarkdown) files.push(fileEntry('source-to-brief/diagnostic-repair-queue.md', 'text/markdown', workbenchApi.diagnosticRepairQueueMarkdown(workbench), 'source-to-brief-diagnostic-repair-queue-md'));
    if(workbench.export_risk_resolution) files.push(fileEntry('source-to-brief/export-risk-resolution.json', 'application/json', jsonContent(workbench.export_risk_resolution), 'source-to-brief-export-risk-resolution'));
    if(workbench.export_risk_resolution && workbenchApi?.exportRiskResolutionMarkdown) files.push(fileEntry('source-to-brief/export-risk-resolution.md', 'text/markdown', workbenchApi.exportRiskResolutionMarkdown(workbench), 'source-to-brief-export-risk-resolution-md'));
    const guidedApi = root.guidedResearchSession;
    if(workbench.guided_research_session) files.push(fileEntry('source-to-brief/guided-research-session.json', 'application/json', jsonContent(workbench.guided_research_session), 'source-to-brief-guided-research-session'));
    if(workbench.guided_research_session && guidedApi?.guidedSessionMarkdown) files.push(fileEntry('source-to-brief/guided-research-session.md', 'text/markdown', guidedApi.guidedSessionMarkdown(workbench.guided_research_session), 'source-to-brief-guided-research-session-md'));
    if(workbench.guided_research_session && guidedApi?.briefAssemblyMarkdown) files.push(fileEntry('source-to-brief/brief-assembly-preview.md', 'text/markdown', guidedApi.briefAssemblyMarkdown(workbench.guided_research_session), 'source-to-brief-brief-assembly-preview-md'));
    if(workbench.brief_assembly_preview_diff) files.push(fileEntry('source-to-brief/brief-assembly-preview-diff.json', 'application/json', jsonContent(workbench.brief_assembly_preview_diff), 'source-to-brief-brief-assembly-preview-diff'));
    if(workbench.brief_assembly_preview_diff && guidedApi?.briefAssemblyPreviewDiffMarkdown) files.push(fileEntry('source-to-brief/brief-assembly-preview-diff.md', 'text/markdown', guidedApi.briefAssemblyPreviewDiffMarkdown(workbench.brief_assembly_preview_diff), 'source-to-brief-brief-assembly-preview-diff-md'));
    if(workbench.guided_session_ux_compression) files.push(fileEntry('source-to-brief/guided-session-ux-compression.json', 'application/json', jsonContent(workbench.guided_session_ux_compression), 'source-to-brief-guided-session-ux-compression'));
    if(workbench.brief_assembly_export_qa) files.push(fileEntry('source-to-brief/brief-assembly-export-qa.json', 'application/json', jsonContent(workbench.brief_assembly_export_qa), 'source-to-brief-brief-assembly-export-qa'));
    if(workbench.brief_assembly_export_qa && guidedApi?.briefAssemblyExportQaMarkdown) files.push(fileEntry('source-to-brief/brief-assembly-export-qa.md', 'text/markdown', guidedApi.briefAssemblyExportQaMarkdown(workbench.brief_assembly_export_qa), 'source-to-brief-brief-assembly-export-qa-md'));
    if(workbench.export_review_signoff) files.push(fileEntry('source-to-brief/export-review-signoff.json', 'application/json', jsonContent(workbench.export_review_signoff), 'source-to-brief-export-review-signoff'));
    if(workbench.export_review_signoff && guidedApi?.exportReviewSignoffMarkdown) files.push(fileEntry('source-to-brief/export-review-signoff.md', 'text/markdown', guidedApi.exportReviewSignoffMarkdown(workbench.export_review_signoff), 'source-to-brief-export-review-signoff-md'));
    if(workbench.operator_signoff_state) files.push(fileEntry('source-to-brief/operator-signoff-state.json', 'application/json', jsonContent(workbench.operator_signoff_state), 'source-to-brief-operator-signoff-state'));
    if(workbench.operator_signoff_state && guidedApi?.operatorSignoffStateMarkdown) files.push(fileEntry('source-to-brief/operator-signoff-state.md', 'text/markdown', guidedApi.operatorSignoffStateMarkdown(workbench.operator_signoff_state), 'source-to-brief-operator-signoff-state-md'));
    if(workbench.export_lock_ledger) files.push(fileEntry('source-to-brief/export-lock-ledger.json', 'application/json', jsonContent(workbench.export_lock_ledger), 'source-to-brief-export-lock-ledger'));
    if(workbench.export_lock_ledger && guidedApi?.exportLockLedgerMarkdown) files.push(fileEntry('source-to-brief/export-lock-ledger.md', 'text/markdown', guidedApi.exportLockLedgerMarkdown(workbench.export_lock_ledger), 'source-to-brief-export-lock-ledger-md'));
    if(workbench.lock_ledger_review_surface) files.push(fileEntry('source-to-brief/lock-ledger-review-surface.json', 'application/json', jsonContent(workbench.lock_ledger_review_surface), 'source-to-brief-lock-ledger-review-surface'));
    if(workbench.lock_ledger_review_surface && workbenchApi?.lockLedgerReviewSurfaceMarkdown) files.push(fileEntry('source-to-brief/lock-ledger-review-surface.md', 'text/markdown', workbenchApi.lockLedgerReviewSurfaceMarkdown(workbench), 'source-to-brief-lock-ledger-review-surface-md'));
    if(workbench.signed_export_handoff_pack) files.push(fileEntry('source-to-brief/signed-export-handoff-pack.json', 'application/json', jsonContent(workbench.signed_export_handoff_pack), 'source-to-brief-signed-export-handoff-pack'));
    if(workbench.signed_export_handoff_pack && workbenchApi?.signedExportHandoffPackMarkdown) files.push(fileEntry('source-to-brief/signed-export-handoff-pack.md', 'text/markdown', workbenchApi.signedExportHandoffPackMarkdown(workbench), 'source-to-brief-signed-export-handoff-pack-md'));
    if(workbench.brief_publication_pack_v4) files.push(fileEntry('source-to-brief/brief-publication-pack-v4.json', 'application/json', jsonContent(workbench.brief_publication_pack_v4), 'source-to-brief-brief-publication-pack-v4'));
    if(workbench.brief_publication_pack_v4 && workbenchApi?.briefPublicationPackV4Markdown) files.push(fileEntry('source-to-brief/brief-publication-pack-v4.md', 'text/markdown', workbenchApi.briefPublicationPackV4Markdown(workbench), 'source-to-brief-brief-publication-pack-v4-md'));
    if(workbench.brief_publication_pack_v4 && workbenchApi?.publicationReadyBriefMarkdown) files.push(fileEntry('source-to-brief/publication-ready-brief.md', 'text/markdown', workbenchApi.publicationReadyBriefMarkdown(workbench), 'source-to-brief-publication-ready-brief-md'));
    if(workbench.brief_publication_pack_v4 && workbenchApi?.evidenceAppendixMarkdown) files.push(fileEntry('source-to-brief/evidence-appendix.md', 'text/markdown', workbenchApi.evidenceAppendixMarkdown(workbench), 'source-to-brief-evidence-appendix-md'));
    if(workbench.brief_publication_pack_v4 && workbenchApi?.contradictionFalsifierAppendixMarkdown) files.push(fileEntry('source-to-brief/contradiction-falsifier-appendix.md', 'text/markdown', workbenchApi.contradictionFalsifierAppendixMarkdown(workbench), 'source-to-brief-contradiction-falsifier-appendix-md'));
    if(workbench.brief_publication_pack_v4 && workbenchApi?.sourceGapAppendixMarkdown) files.push(fileEntry('source-to-brief/source-gap-appendix.md', 'text/markdown', workbenchApi.sourceGapAppendixMarkdown(workbench), 'source-to-brief-source-gap-appendix-md'));
    if(workbench.brief_publication_pack_v4 && workbenchApi?.operatorSignoffLockLedgerAppendixMarkdown) files.push(fileEntry('source-to-brief/operator-signoff-lock-ledger-appendix.md', 'text/markdown', workbenchApi.operatorSignoffLockLedgerAppendixMarkdown(workbench), 'source-to-brief-operator-signoff-lock-ledger-appendix-md'));
    const templateApi = root.briefTemplateSystem;
    if(workbench.brief_template_system) files.push(fileEntry('source-to-brief/brief-template-system.json', 'application/json', jsonContent(workbench.brief_template_system), 'source-to-brief-brief-template-system'));
    if(workbench.brief_template_system && templateApi?.briefTemplateSystemMarkdown) files.push(fileEntry('source-to-brief/brief-template-system.md', 'text/markdown', templateApi.briefTemplateSystemMarkdown(workbench.brief_template_system), 'source-to-brief-brief-template-system-md'));
    if(workbench.assembly_variant_qa) files.push(fileEntry('source-to-brief/assembly-variant-qa.json', 'application/json', jsonContent(workbench.assembly_variant_qa), 'source-to-brief-assembly-variant-qa'));
    if(workbench.assembly_variant_qa && templateApi?.assemblyVariantQaMarkdown) files.push(fileEntry('source-to-brief/assembly-variant-qa.md', 'text/markdown', templateApi.assemblyVariantQaMarkdown(workbench.assembly_variant_qa), 'source-to-brief-assembly-variant-qa-md'));
    if(workbench.brief_template_ux_polish) files.push(fileEntry('source-to-brief/brief-template-ux-polish.json', 'application/json', jsonContent(workbench.brief_template_ux_polish), 'source-to-brief-brief-template-ux-polish'));
    if(workbench.brief_template_ux_polish && templateApi?.briefTemplateUxPolishMarkdown) files.push(fileEntry('source-to-brief/brief-template-ux-polish.md', 'text/markdown', templateApi.briefTemplateUxPolishMarkdown(workbench.brief_template_ux_polish), 'source-to-brief-brief-template-ux-polish-md'));
    if(workbench.assembly_variant_comparison) files.push(fileEntry('source-to-brief/assembly-variant-comparison.json', 'application/json', jsonContent(workbench.assembly_variant_comparison), 'source-to-brief-assembly-variant-comparison'));
    if(workbench.assembly_variant_comparison && templateApi?.assemblyVariantComparisonMarkdown) files.push(fileEntry('source-to-brief/assembly-variant-comparison.md', 'text/markdown', templateApi.assemblyVariantComparisonMarkdown(workbench.assembly_variant_comparison), 'source-to-brief-assembly-variant-comparison-md'));
    files.push(fileEntry('source-to-brief/operator-handoff.md', 'text/markdown', sourceToBriefHandoffMarkdown(workbench), 'source-to-brief-operator-handoff'));
    return files;
  }


  function providerRouteFiles(packet){
    const files = [];
    if(packet.provider_route_plan) files.push(fileEntry('provider/provider-route-plan.json', 'application/json', jsonContent(packet.provider_route_plan), 'provider-route'));
    if(packet.provider_route_report) files.push(fileEntry('provider/provider-route-report.json', 'application/json', jsonContent(packet.provider_route_report), 'provider-route-report'));
    if(packet.provider_cost_report) files.push(fileEntry('provider/provider-cost-report.json', 'application/json', jsonContent(packet.provider_cost_report), 'provider-cost'));
    if(packet.provider_router_safety_report) files.push(fileEntry('provider/provider-router-safety-report.json', 'application/json', jsonContent(packet.provider_router_safety_report), 'provider-safety'));
    return files;
  }


  function reviewThroughputFiles(packet){
    const files = [];
    if(packet.evidence_workspace_ux_report) files.push(fileEntry('review/evidence-workspace-ux-report.json', 'application/json', jsonContent(packet.evidence_workspace_ux_report), 'review-ux'));
    if(packet.review_throughput_report) { files.push(fileEntry('review/brief-traceability-report.json', 'application/json', jsonContent(packet.review_throughput_report), 'brief-traceability')); files.push(fileEntry('review/review-throughput-report.json', 'application/json', jsonContent(packet.review_throughput_report), 'review-throughput')); }
    return files;
  }


  function goldenWorkflowFiles(packet){
    const files = [];
    if(packet.golden_workflow_corpus) files.push(fileEntry('golden/golden-workflow-corpus.json', 'application/json', jsonContent(packet.golden_workflow_corpus), 'golden-workflow-corpus'));
    if(packet.golden_end_to_end_demo_report) files.push(fileEntry('golden/golden-end-to-end-demo-report.json', 'application/json', jsonContent(packet.golden_end_to_end_demo_report), 'golden-end-to-end-demo'));
    if(packet.golden_export_pack_validation_report) files.push(fileEntry('golden/golden-export-pack-validation-report.json', 'application/json', jsonContent(packet.golden_export_pack_validation_report), 'golden-export-pack-validation'));
    if(packet.hosted_demo_scenario_evidence) files.push(fileEntry('golden/hosted-demo-scenario-evidence.json', 'application/json', jsonContent(packet.hosted_demo_scenario_evidence), 'hosted-demo-scenario'));
    if(packet.release_readiness_runbook) files.push(fileEntry('golden/release-readiness-runbook.json', 'application/json', jsonContent(packet.release_readiness_runbook), 'release-readiness-runbook'));
    return files;
  }


  function publicationReviewFiles(packet){
    const files = [];
    if(packet.claim_classification_report) files.push(fileEntry('publication-review/claim-classification-report.json', 'application/json', jsonContent(packet.claim_classification_report), 'claim-classification'));
    if(packet.claim_boundary_audit_report) files.push(fileEntry('publication-review/claim-boundary-audit-report.json', 'application/json', jsonContent(packet.claim_boundary_audit_report), 'claim-boundary-audit'));
    if(packet.contradiction_falsifier_completeness_report) files.push(fileEntry('publication-review/contradiction-falsifier-completeness-report.json', 'application/json', jsonContent(packet.contradiction_falsifier_completeness_report), 'contradiction-falsifier-completeness'));
    if(packet.publication_review_gate_report) files.push(fileEntry('publication-review/publication-review-gate-report.json', 'application/json', jsonContent(packet.publication_review_gate_report), 'publication-review-gate'));
    if(packet.export_safe_final_review_report) files.push(fileEntry('publication-review/export-safe-final-review-report.json', 'application/json', jsonContent(packet.export_safe_final_review_report), 'export-safe-final-review'));
    return files;
  }


  function releaseCandidateHygieneFiles(packet){
    const files = [];
    if(packet.final_repo_hygiene_report) files.push(fileEntry('release-candidate/final-repo-hygiene-report.json', 'application/json', jsonContent(packet.final_repo_hygiene_report), 'final-repo-hygiene'));
    if(packet.stale_release_copy_sweep) files.push(fileEntry('release-candidate/stale-release-copy-sweep.json', 'application/json', jsonContent(packet.stale_release_copy_sweep), 'stale-release-copy-sweep'));
    if(packet.golden_workflow_regression_lock) files.push(fileEntry('release-candidate/golden-workflow-regression-lock.json', 'application/json', jsonContent(packet.golden_workflow_regression_lock), 'golden-workflow-regression-lock'));
    if(packet.export_pack_artifact_consistency_lock) files.push(fileEntry('release-candidate/export-pack-artifact-consistency-lock.json', 'application/json', jsonContent(packet.export_pack_artifact_consistency_lock), 'export-pack-artifact-consistency-lock'));
    if(packet.hosted_demo_evidence_runbook) files.push(fileEntry('release-candidate/hosted-demo-evidence-runbook.json', 'application/json', jsonContent(packet.hosted_demo_evidence_runbook), 'hosted-demo-evidence-runbook'));
    if(packet.no_browser_browser_ci_parity_report) files.push(fileEntry('release-candidate/no-browser-browser-ci-parity-report.json', 'application/json', jsonContent(packet.no_browser_browser_ci_parity_report), 'ci-parity'));
    if(packet.release_candidate_readiness_report) files.push(fileEntry('release-candidate/release-candidate-readiness-report.json', 'application/json', jsonContent(packet.release_candidate_readiness_report), 'release-candidate-readiness'));
    return files;
  }


  function evidencePackV3Files(packet, files = []){
    const pack = root.evidencePackV3;
    const existing = {
      evidence_pack_v3_manifest: packet.evidence_pack_v3_manifest || null,
      brief_traceability_report: packet.brief_traceability_report || null,
      contradiction_falsifier_appendix: packet.contradiction_falsifier_appendix || null,
      bundle_consistency_report: packet.bundle_consistency_report || null,
      publication_readiness_export_report: packet.publication_readiness_export_report || null
    };
    let bundle = existing;
    if(pack && typeof pack.buildEvidencePackV3Bundle === 'function') bundle = pack.buildEvidencePackV3Bundle(packet, files, {version:EXPORT_PACK_VERSION});
    const out = [];
    if(bundle.brief_traceability_report) out.push(fileEntry('traceability/brief-traceability-report.json', 'application/json', jsonContent(bundle.brief_traceability_report), 'brief-traceability'));
    if(bundle.contradiction_falsifier_appendix) out.push(fileEntry('traceability/contradiction-falsifier-appendix.json', 'application/json', jsonContent(bundle.contradiction_falsifier_appendix), 'contradiction-falsifier-appendix'));
    if(bundle.bundle_consistency_report) out.push(fileEntry('traceability/bundle-consistency-report.json', 'application/json', jsonContent(bundle.bundle_consistency_report), 'bundle-consistency'));
    if(bundle.publication_readiness_export_report) out.push(fileEntry('traceability/publication-readiness-export-report.json', 'application/json', jsonContent(bundle.publication_readiness_export_report), 'publication-readiness'));
    if(bundle.evidence_pack_v3_manifest) out.push(fileEntry('traceability/evidence-pack-v3-manifest.json', 'application/json', jsonContent(bundle.evidence_pack_v3_manifest), 'evidence-pack-v3-manifest'));
    return {bundle, files:out};
  }

  function createExportPack(packet, options = {}){
    const version = options.version || EXPORT_PACK_VERSION;
    const safePacket = privacySafeObject(Object.assign({}, packet || {}, {workflow_version:(packet && packet.workflow_version) || version}), {version});
    const files = [];
    files.push(fileEntry('research-packet.json', 'application/json', jsonContent(safePacket), 'packet'));
    files.push(fileEntry('analysis-brief.md', 'text/markdown', analysisBriefMarkdown(safePacket), 'brief'));
    files.push(fileEntry('evidence-matrix.csv', 'text/csv', evidenceMatrixCsv(safePacket), 'evidence'));
    files.push(fileEntry('review-queue.csv', 'text/csv', reviewQueueCsv(safePacket), 'review'));
    files.push(fileEntry('provider-run-ledger.json', 'application/json', jsonContent(providerRunLedger(safePacket)), 'provider-ledger'));
    files.push(fileEntry('quality-report.json', 'application/json', jsonContent(qualityReport(safePacket)), 'quality'));
    files.push(fileEntry('privacy-audit.json', 'application/json', jsonContent(privacyAuditReport(safePacket, files)), 'privacy'));
    graphExportFiles(safePacket).forEach((file)=>files.push(file));
    sourceToBriefFiles(safePacket).forEach((file)=>files.push(file));
    providerRouteFiles(safePacket).forEach((file)=>files.push(file));
    reviewThroughputFiles(safePacket).forEach((file)=>files.push(file));
    publicationReviewFiles(safePacket).forEach((file)=>files.push(file));
    goldenWorkflowFiles(safePacket).forEach((file)=>files.push(file));
    releaseCandidateHygieneFiles(safePacket).forEach((file)=>files.push(file));
    const v3 = evidencePackV3Files(safePacket, files);
    v3.files.forEach((file)=>files.push(file));
    const manifest = Object.assign(baseManifest(safePacket, files), v3.bundle.evidence_pack_v3_manifest || {}, {export_pack_version:EXPORT_PACK_VERSION, name:EXPORT_PACK_NAME, export_pack_format:'export_pack_v3', file_count:files.length, files:files.map((file)=>({path:file.path, kind:file.kind, mime_type:file.mime_type, bytes:file.bytes, checksum:file.checksum}))});
    files.unshift(fileEntry('export-manifest.json', 'application/json', jsonContent(manifest), 'manifest'));
    return {export_pack_version:EXPORT_PACK_VERSION, export_pack_format:'export_pack_v3', generated_at:nowIso(), manifest, evidence_pack_v3:v3.bundle, files, privacy_release_gate:manifest.privacy_release_gate, file_count:files.length};
  }
  function downloadFile(file){
    if(!global.document || typeof Blob === 'undefined') return false;
    const blob = new Blob([file.content], {type:file.mime_type || 'text/plain'});
    const a = global.document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = file.path;
    global.document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 500);
    return true;
  }
  function downloadExportPack(packet, options = {}){
    const pack = createExportPack(packet, options);
    pack.files.forEach(downloadFile);
    return pack;
  }
  function exportPackSummaryHtml(pack, esc){
    const safeEsc = typeof esc === 'function' ? esc : (value) => safeString(value).replace(/[&<>'"]/g, (char) => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[char]));
    const fileRows = asArray(pack.files).map((file) => `<span>${safeEsc(file.path)} · ${safeEsc(file.bytes)} B</span>`).join('');
    return `<div class="researchJsonCard exportPackCard"><h4>Export Pack v3</h4><div class="miniChips"><span>${safeEsc(pack.file_count)} files</span><span>privacy:${safeEsc(pack.privacy_release_gate)}</span><span>${safeEsc(pack.export_pack_version)}</span></div><div class="miniChips">${fileRows}</div><small>Downloaded as separate files for GitHub, archive, Claude/ChatGPT handoff, or publication pipeline.</small></div>`;
  }
  root.exportPack = Object.freeze({EXPORT_PACK_VERSION, EXPORT_PACK_NAME, createExportPack, downloadExportPack, evidenceMatrixCsv, reviewQueueCsv, graphExportFiles, sourceToBriefFiles, claimTraceabilityCsv, reviewDecisionLedgerMarkdown, providerRouteFiles, analysisBriefMarkdown, providerRunLedger, qualityReport, privacyAuditReport, reviewThroughputFiles, publicationReviewFiles, goldenWorkflowFiles, releaseCandidateHygieneFiles, evidencePackV3Files, exportPackSummaryHtml});
  if(typeof module !== 'undefined' && module.exports) module.exports = root.exportPack;
})(typeof window !== 'undefined' ? window : globalThis);
