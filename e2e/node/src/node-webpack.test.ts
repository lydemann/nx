import {
  checkFilesDoNotExist,
  checkFilesExist,
  cleanupProject,
  newProject,
  runCLI,
  runCLIAsync,
  tmpProjPath,
  uniq,
  updateFile,
} from '@nrwl/e2e/utils';
import { execSync } from 'child_process';

describe('Node Applications + webpack', () => {
  beforeEach(() => newProject());

  afterEach(() => cleanupProject());

  it('should generate an app using webpack', async () => {
    const app = uniq('nodeapp');

    runCLI(`generate @nrwl/node:app ${app} --bundler=webpack --no-interactive`);

    checkFilesExist(`apps/${app}/webpack.config.js`);

    updateFile(`apps/${app}/src/main.ts`, `console.log('Hello World!');`);
    await runCLIAsync(`build ${app}`);

    checkFilesExist(`dist/apps/${app}/main.js`);
    const result = execSync(`node dist/apps/${app}/main.js`, {
      cwd: tmpProjPath(),
    }).toString();
    expect(result).toMatch(/Hello World!/);
  }, 300_000);
});
