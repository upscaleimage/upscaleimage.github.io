import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://astro.build/config
export default defineConfig({
  site: 'https://upscaleimage.github.io',
  output: 'static',
  trailingSlash: 'always',
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
  ],
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es', 'pt', 'de', 'fr', 'ja'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  vite: {
    resolve: {
      alias: {
        '@upscalerjs/esrgan-thick/4x': path.resolve(__dirname, 'node_modules/@upscalerjs/esrgan-thick/dist/umd/models/esrgan-thick/src/x4/index.min.js'),
        '@upscalerjs/esrgan-thick/2x': path.resolve(__dirname, 'node_modules/@upscalerjs/esrgan-thick/dist/umd/models/esrgan-thick/src/x2/index.min.js'),
        '@upscalerjs/esrgan-medium/4x': path.resolve(__dirname, 'node_modules/@upscalerjs/esrgan-medium/dist/umd/models/esrgan-medium/src/x4/index.min.js'),
        '@upscalerjs/esrgan-medium/2x': path.resolve(__dirname, 'node_modules/@upscalerjs/esrgan-medium/dist/umd/models/esrgan-medium/src/x2/index.min.js'),
        '@upscalerjs/esrgan-slim/4x': path.resolve(__dirname, 'node_modules/@upscalerjs/esrgan-slim/dist/umd/models/esrgan-slim/src/x4/index.min.js'),
        '@upscalerjs/esrgan-slim/2x': path.resolve(__dirname, 'node_modules/@upscalerjs/esrgan-slim/dist/umd/models/esrgan-slim/src/x2/index.min.js'),
      },
    },
    optimizeDeps: {
      include: [
        '@tensorflow/tfjs',
        'upscaler',
        '@upscalerjs/default-model',
        '@upscalerjs/esrgan-slim',
        '@upscalerjs/esrgan-medium',
        '@upscalerjs/esrgan-medium/2x',
        '@upscalerjs/esrgan-medium/4x',
        '@upscalerjs/esrgan-thick',
        '@upscalerjs/esrgan-thick/2x',
        '@upscalerjs/esrgan-thick/4x',
      ],
    },
    build: {
      chunkSizeWarningLimit: 2000,
    },
  },
});
