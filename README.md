# Freemium Cloud Test Automation

This project contains automated end-to-end tests for the Freemium Cloud application using Playwright and TypeScript.

## 🚀 Project Overview

This test automation suite covers various modules of the MES (Manufacturing Execution System) Lite application, including:

- **User Management**: Login, Signup, and User Configuration
- **Machine Management**: Machine Details, Parameters, and Specifications
- **Production Management**: OEE Config, Product Config, Crew Schedule
- **Quality Management**: Checklist Config, Checklist Types
- **Maintenance**: Downtime Config, Waste Config

## 🛠️ Technology Stack

- **Testing Framework**: [Playwright](https://playwright.dev/)
- **Language**: TypeScript
- **Test Data**: Faker.js for generating test data
- **Reporting**: 
  - Playwright HTML Reporter
  - Allure Reports
- **Environment Management**: dotenv

## 📋 Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager

## 🔧 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Freemium-cloud
```

2. Install dependencies:
```bash
npm install
```

3. Install/Update Playwright to latest version:
```bash
# Install latest Playwright
npm install @playwright/test@latest

# Install Playwright browsers
npx playwright install

# Update all Playwright dependencies to latest
npm update @playwright/test
```

## ⚙️ Configuration

### Environment Setup

Create environment files for different environments:

- `.env.dev` - Development environment
- `.env.staging` - Staging environment  
- `.env.prod` - Production environment

Example `.env.dev`:
```env
BASE_URL=https://mes-lite.o3ozone.ai/
USERNAME=your-username
PASSWORD=your-password
```

### Authentication

The project uses persistent authentication via `auth.json`. Authentication state is automatically managed through the global setup.

## 🧪 Running Tests

### Run all tests:
```bash
npx playwright test
```

### Run specific test file:
```bash
npx playwright test tests/LoginPage.spec.ts
```

### Run tests in headed mode:
```bash
npx playwright test --headed
```

### Run tests in specific browser:
```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

### Run tests with debugging:
```bash
npx playwright test --debug
```

## 📊 Test Reports

### Playwright HTML Report
```bash
npx playwright show-report
```

### Allure Reports
Generate and view Allure reports:
```bash
# Generate report
npx allure generate allure-results --clean

# Serve report
npx allure serve allure-results
```

## 📁 Project Structure

```
├── auth/                    # Authentication setup
│   └── global-setup.ts
├── pages/                   # Page Object Models
│   ├── BasePages.ts
│   ├── LoginPage.ts
│   ├── SignupPage.ts
│   └── [other-pages].ts
├── tests/                   # Test specifications
│   ├── logIn-cloud.spec.ts
│   ├── SignupTest.spec.ts
│   └── [other-tests].spec.ts
├── allure-results/          # Allure test results
├── allure-report/           # Generated Allure reports
├── playwright-report/       # Playwright HTML reports
├── test-results/           # Test execution artifacts
├── auth.json               # Authentication state
├── playwright.config.ts    # Playwright configuration
└── package.json           # Project dependencies
```

## 🎯 Test Categories

### Authentication Tests
- Login functionality
- Signup process
- Session management

### Configuration Tests
- Checklist Configuration
- Machine Parameter Configuration
- OEE Configuration
- Product Configuration
- User Configuration
- Waste Configuration
- Downtime Configuration

### Management Tests
- Machine Details management
- Crew Schedule management
- Parameter Specifications

## 🔍 Page Object Pattern

The project follows the Page Object Model pattern for maintainable and reusable test code:

```typescript
// Example usage
import { LoginPage } from '../pages/LoginPage';

test('User login', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('username', 'password');
});
```

## 🐛 Debugging

### Visual Debugging
```bash
npx playwright test --ui
```

### Trace Viewer
Traces are automatically collected on test failures. View them with:
```bash
npx playwright show-trace trace.zip
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Create a Pull Request

## 📝 Writing Tests

### Test Naming Convention
- Use descriptive test names that explain the scenario
- Follow the pattern: `should [expected behavior] when [condition]`

### Test Structure
```typescript
test.describe('Feature Name', () => {
  test('should perform action when condition is met', async ({ page }) => {
    // Arrange
    // Act
    // Assert
  });
});
```

## 🔧 CI/CD Integration

The project is configured for CI/CD environments:
- Headless execution in CI
- Retry logic for flaky tests
- Parallel execution disabled in CI for stability



## 📄 License

[Add your license information here]
