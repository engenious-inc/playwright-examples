/* eslint-disable playwright/expect-expect */

import { test } from '@playwright/test';

test.describe('1. Selectors and Navigation Basics', () => {
  test('CSS Selectors', async ({ page }) => {
    await page.goto('https://staging.elitefleetgroup.engenious.io/');
    await page.locator('button.primary').click();
    await page.locator('#submit').click();
    await page.locator('input[name="email"]').fill('test@example.com');
  });

  test('XPath Selectors', async ({ page }) => {
    await page.goto('https://staging.elitefleetgroup.engenious.io/');
    await page.locator('//button[text()="Submit"]').click();
    await page.locator('//div[@class="alert"]').textContent();
  });

  test('Other Playwright Selectors', async ({ page }) => {
    await page.goto('https://staging.elitefleetgroup.engenious.io/');
    await page.getByRole('button', { name: 'Submit' }).click();
    await page.getByTestId('login-input').fill('myUser');
    await page.getByText('Welcome').isVisible();
  });

  test('Navigation Basics', async ({ page }) => {
    await page.goto('https://staging.elitefleetgroup.engenious.io/');
    // eslint-disable-next-line playwright/no-wait-for-selector
    await page.waitForSelector('h1');
    await page.goto('https://example.com', { waitUntil: 'load' });
    await page.goBack();
    await page.goForward();
    await page.reload();
  });
});
