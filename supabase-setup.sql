-- Marian Dental Clinic - Database Setup
-- Run this in Supabase SQL Editor

-- ============================================
-- 1. CREATE APPOINTMENTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS appointments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  service TEXT NOT NULL,
  preferred_date TEXT,
  message TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 2. CREATE ANALYTICS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS analytics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  event_type TEXT NOT NULL,
  page_url TEXT,
  event_data JSONB,
  user_agent TEXT,
  ip_address TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 3. ENABLE ROW LEVEL SECURITY
-- ============================================
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics ENABLE ROW LEVEL SECURITY;

-- ============================================
-- 4. CREATE POLICIES FOR PUBLIC ACCESS
-- ============================================

-- Allow anyone to insert appointments (for booking form)
CREATE POLICY "Allow public inserts on appointments" 
ON appointments
FOR INSERT 
TO anon
WITH CHECK (true);

-- Allow anyone to insert analytics (for tracking)
CREATE POLICY "Allow public inserts on analytics" 
ON analytics
FOR INSERT 
TO anon
WITH CHECK (true);

-- Allow authenticated users to read appointments (for admin dashboard)
CREATE POLICY "Allow authenticated reads on appointments" 
ON appointments
FOR SELECT 
TO authenticated
USING (true);

-- Allow authenticated users to update appointments (for status changes)
CREATE POLICY "Allow authenticated updates on appointments" 
ON appointments
FOR UPDATE 
TO authenticated
USING (true);

-- ============================================
-- 5. CREATE INDEXES FOR PERFORMANCE
-- ============================================
CREATE INDEX IF NOT EXISTS idx_appointments_created_at 
ON appointments(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_appointments_status 
ON appointments(status);

CREATE INDEX IF NOT EXISTS idx_analytics_created_at 
ON analytics(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_analytics_event_type 
ON analytics(event_type);

-- ============================================
-- 6. INSERT SAMPLE DATA (OPTIONAL - FOR TESTING)
-- ============================================
INSERT INTO appointments (name, phone, service, message, status) VALUES
  ('Rajesh Kumar', '9876543210', 'Dental Implants', 'Need consultation for implants', 'pending'),
  ('Priya Sharma', '9876543211', 'Root Canal Treatment', 'Tooth pain for 2 days', 'confirmed'),
  ('Amit Patel', '9876543212', 'General Checkup', 'Regular checkup', 'completed');

-- ============================================
-- 7. CREATE VIEW FOR STATISTICS (OPTIONAL)
-- ============================================
CREATE OR REPLACE VIEW appointment_stats AS
SELECT 
  COUNT(*) as total_appointments,
  COUNT(*) FILTER (WHERE status = 'pending') as pending_count,
  COUNT(*) FILTER (WHERE status = 'confirmed') as confirmed_count,
  COUNT(*) FILTER (WHERE status = 'completed') as completed_count,
  COUNT(*) FILTER (WHERE created_at > NOW() - INTERVAL '7 days') as this_week,
  COUNT(*) FILTER (WHERE created_at > NOW() - INTERVAL '30 days') as this_month
FROM appointments;

-- ============================================
-- VERIFICATION QUERIES
-- ============================================

-- Check if tables were created
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('appointments', 'analytics');

-- Check appointments
SELECT * FROM appointments ORDER BY created_at DESC LIMIT 5;

-- Check statistics
SELECT * FROM appointment_stats;

-- ============================================
-- SUCCESS MESSAGE
-- ============================================
DO $$
BEGIN
  RAISE NOTICE '✅ Database setup complete!';
  RAISE NOTICE '📋 Tables created: appointments, analytics';
  RAISE NOTICE '🔒 Row Level Security enabled';
  RAISE NOTICE '🚀 Ready to receive bookings!';
END $$;
