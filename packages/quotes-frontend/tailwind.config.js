/** @type {import('tailwindcss').Config} */
const { light } = require('daisyui/src/theming/themes');

module.exports = {
  theme: {
    fontFamily: {
      sans: ['Poppins'],
      serif: ['Kalnia'],
    },
    extend: {
      typography: {
        DEFAULT: {
          css: {
            fontFamily: 'Poppins',
          },
        },
      },
    },
  },
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
    '../../node_modules/daisyui/dist/**/*.js',
    '../../node_modules/react-daisyui/dist/**/*.js',
  ],
  daisyui: {
    themes: [
      {
        light: {
          ...light,
          fontFamily: 'Poppins',
        },
      },
    ],
  },
  plugins: [require('daisyui'), require('@tailwindcss/typography')],
};
