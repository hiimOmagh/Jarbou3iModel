import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { getMigrationFixture, getPrivacyFixture, registryHasMigrationFixture, registryHasPrivacyFixture, fixturePathExists } from './fixture-registry-loader.mjs';
import { readReleaseDoc, releaseDocExists } from './release-docs-loader.mjs';

const repoRoot = process.cwd();
const read = (file) => fs.readFileSync(path.join(repoRoot, file), 'utf8');
const json = (file) => JSON.parse(read(file));
const exists = (file) => fixturePathExists(file) || fs.existsSync(path.join(repoRoot, file));
const walk = (dir) => {
  const out = [];
  for (const name of fs.readdirSync(path.join(repoRoot, dir))) {
    const rel = path.join(dir, name).replace(/\\/g, '/');
    const abs = path.join(repoRoot, rel);
    const stat = fs.statSync(abs);
    if (stat.isDirectory()) out.push(...walk(rel));
    else out.push(rel);
  }
  return out;
};

const VERSION = '1.1.0';
const PREVIOUS_VERSION = '1.1.0-alpha.3';
const FREEZE_BASELINE = '1.0.30';
const TITLE = 'Public Demo Stable';
const DOC = 'docs/v1.1.0-evidence-pack-export-v3-brief-traceability.md';
const ARTIFACT = 'jarbou3i-research-engine-v1.1.0-evidence-pack-export-v3-brief-traceability-patch.zip';

const pkg = json('package.json');
const lock = json('package-lock.json');
const schema = json('schema/research-workflow.schema.json');
const index = read('index.html');
const auditSource = read('src/research/repository-consolidation-audit.js');
const releaseDoc = readReleaseDoc(DOC);
const migrationFixture = getMigrationFixture('fixtures/migrations/v1.1.0-packet.json');
const privacyFixture = getPrivacyFixture('fixtures/privacy/browser-generated-export-v1.1.0.json');

assert.equal(pkg.version, VERSION);
assert.equal(lock.version, VERSION);
assert.equal(lock.packages[''].version, VERSION);
assert.ok(pkg.description.includes('fixture registry payload compression'));
assert.ok(pkg.description.includes('test organization audit'));
assert.ok(pkg.description.includes('runtime/provider/OAuth/backend/source/storage boundaries remain unchanged'));
assert.equal(schema.properties.workflow_version.const, VERSION);
assert.ok(index.includes(`v${VERSION} · ${TITLE}`), 'index badge must expose alpha.4 fixture registry consolidation identity');
assert.ok((index.includes('hosted evidence capture polish') || index.includes('حارس الشوائب البصرية')) && (index.includes('visual artifact guard') || index.includes('أدلة الاستضافة')), 'index must communicate alpha.10 hosted evidence polish scope in the active shell language');
assert.ok(index.includes('without changing runtime behavior') || index.includes('دون تغيير سلوك التشغيل'), 'index must preserve runtime boundary in the active shell language');
assert.ok(auditSource.includes("const VERSION = '1.1.0'"));
assert.ok(auditSource.includes("const PREVIOUS_VERSION = '1.1.0-alpha.3'"));

await import(`file://${path.join(repoRoot, 'src/research/repository-consolidation-audit.js')}`);
const auditApi = globalThis.Jarbou3iResearchModules.repositoryConsolidationAudit;
assert.equal(auditApi.VERSION, VERSION);
assert.equal(auditApi.PREVIOUS_VERSION, PREVIOUS_VERSION);
assert.equal(auditApi.FREEZE_BASELINE, FREEZE_BASELINE);

assert.equal(fs.readdirSync('fixtures/migrations').filter((name) => /^v.+-packet\.json$/.test(name)).length, 0, 'migration packet files must be consolidated');
assert.equal(fs.readdirSync('fixtures/privacy').filter((name) => /^browser-generated-export-.+\.json$/.test(name)).length, 0, 'privacy export files must be consolidated');
assert.ok(exists('fixtures/migrations/migration-registry.json'));
assert.ok(exists('fixtures/privacy/privacy-export-registry.json'));
assert.equal(exists('assets/jarbou3i-mascot.png'), false, 'unused oversized mascot source asset must be deleted');

