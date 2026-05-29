import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const VERSION = '1.4.0-alpha.19';
const RELEASE = 'v1.4.0-alpha.19 — Alpha.18 Lock Completion + Evidence Dashboard Decision Ledger';
const PUBLIC_LABEL = 'v1.4.0-alpha.19 Evidence Dashboard Decision Ledger';
const LOCKED_ALPHA18 = '1.4.0-alpha.19';
const LOCKED_ALPHA18_TITLE = 'v1.4.0-alpha.19 — Alpha.18 Lock Completion + Evidence Dashboard Decision Ledger';
const RUN_ID_ALPHA18 = '26660959763';
const COMMIT_ALPHA18 = '4e2c852fa0568fcc12881d7565ba9fd50844e0c4';
const TARGET_MODULE = 'src/research/evidence-dashboard-decision-ledger.js';
const TARGET_CHECK = 'tests/evidence-dashboard-decision-ledger-lock-completion-check.mjs';

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
assert.ok(pkg.description.includes(LOCKED_ALPHA18_TITLE));
assert.ok(pkg.description.includes(RUN_ID_ALPHA18));
assert.ok(pkg.description.includes(COMMIT_ALPHA18));
assert.equal(manifest.version, VERSION);
assert.equal(manifest.release_title, RELEASE);
assert.equal(ciRegistry.ci_gate_registry_version, VERSION);
assert.equal(ciRegistry.release_title, RELEASE);
assert.equal(versionRegistry.version_suite_registry_version, VERSION);
assert.equal(versionRegistry.release_title, RELEASE);
assert.equal(evidenceConfig.internal_build_version, VERSION);
assert.equal(evidenceConfig.public_version_label, PUBLIC_LABEL);

for (const [name, text] of Object.entries({ current, roadmap, changelog, releaseHistory, releaseEvidence, qa, readme, publicDemo })) {
  assert.ok(text.includes(RELEASE) || text.includes(PUBLIC_LABEL), `${name} must expose alpha.19 current identity`);
  assert.ok(text.includes(LOCKED_ALPHA18_TITLE), `${name} must record locked alpha.18 baseline`);
  assert.ok(text.includes(RUN_ID_ALPHA18), `${name} must record alpha.18 run id`);
  assert.ok(text.includes(COMMIT_ALPHA18), `${name} must record alpha.18 commit`);
  assert.ok(/decision ledger|سجل قرارات|registre de décision/i.test(text), `${name} must describe decision-ledger actionability`);
}

assert.ok(current.includes('Status: current candidate. Lock is pending green no-browser CI'), 'alpha.19 must be current candidate before its own lock');
assert.equal(/alpha\.18[^\n.]*lock pending/i.test(current), false, 'current release must not contain alpha.18 lock pending wording');
assert.equal(/alpha\.18[^\n.]*Lock is pending/i.test(current), false, 'current release must not contain alpha.18 Lock is pending wording');
assert.equal((roadmap.match(/Current candidate/g) || []).length, 1, 'roadmap must have exactly one current candidate section');

assert.ok(index.includes(PUBLIC_LABEL));
assert.ok(helpers.includes(PUBLIC_LABEL));
assert.ok(index.includes('content="1.4.0-alpha.19"'));
assert.ok(index.includes('src="src/research/evidence-dashboard-decision-ledger.js" defer'));
assert.ok(index.includes('data-browser-qa="evidence-dashboard-decision-ledger"'));
assert.ok(helpers.includes('Evidence Dashboard Decision Ledger'));
assert.ok(helpers.includes('سجل قرارات لوحة الأدلة'));
assert.ok(helpers.includes('Registre de décision du tableau preuves'));
assert.ok(workflow.includes('lock-evidence-bundle_1.4.0-alpha.19_${{ github.run_id }}'));
assert.ok(workflow.includes("summary.internal_build_version !== '1.4.0-alpha.19'"));

for (const gate of ['no-browser','current-no-browser','release']) {
  assert.ok(ciRegistry.gates[gate].node_checks.includes(TARGET_CHECK), `${gate} must run alpha.19 decision-ledger check`);
}
assert.ok(ciRegistry.syntax_matrix.files.includes(TARGET_CHECK));
assert.ok(ciRegistry.syntax_matrix.files.includes(TARGET_MODULE));

