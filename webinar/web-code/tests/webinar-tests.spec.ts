import { test, expect } from '@playwright/test';


//jakogam253@oronny.com
//Password1!


test.describe('Webinar', () => {
 test.beforeEach(async ({ page }) => {
    // Navigate to the "About Us" page before each test
    await page.goto('https://course-user:Cou1dc4F@test.elitefleetgroup.engenious.io/about-us');
  });

// Round 1: Login Automation
// Playwright vs Selenium: Speed, stability, and ease of setup.

  test('Login Automation', async ({ page }) => {
    await page.getByRole('button', { name: 'Sign In' }).click();
  

    await page.getByRole('textbox', { name: 'Email' }).fill('jakogam253@oronny.com');
    await page.getByRole('textbox', { name: 'Password' }).fill('Password1!');
    await page.getByRole('button', { name: 'Sign in' }).click();

    await page.getByRole('button', { name: 'Account' }).click();
    await page.getByRole('link', { name: 'Profile' }).click();

    await expect(page.getByText('John')).toBeVisible();
    await page.getByText('Quinn').click();
    await expect(page.getByText('jakogam253@oronny.com')).toBeVisible();

  });


// Round 2: Locator Strategy & Element Identification
// How each tool handles element locators for accuracy and reliability.
// 4 dfiferent locators


// Round 3: Mocking & Intercepting API Calls
// Which tool provides better support for request interception and mocking?
// clear all and add only

// Round 4: Integrating External Tools & Plugins
// Exploring the compatibility and ease of integrating third-party tools.

// Round 5: Cross-Browser & Mobile Testing
// Evaluating which framework offers better cross-browser and mobile support.
//code running in a mobile mode


});
