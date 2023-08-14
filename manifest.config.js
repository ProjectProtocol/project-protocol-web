const pwaManifestConfig = {
  registerType: "autoUpdate",
  devOptions: {
    enabled: true,
  },
  manifest: {
    name: "Project Protocol",
    short_name: "ProjectProtocol",
    description: "Resources and reviews for folx on parole",
    theme_color: "#ffffff",
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
}

export default pwaManifestConfig
