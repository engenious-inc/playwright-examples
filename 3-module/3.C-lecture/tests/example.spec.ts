import { test, expect, Page, Locator } from '@playwright/test';

test.describe('Our Cars Page', () => {
  //? Helpers
  const navigateToOurCarsPage = async (page: Page): Promise<void> => {
    await page.goto(
      'https://course-user:Cou1dc4F@test.elitefleetgroup.engenious.io/',
    );
    await page.getByRole('link', { name: 'View All Cars' }).click();
  };
  const getBMWM760Button = (page: Page): Locator =>
    page.getByRole('button', { name: 'Car Image Car Image BMW M760' }).nth(1);
  const getBMWM760DetailsText = (page: Page): Locator =>
    page.getByText('BMW M760');
  const getBMWM760PriceText = (page: Page): Locator =>
    page.getByText('BMW M760$450/dayBook Now');
  const getBookNowButton = (page: Page): Locator =>
    page.getByText('Book Now').nth(2);

  test.beforeEach(async ({ page }) => {
    await navigateToOurCarsPage(page);
  });

  test('Verify "BMW M760" is visible on the "Our Cars" page', async ({
    page,
  }) => {
    await expect(getBMWM760Button(page)).toBeVisible();
  });

  test('Navigate to and Verify the "BMW M760" Details Page', async ({
    page,
  }) => {
    await expect(getBMWM760Button(page)).toBeVisible();
    await expect(getBMWM760DetailsText(page)).toBeVisible();
    await expect(getBMWM760PriceText(page)).toBeVisible();
    await expect(getBookNowButton(page)).toBeVisible();
  });
});
