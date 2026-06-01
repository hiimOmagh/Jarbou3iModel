import assert from 'node:assert/strict';
import fs from 'node:fs';
import { spawnSync } from 'node:child_process';

const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const expectedScripts = {
  'dev:doctor': 'node scripts/dev-doctor.mjs',
  'dev:baseline': 'node scripts/dev-baseline.mjs',
  'dev:impact': 'node scripts/dev-impact.mjs',
  'dev:handoff': 'node scripts/dev-handoff.mjs'
};

for (const [script, command] of Object.entries(expectedScripts)) {
  assert.equal(pkg.scripts[script], command, `${script} must stay mapped to ${command}`);
}
assert.ok(Object.keys(pkg.scripts).length <= 20, 'script surface must remain compressed');

for (const file of ['scripts/dev-utils.mjs', 'scripts/dev-doctor.mjs', 'scripts/dev-baseline.mjs', 'scripts/dev-impact.mjs', 'scripts/dev-handoff.mjs']) {
  const syntax = spawnSync(process.execPath, ['--check', file], { encoding: 'utf8' });
  assert.equal(syntax.status, 0, syntax.stderr || syntax.stdout || `${file} syntax`);
}

fs.rmSync('dist', { recursive: true, force: true });
for (const [scriptFile, args, out] of [
  ['scripts/dev-doctor.mjs', [], 'dist/dev-doctor-summary.json'],
  ['scripts/dev-baseline.mjs', [], 'dist/golden-baseline-summary.json'],
  ['scripts/dev-impact.mjs', ['src/research/render-helpers.js'], 'dist/dev-impact-summary.json'],
  ['scripts/dev-handoff.mjs', ['src/research/render-helpers.js'], 'dist/dev-handoff-summary.json']
]) {
  const result = spawnSync(process.execPath, [scriptFile, ...args], {
    encoding: 'utf8',
    cwd: process.cwd(),
    windowsHide: true,
    timeout: 60000
  });
  assert.equal(result.status, 0, result.stderr || result.stdout || `${scriptFile} failed`);
  assert.ok(fs.existsSync(out), `${scriptFile} must write ${out}`);
}

const doctor = JSON.parse(fs.readFileSync('dist/dev-doctor-summary.json', 'utf8'));
assert.equal(doctor.doctor_version, '1.4.0-alpha.33');
assert.equal(doctor.status, 'pass');
const impact = JSON.parse(fs.readFileSync('dist/dev-impact-summary.json', 'utf8'));
assert.ok(impact.required_gates.includes('language-description-audit-check'));
fs.rmSync('dist', { recursive: true, force: true });
console.log('Dev productivity command center checks passed.');
process.exit(0);
