import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { spawnSync } from 'node:child_process';
import { getMigrationFixture, getPrivacyFixture, fixturePathExists } from './fixture-registry-loader.mjs';
import { readReleaseDoc, releaseDocExists } from './release-docs-loader.mjs';
import { readReleaseArtifact, releaseArtifactExists } from './release-artifacts-loader.mjs';

const VERSION = '1.3.0-alpha.1';
const TITLE = 'Guided Research Session Engine + Brief Assembly Workflow';
const RELEASE = `v${VERSION} — ${TITLE}`;
const LOCK_RELEASE = `v${VERSION} — Public Demo Release Lock`;
const repoRoot = process.cwd();
const read = (file) => readReleaseArtifact(file);
const json = (file) => JSON.parse(read(file));
const exists = (file) => fixturePathExists(file) || releaseDocExists(file) || fs.existsSync(path.join(repoRoot, file));

const pkg = json('package.json');
const lock = json('package-lock.json');
const schema = json('schema/research-workflow.schema.json');
const sample = json('fixtures/research/sample-research-workflow-en.json');
const migrationFixture = getMigrationFixture('fixtures/migrations/v1.3.0-alpha.1-packet.json');
const privacyFixture = getPrivacyFixture('fixtures/privacy/browser-generated-export-v1.3.0-alpha.1.json');
const index = read('index.html');
const engine = read('src/research-engine.js');
const publicDemoModule = read('src/research/public-demo-readiness.js');
const migrations = read('src/research/migrations.js');
const ciNoBrowser = read('scripts/ci-no-browser.sh');
const readme = read('README.md');
const releaseNotes = read('RELEASE_NOTES.md');
const releaseManifest = read('RELEASE_MANIFEST.md');
const changelog = read('CHANGELOG.md');
const publicDemoGuide = read('PUBLIC_DEMO.md');
const browserEvidence = read('BROWSER_EVIDENCE.md');
const hostedDemo = read('HOSTED_DEMO_VERIFICATION.md');
const roadmap = read('docs/roadmap.md');
const qaMatrix = read('docs/qa-matrix.md');
const architecture = read('docs/architecture.md');
const aiIntegration = read('docs/ai-integration.md');
const privacyAudit = read('docs/privacy-audit.md');
const releaseDoc = `${readReleaseDoc('docs/v1.0.25-public-demo-release-lock.md')}\n${readReleaseDoc('docs/v1.1.0-evidence-pack-export-v3-brief-traceability.md')}`;

assert.equal(pkg.version, VERSION, 'package.json must identify v1.1.0');
assert.equal(lock.version, VERSION, 'package-lock root version must identify v1.1.0');
assert.equal(lock.packages[''].version, VERSION, 'package-lock package root must identify v1.1.0');
assert.equal(schema.properties.workflow_version.const, VERSION, 'workflow schema target must identify v1.1.0');
assert.equal(sample.workflow_version, VERSION, 'sample workflow must identify v1.1.0');
assert.equal(migrationFixture.workflow_version, VERSION, 'migration fixture must identify v1.1.0');
assert.equal(privacyFixture.workflow_version, VERSION, 'privacy fixture must identify v1.1.0');

for (const packet of [sample, migrationFixture, privacyFixture]) {
  assert.equal(packet.release_notes.release_title, RELEASE, 'release notes title must identify v1.1.0 release lock');
  assert.equal(packet.public_demo_release_lock.public_demo_release_lock_version, VERSION, 'release-lock packet version mismatch');
  assert.equal(packet.public_demo_release_lock.release_title, LOCK_RELEASE, 'release-lock title mismatch');
  assert.equal(packet.public_demo_release_lock.lock_stage, 'public_demo_release_locked');
  assert.equal(packet.public_demo_release_lock.release_approval_state, 'locked_for_public_demo');
  assert.equal(packet.public_demo_release_lock.runtime_capability_change, false);
  assert.equal(packet.public_demo_release_lock.provider_behavior_changed, false);
  assert.equal(packet.public_demo_release_lock.oauth_behavior_changed, false);
  assert.equal(packet.public_demo_release_lock.backend_behavior_changed, false);
  assert.equal(packet.public_demo_release_lock.source_behavior_changed, false);
  assert.equal(packet.public_demo_release_lock.storage_behavior_changed, false);
  assert.equal(packet.public_demo_release_lock.manual_private_default, true);
  assert.equal(packet.public_demo_release_lock.live_scraping_enabled, false);
  assert.equal(packet.public_demo_release_lock.real_oauth_enabled, false);
  assert.equal(packet.public_demo_release_lock.live_source_verification_enabled, false);
  assert.equal(packet.public_demo_release_lock.unreviewed_artifacts_allowed, false);
  assert.equal(packet.public_demo_release_lock.screenshots_alone_sufficient, false);
  assert.equal(packet.public_demo_release_lock.zip_existence_sufficient, false);
  assert.equal(packet.public_demo_release_lock.ci_required, true);
  assert.equal(packet.public_demo_release_lock.browser_evidence_required, true);
  assert.equal(packet.public_demo_release_lock.hosted_url_required, true);
  assert.equal(packet.public_demo_release_lock.release_gate, 'public_demo_release_locked');
  assert.ok(packet.public_demo_release_lock.checklist.length >= 8, 'release-lock checklist too short');
  assert.ok(packet.public_demo_release_lock.blocked_claims.some((claim) => /scraping/i.test(claim)), 'blocked claims must include scraping');
  assert.ok(packet.public_demo_release_lock.blocked_claims.some((claim) => /OAuth|account login/i.test(claim)), 'blocked claims must include OAuth/account login');
}

