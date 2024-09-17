import { defineConfig, devices } from '@playwright/test';
/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  //workers: 1, // Set the number of workers to 1
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  workers: 1, // Comment out or remove this line
  //reporter: 'html',
  reporter: [['html', { open: 'always' }]],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */

  
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    /* Run in headed mode */
    headless: false,
    //video and screenshot always on
    video: 'on',
    screenshot: 'on',

    //run tests slower to see what is happening
    launchOptions: {
      slowMo: 2000,
    },
    


    


  
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'Microsoft Edge',
      use: { ...devices['Desktop Edge'], channel: 'msedge' },
      //run tests slower to see what is happening
     
      
    },
    // Add other browser projects here
    // {
    //   name: 'Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
    // {
    //   name: 'Firefox',
    //   use: { ...devices['Desktop Firefox'], channel: 'firefox' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
