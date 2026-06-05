import fs from 'node:fs';

const fail = (message) => {
  console.error('Module boundary regression guard failed: ' + message);
  process.exit(1);
};

const read = (file) => fs.readFileSync(file, 'utf8');
const exists = (file) => fs.existsSync(file);

const ENGINE_MAX_BYTES = 185000;

const extractedModules = [
  {
    file: 'src/research/evidence-review-renderer.js',
    key: 'evidenceReviewRenderer',
    exports: ['renderEvidenceReviewQueue']
  },
  {
    file: 'src/research/provider-harness-renderer.js',
    key: 'providerHarnessRenderer',
    exports: ['renderProviderHarness']
  },
  {
    file: 'src/research/quality-renderer.js',
    key: 'qualityRenderer',
    exports: ['renderQuality']
  },
  {
    file: 'src/research/workflow-packet-importer.js',
    key: 'workflowPacketImporter',
    exports: ['importWorkflowPacket']
  },
  {
    file: 'src/research/critique-builder.js',
    key: 'critiqueBuilder',
    exports: ['buildCritique']
  }
];

for (const mod of extractedModules) {
  if (!exists(mod.file)) fail('missing extracted module: ' + mod.file);

  const source = read(mod.file);

  if (!source.includes('Jarbou3iResearchModules.' + mod.key)) {
    fail(mod.file + ' does not register Jarbou3iResearchModules.' + mod.key);
  }

  for (const exported of mod.exports) {
    if (!source.includes(exported)) {
      fail(mod.file + ' missing expected exported symbol: ' + exported);
    }
  }
}

const index = read('index.html');
const engineScriptPos = index.indexOf('src="src/research-engine.js" defer');
if (engineScriptPos < 0) fail('index.html missing research-engine.js script tag');

for (const mod of extractedModules) {
  const scriptPos = index.indexOf('src="' + mod.file + '" defer');
  if (scriptPos < 0) fail('index.html missing script tag for ' + mod.file);
  if (scriptPos > engineScriptPos) fail(mod.file + ' must load before research-engine.js');
}

const engine = read('src/research-engine.js');
const engineBytes = Buffer.byteLength(engine, 'utf8');

if (engineBytes >= ENGINE_MAX_BYTES) {
  fail('research-engine.js exceeds module-boundary ceiling: ' + engineBytes + ' >= ' + ENGINE_MAX_BYTES);
}

for (const mod of extractedModules) {
  if (!engine.includes('modules.' + mod.key)) {
    fail('research-engine.js does not delegate to modules.' + mod.key);
  }
}

const qualityRenderer = read('src/research/quality-renderer.js');
for (const token of [
  'sourcePlanningScore',
  'sourceImportScore',
  'attentionSignalIntegrityScore',
  'sourcePolicyScore',
  'evidenceScoringReport',
  'evidenceReviewScore'
]) {
  if (!qualityRenderer.includes(token)) {
    fail('quality-renderer missing moved quality token: ' + token);
  }
}

const researchUiSurface = [
  engine,
  read('src/research/evidence-review-renderer.js'),
  read('src/research/source-to-brief-workbench.js'),
  read('src/research/source-to-brief-operator-renderer.js')
].join('\n');

for (const token of ['reviewLaneGrid', 'reviewNextActions', 'export_throughput_gate']) {
  if (!researchUiSurface.includes(token)) {
    fail('research UI modular surface missing moved UI token: ' + token);
  }
}

const movedTokens = [
  'sourcePlanningScore',
  'sourceImportScore',
  'attentionSignalIntegrityScore',
  'sourcePolicyScore',
  'evidenceScoringReport',
  'evidenceReviewScore',
  'reviewLaneGrid',
  'reviewNextActions',
  'export_throughput_gate'
];

const testFiles = fs.readdirSync('tests')
  .filter((file) => file.endsWith('.mjs'))
  .map((file) => 'tests/' + file)
  .filter((file) => file !== 'tests/module-boundary-regression-guard-check.mjs');

for (const file of testFiles) {
  const source = read(file);

  for (const token of movedTokens) {
    const hasEngineOnlyAssertion =
      source.includes("researchApp.includes('" + token + "')") ||
      source.includes('researchApp.includes("' + token + '")') ||
      source.includes("engine.includes('" + token + "')") ||
      source.includes('engine.includes("' + token + '")');

    if (!hasEngineOnlyAssertion) continue;

    const hasModularSurface =
      source.includes('researchQualitySurface.includes') ||
      source.includes('researchUiSurface.includes');

    if (!hasModularSurface) {
      fail(file + ' has engine-only assertion for moved token: ' + token);
    }
  }
}

console.log('Module boundary regression guard checks passed.');
process.exit(0);
