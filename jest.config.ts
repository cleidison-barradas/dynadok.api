import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  clearMocks: true,

  coverageProvider: "v8",
  testEnvironment: "node",
  coverageDirectory: "coverage",
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  testRegex: "(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js)$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
};
export default config;
