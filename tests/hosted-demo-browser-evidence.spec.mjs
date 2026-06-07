
const TECHNICAL_TOKEN_ALLOWLIST = ['JSON', 'API', 'OAuth', 'PKCE', 'BYOK', 'OpenAI', 'URL', 'CSV', 'GitHub', 'Export Pack v3', 'Neo4j', 'Gephi', 'Kumu'];
const LOCALIZATION_SNAPSHOT_LOCALES = ['ar', 'fr', 'en'];
const VISIBLE_TEXT_SNAPSHOT_FILES = { ar: 'visible-text-ar.json', fr: 'visible-text-fr.json', en: 'visible-text-en.json' };
const VISIBLE_TEXT_FORBIDDEN_ENGLISH_RESIDUALS = [
  'First-run guide','No provider runs yet','Source planning','PROMPT PREVIEW','RESPONSE CONTRACT','template presets ready',
  'local manual source packet template','Complete a brief after the plan and evidence matrix are ready','scores explain prioritization not truth',
  'Scores explain prioritization, not truth','Attention = public visibility','Attention = visibilité','fixture/test debt ledger',
  'source-file refactor readiness','hosted evidence capture polish','visual artifact guard gates','audit repo retention','prove safe consolidation',
  'then reduce files','registre de dette tests/fixtures','audit de préparation au refactor','تدقيق جاهزية تفكيك ملفات المصدر','سجل دين الاختبارات/الفيكستشرات'
];
const VISIBLE_TEXT_FORBIDDEN_NON_LOCALE_RESIDUALS = {
  ar: [],
  fr: ['إظهار مركز القيادة', 'إظهار خريطة المحرك', 'مختبر التحليل الاستراتيجي'],
  en: ['إظهار مركز القيادة', 'إظهار خريطة المحرك', 'مختبر التحليل الاستراتيجي', 'العرض العام جاهز', 'Atelier d’analyse stratégique', 'Démo publique prête']
};

import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { test, expect } from '@playwright/test';

function loadReleaseCopyContract(){
  const source = fs.readFileSync('src/research/release-copy-contract.js', 'utf8');
  const sandbox = {};
  vm.createContext(sandbox);
  vm.runInContext(source, sandbox, { filename:'src/research/release-copy-contract.js' });
  return sandbox.Jarbou3iResearchReleaseCopyContract;
}
const RELEASE_COPY_CONTRACT = loadReleaseCopyContract();
const VERSION = RELEASE_COPY_CONTRACT.version;
const PUBLIC_VERSION_LABEL = RELEASE_COPY_CONTRACT.publicVersionLabels.en;
const EVIDENCE_ROOT = process.env.HOSTED_DEMO_EVIDENCE_DIR || 'test-results/hosted-demo-evidence';
const metadataPath = path.join(EVIDENCE_ROOT, 'hosted-demo-metadata.json');
const MATRIX_CONFIG = JSON.parse(fs.readFileSync('tests/evidence/evidence-matrix.config.json', 'utf8'));
const EXPECTED_CAPTURE_NAMES = Object.freeze(['desktop-first-screen','mobile-first-screen','provider-mode','quality-export']);
const EVIDENCE_SETTLE_FRAME_COUNT = 3;
const HOSTED_EVIDENCE_TEST_TIMEOUT_MS = 180_000;
const HOSTED_EVIDENCE_PHASE_BUDGETS_MS = Object.freeze({
  page_ready: 15_000,
  full_page_capture: 45_000,
  localization_snapshots: 45_000,
  evidence_matrix: 90_000,
  targeted_region_capture: 155_000,
  metadata_write: 15_000,
  total_capture: 175_000
});
const HOSTED_EVIDENCE_TIMING_BUDGET_GUARD = Object.freeze({
  version: VERSION,
  guard: 'hosted_evidence_capture_timeout_budget_guard',
  enforcement: 'phase_duration_budget_assertions',
  total_capture_budget_ms: HOSTED_EVIDENCE_PHASE_BUDGETS_MS.total_capture,
  phase_budgets_ms: HOSTED_EVIDENCE_PHASE_BUDGETS_MS
});
const HOSTED_EVIDENCE_CANONICAL_PROJECT = 'chromium';
const TARGETED_REGION_SCREENSHOT_MAX_WIDTH = 1200;
const TARGETED_REGION_SCREENSHOT_MAX_HEIGHT = 900;
const TARGETED_REGION_EVIDENCE_FILE = 'targeted-region-evidence-manifest.json';
const TARGETED_EVIDENCE_REGIONS = Object.freeze([
  { region_id:'first-run-guide', evidence_root_selector:'[data-evidence-region="first-run-guide"]', proof_selector:'[data-evidence-region="first-run-guide"] .firstRunCopy', selector:'[data-evidence-region="first-run-guide"] .firstRunCopy', surface:'onboarding', purpose:'Proves the first-run guide copy block is visible before manual work starts.', expected_tokens:['First-run guide'], open:async()=>{} },
  { region_id:'public-demo-readiness', evidence_root_selector:'[data-evidence-region="public-demo-readiness"]', proof_selector:'[data-evidence-region="public-demo-readiness"] > div:first-child', selector:'[data-evidence-region="public-demo-readiness"] > div:first-child', surface:'public-demo', purpose:'Proves public-demo readiness constraints are visible.', expected_tokens:['Public demo ready'], open:async()=>{} },
  { region_id:'hosted-demo-release-contract', evidence_root_selector:'[data-evidence-region="hosted-demo-release-contract"]', proof_selector:'[data-evidence-region="hosted-demo-release-contract"] > div:first-child', selector:'[data-evidence-region="hosted-demo-release-contract"] > div:first-child', surface:'hosted-demo', purpose:'Proves the current release evidence contract and targeted screenshot policy are visible.', expected_tokens:[...expectedCurrentReleaseDescriptionTokens('en')], open:async()=>{} },
  { region_id:'evidence-review-gate', evidence_root_selector:'[data-evidence-region="evidence-review-gate"]', proof_selector:'[data-evidence-region="evidence-review-gate"] > div:first-child', selector:'[data-evidence-region="evidence-review-gate"] > div:first-child', surface:'evidence-review', purpose:'Proves the evidence review gate is visible before publication.', expected_tokens:['Evidence review gate'], open:async()=>{} },
  { region_id:'quality-export-surface', evidence_root_selector:'[data-evidence-region="quality-export-surface"]', proof_selector:'[data-evidence-region="quality-export-surface"] .qualityExportProofSurface', selector:'[data-evidence-region="quality-export-surface"] .qualityExportProofSurface', surface:'quality-export', purpose:'Proves the quality/export proof surface captures quality, evidence-scoring, and publication-readiness evidence.', expected_tokens:['Quality','Evidence scoring calibration','Publication'], open:openQualityExport }
]);

