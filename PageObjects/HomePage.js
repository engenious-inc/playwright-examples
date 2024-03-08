
const { expect } = require('@playwright/test');
const {BasePage} = require('./BasePage');
const dayjs = require('dayjs');

/**
 * Represents the home page of the application.
 */
export class HomePage extends BasePage {
  /**
   * Constructs a new instance of the HomePage class.
   * @param {Page} page - The Playwright page object.
   */
  constructor(page) {
    super(page);
    this.crossPopUpToSignIn = page.getByLabel('Dismiss sign-in info.');
    this.destinationInput = page.locator('[aria-label="Where are you going?"]');
    this.dateField = page.locator('[data-testid="searchbox-dates-container"]');
    this.calendar = page.getByTestId('searchbox-datepicker-calendar');
    this.submitButton = page.locator('button[type="submit"]');
  }

  /**
   * Dismisses the sign-in popup.
   */
  async dismissSignInPopup() {
    await expect(this.crossPopUpToSignIn).toBeVisible({ timeout: 20000 });
    await this.crossPopUpToSignIn.click();
  }

  /**
   * Enters the destination in the input field.
   * @param {string} destination - The destination to enter.
   */
  async enterDestination(destination) {
    await this.destinationInput.fill(destination);
  }

  /**
   * Sets the check-in and check-out dates.
   * @param {number} checkIn - The number of days to add to the check-in date.
   * @param {number} checkOut - The number of days to add to the check-out date.
   */
  async setDates(checkIn, checkOut) {
    await this.dateField.click();
    await expect(this.calendar).toBeVisible();

    const [today, fiveDaysAfter] = this.#getFormattedDates(checkIn, checkOut);
    console.log(checkIn, checkOut, today, fiveDaysAfter);
    await this.page.locator(today).click();
    await this.page.locator(fiveDaysAfter).click();
  }

  /**
   * Submits the search form.
   */
  async submitSearch() {
    await this.submitButton.click();
  }

  /**
   * Gets the formatted check-in and check-out dates.
   * @param {number} checkInDaysToAdd - The number of days to add to the check-in date.
   * @param {number} checkOutDaysToAdd - The number of days to add to the check-out date.
   * @param {string} [format='YYYY-MM-DD'] - The date format.
   * @returns {Array} An array containing the formatted check-in and check-out dates.
   * @private
   */
  #getFormattedDates(checkInDaysToAdd, checkOutDaysToAdd, format = 'YYYY-MM-DD') {
    const formattedCheckIn = dayjs().add(checkInDaysToAdd, 'day').format(format);
    const formattedCheckOut = dayjs().add(checkOutDaysToAdd, 'day').format(format);
    return [`[data-date="${formattedCheckIn}"]`, `[data-date="${formattedCheckOut}"]`];
  }
}
