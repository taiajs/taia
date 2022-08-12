import { yParser, semver, chalk, isLocalDev } from '@txpjs/utils-node';
import verifyCommit from './verify-commit';

const args = yParser(process.argv.slice(2), {
  alias: {
    version: ['v'],
    help: ['h'],
    commit: ['c'],
  },
  boolean: ['version'],
});

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