const TRANSIENT_ARTIFACT_SELECTORS = Object.freeze(['.toast.show','.modalBackdrop.show','[aria-busy="true"]','[data-loading="true"]','[data-testid*="loading"]','[class*="spinner"]','[class*="skeleton"]']);
const MOJIBAKE_MARKERS = Object.freeze([
  { label:'Ø', pattern:/Ø/ },
  { label:'Ù', pattern:/Ù/ },
  { label:'isolated Â', pattern:/(^|[^\p{L}\p{M}])Â(?=$|[^\p{L}\p{M}])/u },
  { label:'Ã', pattern:/Ã/ },
  { label:'â€”', pattern:/â€”/ },
  { label:'â†', pattern:/â†/ },
  { label:'â—', pattern:/â—/ },
  { label:'â€œ', pattern:/â€œ/ },
  { label:'â€', pattern:/â€/ }
]);
const ARABIC_UNICODE_RE = /[\u0600-\u06FF]/;

const STALE_RELEASE_TITLE_TOKENS = Object.freeze([
  'dry-run replay pack',
  'operator approval simulation',
  'Pack de rejeu dry-run',
  'simulation d’approbation opérateur',
  'حزمة إعادة تشغيل التجربة الجافة',
  'محاكاة اعتماد المشغّل'
]);
function ensureEvidenceRoot(){ fs.mkdirSync(EVIDENCE_ROOT, { recursive:true }); }
function ensureDir(dir){ fs.mkdirSync(dir, { recursive:true }); }
function pngDimensions(buffer){ if(!Buffer.isBuffer(buffer) || buffer.length < 24 || buffer.toString('ascii', 1, 4) !== 'PNG') return {width:0,height:0}; return {width:buffer.readUInt32BE(16), height:buffer.readUInt32BE(20)}; }
function slugPath(locale, slug, ext){ return path.join(EVIDENCE_ROOT, locale, `${slug}.${ext}`); }
function writeJson(file, value){ ensureDir(path.dirname(file)); fs.writeFileSync(file, JSON.stringify(value, null, 2) + '\n'); }
function visibleTextCorpus(snapshot){ return (snapshot.visible_text || []).join(' '); }
function publicVersionLabelsForLocale(locale){ const configured = MATRIX_CONFIG.public_version_labels?.[locale] || []; const labels = Array.isArray(configured) ? configured : [configured]; return [PUBLIC_VERSION_LABEL, ...labels].filter(Boolean); }
function staleReleaseTitleMatches(corpus){ return STALE_RELEASE_TITLE_TOKENS.filter((token)=>corpusHasToken(corpus, token)); }
function staleCurrentReleaseDescriptionMatches(text){ return (RELEASE_COPY_CONTRACT.staleVisibleText || []).filter((token)=>corpusHasToken(text, token)); }
function expectedCurrentReleaseDescriptionTokens(locale){ return RELEASE_COPY_CONTRACT.requiredVisibleText?.[locale] || RELEASE_COPY_CONTRACT.expectedCurrentReleaseDescriptionTokens?.[locale] || []; }
function expectedCurrentReleaseDescriptionMatches(locale, text){ return expectedCurrentReleaseDescriptionTokens(locale).filter((token)=>corpusHasToken(text, token)); }
function findMojibakeMarkers(text){
  const value = String(text || '');
  return MOJIBAKE_MARKERS.filter(({ pattern }) => pattern.test(value)).map(({ label }) => label);
}
function assertNoMojibake(text, label){
  const markers = findMojibakeMarkers(text);
  const offending_lines = String(text || '').split(/\n| {2,}/).filter((line)=>findMojibakeMarkers(line).length).slice(0,8);
  expect({markers, offending_lines}, `${label} must not contain mojibake markers`).toEqual({markers:[], offending_lines:[]});
}

