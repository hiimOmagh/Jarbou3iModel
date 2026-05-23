/* Jarbou3i Research Engine public demo readiness + release notes helpers v1.1.0. */
(function(global){
  'use strict';
  const root = global.Jarbou3iResearchModules = global.Jarbou3iResearchModules || {};
  const VERSION = '1.2.0-alpha.1';
  const RELEASE_TITLE = 'v1.2.0-alpha.1 — Post-Stable Capability Roadmap + Expansion Gate';
  const DEMO_CHECKS = Object.freeze([
    {check_id:'manual_private_default', label:'Manual/private mode is the default', required:true},
    {check_id:'first_run_path_visible', label:'First-run path is visible before advanced setup', required:true},
    {check_id:'demo_script_available', label:'Demo operator script is documented', required:true},
    {check_id:'safe_export_boundary', label:'Exports preserve privacy guardrails', required:true},
    {check_id:'provider_boundary_unchanged', label:'Provider/OAuth/backend/source behavior unchanged', required:true},
    {check_id:'release_notes_polished', label:'Release notes are ready for public handoff', required:true},
    {check_id:'repo_hygiene_checked', label:'Repo hygiene and package exclusions are checked', required:true}
  ]);

  const RELEASE_LOCK_CHECKS = Object.freeze([
    {check_id:'no_browser_ci_green', label:'No-browser CI is green for the intended release commit', required:true},
    {check_id:'browser_ci_green', label:'Browser CI is green for provider, layout, visual, evidence, smoke, RTL, and a11y flows', required:true},
    {check_id:'hosted_demo_evidence_reviewed', label:'Hosted-demo screenshots and metadata are reviewed before publication', required:true},
    {check_id:'public_claims_match_available_features', label:'Public demo claims match only currently available features', required:true},
    {check_id:'manual_private_default_preserved', label:'Manual/private mode remains the default operating boundary', required:true},
    {check_id:'no_live_scraping_claim', label:'No live scraping, live fetching, or source verification is claimed', required:true},
    {check_id:'no_real_oauth_enabled', label:'No real OAuth/portable account production flow is enabled', required:true},
    {check_id:'export_privacy_boundary_preserved', label:'Export privacy and credential redaction boundaries are preserved', required:true},
    {check_id:'release_archive_hygiene_checked', label:'Release archive excludes generated artifacts, reports, ZIPs, and secret-bearing files', required:true}
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
      release_title:RELEASE_TITLE,
      release_type:'patch',
      runtime_capability_change:false,
      summary:'Public demo approval is now locked behind CI, hosted-demo evidence review, public-claim alignment, and explicit unavailable-feature boundaries without enabling new live provider, OAuth, backend, source, storage, or scraping behavior.',
      notable_changes:[
        'Added a public demo release-lock checklist that blocks approval from screenshots or ZIP existence alone.',
        'Added schema/fixture coverage for public demo release-lock metadata.',
        'Added no-browser CI coverage for release-lock claim boundaries.',
        'Preserved hosted-demo evidence review, source packet safety, and manual/private default boundaries.'
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

  function defaultReleaseLockInput(){
    return {
      no_browser_ci_green:true,
      browser_ci_green:true,
      hosted_demo_evidence_reviewed:true,
      public_claims_match_available_features:true,
      manual_private_default_preserved:true,
      no_live_scraping_claim:true,
      no_real_oauth_enabled:true,
      export_privacy_boundary_preserved:true,
      release_archive_hygiene_checked:true
    };
  }
  function buildReleaseLockChecklist(input = {}){
    const merged = Object.assign(defaultReleaseLockInput(), input || {});
    return RELEASE_LOCK_CHECKS.map((check, index) => {
      const passed = bool(merged[check.check_id]);
      return Object.assign({}, check, {order:index + 1, passed, status:passed ? 'pass' : 'fail'});
    });
  }
  function buildPublicDemoReleaseLock(input = {}, {version = VERSION, now = nowIso()} = {}){
    const checklist = buildReleaseLockChecklist(input);
    const passCount = checklist.filter(item => item.passed).length;
    const failCount = checklist.length - passCount;
    return {
      public_demo_release_lock_version:version,
      generated_at:now,
      release_title:`v${version} — Public Demo Release Lock`,
      lock_stage:'public_demo_release_locked',
      release_type:'patch',
      release_approval_state:failCount === 0 ? 'locked_for_public_demo' : 'blocked_for_public_demo',
      runtime_capability_change:false,
      provider_behavior_changed:false,
      oauth_behavior_changed:false,
      backend_behavior_changed:false,
      source_behavior_changed:false,
      storage_behavior_changed:false,
      manual_private_default:true,
      live_scraping_enabled:false,
      real_oauth_enabled:false,
      live_source_verification_enabled:false,
      unreviewed_artifacts_allowed:false,
      screenshots_alone_sufficient:false,
      zip_existence_sufficient:false,
      ci_required:true,
      browser_evidence_required:true,
      hosted_url_required:true,
      checklist,
      pass_count:passCount,
      fail_count:failCount,
      release_claims:[
        'Public demo is manual/private by default.',
        'Source packets are local/manual drafting scaffolds only.',
        'Hosted-demo screenshots and metadata require human review before release approval.',
        'Browser evidence is inspection material, not standalone approval.',
        'No real OAuth, live scraping, provider expansion, backend expansion, or storage expansion is introduced.'
      ],
      blocked_claims:[
        'Do not claim live web scraping.',
        'Do not claim production OAuth or account login.',
        'Do not claim automated source verification.',
        'Do not claim screenshots alone approve the release.',
        'Do not claim a ZIP archive alone proves public-demo readiness.'
      ],
      release_gate:failCount === 0 ? 'public_demo_release_locked' : 'public_demo_release_blocked'
    };
  }
  root.publicDemoReadiness = Object.freeze({VERSION, DEMO_CHECKS, RELEASE_LOCK_CHECKS, DEMO_SCRIPT, defaultReadinessInput, defaultReleaseLockInput, buildChecklist, buildReleaseLockChecklist, releaseNotes, buildPublicDemoReadiness, buildPublicDemoReleaseLock});
})(window);
