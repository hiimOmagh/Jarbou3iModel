import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import { spawnSync } from 'node:child_process';
import { getMigrationFixture, getPrivacyFixture, fixturePathExists } from './fixture-registry-loader.mjs';
import { readReleaseDoc, releaseDocExists } from './release-docs-loader.mjs';
import { readReleaseArtifact, releaseArtifactExists } from './release-artifacts-loader.mjs';

const CURRENT_VERSION = '1.4.0-alpha.37';
const CURRENT_TITLE = 'Adapter Replay Review Pack Compact Navigation UX';
const VERSION = '1.3.0';
const TITLE = 'Stable Manual Workflow Release';
const RELEASE = `v${VERSION} — ${TITLE}`;
const ARTIFACT = 'jarbou3i-research-engine-v1.3.0-manual-workflow-release.zip';
const read = (file) => readReleaseArtifact(file);
const json = (file) => JSON.parse(read(file));
const exists = (file) => fixturePathExists(file) || releaseDocExists(file);

const pkg = json('package.json');
const lock = json('package-lock.json');
const schema = json('schema/research-workflow.schema.json');
const sample = json('fixtures/research/sample-research-workflow-en.json');
const migrationFixture = getMigrationFixture('fixtures/migrations/v1.3.0-packet.json');
const privacyFixture = getPrivacyFixture('fixtures/privacy/browser-generated-export-v1.3.0.json');
const spec = read('tests/hosted-demo-browser-evidence.spec.mjs');
const ciBrowser = read('scripts/ci-browser.sh');
const ciNoBrowser = read('scripts/ci-no-browser.sh');
const workflow = read('.github/workflows/ci.yml');
const hostedModule = read('src/research/hosted-demo-verification.js');
const migrations = read('src/research/migrations.js');

assert.equal(pkg.version, CURRENT_VERSION);
assert.equal(lock.version, CURRENT_VERSION);
assert.equal(lock.packages[''].version, CURRENT_VERSION);
assert.equal(schema.properties.workflow_version.const, VERSION);
assert.equal(sample.workflow_version, VERSION);
assert.equal(migrationFixture.workflow_version, VERSION);
assert.equal(privacyFixture.workflow_version, VERSION);
assert.equal(sample.release_notes.release_title, RELEASE);
assert.equal(migrationFixture.release_notes.release_title, RELEASE);
assert.equal(privacyFixture.release_notes.release_title, RELEASE);
assert.equal(sample.release_apply_integrity.base_version, '1.0.30');
assert.equal(sample.release_apply_integrity.artifact_name, ARTIFACT);
assert.equal(sample.release_provenance_ledger.base_version, '1.0.30');
assert.equal(sample.release_provenance_ledger.artifact_name, ARTIFACT);

for (const packet of [sample, migrationFixture, privacyFixture]) {
  assert.equal(packet.browser_evidence_capture.browser_evidence_version, VERSION);
  assert.equal(packet.hosted_demo_evidence_review.evidence_review_version, VERSION);
  assert.equal(packet.hosted_demo_evidence_review.metadata_snapshot_required, true);
  assert.equal(packet.hosted_demo_evidence_review.metadata_manifest_required, true);
  assert.deepEqual(packet.browser_evidence_capture.expected_capture_names, ['desktop-first-screen','mobile-first-screen','provider-mode','quality-export']);
  assert.equal(packet.browser_evidence_capture.capture_manifest_required, true);
  assert.equal(packet.browser_evidence_capture.viewport_dimensions_required, true);
  assert.equal(packet.browser_evidence_capture.screenshot_dimensions_required, true);
}

for (const required of [
  'const VERSION = RELEASE_COPY_CONTRACT.version',
  'EXPECTED_CAPTURE_NAMES',
  'single_final_metadata_with_all_required_captures',
  'all_required_captures_present',
  'screenshot_sanity',
  'pngDimensions',
  'image_width',
  'viewport_width',
  'horizontal_overflow_px',
  'capture_count',
  "captures.push(await capture(page, 'desktop-first-screen'))",
  "captures.push(await capture(page, 'mobile-first-screen'))",
  "captures.push(await capture(page, 'provider-mode'))",
  "captures.push(await capture(page, 'quality-export'))"
]) {
  assert.ok(spec.includes(required), `browser evidence spec missing ${required}`);
}

