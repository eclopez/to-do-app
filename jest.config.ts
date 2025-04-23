import type { Config } from 'jest';
import nextJest from 'next/jest';

const createJestConfig = nextJest({
  dir: './',
});

const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  testMatch: ['**/__tests__/**/*.ts?(x)'],
  moduleNameMapper: {
    '@/db': '<rootDir>/db/$1',
    '@/mocks': '<rootDir>/mocks/$1',
  },
};

export default createJestConfig(config);
