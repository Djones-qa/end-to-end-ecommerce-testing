import { test as base } from '@playwright/test';
import {
  LoginPage,
  InventoryPage,
  CartPage,
  CheckoutPage,
  OrderConfirmationPage,
  ProductDetailPage,
} from '../pages';
import { users } from '../test-data/users';

type EcommerceFixtures = {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
  orderConfirmationPage: OrderConfirmationPage;
  productDetailPage: ProductDetailPage;
  authenticatedPage: InventoryPage;
};

/**
 * Extended test fixture that provides pre-built page objects and
 * an already-authenticated session via `authenticatedPage`.
 */
export const test = base.extend<EcommerceFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },

  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },

  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },

  orderConfirmationPage: async ({ page }, use) => {
    await use(new OrderConfirmationPage(page));
  },

  productDetailPage: async ({ page }, use) => {
    await use(new ProductDetailPage(page));
  },

  // Logs in as the standard user and lands on the inventory page
  authenticatedPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(users.standard.username, users.standard.password);
    await page.waitForURL('**/inventory.html');
    await use(new InventoryPage(page));
  },
});

export { expect } from '@playwright/test';
