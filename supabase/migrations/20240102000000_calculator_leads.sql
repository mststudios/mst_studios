CREATE TABLE IF NOT EXISTS price_calculator_leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT,
  business_type TEXT,
  selected_addons JSONB DEFAULT '[]'::jsonb,
  recommended_package TEXT,
  email TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE price_calculator_leads ADD COLUMN IF NOT EXISTS name TEXT;

ALTER TABLE price_calculator_leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role can insert calculator leads"
  ON price_calculator_leads
  FOR INSERT
  TO service_role
  WITH CHECK (true);
