import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';

export async function GET() {
// Try to get from site_settings table first, fallback to hero_settings
const { data: siteSettings } = await supabase
.from('site_settings')
.select('*')
.limit(1)
.single();

if (siteSettings) {
return NextResponse.json(siteSettings);
}

// Fallback to hero_settings for backward compatibility
const { data, error } = await supabase
.from('hero_settings')
.select('*')
.limit(1)
.single();

if (error) {
if (error.code === 'PGRST116') {
return NextResponse.json({});
}
return NextResponse.json({ error: error.message }, { status: 500 });
}

return NextResponse.json(data || {});
}

export async function PUT(request: Request) {
const body = await request.json();

// Try site_settings table first
const { data: existing } = await supabase
.from('site_settings')
.select('id')
.limit(1)
.single();

let result;

if (existing) {
result = await supabase
.from('site_settings')
.update(body)
.eq('id', existing.id)
.select()
.single();
} else {
result = await supabase
.from('site_settings')
.insert(body)
.select()
.single();
}

if (result.error) {
// If site_settings table doesn't exist, fall back to hero_settings
if (result.error.message.includes('relation "site_settings" does not exist')) {
const { data: heroExisting } = await supabase
.from('hero_settings')
.select('id')
.limit(1)
.single();

if (heroExisting) {
result = await supabase
.from('hero_settings')
.update(body)
.eq('id', heroExisting.id)
.select()
.single();
} else {
result = await supabase
.from('hero_settings')
.insert(body)
.select()
.single();
}
}

if (result.error) {
return NextResponse.json({ error: result.error.message }, { status: 500 });
}
}

revalidatePath('/');

return NextResponse.json(result.data);
}
