import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const read = (file) => fs.readFileSync(file, 'utf8');
const moduleText = read('src/research/migrations.js');
const index = read('index.html');
const engine = read('src/research-engine.js');
const schema = JSON.parse(read('schema/research-workflow.schema.json'));

new vm.Script(moduleText, { filename: 'src/research/migrations.js' });
const context = { console, window: {} };
context.globalThis = context;
context.window = context;
vm.createContext(context);
vm.runInContext(moduleText, context, { filename: 'src/research/migrations.js' });

const migrations = context.Jarbou3iResearchModules.migrations;
assert.equal(migrations.TARGET_VERSION, '1.0.26');
assert.equal(typeof migrations.migrateResearchPacket, 'function');
assert.ok(index.includes('src="src/research/migrations.js" defer'), 'migration module must load before research-engine');
assert.ok(engine.includes('migrateWorkflowPacketForImport'), 'import path must migrate before validation');
assert.ok(engine.includes('packet_migration_report'), 'engine must persist/export migration report');
assert.ok(schema.required.includes('packet_migration_report'), 'schema must require packet_migration_report');
assert.ok(schema.$defs.packet_migration_report, 'schema must define packet_migration_report');

const secretLike = /(sk-[A-Za-z0-9_-]{12,}|Bearer\s+[A-Za-z0-9._~+/=-]{12,}|raw-token-should-redact|ya29.[A-Za-z0-9._-]{20,}|ghp_[A-Za-z0-9_]{16,})/i;
const migrationFixturePattern = /^v.+-packet\.json$/;
const fixtures = fs.readdirSync('fixtures/migrations').filter((name) => migrationFixturePattern.test(name)).sort();
assert.deepEqual(fixtures, [
  'v0.11.0-packet.json',
  'v0.12.0-packet.json',
  'v0.13.0-packet.json',
  'v0.14.0-packet.json',
  'v0.15.0-packet.json',
  'v0.16.0-packet.json',
  'v0.17.0-packet.json',
  'v0.18.0-packet.json',
  'v0.19.0-packet.json',
  'v0.20.0-packet.json',
  'v0.21.0-packet.json',
  'v0.22.0-packet.json',
  'v0.23.0-packet.json',
  'v0.24.0-packet.json',
  'v0.25.0-packet.json',
  'v0.26.0-packet.json',
  'v0.27.0-packet.json',
  'v0.28.0-packet.json',
  'v0.29.0-rc.1-packet.json',
  'v1.0.0-packet.json',
  'v1.0.1-packet.json',
  'v1.0.10-packet.json',
  'v1.0.11-packet.json',
  'v1.0.12-packet.json',
  'v1.0.13-packet.json',
  'v1.0.14-packet.json',
  'v1.0.15-packet.json',
  'v1.0.16-packet.json',
  'v1.0.17-packet.json',
  'v1.0.18-packet.json',
  'v1.0.19-packet.json',
  'v1.0.2-packet.json',
  'v1.0.20-packet.json',
  'v1.0.21-packet.json',
  'v1.0.22-packet.json',
  'v1.0.23-packet.json',
  'v1.0.24-packet.json',
  'v1.0.25-packet.json',
  'v1.0.26-packet.json',
  'v1.0.3-packet.json',
  'v1.0.4-packet.json',
  'v1.0.5-packet.json',
  'v1.0.6-packet.json',
  'v1.0.7-packet.json',
  'v1.0.8-packet.json',
  'v1.0.9-packet.json'
]);

