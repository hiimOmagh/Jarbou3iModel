import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import { getMigrationFixture, getPrivacyFixture, fixturePathExists } from './fixture-registry-loader.mjs';
import { readReleaseDoc, releaseDocExists } from './release-docs-loader.mjs';

const read = (file) => fs.readFileSync(file, 'utf8');
const json = (file) => JSON.parse(read(file));

const pkg = json('package.json');
const config = read('playwright.config.js');
const browserSpec = read('tests/hosted-demo-browser-evidence.spec.mjs');
const ci = read('scripts/ci-browser.sh');
const workflow = read('.github/workflows/ci.yml');
const schema = json('schema/research-workflow.schema.json');
const fixture = json('fixtures/research/sample-research-workflow-en.json');
const migrationFixture = getMigrationFixture('fixtures/migrations/v1.3.0-packet.json');
const privacyFixture = getPrivacyFixture('fixtures/privacy/browser-generated-export-v1.3.0.json');
const docs = readReleaseDoc('docs/v1.0.10-hosted-url-ci-artifact-review-module-type-warning-fix.md');

const sandbox = { window: {}, console };
sandbox.window.Jarbou3iResearchModules = {};
vm.createContext(sandbox);
vm.runInContext(read('src/research/hosted-demo-verification.js'), sandbox, { filename:'src/research/hosted-demo-verification.js' });
const hosted = sandbox.window.Jarbou3iResearchModules.hostedDemoVerification;

assert.equal(pkg.version, '1.4.0-alpha.8');
assert.ok(config.includes('HOSTED_DEMO_URL'), 'Playwright config must support hosted URL verification');
assert.ok(config.includes('webServer: hostedDemoUrl ? undefined'), 'hosted URL mode must not launch local webServer');
assert.ok(browserSpec.includes('HOSTED_DEMO_EVIDENCE_DIR'), 'browser evidence spec must support artifact directory override');
assert.ok(browserSpec.includes('hosted-demo-metadata.json'), 'browser evidence spec must write metadata snapshot');
assert.ok(browserSpec.includes('assertNoHorizontalOverflow'), 'browser evidence spec must check horizontal overflow');
assert.ok(browserSpec.includes('hostedDemoEvidenceReviewPanel'), 'browser evidence spec must assert evidence review panel');
assert.ok(browserSpec.includes('async function openProviderHarness'), 'browser evidence spec must open provider harness accordion before asserting provider controls');
assert.ok(browserSpec.includes("providerCard.locator('h3').click()"), 'browser evidence spec must expand provider harness when advanced accordion is closed');
assert.ok(browserSpec.includes('async function openQualityExport'), 'browser evidence spec must open quality/export tab through a helper');
assert.ok(browserSpec.includes("#exportSourcePacketBuilderBtn"), 'quality/export evidence capture must assert a visible export control that belongs to the quality tab');
assert.ok(!browserSpec.includes("expect(page.locator('#exportWorkflowBtn')).toBeVisible()"), 'quality/export evidence capture must not assert hidden Evidence-tab exportWorkflowBtn');
assert.ok(ci.includes('ci-gate-runner.mjs browser'), 'browser CI must run evidence capture through registry runner');
assert.ok(!ci.includes('npm run test:browser\n'), 'browser CI must avoid duplicate full-suite run after targeted suites');
assert.ok(workflow.includes('hosted-demo-evidence'), 'GitHub workflow must upload hosted demo evidence artifact');

const smoke = hosted.buildHostedDemoSmokeFixes({ metadata_artifact_written:false }, { version:'1.3.0', now:'2026-05-01T00:00:00.000Z' });
assert.equal(smoke.release_gate, 'hosted_demo_smoke_blocked');
assert.equal(smoke.fail_count, 1);
const smokeOk = hosted.buildHostedDemoSmokeFixes({}, { version:'1.3.0', now:'2026-05-01T00:00:00.000Z' });
assert.equal(smokeOk.release_gate, 'hosted_demo_smoke_fixed');
assert.equal(smokeOk.provider_behavior_changed, false);
assert.equal(smokeOk.oauth_behavior_changed, false);
assert.equal(smokeOk.backend_behavior_changed, false);
assert.equal(smokeOk.source_behavior_changed, false);
assert.equal(smokeOk.storage_behavior_changed, false);

const review = hosted.buildHostedDemoEvidenceReview({ provider_mode:false }, { version:'1.3.0', now:'2026-05-01T00:00:00.000Z' });
assert.equal(review.release_gate, 'evidence_review_blocked');
assert.equal(review.missing_review_count, 1);
const reviewOk = hosted.buildHostedDemoEvidenceReview({}, { version:'1.3.0', now:'2026-05-01T00:00:00.000Z' });
assert.equal(reviewOk.release_gate, 'evidence_review_complete');
assert.equal(reviewOk.raw_artifacts_allowed, false);

assert.ok(schema.required.includes('hosted_demo_smoke_fixes'));
assert.ok(schema.required.includes('hosted_demo_evidence_review'));
assert.equal(schema.properties.hosted_demo_smoke_fixes.properties.release_gate.const, 'hosted_demo_smoke_fixed');
assert.equal(schema.properties.hosted_demo_evidence_review.properties.release_gate.const, 'evidence_review_complete');
assert.equal(schema.properties.hosted_demo_evidence_review.properties.raw_artifacts_allowed.const, false);

for (const packet of [fixture, migrationFixture, privacyFixture]) {
  assert.equal(packet.hosted_demo_smoke_fixes.smoke_fixes_version, '1.3.0');
  assert.equal(packet.hosted_demo_smoke_fixes.release_gate, 'hosted_demo_smoke_fixed');
  assert.equal(packet.hosted_demo_smoke_fixes.runtime_capability_change, false);
  assert.equal(packet.hosted_demo_evidence_review.evidence_review_version, '1.3.0');
  assert.equal(packet.hosted_demo_evidence_review.release_gate, 'evidence_review_complete');
  assert.equal(packet.hosted_demo_evidence_review.raw_artifacts_allowed, false);
}

for (const token of [
  'HOSTED_DEMO_URL',
  'hosted-demo-metadata.json',
  'evidence review',
  'No provider, OAuth, backend, source, or storage behavior changed'
]) {
  assert.ok(docs.includes(token), `v1.1.0 doc missing ${token}`);
}

console.log('Hosted demo evidence review checks passed.');
process.exit(0);
