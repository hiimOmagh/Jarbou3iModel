/* Extracted from src/research-engine.js for v1.4.0-alpha.45. */
(function(global){
  'use strict';

  function renderEvidenceReviewQueue(ctx){
    const { $, state, reviewFilters, evidenceWorkspaceUx, evidenceReviewContext, evidenceReviewReport, evidenceWorkspaceUxReport, emptyState, tr, esc, lST, localizedReviewGate, kc, persistReviewFilters, save, render, promoteReviewItem, setStatus, rejectReviewItem, editReviewItem, markReviewItemNeedsEdit } = ctx;
    const el = $('evidenceReviewOutput');
    if(!el) return;
    const queue = state.evidence_review_queue || [];
    const filters = state.evidence_review_filters || reviewFilters();
    const filtered = evidenceWorkspaceUx?.filterAndSortReviewQueue ? evidenceWorkspaceUx.filterAndSortReviewQueue(queue, filters, evidenceReviewContext()) : {filters, total_count:queue.length, visible_count:queue.length, items:queue.map((item,index)=>Object.assign({__review_index:index}, item))};
    const report = evidenceReviewReport();
    const uxReport = evidenceWorkspaceUxReport();
    if(!queue.length){
      el.innerHTML = emptyState(tr('evidenceReviewEmpty'), tr('sourceImportReviewEmptyBody'), tr('previewSourceImport'));
      return;
    }
    const facets = uxReport?.facets || {source_types:[]};
    const sourceTypeOptions = ['all'].concat(facets.source_types || []).map((value)=>`<option value="${esc(value)}" ${filtered.filters.source_type===value?'selected':''}>${esc(value==='all'?tr('allSources'):lST(value))}</option>`).join('');
    const rows = filtered.items.map((item) => {
      const i = Number(item.__review_index);
      const e = item.evidence || {};
      const resolved = item.status === 'accepted' || item.status === 'rejected';
      const controls = window.Jarbou3iResearchModules.sourcePacketBuilder?.reviewControlsForEvidence ? window.Jarbou3iResearchModules.sourcePacketBuilder.reviewControlsForEvidence(e) : (item.scoring_review_controls || {});
      const controlText = (controls.controls || []).join(', ') || 'manual_review';
      return `<tr>
        <td>${esc(item.review_id)}<small>${esc(item.import_id || '')}</small></td>
        <td><span class="reviewStatus ${esc(item.status)}">${esc(tr(item.status === 'needs_edit' ? 'needsEdit' : item.status))}</span><small>${esc(item.accepted_evidence_id || '')}</small><small>${esc(localizedReviewGate(controls.review_gate || 'reviewable'))}</small></td>
        <td><b>${esc(e.claim || '')}</b><small>${esc(e.notes || '')}</small><small>R:${esc(e.evidence_scoring?.reliability_score ?? '—')} · A:${esc(e.evidence_scoring?.attention_signal_score ?? '—')} · W:${esc(e.evidence_scoring?.synthesis_weight ?? '—')}</small><small>${esc(localizedReviewGate(controlText))}</small></td>
        <td>${esc([e.source_title, lST(e.source_type), e.source_date].filter(Boolean).join(' · '))}${e.source_url?`<small>${esc(e.source_url)}</small>`:''}</td>
        <td>${esc((e.supports || []).join(', ') || '—')} / ${esc((e.contradicts || []).join(', ') || '—')}</td>
        <td><div class="rowActions">${resolved ? '' : `<button class="btn ghost reviewAccept" type="button" data-index="${i}">${esc(tr('accept'))}</button><button class="btn ghost reviewNeedsEdit" type="button" data-index="${i}">${esc(tr('needsEdit'))}</button><button class="btn ghost reviewEdit" type="button" data-index="${i}">${esc(tr('editCandidate'))}</button><button class="btn ghost reviewReject" type="button" data-index="${i}">${esc(tr('reject'))}</button>`}</div></td>
      </tr>`;
    }).join('');
    const throughput = uxReport?.throughput_report || {};
    const signals = uxReport?.unresolved_signals || {};
    const laneHtml = (throughput.review_lanes?.lanes || uxReport?.review_lanes?.lanes || []).filter(lane => (lane.items || []).length).slice(0,5).map(lane => `<article class="reviewLaneCard"><header><b>${esc(tr('reviewLane'+kc(lane.lane_id)) || lane.label)}</b><span>${esc((lane.items || []).length)}</span></header><small>${esc((lane.items || []).map(item => item.review_id).filter(Boolean).join(', ') || '—')}</small></article>`).join('');
    const actionHtml = (throughput.next_review_actions || uxReport?.next_review_actions || []).slice(0,5).map(action => `<li><strong>${esc(action.order || '')}. ${esc(action.label || action.action_id)}</strong><small>${action.review_id ? ` · ${esc(action.review_id)}` : ''} · ${esc(action.reason || '')}</small></li>`).join('') || `<li>${esc(tr('exportReviewReadyAction'))}</li>`;
    const filterHtml = `<div class="researchJsonCard evidenceReviewThroughputCard"><h4>${esc(tr('reviewThroughputTitle'))}</h4><div class="miniChips"><span>${esc(filtered.visible_count)}/${esc(filtered.total_count)} ${esc(tr('visible'))}</span><span>${esc(tr('pending'))}:${esc(report.pending_count)}</span><span>${esc(tr('needsEdit'))}:${esc(throughput.counts?.needs_edit || 0)}</span><span>${esc(tr('contradictions'))}:${esc(throughput.contradiction_open_count || 0)}</span><span>${esc(tr('gaps'))}:${esc((signals.source_gap_warnings || []).length)}</span><span>${esc(tr('exportGate'))}:${esc(lStatus(throughput.export_throughput_gate || 'manual_review_required'))}</span></div><div class="reviewLaneGrid">${laneHtml || `<article class="reviewLaneCard"><b>${esc(tr('reviewThroughputClear'))}</b><small>${esc(tr('reviewThroughputClearBody'))}</small></article>`}</div><ul class="reviewNextActions">${actionHtml}</ul><small>${esc(tr('reviewKeyboardHint'))}</small><div class="reviewFilterGrid"><input id="reviewSearchInput" type="search" value="${esc(filtered.filters.keyword || '')}" placeholder="${esc(tr('reviewSearchPlaceholder'))}" /><select id="reviewStatusFilter"><option value="unresolved" ${filtered.filters.status==='unresolved'?'selected':''}>${esc(tr('unresolved'))}</option><option value="all" ${filtered.filters.status==='all'?'selected':''}>${esc(tr('all'))}</option><option value="pending" ${filtered.filters.status==='pending'?'selected':''}>${esc(tr('pending'))}</option><option value="needs_edit" ${filtered.filters.status==='needs_edit'?'selected':''}>${esc(tr('needsEdit'))}</option><option value="accepted" ${filtered.filters.status==='accepted'?'selected':''}>${esc(tr('accepted'))}</option><option value="rejected" ${filtered.filters.status==='rejected'?'selected':''}>${esc(tr('rejected'))}</option><option value="resolved" ${filtered.filters.status==='resolved'?'selected':''}>${esc(tr('resolved'))}</option></select><select id="reviewSourceTypeFilter">${sourceTypeOptions}</select><select id="reviewRelationshipFilter"><option value="all" ${filtered.filters.relationship==='all'?'selected':''}>${esc(tr('allRelationships'))}</option><option value="supports" ${filtered.filters.relationship==='supports'?'selected':''}>${esc(tr('supports'))}</option><option value="contradicts" ${filtered.filters.relationship==='contradicts'?'selected':''}>${esc(tr('contradicts'))}</option><option value="unlinked" ${filtered.filters.relationship==='unlinked'?'selected':''}>${esc(tr('unlinked'))}</option></select><select id="reviewSortSelect"><option value="needs_review_first" ${filtered.filters.sort==='needs_review_first'?'selected':''}>${esc(tr('needsReviewFirst'))}</option><option value="newest" ${filtered.filters.sort==='newest'?'selected':''}>${esc(tr('newest'))}</option><option value="oldest" ${filtered.filters.sort==='oldest'?'selected':''}>${esc(tr('oldest'))}</option><option value="reliability_desc" ${filtered.filters.sort==='reliability_desc'?'selected':''}>${esc(tr('reliability'))}</option><option value="attention_desc" ${filtered.filters.sort==='attention_desc'?'selected':''}>${esc(tr('attention'))}</option></select></div></div>`;
    el.innerHTML = filterHtml + `<div class="researchJsonCard evidenceReviewReportCard"><h4>${esc(tr('evidenceReviewTitle'))}</h4><div class="miniChips"><span>${esc(report.pending_count)} ${esc(tr('pending'))}</span><span>${esc(report.accepted_count)} ${esc(tr('accepted'))}</span><span>${esc(report.rejected_count)} ${esc(tr('rejected'))}</span><span>${esc(tr('verifiedLabel'))}:${esc(localizedBoolean(report.verification_claimed))}</span><span>${esc(tr('queueBypass'))}:${esc(localizedBoolean(false))}</span></div></div><div class="researchTableWrap"><table class="researchTable evidenceReviewTable"><thead><tr><th>ID</th><th>${esc(tr('reviewStatus'))}</th><th>${esc(tr('claim'))}</th><th>${esc(tr('sourceTitle'))}</th><th>${esc(tr('supports'))}/${esc(tr('contradicts'))}</th><th></th></tr></thead><tbody>${rows || `<tr><td colspan="6">${esc(tr('noVisibleReviewItems'))}</td></tr>`}</tbody></table></div>`;
    ['reviewSearchInput','reviewStatusFilter','reviewSourceTypeFilter','reviewRelationshipFilter','reviewSortSelect'].forEach(id => $(id)?.addEventListener('input', () => { persistReviewFilters(); save(); render(); }));
    document.querySelectorAll('.reviewAccept').forEach(btn => btn.addEventListener('click', () => { promoteReviewItem(Number(btn.dataset.index)); save(); render(); setStatus(tr('statusEvidenceAccepted'), 'good'); }));
    document.querySelectorAll('.reviewReject').forEach(btn => btn.addEventListener('click', () => { rejectReviewItem(Number(btn.dataset.index)); save(); render(); setStatus(tr('statusEvidenceRejected'), 'warn'); }));
    document.querySelectorAll('.reviewEdit').forEach(btn => btn.addEventListener('click', () => { editReviewItem(Number(btn.dataset.index)); save(); render(); }));
    document.querySelectorAll('.reviewNeedsEdit').forEach(btn => btn.addEventListener('click', () => { markReviewItemNeedsEdit(Number(btn.dataset.index)); save(); render(); setStatus(tr('statusEvidenceNeedsEdit'), 'warn'); }));
  }

  global.Jarbou3iResearchModules = global.Jarbou3iResearchModules || {};
  global.Jarbou3iResearchModules.evidenceReviewRenderer = Object.freeze({
    renderEvidenceReviewQueue
  });
})(typeof window !== 'undefined' ? window : globalThis);
