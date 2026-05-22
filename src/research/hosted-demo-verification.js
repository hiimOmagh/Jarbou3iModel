/* Jarbou3i Research Engine hosted demo smoke fixes + evidence review helpers v1.1.0-rc.2. */
(function(global){
  'use strict';
  const root = global.Jarbou3iResearchModules = global.Jarbou3iResearchModules || {};
  const VERSION = '1.1.0-rc.2';
  const DEPLOYMENT_CHECKS = Object.freeze([
    {check_id:'static_host_ready', label:'Static host serves index, assets, manifest, and modules', required:true},
    {check_id:'app_version_matches_package', label:'Hosted app version matches package metadata', required:true},
    {check_id:'browser_ci_enabled', label:'Browser CI runs provider, layout, visual, and smoke flows', required:true},
    {check_id:'desktop_evidence_captured', label:'Desktop evidence screenshot is captured', required:true},
    {check_id:'mobile_evidence_captured', label:'Mobile evidence screenshot is captured', required:true},
    {check_id:'provider_mode_evidence_captured', label:'Provider-mode evidence screenshot is captured', required:true},
    {check_id:'privacy_export_evidence_captured', label:'Privacy/export evidence screenshot is captured', required:true},
    {check_id:'no_runtime_boundary_change', label:'No provider, OAuth, backend, source, or storage behavior changed', required:true}
  ]);
  const SMOKE_FIX_CHECKS = Object.freeze([
    {check_id:'hosted_url_route_supported', label:'Browser QA can target either local static server or HOSTED_DEMO_URL', required:true},
    {check_id:'app_version_meta_visible', label:'Hosted page exposes current app-version metadata', required:true},
    {check_id:'first_screen_panels_visible', label:'First-run, public-demo, hosted-demo, and evidence-review panels are visible', required:true},
    {check_id:'desktop_mobile_viewports_checked', label:'Desktop and mobile viewport smoke checks are covered', required:true},
    {check_id:'no_horizontal_overflow_checked', label:'Horizontal overflow is checked during evidence capture', required:true},
    {check_id:'metadata_artifact_written', label:'Browser evidence metadata is written to a stable JSON artifact', required:true},
    {check_id:'capture_settle_guard_checked', label:'Evidence capture waits for stable DOM, fonts, and animation-free frames', required:true},
    {check_id:'visual_artifact_guard_checked', label:'Evidence capture blocks transient overlays, loading states, and fixed visual artifacts', required:true},
    {check_id:'quality_export_capture_settled', label:'Quality/export evidence is captured after the quality tab has settled', required:true},
    {check_id:'ci_browser_not_duplicating_full_suite', label:'Browser CI avoids duplicate full-suite evidence reruns', required:true},
    {check_id:'runtime_boundary_unchanged', label:'No provider, OAuth, backend, source, or storage behavior changed', required:true}
  ]);
  const EXPECTED_CAPTURE_NAMES = Object.freeze(['desktop-first-screen','mobile-first-screen','provider-mode','quality-export']);
  const EVIDENCE_ARTIFACTS = Object.freeze([
    {artifact_id:'desktop_first_screen', capture_name:'desktop-first-screen', path:'test-results/hosted-demo-evidence/desktop-first-screen.png', required:true, viewport:'desktop'},
    {artifact_id:'mobile_first_screen', capture_name:'mobile-first-screen', path:'test-results/hosted-demo-evidence/mobile-first-screen.png', required:true, viewport:'mobile'},
    {artifact_id:'provider_mode', capture_name:'provider-mode', path:'test-results/hosted-demo-evidence/provider-mode.png', required:true, viewport:'desktop'},
    {artifact_id:'quality_export', capture_name:'quality-export', path:'test-results/hosted-demo-evidence/quality-export.png', required:true, viewport:'desktop'},
    {artifact_id:'metadata_snapshot', capture_name:'hosted-demo-metadata', path:'test-results/hosted-demo-evidence/hosted-demo-metadata.json', required:true, viewport:'metadata'}
  ]);
  const EVIDENCE_REVIEW_ITEMS = Object.freeze([
    {artifact_id:'desktop_first_screen', label:'Desktop first-screen screenshot reviewed', required:true},
    {artifact_id:'mobile_first_screen', label:'Mobile first-screen screenshot reviewed', required:true},
    {artifact_id:'provider_mode', label:'Provider-mode screenshot reviewed', required:true},
    {artifact_id:'quality_export', label:'Quality/export screenshot reviewed', required:true},
    {artifact_id:'metadata_snapshot', label:'Hosted-demo metadata snapshot reviewed', required:true},
    {artifact_id:'complete_capture_manifest', label:'Single final metadata manifest contains all required captures', required:true},
    {artifact_id:'screenshot_sanity', label:'Viewport, screenshot dimensions, bytes, overflow, and settle metadata reviewed', required:true},
    {artifact_id:'visual_artifact_guard', label:'Visual artifact guard confirms no transient overlays or loading bands were captured', required:true},
    {artifact_id:'capture_settle_manifest', label:'Capture settle manifest confirms screenshots were taken after UI stability checks', required:true},
    {artifact_id:'version_consistency', label:'Version consistency reviewed across package, DOM, schema, and packet', required:true},
    {artifact_id:'privacy_boundary', label:'Evidence artifacts reviewed for secret/export boundary regressions', required:true}
  ]);
  function nowIso(){ return new Date().toISOString(); }
  function bool(value){ return value === true; }
  function defaultDeploymentInput(){
    return {
      static_host_ready:true,
      app_version_matches_package:true,
      browser_ci_enabled:true,
      desktop_evidence_captured:true,
      mobile_evidence_captured:true,
      provider_mode_evidence_captured:true,
      privacy_export_evidence_captured:true,
      no_runtime_boundary_change:true
    };
  }
  function defaultSmokeFixInput(){
    return {
      hosted_url_route_supported:true,
      app_version_meta_visible:true,
      first_screen_panels_visible:true,
      desktop_mobile_viewports_checked:true,
      no_horizontal_overflow_checked:true,
      metadata_artifact_written:true,
      capture_settle_guard_checked:true,
      visual_artifact_guard_checked:true,
      quality_export_capture_settled:true,
      ci_browser_not_duplicating_full_suite:true,
      runtime_boundary_unchanged:true
    };
  }
  function buildGenericChecklist(definitions, defaults, input = {}){
    const merged = Object.assign({}, defaults, input || {});
    return definitions.map((check, index) => {
      const passed = bool(merged[check.check_id]);
      return Object.assign({}, check, {order:index + 1, passed, status:passed ? 'pass' : 'fail'});
    });
  }
  function buildDeploymentChecklist(input = {}){
    return buildGenericChecklist(DEPLOYMENT_CHECKS, defaultDeploymentInput(), input);
  }
  function buildSmokeFixChecklist(input = {}){
    return buildGenericChecklist(SMOKE_FIX_CHECKS, defaultSmokeFixInput(), input);
  }
  function buildBrowserEvidence(input = {}, {version = VERSION, now = nowIso()} = {}){
    const artifacts = EVIDENCE_ARTIFACTS.map((artifact, index) => Object.assign({}, artifact, {
      order:index + 1,
      captured: input[artifact.artifact_id] !== false,
      status: input[artifact.artifact_id] === false ? 'missing' : 'planned_or_captured'
    }));
    const missing = artifacts.filter((artifact) => artifact.required && artifact.captured === false);
    return {
      browser_evidence_version:version,
      generated_at:now,
      evidence_mode:'playwright_capture_attach_and_write_artifacts',
      artifact_root:'test-results/hosted-demo-evidence',
      manifest_policy:'single_final_metadata_with_all_required_captures',
      expected_capture_names:EXPECTED_CAPTURE_NAMES.slice(),
      capture_manifest_required:true,
      viewport_dimensions_required:true,
      screenshot_dimensions_required:true,
      horizontal_overflow_metadata_required:true,
      capture_settle_required:true,
      visual_artifact_guard_required:true,
      quality_export_capture_after_settle_required:true,
      transient_artifact_selectors:['.toast.show','.modalBackdrop.show','[aria-busy="true"]','[data-loading="true"]','[class*="spinner"]','[class*="skeleton"]'],
      artifacts,
      required_artifact_count:artifacts.length,
      missing_artifact_count:missing.length,
      screenshots_attached_by_default:true,
      metadata_written_by_default:true,
      strict_visual_baseline_optional:true,
      release_gate:missing.length === 0 ? 'browser_evidence_capture_ready' : 'browser_evidence_capture_blocked'
    };
  }
  function buildHostedDemoVerification(input = {}, {version = VERSION, now = nowIso()} = {}){
    const checklist = buildDeploymentChecklist(input);
    const passCount = checklist.filter((item) => item.passed).length;
    const failCount = checklist.length - passCount;
    return {
      hosted_demo_version:version,
      generated_at:now,
      release_type:'patch',
      deployment_stage:'hosted_demo_verification',
      runtime_capability_change:false,
      provider_behavior_changed:false,
      oauth_behavior_changed:false,
      backend_behavior_changed:false,
      source_behavior_changed:false,
      storage_behavior_changed:false,
      browser_evidence_required:true,
      checklist,
      pass_count:passCount,
      fail_count:failCount,
      readiness_score:Math.round((passCount / Math.max(1, checklist.length)) * 100),
      verification_notes:[
        'Verify the hosted URL after deployment, not only the local static server.',
        'Capture desktop, mobile, provider-mode, and quality/export evidence before publishing.',
        'Treat browser evidence as proof of deployed behavior, not as a substitute for no-browser CI.'
      ],
      release_gate:failCount === 0 ? 'hosted_demo_verified' : 'hosted_demo_blocked'
    };
  }
  function buildHostedDemoSmokeFixes(input = {}, {version = VERSION, now = nowIso()} = {}){
    const checks = buildSmokeFixChecklist(input);
    const passCount = checks.filter((item) => item.passed).length;
    const failCount = checks.length - passCount;
    return {
      smoke_fixes_version:version,
      generated_at:now,
      release_type:'patch',
      deployment_stage:'hosted_demo_smoke_fixes',
      runtime_capability_change:false,
      provider_behavior_changed:false,
      oauth_behavior_changed:false,
      backend_behavior_changed:false,
      source_behavior_changed:false,
      storage_behavior_changed:false,
      checks,
      pass_count:passCount,
      fail_count:failCount,
      readiness_score:Math.round((passCount / Math.max(1, checks.length)) * 100),
      release_gate:failCount === 0 ? 'hosted_demo_smoke_fixed' : 'hosted_demo_smoke_blocked'
    };
  }
  function buildHostedDemoEvidenceReview(input = {}, {version = VERSION, now = nowIso()} = {}){
    const reviewItems = EVIDENCE_REVIEW_ITEMS.map((item, index) => {
      const reviewed = input[item.artifact_id] !== false;
      return Object.assign({}, item, {order:index + 1, reviewed, status:reviewed ? 'reviewed' : 'missing_review'});
    });
    const missing = reviewItems.filter((item) => item.required && item.reviewed === false);
    return {
      evidence_review_version:version,
      generated_at:now,
      review_stage:'hosted_demo_evidence_review',
      artifact_root:'test-results/hosted-demo-evidence',
      review_items:reviewItems,
      required_review_count:reviewItems.length,
      missing_review_count:missing.length,
      screenshots_required:true,
      metadata_snapshot_required:true,
      metadata_manifest_required:true,
      screenshot_sanity_required:true,
      capture_settle_manifest_required:true,
      visual_artifact_guard_required:true,
      raw_artifacts_allowed:false,
      reviewer_notes:[
        'Review attached screenshots before publishing the hosted demo.',
        'Confirm hosted-demo metadata contains desktop, mobile, provider-mode, and quality/export captures in one final manifest.',
        'Confirm viewport/image dimensions, horizontal overflow metrics, settle status, and visual artifact guard status are recorded for each screenshot.',
        'Confirm the hosted URL is the same build as package metadata.',
        'Treat evidence review as a release gate, not as cosmetic QA.'
      ],
      release_gate:missing.length === 0 ? 'evidence_review_complete' : 'evidence_review_blocked'
    };
  }
  root.hostedDemoVerification = Object.freeze({
    VERSION,
    DEPLOYMENT_CHECKS,
    SMOKE_FIX_CHECKS,
    EXPECTED_CAPTURE_NAMES,
    EVIDENCE_ARTIFACTS,
    EVIDENCE_REVIEW_ITEMS,
    defaultDeploymentInput,
    defaultSmokeFixInput,
    buildDeploymentChecklist,
    buildSmokeFixChecklist,
    buildBrowserEvidence,
    buildHostedDemoVerification,
    buildHostedDemoSmokeFixes,
    buildHostedDemoEvidenceReview
  });
})(window);
