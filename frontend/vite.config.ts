import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    proxy: {
      '/auth': 'http://127.0.0.1:8000',
      '/admin': 'http://127.0.0.1:8000',
      '/search': 'http://127.0.0.1:8000',
      '/consultation': 'http://127.0.0.1:8000',
      '/triage': 'http://127.0.0.1:8000',
      '/ecommerce': 'http://127.0.0.1:8000',
      '/dashboard': 'http://127.0.0.1:8000',
    }
  }
})
