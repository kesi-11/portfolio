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
console.log('PUT request body:', body);

// Try site_settings table first
const { data: existing, error: fetchError } = await supabase
.from('site_settings')
.select('*')
.limit(1);

console.log('Existing data:', existing, 'Fetch error:', fetchError);

let result;

if (existing && existing.length > 0) {
// Only update the fields that are provided
const updateData: any = {};
if (body.youtube_channel !== undefined) updateData.youtube_channel = body.youtube_channel;
if (body.youtube_videos !== undefined) updateData.youtube_videos = body.youtube_videos;
if (body.site_logo !== undefined) updateData.site_logo = body.site_logo;
if (body.contact_email !== undefined) updateData.contact_email = body.contact_email;
if (body.contact_whatsapp !== undefined) updateData.contact_whatsapp = body.contact_whatsapp;
if (body.about_text1 !== undefined) updateData.about_text1 = body.about_text1;
if (body.about_text2 !== undefined) updateData.about_text2 = body.about_text2;
if (body.about_text3 !== undefined) updateData.about_text3 = body.about_text3;
if (body.about_badge !== undefined) updateData.about_badge = body.about_badge;
if (body.about_image_url !== undefined) updateData.about_image_url = body.about_image_url;

console.log('Updating with:', updateData);

const { data, error } = await supabase
.from('site_settings')
.update(updateData)
.eq('id', existing[0].id)
.select()
.single();

if (error) {
console.error('Update error:', error);
throw error;
}
result = { data };
} else {
// Insert new row
const insertData = {
youtube_channel: body.youtube_channel || '',
youtube_videos: body.youtube_videos || [],
site_logo: body.site_logo || '',
contact_email: body.contact_email || '',
contact_whatsapp: body.contact_whatsapp || '',
about_text1: body.about_text1 || '',
about_text2: body.about_text2 || '',
about_text3: body.about_text3 || '',
about_badge: body.about_badge || '',
about_image_url: body.about_image_url || ''
};

console.log('Inserting:', insertData);

const { data, error } = await supabase
.from('site_settings')
.insert(insertData)
.select()
.single();

if (error) {
console.error('Insert error:', error);
throw error;
}
result = { data };
}

console.log('Save successful:', result.data);
revalidatePath('/');
return NextResponse.json(result.data);
} catch (error: any) {
console.error('PUT settings error:', error);
// Fallback: save to localStorage via client
return NextResponse.json({ error: error.message, fallback: true }, { status: 200 });
}
}
