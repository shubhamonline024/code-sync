import { createClient } from "@supabase/supabase-js";

// const supabaseUrl = process.env.SUPABASE_URL;
// const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

const supabaseUrl = "https://glpiovrqaarqchrxjths.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdscGlvdnJxYWFycWNocnhqdGhzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ3NTExNTcsImV4cCI6MjA3MDMyNzE1N30.FNzrzl0sUfNiv3G7UlAntJ-UdyxRzv_t0LBembz6VCk";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
