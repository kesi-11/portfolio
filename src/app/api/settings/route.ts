import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';

export async function GET() {
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
  
  // Get current settings
  const { data: existing } = await supabase
    .from('hero_settings')
    .select('id')
    .limit(1)
    .single();

  let result;
  
  if (existing) {
    // Update existing
    result = await supabase
      .from('hero_settings')
      .update(body)
      .eq('id', existing.id)
      .select()
      .single();
  } else {
    // Insert new
    result = await supabase
      .from('hero_settings')
      .insert(body)
      .select()
      .single();
  }

  if (result.error) {
    return NextResponse.json({ error: result.error.message }, { status: 500 });
  }

  revalidatePath('/');

  return NextResponse.json(result.data);
}
