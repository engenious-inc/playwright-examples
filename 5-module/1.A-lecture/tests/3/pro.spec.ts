import { test } from '@playwright/test';

test('Debugging with Console Logs - Rookie', async ({ page }) => {
  
  await page.goto('https://example.com');
  await page.click('#submit');

  const successMessage = await page.locator('.success-message').textContent();


  //! USE PLAYWRIGHT TRACE VIEWER 
  //! Breakpoints
  // https://playwright.dev/docs/trace-viewer
});