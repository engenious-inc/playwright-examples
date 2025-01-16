import { test, expect } from '@playwright/test';

test('Login Test - Rookie', async ({ page }) => {
  await page.goto('https://example.com/login');
  await page.fill('#username', 'testuser');
  await page.fill('#password', 'password123');
  await page.click('#login');
  const welcomeMessage = page.locator('.welcome-message');
  await expect(welcomeMessage).toHaveText('Welcome, testuser!');
});