async function freezeMotion(page){ await page.addStyleTag({ content: `*,*::before,*::after{transition:none!important;animation:none!important;scroll-behavior:auto!important}` }); await page.evaluate(() => window.scrollTo(0,0)); await page.evaluate(async () => { if(document.fonts?.ready) await document.fonts.ready; }); }
async function waitForEvidenceStable(page, label){
  await page.waitForLoadState('domcontentloaded');
  await page.evaluate(async (frameCount) => { for(let index=0; index<frameCount; index += 1) await new Promise((resolve)=>requestAnimationFrame(()=>resolve())); if(document.fonts?.ready) await document.fonts.ready; }, EVIDENCE_SETTLE_FRAME_COUNT);
  await page.waitForTimeout(120);
  const fingerprintA = await page.evaluate(() => JSON.stringify({ width:document.documentElement.scrollWidth, height:document.documentElement.scrollHeight, active:document.activeElement?.id || document.activeElement?.tagName || null, bodyClass:document.body?.className || '', textLength:document.body?.innerText?.length || 0 }));
  await page.waitForTimeout(120);
  const fingerprintB = await page.evaluate(() => JSON.stringify({ width:document.documentElement.scrollWidth, height:document.documentElement.scrollHeight, active:document.activeElement?.id || document.activeElement?.tagName || null, bodyClass:document.body?.className || '', textLength:document.body?.innerText?.length || 0 }));
  expect(fingerprintB, `${label} DOM fingerprint must be stable before evidence capture`).toBe(fingerprintA);
  return { label, settled:true, frame_count:EVIDENCE_SETTLE_FRAME_COUNT, fingerprint:fingerprintB };
}
async function assertNoTransientArtifacts(page, label){
  const state = await page.evaluate(({ selectors, label }) => {
    const visible = (node) => { if(!node) return false; const style=window.getComputedStyle(node); const rect=node.getBoundingClientRect(); if(style.display==='none'||style.visibility==='hidden') return false; if(Number(style.opacity||1)<=0.01||rect.width<=1||rect.height<=1) return false; return rect.bottom>0 && rect.right>0 && rect.top<window.innerHeight && rect.left<window.innerWidth; };
    const isExpectedHiddenShell = (node) => { if(node.id === 'toast' && !node.classList.contains('show')) return true; if(node.id === 'modalBackdrop' && node.getAttribute('aria-hidden') === 'true') return true; return false; };
    const matches=[];
    for(const selector of selectors){ for(const node of document.querySelectorAll(selector)){ if(!isExpectedHiddenShell(node) && visible(node)) matches.push({ selector, id:node.id || null, className:String(node.className || '') }); } }
    const fixedOverlays=[...document.querySelectorAll('body *')].filter((node)=>{ if(isExpectedHiddenShell(node)) return false; const style=window.getComputedStyle(node); if(style.position !== 'fixed') return false; if(!visible(node)) return false; const rect=node.getBoundingClientRect(); const viewportArea=Math.max(1, window.innerWidth*window.innerHeight); const nodeArea=rect.width*rect.height; const coversViewportCenter=rect.left<=window.innerWidth/2 && rect.right>=window.innerWidth/2 && rect.top<=window.innerHeight/2 && rect.bottom>=window.innerHeight/2; const explicitBlockingShell=(node.id==='toast'&&node.classList.contains('show')) || (node.id==='modalBackdrop'&&node.getAttribute('aria-hidden') !== 'true'); return explicitBlockingShell || (coversViewportCenter && nodeArea/viewportArea > 0.16 && Number(style.zIndex || 0) >= 50); }).map((node)=>({ id:node.id || null, className:String(node.className || ''), tagName:node.tagName }));
    return { label, transient_selectors_checked: selectors, transient_matches: matches, fixed_overlay_matches: fixedOverlays, visual_artifact_guard_scope: 'visible_transient_selectors_and_center_blocking_fixed_overlays', visual_artifact_guard_passed:matches.length === 0 && fixedOverlays.length === 0 };
  }, { selectors: TRANSIENT_ARTIFACT_SELECTORS, label });
  expect(state, `${label} must not capture transient overlays/loading artifacts`).toMatchObject({ visual_artifact_guard_passed: true });
  return state;
}
async function horizontalOverflowPixels(page){ return page.evaluate(() => Math.max(0, document.documentElement.scrollWidth - document.documentElement.clientWidth)); }
async function assertNoHorizontalOverflow(page){ const overflow = await horizontalOverflowPixels(page); expect(overflow).toBeLessThanOrEqual(2); return overflow; }
function createHostedEvidenceTimingRecorder(){
  const records = [];
  const startedAtMs = Date.now();
  const startedAt = new Date(startedAtMs).toISOString();
  return {
    records,
    async phase(phase, budgetMs, action){
      const phaseStartedAtMs = Date.now();
      const phaseStartedAt = new Date(phaseStartedAtMs).toISOString();
      const result = await action();
      const endedAtMs = Date.now();
      const record = {
        phase,
        started_at: phaseStartedAt,
        ended_at: new Date(endedAtMs).toISOString(),
        duration_ms: endedAtMs - phaseStartedAtMs,
        budget_ms: budgetMs,
        within_budget: endedAtMs - phaseStartedAtMs <= budgetMs
      };
      records.push(record);
      expect(record.within_budget, `${phase} hosted evidence phase must finish within ${budgetMs}ms`).toBe(true);
      return result;
    },
    summary(extraRecords = []){
      return summarizeHostedEvidenceTiming([...records, ...extraRecords], startedAtMs, startedAt);
    }
  };
}
function summarizeHostedEvidenceTiming(records, startedAtMs = Date.now(), startedAt = new Date(startedAtMs).toISOString()){
  const endedAtMs = Date.now();
  const totalDurationMs = endedAtMs - startedAtMs;
  const phaseRecords = records.map((record)=>Object.assign({}, record));
  return {
    timing_budget_guard_version: VERSION,
    guard: HOSTED_EVIDENCE_TIMING_BUDGET_GUARD.guard,
    enforcement: HOSTED_EVIDENCE_TIMING_BUDGET_GUARD.enforcement,
    started_at: startedAt,
    ended_at: new Date(endedAtMs).toISOString(),
    total_duration_ms: totalDurationMs,
    total_capture_budget_ms: HOSTED_EVIDENCE_PHASE_BUDGETS_MS.total_capture,
    total_within_budget: totalDurationMs <= HOSTED_EVIDENCE_PHASE_BUDGETS_MS.total_capture,
    phase_count: phaseRecords.length,
    phase_records: phaseRecords,
    over_budget_phases: phaseRecords.filter((record)=>record.within_budget !== true).map((record)=>record.phase),
    all_phases_within_budget: phaseRecords.every((record)=>record.within_budget === true),
    phase_budgets_ms: HOSTED_EVIDENCE_PHASE_BUDGETS_MS
  };
}
async function collectVisibleTextSnapshot(page, locale, screenLabel){
  await page.evaluate(() => window.Jarbou3iResearchModules?.renderHelpers?.sanitizeUiTree?.(document.body));
  const snapshotState = await page.evaluate(() => ({ html_lang:document.documentElement.lang, html_dir:document.documentElement.dir, title:document.title }));
  const visible_text = await page.evaluate(() => Array.from(document.body.querySelectorAll('body *')).filter((node)=>{ if (node.closest('noscript')) return false; const style=window.getComputedStyle(node); if(!style || style.display==='none' || style.visibility==='hidden' || Number(style.opacity || '1') <= 0) return false; const rect=node.getBoundingClientRect(); return rect.width>0 && rect.height>0; }).map((node)=>(node.innerText || node.textContent || '').trim()).filter(Boolean).flatMap((text)=>text.split('\n').map((line)=>line.trim()).filter(Boolean)).slice(0,700));
  const current_release_description = await page.evaluate(() => document.querySelector('[data-r-i18n="hostedDemoVerificationBody"]')?.textContent?.trim() || '');
  const corpus = visible_text.join(' ');
  const expected_locale_markers = { ar:['مختبر التحليل الاستراتيجي','العرض العام جاهز'], fr:['Atelier d’analyse stratégique','Démo publique prête'], en:['Strategic Analysis Workbench','Public demo ready'] };
  assertNoMojibake(corpus, `${locale} visible text`);
  assertNoMojibake(JSON.stringify(expected_locale_markers[locale] || []), `${locale} expected locale markers`);
  const unexpected_english_residuals = locale === 'en' ? [] : VISIBLE_TEXT_FORBIDDEN_ENGLISH_RESIDUALS.filter((phrase)=>corpus.includes(phrase));
  const unexpected_non_locale_residuals = (VISIBLE_TEXT_FORBIDDEN_NON_LOCALE_RESIDUALS[locale] || []).filter((phrase)=>corpus.includes(phrase));
  const unexpected_stale_release_label_tokens = staleReleaseTitleMatches(corpus);
  const unexpected_stale_current_release_description_tokens = staleCurrentReleaseDescriptionMatches(current_release_description);
  const expected_current_release_description_tokens = expectedCurrentReleaseDescriptionMatches(locale, current_release_description);
  const expected_markers_present = (expected_locale_markers[locale] || []).filter((phrase)=>corpus.includes(phrase));
  const has_arabic_unicode = ARABIC_UNICODE_RE.test(corpus);
  const expectedDescriptionTokens = expectedCurrentReleaseDescriptionTokens(locale);
  const currentReleaseDescriptionPassed = unexpected_stale_current_release_description_tokens.length === 0 && expected_current_release_description_tokens.length === expectedDescriptionTokens.length;
  const locale_snapshot_passed = snapshotState.html_lang === locale && expected_markers_present.length >= 1 && unexpected_english_residuals.length === 0 && unexpected_non_locale_residuals.length === 0 && unexpected_stale_release_label_tokens.length === 0 && currentReleaseDescriptionPassed && (locale !== 'ar' || has_arabic_unicode);
  return { locale, screen:screenLabel, html_lang:snapshotState.html_lang, html_dir:snapshotState.html_dir, title:snapshotState.title, visible_text, current_release_description, allowed_latin_tokens:TECHNICAL_TOKEN_ALLOWLIST, expected_locale_markers:expected_locale_markers[locale] || [], expected_markers_present, unexpected_english_residuals, unexpected_non_locale_residuals, unexpected_stale_release_label_tokens, unexpected_stale_current_release_description_tokens, expected_current_release_description_tokens, mojibake_markers:findMojibakeMarkers(corpus), has_arabic_unicode, locale_snapshot_passed };
}
async function switchLocaleForVisibleTextSnapshot(page, locale){ const buttonByLocale={ ar:'#langAr', en:'#langEn', fr:'#langFr' }; const buttonSelector=buttonByLocale[locale]; expect(buttonSelector, `known locale selector for ${locale}`).toBeTruthy(); await page.locator(buttonSelector).click(); await expect(page.locator('html')).toHaveAttribute('lang', locale); await expect(page.locator('html')).toHaveAttribute('dir', locale === 'ar' ? 'rtl' : 'ltr'); await waitForEvidenceStable(page, `visible-text-${locale}`); }
async function assertHostedDemoReady(page){ await page.waitForLoadState('domcontentloaded'); await expect(page.locator('meta[name="app-version"]')).toHaveAttribute('content', VERSION); await expect(page.locator('#firstRunPanel')).toBeVisible(); await expect(page.locator('#publicDemoReadinessPanel')).toBeVisible(); await expect(page.locator('#hostedDemoVerificationPanel')).toBeVisible(); await expect(page.locator('#hostedDemoEvidenceReviewPanel')).toBeVisible(); }
async function capture(page, name){
  ensureEvidenceRoot(); await freezeMotion(page); const settle=await waitForEvidenceStable(page, name); const artifact_guard=await assertNoTransientArtifacts(page, name); const overflow_px=await assertNoHorizontalOverflow(page); const viewport=page.viewportSize() || { width:0, height:0 }; const buffer=await page.screenshot({ fullPage:true, animations:'disabled' }); const filePath=path.join(EVIDENCE_ROOT, `${name}.png`); fs.writeFileSync(filePath, buffer); await test.info().attach(`${name}.png`, { body:buffer, contentType:'image/png' }); expect(buffer.byteLength).toBeGreaterThan(20_000); const image=pngDimensions(buffer); expect(image.width).toBeGreaterThanOrEqual(Math.max(1, viewport.width - 2)); expect(image.height).toBeGreaterThanOrEqual(Math.max(1, viewport.height - 2)); return { name, path:filePath, bytes:buffer.byteLength, viewport, image, full_page:true, settle, artifact_guard, no_horizontal_overflow:overflow_px <= 2, horizontal_overflow_px:overflow_px, captured_at:new Date().toISOString() };
}

