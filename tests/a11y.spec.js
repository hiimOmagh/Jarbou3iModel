import { test, expect } from '@playwright/test';

async function ensureWorkflowPanelExpanded(page) {
  const workflowPanel = page.locator('#workflowPanel');
  await expect(
    workflowPanel,
    'Workflow command panel should exist before runtime accessibility actions.'
  ).toBeVisible({ timeout: 10000 });

  const isCollapsed = await workflowPanel.evaluate((panel) =>
    panel.classList.contains('screenDisciplineCollapsed')
  );

  if (isCollapsed) {
    const toggle = page.locator('#workflowPanelToggle');
    await expect(
      toggle,
      'Collapsed workflow panel should expose an accessible expand control.'
    ).toBeVisible({ timeout: 10000 });
    await toggle.click();
  }

  await expect(
    page.locator('#loadSampleBtn'),
    'Load sample action should be visible after expanding the Command Center.'
  ).toBeVisible({ timeout: 10000 });
}

test('runtime accessibility smoke', async ({ page }) => {
  await page.goto('/');

  await expect(page.locator('html')).toHaveAttribute('lang', /^(ar|en|fr)$/);
  await expect(page.locator('#toast')).toHaveAttribute('role', 'status');
  await expect(page.locator('#modalBackdrop')).toHaveAttribute('aria-hidden', 'true');

  await page.keyboard.press('Tab');
  const activeTag = await page.evaluate(() => document.activeElement?.tagName.toLowerCase());
  expect(['button', 'input', 'select', 'textarea', 'a']).toContain(activeTag);

  await ensureWorkflowPanelExpanded(page);
  await page.locator('#loadSampleBtn').click();
  await expect(page.locator('[role="tablist"]')).toBeVisible();
  const selectedTabs = await page.locator('[role="tab"][aria-selected="true"]').count();
  expect(selectedTabs).toBe(1);
});
