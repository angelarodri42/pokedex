import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: process.env.BASE_URL || '/',  // Use BASE_URL from env or default to '/'
  server: {
    watch: {
      usePolling: true,
    }
  }
})