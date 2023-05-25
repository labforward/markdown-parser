/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */
/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  // Automatically clear mock calls, instances, contexts and results before every test
  clearMocks: true,
  // Which file extensions should be treated as ESModule files
  extensionsToTreatAsEsm: [".ts"],
  // A map from regular expressions to module names or to arrays of module names that allow to stub out resources with a single module
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
    "^@/(.*)\\.js$": ["<rootDir>/$1"],
  },
  // A preset that is used as a base for Jest's configuration
  preset: "ts-jest",
  // The root directory that Jest should scan for tests and modules within
  rootDir: "src",
  // A list of paths to directories that Jest should use to search for files in
  roots: ["<rootDir>"],
  // A map from regular expressions to paths to transformers
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        useESM: true,
      },
    ],
  },
};
