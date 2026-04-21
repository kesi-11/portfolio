-- Complete Migration Script for RichKid Graphix Portfolio
-- Run this ENTIRE script in Supabase SQL Editor
-- https://bzxsjmwwxlgmhjjowexr.supabase.com

-- ============================================
-- 1. Add site_logo column to hero_settings
-- ============================================
ALTER TABLE hero_settings ADD COLUMN IF NOT EXISTS site_logo TEXT;

-- ============================================
-- 2. Add missing columns to testimonials table
-- ============================================
ALTER TABLE testimonials ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'pending';
ALTER TABLE testimonials ADD COLUMN IF NOT EXISTS role TEXT DEFAULT '';
ALTER TABLE testimonials ADD COLUMN IF NOT EXISTS initials TEXT DEFAULT '';
ALTER TABLE testimonials ADD COLUMN IF NOT EXISTS color TEXT DEFAULT 'bg-amber-600';
ALTER TABLE testimonials ADD COLUMN IF NOT EXISTS display_order INTEGER DEFAULT 0;
ALTER TABLE testimonials ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- ============================================
-- 3. Insert default rate card items
-- ============================================
DO $$
BEGIN
IF NOT EXISTS (SELECT 1 FROM rate_card) THEN
INSERT INTO rate_card (service, price, unit, display_order) VALUES
('Logo Design', 5000, 'project', 1),
('Business Card Design', 3000, 'set', 2),
('Flyer Design', 4000, 'design', 3),
('Poster Design', 5000, 'design', 4),
('Social Media Kit', 8000, 'package', 5),
('Brand Identity', 15000, 'package', 6),
('Banner Design', 3500, 'design', 7),
('Wedding Card Design', 6000, 'design', 8);
END IF;
END $$;

-- ============================================
-- 4. Insert default hero settings
-- ============================================
DO $$
BEGIN
IF NOT EXISTS (SELECT 1 FROM hero_settings) THEN
INSERT INTO hero_settings (hero_title, hero_subtitle, hero_cta_text, hero_cta_link, hero_image_url)
VALUES ('Premium Graphic Design', 'Mombasa''s Premier Design Studio', 'View Our Work', '#portfolio', '');
END IF;
END $$;

-- ============================================
-- Verify migrations
-- ============================================
SELECT 'hero_settings columns' as table_name, column_name FROM information_schema.columns WHERE table_name = 'hero_settings' AND column_name IN ('site_logo')
UNION ALL
SELECT 'testimonials columns', column_name FROM information_schema.columns WHERE table_name = 'testimonials' AND column_name IN ('status', 'role', 'initials', 'color', 'display_order')
UNION ALL
SELECT 'rate_card count', CAST(COUNT(*) AS TEXT) FROM rate_card;
