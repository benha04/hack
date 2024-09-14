
module.exports = {
    testEnvironment: 'jsdom',
    transform: {
      '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/babel-jest',
    },
    moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json'],
    // ... other options
  };