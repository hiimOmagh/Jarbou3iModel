import assert from 'node:assert/strict';
import fs from 'node:fs';
import { execSync } from 'node:child_process';
import { getMigrationFixture, getPrivacyFixture, fixturePathExists } from './fixture-registry-loader.mjs';
import { readReleaseDoc, releaseDocExists } from './release-docs-loader.mjs';

const read = (file) => fs.readFileSync(file, 'utf8');
const json = (file) => JSON.parse(read(file));

const pkg = json('package.json');
const manifest = read('RELEASE_MANIFEST.md');
const changelog = read('CHANGELOG.md');
const readme = read('README.md');
const qaMatrix = read('docs/qa-matrix.md');
const roadmap = read('docs/roadmap.md');
const migrationSource = read('src/research/migrations.js');
const hygieneCheck = read('tests/repo-file-hygiene-check.mjs');
const releasePackagingCheck = read('tests/release-packaging-cleanup-check.mjs');
const ciNoBrowser = read('scripts/ci-no-browser.sh');
const schema = json('schema/research-workflow.schema.json');
const sample = json('fixtures/research/sample-research-workflow-en.json');
const migrationFixture = getMigrationFixture('fixtures/migrations/v1.1.0-alpha.5-packet.json');
const privacyFixture = getPrivacyFixture('fixtures/privacy/browser-generated-export-v1.1.0-alpha.5.json');
const trackedPaths = (() => {
  try {
    return new Set(execSync('git ls-files', { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] })
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean));
  } catch (error) {
    return new Set();
  }
})();

assert.equal(pkg.version, '1.1.0-alpha.5');
assert.ok(pkg.description.includes('evidence scoring'));
assert.equal(schema.properties.workflow_version.const, '1.1.0-alpha.5');
assert.equal(sample.workflow_version, '1.1.0-alpha.5');
assert.equal(migrationFixture.workflow_version, '1.1.0-alpha.5');
assert.equal(privacyFixture.workflow_version, '1.1.0-alpha.5');
assert.equal(sample.release_notes.release_title, 'v1.1.0-alpha.5 — Version Suite Registry + Package Script Compression');
assert.equal(migrationFixture.release_notes.release_title, 'v1.1.0-alpha.5 — Version Suite Registry + Package Script Compression');
assert.equal(privacyFixture.release_notes.release_title, 'v1.1.0-alpha.5 — Version Suite Registry + Package Script Compression');

for (const file of [
  'docs/v1.0.11-repository-hygiene-stale-artifact-cleanup.md',
  'docs/v1.0.12-research-source-strategy-blueprint.md',
  'docs/v1.0.13-manual-source-packet-import.md',
  'docs/v1.0.19-source-packet-template-presets.md',
  'docs/v1.0.20-source-packet-template-browser-qa-copy-safety.md',
  'docs/v1.0.21-node-24-ci-compatibility.md',
  'docs/v1.0.25-public-demo-release-lock.md',
  'fixtures/migrations/v1.0.4-packet.json',
  'fixtures/migrations/v1.1.0-alpha.5-packet.json',
  'fixtures/privacy/browser-generated-export-v1.1.0-alpha.5.json',
  'tests/release-evidence-repo-hygiene-check.mjs',
  'tests/version-suite-registry-check.mjs',
  'tests/repository-hygiene-cleanup-check.mjs',
  'tests/version-suite-registry-check.mjs',
  'tests/version-suite-registry-check.mjs',
  'tests/version-suite-registry-check.mjs',
  'tests/version-suite-registry-check.mjs',
  'tests/version-suite-registry-check.mjs',
  'tests/version-suite-registry-check.mjs',
  'tests/source-packet-builder-browser-qa-check.mjs',
  'tests/source-packet-roundtrip-check.mjs',
  'tests/source-packet-template-presets-check.mjs',
  'tests/version-suite-registry-check.mjs',
  'tests/source-packet-template-browser.spec.mjs',
  'tests/source-packet-template-browser-qa-check.mjs',
  'tests/browser-visual-project-scope-check.mjs',
  'tests/release-evidence-repo-hygiene-check.mjs',
  'tests/version-suite-registry-check.mjs'
]) {
  assert.ok(fixturePathExists(file) || releaseDocExists(file), `missing v1.1.0-alpha.5 cleanup artifact: ${file}`);
}

assert.equal(getMigrationFixture('fixtures/migrations/v1.0.4-packet.json').workflow_version, '1.0.4');
assert.ok(migrationSource.includes("'1.0.4'"), 'v1.0.4 must remain a supported migration source');
assert.ok(migrationSource.includes("'1.1.0-alpha.5'"), 'v1.1.0-alpha.5 must remain a supported migration source');
assert.ok(migrationSource.includes("'1.0.19','1.0.20','1.0.21','1.0.22','1.0.23','1.0.24','1.0.25','1.0.26','1.0.27','1.0.28','1.0.29','1.0.30','1.1.0-alpha.1','1.1.0-alpha.2','1.1.0-alpha.3','1.1.0-alpha.5'"), 'v1.0.19 must migrate into v1.1.0-alpha.5');
assert.ok(migrationSource.includes("const TARGET_VERSION = '1.1.0-alpha.5'"));
assert.ok(migrationSource.includes("const MIGRATION_VERSION = '1.1.0-alpha.5'"));

