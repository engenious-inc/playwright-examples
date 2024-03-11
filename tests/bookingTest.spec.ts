import {test,expect} from '@playwright/test';
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


// TODO: Use copilot to refactor code to Type Script - Done! 
// What not to do: 
// 1. Do not use comments if better to use inner chat 
//   a. use ghost text // for code suggestions! 
//   b. use inner chat // to ask copilot to change some code or make code instead of comments
//   c. use chat  - for conversational questions 
// 2. Use chats commands instead of repeating prompts! 


// test case 1 : Validate that search field are visible
test('Validate that search field are visible', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.navigate('https://www.booking.com');
  await homePage.dismissSignInPopup();
  await expect (homePage.destinationInput).toBeVisible();
  await expect (homePage.dateField).toBeVisible();
  await expect (homePage.submitButton).toBeVisible();
}) 

// test case 2 : 'Discover vacation rentals' button should redirect to the correct page
test('Discover vacation rentals button should redirect to the correct page', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.navigate('https://www.booking.com');
  await homePage.dismissSignInPopup();
  await homePage.clickDiscoverVacationRentals();
  await expect(page.getByText('all over the world')).toBeVisible();
})


// HomeWork! 
// test case 3 : Search with empty field should display error message
// test case 4 : Unable to select past dates