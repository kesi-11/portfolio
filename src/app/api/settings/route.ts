import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';

export const dynamic = 'force-dynamic';

export async function GET() {
try {
// Try to get from site_settings table first
const { data: siteSettings, error: siteError } = await supabase
.from('site_settings')
.select('*')
.limit(1);

console.log('site_settings query:', { siteSettings, siteError });

if (siteSettings && siteSettings.length > 0) {
const row = siteSettings[0];
// Parse JSONB fields if they're strings
if (typeof row.youtube_videos === 'string') {
try {
row.youtube_videos = JSON.parse(row.youtube_videos);
} catch (e) {
console.error('Failed to parse youtube_videos JSON:', e);
row.youtube_videos = [];
}
}
console.log('Returning site_settings:', row);
return NextResponse.json(row);
}

if (siteError && siteError.code !== 'PGRST116') {
console.error('site_settings error:', siteError);
}

// Fallback to hero_settings for backward compatibility
const { data, error } = await supabase
.from('hero_settings')
.select('*')
.limit(1);

if (error) {
if (error.code === 'PGRST116') {
return NextResponse.json({});
}
return NextResponse.json({ error: error.message }, { status: 500 });
}

const result = data && data.length > 0 ? data[0] : {};
console.log('Returning hero_settings:', result);
return NextResponse.json(result);
} catch (error: any) {
console.error('GET settings error:', error);
return NextResponse.json({ error: error.message }, { status: 500 });
}
}

export async function PUT(request: Request) {
try {
const body = await request.json();

// Try site_settings table first
const { data: existing, error: fetchError } = await supabase
.from('site_settings')
.select('*')
.limit(1);

let result;

if (existing && existing.length > 0) {
// MERGE body with existing data to prevent data loss
const { id, created_at, ...updateData } = body;
const updatedData = { ...existing[0], ...updateData };
delete (updatedData as any).id;
delete (updatedData as any).created_at;

const { data, error } = await supabase
.from('site_settings')
.update(updatedData)
.eq('id', existing[0].id)
.select()
.single();

if (error) throw error;
result = { data };
} else {
const { data, error } = await supabase
.from('site_settings')
.insert(body)
.select()
.single();

if (error) throw error;
result = { data };
}

revalidatePath('/');
return NextResponse.json(result.data);
} catch (error: any) {
console.error('PUT settings error:', error);
// Fallback: save to localStorage via client
return NextResponse.json({ error: error.message, fallback: true }, { status: 200 });
}
}
