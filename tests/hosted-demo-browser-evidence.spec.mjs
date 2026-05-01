import { test, expect } from '@playwright/test';

async function freezeMotion(page) {
  await page.addStyleTag({ content: `*,*::before,*::after{transition:none!important;animation:none!important;scroll-behavior:auto!important}` });
  await page.evaluate(() => window.scrollTo(0, 0));
}

async function capture(page, name) {
  await freezeMotion(page);
  const buffer = await page.screenshot({ fullPage: true, animations: 'disabled' });
  await test.info().attach(`${name}.png`, { body: buffer, contentType: 'image/png' });
  expect(buffer.byteLength).toBeGreaterThan(20_000);
}

test.describe('v1.0.8 hosted demo browser evidence capture', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('captures hosted demo first-screen evidence on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 950 });
    await expect(page.locator('#hostedDemoVerificationPanel')).toBeVisible();
    await expect(page.locator('meta[name="app-version"]')).toHaveAttribute('content', '1.0.8');
    await capture(page, 'desktop-first-screen');
  });

  test('captures hosted demo first-screen evidence on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await expect(page.locator('#hostedDemoVerificationPanel')).toBeVisible();
    await capture(page, 'mobile-first-screen');
  });

  test('captures provider and quality/export evidence states', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 950 });
    await page.locator('#researchModeNav .uxTab[data-ux-tab="advanced"]').click();
    await expect(page.locator('#providerName')).toBeVisible();
    await capture(page, 'provider-mode');
    await page.locator('#researchModeNav .uxTab[data-ux-tab="quality"]').click();
    await expect(page.locator('#exportWorkflowBtn')).toBeVisible();
    await capture(page, 'quality-export');
  });
});
