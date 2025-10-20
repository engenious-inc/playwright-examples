import { expect } from '@playwright/test';
import { test } from '../fixtures/global';

const EMAIL = 'podam96524@maonyn.com';
const PASSWORD = 'TestEng123!';

test.describe('EFG-BKG-001: Authenticated user can view their bookings list', () => {
  test('View user bookings after login', async ({ page, loginPage, navigationPage }) => {
    // Preconditions: fresh context is default per test; baseURL contains HTTP auth

    // 1) Open base URL with HTTP auth and see Sign In button
    await page.goto('/');
    await expect(page.getByRole('button', { name: 'Sign In' })).toBeVisible();

    // 2) Open sign-in form
    await page.getByRole('button', { name: 'Sign In' }).nth(1).click();
    await expect(page.getByRole('heading', { name: /sign in/i })).toBeVisible();

    // 3) Authenticate
    await loginPage.login(EMAIL, PASSWORD);

    // Expect header shows Account indicator
    await expect(page.getByRole('button', { name: /account/i })).toBeVisible();
    await page.screenshot({ path: 'screenshots/efg-bkg-001_header_signed_in.png', fullPage: true });

    // 4) Navigate to bookings list
    await navigationPage.goToBookingList();
    await expect(page.getByRole('heading', { name: /my bookings/i })).toBeVisible();

    // Wait for list to populate (handle skeleton/loader if any)
    const list = page.locator('[data-testid="booking-list"], .booking-list, .bookings');
    await expect(list).toBeVisible();

    // 5) Verify booking cards are present (at least two with View Details)
    const rows = page.locator('[data-testid="booking-row"], .booking-row, .booking-item');
    await expect(rows).toHaveCount((c) => c >= 2);
    await expect(rows.nth(0).getByRole('link', { name: /view details/i }).or(rows.nth(0).getByRole('button', { name: /view details/i }))).toBeVisible();
    await expect(rows.nth(1).getByRole('link', { name: /view details/i }).or(rows.nth(1).getByRole('button', { name: /view details/i }))).toBeVisible();

    // 6) Validate booking #307 (first row)
    const firstRow = rows.nth(0);
    await expect(firstRow).toContainText('#307');
    await expect(firstRow).toContainText('BMW M8 Competition Gran Coupe');
    await expect(firstRow).toContainText('$9,270/20 days');

    // 7) Validate booking #306 (second row)
    const secondRow = rows.nth(1);
    await expect(secondRow).toContainText('#306');
    await expect(secondRow).toContainText('BMW M8 Competition Gran Coupe');
    await expect(secondRow).toContainText('$2,781/6 days');

    await page.screenshot({ path: 'screenshots/efg-bkg-001_list.png', fullPage: true });

    // 8) Open details for #307 and verify
    await firstRow.getByRole('link', { name: /view details/i }).or(firstRow.getByRole('button', { name: /view details/i })).click();

    // Details page assertions
    await expect(page.getByRole('heading', { name: /#?307/ })).toBeVisible();
    await expect(page.locator('text=BMW M8 Competition Gran Coupe')).toBeVisible();
    await expect(page.locator('text=$450/day')).toBeVisible();
    await expect(page.locator('text=$9,270')).toBeVisible();

    await page.screenshot({ path: 'screenshots/efg-bkg-001_details_307.png', fullPage: true });

    // Optional: navigate back to list
    const backLink = page.getByRole('link', { name: /back to all my bookings/i });
    if (await backLink.isVisible()) {
      await backLink.click();
      await expect(page.getByRole('heading', { name: /my bookings/i })).toBeVisible();
    }
  });
});


