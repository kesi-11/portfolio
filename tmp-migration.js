const { Client } = require('pg');

const client = new Client({
  connectionString: 'postgres://postgres.bzxsjmwwxlgmhjjowexr:4YZI0OrPi9LcMj1a@aws-1-us-east-1.pooler.supabase.com:5432/postgres',
  ssl: { rejectUnauthorized: false }
});

async function run() {
  await client.connect();
  console.log('Connected to Postgres');

  const queries = `
    -- 1. Fix portfolio table
    DO $$
    BEGIN
      IF EXISTS(SELECT * FROM information_schema.columns WHERE table_name='portfolio' and column_name='color') THEN
          ALTER TABLE public.portfolio RENAME COLUMN color TO fallback_color;
      END IF;
    END $$;

    DO $$
    BEGIN
      IF NOT EXISTS(SELECT * FROM information_schema.columns WHERE table_name='portfolio' and column_name='fallback_color') THEN
          ALTER TABLE public.portfolio ADD COLUMN fallback_color TEXT DEFAULT '#1a1a2e';
      END IF;
      
      IF NOT EXISTS(SELECT * FROM information_schema.columns WHERE table_name='portfolio' and column_name='featured') THEN
          ALTER TABLE public.portfolio ADD COLUMN featured BOOLEAN DEFAULT false;
      END IF;

      IF EXISTS(SELECT * FROM information_schema.columns WHERE table_name='portfolio' and column_name='title') THEN
          ALTER TABLE public.portfolio ALTER COLUMN title DROP NOT NULL;
      END IF;
    END $$;

    -- 2. Add 'status' to testimonials
    DO $$
    BEGIN
      IF NOT EXISTS(SELECT * FROM information_schema.columns WHERE table_name='testimonials' and column_name='status') THEN
          ALTER TABLE public.testimonials ADD COLUMN status TEXT DEFAULT 'pending';
      END IF;
    END $$;

    -- Update existing testimonials to be 'approved'
    UPDATE public.testimonials SET status = 'approved' WHERE status = 'pending';

    -- Drop the RLS policy on testimonials that restricts inserts, and add a public insert policy
    DO $$
    BEGIN
      IF EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public can insert testimonials') THEN
        DROP POLICY "Public can insert testimonials" ON public.testimonials;
      END IF;
    END $$;
    CREATE POLICY "Public can insert testimonials" ON public.testimonials FOR INSERT WITH CHECK (true);

    -- 3. Create site_settings table
    CREATE TABLE IF NOT EXISTS public.site_settings (
      id SERIAL PRIMARY KEY,
      about_text1 TEXT DEFAULT 'RichKid Graphix is a Mombasa-based premium design studio built on the belief that every brand deserves world-class visuals — bold, intentional, and unforgettable.',
      about_text2 TEXT DEFAULT 'From street-level poster campaigns to high-end brand identities, I bring a sharp eye, deep craft knowledge, and a relentless pursuit of visual excellence to every project.',
      about_text3 TEXT DEFAULT 'I work with businesses, musicians, creatives, and entrepreneurs who understand that design is not decoration — it''s strategy.',
      about_badge TEXT DEFAULT 'GRAPHIC DESIGNER',
      contact_email TEXT DEFAULT 'hello@richkidgraphix.co.ke',
      contact_whatsapp TEXT DEFAULT '+254 700 000 000',
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );

    -- Insert default row if none exists
    INSERT INTO public.site_settings (id) 
    SELECT 1 
    WHERE NOT EXISTS (SELECT 1 FROM public.site_settings WHERE id = 1);
    
    -- Ensure Row Level Security
    ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
    
    DO $$
    BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public can read site_settings') THEN
        CREATE POLICY "Public can read site_settings" ON public.site_settings FOR SELECT USING (true);
      END IF;
      IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Auth can manage site_settings') THEN
        CREATE POLICY "Auth can manage site_settings" ON public.site_settings FOR ALL USING (auth.role() = 'authenticated');
      END IF;
    END $$;

  `;

  try {
    await client.query(queries);
    console.log('Schema update successful!');
  } catch (err) {
    console.error('Migration failed:', err);
  } finally {
    await client.end();
  }
}

run();
