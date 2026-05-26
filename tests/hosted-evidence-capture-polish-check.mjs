import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import { getMigrationFixture, getPrivacyFixture } from './fixture-registry-loader.mjs';
import { readReleaseDoc, releaseDocExists } from './release-docs-loader.mjs';

const CURRENT_VERSION = '1.4.0-alpha.2';
const CURRENT_TITLE = 'Provider/Source Execution Policy Matrix + Failure UX Contracts';
const VERSION = '1.3.0';
const TITLE = 'Stable Manual Workflow Release';
const RELEASE = `v${VERSION} — ${TITLE}`;
const SPEC = 'tests/hosted-demo-browser-evidence.spec.mjs';
const DOC = `docs/v${VERSION}-evidence-pack-export-v3-brief-traceability.md`;

const read = (file) => fs.readFileSync(file, 'utf8');
const json = (file) => JSON.parse(read(file));
const pkg = json('package.json');
const registry = json('tests/ci-gate-registry.json');
const sample = json('fixtures/research/sample-research-workflow-en.json');
const migrationFixture = getMigrationFixture(`fixtures/migrations/v${VERSION}-packet.json`);
const privacyFixture = getPrivacyFixture(`fixtures/privacy/browser-generated-export-v${VERSION}.json`);
const spec = read(SPEC);
const hostedModuleSource = read('src/research/hosted-demo-verification.js');
const migrationSource = read('src/research/migrations.js');

assert.equal(pkg.version, CURRENT_VERSION);
assert.equal(registry.ci_gate_registry_version, CURRENT_VERSION);
assert.equal(registry.release_title, `v${CURRENT_VERSION} — ${CURRENT_TITLE}`);
assert.equal(registry.hosted_evidence_capture_polish?.version, CURRENT_VERSION);
assert.equal(registry.hosted_evidence_capture_polish?.screenshot_settle_required, true);
assert.equal(registry.hosted_evidence_capture_polish?.visual_artifact_guard_required, true);
assert.equal(registry.hosted_evidence_capture_polish?.quality_export_capture_after_settle_required, true);
assert.equal(registry.hosted_evidence_capture_polish?.runtime_capability_change, false);
assert.equal(registry.hosted_evidence_capture_polish?.provider_behavior_changed, false);
assert.equal(registry.hosted_evidence_capture_polish?.oauth_behavior_changed, false);
assert.equal(registry.hosted_evidence_capture_polish?.backend_behavior_changed, false);
assert.equal(registry.hosted_evidence_capture_polish?.source_behavior_changed, false);
assert.equal(registry.hosted_evidence_capture_polish?.storage_behavior_changed, false);
assert.ok(registry.gates['no-browser'].node_checks.includes('tests/hosted-evidence-capture-polish-check.mjs'));
assert.ok(registry.gates['current-no-browser'].node_checks.includes('tests/hosted-evidence-capture-polish-check.mjs'));
assert.ok(registry.syntax_matrix.files.includes('tests/hosted-evidence-capture-polish-check.mjs'));

for (const token of [
  'waitForEvidenceStable',
  'assertNoTransientArtifacts',
  'TRANSIENT_ARTIFACT_SELECTORS',
  'visual_artifact_guard_required',
  'capture_settle_required',
  'capture_settled',
  'visual_artifact_guard_passed',
  'quality-export-open',
  'DOM fingerprint must be stable before evidence capture',
  'must not capture transient overlays/loading artifacts',
  'HOSTED_EVIDENCE_TEST_TIMEOUT_MS',
  'HOSTED_EVIDENCE_CANONICAL_PROJECT',
  'single_canonical_project_with_explicit_mobile_viewport_capture',
  'duplicate_project_metadata_overwrite_guard',
  'test.skip(',
  "testInfo.project.name !== HOSTED_EVIDENCE_CANONICAL_PROJECT"
]) {
  assert.ok(spec.includes(token), `hosted evidence spec missing ${token}`);
}

