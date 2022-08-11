import { yParser, semver, chalk } from '@txpjs/utils-node';
import { join } from 'path';
import { existsSync } from 'fs';

const args = yParser(process.argv.slice(2));

if (args.v || args.version) {
  console.log(require('./package').version);
  if (existsSync(join(__dirname, '.local'))) {
    console.log(chalk.cyan('@local'));
  }
  process.exit(0);
}

if (!semver.satisfies(process.version, '>= 8.0.0')) {
  console.error(chalk.red('✘ The generator will only work with Node v8.0.0 and up!'));
  process.exit(1);
}

const option = args._[0];

switch (option) {
  case 'verifyCommit':
    // eslint-disable-next-line global-require
    require('./dist/verifyCommit');
    break;

  default:
    if (args.h || args.help) {
      const details = `
      Commands:
        ${chalk.cyan('verifyCommit')}    检查 commit 提交的信息
      Examples:
        ${chalk.gray('qa')}
        qa -h
        ${chalk.gray('verifyCommit ')}
        qa verifyCommit
        `.trim();
      console.log(details);
    }
    break;
}
