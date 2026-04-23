'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface YouTubeVideo {
  id: string;
  title: string;
  thumbnail: string;
  url: string;
}

export default function YouTube() {
  const [channelUrl, setChannelUrl] = useState('');
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSettings = () => {
      // Fetch from API first (database)
      fetch('/api/settings')
        .then(res => res.json())
        .then(data => {
          console.log('YouTube API response:', data);
          if (data?.youtube_channel) {
            setChannelUrl(data.youtube_channel);
            console.log('Set channel URL:', data.youtube_channel);
          }
          if (data?.youtube_videos && Array.isArray(data.youtube_videos) && data.youtube_videos.length > 0) {
            setVideos(data.youtube_videos);
            console.log('Set videos from DB:', data.youtube_videos);
          } else {
            console.log('No videos in DB, checking fallback...');
          }
          setLoading(false);
        })
        .catch((err) => {
          console.error('API fetch failed, using localStorage fallback:', err);
          // Fallback to localStorage
          const storedSettings = localStorage.getItem('richkid_settings');
          if (storedSettings) {
            const settings = JSON.parse(storedSettings);
            if (settings.youtube_channel) setChannelUrl(settings.youtube_channel);
            if (settings.youtube_videos) setVideos(settings.youtube_videos);
          }
          setLoading(false);
        });
    };

    loadSettings();

    // Listen for settings updates
    window.addEventListener('settings-updated', loadSettings as EventListener);
    return () => {
      window.removeEventListener('settings-updated', loadSettings as EventListener);
    };
  }, []);

if (loading) return null;

// Always show section if channel URL exists, even without featured videos
if (!channelUrl && videos.length === 0) {
// Show a simple CTA instead
return (
<section id="youtube" className="py-12 md:py-24 bg-black border-t border-white/10">
<div className="max-w-screen-2xl mx-auto px-4 md:px-8 text-center">
<motion.div
initial={{ opacity: 0 }}
whileInView={{ opacity: 1 }}
viewport={{ once: true }}
>
<span className="uppercase text-xs tracking-[2px] text-[#C9A84C] font-bold">FILMS & CONTENT</span>
<h2 className="text-3xl md:text-5xl lg:text-6xl font-bold font-['Playfair_Display'] mt-4">
Watch Our Work
</h2>
<p className="text-sm md:text-gray-400 mt-4 max-w-2xl mx-auto">
Check out our latest film projects and music videos on YouTube.
</p>
<a
href="https://youtube.com/@richkidfilmproduction?si=aGW4-Inp5uo6OMzO"
target="_blank"
rel="noopener noreferrer"
className="inline-flex items-center gap-3 px-8 py-4 bg-red-600 hover:bg-red-500 text-white font-bold rounded-full transition-colors mt-8"
>
<i className="fab fa-youtube text-2xl" />
Subscribe to Our Channel
<i className="fas fa-external-link-alt text-sm" />
</a>
</motion.div>
</div>
</section>
);
}

return (
<section id="youtube" className="py-12 md:py-24 bg-black border-t border-white/10">
<div className="max-w-screen-2xl mx-auto px-4 md:px-8">
<motion.div
initial={{ opacity: 0 }}
whileInView={{ opacity: 1 }}
viewport={{ once: true }}
className="text-center mb-10 md:mb-16"
>
<span className="uppercase text-xs tracking-[2px] text-[#C9A84C] font-bold">FILMS & CONTENT</span>
<h2 className="text-3xl md:text-5xl lg:text-6xl font-bold font-['Playfair_Display'] mt-4">
Watch Our Work
</h2>
<p className="text-sm md:text-gray-400 mt-4 max-w-2xl mx-auto">
Catch our latest film projects, music videos, and visual content on YouTube.
</p>
</motion.div>

{/* Video Grid */}
{videos.length > 0 && (
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
{videos.map((video, index) => (
<motion.a
key={video.id}
href={video.url || `https://youtube.com/watch?v=${video.id}`}
target="_blank"
rel="noopener noreferrer"
initial={{ opacity: 0, y: 20 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true }}
transition={{ delay: index * 0.1 }}
className="group relative aspect-video bg-[#1a1a1a] rounded-2xl overflow-hidden"
>
<img
src={video.thumbnail || `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
alt={video.title}
className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
/>
<div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
<div className="text-center">
<div className="w-16 h-16 bg-[#C9A84C] rounded-full flex items-center justify-center text-black text-2xl mx-auto mb-2">
<i className="fab fa-youtube" />
</div>
<span className="text-white font-bold">Watch Now</span>
</div>
</div>
<div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent">
<p className="text-white font-semibold text-sm truncate">{video.title}</p>
</div>
</motion.a>
))}
</div>
)}

{/* Channel CTA */}
<div className="text-center">
<a
href={channelUrl || 'https://youtube.com/@richkidgraphix'}
target="_blank"
rel="noopener noreferrer"
className="inline-flex items-center gap-3 px-8 py-4 bg-red-600 hover:bg-red-500 text-white font-bold rounded-full transition-colors"
>
<i className="fab fa-youtube text-2xl" />
Subscribe to Our Channel
<i className="fas fa-external-link-alt text-sm" />
</a>
</div>
</div>
</section>
);
}