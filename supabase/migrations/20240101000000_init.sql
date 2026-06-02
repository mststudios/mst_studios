CREATE TABLE price_calculator_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  message TEXT,
  selections JSONB,
  total_price INTEGER DEFAULT 0,
  monthly_price INTEGER DEFAULT 0,
  price_estimate TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE cookie_consent (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  status TEXT NOT NULL,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE price_calculator_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE cookie_consent ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role can insert submissions"
  ON price_calculator_submissions
  FOR INSERT
  TO service_role
  WITH CHECK (true);

CREATE POLICY "Service role can insert consent"
  ON cookie_consent
  FOR INSERT
  TO service_role
  WITH CHECK (true);
