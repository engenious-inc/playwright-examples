const { test, expect } = require('@playwright/test');
import { ai } from '@zerostep/playwright'

// The ZeroStep code from their page
test('search and verify the first organic search result', async ({ page }) => {
  const searchTerm = 'software testing'
  await page.goto('https://www.google.com')
  await ai(`Search for '${searchTerm}'`, { page, test })
  await ai('Hit enter', { page, test })

  await page.waitForURL('https://www.google.com/search**')

  const title = await ai(`What is the title of the first organic search result?`, { page, test })

  console.log('First organic search result is: ', title)
})
// Refactored code from the 'Booking.com_chats_version' refactored to use ZeroStep library
test('Search for a hotel in Columbia for the next 5 days', async ({ page }) => {
  const aiArgs = { page, test }
  await page.goto('https://www.booking.com');
  await ai(`Wait for pop-up with text "Sign in to save 10% or more with a free Booking.com membership" to appear at the page `, aiArgs)
  await ai(`"Please close the pop-up window."`, aiArgs)
  await ai(`"Enter 'Columbia' into the 'Where I am going' field." `, aiArgs)
  await ai(`Click on the field with text "Check-in Date"`, aiArgs)
  await ai(`Wait for calendar to appear`, aiArgs)  
});
