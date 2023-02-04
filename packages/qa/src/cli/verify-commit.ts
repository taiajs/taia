// Invoked on the commit-msg git hook by yorkie.

import osLocale from 'os-locale';
import { chalk, fsExtra } from '@txpjs/utils-node';

export default async (msgPath: string, onlyUs: boolean) => {
  if (!msgPath) return 'error';
  const msg = removeComment(fsExtra.readFileSync(msgPath, 'utf-8').trim());
  /*
  # 待使用再配置
  types、wip、release、dep、example
  */
  const commitRE =
    /^(((\ud83c[\udf00-\udfff])|(\ud83d[\udc00-\ude4f\ude80-\udeff])|[\u2600-\u2B55]) )?(revert: )?(feat|fix|docs|style|build|refactor|test|perf|ci|workflow|chore|Merge)(\(.+\))?: .{1,50}/;
  const zh_CN = /[\u4e00-\u9fa5]/;
  if (!commitRE.test(msg)) {
    const locale = await osLocale();
    if (locale === 'zh-CN') {
      console.error(
        `  ${chalk.bgRed.white(' ERROR ')} ${chalk.red(`提交日志不符合规范`)}\n\n${chalk.red(
          `  合法的提交日志格式如下(模块可选填)：\n\n`,
        )}
        ${chalk.green(`[<emoji>] [revert: ?]<type>[(scope)?]: <message>\n`)}
        ${chalk.green(`feat(模块): 增加新功能`)}
        ${chalk.green(`fix(模块): 修复bug`)}
        ${chalk.green(`docs(模块): 只改动了文档相关的内容`)}
        ${chalk.green(`style(模块): 不影响代码含义的改动，例如去掉空格、改变缩进、增删分号`)}
        ${chalk.green(`build(模块): 构造工具的或者外部依赖的改动，例如webpack，npm`)}
        ${chalk.green(`refactor(模块): 代码重构时使用`)}
        ${chalk.green(`revert(模块): 执行git revert打印的message`)}
        ${chalk.green(`test(模块): 添加测试或者修改现有测试`)}
        ${chalk.green(`perf(模块): 提高性能的改动`)}
        ${chalk.green(`ci(模块):  与CI（持续集成服务）有关的改动`)}
        ${chalk.green(`workflow(模块):  github workflow修改`)}
        ${chalk.green(`chore(模块): 不修改src或者test的其余修改，例如构建过程或辅助工具的变动`)}
        ${chalk.green(`Merge(模块): git merge生成的提交`)}
        ${chalk.red(`See https://github.com/taiajs/taia/.github/commit-convention.md\n`)}`,
      );
    } else {
      console.error(
        `  ${chalk.bgRed.white(' ERROR ')} ${chalk.red(
          `invalid commit message format.`,
        )}\n\n${chalk.red(
          `  Proper commit message format is required for automated changelog generation. Examples:\n\n`,
        )}
        ${chalk.green(`[<emoji>] [revert: ?]<type>[(scope)?]: <message>\n`)}
        ${chalk.green(`💥 feat(compiler): add 'comments' option`)}
        ${chalk.green(`🐛 fix(compiler): fix some bug`)}
        ${chalk.green(`📝 docs(compiler): add some docs`)}
        ${chalk.green(`🌷 style(compiler): better styles`)}
        ${chalk.green(`🏰 chore(compiler): Made some changes to the scaffolding`)}
        ${chalk.green(
          `Other commit types: refactor, perf, workflow, build, CI, typos, tests, types, wip, release, dep\n`,
        )}
        ${chalk.red(`See https://github.com/taiajs/taia/.github/commit-convention.md\n`)}`,
      );
    }
    return 'error';
  }
  if (zh_CN.test(msg) && onlyUs) {
    console.error(
      `  ${chalk.bgRed.white(' ERROR ')} ${chalk.red(`The message cannot be in Chinese.`)}\n\n` +
        chalk.green(`  I hope I can learn English well\n\n`),
    );
    return 'error';
  }
};

function removeComment(msgs: string) {
  return msgs.replace(/^#.*[\n\r]*/gm, '');
}
