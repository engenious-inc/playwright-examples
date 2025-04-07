import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  timeout: 60_000,
  expect: { timeout: 10_000 },
  retries: 0,
  workers: undefined,
  reporter: 'html',
  //reporter: [['allure-playwright']],
  use: {
    baseURL: 'https://course-user:Cou1dc4F@test.elitefleetgroup.engenious.io/',
    trace: 'retain-on-failure',
    actionTimeout: 0,
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    // {
    //   name: 'mobile_safari',
    //   use: { ...devices['iPhone 15'] }, // Emulate iPhone 15 Safari
    // },
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
    // {
    //   name: 'mobile_safari',
    //   use: { ...devices['iPhone 15'] },
    // },
  ],
});
