import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const VERSION = '1.4.0-alpha.22';
const RELEASE = 'v1.4.0-alpha.22 — Alpha.21 Lock Completion + Handoff Productivity Command Center';
const PUBLIC_LABEL = 'v1.4.0-alpha.22 Handoff Productivity Command Center';
const LOCKED_ALPHA21 = '1.4.0-alpha.21';
const LOCKED_ALPHA21_TITLE = 'v1.4.0-alpha.21 — Evidence Handoff Readiness Checklist';
const RUN_ID_ALPHA21 = '26681464045';
const COMMIT_ALPHA21 = '81675392a202ff1b175a8de62f6dbcd10962395e';
const TARGET_MODULE = 'src/research/handoff-productivity-command-center.js';
const TARGET_CHECK = 'tests/handoff-productivity-command-center-lock-completion-check.mjs';

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
assert.ok(pkg.description.includes(LOCKED_ALPHA21_TITLE));
assert.ok(pkg.description.includes(RUN_ID_ALPHA21));
assert.ok(pkg.description.includes(COMMIT_ALPHA21));
assert.equal(manifest.version, VERSION);
assert.equal(manifest.release_title, RELEASE);
assert.equal(ciRegistry.ci_gate_registry_version, VERSION);
assert.equal(ciRegistry.release_title, RELEASE);
assert.equal(versionRegistry.version_suite_registry_version, VERSION);
assert.equal(versionRegistry.release_title, RELEASE);
assert.equal(evidenceConfig.internal_build_version, VERSION);
assert.equal(evidenceConfig.public_version_label, PUBLIC_LABEL);

for (const [name, text] of Object.entries({ current, roadmap, changelog, releaseHistory, releaseEvidence, qa, readme, publicDemo })) {
  assert.ok(text.includes(RELEASE) || text.includes(PUBLIC_LABEL), `${name} must expose alpha.22 current identity`);
  assert.ok(text.includes(LOCKED_ALPHA21_TITLE), `${name} must record locked alpha.21 baseline`);
  assert.ok(text.includes(RUN_ID_ALPHA21), `${name} must record alpha.21 run id`);
  assert.ok(text.includes(COMMIT_ALPHA21), `${name} must record alpha.21 commit`);
  assert.ok(/handoff productivity command center|مركز إنتاجية التسليم|centre de productivité/i.test(text), `${name} must describe handoff productivity command center`);
}

assert.ok(current.includes('Status: current candidate. Lock is pending green no-browser CI'), 'alpha.22 must be current candidate before its own lock');
assert.equal(/alpha\.21[^\n.]*lock pending/i.test(current), false, 'current release must not contain alpha.21 lock pending wording');
assert.equal((roadmap.match(/Current candidate/g) || []).length, 1, 'roadmap must have exactly one current candidate section');

assert.ok(index.includes(PUBLIC_LABEL));
assert.ok(helpers.includes(PUBLIC_LABEL));
assert.ok(index.includes('content="1.4.0-alpha.22"'));
assert.ok(index.includes('src="src/research/handoff-productivity-command-center.js" defer'));
assert.ok(index.includes('data-browser-qa="handoff-productivity-command-center"'));
assert.ok(helpers.includes('Handoff Productivity Command Center'));
assert.ok(helpers.includes('مركز إنتاجية التسليم'));
assert.ok(helpers.includes('Centre de productivité de remise'));
assert.ok(workflow.includes('lock-evidence-bundle_1.4.0-alpha.22_${{ github.run_id }}'));
assert.ok(workflow.includes("summary.internal_build_version !== '1.4.0-alpha.22'"));

for (const gate of ['no-browser','current-no-browser','release']) {
  assert.ok(ciRegistry.gates[gate].node_checks.includes(TARGET_CHECK), `${gate} must run alpha.22 handoff productivity check`);
}
assert.ok(ciRegistry.syntax_matrix.files.includes(TARGET_CHECK));
assert.ok(ciRegistry.syntax_matrix.files.includes(TARGET_MODULE));

