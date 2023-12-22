import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

dotenv.config();

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  console.log({ env });

  return {
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
      VITE_API_URL: JSON.stringify(env.VITE_API_URL),
    },
  };
});
