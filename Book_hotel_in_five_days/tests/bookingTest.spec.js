const { test } = require('@playwright/test');
const MainPage = require('../PageObjects/MainPage');

test('Book a hotel in Columbia for the next 5 days', async ({ page }) => {
  const mainPage = new MainPage(page);

  await mainPage.navigate('https://www.booking.com');
  await mainPage.dismissSignInPopup();
  await mainPage.enterDestination('Columbia');
  await mainPage.setDates();
  await mainPage.submitSearch();
});
