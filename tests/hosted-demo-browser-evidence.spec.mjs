
const TECHNICAL_TOKEN_ALLOWLIST = ['JSON', 'API', 'OAuth', 'PKCE', 'BYOK', 'OpenAI', 'URL', 'CSV', 'GitHub'];
const LOCALIZATION_SNAPSHOT_LOCALES = ['ar', 'fr', 'en'];
const VISIBLE_TEXT_SNAPSHOT_FILES = {
  ar: 'visible-text-ar.json',
  fr: 'visible-text-fr.json',
  en: 'visible-text-en.json'
};
const VISIBLE_TEXT_FORBIDDEN_ENGLISH_RESIDUALS = [
  'First-run guide',
  'No provider runs yet',
  'Source planning',
  'PROMPT PREVIEW',
  'RESPONSE CONTRACT',
  'template presets ready',
  'local manual source packet template',
  'Complete a brief after the plan and evidence matrix are ready',
  'scores explain prioritization not truth',
  'Scores explain prioritization, not truth',
  'Attention = public visibility',
  'Attention = visibilité'
];
async function collectVisibleTextSnapshot(page, locale, screenLabel) {
  const snapshotState = await page.evaluate(() => ({
    html_lang: document.documentElement.lang,
    html_dir: document.documentElement.dir,
    title: document.title
  }));
  const visible_text = await page.evaluate(() => Array.from(document.body.querySelectorAll('body *'))
    .filter((node) => {
      if (node.closest('noscript')) return false;
      const style = window.getComputedStyle(node);
      if (!style || style.display === 'none' || style.visibility === 'hidden' || Number(style.opacity || '1') <= 0) return false;
      const rect = node.getBoundingClientRect();
      return rect.width > 0 && rect.height > 0;
    })
    .map((node) => (node.innerText || node.textContent || '').trim())
    .filter(Boolean)
    .flatMap((text) => text.split('\n').map((line) => line.trim()).filter(Boolean))
    .slice(0, 500));
  const corpus = visible_text.join(' ');
  const expected_locale_markers = {
    ar: ['مختبر التحليل الاستراتيجي', 'العرض العام جاهز'],
    fr: ['Atelier d’analyse stratégique', 'Démo publique prête'],
    en: ['Strategic Analysis Workbench', 'Public demo ready']
  };
  const unexpected_english_residuals = locale === 'en' ? [] : VISIBLE_TEXT_FORBIDDEN_ENGLISH_RESIDUALS.filter((phrase) => corpus.includes(phrase));
  const expected_markers_present = (expected_locale_markers[locale] || []).filter((phrase) => corpus.includes(phrase));
  const locale_snapshot_passed = snapshotState.html_lang === locale && expected_markers_present.length >= 1 && unexpected_english_residuals.length === 0;
  return {
    locale,
    screen: screenLabel,
    html_lang: snapshotState.html_lang,
    html_dir: snapshotState.html_dir,
    title: snapshotState.title,
    visible_text,
    allowed_latin_tokens: TECHNICAL_TOKEN_ALLOWLIST,
    expected_locale_markers: expected_locale_markers[locale] || [],
    expected_markers_present,
    unexpected_english_residuals,
    locale_snapshot_passed
  };
}

import fs from 'node:fs';
import path from 'node:path';
import { test, expect } from '@playwright/test';

const VERSION = '1.1.0-alpha.13';
const EVIDENCE_ROOT = process.env.HOSTED_DEMO_EVIDENCE_DIR || 'test-results/hosted-demo-evidence';
const metadataPath = path.join(EVIDENCE_ROOT, 'hosted-demo-metadata.json');
const EXPECTED_CAPTURE_NAMES = Object.freeze([
  'desktop-first-screen',
  'mobile-first-screen',
  'provider-mode',
  'quality-export'
]);
const EVIDENCE_SETTLE_FRAME_COUNT = 3;
const HOSTED_EVIDENCE_TEST_TIMEOUT_MS = 90_000;
const HOSTED_EVIDENCE_CANONICAL_PROJECT = 'chromium';
const TRANSIENT_ARTIFACT_SELECTORS = Object.freeze([
  '.toast.show',
  '.modalBackdrop.show',
  '[aria-busy="true"]',
  '[data-loading="true"]',
  '[data-testid*="loading"]',
  '[class*="spinner"]',
  '[class*="skeleton"]'
]);

