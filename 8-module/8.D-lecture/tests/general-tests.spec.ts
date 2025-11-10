import { test } from '../fixtures/global'; // Import the custom test with fixtures
import { expect } from '@playwright/test';

const BMW_M760 = 'BMW M760';
const EMAIL = 'podam96524@maonyn.com';
const INVALID_EMAIL = 'invalid@maonyn.com';
const INVALID_PASSWORD = 'WrongPassword!';
const PASSWORD = 'TestEng123!';

test.describe('Our Cars Page - Extended Tests', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.navigateTo();
    await loginPage.login(EMAIL, PASSWORD);
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

    const firstDateVisible = await ourCarsPage.isBookingDateVisible(
      'September 13, 2026 8:00 AM',
    );
    console.log('First date visible:', firstDateVisible);
    expect(firstDateVisible).toBeTruthy();

    const secondDateVisible = await ourCarsPage.isBookingDateVisible(
      'October 3, 2026 6:30 AM',
    );
    console.log('Second date visible:', secondDateVisible);
    expect(secondDateVisible).toBeTruthy();
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

  test('Invalid login credentials show error message', async ({
    loginPage,
  }) => {
    await loginPage.login(INVALID_EMAIL, INVALID_PASSWORD);
    expect(await loginPage.isErrorMessageVisible()).toBeTruthy();
  });

  test('Car button not visible for an unavailable car', async ({
    ourCarsPage,
  }) => {
    await ourCarsPage.navigateTo('/our-cars');
    expect(await ourCarsPage.isCarButtonVisible('NonExistentCar')).toBeFalsy();
  });

  test('Verify booking details show correct list on a page', async ({
    navigationPage,
    ourCarsPage,
  }) => {
    await navigationPage.goToBookingList();
    expect(
      await ourCarsPage.isCarInBookingDetails('BMW M8 Competition Gran Coupe'),
    ).toBeTruthy();
  });
});
