/* Jarbou3i Research Engine Export Pack v3 — v1.1.0-rc.1. */
(function(global){
  'use strict';
  const root = global.Jarbou3iResearchModules = global.Jarbou3iResearchModules || {};
  const EXPORT_PACK_VERSION = '1.1.0-rc.1';
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
    if(packet.review_throughput_report) files.push(fileEntry('review/brief-traceability-report.json', 'application/json', jsonContent(packet.review_throughput_report), 'brief-traceability'));
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
  root.exportPack = Object.freeze({EXPORT_PACK_VERSION, EXPORT_PACK_NAME, createExportPack, downloadExportPack, evidenceMatrixCsv, reviewQueueCsv, graphExportFiles, providerRouteFiles, analysisBriefMarkdown, providerRunLedger, qualityReport, privacyAuditReport, reviewThroughputFiles, publicationReviewFiles, goldenWorkflowFiles, releaseCandidateHygieneFiles, evidencePackV3Files, exportPackSummaryHtml});
  if(typeof module !== 'undefined' && module.exports) module.exports = root.exportPack;
})(typeof window !== 'undefined' ? window : globalThis);
