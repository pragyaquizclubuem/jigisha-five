/**
 * Email Template Preview Script
 * 
 * Renders all 4 email templates with dummy data and opens them in the browser.
 * Run with: npx tsx scripts/preview-emails.ts
 */

import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';
import { execSync } from 'child_process';

// Set application asset prefix environment variable for local preview loading
process.env.NEXT_PUBLIC_APP_URL = '../public';

async function run() {
  // Import email template builders dynamically after setting the env variable
  const { buildIndividualRegistrationEmail, buildSchoolRegistrationEmail } = await import('../lib/email-templates/registration');
  const { buildLeadEmail, buildAutoResponder } = await import('../lib/email-templates/contact');

  // ── Output directory ──
  const outputDir = join(process.cwd(), '.email-previews');
  if (!existsSync(outputDir)) {
    mkdirSync(outputDir, { recursive: true });
  }

  console.log('📧 Generating email previews...\n');

// ── 1. Individual Registration Confirmation ──
const individualEmail = buildIndividualRegistrationEmail({
  studentName: 'Arjun Chakraborty',
  schoolName: 'St. Xavier\'s Collegiate School',
  classVal: 'IX',
  dobStr: new Date(2011, 5, 15).toISOString(),
  mobileNumber: '+91 9876543210',
  altMobileNumber: '+91 9123456789',
});

const individualPath = join(outputDir, '01-individual-registration.html');
writeFileSync(individualPath, individualEmail, 'utf-8');
console.log('  ✅ Individual Registration Email → 01-individual-registration.html');

// ── 2. School Registration Confirmation ──
const schoolEmail = buildSchoolRegistrationEmail({
  contactName: 'Mr. Rajesh Kumar',
  schoolName: 'Don Bosco School, Park Circus',
  mobileNumber: '+91 9876543210',
  students: [
    { name: 'Rahul Sharma', class: 'VIII', age: '13' },
    { name: 'Sneha Gupta', class: 'IX', age: '14' },
    { name: 'Amit Roy', class: 'VII', age: '12' },
    { name: 'Priya Das', class: 'X', age: '15' },
  ],
});

const schoolPath = join(outputDir, '02-school-registration.html');
writeFileSync(schoolPath, schoolEmail, 'utf-8');
console.log('  ✅ School Registration Email   → 02-school-registration.html');

// ── 3. Contact Lead Notification (to owner) ──
const leadEmail = buildLeadEmail({
  name: 'Supriyo Banerjee',
  email: 'supriyo@example.com',
  phone: '+91 9831324865',
  message: 'Hello Jigisha Team!\n\nI wanted to know more about the sponsorship opportunities for Jigisha 5.0. Our company is interested in partnering with you for this edition.\n\nLooking forward to hearing from you.',
  receivedAt: new Date().toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'long',
    timeStyle: 'short',
  }),
});

const leadPath = join(outputDir, '03-contact-lead.html');
writeFileSync(leadPath, leadEmail, 'utf-8');
console.log('  ✅ Contact Lead Email          → 03-contact-lead.html');

// ── 4. Contact Auto-Responder (to visitor) ──
const autoResponderEmail = buildAutoResponder({
  name: 'Supriyo Banerjee',
  message: 'Hello Jigisha Team!\n\nI wanted to know more about the sponsorship opportunities for Jigisha 5.0. Our company is interested in partnering with you for this edition.\n\nLooking forward to hearing from you.',
  senderName: 'Barshan Banerjee',
});

const autoResponderPath = join(outputDir, '04-contact-auto-responder.html');
writeFileSync(autoResponderPath, autoResponderEmail, 'utf-8');
console.log('  ✅ Contact Auto-Responder Email → 04-contact-auto-responder.html');

// ── Create an index page ──
const indexHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Email Template Previews</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Helvetica Neue', sans-serif; background: #1a1a2e; color: #fff; min-height: 100vh; padding: 60px 20px; }
    .container { max-width: 700px; margin: 0 auto; }
    h1 { font-size: 36px; font-weight: 800; margin-bottom: 8px; }
    p.sub { color: #888; margin-bottom: 40px; font-size: 15px; }
    .card { background: #16213e; border: 1px solid #334; border-radius: 16px; padding: 24px 28px; margin-bottom: 16px; display: flex; justify-content: space-between; align-items: center; transition: all 0.2s; }
    .card:hover { background: #1a2744; border-color: #556; transform: translateY(-2px); }
    .card-info h3 { font-size: 18px; font-weight: 600; margin-bottom: 4px; }
    .card-info span { color: #888; font-size: 13px; }
    a.btn { display: inline-block; background: #513081; color: #fff; padding: 10px 24px; border-radius: 50px; text-decoration: none; font-weight: 600; font-size: 14px; transition: background 0.2s; }
    a.btn:hover { background: #6d28d9; }
    .badge { display: inline-block; background: #059669; color: #fff; font-size: 10px; font-weight: 700; padding: 3px 10px; border-radius: 50px; text-transform: uppercase; letter-spacing: 1px; margin-left: 8px; }
  </style>
</head>
<body>
  <div class="container">
    <h1>📧 Email Previews</h1>
    <p class="sub">Generated on ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} — Click to preview each template.</p>
    
    <div class="card">
      <div class="card-info">
        <h3>Individual Registration <span class="badge">Registration</span></h3>
        <span>Confirmation sent to student after individual sign-up</span>
      </div>
      <a class="btn" href="01-individual-registration.html" target="_blank">Preview</a>
    </div>
    
    <div class="card">
      <div class="card-info">
        <h3>School Registration <span class="badge">Registration</span></h3>
        <span>Confirmation sent to school contact with student list</span>
      </div>
      <a class="btn" href="02-school-registration.html" target="_blank">Preview</a>
    </div>
    
    <div class="card">
      <div class="card-info">
        <h3>Contact Lead <span class="badge" style="background:#f59e0b;color:#000;">Internal</span></h3>
        <span>Lead notification sent to site owner</span>
      </div>
      <a class="btn" href="03-contact-lead.html" target="_blank">Preview</a>
    </div>
    
    <div class="card">
      <div class="card-info">
        <h3>Contact Auto-Responder <span class="badge">Contact</span></h3>
        <span>Auto-reply sent to visitor who submitted the form</span>
      </div>
      <a class="btn" href="04-contact-auto-responder.html" target="_blank">Preview</a>
    </div>
  </div>
</body>
</html>`;

const indexPath = join(outputDir, 'index.html');
writeFileSync(indexPath, indexHtml, 'utf-8');

console.log('\n📂 All previews saved to: .email-previews/');
console.log('🌐 Opening in browser...\n');

// Open the index in the default browser
try {
  const platform = process.platform;
  if (platform === 'darwin') {
    execSync(`open "${indexPath}"`);
  } else if (platform === 'win32') {
    execSync(`start "" "${indexPath}"`);
  } else {
    execSync(`xdg-open "${indexPath}"`);
  }
} catch {
  console.log(`⚠️  Could not auto-open. Manually open: ${indexPath}`);
}

console.log('✨ Done! Check your browser.');
}

run().catch(console.error);
