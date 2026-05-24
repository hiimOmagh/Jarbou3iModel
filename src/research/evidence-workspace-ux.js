/* Jarbou3i Research Engine Diagnostic Repair Queue + Export Risk Resolution. Local-only review ergonomics; no queue bypass. */
(function(global){
  'use strict';
  const root = global.Jarbou3iResearchModules = global.Jarbou3iResearchModules || {};
  const VERSION = '1.3.0-alpha.3';
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
  function priorityScore(item){
    if(!item) return 0;
    const e = item.evidence || {};
    const contradictionWeight = asArray(e.contradicts).length ? 32 : 0;
    const unlinkedWeight = (!asArray(e.supports).length && !asArray(e.contradicts).length) ? 20 : 0;
    const traceabilityWeight = (!text(e.source_url) || !text(e.source_date) || e.source_date === 'unknown') ? 18 : 0;
    const editWeight = item.status === 'needs_edit' ? 24 : 0;
    const pendingWeight = item.status === 'pending' ? 8 : 0;
    return Math.min(100, Math.round(score(item,'attention_signal_score') * 0.42 + score(item,'reliability_score') * 0.18 + contradictionWeight + unlinkedWeight + traceabilityWeight + editWeight + pendingWeight));
  }
  function laneItem(item){
    const e = item?.evidence || {};
    return {
      review_id:item?.review_id,
      evidence_id:e.evidence_id || item?.review_id,
      status:item?.status || 'pending',
      claim:text(e.claim).slice(0, 160),
      source_type:text(e.source_type || 'other'),
      priority_score:priorityScore(item),
      supports:asArray(e.supports),
      contradicts:asArray(e.contradicts),
      traceability_complete:!!text(e.source_url) && !!text(e.source_date) && e.source_date !== 'unknown',
      recommended_action:asArray(e.contradicts).length ? 'review_contradiction_before_export' : (!text(e.source_url) || !text(e.source_date) || e.source_date === 'unknown' ? 'repair_traceability_before_export' : (item?.status === 'needs_edit' ? 'edit_or_reject_before_export' : 'manual_accept_or_continue_review'))
    };
  }
  function reviewLanes(queue = [], context = {}){
    const open = asArray(queue).filter(isOpen).map(laneItem).sort((a,b)=>b.priority_score-a.priority_score);
    const lanes = [
      {lane_id:'priority', label:'Priority review', items:open.slice(0, 5)},
      {lane_id:'contradictions', label:'Contradictions', items:open.filter((item)=>item.contradicts.length).slice(0, 5)},
      {lane_id:'traceability', label:'Traceability repairs', items:open.filter((item)=>!item.traceability_complete).slice(0, 5)},
      {lane_id:'unlinked', label:'Unlinked evidence', items:open.filter((item)=>!item.supports.length && !item.contradicts.length).slice(0, 5)},
      {lane_id:'ready_to_decide', label:'Ready to decide', items:open.filter((item)=>item.traceability_complete && !item.contradicts.length && item.status === 'pending').slice(0, 5)}
    ];
    const signals = unresolvedSignals(queue, context);
    return {
      lane_model:'evidence_review_throughput_lanes.v1',
      lanes,
      lane_count:lanes.length,
      open_lane_item_count:lanes.reduce((sum,lane)=>sum + lane.items.length, 0),
      unresolved_signal_count:signals.contradiction_items.length + signals.unlinked_items.length + signals.low_traceability_items.length,
      queue_bypass_enabled:false,
      local_only:true,
      live_fetching_performed:false,
      verification_claimed:false
    };
  }
  function nextReviewActions(queue = [], filters = {}, context = {}){
    const lanes = reviewLanes(queue, context);
    const counts = statusCounts(queue);
    const actions = [];
    const contradiction = lanes.lanes.find((lane)=>lane.lane_id === 'contradictions')?.items?.[0];
    const traceability = lanes.lanes.find((lane)=>lane.lane_id === 'traceability')?.items?.[0];
    const unlinked = lanes.lanes.find((lane)=>lane.lane_id === 'unlinked')?.items?.[0];
    const ready = lanes.lanes.find((lane)=>lane.lane_id === 'ready_to_decide')?.items?.[0];
    if(contradiction) actions.push({action_id:'review_top_contradiction', label:'Review top contradiction before export', review_id:contradiction.review_id, priority:'high', reason:'counter-evidence affects claim confidence'});
    if(traceability) actions.push({action_id:'repair_traceability', label:'Repair missing URL/date/source type', review_id:traceability.review_id, priority:'high', reason:'export should preserve source provenance'});
    if(unlinked) actions.push({action_id:'link_or_reject_unlinked', label:'Link or reject unlinked evidence', review_id:unlinked.review_id, priority:'medium', reason:'unlinked evidence cannot support the brief'});
    if(ready) actions.push({action_id:'decide_ready_candidate', label:'Accept or reject ready candidate manually', review_id:ready.review_id, priority:'medium', reason:'candidate is traceable and pending'});
    if(!actions.length && counts.unresolved === 0) actions.push({action_id:'review_export_package', label:'Review export package before handoff', review_id:null, priority:'low', reason:'queue resolved; export still requires manual boundary review'});
    return actions.slice(0, 5).map((action, index)=>Object.assign({order:index + 1, automatic_decision:false, human_review_required:true}, action));
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
      review_lanes:reviewLanes(queue, context),
      next_review_actions:nextReviewActions(queue, filters, context),
      export_throughput_gate: counts.unresolved ? 'manual_review_queue_open' : 'manual_export_review_ready',
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
      review_lanes:reviewLanes(queue, context),
      next_review_actions:nextReviewActions(queue, normalized, context),
      throughput_report:throughputReport(queue, normalized, context),
      export_polish_boundary:'review decisions remain manual; export readiness is a checklist, not verification',
      release_gate:'evidence_review_queue_required'
    };
  }
  root.evidenceWorkspaceUx = Object.freeze({VERSION, defaultFilters, normalizeFilters, statusCounts, filterAndSortReviewQueue, deriveFacets, unresolvedSignals, batchDecisionPlan, priorityScore, reviewLanes, nextReviewActions, throughputReport, workspaceUxReport});
})(typeof window !== 'undefined' ? window : globalThis);
