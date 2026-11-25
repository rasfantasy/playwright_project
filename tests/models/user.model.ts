// Модель пользователя для API dummyapi.io (только поля, которые используются в тестах).
// Используем type, а не interface: type совместим с Record<string, unknown>,
// который ожидает expect().toMatchObject().
export type User = {
  firstName: string;
  lastName: string;
  email: string;
};

// Ответ API содержит id созданного пользователя
export type UserResponse = User & { id: string };
