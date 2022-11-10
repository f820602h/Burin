import { fileURLToPath, URL } from "url";
import { VitePWA } from "vite-plugin-pwa";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      mode: "development",
      base: "/",
      // injectRegister: null,
      srcDir: "src/service",
      filename: "sw.ts",
      strategies: "injectManifest",
      injectManifest: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg,txt}"],
      },
      devOptions: {
        enabled: true,
        type: "module",
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
        name: "Burin",
        short_name: "Burin",
        lang: "zh-Hant-TW",
        description: "carving your every step",
        background_color: "#ffffff",
        theme_color: "#ffffff",
        start_url: "/",
        display: "standalone",
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
      },
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
