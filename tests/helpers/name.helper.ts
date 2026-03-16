// массив возможных имён
const firstNames = ['Alex', 'John', 'Michael', 'David', 'Chris', 'Daniel', 'Robert'];

// массив возможных фамилий
const lastNames = ['Smith', 'Johnson', 'Brown', 'Taylor', 'Anderson', 'Wilson', 'Moore'];

// функция для генерации случайного имени
export const generateRandomFirstName = () => {
  // генерируем случайный индекс массива firstNames
  const randomIndex = Math.floor(Math.random() * firstNames.length);

  // возвращаем имя из массива по случайному индексу
  return firstNames[randomIndex];
};

// функция для генерации случайной фамилии
export const generateRandomLastName = () => {
  // генерируем случайный индекс массива lastNames
  const randomIndex = Math.floor(Math.random() * lastNames.length);

  // возвращаем фамилию из массива по случайному индексу
  return lastNames[randomIndex];
};
