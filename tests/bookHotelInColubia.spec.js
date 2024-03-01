const { test, expect } = require('@playwright/test');
import { auto } from "auto-playwright";

const options = {
  // If true, debugging information is printed in the console.
  debug: true,
  // The OpenAI model (https://platform.openai.com/docs/models/overview)
  model: "gpt-4-1106-preview",
  // The OpenAI API key
  openaiApiKey: 'sk-...', // Put Your API token in here
};

// The test that we copied from ZeroStep page
test('search and verify the first organic search result', async ({ page }) => {
  const searchTerm = 'software testing'
  const aiArgs = { page, test }
  await page.goto('https://www.google.com')
  await auto(`Search for '${searchTerm}'`,aiArgs,options)
  await auto('Hit enter',aiArgs,options)
  await auto(`Click on the button with text "Search"`, aiArgs,options)
  await page.waitForURL('https://www.google.com/search**')

  const title = await auto(`What is the title of the first organic search result?`,aiArgs,options)

  console.log('First organic search result is: ', title)
})

// The test that refactored using auto-playwright from our previous video "Will chatGBT replace Auto tester"
test('Search for a hotel in Columbia for the next 5 days', async ({ page }) => {
  await page.goto('https://www.booking.com');
  const aiArgs ={ page, test }

  let crossPopUpToSigIn = page.locator(`[aria-label="Dismiss sign-in info."]`)
  await expect(crossPopUpToSigIn).toBeVisible({timeout:20000})
  await crossPopUpToSigIn.click()

  await auto(`Click on the button with text "Search"`, aiArgs,options)
  await auto(`check the box with the text "I’m looking for flights"`, aiArgs,options)
});
