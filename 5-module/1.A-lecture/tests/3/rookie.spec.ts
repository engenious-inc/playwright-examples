import { test, expect } from '@playwright/test';

test('Debugging with Console Logs - Rookie', async ({ page }) => {
  // Navigate to the page
  console.log('Navigating to the page...');
  await page.goto('https://example.com');

  // Click the submit button
  console.log('Clicking the submit button...');
  await page.click('#submit');

  // Validate success message
  console.log('Checking for success message...');
  const successMessage = page;
  console.log('Success message:', successMessage);

});
