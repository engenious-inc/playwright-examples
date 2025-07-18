import { expect } from '@playwright/test';
// import { carData } from '../data/carData';
import { test } from '../fixtures/global';

test.describe('Car Booking Negative Tests', () => {
  test('should not allow booking without selecting dates', async ({
    bookingCarPage,
  }) => {
    await bookingCarPage.openBookingPage();
    await bookingCarPage.confirmBooking();
    const errorText = await bookingCarPage.page.textContent('.error-message');
    expect(errorText).toContain('Please select booking dates');
  });

  test('should not allow booking for an unavailable car model', async ({
    bookingCarPage,
  }) => {
    await bookingCarPage.openBookingPage();
    await bookingCarPage.selectUnavailableCarModel('NonExistentModel');
    await bookingCarPage.confirmBooking();
    const errorText = await bookingCarPage.page.textContent('.error-message');
    expect(errorText).toContain('Car model not available');
  });

  test('should not allow booking with invalid payment details', async ({
    bookingCarPage,
  }) => {
    await bookingCarPage.openBookingPage();
    await bookingCarPage.selectBookingDatesOnPage();
    await bookingCarPage.enterInvalidPaymentDetails();
    await bookingCarPage.confirmBooking();
    const errorText = await bookingCarPage.page.textContent('.error-message');
    expect(errorText).toContain('Invalid payment details');
  });
});
