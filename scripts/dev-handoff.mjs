import { VERSION, RELEASE_TITLE, changedFilesFromArgs, impactForFiles, writeJson, writeMarkdown } from './dev-utils.mjs';

const changed = changedFilesFromArgs();
const impacts = impactForFiles(changed);
const gates = [...new Set(impacts.flatMap((impact) => impact.gates))];
const summary = {
  handoff_version: VERSION,
  release_title: RELEASE_TITLE,
  generated_at: new Date().toISOString(),
  changed_files: changed,
  required_gates: gates,
  known_risks: [...new Set(impacts.flatMap((impact) => impact.risks))],
  not_run_gates: ['test:ci:browser when Playwright is unavailable locally'],
  next_action: 'Run npm run test:ci:no-browser and npm run test:ci:browser before lock.'
};
writeJson('dist/dev-handoff-summary.json', summary);
writeMarkdown('dist/dev-handoff-summary.md', 'Dev Handoff Summary', [
  `Version: ${VERSION}`,
  `Release: ${RELEASE_TITLE}`,
  '',
  '## Changed files',
  ...(changed.length ? changed.map((file) => `- ${file}`) : ['- none supplied']),
  '',
  '## Required gates',
  ...(gates.length ? gates.map((gate) => `- ${gate}`) : ['- npm run test:current:no-browser']),
  '',
  '## Next action',
  summary.next_action
]);
console.log(`Dev handoff written for ${VERSION}.`);