assert.equal((spec.match(/const metadata = await writeMetadata\(page, captures/g) || []).length, 1, 'metadata must be written exactly once from the final complete capture list');
assert.equal(spec.includes("writeMetadata(page, [captureResult])"), false, 'metadata must not be overwritten by one-capture tests');
assert.ok(ciBrowser.includes('ci-gate-runner.mjs browser'), 'browser CI must preserve hosted-demo evidence through registry runner');
assert.ok(ciBrowser.includes('HOSTED_DEMO_EVIDENCE_DIR'), 'browser CI must preserve evidence artifact directory');
assert.ok(ciNoBrowser.includes('ci-gate-runner.mjs no-browser'), 'no-browser CI must include evidence manifest through registry runner');
assert.ok(ciNoBrowser.includes('ci-gate-runner.mjs no-browser'), 'no-browser CI must delegate to registry runner');
assert.ok(workflow.includes('path: ${{ runner.temp }}/hosted-demo-evidence'), 'workflow must upload hosted-demo evidence artifact directory');

const sandbox = { window: {}, console };
sandbox.window.Jarbou3iResearchModules = {};
vm.createContext(sandbox);
vm.runInContext(hostedModule, sandbox, { filename:'src/research/hosted-demo-verification.js' });
const hosted = sandbox.window.Jarbou3iResearchModules.hostedDemoVerification;
assert.equal(hosted.VERSION, VERSION);
const evidence = hosted.buildBrowserEvidence({}, { version:VERSION, now:'2026-05-04T00:00:00.000Z' });
assert.equal(evidence.capture_manifest_required, true);
assert.equal(evidence.viewport_dimensions_required, true);
assert.equal(evidence.screenshot_dimensions_required, true);
assert.equal(JSON.stringify(evidence.expected_capture_names), JSON.stringify(['desktop-first-screen','mobile-first-screen','provider-mode','quality-export']));
const review = hosted.buildHostedDemoEvidenceReview({}, { version:VERSION, now:'2026-05-04T00:00:00.000Z' });
assert.equal(review.metadata_manifest_required, true);
assert.ok(review.review_items.some((item) => item.artifact_id === 'complete_capture_manifest'));

assert.ok(migrations.includes("const TARGET_VERSION = '1.3.0'"));
assert.ok(migrations.includes("'1.0.26','1.0.27','1.0.28','1.0.29','1.0.30','1.1.0-alpha.1','1.1.0-alpha.2','1.1.0-alpha.3','1.1.0-alpha.8','1.1.0-alpha.9','1.1.0-alpha.10','1.3.0'"), 'migration order must preserve v1.0.28 and append v1.1.0');
assert.ok(migrations.includes('metadata_manifest_required:true'), 'migration defaults must include evidence manifest metadata requirement');

for (const file of [
  'docs/v1.0.27-release-provenance-ledger-gate.md',
  'docs/v1.0.28-hosted-demo-evidence-manifest-gate.md',
  'docs/v1.1.0-evidence-pack-export-v3-brief-traceability.md',
  'fixtures/migrations/v1.0.28-packet.json',
  'fixtures/migrations/v1.3.0-packet.json',
  'fixtures/privacy/browser-generated-export-v1.0.28.json',
  'fixtures/privacy/browser-generated-export-v1.3.0.json',
  'tests/hosted-demo-evidence-manifest-check.mjs',
  'tests/version-suite-registry-check.mjs'
]) assert.ok(exists(file), `missing ${file}`);

for (const corpus of [
  read('README.md'),
  read('RELEASE_NOTES.md'),
  read('RELEASE_MANIFEST.md'),
  read('CHANGELOG.md'),
  read('BROWSER_EVIDENCE.md'),
  read('HOSTED_DEMO_VERIFICATION.md'),
  read('docs/roadmap.md'),
  read('docs/qa-matrix.md'),
  read('docs/architecture.md'),
  read('docs/ai-integration.md'),
  read('docs/privacy-audit.md'),
  readReleaseDoc('docs/v1.1.0-evidence-pack-export-v3-brief-traceability.md')
]) {
  assert.ok(corpus.includes('v1.1.0') || corpus.includes('1.3.0'), 'release corpus must mention v1.1.0');
  assert.ok(/Package Script|CI Gate Registry|Root Manifest|Release Artifact Consolidation|Migration \+ Privacy Fixture Registry Consolidation|Fixture Registry|payload compression|test organization|planning gate|evidence manifest|single final metadata|capture manifest|visual freeze|mobile header/i.test(corpus), 'release corpus must describe evidence manifest gate');
}

for (const file of ['tests/hosted-demo-browser-evidence.spec.mjs', 'tests/hosted-demo-evidence-manifest-check.mjs', 'tests/version-suite-registry-check.mjs', 'src/research/hosted-demo-verification.js']) {
  const syntax = spawnSync(process.execPath, ['--check', file], { encoding:'utf8' });
  assert.equal(syntax.status, 0, syntax.stderr || syntax.stdout || `${file} syntax check failed`);
}

console.log('Hosted demo evidence manifest checks passed.');
process.exit(0);
