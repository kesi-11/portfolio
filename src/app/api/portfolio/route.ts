import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';
import { checkAdminAuth } from '@/lib/auth';

export async function GET() {
  const { data, error } = await supabase
    .from('portfolio')
    .select('*')
    .order('display_order', { ascending: true });
  
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data || []);
}

export async function POST(request: Request) {
  if (!(await checkAdminAuth())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await request.json();
  const { label, category, image_url, fallback_color, featured, display_order } = body;

  if (!label || !category) {
    return NextResponse.json(
      { error: 'label and category are required' },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from('portfolio')
    .insert([{ 
      label, 
      category, 
      image_url: image_url || '', 
      fallback_color: fallback_color || '#1a1a2e', 
      featured: featured ?? false,
      display_order: display_order ?? 0,
    }])
    .select()
    .single();
  
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  revalidatePath('/');

  return NextResponse.json(data, { status: 201 });
}

export async function PUT(request: Request) {
  if (!(await checkAdminAuth())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await request.json();
  const { id, ...updateData } = body;
  
  const { data, error } = await supabase
    .from('portfolio')
    .update({ ...updateData, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();
  
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  revalidatePath('/');

  return NextResponse.json(data);
}

export async function DELETE(request: Request) {
  if (!(await checkAdminAuth())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  
  if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });
  
  const { error } = await supabase
    .from('portfolio')
    .delete()
    .eq('id', Number(id));
  
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  revalidatePath('/');

  return NextResponse.json({ success: true });
}