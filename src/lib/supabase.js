import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://ltcxldvqggetanhjggqz.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx0Y3hsZHZxZ2dldGFuaGpnZ3F6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgwNjA5MzYsImV4cCI6MjA5MzYzNjkzNn0.rUMdyNe9-r8hmJpShif27N-W-2J2qjjwK-GMSUzqZ10";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
