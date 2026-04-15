-- Create Portfolio table
CREATE TABLE IF NOT EXISTS portfolio (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  label TEXT,
  color TEXT,
  image_url TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Services table
CREATE TABLE IF NOT EXISTS services (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  price TEXT NOT NULL,
  description TEXT,
  features TEXT[],
  is_featured BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  initials TEXT,
  color TEXT,
  text TEXT NOT NULL,
  rating INTEGER DEFAULT 5,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Contact Submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  service TEXT,
  message TEXT,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Hero Settings table
CREATE TABLE IF NOT EXISTS hero_settings (
  id SERIAL PRIMARY KEY,
  headline TEXT,
  subheadline TEXT,
  stat1_label TEXT,
  stat1_value TEXT,
  stat2_label TEXT,
  stat2_value TEXT,
  stat3_label TEXT,
  stat3_value TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default hero settings
INSERT INTO hero_settings (headline, subheadline, stat1_label, stat1_value, stat2_label, stat2_value, stat3_label, stat3_value)
SELECT 'Visuals That Command Attention.', 'RichKid Graphix crafts premium brand identities, poster designs, and visual systems that make your brand impossible to ignore.', 'Projects Delivered', '150+', 'Happy Clients', '80+', 'Average Rating', '5'
WHERE NOT EXISTS (SELECT 1 FROM hero_settings LIMIT 1);

-- Enable RLS
ALTER TABLE portfolio ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE hero_settings ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Public can read portfolio" ON portfolio FOR SELECT USING (true);
CREATE POLICY "Public can read services" ON services FOR SELECT USING (true);
CREATE POLICY "Public can read testimonials" ON testimonials FOR SELECT USING (true);
CREATE POLICY "Public can read contact_submissions" ON contact_submissions FOR SELECT USING (true);
CREATE POLICY "Public can read hero_settings" ON hero_settings FOR SELECT USING (true);

-- Allow authenticated insert for contact form
CREATE POLICY "Anyone can insert contact" ON contact_submissions FOR INSERT WITH CHECK (true);