import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './.claude/agents/qa-tester',
  testMatch: '**/*.spec.ts',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: 0,
  workers: 1,
  timeout: 60000,
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report' }],
    ['json', { outputFile: 'test-results.json' }]
  ],
  use: {
    baseURL: 'http://localhost:5001',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  // Assume dev server is already running
  // webServer: {
  //   command: 'npm run dev',
  //   url: 'http://localhost:5001',
  //   reuseExistingServer: true,
  //   timeout: 120000,
  // },
});
