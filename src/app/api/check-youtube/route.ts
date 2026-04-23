import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET() {
  // Direct database check
  const { data: siteData, error: siteError } = await supabase
    .from('site_settings')
    .select('youtube_channel, youtube_videos');
  
  if (siteError) {
    return NextResponse.json({ error: siteError.message });
  }

  // Direct fetch from YouTube API to verify video IDs
  const videos = siteData?.[0]?.youtube_videos || [];
  const validatedVideos = [];
  
  for (const video of videos) {
    const videoId = video.id || video.url?.split('v=')[1]?.split('&')[0] || video.url?.split('youtu.be/')[1]?.split('?')[0];
    validatedVideos.push({
      ...video,
      videoId,
      thumbnail: video.thumbnail || `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
    });
  }

  return NextResponse.json({
    site_settings: siteData,
    validatedVideos,
    raw_videos: videos
  });
}
