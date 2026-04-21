-- Add site_logo column to hero_settings table
ALTER TABLE hero_settings ADD COLUMN IF NOT EXISTS site_logo TEXT;

-- Verify the column was added
-- SELECT column_name, data_type 
-- FROM information_schema.columns 
-- WHERE table_name = 'hero_settings' AND column_name = 'site_logo';
