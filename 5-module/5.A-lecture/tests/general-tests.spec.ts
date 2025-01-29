import { test, expect } from '@playwright/test';
import { OurCarsPage } from '../page-objects/OurCarsPage';
import { LoginPage } from '../page-objects/LoginPage';
import { NavigationPage } from '../page-objects/NavigationPage';

const BMW_M760 = 'BMW M760';
const EMAIL = 'podam96524@maonyn.com';
const PASSWORD = 'TestEng123!';

test.describe('Our Cars Page - Extended Tests', () => {
  let ourCarsPage: OurCarsPage;
  let loginPage: LoginPage;
  let navigationPage: NavigationPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    ourCarsPage = new OurCarsPage(page);
    navigationPage = new NavigationPage(page);
    await loginPage.navigateTo('/our-cars');
    await loginPage.login(EMAIL, PASSWORD);
  });

  test('Verify BMW M760 is visible on the Our Cars page', async () => {
    await ourCarsPage.navigateTo('/our-cars');
    expect(await ourCarsPage.isCarButtonVisible(BMW_M760)).toBeTruthy();
  });

  test('Pressing on book now button shows booking popup', async () => {
    await ourCarsPage.bookCar(BMW_M760);
    expect(await ourCarsPage.isBookingPopupVisible()).toBeTruthy();
    expect(await ourCarsPage.isCarSelectDropdownVisible()).toBeTruthy();
  });

  test('Verify choose car list is visible', async () => {
    await navigationPage.goToBookingDetails(307);
    expect(
      await ourCarsPage.isCarInBookingDetails('BMW M8 Competition Gran Coupe'),
    ).toBeTruthy();
  });

  test('Verify booking shows correct dates', async () => {
    await navigationPage.goToBookingDetails(307);
    expect(
      await ourCarsPage.isBookingDateVisible('September 13, 2026 8:00 AM'),
    ).toBeTruthy();
    expect(
      await ourCarsPage.isBookingDateVisible('October 3, 2026 6:30 AM'),
    ).toBeTruthy();
  });

  test('Verify user profile shows correct data', async () => {
    await navigationPage.goToUserProfile();
    expect(
      await loginPage.isUserProfileVisible(EMAIL, 'TestEngenious'),
    ).toBeTruthy();
  });

  test('Verify booking details show correct list', async () => {
    await navigationPage.goToBookingList();
    expect(
      await ourCarsPage.isCarInBookingDetails('BMW M8 Competition Gran Coupe'),
    ).toBeTruthy();
  });
});
