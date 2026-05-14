import { test, expect } from '../../fixtures';
import { products } from '../../test-data/products';

test.describe('Shopping Cart', () => {
  test.beforeEach(async ({ authenticatedPage }) => {
    // Add two items before each cart test
    await authenticatedPage.addItemToCartByName(products.backpack.name);
    await authenticatedPage.addItemToCartByName(products.bikeLight.name);
    await authenticatedPage.goToCart();
  });

  test('should display cart page', async ({ cartPage }) => {
    await cartPage.expectCartPageVisible();
  });

  test('should show correct number of items in cart', async ({ cartPage }) => {
    const count = await cartPage.getCartItemCount();
    expect(count).toBe(2);
  });

  test('should display added product names in cart', async ({ cartPage }) => {
    await cartPage.expectItemInCart(products.backpack.name);
    await cartPage.expectItemInCart(products.bikeLight.name);
  });

  test('should remove an item from the cart', async ({ cartPage }) => {
    await cartPage.removeItemByName(products.backpack.name);
    await cartPage.expectItemNotInCart(products.backpack.name);
    const count = await cartPage.getCartItemCount();
    expect(count).toBe(1);
  });

  test('should navigate back to inventory via continue shopping', async ({ cartPage, page }) => {
    await cartPage.continueShopping();
    await expect(page).toHaveURL(/inventory\.html/);
  });

  test('should navigate to checkout from cart', async ({ cartPage, page }) => {
    await cartPage.proceedToCheckout();
    await expect(page).toHaveURL(/checkout-step-one\.html/);
  });
});
