import { yParser, semver, chalk, isLocalDev, crossSpawn } from '@txpjs/utils-node';
import verifyCommit from './verify-commit';
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
if (command === 'test') {
  crossSpawn('jest', [], { stdio: 'inherit', cwd });
}
if (command === 'eslint') {
  console.log(args);
  console.log(process.argv.slice(2));
  const lintArgs = [];
  const lintJs = ['--cache', '--ext', '.js,.jsx,.ts,.tsx', '--format=pretty', './src'];
  const lintFix = ['--fix', '--cache', '--ext', '.js,.jsx,.ts,.tsx', '--format=pretty', './src'];
  crossSpawn('eslint', ['--cache', '--ext', '.js,.jsx,.ts,.tsx', './packages'], {
    stdio: 'inherit',
    cwd,
  });
}
if (command === 'prettier') {
}
if (command === 'stylelint') {
}
if (command === 'husky') {
}
// "lint": "npm run lint:js && npm run lint:prettier && npm run tsc",
// "lint-staged": "lint-staged",
// "lint-staged:js": "eslint --ext .js,.jsx,.ts,.tsx ",
// "lint:fix": "eslint --fix --cache --ext .js,.jsx,.ts,.tsx --format=pretty ./src ",
// "lint:js": "eslint --cache --ext .js,.jsx,.ts,.tsx --format=pretty ./src",
// "lint:prettier": "prettier -c --write \"src/**/*\" --end-of-line auto",
// "tsc": "tsc --noEmit"
