const APP_URL = process.env.NEXT_PUBLIC_APP_URL || '';
const LOGO_URL = APP_URL 
  ? `${APP_URL}/images/jigisha.avif` 
  : 'https://pub-94f4f411e34a46208f9318ca0c92b0e1.r2.dev/jigisha.avif';

const EMAIL_BANNER_URL = APP_URL 
  ? `${APP_URL}/images/email-banner.png` 
  : 'https://mcdqguhkhsqhkwl4y6tclsibsqiwdnqkxsqoyqnbmq4.canva-cdn.email/49c9754efce7ff53f7583f2771e4c29b.png';

// -----------------------------------------------------------------
// Email template: Lead notification (to site owner)
// -----------------------------------------------------------------
export function buildLeadEmail(params: {
    name: string;
    email: string;
    phone?: string;
    message: string;
    receivedAt: string;
}) {
    const { name, email, phone, message, receivedAt } = params;
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
        <table width="620" cellpadding="0" cellspacing="0" style="width:620px;max-width:100%;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

          <!-- ── Full-Width Banner Image ── -->
          <tr>
            <td style="padding:0;line-height:0;font-size:0;">
              <img src="${EMAIL_BANNER_URL}" alt="Jigisha 5.0" width="620" style="display:block;width:100%;height:auto;max-width:620px;border:0;" />
            </td>
          </tr>

          <!-- ── Header ── -->
          <tr>
            <td style="background-color:#3d1f6e;padding:28px 40px;text-align:center;">
              <p style="margin:0;color:#f4d21f;font-size:11px;font-weight:700;letter-spacing:4px;text-transform:uppercase;">New Enquiry Lead</p>
            </td>
          </tr>

          <!-- ── Alert banner ── -->
          <tr>
            <td style="background-color:#513081;padding:14px 40px;text-align:center;">
              <p style="margin:0;color:#ffffff;font-size:13px;font-weight:600;">
                📥 You have a new message from your website contact form
              </p>
            </td>
          </tr>

          <!-- ── Body ── -->
          <tr>
            <td style="background-color:#ffffff;padding:36px 40px;">

              <!-- Greeting -->
              <h2 style="margin:0 0 6px 0;font-size:22px;font-weight:700;color:#1a1a1a;">Sender Details</h2>
              <p style="margin:0 0 24px 0;font-size:13px;color:#888888;">Received on ${receivedAt}</p>

              <!-- Info table -->
              <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #ebebeb;border-radius:12px;overflow:hidden;">
                <tr>
                  <td style="padding:16px 20px;background-color:#f8f6ff;border-bottom:1px solid #ebebeb;">
                    <p style="margin:0;font-size:10px;font-weight:700;color:#513081;text-transform:uppercase;letter-spacing:1.5px;">Full Name</p>
                    <p style="margin:6px 0 0 0;font-size:16px;font-weight:600;color:#1a1a1a;">${name}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:16px 20px;border-bottom:1px solid #ebebeb;">
                    <p style="margin:0;font-size:10px;font-weight:700;color:#9b9b9b;text-transform:uppercase;letter-spacing:1.5px;">Email Address</p>
                    <p style="margin:6px 0 0 0;font-size:16px;font-weight:600;color:#1a1a1a;">
                      <a href="mailto:${email}" style="color:#513081;text-decoration:none;">${email}</a>
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:16px 20px;background-color:#f8f6ff;">
                    <p style="margin:0;font-size:10px;font-weight:700;color:#513081;text-transform:uppercase;letter-spacing:1.5px;">Phone / WhatsApp</p>
                    <p style="margin:6px 0 0 0;font-size:16px;font-weight:600;color:#1a1a1a;">${phone || '—'}</p>
                  </td>
                </tr>
              </table>

              <!-- Message block -->
              <div style="margin:28px 0 0 0;">
                <p style="margin:0 0 10px 0;font-size:10px;font-weight:700;color:#9b9b9b;text-transform:uppercase;letter-spacing:1.5px;">Message</p>
                <div style="background-color:#f8f6ff;border-left:4px solid #f4d21f;border-radius:0 8px 8px 0;padding:20px 24px;">
                  <p style="margin:0;font-size:15px;line-height:1.75;color:#333333;">${message.replace(/\n/g, '<br/>')}</p>
                </div>
              </div>

              <!-- CTA -->
              <div style="margin:32px 0 0 0;text-align:center;">
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
              <p style="margin:0;font-size:11px;color:#aaaaaa;line-height:1.6;">
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
export function buildAutoResponder(params: {
    name: string;
    message: string;
    senderName: string;
}) {
    const { name, message, senderName } = params;
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
        <table width="620" cellpadding="0" cellspacing="0" style="width:620px;max-width:100%;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

          <!-- ── Full-Width Banner Image ── -->
          <tr>
            <td style="padding:0;line-height:0;font-size:0;">
              <img src="${EMAIL_BANNER_URL}" alt="Jigisha 5.0" width="620" style="display:block;width:100%;height:auto;max-width:620px;border:0;" />
            </td>
          </tr>

          <!-- ── Header ── -->
          <tr>
            <td style="background-color:#ffffff;padding:28px 40px;text-align:center;">
              <h1 style="margin:0;font-size:24px;font-weight:700;color:#3d1f6e;letter-spacing:-0.5px;">Thank you for reaching out!</h1>
              <p style="margin:10px 0 0 0;font-size:14px;color:rgba(0, 0, 0, 0.75);">We have received your enquiry and will be in touch shortly.</p>
            </td>
          </tr>

          <!-- ── Body ── -->
          <tr>
            <td style="background-color:#ffffff;padding:36px 40px;">

              <p style="margin:0 0 20px 0;font-size:16px;color:#333333;line-height:1.6;">
                Hi <strong>${name}</strong>,
              </p>
              <p style="margin:0 0 20px 0;font-size:15px;color:#555555;line-height:1.75;">
                Thank you for taking the time to write to us. We have successfully received your message and a member of our team will review it and get back to you as soon as possible — typically within 1–2 business days.
              </p>

              <!-- Message recap -->
              <div style="margin:28px 0;">
                <p style="margin:0 0 10px 0;font-size:10px;font-weight:700;color:#9b9b9b;text-transform:uppercase;letter-spacing:1.5px;">Your message</p>
                <div style="background-color:#f8f6ff;border-left:4px solid #f4d21f;border-radius:0 8px 8px 0;padding:20px 24px;">
                  <p style="margin:0;font-size:14px;line-height:1.75;color:#555555;font-style:italic;">${message.replace(/\n/g, '<br/>')}</p>
                </div>
              </div>

              <p style="margin:24px 0 0 0;font-size:15px;color:#555555;line-height:1.75;">
                In the meantime, feel free to reach out to us directly on WhatsApp or Messenger if you need urgent assistance.
              </p>

              <!-- Divider -->
              <hr style="border:none;border-top:1px solid #ebebeb;margin:32px 0 24px 0;"/>

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
            <td style="background-color:#f8f6ff;border-radius:0 0 16px 16px;padding:24px 40px;text-align:center;">
              <p style="margin:0 0 6px 0;font-size:13px;font-weight:600;color:#513081;">Jigisha 5.0</p>
              <p style="margin:0;font-size:11px;color:#aaaaaa;line-height:1.6;">
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