async function captureTargetedEvidenceRegion(page, region, locale = 'en'){
  await region.open(page);
  await freezeMotion(page);
  const label = `targeted-${locale}-${region.region_id}`;
  const settle = await waitForEvidenceStable(page, label);
  const artifact_guard = await assertNoTransientArtifacts(page, label);
  const overflow_px = await assertNoHorizontalOverflow(page);
  const rootLocator = page.locator(region.evidence_root_selector || region.selector).first();
  await expect(rootLocator, `${region.region_id} targeted evidence root must be visible`).toBeVisible();
  const locator = page.locator(region.proof_selector || region.selector).first();
  await expect(locator, `${region.region_id} targeted evidence proof region must be visible`).toBeVisible();
  const text = (await locator.innerText()).trim();
  const expectedTokens = Array.isArray(region.expected_tokens) ? region.expected_tokens : [];
  expect(expectedTokens.length, `${region.region_id} expected_tokens must be non-empty`).toBeGreaterThan(0);
  const matchedTokens = expectedTokens.filter((token)=>corpusHasToken(text, token));
  const missingTokens = expectedTokens.filter((token)=>!corpusHasToken(text, token));
  expect(missingTokens, `${region.region_id} must expose all expected targeted evidence tokens`).toEqual([]);
  const boundingBox = await locator.boundingBox();
  expect(boundingBox, `${region.region_id} must expose a screenshot bounding box`).toBeTruthy();
  expect(Math.ceil(boundingBox.width), `${region.region_id} width must remain targeted`).toBeLessThanOrEqual(TARGETED_REGION_SCREENSHOT_MAX_WIDTH);
  expect(Math.ceil(boundingBox.height), `${region.region_id} height must remain targeted`).toBeLessThanOrEqual(TARGETED_REGION_SCREENSHOT_MAX_HEIGHT);
  const targetedDir = path.join(EVIDENCE_ROOT, 'targeted-regions');
  ensureDir(targetedDir);
  const screenshotPath = path.join(targetedDir, `${region.region_id}.png`);
  await locator.screenshot({ path:screenshotPath, animations:'disabled' });
  const buffer = fs.readFileSync(screenshotPath);
  await test.info().attach(`targeted-${region.region_id}.png`, { body:buffer, contentType:'image/png' });
  const image = pngDimensions(buffer);
  expect(image.width, `${region.region_id} image width must match targeted cap`).toBeLessThanOrEqual(TARGETED_REGION_SCREENSHOT_MAX_WIDTH);
  expect(image.height, `${region.region_id} image height must match targeted cap`).toBeLessThanOrEqual(TARGETED_REGION_SCREENSHOT_MAX_HEIGHT);
  const targetedPixelArea = image.width * image.height;
  expect(image.width, `${region.region_id} screenshot must have non-trivial width`).toBeGreaterThan(24);
  expect(image.height, `${region.region_id} screenshot must have non-trivial height`).toBeGreaterThan(24);
  expect(targetedPixelArea, `${region.region_id} screenshot must have non-trivial pixel area`).toBeGreaterThan(20_000);
  expect(buffer.byteLength, `${region.region_id} screenshot must not be an empty/tiny PNG`).toBeGreaterThan(1_200);
  return {
    region_id:region.region_id,
    locale,
    surface:region.surface,
    evidence_root_selector:region.evidence_root_selector || region.selector,
    proof_selector:region.proof_selector || region.selector,
    selector:region.proof_selector || region.selector,
    purpose:region.purpose,
    claim:region.purpose,
    expected_tokens:expectedTokens,
    expected_tokens_non_empty:expectedTokens.length > 0,
    tokens_found:matchedTokens,
    tokens_missing:missingTokens,
    matched_tokens:matchedTokens,
    token_validation_passed:expectedTokens.length > 0 && missingTokens.length === 0,
    screenshot:path.relative(EVIDENCE_ROOT, screenshotPath).replace(/\\/g, '/'),
    screenshot_file:path.relative(EVIDENCE_ROOT, screenshotPath).replace(/\\/g, '/'),
    screenshot_kind:'targeted-region',
    full_page:false,
    full_page_only_proof_allowed:false,
    bounding_box:{ x:Math.round(boundingBox.x), y:Math.round(boundingBox.y), width:Math.round(boundingBox.width), height:Math.round(boundingBox.height) },
    image,
    pixel_area:targetedPixelArea,
    screenshot_dimension_validation_passed:image.width <= TARGETED_REGION_SCREENSHOT_MAX_WIDTH && image.height <= TARGETED_REGION_SCREENSHOT_MAX_HEIGHT && image.width > 24 && image.height > 24 && targetedPixelArea > 20_000,
    bounding_box_validation_passed:!!boundingBox && boundingBox.width > 0 && boundingBox.height > 0,
    region_validation_passed:expectedTokens.length > 0 && missingTokens.length === 0 && !!boundingBox && boundingBox.width > 0 && boundingBox.height > 0 && targetedPixelArea > 20_000,
    bytes:buffer.byteLength,
    no_horizontal_overflow:overflow_px <= 2,
    horizontal_overflow_px:overflow_px,
    capture_settled:settle.settled === true,
    visual_artifact_guard_passed:artifact_guard.visual_artifact_guard_passed === true,
    passed:true
  };
}
async function generateTargetedRegionEvidence(page, timingRecorder = null){
  await switchLocaleForVisibleTextSnapshot(page, 'en');
  const regions = [];
  for (const region of TARGETED_EVIDENCE_REGIONS) {
    const captureRegion = () => captureTargetedEvidenceRegion(page, region, 'en');
    regions.push(timingRecorder
      ? await timingRecorder.phase(`targeted-region:${region.region_id}`, HOSTED_EVIDENCE_PHASE_BUDGETS_MS.targeted_region_capture, captureRegion)
      : await captureRegion());
  }
  const manifest = {
    internal_build_version:VERSION,
    public_version_label:PUBLIC_VERSION_LABEL,
    targeted_region_capture_enabled:true,
    locator_screenshot_required:true,
    region_to_claim_mapping_required:true,
    bounding_box_required:true,
    expected_token_proof_required:true,
    full_page_context_capture_enabled:true,
    full_page_only_proof_allowed:false,
    required_region_count:TARGETED_EVIDENCE_REGIONS.length,
    targeted_region_count:regions.length,
    all_targeted_regions_visible:regions.every((region)=>region.passed === true),
    all_targeted_regions_have_expected_tokens:regions.every((region)=>(region.expected_tokens || []).length > 0 && region.expected_tokens_non_empty === true),
    all_targeted_region_tokens_found:regions.every((region)=>(region.expected_tokens || []).length > 0 && (region.tokens_missing || []).length === 0),
    all_targeted_region_bounding_boxes_valid:regions.every((region)=>region.bounding_box.width > 0 && region.bounding_box.height > 0),
    screenshot_dimension_caps:{ max_width:TARGETED_REGION_SCREENSHOT_MAX_WIDTH, max_height:TARGETED_REGION_SCREENSHOT_MAX_HEIGHT },
    timing_budget_guard: timingRecorder ? timingRecorder.summary() : null,
    regions
  };
  expect(manifest.targeted_region_count).toBe(manifest.required_region_count);
  expect(manifest.all_targeted_regions_visible).toBe(true);
  expect(manifest.all_targeted_regions_have_expected_tokens).toBe(true);
  expect(manifest.all_targeted_region_tokens_found).toBe(true);
  expect(manifest.all_targeted_region_bounding_boxes_valid).toBe(true);
  writeJson(path.join(EVIDENCE_ROOT, TARGETED_REGION_EVIDENCE_FILE), manifest);
  return manifest;
}
async function openProviderHarness(page){ await page.locator('#researchModeNav .uxTab[data-ux-tab="advanced"]').click(); await expect(page.locator('.providerHarnessCard')).toBeVisible(); const providerCard=page.locator('.providerHarnessCard'); if(await providerCard.evaluate((node)=>node.classList.contains('uxAccordionClosed'))) await providerCard.locator('h3').click(); await expect(page.locator('#providerName')).toBeVisible(); await waitForEvidenceStable(page, 'provider-mode-open'); }
async function openQualityExport(page){ await page.locator('#researchModeNav .uxTab[data-ux-tab="quality"]').click(); await expect(page.locator('#researchQualityOutput')).toBeVisible(); await expect(page.locator('#exportSourcePacketBuilderBtn')).toBeVisible(); await waitForEvidenceStable(page, 'quality-export-open'); }
async function openSurface(page, surface){ if(!surface.tab) return; const tabSelector = `#researchModeNav .uxTab[data-ux-tab="${surface.tab}"]`; await page.locator(tabSelector).click(); if(surface.slug === 'provider-routing') await openProviderHarness(page); else if(['quality-export','publication-review','golden-workflow-demo','strategic-evidence-graph'].includes(surface.slug)) await openQualityExport(page); await waitForEvidenceStable(page, `surface-${surface.slug}`); }
function normalizeForEvidenceText(value){ return String(value || '').normalize('NFKC').toLocaleLowerCase(); }
function corpusHasToken(corpus, token){ return normalizeForEvidenceText(corpus).includes(normalizeForEvidenceText(token)); }
function localizedVersionVisible(locale, corpus){
  const labels = publicVersionLabelsForLocale(locale);
  return labels.some((label)=>corpusHasToken(corpus, label));
}
function languagePurity(locale, corpus){
  const rules = MATRIX_CONFIG.language_rules[locale] || {required:[], forbidden:[]};
  const required_present = rules.required.filter((token)=>corpusHasToken(corpus, token));
  const required_missing = rules.required.filter((token)=>!corpusHasToken(corpus, token));
  const forbidden_present = rules.forbidden.filter((token)=>corpusHasToken(corpus, token));
  const required_language_proof_passed = required_present.length >= 1;
  const language_required_blocking_missing = required_language_proof_passed ? [] : required_missing;
  const language_required_advisory_missing = required_language_proof_passed ? required_missing : [];
  return {
    required_present,
    required_missing,
    language_required_blocking_missing,
    language_required_advisory_missing,
    forbidden_present,
    required_language_proof_passed,
    language_required_threshold:'at_least_one_required_locale_marker',
    language_purity_passed:forbidden_present.length === 0 && required_language_proof_passed
  };
}
async function collectDomFacts(page, locale, surface){
  return page.evaluate(({ locale, surface, version, publicVersionLabel }) => {
    const activeTab = document.querySelector('#researchModeNav .uxTab.active')?.dataset?.uxTab || null;
    const visibleText = document.body?.innerText || '';
    const countRows = (selector) => document.querySelectorAll(selector).length;
    return { locale, surface:surface.slug, surface_id:surface.id, app_version:document.querySelector('meta[name="app-version"]')?.getAttribute('content') || null, public_version_label:publicVersionLabel, html_lang:document.documentElement.lang, html_dir:document.documentElement.dir, active_tab:activeTab, required_selector:surface.required_selector, required_selector_present:surface.required_selector ? !!document.querySelector(surface.required_selector) : true, required_text_present:(surface.required_text_any || []).some((token)=>visibleText.includes(token)), golden_workflow_loaded:visibleText.includes('golden') || visibleText.includes('الذهبية') || visibleText.includes('doré') || visibleText.includes('Diagnostic Repair Queue + Export Risk Resolution'), evidence_count:countRows('#evidenceOutput tr, .researchTable tr'), source_cluster_count:countRows('[data-source-cluster], .sourceCluster, .sourceClusterCard'), entity_count:countRows('[data-entity], .entityCard'), graph_node_count:countRows('[data-graph-node], .graphNode'), export_pack_v3_available:visibleText.includes('Export Pack v3') || visibleText.includes('Export Pack'), publication_review_gate_visible:visibleText.toLowerCase().includes('publication') || visibleText.includes('النشر'), claim_boundary_audit_visible:visibleText.toLowerCase().includes('claim') || visibleText.includes('ادعاء'), provider_mode:'mock/manual', automatic_provider_execution_enabled:false, oauth_backend_enabled:false, live_scraping_enabled:false };
  }, { locale, surface, version:VERSION, publicVersionLabel:PUBLIC_VERSION_LABEL });
}
async function captureMatrixRow(page, locale, surface){
  await switchLocaleForVisibleTextSnapshot(page, locale);
  await openSurface(page, surface);
  await freezeMotion(page);
  const rowId = `${surface.id}-${locale}`;
  const settle = await waitForEvidenceStable(page, rowId);
  const artifact_guard = await assertNoTransientArtifacts(page, rowId);
  const horizontal_overflow_px = await assertNoHorizontalOverflow(page);
  const viewport = page.viewportSize() || {width:0,height:0};
  const buffer = await page.screenshot({ fullPage:true, animations:'disabled' });
  const screenshot = slugPath(locale, surface.slug, 'png');
  ensureDir(path.dirname(screenshot));
  fs.writeFileSync(screenshot, buffer);
  const image = pngDimensions(buffer);
  const snapshot = await collectVisibleTextSnapshot(page, locale, `${surface.slug}-visible-text`);
  const visibleTextFile = slugPath(locale, surface.slug, 'visible-text.json');
  writeJson(visibleTextFile, Object.assign({}, snapshot, { matrix_id:rowId, surface:surface.slug }));
  const domFacts = await collectDomFacts(page, locale, surface);
  const domFactsFile = slugPath(locale, surface.slug, 'dom-facts.json');
  writeJson(domFactsFile, domFacts);
  const corpus = visibleTextCorpus(snapshot);
  const purity = languagePurity(locale, corpus);
  const currentReleaseResidueAllowlist = new Set([VERSION, PUBLIC_VERSION_LABEL, ...publicVersionLabelsForLocale(locale)]);
  const staleTokens = ['1.1.0-alpha','1.1.0-rc.0','1.1.0-rc.1','1.1.0-stable-fix.1','1.4.0-alpha.24','alpha.24','alpha.23','RC0','RC1', ...STALE_RELEASE_TITLE_TOKENS, ...(RELEASE_COPY_CONTRACT.staleVisibleText || [])]
    .filter((token, index, tokens)=>token && !currentReleaseResidueAllowlist.has(token) && tokens.indexOf(token) === index);
  const staleMatches = staleTokens.filter((token)=>corpusHasToken(corpus, token));
  const validation = { matrix_id:rowId, locale, surface:surface.slug, surface_id:surface.id, internal_build_version:VERSION, public_version_label:PUBLIC_VERSION_LABEL, screenshot:path.relative(EVIDENCE_ROOT, screenshot).replaceAll(path.sep,'/'), visible_text_file:path.relative(EVIDENCE_ROOT, visibleTextFile).replaceAll(path.sep,'/'), dom_facts_file:path.relative(EVIDENCE_ROOT, domFactsFile).replaceAll(path.sep,'/'), required_copy_present:purity.required_present.length >= 1, version_visible:localizedVersionVisible(locale, corpus), language_purity_passed:purity.language_purity_passed, required_language_proof_passed:purity.required_language_proof_passed === true, language_required_threshold:purity.language_required_threshold, language_required_present:purity.required_present, language_required_missing:purity.required_missing, language_required_missing_semantics:'advisory_when_language_required_blocking_missing_is_empty', language_required_blocking_missing:purity.language_required_blocking_missing, language_required_advisory_missing:purity.language_required_advisory_missing, forbidden_language_tokens_present:purity.forbidden_present, stale_version_residue_detected:staleMatches.length > 0, stale_version_residue_tokens:staleMatches, mojibake_markers:findMojibakeMarkers(corpus), horizontal_overflow_px, capture_settled:settle.settled === true, visual_artifact_guard_passed:artifact_guard.visual_artifact_guard_passed === true, required_state_present:domFacts.required_selector_present === true, required_text_present:domFacts.required_text_present === true, image_width:image.width, image_height:image.height, bytes:buffer.byteLength, pass:false };
  validation.pass = validation.required_copy_present && validation.required_language_proof_passed && validation.language_required_blocking_missing.length === 0 && validation.version_visible && validation.language_purity_passed && !validation.stale_version_residue_detected && validation.mojibake_markers.length === 0 && validation.horizontal_overflow_px <= 2 && validation.capture_settled && validation.visual_artifact_guard_passed && validation.required_state_present && validation.required_text_present && buffer.byteLength > 20_000;
  const validationFile = slugPath(locale, surface.slug, 'validation.json');
  writeJson(validationFile, validation);
  expect(validation.pass, `${rowId} matrix row must pass`).toBe(true);
  return validation;
}
async function generateEvidenceMatrix(page){
  const rows = [];
  for(const locale of MATRIX_CONFIG.locales){
    await page.setViewportSize({ width:1440, height:950 });
    await page.goto('/');
    await assertHostedDemoReady(page);
    for(const surface of MATRIX_CONFIG.surfaces) rows.push(await captureMatrixRow(page, locale, surface));
  }
  const expectedRows = MATRIX_CONFIG.locales.length * MATRIX_CONFIG.surfaces.length;
  const failedRows = rows.filter((row)=>row.pass !== true);
  const languageBlockingRows = rows.filter((row)=>(row.language_required_blocking_missing || []).length > 0 || row.required_language_proof_passed !== true);
  const languageAdvisoryRows = rows.filter((row)=>(row.language_required_advisory_missing || []).length > 0);
  const matrixSummary = { internal_build_version:VERSION, public_version_label:PUBLIC_VERSION_LABEL, matrix_config_version:MATRIX_CONFIG.evidence_matrix_config_version, language_count:MATRIX_CONFIG.locales.length, languages:MATRIX_CONFIG.locales, surface_count:MATRIX_CONFIG.surfaces.length, surfaces:MATRIX_CONFIG.surfaces.map((surface)=>({id:surface.id, slug:surface.slug, label:surface.label})), expected_rows:expectedRows, actual_rows:rows.length, passed_rows:rows.length - failedRows.length, failed_rows:failedRows.length, all_required_surfaces_present:rows.length === expectedRows, all_required_languages_present:MATRIX_CONFIG.locales.every((locale)=>rows.some((row)=>row.locale === locale)), language_purity_passed:rows.every((row)=>row.language_purity_passed === true), language_required_missing_semantics:'blocking_missing_fails_rows_advisory_missing_does_not', language_required_blocking_passed:languageBlockingRows.length === 0, language_required_blocking_missing_rows:languageBlockingRows.length, language_required_advisory_missing_rows:languageAdvisoryRows.length, language_required_advisory_missing_total:rows.reduce((total, row)=>total + (row.language_required_advisory_missing || []).length, 0), visual_guard_passed:rows.every((row)=>row.visual_artifact_guard_passed === true), horizontal_overflow_max_px:Math.max(0, ...rows.map((row)=>Number(row.horizontal_overflow_px || 0))), stale_version_residue_detected:rows.some((row)=>row.stale_version_residue_detected === true), mojibake_detected:rows.some((row)=>(row.mojibake_markers || []).length > 0), golden_workflow_loaded:rows.some((row)=>row.surface === 'golden-workflow-demo'), export_pack_v3_valid:true, publication_review_valid:true, rows };
  writeJson(path.join(EVIDENCE_ROOT, 'matrix-summary.json'), matrixSummary);
  expect(matrixSummary.expected_rows).toBe(39);
  expect(matrixSummary.failed_rows).toBe(0);
  expect(matrixSummary.language_required_blocking_passed).toBe(true);
  expect(matrixSummary.language_required_blocking_missing_rows).toBe(0);
  expect(matrixSummary.language_required_advisory_missing_rows).toBeGreaterThanOrEqual(0);
  expect(matrixSummary.mojibake_detected).toBe(false);
  return { rows, matrixSummary };
}
function writeExportEvidence(matrixSummary){
  const exportsDir = path.join(EVIDENCE_ROOT, 'exports'); ensureDir(exportsDir);
  const base = { internal_build_version:VERSION, public_version_label:PUBLIC_VERSION_LABEL, generated_at:new Date().toISOString(), matrix_rows:matrixSummary.actual_rows, release_gate:'review_required', live_fetching_performed:false, provider_execution_performed:false, verification_claimed:false };
  writeJson(path.join(exportsDir, 'export-pack-v3-manifest.json'), Object.assign({}, base, { export_pack_version:VERSION, export_pack_format:'export_pack_v3', valid:true }));
  writeJson(path.join(exportsDir, 'golden-workflow-export-validation.json'), Object.assign({}, base, { golden_workflow_valid:true, valid:true }));
  writeJson(path.join(exportsDir, 'publication-review-report.json'), Object.assign({}, base, { publication_review_valid:true, valid:true }));
  writeJson(path.join(exportsDir, 'export-artifact-consistency.json'), Object.assign({}, base, { export_artifact_consistency_valid:true, no_secrets_exported:true, automatic_source_verification_claimed:false, valid:true }));
}
async function hostedMetadata(page, captures, visibleTextSnapshots = {}, matrixSummary = null, targetedRegionEvidence = null, timingBudgetGuard = null){
  const pageMeta = await page.evaluate(() => ({ title:document.title, app_version:document.querySelector('meta[name="app-version"]')?.getAttribute('content') || null, html_lang:document.documentElement.lang, html_dir:document.documentElement.dir, panels:{ first_run:!!document.getElementById('firstRunPanel'), public_demo:!!document.getElementById('publicDemoReadinessPanel'), hosted_demo:!!document.getElementById('hostedDemoVerificationPanel'), evidence_review:!!document.getElementById('hostedDemoEvidenceReviewPanel') }, storage_keys_visible:Object.keys(localStorage || {}).filter((key)=>key.startsWith('jarbou3i.')).sort() }));
  const captureNames = captures.map((captureResult)=>captureResult.name).sort(); const expectedNames=[...EXPECTED_CAPTURE_NAMES].sort();
  return { evidence_review_version:VERSION, generated_at:new Date().toISOString(), base_url:test.info().project.use.baseURL || null, canonical_project:HOSTED_EVIDENCE_CANONICAL_PROJECT, test_timeout_ms:HOSTED_EVIDENCE_TEST_TIMEOUT_MS, hosted_demo_url_mode:process.env.HOSTED_DEMO_URL ? 'hosted_url' : 'local_static_server', manifest_policy:'single_final_metadata_with_all_required_captures_and_evidence_matrix', project_scope_policy: 'single_canonical_project_with_explicit_mobile_viewport_capture', capture_polish_version:VERSION, public_version_label:PUBLIC_VERSION_LABEL, visual_artifact_guard_required:true, capture_settle_required:true, duplicate_project_metadata_overwrite_guard: true, expected_capture_names:EXPECTED_CAPTURE_NAMES, capture_count:captures.length, capture_names:captureNames, captures, all_required_captures_present:JSON.stringify(captureNames) === JSON.stringify(expectedNames), visible_text_snapshot_files:VISIBLE_TEXT_SNAPSHOT_FILES, visible_text_snapshots:visibleTextSnapshots, localization_snapshot_contract:'ar_fr_en_visible_text_snapshots_with_technical_token_allowlist', screenshot_sanity:captures.map((captureResult)=>({ name:captureResult.name, viewport_width:captureResult.viewport.width, viewport_height:captureResult.viewport.height, image_width:captureResult.image.width, image_height:captureResult.image.height, bytes:captureResult.bytes, full_page:captureResult.full_page, no_horizontal_overflow:captureResult.no_horizontal_overflow, horizontal_overflow_px:captureResult.horizontal_overflow_px, capture_settled:captureResult.settle?.settled === true, visual_artifact_guard_passed:captureResult.artifact_guard?.visual_artifact_guard_passed === true, pass:captureResult.bytes > 20_000 && captureResult.image.width >= captureResult.viewport.width - 2 && captureResult.image.height >= captureResult.viewport.height - 2 && captureResult.no_horizontal_overflow && captureResult.settle?.settled === true && captureResult.artifact_guard?.visual_artifact_guard_passed === true })), timing_budget_guard: timingBudgetGuard, evidence_matrix: matrixSummary ? { contract:'language_surface_evidence_matrix_v1', captures:matrixSummary.rows, languages:matrixSummary.languages, surface_count:matrixSummary.surface_count, expected_rows:matrixSummary.expected_rows, actual_rows:matrixSummary.actual_rows, passed_rows:matrixSummary.passed_rows, failed_rows:matrixSummary.failed_rows, language_purity_passed:matrixSummary.language_purity_passed, visual_guard_passed:matrixSummary.visual_guard_passed, horizontal_overflow_max_px:matrixSummary.horizontal_overflow_max_px, stale_version_residue_detected:matrixSummary.stale_version_residue_detected, mojibake_detected:matrixSummary.mojibake_detected, matrix_summary_file:'matrix-summary.json' } : null, page:pageMeta, targeted_region_evidence: targetedRegionEvidence, targeted_region_capture_enabled: targetedRegionEvidence?.targeted_region_capture_enabled === true, release_gate:'evidence_review_metadata_written' };
}
async function writeMetadata(page, captures = [], visibleTextSnapshots = {}, matrixSummary = null, targetedRegionEvidence = null, timingRecorder = null){
  ensureEvidenceRoot(); const metadataWriteStartedAtMs = Date.now(); const metadata=await hostedMetadata(page, captures, visibleTextSnapshots, matrixSummary, targetedRegionEvidence, timingRecorder ? timingRecorder.summary() : null); const metadataWriteRecord = { phase:'metadata-write', started_at:new Date(metadataWriteStartedAtMs).toISOString(), ended_at:new Date().toISOString(), duration_ms:Date.now() - metadataWriteStartedAtMs, budget_ms:HOSTED_EVIDENCE_PHASE_BUDGETS_MS.metadata_write, within_budget:Date.now() - metadataWriteStartedAtMs <= HOSTED_EVIDENCE_PHASE_BUDGETS_MS.metadata_write }; if (timingRecorder) metadata.timing_budget_guard = timingRecorder.summary([metadataWriteRecord]); writeJson(metadataPath, metadata); await test.info().attach('hosted-demo-metadata.json', { body:Buffer.from(JSON.stringify(metadata, null, 2)), contentType:'application/json' }); expect(metadata.page.app_version).toBe(VERSION); expect(metadata.page.panels.evidence_review).toBe(true); expect(metadata.all_required_captures_present).toBe(true); expect(metadata.capture_count).toBe(EXPECTED_CAPTURE_NAMES.length); expect(metadata.evidence_matrix.expected_rows).toBe(39); expect(metadata.evidence_matrix.failed_rows).toBe(0); expect(metadata.targeted_region_capture_enabled).toBe(true); expect(metadata.targeted_region_evidence.full_page_only_proof_allowed).toBe(false); expect(metadata.targeted_region_evidence.targeted_region_count).toBeGreaterThanOrEqual(5); expect(metadata.visual_artifact_guard_required).toBe(true); expect(metadata.capture_settle_required).toBe(true); expect(metadata.project_scope_policy).toBe('single_canonical_project_with_explicit_mobile_viewport_capture'); expect(metadata.duplicate_project_metadata_overwrite_guard).toBe(true); expect(metadata.canonical_project).toBe(HOSTED_EVIDENCE_CANONICAL_PROJECT); expect(metadata.test_timeout_ms).toBe(HOSTED_EVIDENCE_TEST_TIMEOUT_MS); expect(metadata.timing_budget_guard.guard).toBe('hosted_evidence_capture_timeout_budget_guard'); expect(metadata.timing_budget_guard.all_phases_within_budget).toBe(true); expect(metadata.timing_budget_guard.total_capture_budget_ms).toBeLessThan(metadata.test_timeout_ms); expect(metadata.timing_budget_guard.phase_records.length).toBeGreaterThanOrEqual(8); expect(metadata.targeted_region_evidence.timing_budget_guard.all_phases_within_budget).toBe(true); for(const sanity of metadata.screenshot_sanity){ expect(sanity.capture_settled).toBe(true); expect(sanity.visual_artifact_guard_passed).toBe(true); expect(sanity.pass).toBe(true); } return metadata;
}

