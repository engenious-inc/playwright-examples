import { Page } from 'playwright';
import { ButtonElement } from './components/ButtonElement';
import { DropDownElement } from './components/DropDownElement';
import { InputElement } from './components/InputElement'; // New reusable component for input fields
import { selectBookingDates } from '../utils/date-picker';

export class BookingCar {
  page: Page;
  readonly startDatePicker: DropDownElement;
  readonly endDatePicker: DropDownElement;
  readonly bookNowButton: ButtonElement;
  readonly confirmBookingButton: ButtonElement;
  readonly carModelDropdown: DropDownElement; // Added dropdown for car model
  readonly cardNumberInput: InputElement; // Added input for card number
  readonly expiryDateInput: InputElement; // Added input for expiry date
  readonly cvvInput: InputElement; // Added input for CVV

  constructor(page: Page) {
    this.page = page;

    this.startDatePicker = new DropDownElement(page, '.react-datepicker__day');
    this.endDatePicker = new DropDownElement(page, '.react-datepicker__day');
    this.bookNowButton = new ButtonElement(page, '.book-now-button');
    this.confirmBookingButton = new ButtonElement(page, '.confirm-booking-button');
    this.carModelDropdown = new DropDownElement(page, '.car-model-dropdown');
    this.cardNumberInput = new InputElement(page, '#card-number');
    this.expiryDateInput = new InputElement(page, '#expiry-date');
    this.cvvInput = new InputElement(page, '#cvv');
  }

  async openBookingPage(): Promise<void> {
    await this.page.goto('/cars');
    await this.bookNowButton.click();
  }

  async selectBookingDatesOnPage(): Promise<void> {
    const { startDateString, endDateString } = selectBookingDates();
    await this.startDatePicker.selectDate(startDateString);
    await this.endDatePicker.selectDate(endDateString);
  }

  async confirmBooking(): Promise<void> {
    await this.confirmBookingButton.click();
  }

  async selectUnavailableCarModel(modelName: string): Promise<void> {
    await this.carModelDropdown.selectOption(modelName);
  }

  async enterInvalidPaymentDetails(): Promise<void> {
    await this.cardNumberInput.fill('1234'); // Invalid card number
    await this.expiryDateInput.fill('01/20'); // Expired date
    await this.cvvInput.fill('12'); // Invalid CVV
  }
}
