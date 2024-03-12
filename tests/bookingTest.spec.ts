import {test,expect} from '@playwright/test';
import {HomePage} from '../PageObjects/HomePage';

test('Book a hotel in Columbia for the next 5 days', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.navigate('https://www.booking.com');
  await expect(page.url()).toContain('booking.com');
  await homePage.dismissSignInPopup();
  await homePage.enterDestination('Columbia');
  await homePage.setDates(1,5);
  await homePage.submitSearch();
  await homePage.verifyUrlContains(['searchresults','Columbia']);
});

/**
 * What NOT to do with Copilot!
 *  1. The Copilot is COPILOT!
 *  So don’t ask to do all the stuff on its own!
 *  as it does not always produce correct, optimal secure code
 * 
 * 2. Use comments instead of inline chat
 * 
 * 3. Not reusing prompts
 */

/**
 * Copilot for pros:
 * ADD class for flights page'
 * 
 * Homework! 
 * Create a class for the 'stays page'
 * Create a test case to verify that elements are visible on the 'flight page'
 * Create a test case to verify search buttons on the 'flights page'
*/