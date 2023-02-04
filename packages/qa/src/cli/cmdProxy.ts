import { fork } from 'child_process';
import path from 'path';

export interface CmdOpts {
  cwd: string;
  cmd?: string;
  pkg: string;
}

export default class CmdProxy {
  pkg = '';
  cmd = '';
  paths: Partial<CmdOpts> = {};
  constructor({ cwd, pkg, cmd }: CmdOpts) {
    this.paths.cwd = cwd;
    this.pkg = pkg;
    this.cmd = cmd || pkg;
  }
  getBinPath() {
    try {
      const pkgPath = require.resolve(`${this.pkg}/package.json`);
      const pkgContent = require(pkgPath);
      // check pkg bin
      /**
       * eslint object eslint
       * prettier string prettier
       * stylelint object stylelint
       * jest string jest
       * husky string husky
       * lint-staged string lint-staged
       * changelog
       * typescript object tsc tsserver
       * .editorconfig
       * cssinjs
       * jsdoc
       */
      const binResolvePath =
        typeof pkgContent.bin === 'string' ? pkgContent.bin : pkgContent.bin[this.cmd];
      return path.resolve(path.dirname(pkgPath), binResolvePath);
    } catch (e) {
      throw new Error(`${this.pkg} not found, please contact the author.`);
    }
  }

  getRunArgs(): string[] {
    return process.argv.slice(3);
  }

  run() {
    fork(this.getBinPath(), this.getRunArgs(), {
      stdio: 'inherit',
      cwd: this.paths.cmd,
    }).on('exit', (code) => {
      // override exit code when > 0
      if (!!code) {
        process.exitCode = code;
      }
    });
  }
}
