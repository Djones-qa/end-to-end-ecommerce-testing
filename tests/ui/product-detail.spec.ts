import { test, expect } from '../../fixtures';
import { products } from '../../test-data/products';

test.describe('Product Detail Page', () => {
  test.beforeEach(async ({ authenticatedPage }) => {
    await authenticatedPage.clickProductByName(products.backpack.name);
  });

  test('should display product details', async ({ productDetailPage }) => {
    await productDetailPage.expectProductDetailVisible(products.backpack.name);
  });

  test('should display correct price', async ({ productDetailPage }) => {
    const price = await productDetailPage.getPrice();
    expect(price).toBe(products.backpack.price);
  });

  test('should add product to cart from detail page', async ({ productDetailPage, page }) => {
    await productDetailPage.addToCart();
    // Cart badge should appear
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
  });

  test('should remove product from cart on detail page', async ({ productDetailPage, page }) => {
    await productDetailPage.addToCart();
    await productDetailPage.removeFromCart();
    await expect(page.locator('.shopping_cart_badge')).not.toBeVisible();
  });

  test('should navigate back to inventory', async ({ productDetailPage, page }) => {
    await productDetailPage.goBack();
    await expect(page).toHaveURL(/inventory\.html/);
  });
});
