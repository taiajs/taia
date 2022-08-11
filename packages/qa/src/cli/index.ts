import { yParser, semver, chalk, isLocalDev } from '@txpjs/utils-node';

const args = yParser(process.argv.slice(2), {
  alias: {
    version: ['v'],
    help: ['h'],
  },
  boolean: ['version'],
});

if (args.version && !args._[0]) {
  args._[0] = 'version';
  const local = isLocalDev() ? chalk.cyan('@local') : '';
  const { name, version } = require('../../package.json');
  console.log(`${name}@${version}${local}`);
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
    require('../config/verify-commit');
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
