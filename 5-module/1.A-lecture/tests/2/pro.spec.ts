import { test, expect } from '@playwright/test';
import { ExamplePage } from './pro-login';

test('Handling Asynchronous Operations - Senior', async ({ page }) => {
  const examplePage = new ExamplePage(page);

  // Mock network request
  await examplePage.mockNetworkRequest('https://example.com/api/submit', {
    success: true,
  });

  await examplePage.navigate();
  await examplePage.clickSubmitButton();

  // Wait for network event to be resolved
  await examplePage.waitForNetworkEvent('https://example.com/api/submit');

  const successMessage = await examplePage.getSuccessMessage();
  expect(successMessage).toBe('Operation successful');
});
