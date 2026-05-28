import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const CURRENT_VERSION = '1.4.0-alpha.3';
const CURRENT_TITLE = 'Provider/Source Dry-Run Execution Harness + Policy Simulator';
const VERSION = '1.3.0';
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
assert.equal(pkg.version, CURRENT_VERSION);
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

assert.ok(researchCopy.en.evidenceReviewGateBody.includes('Stable release evidence') && researchCopy.en.evidenceReviewGateBody.includes('Export Pack v3'), 'English evidence review gate body must describe stable public localization fix scope');
assert.ok(researchCopy.ar.evidenceReviewGateBody.includes('أدلة الإصدار المستقر') && researchCopy.ar.evidenceReviewGateBody.includes('Export Pack v3'), 'Arabic evidence review gate body must describe stable public localization fix scope');
assert.ok(researchCopy.fr.evidenceReviewGateBody.includes('preuves de release stable') && researchCopy.fr.evidenceReviewGateBody.includes('Export Pack v3'), 'French evidence review gate body must describe stable public localization fix scope');
assert.equal(researchCopy.fr.evidenceReviewGateBody.includes('preserves the public-demo freeze'), false, 'French stable evidence review gate body must not inherit English release copy');
assert.equal(researchCopy.fr.evidenceReviewGateBody.includes('provider routing'), false, 'French stable evidence review gate body must not expose alpha.20 provider-router release copy');

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
const providerKeys = ['providerEndpoint','providerModel','providerApiKey','rememberProviderKey','enableLiveByok','providerSafety','validateProviderSettings','dryRunProviderRequest','statusProviderDryRun','statusProviderSettingsSaved','statusProviderLiveDisabled','statusProviderLiveError','statusBackendProxyReady','providerPromptLabel','providerContractLabel','responseValidationScore','contractFixtureScore','sourcePlanningScore','sourcePolicyScore','sourceFixtureScore','sourceImportScore','providerIdentityScore'];
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



const sourcePacketTemplateBrowserSpec = fs.readFileSync('tests/source-packet-template-browser.spec.mjs', 'utf8');
for (const englishOnlyAssertion of ["toContainText('live:false')", "toContainText('verified:false')"]) {
  assert.equal(sourcePacketTemplateBrowserSpec.includes(englishOnlyAssertion), false, `source packet template browser QA must not require English-only diagnostics copy: ${englishOnlyAssertion}`);
}
assert.ok(sourcePacketTemplateBrowserSpec.includes('live_fetching_performed'), 'source packet template browser QA must assert stable JSON live-fetch proof');
assert.ok(sourcePacketTemplateBrowserSpec.includes('verification_claimed'), 'source packet template browser QA must assert stable JSON verification proof');
assert.equal(sourcePacketTemplateBrowserSpec.includes('outputText).toMatch(/no[_ -]fetch'), false, 'source packet template browser QA must not require raw English policy tokens in localized visible output');
assert.ok(sourcePacketTemplateBrowserSpec.includes("expect(packet.builder_report.policy).toContain('no_fetch_no_verification')"), 'source packet template browser QA must assert no-fetch/no-verification policy through copied JSON');
assert.equal(sourcePacketTemplateBrowserSpec.includes('toContainText(templateId)'), false, 'source packet template browser QA must not require raw English template IDs in localized visible output');
assert.ok(sourcePacketTemplateBrowserSpec.includes('packet.source_packets[0].template_id'), 'source packet template browser QA must assert template identity through copied JSON, not visible localized text');
assert.ok(sourcePacketTemplateBrowserSpec.includes('template presets ready'), 'source packet template browser QA must forbid raw English template status residues');
assert.ok(sourcePacketTemplateBrowserSpec.includes('local manual source packet template'), 'source packet template browser QA must forbid raw English source-template policy residues');

const providerBrowserSpec = fs.readFileSync('tests/provider-mode-browser.spec.mjs', 'utf8');
assert.ok(providerBrowserSpec.includes('expectProviderKeyNotExported'), 'provider browser QA must use localization-aware exported-key assertions');
assert.equal(providerBrowserSpec.includes("toContainText(/key_exported:false/)"), false, 'provider browser QA must not require English-only diagnostics copy');
for (const lang of ['ar', 'fr']) {
  assert.equal(researchCopy[lang].qualityFixProvider.includes('key_exported'), false, `${lang}.qualityFixProvider must not expose raw English implementation flag in visible localized copy`);
  assert.equal(researchCopy[lang].qualityFixProvider.includes('false'), false, `${lang}.qualityFixProvider must not expose raw English boolean in visible localized copy`);
}


