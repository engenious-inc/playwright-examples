import { test } from '../fixtures/global';
import { expect } from '@playwright/test';

const BMW_M760 = 'BMW M760';
const carPrice = '$450/day';

test.describe('Our Cars Page', () => {
  test('Verify "BMW M760" is visible on the "Our Cars" page', async ({
    ourCarsPage,
  }) => {
    const isCarVisible = await ourCarsPage.isCarButtonVisible(BMW_M760);
    expect(isCarVisible).toBeTruthy();
  });

  test('Verify the "BMW M760" Details Text is visible', async ({
    ourCarsPage,
  }) => {
    const carDetailsTextVisible = await ourCarsPage.getCarDetailsText(BMW_M760);
    await expect.soft(carDetailsTextVisible).toBeVisible();
  });

  test('Verify the "BMW M760" Price Text is correct', async ({
    ourCarsPage,
  }) => {
    const carPriceTextVisible = await ourCarsPage.getCarPriceText(
      BMW_M760,
      carPrice,
    );
    expect.soft(carPriceTextVisible).toBeDefined();
  });

  test('Verify "Book Now" button is visible for "BMW M760"', async ({
    ourCarsPage,
  }) => {
    const bookNowButtonVisible = await ourCarsPage.getBookNowButton(BMW_M760);
    expect.soft(bookNowButtonVisible).toBeDefined();
  });
});
