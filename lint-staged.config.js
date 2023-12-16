module.exports = {
  './packages/**/*.{js,jsx,ts,tsx}': ['npm run lint', 'prettier --write'],
  './packages/**/*.{ts,tsx}': () => 'npm run ts:check',
};
