const { chromium } = require('playwright');

(async () => {
  // Launch the browser
  const browser = await chromium.launch({ headless: false }); // Set headless: false to see the browser
  const page = await browser.newPage();

  // Navigate to Booking.com
  await page.goto('https://www.booking.com');

  // Accept cookies if the popup appears
  const cookiesButton = await page.$("text='Accept'");
  if (cookiesButton) {
    await cookiesButton.click();
  }

  // Enter the destination
  await page.fill('input[type="search"]', 'Columbia');

  // Select the check-in and check-out dates
  const today = new Date();
  const checkInDate = new Date();
  checkInDate.setDate(today.getDate() + 1); // Tomorrow
  const checkOutDate = new Date();
  checkOutDate.setDate(today.getDate() + 6); // 5 days from today

  // Open calendar widget and set dates
  await page.click('div[data-mode="checkin"]');
  await page.click(`[data-date="${checkInDate.toISOString().split('T')[0]}"]`);
  await page.click(`[data-date="${checkOutDate.toISOString().split('T')[0]}"]`);

  // Search for hotels
  await page.click('button[type="submit"]');

  // Wait for the search results to load
  await page.waitForSelector('.sr_property_block', { state: 'attached' });

  // Click on the first hotel
  await page.click('.sr_property_block:first-child .hotel_name_link');

  // Wait for the new tab to open
  const [newPage] = await Promise.all([
    browser.waitForEvent('page'),
    page.waitForNavigation({ waitUntil: 'networkidle' }), // Ensure the new page has loaded
  ]);

  // You might need to handle the booking process here depending on the site's workflow
  // This example will just close the browser
  await browser.close();
})();
