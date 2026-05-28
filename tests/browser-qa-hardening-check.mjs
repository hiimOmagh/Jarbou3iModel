import assert from 'node:assert/strict';
import fs from 'node:fs';
import { readReleaseDoc, releaseDocExists } from './release-docs-loader.mjs';

const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const playwrightConfig = fs.readFileSync('playwright.config.js', 'utf8');
const ciBrowser = fs.readFileSync('scripts/ci-browser.sh', 'utf8');
const ciNoBrowser = fs.readFileSync('scripts/ci-no-browser.sh', 'utf8');
const layoutSpec = fs.readFileSync('tests/browser-layout-persistence.spec.mjs', 'utf8');
const visualSpec = fs.readFileSync('tests/browser-visual-regression.spec.mjs', 'utf8');
const engine = fs.readFileSync('src/research-engine.js', 'utf8');
const docs = releaseDocExists('docs/v1.0.4-browser-qa-visual-regression-hardening.md') ? readReleaseDoc('docs/v1.0.4-browser-qa-visual-regression-hardening.md') : '';
const fixture = JSON.parse(fs.readFileSync('fixtures/research/sample-research-workflow-en.json', 'utf8'));

assert.equal(pkg.version, '1.4.0-alpha.6');
for (const script of ['test:browser:layout','test:browser:visual','test:browser:visual:strict','test:browser:qa','test:version-registry','test:current:no-browser']) {
  assert.ok(Object.keys(pkg.scripts).length <= 20, 'package script surface must remain compressed');
}
assert.ok(Object.keys(pkg.scripts).length <= 20, 'package script surface must remain compressed');
assert.ok(ciBrowser.includes('ci-gate-runner.mjs browser'), 'CI browser script must delegate to registry runner');
assert.ok(ciBrowser.includes('ci-gate-runner.mjs browser'), 'CI browser script must delegate to registry runner');
assert.ok(ciNoBrowser.includes('ci-gate-runner.mjs no-browser'), 'no-browser CI must delegate browser QA static coverage through registry runner');

for (const token of ['tests/browser-layout-persistence.spec.mjs','tests/browser-visual-regression.spec.mjs']) {
  assert.ok(fs.existsSync(token), `missing ${token}`);
}
for (const token of ['assertNoHorizontalOverflow','workflow tab selection persists','command center and engine map collapsed state persists','primary actions remain visible']) {
  assert.ok(layoutSpec.includes(token), `layout spec missing token ${token}`);
}
for (const token of ['VISUAL_BASELINE_STRICT','captureOrCompare','toHaveScreenshot','v121-desktop-${tab}','v121-mobile-analysis',"testInfo.project.name !== 'chromium'","testInfo.project.name !== 'mobile-chrome'"]) {
  assert.ok(visualSpec.includes(token), `visual spec missing token ${token}`);
}
for (const token of ['panelStorageKey','persistedPanelState','sessionStorage.setItem(panelStorageKey']) {
  assert.ok(engine.includes(token), `engine missing persistence token ${token}`);
}
assert.ok(playwrightConfig.includes('chromium') && playwrightConfig.includes('mobile-chrome'), 'Playwright projects must retain desktop and mobile coverage');
assert.ok(docs.includes('Browser QA + Visual Regression Hardening'), 'v1.1.0 docs missing');
assert.equal(fixture.workflow_version, '1.3.0');
assert.equal(fixture.browser_qa_hardening?.hardening_version, '1.3.0');
assert.equal(fixture.browser_qa_hardening?.feature_surface_added, false);
assert.equal(fixture.browser_qa_hardening?.visual_regression.mode, 'capture_or_strict_baseline');

console.log('Browser QA hardening checks passed.');
process.exit(0);
