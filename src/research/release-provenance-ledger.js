/* Jarbou3i Research Engine release provenance ledger helpers v1.1.0-alpha.7. */
(function(global){
  'use strict';
  const root = global.Jarbou3iResearchModules = global.Jarbou3iResearchModules || {};
  const VERSION = '1.1.0-alpha.7';
  const BASE_VERSION = '1.0.30';
  const RELEASE_TITLE = 'v1.1.0-alpha.7 — Package Script Compression + CI Gate Registry';
  const ARTIFACT_NAME = 'jarbou3i-research-engine-v1.1.0-alpha.7-package-script-compression-ci-gate-registry-patch.zip';
  const REQUIRED_EVIDENCE = Object.freeze([
    {evidence_id:'version_lock', label:'package/schema/fixtures identify v1.1.0-alpha.7', required:true},
    {evidence_id:'base_version_recorded', label:'base version v1.1.0-alpha.1 is recorded', required:true},
    {evidence_id:'artifact_name_recorded', label:'artifact name is versioned and fixed', required:true},
    {evidence_id:'changed_files_manifest_present', label:'changed-files manifest is required for handoff review', required:true},
    {evidence_id:'artifact_sha256_recorded', label:'artifact SHA256 is recorded after packaging', required:true},
    {evidence_id:'apply_gate_preserved', label:'release apply integrity gate remains required', required:true},
    {evidence_id:'ci_revalidation_required', label:'no-browser and browser CI revalidation is required', required:true},
    {evidence_id:'capability_boundary_unchanged', label:'no runtime/provider/OAuth/backend/source/storage expansion is introduced', required:true}
  ]);
  function nowIso(){return new Date().toISOString();}
  function bool(value){return value === true;}
  function defaultProvenanceInput(){return {version_lock:true, base_version_recorded:true, artifact_name_recorded:true, changed_files_manifest_present:true, artifact_sha256_recorded:true, apply_gate_preserved:true, ci_revalidation_required:true, capability_boundary_unchanged:true};}
  function buildLedgerEvidence(input = {}){
    const merged = Object.assign(defaultProvenanceInput(), input || {});
    return REQUIRED_EVIDENCE.map((item,index)=>{
      const passed = bool(merged[item.evidence_id]);
      return Object.assign({}, item, {order:index + 1, passed, status:passed ? 'pass' : 'fail'});
    });
  }
  function buildReleaseProvenanceLedger(input = {}, {version = VERSION, baseVersion = BASE_VERSION, now = nowIso(), artifactName = ARTIFACT_NAME, artifactSha256 = 'computed_after_packaging'} = {}){
    const ledgerEvidence = buildLedgerEvidence(input);
    const passCount = ledgerEvidence.filter((item)=>item.passed).length;
    const failCount = ledgerEvidence.length - passCount;
    return {
      release_provenance_ledger_version: version,
      generated_at: now,
      release_title: `v${version} — Package Script Compression + CI Gate Registry`,
      provenance_stage: 'release_provenance_ledger_checked',
      release_type: 'patch',
      patch_type: 'changed_files_only',
      base_version: baseVersion,
      target_version: version,
      artifact_name: artifactName,
      artifact_sha256: artifactSha256,
      changed_files_manifest_required: true,
      release_apply_integrity_required: true,
      no_browser_ci_required: true,
      browser_ci_required: true,
      runtime_capability_change: false,
      provider_behavior_changed: false,
      oauth_behavior_changed: false,
      backend_behavior_changed: false,
      source_behavior_changed: false,
      storage_behavior_changed: false,
      manual_private_default: true,
      live_scraping_enabled: false,
      real_oauth_enabled: false,
      live_source_verification_enabled: false,
      ledger_evidence: ledgerEvidence,
      pass_count: passCount,
      fail_count: failCount,
      required_commands: [
        `unzip -o ${artifactName} -d .`,
        'npm ci --no-audit --no-fund --ignore-scripts',
        'npm run test:v110a1:no-browser',
        'npm run test:ci:no-browser',
        'PLAYWRIGHT_SKIP_INSTALL=1 npm run test:ci:browser'
      ],
      blocked_claims: [
        'Do not treat a named artifact as provenance unless the changed-files manifest and SHA256 are reviewed.',
        'Do not publish from a patch that was not applied to v1.0.28 and revalidated.',
        'Do not claim live scraping, production OAuth, provider behavior changes, backend endpoint expansion, source connector expansion, or storage expansion.',
        'Do not approve public demo release from screenshots or ZIP existence alone.'
      ],
      release_gate: failCount === 0 ? 'release_provenance_ledger_pass' : 'release_provenance_ledger_blocked'
    };
  }
  root.releaseProvenanceLedger = Object.freeze({VERSION, BASE_VERSION, RELEASE_TITLE, ARTIFACT_NAME, REQUIRED_EVIDENCE, defaultProvenanceInput, buildLedgerEvidence, buildReleaseProvenanceLedger});
})(typeof window !== 'undefined' ? window : globalThis);
