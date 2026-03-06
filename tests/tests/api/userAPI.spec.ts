import { test, expect } from '../../fixtures/worker.fixture';

test('User Controller test API', async ({ apiToken, request }) => {
  let userId: string;

  await test.step('Create user step', async () => {
    const response = await request.post('https://dummyapi.io/data/v1/user/create', {
      headers: {
        'app-id': apiToken,
      },
      data: {
        firstName: 'Ras',
        lastName: 'Fantasy',
        email: 'rasfantasy@playwright-test.com',
      },
    });
    expect(response.status()).toBe(200);
    const body = await response.json();
    userId = body.id;
  });

  await test.step('Get user by ID step', async () => {
    const response = await request.get(`https://dummyapi.io/data/v1/user/${userId}`, {
      headers: {
        'app-id': apiToken,
      },
    });
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.firstName).toEqual('Ras');
    expect(body.lastName).toEqual('Fantasy');
    expect(body.email).toEqual('rasfantasy@playwright-test.com');
  });

  await test.step('Update user step', async () => {
    const response = await request.put(`https://dummyapi.io/data/v1/user/${userId}`, {
      headers: {
        'app-id': apiToken,
      },
      data: {
        firstName: 'Ras2',
        lastName: 'Fantasy2',
      },
    });
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.firstName).toEqual('Ras2');
    expect(body.lastName).toEqual('Fantasy2');
    expect(body.email).toEqual('rasfantasy@playwright-test.com');
  });

  await test.step('Delete user step', async () => {
    const response = await request.delete(`https://dummyapi.io/data/v1/user/${userId}`, {
      headers: {
        'app-id': apiToken,
      },
    });
    expect(response.status()).toBe(200);
  });

  await test.step('Verify user is deleted step', async () => {
    const response = await request.get(`https://dummyapi.io/data/v1/user/${userId}`, {
      headers: {
        'app-id': apiToken,
      },
    });
    expect(response.status()).toBe(404);
  });
});
