import { createClient } from "@supabase/supabase-js";

const supabaseUrl    = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// True only when both vars are present AND look like real values (not placeholders)
export const supabaseConfigured =
  !!supabaseUrl &&
  !!supabaseAnonKey &&
  !supabaseUrl.includes("your_supabase") &&
  !supabaseAnonKey.includes("your_supabase") &&
  supabaseUrl.startsWith("https://");

// Always export a client — if not configured it will just fail gracefully on calls
export const supabase = supabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : createClient("https://placeholder.supabase.co", "placeholder-key");
