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
}
