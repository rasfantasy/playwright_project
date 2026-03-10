import { test } from '../../fixtures/mainPage';

test.describe('Тесты главной страницы', () => {
  test('@smoke @regression Проверка отображения элементов', async ({ mainPage }) => {
    await mainPage.checkVisiblityElements();
  });

  test('@regression Проверка текста элементов навигации', async ({ mainPage }) => {
    await mainPage.checkTextElements();
  });

  test('@regression Проверка соответствия ссылок элементов навигации', async ({ mainPage }) => {
    await mainPage.checkAttributeElements();
  });

  test('@regression Проверка переключения темы в header', async ({ mainPage }) => {
    await mainPage.clickSwitchLightModeIcon();
    await mainPage.checkDataThemeAttributeValue();
  });

  test(`@regression Проверка темы страницы light`, async ({ mainPage }) => {
    await mainPage.setLightModeLayout();
    await mainPage.checkLightModeLayout();
  });

  test(`@regression Проверка темы страницы dark`, async ({ mainPage }) => {
    await mainPage.setDarkModeLayout();
    await mainPage.checkDarkModeLayout();
  });
});
