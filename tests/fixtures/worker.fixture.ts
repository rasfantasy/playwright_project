import { APIRequestContext, test as base, request } from '@playwright/test';
import { environments } from '../common/environments';

type WorkerFixtures = {
  env: keyof typeof environments;
  apiToken: string;
  apiClient: APIRequestContext;
};

export const test = base.extend<{}, WorkerFixtures>({
  env: [
    async ({}, use) => {
      const selectedEnv = (process.env.ENV as keyof typeof environments) || 'test';
      await use(selectedEnv);
    },
    { scope: 'worker' },
  ],
  apiToken: [
    async ({ apiClient }, use) => {
      /*  //Допустим тут должен быть код который получает app-id
      //создаём API контекст

      const response = await apiClient.post(`/api/login`, {
        data: {
          email: 'test@test.com',
          password: '123456',
        },
      });
      const body = await response.json();
      await use(body.token);*/

      // но на деле мы сделаем сразу отправку токена
      await use('65c285ba99902e3258b34beb');
    },
    { scope: 'worker' },
  ],
  apiClient: [
    async ({ apiToken, env }, use) => {
      const apiURL = environments[env].apiURL; // берём API endpoint
      const client = await request.newContext({
        baseURL: apiURL,
        extraHTTPHeaders: { 'app-id': apiToken },
      });
      await use(client);
      await client.dispose();
    },
    { scope: 'worker' },
  ],
});

// Ре-экспортируем expect из Playwright, чтобы тесты могли использовать его вместе с кастомными фикстурами
export { expect } from '@playwright/test';
