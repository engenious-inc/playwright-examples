import { Page } from '@playwright/test';

export class LoginPage {
  private page: Page;
  private usernameInput: string;
  private passwordInput: string;
  private loginButton: string;
  private welcomeMessage: string;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = '#username';
    this.passwordInput = '#password';
    this.loginButton = '#login';
    this.welcomeMessage = '.welcome-message';
  }

  async navigate(): Promise<void> {
    await this.page.goto('https://example.com/login');
  }

  async login(username: string, password: string): Promise<void> {
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
  }

  async getWelcomeMessage(): Promise<string | null> {
    return this.page.textContent(this.welcomeMessage);
  }
}
