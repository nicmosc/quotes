import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';
import path from 'path';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

dotenv.config();

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  css: {
    postcss: {
      plugins: [
        require('postcss-import'),
        require('tailwindcss/nesting'),
        require('tailwindcss')({
          config: path.resolve(__dirname, './tailwind.config.js'),
        }),
        require('autoprefixer'),
      ],
    },
  },
  define: {
    'process.env': {
      API_URL: `${process.env.API_URL}`,
    },
  },
});
