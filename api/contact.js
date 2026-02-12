// Simple contact form handler (alternative to appointments)
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
    const { name, email, phone, message } = req.body;

    // Basic validation
    if (!name || !message || (!email && !phone)) {
      return res.status(400).json({ 
        error: 'Missing required fields' 
      });
    }

    // Log the contact (you can add database/email logic here)
    console.log('Contact form submission:', { name, email, phone, message });

    // Send to WhatsApp as fallback
    const whatsappMessage = `New Contact Form:\nName: ${name}\nEmail: ${email || 'N/A'}\nPhone: ${phone || 'N/A'}\nMessage: ${message}`;
    
    return res.status(200).json({ 
      success: true,
      message: 'Message received',
      whatsappUrl: `https://wa.me/918848198200?text=${encodeURIComponent(whatsappMessage)}`
    });

  } catch (error) {
    console.error('Contact form error:', error);
    return res.status(500).json({ 
      error: 'Internal server error' 
    });
  }
}