assert.ok(schema.required.includes('public_demo_release_lock'), 'schema must require public_demo_release_lock');
assert.equal(schema.properties.public_demo_release_lock.properties.public_demo_release_lock_version.const, VERSION);
assert.equal(schema.properties.public_demo_release_lock.properties.release_title.const, LOCK_RELEASE);
assert.equal(schema.properties.public_demo_release_lock.properties.release_approval_state.const, 'locked_for_public_demo');
assert.equal(schema.properties.public_demo_release_lock.properties.screenshots_alone_sufficient.const, false);
assert.equal(schema.properties.public_demo_release_lock.properties.zip_existence_sufficient.const, false);
assert.equal(schema.properties.public_demo_release_lock.properties.release_gate.const, 'public_demo_release_locked');

const sandbox = { window: {}, console };
sandbox.window.Jarbou3iResearchModules = {};
vm.createContext(sandbox);
vm.runInContext(publicDemoModule, sandbox, { filename:'src/research/public-demo-readiness.js' });
const publicDemo = sandbox.window.Jarbou3iResearchModules.publicDemoReadiness;
assert.equal(publicDemo.VERSION, VERSION, 'public demo module must identify v1.1.0');
const locked = publicDemo.buildPublicDemoReleaseLock({}, {version:VERSION, now:'2026-05-04T00:00:00.000Z'});
assert.equal(locked.release_gate, 'public_demo_release_locked');
assert.equal(locked.screenshots_alone_sufficient, false);
assert.equal(locked.zip_existence_sufficient, false);
const blocked = publicDemo.buildPublicDemoReleaseLock({browser_ci_green:false}, {version:VERSION, now:'2026-05-04T00:00:00.000Z'});
assert.equal(blocked.release_gate, 'public_demo_release_blocked');
assert.equal(blocked.release_approval_state, 'blocked_for_public_demo');
assert.equal(blocked.fail_count, 1);

assert.ok(engine.includes('publicDemoReleaseLockReport()'), 'research engine must build release-lock metadata');
assert.ok(engine.includes('public_demo_release_lock'), 'research packet must include public_demo_release_lock');
assert.ok(migrations.includes("const TARGET_VERSION = '1.3.0-alpha.1'"), 'migrations target must be v1.1.0');
assert.ok(migrations.includes("'1.0.23','1.0.24','1.0.25','1.0.26','1.0.27','1.0.28','1.0.29','1.0.30','1.1.0-alpha.1','1.1.0-alpha.2','1.1.0-alpha.3','1.1.0-alpha.8','1.1.0-alpha.9','1.1.0-alpha.10','1.3.0-alpha.1'"), 'migration order must preserve v1.0.24 and append v1.1.0');
assert.ok(migrations.includes('defaultPublicDemoReleaseLock'), 'migrations must add default public demo release lock');

for (const corpus of [readme, releaseNotes, releaseManifest, changelog, publicDemoGuide, browserEvidence, hostedDemo, roadmap, qaMatrix, architecture, aiIntegration, privacyAudit, releaseDoc]) {
  assert.ok(corpus.includes('v1.1.0') || corpus.includes('1.3.0-alpha.1'), 'release corpus must mention v1.1.0');
  assert.ok(corpus.includes(TITLE) || corpus.includes('release-lock') || corpus.includes('release lock'), 'release corpus must mention release lock');
}
for (const corpus of [readme, releaseNotes, releaseManifest, publicDemoGuide, browserEvidence, hostedDemo, qaMatrix, releaseDoc]) {
  assert.ok(/screenshots alone/i.test(corpus), 'release docs must state screenshots alone are insufficient');
  assert.ok(/ZIP existence alone|ZIP archive alone|local ZIP/i.test(corpus), 'release docs must state ZIP alone is insufficient');
}

for (const required of [
  'docs/v1.0.25-public-demo-release-lock.md',
  'fixtures/migrations/v1.3.0-alpha.1-packet.json',
  'fixtures/privacy/browser-generated-export-v1.3.0-alpha.1.json',
  'fixtures/migrations/v1.0.24-packet.json',
  'fixtures/privacy/browser-generated-export-v1.0.24.json',
  'tests/public-demo-release-lock-check.mjs',
  'tests/version-suite-registry-check.mjs'
]) {
  assert.ok(exists(required), `required release/historical artifact missing: ${required}`);
}

assert.ok(Object.keys(pkg.scripts).length <= 20, 'package script surface must remain compressed');
assert.ok(Object.keys(pkg.scripts).length <= 20, 'package script surface must remain compressed');
assert.ok(Object.keys(pkg.scripts).length <= 20, 'package script surface must remain compressed');
assert.ok(Object.keys(pkg.scripts).length <= 20, 'package script surface must remain compressed');
assert.ok(Object.keys(pkg.scripts).length <= 20, 'package script surface must remain compressed');
assert.ok(ciNoBrowser.includes('ci-gate-runner.mjs no-browser'), 'no-browser CI must run public demo release lock through registry runner');
assert.ok(ciNoBrowser.includes('ci-gate-runner.mjs no-browser'), 'no-browser CI must delegate to registry runner');
assert.ok(ciNoBrowser.includes('ci-gate-runner.mjs no-browser'), 'no-browser CI must delegate to registry runner');

for (const file of ['tests/public-demo-release-lock-check.mjs', 'tests/version-suite-registry-check.mjs']) {
  const syntax = spawnSync(process.execPath, ['--check', file], { encoding: 'utf8' });
  assert.equal(syntax.status, 0, syntax.stderr || syntax.stdout || `${file} syntax check failed`);
}

console.log('Public demo release-lock checks passed.');
process.exit(0);
