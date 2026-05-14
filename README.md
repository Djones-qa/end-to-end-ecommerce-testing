# End-to-End E-Commerce Testing

A production-quality Playwright test suite for an e-commerce application, built to demonstrate real-world QA engineering skills: Page Object Model, API mocking, cross-browser testing, and CI/CD integration.

**Target app:** [SauceDemo](https://www.saucedemo.com) — a purpose-built demo e-commerce site.

---

## Tech Stack

| Tool | Purpose |
|---|---|
| [Playwright](https://playwright.dev) | Browser automation & test runner |
| TypeScript | Type-safe test code |
| Page Object Model | Maintainable UI abstraction layer |
| Playwright Route Interception | API mocking without a real backend |
| Allure | Rich test reporting |
| GitHub Actions | CI/CD pipeline with cross-browser matrix |

---

## Project Structure

```
├── pages/                  # Page Object Model classes
│   ├── BasePage.ts
│   ├── LoginPage.ts
│   ├── InventoryPage.ts
│   ├── ProductDetailPage.ts
│   ├── CartPage.ts
│   ├── CheckoutPage.ts
│   └── OrderConfirmationPage.ts
├── tests/
│   ├── ui/                 # UI end-to-end tests
│   │   ├── login.spec.ts
│   │   ├── inventory.spec.ts
│   │   ├── product-detail.spec.ts
│   │   ├── cart.spec.ts
│   │   └── checkout.spec.ts
│   └── api/                # API mocking tests
│       └── cart-api.spec.ts
├── fixtures/               # Custom Playwright fixtures
│   └── index.ts
├── test-data/              # Typed test data
│   ├── users.ts
│   └── products.ts
├── utils/                  # Shared helpers
│   └── helpers.ts
├── .github/workflows/      # CI/CD pipeline
│   └── playwright.yml
└── playwright.config.ts
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Install

```bash
npm install
npx playwright install
```

### Configure environment (optional)

```bash
cp .env.example .env
# Edit .env with your own values if needed
```

### Run all tests

```bash
npm test
```

### Run only UI tests

```bash
npm run test:ui
```

### Run only API tests

```bash
npm run test:api
```

### Run in headed mode (watch the browser)

```bash
npm run test:headed
```

### Debug a specific test

```bash
npm run test:debug
```

### View HTML report

```bash
npm run report
```

### Generate and open Allure report

```bash
npm run allure:generate
npm run allure:open
```

---

## Test Coverage

| Area | Tests |
|---|---|
| Login | Valid login, locked user, empty fields, invalid credentials, logout |
| Inventory | Page load, product count, all 4 sort options, add/remove from cart |
| Product Detail | Details display, price, add/remove cart, back navigation |
| Cart | Item display, remove item, continue shopping, proceed to checkout |
| Checkout | Field validation, overview totals, order completion, back to home |
| API Mocking | Route interception, error handling, localStorage persistence |

---

## CI/CD

The GitHub Actions workflow runs on every push to `main`/`develop` and on pull requests:

- Parallel matrix across **Chromium**, **Firefox**, and **WebKit**
- Retries on failure (2 retries in CI)
- Uploads HTML reports and Allure results as artifacts
- Publishes Allure report to GitHub Pages on merge to `main`
- Nightly scheduled run at 02:00 UTC

---

## Design Decisions

**Page Object Model** — Each page is a class with typed locators and action methods. Tests read like plain English and are insulated from selector changes.

**Custom fixtures** — The `authenticatedPage` fixture handles login once and injects a ready-to-use `InventoryPage`, keeping test bodies focused on the scenario under test.

**API mocking** — Playwright's `page.route()` intercepts network requests at the browser level, enabling tests for error states and edge cases without a real API.

**Typed test data** — Products and users are defined as TypeScript interfaces, so tests reference `products.backpack.name` instead of magic strings.
