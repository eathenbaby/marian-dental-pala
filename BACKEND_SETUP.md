# Backend Integration Guide

## Overview
Your site now has a professional serverless backend that justifies the ₹40,000+ price tag.

## What's Included

### 1. API Endpoints
- `/api/appointments` - Handles appointment bookings with database storage
- `/api/contact` - General contact form handler
- `/api/analytics` - Tracks user behavior for business intelligence

### 2. Database Integration (Supabase)
- Free tier: 500MB database, 50,000 monthly active users
- Real-time capabilities
- Built-in authentication (for future admin panel)

### 3. Email Notifications (Resend)
- Free tier: 100 emails/day
- Professional transactional emails
- Delivery tracking

---

## Setup Instructions

### Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up
2. Create a new project (choose Mumbai region for best performance)
3. Wait 2 minutes for setup to complete

### Step 2: Create Database Tables

Go to SQL Editor in Supabase and run:

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

-- Enable Row Level Security (RLS)
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics ENABLE ROW LEVEL SECURITY;

-- Allow inserts from API (using anon key)
CREATE POLICY "Allow public inserts" ON appointments
  FOR INSERT TO anon
  WITH CHECK (true);

CREATE POLICY "Allow public inserts" ON analytics
  FOR INSERT TO anon
  WITH CHECK (true);
```

### Step 3: Get Supabase Credentials

1. Go to Project Settings > API
2. Copy:
   - Project URL (looks like: `https://xxxxx.supabase.co`)
   - `anon` public key (long string starting with `eyJ...`)

### Step 4: Setup Email (Optional but Recommended)

1. Go to [resend.com](https://resend.com) and sign up
2. Add your domain or use their test domain
3. Create an API key
4. Copy the API key (starts with `re_...`)

### Step 5: Configure Vercel Environment Variables

1. Go to your Vercel project dashboard
2. Settings > Environment Variables
3. Add these variables:

```
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_ANON_KEY=eyJhbGc...
RESEND_API_KEY=re_xxxxx
CLINIC_EMAIL=doctor@mariandental.com
```

4. Click "Save" for each variable
5. Redeploy your site (Deployments > ... > Redeploy)

---

## Update Frontend to Use Backend

The Contact.tsx already has commented code ready to use. Uncomment the API call section:

```typescript
// In pages/Contact.tsx, replace the handleSubmit function:

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  try {
    const response = await fetch('/api/appointments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formState)
    });
    
    const result = await response.json();
    
    if (response.ok) {
      setIsSent(true);
      setTimeout(() => {
        setIsSent(false);
        setFormState({ name: '', phone: '', service: 'General Checkup', date: '' });
      }, 5000);
    } else {
      alert('Booking failed. Please try WhatsApp instead.');
    }
  } catch (error) {
    console.error('Submission error:', error);
    alert('Network error. Please try again.');
  }
};
```

---

## Install Required Dependencies

```bash
npm install @supabase/supabase-js
```

---

## Testing

### Local Testing
```bash
npm run dev
```

Visit `http://localhost:3000/contact` and submit the form.

### Check Database
1. Go to Supabase > Table Editor
2. Open `appointments` table
3. You should see your test submission

### Production Testing
After deploying to Vercel, test the live form.

---

## Business Intelligence Features

### View Appointment Dashboard
Go to Supabase > Table Editor > appointments to see:
- All booking requests
- Service popularity
- Peak booking times
- Conversion rates

### Analytics Tracking
Add this to any page to track user behavior:

```typescript
useEffect(() => {
  fetch('/api/analytics', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      event: 'page_view',
      page: window.location.pathname,
      data: { referrer: document.referrer }
    })
  });
}, []);
```

---

## Monthly Maintenance Package (Upsell)

Now you can offer:

1. **Basic Package (₹2,000/month)**
   - Monitor appointment submissions
   - Monthly analytics report
   - Email support

2. **Professional Package (₹5,000/month)**
   - Everything in Basic
   - Content updates (prices, services)
   - WhatsApp integration management
   - Priority support

3. **Enterprise Package (₹10,000/month)**
   - Everything in Professional
   - Custom features on request
   - SEO optimization
   - Social media integration

---

## Future Enhancements

### Admin Dashboard
Create a protected route for the doctor to:
- View all appointments
- Mark as confirmed/completed
- Export data to Excel
- View analytics graphs

### SMS Notifications
Integrate with services like Twilio or MSG91 for:
- Appointment confirmations
- Reminders 24 hours before
- Follow-up messages

### Payment Integration
Add Razorpay for:
- Advance booking fees
- Online consultations
- Treatment packages

---

## Troubleshooting

### "Database error" message
- Check if Supabase tables are created
- Verify RLS policies are set correctly
- Check environment variables in Vercel

### Emails not sending
- Verify RESEND_API_KEY is correct
- Check domain verification in Resend
- Look at Vercel function logs

### CORS errors
- The API routes already have CORS headers
- If issues persist, check Vercel deployment logs

---

## Support

For issues, check:
1. Vercel function logs (Deployments > Functions)
2. Supabase logs (Logs & Analytics)
3. Browser console for frontend errors

---

**This backend infrastructure transforms your site from a simple brochure to a professional business tool worth ₹40,000+.**
