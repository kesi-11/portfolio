import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://db.bzxsjmwwxlgmhjjowexr.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ6eHNqbXd3eGdsZ2poa293ZXhyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYwNjgwMDAsImV4cCI6MjA2MTY0NDAwMH0.q4M8HwKUk5QkR4Z5Z5K5xW5K5xW5K5xW5K5xW5K5xW5K5';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const ADMIN_PASSWORD = 'richkid2026';

export async function uploadImage(file: File, bucket: string = 'portfolio') {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
  const filePath = `${fileName}`;

  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(filePath, file);

  if (error) throw error;

  const { data: { publicUrl } } = supabase.storage
    .from(bucket)
    .getPublicUrl(filePath);

  return publicUrl;
}

export async function deleteImage(url: string, bucket: string = 'portfolio') {
  const fileName = url.split('/').pop();
  if (!fileName) return;

  const { error } = await supabase.storage
    .from(bucket)
    .remove([fileName]);

  if (error) console.error('Delete error:', error);
}