import { APIRequestContext } from '@playwright/test';

export const createUser = async (client: APIRequestContext, data: any) => {
  return client.post('user/create', { data });
};

export const getUser = async (client: APIRequestContext, userId: string) => {
  return client.get(`user/${userId}`);
};

export const updateUser = async (client: APIRequestContext, userId: string, data: any) => {
  return client.put(`user/${userId}`, { data });
};

export const deleteUser = async (client: APIRequestContext, userId: string) => {
  return client.delete(`user/${userId}`);
};
