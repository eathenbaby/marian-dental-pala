# Quick Start Guide - Backend Integration

## 🚀 5-Minute Setup

### Step 1: Install Dependencies
```bash
npm install
```

This will install the new `@supabase/supabase-js` package.

### Step 2: Create Supabase Account
1. Go to https://supabase.com
2. Sign up with GitHub or email
3. Click "New Project"
4. Choose:
   - Name: `marian-dental`
   - Database Password: (save this!)
   - Region: `Mumbai (ap-south-1)` for best India performance
5. Wait 2 minutes for setup

### Step 3: Create Database Tables
1. In Supabase, go to "SQL Editor"
2. Click "New Query"
3. Copy-paste this SQL:

```sql
-- Appointments table
CREATE TABLE appointments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  service TEXT NOT NULL,
  preferred_date TEXT,
  message TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Analytics table
CREATE TABLE analytics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  event_type TEXT NOT NULL,
  page_url TEXT,
  event_data JSONB,
  user_agent TEXT,
  ip_address TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics ENABLE ROW LEVEL SECURITY;

-- Allow public inserts (API can write)
CREATE POLICY "Allow public inserts" ON appointments
  FOR INSERT TO anon
  WITH CHECK (true);

CREATE POLICY "Allow public inserts" ON analytics
  FOR INSERT TO anon
  WITH CHECK (true);
```

4. Click "Run" (bottom right)
5. You should see "Success. No rows returned"

### Step 4: Get Supabase Credentials
1. Go to "Project Settings" (gear icon)
2. Click "API" in sidebar
3. Copy these two values:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon public key**: Long string starting with `eyJ...`

### Step 5: Setup Email (Optional)
1. Go to https://resend.com
2. Sign up (free tier: 100 emails/day)
3. Add domain or use test domain
4. Create API key
5. Copy the key (starts with `re_...`)

### Step 6: Configure Vercel
1. Go to your Vercel project
2. Settings > Environment Variables
3. Add these 4 variables:

```
Name: SUPABASE_URL
Value: https://xxxxx.supabase.co

Name: SUPABASE_ANON_KEY
Value: eyJhbGc...

Name: RESEND_API_KEY
Value: re_xxxxx

Name: CLINIC_EMAIL
Value: doctor@mariandental.com
```

4. Click "Save" for each
5. Go to "Deployments" tab
6. Click "..." on latest deployment
7. Click "Redeploy"

### Step 7: Test It!
1. Visit your live site
2. Go to `/contact` page
3. Fill out the appointment form
4. Submit
5. Check Supabase > Table Editor > appointments
6. You should see your test entry!

---

## 🎯 What You Just Built

### 3 API Endpoints
- `/api/appointments` - Saves bookings to database + sends email
- `/api/contact` - General contact form handler
- `/api/analytics` - Tracks user behavior

### Admin Dashboard
- Visit `/admin` on your site
- See all appointments in one place
- Track statistics

### Business Intelligence
- Every booking saved to database
- Email notifications to clinic
- Analytics tracking ready

---

## 🔧 Troubleshooting

### "Database error" when submitting form
- Check if SQL commands ran successfully in Supabase
- Verify environment variables are correct in Vercel
- Check Vercel function logs (Deployments > Functions)

### Emails not sending
- Verify RESEND_API_KEY is correct
- Check domain verification in Resend
- Emails work without this - it's optional

### Can't see appointments in admin
- Make sure you submitted a test booking
- Check Supabase Table Editor directly
- Admin dashboard needs additional API endpoint (coming soon)

---

## 📊 Next Steps

### 1. Update Contact Form
In `pages/Contact.tsx`, uncomment the API call:

```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  try {
    const response = await fetch('/api/appointments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formState)
    });
    
    if (response.ok) {
      setIsSent(true);
      setTimeout(() => {
        setIsSent(false);
        setFormState({ name: '', phone: '', service: 'General Checkup', date: '' });
      }, 5000);
    }
  } catch (error) {
    console.error('Submission error:', error);
  }
};
```

### 2. Add Analytics Tracking
In any page component:

```typescript
useEffect(() => {
  fetch('/api/analytics', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      event: 'page_view',
      page: window.location.pathname
    })
  });
}, []);
```

### 3. Build Admin Features
- Add authentication (Supabase Auth)
- Create appointment management UI
- Add export to Excel functionality
- Build analytics dashboards

---

## 💰 Pricing Justification

With this backend, you can now charge:
- **Initial Build**: ₹40,000 (justified by professional backend)
- **Monthly Maintenance**: ₹2,000-₹10,000 (manage database, analytics, updates)

See `PRICING_JUSTIFICATION.md` for full breakdown.

---

## 📚 Additional Resources

- Full setup guide: `BACKEND_SETUP.md`
- Pricing strategy: `PRICING_JUSTIFICATION.md`
- Supabase docs: https://supabase.com/docs
- Resend docs: https://resend.com/docs

---

**You now have a professional, scalable backend that justifies premium pricing! 🎉**
