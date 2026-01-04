import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // This tells Vite that your app is hosted at /House-move/
  base: '/House-move/',
  server: {
    port: 3000,
  }
})