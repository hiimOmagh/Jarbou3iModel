/* Jarbou3i Research Engine operator command palette v1.2.0-alpha.6. Local/manual navigation only. */
(function(global){
  'use strict';
  const root = global.Jarbou3iResearchModules = global.Jarbou3iResearchModules || {};
  const VERSION = '1.2.0-alpha.6';
  const MODEL = 'operator_command_palette.v1';
  const NAV_MODEL = 'review_navigation_shortcuts.v1';

  function arr(value){ return Array.isArray(value) ? value : []; }
  function text(value, fallback = ''){ return String(value ?? fallback).trim(); }
  function unique(values){ return [...new Set(arr(values).map((value)=>text(value)).filter(Boolean))]; }
  function command(command_id, label, shortcut, target, options = {}){
    return Object.assign({
      command_id,
      label,
      shortcut,
      target,
      target_selector: options.target_selector || `[data-nav-target="${target}"]`,
      group_id: options.group_id || 'source_to_brief_navigation',
      action_type: options.action_type || 'scroll_to_review_surface',
      enabled: options.enabled !== false,
      priority: options.priority || 'normal',
      human_review_required: options.human_review_required !== false,
      local_only: true,
      live_fetching_performed: false,
      provider_execution_expanded: false,
      automatic_source_verification_claimed: false,
      verification_claimed: false
    }, options.extra || {});
  }
  function firstOpenLedgerEntry(workbench = {}){
    return arr(workbench.review_decision_ledger?.entries).find((entry)=>!/(ready|reviewable|supported)$/i.test(text(entry.decision_state)));
  }
  function firstContradiction(workbench = {}){ return arr(workbench.contradiction_groups)[0] || null; }
  function firstGap(workbench = {}){ return arr(workbench.source_gaps?.warnings)[0] || null; }
  function buildOperatorCommandPalette(workbench = {}, packet = {}, options = {}){
    const version = options.version || VERSION;
    const openLedger = firstOpenLedgerEntry(workbench);
    const contradiction = firstContradiction(workbench);
    const gap = firstGap(workbench);
    const hasEvidence = arr(workbench.evidence_cards).length > 0;
    const hasClaims = arr(workbench.claim_map).length > 0;
    const hasExport = !!workbench.export_polish_report;
    const commands = [
      command('cmd_focus_research_question','Focus research question','G Q','research-question',{group_id:'workflow_navigation', target_selector:'#topicInput', action_type:'focus_input', enabled:true, human_review_required:false}),
      command('cmd_open_plan','Open research plan','G P','research-plan',{group_id:'workflow_navigation', target_selector:'#planOutput', enabled:!!packet.research_plan}),
      command('cmd_open_evidence_cards','Open evidence cards','G E','evidence-cards',{enabled:hasEvidence}),
      command('cmd_open_claim_map','Open claim map','G C','claim-map',{enabled:hasClaims}),
      command('cmd_open_contradictions','Open contradictions','G X','contradictions',{priority:contradiction?'high':'normal', enabled:!!contradiction, extra:{target_group_id:contradiction?.group_id || null}}),
      command('cmd_open_source_gaps','Open source gaps','G G','source-gaps',{priority:gap?'high':'normal', enabled:!!gap, extra:{target_gap:gap?.warning || null}}),
      command('cmd_open_traceability_console','Open traceability console','G T','claim-traceability-console',{enabled:!!workbench.claim_traceability_console}),
      command('cmd_open_decision_ledger','Open decision ledger','G L','review-decision-ledger',{priority:openLedger?'high':'normal', enabled:!!workbench.review_decision_ledger, extra:{first_open_decision_id:openLedger?.entry_id || null}}),
      command('cmd_open_export_readiness','Open export readiness','G R','export-readiness',{enabled:!!workbench.export_readiness_checklist}),
      command('cmd_open_export_polish','Open export polish','G O','export-polish',{enabled:hasExport}),
      command('cmd_export_package','Export source-to-brief package','Ctrl+Shift+E','source-to-brief-export-button',{target_selector:'#exportSourceToBriefBtn', action_type:'trigger_export_button', enabled:hasExport})
    ];
    const enabled = commands.filter((item)=>item.enabled !== false);
    const priorityTargets = enabled.filter((item)=>item.priority === 'high').map((item)=>item.command_id);
    return {
      command_palette_version: version,
      command_palette_model: MODEL,
      generated_at: options.now || new Date().toISOString(),
      command_count: commands.length,
      enabled_command_count: enabled.length,
      priority_command_ids: priorityTargets,
      command_groups: [
        {group_id:'workflow_navigation', label:'Workflow navigation', command_ids:commands.filter((item)=>item.group_id === 'workflow_navigation').map((item)=>item.command_id)},
        {group_id:'source_to_brief_navigation', label:'Source-to-brief navigation', command_ids:commands.filter((item)=>item.group_id === 'source_to_brief_navigation').map((item)=>item.command_id)}
      ],
      commands,
      keyboard_shortcuts: buildReviewNavigationShortcuts(workbench, {version, now: options.now}).shortcuts,
      release_gate:'operator_navigation_reviewable',
      shortcut_capture_boundary:'navigation_only_no_mutation_except_existing_export_button',
      local_only:true,
      live_fetching_performed:false,
      provider_execution_expanded:false,
      backend_behavior_expanded:false,
      production_oauth_enabled:false,
      automatic_source_verification_claimed:false,
      verification_claimed:false
    };
  }
  function buildReviewNavigationShortcuts(workbench = {}, options = {}){
    const version = options.version || VERSION;
    const shortcuts = [
      {shortcut:'/', label:'Search or command focus', target:'operator-command-palette', action_type:'focus_command_palette'},
      {shortcut:'G E', label:'Evidence cards', target:'evidence-cards', action_type:'scroll_to_review_surface'},
      {shortcut:'G C', label:'Claim map', target:'claim-map', action_type:'scroll_to_review_surface'},
      {shortcut:'G X', label:'Contradictions', target:'contradictions', action_type:'scroll_to_review_surface'},
      {shortcut:'G G', label:'Source gaps', target:'source-gaps', action_type:'scroll_to_review_surface'},
      {shortcut:'G T', label:'Traceability console', target:'claim-traceability-console', action_type:'scroll_to_review_surface'},
      {shortcut:'G L', label:'Decision ledger', target:'review-decision-ledger', action_type:'scroll_to_review_surface'},
      {shortcut:'G R', label:'Export readiness', target:'export-readiness', action_type:'scroll_to_review_surface'},
      {shortcut:'G O', label:'Export polish', target:'export-polish', action_type:'scroll_to_review_surface'}
    ].map((item)=>Object.assign({enabled:true, local_only:true, human_review_required:true, live_fetching_performed:false, provider_execution_expanded:false, automatic_source_verification_claimed:false, verification_claimed:false}, item));
    return {
      review_navigation_shortcuts_version:version,
      shortcut_model:NAV_MODEL,
      generated_at:options.now || new Date().toISOString(),
      shortcut_count:shortcuts.length,
      shortcuts,
      visible_shortcut_hint:'Use / for command focus and G + key jumps for review navigation.',
      mutation_boundary:'navigation_only',
      queue_bypass_enabled:false,
      local_only:true,
      live_fetching_performed:false,
      provider_execution_expanded:false,
      backend_behavior_expanded:false,
      production_oauth_enabled:false,
      automatic_source_verification_claimed:false,
      verification_claimed:false
    };
  }

  let installed = false;
  function installNavigation(runtime = {}){
    const doc = runtime.document || global.document;
    if(!doc || installed) return false;
    installed = true;
    const setUxTab = typeof runtime.setUxTab === 'function' ? runtime.setUxTab : function(){};
    const setStatus = typeof runtime.setStatus === 'function' ? runtime.setStatus : function(){};
    const tr = typeof runtime.tr === 'function' ? runtime.tr : (key)=>key;
    const byId = typeof runtime.$ === 'function' ? runtime.$ : (id)=>doc.getElementById(id);
    function move(target){
      const t = text(target);
      if(!t) return false;
      if(t === 'source-to-brief-export-button'){
        const button = byId('exportSourceToBriefBtn');
        if(button){ button.focus({preventScroll:false}); return true; }
      }
      if(t === 'research-question'){
        setUxTab('analysis');
        const input = byId('topicInput');
        if(input){ input.scrollIntoView({behavior:'smooth', block:'center'}); input.focus({preventScroll:true}); return true; }
      }
      setUxTab(/evidence|claim|contradiction|gap/i.test(t) ? 'evidence' : 'quality');
      const esc = global.CSS?.escape ? global.CSS.escape(t) : t.replace(/"/g, '\\"');
      const el = doc.querySelector(`[data-nav-target="${esc}"]`);
      if(el){ el.scrollIntoView({behavior:'smooth', block:'center'}); el.classList.add('operatorNavPulse'); setTimeout(()=>el.classList.remove('operatorNavPulse'), 900); return true; }
      return false;
    }
    doc.addEventListener('click', (event)=>{
      const button = event.target?.closest?.('[data-source-brief-command]');
      if(!button) return;
      event.preventDefault();
      const ok = move(button.dataset.commandTarget || 'operator-command-palette');
      setStatus(ok ? tr('statusOperatorNavigationMoved') : tr('statusOperatorNavigationUnavailable'), ok ? 'good' : 'warn');
    });
    let prefix = false;
    doc.addEventListener('keydown', (event)=>{
      if(event.defaultPrevented || event.ctrlKey || event.metaKey || event.altKey) return;
      const tag = text(event.target?.tagName).toLowerCase();
      if(['input','textarea','select'].includes(tag) || event.target?.isContentEditable) return;
      const key = text(event.key).toLowerCase();
      if(key === '/'){
        const el = doc.querySelector('[data-nav-target="operator-command-palette"]');
        if(el){ event.preventDefault(); setUxTab('evidence'); el.scrollIntoView({behavior:'smooth', block:'center'}); setStatus(tr('statusOperatorCommandPaletteFocused'), 'good'); }
        return;
      }
      if(key === 'g'){
        prefix = true;
        setTimeout(()=>{ prefix = false; }, 1400);
        return;
      }
      if(!prefix) return;
      const target = {e:'evidence-cards', c:'claim-map', x:'contradictions', g:'source-gaps', t:'claim-traceability-console', l:'review-decision-ledger', r:'export-readiness', o:'export-polish'}[key];
      prefix = false;
      if(target){ event.preventDefault(); const ok = move(target); setStatus(ok ? tr('statusOperatorNavigationMoved') : tr('statusOperatorNavigationUnavailable'), ok ? 'good' : 'warn'); }
    });
    return true;
  }

  root.operatorCommandPalette = Object.freeze({VERSION, MODEL, NAV_MODEL, buildOperatorCommandPalette, buildReviewNavigationShortcuts, installNavigation});
})(typeof window !== 'undefined' ? window : globalThis);
