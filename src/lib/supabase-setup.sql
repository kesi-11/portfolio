-- Portfolio table for RichKid Graphix
-- Run this in Supabase Dashboard → SQL Editor

-- Create portfolio table
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

-- Enable row level security
ALTER TABLE portfolio ENABLE ROW LEVEL SECURITY;

-- Public can read
CREATE POLICY "Public can read portfolio" ON portfolio
  FOR SELECT USING (true);

-- Authenticated can insert/update/delete
CREATE POLICY "Auth can manage portfolio" ON portfolio
  FOR ALL USING (auth.role() = 'authenticated');

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

CREATE POLICY "Public can read services" ON services
  FOR SELECT USING (true);

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

CREATE POLICY "Public can read testimonials" ON testimonials
  FOR SELECT USING (true);

-- Hero settings table
CREATE TABLE IF NOT EXISTS hero_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT,
  subtitle TEXT,
  cta_text TEXT,
  cta_link TEXT
);

ALTER TABLE hero_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read hero" ON hero_settings
  FOR SELECT USING (true);

-- Insert default hero settings
INSERT INTO hero_settings (title, subtitle, cta_text, cta_link)
VALUES ('Premium Graphic Design', 'Mombasa''s Premier Design Studio', 'View Our Work', '#portfolio')
ON CONFLICT DO NOTHING;

-- Contact submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  message TEXT,
  read BOOLEAN DEFAULT false
);

ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can insert contact" ON contact_submissions
  FOR INSERT WITH CHECK (true);