import assert from 'node:assert/strict';
import fs from 'node:fs';
for (const file of ['docs/golden-baseline-inventory.md','docs/source-refactor-partition-plan.md','docs/localization-regression-matrix.md']) {
  assert.ok(fs.existsSync(file), `${file} must exist`);
  const text=fs.readFileSync(file,'utf8');
  assert.ok(text.includes('1.1.0-fix.1') || text.includes('v1.1.0'));
}
const baseline=fs.readFileSync('docs/golden-baseline-inventory.md','utf8');
for (const token of ['manual/private mode','visible-text snapshots','Fixture Registry payload compression','Node 24 CI compatibility']) assert.ok(baseline.includes(token), token);
const partition=fs.readFileSync('docs/source-refactor-partition-plan.md','utf8');
for (const token of ['src/app.js','src/research-engine.js','src/styles.css','No source-file refactor yet']) assert.ok(partition.includes(token), token);
console.log('Golden baseline automation checks passed.');
