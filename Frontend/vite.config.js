import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  server: {
    fs: {
      // Allow accessing one level up (e.g., fonts in node_modules)
      allow: [
        path.resolve(__dirname),
        path.resolve(__dirname, 'node_modules/slick-carousel')
      ]
    }
  }
})
