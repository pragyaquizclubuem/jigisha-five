import { NextResponse, NextRequest } from 'next/server';
import { Resend } from 'resend';
import { buildLeadEmail, buildAutoResponder } from '@/lib/email-templates/contact';

const resend = new Resend(process.env.RESEND_API_KEY || 're_placeholder_key');

// -----------------------------------------------------------------
// POST /api/contact
// -----------------------------------------------------------------
export async function POST(req: NextRequest) {
    try {
        const { name, email, phone, message } = await req.json();

        if (!name || !email || !message) {
            return NextResponse.json(
                { success: false, message: 'Missing required fields' },
                { status: 400 }
            );
        }

        const receivedAt = new Date().toLocaleString('en-IN', {
            timeZone: 'Asia/Kolkata',
            dateStyle: 'long',
            timeStyle: 'short',
        });

        // 1. Lead notification to owner
        await resend.emails.send({
            from: `${process.env.LEAD_SENDER_NAME} <${process.env.LEAD_SENDER_EMAIL}>`,
            to: [process.env.LEAD_RECEIVER_EMAIL as string],
            subject: (process.env.LEAD_SUBJECT as string).replace('{name}', name),
            html: buildLeadEmail({ name, email, phone, message, receivedAt }),
        });

        // 2. Auto-responder to visitor
        await resend.emails.send({
            from: `${process.env.RESPONSE_SENDER_NAME} <${process.env.RESPONSE_SENDER_EMAIL}>`,
            to: [email],
            subject: process.env.RESPONSE_SUBJECT as string,
            html: buildAutoResponder({
                name,
                message,
                senderName: process.env.RESPONSE_SENDER_NAME as string,
            }),
        });

        return NextResponse.json({ success: true, message: 'Email sent successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error sending email:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to send email' },
            { status: 500 }
        );
    }
}
