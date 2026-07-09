const APP_URL = process.env.NEXT_PUBLIC_APP_URL || '';
const LOGO_URL = APP_URL 
  ? `${APP_URL}/images/jigisha.avif` 
  : 'https://pub-94f4f411e34a46208f9318ca0c92b0e1.r2.dev/jigisha.avif';

const EMAIL_BANNER_URL = APP_URL 
  ? `${APP_URL}/images/email-banner.png` 
  : 'https://mcdqguhkhsqhkwl4y6tclsibsqiwdnqkxsqoyqnbmq4.canva-cdn.email/49c9754efce7ff53f7583f2771e4c29b.png';

export function buildIndividualRegistrationEmail(params: {
    studentName: string;
    schoolName: string;
    classVal: string;
    dobStr: string;
    mobileNumber: string;
    altMobileNumber?: string;
}) {
    const { studentName, schoolName, classVal, dobStr, mobileNumber, altMobileNumber } = params;
    const formattedDob = new Date(dobStr).toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' });

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Registration Confirmation - Jana Ojana</title>
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



          <!-- ── Body ── -->
          <tr>
            <td style="background-color:#ffffff;padding:36px 40px;">
<h1> Greetings From Team Jigisha !</h1>
              <!-- Greeting -->
              <p style="margin:0 0 16px 0;font-size:16px;color:#333333;line-height:1.6;">
                Hi <strong>${studentName}</strong>,
              </p>
              <p style="margin:0 0 28px 0;font-size:15px;color:#555555;line-height:1.75;">
                Your registration has been successfully confirmed! Thank you for registering for <strong>Jana Ojana</strong> — Jigisha 5.0's flagship inter-school quiz. Below is a summary of the details you submitted.
              </p>

              <!-- Info table -->
              <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #ebebeb;border-radius:12px;overflow:hidden;">
                <tr>
                  <td style="padding:16px 20px;background-color:#f8f6ff;border-bottom:1px solid #ebebeb;">
                    <p style="margin:0;font-size:10px;font-weight:700;color:#513081;text-transform:uppercase;letter-spacing:1.5px;">Participant Name</p>
                    <p style="margin:6px 0 0 0;font-size:16px;font-weight:600;color:#1a1a1a;">${studentName}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:16px 20px;border-bottom:1px solid #ebebeb;">
                    <p style="margin:0;font-size:10px;font-weight:700;color:#9b9b9b;text-transform:uppercase;letter-spacing:1.5px;">School Name</p>
                    <p style="margin:6px 0 0 0;font-size:16px;font-weight:600;color:#1a1a1a;">${schoolName}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:16px 20px;background-color:#f8f6ff;border-bottom:1px solid #ebebeb;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td width="50%" style="vertical-align:top;">
                          <p style="margin:0;font-size:10px;font-weight:700;color:#513081;text-transform:uppercase;letter-spacing:1.5px;">Class</p>
                          <p style="margin:6px 0 0 0;font-size:16px;font-weight:600;color:#1a1a1a;">${classVal}</p>
                        </td>
                        <td width="50%" style="vertical-align:top;">
                          <p style="margin:0;font-size:10px;font-weight:700;color:#513081;text-transform:uppercase;letter-spacing:1.5px;">Date of Birth</p>
                          <p style="margin:6px 0 0 0;font-size:16px;font-weight:600;color:#1a1a1a;">${formattedDob}</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding:16px 20px;border-bottom:${altMobileNumber ? '1px solid #ebebeb' : 'none'};">
                    <p style="margin:0;font-size:10px;font-weight:700;color:#9b9b9b;text-transform:uppercase;letter-spacing:1.5px;">WhatsApp Number</p>
                    <p style="margin:6px 0 0 0;font-size:16px;font-weight:600;color:#1a1a1a;">${mobileNumber}</p>
                  </td>
                </tr>
                ${altMobileNumber ? `
                <tr>
                  <td style="padding:16px 20px;">
                    <p style="margin:0;font-size:10px;font-weight:700;color:#9b9b9b;text-transform:uppercase;letter-spacing:1.5px;">Alternate Number</p>
                    <p style="margin:6px 0 0 0;font-size:16px;font-weight:600;color:#1a1a1a;">${altMobileNumber}</p>
                  </td>
                </tr>` : ''}
              </table>

              <!-- Important Note -->
              <div style="margin:28px 0 0 0;background-color:#fef2f2;border-left:4px solid #ef4444;border-radius:0 8px 8px 0;padding:16px 20px;">
                <p style="margin:0;font-size:13px;font-weight:700;color:#991b1b;">⚠️ Important Reminder</p>
                <p style="margin:8px 0 0 0;font-size:13px;color:#7f1d1d;line-height:1.6;">
                  Please bring your <strong>School ID Card</strong> on the day of the event. Entry without a valid ID is not permitted.
                </p>
              </div>

              <!-- Divider -->
              <hr style="border:none;border-top:1px solid #ebebeb;margin:32px 0 24px 0;"/>

              <!-- Sign-off -->
              <p style="margin:0;font-size:15px;color:#333333;line-height:1.6;">
                With warm regards,<br/>
                <strong style="color:#3d1f6e;">Jigisha Team</strong><br/>
                <span style="font-size:13px;color:#9b9b9b;">Jigisha 5.0 — The Quiz Festival</span>
              </p>

            </td>
          </tr>

          <!-- ── Footer ── -->
          <tr>
            <td style="background-color:#f8f6ff;border-radius:0 0 16px 16px;padding:24px 40px;text-align:center;">
              <p style="margin:0 0 6px 0;font-size:13px;font-weight:600;color:#513081;">Jigisha 5.0</p>
              <p style="margin:0;font-size:11px;color:#aaaaaa;line-height:1.6;">
                This is an automated confirmation email. Please do not reply to this message.<br/>
                If you did not register, please ignore this email.
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

export function buildSchoolRegistrationEmail(params: {
    contactName: string;
    schoolName: string;
    mobileNumber: string;
    students: Array<{name: string, class: string, age: string}>;
}) {
    const { contactName, schoolName, mobileNumber, students } = params;
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>School Registration Confirmation - Jana Ojana</title>
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



          <!-- ── Body ── -->
          <tr>
            <td style="background-color:#ffffff;padding:36px 40px;">
<h1> Greetings from Team Jigisha !</h1>
              <!-- Greeting -->
              <p style="margin:0 0 16px 0;font-size:16px;color:#333333;line-height:1.6;">
                Hi <strong>${contactName}</strong>,
              </p>
              <p style="margin:0 0 28px 0;font-size:15px;color:#555555;line-height:1.75;">
                Your registration has been successfully confirmed! Thank you for registering <strong>${schoolName}</strong> for <strong>Jana Ojana</strong> — Jigisha 5.0's flagship inter-school quiz. Below is a summary of your registration.
              </p>

              <!-- Contact Info -->
              <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #ebebeb;border-radius:12px;overflow:hidden;margin-bottom:28px;">
                <tr>
                  <td style="padding:16px 20px;background-color:#f8f6ff;border-bottom:1px solid #ebebeb;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td width="50%" style="vertical-align:top;">
                          <p style="margin:0;font-size:10px;font-weight:700;color:#513081;text-transform:uppercase;letter-spacing:1.5px;">Contact Person</p>
                          <p style="margin:6px 0 0 0;font-size:16px;font-weight:600;color:#1a1a1a;">${contactName}</p>
                        </td>
                        <td width="50%" style="vertical-align:top;">
                          <p style="margin:0;font-size:10px;font-weight:700;color:#513081;text-transform:uppercase;letter-spacing:1.5px;">Mobile Number</p>
                          <p style="margin:6px 0 0 0;font-size:16px;font-weight:600;color:#1a1a1a;">${mobileNumber}</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding:16px 20px;">
                    <p style="margin:0;font-size:10px;font-weight:700;color:#9b9b9b;text-transform:uppercase;letter-spacing:1.5px;">Total Students Registered</p>
                    <p style="margin:6px 0 0 0;font-size:24px;font-weight:700;color:#513081;">${students.length}</p>
                  </td>
                </tr>
              </table>

              <!-- Students Table -->
              <h3 style="margin:0 0 12px 0;font-size:14px;font-weight:700;color:#333333;text-transform:uppercase;letter-spacing:1px;">Registered Students</h3>
              <table width="100%" cellpadding="12" cellspacing="0" style="border:1px solid #ebebeb;border-radius:12px;border-collapse:collapse;overflow:hidden;">
                <thead>
                  <tr style="background-color:#3d1f6e;">
                    <th align="left" style="font-size:11px;font-weight:700;color:#ffffff;text-transform:uppercase;letter-spacing:1px;border-bottom:1px solid #ebebeb;padding:14px 16px;">#</th>
                    <th align="left" style="font-size:11px;font-weight:700;color:#ffffff;text-transform:uppercase;letter-spacing:1px;border-bottom:1px solid #ebebeb;padding:14px 16px;">Name</th>
                    <th align="left" style="font-size:11px;font-weight:700;color:#ffffff;text-transform:uppercase;letter-spacing:1px;border-bottom:1px solid #ebebeb;padding:14px 16px;">Class</th>
                    <th align="left" style="font-size:11px;font-weight:700;color:#ffffff;text-transform:uppercase;letter-spacing:1px;border-bottom:1px solid #ebebeb;padding:14px 16px;">Age</th>
                  </tr>
                </thead>
                <tbody>
                  ${students.map((s, i) => `
                  <tr style="background-color:${i % 2 === 0 ? '#ffffff' : '#f8f6ff'};">
                    <td style="font-size:13px;color:#9b9b9b;font-weight:600;border-bottom:1px solid #ebebeb;padding:12px 16px;">${i + 1}</td>
                    <td style="font-size:14px;color:#333333;font-weight:600;border-bottom:1px solid #ebebeb;padding:12px 16px;">${s.name}</td>
                    <td style="font-size:14px;color:#333333;border-bottom:1px solid #ebebeb;padding:12px 16px;">${s.class}</td>
                    <td style="font-size:14px;color:#333333;border-bottom:1px solid #ebebeb;padding:12px 16px;">${s.age}</td>
                  </tr>
                  `).join('')}
                </tbody>
              </table>

              <!-- Important Note -->
              <div style="margin:28px 0 0 0;background-color:#fef2f2;border-left:4px solid #ef4444;border-radius:0 8px 8px 0;padding:16px 20px;">
                <p style="margin:0;font-size:13px;font-weight:700;color:#991b1b;">⚠️ Important Reminder</p>
                <p style="margin:8px 0 0 0;font-size:13px;color:#7f1d1d;line-height:1.6;">
                  All students must bring their <strong>School ID Cards</strong> on the day of the event. Entry without a valid ID is not permitted. Quiz partners must mandatorily be from the same school.
                </p>
              </div>

              <!-- Divider -->
              <hr style="border:none;border-top:1px solid #ebebeb;margin:32px 0 24px 0;"/>

              <!-- Sign-off -->
              <p style="margin:0;font-size:15px;color:#333333;line-height:1.6;">
                With warm regards,<br/>
                <strong style="color:#3d1f6e;">Jigisha Team</strong><br/>
                <span style="font-size:13px;color:#9b9b9b;">Jigisha 5.0 — The Quiz Festival</span>
              </p>

            </td>
          </tr>

          <!-- ── Footer ── -->
          <tr>
            <td style="background-color:#f8f6ff;border-radius:0 0 16px 16px;padding:24px 40px;text-align:center;">
              <p style="margin:0 0 6px 0;font-size:13px;font-weight:600;color:#513081;">Jigisha 5.0</p>
              <p style="margin:0;font-size:11px;color:#aaaaaa;line-height:1.6;">
                This is an automated confirmation email. Please do not reply to this message.<br/>
                If you did not register, please ignore this email.
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
