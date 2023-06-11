const nextJest = require("next/jest")

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
})

// Add any custom config to be passed to Jest
const customJestConfig = {
  //setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^@panva/hkdf$": require.resolve("@panva/hkdf"),
    "^jose$": require.resolve("jose"),
    "^preact$": require.resolve("preact"),
    "^preact-render-to-string$": require.resolve("preact-render-to-string"),
    "^uuid$": require.resolve("uuid"),
  },
  setupFiles: ["<rootDir>/util/text-encoder.mock.ts"],
  testEnvironment: "jest-environment-jsdom",
  transformIgnorePatterns: [
    "node_modules/(?!@panva/hkdf)/",
    "node_modules/(?!jose)/",
    "node_modules/(?!preact)/",
    "node_modules/(?!preact-render-to-string)/",
    "node_modules/(?!uuid)/",
  ],
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig)
