import assert from 'node:assert/strict';
import fs from 'node:fs';

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
const migrationFixture = json('fixtures/migrations/v1.0.11-packet.json');
const privacyFixture = json('fixtures/privacy/browser-generated-export-v1.0.11.json');

assert.equal(pkg.version, '1.0.11');
assert.ok(pkg.description.includes('repository hygiene'));
assert.equal(schema.properties.workflow_version.const, '1.0.11');
assert.equal(sample.workflow_version, '1.0.11');
assert.equal(migrationFixture.workflow_version, '1.0.11');
assert.equal(privacyFixture.workflow_version, '1.0.11');
assert.equal(sample.release_notes.release_title, 'v1.0.11 — Repository Hygiene + Stale Artifact Cleanup');
assert.equal(migrationFixture.release_notes.release_title, 'v1.0.11 — Repository Hygiene + Stale Artifact Cleanup');
assert.equal(privacyFixture.release_notes.release_title, 'v1.0.11 — Repository Hygiene + Stale Artifact Cleanup');

for (const file of [
  'docs/v1.0.11-repository-hygiene-stale-artifact-cleanup.md',
  'fixtures/migrations/v1.0.4-packet.json',
  'fixtures/migrations/v1.0.11-packet.json',
  'fixtures/privacy/browser-generated-export-v1.0.11.json',
  'tests/repository-hygiene-cleanup-check.mjs',
  'tests/v111-no-browser-suite.mjs'
]) {
  assert.ok(fs.existsSync(file), `missing v1.0.11 cleanup artifact: ${file}`);
}

assert.equal(json('fixtures/migrations/v1.0.4-packet.json').workflow_version, '1.0.4');
assert.ok(migrationSource.includes("'1.0.4'"), 'v1.0.4 must remain a supported migration source');
assert.ok(migrationSource.includes("'1.0.11'"), 'v1.0.11 must remain a supported migration source');
assert.ok(migrationSource.includes("'1.0.11'"), 'v1.0.11 must be the current migration target/source');
assert.ok(migrationSource.includes("const TARGET_VERSION = '1.0.11'"));
assert.ok(migrationSource.includes("const MIGRATION_VERSION = '1.0.11'"));

for (const corpus of [manifest, changelog, readme, qaMatrix, roadmap]) {
  assert.ok(corpus.includes('v1.0.11'), 'release corpus missing v1.0.11');
  assert.ok(corpus.includes('Repository Hygiene + Stale Artifact Cleanup'), 'release corpus missing cleanup title');
}

assert.ok(hygieneCheck.includes('docs/v1.0.11-repository-hygiene-stale-artifact-cleanup.md'));
assert.ok(releasePackagingCheck.includes('docs/v1.0.11-repository-hygiene-stale-artifact-cleanup.md'));
assert.ok(ciNoBrowser.includes('tests/repository-hygiene-cleanup-check.mjs'));
assert.ok(ciNoBrowser.includes('tests/v111-no-browser-suite.mjs'));
assert.ok(pkg.scripts['test:repo:cleanup'].includes('repository-hygiene-cleanup-check.mjs'));
assert.ok(pkg.scripts['test:v111:no-browser'].includes('v111-no-browser-suite.mjs'));
assert.ok(pkg.scripts['test:stable'].includes('repository-hygiene-cleanup-check.mjs'));
assert.ok(pkg.scripts['test:patch'].includes('repository-hygiene-cleanup-check.mjs'));

const forbidden = [
  'docs/v1.0.5-browser-qa-visual-regression-hardening.md',
  'scripts/XXKuyryP',
  'src/XXSyA2D3',
  'src/XXvKXvVS',
  '.env',
  'backend/.dev.vars'
];
for (const file of forbidden) assert.equal(fs.existsSync(file), false, `stale or secret-bearing artifact must not exist: ${file}`);

const rootGenerated = fs.readdirSync('.').filter((name) => name.endsWith('.zip') || ['node_modules','playwright-report','test-results','coverage','dist','build'].includes(name));
assert.deepEqual(rootGenerated, [], `generated artifacts must stay outside committed repo: ${rootGenerated.join(', ')}`);

assert.equal(sample.provider_config.allow_live, false);
assert.equal(sample.provider_config.remember_key, false);
assert.equal(sample.privacy_export.key_exported, false);
assert.equal(sample.privacy_export.raw_token_exported, false);
assert.equal(sample.public_demo.runtime_capability_change, false);
assert.equal(sample.release_candidate.policy.breaking_changes_allowed, false);

console.log('Repository hygiene cleanup checks passed.');
process.exit(0);
