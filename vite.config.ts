import { defineConfig } from "vite"
import { VitePWA } from "vite-plugin-pwa"

import react from "@vitejs/plugin-react"

// References:
// https://vitejs.dev/config/
// https://vite-pwa-org.netlify.app/assets-generator/#example-using-minimal-preset
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: true,
      },
      manifest: {
        name: "Project Protocol",
        short_name: "ProjectProtocol",
        description: "Resources and reviews for folx on parole",
        theme_color: "#f06748",
        background_color: "#ffffff",
        orientation: "portrait",
        display: "standalone",
        icons: [
          {
            src: "pwa-64x64.png",
            sizes: "64x64",
            type: "image/png",
          },
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "maskable-icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
    }),
  ],
})
