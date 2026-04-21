import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';

export const dynamic = 'force-dynamic';

export async function GET() {
  const { data, error } = await supabase
    .from('contact_submissions')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data || []);
}

export async function POST(request: Request) {
  const body = await request.json();
  const { data, error } = await supabase
    .from('contact_submissions')
    .insert([body])
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function PUT(request: Request) {
  const body = await request.json();
  const { id, ...updateData } = body;

  const { data, error } = await supabase
    .from('contact_submissions')
    .update(updateData)
    .eq('id', id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function DELETE(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    let id = body?.id;

    if (!id) {
      const { searchParams } = new URL(request.url);
      id = searchParams.get('id');
    }

    if (!id) {
      return NextResponse.json({ error: 'ID required' }, { status: 400 });
    }

    return await handleDelete(id);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

async function handleDelete(id: string | number) {
  // Convert to number if it's a numeric string to avoid type mismatch errors
  const finalId = typeof id === 'string' && !isNaN(Number(id)) ? Number(id) : id;

  const { error } = await supabase
    .from('contact_submissions')
    .delete()
    .eq('id', finalId);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  revalidatePath('/admin/contact');

  return NextResponse.json({ success: true });
}
