import { test, expect } from '@playwright/test';

async function ensureWorkflowPanelExpanded(page) {
  const workflowPanel = page.locator('#workflowPanel');
  await expect(
    workflowPanel,
    'Workflow command panel should exist before the RTL/mobile sample flow starts.'
  ).toBeVisible({ timeout: 10000 });

  const isCollapsed = await workflowPanel.evaluate((panel) =>
    panel.classList.contains('screenDisciplineCollapsed')
  );

  if (isCollapsed) {
    const toggle = page.locator('#workflowPanelToggle');
    await expect(
      toggle,
      'Collapsed workflow panel should expose the Command Center expand control.'
    ).toBeVisible({ timeout: 10000 });
    await toggle.click();
  }

  await expect(
    page.locator('#loadSampleBtn'),
    'RTL/mobile sample action should be visible after expanding the Command Center.'
  ).toBeVisible({ timeout: 10000 });
}

async function collectHorizontalOverflow(page) {
  return page.evaluate(() => {
    const root = document.documentElement;
    const viewportWidth = root.clientWidth;
    const overflow = root.scrollWidth - viewportWidth;
    const offenders = Array.from(document.querySelectorAll('body *'))
      .map((element) => {
        const rect = element.getBoundingClientRect();
        const style = window.getComputedStyle(element);
        const className = typeof element.className === 'string' ? element.className : '';
        return {
          tag: element.tagName.toLowerCase(),
          id: element.id || '',
          className,
          text: (element.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 90),
          left: Math.round(rect.left),
          right: Math.round(rect.right),
          width: Math.round(rect.width),
          scrollWidth: element.scrollWidth,
          clientWidth: element.clientWidth,
          display: style.display,
          position: style.position,
          whiteSpace: style.whiteSpace,
          overflowX: style.overflowX,
        };
      })
      .filter((item) =>
        item.right > viewportWidth + 2 ||
        item.left < -2 ||
        item.width > viewportWidth + 2 ||
        item.scrollWidth > item.clientWidth + 2
      )
      .slice(0, 20);

    return {
      viewportWidth,
      documentScrollWidth: root.scrollWidth,
      overflow,
      offenders,
    };
  });
}

test.describe('RTL and mobile layout smoke', () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test('Arabic mobile flow remains readable and does not overflow horizontally', async ({ page }) => {
    await page.goto('/');
    await page.locator('#langAr').click();
    await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');

    await ensureWorkflowPanelExpanded(page);
    await expect(
      page.locator('#workflowPanel:not(.screenDisciplineCollapsed) #welcomeCard'),
      'Welcome card is intentionally hidden while Command Center is collapsed, then visible after expansion.'
    ).toBeVisible({ timeout: 10000 });
    await page.locator('#loadSampleBtn').click();
    await expect(page.locator('#reviewPanel')).toBeVisible();

    const overflowReport = await collectHorizontalOverflow(page);
    expect(
      overflowReport.overflow,
      `Horizontal overflow report: ${JSON.stringify(overflowReport, null, 2)}`
    ).toBeLessThanOrEqual(2);

    await page.locator('[data-review="evidence"]').click();
    await expect(page.locator('#reviewContent')).toBeVisible();
    await expect(page.locator('#reviewContent')).toContainText(/الأدلة|Evidence|Preuves/);
  });
});
