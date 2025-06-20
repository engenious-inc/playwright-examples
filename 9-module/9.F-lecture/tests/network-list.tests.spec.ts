/* eslint-disable playwright/expect-expect */
import { test } from '../fixtures/global';

test('intercept and change response', async ({ page }) => {
  await page.goto('/our-cars');
  await page.route(
    'https://test.api.elitefleetgroup.engenious.io/vehicles/platform',
    async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          vehicles: [
            {
              id: 3,
              make: 'Lamborghini - Engenious',
              model: 'Huracan STO TEST CAR',
              price: '150000.00',
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

  await page.goto('/our-cars');
  await page.goto('/our-cars');
});

//login
