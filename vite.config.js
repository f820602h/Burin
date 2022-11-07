import { fileURLToPath, URL } from "url";
import { VitePWA } from "vite-plugin-pwa";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      injectRegister: "auto",
      registerType: "autoUpdate",
      devOptions: {
        enabled: true,
      },
      includeAssets: [
        "masked-icon.svg",
        "pwa-192x192.png",
        "pwa-512x512.png",
        "apple-icon-57x57.png",
        "apple-icon-72x72.png",
        "apple-icon-114x114.png",
      ],
      manifest: {
        short_name: "Burin",
        name: "Burin",
        lang: "zh-Hant-TW",
        description: "carving your every step",
        icons: [
          {
            src: "pwa-192x192.png",
            type: "image/png",
            sizes: "192x192",
          },
          {
            src: "pwa-512x512.png",
            type: "image/png",
            sizes: "512x512",
          },
        ],
        start_url: "/",
        background_color: "#ffffff",
        display: "standalone",
        scope: "/",
        theme_color: "#000000",
        gcm_sender_id: "103953800507",
      },
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
