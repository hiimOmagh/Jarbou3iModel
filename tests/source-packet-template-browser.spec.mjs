import { test, expect } from '@playwright/test';

const TEMPLATE_IDS = ['official_report', 'reddit_thread', 'youtube_transcript', 'market_signal', 'github_release', 'generic_article'];
const FORBIDDEN_COPY = [/live scraping performed/i, /live fetching performed/i, /verified source truth/i, /OAuth connected/i, /provider expanded/i, /template presets ready/i, /local manual source packet template/i];

async function assertNoHorizontalOverflow(page) {
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(2);
}

async function selectWorkflowTab(page, tab) {
  await page.locator(`#researchModeNav .uxTab[data-ux-tab="${tab}"]`).click();
  await expect(page.locator(`#researchModeNav .uxTab[data-ux-tab="${tab}"]`)).toHaveAttribute('aria-selected', 'true');
}

async function buildTemplatePacket(page, templateId) {
  await page.locator('#sourcePacketTemplateSelect').selectOption(templateId);
  await expect(page.locator('#sourcePacketTemplateSelect')).toHaveValue(templateId);
  await page.locator('#buildSourcePacketFromTemplateBtn').click();
  await expect(page.locator('#sourcePacketBuilderOutput')).toContainText('source_packet_builder.v1');
  const outputText = await page.locator('#sourcePacketBuilderOutput').innerText();
  expect(outputText).toContain('\"live_fetching_performed\": false');
  expect(outputText).toContain('\"verification_claimed\": false');
}

test.describe('v1.1.0-alpha.22 source packet template browser QA + copy safety', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await selectWorkflowTab(page, 'sources');
  });

  for (const viewport of [
    { name: 'desktop', width: 1440, height: 950 },
    { name: 'tablet', width: 820, height: 1180 },
    { name: 'mobile', width: 390, height: 844 }
  ]) {
    test(`template selector and copy/export controls remain visible on ${viewport.name}`, async ({ page }) => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await expect(page.locator('[data-browser-qa="source-packet-builder"]')).toBeVisible();
      await expect(page.locator('#sourcePacketTemplateSelect')).toBeVisible();
      await expect(page.locator('#buildSourcePacketFromTemplateBtn')).toBeVisible();
      await expect(page.locator('#copySourcePacketBuilderBtn')).toBeVisible();
      await expect(page.locator('#exportSourcePacketBuilderBtn')).toBeVisible();
      await assertNoHorizontalOverflow(page);
    });
  }

  test('all template presets build local/manual packets without fetch or verification claims', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    for (const templateId of TEMPLATE_IDS) {
      await buildTemplatePacket(page, templateId);
      const bodyText = await page.locator('#sourcePacketBuilderOutput').innerText();
      for (const pattern of FORBIDDEN_COPY) expect(bodyText).not.toMatch(pattern);
      await page.locator('#copySourcePacketBuilderBtn').click();
      const copied = await page.evaluate(() => navigator.clipboard.readText());
      const packet = JSON.parse(copied);
      expect(packet.source_packets[0].template_id).toBe(templateId);
      expect(packet.builder_report.live_fetching_performed).toBe(false);
      expect(packet.builder_report.verification_claimed).toBe(false);
      await assertNoHorizontalOverflow(page);
    }
  });

  test('copy button copies source packet JSON safely', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    await buildTemplatePacket(page, 'reddit_thread');
    await page.locator('#copySourcePacketBuilderBtn').click();
    const copied = await page.evaluate(() => navigator.clipboard.readText());
    const packet = JSON.parse(copied);
    expect(packet.workflow_version).toBe('1.1.0-alpha.22');
    expect(packet.source_packets[0].template_id).toBe('reddit_thread');
    expect(packet.builder_report.live_fetching_performed).toBe(false);
    expect(packet.builder_report.verification_claimed).toBe(false);
    expect(packet.builder_report.policy).toContain('no_fetch_no_verification');
    for (const pattern of FORBIDDEN_COPY) expect(copied).not.toMatch(pattern);
  });
});
