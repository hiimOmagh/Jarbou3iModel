import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import { CURRENT_RELEASE } from './current-release-identity.mjs';


const VERSION = '1.4.0-alpha.43';
const MILESTONE = CURRENT_RELEASE;
const MODULE = 'src/research/source-to-brief-operator-control-room.js';
const CHECK = 'tests/source-to-brief-operator-control-room-check.mjs';
const DEPENDENCIES = [
  'src/research/evidence-workspace-ux.js',
  'src/research/operator-command-palette.js',
  'src/research/guided-research-session.js',
  'src/research/brief-template-system.js',
  'src/research/source-to-brief-workbench.js',
  'src/research/source-to-brief-operator-continuity-console.js',
  MODULE
];

const sandbox = { console, TextEncoder, window: { Jarbou3iResearchModules: {} } };
sandbox.globalThis = sandbox;
vm.createContext(sandbox);
for (const file of DEPENDENCIES) vm.runInContext(fs.readFileSync(file, 'utf8'), sandbox, { filename: file });

const root = sandbox.window.Jarbou3iResearchModules;
const workbenchApi = root.sourceToBriefWorkbench;
const continuityApi = root.sourceToBriefOperatorContinuityConsole;
const mod = root.sourceToBriefOperatorControlRoom;
assert.ok(workbenchApi, 'source-to-brief workbench must remain available');
assert.ok(continuityApi, 'alpha.38 continuity console must remain available');
assert.ok(mod, 'alpha.39 source-to-brief operator control room module must be registered');
assert.equal(mod.VERSION, VERSION);
assert.equal(mod.MILESTONE, MILESTONE);
assert.equal(mod.MODEL, 'source_to_brief_operator_control_room.v1');
assert.equal(mod.SOURCE_TO_BRIEF_BASELINE, '1.3.0');
assert.equal(mod.CONTINUITY_CONSOLE_BASELINE, '1.4.0-alpha.38');
assert.equal(mod.COMPACT_NAVIGATION_BASELINE, '1.4.0-alpha.37');
assert.equal(typeof mod.buildSourceToBriefOperatorControlRoom, 'function');

const packet = {
  workflow_version:'1.3.0',
  research_mode:'source-heavy',
  research_plan:{ plan_version:'1.3.0', mode:'source-heavy', topic:'Control room topic', questions:['Which blockers prevent handoff?'], counter_evidence_targets:[{target_id:'N1', label:'Narrative needs falsifier'}] },
  evidence_matrix:[
    {evidence_id:'E1', claim:'Supported claim', source_title:'Official source', source_type:'official', source_url:'https://example.com/official', source_date:'2026-05-01', supports:['I1'], contradicts:[], confidence:'high', evidence_strength:5},
    {evidence_id:'E2', claim:'Contradiction source', source_title:'Academic source', source_type:'academic', source_url:'https://example.com/academic', source_date:'2026-05-02', supports:[], contradicts:['I1'], confidence:'high', evidence_strength:4},
    {evidence_id:'E3', claim:'Unlinked background', source_title:'Background note', source_type:'other', source_url:'', source_date:'unknown', supports:[], contradicts:[], confidence:'low', evidence_strength:1}
  ],
  causal_links:[{from:'A1', to:'I1', relationship:'motivates', evidence_ids:[], confidence:'low'}],
  scenarios:{items:[{id:'S1', name:'Scenario missing falsifier', probability:35, timeframe:'near term', drivers:['D1']}]},
  analysis_brief:{brief_version:'1.3.0', topic:'Control room topic', handoff_summary:'Manual control room handoff.'},
  privacy_export:{release_gate:'pass'}
};

const workbench = workbenchApi.buildSourceToBriefWorkbench(packet, {version:'1.3.0', now:'2026-06-01T16:00:00.000Z'});
const continuity = continuityApi.buildSourceToBriefOperatorContinuityConsole({ source_to_brief_workbench: workbench, generated_at:'2026-06-01T16:00:00.000Z' });
const controlRoom = mod.buildSourceToBriefOperatorControlRoom({ continuity_console: continuity, generated_at:'2026-06-01T16:00:00.000Z' });

