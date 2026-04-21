-- Migration for testimonials table - Add missing columns
-- Run this in Supabase SQL Editor

-- Add status column for approval workflow
ALTER TABLE testimonials ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'pending';

-- Add role column for client's role/company
ALTER TABLE testimonials ADD COLUMN IF NOT EXISTS role TEXT DEFAULT '';

-- Add initials column for avatar
ALTER TABLE testimonials ADD COLUMN IF NOT EXISTS initials TEXT DEFAULT '';

-- Add color column for avatar background
ALTER TABLE testimonials ADD COLUMN IF NOT EXISTS color TEXT DEFAULT 'bg-amber-600';

-- Add display_order for sorting
ALTER TABLE testimonials ADD COLUMN IF NOT EXISTS display_order INTEGER DEFAULT 0;

-- Verify columns were added
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'testimonials' 
ORDER BY ordinal_position;
