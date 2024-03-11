import {test} from '@playwright/test';
import {HomePage} from '../PageObjects/HomePage';

test('Book a hotel in Columbia for the next 5 days', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.navigate('https://www.booking.com');
  await homePage.dismissSignInPopup();
  await homePage.enterDestination('Columbia');
  await homePage.setDates(1,5);
  await homePage.submitSearch();
  await homePage.verifyUrlContains(['searchresults','Columbia']);
});

// test case 1 : Validate search field
// test case 2 : 'Discover vacation rentals' button should redirect to the correct page
// test case 3 : Search with empty field should display error message
// test case 4 : Unable to select past dates