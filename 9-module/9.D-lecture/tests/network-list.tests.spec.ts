import { test } from '../fixtures/global';
import { expect } from '@playwright/test';

test('create user and login', async ({ request, page, loginPage }) => {
  // await page.goto(
  //   'https://course-user:Cou1dc4F@test.elitefleetgroup.engenious.io/',
  // );
  // Step 1: Register user (no auth header needed)
  const formData = {
    //! email should be unique for each test run
    email: 'testui2@example.com',
    firstName: 'Jane',
    lastName: 'Doe',
    phoneNumber: '+1234567890',
    password: 'StrongPassword123!',
    driverLicenseImage1: '',
    driverLicenseImage2: '',
    insuranceDeclarationPageImage: '',
    insuranceCardImage: '',
  };

  const registerResponse = await request.post(
    'https://test.api.elitefleetgroup.engenious.io/auth/register',
    {
      multipart: formData,
    },
  );

  console.log('Register user response status:', registerResponse.status());
  expect(registerResponse.status()).toBe(201);

  const registerBody = await registerResponse.json();
  expect(registerBody).toHaveProperty('accessToken');
  const userToken = registerBody.accessToken;

  // Step 2: Fetch profile as the new user
  const profileResponse = await request.get(
    'https://test.api.elitefleetgroup.engenious.io/users/profile/customer',
    {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    },
  );

  expect(profileResponse.ok()).toBe(true);
  const profile = await profileResponse.json();

  console.log('New user profile:', profile);
  expect(profile.users.email).toBe(formData.email);
  expect(profile.users.firstName).toBe(formData.firstName);
  expect(profile.users.lastName).toBe(formData.lastName);

  //login created user
  await loginPage.navigateTo();
  await loginPage.login(profile.users.email, formData.password);
  await page.goto('/profile');
  const mainSection = page.getByRole('main').first();
  await expect(mainSection).toContainText('Jane');
  await expect(mainSection).toContainText('Doe');
});

//login
