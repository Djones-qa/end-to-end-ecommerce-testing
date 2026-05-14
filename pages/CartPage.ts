import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  readonly pageTitle: Locator;
  readonly cartItems: Locator;
  readonly checkoutButton: Locator;
  readonly continueShoppingButton: Locator;

  constructor(page: Page) {
    super(page);
    this.pageTitle = page.locator('.title');
    this.cartItems = page.locator('.cart_item');
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
  }

  async expectCartPageVisible() {
    await expect(this.pageTitle).toHaveText('Your Cart');
  }

  async getCartItemCount(): Promise<number> {
    return this.cartItems.count();
  }

  async getCartItemNames(): Promise<string[]> {
    return this.page.locator('.inventory_item_name').allTextContents();
  }

  async removeItemByName(productName: string) {
    const item = this.page.locator('.cart_item', { hasText: productName });
    await item.locator('[data-test^="remove"]').click();
  }

  async expectItemInCart(productName: string) {
    await expect(
      this.page.locator('.cart_item', { hasText: productName })
    ).toBeVisible();
  }

  async expectItemNotInCart(productName: string) {
    await expect(
      this.page.locator('.cart_item', { hasText: productName })
    ).not.toBeVisible();
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
  }

  async continueShopping() {
    await this.continueShoppingButton.click();
  }
}
