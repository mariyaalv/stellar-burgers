import type { Config } from 'jest';

const config: Config = {
  collectCoverage: true,

  coverageDirectory: 'coverage',

  coverageProvider: 'v8',

  testEnvironment: 'jsdom',

  preset: 'ts-jest'
};

export default config;
