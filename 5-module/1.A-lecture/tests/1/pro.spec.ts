import { test, expect } from '@playwright/test';
import { LoginPage } from './pro-login';

test('Login Test - Senior', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigate();
  await loginPage.login('testuser', 'password123');
  const welcomeMessage = await loginPage.getWelcomeMessage();
  expect(welcomeMessage).toBe('Welcome, testuser!');
});