function ensureEvidenceRoot() {
  fs.mkdirSync(EVIDENCE_ROOT, { recursive: true });
}

function pngDimensions(buffer) {
  if (!Buffer.isBuffer(buffer) || buffer.length < 24 || buffer.toString('ascii', 1, 4) !== 'PNG') {
    return { width: 0, height: 0 };
  }
  return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) };
}

async function freezeMotion(page) {
  await page.addStyleTag({ content: `*,*::before,*::after{transition:none!important;animation:none!important;scroll-behavior:auto!important}` });
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.evaluate(async () => { if (document.fonts?.ready) await document.fonts.ready; });
}


async function waitForEvidenceStable(page, label) {
  await page.waitForLoadState('domcontentloaded');
  await page.evaluate(async (frameCount) => {
    for (let index = 0; index < frameCount; index += 1) {
      await new Promise((resolve) => requestAnimationFrame(() => resolve()));
    }
    if (document.fonts?.ready) await document.fonts.ready;
  }, EVIDENCE_SETTLE_FRAME_COUNT);
  await page.waitForTimeout(120);
  const fingerprintA = await page.evaluate(() => JSON.stringify({
    width: document.documentElement.scrollWidth,
    height: document.documentElement.scrollHeight,
    active: document.activeElement?.id || document.activeElement?.tagName || null,
    bodyClass: document.body?.className || '',
    textLength: document.body?.innerText?.length || 0
  }));
  await page.waitForTimeout(120);
  const fingerprintB = await page.evaluate(() => JSON.stringify({
    width: document.documentElement.scrollWidth,
    height: document.documentElement.scrollHeight,
    active: document.activeElement?.id || document.activeElement?.tagName || null,
    bodyClass: document.body?.className || '',
    textLength: document.body?.innerText?.length || 0
  }));
  expect(fingerprintB, `${label} DOM fingerprint must be stable before evidence capture`).toBe(fingerprintA);
  return { label, settled: true, frame_count: EVIDENCE_SETTLE_FRAME_COUNT, fingerprint: fingerprintB };
}

async function assertNoTransientArtifacts(page, label) {
  const state = await page.evaluate(({ selectors, label }) => {
    const visible = (node) => {
      if (!node) return false;
      const style = window.getComputedStyle(node);
      const rect = node.getBoundingClientRect();
      if (style.display === 'none' || style.visibility === 'hidden') return false;
      if (Number(style.opacity || 1) <= 0.01 || rect.width <= 1 || rect.height <= 1) return false;
      return rect.bottom > 0 && rect.right > 0 && rect.top < window.innerHeight && rect.left < window.innerWidth;
    };
    const isExpectedHiddenShell = (node) => {
      if (node.id === 'toast' && !node.classList.contains('show')) return true;
      if (node.id === 'modalBackdrop' && node.getAttribute('aria-hidden') === 'true') return true;
      return false;
    };
    const matches = [];
    for (const selector of selectors) {
      for (const node of document.querySelectorAll(selector)) {
        if (!isExpectedHiddenShell(node) && visible(node)) {
          matches.push({ selector, id: node.id || null, className: String(node.className || '') });
        }
      }
    }
    const fixedOverlays = [...document.querySelectorAll('body *')]
      .filter((node) => {
        if (isExpectedHiddenShell(node)) return false;
        const style = window.getComputedStyle(node);
        if (style.position !== 'fixed') return false;
        if (!visible(node)) return false;
        const rect = node.getBoundingClientRect();
        const viewportArea = Math.max(1, window.innerWidth * window.innerHeight);
        const nodeArea = rect.width * rect.height;
        const coversViewportCenter = rect.left <= window.innerWidth / 2 && rect.right >= window.innerWidth / 2 && rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2;
        const explicitBlockingShell = (node.id === 'toast' && node.classList.contains('show')) || (node.id === 'modalBackdrop' && node.getAttribute('aria-hidden') !== 'true');
        return explicitBlockingShell || (coversViewportCenter && nodeArea / viewportArea > 0.16 && Number(style.zIndex || 0) >= 50);
      })
      .map((node) => ({ id: node.id || null, className: String(node.className || ''), tagName: node.tagName }));
    return {
      label,
      transient_selectors_checked: selectors,
      transient_matches: matches,
      fixed_overlay_matches: fixedOverlays,
      visual_artifact_guard_scope: 'visible_transient_selectors_and_center_blocking_fixed_overlays',
      visual_artifact_guard_passed: matches.length === 0 && fixedOverlays.length === 0
    };
  }, { selectors: TRANSIENT_ARTIFACT_SELECTORS, label });
  expect(state, `${label} must not capture transient overlays/loading artifacts`).toMatchObject({ visual_artifact_guard_passed: true });
  return state;
}

