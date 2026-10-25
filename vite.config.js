import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  // Load every env var (not just VITE_-prefixed ones) so we can also read
  // SUPABASE_URL / SUPABASE_ANON_KEY — the non-public names Vercel lets you
  // save without the "public prefix" warning.
  const env = loadEnv(mode, process.cwd(), '')

  const supabaseUrl =
    env.VITE_SUPABASE_URL || env.SUPABASE_URL || ''
  const supabaseAnonKey =
    env.VITE_SUPABASE_ANON_KEY || env.SUPABASE_ANON_KEY || ''

  return {
  plugins: [react()],
  // Expose the resolved values to the app under the VITE_ names the code uses.
  define: {
    'import.meta.env.VITE_SUPABASE_URL': JSON.stringify(supabaseUrl),
    'import.meta.env.VITE_SUPABASE_ANON_KEY': JSON.stringify(supabaseAnonKey),
  },
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
  }
})
