import { defineConfig, devices } from '@playwright/test';

const hostedDemoUrl = process.env.HOSTED_DEMO_URL?.trim();
const localBaseUrl = 'http://127.0.0.1:4173';
const baseURL = hostedDemoUrl || localBaseUrl;
const chromiumExecutablePath = process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH?.trim();

export default defineConfig({
  testDir: './tests',
  timeout: 30_000,
  expect: { timeout: 5_000 },
  fullyParallel: true,
  retries: process.env.CI ? 1 : 0,
  reporter: [['list'], ['html', { open: 'never' }]],
  webServer: hostedDemoUrl ? undefined : {
    command: 'npx http-server . -p 4173 -c-1',
    url: localBaseUrl,
    reuseExistingServer: !process.env.CI,
    timeout: 30_000
  },
  use: {
    baseURL,
    trace: 'on-first-retry',
    launchOptions: chromiumExecutablePath ? { executablePath: chromiumExecutablePath } : undefined
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile-chrome', use: { ...devices['Pixel 5'] } }
  ]
});