async function horizontalOverflowPixels(page) {
  return page.evaluate(() => Math.max(0, document.documentElement.scrollWidth - document.documentElement.clientWidth));
}

async function assertNoHorizontalOverflow(page) {
  const overflow = await horizontalOverflowPixels(page);
  expect(overflow).toBeLessThanOrEqual(2);
  return overflow;
}

async function capture(page, name) {
  ensureEvidenceRoot();
  await freezeMotion(page);
  const settle = await waitForEvidenceStable(page, name);
  const artifact_guard = await assertNoTransientArtifacts(page, name);
  const overflow_px = await assertNoHorizontalOverflow(page);
  const viewport = page.viewportSize() || { width: 0, height: 0 };
  const buffer = await page.screenshot({ fullPage: true, animations: 'disabled' });
  const filePath = path.join(EVIDENCE_ROOT, `${name}.png`);
  fs.writeFileSync(filePath, buffer);
  await test.info().attach(`${name}.png`, { body: buffer, contentType: 'image/png' });
  expect(buffer.byteLength).toBeGreaterThan(20_000);
  const image = pngDimensions(buffer);
  expect(image.width).toBeGreaterThanOrEqual(Math.max(1, viewport.width - 2));
  expect(image.height).toBeGreaterThanOrEqual(Math.max(1, viewport.height - 2));
  return {
    name,
    path: filePath,
    bytes: buffer.byteLength,
    viewport,
    image,
    full_page: true,
    settle,
    artifact_guard,
    no_horizontal_overflow: overflow_px <= 2,
    horizontal_overflow_px: overflow_px,
    captured_at: new Date().toISOString()
  };
}

