import { Page } from '@playwright/test';

export abstract class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateTo(path: string): Promise<void> {
    await this.page.goto(path);
  }

  async clickOnElement(locator: string): Promise<void> {
    await this.page.click(locator);
  }

  async getElementText(locator: string): Promise<string> {
    return (await this.page.textContent(locator)) || '';
  }

  async fillInput(selector: string, value: string): Promise<void> {
    await this.page.fill(selector, value);
  }
}
