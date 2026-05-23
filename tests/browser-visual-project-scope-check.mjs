import assert from 'node:assert/strict';
import fs from 'node:fs';

const spec = fs.readFileSync('tests/browser-visual-regression.spec.mjs', 'utf8');
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const ciNoBrowser = fs.readFileSync('scripts/ci-no-browser.sh', 'utf8');
const ciBrowser = fs.readFileSync('scripts/ci-browser.sh', 'utf8');
const workflow = fs.readFileSync('.github/workflows/ci.yml', 'utf8');

assert.equal(pkg.version, '1.2.0-alpha.7');
assert.ok(spec.includes("testInfo.project.name !== 'chromium'"), 'desktop visual screenshots must be scoped to chromium only');
assert.ok(spec.includes("testInfo.project.name !== 'mobile-chrome'"), 'mobile visual screenshots must be scoped to mobile-chrome only');
assert.ok(spec.includes('v121-desktop-'), 'desktop screenshots should use v1.1.0 artifact names');
assert.ok(spec.includes('v121-mobile-'), 'mobile screenshots should use v1.1.0 artifact names');
assert.ok(Object.keys(pkg.scripts).length <= 20, 'package script surface must remain compressed');
assert.ok(ciNoBrowser.includes('ci-gate-runner.mjs no-browser'), 'no-browser CI must statically guard visual project scoping through registry runner');
assert.ok(ciBrowser.includes('PLAYWRIGHT_SKIP_INSTALL'), 'browser CI script must support PLAYWRIGHT_SKIP_INSTALL');
assert.ok(workflow.includes('PLAYWRIGHT_SKIP_INSTALL=1 npm run test:ci:browser'), 'GitHub browser job must skip duplicate Playwright install inside ci-browser.sh');
console.log('Browser visual project scope checks passed.');
process.exit(0);
