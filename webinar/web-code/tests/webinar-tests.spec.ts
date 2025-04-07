import { test, expect, devices } from '@playwright/test';

test.describe('Webinar', () => {
 test.beforeEach(async ({ page }) => {
    // Navigate to the "About Us" page before each test
    await page.goto('https://course-user:Cou1dc4F@test.elitefleetgroup.engenious.io/about-us');
  });

// Round 1: Login Automation

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

  test('Locator Strategies for Email Field', async ({ page }) => {
    await page.getByRole('button', { name: 'Sign In' }).click();

    // Locator Strategy 1: getByRole (recommended Playwright API)
    await expect(page.getByRole('textbox', { name: 'Email' })).toBeVisible();

    // Locator Strategy 2: getByLabel (for labeled fields)
    await expect(page.getByLabel('Email')).toBeVisible();

    // Locator Strategy 3: CSS selector (attribute based)
    await expect(page.locator('input[type="email"]')).toBeVisible();

    // Locator Strategy 4: XPath
    await expect(page.locator('xpath=html/body/div[3]/div/div/div/form/div[1]/div/input')).toBeVisible();
  });

// Round 3: Mocking & Intercepting API Calls
test('Mocking vehicles response to show only test car', async ({ page }) => {
    await page.route('https://test.api.elitefleetgroup.engenious.io/vehicles/platform', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          vehicles: [
            {
              id: 999,
              make: 'Test',
              model: 'Car',
              price: '1000.00',  
            normalImageUrl: "https://elite-fleet-dev.s3.us-east-2.amazonaws.com/vehicles/7c2503ca-2956-4f67-9186-b204fad02d95-Lambo_Huracan.png",
            normalImageKey: "vehicles/7c2503ca-2956-4f67-9186-b204fad02d95-Lambo_Huracan.png",
            hoverImageUrl: "https://elite-fleet-dev.s3.us-east-2.amazonaws.com/vehicles/9b2bc972-b542-4262-bbcc-d6cc4bca34ca-H_Lambo_Huracan.png",
            hoverImageKey: "vehicles/9b2bc972-b542-4262-bbcc-d6cc4bca34ca-H_Lambo_Huracan.png"
            }
          ]
        })
      });
    });

    await page.goto('https://course-user:Cou1dc4F@test.elitefleetgroup.engenious.io/our-cars');
    await expect(page.locator('text=Test')).toBeVisible();
  });

// Round 4: Integrating External Tools & Plugins

// Round 5: Cross-Browser & Mobile Testing
//npx playwright test --debug --project mobile_safari
test.only('Round 5 - Mobile Emulation for iPhone', async ({ page }) => {
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


});
