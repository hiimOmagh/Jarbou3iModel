import fs from 'node:fs';
import path from 'node:path';
import { test, expect } from '@playwright/test';

const VERSION = '1.0.22';
const EVIDENCE_ROOT = process.env.HOSTED_DEMO_EVIDENCE_DIR || 'test-results/hosted-demo-evidence';
const metadataPath = path.join(EVIDENCE_ROOT, 'hosted-demo-metadata.json');

function ensureEvidenceRoot() {
  fs.mkdirSync(EVIDENCE_ROOT, { recursive: true });
}

async function freezeMotion(page) {
  await page.addStyleTag({ content: `*,*::before,*::after{transition:none!important;animation:none!important;scroll-behavior:auto!important}` });
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.evaluate(async () => { if (document.fonts?.ready) await document.fonts.ready; });
}

async function assertNoHorizontalOverflow(page) {
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(2);
}

async function capture(page, name) {
  ensureEvidenceRoot();
  await freezeMotion(page);
  await assertNoHorizontalOverflow(page);
  const buffer = await page.screenshot({ fullPage: true, animations: 'disabled' });
  const filePath = path.join(EVIDENCE_ROOT, `${name}.png`);
  fs.writeFileSync(filePath, buffer);
  await test.info().attach(`${name}.png`, { body: buffer, contentType: 'image/png' });
  expect(buffer.byteLength).toBeGreaterThan(20_000);
  return { name, path: filePath, bytes: buffer.byteLength };
}

async function hostedMetadata(page) {
  return page.evaluate(() => ({
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
}

async function writeMetadata(page, captures = []) {
  ensureEvidenceRoot();
  const metadata = {
    evidence_review_version: VERSION,
    generated_at: new Date().toISOString(),
    base_url: test.info().project.use.baseURL || null,
    hosted_demo_url_mode: process.env.HOSTED_DEMO_URL ? 'hosted_url' : 'local_static_server',
    captures,
    page: await hostedMetadata(page),
    release_gate: 'evidence_review_metadata_written'
  };
  fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2));
  await test.info().attach('hosted-demo-metadata.json', { body: Buffer.from(JSON.stringify(metadata, null, 2)), contentType: 'application/json' });
  expect(metadata.page.app_version).toBe(VERSION);
  expect(metadata.page.panels.evidence_review).toBe(true);
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

test.describe('v1.0.22 hosted demo smoke/evidence capture', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await assertHostedDemoReady(page);
  });

  test('captures hosted demo first-screen evidence on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 950 });
    await assertHostedDemoReady(page);
    const captureResult = await capture(page, 'desktop-first-screen');
    await writeMetadata(page, [captureResult]);
  });

  test('captures hosted demo first-screen evidence on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await assertHostedDemoReady(page);
    const captureResult = await capture(page, 'mobile-first-screen');
    await writeMetadata(page, [captureResult]);
  });

  test('captures provider and quality/export evidence states', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 950 });
    await openProviderHarness(page);
    const provider = await capture(page, 'provider-mode');
    await openQualityExport(page);
    const quality = await capture(page, 'quality-export');
    const metadata = await writeMetadata(page, [provider, quality]);
    expect(metadata.page.storage_keys_visible).toEqual(expect.arrayContaining([]));
  });
});
