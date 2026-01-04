import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // This ensures the server runs on port 3000, which is standard
  server: {
    port: 3000,
  }
})