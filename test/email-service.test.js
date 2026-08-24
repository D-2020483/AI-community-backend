import test from 'node:test';
import assert from 'node:assert/strict';

process.env.RESEND_API_KEY = '';
process.env.EMAIL_HOST = '';
process.env.EMAIL_PORT = '';
process.env.EMAIL_USER = '';
process.env.EMAIL_PASS = '';
process.env.EMAIL_FROM = '';

const { sendInvitationEmail } = await import('../src/utils/email.js');

test('sendInvitationEmail falls back to preview-only when no mail provider is configured', async () => {
  const result = await sendInvitationEmail({
    to: 'authority@example.com',
    fullName: 'Road and Development Authority',
    tempPassword: 'Temp123!',
    inviteUrl: 'http://localhost:5173/accept-invite?token=test-token',
    role: 'AUTHORITY',
    authorityName: 'Road and Development Authority',
  });

  assert.equal(result.sent, false);
  assert.match(result.message, /not configured/i);
});
