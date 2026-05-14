import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export interface CheckoutInfo {
  firstName: string;
  lastName: string;
  postalCode: string;
}

export class CheckoutPage extends BasePage {
  // Step 1 — Information
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly cancelButton: Locator;
  readonly errorMessage: Locator;

  // Step 2 — Overview
  readonly summaryItems: Locator;
  readonly subtotalLabel: Locator;
  readonly taxLabel: Locator;
  readonly totalLabel: Locator;
  readonly finishButton: Locator;

  constructor(page: Page) {
    super(page);
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.cancelButton = page.locator('[data-test="cancel"]');
    this.errorMessage = page.locator('[data-test="error"]');
    this.summaryItems = page.locator('.cart_item');
    this.subtotalLabel = page.locator('.summary_subtotal_label');
    this.taxLabel = page.locator('.summary_tax_label');
    this.totalLabel = page.locator('.summary_total_label');
    this.finishButton = page.locator('[data-test="finish"]');
  }

  async expectCheckoutStepOneVisible() {
    await expect(this.page.locator('.title')).toHaveText('Checkout: Your Information');
  }

  async fillCheckoutInfo(info: CheckoutInfo) {
    await this.firstNameInput.fill(info.firstName);
    await this.lastNameInput.fill(info.lastName);
    await this.postalCodeInput.fill(info.postalCode);
  }

  async continue() {
    await this.continueButton.click();
  }

  async cancel() {
    await this.cancelButton.click();
  }

  async expectErrorMessage(message: string) {
    await expect(this.errorMessage).toBeVisible();
    await expect(this.errorMessage).toContainText(message);
  }

  async expectCheckoutOverviewVisible() {
    await expect(this.page.locator('.title')).toHaveText('Checkout: Overview');
    await expect(this.subtotalLabel).toBeVisible();
    await expect(this.totalLabel).toBeVisible();
  }

  async getSubtotal(): Promise<number> {
    const text = await this.subtotalLabel.textContent();
    const match = (text ?? '').match(/[\d.]+/);
    return match ? parseFloat(match[0]) : 0;
  }

  async getTotal(): Promise<number> {
    const text = await this.totalLabel.textContent();
    const match = (text ?? '').match(/[\d.]+/);
    return match ? parseFloat(match[0]) : 0;
  }

  async finish() {
    await this.finishButton.click();
  }
}
