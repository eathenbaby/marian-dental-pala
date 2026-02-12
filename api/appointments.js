// Vercel Serverless Function for handling appointment requests
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

// Email sending function (using Resend API - free tier: 100 emails/day)
async function sendEmail(appointmentData) {
  if (!process.env.RESEND_API_KEY) {
    console.warn('RESEND_API_KEY not configured - skipping email');
    return { success: false, reason: 'Email not configured' };
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'Marian Dental <appointments@yourdomain.com>',
        to: process.env.CLINIC_EMAIL || 'clinic@example.com',
        subject: `New Appointment Request - ${appointmentData.name}`,
        html: `
          <h2>New Appointment Request</h2>
          <p><strong>Name:</strong> ${appointmentData.name}</p>
          <p><strong>Phone:</strong> ${appointmentData.phone}</p>
          <p><strong>Service:</strong> ${appointmentData.service}</p>
          <p><strong>Preferred Date:</strong> ${appointmentData.date || 'Not specified'}</p>
          <p><strong>Message:</strong> ${appointmentData.message || 'None'}</p>
          <p><strong>Submitted:</strong> ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</p>
        `
      })
    });

    return { success: response.ok };
  } catch (error) {
    console.error('Email error:', error);
    return { success: false, error: error.message };
  }
}

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, phone, service, date, message } = req.body;

    // Validation
    if (!name || !phone || !service) {
      return res.status(400).json({ 
        error: 'Missing required fields',
        required: ['name', 'phone', 'service']
      });
    }

    // Save to Supabase
    const { data, error } = await supabase
      .from('appointments')
      .insert([
        {
          name,
          phone,
          service,
          preferred_date: date,
          message,
          status: 'pending',
          created_at: new Date().toISOString()
        }
      ])
      .select();

    if (error) {
      console.error('Supabase error:', error);
      return res.status(500).json({ 
        error: 'Database error',
        details: error.message 
      });
    }

    // Send email notification
    const emailResult = await sendEmail({ name, phone, service, date, message });

    return res.status(200).json({ 
      success: true,
      message: 'Appointment request received',
      appointmentId: data[0]?.id,
      emailSent: emailResult.success
    });

  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      details: error.message 
    });
  }
}
