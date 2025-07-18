import { Page, Locator } from '@playwright/test';
import { BaseElement } from './BaseElement';

export class TextElement extends BaseElement {
  constructor(page: Page, selector: string) {
    const locator: Locator = page.locator(selector); // Create Locator from selector
    super(locator);
  }

  async getText(): Promise<string> {
    return super.getText();
  }
}
