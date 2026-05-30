import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const VERSION = '1.4.0-alpha.22';
const RELEASE = 'v1.4.0-alpha.22 — Alpha.21 Lock Completion + Handoff Productivity Command Center';
const PUBLIC_LABEL = 'v1.4.0-alpha.22 Handoff Productivity Command Center';
const LOCKED_ALPHA19 = '1.4.0-alpha.19';
const LOCKED_ALPHA19_TITLE = 'v1.4.0-alpha.19 — Evidence Dashboard Decision Ledger';
const RUN_ID_ALPHA19 = '26668213509';
const COMMIT_ALPHA19 = '2b3665b66861d631e779e9133d77399d0560d827';
const TARGET_MODULE = 'src/research/evidence-decision-ledger-handoff-audit.js';
const TARGET_CHECK = 'tests/evidence-decision-ledger-handoff-audit-lock-completion-check.mjs';

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
assert.ok(pkg.description.includes(LOCKED_ALPHA19_TITLE));
assert.ok(pkg.description.includes(RUN_ID_ALPHA19));
assert.ok(pkg.description.includes(COMMIT_ALPHA19));
assert.equal(manifest.version, VERSION);
assert.equal(manifest.release_title, RELEASE);
assert.equal(ciRegistry.ci_gate_registry_version, VERSION);
assert.equal(ciRegistry.release_title, RELEASE);
assert.equal(versionRegistry.version_suite_registry_version, VERSION);
assert.equal(versionRegistry.release_title, RELEASE);
assert.equal(evidenceConfig.internal_build_version, VERSION);
assert.equal(evidenceConfig.public_version_label, PUBLIC_LABEL);

for (const [name, text] of Object.entries({ current, roadmap, changelog, releaseHistory, releaseEvidence, qa, readme, publicDemo })) {
  assert.ok(text.includes(RELEASE) || text.includes(PUBLIC_LABEL), `${name} must expose alpha.20 current identity`);
  assert.ok(text.includes(LOCKED_ALPHA19_TITLE), `${name} must record locked alpha.19 baseline`);
  assert.ok(text.includes(RUN_ID_ALPHA19), `${name} must record alpha.19 run id`);
  assert.ok(text.includes(COMMIT_ALPHA19), `${name} must record alpha.19 commit`);
  assert.ok(/handoff audit|تدقيق تسليم|audit de remise/i.test(text), `${name} must describe handoff audit actionability`);
}

assert.ok(current.includes('Status: current candidate. Lock is pending green no-browser CI'), 'alpha.20 must be current candidate before its own lock');
assert.equal(/alpha\.19[^\n.]*lock pending/i.test(current), false, 'current release must not contain alpha.19 lock pending wording');
assert.equal((roadmap.match(/Current candidate/g) || []).length, 1, 'roadmap must have exactly one current candidate section');

assert.ok(index.includes(PUBLIC_LABEL));
assert.ok(helpers.includes(PUBLIC_LABEL));
assert.ok(index.includes('content="1.4.0-alpha.22"'));
assert.ok(index.includes('src="src/research/evidence-decision-ledger-handoff-audit.js" defer'));
assert.ok(index.includes('data-browser-qa="evidence-decision-ledger-handoff-audit"'));
assert.ok(helpers.includes('Handoff Productivity Command Center'));
assert.ok(helpers.includes('مركز إنتاجية التسليم'));
assert.ok(helpers.includes('Centre de productivité de remise'));
assert.ok(workflow.includes('lock-evidence-bundle_1.4.0-alpha.22_${{ github.run_id }}'));
assert.ok(workflow.includes("summary.internal_build_version !== '1.4.0-alpha.22'"));

for (const gate of ['no-browser','current-no-browser','release']) {
  assert.ok(ciRegistry.gates[gate].node_checks.includes(TARGET_CHECK), `${gate} must run alpha.20 handoff-audit check`);
}
assert.ok(ciRegistry.syntax_matrix.files.includes(TARGET_CHECK));
assert.ok(ciRegistry.syntax_matrix.files.includes(TARGET_MODULE));

