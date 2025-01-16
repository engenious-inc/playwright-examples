import { test, expect } from '@playwright/test';

test('Handling Asynchronous Operations - Rookie', async ({ page }) => {
  await page.goto('https://example.com');
  await page.waitForTimeout(5000);
  await page.click('#submit');
  const successMessage = page.locator('.success-message');
  await expect(successMessage).toHaveText('Operation successful');
});
