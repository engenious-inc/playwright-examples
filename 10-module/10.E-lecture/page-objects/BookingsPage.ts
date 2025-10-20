import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class BookingsPage extends BasePage {
  readonly title: Locator;
  readonly bookingRows: Locator;

  constructor(page: Page) {
    super(page);
    this.title = page.getByRole('heading', { name: 'My Bookings' });
    this.bookingRows = page.locator('[data-testid="booking-row"]');
  }

  async open(): Promise<void> {
    await this.page.goto('/booking/list');
    await expect(this.title).toBeVisible();
  }

  rowByNumber(bookingNumber: string): Locator {
    return this.page.locator('section, div').filter({ hasText: `#${bookingNumber}` });
  }

  viewDetailsButtonInRow(bookingNumber: string): Locator {
    return this.rowByNumber(bookingNumber).getByRole('link', { name: /View Details/i });
  }

  carNameInRow(bookingNumber: string): Locator {
    return this.rowByNumber(bookingNumber).locator('*');
  }

  totalInRow(bookingNumber: string): Locator {
    return this.rowByNumber(bookingNumber).locator('*');
  }

  async expectRowMatches(
    bookingNumber: string,
    expectedCar: string,
    expectedTotal: string,
  ): Promise<void> {
    const row = this.rowByNumber(bookingNumber);
    await expect(row).toBeVisible();
    await expect(row).toContainText(expectedCar);
    await expect(row).toContainText(expectedTotal);
    await expect(this.viewDetailsButtonInRow(bookingNumber)).toBeVisible();
  }

  async expectBookingNumberVisible(bookingNumber: string): Promise<void> {
    const row = this.rowByNumber(bookingNumber);
    await expect(row).toContainText(`#${bookingNumber}`);
  }

  async expectCarNameInRow(bookingNumber: string, carName: string): Promise<void> {
    const row = this.rowByNumber(bookingNumber);
    await expect(row).toContainText(carName);
  }

  async expectTotalInRow(bookingNumber: string, total: string): Promise<void> {
    const row = this.rowByNumber(bookingNumber);
    await expect(row).toContainText(total);
  }

  async clickViewDetails(bookingNumber: string): Promise<void> {
    await this.viewDetailsButtonInRow(bookingNumber).click();
  }

  async expectAtLeastTwoBookings(): Promise<void> {
    await expect(this.bookingRows).toHaveCount({ min: 2 });
  }
}

export class BookingDetailsPage extends BasePage {
  readonly headerNumber: Locator;
  readonly carName: Locator;
  readonly pricePerDay: Locator;
  readonly totalPrice: Locator;
  readonly backLink: Locator;

  constructor(page: Page) {
    super(page);
    this.headerNumber = page.getByText(/^#\d+$/, { exact: false }).first();
    this.carName = page.getByText('BMW M8 Competition Gran Coupe', { exact: true }).first();
    this.pricePerDay = page.getByText('$450/day', { exact: true }).first();
    this.totalPrice = page.getByText('$9,270', { exact: true }).first();
    this.backLink = page.getByRole('link', { name: /Back to all My Bookings/i });
  }

  async open(id: string | number): Promise<void> {
    await this.page.goto(`/booking/details/${id}`);
  }

  async expectBookingNumber(bookingNumber: string): Promise<void> {
    await expect(this.headerNumber).toContainText(`#${bookingNumber}`);
  }

  async expectCarName(carName: string): Promise<void> {
    await expect(this.carName).toContainText(carName);
  }

  async expectPricePerDay(price: string): Promise<void> {
    await expect(this.pricePerDay).toContainText(price);
  }

  async expectTotalPrice(total: string): Promise<void> {
    await expect(this.totalPrice).toContainText(total);
  }

  async goBackToBookings(): Promise<void> {
    await this.backLink.click();
  }
}


