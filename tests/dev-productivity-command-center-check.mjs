import assert from 'node:assert/strict';
import fs from 'node:fs';
import { spawnSync } from 'node:child_process';
const pkg = JSON.parse(fs.readFileSync('package.json','utf8'));
for (const script of ['dev:doctor','dev:baseline','dev:impact','dev:handoff']) assert.ok(pkg.scripts[script], `missing ${script}`);
assert.ok(Object.keys(pkg.scripts).length <= 20, 'script surface must remain compressed');
for (const file of ['scripts/dev-utils.mjs','scripts/dev-doctor.mjs','scripts/dev-baseline.mjs','scripts/dev-impact.mjs','scripts/dev-handoff.mjs']) {
  assert.equal(spawnSync(process.execPath,['--check',file],{encoding:'utf8'}).status,0,`${file} syntax`);
}
fs.rmSync('dist',{recursive:true,force:true});
for (const [cmd,args,out] of [
  ['dev:doctor',[], 'dist/dev-doctor-summary.json'],
  ['dev:baseline',[], 'dist/golden-baseline-summary.json'],
  ['dev:impact',['src/research/render-helpers.js'], 'dist/dev-impact-summary.json'],
  ['dev:handoff',['src/research/render-helpers.js'], 'dist/dev-handoff-summary.json']
]) {
  const result=spawnSync('npm',['run',cmd,'--',...args],{encoding:'utf8'});
  assert.equal(result.status,0,result.stderr||result.stdout);
  assert.ok(fs.existsSync(out), `${cmd} must write ${out}`);
}
const doctor=JSON.parse(fs.readFileSync('dist/dev-doctor-summary.json','utf8'));
assert.equal(doctor.doctor_version,'1.1.0-alpha.13');
assert.equal(doctor.status,'pass');
const impact=JSON.parse(fs.readFileSync('dist/dev-impact-summary.json','utf8'));
assert.ok(impact.required_gates.includes('language-description-audit-check'));
fs.rmSync('dist',{recursive:true,force:true});
console.log('Dev productivity command center checks passed.');
