# API Documentation

## Overview
These serverless functions run on Vercel and handle backend operations for the Marian Dental Clinic website.

---

## Endpoints

### 1. POST /api/appointments
Handles appointment booking requests.

**Request Body**:
```json
{
  "name": "Rajesh Kumar",
  "phone": "9876543210",
  "service": "Dental Implants",
  "date": "2024-03-15",
  "message": "I have tooth pain"
}
```

**Response (Success)**:
```json
{
  "success": true,
  "message": "Appointment request received",
  "appointmentId": "uuid-here",
  "emailSent": true
}
```

**Response (Error)**:
```json
{
  "error": "Missing required fields",
  "required": ["name", "phone", "service"]
}
```

**What it does**:
1. Validates required fields
2. Saves to Supabase `appointments` table
3. Sends email notification to clinic
4. Returns confirmation

---

### 2. POST /api/contact
General contact form handler.

**Request Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "9876543210",
  "message": "I have a question about pricing"
}
```

**Response**:
```json
{
  "success": true,
  "message": "Message received",
  "whatsappUrl": "https://wa.me/918848198200?text=..."
}
```

**What it does**:
1. Validates input
2. Logs the contact request
3. Returns WhatsApp URL as fallback

---

### 3. POST /api/analytics
Tracks user behavior and page views.

**Request Body**:
```json
{
  "event": "page_view",
  "page": "/services",
  "data": {
    "referrer": "https://google.com",
    "device": "mobile"
  }
}
```

**Response**:
```json
{
  "success": true
}
```

**What it does**:
1. Saves event to Supabase `analytics` table
2. Captures user agent and IP
3. Stores custom event data

---

## Testing Locally

### Using cURL

**Test Appointments**:
```bash
curl -X POST http://localhost:3000/api/appointments \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Patient",
    "phone": "9876543210",
    "service": "General Checkup"
  }'
```

**Test Contact**:
```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "message": "Test message"
  }'
```

**Test Analytics**:
```bash
curl -X POST http://localhost:3000/api/analytics \
  -H "Content-Type: application/json" \
  -d '{
    "event": "page_view",
    "page": "/home"
  }'
```

### Using JavaScript (Browser Console)

```javascript
// Test appointment booking
fetch('/api/appointments', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'Test Patient',
    phone: '9876543210',
    service: 'Root Canal'
  })
})
.then(r => r.json())
.then(console.log);

// Test analytics
fetch('/api/analytics', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    event: 'button_click',
    page: window.location.pathname,
    data: { button: 'Book Appointment' }
  })
})
.then(r => r.json())
.then(console.log);
```

---

## Environment Variables Required

```env
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_ANON_KEY=eyJhbGc...
RESEND_API_KEY=re_xxxxx (optional)
CLINIC_EMAIL=doctor@mariandental.com
```

---

## Error Handling

All endpoints return appropriate HTTP status codes:
- `200` - Success
- `400` - Bad request (missing fields)
- `405` - Method not allowed (not POST)
- `500` - Server error

---

## CORS Configuration

All endpoints have CORS enabled for cross-origin requests:
```javascript
res.setHeader('Access-Control-Allow-Origin', '*');
res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
```

---

## Database Schema

### appointments table
```sql
id              UUID PRIMARY KEY
name            TEXT NOT NULL
phone           TEXT NOT NULL
service         TEXT NOT NULL
preferred_date  TEXT
message         TEXT
status          TEXT DEFAULT 'pending'
created_at      TIMESTAMP
```

### analytics table
```sql
id              UUID PRIMARY KEY
event_type      TEXT NOT NULL
page_url        TEXT
event_data      JSONB
user_agent      TEXT
ip_address      TEXT
created_at      TIMESTAMP
```

---

## Monitoring

### View Logs in Vercel
1. Go to your project dashboard
2. Click "Deployments"
3. Click on latest deployment
4. Click "Functions" tab
5. Click on any function to see logs

### View Data in Supabase
1. Go to Supabase dashboard
2. Click "Table Editor"
3. Select `appointments` or `analytics` table
4. View all records

---

## Rate Limiting

Vercel free tier limits:
- 100 GB bandwidth/month
- 100 GB-hours compute/month
- 6,000 function invocations/day

For production, consider:
- Adding rate limiting middleware
- Implementing request throttling
- Caching frequent requests

---

## Security Best Practices

1. **Never expose API keys in frontend code**
   - Use environment variables
   - Keep `.env.local` in `.gitignore`

2. **Validate all inputs**
   - Check required fields
   - Sanitize user input
   - Prevent SQL injection (Supabase handles this)

3. **Use Row Level Security (RLS)**
   - Already configured in setup SQL
   - Prevents unauthorized data access

4. **Monitor for abuse**
   - Check Vercel function logs
   - Set up alerts for unusual activity

---

## Future Enhancements

### Add Authentication
```javascript
// Protect admin endpoints
const { user } = await supabase.auth.getUser(req.headers.authorization);
if (!user) return res.status(401).json({ error: 'Unauthorized' });
```

### Add Rate Limiting
```javascript
// Simple rate limiting
const rateLimit = new Map();
const ip = req.headers['x-forwarded-for'];
if (rateLimit.get(ip) > 10) {
  return res.status(429).json({ error: 'Too many requests' });
}
```

### Add Webhooks
```javascript
// Notify external services
await fetch('https://your-crm.com/webhook', {
  method: 'POST',
  body: JSON.stringify(appointmentData)
});
```

---

## Support

For issues:
1. Check Vercel function logs
2. Verify environment variables
3. Test with cURL first
4. Check Supabase logs
5. Review browser console errors

---

**These APIs transform your static site into a dynamic business tool!**
