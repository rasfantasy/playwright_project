import test, { Page, Locator, expect } from '@playwright/test';
import { AppConstants } from '../common/app-constants';

/**
 * @param {Object} Element
 * @param {Function} Element.locator - функция возвращающая локатор элемента
 * @param {string} Element.name - имя элемента
 * @param {string} Element.text - ожидаемый текст элемента
 * @param {Object} Element.attribute - ожидаемый атрибут элемента
 * @param {string} Element.attribute.type - тип атрибута
 * @param {string} Element.attribute.value - значение атрибута
 */
interface Element {
  locator: (page: Page) => Locator;
  name: string;
  text?: string;
  attribute?: {
    type: string;
    value: string;
  };
}

export class MainPage {
  readonly page: Page;
  readonly elements: Element[];

  constructor(page: Page) {
    this.page = page;
    this.elements = [
      {
        locator: (page: Page): Locator =>
          page.getByRole('link', { name: 'Playwright logo Playwright' }),
        name: 'Playwright link',
        text: 'Playwright',
        attribute: {
          type: 'href',
          value: '/',
        },
      },
      {
        locator: (page: Page): Locator => page.getByRole('link', { name: 'Docs' }),
        name: 'Docs link',
        text: 'Docs',
        attribute: {
          type: 'href',
          value: '/docs/intro',
        },
      },
      {
        locator: (page: Page): Locator => page.getByRole('link', { name: 'API' }),
        name: 'API link',
        text: 'API',
        attribute: {
          type: 'href',
          value: '/docs/api/class-playwright',
        },
      },
      {
        locator: (page: Page): Locator => page.getByRole('button', { name: 'Node.js' }),
        name: 'Node.js button',
        text: 'Node.js',
      },
      {
        locator: (page: Page): Locator => page.getByRole('link', { name: 'Community' }),
        name: 'Community link',
        text: 'Community',
        attribute: {
          type: 'href',
          value: '/community/welcome',
        },
      },
      {
        locator: (page: Page): Locator => page.getByRole('link', { name: 'GitHub repository' }),
        name: 'GitHub link',
        attribute: {
          type: 'href',
          value: 'https://github.com/microsoft/playwright',
        },
      },
      {
        locator: (page: Page): Locator => page.getByRole('link', { name: 'Discord server' }),
        name: 'Discord link',
        attribute: {
          type: 'href',
          value: 'https://aka.ms/playwright/discord',
        },
      },
      {
        locator: (page: Page): Locator =>
          page.getByRole('button', { name: 'Switch between dark and light' }),
        name: 'Theme Switck button',
      },
      {
        locator: (page: Page): Locator => page.getByRole('button', { name: 'Search (Ctrl+K)' }),
        name: 'Search button',
      },
      {
        locator: (page: Page): Locator =>
          page.getByRole('heading', { name: 'Playwright enables reliable' }),
        name: 'Title',
        text: 'Playwright enables reliable end-to-end testing for modern web apps.',
      },
      {
        locator: (page: Page): Locator => page.getByRole('link', { name: 'Get started' }),
        name: 'Get started link',
        text: 'Get started',
        attribute: {
          type: 'href',
          value: '/docs/intro',
        },
      },
    ];
  }

  async openMainPage() {
    await this.page.goto(AppConstants.BASE_URL);
  }

  async checkVisiblityElements() {
    for (const { locator, name } of this.elements) {
      await test.step(`Проверка отображения элемента ${name}`, async () => {
        await expect.soft(locator(this.page)).toBeVisible();
      });
    }
  }

  async checkTextElements() {
    for (const { locator, name, text } of this.elements) {
      if (text) {
        await test.step(`Проверка текста элемента ${name}`, async () => {
          await expect.soft(locator(this.page)).toContainText(text);
        });
      }
    }
  }

  async checkAttributeElements() {
    for (const { locator, name, attribute } of this.elements) {
      if (attribute) {
        await test.step(`Проверка атрибута ${attribute.type} элемента ${name}`, async () => {
          await expect.soft(locator(this.page)).toHaveAttribute(attribute.type, attribute.value);
        });
      }
    }
  }

  async clickSwitchLightModeIcon() {
    const theme = await this.page.locator('html').getAttribute('data-theme-choice');
    if (theme === 'system') {
      await this.page.getByRole('button', { name: 'Switch between dark and light' }).click();
      await this.page.getByRole('button', { name: 'Switch between dark and light' }).click();
    } else {
      await this.page.getByRole('button', { name: 'Switch between dark and light' }).click();
    }
  }

  async checkDataThemeAttributeValue() {
    await expect(this.page.locator('html')).toHaveAttribute('data-theme', 'dark');
  }

  async setLightModeLayout() {
    await this.page.evaluate(() => {
      document.querySelector('html')?.setAttribute('data-theme', 'light');
    });
  }

  async setDarkModeLayout() {
    await this.page.evaluate(() => {
      document.querySelector('html')?.setAttribute('data-theme', 'dark');
    });
  }

  async checkLightModeLayout() {
    await expect(this.page).toHaveScreenshot(`pageWidth_Light_Mode.png`);
  }

  async checkDarkModeLayout() {
    await expect(this.page).toHaveScreenshot(`pageWidth_Dark_Mode.png`);
  }
}
