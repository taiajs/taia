import type { Config as TestConfig } from '@jest/types';
import type { Path, TransformerConfig } from '@jest/types/build/Config';

export type JSTransformer = 'esbuild' | 'swc' | 'ts-jest';

export type { TestConfig };

function getJSTransformer(jsTransformer: JSTransformer, opts?: any): TransformerConfig | Path {
  switch (jsTransformer) {
    case 'esbuild':
      return [require.resolve('jest-esbuild'), { ...opts, sourcemap: true }];
    case 'swc':
      return require.resolve('@swc-node/jest');
    case 'ts-jest':
      return require.resolve('ts-jest');
    default:
      throw new Error(`Unknown jsTransformer: ${jsTransformer}`);
  }
}

export function createTestConfig(opts?: {
  jsTransformer?: JSTransformer;
  target?: 'node' | 'browser';
  jsTransformerOpts?: any;
}): TestConfig.InitialOptions {
  const config: TestConfig.InitialOptions = {
    testMatch: ['**/*.test.(t|j)s(x)?'],
    transform: {
      '^.+\\.(t|j)sx?$': getJSTransformer(
        opts?.jsTransformer || 'esbuild',
        opts?.jsTransformerOpts,
      ),
    },
    moduleNameMapper: {
      '^.+\\.(css|less|sass|scss|stylus)$': require.resolve('identity-obj-proxy'),
    },
    testTimeout: 30000,
    modulePathIgnorePatterns: ['<rootDir>/packages/.+/compiled', '<rootDir>/packages/.+/fixtures'],
    setupFiles: [require.resolve('./setupFiles/shim')],
  };
  if (opts?.target === 'browser') {
    config.testEnvironment = 'jsdom';
  }
  return config;
}
