import { Page, Locator } from '@playwright/test';
import { BaseElement } from './BaseElement';

export class InputElement extends BaseElement {
  constructor(page: Page, selector: string) {
    const locator: Locator = page.locator(selector);
    super(locator);
  }

  async enterText(text: string): Promise<void> {
    await this.locator.fill(text);
  }

  async getValue(): Promise<string> {
    return await this.locator.inputValue();
  }
}
