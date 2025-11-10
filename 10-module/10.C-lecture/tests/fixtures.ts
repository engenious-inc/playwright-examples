import { test as base } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';
import { ProfilePage } from './pages/ProfilePage';
import { NavBar } from './pages/NavBar';

// Extend base test with our fixtures
export const test = base.extend<{
  loginPage: LoginPage;
  profilePage: ProfilePage;
  navBar: NavBar;
}>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  profilePage: async ({ page }, use) => {
    await use(new ProfilePage(page));
  },
  navBar: async ({ page }, use) => {
    await use(new NavBar(page));
  },
});

export { expect } from '@playwright/test';
