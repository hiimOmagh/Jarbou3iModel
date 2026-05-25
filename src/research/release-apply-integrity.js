/* Jarbou3i Research Engine release apply integrity helpers v1.1.0. */
(function(global){
  'use strict';
  const root = global.Jarbou3iResearchModules = global.Jarbou3iResearchModules || {};
  const VERSION = '1.3.0-rc.1';
  const BASE_VERSION = '1.0.30';
  const RELEASE_TITLE = 'v1.3.0-rc.1 — Manual Workflow Release Candidate Freeze';
  const ARTIFACT_NAME = 'jarbou3i-research-engine-v1.3.0-rc.1-manual-workflow-release-candidate-freeze.zip';
  const APPLY_CHECKS = Object.freeze([
    {check_id:'base_version_known', label:'Patch is declared as changed-files-only over v1.1.0-alpha.1', required:true},
    {check_id:'artifact_name_fixed', label:'Release artifact name is fixed and versioned', required:true},
    {check_id:'changed_files_manifest_required', label:'Changed-files manifest is required for handoff review', required:true},
    {check_id:'package_version_locked', label:'package.json and package-lock root versions match the target release', required:true},
    {check_id:'no_browser_ci_required', label:'No-browser CI must pass after applying the patch', required:true},
    {check_id:'browser_ci_required', label:'Browser CI must pass after applying the patch', required:true},
    {check_id:'apply_commands_documented', label:'Apply, install, validate, commit, and push commands are documented', required:true},
    {check_id:'artifact_sha_required_after_packaging', label:'Artifact SHA256 must be recorded after packaging', required:true},
    {check_id:'capability_boundary_unchanged', label:'No runtime capability/provider/OAuth/backend/source/storage expansion is introduced', required:true}
  ]);
  function nowIso(){return new Date().toISOString();}
  function bool(value){return value === true;}
  function defaultApplyIntegrityInput(){return {base_version_known:true, artifact_name_fixed:true, changed_files_manifest_required:true, package_version_locked:true, no_browser_ci_required:true, browser_ci_required:true, apply_commands_documented:true, artifact_sha_required_after_packaging:true, capability_boundary_unchanged:true};}
  function buildApplyChecklist(input = {}){const merged = Object.assign(defaultApplyIntegrityInput(), input || {}); return APPLY_CHECKS.map((check,index)=>{const passed=bool(merged[check.check_id]); return Object.assign({}, check, {order:index+1, passed, status:passed?'pass':'fail'});});}
  function buildReleaseApplyIntegrity(input = {}, {version = VERSION, baseVersion = BASE_VERSION, now = nowIso(), artifactName = ARTIFACT_NAME, artifactSha256 = 'computed_after_packaging'} = {}){
    const checklist = buildApplyChecklist(input); const passCount = checklist.filter(item=>item.passed).length; const failCount = checklist.length - passCount;
    return {release_apply_integrity_version:version, generated_at:now, release_title:RELEASE_TITLE, integrity_stage:'release_apply_integrity_checked', release_type:'patch', patch_type:'changed_files_only', base_version:baseVersion, target_version:version, artifact_name:artifactName, artifact_sha256:artifactSha256, runtime_capability_change:false, provider_behavior_changed:false, oauth_behavior_changed:false, backend_behavior_changed:false, source_behavior_changed:false, storage_behavior_changed:false, manual_private_default:true, live_scraping_enabled:false, real_oauth_enabled:false, live_source_verification_enabled:false, zip_existence_sufficient:false, changed_files_manifest_required:true, apply_verification_required:true, checklist, pass_count:passCount, fail_count:failCount, required_commands:[`unzip -o ${artifactName} -d .`,'npm ci --no-audit --no-fund --ignore-scripts','npm run test:ci:no-browser','npm run test:ci:no-browser','PLAYWRIGHT_SKIP_INSTALL=1 npm run test:ci:browser'], blocked_claims:['Do not treat artifact download success as release approval.','Do not treat ZIP existence alone as proof of readiness.','Do not publish without applying the patch to the intended base and rerunning CI.','Do not claim live scraping, production OAuth, new provider behavior, backend endpoint expansion, source connector expansion, or storage expansion.'], release_gate:failCount===0?'release_apply_integrity_pass':'release_apply_integrity_blocked'};
  }
  root.releaseApplyIntegrity = Object.freeze({VERSION, BASE_VERSION, RELEASE_TITLE, ARTIFACT_NAME, APPLY_CHECKS, defaultApplyIntegrityInput, buildApplyChecklist, buildReleaseApplyIntegrity});
})(typeof window !== 'undefined' ? window : globalThis);