assert.equal(controlRoom.targeted_hosted_evidence_capture_version, VERSION);
assert.equal(controlRoom.milestone, MILESTONE);
assert.equal(controlRoom.model, 'source_to_brief_operator_control_room.v1');
assert.equal(controlRoom.control_room_ready, true);
assert.equal(controlRoom.safe_metadata_only, true);
assert.ok(controlRoom.stage_board.length >= 5, 'control room must expose stage board');
assert.ok(controlRoom.stage_board.some((stage)=>stage.stage_id === 'evidence-gaps'), 'stage board must include evidence gaps');
assert.ok(controlRoom.intervention_lanes.length >= 5, 'control room must expose intervention lanes');
assert.ok(controlRoom.intervention_lanes.some((lane)=>lane.lane_id === 'evidence-gap-closure'), 'control room must include evidence-gap closure lane');
assert.ok(controlRoom.blocker_register.length >= 1, 'control room must expose blocker register');
assert.ok(controlRoom.blocker_register.some((blocker)=>blocker.mapped_lane === 'evidence-gap-closure'), 'blockers must map to intervention lanes');
assert.ok(controlRoom.readiness_scorecard.readiness_score >= 0, 'readiness scorecard must expose score');
assert.equal(controlRoom.readiness_scorecard.manual_review_required, true);
assert.equal(controlRoom.readiness_scorecard.safe_to_publish, false);
assert.ok(controlRoom.operator_runbook.length >= 5, 'operator runbook must expose ordered steps');
assert.ok(controlRoom.operator_runbook[0].instruction.includes('stage'), 'runbook must start with stage review');
assert.ok(controlRoom.next_operator_action.length > 10, 'control room must expose next operator action');
assert.equal(controlRoom.export_control_room_summary.manual_review_required, true);
assert.equal(controlRoom.export_control_room_summary.safe_to_publish, false);
assert.equal(controlRoom.export_control_room_summary.verification_claimed, false);
assert.equal(controlRoom.export_control_room_summary.signoff_performed, false);
assert.equal(controlRoom.export_control_room_summary.export_lock_performed, false);
assert.equal(controlRoom.export_control_room_summary.publication_permission_claimed, false);
assert.ok(controlRoom.manual_control_room_copy.includes('Source-to-brief operator control room verdict'), 'manual copy must summarize verdict');
assert.ok(controlRoom.manual_control_room_copy.includes('no live provider calls'), 'manual copy must restate no-live-provider boundary');
assert.equal(controlRoom.control_room_safety_contract.targeted_hosted_evidence_capture_only, true);
assert.equal(controlRoom.control_room_safety_contract.metadata_only, true);
assert.equal(controlRoom.control_room_safety_contract.no_auto_verification, true);
assert.equal(controlRoom.control_room_safety_contract.no_auto_signoff, true);
assert.equal(controlRoom.control_room_safety_contract.no_auto_export_lock, true);
assert.equal(controlRoom.boundary_flags.network_invocation_allowed, false);
assert.equal(controlRoom.boundary_flags.live_provider_execution_performed, false);
assert.equal(controlRoom.boundary_flags.live_source_fetching_performed, false);
assert.equal(controlRoom.boundary_flags.status_persistence_enabled, false);
assert.equal(controlRoom.boundary_flags.batch_mutation_enabled, false);
assert.equal(controlRoom.boundary_flags.navigation_state_persistence_enabled, false);
assert.equal(controlRoom.boundary_flags.publication_permission_claimed, false);

const index = fs.readFileSync('index.html', 'utf8');
assert.ok(index.includes('Targeted Hosted Evidence Capture'), 'index must expose current control room title');
assert.ok(index.includes('src="src/research/targeted-hosted-evidence-capture.js" defer'), 'index must load current control room module');
assert.ok(index.includes('data-browser-qa="targeted-hosted-evidence-capture"'), 'index must expose current control room browser QA surface');

const registry = JSON.parse(fs.readFileSync('tests/ci-gate-registry.json', 'utf8'));
for (const gate of ['no-browser', 'current-no-browser', 'source', 'release', 'browser']) {
  assert.ok(registry.gates[gate].node_checks.includes(CHECK), `${gate} must run source-to-brief operator control room check`);
}
assert.ok(registry.syntax_matrix.files.includes(MODULE), 'syntax matrix must cover control room module');
assert.ok(registry.syntax_matrix.files.includes(CHECK), 'syntax matrix must cover control room check');

console.log('Source-to-brief operator control room checks passed.');
