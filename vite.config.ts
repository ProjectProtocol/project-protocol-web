import { defineConfig } from "vite"
import { VitePWA } from "vite-plugin-pwa"

import react from "@vitejs/plugin-react"
import pwaManifestConfig from "./manifest.config.js"
// References:
// https://vitejs.dev/config/
// https://vite-pwa-org.netlify.app/assets-generator/#example-using-minimal-preset
export default defineConfig({
  plugins: [react(), VitePWA(pwaManifestConfig)],
})
