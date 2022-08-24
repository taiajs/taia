import { createTestConfig } from '@txpjs/qa';
import type { TestConfig } from '@txpjs/qa';

export default {
  ...createTestConfig(),
  testMatch: ['<rootDir>/src/**/*.test.ts'],
  modulePathIgnorePatterns: ['<rootDir>/src/.+/compiled', '<rootDir>/src/.+/fixtures'],
  transformIgnorePatterns: ['/node_modules/', '/compiled/'],
  collectCoverageFrom: [
    '**/src/**/*.{ts,tsx}',
    '!**/examples/**/*.{js,jsx,ts,tsx}',
    '!**/compiled/**/*.{js,jsx}',
    '!**/fixtures/**/*.*',
  ],
} as TestConfig.InitialOptions;
