-- RichKid Graphix Portfolio - Supabase Database Schema
-- Run this ENTIRE script in Supabase Dashboard → SQL Editor
-- Copy everything below and paste in SQL Editor

-- Portfolio table
CREATE TABLE IF NOT EXISTS portfolio (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  label TEXT NOT NULL,
  category TEXT NOT NULL,
  image_url TEXT DEFAULT '',
  fallback_color TEXT DEFAULT '#1a1a2e',
  featured BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0
);

ALTER TABLE portfolio ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can read portfolio" ON portfolio;
CREATE POLICY "Public can read portfolio" ON portfolio FOR SELECT USING (true);
DROP POLICY IF EXISTS "Auth can manage portfolio" ON portfolio;
CREATE POLICY "Auth can manage portfolio" ON portfolio FOR ALL USING (auth.role() = 'authenticated');

-- Services table
CREATE TABLE IF NOT EXISTS services (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  title TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  display_order INTEGER DEFAULT 0
);

ALTER TABLE services ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can read services" ON services;
CREATE POLICY "Public can read services" ON services FOR SELECT USING (true);

-- Testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  name TEXT NOT NULL,
  comment TEXT,
  rating INTEGER DEFAULT 5,
  image_url TEXT
);

ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can read testimonials" ON testimonials;
CREATE POLICY "Public can read testimonials" ON testimonials FOR SELECT USING (true);

-- Rate Card table
CREATE TABLE IF NOT EXISTS rate_card (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  service TEXT NOT NULL,
  price NUMERIC NOT NULL,
  unit TEXT DEFAULT '',
  display_order INTEGER DEFAULT 0
);

ALTER TABLE rate_card ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can read rate_card" ON rate_card;
CREATE POLICY "Public can read rate_card" ON rate_card FOR SELECT USING (true);
DROP POLICY IF EXISTS "Auth can manage rate_card" ON rate_card;
CREATE POLICY "Auth can manage rate_card" ON rate_card FOR ALL USING (auth.role() = 'authenticated');

-- Hero settings table (with correct column names)
CREATE TABLE IF NOT EXISTS hero_settings (
id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
hero_title TEXT,
hero_subtitle TEXT,
hero_cta_text TEXT,
hero_cta_link TEXT,
hero_image_url TEXT,
site_logo TEXT
);

ALTER TABLE hero_settings ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can read hero" ON hero_settings;
CREATE POLICY "Public can read hero" ON hero_settings FOR SELECT USING (true);

-- Contact submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  service TEXT,
  message TEXT,
  is_read BOOLEAN DEFAULT false
);

ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can insert contact" ON contact_submissions;
CREATE POLICY "Public can insert contact" ON contact_submissions FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "Auth can manage contact" ON contact_submissions;
CREATE POLICY "Auth can manage contact" ON contact_submissions FOR ALL USING (auth.role() = 'authenticated');

-- Add site_logo column if it doesn't exist
DO $$
BEGIN
IF NOT EXISTS (
SELECT 1 FROM information_schema.columns
WHERE table_name = 'hero_settings' AND column_name = 'site_logo'
) THEN
ALTER TABLE hero_settings ADD COLUMN site_logo TEXT;
END IF;
END $$;

-- Insert default hero settings (only if table is empty)
DO $$
BEGIN
IF NOT EXISTS (SELECT 1 FROM hero_settings) THEN
INSERT INTO hero_settings (hero_title, hero_subtitle, hero_cta_text, hero_cta_link, hero_image_url)
VALUES ('Premium Graphic Design', 'Mombasa''s Premier Design Studio', 'View Our Work', '#portfolio', '');
END IF;
END $$;
