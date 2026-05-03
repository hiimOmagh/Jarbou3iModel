import { test, expect } from '@playwright/test';

async function assertNoHorizontalOverflow(page) {
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth
  );
  expect(overflow).toBeLessThanOrEqual(2);
}

async function selectWorkflowTab(page, tab) {
  const tabButton = page.locator(`#researchModeNav .uxTab[data-ux-tab="${tab}"]`);
  await tabButton.click();
  await expect(tabButton).toHaveAttribute('aria-selected', 'true');
}

test('Jarbou3i Model core flow', async ({ page }) => {
  await page.goto('/');

  await expect(page.locator('meta[name="app-version"]')).toHaveAttribute('content', '1.0.22');
  await expect(page.locator('link[rel="manifest"]')).toHaveAttribute(
    'href',
    'manifest.webmanifest'
  );

  await expect(page.locator('.logo img')).toHaveAttribute(
    'src',
    /jarbou3i-mascot-192\.png$/
  );
  await expect(page.locator('.welcomeMascot')).toHaveAttribute(
    'src',
    /jarbou3i-mascot-512\.png$/
  );

  await expect(page.locator('#firstRunPanel')).toBeVisible();
  await expect(page.locator('#publicDemoReadinessPanel')).toBeVisible();
  await expect(page.locator('#hostedDemoVerificationPanel')).toBeVisible();
  await expect(page.locator('#hostedDemoEvidenceReviewPanel')).toBeVisible();

  await expect(page.locator('#researchModeNav')).toBeVisible();
  await expect(page.locator('#generatePlanBtn')).toBeVisible();
  await expect(page.locator('#screenDisciplineNextAction')).toBeVisible();
  await expect(page.locator('#releaseHealthMetrics')).toBeVisible();

  await page.locator('#langFr').click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'fr');
  await expect(page.locator('html')).toHaveAttribute('dir', 'ltr');
  await expect(page.locator('#generatePlanBtn')).toBeVisible();

  await page.locator('#langAr').click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'ar');
  await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');

  await page.locator('#langEn').click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page.locator('html')).toHaveAttribute('dir', 'ltr');

  await page.locator('#themeBtn').click();
  await expect(page.locator('body')).toHaveClass(/dark/);
  await expect(page.locator('#themeBtn')).toHaveAttribute('aria-pressed', 'true');

  await page.locator('#loadSampleBtn').click();
  await expect(page.locator('#reviewPanel')).toBeVisible();
  await expect(page.locator('[aria-current="step"]')).toContainText(/Review|مراجعة|Revue/);

  for (const tab of ['overview', 'pillars', 'contradictions', 'scenarios', 'evidence', 'exports']) {
    await page.locator(`[data-review="${tab}"]`).click();
    await expect(page.locator('#reviewContent')).toBeVisible();
  }

  await page.locator('[data-review="exports"]').click();
  await expect(page.locator('#exportHtml')).toBeVisible();
  await expect(page.locator('#exportJson')).toHaveCount(0);
  await expect(page.locator('#exportMd')).toHaveCount(0);
  await expect(page.locator('#printBtn')).toHaveCount(0);
  await expect(page.locator('#selfCheckBtn')).toHaveCount(0);

  await selectWorkflowTab(page, 'sources');
  await expect(page.locator('[data-browser-qa="source-packet-builder"]')).toBeVisible();
  await expect(page.locator('#sourcePacketTemplateSelect')).toBeVisible();
  await expect(page.locator('#buildSourcePacketFromTemplateBtn')).toBeVisible();
  await expect(page.locator('#copySourcePacketBuilderBtn')).toBeVisible();
  await expect(page.locator('#exportSourcePacketBuilderBtn')).toBeVisible();

  await selectWorkflowTab(page, 'quality');
  await expect(page.locator('#researchQualityOutput')).toBeVisible();
  await expect(page.locator('#exportSourcePacketBuilderBtn')).toBeVisible();

  const hasLegacySelfCheck = await page.evaluate(() => 'StrategicWorkbenchSelfCheck' in window);
  expect(hasLegacySelfCheck).toBe(false);

  await assertNoHorizontalOverflow(page);
});