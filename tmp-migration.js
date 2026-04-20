const { Client } = require('pg');

const client = new Client({
  connectionString: 'postgres://postgres.bzxsjmwwxlgmhjjowexr:4YZI0OrPi9LcMj1a@aws-1-us-east-1.pooler.supabase.com:5432/postgres',
  ssl: { rejectUnauthorized: false }
});

async function run() {
  await client.connect();
  console.log('Connected to Postgres');

  const queries = `
    -- 1. Add image columns
    DO $$
    BEGIN
      IF NOT EXISTS(SELECT * FROM information_schema.columns WHERE table_name='hero_settings' and column_name='hero_image_url') THEN
          ALTER TABLE public.hero_settings ADD COLUMN hero_image_url TEXT DEFAULT '';
      END IF;
      
      IF NOT EXISTS(SELECT * FROM information_schema.columns WHERE table_name='site_settings' and column_name='about_image_url') THEN
          ALTER TABLE public.site_settings ADD COLUMN about_image_url TEXT DEFAULT '';
      END IF;
    END $$;

    -- 2. Grant FULL anon access to frontend tables (NextJS API handles auth now)
    
    -- Function to safely drop a policy if it exists
    CREATE OR REPLACE FUNCTION drop_policy_if_exists(policy_name text, table_name text) RETURNS void AS $$
    BEGIN
      EXECUTE format('DROP POLICY IF EXISTS %I ON public.%I', policy_name, table_name);
    EXCEPTION
      WHEN undefined_object THEN
        NULL;
    END;
    $$ LANGUAGE plpgsql;

    -- Hero Settings
    SELECT drop_policy_if_exists('Auth can manage hero', 'hero_settings');
    SELECT drop_policy_if_exists('Public can read hero_settings', 'hero_settings');
    SELECT drop_policy_if_exists('Anon can manage hero', 'hero_settings');
    CREATE POLICY "Anon can manage hero" ON public.hero_settings FOR ALL USING (true) WITH CHECK (true);

    -- Site Settings
    SELECT drop_policy_if_exists('Auth can manage site_settings', 'site_settings');
    SELECT drop_policy_if_exists('Public can read site_settings', 'site_settings');
    SELECT drop_policy_if_exists('Anon can manage site_settings', 'site_settings');
    CREATE POLICY "Anon can manage site_settings" ON public.site_settings FOR ALL USING (true) WITH CHECK (true);

    -- Portfolio
    SELECT drop_policy_if_exists('Auth can manage portfolio', 'portfolio');
    SELECT drop_policy_if_exists('Public can read portfolio', 'portfolio');
    SELECT drop_policy_if_exists('Anon can manage portfolio', 'portfolio');
    CREATE POLICY "Anon can manage portfolio" ON public.portfolio FOR ALL USING (true) WITH CHECK (true);

    -- Services
    SELECT drop_policy_if_exists('Auth can manage services', 'services');
    SELECT drop_policy_if_exists('Public can read services', 'services');
    SELECT drop_policy_if_exists('Anon can manage services', 'services');
    CREATE POLICY "Anon can manage services" ON public.services FOR ALL USING (true) WITH CHECK (true);

    -- Testimonials
    SELECT drop_policy_if_exists('Auth can manage testimonials', 'testimonials');
    SELECT drop_policy_if_exists('Public can read testimonials', 'testimonials');
    SELECT drop_policy_if_exists('Public can insert testimonials', 'testimonials');
    SELECT drop_policy_if_exists('Anon can manage testimonials', 'testimonials');
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