const modules = load(TARGET_MODULE);
assert.ok(modules.evidenceDashboardDecisionLedger, 'decision ledger module must be registered');
const ledger = modules.evidenceDashboardDecisionLedger;
assert.equal(ledger.VERSION, VERSION);
assert.equal(ledger.MILESTONE, RELEASE);
assert.equal(ledger.LOCKED_BASELINE, LOCKED_ALPHA18);
assert.equal(ledger.LOCKED_BASELINE_RUN_ID, RUN_ID_ALPHA18);
assert.equal(ledger.LOCKED_BASELINE_COMMIT, COMMIT_ALPHA18);
assert.equal(ledger.ACTIONABILITY_BASELINE, LOCKED_ALPHA18);
assert.equal(ledger.REGRESSION_DASHBOARD_BASELINE, '1.4.0-alpha.17');
assert.equal(ledger.EVIDENCE_BUDGET_BASELINE, '1.4.0-alpha.16');
assert.equal(ledger.MODEL, 'evidence_dashboard_decision_ledger.v1');
assert.equal(ledger.LOCKED_ALPHA18_OBSERVED.no_browser_checks, 147);
assert.equal(ledger.LOCKED_ALPHA18_OBSERVED.browser_checks, 17);
assert.equal(ledger.LOCKED_ALPHA18_OBSERVED.lockable, true);

const pass = ledger.buildEvidenceDashboardDecisionLedger({ dashboard_status:'pass' });
assert.equal(pass.decision_summary.decision_state, 'lock_review_ready');
assert.equal(pass.decision_summary.lock_review_ready, true);
assert.ok(pass.recommended_operator_actions.includes('lock_review_ready'));
assert.equal(pass.decision_ledger_entries.length, 4);
assert.ok(pass.decision_ledger_entries.every((entry) => entry.checksum.startsWith('fnv1a32:')));
assert.equal(ledger.validateDashboardDecisionLedgerSafety(pass).ok, true);

const warn = ledger.buildEvidenceDashboardDecisionLedger({ status_summary:{ overall_dashboard_status:'warn' } });
assert.equal(warn.decision_summary.decision_state, 'review_budget_pressure_before_lock');
assert.equal(warn.decision_summary.budget_pressure_requires_review, true);

const fail = ledger.buildEvidenceDashboardDecisionLedger({ dashboard_status:'fail' });
assert.equal(fail.decision_summary.decision_state, 'block_lock_until_evidence_budget_regression_fixed');
assert.equal(fail.decision_summary.lock_blocked, true);

const missing = ledger.buildEvidenceDashboardDecisionLedger({});
assert.equal(missing.decision_summary.decision_state, 'capture_current_evidence_before_lock');
assert.equal(missing.decision_summary.evidence_capture_required, true);

const unsafeKeys = [
  ['raw','credentials'], ['raw','tokens'], ['raw','api','keys'], ['authorization','headers'], ['authorization','header'],
  ['raw','request','body'], ['raw','response','body'], ['raw','source','fetch','results'], ['raw','network','trace'],
  ['browser','session','secrets'], ['provider','secret','value'], ['access','token'], ['refresh','token'], ['api','key'], ['bearer','token']
].map((parts) => parts.join('_'));
for (const key of unsafeKeys) {
  const unsafe = Object.assign({}, pass, { [key]:'unsafe' });
  const validation = ledger.validateDashboardDecisionLedgerSafety(unsafe);
  assert.equal(validation.ok, false, `unsafe key must fail: ${key}`);
  assert.ok(validation.forbidden_present.some((finding) => finding.includes(key)), `unsafe key must be reported: ${key}`);
}

for (const forbidden of ['fetch(', 'XMLHttpRequest', 'WebSocket', 'navigator.sendBeacon', 'localStorage.setItem', 'sessionStorage.setItem', 'sk-', 'ghp_', 'AKIA', 'BEGIN PRIVATE KEY', 'Bear' + 'er ']) {
  assert.equal(source.includes(forbidden), false, `target source must not contain forbidden token ${forbidden}`);
}
for (const forbidden of [['access','token'], ['refresh','token'], ['api','key'], ['bearer','token'], ['raw','credentials'], ['raw','tokens'], ['raw','api','keys']].map((parts) => parts.join('_'))) {
  assert.equal(source.includes(forbidden), false, `target source must not contain forbidden field literal ${forbidden}`);
}

console.log('Evidence dashboard decision ledger and alpha.18 lock-completion checks passed.');
process.exit(0);
