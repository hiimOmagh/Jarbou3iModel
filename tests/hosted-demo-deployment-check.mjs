import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import { getMigrationFixture, getPrivacyFixture, fixturePathExists } from './fixture-registry-loader.mjs';
import { readReleaseDoc, releaseDocExists } from './release-docs-loader.mjs';
import { readReleaseArtifact, releaseArtifactExists } from './release-artifacts-loader.mjs';

const read = (file) => readReleaseArtifact(file);
const json = (file) => JSON.parse(read(file));
const pkg = json('package.json');
const index = read('index.html');
const engine = read('src/research-engine.js');
const schema = json('schema/research-workflow.schema.json');
const fixture = json('fixtures/research/sample-research-workflow-en.json');
const migrationFixture = getMigrationFixture('fixtures/migrations/v1.2.0-alpha.5-packet.json');
const privacyFixture = getPrivacyFixture('fixtures/privacy/browser-generated-export-v1.2.0-alpha.5.json');
const docs = readReleaseDoc('docs/v1.0.10-hosted-url-ci-artifact-review-module-type-warning-fix.md');
const guide = read('HOSTED_DEMO_VERIFICATION.md');
const evidenceGuide = read('BROWSER_EVIDENCE.md');
const ciBrowser = read('scripts/ci-browser.sh');
const ciNoBrowser = read('scripts/ci-no-browser.sh');

const sandbox = { window: {}, console };
sandbox.window.Jarbou3iResearchModules = {};
vm.createContext(sandbox);
vm.runInContext(read('src/research/hosted-demo-verification.js'), sandbox, { filename:'src/research/hosted-demo-verification.js' });
const hosted = sandbox.window.Jarbou3iResearchModules.hostedDemoVerification;

assert.equal(pkg.version, '1.2.0-alpha.5');
assert.equal(hosted.VERSION, '1.2.0-alpha.5');
assert.ok(index.includes('id="hostedDemoVerificationPanel"'), 'hosted demo panel missing');
assert.ok(index.includes('id="hostedDemoEvidenceReviewPanel"'), 'evidence review panel missing');
assert.ok(index.includes('src="src/research/hosted-demo-verification.js" defer'), 'hosted demo module missing from index');
assert.ok(index.includes('v1.2.0-alpha.5 · Claim Traceability Console + Review Decision Ledger'), 'v1.1.0 badge missing');
assert.ok(engine.includes('hostedDemoReport()'), 'research packet must include hosted demo report');
assert.ok(engine.includes('browserEvidenceReport()'), 'research packet must include browser evidence report');
assert.ok(engine.includes('hostedDemoSmokeFixesReport()'), 'research packet must include hosted demo smoke fixes report');
assert.ok(engine.includes('hostedDemoEvidenceReviewReport()'), 'research packet must include hosted demo evidence review report');
assert.ok(schema.required.includes('hosted_demo_verification'), 'schema must require hosted_demo_verification');
assert.ok(schema.required.includes('browser_evidence_capture'), 'schema must require browser_evidence_capture');
assert.ok(schema.required.includes('hosted_demo_smoke_fixes'), 'schema must require hosted_demo_smoke_fixes');
assert.ok(schema.required.includes('hosted_demo_evidence_review'), 'schema must require hosted_demo_evidence_review');
assert.equal(schema.properties.hosted_demo_verification.properties.hosted_demo_version.const, '1.2.0-alpha.5');
assert.equal(schema.properties.browser_evidence_capture.properties.browser_evidence_version.const, '1.2.0-alpha.5');
assert.equal(schema.properties.hosted_demo_smoke_fixes.properties.smoke_fixes_version.const, '1.2.0-alpha.5');
assert.equal(schema.properties.hosted_demo_evidence_review.properties.evidence_review_version.const, '1.2.0-alpha.5');

const report = hosted.buildHostedDemoVerification({}, { version:'1.2.0-alpha.5', now:'2026-05-01T00:00:00.000Z' });
assert.equal(report.release_gate, 'hosted_demo_verified');
assert.equal(report.runtime_capability_change, false);
assert.equal(report.provider_behavior_changed, false);
assert.equal(report.oauth_behavior_changed, false);
assert.equal(report.backend_behavior_changed, false);
assert.equal(report.source_behavior_changed, false);
assert.equal(report.storage_behavior_changed, false);
assert.equal(report.browser_evidence_required, true);
assert.equal(report.readiness_score, 100);
assert.ok(report.checklist.length >= 8);

