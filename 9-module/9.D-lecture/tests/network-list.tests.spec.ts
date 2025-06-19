import { request } from '@playwright/test';
import { test } from '../fixtures/global'; // Import the custom test with fixtures
import { expect } from '@playwright/test';
import { LoginPage } from '../page-objects/LoginPage';

test('Admin login and fetch vehicles', async ({ request }) => {
  const loginResponse = await request.post(
    'https://test.api.elitefleetgroup.engenious.io/auth/admin/login',
    {
      data: {
        email: 'admin-test@engenious.io',
        password: 'Flck_s5jkd_',
      },
    },
  );

  expect(loginResponse.ok()).toBe(true);
  const { accessToken: token } = await loginResponse.json();
  expect(token).toBeTruthy();

  const vehicleResponse = await request.get(
    'https://test.api.elitefleetgroup.engenious.io/vehicles/admin',
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  expect(vehicleResponse.ok()).toBe(true);
  const responseJson = await vehicleResponse.json();
  const vehicles = responseJson.vehicles;

  expect(Array.isArray(vehicles)).toBe(true);
  expect(vehicles.length).toBeGreaterThan(0);
});

test('Register new user with empty images and verify profile', async ({
  request,
  page,
}) => {
  await page.goto(
    'https://course-user:Cou1dc4F@test.elitefleetgroup.engenious.io/',
  );
  // Step 1: Register user (no auth header needed)
  const formData = {
    //! email should be unique for each test run
    email: 'newuser_emp223images@example.com',
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
});

test('create user and login', async ({ request, page, loginPage }) => {
  // await page.goto(
  //   'https://course-user:Cou1dc4F@test.elitefleetgroup.engenious.io/',
  // );
  // Step 1: Register user (no auth header needed)
  const formData = {
    //! email should be unique for each test run
    email: 'newuser13212s@example.com',
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
  await expect(page.getByRole('main')).toContainText('Jane');
  await expect(page.getByRole('main')).toContainText('Doe');
});

//login
