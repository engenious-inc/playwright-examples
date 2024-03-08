import { expect } from '@playwright/test';
/**
 * Represents a base page object.
 */
export class BasePage {
  /**
   * Creates a new instance of the BasePage class.
   * @param {Page} page - The Playwright page object.
   */
  constructor(page) {
    this.page = page;
  }

  /**
   * Navigates to the specified URL.
   * @param {string} url - The URL to navigate to.
   */
  async navigate(url) {
    await this.page.goto(url);
  }

  /**
   * Verifies that the current URL contains the expected URL(s).
   * @param {string|string[]} expectedUrl - The expected URL(s) to verify.
   */
  async verifyUrlContains(expectedUrl) {
    const urls = Array.isArray(expectedUrl) ? expectedUrl : [expectedUrl];
    for (const url of urls) {
      expect(this.page.url()).toContain(url);
    }
  }
}
