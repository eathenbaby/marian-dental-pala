// Track page views and user interactions for business intelligence
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
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
    const { event, page, data } = req.body;

    // Save analytics event
    const { error } = await supabase
      .from('analytics')
      .insert([
        {
          event_type: event,
          page_url: page,
          event_data: data,
          user_agent: req.headers['user-agent'],
          ip_address: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
          created_at: new Date().toISOString()
        }
      ]);

    if (error) {
      console.error('Analytics error:', error);
    }

    return res.status(200).json({ success: true });

  } catch (error) {
    console.error('Analytics error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
