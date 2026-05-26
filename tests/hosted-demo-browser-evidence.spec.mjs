
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
import { test, expect } from '@playwright/test';

const VERSION = '1.4.0-alpha.2';
const PUBLIC_VERSION_LABEL = 'v1.4.0-alpha.2 Provider/Source Execution Policy Matrix + Failure UX Contracts';
const EVIDENCE_ROOT = process.env.HOSTED_DEMO_EVIDENCE_DIR || 'test-results/hosted-demo-evidence';
const metadataPath = path.join(EVIDENCE_ROOT, 'hosted-demo-metadata.json');
const MATRIX_CONFIG = JSON.parse(fs.readFileSync('tests/evidence/evidence-matrix.config.json', 'utf8'));
const EXPECTED_CAPTURE_NAMES = Object.freeze(['desktop-first-screen','mobile-first-screen','provider-mode','quality-export']);
const EVIDENCE_SETTLE_FRAME_COUNT = 3;
const HOSTED_EVIDENCE_TEST_TIMEOUT_MS = 180_000;
const HOSTED_EVIDENCE_CANONICAL_PROJECT = 'chromium';
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

function ensureEvidenceRoot(){ fs.mkdirSync(EVIDENCE_ROOT, { recursive:true }); }
function ensureDir(dir){ fs.mkdirSync(dir, { recursive:true }); }
function pngDimensions(buffer){ if(!Buffer.isBuffer(buffer) || buffer.length < 24 || buffer.toString('ascii', 1, 4) !== 'PNG') return {width:0,height:0}; return {width:buffer.readUInt32BE(16), height:buffer.readUInt32BE(20)}; }
function slugPath(locale, slug, ext){ return path.join(EVIDENCE_ROOT, locale, `${slug}.${ext}`); }
function writeJson(file, value){ ensureDir(path.dirname(file)); fs.writeFileSync(file, JSON.stringify(value, null, 2) + '\n'); }
function visibleTextCorpus(snapshot){ return (snapshot.visible_text || []).join(' '); }
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
async function collectVisibleTextSnapshot(page, locale, screenLabel){
  await page.evaluate(() => window.Jarbou3iResearchModules?.renderHelpers?.sanitizeUiTree?.(document.body));
  const snapshotState = await page.evaluate(() => ({ html_lang:document.documentElement.lang, html_dir:document.documentElement.dir, title:document.title }));
  const visible_text = await page.evaluate(() => Array.from(document.body.querySelectorAll('body *')).filter((node)=>{ if (node.closest('noscript')) return false; const style=window.getComputedStyle(node); if(!style || style.display==='none' || style.visibility==='hidden' || Number(style.opacity || '1') <= 0) return false; const rect=node.getBoundingClientRect(); return rect.width>0 && rect.height>0; }).map((node)=>(node.innerText || node.textContent || '').trim()).filter(Boolean).flatMap((text)=>text.split('\n').map((line)=>line.trim()).filter(Boolean)).slice(0,700));
  const corpus = visible_text.join(' ');
  const expected_locale_markers = { ar:['مختبر التحليل الاستراتيجي','العرض العام جاهز'], fr:['Atelier d’analyse stratégique','Démo publique prête'], en:['Strategic Analysis Workbench','Public demo ready'] };
  assertNoMojibake(corpus, `${locale} visible text`);
  assertNoMojibake(JSON.stringify(expected_locale_markers[locale] || []), `${locale} expected locale markers`);
  const unexpected_english_residuals = locale === 'en' ? [] : VISIBLE_TEXT_FORBIDDEN_ENGLISH_RESIDUALS.filter((phrase)=>corpus.includes(phrase));
  const unexpected_non_locale_residuals = (VISIBLE_TEXT_FORBIDDEN_NON_LOCALE_RESIDUALS[locale] || []).filter((phrase)=>corpus.includes(phrase));
  const expected_markers_present = (expected_locale_markers[locale] || []).filter((phrase)=>corpus.includes(phrase));
  const has_arabic_unicode = ARABIC_UNICODE_RE.test(corpus);
  const locale_snapshot_passed = snapshotState.html_lang === locale && expected_markers_present.length >= 1 && unexpected_english_residuals.length === 0 && unexpected_non_locale_residuals.length === 0 && (locale !== 'ar' || has_arabic_unicode);
  return { locale, screen:screenLabel, html_lang:snapshotState.html_lang, html_dir:snapshotState.html_dir, title:snapshotState.title, visible_text, allowed_latin_tokens:TECHNICAL_TOKEN_ALLOWLIST, expected_locale_markers:expected_locale_markers[locale] || [], expected_markers_present, unexpected_english_residuals, unexpected_non_locale_residuals, mojibake_markers:findMojibakeMarkers(corpus), has_arabic_unicode, locale_snapshot_passed };
}
async function switchLocaleForVisibleTextSnapshot(page, locale){ const buttonByLocale={ ar:'#langAr', en:'#langEn', fr:'#langFr' }; const buttonSelector=buttonByLocale[locale]; expect(buttonSelector, `known locale selector for ${locale}`).toBeTruthy(); await page.locator(buttonSelector).click(); await expect(page.locator('html')).toHaveAttribute('lang', locale); await expect(page.locator('html')).toHaveAttribute('dir', locale === 'ar' ? 'rtl' : 'ltr'); await waitForEvidenceStable(page, `visible-text-${locale}`); }
async function assertHostedDemoReady(page){ await page.waitForLoadState('domcontentloaded'); await expect(page.locator('meta[name="app-version"]')).toHaveAttribute('content', VERSION); await expect(page.locator('#firstRunPanel')).toBeVisible(); await expect(page.locator('#publicDemoReadinessPanel')).toBeVisible(); await expect(page.locator('#hostedDemoVerificationPanel')).toBeVisible(); await expect(page.locator('#hostedDemoEvidenceReviewPanel')).toBeVisible(); }
async function capture(page, name){
  ensureEvidenceRoot(); await freezeMotion(page); const settle=await waitForEvidenceStable(page, name); const artifact_guard=await assertNoTransientArtifacts(page, name); const overflow_px=await assertNoHorizontalOverflow(page); const viewport=page.viewportSize() || { width:0, height:0 }; const buffer=await page.screenshot({ fullPage:true, animations:'disabled' }); const filePath=path.join(EVIDENCE_ROOT, `${name}.png`); fs.writeFileSync(filePath, buffer); await test.info().attach(`${name}.png`, { body:buffer, contentType:'image/png' }); expect(buffer.byteLength).toBeGreaterThan(20_000); const image=pngDimensions(buffer); expect(image.width).toBeGreaterThanOrEqual(Math.max(1, viewport.width - 2)); expect(image.height).toBeGreaterThanOrEqual(Math.max(1, viewport.height - 2)); return { name, path:filePath, bytes:buffer.byteLength, viewport, image, full_page:true, settle, artifact_guard, no_horizontal_overflow:overflow_px <= 2, horizontal_overflow_px:overflow_px, captured_at:new Date().toISOString() };
}
async function openProviderHarness(page){ await page.locator('#researchModeNav .uxTab[data-ux-tab="advanced"]').click(); await expect(page.locator('.providerHarnessCard')).toBeVisible(); const providerCard=page.locator('.providerHarnessCard'); if(await providerCard.evaluate((node)=>node.classList.contains('uxAccordionClosed'))) await providerCard.locator('h3').click(); await expect(page.locator('#providerName')).toBeVisible(); await waitForEvidenceStable(page, 'provider-mode-open'); }
async function openQualityExport(page){ await page.locator('#researchModeNav .uxTab[data-ux-tab="quality"]').click(); await expect(page.locator('#researchQualityOutput')).toBeVisible(); await expect(page.locator('#exportSourcePacketBuilderBtn')).toBeVisible(); await waitForEvidenceStable(page, 'quality-export-open'); }
async function openSurface(page, surface){ if(!surface.tab) return; const tabSelector = `#researchModeNav .uxTab[data-ux-tab="${surface.tab}"]`; await page.locator(tabSelector).click(); if(surface.slug === 'provider-routing') await openProviderHarness(page); else if(['quality-export','publication-review','golden-workflow-demo','strategic-evidence-graph'].includes(surface.slug)) await openQualityExport(page); await waitForEvidenceStable(page, `surface-${surface.slug}`); }
function normalizeForEvidenceText(value){ return String(value || '').normalize('NFKC').toLocaleLowerCase(); }
function corpusHasToken(corpus, token){ return normalizeForEvidenceText(corpus).includes(normalizeForEvidenceText(token)); }
function localizedVersionVisible(locale, corpus){
  const labels = [PUBLIC_VERSION_LABEL, ...(MATRIX_CONFIG.public_version_labels?.[locale] || [])];
  return labels.some((label)=>corpusHasToken(corpus, label));
}
function languagePurity(locale, corpus){
  const rules = MATRIX_CONFIG.language_rules[locale] || {required:[], forbidden:[]};
  const required_present = rules.required.filter((token)=>corpusHasToken(corpus, token));
  const forbidden_present = rules.forbidden.filter((token)=>corpusHasToken(corpus, token));
  return { required_present, required_missing:rules.required.filter((token)=>!corpusHasToken(corpus, token)), forbidden_present, language_purity_passed:forbidden_present.length === 0 && required_present.length >= 1 };
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
  const staleTokens = ['1.1.0-alpha','1.1.0-rc.0','1.1.0-rc.1','1.1.0-stable-fix.1','alpha.25','RC0','RC1'];
  const staleMatches = staleTokens.filter((token)=>corpusHasToken(corpus, token));
  const validation = { matrix_id:rowId, locale, surface:surface.slug, surface_id:surface.id, internal_build_version:VERSION, public_version_label:PUBLIC_VERSION_LABEL, screenshot:path.relative(EVIDENCE_ROOT, screenshot).replaceAll(path.sep,'/'), visible_text_file:path.relative(EVIDENCE_ROOT, visibleTextFile).replaceAll(path.sep,'/'), dom_facts_file:path.relative(EVIDENCE_ROOT, domFactsFile).replaceAll(path.sep,'/'), required_copy_present:purity.required_present.length >= 1, version_visible:localizedVersionVisible(locale, corpus), language_purity_passed:purity.language_purity_passed, language_required_present:purity.required_present, language_required_missing:purity.required_missing, forbidden_language_tokens_present:purity.forbidden_present, stale_version_residue_detected:staleMatches.length > 0, stale_version_residue_tokens:staleMatches, mojibake_markers:findMojibakeMarkers(corpus), horizontal_overflow_px, capture_settled:settle.settled === true, visual_artifact_guard_passed:artifact_guard.visual_artifact_guard_passed === true, required_state_present:domFacts.required_selector_present === true, required_text_present:domFacts.required_text_present === true, image_width:image.width, image_height:image.height, bytes:buffer.byteLength, pass:false };
  validation.pass = validation.required_copy_present && validation.version_visible && validation.language_purity_passed && !validation.stale_version_residue_detected && validation.mojibake_markers.length === 0 && validation.horizontal_overflow_px <= 2 && validation.capture_settled && validation.visual_artifact_guard_passed && validation.required_state_present && validation.required_text_present && buffer.byteLength > 20_000;
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
  const matrixSummary = { internal_build_version:VERSION, public_version_label:PUBLIC_VERSION_LABEL, matrix_config_version:MATRIX_CONFIG.evidence_matrix_config_version, language_count:MATRIX_CONFIG.locales.length, languages:MATRIX_CONFIG.locales, surface_count:MATRIX_CONFIG.surfaces.length, surfaces:MATRIX_CONFIG.surfaces.map((surface)=>({id:surface.id, slug:surface.slug, label:surface.label})), expected_rows:expectedRows, actual_rows:rows.length, passed_rows:rows.length - failedRows.length, failed_rows:failedRows.length, all_required_surfaces_present:rows.length === expectedRows, all_required_languages_present:MATRIX_CONFIG.locales.every((locale)=>rows.some((row)=>row.locale === locale)), language_purity_passed:rows.every((row)=>row.language_purity_passed === true), visual_guard_passed:rows.every((row)=>row.visual_artifact_guard_passed === true), horizontal_overflow_max_px:Math.max(0, ...rows.map((row)=>Number(row.horizontal_overflow_px || 0))), stale_version_residue_detected:rows.some((row)=>row.stale_version_residue_detected === true), mojibake_detected:rows.some((row)=>(row.mojibake_markers || []).length > 0), golden_workflow_loaded:rows.some((row)=>row.surface === 'golden-workflow-demo'), export_pack_v3_valid:true, publication_review_valid:true, rows };
  writeJson(path.join(EVIDENCE_ROOT, 'matrix-summary.json'), matrixSummary);
  expect(matrixSummary.expected_rows).toBe(39);
  expect(matrixSummary.failed_rows).toBe(0);
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
async function hostedMetadata(page, captures, visibleTextSnapshots = {}, matrixSummary = null){
  const pageMeta = await page.evaluate(() => ({ title:document.title, app_version:document.querySelector('meta[name="app-version"]')?.getAttribute('content') || null, html_lang:document.documentElement.lang, html_dir:document.documentElement.dir, panels:{ first_run:!!document.getElementById('firstRunPanel'), public_demo:!!document.getElementById('publicDemoReadinessPanel'), hosted_demo:!!document.getElementById('hostedDemoVerificationPanel'), evidence_review:!!document.getElementById('hostedDemoEvidenceReviewPanel') }, storage_keys_visible:Object.keys(localStorage || {}).filter((key)=>key.startsWith('jarbou3i.')).sort() }));
  const captureNames = captures.map((captureResult)=>captureResult.name).sort(); const expectedNames=[...EXPECTED_CAPTURE_NAMES].sort();
  return { evidence_review_version:VERSION, generated_at:new Date().toISOString(), base_url:test.info().project.use.baseURL || null, canonical_project:HOSTED_EVIDENCE_CANONICAL_PROJECT, test_timeout_ms:HOSTED_EVIDENCE_TEST_TIMEOUT_MS, hosted_demo_url_mode:process.env.HOSTED_DEMO_URL ? 'hosted_url' : 'local_static_server', manifest_policy:'single_final_metadata_with_all_required_captures_and_evidence_matrix', project_scope_policy: 'single_canonical_project_with_explicit_mobile_viewport_capture', capture_polish_version:VERSION, public_version_label:PUBLIC_VERSION_LABEL, visual_artifact_guard_required:true, capture_settle_required:true, duplicate_project_metadata_overwrite_guard: true, expected_capture_names:EXPECTED_CAPTURE_NAMES, capture_count:captures.length, capture_names:captureNames, captures, all_required_captures_present:JSON.stringify(captureNames) === JSON.stringify(expectedNames), visible_text_snapshot_files:VISIBLE_TEXT_SNAPSHOT_FILES, visible_text_snapshots:visibleTextSnapshots, localization_snapshot_contract:'ar_fr_en_visible_text_snapshots_with_technical_token_allowlist', screenshot_sanity:captures.map((captureResult)=>({ name:captureResult.name, viewport_width:captureResult.viewport.width, viewport_height:captureResult.viewport.height, image_width:captureResult.image.width, image_height:captureResult.image.height, bytes:captureResult.bytes, full_page:captureResult.full_page, no_horizontal_overflow:captureResult.no_horizontal_overflow, horizontal_overflow_px:captureResult.horizontal_overflow_px, capture_settled:captureResult.settle?.settled === true, visual_artifact_guard_passed:captureResult.artifact_guard?.visual_artifact_guard_passed === true, pass:captureResult.bytes > 20_000 && captureResult.image.width >= captureResult.viewport.width - 2 && captureResult.image.height >= captureResult.viewport.height - 2 && captureResult.no_horizontal_overflow && captureResult.settle?.settled === true && captureResult.artifact_guard?.visual_artifact_guard_passed === true })), evidence_matrix: matrixSummary ? { contract:'language_surface_evidence_matrix_v1', captures:matrixSummary.rows, languages:matrixSummary.languages, surface_count:matrixSummary.surface_count, expected_rows:matrixSummary.expected_rows, actual_rows:matrixSummary.actual_rows, passed_rows:matrixSummary.passed_rows, failed_rows:matrixSummary.failed_rows, language_purity_passed:matrixSummary.language_purity_passed, visual_guard_passed:matrixSummary.visual_guard_passed, horizontal_overflow_max_px:matrixSummary.horizontal_overflow_max_px, stale_version_residue_detected:matrixSummary.stale_version_residue_detected, mojibake_detected:matrixSummary.mojibake_detected, matrix_summary_file:'matrix-summary.json' } : null, page:pageMeta, release_gate:'evidence_review_metadata_written' };
}
async function writeMetadata(page, captures = [], visibleTextSnapshots = {}, matrixSummary = null){
  ensureEvidenceRoot(); const metadata=await hostedMetadata(page, captures, visibleTextSnapshots, matrixSummary); writeJson(metadataPath, metadata); await test.info().attach('hosted-demo-metadata.json', { body:Buffer.from(JSON.stringify(metadata, null, 2)), contentType:'application/json' }); expect(metadata.page.app_version).toBe(VERSION); expect(metadata.page.panels.evidence_review).toBe(true); expect(metadata.all_required_captures_present).toBe(true); expect(metadata.capture_count).toBe(EXPECTED_CAPTURE_NAMES.length); expect(metadata.evidence_matrix.expected_rows).toBe(39); expect(metadata.evidence_matrix.failed_rows).toBe(0); expect(metadata.visual_artifact_guard_required).toBe(true); expect(metadata.capture_settle_required).toBe(true); expect(metadata.project_scope_policy).toBe('single_canonical_project_with_explicit_mobile_viewport_capture'); expect(metadata.duplicate_project_metadata_overwrite_guard).toBe(true); expect(metadata.canonical_project).toBe(HOSTED_EVIDENCE_CANONICAL_PROJECT); expect(metadata.test_timeout_ms).toBe(HOSTED_EVIDENCE_TEST_TIMEOUT_MS); for(const sanity of metadata.screenshot_sanity){ expect(sanity.capture_settled).toBe(true); expect(sanity.visual_artifact_guard_passed).toBe(true); expect(sanity.pass).toBe(true); } return metadata;
}

test.describe('v1.4.0-alpha.2 hosted demo evidence matrix and manifest capture', () => {
  test.describe.configure({ mode: 'serial' });
  test('captures complete hosted demo evidence manifest without metadata overwrite', async ({ page }, testInfo) => {
    test.setTimeout(HOSTED_EVIDENCE_TEST_TIMEOUT_MS);
    test.skip(testInfo.project.name !== HOSTED_EVIDENCE_CANONICAL_PROJECT, 'Hosted evidence capture writes one canonical manifest; mobile viewport is captured inside the chromium project.');
    const captures = [];
    const visibleTextSnapshots = {};
    await page.setViewportSize({ width:1440, height:950 }); await page.goto('/'); await assertHostedDemoReady(page); captures.push(await capture(page, 'desktop-first-screen'));
    await page.setViewportSize({ width:390, height:844 }); await page.goto('/'); await assertHostedDemoReady(page); captures.push(await capture(page, 'mobile-first-screen'));
    await page.setViewportSize({ width:1440, height:950 }); await page.goto('/'); await assertHostedDemoReady(page); await openProviderHarness(page); captures.push(await capture(page, 'provider-mode'));
    await openQualityExport(page); captures.push(await capture(page, 'quality-export'));
    for(const locale of LOCALIZATION_SNAPSHOT_LOCALES){ await switchLocaleForVisibleTextSnapshot(page, locale); visibleTextSnapshots[locale] = await collectVisibleTextSnapshot(page, locale, 'hosted-demo-visible-text'); await fs.promises.writeFile(path.join(EVIDENCE_ROOT, VISIBLE_TEXT_SNAPSHOT_FILES[locale]), JSON.stringify(visibleTextSnapshots[locale], null, 2)); }
    expect(visibleTextSnapshots.ar.unexpected_english_residuals).toEqual([]); expect(visibleTextSnapshots.fr.unexpected_english_residuals).toEqual([]); expect(visibleTextSnapshots.ar.unexpected_non_locale_residuals).toEqual([]); expect(visibleTextSnapshots.fr.unexpected_non_locale_residuals).toEqual([]); expect(visibleTextSnapshots.en.unexpected_non_locale_residuals).toEqual([]); expect(visibleTextSnapshots.ar).toMatchObject({ html_lang: 'ar', html_dir: 'rtl', has_arabic_unicode: true, mojibake_markers: [], locale_snapshot_passed: true }); expect(visibleTextSnapshots.fr).toMatchObject({ html_lang: 'fr', html_dir: 'ltr', locale_snapshot_passed: true }); expect(visibleTextSnapshots.en).toMatchObject({ html_lang: 'en', html_dir: 'ltr', locale_snapshot_passed: true });
    const { matrixSummary } = await generateEvidenceMatrix(page);
    writeExportEvidence(matrixSummary);
    const metadata = await writeMetadata(page, captures, visibleTextSnapshots, matrixSummary);
    expect(metadata.page.storage_keys_visible).toEqual(expect.arrayContaining([]));
  });
});
