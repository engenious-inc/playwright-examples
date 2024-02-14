const { test, expect } = require('@playwright/test');

const dayjs = require('dayjs');

function getFormattedDates() {
  const tomorrow = dayjs().add(1, 'day');
  const inFiveDays = dayjs().add(6, 'day');

  const formattedTomorrow = tomorrow.format('YYYY-MM-DD');
  const formattedInFiveDays = inFiveDays.format('YYYY-MM-DD');

  return [`[data-date="${formattedTomorrow}"]`, `[data-date="${formattedInFiveDays}"]`];
}

test('Book a hotel in Columbia for the next 5 days', async ({ page }) => {
  await page.goto('https://www.booking.com');

  // close the pop up
  let crossPopUpToSigIn = page.locator(`[aria-label="Dismiss sign-in info."]`)
  await expect(crossPopUpToSigIn).toBeVisible({timeout:10000})
  await crossPopUpToSigIn.click()
  // Enter the destination
  await page.fill('[aria-label="Where are you going?"]', 'Columbia');

  // Open calendar widget and set dates"
  await page.click('[data-testid="searchbox-dates-container"]')
  
  // verify that calendar appear 
  await expect( page.locator('[data-testid="datepicker-tabs"]')).toBeVisible()
  
  let [today,fiveDaysAfter] = getFormattedDates()
  await page.locator(today).click();
  await page.locator(fiveDaysAfter).click();
  
  await page.click('button[type="submit"]');
});
