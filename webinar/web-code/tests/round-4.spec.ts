import { test, expect, devices } from '@playwright/test';

test.describe('Webinar', () => {
    test.beforeEach(async ({ page }) => {
      // Navigate to the "About Us" page before each test
      await page.goto(
        'https://course-user:Cou1dc4F@test.elitefleetgroup.engenious.io/about-us',
      );
    });
  });


// Round 4: Integrating External Tools & Plugins