for (const file of fixtures) {
  const input = JSON.parse(read(`fixtures/migrations/${file}`));
  const result = migrations.migrateResearchPacket(input, { targetVersion: '1.0.26' });
  assert.equal(result.ok, true, `${file} should migrate`);
  assert.equal(result.packet.workflow_version, '1.0.26', `${file} workflow version`);
  assert.equal(result.packet.research_plan.plan_version, '1.0.26', `${file} plan version`);
  assert.equal(result.packet.privacy_export.key_exported, false, `${file} key export flag`);
  assert.equal(result.packet.privacy_export.raw_token_exported, false, `${file} token export flag`);
  assert.equal(result.packet.provider_config.allow_live, false, `${file} live calls disabled after migration`);
  assert.equal(result.packet.provider_config.remember_key, false, `${file} key memory disabled after migration`);
  assert.equal(result.packet.project_workspace.storage_mode, 'local_only', `${file} project workspace local-only`);
  assert.equal(result.packet.analysis_template.template_version, '1.0.26', `${file} analysis template version`);
  assert.equal(result.packet.analysis_template.template_id, 'strategic_analysis_engine', `${file} default analysis template`);
  assert.equal(result.packet.quality_gate.quality_gate_version, '1.0.26', `${file} quality gate version`);
  assert.equal(result.packet.onboarding.onboarding_version, '1.0.26', `${file} onboarding version`);
  assert.equal(result.packet.onboarding.release_gate, 'first_run_success_checked', `${file} onboarding release gate`);
  assert.equal(result.packet.release_candidate.release_candidate_version, '1.0.26', `${file} release candidate version`);
  assert.equal(result.packet.release_candidate.policy.feature_freeze, true, `${file} feature baseline active`);
  assert.equal(result.packet.release_candidate.policy.release_stage, 'public_beta_stable', `${file} public beta stable stage`);
  assert.equal(result.packet.release_candidate.policy.breaking_changes_allowed, false, `${file} breaking changes blocked`);
  assert.equal(result.packet.export_pack.export_pack_version, '1.0.26', `${file} export pack version`);
  assert.equal(result.packet.export_pack.format, 'export_pack_v2', `${file} export pack format`);
  assert.equal(result.packet.backend_hardening.hardening_version, '1.0.26', `${file} backend hardening version`);
  assert.equal(result.packet.backend_hardening.audit_policy.prompt_logged, false, `${file} backend audit prompt logging disabled`);
  assert.equal(result.packet.browser_qa_hardening.hardening_version, '1.0.26', `${file} browser QA hardening version`);
  assert.equal(result.packet.browser_qa_hardening.feature_surface_added, false, `${file} browser QA patch-only feature surface`);
  assert.equal(result.packet.browser_qa_hardening.release_gate, 'browser_qa_hardened', `${file} browser QA release gate`);
  assert.equal(result.packet.hosted_demo_verification.hosted_demo_version, '1.0.26', `${file} hosted demo verification version`);
  assert.equal(result.packet.hosted_demo_verification.release_gate, 'hosted_demo_verified', `${file} hosted demo release gate`);
  assert.equal(result.packet.browser_evidence_capture.browser_evidence_version, '1.0.26', `${file} browser evidence version`);
  assert.equal(result.packet.browser_evidence_capture.release_gate, 'browser_evidence_capture_ready', `${file} browser evidence release gate`);
  assert.equal(result.packet.hosted_demo_smoke_fixes.smoke_fixes_version, '1.0.26', `${file} hosted demo smoke fixes version`);
  assert.equal(result.packet.hosted_demo_smoke_fixes.release_gate, 'hosted_demo_smoke_fixed', `${file} hosted demo smoke fixes release gate`);
  assert.equal(result.packet.hosted_demo_evidence_review.evidence_review_version, '1.0.26', `${file} hosted demo evidence review version`);
  assert.equal(result.packet.hosted_demo_evidence_review.release_gate, 'evidence_review_complete', `${file} hosted demo evidence review release gate`);
  assert.equal(result.packet.hosted_demo_evidence_review.raw_artifacts_allowed, false, `${file} hosted demo evidence review secret boundary`);
  assert.equal(result.packet.release_apply_integrity.release_apply_integrity_version, '1.0.26', `${file} release apply integrity version`);
  assert.equal(result.packet.release_apply_integrity.release_gate, 'release_apply_integrity_pass', `${file} release apply integrity gate`);
  assert.ok(Array.isArray(result.packet.source_results), `${file} source_results ledger defaulted`);
  assert.ok(result.packet.packet_migration_report, `${file} migration report exported`);
  assert.equal(result.packet.packet_migration_report.target_version, '1.0.26', `${file} report target`);
  assert.equal(result.packet.packet_migration_report.import_safe, true, `${file} import_safe`);
  assert.equal(result.packet.evidence_matrix[0].evidence_id, 'E1', `${file} evidence renumbered`);
  assert.ok(result.packet.causal_links[0].evidence_ids.includes('E1'), `${file} causal links repaired to migrated evidence ids`);
  assert.equal(secretLike.test(JSON.stringify(result.packet)), false, `${file} migrated packet must not leak secret-shaped values`);
}

const unsafeLegacy = JSON.parse(read('fixtures/migrations/v0.11.0-packet.json'));
unsafeLegacy.provider_config.api_key = 'sk-testSECRETSECRETSECRET123456789';
const redacted = migrations.migrateResearchPacket(unsafeLegacy, { targetVersion: '1.0.26' });
assert.ok(redacted.report.removed_sensitive_fields.some((field) => field.includes('provider_config')), 'v0.11 fixture should redact legacy provider secret');
assert.equal(redacted.packet.privacy_export.redaction_applied, true, 'migration privacy report should record redaction');

console.log('Migration checks passed.');
process.reallyExit ? process.reallyExit(0) : process.exit(0);
