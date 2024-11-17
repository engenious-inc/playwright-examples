import { test, expect } from '@playwright/test';

test('Verify "BMW M760" is visible on the "Our Cars" page', async ({
  page,
}) => {
  await page.goto(
    'https://course-user:Cou1dc4F@test.elitefleetgroup.engenious.io/',
  );
  await page.getByRole('link', { name: 'View All Cars' }).click();
  await expect(
    page.getByRole('button', { name: 'Car Image Car Image BMW M760' }).nth(1),
  ).toBeVisible();
});

test('Navigate to and Verify the "BMW M760" Details Page', async ({ page }) => {
  await page.goto(
    'https://course-user:Cou1dc4F@test.elitefleetgroup.engenious.io/',
  );
  await page.getByRole('link', { name: 'View All Cars' }).click();

  await expect(
    page.getByRole('button', { name: 'Car Image Car Image BMW M760' }).nth(1),
  ).toBeVisible();
  await expect(page.getByText('BMW M760')).toBeVisible();
  await expect(page.getByText('BMW M760$450/dayBook Now')).toBeVisible();
  await expect(page.getByText('Book Now').nth(2)).toBeVisible();
});
