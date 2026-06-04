import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import { CURRENT_RELEASE, CURRENT_TITLE, CURRENT_VERSION } from './current-release-identity.mjs';


const VERSION = '1.4.0-alpha.44';
const MILESTONE = 'v1.4.0-alpha.44 — Evidence Matrix Semantics + Targeted Proof Hardening';
const MODULE = 'src/research/targeted-hosted-evidence-capture.js';
const CHECK = 'tests/targeted-hosted-evidence-capture-check.mjs';
const HOSTED_SPEC = 'tests/hosted-demo-browser-evidence.spec.mjs';

const sandbox = { console, TextEncoder, window: { Jarbou3iResearchModules: {} } };
sandbox.globalThis = sandbox;
vm.createContext(sandbox);
vm.runInContext(fs.readFileSync(MODULE, 'utf8'), sandbox, { filename: MODULE });

const mod = sandbox.window.Jarbou3iResearchModules.targetedHostedEvidenceCapture;
assert.ok(mod, 'targeted hosted evidence capture module must be registered');
assert.equal(mod.VERSION, VERSION);
assert.equal(mod.MILESTONE, MILESTONE);
assert.equal(mod.MODEL, 'targeted_hosted_evidence_capture.v1');
assert.equal(mod.CONTEXT_CAPTURE_BASELINE, '1.4.0-alpha.42');
assert.equal(mod.MAX_TARGETED_WIDTH, 1200);
assert.equal(mod.MAX_TARGETED_HEIGHT, 900);
assert.ok(mod.REQUIRED_REGION_COUNT >= 5);
assert.equal(typeof mod.buildTargetedHostedEvidenceCapture, 'function');

const capture = mod.buildTargetedHostedEvidenceCapture();
assert.equal(capture.targeted_hosted_evidence_capture_version, VERSION);
assert.equal(capture.milestone, MILESTONE);
assert.equal(capture.model, 'targeted_hosted_evidence_capture.v1');
assert.equal(capture.manifest_contract.targeted_region_capture_enabled, true);
assert.equal(capture.manifest_contract.locator_screenshot_required, true);
assert.equal(capture.manifest_contract.region_to_claim_mapping_required, true);
assert.equal(capture.manifest_contract.bounding_box_required, true);
assert.equal(capture.manifest_contract.expected_token_proof_required, true);
assert.equal(capture.manifest_contract.full_page_context_capture_allowed, true);
assert.equal(capture.manifest_contract.full_page_only_proof_allowed, false);
assert.equal(capture.manifest_contract.target_screenshot_max_width, 1200);
assert.equal(capture.manifest_contract.target_screenshot_max_height, 900);
assert.ok(capture.required_regions.length >= 5, 'at least five targeted evidence regions are required');
const boundedProofSelectors = capture.required_regions.map((region)=>region.proof_selector || region.selector);
assert.ok(boundedProofSelectors.every((selector)=>selector.includes(' ') || selector.includes('>')), 'wide layout regions must use a bounded proof subselector, not the full panel root');
assert.ok(capture.required_regions.find((region)=>region.region_id === 'first-run-guide').proof_selector.includes('.firstRunCopy'), 'first-run guide proof must target the copy block, not the full first-run panel');
const qualityExportRegion = capture.required_regions.find((region)=>region.region_id === 'quality-export-surface');
assert.ok(qualityExportRegion.proof_selector.includes('.qualityExportProofSurface'), 'quality export proof must target the bounded quality/export proof surface, not the full quality output root or a single score chip');
assert.ok(!qualityExportRegion.proof_selector.includes('.researchScore:first-child'), 'quality export proof must no longer target only the first score chip');
assert.deepEqual([...qualityExportRegion.expected_tokens], ['Quality','Evidence scoring calibration','Publication']);
assert.ok(qualityExportRegion.expected_tokens.length >= 3, 'quality export proof must require at least three visible tokens');
for (const region of capture.required_regions) {
  assert.ok(region.region_id, 'region id required');
  assert.ok(region.evidence_root_selector.startsWith('[data-evidence-region="'), 'region root selector must use data-evidence-region');
  assert.ok(region.proof_selector.startsWith(region.evidence_root_selector), 'proof selector must remain scoped to the evidence root selector');
  assert.equal(region.selector, region.proof_selector, 'selector remains the screenshot proof selector for compatibility');
  assert.ok(region.claim.length > 20, 'region must map to a concrete claim');
  assert.ok(region.expected_tokens.length >= 1, 'region must define expected tokens');
  assert.equal(region.expected_tokens_non_empty, true, 'region must expose non-empty expected token invariant');
  assert.ok(region.max_width <= 1200, 'target region width cap required');
  assert.ok(region.max_height <= 900, 'target region height cap required');
}
assert.ok(capture.manifest_rows.every((row)=>row.screenshot_kind === 'targeted-region'));
assert.ok(capture.manifest_rows.every((row)=>row.full_page_only_proof_allowed === false));
assert.ok(capture.manifest_rows.every((row)=>row.bounding_box_required === true));
assert.ok(capture.targeted_capture_copy.includes('Full-page screenshots remain context only'));
assert.equal(capture.boundary_flags.evidence_capture_only, true);
assert.equal(capture.boundary_flags.product_behavior_changed, false);
assert.equal(capture.boundary_flags.network_invocation_allowed, false);
assert.equal(capture.boundary_flags.live_provider_execution_performed, false);
assert.equal(capture.boundary_flags.live_source_fetching_performed, false);
assert.equal(capture.boundary_flags.provider_execution_expanded, false);
assert.equal(capture.boundary_flags.oauth_lifecycle_changed, false);
assert.equal(capture.boundary_flags.backend_storage_expanded, false);
assert.equal(capture.boundary_flags.source_behavior_expanded, false);
assert.equal(capture.boundary_flags.automatic_source_verification_claimed, false);
assert.equal(capture.boundary_flags.automatic_signoff_performed, false);
assert.equal(capture.boundary_flags.automatic_export_lock_performed, false);
assert.equal(capture.boundary_flags.publication_permission_claimed, false);

