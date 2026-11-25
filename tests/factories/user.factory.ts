import { User } from '../models/user.model';

export const createTestUser = (overrides: Partial<User> = {}): User => {
  const random = Math.floor(Math.random() * 10000);
  return {
    firstName: 'Ras',
    lastName: 'Fantasy',
    email: `rasfantasy${random}@playwright-test.com`,
    ...overrides,
  };
};
