import fs from 'node:fs';
import path from 'node:path';
import { test, expect } from '@playwright/test';

const VERSION = '1.1.0-alpha.9';
const EVIDENCE_ROOT = process.env.HOSTED_DEMO_EVIDENCE_DIR || 'test-results/hosted-demo-evidence';
const metadataPath = path.join(EVIDENCE_ROOT, 'hosted-demo-metadata.json');
const EXPECTED_CAPTURE_NAMES = Object.freeze([
  'desktop-first-screen',
  'mobile-first-screen',
  'provider-mode',
  'quality-export'
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
    no_horizontal_overflow: overflow_px <= 2,
    horizontal_overflow_px: overflow_px,
    captured_at: new Date().toISOString()
  };
}

async function hostedMetadata(page, captures) {
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
    hosted_demo_url_mode: process.env.HOSTED_DEMO_URL ? 'hosted_url' : 'local_static_server',
    manifest_policy: 'single_final_metadata_with_all_required_captures',
    expected_capture_names: EXPECTED_CAPTURE_NAMES,
    capture_count: captures.length,
    capture_names: captureNames,
    captures,
    all_required_captures_present: JSON.stringify(captureNames) === JSON.stringify(expectedNames),
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
      pass: captureResult.bytes > 20_000 && captureResult.image.width >= captureResult.viewport.width - 2 && captureResult.image.height >= captureResult.viewport.height - 2 && captureResult.no_horizontal_overflow
    })),
    page: pageMeta,
    release_gate: 'evidence_review_metadata_written'
  };
}

async function writeMetadata(page, captures = []) {
  ensureEvidenceRoot();
  const metadata = await hostedMetadata(page, captures);
  fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2));
  await test.info().attach('hosted-demo-metadata.json', { body: Buffer.from(JSON.stringify(metadata, null, 2)), contentType: 'application/json' });
  expect(metadata.page.app_version).toBe(VERSION);
  expect(metadata.page.panels.evidence_review).toBe(true);
  expect(metadata.all_required_captures_present).toBe(true);
  expect(metadata.capture_count).toBe(EXPECTED_CAPTURE_NAMES.length);
  for (const sanity of metadata.screenshot_sanity) expect(sanity.pass).toBe(true);
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
}

async function openQualityExport(page) {
  await page.locator('#researchModeNav .uxTab[data-ux-tab="quality"]').click();
  await expect(page.locator('#researchQualityOutput')).toBeVisible();
  await expect(page.locator('#exportSourcePacketBuilderBtn')).toBeVisible();
}

async function assertHostedDemoReady(page) {
  await page.waitForLoadState('domcontentloaded');
  await expect(page.locator('meta[name="app-version"]')).toHaveAttribute('content', VERSION);
  await expect(page.locator('#firstRunPanel')).toBeVisible();
  await expect(page.locator('#publicDemoReadinessPanel')).toBeVisible();
  await expect(page.locator('#hostedDemoVerificationPanel')).toBeVisible();
  await expect(page.locator('#hostedDemoEvidenceReviewPanel')).toBeVisible();
}

test.describe('v1.1.0-alpha.9 hosted demo smoke/evidence manifest capture', () => {
  test('captures complete hosted demo evidence manifest without metadata overwrite', async ({ page }) => {
    const captures = [];

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

    const metadata = await writeMetadata(page, captures);
    expect(metadata.page.storage_keys_visible).toEqual(expect.arrayContaining([]));
  });
});
