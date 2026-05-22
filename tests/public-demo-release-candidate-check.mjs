import assert from 'node:assert/strict';
import fs from 'node:fs';

const VERSION = '1.1.0-rc.0';
const RELEASE = 'v1.1.0-rc.0 — Public Demo Release Candidate';
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const registry = JSON.parse(fs.readFileSync('tests/ci-gate-registry.json', 'utf8'));
const index = fs.readFileSync('index.html', 'utf8');
const current = fs.readFileSync('docs/current-release.md', 'utf8');
const publicDemo = fs.readFileSync('PUBLIC_DEMO.md', 'utf8');
const roadmap = fs.readFileSync('docs/roadmap.md', 'utf8');
const qa = fs.readFileSync('docs/qa-matrix.md', 'utf8');

assert.equal(pkg.version, VERSION);
assert.equal(registry.ci_gate_registry_version, VERSION);
assert.equal(registry.release_title, RELEASE);
assert.ok(index.includes(`v${VERSION} · Public Demo Release Candidate`), 'index visible badge must show RC0');
assert.ok(index.includes('مرشح العرض العام'), 'Arabic RC0 visible copy missing');
assert.ok(index.includes('Candidat démo publique') || fs.readFileSync('src/research/render-helpers.js', 'utf8').includes('Candidat démo publique'), 'French RC0 visible copy missing');
for (const doc of [current, publicDemo, roadmap, qa]) {
  assert.ok(doc.includes(VERSION), 'release doc must include RC0 version');
  assert.ok(/no live|No live|لا يوجد|aucune recherche/i.test(doc), 'release doc must preserve no-live boundary');
}
assert.ok(current.includes('Feature surface') || current.includes('feature surface'), 'current release must state feature freeze');
assert.ok(current.includes('A ZIP archive alone is insufficient'), 'current release must preserve ZIP insufficiency warning');
assert.ok(publicDemo.includes('hosted metadata reports `1.1.0-rc.0`'), 'public demo must state hosted metadata lock requirement');
assert.ok(roadmap.includes('v1.1.0 — Public Demo Stable'), 'roadmap must point to stable after RC0');
assert.ok(!roadmap.includes('alpha.26 unless') || roadmap.includes('No alpha.26 unless'), 'roadmap must reject default alpha continuation');
assert.equal(registry.runtime_capability_change, false);
assert.equal(registry.provider_behavior_changed, false);
assert.equal(registry.oauth_behavior_changed, false);
assert.equal(registry.backend_behavior_changed, false);
assert.equal(registry.source_connector_behavior_changed, false);
assert.equal(registry.storage_behavior_changed, false);
console.log('Public Demo Release Candidate checks passed.');
process.exit(0);
