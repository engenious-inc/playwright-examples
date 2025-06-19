/* eslint-disable playwright/no-force-option */
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

test.describe('2. Clicking, Typing, and Forcing Actions', () => {
  test('Clicking', async ({ page }) => {
    await page.locator('button.submit').click();
    await page.getByText('Submit').click();
    await page.locator('button').click({ button: 'right' });
    await page.locator('button').click({ clickCount: 2 });
    await page.locator('button').click({ modifiers: ['Shift'] });
  });

  test('Typing', async ({ page }) => {
    await page.locator('#email').fill('user@example.com');
    await page.locator('#email').type('user@example.com');
    await page.locator('#email').type('user@example.com', { delay: 100 });
  });

  test('Forcing Actions', async ({ page }) => {
    await page.locator('button').click({ force: true });
    await page.locator('input').fill('test', { force: true });
  });
});

test.describe('3. Checkboxes, Selects, Key Presses, Action Options', () => {
  test('Checkboxes', async ({ page }) => {
    await page.locator('#agree').check();
    await page.locator('#agree').uncheck();
  });

  test('Selecting from Dropdowns', async ({ page }) => {
    await page.locator('select#cars').selectOption('volvo');
    await page.locator('select#cars').selectOption({ label: 'Volvo' });
    await page.locator('select#cars').selectOption({ index: 1 });
  });

  test('Key Presses', async ({ page }) => {
    await page.locator('#input').press('Enter');
    await page.locator('#input').press('Control+A');
  });

  test('Common Action Options', async ({ page }) => {
    await page.locator('button').click({ timeout: 5000 });
    await page.locator('button').click({ noWaitAfter: true });
    await page.locator('input').fill('text', { force: true });
  });
});
