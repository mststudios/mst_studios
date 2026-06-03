-- Replace price_calculator_leads with normalized boolean addon columns
DROP POLICY IF EXISTS "Service role can insert calculator leads" ON price_calculator_leads;
DROP TABLE IF EXISTS price_calculator_leads;

CREATE TABLE price_calculator_leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  business_type text,
  needs_extra_pages boolean,
  needs_updates boolean,
  needs_google_business boolean,
  needs_priority_support boolean,
  recommended_package text,
  name text,
  email text,
  availability text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE price_calculator_leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role can insert calculator leads"
  ON price_calculator_leads
  FOR INSERT
  TO service_role
  WITH CHECK (true);
