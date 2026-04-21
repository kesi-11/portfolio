const { Client } = require('pg');

const client = new Client({
  connectionString: 'postgres://postgres.bzxsjmwwxlgmhjjowexr:4YZI0OrPi9LcMj1a@aws-1-us-east-1.pooler.supabase.com:5432/postgres',
  ssl: { rejectUnauthorized: false }
});

async function run() {
  await client.connect();
  console.log('Connected to Postgres');

  const queries = `
    CREATE TABLE IF NOT EXISTS public.site_settings (
        id SERIAL PRIMARY KEY,
        about_text1 TEXT,
        about_text2 TEXT,
        about_text3 TEXT,
        about_badge TEXT,
        contact_email TEXT,
        contact_whatsapp TEXT,
        about_image_url TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );

    INSERT INTO public.site_settings (about_text1, contact_email, contact_whatsapp)
    SELECT 'Welcome to RichKid Graphix', 'hello@richkid.com', '+254700000000'
    WHERE NOT EXISTS (SELECT 1 FROM public.site_settings LIMIT 1);

    ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
    
    DO $$ BEGIN
        DROP POLICY IF EXISTS "Anon can manage site_settings" ON public.site_settings;
        DROP POLICY IF EXISTS "Auth can manage site_settings" ON public.site_settings;
        DROP POLICY IF EXISTS "Public can read site_settings" ON public.site_settings;
    EXCEPTION WHEN OTHERS THEN NULL;
    END $$;

    CREATE POLICY "Anon can manage site_settings" ON public.site_settings FOR ALL USING (true) WITH CHECK (true);

    DO $$ BEGIN
        DROP POLICY IF EXISTS "Anon can manage testimonials" ON public.testimonials;
        DROP POLICY IF EXISTS "Auth can manage testimonials" ON public.testimonials;
        DROP POLICY IF EXISTS "Public can read testimonials" ON public.testimonials;
        DROP POLICY IF EXISTS "Public can insert testimonials" ON public.testimonials;
    EXCEPTION WHEN OTHERS THEN NULL;
    END $$;

    CREATE POLICY "Anon can manage testimonials" ON public.testimonials FOR ALL USING (true) WITH CHECK (true);
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
