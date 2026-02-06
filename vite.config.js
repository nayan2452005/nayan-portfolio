import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Explicitly returning the configuration object
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
  }
})
