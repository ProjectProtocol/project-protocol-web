/// <reference types="vitest" />

import { VitePWA } from 'vite-plugin-pwa'
import react from '@vitejs/plugin-react'
import pwaManifestConfig from './manifest.config.js'
import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/dist/config.js'

// References:
// https://vitejs.dev/config/
// https://vite-pwa-org.netlify.app/assets-generator/#example-using-minimal-preset
export default defineConfig({
  plugins: [tsconfigPaths(), react(), VitePWA(pwaManifestConfig)],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['src/test/setup.ts'],
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
