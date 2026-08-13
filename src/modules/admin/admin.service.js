import prisma from "../../config/database.js";
import { getSupabaseAdmin } from "../../config/supabaseAdmin.js";
import {
  generateInvitationToken,
  generateTemporaryPassword,
} from "../../utils/password.js";

const INVITE_EXPIRY_DAYS = 7;
const profileInclude = {
  authority: true,
  officer: { include: { authority: true } },
};

async function createInvitedUser({
  email,
  fullName,
  phone,
  role,
  createdBy,
  tempPassword,
}) {
  const normalizedEmail = email.toLowerCase().trim();
  const invitationToken = generateInvitationToken();
  const invitedAt = new Date();

  const existingProfile = await prisma.profile.findUnique({
    where: { email: normalizedEmail },
  });

  if (existingProfile) {
    throw new Error("An account with this email already exists");
  }

  const supabaseAdmin = getSupabaseAdmin();
  const { data: authData, error: authError } =
    await supabaseAdmin.auth.admin.createUser({
      email: normalizedEmail,
      password: tempPassword,
      email_confirm: true,
      user_metadata: { role, fullName },
    });

  if (authError) {
    throw new Error(authError.message);
  }

  if (!authData.user) {
    throw new Error("Unable to create authentication account");
  }

  const profile = await prisma.profile.create({
    data: {
      id: authData.user.id,
      fullName,
      email: normalizedEmail,
      phone: phone || null,
      role,
      invitationStatus: "PENDING",
      invitationToken,
      isPasswordSet: false,
      createdBy,
      invitedAt,
    },
    include: profileInclude,
  });

  const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
  const inviteUrl = `${frontendUrl}/accept-invite?token=${invitationToken}`;

  return {
    profile,
    tempPassword,
    inviteUrl,
    invitationToken,
  };
}

export const createAuthority = async (adminId, data) => {
  const tempPassword = generateTemporaryPassword();
  const { profile, tempPassword: password, inviteUrl } =
    await createInvitedUser({
      email: data.email,
      fullName: data.name,
      phone: data.phone,
      role: "AUTHORITY",
      createdBy: adminId,
      tempPassword,
    });

  const authority = await prisma.authority.create({
    data: {
      profileId: profile.id,
      name: data.name,
      phone: data.phone || null,
      address: data.address || null,
      coverage: data.coverage || null,
      district: data.district || null,
      description: data.description || null,
    },
    include: {
      profile: { include: profileInclude },
    },
  });

  return {
    authority,
    tempPassword: password,
    inviteUrl,
  };
};

export const createOfficer = async (adminId, data) => {
  const authority = await prisma.authority.findUnique({
    where: { id: data.authorityId },
  });

  if (!authority) {
    throw new Error("Selected authority was not found");
  }

  const fullName = `${data.firstName} ${data.lastName}`.trim();
  const tempPassword = generateTemporaryPassword();
  const { profile, tempPassword: password, inviteUrl } =
    await createInvitedUser({
      email: data.email,
      fullName,
      phone: data.phone,
      role: "OFFICER",
      createdBy: adminId,
      tempPassword,
    });

  const officer = await prisma.officer.create({
    data: {
      profileId: profile.id,
      authorityId: data.authorityId,
      position: data.position || "Officer",
      department: data.department || null,
    },
    include: {
      profile: { include: profileInclude },
      authority: true,
    },
  });

  return {
    officer,
    tempPassword: password,
    inviteUrl,
  };
};

export const listAuthorities = async () => {
  return prisma.authority.findMany({
    include: {
      profile: true,
      officers: { include: { profile: true } },
    },
    orderBy: { createdAt: "desc" },
  });
};

export const listOfficers = async () => {
  return prisma.officer.findMany({
    include: {
      profile: true,
      authority: true,
    },
    orderBy: { createdAt: "desc" },
  });
};

export const resetOfficerPassword = async (officerId) => {
  const officer = await prisma.officer.findUnique({
    where: { id: officerId },
    include: { profile: true },
  });

  if (!officer) {
    throw new Error("Officer not found");
  }

  const tempPassword = generateTemporaryPassword();
  const supabaseAdmin = getSupabaseAdmin();

  const { error } = await supabaseAdmin.auth.admin.updateUserById(
    officer.profileId,
    { password: tempPassword },
  );

  if (error) {
    throw new Error(error.message);
  }

  await prisma.profile.update({
    where: { id: officer.profileId },
    data: {
      isPasswordSet: false,
      invitationStatus: "PENDING",
      invitedAt: new Date(),
    },
  });

  return { tempPassword, email: officer.profile.email };
};

export { profileInclude, INVITE_EXPIRY_DAYS };
