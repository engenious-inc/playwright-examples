import { test, expect, devices } from '@playwright/test';

test.describe('Webinar', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the "About Us" page before each test
    await page.goto(
      'https://course-user:Cou1dc4F@test.elitefleetgroup.engenious.io/about-us',
    );
  });

  // Round 5: Cross-Browser & Mobile Testing
  //npx playwright test --debug --project mobile_safari
  test.only('Round 5 - Mobile Emulation for iPhone', async ({ page }) => {
    await page.getByRole('button', { name: 'Sign In' }).click();

    await page
      .getByRole('textbox', { name: 'Email' })
      .fill('jakogam253@oronny.com');
    await page.getByRole('textbox', { name: 'Password' }).fill('Password1!');
    await page.getByRole('button', { name: 'Sign in' }).click();

    await page.getByRole('button', { name: 'Account' }).click();
    await page.getByRole('link', { name: 'Profile' }).click();

    await expect(page.getByText('John')).toBeVisible();
    await page.getByText('Quinn').click();
    await expect(page.getByText('jakogam253@oronny.com')).toBeVisible();
  });
});
