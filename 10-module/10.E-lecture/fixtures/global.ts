import { test as baseTest } from '@playwright/test';
import { LoginPage } from '../page-objects/LoginPage';
import { OurCarsPage } from '../page-objects/OurCarsPage';
import { NavigationPage } from '../page-objects/NavigationPage';
import { BookingCar } from '../page-objects/BookingCar';
import { AboutUsPage } from '../page-objects/AboutUsPage';
import { BookingsPage, BookingDetailsPage } from '../page-objects/BookingsPage';

type Fixtures = {
  loginPage: LoginPage;
  ourCarsPage: OurCarsPage;
  navigationPage: NavigationPage;
  bookingCarPage: BookingCar;
  aboutUsPage: AboutUsPage;
  bookingsPage: BookingsPage;
  bookingDetailsPage: BookingDetailsPage;
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
  bookingsPage: async ({ page }, use) => {
    const bookingsPage = new BookingsPage(page);
    await use(bookingsPage);
  },
  bookingDetailsPage: async ({ page }, use) => {
    const bookingDetailsPage = new BookingDetailsPage(page);
    await use(bookingDetailsPage);
  },
});

export { test };
