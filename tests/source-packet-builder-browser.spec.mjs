import { test, expect } from '@playwright/test';

async function assertNoHorizontalOverflow(page) {
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(2);
}

async function selectWorkflowTab(page, tab) {
  await page.locator(`#researchModeNav .uxTab[data-ux-tab="${tab}"]`).click();
  await expect(page.locator(`#researchModeNav .uxTab[data-ux-tab="${tab}"]`)).toHaveAttribute('aria-selected', 'true');
}

async function assertLocalizedGuardrail(page) {
  const guardrail = page.locator('.sourcePacketBuilderGuardrail');
  await expect(guardrail).toBeVisible();
  await expect(guardrail).toHaveAttribute('data-r-i18n', 'sourcePacketBuilderGuardrail');
  const text = await guardrail.innerText();
  expect([
    /Browser QA|No live fetching|local\/manual/i,
    /ضابط QA للمتصفح|محلية\/يدوية|لا جلب مباشر/i,
    /Garde-fou QA navigateur|locaux\/manuels|Aucun fetch live/i
  ].some((pattern) => pattern.test(text))).toBeTruthy();
}

async function seedEvidence(page) {
  await selectWorkflowTab(page, 'evidence');
  await page.locator('#evClaim').fill('Traceable official source documents the implementation boundary for the source packet builder.');
  await page.locator('#evSourceTitle').fill('Official implementation note');
  await page.locator('#evSourceUrl').fill('https://example.com/source-packet-builder-note');
  await page.locator('#evSourceType').selectOption('official');
  await page.locator('#evSourceDate').fill('2026-05-02');
  await page.locator('#evStrength').fill('5');
  await page.locator('#evPublicSignal').fill('1');
  await page.locator('#evTimeScore').fill('5');
  await page.locator('#evConfidence').selectOption('high');
  await page.locator('#evSupports').fill('S1');
  await page.locator('#evNotes').fill('Quote/excerpt: manual-only packet builder metadata, no live fetching.');
  await page.locator('#addEvidenceBtn').click();
  await expect(page.locator('#evidenceMatrixOutput')).toContainText('Traceable official source');
}

test.describe('v1.1.0-rc.1-copyfix.1 source packet builder browser QA', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  for (const viewport of [
    { name: 'desktop', width: 1440, height: 950 },
    { name: 'tablet', width: 820, height: 1180 },
    { name: 'mobile', width: 390, height: 844 }
  ]) {
    test(`builder controls remain visible and overflow-safe on ${viewport.name}`, async ({ page }) => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await selectWorkflowTab(page, 'sources');
      await expect(page.locator('[data-browser-qa="source-packet-builder"]')).toBeVisible();
      await expect(page.locator('#buildSourcePacketFromEvidenceBtn')).toBeVisible();
      await expect(page.locator('#buildSourcePacketFromReviewBtn')).toBeVisible();
      await expect(page.locator('#copySourcePacketBuilderBtn')).toBeVisible();
      await expect(page.locator('#exportSourcePacketBuilderBtn')).toBeVisible();
      await assertLocalizedGuardrail(page);
      await assertNoHorizontalOverflow(page);
    });
  }

  test('builds a local/manual source packet without live-fetch or verification claims', async ({ page }) => {
    await seedEvidence(page);
    await selectWorkflowTab(page, 'sources');
    await page.locator('#buildSourcePacketFromEvidenceBtn').click();
    await expect(page.locator('#sourcePacketBuilderOutput')).toContainText('source_packet_builder.v1');
    await expect(page.locator('#sourcePacketBuilderOutput')).toContainText('live_fetching_performed');
    await expect(page.locator('#sourcePacketBuilderOutput')).toContainText('verification_claimed');
    await expect(page.locator('#sourcePacketBuilderOutput')).toContainText('false');
    await expect(page.locator('#copySourcePacketBuilderBtn')).toBeVisible();
    await expect(page.locator('#exportSourcePacketBuilderBtn')).toBeVisible();
    await assertNoHorizontalOverflow(page);
  });
});
