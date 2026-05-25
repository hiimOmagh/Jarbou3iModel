/* Jarbou3i Research Engine UX reliability helpers v1.1.0. */
(function(global){
  'use strict';
  const root = global.Jarbou3iResearchModules = global.Jarbou3iResearchModules || {};
  const VERSION = '1.3.0-alpha.9';

  function count(value){ return Array.isArray(value) ? value.length : 0; }
  function hasText(value){ return typeof value === 'string' && value.trim().length > 0; }

  function workflowSummary(packet = {}){
    const reviewQueue = Array.isArray(packet.evidence_review_queue) ? packet.evidence_review_queue : [];
    const pending = reviewQueue.filter((item) => item && item.status !== 'accepted' && item.status !== 'rejected').length;
    const runs = count(packet.ai_runs);
    const sourceImports = count(packet.source_imports);
    const migration = packet.packet_migration_report || null;
    const privacy = packet.privacy_export || {};
    return {
      summary_version: VERSION,
      workflow_version: packet.workflow_version || 'unknown',
      topic: packet.research_plan?.topic || packet.analysis_brief?.topic || 'Untitled research packet',
      plan_ready: !!packet.research_plan,
      evidence_count: count(packet.evidence_matrix),
      causal_link_count: count(packet.causal_links),
      review_queue_count: reviewQueue.length,
      pending_review_count: pending,
      provider_run_count: runs,
      source_import_count: sourceImports,
      brief_ready: !!packet.analysis_brief,
      critique_ready: !!packet.critique,
      migration_report_present: !!migration,
      privacy_release_gate: privacy.release_gate || 'pending_final_export_audit'
    };
  }

  function hasMeaningfulWorkflowState(state = {}){
    return !!(
      state.plan ||
      count(state.evidence) ||
      count(state.causal_links) ||
      state.analysis_brief ||
      state.critique ||
      count(state.ai_runs) ||
      count(state.source_imports) ||
      count(state.evidence_review_queue) ||
      state.last_source_request ||
      state.packet_migration_report
    );
  }

  function exportConfirmationText(packet = {}){
    const s = workflowSummary(packet);
    return [
      'Export research packet?',
      `Topic: ${s.topic}`,
      `Evidence: ${s.evidence_count}`,
      `Causal links: ${s.causal_link_count}`,
      `Review queue: ${s.review_queue_count} (${s.pending_review_count} pending)`,
      `Provider runs: ${s.provider_run_count}`,
      `Source imports: ${s.source_import_count}`,
      `Privacy gate: ${s.privacy_release_gate}`,
      'Raw API keys and OAuth tokens will be redacted before download.'
    ].join('\n');
  }

  function destructiveConfirmationText(actionLabel, state = {}){
    const hasWork = hasMeaningfulWorkflowState(state);
    if(!hasWork) return '';
    return `${actionLabel}\n\nThis will change or remove current workflow state. Export first if this work matters.`;
  }

  function emptyStateHtml(title, body, actionLabel){
    const safeTitle = String(title || 'Nothing here yet.');
    const safeBody = String(body || 'Complete the previous step to populate this panel.');
    const safeAction = hasText(actionLabel) ? `<span>${String(actionLabel)}</span>` : '';
    return `<div class="emptyState"><strong>${safeTitle}</strong><p>${safeBody}</p>${safeAction}</div>`;
  }

  function setDisabled(element, disabled, reason = ''){
    if(!element) return;
    element.disabled = !!disabled;
    if(disabled && reason) element.setAttribute('title', reason);
    else element.removeAttribute('title');
    element.setAttribute('aria-disabled', disabled ? 'true' : 'false');
  }

  function updateButtonReliability(documentRef, state = {}){
    const $ = (id) => documentRef.getElementById(id);
    setDisabled($('copyPlanPromptBtn'), !state.plan, 'Generate a research plan first.');
    setDisabled($('clearPlanBtn'), !state.plan, 'No research plan to clear.');
    setDisabled($('cancelEvidenceEditBtn'), !(state.editingEvidenceIndex >= 0 || state.editingReviewIndex >= 0), 'No active evidence edit.');
    setDisabled($('clearEvidenceBtn'), !count(state.evidence), 'No evidence to clear.');
    setDisabled($('inferCausalLinksBtn'), !count(state.evidence), 'Add evidence before inferring causal links.');
    setDisabled($('clearCausalLinksBtn'), !count(state.causal_links), 'No causal links to clear.');
    setDisabled($('copySynthesisPromptBtn'), !(state.plan && count(state.evidence)), 'Generate a plan and add evidence first.');
    setDisabled($('exportAnalysisBriefBtn'), !(state.analysis_brief || (state.plan && count(state.evidence))), 'Compile a brief or add enough material first.');
    setDisabled($('clearAnalysisBriefBtn'), !state.analysis_brief, 'No analysis brief to clear.');
    setDisabled($('copySourceRequestBtn'), !state.last_source_request, 'Build a source task first.');
    setDisabled($('exportSourceImportReportBtn'), !state.source_import_report, 'No source import report to export.');
    setDisabled($('acceptEditedReviewEvidenceBtn'), !(state.editingReviewIndex >= 0), 'Load a review candidate for editing first.');
    setDisabled($('clearResolvedReviewEvidenceBtn'), !((state.evidence_review_queue || []).some((item) => item.status === 'accepted' || item.status === 'rejected')), 'No resolved review items to clear.');
    setDisabled($('exportRunLedgerBtn'), !count(state.ai_runs), 'No provider runs to export.');
    setDisabled($('clearRunLedgerBtn'), !count(state.ai_runs), 'No provider runs to clear.');
  }

  function localizedLabel(t, key, fallback){ const value = t(key); return value === key ? fallback : value; }
  function providerModeRows(t = (key) => key){
    return [
      {id:'mock', name:localizedLabel(t,'providerModeMockName','MockProvider'), auth:localizedLabel(t,'providerModeMockAuth','None'), billing:localizedLabel(t,'providerModeMockBilling','None'), privacy:localizedLabel(t,'providerModeMockPrivacy','local / deterministic'), production:localizedLabel(t,'providerModeMockStatus','safe default')},
      {id:'openai_compatible', name:localizedLabel(t,'providerModeByokName','OpenAI-compatible BYOK'), auth:localizedLabel(t,'providerModeByokAuth','User API key'), billing:localizedLabel(t,'providerModeByokBilling','user-owned'), privacy:localizedLabel(t,'providerModeByokPrivacy','key never exported'), production:localizedLabel(t,'providerModeByokStatus','opt-in live calls')},
      {id:'backend_proxy', name:localizedLabel(t,'providerModeBackendName','Hosted backend proxy'), auth:localizedLabel(t,'providerModeBackendAuth','server-side key'), billing:localizedLabel(t,'providerModeBackendBilling','app/backend owner'), privacy:localizedLabel(t,'providerModeBackendPrivacy','browser sends no key'), production:localizedLabel(t,'providerModeBackendStatus','requires deployment hardening')},
      {id:'portable_oauth', name:localizedLabel(t,'providerModePortableName','Portable account mock'), auth:localizedLabel(t,'providerModePortableAuth','mock OAuth seam'), billing:localizedLabel(t,'providerModePortableBilling','portable account owner'), privacy:localizedLabel(t,'providerModePortablePrivacy','token hash only'), production:localizedLabel(t,'providerModePortableStatus','mock-only')}
    ];
  }

  function providerModeGuideHtml(activeProvider = 'mock', t = (key) => key, esc = (value) => String(value ?? '')){
    const rows = providerModeRows(t).map((row) => {
      const active = row.id === activeProvider ? ' active' : '';
      return `<tr class="${active.trim()}"><td><strong>${esc(row.name)}</strong><small>${esc(row.id)}</small></td><td>${esc(row.auth)}</td><td>${esc(row.billing)}</td><td>${esc(row.privacy)}</td><td>${esc(row.production)}</td></tr>`;
    }).join('');
    return `<div class="providerModeGuideInner"><h4>${esc(localizedLabel(t,'providerModeGuideTitle','Provider mode guide'))}</h4><div class="researchTableWrap"><table class="researchTable providerModeTable"><thead><tr><th>${esc(localizedLabel(t,'providerModeColumnMode','Mode'))}</th><th>${esc(localizedLabel(t,'providerModeColumnAuth','Auth'))}</th><th>${esc(localizedLabel(t,'providerModeColumnBilling','Billing'))}</th><th>${esc(localizedLabel(t,'providerModeColumnPrivacy','Privacy'))}</th><th>${esc(localizedLabel(t,'providerModeColumnStatus','Status'))}</th></tr></thead><tbody>${rows}</tbody></table></div></div>`;
  }

  root.uxReliability = Object.freeze({VERSION, workflowSummary, hasMeaningfulWorkflowState, exportConfirmationText, destructiveConfirmationText, emptyStateHtml, setDisabled, updateButtonReliability, providerModeRows, providerModeGuideHtml});
  if(typeof module !== 'undefined' && module.exports) module.exports = root.uxReliability;
})(typeof window !== 'undefined' ? window : globalThis);
