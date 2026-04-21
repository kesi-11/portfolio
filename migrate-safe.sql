-- ============================================
-- RichKid Graphix Portfolio - Safe Migration
-- Run this ENTIRE script in Supabase SQL Editor
-- ============================================

-- 1. Add site_logo column to hero_settings (if it doesn't exist)
ALTER TABLE hero_settings ADD COLUMN IF NOT EXISTS site_logo TEXT;

-- 2. Add missing columns to testimonials table (if they don't exist)
ALTER TABLE testimonials ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'pending';
ALTER TABLE testimonials ADD COLUMN IF NOT EXISTS role TEXT DEFAULT '';
ALTER TABLE testimonials ADD COLUMN IF NOT EXISTS initials TEXT DEFAULT '';
ALTER TABLE testimonials ADD COLUMN IF NOT EXISTS color TEXT DEFAULT 'bg-amber-600';
ALTER TABLE testimonials ADD COLUMN IF NOT EXISTS display_order INTEGER DEFAULT 0;
ALTER TABLE testimonials ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- 3. Insert default rate card items (only if not already added)
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
WHERE NOT EXISTS (SELECT 1 FROM rate_card LIMIT 1);

-- ============================================
-- Verify migrations completed
-- ============================================
SELECT 
  'Migration Complete!' as status,
  (SELECT COUNT(*) FROM rate_card) as rate_card_items,
  (SELECT COUNT(*) FROM testimonials) as testimonials_count;
