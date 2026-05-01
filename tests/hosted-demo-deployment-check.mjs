import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const read = (file) => fs.readFileSync(file, 'utf8');
const json = (file) => JSON.parse(read(file));
const pkg = json('package.json');
const index = read('index.html');
const engine = read('src/research-engine.js');
const schema = json('schema/research-workflow.schema.json');
const fixture = json('fixtures/research/sample-research-workflow-en.json');
const migrationFixture = json('fixtures/migrations/v1.0.8-packet.json');
const privacyFixture = json('fixtures/privacy/browser-generated-export-v1.0.8.json');
const docs = read('docs/v1.0.8-hosted-demo-deployment-browser-evidence.md');
const guide = read('HOSTED_DEMO_VERIFICATION.md');
const evidenceGuide = read('BROWSER_EVIDENCE.md');
const ciBrowser = read('scripts/ci-browser.sh');
const ciNoBrowser = read('scripts/ci-no-browser.sh');

const sandbox = { window: {}, console };
sandbox.window.Jarbou3iResearchModules = {};
vm.createContext(sandbox);
vm.runInContext(read('src/research/hosted-demo-verification.js'), sandbox, { filename:'src/research/hosted-demo-verification.js' });
const hosted = sandbox.window.Jarbou3iResearchModules.hostedDemoVerification;

assert.equal(pkg.version, '1.0.8');
assert.equal(hosted.VERSION, '1.0.8');
assert.ok(index.includes('id="hostedDemoVerificationPanel"'), 'hosted demo panel missing');
assert.ok(index.includes('src="src/research/hosted-demo-verification.js" defer'), 'hosted demo module missing from index');
assert.ok(index.includes('v1.0.8 · Hosted Demo Deployment Verification + Browser Evidence Capture'), 'v1.0.8 badge missing');
assert.ok(engine.includes('hostedDemoReport()'), 'research packet must include hosted demo report');
assert.ok(engine.includes('browserEvidenceReport()'), 'research packet must include browser evidence report');
assert.ok(schema.required.includes('hosted_demo_verification'), 'schema must require hosted_demo_verification');
assert.ok(schema.required.includes('browser_evidence_capture'), 'schema must require browser_evidence_capture');
assert.equal(schema.properties.hosted_demo_verification.properties.hosted_demo_version.const, '1.0.8');
assert.equal(schema.properties.browser_evidence_capture.properties.browser_evidence_version.const, '1.0.8');

const report = hosted.buildHostedDemoVerification({}, { version:'1.0.8', now:'2026-04-30T00:00:00.000Z' });
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

const blocked = hosted.buildHostedDemoVerification({ mobile_evidence_captured:false }, { version:'1.0.8', now:'2026-04-30T00:00:00.000Z' });
assert.equal(blocked.release_gate, 'hosted_demo_blocked');
assert.equal(blocked.fail_count, 1);

const evidence = hosted.buildBrowserEvidence({}, { version:'1.0.8', now:'2026-04-30T00:00:00.000Z' });
assert.equal(evidence.release_gate, 'browser_evidence_capture_ready');
assert.equal(evidence.screenshots_attached_by_default, true);
assert.ok(evidence.artifacts.some((item) => item.artifact_id === 'desktop_first_screen'));
assert.ok(evidence.artifacts.some((item) => item.artifact_id === 'provider_mode'));

for (const packet of [fixture, migrationFixture, privacyFixture]) {
  assert.equal(packet.workflow_version, '1.0.8');
  assert.equal(packet.hosted_demo_verification.hosted_demo_version, '1.0.8');
  assert.equal(packet.hosted_demo_verification.release_gate, 'hosted_demo_verified');
  assert.equal(packet.hosted_demo_verification.runtime_capability_change, false);
  assert.equal(packet.hosted_demo_verification.browser_evidence_required, true);
  assert.equal(packet.browser_evidence_capture.browser_evidence_version, '1.0.8');
  assert.equal(packet.browser_evidence_capture.release_gate, 'browser_evidence_capture_ready');
  assert.equal(packet.browser_evidence_capture.screenshots_attached_by_default, true);
}

for (const corpus of [docs, guide, evidenceGuide]) {
  assert.ok(corpus.includes('Hosted Demo') || corpus.includes('hosted demo'), 'hosted demo docs missing');
  assert.ok(corpus.includes('browser evidence') || corpus.includes('Browser Evidence'), 'browser evidence docs missing');
}
assert.ok(pkg.scripts['test:hosted-demo'].includes('hosted-demo-deployment-check.mjs'));
assert.ok(pkg.scripts['test:browser:evidence'].includes('hosted-demo-browser-evidence.spec.mjs'));
assert.ok(pkg.scripts['test:v108:no-browser'].includes('v108-no-browser-suite.mjs'));
assert.ok(ciNoBrowser.includes('hosted-demo-deployment-check.mjs'));
assert.ok(ciBrowser.includes('test:browser:evidence'));

console.log('Hosted demo deployment verification checks passed.');
process.exit(0);
