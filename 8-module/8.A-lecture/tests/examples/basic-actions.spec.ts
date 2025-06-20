/* eslint-disable playwright/expect-expect */

import { test } from '@playwright/test';

test.describe('1. Selectors and Navigation Basics', () => {
  test('CSS Selectors', async ({ page }) => {
    await page.goto('https://staging.elitefleetgroup.engenious.io/');
    await page.locator('button.primary').click();
    await page
      .locator('._header_785ud_195 .react-datepicker__input-container ')
      .click();
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
    //data-testid, data-test-id data-id
    await page.getByText('Welcome', { exact: true }).isVisible();
  });

  test('Navigation Basics test', async ({ page }) => {
    await page.goto('/');
    await page.goto('/about-us');
    // await page.waitForSelector('h1');
    // await page.goto('https://example.com', { waitUntil: 'load' });
    await page.goBack();
    await page.goForward();
    await page.reload();
  });
});
