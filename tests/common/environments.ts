export type EnvName = 'test' | 'staging' | 'prod';

// Объект environments хранит конфигурацию всех окружений проекта.
// Record означает:
// - ключи объекта строго соответствуют типу EnvName
// - значение каждого ключа содержит объект с параметрами окружения
// В данном случае параметр только один - baseURL (базовый URL приложения).
export const environments: Record<EnvName, { baseURL: string; apiURL: string }> = {
  // Конфигурация тестового окружения (обычно используется QA)
  test: {
    // baseURL будет автоматически подставляться Playwright
    // когда используется page.goto('/')
    baseURL: 'https://playwright.dev', //гипотетический test
    apiURL: 'https://dummyapi.io/data/v1/',
  },

  // Конфигурация staging среды (предрелизное окружение,
  // максимально приближенное к production)
  staging: {
    baseURL: 'https://playwright.dev', // гипотетический staging
    apiURL: 'https://dummyapi.io/data/v1/',
  },

  // Конфигурация production среды (боевое окружение)
  prod: {
    baseURL: 'https://playwright.dev', // гипотетический production
    apiURL: 'https://dummyapi.io/data/v1/',
  },
};
