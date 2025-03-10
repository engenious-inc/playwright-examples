import { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { ButtonElement } from './components/ButtonElement';
import { InputElement } from './components/InputElement';
import { TextElement } from './components/TextElement';

export class LoginPage extends BasePage {
  readonly emailInput: InputElement;
  readonly passwordInput: InputElement;
  readonly loginButton: ButtonElement;
  readonly errorMessage: TextElement;

  constructor(page: Page) {
    super(page);
    this.emailInput = new InputElement(page, 'input[name="email"]');
    this.passwordInput = new InputElement(page, 'input[name="password"]');
    this.loginButton = new ButtonElement(page, 'button[type="submit"]');
    this.errorMessage = new TextElement(page, '.error-message');
  }

  async navigateTo(): Promise<void> {
    await this.page.goto('/');
    await this.page.getByRole('button', { name: 'Sign In' }).nth(1).click();
  }

  async login(email: string, password: string): Promise<void> {
    await this.emailInput.enterText(email);
    await this.passwordInput.enterText(password);
    await this.loginButton.click();
  }

  async isErrorMessageVisible(): Promise<boolean> {
    return this.errorMessage.isVisible();
  }

  async isUserProfileVisible(
    email: string,
    username: string,
  ): Promise<boolean> {
    const emailLocator = this.page.locator('.user-profile-email');
    const usernameLocator = this.page.locator('.user-profile-name');

    return (
      (await emailLocator.textContent()) === email &&
      (await usernameLocator.textContent()) === username
    );
  }
}
