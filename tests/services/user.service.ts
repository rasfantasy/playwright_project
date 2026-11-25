import { APIRequestContext, APIResponse } from '@playwright/test';
import { User } from '../models/user.model';

export const createUser = async (client: APIRequestContext, data: User): Promise<APIResponse> => {
  return client.post('user/create', { data });
};

export const getUser = async (client: APIRequestContext, userId: string): Promise<APIResponse> => {
  return client.get(`user/${userId}`);
};

export const updateUser = async (
  client: APIRequestContext,
  userId: string,
  data: Partial<User>,
): Promise<APIResponse> => {
  return client.put(`user/${userId}`, { data });
};

export const deleteUser = async (client: APIRequestContext, userId: string): Promise<APIResponse> => {
  return client.delete(`user/${userId}`);
};
