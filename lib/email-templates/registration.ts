const LOGO_URL = 'https://pub-94f4f411e34a46208f9318ca0c92b0e1.r2.dev/jigisha.avif';

export function buildIndividualRegistrationEmail(params: {
    studentName: string;
    schoolName: string;
    classVal: string;
    dobStr: string;
    mobileNumber: string;
    altMobileNumber?: string;
}) {
    const { studentName, schoolName, classVal, dobStr, mobileNumber, altMobileNumber } = params;
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
        <table width="620" cellpadding="0" cellspacing="0" style="width:620px;max-width:100%;">
          <!-- ── Header ── -->
          <tr>
            <td style="background-color:#3d1f6e;border-radius:16px 16px 0 0;padding:36px 40px;text-align:center;">
              <img src="${LOGO_URL}" alt="Jigisha" width="160" style="display:block;margin:0 auto 20px auto;height:auto;max-width:160px;border-radius:8px;" onerror="this.style.display='none'"/>
              <h1 style="margin:0;font-size:26px;font-weight:700;color:#ffffff;letter-spacing:-0.5px;">Registration Successful!</h1>
              <p style="margin:10px 0 0 0;font-size:14px;color:rgba(255,255,255,0.75);">Welcome to Jana Ojana</p>
            </td>
          </tr>
          <!-- ── Body ── -->
          <tr>
            <td style="background-color:#ffffff;padding:40px;">
              <p style="margin:0 0 20px 0;font-size:16px;color:#333333;line-height:1.6;">
                Hi <strong>${studentName}</strong>,
              </p>
              <p style="margin:0 0 20px 0;font-size:15px;color:#555555;line-height:1.75;">
                Thank you for registering for Jana Ojana. Below is a copy of the details you submitted.
              </p>
              
              <!-- Info table -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:14px 0;border-bottom:1px solid #ebebeb;">
                    <p style="margin:0;font-size:11px;font-weight:700;color:#9b9b9b;text-transform:uppercase;letter-spacing:1px;">Participant Name</p>
                    <p style="margin:6px 0 0 0;font-size:16px;font-weight:600;color:#1a1a1a;">${studentName}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:14px 0;border-bottom:1px solid #ebebeb;">
                    <p style="margin:0;font-size:11px;font-weight:700;color:#9b9b9b;text-transform:uppercase;letter-spacing:1px;">School Name</p>
                    <p style="margin:6px 0 0 0;font-size:16px;font-weight:600;color:#1a1a1a;">${schoolName}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:14px 0;border-bottom:1px solid #ebebeb;">
                    <p style="margin:0;font-size:11px;font-weight:700;color:#9b9b9b;text-transform:uppercase;letter-spacing:1px;">Class</p>
                    <p style="margin:6px 0 0 0;font-size:16px;font-weight:600;color:#1a1a1a;">${classVal}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:14px 0;border-bottom:1px solid #ebebeb;">
                    <p style="margin:0;font-size:11px;font-weight:700;color:#9b9b9b;text-transform:uppercase;letter-spacing:1px;">Date of Birth</p>
                    <p style="margin:6px 0 0 0;font-size:16px;font-weight:600;color:#1a1a1a;">${new Date(dobStr).toLocaleDateString('en-IN')}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:14px 0;border-bottom:1px solid #ebebeb;">
                    <p style="margin:0;font-size:11px;font-weight:700;color:#9b9b9b;text-transform:uppercase;letter-spacing:1px;">WhatsApp Number</p>
                    <p style="margin:6px 0 0 0;font-size:16px;font-weight:600;color:#1a1a1a;">${mobileNumber}</p>
                  </td>
                </tr>
                ${altMobileNumber ? `
                <tr>
                  <td style="padding:14px 0;border-bottom:1px solid #ebebeb;">
                    <p style="margin:0;font-size:11px;font-weight:700;color:#9b9b9b;text-transform:uppercase;letter-spacing:1px;">Alternate Number</p>
                    <p style="margin:6px 0 0 0;font-size:16px;font-weight:600;color:#1a1a1a;">${altMobileNumber}</p>
                  </td>
                </tr>` : ''}
              </table>

              <!-- Divider -->
              <hr style="border:none;border-top:1px solid #ebebeb;margin:36px 0 28px 0;"/>

              <!-- Sign-off -->
              <p style="margin:0;font-size:15px;color:#333333;line-height:1.6;">
                With warm regards,<br/>
                <strong style="color:#3d1f6e;">Jigisha Team</strong><br/>
              </p>
            </td>
          </tr>
          <!-- ── Footer ── -->
          <tr>
            <td style="background-color:#f8f6ff;border-radius:0 0 16px 16px;padding:28px 40px;text-align:center;">
              <p style="margin:0 0 6px 0;font-size:13px;font-weight:600;color:#513081;">Jigisha</p>
              <p style="margin:0;font-size:12px;color:#aaaaaa;line-height:1.6;">
                This is an automated confirmation email. Please do not reply to this message.
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
        <table width="620" cellpadding="0" cellspacing="0" style="width:620px;max-width:100%;">
          <!-- ── Header ── -->
          <tr>
            <td style="background-color:#3d1f6e;border-radius:16px 16px 0 0;padding:36px 40px;text-align:center;">
              <img src="${LOGO_URL}" alt="Jigisha" width="160" style="display:block;margin:0 auto 20px auto;height:auto;max-width:160px;border-radius:8px;" onerror="this.style.display='none'"/>
              <h1 style="margin:0;font-size:26px;font-weight:700;color:#ffffff;letter-spacing:-0.5px;">School Registration Successful!</h1>
              <p style="margin:10px 0 0 0;font-size:14px;color:rgba(255,255,255,0.75);">Welcome to Jana Ojana</p>
            </td>
          </tr>
          <!-- ── Body ── -->
          <tr>
            <td style="background-color:#ffffff;padding:40px;">
              <p style="margin:0 0 20px 0;font-size:16px;color:#333333;line-height:1.6;">
                Hi <strong>${contactName}</strong>,
              </p>
              <p style="margin:0 0 20px 0;font-size:15px;color:#555555;line-height:1.75;">
                Thank you for registering <strong>${schoolName}</strong> for Jana Ojana. Below is a copy of the details you submitted.
              </p>
              
              <!-- Contact Info -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
                <tr>
                  <td style="padding:14px 0;border-bottom:1px solid #ebebeb;">
                    <p style="margin:0;font-size:11px;font-weight:700;color:#9b9b9b;text-transform:uppercase;letter-spacing:1px;">Contact Mobile Number</p>
                    <p style="margin:6px 0 0 0;font-size:16px;font-weight:600;color:#1a1a1a;">${mobileNumber}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:14px 0;border-bottom:1px solid #ebebeb;">
                    <p style="margin:0;font-size:11px;font-weight:700;color:#9b9b9b;text-transform:uppercase;letter-spacing:1px;">Total Students Registered</p>
                    <p style="margin:6px 0 0 0;font-size:16px;font-weight:600;color:#1a1a1a;">${students.length}</p>
                  </td>
                </tr>
              </table>

              <!-- Students List -->
              <h3 style="margin:0 0 12px 0;font-size:16px;font-weight:700;color:#333333;">Registered Students</h3>
              <table width="100%" cellpadding="10" cellspacing="0" style="border:1px solid #ebebeb;border-radius:8px;border-collapse:collapse;">
                <thead>
                  <tr style="background-color:#f8f6ff;">
                    <th align="left" style="font-size:12px;font-weight:700;color:#513081;border-bottom:1px solid #ebebeb;">Name</th>
                    <th align="left" style="font-size:12px;font-weight:700;color:#513081;border-bottom:1px solid #ebebeb;">Class</th>
                    <th align="left" style="font-size:12px;font-weight:700;color:#513081;border-bottom:1px solid #ebebeb;">Age</th>
                  </tr>
                </thead>
                <tbody>
                  ${students.map(s => `
                  <tr>
                    <td style="font-size:14px;color:#333333;border-bottom:1px solid #ebebeb;">${s.name}</td>
                    <td style="font-size:14px;color:#333333;border-bottom:1px solid #ebebeb;">${s.class}</td>
                    <td style="font-size:14px;color:#333333;border-bottom:1px solid #ebebeb;">${s.age}</td>
                  </tr>
                  `).join('')}
                </tbody>
              </table>

              <!-- Divider -->
              <hr style="border:none;border-top:1px solid #ebebeb;margin:36px 0 28px 0;"/>

              <!-- Sign-off -->
              <p style="margin:0;font-size:15px;color:#333333;line-height:1.6;">
                With warm regards,<br/>
                <strong style="color:#3d1f6e;">Jigisha Team</strong><br/>
              </p>
            </td>
          </tr>
          <!-- ── Footer ── -->
          <tr>
            <td style="background-color:#f8f6ff;border-radius:0 0 16px 16px;padding:28px 40px;text-align:center;">
              <p style="margin:0 0 6px 0;font-size:13px;font-weight:600;color:#513081;">Jigisha</p>
              <p style="margin:0;font-size:12px;color:#aaaaaa;line-height:1.6;">
                This is an automated confirmation email. Please do not reply to this message.
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
