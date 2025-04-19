import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleNameMapper: {
    "^@typings/(.*)$": "<rootDir>/src/typings/$1",
  },
};

export default config;
