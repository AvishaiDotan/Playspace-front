import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://playspace.co.il',
        changeOrigin: true,
        secure: false
      }
    },
    allowedHosts: ['146c-217-175-85-130.ngrok-free.app'],
  }
})
