import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': { // Proxy requests starting with '/api'
        target: 'http://localhost:5001', // Your backend server URL (port 5001)
        changeOrigin: true, // Important for cookies in some cases
        // rewrite: (path) => path.replace(/^\/api/, ''), // Optional: If you want to remove '/api' prefix
      }
    }
  }
})