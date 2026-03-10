export const Environments = {
  staging: 'https://playwright.dev/', //гипотетический staging
  production: 'https://playwright.dev/', // гипотетический production
  testing: 'https://playwright.dev/', // гипотетический testing
};

// функция определения среды по тегам
export function getEnvironment(testInfo: any) {
  if (testInfo.annotations.some((a: { type: string }) => a.type === 'regression')) {
    return Environments.production;
  }
  if (testInfo.annotations.some((a: { type: string }) => a.type === 'smoke')) {
    return Environments.staging;
  }
  if (testInfo.annotations.some((a: { type: string }) => a.type === 'testing')) {
    return Environments.testing;
  }
  return Environments.staging; // default
}