const blocked = hosted.buildHostedDemoVerification({ mobile_evidence_captured:false }, { version:'1.2.0-alpha.5', now:'2026-05-01T00:00:00.000Z' });
assert.equal(blocked.release_gate, 'hosted_demo_blocked');
assert.equal(blocked.fail_count, 1);

const evidence = hosted.buildBrowserEvidence({}, { version:'1.2.0-alpha.5', now:'2026-05-01T00:00:00.000Z' });
assert.equal(evidence.release_gate, 'browser_evidence_capture_ready');
assert.equal(evidence.screenshots_attached_by_default, true);
assert.equal(evidence.metadata_written_by_default, true);
assert.ok(evidence.artifacts.some((item) => item.artifact_id === 'desktop_first_screen'));
assert.ok(evidence.artifacts.some((item) => item.artifact_id === 'metadata_snapshot'));

const smoke = hosted.buildHostedDemoSmokeFixes({}, { version:'1.2.0-alpha.5', now:'2026-05-01T00:00:00.000Z' });
assert.equal(smoke.release_gate, 'hosted_demo_smoke_fixed');
assert.equal(smoke.runtime_capability_change, false);
assert.equal(smoke.readiness_score, 100);
assert.ok(smoke.checks.some((item) => item.check_id === 'hosted_url_route_supported'));

const review = hosted.buildHostedDemoEvidenceReview({}, { version:'1.2.0-alpha.5', now:'2026-05-01T00:00:00.000Z' });
assert.equal(review.release_gate, 'evidence_review_complete');
assert.equal(review.raw_artifacts_allowed, false);
assert.equal(review.metadata_snapshot_required, true);
assert.ok(review.review_items.some((item) => item.artifact_id === 'version_consistency'));

for (const packet of [fixture, migrationFixture, privacyFixture]) {
  assert.equal(packet.workflow_version, '1.2.0-alpha.5');
  assert.equal(packet.hosted_demo_verification.hosted_demo_version, '1.2.0-alpha.5');
  assert.equal(packet.hosted_demo_verification.release_gate, 'hosted_demo_verified');
  assert.equal(packet.hosted_demo_verification.runtime_capability_change, false);
  assert.equal(packet.hosted_demo_verification.browser_evidence_required, true);
  assert.equal(packet.browser_evidence_capture.browser_evidence_version, '1.2.0-alpha.5');
  assert.equal(packet.browser_evidence_capture.release_gate, 'browser_evidence_capture_ready');
  assert.equal(packet.browser_evidence_capture.screenshots_attached_by_default, true);
  assert.equal(packet.hosted_demo_smoke_fixes.smoke_fixes_version, '1.2.0-alpha.5');
  assert.equal(packet.hosted_demo_smoke_fixes.release_gate, 'hosted_demo_smoke_fixed');
  assert.equal(packet.hosted_demo_evidence_review.evidence_review_version, '1.2.0-alpha.5');
  assert.equal(packet.hosted_demo_evidence_review.release_gate, 'evidence_review_complete');
}

for (const corpus of [docs, guide, evidenceGuide]) {
  assert.ok(corpus.includes('Hosted Demo') || corpus.includes('hosted demo'), 'hosted demo docs missing');
  assert.ok(corpus.includes('browser evidence') || corpus.includes('Browser Evidence'), 'browser evidence docs missing');
  assert.ok(corpus.includes('evidence review') || corpus.includes('Evidence Review'), 'evidence review docs missing');
}
assert.ok(Object.keys(pkg.scripts).length <= 20, 'package script surface must remain compressed');
assert.ok(Object.keys(pkg.scripts).length <= 20, 'package script surface must remain compressed');
assert.ok(Object.keys(pkg.scripts).length <= 20, 'package script surface must remain compressed');
assert.ok(Object.keys(pkg.scripts).length <= 20, 'package script surface must remain compressed');
assert.ok(ciNoBrowser.includes('ci-gate-runner.mjs no-browser'));
assert.ok(ciBrowser.includes('ci-gate-runner.mjs browser'));
assert.ok(!ciBrowser.includes('npm run test:browser\n'), 'browser CI should not duplicate full browser suite after targeted evidence run');

console.log('Hosted demo deployment verification checks passed.');
process.exit(0);
