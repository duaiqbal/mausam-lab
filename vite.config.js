import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  // Load ALL env vars (not just VITE_-prefixed) so Vercel's private variable
  // names SUPABASE_URL / SUPABASE_ANON_KEY also work alongside the VITE_ ones.
  const env = loadEnv(mode, process.cwd(), '')

  const supabaseUrl     = env.VITE_SUPABASE_URL     || env.SUPABASE_URL     || ''
  const supabaseAnonKey = env.VITE_SUPABASE_ANON_KEY || env.SUPABASE_ANON_KEY || ''

  return {
    plugins: [react()],
    define: {
      'import.meta.env.VITE_SUPABASE_URL':      JSON.stringify(supabaseUrl),
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