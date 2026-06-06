/* Jarbou3i Research Engine targeted hosted evidence capture 1.4.0-alpha.56. */
/* Evidence-process upgrade only. No network calls, provider execution, OAuth/token lifecycle, backend/storage/source behavior expansion, status persistence, batch mutation, navigation-state persistence, automatic verification, automatic signoff, automatic export lock, cryptographic signature claim, or publication permission action. */
(function(global){
  'use strict';
  const root = global.Jarbou3iResearchModules = global.Jarbou3iResearchModules || {};
  const VERSION = '1.4.0-alpha.56';
  const MILESTONE = 'v1.4.0-alpha.56 — Lock Evidence Review CLI Hardening + Exit Codes';
  const MODEL = 'targeted_hosted_evidence_capture.v1';
  const CONTEXT_CAPTURE_BASELINE = '1.4.0-alpha.42';
  const MAX_TARGETED_WIDTH = 1200;
  const MAX_TARGETED_HEIGHT = 900;
  const REQUIRED_REGION_COUNT = 5;
  const BOUNDARY_FLAGS = Object.freeze({
    evidence_capture_only:true,
    metadata_only:true,
    product_behavior_changed:false,
    network_invocation_allowed:false,
    live_provider_execution_performed:false,
    live_source_fetching_performed:false,
    provider_execution_expanded:false,
    oauth_lifecycle_changed:false,
    backend_storage_expanded:false,
    source_behavior_expanded:false,
    automatic_source_verification_claimed:false,
    automatic_signoff_performed:false,
    automatic_export_lock_performed:false,
    publication_permission_claimed:false,
    status_persistence_enabled:false,
    batch_mutation_enabled:false,
    navigation_state_persistence_enabled:false
  });

  const REQUIRED_REGIONS = Object.freeze([
    Object.freeze({ region_id:'first-run-guide', evidence_root_selector:'[data-evidence-region="first-run-guide"]', proof_selector:'[data-evidence-region="first-run-guide"] .firstRunCopy', selector:'[data-evidence-region="first-run-guide"] .firstRunCopy', surface:'onboarding', claim:'First-run onboarding is visible and bounded before work starts.', expected_tokens:Object.freeze(['First-run guide']), max_width:MAX_TARGETED_WIDTH, max_height:MAX_TARGETED_HEIGHT }),
    Object.freeze({ region_id:'public-demo-readiness', evidence_root_selector:'[data-evidence-region="public-demo-readiness"]', proof_selector:'[data-evidence-region="public-demo-readiness"] > div:first-child', selector:'[data-evidence-region="public-demo-readiness"] > div:first-child', surface:'public-demo', claim:'Public-demo readiness constraints are visible.', expected_tokens:Object.freeze(['Public demo ready']), max_width:MAX_TARGETED_WIDTH, max_height:MAX_TARGETED_HEIGHT }),
    Object.freeze({ region_id:'hosted-demo-release-contract', evidence_root_selector:'[data-evidence-region="hosted-demo-release-contract"]', proof_selector:'[data-evidence-region="hosted-demo-release-contract"] > div:first-child', selector:'[data-evidence-region="hosted-demo-release-contract"] > div:first-child', surface:'hosted-demo', claim:'Current release lock review CLI CI smoke and exit-code and failure-family contract requirements are visible.', expected_tokens:Object.freeze(['Lock Evidence Review CLI Hardening + Exit Codes','lock bundle ZIP','dashboard digest','next action']), max_width:MAX_TARGETED_WIDTH, max_height:MAX_TARGETED_HEIGHT }),
    Object.freeze({ region_id:'evidence-review-gate', evidence_root_selector:'[data-evidence-region="evidence-review-gate"]', proof_selector:'[data-evidence-region="evidence-review-gate"] > div:first-child', selector:'[data-evidence-region="evidence-review-gate"] > div:first-child', surface:'evidence-review', claim:'Evidence review gate is visible before publication.', expected_tokens:Object.freeze(['Evidence review gate']), max_width:MAX_TARGETED_WIDTH, max_height:MAX_TARGETED_HEIGHT }),
    Object.freeze({ region_id:'quality-export-surface', evidence_root_selector:'[data-evidence-region="quality-export-surface"]', proof_selector:'[data-evidence-region="quality-export-surface"] .qualityExportProofSurface', selector:'[data-evidence-region="quality-export-surface"] .qualityExportProofSurface', surface:'quality-export', claim:'Quality/export proof surface captures quality, evidence-scoring, and publication-readiness evidence without relying on full-page screenshots.', expected_tokens:Object.freeze(['Quality','Evidence scoring calibration','Publication']), max_width:MAX_TARGETED_WIDTH, max_height:MAX_TARGETED_HEIGHT })
  ]);

  function asArray(value){ return Array.isArray(value) ? value : []; }
  function freezeRows(rows){ return Object.freeze(rows.map((row) => Object.freeze(row))); }
  function normalizeRegion(region){
    const evidenceRootSelector = String(region.evidence_root_selector || region.selector || '');
    const proofSelector = String(region.proof_selector || region.selector || evidenceRootSelector);
    return Object.freeze({
      region_id:String(region.region_id || ''),
      evidence_root_selector:evidenceRootSelector,
      proof_selector:proofSelector,
      selector:proofSelector,
      surface:String(region.surface || ''),
      claim:String(region.claim || ''),
      expected_tokens:Object.freeze(asArray(region.expected_tokens).map(String)),
      expected_tokens_non_empty:asArray(region.expected_tokens).length > 0,
      max_width:Number(region.max_width || MAX_TARGETED_WIDTH),
      max_height:Number(region.max_height || MAX_TARGETED_HEIGHT)
    });
  }
  function buildTargetedHostedEvidenceCapture(options = {}){
    const regions = freezeRows((asArray(options.regions).length ? options.regions : REQUIRED_REGIONS).map(normalizeRegion));
    const manifestRows = freezeRows(regions.map((region) => Object.assign({}, region, {
      screenshot_kind:'targeted-region',
      screenshot_policy:'locator_screenshot_required',
      context_full_page_allowed:true,
      full_page_only_proof_allowed:false,
      bounding_box_required:true,
      expected_token_proof_required:true,
      expected_tokens_non_empty:region.expected_tokens_non_empty === true,
      region_to_claim_mapping_required:true,
      max_width:region.max_width,
      max_height:region.max_height,
      passed:false
    })));
    return Object.freeze({
      targeted_hosted_evidence_capture_version:VERSION,
      milestone:MILESTONE,
      model:MODEL,
      context_capture_baseline:CONTEXT_CAPTURE_BASELINE,
      required_region_count:REQUIRED_REGION_COUNT,
      required_regions:regions,
      manifest_contract:Object.freeze({
        targeted_region_capture_enabled:true,
        locator_screenshot_required:true,
        region_to_claim_mapping_required:true,
        bounding_box_required:true,
        expected_token_proof_required:true,
        empty_expected_tokens_forbidden:true,
        full_page_context_capture_allowed:true,
        full_page_only_proof_allowed:false,
        target_screenshot_max_width:MAX_TARGETED_WIDTH,
        target_screenshot_max_height:MAX_TARGETED_HEIGHT
      }),
      manifest_rows:manifestRows,
      validation_rules:Object.freeze([
        'Every required region must have a selector.',
        'Every required region must produce a locator screenshot.',
        'Every locator screenshot must include width, height, bytes, and bounding box.',
        'Every required region must map to a claim and non-empty expected tokens.',
        'The evidence manifest must reject full-page-only proof.'
      ]),
      targeted_capture_copy:[
        'Targeted hosted evidence capture requires proof screenshots from the exact UI region being verified.',
        'Full-page screenshots remain context only and cannot satisfy release proof alone.',
        'Each targeted region maps selector → claim → expected tokens → bounding box → screenshot artifact.'
      ].join('\n'),
      boundary_flags:BOUNDARY_FLAGS
    });
  }
  root.targetedHostedEvidenceCapture = Object.freeze({
    VERSION,
    MILESTONE,
    MODEL,
    CONTEXT_CAPTURE_BASELINE,
    MAX_TARGETED_WIDTH,
    MAX_TARGETED_HEIGHT,
    REQUIRED_REGION_COUNT,
    REQUIRED_REGIONS,
    BOUNDARY_FLAGS,
    buildTargetedHostedEvidenceCapture
  });
})(typeof window !== 'undefined' ? window : globalThis);
