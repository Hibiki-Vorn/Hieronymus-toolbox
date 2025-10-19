import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa';
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    svelte(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'pwa-icon.png'],
      manifest: {
        name: "Hieronymus's Tool Box",
        short_name: "HTB",
        scope: "/",
        lang: "en",
        start_url: "/",
        display: "standalone",
        orientation: "portrait",
        description: "A compact toolbox for creative and technical tasks by Hieronymus.",
        background_color: "#000000",
        theme_color: "#000000",
        icons: [
          {
            src: "/pwa-icon.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable"
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,png,svg,woff2}'],
        runtimeCaching: [
          {
            urlPattern: /^\/.*$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'static-cache',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 30 // 30 days
              }
            }
          }
        ]
      }
    })
  ],
  server: {
    //historyApiFallback: true,
  },
})
