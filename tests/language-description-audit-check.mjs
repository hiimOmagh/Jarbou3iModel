import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const VERSION = '1.1.0-alpha.11';
const audit = fs.readFileSync('docs/language-description-audit.md', 'utf8');
const app = fs.readFileSync('src/app.js', 'utf8');
const index = fs.readFileSync('index.html', 'utf8');
const manifest = JSON.parse(fs.readFileSync('manifest.webmanifest', 'utf8'));
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));

const renderHelpersSource = fs.readFileSync('src/research/render-helpers.js', 'utf8');
const renderContext = { window: { Jarbou3iResearchModules: {}, document: { documentElement: { lang: 'ar' } }, localStorage: { getItem: () => null } } };
vm.runInNewContext(renderHelpersSource, renderContext, { filename: 'src/research/render-helpers.js' });
const researchCopy = renderContext.window.Jarbou3iResearchModules.renderHelpers.COPY;


function extractI18n(source) {
  const start = source.indexOf('const I18N=');
  assert.notEqual(start, -1, 'I18N catalog missing');
  const valueStart = start + 'const I18N='.length;
  const end = source.indexOf('\nconst PILLARS', valueStart);
  assert.ok(end > valueStart, 'I18N catalog end marker missing');
  let text = source.slice(valueStart, end).trim();
  if (text.endsWith(';')) text = text.slice(0, -1);
  return JSON.parse(text);
}
function flattenKeys(value, prefix = '') {
  if (Array.isArray(value)) return value.map((_, index) => `${prefix}[${index}]`);
  if (value && typeof value === 'object') {
    return Object.entries(value).flatMap(([key, child]) => flattenKeys(child, prefix ? `${prefix}.${key}` : key));
  }
  return [prefix];
}
function allStrings(value) {
  if (typeof value === 'string') return [value];
  if (Array.isArray(value)) return value.flatMap(allStrings);
  if (value && typeof value === 'object') return Object.values(value).flatMap(allStrings);
  return [];
}

const i18n = extractI18n(app);
assert.equal(pkg.version, VERSION);
assert.ok(audit.includes(`Version: \`${VERSION}\``));
assert.deepEqual(Object.keys(i18n).sort(), ['ar', 'en', 'fr']);
const referenceKeys = flattenKeys(i18n.en).sort();
for (const lang of ['ar', 'en', 'fr']) {
  assert.deepEqual(flattenKeys(i18n[lang]).sort(), referenceKeys, `${lang} i18n key structure drifted`);
  for (const text of allStrings(i18n[lang])) {
    assert.equal(text.trim(), text, `${lang} text has leading/trailing whitespace: ${text}`);
    assert.ok(text.length > 0, `${lang} text must not be empty`);
  }
}
for (const [lang, expected] of Object.entries({
  ar: 'مساحة عمل استخباراتية الطابع',
  en: 'inspectable, export-ready strategic review',
  fr: 'revue stratégique vérifiable et exportable'
})) {
  assert.ok(i18n[lang].appSubtitle.includes(expected), `${lang} appSubtitle not professionally localized`);
}
for (const forbidden of ['friendly visual guide', 'convivial', 'رفيق بصري']) {
  assert.equal(app.includes(forbidden), false, `informal product copy must be removed: ${forbidden}`);
}
for (const [lang, text] of Object.entries({ ar: i18n.ar.pillars.interests[1], en: i18n.en.pillars.interests[1], fr: i18n.fr.pillars.interests[1] })) {
  assert.ok(text.length >= 60, `${lang} pillar description must be explanatory, not a label`);
}
assert.ok(index.includes('<html lang="ar" dir="rtl">'), 'Arabic RTL shell must remain default');
assert.ok(index.includes('Jarbou3i Research Engine is a trilingual, source-aware research-to-strategy workspace'), 'index meta description must be accurate and professional');
assert.ok(index.includes('Trilingual, client-side strategic research workbench'), 'OpenGraph description must be accurate and professional');
assert.ok(manifest.description.includes('Trilingual public-demo research-to-strategy workspace'), 'web manifest description must be professional and accurate');

const staticShellKeys = [
  'firstRunGuideEyebrow','firstRunGuideTitle','firstRunGuideBody','startGuidedSetup','goToNextStep','hideGuide',
  'publicDemoReadyEyebrow','publicDemoReadyTitle','publicDemoReadyBody','localOnlyDefault','safeExportBoundary','noLiveProviderBehaviorChange','releaseNotesReady',
  'hostedDemoVerificationEyebrow','hostedDemoVerificationTitle','hostedDemoVerificationBody','hostedUrlChecked','desktopEvidence','mobileEvidence','providerExportEvidence',
  'evidenceReviewGateEyebrow','evidenceReviewGateTitle','evidenceReviewGateBody','hostedUrlSmoke','noOverflowProof','metadataArtifact','reviewedBeforePublish',
  'stableWorkflowEyebrow','stableWorkflowTitle','stableWorkflowBody','analysisTab','evidenceTab','sourcesTab','qualityExportTab','settingsAdvancedTab'
];
for (const lang of ['ar', 'en', 'fr']) {
  for (const key of staticShellKeys) {
    assert.ok(researchCopy[lang][key], `${lang} missing localized static-shell key: ${key}`);
  }
}
for (const phrase of ['First-run guide', 'Start clean:', 'Public demo ready', 'Show the workflow', 'Publish only after browser evidence exists', 'Review screenshots', 'Stable workflow', 'Quality & Export']) {
  assert.equal(index.includes(`>${phrase}`), false, `default Arabic shell must not expose English fallback copy: ${phrase}`);
}

