import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const VERSION = '1.4.0-alpha.21';
const RELEASE = 'v1.4.0-alpha.21 — Alpha.20 Lock Completion + Evidence Handoff Readiness Checklist';
const PUBLIC_LABEL = 'v1.4.0-alpha.21 Evidence Handoff Readiness Checklist';
const LOCKED_ALPHA20 = '1.4.0-alpha.20';
const LOCKED_ALPHA20_TITLE = 'v1.4.0-alpha.20 — Evidence Decision Ledger Handoff Audit';
const RUN_ID_ALPHA20 = '26680024039';
const COMMIT_ALPHA20 = 'd492d8e7de270f6bab5780a5dad5f821056c74b7';
const TARGET_MODULE = 'src/research/evidence-handoff-readiness-checklist.js';
const TARGET_CHECK = 'tests/evidence-handoff-readiness-checklist-lock-completion-check.mjs';

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

assert.equal(pkg.version, VERSION);
assert.ok(pkg.description.includes(PUBLIC_LABEL));
assert.ok(pkg.description.includes(LOCKED_ALPHA20_TITLE));
assert.ok(pkg.description.includes(RUN_ID_ALPHA20));
assert.ok(pkg.description.includes(COMMIT_ALPHA20));
assert.equal(manifest.version, VERSION);
assert.equal(manifest.release_title, RELEASE);
assert.equal(ciRegistry.ci_gate_registry_version, VERSION);
assert.equal(ciRegistry.release_title, RELEASE);
assert.equal(versionRegistry.version_suite_registry_version, VERSION);
assert.equal(versionRegistry.release_title, RELEASE);
assert.equal(evidenceConfig.internal_build_version, VERSION);
assert.equal(evidenceConfig.public_version_label, PUBLIC_LABEL);

for (const [name, text] of Object.entries({ current, roadmap, changelog, releaseHistory, releaseEvidence, qa, readme, publicDemo })) {
  assert.ok(text.includes(RELEASE) || text.includes(PUBLIC_LABEL), `${name} must expose alpha.21 current identity`);
  assert.ok(text.includes(LOCKED_ALPHA20_TITLE), `${name} must record locked alpha.20 baseline`);
  assert.ok(text.includes(RUN_ID_ALPHA20), `${name} must record alpha.20 run id`);
  assert.ok(text.includes(COMMIT_ALPHA20), `${name} must record alpha.20 commit`);
  assert.ok(/handoff readiness checklist|قائمة جاهزية تسليم|liste de préparation/i.test(text), `${name} must describe handoff readiness checklist`);
}

assert.ok(current.includes('Status: current candidate. Lock is pending green no-browser CI'), 'alpha.21 must be current candidate before its own lock');
assert.equal(/alpha\.20[^\n.]*lock pending/i.test(current), false, 'current release must not contain alpha.20 lock pending wording');
assert.equal((roadmap.match(/Current candidate/g) || []).length, 1, 'roadmap must have exactly one current candidate section');

assert.ok(index.includes(PUBLIC_LABEL));
assert.ok(helpers.includes(PUBLIC_LABEL));
assert.ok(index.includes('content="1.4.0-alpha.21"'));
assert.ok(index.includes('src="src/research/evidence-handoff-readiness-checklist.js" defer'));
assert.ok(index.includes('data-browser-qa="evidence-handoff-readiness-checklist"'));
assert.ok(helpers.includes('Evidence Handoff Readiness Checklist'));
assert.ok(helpers.includes('قائمة جاهزية تسليم الأدلة'));
assert.ok(helpers.includes('Liste de préparation de remise des preuves'));
assert.ok(workflow.includes('lock-evidence-bundle_1.4.0-alpha.21_${{ github.run_id }}'));
assert.ok(workflow.includes("summary.internal_build_version !== '1.4.0-alpha.21'"));

for (const gate of ['no-browser','current-no-browser','release']) {
  assert.ok(ciRegistry.gates[gate].node_checks.includes(TARGET_CHECK), `${gate} must run alpha.21 handoff-readiness check`);
}
assert.ok(ciRegistry.syntax_matrix.files.includes(TARGET_CHECK));
assert.ok(ciRegistry.syntax_matrix.files.includes(TARGET_MODULE));

