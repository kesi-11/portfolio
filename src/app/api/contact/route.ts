import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';

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
  const body = await request.json();
  const { id } = body || {};

  if (!id) {
    const { searchParams } = new URL(request.url);
    const searchId = searchParams.get('id');
    if (!searchId) return NextResponse.json({ error: 'ID required' }, { status: 400 });
    return handleDelete(searchId);
  }

  return handleDelete(id);
}

async function handleDelete(id: string | number) {
  const { error } = await supabase
    .from('contact_submissions')
    .delete()
    .eq('id', id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  revalidatePath('/admin/contact');

  return NextResponse.json({ success: true });
}
