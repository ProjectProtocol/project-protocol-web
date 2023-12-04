/// <reference types="vitest" />

import { VitePWA } from 'vite-plugin-pwa'
import react from '@vitejs/plugin-react'
import pwaManifestConfig from './manifest.config.js'
import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/dist/config.js'

import viteRollbar from 'vite-plugin-rollbar'

// other declarations

/*
  Configure Rollbar plugin
*/
const rollbarConfig = {
  accessToken: process.env.SOURCEMAP_ACCESS_TOKEN, // d17af97925844fbb94168560484dc300
  version: '1.0',
  baseUrl: process.env.HOSTNAME || 'localhost',
  ignoreUploadErrors: false,
  silent: false,
}

// References:
// https://vitejs.dev/config/
// https://vite-pwa-org.netlify.app/assets-generator/#example-using-minimal-preset
export default defineConfig({
  plugins: [
    tsconfigPaths(),
    react(),
    VitePWA(pwaManifestConfig),
    viteRollbar(rollbarConfig),
  ],
  build: {
    // Required: tells Vite to create source maps
    sourcemap: true,
  },
  test: {
    globals: true,
    environment: 'jsdom',
  },
})
