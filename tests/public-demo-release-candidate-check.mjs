import assert from 'node:assert/strict';
import fs from 'node:fs';

const VERSION = '1.3.0-alpha.9';
const RELEASE = 'v1.3.0-alpha.9 — Source-to-Claim Gap Closure Queue';
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
assert.ok(index.includes('v1.3.0-alpha.9 Source-to-Claim Gap Closure Queue') && index.includes('Diagnostic Repair Queue + Export Risk Resolution'), 'index visible badge must show stable candidate consolidation');
assert.ok(index.includes('العرض العام المستقر') || fs.readFileSync('src/research/render-helpers.js', 'utf8').includes('العرض العام المستقر'), 'Arabic stable public visible copy missing');
assert.ok(index.includes('Démo publique stable') || fs.readFileSync('src/research/render-helpers.js', 'utf8').includes('Démo publique stable'), 'French stable public visible copy missing');
for (const doc of [current, publicDemo, roadmap, qa]) {
  assert.ok(doc.includes(VERSION), 'release doc must include stable version');
  assert.ok(/no live|No live|لا يوجد|aucune recherche/i.test(doc), 'release doc must preserve no-live boundary');
}
assert.ok(current.includes('Feature surface') || current.includes('feature surface'), 'current release must state feature freeze');
assert.ok(current.includes('A ZIP archive alone is insufficient'), 'current release must preserve ZIP insufficiency warning');
assert.ok(publicDemo.includes('1.3.0-alpha.9') && /hosted.*evidence|hosted.*metadata/i.test(publicDemo), 'public demo must state hosted evidence lock requirement');
assert.ok(roadmap.includes('v1.1.0') && /stable/i.test(roadmap), 'roadmap must point to stable release');
assert.ok(!roadmap.includes('alpha.26 unless') || roadmap.includes('No alpha.26 unless'), 'roadmap must reject default alpha continuation');
assert.equal(registry.runtime_capability_change, false);
assert.equal(registry.provider_behavior_changed, false);
assert.equal(registry.oauth_behavior_changed, false);
assert.equal(registry.backend_behavior_changed, false);
assert.equal(registry.source_connector_behavior_changed, false);
assert.equal(registry.storage_behavior_changed, false);
console.log('Diagnostic Repair Queue + Export Risk Resolution checks passed.');
process.exit(0);
