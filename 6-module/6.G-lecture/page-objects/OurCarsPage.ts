import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { ButtonElement } from './components/ButtonElement';
import { DropDownElement } from './components/DropDownElement';
import { TextElement } from './components/TextElement';

export class OurCarsPage extends BasePage {
  private carButton: TextElement;
  private carDetails: TextElement;
  private carPrice: TextElement;
  private bookNowButton: ButtonElement;
  private bookingPopup: TextElement;
  private carSelectDropdown: DropDownElement;

  constructor(page: Page) {
    super(page);

    this.carButton = new TextElement(page, '.car-button');
    this.carDetails = new TextElement(page, '.car-details');
    this.carPrice = new TextElement(page, '.car-price');
    this.bookNowButton = new ButtonElement(page, '.book-now-button');
    this.bookingPopup = new TextElement(page, '.booking-popup');
    this.carSelectDropdown = new DropDownElement(page, '.car-select-dropdown');
  }

  async navigateToOurCarsPage(): Promise<void> {
    await this.page.goto('/our-cars');
  }

  async isCarButtonVisible(carName: string): Promise<boolean> {
    const carButtonLocator = this.page.locator(
      `.car-button:has-text("${carName}")`,
    );
    return await carButtonLocator.isVisible();
  }

  async getCarDetailsText(carName: string): Promise<Locator> {
    return this.page.locator(`text=${carName}`);
  }

  async getCarPriceText(carName: string, carPrice: string): Promise<Locator> {
    return this.page.locator(`text=${carName} >> text=${carPrice}`);
  }

  async getBookNowButton(carName: string): Promise<Locator> {
    return this.page.locator(`text=${carName} >> button:has-text("Book Now")`);
  }

  async bookCar(carName: string): Promise<void> {
    const bookNowButtonLocator = this.page.locator(
      `.car-item:has-text("${carName}") .book-now-button`,
    );
    await bookNowButtonLocator.click();
  }

  async isBookingPopupVisible(): Promise<boolean> {
    return await this.bookingPopup.isVisible();
  }

  async isCarSelectDropdownVisible(): Promise<boolean> {
    return await this.carSelectDropdown.isVisible();
  }

  async isCarInBookingDetails(carName: string): Promise<boolean> {
    const carInBookingLocator = this.page.locator(
      `.booking-details:has-text("${carName}")`,
    );
    return await carInBookingLocator.isVisible();
  }
  async isBookingDateVisible(date: string): Promise<boolean> {
    const dateLocator = this.page.locator(
      `.booking-details:has-text("${date}")`,
    );
    return await dateLocator.isVisible();
  }
}