const visibleOptionKeys = [
  'sourceTypeOfficial','sourceTypeAcademic','sourceTypeNews','sourceTypeSocial','sourceTypeMarket','sourceTypeExpert','sourceTypePrimary','sourceTypeOther',
  'confidenceLow','confidenceMedium','confidenceHigh',
  'relationshipMotivates','relationshipEnables','relationshipConstrains','relationshipContradicts','relationshipAmplifies',
  'sourceConnectorManualMock','sourceConnectorWebSearchApi','sourceConnectorGithubRepo',
  'searchProviderMock','formatLast30Days','formatDeepResearch','formatGenericReport','formatSourcePacket'
];
for (const lang of ['ar', 'fr']) {
  for (const key of visibleOptionKeys) {
    assert.ok(researchCopy[lang][key], `${lang}.${key} missing visible option localization`);
  }
}
for (const key of visibleOptionKeys) {
  assert.notEqual(researchCopy.ar[key], researchCopy.en[key], `ar.${key} must not inherit English visible option copy`);
}
for (const key of ['sourceConnectorWebSearchApi','sourceConnectorGithubRepo','formatDeepResearch','formatGenericReport','formatSourcePacket']) {
  assert.notEqual(researchCopy.fr[key], researchCopy.en[key], `fr.${key} must not inherit English residual option copy`);
}
const renderHelpersStrictSource = fs.readFileSync('src/research/render-helpers.js', 'utf8');
assert.ok(renderHelpersStrictSource.includes("localizeSelectOptions('providerName'"), 'provider select options must be localized before hosted evidence capture');
assert.ok(renderHelpersStrictSource.includes("localizeSelectOptions('sourceImportFormat'"), 'source import format options must be localized before hosted evidence capture');
for (const lang of ['ar', 'fr']) {
  for (const key of ['providerPromptLabel','providerContractLabel','sourcePlanningScore','responseValidationScore','contractFixtureScore']) {
    assert.ok(researchCopy[lang][key], `${lang}.${key} missing residual-visible localization`);
    assert.notEqual(researchCopy[lang][key], researchCopy.en[key], `${lang}.${key} must not expose English residual copy`);
  }
}


const residualLanguageKeys = ['runLedgerEmpty','sourceTypesEmpty','convertedLabel','rejectedLabel','policyPrioritizationGuard','sourcePacketTemplateReportTitle','localizedSourceTemplatePolicy'];
for (const lang of ['ar', 'fr']) {
  for (const key of residualLanguageKeys) {
    assert.ok(researchCopy[lang][key], `${lang}.${key} missing residual evidence-surface localization`);
    assert.notEqual(researchCopy[lang][key], researchCopy.en[key], `${lang}.${key} must not inherit English residual evidence-surface copy`);
  }
}
for (const lang of ['ar', 'fr']) {
  assert.ok(researchCopy[lang].statusLabels.template_presets_ready, `${lang}.statusLabels.template_presets_ready missing localized template preset label`);
  assert.notEqual(researchCopy[lang].statusLabels.template_presets_ready, researchCopy.en.statusLabels.template_presets_ready, `${lang}.statusLabels.template_presets_ready must not inherit English`);
  for (const key of ['high','medium','low']) {
    assert.ok(researchCopy[lang].statusLabels[key], `${lang}.statusLabels.${key} missing localized severity/status label`);
    assert.notEqual(researchCopy[lang].statusLabels[key], researchCopy.en.statusLabels[key], `${lang}.statusLabels.${key} must not inherit English`);
  }
}
const engineLocalizationSource = fs.readFileSync('src/research-engine.js', 'utf8');
for (const requiredHelper of ['function lST', 'function lCf', 'function lSTs', 'policyPrioritizationGuard', 'local_manual_source_packet_template_no_fetch_no_verification']) {
  assert.ok(engineLocalizationSource.includes(requiredHelper), `research engine must localize residual evidence/provider text via ${requiredHelper}`);
}
for (const residual of ['No provider runs yet.', ' converted</span>', ' rejected</span>', 'no source types', 'template presets ready', 'local manual source packet template no fetch no verification']) {
  assert.equal(engineLocalizationSource.includes(residual), false, `research engine must not render residual English evidence/provider copy: ${residual}`);
}

for (const lang of ['ar', 'fr']) {
  assert.ok(researchCopy[lang].statusLabels.scores_explain_prioritization_not_truth, `${lang}.statusLabels.scores_explain_prioritization_not_truth missing localized score-policy guard`);
  assert.notEqual(researchCopy[lang].statusLabels.scores_explain_prioritization_not_truth, researchCopy.en.statusLabels.scores_explain_prioritization_not_truth, `${lang} scoring policy guard must not fall back to English`);
}
assert.ok(!researchCopy.ar.statusLabels.scores_explain_prioritization_not_truth.includes('scores explain'), 'Arabic scoring policy guard must not expose English fallback copy');
assert.ok(!researchCopy.fr.evidenceScoringPolicyNote.includes('Attention ='), 'French evidence-scoring note must not expose English equality-style fallback copy');
assert.ok(!researchCopy.fr.evidenceScoringCalibrationShort.includes('Attention ='), 'French short scoring note must not expose English equality-style fallback copy');

console.log('Language description audit checks passed.');
process.exit(0);
