import { test, expect } from './fixtures';
import { LoginPage } from './pages/LoginPage';
import { ProfilePage } from './pages/ProfilePage';
import { NavBar } from './pages/NavBar';

// Test: Login, check profile, and logout using POM and fixtures

test.use({ browserName: 'chromium' });

test('Login, verify profile, and logout', async ({ loginPage, profilePage, navBar }, testInfo) => {
  test.step('Go to the main page', async () => {
    await loginPage.goto();
  });

  await test.step('Open sign in modal', async () => {
    await loginPage.openSignInModal();
  });

  await test.step('Fill in login credentials and sign in', async () => {
    await loginPage.login('newuser13212s@example.com', 'StrongPassword123!');
  });

  await test.step('Go to the profile page', async () => {
    await profilePage.goto();
  });

  await test.step('Check first and last name', async () => {
    await profilePage.expectFirstName('Jane');
    await profilePage.expectLastName('Doe');
  });

  await test.step('Logout', async () => {
    await navBar.logout();
  });
});
