import { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { ButtonElement } from './components/ButtonElement';
import { DropDownElement } from './components/DropDownElement';
import { TextElement } from './components/TextElement';

export class NavigationPage extends BasePage {
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
    return await this.page.locator(`text=${carName}`).isVisible();
  }

  async getCarDetailsText(carName: string): Promise<string> {
    const text = await this.page.locator(`text=${carName}`).textContent();
    return text ?? '';
  }

  async getCarPriceText(carName: string, price: string): Promise<string> {
    const text = await this.page
      .locator(`text=${carName} ${price}`)
      .textContent();
    return text ?? '';
  }

  async bookCar(carName: string): Promise<void> {
    await this.page
      .locator(`text=${carName} >> button:has-text("Book Now")`)
      .click();
  }

  async isBookingPopupVisible(): Promise<boolean> {
    return await this.bookingPopup.isVisible();
  }

  async isCarSelectDropdownVisible(): Promise<boolean> {
    return await this.carSelectDropdown.isVisible();
  }

  async isCarInBookingDetails(carName: string): Promise<boolean> {
    return await this.page.locator(`text=${carName}`).isVisible();
  }

  async isBookingDateVisible(date: string): Promise<boolean> {
    return await this.page.locator(`text=${date}`).isVisible();
  }

  async goToBookingDetails(bookingId: number): Promise<void> {
    await this.page.goto(`/booking-details/${bookingId}`);
  }

  async goToUserProfile(): Promise<void> {
    await this.page.goto('/user-profile');
  }

  async goToBookingList(): Promise<void> {
    await this.page.goto('/booking-list');
  }
}