const modules = load(TARGET_MODULE);
assert.ok(modules.evidenceDecisionLedgerHandoffAudit, 'handoff audit module must be registered');
const audit = modules.evidenceDecisionLedgerHandoffAudit;
assert.equal(audit.VERSION, VERSION);
assert.equal(audit.MILESTONE, RELEASE);
assert.equal(audit.LOCKED_BASELINE, LOCKED_ALPHA19);
assert.equal(audit.LOCKED_BASELINE_RUN_ID, RUN_ID_ALPHA19);
assert.equal(audit.LOCKED_BASELINE_COMMIT, COMMIT_ALPHA19);
assert.equal(audit.DECISION_LEDGER_BASELINE, LOCKED_ALPHA19);
assert.equal(audit.ACTIONABILITY_BASELINE, '1.4.0-alpha.18');
assert.equal(audit.REGRESSION_DASHBOARD_BASELINE, '1.4.0-alpha.17');
assert.equal(audit.EVIDENCE_BUDGET_BASELINE, '1.4.0-alpha.16');
assert.equal(audit.MODEL, 'evidence_decision_ledger_handoff_audit.v1');
assert.equal(audit.LOCKED_ALPHA19_OBSERVED.no_browser_checks, 148);
assert.equal(audit.LOCKED_ALPHA19_OBSERVED.browser_checks, 17);
assert.equal(audit.LOCKED_ALPHA19_OBSERVED.lockable, true);

const pass = audit.buildEvidenceDecisionLedgerHandoffAudit({ decision_state:'lock_review_ready' });
assert.equal(pass.handoff_state, 'handoff_ready_for_operator_review');
assert.ok(pass.recommended_operator_actions.includes('handoff_ready_for_operator_review'));
assert.equal(pass.handoff_checklist.length, 4);
assert.ok(pass.handoff_checklist.every((entry) => entry.checksum.startsWith('fnv1a32:')));
assert.equal(audit.validateHandoffAuditSafety(pass).ok, true);

const warn = audit.buildEvidenceDecisionLedgerHandoffAudit({ decision_state:'review_budget_pressure_before_lock' });
assert.equal(warn.handoff_state, 'handoff_ready_with_budget_pressure_review');
assert.ok(warn.recommended_operator_actions.includes('review_budget_pressure_before_lock'));

const fail = audit.buildEvidenceDecisionLedgerHandoffAudit({ decision_state:'block_lock_until_evidence_budget_regression_fixed' });
assert.equal(fail.handoff_state, 'handoff_blocked_until_decision_ledger_repaired');
assert.ok(fail.recommended_operator_actions.includes('block_lock_until_evidence_budget_regression_fixed'));

const missing = audit.buildEvidenceDecisionLedgerHandoffAudit({});
assert.equal(missing.handoff_state, 'handoff_requires_current_evidence_capture');
assert.ok(missing.recommended_operator_actions.includes('capture_current_evidence_before_lock'));

const unsafeKeys = [
  ['raw','credentials'], ['raw','tokens'], ['raw','api','keys'], ['authorization','headers'], ['authorization','header'],
  ['raw','request','body'], ['raw','response','body'], ['raw','source','fetch','results'], ['raw','network','trace'],
  ['browser','session','secrets'], ['provider','secret','value'], ['access','token'], ['refresh','token'], ['api','key'], ['bearer','token']
].map((parts) => parts.join('_'));
for (const key of unsafeKeys) {
  const unsafe = Object.assign({}, pass, { [key]:'unsafe' });
  const validation = audit.validateHandoffAuditSafety(unsafe);
  assert.equal(validation.ok, false, `unsafe key must fail: ${key}`);
  assert.ok(validation.forbidden_present.some((finding) => finding.includes(key)), `unsafe key must be reported: ${key}`);
}

for (const forbidden of ['fetch(', 'XMLHttpRequest', 'WebSocket', 'navigator.sendBeacon', 'localStorage.setItem', 'sessionStorage.setItem', 'sk-', 'ghp_', 'AKIA', 'BEGIN PRIVATE KEY', 'Bear' + 'er ']) {
  assert.equal(source.includes(forbidden), false, `target source must not contain forbidden token ${forbidden}`);
}
for (const forbidden of [['access','token'], ['refresh','token'], ['api','key'], ['bearer','token'], ['raw','credentials'], ['raw','tokens'], ['raw','api','keys']].map((parts) => parts.join('_'))) {
  assert.equal(source.includes(forbidden), false, `target source must not contain forbidden field literal ${forbidden}`);
}

console.log('Evidence decision ledger handoff audit and alpha.19 lock-completion checks passed.');
process.exit(0);
