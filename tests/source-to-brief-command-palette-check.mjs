import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const VERSION = '1.3.0';
const filesToLoad = [
  'src/research/evidence-workspace-ux.js',
  'src/research/operator-command-palette.js',
  'src/research/source-to-brief-workbench.js',
  'src/research/export-pack.js'
];
const context = {console, TextEncoder, window:{Jarbou3iResearchModules:{}}, globalThis:null};
context.globalThis = context;
vm.createContext(context);
for (const file of filesToLoad) vm.runInContext(fs.readFileSync(file, 'utf8'), context, {filename:file});

const modules = context.window.Jarbou3iResearchModules;
const paletteApi = modules.operatorCommandPalette;
const workbenchApi = modules.sourceToBriefWorkbench;
const exportPack = modules.exportPack;

assert.equal(paletteApi.VERSION, VERSION);
assert.equal(workbenchApi.VERSION, VERSION);
assert.equal(exportPack.EXPORT_PACK_VERSION, VERSION);
assert.equal(typeof paletteApi.buildOperatorCommandPalette, 'function');
assert.equal(typeof paletteApi.buildReviewNavigationShortcuts, 'function');

const evidence = [
  {evidence_id:'E1', claim:'Official source supports I1', source_title:'Official source', source_type:'official', source_url:'https://example.com/official', source_date:'2026-01-02', supports:['I1'], contradicts:[], confidence:'high', evidence_strength:4},
  {evidence_id:'E2', claim:'Counter source contradicts I1', source_title:'Counter source', source_type:'academic', source_url:'https://example.com/counter', source_date:'2026-01-03', supports:[], contradicts:['I1'], confidence:'medium', evidence_strength:3}
];
const packet = {
  workflow_version:VERSION,
  research_plan:{topic:'Alpha6 navigation topic'},
  evidence_matrix:evidence,
  evidence_review_queue:[{review_id:'RQ1', status:'pending', created_at:'2026-01-03T00:00:00.000Z', evidence:evidence[0]}],
  causal_links:[{from:'I1', to:'N1', relationship:'contradicts', evidence_ids:['E2'], confidence:'medium'}],
  analysis_brief:{topic:'Alpha6 navigation topic', handoff_summary:'Manual navigation handoff.', source_clusters:[{cluster_id:'CL1', target_id:'I1', evidence_ids:['E1','E2']}]},
  privacy_export:{release_gate:'pass'}
};
const workbench = workbenchApi.buildSourceToBriefWorkbench(packet, {version:VERSION, now:'2026-05-23T00:00:00.000Z'});
assert.ok(workbench.operator_command_palette, 'operator command palette missing');
assert.equal(workbench.operator_command_palette.command_palette_version, VERSION);
assert.equal(workbench.operator_command_palette.command_palette_model, 'operator_command_palette.v1');
assert.ok(workbench.operator_command_palette.commands.some((command)=>command.command_id === 'cmd_open_evidence_cards' && command.shortcut === 'G E'));
assert.ok(workbench.operator_command_palette.commands.some((command)=>command.command_id === 'cmd_open_decision_ledger' && command.target === 'review-decision-ledger'));
assert.equal(workbench.operator_command_palette.live_fetching_performed, false);
assert.equal(workbench.operator_command_palette.provider_execution_expanded, false);
assert.equal(workbench.operator_command_palette.automatic_source_verification_claimed, false);
assert.ok(workbench.review_navigation_shortcuts, 'review navigation shortcuts missing');
assert.equal(workbench.review_navigation_shortcuts.review_navigation_shortcuts_version, VERSION);
assert.equal(workbench.review_navigation_shortcuts.shortcut_model, 'review_navigation_shortcuts.v1');
assert.ok(workbench.review_navigation_shortcuts.shortcuts.some((shortcut)=>shortcut.shortcut === 'G L' && shortcut.target === 'review-decision-ledger'));
assert.equal(workbench.review_navigation_shortcuts.queue_bypass_enabled, false);

const pack = exportPack.createExportPack(Object.assign({}, packet, {source_to_brief_workbench:workbench}), {version:VERSION});
const paths = pack.files.map((file)=>file.path);
assert.ok(paths.includes('source-to-brief/operator-command-palette.json'), 'operator command palette export missing');
assert.ok(paths.includes('source-to-brief/review-navigation-shortcuts.json'), 'review navigation shortcuts export missing');
const exportedPalette = JSON.parse(pack.files.find((file)=>file.path === 'source-to-brief/operator-command-palette.json').content);
assert.equal(exportedPalette.shortcut_capture_boundary, 'navigation_only_no_mutation_except_existing_export_button');
assert.equal(exportedPalette.automatic_source_verification_claimed, false);

const renderer = fs.readFileSync('src/research/source-to-brief-operator-renderer.js','utf8');
for (const marker of ['operatorCommandPaletteTitle','reviewNavigationShortcutsTitle','operatorCommandGrid','reviewNavigationShortcutList','data-source-brief-command']) assert.ok(renderer.includes(marker), `renderer missing ${marker}`);
const engine = fs.readFileSync('src/research-engine.js','utf8');
for (const marker of ['modules.operatorCommandPalette','operatorCommandPalette?.installNavigation']) assert.ok(engine.includes(marker), `engine missing ${marker}`);
const helpers = fs.readFileSync('src/research/render-helpers.js','utf8');
for (const marker of ['Operator command palette','لوحة أوامر المشغّل','Palette de commandes opérateur','Review navigation shortcuts']) assert.ok(helpers.includes(marker), `localized copy missing ${marker}`);
for (const marker of ['v1.4.0-alpha.6 معادلة مسار التنفيذ الوهمي مع مسار التنفيذ الحي للمزوّد · تخطيط وفحص قبلي فقط', 'v1.4.0-alpha.6 Équivalence mock-vers-live du harnais d’exécution fournisseur · planification/prévol uniquement']) assert.ok(helpers.includes(marker), `localized alpha.1 public label missing ${marker}`);
const styles = fs.readFileSync('src/styles.css','utf8');
for (const marker of ['operatorCommandPalettePanel','operatorCommandGrid','reviewNavigationShortcutList','operatorNavPulse']) assert.ok(styles.includes(marker), `styles missing ${marker}`);

const serialized = JSON.stringify(workbench) + JSON.stringify(pack.manifest);
for (const forbidden of ['live_scraping_enabled:true','automatic_source_verification_claimed:true','provider_execution_expanded:true','production_oauth_enabled:true','queue_bypass_enabled:true']) assert.equal(serialized.includes(forbidden), false, `forbidden capability marker present: ${forbidden}`);

console.log('Source-to-brief command palette checks passed.');
