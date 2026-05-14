import { test, expect } from '../../fixtures';
import { products, sortOptions } from '../../test-data/products';
import { isSortedAscending, isSortedDescending } from '../../utils/helpers';

test.describe('Inventory / Product Listing', () => {
  test('should display the inventory page after login', async ({ authenticatedPage }) => {
    await authenticatedPage.expectInventoryPageVisible();
  });

  test('should display 6 products', async ({ authenticatedPage }) => {
    const count = await authenticatedPage.getItemCount();
    expect(count).toBe(6);
  });

  test('should sort products by name A-Z', async ({ authenticatedPage }) => {
    await authenticatedPage.sortBy(sortOptions.nameAZ);
    const names = await authenticatedPage.getProductNames();
    expect(isSortedAscending(names)).toBe(true);
  });

  test('should sort products by name Z-A', async ({ authenticatedPage }) => {
    await authenticatedPage.sortBy(sortOptions.nameZA);
    const names = await authenticatedPage.getProductNames();
    expect(isSortedDescending(names)).toBe(true);
  });

  test('should sort products by price low to high', async ({ authenticatedPage }) => {
    await authenticatedPage.sortBy(sortOptions.priceLowHigh);
    const prices = await authenticatedPage.getProductPrices();
    expect(isSortedAscending(prices)).toBe(true);
  });

  test('should sort products by price high to low', async ({ authenticatedPage }) => {
    await authenticatedPage.sortBy(sortOptions.priceHighLow);
    const prices = await authenticatedPage.getProductPrices();
    expect(isSortedDescending(prices)).toBe(true);
  });

  test('should navigate to product detail page', async ({ authenticatedPage, page }) => {
    await authenticatedPage.clickProductByName(products.backpack.name);
    await expect(page).toHaveURL(/inventory-item\.html/);
  });

  test('should add a product to cart from inventory', async ({ authenticatedPage }) => {
    await authenticatedPage.addItemToCartByName(products.backpack.name);
    const count = await authenticatedPage.getCartCount();
    expect(count).toBe(1);
  });

  test('should remove a product from cart on inventory page', async ({ authenticatedPage }) => {
    await authenticatedPage.addItemToCartByName(products.backpack.name);
    await authenticatedPage.removeItemFromCartByName(products.backpack.name);
    const count = await authenticatedPage.getCartCount();
    expect(count).toBe(0);
  });
});