const dynamicShellKeys = [
  'projectWorkspaceTitle','providerTitle','sourcePlanningTitle','sourceImportTitle','showCommandCenter','hideCommandCenter','showEngineMap','hideEngineMap',
  'firstRunSuccessState','inProgressState','notStartedState','doneState','nextState','metricPlan','metricEvidence','metricReview','metricQuality','metricExport','metricReady','metricMissing','metricPending','metricClear','metricBlocked','metricSafe',
  'noPlanBody','matrixEmptyBody','templateCoverageComplete','missingTemplateLayers','critiqueSummaryWeak','critiqueNextActions',
  'critiqueActionEvidence','critiqueActionSources','critiqueActionCounter','critiqueActionCausal','critiqueActionFalsifiers'
];
for (const lang of ['ar', 'en', 'fr']) {
  for (const key of dynamicShellKeys) {
    assert.ok(researchCopy[lang][key], `${lang} missing localized dynamic-shell key: ${key}`);
  }
  assert.ok(researchCopy[lang].templateProfiles?.strategic_analysis_engine?.display_name, `${lang} missing localized template profile`);
}
for (const key of [...staticShellKeys, ...dynamicShellKeys, ...Array.from(index.matchAll(/data-r-i18n="([^"]+)"/g)).map((m) => m[1])]) {
  for (const lang of ['ar', 'en', 'fr']) assert.ok(researchCopy[lang][key], `${lang} missing visible shell i18n key: ${key}`);
}
for (const [lang, key] of [['ar','showCommandCenter'], ['ar','hideCommandCenter'], ['ar','critiqueSummaryWeak'], ['fr','showCommandCenter'], ['fr','hideCommandCenter'], ['fr','critiqueSummaryWeak']]) {
  assert.notEqual(researchCopy[lang][key], researchCopy.en[key], `${lang}.${key} must not inherit English copy`);
}
for (const lang of ['ar','fr']) {
  assert.notEqual(researchCopy[lang].templateProfiles.strategic_analysis_engine.display_name, researchCopy.en.templateProfiles.strategic_analysis_engine.display_name, `${lang} strategic template name must be localized`);
  assert.notEqual(researchCopy[lang].templateProfiles.strategic_analysis_engine.description, researchCopy.en.templateProfiles.strategic_analysis_engine.description, `${lang} strategic template description must be localized`);
}
for (const visibleEnglish of ['>Show Command Center', '>Hide Command Center', '>Show Engine Map', '>Hide Engine Map']) {
  assert.equal(index.includes(visibleEnglish), false, `default Arabic shell must not expose visible English control copy: ${visibleEnglish}`);
}
const engine = fs.readFileSync('src/research-engine.js', 'utf8');
for (const forbiddenDynamic of ['Hide Command Center','Show Command Center','Hide Engine Map','Show Engine Map','Next actions</h4>','Template layer coverage is currently complete.','Missing template layers:']) {
  assert.equal(engine.includes(forbiddenDynamic), false, `dynamic runtime shell must not hard-code English visible copy: ${forbiddenDynamic}`);
}
const providerKeys = ['providerEndpoint','providerModel','providerApiKey','rememberProviderKey','enableLiveByok','providerSafety','validateProviderSettings','dryRunProviderRequest','statusProviderDryRun','statusProviderSettingsSaved','statusProviderLiveDisabled','statusProviderLiveError','statusBackendProxyReady'];
for (const lang of ['ar', 'fr']) {
  for (const key of providerKeys) {
    const value = researchCopy[lang][key];
    assert.ok(value && value !== researchCopy.en[key], `${lang}.${key} must be localized, not inherited English copy`);
  }
}
assert.ok(researchCopy.ar.firstRunGuideTitle.includes('الموضوع') && researchCopy.ar.firstRunGuideTitle.includes('التصدير'), 'Arabic first-run title must be clear and domain-specific');
assert.ok(researchCopy.fr.firstRunGuideTitle.includes('sujet') && researchCopy.fr.firstRunGuideTitle.includes('export'), 'French first-run title must be clear and domain-specific');

const metadataCorpus = [
  ...Array.from(index.matchAll(/<meta[^>]+content="([^"]*)"/g)).map((match) => match[1]),
  manifest.description
].join('\n').toLowerCase();
for (const unavailableClaim of ['live scraping', 'production OAuth', 'automated source verification']) {
  assert.equal(metadataCorpus.includes(unavailableClaim.toLowerCase()), false, `public metadata must not claim unavailable capability: ${unavailableClaim}`);
}


const providerBrowserSpec = fs.readFileSync('tests/provider-mode-browser.spec.mjs', 'utf8');
assert.ok(providerBrowserSpec.includes('expectProviderKeyNotExported'), 'provider browser QA must use localization-aware exported-key assertions');
assert.equal(providerBrowserSpec.includes("toContainText(/key_exported:false/)"), false, 'provider browser QA must not require English-only diagnostics copy');
for (const lang of ['ar', 'fr']) {
  assert.equal(researchCopy[lang].qualityFixProvider.includes('key_exported'), false, `${lang}.qualityFixProvider must not expose raw English implementation flag in visible localized copy`);
  assert.equal(researchCopy[lang].qualityFixProvider.includes('false'), false, `${lang}.qualityFixProvider must not expose raw English boolean in visible localized copy`);
}

console.log('Language description audit checks passed.');
process.exit(0);
