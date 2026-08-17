import nodemailer from 'nodemailer';

function buildEmailHtml({ fullName, email, tempPassword, inviteUrl, role, authorityName }) {
  const roleLabel = role === 'AUTHORITY' ? 'authority' : 'officer';
  const authorityText = authorityName ? ` under <strong>${authorityName}</strong>` : '';

  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Civic Link — Account Created</title>
      </head>
      <body style="margin:0;padding:32px;background:#f1f5f9;font-family:Arial,Helvetica,sans-serif;color:#1e293b;">
        <div style="max-width:580px;margin:0 auto;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 10px 30px rgba(15,23,42,.08);">
          <div style="background:linear-gradient(135deg,#4f46e5,#7c3aed);padding:28px 32px;color:#ffffff;">
            <div style="font-size:14px;font-weight:800;letter-spacing:.1em;">🛡️ CIVIC LINK</div>
            <h1 style="margin:8px 0 0;font-size:22px;">Your ${roleLabel} account has been created</h1>
          </div>
          <div style="padding:32px;">
            <p style="font-size:14px;line-height:1.7;color:#475569;">Hello <strong>${fullName}</strong>,</p>
            <p style="font-size:14px;line-height:1.7;color:#475569;">Your ${roleLabel} account has been created on the <strong>Civic Link</strong> platform${authorityText}. You can now sign in and manage your assigned responsibilities.</p>
            <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:20px;margin:20px 0;">
              <div style="display:flex;justify-content:space-between;padding:10px 0;border-bottom:1px solid #eef2f7;">
                <span style="font-size:12px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:.05em;">Login URL</span>
                <span style="font-size:14px;font-weight:700;color:#0f172a;">${process.env.FRONTEND_URL || 'http://localhost:5173'}</span>
              </div>
              <div style="display:flex;justify-content:space-between;padding:10px 0;border-bottom:1px solid #eef2f7;">
                <span style="font-size:12px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:.05em;">Official Email</span>
                <span style="font-size:14px;font-weight:700;color:#0f172a;">${email}</span>
              </div>
              <div style="display:flex;justify-content:space-between;padding:10px 0;border-bottom:1px solid #eef2f7;">
                <span style="font-size:12px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:.05em;">Temporary Password</span>
                <span style="font-size:14px;font-weight:700;color:#4f46e5;background:#eef2ff;padding:2px 8px;border-radius:6px;">${tempPassword}</span>
              </div>
              <div style="display:flex;justify-content:space-between;padding:10px 0;">
                <span style="font-size:12px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:.05em;">Activation Link</span>
                <a href="${inviteUrl}" style="font-size:14px;font-weight:700;color:#4f46e5;text-decoration:none;">Activate account</a>
              </div>
            </div>
            <p style="font-size:14px;line-height:1.7;color:#475569;"><strong>Important:</strong> Use the activation link above, or sign in with the temporary password and change it on first login.</p>
            <p style="margin-top:18px;"><a href="${inviteUrl}" style="display:inline-block;background:#4f46e5;color:#ffffff !important;text-decoration:none;padding:12px 24px;border-radius:10px;font-weight:700;font-size:14px;">Go to Login</a></p>
          </div>
          <div style="padding:20px 32px;border-top:1px solid #e2e8f0;font-size:11px;color:#94a3b8;">
            <p>This is an automated message from Civic Link. Please do not reply.</p>
            <p style="margin-top:6px;">© ${new Date().getFullYear()} Civic Link Community Services</p>
          </div>
        </div>
      </body>
    </html>
  `;
}

export async function sendInvitationEmail({ to, fullName, tempPassword, inviteUrl, role, authorityName }) {
  const host = process.env.EMAIL_HOST;
  const port = Number(process.env.EMAIL_PORT || 587);
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;
  const from = process.env.EMAIL_FROM || 'Civic Link <no-reply@localhost>';

  if (!host || !user || !pass) {
    return {
      sent: false,
      message: 'SMTP is not configured. Email was not sent. Add EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASS, EMAIL_FROM to the backend .env file.',
      fallbackHtml: buildEmailHtml({
        fullName,
        email: to,
        tempPassword,
        inviteUrl,
        role,
        authorityName,
      }),
    };
  }

  try {
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: Number(port) === 465,
      auth: {
        user,
        pass,
      },
    });

    const info = await transporter.sendMail({
      from,
      to,
      subject: 'Your Civic Link account is ready',
      html: buildEmailHtml({
        fullName,
        email: to,
        tempPassword,
        inviteUrl,
        role,
        authorityName,
      }),
      text: `Hello ${fullName},\n\nYour account has been created.\nEmail: ${to}\nTemporary password: ${tempPassword}\nActivation link: ${inviteUrl}\n`,
    });

    return {
      sent: true,
      messageId: info.messageId,
      message: `Invitation email sent to ${to}`,
      previewUrl: null,
    };
  } catch (error) {
    console.error('Email send failed:', error);
    return {
      sent: false,
      message: `Email send failed: ${error.message}`,
      fallbackHtml: buildEmailHtml({
        fullName,
        email: to,
        tempPassword,
        inviteUrl,
        role,
        authorityName,
      }),
    };
  }
}
