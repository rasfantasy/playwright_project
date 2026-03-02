import { test, expect, Page, Locator } from '@playwright/test';
import { MainPage } from '../../pages/MainPage';

let mainPage: MainPage;

test.describe('Тесты главной страницы', () => {
  test.beforeEach(async ({ page }) => {
    mainPage = new MainPage(page);
    await mainPage.openMainPage();
  });

  test('Проверка отображения элементов', async ({}) => {
    await mainPage.checkVisiblityElements();
  });

  test('Проверка текста элементов навигации', async ({}) => {
    await mainPage.checkTextElements();
  });

  test('Проверка соответствия ссылок элементов навигации', async ({}) => {
    await mainPage.checkAttributeElements();
  });

  test('Проверка переключения темы в header', async ({}) => {
    await mainPage.clickSwitchLightModeIcon();
    await mainPage.checkDataThemeAttributeValue();
  });

  test(`Проверка темы страницы light`, async ({}) => {
    await mainPage.setLightModeLayout();
    await mainPage.checkLightModeLayout();
  });

  test(`Проверка темы страницы dark`, async ({}) => {
    await mainPage.setDarkModeLayout();
    await mainPage.checkDarkModeLayout();
  });
});
