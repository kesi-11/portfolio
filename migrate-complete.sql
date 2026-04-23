-- ============================================
-- RichKid Graphix Portfolio - COMPLETE MIGRATION
-- Run this ENTIRE script in Supabase SQL Editor
-- https://bzxsjmwwxlgmhjjowexr.supabase.com
-- ============================================

-- 1. Create site_settings table if it doesn't exist
CREATE TABLE IF NOT EXISTS site_settings (
id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
about_text1 TEXT DEFAULT '',
about_text2 TEXT DEFAULT '',
about_text3 TEXT DEFAULT '',
about_badge TEXT DEFAULT 'GRAPHIC DESIGNER',
contact_email TEXT DEFAULT '',
contact_whatsapp TEXT DEFAULT '+254740639494',
about_image_url TEXT DEFAULT '',
site_logo TEXT DEFAULT '',
hero_title TEXT DEFAULT 'Premium Graphic Design',
hero_subtitle TEXT DEFAULT 'Mombasa''s Premier Design Studio',
hero_cta_text TEXT DEFAULT 'View Our Work',
hero_cta_link TEXT DEFAULT '#portfolio',
hero_image_url TEXT DEFAULT '',
youtube_channel TEXT DEFAULT '',
youtube_videos JSONB DEFAULT '[]'
);

-- 2. Add youtube columns to site_settings (if table exists)
ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS youtube_channel TEXT DEFAULT '';
ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS youtube_videos JSONB DEFAULT '[]';

-- 3. Add site_logo column to hero_settings (for backward compatibility)
ALTER TABLE hero_settings ADD COLUMN IF NOT EXISTS site_logo TEXT;

-- 4. Add missing columns to testimonials table
ALTER TABLE testimonials ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'pending';
ALTER TABLE testimonials ADD COLUMN IF NOT EXISTS role TEXT DEFAULT '';
ALTER TABLE testimonials ADD COLUMN IF NOT EXISTS initials TEXT DEFAULT '';
ALTER TABLE testimonials ADD COLUMN IF NOT EXISTS color TEXT DEFAULT 'bg-amber-600';
ALTER TABLE testimonials ADD COLUMN IF NOT EXISTS display_order INTEGER DEFAULT 0;
ALTER TABLE testimonials ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- 5. Insert default site settings if not exists
INSERT INTO site_settings (about_text1, about_text2, about_text3, about_badge, contact_email, contact_whatsapp)
SELECT 'We are a premium graphic design studio based in Mombasa, Kenya.', 'Specializing in brand identities, print design, and digital visuals.', 'With over 5 years of experience, we deliver designs that command attention.', 'GRAPHIC DESIGNER', 'info@richkidgraphix.com', '+254740639494'
WHERE NOT EXISTS (SELECT 1 FROM site_settings);

-- 6. Insert default rate card items
INSERT INTO rate_card (service, price, unit, display_order)
SELECT * FROM (VALUES 
('Logo Design', 5000, 'project', 1),
('Business Card Design', 3000, 'set', 2),
('Flyer Design', 4000, 'design', 3),
('Poster Design', 5000, 'design', 4),
('Social Media Kit', 8000, 'package', 5),
('Brand Identity', 15000, 'package', 6),
('Banner Design', 3500, 'design', 7),
('Wedding Card Design', 6000, 'design', 8)
) AS t(service, price, unit, display_order)
WHERE NOT EXISTS (SELECT 1 FROM rate_card);

-- 7. Enable RLS on site_settings
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can read site_settings" ON site_settings;
CREATE POLICY "Public can read site_settings" ON site_settings FOR SELECT USING (true);
DROP POLICY IF EXISTS "Auth can manage site_settings" ON site_settings;
CREATE POLICY "Auth can manage site_settings" ON site_settings FOR ALL USING (auth.role() = 'authenticated');

-- ============================================
-- Verify migration
-- ============================================
SELECT 
'Migration Complete!' as status,
(SELECT COUNT(*) FROM site_settings) as site_settings_count,
(SELECT COUNT(*) FROM rate_card) as rate_card_items,
(SELECT COUNT(*) FROM testimonials) as testimonials_count;
