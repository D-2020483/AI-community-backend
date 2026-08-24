import dns from 'node:dns';
import { lookup } from 'node:dns/promises';
import nodemailer from 'nodemailer';

// Node 17+ prefers IPv6. Gmail advertises AAAA records, but many Windows
// and PaaS networks have no IPv6 route (ENETUNREACH ... :::0).
dns.setDefaultResultOrder('ipv4first');

async function smtpConnectOptions(host, port) {
  const { address } = await lookup(host, { family: 4 });
  const numericPort = Number(port);

  return {
    host: address,
    port: numericPort,
    secure: numericPort === 465,
    requireTLS: numericPort === 587,
    connectionTimeout: 12_000,
    greetingTimeout: 12_000,
    socketTimeout: 20_000,
    family: 4,
    tls: {
      servername: host,
      minVersion: 'TLSv1.2',
    },
  };
}

function buildEmailHtml({ fullName, email, tempPassword, inviteUrl, role, authorityName }) {
  const roleLabel = role === 'AUTHORITY' ? 'authority' : 'officer';
  const authorityText = authorityName ? ` under <strong>${authorityName}</strong>` : '';

  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Civic Link — Login details</title>
      </head>
      <body style="margin:0;padding:32px;background:#f1f5f9;font-family:Arial,Helvetica,sans-serif;color:#1e293b;">
        <div style="max-width:580px;margin:0 auto;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 10px 30px rgba(15,23,42,.08);">
          <div style="background:linear-gradient(135deg,#4f46e5,#7c3aed);padding:28px 32px;color:#ffffff;">
            <div style="font-size:14px;font-weight:800;letter-spacing:.1em;">🛡️ CIVIC LINK</div>
            <h1 style="margin:8px 0 0;font-size:22px;">Your ${roleLabel} account has been created</h1>
          </div>
          <div style="padding:32px;">
            <p style="font-size:14px;line-height:1.7;color:#475569;">Hello <strong>${fullName}</strong>,</p>
            <p style="font-size:14px;line-height:1.7;color:#475569;">Your ${roleLabel} account has been created on the <strong>Civic Link</strong> platform${authorityText}. Sign in with the official email and password below to open your ${roleLabel} workspace.</p>
            <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:20px;margin:20px 0;">
              <div style="padding:10px 0;border-bottom:1px solid #eef2f7;">
                <div style="font-size:12px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:.05em;">Login URL</div>
                <a href="${inviteUrl}" style="font-size:14px;font-weight:700;color:#4f46e5;text-decoration:none;word-break:break-all;">${inviteUrl}</a>
              </div>
              <div style="padding:10px 0;border-bottom:1px solid #eef2f7;">
                <div style="font-size:12px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:.05em;">Official Email</div>
                <div style="font-size:14px;font-weight:700;color:#0f172a;">${email}</div>
              </div>
              <div style="padding:10px 0;">
                <div style="font-size:12px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:.05em;">Password</div>
                <div style="font-size:14px;font-weight:700;color:#4f46e5;background:#eef2ff;padding:6px 10px;border-radius:6px;display:inline-block;margin-top:4px;">${tempPassword}</div>
              </div>
            </div>
            <p style="font-size:14px;line-height:1.7;color:#475569;"><strong>Important:</strong> Open the login link, select <strong>${roleLabel}</strong> (the blue button), then sign in with your official email and this password. This login link can be used only once.</p>
            <p style="margin-top:18px;"><a href="${inviteUrl}" style="display:inline-block;background:#4f46e5;color:#ffffff !important;text-decoration:none;padding:12px 24px;border-radius:10px;font-weight:700;font-size:14px;">Open login page</a></p>
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
      ...(await smtpConnectOptions(host, port)),
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
      text: `Hello ${fullName},\n\nYour Civic Link ${role === "AUTHORITY" ? "authority" : "officer"} account is ready.\nLogin page: ${inviteUrl}\nEmail: ${to}\nPassword: ${tempPassword}\n`,
    });

    return {
      sent: true,
      messageId: info.messageId,
      message: `Invitation email sent to ${to}`,
      previewUrl: null,
    };
  } catch (error) {
    console.error('Email send failed:', error);
    const detail = `${error.code || ''} ${error.message || ''}`;
    const ipv6Unreachable = /enetunreach|:::/i.test(detail);
    const timedOut = /timeout|etimedout|econnreset|enotfound/i.test(detail);
    const hint = ipv6Unreachable
      ? ' The server tried Gmail over IPv6, which is not reachable on this network. Restart the backend after this IPv4 fix, then retry.'
      : timedOut
        ? ' Render often blocks outbound Gmail SMTP (ports 25/587/465). Use port 465 or an HTTPS mail API (Resend/SendGrid).'
        : '';
    return {
      sent: false,
      message: `Email send failed: ${error.message}.${hint}`,
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
