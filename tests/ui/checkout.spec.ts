import { test, expect } from '../../fixtures';
import { products } from '../../test-data/products';
import { roundToTwo } from '../../utils/helpers';

const validInfo = {
  firstName: 'Jane',
  lastName: 'Doe',
  postalCode: '10001',
};

test.describe('Checkout Flow', () => {
  test.beforeEach(async ({ authenticatedPage }) => {
    await authenticatedPage.addItemToCartByName(products.backpack.name);
    await authenticatedPage.goToCart();
  });

  test('should reach checkout step one', async ({ cartPage, page }) => {
    await cartPage.proceedToCheckout();
    await expect(page).toHaveURL(/checkout-step-one\.html/);
  });

  test('should show error when first name is missing', async ({ cartPage, checkoutPage }) => {
    await cartPage.proceedToCheckout();
    await checkoutPage.fillCheckoutInfo({ firstName: '', lastName: 'Doe', postalCode: '10001' });
    await checkoutPage.continue();
    await checkoutPage.expectErrorMessage('First Name is required');
  });

  test('should show error when last name is missing', async ({ cartPage, checkoutPage }) => {
    await cartPage.proceedToCheckout();
    await checkoutPage.fillCheckoutInfo({ firstName: 'Jane', lastName: '', postalCode: '10001' });
    await checkoutPage.continue();
    await checkoutPage.expectErrorMessage('Last Name is required');
  });

  test('should show error when postal code is missing', async ({ cartPage, checkoutPage }) => {
    await cartPage.proceedToCheckout();
    await checkoutPage.fillCheckoutInfo({ firstName: 'Jane', lastName: 'Doe', postalCode: '' });
    await checkoutPage.continue();
    await checkoutPage.expectErrorMessage('Postal Code is required');
  });

  test('should proceed to checkout overview with valid info', async ({
    cartPage,
    checkoutPage,
    page,
  }) => {
    await cartPage.proceedToCheckout();
    await checkoutPage.fillCheckoutInfo(validInfo);
    await checkoutPage.continue();
    await expect(page).toHaveURL(/checkout-step-two\.html/);
    await checkoutPage.expectCheckoutOverviewVisible();
  });

  test('should display correct item total on overview', async ({
    cartPage,
    checkoutPage,
  }) => {
    await cartPage.proceedToCheckout();
    await checkoutPage.fillCheckoutInfo(validInfo);
    await checkoutPage.continue();
    const subtotal = await checkoutPage.getSubtotal();
    expect(roundToTwo(subtotal)).toBe(products.backpack.price);
  });

  test('should complete order and show confirmation', async ({
    cartPage,
    checkoutPage,
    orderConfirmationPage,
    page,
  }) => {
    await cartPage.proceedToCheckout();
    await checkoutPage.fillCheckoutInfo(validInfo);
    await checkoutPage.continue();
    await checkoutPage.finish();
    await expect(page).toHaveURL(/checkout-complete\.html/);
    await orderConfirmationPage.expectOrderConfirmed();
  });

  test('should return to inventory after order confirmation', async ({
    cartPage,
    checkoutPage,
    orderConfirmationPage,
    page,
  }) => {
    await cartPage.proceedToCheckout();
    await checkoutPage.fillCheckoutInfo(validInfo);
    await checkoutPage.continue();
    await checkoutPage.finish();
    await orderConfirmationPage.backToProducts();
    await expect(page).toHaveURL(/inventory\.html/);
  });
});
