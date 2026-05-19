import { VERSION, RELEASE_TITLE, packageScripts, registry, gateCount, writeJson, writeMarkdown } from './dev-utils.mjs';

const reg = registry();
const summary = {
  baseline_version: VERSION,
  release_title: RELEASE_TITLE,
  generated_at: new Date().toISOString(),
  package_script_count: packageScripts().length,
  package_scripts: packageScripts(),
  ci_gate_registry_version: reg.ci_gate_registry_version,
  gate_counts: gateCount(),
  golden_contracts: [
    'manual/private mode remains first-class',
    'no runtime/provider/OAuth/backend/source/storage behavior change',
    'hosted evidence visual artifact guard remains active',
    'visible-text snapshots cover ar/fr/en',
    'language gates reject unintended English fallback copy',
    'fixture registry payload compression remains active',
    'Node 24 CI compatibility remains preserved'
  ]
};
writeJson('dist/golden-baseline-summary.json', summary);
writeMarkdown('dist/golden-baseline-summary.md', 'Golden Baseline Summary', [
  `Version: ${summary.baseline_version}`,
  `Release: ${summary.release_title}`,
  `Package scripts: ${summary.package_script_count}`,
  '',
  '## Golden contracts',
  ...summary.golden_contracts.map((item) => `- ${item}`)
]);
console.log(`Golden baseline written for ${VERSION}.`);
