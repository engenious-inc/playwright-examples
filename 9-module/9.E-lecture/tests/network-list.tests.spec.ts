import { test } from '../fixtures/global';
import { expect } from '@playwright/test';

test('monitoring network', async ({ page, loginPage }) => {
  await loginPage.navigateTo();
  page.on('request', (request) => {
    if (
      request.url() ===
      'https://test.api.elitefleetgroup.engenious.io/vehicles/platform/random'
    ) {
      console.log('Request made to:', request.url());
      console.log('Request method:', request.method());
    }
  });

  page.on('response', (response) => {
    if (
      response.url() ===
      'https://test.api.elitefleetgroup.engenious.io/vehicles/platform/random'
    ) {
      console.log('Response made to:', response.url());
      console.log('Response status:', response.status());
      console.log('Response body:', response.body());
    }
  });

  await page.goto('/');
  const mainSection = page.getByRole('main').first();
  await expect(mainSection).toContainText('Jane');
  await expect(mainSection).toContainText('Doe');
});
