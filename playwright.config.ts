import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

// Load environment variables based on environment
const envFile = process.env.CI ? '.env.dev' : `.env.${process.env.NODE_ENV || 'dev'}`;
dotenv.config({ path: envFile });
/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({ 

  // globalSetup:require.resolve('./auth/global-setup'),

   timeout: 120* 1000,           // max test duration (2 minutes)
  expect: { timeout: 10000 },   
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 1 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['list'],                      // shows results in terminal
    ['html', { open: 'never' }],   // Playwright HTML report
    ['allure-playwright']          // Allure report
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
     /*Base URL to use in actions like `await page.goto('/Signup')`. */
    baseURL: 'https://mes-lite.o3ozone.ai/',
    headless: process.env.CI ? true : false,
    storageState: "auth.json",
    // headless: false,

    screenshot: 'only-on-failure',  // Capture screenshot on failure
    video: 'retain-on-failure',     // Record video for failed tests

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'retain-on-failure',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] ,
       headless: process.env.CI ? true : false,

      },
    },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
