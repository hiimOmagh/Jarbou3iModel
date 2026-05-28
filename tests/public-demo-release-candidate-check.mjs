import assert from 'node:assert/strict';
import fs from 'node:fs';

const CURRENT_VERSION = '1.4.0-alpha.9';
const CURRENT_TITLE = 'Controlled Execution Candidate Gate';
const VERSION = '1.3.0';
const RELEASE = 'v1.3.0 — Stable Manual Workflow Release';
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const registry = JSON.parse(fs.readFileSync('tests/ci-gate-registry.json', 'utf8'));
const index = fs.readFileSync('index.html', 'utf8');
const current = fs.readFileSync('docs/current-release.md', 'utf8');
const publicDemo = fs.readFileSync('PUBLIC_DEMO.md', 'utf8');
const roadmap = fs.readFileSync('docs/roadmap.md', 'utf8');
const qa = fs.readFileSync('docs/qa-matrix.md', 'utf8');

assert.equal(pkg.version, CURRENT_VERSION);
assert.equal(registry.ci_gate_registry_version, CURRENT_VERSION);
assert.equal(registry.release_title, 'v1.4.0-alpha.9 — Controlled Execution Candidate Gate');
assert.ok(index.includes('v1.4.0-alpha.9 Controlled Execution Candidate Gate') && (index.includes('No-Execution Candidate Only') || fs.readFileSync('src/research/render-helpers.js', 'utf8').includes('No-Execution Candidate Only')), 'index visible badge must show alpha.9 controlled execution candidate gate identity');
assert.ok(index.includes('سطح التحكم في اكتساب المصادر') || fs.readFileSync('src/research/render-helpers.js', 'utf8').includes('سطح التحكم في اكتساب المصادر'), 'Arabic alpha.1 public visible copy missing');
assert.ok(index.includes('Surface de contrôle d’acquisition des sources') || fs.readFileSync('src/research/render-helpers.js', 'utf8').includes('Surface de contrôle d’acquisition des sources'), 'French alpha.1 public visible copy missing');
for (const doc of [current, publicDemo, roadmap, qa]) {
  assert.ok(doc.includes(VERSION), 'release doc must include stable version');
  assert.ok(/no live|No live|لا يوجد|aucune recherche/i.test(doc), 'release doc must preserve no-live boundary');
}
assert.ok(current.includes('Planning/control-plane only') || current.includes('controlled execution candidate') || current.includes('no-execution'), 'current release must state controlled execution candidate control-plane freeze');
assert.ok(current.includes('A ZIP archive alone is insufficient'), 'current release must preserve ZIP insufficiency warning');
assert.ok(publicDemo.includes('1.4.0-alpha.9') && /hosted.*evidence|hosted.*metadata/i.test(publicDemo), 'public demo must state hosted evidence lock requirement');
assert.ok(roadmap.includes('v1.3.0 — Stable Manual Workflow Release') && /stable/i.test(roadmap), 'roadmap must point to stable release baseline');
assert.ok(!roadmap.includes('alpha.26 unless') || roadmap.includes('No alpha.26 unless'), 'roadmap must reject default alpha continuation');
assert.equal(registry.runtime_capability_change, false);
assert.equal(registry.provider_behavior_changed, false);
assert.equal(registry.oauth_behavior_changed, false);
assert.equal(registry.backend_behavior_changed, false);
assert.equal(registry.source_connector_behavior_changed, false);
assert.equal(registry.storage_behavior_changed, false);
console.log('Localized release label truth checks passed.');
process.exit(0);
