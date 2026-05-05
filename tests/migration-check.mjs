import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import { getMigrationFixture, migrationFixtureEntries, fixturePathExists } from './fixture-registry-loader.mjs';

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
assert.equal(migrations.TARGET_VERSION, '1.1.0-alpha.4');
assert.equal(typeof migrations.migrateResearchPacket, 'function');
assert.ok(index.includes('src="src/research/migrations.js" defer'), 'migration module must load before research-engine');
assert.ok(engine.includes('migrateWorkflowPacketForImport'), 'import path must migrate before validation');
assert.ok(engine.includes('packet_migration_report'), 'engine must persist/export migration report');
assert.ok(schema.required.includes('packet_migration_report'), 'schema must require packet_migration_report');
assert.ok(schema.$defs.packet_migration_report, 'schema must define packet_migration_report');

const secretLike = /(sk-[A-Za-z0-9_-]{12,}|Bearer\s+[A-Za-z0-9._~+/=-]{12,}|raw-token-should-redact|ya29.[A-Za-z0-9._-]{20,}|ghp_[A-Za-z0-9_]{16,})/i;
const entries = migrationFixtureEntries().sort((a, b) => a.file.localeCompare(b.file));
const fixtureNames = entries.map((entry) => entry.file);
assert.equal(fs.readdirSync('fixtures/migrations').filter((name) => /^v.+-packet\.json$/.test(name)).length, 0, 'per-version migration packet files must be consolidated into migration-registry.json');
assert.equal(fixtureNames.length, 54, 'migration registry must preserve all historical packets plus current alpha.4');
assert.ok(fixtureNames.includes('v1.1.0-alpha.3-packet.json'), 'alpha.3 migration coverage must be preserved in registry');
assert.ok(fixtureNames.includes('v1.1.0-alpha.4-packet.json'), 'alpha.4 migration coverage must be present in registry');