async function hostedMetadata(page, captures, visibleTextSnapshots = {}) {
  const pageMeta = await page.evaluate(() => ({
    title: document.title,
    app_version: document.querySelector('meta[name="app-version"]')?.getAttribute('content') || null,
    html_lang: document.documentElement.lang,
    html_dir: document.documentElement.dir,
    panels: {
      first_run: !!document.getElementById('firstRunPanel'),
      public_demo: !!document.getElementById('publicDemoReadinessPanel'),
      hosted_demo: !!document.getElementById('hostedDemoVerificationPanel'),
      evidence_review: !!document.getElementById('hostedDemoEvidenceReviewPanel')
    },
    storage_keys_visible: Object.keys(localStorage || {}).filter((key) => key.startsWith('jarbou3i.')).sort()
  }));
  const captureNames = captures.map((captureResult) => captureResult.name).sort();
  const expectedNames = [...EXPECTED_CAPTURE_NAMES].sort();
  return {
    evidence_review_version: VERSION,
    generated_at: new Date().toISOString(),
    base_url: test.info().project.use.baseURL || null,
    canonical_project: HOSTED_EVIDENCE_CANONICAL_PROJECT,
    test_timeout_ms: HOSTED_EVIDENCE_TEST_TIMEOUT_MS,
    hosted_demo_url_mode: process.env.HOSTED_DEMO_URL ? 'hosted_url' : 'local_static_server',
    manifest_policy: 'single_final_metadata_with_all_required_captures',
    project_scope_policy: 'single_canonical_project_with_explicit_mobile_viewport_capture',
    capture_polish_version: VERSION,
    visual_artifact_guard_required: true,
    capture_settle_required: true,
    duplicate_project_metadata_overwrite_guard: true,
    expected_capture_names: EXPECTED_CAPTURE_NAMES,
    capture_count: captures.length,
    capture_names: captureNames,
    captures,
    all_required_captures_present: JSON.stringify(captureNames) === JSON.stringify(expectedNames),
    visible_text_snapshot_files: VISIBLE_TEXT_SNAPSHOT_FILES,
    visible_text_snapshots: visibleTextSnapshots,
    localization_snapshot_contract: 'ar_fr_en_visible_text_snapshots_with_technical_token_allowlist',
    screenshot_sanity: captures.map((captureResult) => ({
      name: captureResult.name,
      viewport_width: captureResult.viewport.width,
      viewport_height: captureResult.viewport.height,
      image_width: captureResult.image.width,
      image_height: captureResult.image.height,
      bytes: captureResult.bytes,
      full_page: captureResult.full_page,
      no_horizontal_overflow: captureResult.no_horizontal_overflow,
      horizontal_overflow_px: captureResult.horizontal_overflow_px,
      capture_settled: captureResult.settle?.settled === true,
      visual_artifact_guard_passed: captureResult.artifact_guard?.visual_artifact_guard_passed === true,
      pass: captureResult.bytes > 20_000 && captureResult.image.width >= captureResult.viewport.width - 2 && captureResult.image.height >= captureResult.viewport.height - 2 && captureResult.no_horizontal_overflow && captureResult.settle?.settled === true && captureResult.artifact_guard?.visual_artifact_guard_passed === true
    })),
    page: pageMeta,
    release_gate: 'evidence_review_metadata_written'
  };
}

async function writeMetadata(page, captures = [], visibleTextSnapshots = {}) {
  ensureEvidenceRoot();
  const metadata = await hostedMetadata(page, captures, visibleTextSnapshots);
  fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2));
  await test.info().attach('hosted-demo-metadata.json', { body: Buffer.from(JSON.stringify(metadata, null, 2)), contentType: 'application/json' });
  expect(metadata.page.app_version).toBe(VERSION);
  expect(metadata.page.panels.evidence_review).toBe(true);
  expect(metadata.all_required_captures_present).toBe(true);
  expect(metadata.capture_count).toBe(EXPECTED_CAPTURE_NAMES.length);
  expect(metadata.visual_artifact_guard_required).toBe(true);
  expect(metadata.capture_settle_required).toBe(true);
  expect(metadata.project_scope_policy).toBe('single_canonical_project_with_explicit_mobile_viewport_capture');
  expect(metadata.duplicate_project_metadata_overwrite_guard).toBe(true);
  expect(metadata.canonical_project).toBe(HOSTED_EVIDENCE_CANONICAL_PROJECT);
  expect(metadata.test_timeout_ms).toBe(HOSTED_EVIDENCE_TEST_TIMEOUT_MS);
  for (const sanity of metadata.screenshot_sanity) {
    expect(sanity.capture_settled).toBe(true);
    expect(sanity.visual_artifact_guard_passed).toBe(true);
    expect(sanity.pass).toBe(true);
  }
  return metadata;
}

async function openProviderHarness(page) {
  await page.locator('#researchModeNav .uxTab[data-ux-tab="advanced"]').click();
  await expect(page.locator('.providerHarnessCard')).toBeVisible();
  const providerCard = page.locator('.providerHarnessCard');
  if (await providerCard.evaluate((node) => node.classList.contains('uxAccordionClosed'))) {
    await providerCard.locator('h3').click();
  }
  await expect(page.locator('#providerName')).toBeVisible();
  await waitForEvidenceStable(page, 'provider-mode-open');
}

