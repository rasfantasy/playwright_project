export const createTestUser = (overrides: Partial<any> = {}) => {
  const random = Math.floor(Math.random() * 10000);
  return {
    firstName: 'Ras',
    lastName: 'Fantasy',
    email: `rasfantasy${random}@playwright-test.com`,
    ...overrides,
  };
};
