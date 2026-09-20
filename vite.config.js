import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  base: process.env.GITHUB_ACTIONS ? '/project_bmw/' : '/',
  plugins: [vue({
    template: {
      transformAssetUrls: {
        includeAbsolute: false,
      }
    }
  })],
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: false,
    cors: true,
    hmr: { clientPort: 443 },
    headers: { 'X-Frame-Options': 'ALLOWALL' },
    allowedHosts: true,
  },
  preview: {
    host: '0.0.0.0',
    port: 4173,
    cors: true,
  },
});
