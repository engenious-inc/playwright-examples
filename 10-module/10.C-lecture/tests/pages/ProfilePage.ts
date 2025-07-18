import { Page, expect } from '@playwright/test';

export class ProfilePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('https://test.elitefleetgroup.engenious.io/profile');
  }

  async expectFirstName(name: string) {
    await expect(this.page.getByRole('heading', { name: 'First name' }).locator('..').locator('p')).toHaveText(name);
  }

  async expectLastName(name: string) {
    await expect(this.page.getByRole('heading', { name: 'Last name' }).locator('..').locator('p')).toHaveText(name);
  }
}
