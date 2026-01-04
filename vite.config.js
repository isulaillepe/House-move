import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // This sets the base URL for the app to match your repo name
  base: '/House-move/',
  server: {
    port: 3000,
  }
})