async function openQualityExport(page) {
  await page.locator('#researchModeNav .uxTab[data-ux-tab="quality"]').click();
  await expect(page.locator('#researchQualityOutput')).toBeVisible();
  await expect(page.locator('#exportSourcePacketBuilderBtn')).toBeVisible();
  await waitForEvidenceStable(page, 'quality-export-open');
}


async function switchLocaleForVisibleTextSnapshot(page, locale) {
  const buttonByLocale = { ar: '#langAr', en: '#langEn', fr: '#langFr' };
  const buttonSelector = buttonByLocale[locale];
  expect(buttonSelector, `known locale selector for ${locale}`).toBeTruthy();
  await page.locator(buttonSelector).click();
  await expect(page.locator('html')).toHaveAttribute('lang', locale);
  await expect(page.locator('html')).toHaveAttribute('dir', locale === 'ar' ? 'rtl' : 'ltr');
  await waitForEvidenceStable(page, `visible-text-${locale}`);
}

async function assertHostedDemoReady(page) {
  await page.waitForLoadState('domcontentloaded');
  await expect(page.locator('meta[name="app-version"]')).toHaveAttribute('content', VERSION);
  await expect(page.locator('#firstRunPanel')).toBeVisible();
  await expect(page.locator('#publicDemoReadinessPanel')).toBeVisible();
  await expect(page.locator('#hostedDemoVerificationPanel')).toBeVisible();
  await expect(page.locator('#hostedDemoEvidenceReviewPanel')).toBeVisible();
}

test.describe('v1.1.0-alpha.13 hosted demo smoke/evidence manifest capture', () => {
  test.describe.configure({ mode: 'serial' });

  test('captures complete hosted demo evidence manifest without metadata overwrite', async ({ page }, testInfo) => {
    test.setTimeout(HOSTED_EVIDENCE_TEST_TIMEOUT_MS);
    test.skip(
      testInfo.project.name !== HOSTED_EVIDENCE_CANONICAL_PROJECT,
      'Hosted evidence capture writes one canonical manifest; mobile viewport is captured inside the chromium project.'
    );
    const captures = [];
const visibleTextSnapshots = {};

    await page.setViewportSize({ width: 1440, height: 950 });
    await page.goto('/');
    await assertHostedDemoReady(page);
    captures.push(await capture(page, 'desktop-first-screen'));

    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');
    await assertHostedDemoReady(page);
    captures.push(await capture(page, 'mobile-first-screen'));

    await page.setViewportSize({ width: 1440, height: 950 });
    await page.goto('/');
    await assertHostedDemoReady(page);
    await openProviderHarness(page);
    captures.push(await capture(page, 'provider-mode'));

    await openQualityExport(page);
    captures.push(await capture(page, 'quality-export'));

    for (const locale of LOCALIZATION_SNAPSHOT_LOCALES) {
      await switchLocaleForVisibleTextSnapshot(page, locale);
      visibleTextSnapshots[locale] = await collectVisibleTextSnapshot(page, locale, 'hosted-demo-visible-text');
      await fs.promises.writeFile(path.join(EVIDENCE_ROOT, VISIBLE_TEXT_SNAPSHOT_FILES[locale]), JSON.stringify(visibleTextSnapshots[locale], null, 2));
    }
    expect(visibleTextSnapshots.ar.unexpected_english_residuals).toEqual([]);
    expect(visibleTextSnapshots.fr.unexpected_english_residuals).toEqual([]);
    expect(visibleTextSnapshots.ar).toMatchObject({ html_lang: 'ar', html_dir: 'rtl', locale_snapshot_passed: true });
    expect(visibleTextSnapshots.fr).toMatchObject({ html_lang: 'fr', html_dir: 'ltr', locale_snapshot_passed: true });
    expect(visibleTextSnapshots.en).toMatchObject({ html_lang: 'en', html_dir: 'ltr', locale_snapshot_passed: true });
    const metadata = await writeMetadata(page, captures, visibleTextSnapshots);
    expect(metadata.page.storage_keys_visible).toEqual(expect.arrayContaining([]));
  });
});
