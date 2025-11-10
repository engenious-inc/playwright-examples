import { Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class OurCarsPage extends BasePage {
  async navigateToOurCarsPage(): Promise<void> {
    //https://course-user:Cou1dc4F@test.elitefleetgroup.engenious.io/
    await this.navigateTo('/our-cars');
  }

  async getCarButton(carName: string): Promise<Locator> {
    return this.page.locator(`button:has-text("${carName}")`);
  }

  getCarDetailsText(carName: string): Locator {
    return this.page.getByText(carName);
  }

  getCarPriceText(carName: string, price: string): Locator {
    return this.page.getByText(`${carName}${price}Book Now`);
  }

  getBookNowButton(): Locator {
    return this.page.getByText('Book Now').nth(2);
  }

  async isCarButtonVisible(carName: string): Promise<boolean> {
    return (await this.getCarButton(carName)).isVisible();
  }
}
