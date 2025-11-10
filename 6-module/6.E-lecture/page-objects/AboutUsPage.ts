import { Page } from '@playwright/test';

export class AboutUsPage {
  constructor(private page: Page) {}

  async isTitleVisible(title: string): Promise<boolean> {
    return this.page.locator(`h1:has-text("${title}")`).isVisible();
  }

  async getSectionText(sectionTitle: string): Promise<string> {
    const section = this.page.locator(`h2:has-text("${sectionTitle}")`).locator('..').locator('p');
    const text = await section.textContent();
    if (!text) {
      throw new Error(`Text content for section "${sectionTitle}" is null or undefined.`);
    }
    return text.trim();
  }

  async getContactLink(type: 'phone' | 'email'): Promise<string> {
  let locator;
  if (type === 'phone') {
    // Refine the locator to target the first phone link
    locator = this.page.locator('a[href^="tel:"]').first();
  } else if (type === 'email') {
    // Refine the locator to target the first email link
    locator = this.page.locator('a[href^="mailto:"]').first();
  } else {
    throw new Error('Invalid contact type');
  }

  const text = await locator.textContent();
  if (!text) {
    throw new Error(`Contact link for type "${type}" is null or undefined.`);
  }
  return text.trim();
}
}