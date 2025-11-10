import { Page, Locator } from '@playwright/test';
import { BaseElement } from './BaseElement';

export class LinkElement extends BaseElement {
  constructor(page: Page, selector: string) {
    const locator: Locator = page.locator(selector);
    super(locator);
  }

  async click(): Promise<void> {
    await this.locator.click();
  }

  async getText(): Promise<string> {
    const text = await this.locator.textContent();
    return text ?? '';
  }

  async isVisible(): Promise<boolean> {
    return await this.locator.isVisible();
  }

  async isEnabled(): Promise<boolean> {
    return await this.locator.isEnabled();
  }
}
