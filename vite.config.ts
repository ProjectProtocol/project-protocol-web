/// <reference types="vitest" />

import { VitePWA } from 'vite-plugin-pwa'
import react from '@vitejs/plugin-react'
import pwaManifestConfig from './manifest.config.js'
import tsconfigPaths from 'vite-tsconfig-paths'
import { loadEnv, splitVendorChunkPlugin } from 'vite'
import { defineConfig } from 'vitest/dist/config.js'
import viteRollbar from 'vite-plugin-rollbar'

// References:
// https://vitejs.dev/config/
// https://vite-pwa-org.netlify.app/assets-generator/#example-using-minimal-preset
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  const plugins = [
    tsconfigPaths(),
    react(),
    VitePWA(pwaManifestConfig),
    splitVendorChunkPlugin(),
  ]

  if (env.ROLLBAR_ACCESS_TOKEN) {
    plugins.push(
      viteRollbar({
        accessToken: env.ROLLBAR_ACCESS_TOKEN,
        baseUrl: `https://${env.HOSTNAME}`,
        version: '1.0',
        ignoreUploadErrors: true,
        silent: false,
      }),
    )
  }

  return {
    build: {
      sourcemap: true,
    },
    plugins,
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
  }
})
