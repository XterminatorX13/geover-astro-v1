import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import compress from 'astro-compress';
import vercel from '@astrojs/vercel';

export default defineConfig({
  site: 'https://geover.com',
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    react(),
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
    }),
    compress({
      CSS: true,
      HTML: {
        'html-minifier-terser': {
          removeAttributeQuotes: false,
          removeComments: true,
          collapseWhitespace: true,
        },
      },
      Image: {
        webp: { quality: 85 },
        avif: { quality: 80 },
      },
      JavaScript: true,
      SVG: true,
    }),
  ],
  output: 'server',
  adapter: vercel(),
  vite: {
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            'react-vendor': ['react', 'react-dom'],
            'animation-vendor': ['framer-motion'],
            'three-vendor': ['three', '@react-three/fiber', '@react-three/drei'],
          },
        },
      },
      cssCodeSplit: true,
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
    },
    ssr: {
      noExternal: ['three', '@react-three/fiber', '@react-three/drei'],
    },
  },
  image: {
    domains: ['images.unsplash.com', 'cdn.geover.com'],
    formats: ['avif', 'webp'],
    quality: 85,
  },
  security: {
    checkOrigin: true,
  },
});
