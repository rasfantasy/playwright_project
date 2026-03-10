// Импортируем базовый объект test из Playwright и называем его base
import { test as base } from '@playwright/test';

// Импортируем класс страницы, с которой будем работать через фикстуру
import { MainPage } from '../pages/MainPage';
import { getEnvironment } from '../common/environments';

// Определяем типы кастомных фикстур
type myFixtures = {
  mainPage: MainPage; // mainPage — это экземпляр класса MainPage
};

// Создаём кастомный test с расширением base и добавляем нашу фикстуру mainPage
export const test = base.extend<myFixtures>({
  // Определяем фикстуру mainPage
  mainPage: async ({ page }, use, testInfo) => {
    const baseURL = getEnvironment(testInfo); // получаем URL по тегам
    const mainPage = new MainPage(page, baseURL); // создаём экземпляр MainPage, передавая page
    await mainPage.openMainPage(); // сразу открываем главную страницу в браузере
    await use(mainPage); // передаём экземпляр в тест
  },
});

// Ре-экспортируем expect из Playwright, чтобы тесты могли использовать его вместе с кастомными фикстурами
export { expect } from '@playwright/test';
