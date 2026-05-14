import { test, expect } from '../../fixtures';
import { users } from '../../test-data/users';

test.describe('Login', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  test('should display the login page correctly', async ({ loginPage }) => {
    await loginPage.expectLoginPageVisible();
  });

  test('should log in successfully with valid credentials', async ({ loginPage, page }) => {
    await loginPage.login(users.standard.username, users.standard.password);
    await expect(page).toHaveURL(/inventory\.html/);
  });

  test('should show error for locked-out user', async ({ loginPage }) => {
    await loginPage.login(users.locked.username, users.locked.password);
    await loginPage.expectErrorMessage('Sorry, this user has been locked out');
  });

  test('should show error for empty username', async ({ loginPage }) => {
    await loginPage.login('', users.standard.password);
    await loginPage.expectErrorMessage('Username is required');
  });

  test('should show error for empty password', async ({ loginPage }) => {
    await loginPage.login(users.standard.username, '');
    await loginPage.expectErrorMessage('Password is required');
  });

  test('should show error for invalid credentials', async ({ loginPage }) => {
    await loginPage.login('invalid_user', 'wrong_password');
    await loginPage.expectErrorMessage('Username and password do not match');
  });

  test('should log out successfully', async ({ authenticatedPage, page }) => {
    await authenticatedPage.logout();
    await expect(page).toHaveURL('/');
  });
});
