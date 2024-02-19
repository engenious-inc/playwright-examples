
const { expect } = require('@playwright/test');
const BasePage = require('./BasePage'); // Updated import path
const dayjs = require('dayjs');

class MainPage extends BasePage {
    constructor(page) {
        super(page);
      }
    
      async dismissSignInPopup() {
        const crossPopUpToSignIn = this.page.locator(`[aria-label="Dismiss sign-in info."]`);
        await expect(crossPopUpToSignIn).toBeVisible({ timeout: 10000 });
        await crossPopUpToSignIn.click();
      }
    
      async enterDestination(destination) {
        await this.page.fill('[aria-label="Where are you going?"]', destination);
      }
    
      async setDates() {
        await this.page.click('[data-testid="searchbox-dates-container"]');
        await expect(this.page.locator('[data-testid="datepicker-tabs"]')).toBeVisible();
        
        const [today, fiveDaysAfter] = this.#getFormattedDates();
        await this.page.locator(today).click();
        await this.page.locator(fiveDaysAfter).click();
      }
    
      async submitSearch() {
        await this.page.click('button[type="submit"]');
      }
    
      #getFormattedDates() {
        const tomorrow = dayjs().add(1, 'day');
        const inFiveDays = dayjs().add(6, 'day');
    
        const formattedTomorrow = tomorrow.format('YYYY-MM-DD');
        const formattedInFiveDays = inFiveDays.format('YYYY-MM-DD');
    
        return [`[data-date="${formattedTomorrow}"]`, `[data-date="${formattedInFiveDays}"]`];
      }
}

module.exports = MainPage;