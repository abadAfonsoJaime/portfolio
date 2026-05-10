#!/usr/bin/env node

/**
 * Connection Validation Test
 * Tests connectivity to external services using repository secrets
 * Run with: node test/connections.js
 */

const fs = require('fs');
const https = require('https');

function loadEnvFile() {
  try {
    require('dotenv').config({ path: '.env.local' });
  } catch (error) {
    if (!fs.existsSync('.env.local')) {
      return;
    }

    const content = fs.readFileSync('.env.local', 'utf8');
    content.split(/\r?\n/).forEach((line) => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) {
        return;
      }

      const [rawKey, ...rawValue] = trimmed.split('=');
      const key = rawKey.trim();
      let value = rawValue.join('=').trim();

      if (value.startsWith('"') && value.endsWith('"')) {
        value = value.slice(1, -1);
      }

      if (!(key in process.env)) {
        process.env[key] = value;
      }
    });
  }
}

loadEnvFile();

// Test configuration
const tests = [
  {
    name: 'Google Analytics 4',
    envVar: 'NEXT_PUBLIC_GA4_MEASUREMENT_ID',
    test: (value) => {
      if (!value || value === 'G-XXXXXXXXXX') {
        throw new Error('GA4 Measurement ID not configured');
      }
      if (!value.startsWith('G-')) {
        throw new Error('Invalid GA4 Measurement ID format');
      }
      console.log('✓ GA4 Measurement ID format valid');
      return true;
    }
  },
  {
    name: 'Supabase URL',
    envVar: 'NEXT_PUBLIC_SUPABASE_URL',
    test: (value) => {
      if (!value) {
        throw new Error('Supabase URL not configured');
      }
      if (!value.startsWith('https://')) {
        throw new Error('Supabase URL must use HTTPS');
      }
      console.log('✓ Supabase URL format valid');
      return true;
    }
  },
  {
    name: 'Supabase Key',
    envVar: 'NEXT_PUBLIC_SUPABASE_ANON_KEY',
    test: (value) => {
      if (!value) {
        throw new Error('Supabase anon key not configured. Use NEXT_PUBLIC_SUPABASE_ANON_KEY.');
      }
      if (!value.startsWith('sb_')) {
        throw new Error('Invalid Supabase key format');
      }
      console.log('✓ Supabase key format valid');
      return true;
    }
  },
  {
    name: 'EmailJS Service ID',
    envVar: 'NEXT_PUBLIC_EMAILJS_SERVICE_ID',
    test: (value) => {
      if (!value) {
        throw new Error('EmailJS Service ID not configured');
      }
      console.log('✓ EmailJS Service ID configured');
      return true;
    }
  },
  {
    name: 'EmailJS Template ID',
    envVar: 'NEXT_PUBLIC_EMAILJS_TEMPLATE_ID',
    test: (value) => {
      if (!value) {
        throw new Error('EmailJS Template ID not configured');
      }
      console.log('✓ EmailJS Template ID configured');
      return true;
    }
  },
  {
    name: 'EmailJS Public Key',
    envVar: 'NEXT_PUBLIC_EMAILJS_PUBLIC_KEY',
    test: (value) => {
      if (!value) {
        throw new Error('EmailJS Public Key not configured');
      }
      console.log('✓ EmailJS Public Key configured');
      return true;
    }
  }
];

// Load environment variables
require('dotenv').config({ path: '.env.local' });

async function testConnection(service) {
  return new Promise((resolve, reject) => {
    const url = service.envVar === 'NEXT_PUBLIC_SUPABASE_URL'
      ? `${process.env[service.envVar]}/rest/v1/`
      : null;

    if (!url) {
      resolve();
      return;
    }

    const req = https.request(url, { method: 'HEAD' }, (res) => {
      // For Supabase, 401 is expected (authentication required)
      // For other services, 200-399 is success
      const isSuccess = service.envVar === 'NEXT_PUBLIC_SUPABASE_URL'
        ? res.statusCode === 401  // Auth required = service is working
        : res.statusCode >= 200 && res.statusCode < 400;

      if (isSuccess) {
        const msg = service.envVar === 'NEXT_PUBLIC_SUPABASE_URL'
          ? '✓ Supabase endpoint secured (401 expected)'
          : `✓ ${service.name} endpoint reachable`;
        console.log(msg);
        resolve();
      } else {
        reject(new Error(`${service.name} endpoint returned ${res.statusCode}`));
      }
    });

    req.on('error', (err) => {
      reject(new Error(`${service.name} connection failed: ${err.message}`));
    });

    req.setTimeout(5000, () => {
      req.destroy();
      reject(new Error(`${service.name} connection timeout`));
    });

    req.end();
  });
}

async function runTests() {
  console.log('🔍 Validating service connections...\n');

  const results = [];

  for (const test of tests) {
    try {
      const value = process.env[test.envVar];
      test.test(value);
      await testConnection(test);
      results.push({ name: test.name, status: 'PASS' });
    } catch (error) {
      console.error(`❌ ${test.name}: ${error.message}`);
      results.push({ name: test.name, status: 'FAIL', error: error.message });
    }
  }

  console.log('\n📊 Test Results:');
  console.log('================');

  const passed = results.filter(r => r.status === 'PASS').length;
  const total = results.length;

  results.forEach(result => {
    const icon = result.status === 'PASS' ? '✅' : '❌';
    console.log(`${icon} ${result.name}: ${result.status}`);
    if (result.error) {
      console.log(`   Error: ${result.error}`);
    }
  });

  console.log(`\n🎯 Summary: ${passed}/${total} tests passed`);

  if (passed === total) {
    console.log('🎉 All services are properly configured!');
    process.exit(0);
  } else {
    console.log('⚠️  Some services need configuration. Check your .env.local file.');
    process.exit(1);
  }
}

// What can be achieved with these services
console.log('🚀 Service Capabilities Overview:');
console.log('==================================');
console.log('• Google Analytics 4: User tracking, conversion analytics, real-time insights');
console.log('• Supabase: Database storage, real-time subscriptions, authentication');
console.log('• EmailJS: Contact form handling, email notifications');
console.log('• Contentful: Content management, dynamic content updates');
console.log('');

runTests().catch(console.error);