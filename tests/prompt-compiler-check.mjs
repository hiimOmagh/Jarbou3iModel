import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const VERSION = '1.1.0-rc.1-copyfix.1';
const source = fs.readFileSync('src/research/prompt-compiler.js', 'utf8');
new vm.Script(source, { filename: 'src/research/prompt-compiler.js' });
const context = { console, window: {} };
context.globalThis = context;
context.window = context;
vm.createContext(context);
vm.runInContext(source, context, { filename: 'src/research/prompt-compiler.js' });
const compiler = context.Jarbou3iResearchModules.promptCompiler;
assert.equal(compiler.VERSION, VERSION);
assert.equal(typeof compiler.compile, 'function');
assert.equal(typeof compiler.toPlanSeed, 'function');

const compiled = compiler.compile({
  version: VERSION,
  topic: 'How do export controls reshape AI chip competition?',
  context: '2024-2026, US-China-EU technology policy',
  mode: 'source-heavy',
  template: {
    plan_questions: ['Which bottleneck controls the system?'],
    source_priorities: ['official regulations', 'company filings'],
    counter_evidence_targets: ['Evidence of policy evasion'],
    required_layers: ['interests','actors','tools','narrative','results','feedback']
  },
  now: '2026-05-19T00:00:00.000Z'
});
assert.equal(compiled.prompt_compiler_version, VERSION);
assert.equal(compiled.live_ai_used, false);
assert.equal(compiled.live_fetching_performed, false);
assert.equal(compiled.release_gate, 'local_template_prompt_compiler_only');
assert.ok(compiled.refined_thesis.includes('incentives'));
assert.ok(compiled.key_questions.length >= 5);
assert.ok(compiled.evidence_needs.includes('official regulations'));
assert.ok(compiled.counterarguments.some((item) => item.includes('policy evasion')));
assert.ok(compiled.disconfirming_conditions.length >= 3);
assert.ok(compiled.plan_quality_score >= 70);

const seed = compiler.toPlanSeed(compiled);
assert.equal(seed.live_ai_used, false);
assert.ok(seed.questions.length >= 5);
assert.ok(seed.target_sources.length >= 5);
assert.ok(seed.disconfirming_conditions.length >= 3);

const index = fs.readFileSync('index.html', 'utf8');
const engine = fs.readFileSync('src/research-engine.js', 'utf8');
const schema = JSON.parse(fs.readFileSync('schema/research-workflow.schema.json', 'utf8'));
const fixture = JSON.parse(fs.readFileSync('fixtures/research/sample-research-workflow-en.json', 'utf8'));
assert.ok(index.includes('id="compilePromptBtn"'), 'prompt compiler button must exist');
assert.ok(index.includes('id="promptCompilerOutput"'), 'prompt compiler output must exist');
assert.ok(index.includes('src="src/research/prompt-compiler.js" defer'), 'prompt compiler module must load');
assert.ok(engine.includes('modules.promptCompiler'), 'engine must use prompt compiler module');
assert.ok(engine.includes('compilePromptPlan'), 'engine must expose compilePromptPlan workflow');
assert.ok(schema.$defs.prompt_compiler, 'workflow schema must define prompt_compiler');
assert.ok(schema.$defs.research_plan.required.includes('prompt_compiler'), 'research plan must require prompt compiler metadata');
assert.equal(fixture.research_plan.prompt_compiler.prompt_compiler_version, VERSION);
assert.equal(fixture.research_plan.prompt_compiler.live_ai_used, false);
assert.equal(fixture.research_plan.prompt_compiler.live_fetching_performed, false);

console.log('Prompt compiler checks passed.');
process.exit(0);