const index = fs.readFileSync('index.html', 'utf8');
for (const region of capture.required_regions) {
  assert.ok(index.includes(`data-evidence-region="${region.region_id}"`), `index must expose targeted evidence region ${region.region_id}`);
}
assert.ok(index.includes('src="src/research/targeted-hosted-evidence-capture.js" defer'), 'index must load targeted hosted evidence capture module');
assert.ok(index.includes('data-browser-qa="targeted-hosted-evidence-capture"'), 'index must expose targeted hosted evidence browser QA surface');

const hostedSpec = fs.readFileSync(HOSTED_SPEC, 'utf8');
for (const token of [
  'TARGETED_EVIDENCE_REGIONS',
  'captureTargetedEvidenceRegion',
  'generateTargetedRegionEvidence',
  'targeted-region-evidence-manifest.json',
  'targeted_region_capture_enabled',
  'full_page_only_proof_allowed:false',
  'evidence_root_selector',
  'proof_selector',
  'bounding_box',
  'targetedPixelArea',
  'expected_tokens_non_empty',
  'screenshot must have non-trivial pixel area',
  'screenshot must not be an empty/tiny PNG',
  '.screenshot(',
]) {
  assert.ok(hostedSpec.includes(token), `${HOSTED_SPEC} missing targeted evidence token: ${token}`);
}
assert.ok(!hostedSpec.includes('full_page_only_proof_allowed:true'), 'hosted evidence spec must not allow full-page-only proof');

const contract = JSON.parse(fs.readFileSync('tests/current-release-contract.json', 'utf8'));
assert.equal(contract.version, VERSION);
assert.equal(contract.milestone_name, CURRENT_TITLE);
assert.ok(contract.required_tests.includes(CHECK));
assert.ok(contract.required_tests.includes(HOSTED_SPEC));
assert.ok(contract.required_browser_evidence_files.includes('targeted-region-evidence-manifest.json'));
assert.ok(contract.required_browser_evidence_files.includes('targeted-regions/hosted-demo-release-contract.png'));
assert.ok(contract.expected_changed_files.includes(MODULE));
assert.ok(contract.expected_changed_files.includes(CHECK));

const registry = JSON.parse(fs.readFileSync('tests/ci-gate-registry.json', 'utf8'));
for (const gate of ['no-browser', 'current-no-browser', 'source', 'release', 'browser']) {
  assert.ok(registry.gates[gate].node_checks.includes(CHECK), `${gate} must run targeted hosted evidence capture check`);
}
assert.ok(registry.syntax_matrix.files.includes(MODULE), 'syntax matrix must cover targeted evidence module');
assert.ok(registry.syntax_matrix.files.includes(CHECK), 'syntax matrix must cover targeted evidence check');

console.log('Targeted hosted evidence capture checks passed.');
