import { VERSION, changedFilesFromArgs, impactForFiles, writeJson, writeMarkdown } from './dev-utils.mjs';

const files = changedFilesFromArgs();
const impacts = impactForFiles(files);
const allGates = [...new Set(impacts.flatMap((impact) => impact.gates))];
const summary = {
  impact_version: VERSION,
  generated_at: new Date().toISOString(),
  changed_files: files,
  impacted_files: impacts,
  required_gates: allGates,
  status: files.length ? 'impact_mapped' : 'no_changed_files_supplied'
};
writeJson('dist/dev-impact-summary.json', summary);
writeMarkdown('dist/dev-impact-summary.md', 'Dev Impact Summary', [
  `Version: ${VERSION}`,
  `Status: ${summary.status}`,
  '',
  '## Changed files',
  ...(files.length ? files.map((file) => `- ${file}`) : ['- none supplied']),
  '',
  '## Required gates',
  ...(allGates.length ? allGates.map((gate) => `- ${gate}`) : ['- none inferred'])
]);
console.log(`Dev impact mapped: ${files.length} file(s), ${allGates.length} gate(s).`);
