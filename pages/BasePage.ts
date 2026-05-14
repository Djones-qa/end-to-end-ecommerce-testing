import { Page, Locator } from '@playwright/test';

/**
 * BasePage provides shared helpers used by all page objects.
 */
export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate(path = '') {
    await this.page.goto(path);
  }

  async getTitle(): Promise<string> {
    return this.page.title();
  }

  async waitForURL(urlPattern: string | RegExp) {
    await this.page.waitForURL(urlPattern);
  }

  async isVisible(locator: Locator): Promise<boolean> {
    return locator.isVisible();
  }
}
