import { test, expect } from '@playwright/test';

async function ensureWorkflowPanelExpanded(page) {
  const workflowPanel = page.locator('#workflowPanel');
  await expect(workflowPanel, 'Workflow command panel should exist before core-flow actions.').toBeVisible({
    timeout: 10000,
  });

  const isCollapsed = await workflowPanel.evaluate((panel) =>
    panel.classList.contains('screenDisciplineCollapsed')
  );

  if (isCollapsed) {
    const toggle = page.locator('#workflowPanelToggle');
    await expect(toggle, 'Collapsed workflow panel should expose its expand control.').toBeVisible({
      timeout: 10000,
    });
    await toggle.click();
  }

  await expect(
    page.locator('#copyPromptBtn'),
    'Workflow command actions should be visible after expanding the command panel.'
  ).toBeVisible({ timeout: 10000 });
}

async function clickVisibleLoadSample(page) {
  await ensureWorkflowPanelExpanded(page);

  const loadSampleAction = page.locator('#loadSampleBtn');
  await expect(
    loadSampleAction,
    'Load sample should be visible before the smoke test clicks it.'
  ).toBeVisible({ timeout: 10000 });

  await loadSampleAction.click();
}

test('Jarbou3i Model core flow', async ({ page }) => {
  await page.goto('/');
  await ensureWorkflowPanelExpanded(page);
  await expect(page.locator('#copyPromptBtn')).toBeVisible();

  await expect(page.locator('.logo img')).toHaveAttribute('src', /jarbou3i-mascot-192\.png$/);
  await expect(page.locator('.welcomeMascot')).toHaveAttribute('src', /jarbou3i-mascot-512\.png$/);
  await expect(page.locator('link[rel="manifest"]')).toHaveAttribute('href', 'manifest.webmanifest');

  await page.locator('#langFr').click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'fr');
  await expect(page.locator('html')).toHaveAttribute('dir', 'ltr');
  await expect(page.locator('#copyPromptBtn')).toContainText('Copier le prompt');

  await page.locator('#langAr').click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'ar');
  await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');

  await page.locator('#langEn').click();
  await page.locator('#themeBtn').click();
  await expect(page.locator('body')).toHaveClass(/dark/);
  await expect(page.locator('#themeBtn')).toHaveAttribute('aria-pressed', 'true');

  await ensureWorkflowPanelExpanded(page);
  await page.locator('#topicInput').fill('World War II outcomes, 1939-1947');
  await page.locator('#previewPromptBtn').click();
  await expect(page.locator('#modalBackdrop')).toHaveClass(/show/);
  await page.keyboard.press('Escape');

  await clickVisibleLoadSample(page);
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

  const hasLegacySelfCheck = await page.evaluate(() => 'StrategicWorkbenchSelfCheck' in window);
  expect(hasLegacySelfCheck).toBe(false);
});
