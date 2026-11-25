// Кроссплатформенный запуск тестов в официальном Docker-образе Playwright.
// Тот же образ используется в CI, поэтому скриншоты совпадают пиксель в пиксель.
// Использование: node scripts/docker-run.js [аргументы для `playwright test`]
const { spawnSync } = require('node:child_process');
const { version } = require('@playwright/test/package.json');

const image = `mcr.microsoft.com/playwright:v${version}-noble`;
const args = process.argv.slice(2).join(' ');

const result = spawnSync(
  'docker',
  [
    'run', '--rm', '--ipc=host',
    '-e', 'CI=true',
    '-v', `${process.cwd()}:/work`,
    '-v', '/work/node_modules', // node_modules контейнера изолирован от хостового
    '-w', '/work',
    image,
    'bash', '-c', `npm ci --silent && npx playwright test ${args}`,
  ],
  { stdio: 'inherit' },
);

process.exit(result.status ?? 1);
