import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://db.bzxsjmwwxlgmhjjowexr.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ6eHNqbXd3eGdsZ2poa293ZXhyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYwNjgwMDAsImV4cCI6MjA2MTY0NDAwMH0.q4M8HwKUk5QkR4Z5Z5K5xW5K5xW5K5xW5K5xW5K5xW5K5';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const ADMIN_PASSWORD = 'richkid2026';