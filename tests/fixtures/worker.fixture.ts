import { test as base, request } from '@playwright/test';

type WorkerFixtures = {
  apiToken: string;
};

export const test = base.extend<{}, WorkerFixtures>({
  apiToken: [
    async ({}, use) => {
      /*
      Допустим тут должен быть код который получает app-id
      создаём API контекст
      const apiContext = await request.newContext({
        baseURL: 'https://dummyapi.io/data/v1',
      });
      отправляем post с данными
      const response = await apiContext.post('/api/login', {
        data: {
          email: 'test@test.com',
          password: '123456',
        },
      });

      ждём ответа и парсим в  json
      const body = await response.json();

      получаем токен и отправляем
      await use(body.token);
      
      закрываем контекст
      await apiContext.dispose();
      */

      // но на деле мы сделаем сразу отправку токена
      await use('65c285ba99902e3258b34beb');
    },
    { scope: 'worker' },
  ],
});

// Ре-экспортируем expect из Playwright, чтобы тесты могли использовать его вместе с кастомными фикстурами
export { expect } from '@playwright/test';
