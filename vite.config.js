import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: '/evolucao-fade/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg'],
      manifest: {
        name: 'Evolução FADE',
        short_name: 'Evolução FADE',
        description: 'O cérebro operacional da FADE House',
        theme_color: '#2F4B3C',
        background_color: '#F6F3EC',
        display: 'standalone',
        start_url: '/evolucao-fade/',
        icons: [
          { src: 'favicon.svg', sizes: 'any', type: 'image/svg+xml' }
        ]
      }
    })
  ]
})
