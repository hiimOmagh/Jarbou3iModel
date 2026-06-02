import assert from 'node:assert/strict';
import fs from 'node:fs';

const index = fs.readFileSync('index.html', 'utf8');
const styles = fs.readFileSync('src/styles.css', 'utf8');
const engine = fs.readFileSync('src/research-engine.js', 'utf8');
const renderHelpers = fs.readFileSync('src/research/render-helpers.js', 'utf8');
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const fixture = JSON.parse(fs.readFileSync('fixtures/research/sample-research-workflow-en.json', 'utf8'));
const migrations = fs.readFileSync('src/research/migrations.js', 'utf8');

assert.equal(pkg.version, '1.4.0-alpha.42');
assert.equal(fixture.workflow_version, '1.3.0');
assert.ok(Object.keys(pkg.scripts).length <= 20, 'package script surface must remain compressed');
assert.ok(Object.keys(pkg.scripts).length <= 20, 'package script surface must remain compressed');
assert.ok(migrations.includes("'1.0.0','1.0.1','1.0.2','1.0.3','1.0.4','1.0.5','1.0.6','1.0.7','1.0.8','1.0.9','1.0.10','1.0.11','1.0.12','1.0.13','1.0.14','1.0.15','1.0.16','1.0.17','1.0.18','1.0.19','1.0.20','1.0.21','1.0.22','1.0.23','1.0.24','1.0.25','1.0.26','1.0.27','1.0.28','1.0.29','1.0.30','1.1.0-alpha.1','1.1.0-alpha.2','1.1.0-alpha.3','1.1.0-alpha.8','1.1.0-alpha.9','1.1.0-alpha.10','1.3.0'"), 'migrations must support v1.0.5 → v1.1.0');

for (const token of [
  'screenDisciplineNextAction',
  'workflowPanelToggle',
  'enginePanelToggle',
  'screenDisciplineCollapsed',
  'Show Command Center',
  'Show Engine Map'
]) assert.ok(index.includes(token), `index missing screen discipline token: ${token}`);

for (const token of [
  '.screenDisciplineCollapsed',
  '.disciplineAccordion',
  '.uxAccordionClosed',
  '.screenDisciplineNextAction',
  'content:attr(data-collapse-note)',
  'content:attr(data-accordion-show)',
  'content:attr(data-accordion-hide)',
  'v1.0.15 screen discipline patch'
]) assert.ok(styles.includes(token), `styles missing screen discipline token: ${token}`);

for (const token of [
  'renderScreenDisciplineNextAction',
  'setCollapsiblePanel',
  'toggleCollapsiblePanel',
  'toggleAdvancedAccordion',
  "classList.add('uxStabilized','screenDiscipline')",
  'uxAccordionClosed'
]) assert.ok(engine.includes(token), `engine missing screen discipline token: ${token}`);

for (const forbidden of [
  '1. Research Plan',
  '2. Evidence Matrix',
  '3. Causal Links',
  '4. Analysis Compiler',
  '5. Provider Harness',
  '6. Source Planning Layer',
  '7. Source Import Adapter',
  '8. Evidence Review Queue',
  '9. Mock AI Workflow'
]) {
  assert.equal(index.includes(forbidden), false, `index should not expose global section number: ${forbidden}`);
  assert.equal(renderHelpers.includes(forbidden), false, `render helpers should not expose global section number: ${forbidden}`);
}

assert.equal((index.match(/id="exportTemplateProfileBtn"/g) || []).length, 1, 'duplicate template export button must stay removed');
assert.ok(index.includes('class="panel commandPanel screenDisciplineCollapsed"'), 'Command Center must be collapsed by default');
assert.ok(index.includes('class="panel screenDisciplineCollapsed" id="enginePanel"'), 'Analysis Engine Map must be collapsed by default');

console.log('Screen discipline patch checks passed.');
process.exit(0);
