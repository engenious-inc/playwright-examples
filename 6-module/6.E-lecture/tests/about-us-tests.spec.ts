import { test } from '../fixtures/global';
import { expect } from '@playwright/test';

test.describe('About Us Page', () => {
 test.beforeEach(async ({ page }) => {
    // Navigate to the "About Us" page before each test
    await page.goto('https://course-user:Cou1dc4F@test.elitefleetgroup.engenious.io/about-us');
  });
  test('Verify "About Us" title is visible', async ({ aboutUsPage }) => {
    const titleVisible = await aboutUsPage.isTitleVisible('About us');
    expect(titleVisible).toBeTruthy();
  });

  test('Verify "Our Mission" section is visible and contains correct text', async ({ aboutUsPage }) => {
    const missionText = await aboutUsPage.getSectionText('Our Mission');
    expect(missionText).toContain(
      'Elite Fleet Group is synonymous with luxury, not just as a statement but as a complete experience.'
    );
  });

  test('Verify "Our Fleet" section is visible and contains correct text', async ({ aboutUsPage }) => {
    const fleetText = await aboutUsPage.getSectionText('Our Fleet');
    expect(fleetText).toContain(
      'Featuring illustrious brands such as Ferrari, Lamborghini, Porsche, and Rolls-Royce'
    );
  });

  test('Verify "Unmatched Quality" section is visible and contains correct text', async ({ aboutUsPage }) => {
    const qualityText = await aboutUsPage.getSectionText('Unmatched Quality');
    expect(qualityText).toContain(
      'Each car undergoes rigorous maintenance and thorough inspection to ensure top-tier performance and flawless condition.'
    );
  });

  test('Verify "Premier Service" section is visible and contains correct text', async ({ aboutUsPage }) => {
    const serviceText = await aboutUsPage.getSectionText('Premier Service');
    expect(serviceText).toContain(
      'Our premier services include personalized consultations to match you with the perfect car for your needs'
    );
  });

  test('Verify "Join the Elite" section is visible and contains correct text', async ({ aboutUsPage }) => {
    const joinText = await aboutUsPage.getSectionText('Join the Elite');
    expect(joinText).toContain(
      'With Elite Fleet Group, you\'re not just renting a luxury car; you\'re indulging in an elite experience'
    );
  });

  test('Verify "Contact Us" section contains phone and email links', async ({ aboutUsPage }) => {
    const phoneLink = await aboutUsPage.getContactLink('phone');
    const emailLink = await aboutUsPage.getContactLink('email');
    expect(phoneLink).toBe('+1 786 297 8226');
    expect(emailLink).toBe('Info@Elitefleetgroup.com');
  });
});