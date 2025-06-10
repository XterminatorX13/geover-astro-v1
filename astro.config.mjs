import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import compress from 'astro-compress';

export default defineConfig({
  site: 'https://geover.com.br',
  integrations: [
    tailwind(),
    react(),
    sitemap(),
    compress({
      CSS: true,
      HTML: true,
      Image: true,
      JavaScript: true,
      SVG: true,
    }),
  ],
  output: 'hybrid',
  adapter: import('@astrojs/vercel/serverless'),
  vite: {
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            'react-vendor': ['react', 'react-dom'],
            'ui-components': ['framer-motion'],
          },
        },
      },
    },
  },
  image: {
    domains: ['images.unsplash.com'],
    formats: ['avif', 'webp'],
  },
  security: {
    checkOrigin: true,
  },
});