const modules = load(TARGET_MODULE);
assert.ok(modules.evidenceHandoffReadinessChecklist, 'handoff readiness module must be registered');
const checklist = modules.evidenceHandoffReadinessChecklist;
assert.equal(checklist.VERSION, VERSION);
assert.equal(checklist.MILESTONE, RELEASE);
assert.equal(checklist.LOCKED_BASELINE, LOCKED_ALPHA20);
assert.equal(checklist.LOCKED_BASELINE_RUN_ID, RUN_ID_ALPHA20);
assert.equal(checklist.LOCKED_BASELINE_COMMIT, COMMIT_ALPHA20);
assert.equal(checklist.HANDOFF_AUDIT_BASELINE, LOCKED_ALPHA20);
assert.equal(checklist.DECISION_LEDGER_BASELINE, '1.4.0-alpha.19');
assert.equal(checklist.ACTIONABILITY_BASELINE, '1.4.0-alpha.18');
assert.equal(checklist.REGRESSION_DASHBOARD_BASELINE, '1.4.0-alpha.17');
assert.equal(checklist.EVIDENCE_BUDGET_BASELINE, '1.4.0-alpha.16');
assert.equal(checklist.MODEL, 'evidence_handoff_readiness_checklist.v1');
assert.equal(checklist.LOCKED_ALPHA20_OBSERVED.no_browser_checks, 149);
assert.equal(checklist.LOCKED_ALPHA20_OBSERVED.browser_checks, 17);
assert.equal(checklist.LOCKED_ALPHA20_OBSERVED.lockable, true);

const passingEvidence = Object.fromEntries(checklist.REQUIRED_CHECKLIST_ITEMS.map((item) => [item, true]));
const pass = checklist.buildEvidenceHandoffReadinessChecklist({ current_evidence: passingEvidence });
assert.equal(pass.overall_readiness_status, 'pass');
assert.ok(pass.recommended_operator_actions.includes('handoff_packet_ready_for_review'));
assert.equal(pass.readiness_checklist.length, checklist.REQUIRED_CHECKLIST_ITEMS.length);
assert.ok(pass.readiness_checklist.every((entry) => entry.checksum.startsWith('fnv1a32:')));
assert.equal(checklist.validateReadinessChecklistSafety(pass).ok, true);

const warn = checklist.buildEvidenceHandoffReadinessChecklist({ current_evidence: Object.assign({}, passingEvidence, { operator_review_path_confirmed:{ status:'warn', note:'operator wants final review' } }) });
assert.equal(warn.overall_readiness_status, 'warn');
assert.ok(warn.recommended_operator_actions.includes('review_handoff_warnings_before_lock'));

const fail = checklist.buildEvidenceHandoffReadinessChecklist({ current_evidence: Object.assign({}, passingEvidence, { behavior_boundaries_confirmed:false }) });
assert.equal(fail.overall_readiness_status, 'fail');
assert.ok(fail.recommended_operator_actions.includes('block_handoff_until_repaired'));
assert.ok(fail.failed_items.includes('behavior_boundaries_confirmed'));

const missing = checklist.buildEvidenceHandoffReadinessChecklist({});
assert.equal(missing.overall_readiness_status, 'review_required');
assert.ok(missing.recommended_operator_actions.includes('capture_handoff_evidence_before_review'));
assert.ok(missing.missing_or_review_required_items.length >= 1);

const unsafeKeys = [
  ['raw','credentials'], ['raw','tokens'], ['raw','api','keys'], ['authorization','headers'], ['authorization','header'],
  ['raw','request','body'], ['raw','response','body'], ['raw','source','fetch','results'], ['raw','network','trace'],
  ['browser','session','secrets'], ['provider','secret','value'], ['access','token'], ['refresh','token'], ['api','key'], ['bearer','token']
].map((parts) => parts.join('_'));
for (const key of unsafeKeys) {
  const unsafe = Object.assign({}, pass, { [key]:'unsafe' });
  const validation = checklist.validateReadinessChecklistSafety(unsafe);
  assert.equal(validation.ok, false, `unsafe key must fail: ${key}`);
  assert.ok(validation.forbidden_present.some((finding) => finding.includes(key)), `unsafe key must be reported: ${key}`);
}

for (const forbidden of ['fetch(', 'XMLHttpRequest', 'WebSocket', 'navigator.sendBeacon', 'localStorage.setItem', 'sessionStorage.setItem', 'sk-', 'ghp_', 'AKIA', 'BEGIN PRIVATE KEY', 'Bear' + 'er ']) {
  assert.equal(source.includes(forbidden), false, `target source must not contain forbidden token ${forbidden}`);
}
for (const forbidden of [['access','token'], ['refresh','token'], ['api','key'], ['bearer','token'], ['raw','credentials'], ['raw','tokens'], ['raw','api','keys']].map((parts) => parts.join('_'))) {
  assert.equal(source.includes(forbidden), false, `target source must not contain forbidden field literal ${forbidden}`);
}

console.log('Evidence handoff readiness checklist and alpha.20 lock-completion checks passed.');
process.exit(0);
