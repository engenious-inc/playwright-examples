import { Locator } from '@playwright/test';

export class BaseElement {
  protected locator: Locator;

  constructor(locator: Locator) {
    this.locator = locator;
  }

  async getText(): Promise<string> {
    const text = await this.locator.textContent();
    return text ?? '';
  }

  async click(): Promise<void> {
    await this.locator.click();
  }

  async isVisible(): Promise<boolean> {
    return await this.locator.isVisible();
  }

  async getValue(): Promise<string> {
    return await this.locator.inputValue();
  }
}
