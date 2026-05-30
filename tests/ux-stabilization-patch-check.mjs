import assert from 'node:assert/strict';
import fs from 'node:fs';

const index = fs.readFileSync('index.html', 'utf8');
const styles = fs.readFileSync('src/styles.css', 'utf8');
const engine = fs.readFileSync('src/research-engine.js', 'utf8');
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));

assert.equal(pkg.version, '1.4.0-alpha.27');
assert.ok(index.includes('id="releaseHealthCard"'), 'release health summary card missing');
assert.ok(index.includes('id="releaseHealthMetrics"'), 'release health metrics outlet missing');
assert.ok(index.includes('id="researchModeNav"'), 'research mode navigation missing');
for (const tab of ['analysis','evidence','sources','quality','advanced']) {
  assert.ok(index.includes(`data-ux-tab="${tab}"`), `missing UX tab: ${tab}`);
}
assert.ok(index.includes('data-r-i18n="stableWorkflowBody"'), 'localized advanced-collapse product copy hook missing');
assert.ok(styles.includes('.researchCard.uxHidden'), 'UX hidden-card class missing');
assert.ok(styles.includes('.researchModeNav'), 'sticky workflow nav styles missing');
assert.ok(styles.includes('.releaseHealthCard'), 'release health styles missing');
assert.ok(engine.includes('UX_CARD_TABS'), 'UX card tab map missing');
assert.ok(engine.includes('setupUxStabilization'), 'UX setup function missing');
assert.ok(engine.includes('renderReleaseHealth'), 'release health render function missing');
assert.ok(engine.includes('applyUxTab'), 'UX tab application function missing');
assert.ok(engine.includes("sessionStorage.setItem('jarbou3i.ux.activeTab'"), 'UX tab persistence missing');
assert.ok(engine.includes('releaseMetric'), 'release health metric rendering missing');
assert.ok(engine.includes('projectWorkspaceTitle'), 'workspace must be assigned to advanced tab');
assert.ok(engine.includes('providerTitle'), 'provider harness must be assigned to advanced tab');
assert.ok(engine.includes('sourcePlanningTitle'), 'source planning must be assigned to sources/advanced tabs');
assert.ok(engine.includes('qualityTitle'), 'quality gate must be assigned to quality tab');
assert.ok(engine.includes('evidenceReviewTitle'), 'review queue must stay visible in evidence/source/quality modes');
assert.ok(Object.keys(pkg.scripts).length <= 20, 'package script surface must remain compressed');
assert.ok(Object.keys(pkg.scripts).length <= 20, 'package script surface must remain compressed');

console.log('UX stabilization patch checks passed.');
process.exit(0);
