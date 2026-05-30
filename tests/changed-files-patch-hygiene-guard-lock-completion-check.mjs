import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const VERSION = '1.4.0-alpha.24';
const RELEASE = 'v1.4.0-alpha.24 — Alpha.23 Lock Completion + Changed-Files Patch Hygiene Guard';
const PUBLIC_LABEL = 'v1.4.0-alpha.24 Changed-Files Patch Hygiene Guard';
const LOCKED_ALPHA23 = '1.4.0-alpha.23';
const LOCKED_ALPHA23_TITLE = 'v1.4.0-alpha.23 — Handoff Productivity Runbook Gate';
const RUN_ID_ALPHA23 = '26684865061';
const COMMIT_ALPHA23 = '4675e12940112f734e0434421bf4553906093ff8';
const BUNDLE_SHA_ALPHA23 = '441c4fb891effea54a8e4492730b2c851baec838a5e45b451ec3a501343356c6';
const TARGET_MODULE = 'src/research/changed-files-patch-hygiene-guard.js';
const TARGET_CHECK = 'tests/changed-files-patch-hygiene-guard-lock-completion-check.mjs';
const STALE_ALPHA23_CHECK = 'tests/handoff-productivity-runbook-gate-lock-completion-check.mjs';
const CLEANUP_SCRIPT = 'scripts/cleanup-alpha24-stale-tests.ps1';

function read(path){ return fs.readFileSync(path, 'utf8'); }
function json(path){ return JSON.parse(read(path)); }
function load(path){
  const context = { window:{ Jarbou3iResearchModules:{} }, globalThis:{} };
  context.globalThis = context.window;
  vm.createContext(context);
  vm.runInContext(read(path), context, { filename:path });
  return context.window.Jarbou3iResearchModules;
}

const pkg = json('package.json');
const manifest = json('MANIFEST.json');
const ciRegistry = json('tests/ci-gate-registry.json');
const versionRegistry = json('tests/version-suite-registry.json');
const evidenceConfig = json('tests/evidence/evidence-matrix.config.json');
const changedFiles = json('CHANGED_FILES_ALPHA24.json');
const current = read('docs/current-release.md');
const roadmap = read('docs/roadmap.md');
const changelog = read('CHANGELOG.md');
const releaseHistory = read('docs/release-history.md');
const releaseEvidence = read('docs/release-and-evidence.md');
const qa = read('docs/qa-matrix.md');
const readme = read('README.md');
const publicDemo = read('PUBLIC_DEMO.md');
const index = read('index.html');
const helpers = read('src/research/render-helpers.js');
const workflow = read('.github/workflows/ci.yml');
const source = read(TARGET_MODULE);
const cleanupScriptExists = fs.existsSync(CLEANUP_SCRIPT);
const cleanupScript = cleanupScriptExists ? read(CLEANUP_SCRIPT) : '';

assert.equal(pkg.version, VERSION);
assert.ok(pkg.description.includes(PUBLIC_LABEL));
assert.ok(pkg.description.includes(LOCKED_ALPHA23_TITLE));
assert.ok(pkg.description.includes(RUN_ID_ALPHA23));
assert.ok(pkg.description.includes(COMMIT_ALPHA23));
assert.ok(pkg.description.includes('zero-effect patch rejection'));
assert.equal(manifest.version, VERSION);
assert.equal(manifest.release_title, RELEASE);
assert.equal(manifest.release_type, 'alpha23-lock-completion-changed-files-patch-hygiene-guard');
assert.equal(ciRegistry.ci_gate_registry_version, VERSION);
assert.equal(ciRegistry.release_title, RELEASE);
assert.equal(versionRegistry.version_suite_registry_version, VERSION);
assert.equal(versionRegistry.release_title, RELEASE);
assert.equal(evidenceConfig.internal_build_version, VERSION);
assert.equal(evidenceConfig.public_version_label, PUBLIC_LABEL);

for (const [name, text] of Object.entries({ current, roadmap, changelog, releaseHistory, releaseEvidence, qa, readme, publicDemo })) {
  assert.ok(text.includes(RELEASE) || text.includes(PUBLIC_LABEL), `${name} must expose alpha.24 current identity`);
  assert.ok(text.includes(LOCKED_ALPHA23_TITLE), `${name} must record locked alpha.23 baseline`);
  assert.ok(text.includes(RUN_ID_ALPHA23), `${name} must record alpha.23 run id`);
  assert.ok(text.includes(COMMIT_ALPHA23), `${name} must record alpha.23 commit`);
  assert.ok(text.includes(BUNDLE_SHA_ALPHA23), `${name} must record alpha.23 bundle SHA`);
  assert.ok(/changed-files patch hygiene|حارس نظافة حزمة الملفات المعدلة|Garde d.hygiène des patchs/i.test(text), `${name} must describe changed-files patch hygiene`);
  assert.ok(/zero-effect patch|بلا أثر|sans effet/i.test(text), `${name} must describe zero-effect patch rejection`);
}

