import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const repoRoot = process.cwd();
const read = (file) => fs.readFileSync(path.join(repoRoot, file), 'utf8');
const json = (file) => JSON.parse(read(file));
const exists = (file) => fs.existsSync(path.join(repoRoot, file));

const VERSION = '1.1.0-alpha.3';
const BASE_VERSION = '1.0.30';
const TITLE = 'Repository Consolidation Audit + Retention Registry';
const RELEASE = `v${VERSION} — ${TITLE}`;
const ARTIFACT = 'jarbou3i-research-engine-v1.1.0-alpha.3-repository-consolidation-audit-retention-registry-patch.zip';

const pkg = json('package.json');
const lock = json('package-lock.json');
const styles = read('src/styles.css');
const index = read('index.html');
const migrations = read('src/research/migrations.js');
const schema = json('schema/research-workflow.schema.json');
const migrationFixture = json('fixtures/migrations/v1.1.0-alpha.3-packet.json');
const privacyFixture = json('fixtures/privacy/browser-generated-export-v1.1.0-alpha.3.json');
const ciNoBrowser = read('scripts/ci-no-browser.sh');
const releaseDoc = read('docs/v1.1.0-alpha.3-repository-consolidation-audit-retention-registry.md');

assert.equal(pkg.version, VERSION, 'package version must be v1.1.0-alpha.3');
assert.equal(lock.version, VERSION, 'package-lock root version must be v1.1.0-alpha.3');
assert.equal(lock.packages[''].version, VERSION, 'package-lock package version must be v1.1.0-alpha.3');
assert.ok(index.includes('v1.1.0-alpha.3 · Repository Consolidation Audit + Retention Registry'), 'index badge must expose v1.1.0-alpha.3 visual-freeze identity');

assert.ok(styles.includes('.brand > div:not(.logo)'), 'mobile overflow hardening must exclude the logo wrapper from full-width div rules');
assert.ok(!/\.brand\s*>\s*div\s*,/.test(styles), 'mobile hardening must not target every direct brand div; that stretches the logo wrapper');
assert.ok(styles.includes('.brand > .logo'), 'styles must include an explicit mobile logo geometry lock');
assert.ok(styles.includes('width:48px!important'), 'mobile logo must be locked to 48px width');
assert.ok(styles.includes('height:48px!important'), 'mobile logo must be locked to 48px height');
assert.ok(styles.includes('flex:0 0 48px!important'), 'mobile logo must not flex-stretch in the header');
assert.ok(styles.includes('.brand > .logo img'), 'logo image must have a dedicated mobile geometry rule');
assert.ok(styles.includes('object-fit:cover!important'), 'logo image must preserve square cover behavior');

for (const packet of [migrationFixture, privacyFixture]) {
  assert.equal(packet.workflow_version, VERSION, 'current v1.1.0-alpha.3 fixtures must identify the target release');
  assert.equal(packet.release_notes.release_title, RELEASE, 'release notes title must match v1.1.0-alpha.3 visual freeze');
  assert.equal(packet.release_apply_integrity.base_version, BASE_VERSION, 'release apply integrity must preserve v1.0.29 as baseline');
  assert.equal(packet.release_apply_integrity.artifact_name, ARTIFACT, 'release apply integrity artifact must match v1.1.0-alpha.3 patch ZIP');
  assert.equal(packet.release_apply_integrity.runtime_capability_change, false);
  assert.equal(packet.release_apply_integrity.provider_behavior_changed, false);
  assert.equal(packet.release_apply_integrity.oauth_behavior_changed, false);
  assert.equal(packet.release_apply_integrity.backend_behavior_changed, false);
  assert.equal(packet.release_apply_integrity.source_behavior_changed, false);
  assert.equal(packet.release_apply_integrity.storage_behavior_changed, false);
  assert.equal(packet.public_demo_release_lock.live_scraping_enabled, false);
  assert.equal(packet.public_demo_release_lock.real_oauth_enabled, false);
  assert.equal(packet.public_demo_release_lock.live_source_verification_enabled, false);
}

assert.equal(schema.properties.workflow_version.const, VERSION, 'schema workflow version must be v1.1.0-alpha.3');
assert.ok(migrations.includes("const TARGET_VERSION = '1.1.0-alpha.3'"), 'migration target must be v1.1.0-alpha.3');
assert.ok(migrations.includes("'1.0.28','1.0.29','1.0.30','1.1.0-alpha.1','1.1.0-alpha.2','1.1.0-alpha.3'"), 'migration order must preserve v1.0.30 freeze baseline and append v1.1.0-alpha.3');
assert.ok(exists('docs/v1.0.29-final-public-demo-hardening-release-freeze-audit.md'), 'v1.0.30 freeze baseline release doc must remain present');
assert.ok(exists('docs/v1.1.0-alpha.3-repository-consolidation-audit-retention-registry.md'), 'v1.1.0-alpha.3 release doc must exist');
assert.ok(releaseDoc.includes('Mobile Header Geometry Lock'), 'v1.1.0-alpha.3 release doc must state the visual-freeze scope');
assert.ok(releaseDoc.includes('No live scraping') || releaseDoc.includes('live scraping'), 'v1.1.0-alpha.3 release doc must preserve public-demo honesty boundaries');
assert.ok(ciNoBrowser.includes('tests/mobile-header-logo-geometry-check.mjs'), 'no-browser CI must run mobile header geometry guard');
assert.ok(ciNoBrowser.includes('run_node --check tests/mobile-header-logo-geometry-check.mjs'), 'no-browser syntax gate must cover mobile header geometry guard');
assert.ok(ciNoBrowser.includes('run_node --check tests/v130-no-browser-suite.mjs'), 'no-browser syntax gate must cover v130 wrapper');

for (const file of ['tests/mobile-header-logo-geometry-check.mjs','tests/v130-no-browser-suite.mjs']) {
  const syntax = spawnSync(process.execPath, ['--check', file], { encoding: 'utf8' });
  assert.equal(syntax.status, 0, syntax.stderr || syntax.stdout || `${file} syntax failed`);
}

console.log('Mobile header geometry lock checks passed.');
process.exit(0);
