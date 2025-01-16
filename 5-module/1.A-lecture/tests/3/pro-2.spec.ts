/* eslint-disable playwright/no-wait-for-selector */
import { Page } from '@playwright/test';
export class ExamplePage {
  private page: Page;
  private submitButton: string;
  private successMessage: string;

  constructor(page: Page) {
    this.page = page;
    this.submitButton = '#submit';
    this.successMessage = '.success-message';
  }

  async navigate(): Promise<void> {
    await this.page.goto('https://example.com');
  }

  async waitForSubmitButton(): Promise<void> {
    await this.page.waitForSelector(this.submitButton, { state: 'visible' });
  }

  async clickSubmitButton(): Promise<void> {
    await this.waitForSubmitButton();
    await this.page.click(this.submitButton);
  }

  async getSuccessMessage(): Promise<string | null> {
    await this.page.waitForSelector(this.successMessage, { state: 'attached' });
    return this.page.textContent(this.successMessage);
  }

  async mockNetworkRequest(
    url: string,
    response: Record<string, any>,
  ): Promise<void> {
    await this.page.route(url, (route) => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(response),
      });
    });
  }

  async waitForNetworkEvent(url: string): Promise<void> {
    await this.page.waitForResponse(
      (response) => response.url() === url && response.status() === 200,
    );
  }
}
