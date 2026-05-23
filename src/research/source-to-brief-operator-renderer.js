/* v1.2.0-alpha.3 source-to-brief operator renderer. Local/manual UI only. */
(function(global){
  'use strict';
  const root = global.Jarbou3iResearchModules = global.Jarbou3iResearchModules || {};
  function arr(v){ return Array.isArray(v) ? v : []; }
  function kc(v){ return String(v || '').replace(/(^|_)([a-z])/g,(_,p,c)=>c.toUpperCase()); }
  function fallbackDeps(deps = {}){
    const helpers = root.renderHelpers || {};
    const tr = deps.tr || helpers.tr || ((key)=>key);
    const esc = deps.esc || helpers.esc || ((value)=>String(value ?? ''));
    const status = deps.lStatus || ((value)=>String(value || '').replaceAll('_',' '));
    return Object.assign({ tr, esc, kc, lStatus:status, lST:status, lCf:status, topic:()=>tr('unspecifiedTopic') }, deps);
  }
  function chip(value, esc){ return `<span>${esc(value)}</span>`; }
  function panel(title, body, esc){ return `<section class="sourceToBriefPanel"><h4>${esc(title)}</h4>${body}</section>`; }
  function render(report = {}, deps = {}){
    const d = fallbackDeps(deps);
    const { tr, esc, lStatus, lST, lCf, topic } = d;
    const counts = report.confidence_review?.support_level_counts || {};
    const flow = arr(report.operator_flow?.workflow_steps).map((step)=>`<span class="flowStep flow-${esc(step.status || 'unknown')}" data-flow-step="${esc(step.step_id)}"><b>${esc(tr('flow' + kc(step.step_id)) || step.label || step.step_id)}</b><small>${esc(tr('flowStatus' + kc(step.status)) || lStatus(step.status))}</small></span>`).join('');
    const support = `<div class="miniChips sourceToBriefSupportCounts">${[
      `${tr('claimMapTitle')}: ${arr(report.claim_map).length}`,
      `${tr('supportStrong')}: ${counts.strong || 0}`,
      `${tr('supportPartial')}: ${counts.partial || 0}`,
      `${tr('supportWeak')}: ${counts.weak || 0}`,
      `${tr('supportUnsupported')}: ${counts.unsupported || 0}`,
      `${tr('confidence')}: ${lCf(report.confidence_review?.inferred_confidence || 'low')}`,
      `${tr('gaps')}: ${report.source_gaps?.warning_count || 0}`
    ].map((item)=>chip(item, esc)).join('')}</div>`;
    const evidence = arr(report.evidence_cards).slice(0,6).map((item)=>`<article class="compactEvidenceCard"><header><b>${esc(item.evidence_id)}</b><span>${esc(lST(item.source_type || 'other'))} · ${esc(lCf(item.confidence || 'medium'))}</span></header><p>${esc(item.claim || item.source_title || tr('noItems'))}</p><div class="miniChips">${chip(`${tr('supports')}: ${arr(item.supports).join(', ') || '—'}`, esc)}${chip(`${tr('contradicts')}: ${arr(item.contradicts).join(', ') || '—'}`, esc)}${chip(`${arr(item.source_gap_warnings).length} ${tr('gaps')}`, esc)}</div></article>`).join('');
    const claims = arr(report.claim_map).slice(0,8).map((claim)=>`<article class="compactClaimCard support-${esc(claim.support_level || 'unsupported')}" data-claim-support="${esc(claim.support_level || 'unsupported')}"><header><b>${esc(claim.claim_id)}</b><span>${esc(tr('support' + kc(claim.support_level || 'unsupported')))} · ${esc(claim.support_score ?? 0)}/100</span></header><p>${esc(claim.claim_text || '')}</p><div class="miniChips">${chip(`${tr('supports')}: ${arr(claim.supporting_evidence_ids).join(', ') || '—'}`, esc)}${chip(`${tr('contradicts')}: ${arr(claim.contradicting_evidence_ids).join(', ') || '—'}`, esc)}</div>${arr(claim.source_gap_warnings).length ? `<small>${esc(arr(claim.source_gap_warnings).join(' · '))}</small>` : ''}</article>`).join('');
    const contradictions = arr(report.contradiction_groups).slice(0,6).map((group)=>`<article class="compactContradictionGroup"><header><b>${esc(group.group_id)} · ${esc(group.target_claim_id)}</b><span>${esc(lStatus(group.severity || 'medium'))}</span></header><p>${esc(group.tension_summary || tr('contradictions'))}</p><small>${esc(tr('supports'))}: ${esc(arr(group.supporting_evidence_ids).join(', ') || '—')} · ${esc(tr('contradicts'))}: ${esc(arr(group.contradicting_evidence_ids).join(', ') || '—')}</small></article>`).join('');
    const gaps = arr(report.source_gaps?.warnings).slice(0,8).map((gap)=>`<li><strong>${esc(gap.scope || 'workflow')}</strong>: ${esc(gap.warning || '')}${gap.claim_id ? ` · ${esc(gap.claim_id)}` : ''}${gap.evidence_id ? ` · ${esc(gap.evidence_id)}` : ''}</li>`).join('') || `<li>${esc(tr('noSourceGapWarnings'))}</li>`;
    const readiness = arr(report.export_readiness_checklist?.items).map((item)=>`<li class="readiness-${item.passed ? 'pass' : 'warn'}"><strong>${item.passed ? '✓' : '!'}</strong><span>${esc(tr('readiness' + kc(item.check_id)) || item.label)}</span><small>${esc(item.detail || '')}</small></li>`).join('');
    const emptyGuidance = Object.entries(report.empty_state_guidance || {}).filter(([,value])=>value?.visible).map(([key,value])=>chip(`${lStatus(key)}: ${lStatus(value.next_action)}`, esc)).join('');
    const empty = (title, body) => `<div class="emptyState"><strong>${esc(title)}</strong><p>${esc(body)}</p></div>`;
    return `<div class="researchJsonCard sourceToBriefSummary operatorCompressed"><div><b>${esc(report.research_question || topic())}</b><span>${esc(report.release_gate || 'source_to_brief_review_required')}</span></div><div class="sourceToBriefFlow" aria-label="${esc(tr('operatorFlowTitle'))}">${flow}</div>${support}<small>${esc(report.exportable_strategic_brief?.source_boundary_note || '')}</small>${emptyGuidance ? `<div class="miniChips sourceToBriefEmptyGuidance">${emptyGuidance}</div>` : ''}</div><div class="sourceToBriefGrid">${panel(tr('evidence'), `<div class="compactCardGrid">${evidence || empty(tr('noEvidenceEmpty'), tr('noEvidenceEmptyBody'))}</div>`, esc)}${panel(tr('claimMapTitle'), `<div class="compactCardGrid">${claims || empty(tr('noClaimsEmpty'), tr('noClaimsEmptyBody'))}</div>`, esc)}${panel(tr('contradictions'), `<div class="compactCardGrid">${contradictions || empty(tr('noContradictionsEmpty'), tr('noContradictionsEmptyBody'))}</div>`, esc)}${panel(tr('sourceGapWarningsTitle'), `<ul class="sourceGapList">${gaps}</ul>`, esc)}${panel(tr('preExportReadinessTitle'), `<ul class="exportReadinessList">${readiness}</ul><small>${esc(tr('manualLocalDisclaimer'))}</small>`, esc)}</div><div class="researchJsonCard sourceToBriefContradictions"><h4>${esc(tr('blockedCapabilitiesTitle'))}</h4><div class="miniChips">${arr(report.blocked_unavailable_capabilities).map((item)=>chip(lStatus(item), esc)).join('')}</div></div>`;
  }
  root.sourceToBriefOperatorRenderer = Object.freeze({ render });
})(typeof window !== 'undefined' ? window : globalThis);