for (const entry of entries) {
  const file = entry.file;
  const input = entry.packet;
  const result = migrations.migrateResearchPacket(input, { targetVersion: '1.1.0-alpha.4' });
  assert.equal(result.ok, true, `${file} should migrate`);
  assert.equal(result.packet.workflow_version, '1.1.0-alpha.4', `${file} workflow version`);
  assert.equal(result.packet.research_plan.plan_version, '1.1.0-alpha.4', `${file} plan version`);
  assert.equal(result.packet.privacy_export.key_exported, false, `${file} key export flag`);
  assert.equal(result.packet.privacy_export.raw_token_exported, false, `${file} token export flag`);
  assert.equal(result.packet.provider_config.allow_live, false, `${file} live calls disabled after migration`);
  assert.equal(result.packet.provider_config.remember_key, false, `${file} key memory disabled after migration`);
  assert.equal(result.packet.project_workspace.storage_mode, 'local_only', `${file} project workspace local-only`);
  assert.equal(result.packet.analysis_template.template_version, '1.1.0-alpha.4', `${file} analysis template version`);
  assert.equal(result.packet.analysis_template.template_id, 'strategic_analysis_engine', `${file} default analysis template`);
  assert.equal(result.packet.quality_gate.quality_gate_version, '1.1.0-alpha.4', `${file} quality gate version`);
  assert.equal(result.packet.onboarding.onboarding_version, '1.1.0-alpha.4', `${file} onboarding version`);
  assert.equal(result.packet.onboarding.release_gate, 'first_run_success_checked', `${file} onboarding release gate`);
  assert.equal(result.packet.release_candidate.release_candidate_version, '1.1.0-alpha.4', `${file} release candidate version`);
  assert.equal(result.packet.release_candidate.policy.feature_freeze, true, `${file} feature baseline active`);
  assert.equal(result.packet.release_candidate.policy.release_stage, 'public_beta_stable', `${file} public beta stable stage`);
  assert.equal(result.packet.release_candidate.policy.breaking_changes_allowed, false, `${file} breaking changes blocked`);
  assert.equal(result.packet.export_pack.export_pack_version, '1.1.0-alpha.4', `${file} export pack version`);
  assert.equal(result.packet.export_pack.format, 'export_pack_v2', `${file} export pack format`);
  assert.equal(result.packet.backend_hardening.hardening_version, '1.1.0-alpha.4', `${file} backend hardening version`);
  assert.equal(result.packet.backend_hardening.audit_policy.prompt_logged, false, `${file} backend audit prompt logging disabled`);
  assert.equal(result.packet.browser_qa_hardening.hardening_version, '1.1.0-alpha.4', `${file} browser QA hardening version`);
  assert.equal(result.packet.browser_qa_hardening.feature_surface_added, false, `${file} browser QA patch-only feature surface`);
  assert.equal(result.packet.browser_qa_hardening.release_gate, 'browser_qa_hardened', `${file} browser QA release gate`);
  assert.equal(result.packet.hosted_demo_verification.hosted_demo_version, '1.1.0-alpha.4', `${file} hosted demo verification version`);
  assert.equal(result.packet.hosted_demo_verification.release_gate, 'hosted_demo_verified', `${file} hosted demo release gate`);
  assert.equal(result.packet.browser_evidence_capture.browser_evidence_version, '1.1.0-alpha.4', `${file} browser evidence version`);
  assert.equal(result.packet.browser_evidence_capture.release_gate, 'browser_evidence_capture_ready', `${file} browser evidence release gate`);
  assert.equal(result.packet.hosted_demo_smoke_fixes.smoke_fixes_version, '1.1.0-alpha.4', `${file} hosted demo smoke fixes version`);
  assert.equal(result.packet.hosted_demo_smoke_fixes.release_gate, 'hosted_demo_smoke_fixed', `${file} hosted demo smoke fixes release gate`);
  assert.equal(result.packet.hosted_demo_evidence_review.evidence_review_version, '1.1.0-alpha.4', `${file} hosted demo evidence review version`);
  assert.equal(result.packet.hosted_demo_evidence_review.release_gate, 'evidence_review_complete', `${file} hosted demo evidence review release gate`);
  assert.equal(result.packet.hosted_demo_evidence_review.raw_artifacts_allowed, false, `${file} hosted demo evidence review secret boundary`);
  assert.equal(result.packet.release_apply_integrity.release_apply_integrity_version, '1.1.0-alpha.4', `${file} release apply integrity version`);
  assert.equal(result.packet.release_apply_integrity.release_gate, 'release_apply_integrity_pass', `${file} release apply integrity gate`);
  assert.ok(Array.isArray(result.packet.source_results), `${file} source_results ledger defaulted`);
  assert.ok(result.packet.packet_migration_report, `${file} migration report exported`);
  assert.equal(result.packet.packet_migration_report.target_version, '1.1.0-alpha.4', `${file} report target`);
  assert.equal(result.packet.packet_migration_report.import_safe, true, `${file} import_safe`);
  assert.equal(result.packet.evidence_matrix[0].evidence_id, 'E1', `${file} evidence renumbered`);
  assert.ok(result.packet.causal_links[0].evidence_ids.includes('E1'), `${file} causal links repaired to migrated evidence ids`);
  assert.equal(secretLike.test(JSON.stringify(result.packet)), false, `${file} migrated packet must not leak secret-shaped values`);
}

const unsafeLegacy = getMigrationFixture('fixtures/migrations/v0.11.0-packet.json');
unsafeLegacy.provider_config.api_key = 'sk-testSECRETSECRETSECRET123456789';
const redacted = migrations.migrateResearchPacket(unsafeLegacy, { targetVersion: '1.1.0-alpha.4' });
assert.ok(redacted.report.removed_sensitive_fields.some((field) => field.includes('provider_config')), 'v0.11 fixture should redact legacy provider secret');
assert.equal(redacted.packet.privacy_export.redaction_applied, true, 'migration privacy report should record redaction');

console.log('Migration checks passed.');
process.exit(0);
