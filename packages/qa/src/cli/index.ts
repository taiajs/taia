import { yParser, semver, chalk, isLocalDev, fsExtra } from '@txpjs/utils-node';
import { join } from 'path';
import verifyCommit from './verify-commit';
import cmdProxy from './cmdProxy';
const oldArgs = process.argv.slice(2);
const args = yParser(oldArgs, {
  alias: {
    version: ['v'],
    help: ['h'],
    commit: ['c'],
  },
  boolean: ['version'],
});
const cwd = process.cwd();

if (args.version && !args._[0]) {
  args._[0] = 'version';
  const local = isLocalDev() ? chalk.cyan('@local') : '';
  const { name, version } = require('../../package.json');
  console.log(`${name}@${version}${local}`);
}

if (!semver.satisfies(process.version, '>= 8.0.0')) {
  console.error(chalk.red('✘ The generator will only work with Node v8.0.0 and up!'));
  process.exit(1);
}

if (args.commit && !args._[0]) {
  verifyCommit(args.commit, args.onlyUs).then((res) => {
    if (res === 'error') {
      process.exit(1);
    }
  });
}

if (args.help && !args._[0]) {
  const help = `  Usage: qa [options]
  Options:
  -c, --commit                           check git commit
  --onlyUs                               check git commit onlyUs
  -v, --version                          print @txpjs/qa version
  -h, --help                             print qa command line options (currently set)
  `;
  console.log(help);
}
const command = args._[0];

if (command === 'eslint') {
  const prettier = new cmdProxy({ cwd, pkg: 'eslint' });
  prettier.run();
}
if (command === 'prettier') {
  const prettier = new cmdProxy({ cwd, pkg: 'prettier' });
  prettier.run();
}
if (command === 'stylelint') {
  const prettier = new cmdProxy({ cwd, pkg: 'stylelint' });
  prettier.run();
}
if (command === 'tsc') {
  const prettier = new cmdProxy({ cwd, pkg: 'typescript', cmd: 'tsc' });
  prettier.run();
}
if (command === 'husky') {
  const prettier = new cmdProxy({ cwd, pkg: 'husky' });
  prettier.run();
}
if (command === 'zx') {
  const prettier = new cmdProxy({ cwd, pkg: 'zx' });
  prettier.run();
}
if (command === 'jest') {
  const prettier = new cmdProxy({ cwd, pkg: 'jest' });
  prettier.run();
}
if (command === 'init') {
  const pkgPath = join(cwd, 'package.json');
  const pkg = require(pkgPath);
  // pkg
  pkg.srcipt = {
    ...(pkg?.srcipt || {}),
    lint: 'npm run lint:js && npm run lint:prettier && npm run tsc',
    'lint-staged': 'lint-staged',
    'lint-staged:js': 'eslint --ext .js,.jsx,.ts,.tsx ',
    'lint:fix': 'eslint --fix --cache --ext .js,.jsx,.ts,.tsx --format=pretty ./src ',
    'lint:js': 'eslint --cache --ext .js,.jsx,.ts,.tsx --format=pretty ./src',
    'lint:prettier': 'prettier -c --write "src/**/*" --end-of-line auto',
    tsc: 'tsc --noEmit',
    prepare: 'husky install',
    prettier: 'prettier -c --write "src/**/*"',
    test: 'jest',
    // sort: 'npx sort-package-json',
    // 'test:component': 'jest ./src/components',
    // 'test:e2e': 'node ./tests/run-tests.js',
  };
  pkg['lint-staged'] = {
    '*.{jsx,less,md,json}': ['prettier --write'],
    '*.ts?(x)': ['prettier --parser=typescript --write'],
    'packages/*/package.json': ['npx sort-package-json'],
    './package.json': ['npx sort-package-json'],
  };
  pkg.devDependencies = {
    ...(pkg?.devDependencies || {}),
    eslint: '^7.11.0',
    stylelint: '^13.0.0',
    typescript: '^4.5.4',
    prettier: '^2.3.2',
    husky: '^8.0.0',
    'lint-staged': '^13.0.3',
    'ts-node': '^10.9.1',
    jest: '^28.1.3',
  };
  fsExtra.writeFileSync(pkgPath, JSON.stringify(pkg));
}
