import { test, expect } from '@playwright/test';
import { OurCarsPage } from '../page-objects/OurCarsPage';

const BMW_M760 = 'BMW M760';
const carPrice = '$450/day';

test.describe('Our Cars Page', () => {
  let ourCarsPage: OurCarsPage;
  test.beforeEach(async ({ page }) => {
    ourCarsPage = new OurCarsPage(page);
    await ourCarsPage.navigateToOurCarsPage();
  });

  test('Verify "BMW M760" is visible on the "Our Cars" page', async () => {
    const isCarVisible = await ourCarsPage.isCarButtonVisible(BMW_M760);
    expect(isCarVisible).toBeTruthy();
  });

  test('Navigate to and Verify the "BMW M760" Details Page', async () => {
    const isCarVisible = await ourCarsPage.isCarButtonVisible(BMW_M760);
    expect(isCarVisible).toBeTruthy();
    expect(ourCarsPage.getCarDetailsText(BMW_M760).isVisible()).toBeTruthy();
    expect(
      ourCarsPage.getCarPriceText(BMW_M760, carPrice).isVisible(),
    ).toBeTruthy();
    expect(ourCarsPage.getBookNowButton().isVisible()).toBeTruthy();
  });
});
