import fs from 'node:fs';
import { VERSION, RELEASE_TITLE, packageScripts, registry, writeJson, writeMarkdown } from './dev-utils.mjs';

const reg = registry();
const issues = [];
if (packageScripts().length > 20) issues.push({ severity: 'high', code: 'script_surface_expanded', target: 'package.json' });
if (reg.ci_gate_registry_version !== VERSION) issues.push({ severity: 'high', code: 'registry_version_drift', target: 'tests/ci-gate-registry.json' });
for (const required of ['docs/golden-baseline-inventory.md','docs/localization-regression-matrix.md','docs/source-refactor-partition-plan.md']) {
  if (!fs.existsSync(required)) issues.push({ severity: 'medium', code: 'missing_baseline_doc', target: required });
}
const status = issues.some((issue) => issue.severity === 'high') ? 'fail' : 'pass';
const summary = {
  doctor_version: VERSION,
  release_title: RELEASE_TITLE,
  generated_at: new Date().toISOString(),
  status,
  package_script_count: packageScripts().length,
  likely_blockers: issues,
  fastest_next_command: status === 'pass' ? 'npm run test:current:no-browser' : 'npm run dev:impact -- <changed-file>'
};
writeJson('dist/dev-doctor-summary.json', summary);
writeMarkdown('dist/dev-doctor-summary.md', 'Dev Doctor Summary', [
  `Version: ${VERSION}`,
  `Status: ${status.toUpperCase()}`,
  `Fastest next command: ${summary.fastest_next_command}`,
  '',
  '## Likely blockers',
  ...(issues.length ? issues.map((issue) => `- ${issue.severity}: ${issue.code} (${issue.target})`) : ['- none detected'])
]);
console.log(`DEV DOCTOR — ${VERSION}: ${status.toUpperCase()}`);
