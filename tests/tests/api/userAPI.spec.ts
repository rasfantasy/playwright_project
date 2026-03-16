import { test, expect } from '../../fixtures/worker.fixture';
import { createTestUser } from '../../factories/user.factory';
import { createUser, getUser, updateUser, deleteUser } from '../../services/user.service';
import { generateRandomFirstName, generateRandomLastName } from '../../helpers/name.helper';

test('@api User Controller test API', async ({ apiClient }) => {
  let userId: string;
  const user = createTestUser();
  const updatedUser = {
    ...user,
    firstName: `Updated-${generateRandomFirstName()}`,
    lastName: `Updated-${generateRandomLastName()}`,
  };

  await test.step('Create user step', async ({}) => {
    const response = await createUser(apiClient, user);
    expect(response.status()).toBe(200);
    userId = (await response.json()).id;
  });

  await test.step('Get user by ID step', async () => {
    const response = await getUser(apiClient, userId);
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body).toMatchObject(user);
  });

  await test.step('Update user step', async () => {
    const response = await updateUser(apiClient, userId, updatedUser);
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body).toMatchObject(updatedUser);
  });

  await test.step('Delete user step', async () => {
    const response = await deleteUser(apiClient, userId);
    expect(response.status()).toBe(200);
  });

  await test.step('Verify user is deleted step', async () => {
    const response = await getUser(apiClient, userId);
    expect(response.status()).toBe(404);
  });
});
