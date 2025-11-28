import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
   server: {
    port: 3000, // Or any other port you prefer for React
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8001/', // Your Laravel backend URL
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api'), // Ensure /api is kept
      },
    },
  },
})
