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
  try {
    const body = await request.json();
    
    // Try site_settings table first
    const { data: existing } = await supabase
      .from('site_settings')
      .select('*')
      .limit(1)
      .single();
    
    let result;
    
    if (existing) {
      // Filter body to only include columns that likely exist or handle error
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
      console.error('Settings save error:', result.error);
      
      // If site_settings has issues, try hero_settings as fallback
      const { data: heroExisting } = await supabase
        .from('hero_settings')
        .select('id')
        .limit(1)
        .single();
      
      // Filter body for hero_settings (it might have fewer columns)
      const heroBody = { ...body };
      
      if (heroExisting) {
        result = await supabase
          .from('hero_settings')
          .update(heroBody)
          .eq('id', heroExisting.id)
          .select()
          .single();
      } else {
        result = await supabase
          .from('hero_settings')
          .insert(heroBody)
          .select()
          .single();
      }
    }
    
    if (result.error) {
      return NextResponse.json({ error: result.error.message }, { status: 500 });
    }
    
    revalidatePath('/');
    return NextResponse.json(result.data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
