module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/*.test.ts', '**/*.test.js', '**/*.mock.ts', '**/*.mock.js'],
  setupFiles: ['./jest.setup.js'],
};
