import { defineConfig } from 'father';

export default defineConfig({
  extends: '../../.fatherrc.base.ts',
  prebundle: {
    deps: [
      'postcss-less',
      'stylelint-config-css-modules',
      'stylelint-config-prettier',
      'stylelint-declaration-block-no-ignored-properties',
    ],
  },
});
