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

  if (siteSettings && siteSettings.length > 0) {
    const row = siteSettings[0];

    let videos: any[] = [];
    if (row.youtube_videos) {
      if (Array.isArray(row.youtube_videos)) {
        videos = row.youtube_videos;
      } else if (typeof row.youtube_videos === 'string') {
        try {
          videos = JSON.parse(row.youtube_videos);
        } catch {
          videos = [row.youtube_videos];
        }
      }
    }

    let logo = row.site_logo ?? '';

    if (!logo) {
      const { data: heroData } = await supabase
        .from('hero_settings')
        .select('site_logo')
        .single();
      if (heroData?.site_logo) logo = heroData.site_logo;
    }

    const response = {
      site_logo: logo,
      youtube_channel: row.youtube_channel ?? '',
      youtube_videos: videos,
      contact_email: row.contact_email ?? '',
      contact_whatsapp: row.contact_whatsapp ?? '',
      about_text1: row.about_text1 ?? '',
      about_text2: row.about_text2 ?? '',
      about_text3: row.about_text3 ?? '',
      about_badge: row.about_badge ?? '',
      about_image_url: row.about_image_url ?? '',
    };

      return NextResponse.json(response);
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

      const { data, error } = await supabase
        .from('site_settings')
        .update(updateData)
        .eq('id', existing[0].id)
        .select()
        .single();

      if (error) throw error;
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

      const { data, error } = await supabase
        .from('site_settings')
        .insert(insertData)
        .select()
        .single();

      if (error) throw error;
      result = { data };
    }

    revalidatePath('/');
    return NextResponse.json(result.data);
  } catch (error: any) {
    console.error('PUT settings error:', error);
    return NextResponse.json({ error: error.message, fallback: true }, { status: 200 });
  }
}
