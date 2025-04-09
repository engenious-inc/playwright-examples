import { test, expect, devices } from '@playwright/test';

test.describe('Webinar', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the "About Us" page before each test
    await page.goto(
      'https://course-user:Cou1dc4F@test.elitefleetgroup.engenious.io/about-us',
    );
  });
  // Round 2: Locator Strategy & Element Identification

  test('Locator Strategies for Email Field', async ({ page }) => {
    // Locator Strategy 1: getByRole (recommended Playwright API)
    await page.getByRole('textbox', { name: 'Email' });

    // Locator Strategy 2: getByLabel (for labeled fields)
    await page.getByLabel('Email');

    // Locator Strategy 3: CSS selector (attribute based)
    await page.locator('input[type="email"]');

    // Locator Strategy 4: XPath

    await page.locator(
      'xpath=html/body/div[3]/div/div/div/form/div[1]/div/input',
    );

    //TODO stacking of locators!
  });
});
