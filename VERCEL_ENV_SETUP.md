# Vercel Environment Variables Setup

## 🚀 Quick Copy-Paste for Vercel Dashboard

Go to your Vercel project → Settings → Environment Variables

Add these 4 variables:

---

### Variable 1: SUPABASE_URL
```
https://agnfndxmlmwrhhnjsdzb.supabase.co
```

---

### Variable 2: SUPABASE_ANON_KEY
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFnbmZuZHhtbG13cmhobmpzZHpiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA4MzY4MjksImV4cCI6MjA4NjQxMjgyOX0.c9rEEtqpraTXFZeIJCEKhY947NjRyFxk5tyOwlqwNOE
```

---

### Variable 3: RESEND_API_KEY
```
re_iRui48k8_NJGNhAYd5aMq3G6Zqpuq9hmC
```

---

### Variable 4: CLINIC_EMAIL
```
doctor@mariandental.com
```

---

## 📋 Step-by-Step Instructions

1. **Go to Vercel Dashboard**
   - Visit https://vercel.com/dashboard
   - Click on your "new-marian-dental-clinic" project

2. **Open Settings**
   - Click "Settings" tab at the top
   - Click "Environment Variables" in the left sidebar

3. **Add Each Variable**
   For each variable above:
   - Click "Add New" button
   - Paste the variable name (e.g., `SUPABASE_URL`)
   - Paste the value
   - Select all environments: Production, Preview, Development
   - Click "Save"

4. **Redeploy**
   - Go to "Deployments" tab
   - Click "..." menu on the latest deployment
   - Click "Redeploy"
   - Wait for deployment to complete (~2 minutes)

---

## ✅ Verification

After redeploying, test the API:

### Method 1: Browser Console
1. Visit your live site
2. Press F12 to open console
3. Paste this code:

```javascript
fetch('/api/appointments', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'Test Patient',
    phone: '9876543210',
    service: 'General Checkup'
  })
})
.then(r => r.json())
.then(data => {
  console.log('✅ Success:', data);
  alert('Backend is working! Check Supabase for the test appointment.');
})
.catch(err => {
  console.error('❌ Error:', err);
  alert('Backend error - check Vercel function logs');
});
```

### Method 2: Contact Form
1. Go to your site's /contact page
2. Fill out the appointment form
3. Submit
4. Check Supabase Table Editor for the new entry

---

## 🔍 Troubleshooting

### If API returns error:

1. **Check Vercel Function Logs**
   - Vercel Dashboard → Deployments → Click latest
   - Click "Functions" tab
   - Look for errors in `/api/appointments`

2. **Verify Environment Variables**
   - Settings → Environment Variables
   - Make sure all 4 variables are set
   - Check for typos or extra spaces

3. **Check Supabase Tables**
   - Go to https://supabase.com/dashboard
   - Open your project
   - Table Editor → Check if `appointments` table exists
   - If not, run the SQL from BACKEND_SETUP.md

4. **Redeploy Again**
   - Sometimes environment variables need a fresh deploy
   - Deployments → Redeploy

---

## 📧 Email Testing

To test if emails are working:

1. Submit a test appointment
2. Check the email: doctor@mariandental.com
3. You should receive a notification

If no email arrives:
- Check Resend dashboard for delivery status
- Verify RESEND_API_KEY is correct
- Check spam folder
- Note: Site works fine without email, it's optional

---

## 🎯 Next Steps After Setup

1. ✅ Verify backend is working
2. ✅ Update Contact.tsx to use API (uncomment the code)
3. ✅ Test on mobile device
4. ✅ Show client the working demo
5. ✅ Collect payment!

---

## 📱 Quick Test Checklist

- [ ] Environment variables added to Vercel
- [ ] Site redeployed successfully
- [ ] API test in browser console works
- [ ] Contact form submission works
- [ ] Data appears in Supabase
- [ ] Email notification received (optional)
- [ ] Mobile version tested
- [ ] Ready for client demo!

---

**Your backend is now configured! Time to test and demo to the client. 🚀**