assert.ok(current.includes('Status: current candidate. Lock is pending green no-browser CI'), 'alpha.24 must be current candidate before its own lock');
assert.equal(/alpha\.23[^\n.]*lock pending/i.test(current), false, 'current release must not contain alpha.23 lock pending wording');
assert.equal((roadmap.match(/Current candidate/g) || []).length <= 1, true, 'roadmap must not expose multiple current candidate sections');
assert.equal(fs.existsSync(STALE_ALPHA23_CHECK), false, 'stale alpha.23 lock-completion check must be removed');
assert.equal(changedFiles.cleanup_script, CLEANUP_SCRIPT, 'changed-files manifest must record the cleanup script path');
assert.ok(changedFiles.deleted_files.includes(STALE_ALPHA23_CHECK), 'changed-files manifest must record stale alpha.23 test deletion');
assert.ok(changedFiles.added_files.includes(CLEANUP_SCRIPT) || cleanupScriptExists === false, 'cleanup script must either be shipped in the patch or already self-removed after cleanup');
if (cleanupScriptExists) {
  assert.ok(cleanupScript.includes(STALE_ALPHA23_CHECK), 'cleanup script must remove stale alpha.23 check');
  assert.ok(/Remove-Item\s+-Force/.test(cleanupScript), 'cleanup script must use PowerShell Remove-Item -Force');
  assert.ok(cleanupScript.includes('$MyInvocation.MyCommand.Path'), 'cleanup script must self-remove');
} else {
  assert.equal(fs.existsSync(STALE_ALPHA23_CHECK), false, 'self-removed cleanup script is valid only after stale alpha.23 check is absent');
}

assert.ok(index.includes(PUBLIC_LABEL));
assert.ok(helpers.includes(PUBLIC_LABEL));
assert.ok(index.includes('content="1.4.0-alpha.24"'));
assert.ok(index.includes('src="src/research/changed-files-patch-hygiene-guard.js" defer'));
assert.ok(index.includes('data-browser-qa="changed-files-patch-hygiene-guard"'));
assert.ok(helpers.includes('Changed-Files Patch Hygiene Guard'));
assert.ok(helpers.includes('حارس نظافة حزمة الملفات المعدلة'));
assert.ok(helpers.includes('Garde d’hygiène des patchs'));
assert.ok(workflow.includes('lock-evidence-bundle_1.4.0-alpha.24_${{ github.run_id }}'));
assert.ok(workflow.includes("summary.internal_build_version !== '1.4.0-alpha.24'"));

for (const gate of ['no-browser','current-no-browser','release']) {
  assert.ok(ciRegistry.gates[gate].node_checks.includes(TARGET_CHECK), `${gate} must run alpha.24 changed-files patch hygiene guard check`);
  assert.equal(ciRegistry.gates[gate].node_checks.includes(STALE_ALPHA23_CHECK), false, `${gate} must not run stale alpha.23 check`);
}
assert.ok(ciRegistry.syntax_matrix.files.includes(TARGET_CHECK));
assert.ok(ciRegistry.syntax_matrix.files.includes(TARGET_MODULE));
assert.equal(ciRegistry.syntax_matrix.files.includes(CLEANUP_SCRIPT), false, 'PowerShell cleanup script must not be passed to node --check syntax matrix');
assert.equal(ciRegistry.syntax_matrix.files.includes(STALE_ALPHA23_CHECK), false);

const modules = load(TARGET_MODULE);
assert.ok(modules.changedFilesPatchHygieneGuard, 'changed-files patch hygiene guard module must be registered');
const guard = modules.changedFilesPatchHygieneGuard;
assert.equal(guard.VERSION, VERSION);
assert.equal(guard.MILESTONE, RELEASE);
assert.equal(guard.LOCKED_BASELINE, LOCKED_ALPHA23);
assert.equal(guard.LOCKED_BASELINE_RUN_ID, RUN_ID_ALPHA23);
assert.equal(guard.LOCKED_BASELINE_COMMIT, COMMIT_ALPHA23);
assert.equal(guard.LOCKED_BASELINE_BUNDLE_SHA256, BUNDLE_SHA_ALPHA23);
assert.equal(guard.RUNBOOK_GATE_BASELINE, LOCKED_ALPHA23);
assert.equal(guard.PRODUCTIVITY_COMMAND_CENTER_BASELINE, '1.4.0-alpha.22');
assert.equal(guard.READINESS_CHECKLIST_BASELINE, '1.4.0-alpha.21');
assert.equal(guard.MODEL, 'changed_files_patch_hygiene_guard.v1');
assert.equal(guard.LOCKED_ALPHA23_OBSERVED.no_browser_checks, 144);
assert.equal(guard.LOCKED_ALPHA23_OBSERVED.browser_checks, 17);
assert.equal(guard.LOCKED_ALPHA23_OBSERVED.lockable, true);

