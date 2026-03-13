import { test as base, request } from '@playwright/test';
import { environments } from '../common/environments';

type EnvName = keyof typeof environments;

type WorkerFixtures = {
  apiToken: string;
  env: EnvName;
};

export const test = base.extend<{}, WorkerFixtures>({
  apiToken: [
    async ({ env }, use) => {
      /*
      Допустим тут должен быть код который получает app-id
      создаём API контекст

      const apiBaseURL = environments[env].apiURL;

      const apiContext = await request.newContext({
        baseURL: apiBaseURL,
      });


      const apiContext = await request.newContext({
        baseURL: apiBaseURL,
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
  env: [
    async ({}, use) => {
      const env = (process.env.ENV as EnvName) || 'test';
      await use(env); // передаём ENV в тесты
    },
    { scope: 'worker' },
  ],
});

// Ре-экспортируем expect из Playwright, чтобы тесты могли использовать его вместе с кастомными фикстурами
export { expect } from '@playwright/test';
