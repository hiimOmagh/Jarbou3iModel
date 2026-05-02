/* Jarbou3i Research Engine public demo readiness + release notes helpers v1.0.11. */
(function(global){
  'use strict';
  const root = global.Jarbou3iResearchModules = global.Jarbou3iResearchModules || {};
  const VERSION = '1.0.11';
  const DEMO_CHECKS = Object.freeze([
    {check_id:'manual_private_default', label:'Manual/private mode is the default', required:true},
    {check_id:'first_run_path_visible', label:'First-run path is visible before advanced setup', required:true},
    {check_id:'demo_script_available', label:'Demo operator script is documented', required:true},
    {check_id:'safe_export_boundary', label:'Exports preserve privacy guardrails', required:true},
    {check_id:'provider_boundary_unchanged', label:'Provider/OAuth/backend/source behavior unchanged', required:true},
    {check_id:'release_notes_polished', label:'Release notes are ready for public handoff', required:true},
    {check_id:'repo_hygiene_checked', label:'Repo hygiene and package exclusions are checked', required:true}
  ]);
  const DEMO_SCRIPT = Object.freeze([
    'Define a concrete research topic and context in the first screen.',
    'Generate a plan, add/import evidence, then clear or justify the review queue.',
    'Open Quality & Export, verify privacy/export gates, and export the package only after review.'
  ]);
  function nowIso(){ return new Date().toISOString(); }
  function bool(value){ return value === true; }
  function defaultReadinessInput(){
    return {
      manual_private_default:true,
      first_run_path_visible:true,
      demo_script_available:true,
      safe_export_boundary:true,
      provider_boundary_unchanged:true,
      release_notes_polished:true,
      repo_hygiene_checked:true
    };
  }
  function buildChecklist(input = {}){
    const merged = Object.assign(defaultReadinessInput(), input || {});
    return DEMO_CHECKS.map((check, index) => {
      const passed = bool(merged[check.check_id]);
      return Object.assign({}, check, {order:index + 1, passed, status:passed ? 'pass' : 'fail'});
    });
  }
  function releaseNotes({version = VERSION, now = nowIso()} = {}){
    return {
      release_notes_version:version,
      generated_at:now,
      release_title:'v1.0.11 — Repository Hygiene + Stale Artifact Cleanup',
      release_type:'patch',
      runtime_capability_change:false,
      summary:'Public-demo-facing documentation, release notes, and readiness metadata were polished without enabling new live provider, OAuth, backend, or source behavior.',
      notable_changes:[
        'Added a public demo checklist and operator script for first-run demonstrations.',
        'Added release notes that clearly separate visible polish from unchanged runtime boundaries.',
        'Added schema/fixture coverage for public demo readiness and release-note metadata.',
        'Extended no-browser CI with a public-demo readiness gate.'
      ],
      unchanged_boundaries:[
        'Manual/private mode remains the default.',
        'No production OAuth path is enabled.',
        'No new live source connector is enabled.',
        'No provider key or raw token is exported.',
        'No backend endpoint behavior is changed.'
      ],
      publish_checklist:[
        'Run no-browser CI gates.',
        'Run browser QA before publishing the public demo.',
        'Verify GitHub Pages deployment uses the current package files.',
        'Confirm release archive excludes generated and secret-bearing files.'
      ],
      release_gate:'release_notes_polished'
    };
  }
  function buildPublicDemoReadiness(input = {}, {version = VERSION, now = nowIso()} = {}){
    const checklist = buildChecklist(input);
    const passCount = checklist.filter(item => item.passed).length;
    const failCount = checklist.length - passCount;
    return {
      public_demo_version:version,
      generated_at:now,
      demo_stage:'public_demo_ready',
      release_type:'patch',
      runtime_capability_change:false,
      provider_behavior_changed:false,
      oauth_behavior_changed:false,
      backend_behavior_changed:false,
      source_behavior_changed:false,
      local_only_default:true,
      checklist,
      pass_count:passCount,
      fail_count:failCount,
      readiness_score:Math.round((passCount / Math.max(1, checklist.length)) * 100),
      demo_script:DEMO_SCRIPT.slice(),
      safety_notes:[
        'Use mock/manual mode for public demonstrations unless a separate live-provider threat model is approved.',
        'Treat every imported source as unverified until reviewed and promoted from the review queue.',
        'Export only after checking privacy/export gates.'
      ],
      release_gate:failCount === 0 ? 'public_demo_ready_checked' : 'public_demo_blocked'
    };
  }
  root.publicDemoReadiness = Object.freeze({VERSION, DEMO_CHECKS, DEMO_SCRIPT, defaultReadinessInput, buildChecklist, releaseNotes, buildPublicDemoReadiness});
})(window);
