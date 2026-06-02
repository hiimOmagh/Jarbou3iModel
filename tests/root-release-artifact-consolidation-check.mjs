import assert from 'node:assert/strict';
import fs from 'node:fs';
import { readReleaseArtifact, releaseArtifactExists, releaseArtifactReplacement } from './release-artifacts-loader.mjs';

const VERSION = '1.4.0-alpha.39';
const TITLE = 'Source-to-Brief Operator Control Room';
const RELEASE = `v${VERSION} — ${TITLE}`;
const json = (file) => JSON.parse(fs.readFileSync(file, 'utf8'));

const pkg = json('package.json');
const manifest = json('MANIFEST.json');
const current = fs.readFileSync('docs/current-release.md', 'utf8');
const evidence = fs.readFileSync('docs/release-and-evidence.md', 'utf8');
const changelog = fs.readFileSync('CHANGELOG.md', 'utf8');
const publicDemo = fs.readFileSync('PUBLIC_DEMO.md', 'utf8');

assert.equal(pkg.version, VERSION);
assert.equal(manifest.version, VERSION);
assert.equal(manifest.release_title, RELEASE);
assert.equal(manifest.runtime_capability_change, false);
assert.equal(manifest.provider_behavior_changed, false);
assert.equal(manifest.oauth_behavior_changed, false);
assert.equal(manifest.backend_behavior_changed, false);
assert.equal(manifest.source_behavior_changed, false);
assert.equal(manifest.storage_behavior_changed, false);

for (const legacy of manifest.consolidated_root_artifacts) {
  assert.equal(fs.existsSync(legacy), false, `legacy root artifact must be consolidated, not restored: ${legacy}`);
  assert.ok(releaseArtifactReplacement(legacy), `legacy root artifact must have loader replacement: ${legacy}`);
  assert.ok(releaseArtifactExists(legacy), `legacy root artifact replacement must be readable: ${legacy}`);
}

for (const required of manifest.required_root_files) {
  assert.ok(fs.existsSync(required), `required root file missing: ${required}`);
}

for (const doc of [current, evidence, changelog, publicDemo]) {
  assert.ok(doc.includes(VERSION), 'canonical release doc missing current version');
  assert.ok(doc.includes(TITLE), 'canonical release doc missing current title');
}

for (const token of [
  'Screenshots alone are not sufficient',
  'ZIP existence alone is not sufficient',
  'green no-browser CI',
  'green browser CI',
  'hosted-demo-metadata.json',
  'desktop-first-screen',
  'mobile-first-screen',
  'provider-mode',
  'quality-export',
  'No live scraping',
  'no real OAuth',
  'PLAYWRIGHT_SKIP_INSTALL=1 npm run test:ci:browser',
  'changed-files-only patch handoff'
]) {
  assert.ok(evidence.toLowerCase().includes(token.toLowerCase()), `release/evidence policy missing token: ${token}`);
}

for (const legacy of ['BROWSER_EVIDENCE.md','HOSTED_DEMO_VERIFICATION.md','RELEASE_MANIFEST.md','RELEASE_NOTES.md','MANIFEST.md']) {
  const replacementText = readReleaseArtifact(legacy);
  assert.ok(replacementText.includes(VERSION), `${legacy} replacement missing current version`);
}

console.log('Root release artifact consolidation checks passed.');
process.exit(0);