const modules = load(TARGET_MODULE);
assert.ok(modules.handoffProductivityCommandCenter, 'handoff productivity command center module must be registered');
const center = modules.handoffProductivityCommandCenter;
assert.equal(center.VERSION, VERSION);
assert.equal(center.MILESTONE, RELEASE);
assert.equal(center.LOCKED_BASELINE, LOCKED_ALPHA21);
assert.equal(center.LOCKED_BASELINE_RUN_ID, RUN_ID_ALPHA21);
assert.equal(center.LOCKED_BASELINE_COMMIT, COMMIT_ALPHA21);
assert.equal(center.READINESS_CHECKLIST_BASELINE, LOCKED_ALPHA21);
assert.equal(center.HANDOFF_AUDIT_BASELINE, '1.4.0-alpha.20');
assert.equal(center.DECISION_LEDGER_BASELINE, '1.4.0-alpha.19');
assert.equal(center.ACTIONABILITY_BASELINE, '1.4.0-alpha.18');
assert.equal(center.REGRESSION_DASHBOARD_BASELINE, '1.4.0-alpha.17');
assert.equal(center.EVIDENCE_BUDGET_BASELINE, '1.4.0-alpha.16');
assert.equal(center.MODEL, 'handoff_productivity_command_center.v1');
assert.equal(center.LOCKED_ALPHA21_OBSERVED.no_browser_checks, 150);
assert.equal(center.LOCKED_ALPHA21_OBSERVED.browser_checks, 17);
assert.equal(center.LOCKED_ALPHA21_OBSERVED.lockable, true);

const passingEvidence = Object.fromEntries(center.REQUIRED_PRODUCTIVITY_SIGNALS.map((item, index) => [item, { status:'pass', minutes_saved_estimate:index + 1 }]));
const pass = center.buildHandoffProductivityCommandCenter({ current_evidence: passingEvidence });
assert.equal(pass.overall_productivity_status, 'pass');
assert.ok(pass.recommended_operator_actions.includes('execute_lock_review_sequence'));
assert.equal(pass.productivity_signals.length, center.REQUIRED_PRODUCTIVITY_SIGNALS.length);
assert.ok(pass.productivity_signals.every((entry) => entry.checksum.startsWith('fnv1a32:')));
assert.ok(pass.operator_priority_queue.every((entry) => entry.checksum.startsWith('fnv1a32:')));
assert.equal(center.validateProductivityCommandCenterSafety(pass).ok, true);
assert.ok(pass.total_estimated_minutes_saved > 0);

const warn = center.buildHandoffProductivityCommandCenter({ current_evidence: Object.assign({}, passingEvidence, { evidence_budget_status:{ status:'warn', minutes_saved_estimate:12, note:'near ceiling' } }) });
assert.equal(warn.overall_productivity_status, 'warn');
assert.ok(warn.recommended_operator_actions.includes('triage_budget_pressure_first'));
assert.equal(warn.top_priority_signal, 'evidence_budget_status');

const fail = center.buildHandoffProductivityCommandCenter({ current_evidence: Object.assign({}, passingEvidence, { artifact_identity_status:false }) });
assert.equal(fail.overall_productivity_status, 'fail');
assert.ok(fail.recommended_operator_actions.includes('repair_blocking_handoff_defects_first'));
assert.ok(fail.blocking_signals.includes('artifact_identity_status'));

const missing = center.buildHandoffProductivityCommandCenter({});
assert.equal(missing.overall_productivity_status, 'review_required');
assert.ok(missing.recommended_operator_actions.includes('capture_missing_handoff_evidence_first'));
assert.ok(missing.review_required_signals.length >= 1);

const unsafeKeys = [
  ['raw','credentials'], ['raw','tokens'], ['raw','api','keys'], ['authorization','headers'], ['authorization','header'],
  ['raw','request','body'], ['raw','response','body'], ['raw','source','fetch','results'], ['raw','network','trace'],
  ['browser','session','secrets'], ['provider','secret','value'], ['access','token'], ['refresh','token'], ['api','key'], ['bearer','token']
].map((parts) => parts.join('_'));
for (const key of unsafeKeys) {
  const unsafe = Object.assign({}, pass, { [key]:'unsafe' });
  const validation = center.validateProductivityCommandCenterSafety(unsafe);
  assert.equal(validation.ok, false, `unsafe key must fail: ${key}`);
  assert.ok(validation.forbidden_present.some((finding) => finding.includes(key)), `unsafe key must be reported: ${key}`);
}

for (const forbidden of ['fetch(', 'XMLHttpRequest', 'WebSocket', 'navigator.sendBeacon', 'localStorage.setItem', 'sessionStorage.setItem', 'sk-', 'ghp_', 'AKIA', 'BEGIN PRIVATE KEY', 'Bear' + 'er ']) {
  assert.equal(source.includes(forbidden), false, `target source must not contain forbidden token ${forbidden}`);
}
for (const forbidden of [['access','token'], ['refresh','token'], ['api','key'], ['bearer','token'], ['raw','credentials'], ['raw','tokens'], ['raw','api','keys']].map((parts) => parts.join('_'))) {
  assert.equal(source.includes(forbidden), false, `target source must not contain forbidden field literal ${forbidden}`);
}

console.log('Handoff productivity command center and alpha.21 lock-completion checks passed.');
process.exit(0);