const passingEvidence = Object.fromEntries(guard.REQUIRED_PATCH_HYGIENE_ITEMS.map((item, index) => [item, { status:'pass', changed_files_count:index + 1, deleted_files_count:item.includes('cleanup') ? 1 : 0 }]));
const pass = guard.buildChangedFilesPatchHygieneGuard({ patch_evidence: passingEvidence });
assert.equal(pass.overall_patch_hygiene_status, 'pass');
assert.ok(pass.recommended_operator_actions.includes('apply_changed_files_patch'));
assert.equal(pass.patch_hygiene_items.length, guard.REQUIRED_PATCH_HYGIENE_ITEMS.length);
assert.ok(pass.patch_hygiene_items.every((entry) => entry.checksum.startsWith('fnv1a32:')));
assert.ok(pass.patch_hygiene_queue.every((entry) => entry.checksum.startsWith('fnv1a32:')));
assert.equal(guard.validatePatchHygieneGuardSafety(pass).ok, true);

const warn = guard.buildChangedFilesPatchHygieneGuard({ patch_evidence: Object.assign({}, passingEvidence, { cleanup_script_present_when_deletions_required:{ status:'warn', deleted_files_count:1 } }) });
assert.equal(warn.overall_patch_hygiene_status, 'warn');
assert.ok(warn.recommended_operator_actions.includes('run_cleanup_script_before_validation'));
assert.equal(warn.top_priority_item, 'cleanup_script_present_when_deletions_required');

const fail = guard.buildChangedFilesPatchHygieneGuard({ patch_evidence: Object.assign({}, passingEvidence, { effective_delta_detected:false }) });
assert.equal(fail.overall_patch_hygiene_status, 'fail');
assert.ok(fail.recommended_operator_actions.includes('block_zero_effect_patch'));
assert.ok(fail.blocking_items.includes('effective_delta_detected'));

const missing = guard.buildChangedFilesPatchHygieneGuard({});
assert.equal(missing.overall_patch_hygiene_status, 'review_required');
assert.ok(missing.recommended_operator_actions.includes('capture_missing_patch_manifest'));
assert.ok(missing.review_required_items.length >= 1);

const unsafeKeys = [
  ['raw','credentials'], ['raw','tokens'], ['raw','api','keys'], ['authorization','headers'], ['authorization','header'],
  ['raw','request','body'], ['raw','response','body'], ['raw','source','fetch','results'], ['raw','network','trace'],
  ['browser','session','secrets'], ['provider','secret','value'], ['access','token'], ['refresh','token'], ['api','key'], ['bearer','token']
].map((parts) => parts.join('_'));
for (const key of unsafeKeys) {
  const unsafe = Object.assign({}, pass, { [key]:'unsafe' });
  const validation = guard.validatePatchHygieneGuardSafety(unsafe);
  assert.equal(validation.ok, false, `unsafe key must fail: ${key}`);
  assert.ok(validation.forbidden_present.some((finding) => finding.includes(key)), `unsafe key must be reported: ${key}`);
}

for (const forbidden of ['fetch(', 'XMLHttpRequest', 'WebSocket', 'navigator.sendBeacon', 'localStorage.setItem', 'sessionStorage.setItem', 'sk-', 'ghp_', 'AKIA', 'BEGIN PRIVATE KEY', 'Bear' + 'er ']) {
  assert.equal(source.includes(forbidden), false, `target source must not contain forbidden token ${forbidden}`);
}
for (const forbidden of [['access','token'], ['refresh','token'], ['api','key'], ['bearer','token'], ['raw','credentials'], ['raw','tokens'], ['raw','api','keys']].map((parts) => parts.join('_'))) {
  assert.equal(source.includes(forbidden), false, `target source must not contain forbidden field literal ${forbidden}`);
}

console.log('Changed-files patch hygiene guard and alpha.23 lock-completion checks passed.');
process.exit(0);
