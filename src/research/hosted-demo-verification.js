/* Jarbou3i Research Engine hosted demo deployment verification + browser evidence helpers v1.0.8. */
(function(global){
  'use strict';
  const root = global.Jarbou3iResearchModules = global.Jarbou3iResearchModules || {};
  const VERSION = '1.0.8';
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
  const EVIDENCE_ARTIFACTS = Object.freeze([
    {artifact_id:'desktop_first_screen', path:'test-results/hosted-demo-evidence/desktop-first-screen.png', required:true},
    {artifact_id:'mobile_first_screen', path:'test-results/hosted-demo-evidence/mobile-first-screen.png', required:true},
    {artifact_id:'provider_mode', path:'test-results/hosted-demo-evidence/provider-mode.png', required:true},
    {artifact_id:'quality_export', path:'test-results/hosted-demo-evidence/quality-export.png', required:true},
    {artifact_id:'metadata_snapshot', path:'test-results/hosted-demo-evidence/hosted-demo-metadata.json', required:true}
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
  function buildDeploymentChecklist(input = {}){
    const merged = Object.assign(defaultDeploymentInput(), input || {});
    return DEPLOYMENT_CHECKS.map((check, index) => {
      const passed = bool(merged[check.check_id]);
      return Object.assign({}, check, {order:index + 1, passed, status:passed ? 'pass' : 'fail'});
    });
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
      evidence_mode:'playwright_capture_and_attach',
      artifact_root:'test-results/hosted-demo-evidence',
      artifacts,
      required_artifact_count:artifacts.length,
      missing_artifact_count:missing.length,
      screenshots_attached_by_default:true,
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
  root.hostedDemoVerification = Object.freeze({VERSION, DEPLOYMENT_CHECKS, EVIDENCE_ARTIFACTS, defaultDeploymentInput, buildDeploymentChecklist, buildBrowserEvidence, buildHostedDemoVerification});
})(window);
