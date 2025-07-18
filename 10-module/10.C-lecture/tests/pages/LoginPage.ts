import { Page, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('https://course-user:Cou1dc4F@test.elitefleetgroup.engenious.io/');
  }

  async openSignInModal() {
    const signInButtons = this.page.getByRole('button', { name: 'Sign In' });
    await expect(signInButtons.nth(1)).toBeVisible();
    await signInButtons.nth(1).click();
  }

  async login(email: string, password: string) {
    await this.page.getByRole('textbox', { name: 'Email' }).fill(email);
    await this.page.getByRole('textbox', { name: 'Password' }).fill(password);
    await this.page.getByRole('button', { name: 'Sign in' }).click();
    await expect(this.page.getByRole('button', { name: 'Account' })).toBeVisible();
  }
}
