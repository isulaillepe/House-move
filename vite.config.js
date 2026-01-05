import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // ⚠️ Important: Keep this line so your GitHub Pages deployment keeps working!
  base: '/House-move/', 
  server: {
    port: 3000,
  },
  // 👇 THIS IS THE NEW PART FOR STEP 2
  test: {
    globals: true,           // Allows us to use describe, it, expect without importing them
    environment: 'jsdom',    // Simulates a browser environment for React
    setupFiles: './src/setupTests.js', // Runs your setup file before tests
  }
})