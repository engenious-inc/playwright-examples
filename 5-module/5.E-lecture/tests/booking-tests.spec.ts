import { expect } from '@playwright/test';
import { carData } from '../data/carData';
import { test } from '../fixtures/global';

//  { model: 'Sedan', price: 100, carType: 'Economy' },
//   { model: 'SUV', price: 150, carType: 'Luxury' },
//   { model: 'Convertible', price: 200, carType: 'Premium' },
//   { model: 'Truck', price: 180, carType: 'Heavy Duty' },

test.describe('Car Booking Tests', () => {
  for (const { model, price } of carData) {
    test(`should book a ${model} model with price $${price}`, async ({
      bookingCarPage,
    }) => {
      await bookingCarPage.openBookingPage();
      await bookingCarPage.selectBookingDatesOnPage();
      await bookingCarPage.confirmBooking();
      const confirmationText = await bookingCarPage.page.textContent(
        '.booking-confirmation',
      );
      expect(confirmationText).toContain(model);
      expect(confirmationText).toContain(price);
    });
  }
});
