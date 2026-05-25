/* Jarbou3i Research Engine evidence review controller boundary v1.1.0. */
(function(global){
  'use strict';
  const root = global.Jarbou3iResearchModules = global.Jarbou3iResearchModules || {};
  const VERSION = '1.3.0';
  function pendingItems(queue){ return (queue || []).filter(item => item.status === 'pending' || item.status === 'needs_edit'); }
  function report(queue, options = {}){
    if(root.evidenceWorkspace?.reviewReport){
      return root.evidenceWorkspace.reviewReport(queue || [], Object.assign({version: VERSION}, options));
    }
    const items = queue || [];
    return {
      review_report_version: VERSION,
      review_version: VERSION,
      queue_count:items.length,
      pending_count:items.filter(item => item.status === 'pending').length,
      needs_edit_count:items.filter(item => item.status === 'needs_edit').length,
      accepted_count:items.filter(item => item.status === 'accepted').length,
      rejected_count:items.filter(item => item.status === 'rejected').length,
      resolved_count:items.filter(item => item.status === 'accepted' || item.status === 'rejected').length,
      live_fetching_performed:false,
      verification_claimed:false,
      release_gate:'evidence_workspace_review_required'
    };
  }
  root.evidenceReviewController = {VERSION, pendingItems, report};
})(typeof window !== 'undefined' ? window : globalThis);
