import type { Config } from "jest";

const config: Config = {
  transform: {
    "^.+\\.tsx?$": "ts-jest",
    "^.+\\.svg$": "<rootDir>/svgTransform.js",
  },
  testEnvironment: "jsdom",
  testEnvironmentOptions: {},
  verbose: true,
};

export default config;
