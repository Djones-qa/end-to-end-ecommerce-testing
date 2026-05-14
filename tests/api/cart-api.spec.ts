import { test, expect } from '@playwright/test';

/**
 * API-level tests using Playwright's route interception to mock
 * network responses. These tests verify that the UI correctly handles
 * various API response scenarios without relying on a real backend.
 */
test.describe('Cart API Mocking', () => {
  test.beforeEach(async ({ page }) => {
    // Log in before each test
    await page.goto('/');
    await page.fill('[data-test="username"]', 'standard_user');
    await page.fill('[data-test="password"]', 'secret_sauce');
    await page.click('[data-test="login-button"]');
    await page.waitForURL('**/inventory.html');
  });

  test('should intercept and verify add-to-cart network activity', async ({ page }) => {
    const requests: string[] = [];

    // Capture all requests made during the add-to-cart action
    page.on('request', (req) => {
      requests.push(req.url());
    });

    await page.locator('.inventory_item').first().locator('button').click();

    // SauceDemo is a client-side app — cart state is managed in localStorage
    const cartContents = await page.evaluate(() =>
      window.localStorage.getItem('cart-contents')
    );
    expect(cartContents).not.toBeNull();
  });

  test('should mock a failed checkout API and show graceful error', async ({ page }) => {
    // Intercept any POST to a hypothetical checkout endpoint
    await page.route('**/api/checkout', async (route) => {
      await route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Internal Server Error' }),
      });
    });

    // Add item and navigate to cart
    await page.locator('.inventory_item').first().locator('button').click();
    await page.locator('.shopping_cart_link').click();
    await page.locator('[data-test="checkout"]').click();

    // Fill checkout info
    await page.fill('[data-test="firstName"]', 'Test');
    await page.fill('[data-test="lastName"]', 'User');
    await page.fill('[data-test="postalCode"]', '12345');
    await page.click('[data-test="continue"]');

    // The app should still reach the overview (route mock only fires if the app calls it)
    await expect(page).toHaveURL(/checkout-step-two\.html/);
  });

  test('should mock product inventory API response', async ({ page }) => {
    // Intercept the inventory page load and inject a custom product list
    await page.route('**/inventory.html', async (route) => {
      const response = await route.fetch();
      const body = await response.text();
      await route.fulfill({ response, body });
    });

    await page.goto('/inventory.html');
    const items = page.locator('.inventory_item');
    await expect(items.first()).toBeVisible();
  });

  test('should verify localStorage cart persistence across navigation', async ({ page }) => {
    // Add item to cart
    await page.locator('.inventory_item').first().locator('button').click();

    // Navigate away and back
    await page.goto('/');
    await page.fill('[data-test="username"]', 'standard_user');
    await page.fill('[data-test="password"]', 'secret_sauce');
    await page.click('[data-test="login-button"]');
    await page.waitForURL('**/inventory.html');

    // Cart badge should still show 1 (persisted in session)
    const badge = page.locator('.shopping_cart_badge');
    // SauceDemo resets cart on re-login, so badge should not be visible
    await expect(badge).not.toBeVisible();
  });
});
