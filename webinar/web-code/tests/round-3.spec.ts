import { test, expect, devices } from '@playwright/test';

test.describe('Webinar', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the "About Us" page before each test
    await page.goto(
      'https://course-user:Cou1dc4F@test.elitefleetgroup.engenious.io/about-us',
    );
  });

  // Round 3: Mocking & Intercepting API Calls
  test.only('Mocking vehicles response to show only test car', async ({ page }) => {
    await page.route(
      'https://test.api.elitefleetgroup.engenious.io/vehicles/platform',
      async (route) => {
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
                normalImageUrl:
                  'https://elite-fleet-dev.s3.us-east-2.amazonaws.com/vehicles/7c2503ca-2956-4f67-9186-b204fad02d95-Lambo_Huracan.png',
                normalImageKey:
                  'vehicles/7c2503ca-2956-4f67-9186-b204fad02d95-Lambo_Huracan.png',
                hoverImageUrl:
                  'https://elite-fleet-dev.s3.us-east-2.amazonaws.com/vehicles/9b2bc972-b542-4262-bbcc-d6cc4bca34ca-H_Lambo_Huracan.png',
                hoverImageKey:
                  'vehicles/9b2bc972-b542-4262-bbcc-d6cc4bca34ca-H_Lambo_Huracan.png',
              },
            ],
          }),
        });
      },
    );

    await page.goto(
      'https://course-user:Cou1dc4F@test.elitefleetgroup.engenious.io/our-cars',
    );
    await expect(page.locator('text=Test')).toBeVisible();
  });
});
