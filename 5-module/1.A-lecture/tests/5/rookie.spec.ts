import { test, expect } from '@playwright/test';

test('Basic Navigation - Rookie QA', async ({ page }) => {

  await page.goto('https://example.com');

  const pageTitle = await page.title();
  expect(pageTitle).toBe('Example Domain');

  await page.click('text=More information...');
});
