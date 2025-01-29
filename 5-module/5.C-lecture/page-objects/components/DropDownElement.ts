import { Page, Locator } from '@playwright/test';
import { BaseElement } from './BaseElement';

export class DropDownElement extends BaseElement {
  constructor(page: Page, selector: string) {
    const locator: Locator = page.locator(selector);
    super(locator);
  }

  async selectOption(option: string): Promise<void> {
    await this.locator.selectOption({ label: option });
  }

  async selectDate(dateString: string): Promise<void> {
    const dateLocator = this.locator.locator(
      `.react-datepicker__day--${dateString}`,
    );
    await dateLocator.click();
  }

  async selectBookingDates(
    startDateString: string,
    endDateString: string,
  ): Promise<void> {
    await this.selectDate(startDateString);
    await this.selectDate(endDateString);
  }
}
