/* Jarbou3i Research Engine Public Demo Stable v1.1.0. Local-only review ergonomics; no queue bypass. */
(function(global){
  'use strict';
  const root = global.Jarbou3iResearchModules = global.Jarbou3iResearchModules || {};
  const VERSION = '1.1.0-fix.2';
  const VALID_STATUS = new Set(['all','pending','needs_edit','accepted','rejected','resolved','unresolved']);
  const VALID_REL = new Set(['all','supports','contradicts','unlinked']);
  const VALID_SORT = new Set(['newest','oldest','reliability_desc','attention_desc','needs_review_first']);

  function text(value){ return String(value ?? '').trim(); }
  function lower(value){ return text(value).toLowerCase(); }
  function asArray(value){ return Array.isArray(value) ? value : []; }
  function now(){ return new Date().toISOString(); }
  function unique(values){ return [...new Set(asArray(values).filter(Boolean).map(String))]; }
  function isResolved(item){ return item?.status === 'accepted' || item?.status === 'rejected'; }
  function isOpen(item){ return item?.status === 'pending' || item?.status === 'needs_edit'; }
  function score(item, key){ const n = Number(item?.evidence?.evidence_scoring?.[key]); return Number.isFinite(n) ? n : 0; }
  function defaultFilters(){ return {keyword:'', status:'unresolved', source_type:'all', relationship:'all', sort:'needs_review_first', entity:'all', cluster:'all'}; }
  function normalizeFilters(filters = {}){
    const next = Object.assign(defaultFilters(), filters || {});
    next.keyword = text(next.keyword).slice(0, 120);
    next.status = VALID_STATUS.has(next.status) ? next.status : 'unresolved';
    next.source_type = text(next.source_type || 'all') || 'all';
    next.relationship = VALID_REL.has(next.relationship) ? next.relationship : 'all';
    next.sort = VALID_SORT.has(next.sort) ? next.sort : 'needs_review_first';
    next.entity = text(next.entity || 'all') || 'all';
    next.cluster = text(next.cluster || 'all') || 'all';
    return next;
  }
  function statusCounts(queue = []){
    const items = asArray(queue);
    const counts = {total:items.length, pending:0, needs_edit:0, accepted:0, rejected:0, resolved:0, unresolved:0};
    for(const item of items){
      if(item?.status === 'pending') counts.pending += 1;
      else if(item?.status === 'needs_edit') counts.needs_edit += 1;
      else if(item?.status === 'accepted') counts.accepted += 1;
      else if(item?.status === 'rejected') counts.rejected += 1;
      if(isResolved(item)) counts.resolved += 1;
      if(isOpen(item)) counts.unresolved += 1;
    }
    return counts;
  }
  function evidenceBlob(item){
    const e = item?.evidence || {};
    return lower([item?.review_id, item?.import_id, item?.status, e.claim, e.source_title, e.source_url, e.source_type, e.source_date, e.notes, asArray(e.supports).join(' '), asArray(e.contradicts).join(' ')].join(' '));
  }
  function itemMatches(item, filters, context = {}){
    const e = item?.evidence || {};
    if(filters.status === 'resolved' && !isResolved(item)) return false;
    if(filters.status === 'unresolved' && !isOpen(item)) return false;
    if(['pending','needs_edit','accepted','rejected'].includes(filters.status) && item?.status !== filters.status) return false;
    if(filters.source_type !== 'all' && text(e.source_type || 'other') !== filters.source_type) return false;
    if(filters.relationship === 'supports' && !asArray(e.supports).length) return false;
    if(filters.relationship === 'contradicts' && !asArray(e.contradicts).length) return false;
    if(filters.relationship === 'unlinked' && (asArray(e.supports).length || asArray(e.contradicts).length)) return false;
    if(filters.keyword && !evidenceBlob(item).includes(lower(filters.keyword))) return false;
    if(filters.entity !== 'all'){
      const profiles = asArray(context.entity_profiles || []);
      const profile = profiles.find((p)=>p.entity_id === filters.entity || p.name === filters.entity);
      const evidenceIds = new Set(asArray(profile?.evidence_ids));
      const candidateId = e.evidence_id || item.review_id;
      if(!evidenceIds.has(candidateId) && !evidenceBlob(item).includes(lower(profile?.name || filters.entity))) return false;
    }
    if(filters.cluster !== 'all'){
      const clusters = asArray(context.source_clusters || []);
      const cluster = clusters.find((c)=>c.cluster_id === filters.cluster || c.target_id === filters.cluster);
      const evidenceIds = new Set(asArray(cluster?.evidence_ids));
      if(!evidenceIds.has(e.evidence_id) && !asArray(e.supports).some((id)=>id === cluster?.target_id) && !asArray(e.contradicts).some((id)=>id === cluster?.target_id)) return false;
    }
    return true;
  }
  function sortItems(items, sort){
    const list = asArray(items).slice();
    const time = (x)=>Date.parse(x?.created_at || x?.decision_at || '') || 0;
    if(sort === 'oldest') return list.sort((a,b)=>time(a)-time(b));
    if(sort === 'reliability_desc') return list.sort((a,b)=>score(b,'reliability_score')-score(a,'reliability_score'));
    if(sort === 'attention_desc') return list.sort((a,b)=>score(b,'attention_signal_score')-score(a,'attention_signal_score'));
    if(sort === 'needs_review_first') return list.sort((a,b)=>Number(b.status === 'needs_edit')-Number(a.status === 'needs_edit') || Number(isOpen(b))-Number(isOpen(a)) || time(b)-time(a));
    return list.sort((a,b)=>time(b)-time(a));
  }
  function filterAndSortReviewQueue(queue = [], filters = {}, context = {}){
    const normalized = normalizeFilters(filters);
    const withIndex = asArray(queue).map((item,index)=>Object.assign({__review_index:index}, item));
    const filtered = withIndex.filter((item)=>itemMatches(item, normalized, context));
    return {filters:normalized, total_count:withIndex.length, visible_count:filtered.length, items:sortItems(filtered, normalized.sort)};
  }
  function deriveFacets(queue = [], context = {}){
    const sourceTypes = unique(asArray(queue).map((item)=>item?.evidence?.source_type || 'other'));
    const entities = asArray(context.entity_profiles || []).slice(0, 20).map((entity)=>({id:entity.entity_id || entity.name, label:entity.name || entity.entity_id, count:asArray(entity.evidence_ids).length}));
    const clusters = asArray(context.source_clusters || []).slice(0, 20).map((cluster)=>({id:cluster.cluster_id || cluster.target_id, label:cluster.target_id || cluster.cluster_id, count:asArray(cluster.evidence_ids).length}));
    return {facet_version:VERSION, source_types:sourceTypes, entities, clusters};
  }
  function unresolvedSignals(queue = [], context = {}){
    const open = asArray(queue).filter(isOpen);
    const contradiction_items = open.filter((item)=>asArray(item?.evidence?.contradicts).length).map((item)=>item.review_id);
    const unlinked_items = open.filter((item)=>!asArray(item?.evidence?.supports).length && !asArray(item?.evidence?.contradicts).length).map((item)=>item.review_id);
    const low_traceability_items = open.filter((item)=>!text(item?.evidence?.source_url) || !text(item?.evidence?.source_date) || item?.evidence?.source_date === 'unknown').map((item)=>item.review_id);
    const source_gap_warnings = asArray(context.source_gap_report?.gap_warnings || context.source_gap_report?.warnings || context.source_cluster_report?.gap_warnings || []);
    return {contradiction_items, unlinked_items, low_traceability_items, source_gap_warnings};
  }
  function batchDecisionPlan(queue = [], indexes = [], decision = 'accept'){
    const allowed = new Set(['accept','reject','needs_edit']);
    const action = allowed.has(decision) ? decision : 'needs_edit';
    const idx = [...new Set(asArray(indexes).map(Number).filter(Number.isInteger))];
    const target_indexes = idx.filter((index)=>isOpen(queue[index]));
    return {batch_plan_version:VERSION, decision:action, requested_count:idx.length, eligible_count:target_indexes.length, skipped_count:idx.length-target_indexes.length, target_indexes, release_gate:'human_review_required'};
  }
  function throughputReport(queue = [], filters = {}, context = {}){
    const counts = statusCounts(queue);
    const filtered = filterAndSortReviewQueue(queue, filters, context);
    const unresolved = unresolvedSignals(queue, context);
    const open = Math.max(1, counts.unresolved);
    const review_pressure = Math.min(100, Math.round((counts.unresolved / Math.max(1, counts.total)) * 100));
    const readiness = counts.unresolved ? (unresolved.contradiction_items.length || unresolved.low_traceability_items.length ? 'review_attention_required' : 'review_queue_open') : (counts.total ? 'review_resolved' : 'empty');
    return {
      throughput_version:VERSION,
      generated_at:now(),
      counts,
      visible_count:filtered.visible_count,
      review_pressure,
      contradiction_open_count:unresolved.contradiction_items.length,
      low_traceability_open_count:unresolved.low_traceability_items.length,
      unlinked_open_count:unresolved.unlinked_items.length,
      average_open_attention: Math.round(asArray(queue).filter(isOpen).reduce((sum,item)=>sum + score(item,'attention_signal_score'),0)/open),
      keyboard_flow:{enabled:true, shortcuts:['Enter=accept focused candidate','E=edit focused candidate','N=mark needs edit','R=reject focused candidate','/=focus search']},
      readiness,
      release_gate: counts.unresolved ? 'review_required' : 'review_throughput_clear'
    };
  }
  function workspaceUxReport(queue = [], filters = {}, context = {}){
    const normalized = normalizeFilters(filters);
    const filtered = filterAndSortReviewQueue(queue, normalized, context);
    return {
      workspace_ux_version:VERSION,
      generated_at:now(),
      local_only:true,
      live_fetching_performed:false,
      verification_claimed:false,
      queue_bypass_enabled:false,
      batch_controls_enabled:true,
      filters:normalized,
      facets:deriveFacets(queue, context),
      visible_review_ids:filtered.items.map((item)=>item.review_id).filter(Boolean),
      unresolved_signals:unresolvedSignals(queue, context),
      throughput_report:throughputReport(queue, normalized, context),
      release_gate:'evidence_review_queue_required'
    };
  }
  root.evidenceWorkspaceUx = Object.freeze({VERSION, defaultFilters, normalizeFilters, statusCounts, filterAndSortReviewQueue, deriveFacets, unresolvedSignals, batchDecisionPlan, throughputReport, workspaceUxReport});
})(typeof window !== 'undefined' ? window : globalThis);
