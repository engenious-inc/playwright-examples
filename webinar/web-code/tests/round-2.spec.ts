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
    // getByRole (recommended Playwright API)
    page.getByRole('textbox', { name: 'Email' });

    //getByLabel (for labeled fields)
    page.getByLabel('Email');

    //CSS selector (attribute based)
    page.locator('input[type="email"]');

    // XPath

    page.locator('xpath=html/body/div[3]/div/div/div/form/div[1]/div/input');

    //stacked
    page.locator('form').locator('input[type="email"]');
  });
});
