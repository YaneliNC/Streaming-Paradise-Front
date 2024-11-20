import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Streaming Paradise',
        short_name: 'StreamParadise',
        description: 'Disfruta de los mejores contenidos en Streaming Paradise.',
        theme_color: '#000000',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: '/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
        screenshots: [
          {
            src: '/images/screenshot1.png',
            sizes: '640x480',
            type: 'image/png',
            form_factor: 'wide',
          },
        ],
      },
      workbox: {
        clientsClaim: true,
        skipWaiting: true,
        globIgnores: ['_headers.html', '_redirects.html'],  // Excluye estos archivos del precache
        runtimeCaching: [
          {
            urlPattern: ({ request }) => request.destination === 'document',
            handler: 'NetworkFirst',
            options: {
              cacheName: 'html-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 7 * 24 * 60 * 60, // 1 semana
              },
            },
          },
          {
            urlPattern: ({ request }) =>
              request.destination === 'script' || request.destination === 'style',
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'asset-cache',
              expiration: {
                maxEntries: 20,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 días
              },
            },
          },
          {
            urlPattern: ({ request }) => request.destination === 'image',
            handler: 'CacheFirst',
            options: {
              cacheName: 'image-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 días
              },
            },
          },
          {
            urlPattern: /\/api\/.*\.json/,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              networkTimeoutSeconds: 10,
              expiration: {
                maxEntries: 30,
                maxAgeSeconds: 24 * 60 * 60, // 1 día
              },
            },
          },
          {
            urlPattern: /\/offline/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'offline-cache',
              expiration: {
                maxEntries: 1,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 días
              },
            },
          },
          // Agregar caché para fuentes
          {
            urlPattern: /\.(woff|woff2|ttf|otf|eot|svg)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'font-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 días
              },
            },
          },
          // Agregar caché para el CSS de Font Awesome
          {
            urlPattern: /fontawesome-free\/css\/.*\.css/,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'font-awesome-css-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 días
              },
            },
          },
        ],
        navigateFallback: '/index.html',
        navigateFallbackAllowlist: [
          /^\/$/,
          /^\/index\.html$/,
          /^\/paquetes/,
          /^\/about/,
          /^\/perfil\/novato/, // Permite /perfil/novato
          /^\/perfil\/artista/, // Permite /perfil/artista
          /^\/perfil\/estrella/, // Permite /perfil/estrella
          /^\/catalogo/,
          /^\/video\/.*/,
          
        ],
      },
      devOptions: {
        enabled: true,
        type: 'module',
        navigateFallback: 'index.html',
      },
    }),
  ],
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: '/index.html',
      },
    },
  },
  base: '/',
});