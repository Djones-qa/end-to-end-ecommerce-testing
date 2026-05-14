# End-to-End E-Commerce Testing

![Playwright Tests](https://github.com/Djones-qa/end-to-end-ecommerce-testing/actions/workflows/playwright.yml/badge.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)
![Playwright](https://img.shields.io/badge/Playwright-1.52-green?logo=playwright)
![License](https://img.shields.io/badge/license-MIT-lightgrey)

A production-quality end-to-end test suite for an e-commerce application, built to demonstrate real-world QA engineering skills.

**Target app:** [SauceDemo](https://www.saucedemo.com) — a purpose-built demo e-commerce site used across the industry for QA practice.

**What this repo showcases:**
- Page Object Model (POM) with TypeScript
- Custom Playwright fixtures for shared authenticated sessions
- API mocking via Playwright route interception
- Cross-browser testing (Chromium, Firefox, WebKit + mobile)
- CI/CD with GitHub Actions — parallel browser matrix, artifact uploads, nightly runs
- Allure reporting with GitHub Pages deployment

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
├── pages/                    # Page Object Model classes
│   ├── BasePage.ts           # Shared helpers (navigate, waitForURL, etc.)
│   ├── LoginPage.ts
│   ├── InventoryPage.ts
│   ├── ProductDetailPage.ts
│   ├── CartPage.ts
│   ├── CheckoutPage.ts
│   └── OrderConfirmationPage.ts
├── tests/
│   ├── ui/                   # UI end-to-end tests
│   │   ├── login.spec.ts
│   │   ├── inventory.spec.ts
│   │   ├── product-detail.spec.ts
│   │   ├── cart.spec.ts
│   │   └── checkout.spec.ts
│   └── api/                  # API mocking / route interception tests
│       └── cart-api.spec.ts
├── fixtures/                 # Custom Playwright fixtures
│   └── index.ts              # authenticatedPage — pre-logged-in session
├── test-data/                # Typed test data (no magic strings)
│   ├── users.ts
│   └── products.ts
├── utils/                    # Shared helpers
│   └── helpers.ts
├── .github/workflows/        # CI/CD pipeline
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
# Edit .env if you want to override BASE_URL or credentials
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

| Area | # Tests | What's covered |
|---|---|---|
| Login | 7 | Valid login, locked user, empty fields, invalid credentials, logout |
| Inventory | 9 | Page load, product count, all 4 sort options, add/remove from cart, navigation |
| Product Detail | 5 | Details display, correct price, add/remove cart, back navigation |
| Cart | 6 | Item display, remove item, continue shopping, proceed to checkout |
| Checkout | 8 | Field validation, overview totals, order completion, back to home |
| API Mocking | 4 | Route interception, error handling, localStorage persistence |
| **Total** | **39** | |

---

## CI/CD

The GitHub Actions workflow (`.github/workflows/playwright.yml`) runs on every push to `main`/`develop` and on pull requests:

- Parallel matrix across **Chromium**, **Firefox**, and **WebKit**
- 2 retries on failure in CI
- Uploads HTML reports and Allure results as artifacts (14-day retention)
- Publishes Allure report to GitHub Pages on merge to `main`
- Nightly scheduled run at 02:00 UTC

---

## Design Decisions

**Page Object Model** — Each page is a class with typed locators and action methods. Tests read like plain English and are insulated from selector changes.

**Custom fixtures** — The `authenticatedPage` fixture handles login once and injects a ready-to-use `InventoryPage`, keeping test bodies focused on the scenario under test rather than setup boilerplate.

**API mocking** — Playwright's `page.route()` intercepts network requests at the browser level, enabling tests for error states and edge cases without a real backend.

**Typed test data** — Products and users are defined as TypeScript interfaces, so tests reference `products.backpack.name` instead of magic strings scattered across files.

**Environment variables** — Credentials and base URL are read from `.env` / CI secrets, so nothing sensitive is hardcoded.

---

## Author

**D. Jones** — QA Engineer
- GitHub: [@Djones-qa](https://github.com/Djones-qa)

---

## License

MIT
