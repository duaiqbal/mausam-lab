import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    allowedHosts: [
      'all',
      'scorer-mama-bagpipe.ngrok-free.dev',
      'scorer-mama-bagpipe.ngrok-free.app',
      '.ngrok-free.dev',
      '.ngrok-free.app',
      '.ngrok.io',
    ],
  },
})