const files = [
  'src/research-engine.js',
  'backend/cloudflare-worker.js',
  'index.html',
  'styles.css',
  'tests/privacy-export-check.mjs',
  'tests/provider-mode-browser.spec.mjs',
  'tests/version-suite-registry.json',
  'fixtures/migrations/migration-registry.json',
  'fixtures/privacy/privacy-export-registry.json',
  DOC,
  'ci-artifacts/hosted-demo-evidence/desktop-first-screen.png',
  'jarbou3i-research-engine-v1.0.30-full-source.zip'
];
const audit = auditApi.buildRepositoryConsolidationAudit(files, {now:'2026-05-05T00:00:00.000Z'});
assert.equal(audit.repository_consolidation_audit_version, VERSION);
assert.equal(audit.previous_version, PREVIOUS_VERSION);
assert.equal(audit.freeze_baseline_version, FREEZE_BASELINE);
assert.equal(audit.stage, 'version_suite_registry_consolidation');
assert.equal(audit.audit_only, false);
assert.equal(audit.implementation_allowed, true);
assert.equal(audit.runtime_capability_change, false);
assert.equal(audit.provider_behavior_changed, false);
assert.equal(audit.oauth_behavior_changed, false);
assert.equal(audit.backend_behavior_changed, false);
assert.equal(audit.source_behavior_changed, false);
assert.equal(audit.storage_behavior_changed, false);
assert.equal(audit.release_gate, 'version_suite_registry_consolidated');
assert.ok(audit.completed_actions.some(action => action.includes('version-suite-registry.json')));
assert.ok(audit.completed_actions.some(action => action.includes('package.json')));
assert.ok(audit.completed_actions.some(action => action.includes('current-no-browser-suite')));

for (const packet of [migrationFixture, privacyFixture]) {
  assert.equal(packet.workflow_version, VERSION);
  assert.equal(packet.release_notes.release_title, `v${VERSION} — ${TITLE}`);
  assert.equal(packet.release_apply_integrity.base_version, FREEZE_BASELINE);
  assert.equal(packet.release_apply_integrity.target_version, VERSION);
  assert.equal(packet.release_apply_integrity.artifact_name, ARTIFACT);
  assert.equal(packet.release_apply_integrity.runtime_capability_change, false);
  assert.equal(packet.release_apply_integrity.provider_behavior_changed, false);
  assert.equal(packet.release_apply_integrity.oauth_behavior_changed, false);
  assert.equal(packet.release_apply_integrity.backend_behavior_changed, false);
  assert.equal(packet.release_apply_integrity.source_behavior_changed, false);
  assert.equal(packet.release_apply_integrity.storage_behavior_changed, false);
}

assert.ok(registryHasMigrationFixture('fixtures/migrations/v1.1.0-alpha.3-packet.json'), 'alpha.3 migration fixture must remain in registry');
assert.ok(registryHasMigrationFixture('fixtures/migrations/v1.1.0-packet.json'), 'alpha.11 migration fixture must exist in registry');
assert.ok(registryHasPrivacyFixture('fixtures/privacy/browser-generated-export-v1.1.0-alpha.3.json'), 'alpha.3 privacy fixture must remain in registry');
assert.ok(registryHasPrivacyFixture('fixtures/privacy/browser-generated-export-v1.1.0.json'), 'alpha.11 privacy fixture must exist in registry');
assert.ok(releaseDocExists(DOC), 'alpha.11 release doc must exist');
assert.ok(releaseDoc.includes('docs/technical-debt-ledger.md'));
assert.ok(releaseDoc.includes('docs/source-refactor-readiness-audit.md'));
assert.ok(releaseDoc.includes('tests/language-description-audit-check.mjs'));
assert.ok(releaseDoc.includes('No source-file refactor yet'));
assert.ok(releaseDoc.includes('No runtime behavior change'));
assert.ok(releaseDoc.includes('No fixture semantic thinning'));
assert.ok(releaseDoc.includes('v1.1.0'));

for (const file of ['src/research/repository-consolidation-audit.js','tests/fixture-registry-loader.mjs','tests/fixture-registry-consolidation-check.mjs','tests/fixture-payload-budget-check.mjs','tests/test-organization-audit-check.mjs','tests/repository-consolidation-audit-check.mjs','tests/version-suite-registry-check.mjs']) {
  const syntax = spawnSync(process.execPath, ['--check', file], { encoding: 'utf8' });
  assert.equal(syntax.status, 0, syntax.stderr || syntax.stdout || `${file} syntax failed`);
}

console.log('Repository consolidation audit and fixture registry checks passed.');
process.exit(0);
