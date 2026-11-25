import { defineConfig, devices } from '@playwright/test';
import { environments, EnvName } from './tests/common/environments';

// Окружение выбирается через переменную ENV (test | staging | prod), по умолчанию — test
const env = (process.env.ENV as EnvName) || 'test';

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
  workers: process.env.CI ? 1 : undefined,
  reporter: [['html', { open: 'never' }], ['allure-playwright', { resultsDir: 'allure-results' }]],

  /* Настройки визуального сравнения */
  expect: {
    toHaveScreenshot: {
      // Допуск 1% различающихся пикселей — защита от субпиксельного шума рендеринга
      maxDiffPixelRatio: 0.01,
      // Останавливаем CSS-анимации, чтобы скриншот был детерминированным
      animations: 'disabled',
      caret: 'hide',
    },
  },

  use: {
    baseURL: environments[env].baseURL,
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
