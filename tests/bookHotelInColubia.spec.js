const { test, expect } = require('@playwright/test');

const dayjs = require('dayjs');

test('Search for a hotel in Columbia for the next 5 days', async ({ page }) => {  
  await page.goto('https://www.booking.com');
  
  // close the pop up
  let crossPopUpToSigIn = page.locator(`[aria-label="Dismiss sign-in info."]`)
  await expect(crossPopUpToSigIn).toBeVisible({timeout:20000})
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
  
  await page.click('button[type="submit"]',{force:true})
});

// All tests are for booking.com

// Test case 1 : Verify that pop-up appears on first visit
// Step 1: Open the browser and navigate to the booking.com 
// Expected Result: Pop-up is displayed

// Test case 2 : Verify that the "Sign in" pop-up is closed after clicking on the "X" button
// Step 1: Open the browser and navigate to the booking.com
// Step 2: Click on the "X" button
// Expected Result: Pop-up is closed

// Test case 2 : Verify that empty search results cause error message
// Step 1: Open the browser and navigate to the booking.com and Close the pop-up
// Step 2: Click on the search button
// Expected Result: Error message is displayed

// Test case 3 : Verify that calendar is displayed
// Step 1: Open the browser and navigate to the booking.com and Close the pop-up
// Step 2: Click on the "Check-out" input field
// Expected Result: The calendar is displayed

// Test case 4 : Verify that the calendar is closed after clicking outside the calendar
// Step 1: Open the browser and navigate to the booking.com and Close the pop-up
// Step 2: Click on the "Check-out" input field
// Step 3: Click outside the calendar
// Expected Result: The calendar is closed

// Test case 5 : Verify that you are redirected to the Sign-in page after clicking on the "Sign in" button
// Step 1: Open the browser and navigate to the booking.com and Close the pop-up
// Step 2: Click on the "Sign in" button
// Expected Result: The Sign-in page is displayed


function getFormattedDates() {
  const tomorrow = dayjs().add(1, 'day');
  const inFiveDays = dayjs().add(6, 'day');

  const formattedTomorrow = tomorrow.format('YYYY-MM-DD');
  const formattedInFiveDays = inFiveDays.format('YYYY-MM-DD');

  return [`[data-date="${formattedTomorrow}"]`, `[data-date="${formattedInFiveDays}"]`];
}
