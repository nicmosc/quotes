module.exports = {
  silent: true,
  testMatch: ['<rootDir>/tests/**/*.test.ts'],
  transform: {
    '.(ts|tsx)': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.test.json',
      },
    ],
  },
};
