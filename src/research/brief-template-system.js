/* Jarbou3i Research Engine brief template system v1.3.0-alpha.3. Local/manual only. */
(function(global){
  'use strict';
  const root = global.Jarbou3iResearchModules = global.Jarbou3iResearchModules || {};
  const VERSION = '1.3.0-alpha.3';
  const TEMPLATE_MODEL = 'brief_template_system.v1';
  const VARIANT_QA_MODEL = 'assembly_variant_qa.v1';
  const TEMPLATE_IDS = Object.freeze(['strategic_brief','source_audit_brief','contradiction_brief','executive_summary']);
  const BLOCKED_CAPABILITIES = Object.freeze(['live_scraping','live_web_search','provider_execution_expansion','production_oauth','backend_behavior_expansion','automatic_source_verification']);

  function nowIso(){ return new Date().toISOString(); }
  function text(value, fallback = ''){ return String(value ?? fallback).trim(); }
  function asArray(value){ return Array.isArray(value) ? value.filter(Boolean) : (value === undefined || value === null || value === '' ? [] : [value]); }
  function number(value, fallback = 0){ const parsed = Number(value); return Number.isFinite(parsed) ? parsed : fallback; }
  function bool(value){ return !!value; }
  function section(section_id, label, source_fields = [], required = true){ return {section_id, label, source_fields, required, manual_review_required:true}; }
  function scoreToGate(score, blockers){ return blockers > 0 ? 'variant_review_blocked' : (score >= 85 ? 'variant_export_ready' : score >= 65 ? 'variant_review_ready_with_warnings' : 'variant_review_required'); }
  function buildTemplate(id, workbench = {}){
    const claimCount = asArray(workbench.claim_map).length;
    const contradictionCount = asArray(workbench.contradiction_groups).length;
    const gapCount = number(workbench.source_gaps?.warning_count, asArray(workbench.source_gaps?.warnings).length);
    const riskBlockers = number(workbench.export_risk_resolution?.blocker_count, 0);
    const weakClaims = asArray(workbench.claim_map).filter((claim)=>['weak','unsupported'].includes(text(claim.support_level).toLowerCase())).length;
    const base = {
      template_id:id,
      template_version:VERSION,
      template_model:TEMPLATE_MODEL,
      local_manual_only:true,
      manual_review_required:true,
      live_fetching_performed:false,
      provider_execution_expanded:false,
      automatic_source_verification_claimed:false,
      verification_claimed:false,
      evidence_boundary_required:true,
      source_traceability_required:true,
      export_qa_required:true
    };
    if(id === 'source_audit_brief') return Object.assign(base, {
      display_name:'Source Audit Brief',
      purpose:'Audit evidence provenance, source mix, traceability, gaps, and manual review boundaries before synthesis.',
      recommended_when:['source_gap_warning_count_high','traceability_repairs_open','operator_needs_evidence_inventory'],
      sections:[
        section('audit_summary','Audit summary',['source_gaps','confidence_review','review_quality_diagnostics']),
        section('evidence_inventory','Evidence inventory',['evidence_cards','evidence_to_claim_links']),
        section('source_mix','Source mix and provenance',['evidence_cards','source_gaps']),
        section('traceability_console','Claim traceability console',['claim_traceability_console']),
        section('gap_register','Source gap register',['source_gaps','diagnostic_repair_queue']),
        section('manual_boundary','Manual/local boundary',['blocked_unavailable_capabilities'])
      ],
      variant_risk_score:Math.min(100, 24 + gapCount * 8 + weakClaims * 6 + riskBlockers * 12),
      expected_output:'source-audit-focused Markdown/JSON package'
    });
    if(id === 'contradiction_brief') return Object.assign(base, {
      display_name:'Contradiction Brief',
      purpose:'Surface contested claims, contradiction pressure, conflicting evidence, and required operator decisions.',
      recommended_when:['contradiction_groups_present','review_decision_ledger_open','claim_conflict_pressure_high'],
      sections:[
        section('conflict_summary','Conflict summary',['contradiction_groups','review_decision_ledger']),
        section('claim_pressure_map','Claim pressure map',['claim_map','review_quality_diagnostics']),
        section('supporting_evidence','Supporting evidence',['evidence_cards','evidence_to_claim_links']),
        section('counter_evidence','Counter-evidence',['contradiction_groups','evidence_cards']),
        section('decision_ledger','Review decision ledger',['review_decision_ledger']),
        section('export_risk_boundary','Export risk boundary',['export_risk_resolution'])
      ],
      variant_risk_score:Math.min(100, contradictionCount * 14 + weakClaims * 7 + riskBlockers * 16),
      expected_output:'contradiction-focused review brief'
    });
    if(id === 'executive_summary') return Object.assign(base, {
      display_name:'Executive Summary',
      purpose:'Condense the reviewed brief into a short decision-ready summary while preserving uncertainty and source boundaries.',
      recommended_when:['export_risks_cleared','brief_assembly_ready','operator_needs_short_handoff'],
      sections:[
        section('bottom_line','Bottom line',['exportable_strategic_brief','confidence_review']),
        section('key_claims','Key claims',['claim_map']),
        section('main_uncertainties','Main uncertainties',['source_gaps','contradiction_groups']),
        section('recommended_actions','Recommended review actions',['guided_research_session','export_risk_resolution']),
        section('disclaimer','Manual/local disclaimer',['brief_assembly_export_qa'])
      ],
      variant_risk_score:Math.min(100, weakClaims * 10 + contradictionCount * 8 + riskBlockers * 20),
      expected_output:'short executive Markdown preview'
    });
    return Object.assign(base, {
      display_name:'Strategic Brief',
      purpose:'Assemble a source-to-brief strategic narrative from reviewed evidence, claims, gaps, contradictions, and confidence notes.',
      recommended_when:['default_research_export','claims_linked_to_evidence','manual_review_completed'],
      sections:[
        section('research_question','Research question',['research_question','research_plan']),
        section('executive_summary','Executive summary',['exportable_strategic_brief','confidence_review']),
        section('strategic_assessment','Strategic assessment',['claim_map','evidence_to_claim_links']),
        section('contradictions','Contradictions and counter-evidence',['contradiction_groups']),
        section('source_gaps','Source gaps and limitations',['source_gaps']),
        section('confidence_review','Confidence review',['confidence_review','brief_assembly_export_qa']),
        section('export_boundary','Export boundary',['export_risk_resolution','blocked_unavailable_capabilities'])
      ],
      variant_risk_score:Math.min(100, weakClaims * 8 + contradictionCount * 10 + gapCount * 5 + riskBlockers * 16),
      expected_output:'full strategic brief package'
    });
  }
  function buildBriefTemplateSystem(workbench = {}, packet = {}, options = {}){
    const generatedAt = options.now || nowIso();
    const templates = TEMPLATE_IDS.map((id)=>buildTemplate(id, workbench));
    const claimCount = asArray(workbench.claim_map).length;
    const contradictionCount = asArray(workbench.contradiction_groups).length;
    const riskBlockers = number(workbench.export_risk_resolution?.blocker_count, 0);
    const weakClaims = asArray(workbench.claim_map).filter((claim)=>['weak','unsupported'].includes(text(claim.support_level).toLowerCase())).length;
    const recommended = riskBlockers || weakClaims ? 'source_audit_brief' : (contradictionCount ? 'contradiction_brief' : 'strategic_brief');
    return {
      brief_template_system_version:options.version || VERSION,
      template_model:TEMPLATE_MODEL,
      generated_at:generatedAt,
      research_question:text(workbench.research_question || packet.research_plan?.topic || packet.analysis_brief?.topic || 'Untitled research session'),
      template_count:templates.length,
      templates,
      selected_template_id:text(options.selected_template_id || recommended),
      recommended_template_id:recommended,
      assembly_modes:['strategic','audit','contradiction','executive'],
      variant_export_policy:'manual_template_selection_required_before_publication',
      template_selection_reason:riskBlockers ? 'export_risk_blockers_open' : weakClaims ? 'weak_claims_require_source_audit' : contradictionCount ? 'contradictions_require_conflict_brief' : 'default_strategic_brief_ready',
      coverage_summary:{claim_count:claimCount, contradiction_group_count:contradictionCount, weak_or_unsupported_claim_count:weakClaims, export_risk_blocker_count:riskBlockers},
      blocked_unavailable_capabilities:BLOCKED_CAPABILITIES.slice(),
      local_manual_only:true,
      live_fetching_performed:false,
      live_web_search_performed:false,
      provider_execution_expanded:false,
      production_oauth_enabled:false,
      backend_behavior_expanded:false,
      automatic_source_verification_claimed:false,
      verification_claimed:false
    };
  }
  function qaCheck(check_id, label, passed, severity = 'warning', details = {}){ return {check_id, label, passed:bool(passed), severity, details, manual_review_required:!passed}; }
  function buildAssemblyVariantQa(workbench = {}, templateSystem = {}, options = {}){
    const templates = asArray(templateSystem.templates);
    const checks = [];
    templates.forEach((template)=>{
      const sections = asArray(template.sections);
      const sectionIds = sections.map((item)=>item.section_id);
      checks.push(qaCheck(`${template.template_id}_defined`, `${template.display_name} defined`, sections.length >= 5, 'blocker', {section_count:sections.length}));
      checks.push(qaCheck(`${template.template_id}_evidence_boundary`, `${template.display_name} includes evidence boundary`, sectionIds.includes('manual_boundary') || sectionIds.includes('export_boundary') || sectionIds.includes('disclaimer') || sectionIds.includes('export_risk_boundary'), 'blocker'));
      checks.push(qaCheck(`${template.template_id}_traceability`, `${template.display_name} keeps traceability`, JSON.stringify(template).includes('traceability') || JSON.stringify(template).includes('evidence_to_claim'), 'warning'));
      checks.push(qaCheck(`${template.template_id}_risk_score`, `${template.display_name} risk score bounded`, number(template.variant_risk_score, 100) <= 100, 'warning', {variant_risk_score:template.variant_risk_score}));
    });
    checks.push(qaCheck('template_count_complete','All required brief templates are present', templates.length >= TEMPLATE_IDS.length, 'blocker', {template_count:templates.length}));
    checks.push(qaCheck('selected_template_valid','Selected template is available', templates.some((item)=>item.template_id === templateSystem.selected_template_id), 'blocker', {selected_template_id:templateSystem.selected_template_id}));
    checks.push(qaCheck('export_qa_present','Brief assembly export QA is present', !!workbench.brief_assembly_export_qa, 'blocker'));
    checks.push(qaCheck('risk_resolution_present','Export risk resolution is present', !!workbench.export_risk_resolution, 'blocker'));
    checks.push(qaCheck('no_auto_verification_claim','No automatic source verification claim is present', templateSystem.automatic_source_verification_claimed !== true && workbench.automatic_source_verification_claimed !== true, 'blocker'));
    checks.push(qaCheck('manual_local_boundary','Manual/local boundary is explicit', templateSystem.local_manual_only === true, 'blocker'));
    const blockers = checks.filter((check)=>!check.passed && check.severity === 'blocker').length;
    const warnings = checks.filter((check)=>!check.passed && check.severity !== 'blocker').length;
    const passed = checks.filter((check)=>check.passed).length;
    const score = Math.round((passed / Math.max(1, checks.length)) * 100);
    return {
      assembly_variant_qa_version:options.version || VERSION,
      qa_model:VARIANT_QA_MODEL,
      generated_at:options.now || nowIso(),
      template_count:templates.length,
      check_count:checks.length,
      passed_check_count:passed,
      blocker_count:blockers,
      warning_count:warnings,
      variant_qa_score:score,
      qa_gate:scoreToGate(score, blockers),
      selected_template_id:templateSystem.selected_template_id,
      recommended_template_id:templateSystem.recommended_template_id,
      checks,
      required_export_files:['source-to-brief/brief-template-system.json','source-to-brief/assembly-variant-qa.json','source-to-brief/assembly-variant-qa.md'],
      manual_local_boundary:'Assembly variant QA compares local template coverage only. It does not verify source truth or fetch external data.',
      local_manual_only:true,
      live_fetching_performed:false,
      live_web_search_performed:false,
      provider_execution_expanded:false,
      production_oauth_enabled:false,
      backend_behavior_expanded:false,
      automatic_source_verification_claimed:false,
      verification_claimed:false
    };
  }
  function briefTemplateSystemMarkdown(system = {}){
    const templates = asArray(system.templates).map((template)=>`- ${template.template_id}: ${template.display_name} — ${template.sections?.length || 0} sections; risk ${template.variant_risk_score ?? 'n/a'}/100`).join('\n') || '- No templates recorded.';
    return ['# Brief Template System','',`Selected template: ${text(system.selected_template_id || 'manual_selection_required')}`,`Recommended template: ${text(system.recommended_template_id || 'strategic_brief')}`,'','## Templates',templates,'','## Boundary','Local/manual template selection only. No live fetching, provider execution, backend expansion, or automatic source verification is claimed.',''].join('\n');
  }
  function assemblyVariantQaMarkdown(qa = {}){
    const checks = asArray(qa.checks).map((check)=>`- ${check.passed ? '[x]' : '[ ]'} ${check.check_id}: ${check.label} (${check.severity})`).join('\n') || '- No variant QA checks recorded.';
    return ['# Assembly Variant QA','',`QA gate: ${text(qa.qa_gate || 'variant_review_required')}`,`Score: ${number(qa.variant_qa_score,0)}/100`, `Selected template: ${text(qa.selected_template_id || 'manual_selection_required')}`,'','## Checks',checks,'','## Boundary',text(qa.manual_local_boundary || 'Local/manual QA only. No automatic source verification is claimed.'),''].join('\n');
  }
  root.briefTemplateSystem = Object.freeze({VERSION, TEMPLATE_MODEL, VARIANT_QA_MODEL, TEMPLATE_IDS, BLOCKED_CAPABILITIES, buildBriefTemplateSystem, buildAssemblyVariantQa, briefTemplateSystemMarkdown, assemblyVariantQaMarkdown});
})(typeof window !== 'undefined' ? window : globalThis);
