import { expect } from '@playwright/test';
import { test } from '../fixtures/global';
import { BookingDetailsPage } from '../page-objects/BookingsPage';

const EMAIL = 'podam96524@maonyn.com';
const PASSWORD = 'TestEng123!';

test.describe('EFG-BKG-001 Authenticated user can view their bookings list', () => {
  test.beforeEach(async ({ loginPage, page }) => {
    await page.context().clearCookies();
    await page.goto('/');
    await expect(page.getByRole('button', { name: 'Sign In' }).first()).toBeVisible();
    await loginPage.navigateTo();
    await loginPage.login(EMAIL, PASSWORD);
  });

  test('View booking #307 car name and total', async ({ page, navigationPage }) => {
    await navigationPage.goToBookingList();
    const row307 = page.getByRole('listitem').filter({ hasText: '#307' }).first();
    await expect(row307).toContainText('BMW M8 Competition Gran Coupe');
  });

  test('View booking #307 total amount', async ({ page, navigationPage }) => {
    await navigationPage.goToBookingList();
    const row307 = page.getByRole('listitem').filter({ hasText: '#307' }).first();
    await expect(row307).toContainText('$9,270/20 days');
  });

  test('View booking #306 car name and total', async ({ page, navigationPage }) => {
    await navigationPage.goToBookingList();
    const row306 = page.getByRole('listitem').filter({ hasText: '#306' }).first();
    await expect(row306).toContainText('BMW M8 Competition Gran Coupe');
  });

  test('View booking #306 total amount', async ({ page, navigationPage }) => {
    await navigationPage.goToBookingList();
    const row306 = page.getByRole('listitem').filter({ hasText: '#306' }).first();
    await expect(row306).toContainText('$2,781/6 days');
  });

  test('View booking #307 details header', async ({ page, navigationPage }) => {
    await navigationPage.goToBookingList();
    const row307 = page.getByRole('listitem').filter({ hasText: '#307' }).first();
    await row307.getByRole('link', { name: /View Details|Details|View/i }).first().click();
    const bookingDetailsPage = new BookingDetailsPage(page);
    await expect(bookingDetailsPage.headerNumber).toContainText('#307');
  });

  test('View booking #307 details car name', async ({ page, navigationPage }) => {
    await navigationPage.goToBookingList();
    const row307 = page.getByRole('listitem').filter({ hasText: '#307' }).first();
    await row307.getByRole('link', { name: /View Details|Details|View/i }).first().click();
    const bookingDetailsPage = new BookingDetailsPage(page);
    await expect(bookingDetailsPage.carName).toContainText('BMW M8 Competition Gran Coupe');
  });

  test('View booking #307 details price per day', async ({ page, navigationPage }) => {
    await navigationPage.goToBookingList();
    const row307 = page.getByRole('listitem').filter({ hasText: '#307' }).first();
    await row307.getByRole('link', { name: /View Details|Details|View/i }).first().click();
    const bookingDetailsPage = new BookingDetailsPage(page);
    await expect(bookingDetailsPage.pricePerDay).toContainText('$450/day');
  });

  test('View booking #307 details total price', async ({ page, navigationPage }) => {
    await navigationPage.goToBookingList();
    const row307 = page.getByRole('listitem').filter({ hasText: '#307' }).first();
    await row307.getByRole('link', { name: /View Details|Details|View/i }).first().click();
    const bookingDetailsPage = new BookingDetailsPage(page);
    await expect(bookingDetailsPage.totalPrice).toContainText('$9,270');
  });
});


