import { NextResponse, NextRequest } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const LOGO_URL = 'https://pub-94f4f411e34a46208f9318ca0c92b0e1.r2.dev/jigisha.avif';

// -----------------------------------------------------------------
// Email template: Lead notification (to you)
// -----------------------------------------------------------------
function buildLeadEmail(params: {
    name: string;
    email: string;
    phone?: string;
    message: string;
    logoUrl: string;
    receivedAt: string;
}) {
    const { name, email, phone, message, logoUrl, receivedAt } = params;
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>New Enquiry Lead</title>
</head>
<body style="margin:0;padding:0;background-color:#f2f2f7;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f2f2f7;padding:32px 0;">
    <tr>
      <td align="center">
        <table width="620" cellpadding="0" cellspacing="0" style="width:620px;max-width:100%;">

          <!-- ── Header ── -->
          <tr>
            <td style="background-color:#3d1f6e;border-radius:16px 16px 0 0;padding:36px 40px;text-align:center;">
              <img src="${logoUrl}" alt="Jigisha" width="160" style="display:block;margin:0 auto 16px auto;height:auto;max-width:160px;border-radius:8px;" onerror="this.style.display='none'"/>
              <p style="margin:0;color:#f4d21f;font-size:11px;font-weight:700;letter-spacing:4px;text-transform:uppercase;">New Enquiry Lead</p>
            </td>
          </tr>

          <!-- ── Alert banner ── -->
          <tr>
            <td style="background-color:#513081;padding:16px 40px;text-align:center;">
              <p style="margin:0;color:#ffffff;font-size:13px;font-weight:600;">
                📥 You have a new message from your website contact form
              </p>
            </td>
          </tr>

          <!-- ── Body ── -->
          <tr>
            <td style="background-color:#ffffff;padding:40px;">

              <!-- Greeting -->
              <h2 style="margin:0 0 6px 0;font-size:22px;font-weight:700;color:#1a1a1a;">Sender Details</h2>
              <p style="margin:0 0 28px 0;font-size:14px;color:#888888;">Received on ${receivedAt}</p>

              <!-- Info table -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:14px 0;border-bottom:1px solid #ebebeb;">
                    <p style="margin:0;font-size:11px;font-weight:700;color:#9b9b9b;text-transform:uppercase;letter-spacing:1px;">Full Name</p>
                    <p style="margin:6px 0 0 0;font-size:16px;font-weight:600;color:#1a1a1a;">${name}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:14px 0;border-bottom:1px solid #ebebeb;">
                    <p style="margin:0;font-size:11px;font-weight:700;color:#9b9b9b;text-transform:uppercase;letter-spacing:1px;">Email Address</p>
                    <p style="margin:6px 0 0 0;font-size:16px;font-weight:600;color:#1a1a1a;">
                      <a href="mailto:${email}" style="color:#513081;text-decoration:none;">${email}</a>
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:14px 0;border-bottom:1px solid #ebebeb;">
                    <p style="margin:0;font-size:11px;font-weight:700;color:#9b9b9b;text-transform:uppercase;letter-spacing:1px;">Phone / WhatsApp</p>
                    <p style="margin:6px 0 0 0;font-size:16px;font-weight:600;color:#1a1a1a;">${phone || '—'}</p>
                  </td>
                </tr>
              </table>

              <!-- Message block -->
              <div style="margin:28px 0 0 0;">
                <p style="margin:0 0 10px 0;font-size:11px;font-weight:700;color:#9b9b9b;text-transform:uppercase;letter-spacing:1px;">Message</p>
                <div style="background-color:#f8f6ff;border-left:4px solid #f4d21f;border-radius:0 8px 8px 0;padding:20px 24px;">
                  <p style="margin:0;font-size:15px;line-height:1.75;color:#333333;">${message.replace(/\n/g, '<br/>')}</p>
                </div>
              </div>

              <!-- CTA -->
              <div style="margin:36px 0 0 0;text-align:center;">
                <a href="mailto:${email}"
                   style="display:inline-block;background-color:#3d1f6e;color:#f4d21f;font-size:14px;font-weight:700;text-decoration:none;padding:14px 36px;border-radius:50px;letter-spacing:0.5px;">
                  ↩ Reply to ${name}
                </a>
              </div>

            </td>
          </tr>

          <!-- ── Footer ── -->
          <tr>
            <td style="background-color:#f8f6ff;border-radius:0 0 16px 16px;padding:24px 40px;text-align:center;">
              <p style="margin:0;font-size:12px;color:#aaaaaa;line-height:1.6;">
                This email was automatically generated by the Jigisha contact form.<br/>
                Please do not reply directly to this notification.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

// -----------------------------------------------------------------
// Email template: Auto-responder (to visitor)
// -----------------------------------------------------------------
function buildAutoResponder(params: {
    name: string;
    message: string;
    logoUrl: string;
    senderName: string;
}) {
    const { name, message, logoUrl, senderName } = params;
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>We received your message</title>
</head>
<body style="margin:0;padding:0;background-color:#f2f2f7;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f2f2f7;padding:32px 0;">
    <tr>
      <td align="center">
        <table width="620" cellpadding="0" cellspacing="0" style="width:620px;max-width:100%;">

          <!-- ── Header ── -->
          <tr>
            <td style="background-color:#3d1f6e;border-radius:16px 16px 0 0;padding:36px 40px;text-align:center;">
              <img src="${logoUrl}" alt="Jigisha" width="160" style="display:block;margin:0 auto 20px auto;height:auto;max-width:160px;border-radius:8px;" onerror="this.style.display='none'"/>
              <h1 style="margin:0;font-size:26px;font-weight:700;color:#ffffff;letter-spacing:-0.5px;">Thank you for reaching out!</h1>
              <p style="margin:10px 0 0 0;font-size:14px;color:rgba(255,255,255,0.75);">We have received your enquiry and will be in touch shortly.</p>
            </td>
          </tr>

          <!-- ── Body ── -->
          <tr>
            <td style="background-color:#ffffff;padding:40px;">

              <p style="margin:0 0 20px 0;font-size:16px;color:#333333;line-height:1.6;">
                Hi <strong>${name}</strong>,
              </p>
              <p style="margin:0 0 20px 0;font-size:15px;color:#555555;line-height:1.75;">
                Thank you for taking the time to write to us. We have successfully received your message and a member of our team will review it and get back to you as soon as possible — typically within 1–2 business days.
              </p>

              <!-- Message recap -->
              <div style="margin:28px 0;">
                <p style="margin:0 0 10px 0;font-size:11px;font-weight:700;color:#9b9b9b;text-transform:uppercase;letter-spacing:1px;">Your message</p>
                <div style="background-color:#f8f6ff;border-left:4px solid #f4d21f;border-radius:0 8px 8px 0;padding:20px 24px;">
                  <p style="margin:0;font-size:14px;line-height:1.75;color:#555555;font-style:italic;">${message.replace(/\n/g, '<br/>')}</p>
                </div>
              </div>

              <p style="margin:24px 0 0 0;font-size:15px;color:#555555;line-height:1.75;">
                In the meantime, feel free to reach out to us directly on WhatsApp or Messenger if you need urgent assistance.
              </p>

              <!-- Divider -->
              <hr style="border:none;border-top:1px solid #ebebeb;margin:36px 0 28px 0;"/>

              <!-- Sign-off -->
              <p style="margin:0;font-size:15px;color:#333333;line-height:1.6;">
                With warm regards,<br/>
                <strong style="color:#3d1f6e;">${senderName}</strong><br/>
                <span style="font-size:13px;color:#9b9b9b;">Team Jigisha</span>
              </p>

            </td>
          </tr>

          <!-- ── Footer ── -->
          <tr>
            <td style="background-color:#f8f6ff;border-radius:0 0 16px 16px;padding:28px 40px;text-align:center;">
              <p style="margin:0 0 6px 0;font-size:13px;font-weight:600;color:#513081;">Jigisha</p>
              <p style="margin:0;font-size:12px;color:#aaaaaa;line-height:1.6;">
                This is an automated confirmation email. Please do not reply to this message.<br/>
                If you did not submit this form, please ignore this email.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

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

        const logoUrl = LOGO_URL;

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
            html: buildLeadEmail({ name, email, phone, message, logoUrl, receivedAt }),
        });

        // 2. Auto-responder to visitor
        await resend.emails.send({
            from: `${process.env.RESPONSE_SENDER_NAME} <${process.env.RESPONSE_SENDER_EMAIL}>`,
            to: [email],
            subject: process.env.RESPONSE_SUBJECT as string,
            html: buildAutoResponder({
                name,
                message,
                logoUrl,
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
