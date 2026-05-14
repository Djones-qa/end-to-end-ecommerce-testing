import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class InventoryPage extends BasePage {
  readonly pageTitle: Locator;
  readonly inventoryList: Locator;
  readonly inventoryItems: Locator;
  readonly sortDropdown: Locator;
  readonly cartBadge: Locator;
  readonly cartIcon: Locator;
  readonly burgerMenu: Locator;
  readonly logoutLink: Locator;

  constructor(page: Page) {
    super(page);
    this.pageTitle = page.locator('.title');
    this.inventoryList = page.locator('.inventory_list');
    this.inventoryItems = page.locator('.inventory_item');
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.cartIcon = page.locator('.shopping_cart_link');
    this.burgerMenu = page.locator('#react-burger-menu-btn');
    this.logoutLink = page.locator('#logout_sidebar_link');
  }

  async expectInventoryPageVisible() {
    await expect(this.pageTitle).toHaveText('Products');
    await expect(this.inventoryList).toBeVisible();
  }

  async getItemCount(): Promise<number> {
    return this.inventoryItems.count();
  }

  async addItemToCartByName(productName: string) {
    const item = this.page.locator('.inventory_item', { hasText: productName });
    const addButton = item.locator('button');
    await addButton.click();
  }

  async removeItemFromCartByName(productName: string) {
    const item = this.page.locator('.inventory_item', { hasText: productName });
    const removeButton = item.locator('button');
    await removeButton.click();
  }

  async getCartCount(): Promise<number> {
    const badge = this.cartBadge;
    const isVisible = await badge.isVisible();
    if (!isVisible) return 0;
    const text = await badge.textContent();
    return parseInt(text ?? '0', 10);
  }

  async sortBy(option: string) {
    await this.sortDropdown.selectOption(option);
  }

  async getProductNames(): Promise<string[]> {
    return this.page.locator('.inventory_item_name').allTextContents();
  }

  async getProductPrices(): Promise<number[]> {
    const priceTexts = await this.page.locator('.inventory_item_price').allTextContents();
    return priceTexts.map((p) => parseFloat(p.replace('$', '')));
  }

  async clickProductByName(productName: string) {
    await this.page.locator('.inventory_item_name', { hasText: productName }).click();
  }

  async goToCart() {
    await this.cartIcon.click();
  }

  async logout() {
    await this.burgerMenu.click();
    await this.logoutLink.click();
  }
}
