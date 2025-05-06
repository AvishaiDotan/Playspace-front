import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Change to run ngrok
  server: {
    proxy: {
      '/api': {
        target: 'https://playspace.co.il',
        changeOrigin: true,
        secure: false,
      }
    },
    allowedHosts: ['39d9-217-175-85-130.ngrok-free.app'],
  }
  // 
})

