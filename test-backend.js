// Quick test script for backend integration
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://agnfndxmlmwrhhnjsdzb.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFnbmZuZHhtbG13cmhobmpzZHpiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA4MzY4MjksImV4cCI6MjA4NjQxMjgyOX0.c9rEEtqpraTXFZeIJCEKhY947NjRyFxk5tyOwlqwNOE';

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  console.log('🧪 Testing Supabase Connection...\n');

  try {
    // Test 1: Insert test appointment
    console.log('Test 1: Inserting test appointment...');
    const { data: insertData, error: insertError } = await supabase
      .from('appointments')
      .insert([
        {
          name: 'Test Patient',
          phone: '9876543210',
          service: 'General Checkup',
          message: 'This is a test booking',
          status: 'pending'
        }
      ])
      .select();

    if (insertError) {
      console.error('❌ Insert failed:', insertError.message);
      return;
    }
    console.log('✅ Insert successful! ID:', insertData[0].id);

    // Test 2: Read appointments
    console.log('\nTest 2: Reading appointments...');
    const { data: readData, error: readError } = await supabase
      .from('appointments')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(5);

    if (readError) {
      console.error('❌ Read failed:', readError.message);
      return;
    }
    console.log(`✅ Read successful! Found ${readData.length} appointments`);
    console.log('\nRecent appointments:');
    readData.forEach((apt, i) => {
      console.log(`${i + 1}. ${apt.name} - ${apt.service} (${apt.status})`);
    });

    // Test 3: Analytics tracking
    console.log('\nTest 3: Inserting analytics event...');
    const { data: analyticsData, error: analyticsError } = await supabase
      .from('analytics')
      .insert([
        {
          event_type: 'test_event',
          page_url: '/test',
          event_data: { test: true }
        }
      ])
      .select();

    if (analyticsError) {
      console.error('❌ Analytics insert failed:', analyticsError.message);
      return;
    }
    console.log('✅ Analytics tracking successful!');

    console.log('\n🎉 All tests passed! Backend is ready to use.');
    console.log('\n📋 Next steps:');
    console.log('1. Add these environment variables to Vercel');
    console.log('2. Redeploy your site');
    console.log('3. Test the contact form on the live site');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testConnection();
