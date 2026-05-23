import { test, expect } from '@playwright/test';

async function ensureWorkflowPanelExpanded(page) {
  const workflowPanel = page.locator('#workflowPanel');
  await expect(workflowPanel).toBeVisible();
  const isCollapsed = await workflowPanel.evaluate((panel) =>
    panel.classList.contains('screenDisciplineCollapsed')
  );
  if (isCollapsed) {
    await page.locator('#workflowPanelToggle').click();
  }
  await expect(page.locator('#topicInput')).toBeVisible();
}

test('research workflow alpha creates mock importable JSON', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('#researchLabPanel')).toBeVisible();

  await page.locator('#langEn').click();
  await ensureWorkflowPanelExpanded(page);
  await page.locator('#topicInput').fill('US-China chip competition');
  await page.locator('#timeframeInput').fill('2022-2026, technology strategy');
  await page.locator('#generatePlanBtn').click();
  await expect(page.locator('#researchPlanOutput')).toContainText('US-China chip competition');

  await page.locator('#loadDemoEvidenceBtn').click();
  await expect(page.locator('#evidenceMatrixOutput')).toContainText('E1');

  await page.locator('#compileBriefBtn').click();
  await expect(page.locator('#analysisBriefOutput')).toContainText(/readiness|جاهزية|préparation/i);

  await page.locator('#generateMockAnalysisBtn').click();
  await expect(page.locator('#jsonStatus')).toContainText(/Valid JSON|JSON صالح|JSON valide/);
  await expect(page.locator('#importBtn')).toBeEnabled();

  await page.locator('#runCritiqueBtn').click();
  await expect(page.locator('#critiqueOutput')).toContainText(/source|evidence|preuve|مصدر|دليل/i);
});