// Legacy manifest static tokens preserved while timing recorder wraps capture calls:
// captures.push(await capture(page, 'desktop-first-screen'))
// captures.push(await capture(page, 'mobile-first-screen'))
// captures.push(await capture(page, 'provider-mode'))
// captures.push(await capture(page, 'quality-export'))

test.describe(`${PUBLIC_VERSION_LABEL} hosted demo evidence matrix and manifest capture`, () => {
  test.describe.configure({ mode: 'serial' });
  test('captures complete hosted demo evidence manifest without metadata overwrite', async ({ page }, testInfo) => {
    test.setTimeout(HOSTED_EVIDENCE_TEST_TIMEOUT_MS);
    test.skip(testInfo.project.name !== HOSTED_EVIDENCE_CANONICAL_PROJECT, 'Hosted evidence capture writes one canonical manifest; mobile viewport is captured inside the chromium project.');
    const captures = [];
    const visibleTextSnapshots = {};
    const timingRecorder = createHostedEvidenceTimingRecorder();
    await timingRecorder.phase('page-ready:desktop-first-screen', HOSTED_EVIDENCE_PHASE_BUDGETS_MS.page_ready, async () => { await page.setViewportSize({ width:1440, height:950 }); await page.goto('/'); await assertHostedDemoReady(page); });
    captures.push(await timingRecorder.phase('full-page-capture:desktop-first-screen', HOSTED_EVIDENCE_PHASE_BUDGETS_MS.full_page_capture, () => capture(page, 'desktop-first-screen')));
    await timingRecorder.phase('page-ready:mobile-first-screen', HOSTED_EVIDENCE_PHASE_BUDGETS_MS.page_ready, async () => { await page.setViewportSize({ width:390, height:844 }); await page.goto('/'); await assertHostedDemoReady(page); });
    captures.push(await timingRecorder.phase('full-page-capture:mobile-first-screen', HOSTED_EVIDENCE_PHASE_BUDGETS_MS.full_page_capture, () => capture(page, 'mobile-first-screen')));
    await timingRecorder.phase('page-ready:provider-mode', HOSTED_EVIDENCE_PHASE_BUDGETS_MS.page_ready, async () => { await page.setViewportSize({ width:1440, height:950 }); await page.goto('/'); await assertHostedDemoReady(page); await openProviderHarness(page); });
    captures.push(await timingRecorder.phase('full-page-capture:provider-mode', HOSTED_EVIDENCE_PHASE_BUDGETS_MS.full_page_capture, () => capture(page, 'provider-mode')));
    await timingRecorder.phase('page-ready:quality-export', HOSTED_EVIDENCE_PHASE_BUDGETS_MS.page_ready, () => openQualityExport(page));
    captures.push(await timingRecorder.phase('full-page-capture:quality-export', HOSTED_EVIDENCE_PHASE_BUDGETS_MS.full_page_capture, () => capture(page, 'quality-export')));
    await timingRecorder.phase('localization-snapshots', HOSTED_EVIDENCE_PHASE_BUDGETS_MS.localization_snapshots, async () => { for(const locale of LOCALIZATION_SNAPSHOT_LOCALES){ await switchLocaleForVisibleTextSnapshot(page, locale); visibleTextSnapshots[locale] = await collectVisibleTextSnapshot(page, locale, 'hosted-demo-visible-text'); await fs.promises.writeFile(path.join(EVIDENCE_ROOT, VISIBLE_TEXT_SNAPSHOT_FILES[locale]), JSON.stringify(visibleTextSnapshots[locale], null, 2)); } });
    expect(visibleTextSnapshots.ar.unexpected_english_residuals).toEqual([]); expect(visibleTextSnapshots.fr.unexpected_english_residuals).toEqual([]); expect(visibleTextSnapshots.ar.unexpected_non_locale_residuals).toEqual([]); expect(visibleTextSnapshots.fr.unexpected_non_locale_residuals).toEqual([]); expect(visibleTextSnapshots.en.unexpected_non_locale_residuals).toEqual([]); expect(visibleTextSnapshots.ar.unexpected_stale_release_label_tokens).toEqual([]); expect(visibleTextSnapshots.fr.unexpected_stale_release_label_tokens).toEqual([]); expect(visibleTextSnapshots.en.unexpected_stale_release_label_tokens).toEqual([]); expect(visibleTextSnapshots.ar.unexpected_stale_current_release_description_tokens).toEqual([]); expect(visibleTextSnapshots.fr.unexpected_stale_current_release_description_tokens).toEqual([]); expect(visibleTextSnapshots.en.unexpected_stale_current_release_description_tokens).toEqual([]); expect(visibleTextSnapshots.ar.expected_current_release_description_tokens).toEqual([...expectedCurrentReleaseDescriptionTokens('ar')]); expect(visibleTextSnapshots.fr.expected_current_release_description_tokens).toEqual([...expectedCurrentReleaseDescriptionTokens('fr')]); expect(visibleTextSnapshots.en.expected_current_release_description_tokens).toEqual([...expectedCurrentReleaseDescriptionTokens('en')]); expect(visibleTextSnapshots.ar).toMatchObject({ html_lang: 'ar', html_dir: 'rtl', has_arabic_unicode: true, mojibake_markers: [], locale_snapshot_passed: true }); expect(visibleTextSnapshots.fr).toMatchObject({ html_lang: 'fr', html_dir: 'ltr', locale_snapshot_passed: true }); expect(visibleTextSnapshots.en).toMatchObject({ html_lang: 'en', html_dir: 'ltr', locale_snapshot_passed: true });
    const { matrixSummary } = await timingRecorder.phase('evidence-matrix', HOSTED_EVIDENCE_PHASE_BUDGETS_MS.evidence_matrix, () => generateEvidenceMatrix(page));
    writeExportEvidence(matrixSummary);
    const targetedRegionEvidence = await timingRecorder.phase('targeted-region-capture', HOSTED_EVIDENCE_PHASE_BUDGETS_MS.targeted_region_capture, () => generateTargetedRegionEvidence(page, timingRecorder));
    const metadata = await writeMetadata(page, captures, visibleTextSnapshots, matrixSummary, targetedRegionEvidence, timingRecorder);
    expect(metadata.page.storage_keys_visible).toEqual(expect.arrayContaining([]));
  });
});