assert.ok(spec.includes("'.toast.show'"), 'toast overlay guard missing');
assert.ok(spec.includes("'.modalBackdrop.show'"), 'modal overlay guard missing');
assert.ok(spec.includes("'[aria-busy=\"true\"]'"), 'aria-busy guard missing');
assert.ok(spec.includes('page.evaluate(({ selectors, label }) => {'), 'artifact guard page.evaluate must receive label explicitly');
assert.ok(spec.includes('}, { selectors: TRANSIENT_ARTIFACT_SELECTORS, label })'), 'artifact guard page.evaluate must pass label into browser context');
assert.ok(spec.includes('isExpectedHiddenShell'), 'artifact guard must ignore expected hidden toast/modal shells');
assert.ok(spec.includes('coversViewportCenter'), 'fixed-overlay guard must be scoped to center-blocking overlays');
assert.ok(spec.includes("visual_artifact_guard_scope: 'visible_transient_selectors_and_center_blocking_fixed_overlays'"), 'artifact guard metadata must record the scoped guard mode');
assert.ok(spec.includes('toMatchObject({ visual_artifact_guard_passed: true })'), 'artifact guard assertion must preserve diagnostic state on failure');
assert.ok(spec.includes('const HOSTED_EVIDENCE_TEST_TIMEOUT_MS = 180_000;'), 'hosted evidence matrix test must have a bounded extended timeout for multi-surface capture');
assert.ok(spec.includes("const HOSTED_EVIDENCE_CANONICAL_PROJECT = 'chromium';"), 'hosted evidence capture must be scoped to one canonical project');
assert.ok(spec.includes("test.describe.configure({ mode: 'serial' });"), 'hosted evidence capture must run serially to prevent artifact races');
assert.ok(spec.includes("test.skip("), 'hosted evidence capture must skip duplicate project executions');
assert.ok(spec.includes('testInfo.project.name !== HOSTED_EVIDENCE_CANONICAL_PROJECT'), 'hosted evidence capture must only write metadata from the canonical project');
assert.ok(spec.includes("project_scope_policy: 'single_canonical_project_with_explicit_mobile_viewport_capture'"), 'metadata must declare project-scope overwrite policy');
assert.ok(spec.includes('duplicate_project_metadata_overwrite_guard: true'), 'metadata must record duplicate project overwrite guard');
assert.ok(spec.includes('expect(metadata.duplicate_project_metadata_overwrite_guard).toBe(true);'), 'metadata assertions must lock duplicate project overwrite guard');
assert.ok(spec.includes("await waitForEvidenceStable(page, 'quality-export-open')"), 'quality/export open path must settle before capture');
assert.ok(spec.includes('expect(metadata.visual_artifact_guard_required).toBe(true);'));
assert.ok(spec.includes('expect(metadata.capture_settle_required).toBe(true);'));
assert.equal((spec.match(/const metadata = await writeMetadata\(page, captures/g) || []).length, 1, 'metadata must remain a single final manifest write');

const sandbox = { window: {}, console };
sandbox.window.Jarbou3iResearchModules = {};
vm.createContext(sandbox);
vm.runInContext(hostedModuleSource, sandbox, { filename:'src/research/hosted-demo-verification.js' });
const hosted = sandbox.window.Jarbou3iResearchModules.hostedDemoVerification;
assert.equal(hosted.VERSION, VERSION);
const browserEvidence = hosted.buildBrowserEvidence({}, { version:VERSION, now:'2026-05-18T00:00:00.000Z' });
assert.equal(browserEvidence.capture_settle_required, true);
assert.equal(browserEvidence.visual_artifact_guard_required, true);
assert.equal(browserEvidence.quality_export_capture_after_settle_required, true);
assert.ok(browserEvidence.transient_artifact_selectors.includes('.toast.show'));
assert.ok(browserEvidence.transient_artifact_selectors.includes('.modalBackdrop.show'));
const smoke = hosted.buildHostedDemoSmokeFixes({}, { version:VERSION, now:'2026-05-18T00:00:00.000Z' });
assert.equal(smoke.release_gate, 'hosted_demo_smoke_fixed');
assert.ok(smoke.checks.some((check) => check.check_id === 'capture_settle_guard_checked'));
assert.ok(smoke.checks.some((check) => check.check_id === 'visual_artifact_guard_checked'));
assert.ok(smoke.checks.some((check) => check.check_id === 'quality_export_capture_settled'));
const review = hosted.buildHostedDemoEvidenceReview({}, { version:VERSION, now:'2026-05-18T00:00:00.000Z' });
assert.equal(review.release_gate, 'evidence_review_complete');
assert.equal(review.capture_settle_manifest_required, true);
assert.equal(review.visual_artifact_guard_required, true);
assert.ok(review.review_items.some((item) => item.artifact_id === 'visual_artifact_guard'));
assert.ok(review.review_items.some((item) => item.artifact_id === 'capture_settle_manifest'));

for (const packet of [sample, migrationFixture, privacyFixture]) {
  assert.equal(packet.workflow_version, VERSION);
  assert.equal(packet.release_notes.release_title, RELEASE);
  assert.equal(packet.browser_evidence_capture.capture_settle_required, true);
  assert.equal(packet.browser_evidence_capture.visual_artifact_guard_required, true);
  assert.equal(packet.browser_evidence_capture.quality_export_capture_after_settle_required, true);
  assert.ok(packet.browser_evidence_capture.transient_artifact_selectors.includes('.toast.show'));
  assert.equal(packet.hosted_demo_smoke_fixes.pass_count, 11);
  assert.ok(packet.hosted_demo_smoke_fixes.checks.some((check) => check.check_id === 'capture_settle_guard_checked'));
  assert.ok(packet.hosted_demo_smoke_fixes.checks.some((check) => check.check_id === 'visual_artifact_guard_checked'));
  assert.equal(packet.hosted_demo_evidence_review.required_review_count, 11);
  assert.equal(packet.hosted_demo_evidence_review.capture_settle_manifest_required, true);
  assert.equal(packet.hosted_demo_evidence_review.visual_artifact_guard_required, true);
}

assert.ok(migrationSource.includes('capture_settle_required:true'), 'migration default must preserve capture settle metadata');
assert.ok(migrationSource.includes('visual_artifact_guard_required:true'), 'migration default must preserve visual artifact guard metadata');
assert.ok(releaseDocExists(DOC), 'alpha.9 release-history doc anchor missing');
const doc = readReleaseDoc(DOC);
for (const token of [
  `# ${RELEASE}`,
  'waitForEvidenceStable',
  'assertNoTransientArtifacts',
  'capture_settled',
  'visual_artifact_guard_passed',
  'No runtime behavior change'
]) {
  assert.ok(doc.includes(token), `alpha.9 release doc missing ${token}`);
}

console.log('Hosted evidence capture polish checks passed.');
process.exit(0);