for (const corpus of [manifest, changelog, readme, qaMatrix, roadmap]) {
  assert.ok(corpus.includes('v1.1.0-alpha.5'), 'release corpus missing v1.1.0-alpha.5');
  assert.ok(corpus.includes('Version Suite Registry + Package Script Compression'), 'release corpus missing v1.1.0-alpha.5 release title');
}

assert.ok(hygieneCheck.includes('docs/v1.0.11-repository-hygiene-stale-artifact-cleanup.md'));
assert.ok(hygieneCheck.includes('docs/v1.0.13-manual-source-packet-import.md'));
assert.ok(hygieneCheck.includes('docs/v1.0.19-source-packet-template-presets.md'));
assert.ok(hygieneCheck.includes('docs/v1.0.20-source-packet-template-browser-qa-copy-safety.md'));
assert.ok(releasePackagingCheck.includes('docs/v1.0.11-repository-hygiene-stale-artifact-cleanup.md'));
assert.ok(releasePackagingCheck.includes('docs/v1.0.13-manual-source-packet-import.md'));
assert.ok(releasePackagingCheck.includes('docs/v1.0.19-source-packet-template-presets.md'));
assert.ok(releasePackagingCheck.includes('docs/v1.0.20-source-packet-template-browser-qa-copy-safety.md'));
assert.ok(ciNoBrowser.includes('tests/repository-hygiene-cleanup-check.mjs'));
for (const ciToken of [
  'tests/version-suite-registry-check.mjs',
  'tests/version-suite-registry-check.mjs',
  'tests/version-suite-registry-check.mjs',
  'tests/version-suite-registry-check.mjs',
  'tests/version-suite-registry-check.mjs',
  'tests/version-suite-registry-check.mjs',
  'tests/source-packet-builder-browser-qa-check.mjs',
  'tests/source-packet-roundtrip-check.mjs',
  'tests/source-packet-template-presets-check.mjs',
  'tests/version-suite-registry-check.mjs',
  'tests/source-packet-template-browser.spec.mjs',
  'tests/source-packet-template-browser-qa-check.mjs',
  'tests/browser-visual-project-scope-check.mjs',
  'tests/release-evidence-repo-hygiene-check.mjs',
  'tests/version-suite-registry-check.mjs'
]) {
  assert.ok(ciNoBrowser.includes(ciToken), `CI no-browser missing ${ciToken}`);
}
assert.ok(pkg.scripts['test:repo:cleanup'].includes('repository-hygiene-cleanup-check.mjs'));
assert.ok(pkg.scripts['test:version-registry']?.includes('version-suite-registry-check.mjs'));
assert.ok(pkg.scripts['test:version-registry']?.includes('version-suite-registry-check.mjs'));
assert.ok(pkg.scripts['test:version-registry']?.includes('version-suite-registry-check.mjs'));
assert.ok(pkg.scripts['test:version-registry']?.includes('version-suite-registry-check.mjs'));
assert.ok(pkg.scripts['test:version-registry']?.includes('version-suite-registry-check.mjs'));
assert.ok(pkg.scripts['test:version-registry']?.includes('version-suite-registry-check.mjs'));
assert.ok(pkg.scripts['test:source:packet-roundtrip'].includes('source-packet-roundtrip-check.mjs'));
assert.ok(pkg.scripts['test:source:packet-builder:browser-qa'].includes('source-packet-builder-browser-qa-check.mjs'));
assert.ok(pkg.scripts['test:source:capabilities'].includes('source-capability-registry-check.mjs'));
assert.ok(pkg.scripts['test:evidence:scoring'].includes('evidence-scoring-check.mjs'));
assert.ok(pkg.scripts['test:stable'].includes('repository-hygiene-cleanup-check.mjs'));
assert.ok(pkg.scripts['test:patch'].includes('repository-hygiene-cleanup-check.mjs'));
assert.ok(pkg.scripts['test:release:evidence'].includes('release-evidence-repo-hygiene-check.mjs'));
assert.ok(pkg.scripts['test:version-registry']?.includes('version-suite-registry-check.mjs'));

const forbidden = [
  'docs/v1.0.5-browser-qa-visual-regression-hardening.md',
  'scripts/XXKuyryP',
  'src/XXSyA2D3',
  'src/XXvKXvVS',
  '.env',
  'backend/.dev.vars'
];
for (const file of forbidden) assert.equal(fixturePathExists(file), false, `stale or secret-bearing artifact must not exist: ${file}`);

const rootGenerated = fs.readdirSync('.').filter((name) => name.endsWith('.zip') || ['playwright-report','test-results','coverage','dist','build'].includes(name));
assert.deepEqual(rootGenerated, [], `generated artifacts must stay outside committed repo: ${rootGenerated.join(', ')}`);
assert.equal([...trackedPaths].some((file) => file === 'node_modules' || file.startsWith('node_modules/')), false, 'node_modules must not be committed');

assert.equal(sample.provider_config.allow_live, false);
assert.equal(sample.provider_config.remember_key, false);
assert.equal(sample.privacy_export.key_exported, false);
assert.equal(sample.privacy_export.raw_token_exported, false);
assert.equal(sample.public_demo.runtime_capability_change, false);
assert.equal(sample.release_candidate.policy.breaking_changes_allowed, false);

console.log('Repository hygiene cleanup checks passed.');
process.exit(0);
