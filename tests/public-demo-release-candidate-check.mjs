import assert from 'node:assert/strict';
import fs from 'node:fs';
import { CURRENT_PUBLIC_LABEL, CURRENT_RELEASE, CURRENT_TITLE, CURRENT_VERSION } from './current-release-identity.mjs';


const VERSION = CURRENT_VERSION;
const RELEASE = CURRENT_RELEASE;
const PUBLIC_LABEL = CURRENT_PUBLIC_LABEL;
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const registry = JSON.parse(fs.readFileSync('tests/ci-gate-registry.json', 'utf8'));
const index = fs.readFileSync('index.html', 'utf8');
const current = fs.readFileSync('docs/current-release.md', 'utf8');
const publicDemo = fs.readFileSync('PUBLIC_DEMO.md', 'utf8');
const roadmap = fs.readFileSync('docs/roadmap.md', 'utf8');
const qa = fs.readFileSync('docs/qa-matrix.md', 'utf8');

assert.equal(pkg.version, CURRENT_VERSION);
assert.equal(registry.ci_gate_registry_version, CURRENT_VERSION);
assert.equal(registry.release_title, CURRENT_RELEASE);
assert.ok((index.includes(PUBLIC_LABEL) || index.includes(CURRENT_RELEASE)) && (index.includes(CURRENT_TITLE) || fs.readFileSync('src/research/render-helpers.js', 'utf8').includes(CURRENT_TITLE)), 'index/release helpers must expose canonical release identity');
const renderHelpers = fs.readFileSync('src/research/render-helpers.js', 'utf8');
assert.ok(index.includes('سطح التحكم في اكتساب المصادر') || renderHelpers.includes('سطح التحكم في اكتساب المصادر'), 'Arabic alpha.1 public visible copy missing');
assert.ok(index.includes('Surface de contrôle d’acquisition des sources') || renderHelpers.includes('Surface de contrôle d’acquisition des sources'), 'French alpha.1 public visible copy missing');
const hostedDemoBodies = [...renderHelpers.matchAll(/hostedDemoVerificationBody:'([^']+)'/g)].map((match)=>match[1]);
const releaseCopySource = fs.readFileSync('src/research/release-copy-contract.js', 'utf8');
hostedDemoBodies.push(...[...releaseCopySource.matchAll(/hostedDemoVerificationBody: '([^']+)'/g)].map((match)=>match[1]));
const arabicHostedDemoBodies = hostedDemoBodies.filter((body)=>body.includes('أدلة الإصدار') && /[\u0600-\u06FF]/.test(body));
assert.ok(arabicHostedDemoBodies.some((body)=>body.includes('حارس تصادم حزم التصحيح') || body.includes('مسح هوية الإصدار') || body.includes('تشخيص جماعي') || body.includes('PACKAGE-MANIFEST.json')), 'Arabic current-release description must identify alpha.47 patch package safety and release identity sweep guard');
for (const body of arabicHostedDemoBodies) {
  for (const stale of ['النموذج الأولي المحدود للتنفيذ الحي اليدوي جاهز لأدلة الإصدار', 'نموذج أولي محدود للتنفيذ الحي اليدوي', 'هيكل اشتراك يدوي فقط', 'قمرة أمان التنفيذ اليدوي + سجل الجلسة جاهزة لأدلة الإصدار', 'صندوق رمل محوّل المزوّد اليدوي + عقد الاستدعاء العابر جاهز لأدلة الإصدار']) {
    assert.equal(body.includes(stale), false, `Arabic current-release description must not carry stale alpha.10/alpha.11 wording: ${stale}`);
  }
}
for (const doc of [current, publicDemo, roadmap, qa]) {
  assert.ok(doc.includes(VERSION), 'release doc must include stable version');
  assert.ok(/no live|No live|لا يوجد|aucune recherche/i.test(doc), 'release doc must preserve no-live boundary');
}
assert.ok(current.includes('Planning/control-plane only') || current.includes('controlled execution candidate') || current.includes('no-execution'), 'current release must state controlled execution candidate control-plane freeze');
assert.ok(current.includes('A ZIP archive alone is insufficient'), 'current release must preserve ZIP insufficiency warning');
assert.ok(publicDemo.includes(CURRENT_VERSION) && /hosted.*evidence|hosted.*metadata|patch package|release identity sweep|Patch Package Safety/i.test(publicDemo), 'public demo must state current hosted evidence lock requirement');
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
