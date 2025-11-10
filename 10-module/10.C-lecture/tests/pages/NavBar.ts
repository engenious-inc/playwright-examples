import { Page, expect } from '@playwright/test';

export class NavBar {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async logout() {
    await this.page.getByRole('button', { name: 'Account' }).click();
    await this.page.getByRole('button', { name: 'Logout' }).click();
    await expect(this.page.getByRole('button', { name: 'Sign In' })).toBeVisible();
  }
}
