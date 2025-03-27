import { test as baseTest } from '@playwright/test';
import { LoginPage } from '../page-objects/LoginPage';
import { OurCarsPage } from '../page-objects/OurCarsPage';
import { NavigationPage } from '../page-objects/NavigationPage';
import { BookingCar } from '../page-objects/BookingCar';
import { AboutUsPage } from '../page-objects/AboutUsPage';

type Fixtures = {
  loginPage: LoginPage;
  ourCarsPage: OurCarsPage;
  navigationPage: NavigationPage;
  bookingCarPage: BookingCar;
  aboutUsPage: AboutUsPage;
};

const test = baseTest.extend<Fixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
  ourCarsPage: async ({ page }, use) => {
    const ourCarsPage = new OurCarsPage(page);
    await use(ourCarsPage);
  },
  navigationPage: async ({ page }, use) => {
    const navigationPage = new NavigationPage(page);
    await use(navigationPage);
  },
  bookingCarPage: async ({ page }, use) => {
    const bookingCarPage = new BookingCar(page);
    await use(bookingCarPage);
  },
  aboutUsPage: async ({ page }, use) => {
      const aboutUsPage = new AboutUsPage(page);
      await use(aboutUsPage);
  },
});

export { test };
