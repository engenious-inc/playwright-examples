import { test } from '../fixtures/global'; // Import the custom test with fixtures
import { expect } from '@playwright/test';

const BMW_M760 = 'BMW M760';
const EMAIL = 'podam96524@maonyn.com';
const PASSWORD = 'TestEng123!';

test.describe('Our Cars Page - Extended Tests', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.navigateTo();
    await loginPage.login(EMAIL, PASSWORD);
  });

  test('Verify BMW M760 is visible on the Our Cars page', async ({
    ourCarsPage,
  }) => {
    await ourCarsPage.navigateTo('/our-cars');
    expect(await ourCarsPage.isCarButtonVisible(BMW_M760)).toBeTruthy();
  });

  test('Pressing on book now button shows booking popup', async ({
    ourCarsPage,
  }) => {
    await ourCarsPage.bookCar(BMW_M760);
    expect(await ourCarsPage.isBookingPopupVisible()).toBeTruthy();
    expect(await ourCarsPage.isCarSelectDropdownVisible()).toBeTruthy();
  });

  test('Verify choose car list is visible', async ({
    navigationPage,
    ourCarsPage,
  }) => {
    await navigationPage.goToBookingDetails(307);
    expect(
      await ourCarsPage.isCarInBookingDetails('BMW M8 Competition Gran Coupe'),
    ).toBeTruthy();
  });

  test('Verify booking shows correct dates', async ({
    navigationPage,
    ourCarsPage,
  }) => {
    await navigationPage.goToBookingDetails(307);
    expect(
      await ourCarsPage.isBookingDateVisible('September 13, 2026 8:00 AM'),
    ).toBeTruthy();
    expect(
      await ourCarsPage.isBookingDateVisible('October 3, 2026 6:30 AM'),
    ).toBeTruthy();
  });

  test('Verify user profile shows correct data', async ({
    navigationPage,
    loginPage,
  }) => {
    await navigationPage.goToUserProfile();
    expect(
      await loginPage.isUserProfileVisible(EMAIL, 'TestEngenious'),
    ).toBeTruthy();
  });

  test('Verify booking details show correct list', async ({
    navigationPage,
    ourCarsPage,
  }) => {
    await navigationPage.goToBookingList();
    expect(
      await ourCarsPage.isCarInBookingDetails('BMW M8 Competition Gran Coupe'),
    ).toBeTruthy();
  });
});
