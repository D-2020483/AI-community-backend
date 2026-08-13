/**
 * One-time script to create the first admin account.
 *
 * Usage:
 *   node scripts/seedAdmin.js admin@civiclink.gov "Admin Name" "SecurePass123!"
 *
 * Requires SUPABASE_SERVICE_ROLE_KEY in .env
 */
import "dotenv/config";
import prisma from "../src/config/database.js";
import { getSupabaseAdmin } from "../src/config/supabaseAdmin.js";

const [email, fullName, password] = process.argv.slice(2);

if (!email || !fullName || !password) {
  console.error(
    'Usage: node scripts/seedAdmin.js <email> "<full name>" "<password>"',
  );
  process.exit(1);
}

const normalizedEmail = email.toLowerCase().trim();

const existing = await prisma.profile.findUnique({
  where: { email: normalizedEmail },
});

if (existing) {
  console.error(`Profile already exists for ${normalizedEmail}`);
  process.exit(1);
}

const supabaseAdmin = getSupabaseAdmin();
const { data, error } = await supabaseAdmin.auth.admin.createUser({
  email: normalizedEmail,
  password,
  email_confirm: true,
  user_metadata: { role: "ADMIN", fullName },
});

if (error) {
  console.error("Supabase error:", error.message);
  process.exit(1);
}

await prisma.profile.create({
  data: {
    id: data.user.id,
    fullName,
    email: normalizedEmail,
    role: "ADMIN",
    isPasswordSet: true,
    invitationStatus: "ACCEPTED",
    acceptedAt: new Date(),
  },
});

console.log(`Admin created: ${normalizedEmail}`);
process.exit(0);
