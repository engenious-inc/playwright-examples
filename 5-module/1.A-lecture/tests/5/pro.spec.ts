import { test as baseTest, expect, Route } from '@playwright/test';

// Define custom test fixtures
const test = baseTest.extend({
  contextWithAuth: async ({ browser }, use) => {
    // Create a new browser context with authentication
    const context = await browser.newContext({
      storageState: 'auth.json', // Use saved authentication state
    });
    await use(context);
    await context.close();
  },
});

test('Advanced Features - Senior QA', async ({ contextWithAuth }) => {
  const page = await contextWithAuth.newPage();

  // Intercept network requests to mock API responses
  await page.route('https://api.example.com/data', async (route: Route) => {
    const mockResponse = { data: 'Mocked Data' };
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(mockResponse),
    });
  });

  // Navigate to the page
  await page.goto('https://example.com/dashboard');

  // Validate the mocked data is displayed
  const dataText = await page.textContent('#data-display');
  expect(dataText).toBe('Mocked Data');

  // Use mobile emulation for responsive testing
  await page.setViewportSize({ width: 375, height: 667 }); // iPhone dimensions
  await page.reload(); // Ensure the page reloads with the new viewport size
  const mobileViewText = await page.textContent('#responsive-element');
  expect(mobileViewText).toBe('Mobile View Active');
});