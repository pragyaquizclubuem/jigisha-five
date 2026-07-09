import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const SIGNING_SECRET = process.env.RESEND_SIGNING_SECRET;

    if (!SIGNING_SECRET) {
      console.error("Missing RESEND_SIGNING_SECRET");
      return NextResponse.json(
        { error: 'Missing RESEND_SIGNING_SECRET in environment variables' },
        { status: 500 }
      );
    }

    // Get the headers (in Next.js >14, headers() is async)
    const headerPayload = await headers();
    const svix_id = headerPayload.get("svix-id");
    const svix_timestamp = headerPayload.get("svix-timestamp");
    const svix_signature = headerPayload.get("svix-signature");

    // If there are no Svix headers, error out
    if (!svix_id || !svix_timestamp || !svix_signature) {
      return NextResponse.json({ error: 'Missing svix headers' }, { status: 400 });
    }

    // Get the raw body text
    const payload = await req.text();

    // Create a new Svix instance with your secret
    const wh = new Webhook(SIGNING_SECRET);

    let evt: any;

    // Verify the payload with the headers
    try {
      evt = wh.verify(payload, {
        "svix-id": svix_id,
        "svix-timestamp": svix_timestamp,
        "svix-signature": svix_signature,
      });
    } catch (err: any) {
      console.error('Error verifying webhook:', err.message);
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    // Process the verified webhook event
    const eventType = evt.type;
    const emailData = evt.data;

    console.log(`[Resend Webhook] Verified Event: ${eventType}`);
    
    if (emailData?.to?.[0]) {
      console.log(`[Resend Webhook] Email target: ${emailData.to[0]}`);
    }
    
    if (eventType === 'email.bounced') {
      console.warn(`[Resend Webhook] Warning: Email bounced for ${emailData?.to?.[0]}`);
      // TODO: Handle bounce logic (e.g., mark registration as email failed in database)
    } else if (eventType === 'email.delivered') {
      console.log(`[Resend Webhook] Success: Email delivered to ${emailData?.to?.[0]}`);
    } else if (eventType === 'email.complained') {
      console.warn(`[Resend Webhook] Alert: Spam complaint from ${emailData?.to?.[0]}`);
    }

    return NextResponse.json({ success: true, type: eventType });
  } catch (error) {
    console.error('Webhook processing error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
