import prisma from "../../config/database.js";
import { getSupabaseAdmin } from "../../config/supabaseAdmin.js";
import { sendInvitationEmail } from "../../utils/email.js";
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

  const emailStatus = await sendInvitationEmail({
    to: data.email,
    fullName: data.name,
    tempPassword: password,
    inviteUrl,
    role: "AUTHORITY",
    authorityName: data.name,
  });

  return {
    authority,
    tempPassword: password,
    inviteUrl,
    emailStatus,
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

  const emailStatus = await sendInvitationEmail({
    to: data.email,
    fullName,
    tempPassword: password,
    inviteUrl,
    role: "OFFICER",
    authorityName: authority.name,
  });

  return {
    officer,
    tempPassword: password,
    inviteUrl,
    emailStatus,
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

// Authority status and lifecycle management
export const toggleAuthorityStatus = async (authorityId) => {
  const authority = await prisma.authority.findUnique({
    where: { id: authorityId },
    include: { profile: true, officers: true },
  });

  if (!authority) {
    throw new Error("Authority not found");
  }

  const newStatus = authority.status === "Active" ? "Inactive" : "Active";

  const updated = await prisma.authority.update({
    where: { id: authorityId },
    data: { status: newStatus },
    include: { profile: true, officers: { include: { profile: true } } },
  });

  return updated;
};

export const updateAuthority = async (authorityId, data) => {
  const authority = await prisma.authority.findUnique({
    where: { id: authorityId },
  });

  if (!authority) {
    throw new Error("Authority not found");
  }

  const updated = await prisma.authority.update({
    where: { id: authorityId },
    data: {
      name: data.name || authority.name,
      phone: data.phone !== undefined ? data.phone : authority.phone,
      address: data.address !== undefined ? data.address : authority.address,
      coverage: data.coverage !== undefined ? data.coverage : authority.coverage,
      district: data.district !== undefined ? data.district : authority.district,
      description: data.description !== undefined ? data.description : authority.description,
    },
    include: { profile: true, officers: { include: { profile: true } } },
  });

  return updated;
};

export const deleteAuthority = async (authorityId) => {
  const authority = await prisma.authority.findUnique({
    where: { id: authorityId },
    include: { profile: true },
  });

  if (!authority) {
    throw new Error("Authority not found");
  }

  // Delete from Supabase auth
  const supabaseAdmin = getSupabaseAdmin();
  await supabaseAdmin.auth.admin.deleteUser(authority.profile.id);

  // Delete authority (cascade will handle profile and officers)
  await prisma.authority.delete({
    where: { id: authorityId },
  });

  return { success: true, message: "Authority deleted successfully" };
};

// Officer status and lifecycle management
export const toggleOfficerStatus = async (officerId) => {
  const officer = await prisma.officer.findUnique({
    where: { id: officerId },
    include: { profile: true, authority: true },
  });

  if (!officer) {
    throw new Error("Officer not found");
  }

  const newStatus = officer.status === "Active" ? "Inactive" : "Active";

  const updated = await prisma.officer.update({
    where: { id: officerId },
    data: { status: newStatus },
    include: { profile: true, authority: true },
  });

  return updated;
};

export const updateOfficer = async (officerId, data) => {
  const officer = await prisma.officer.findUnique({
    where: { id: officerId },
  });

  if (!officer) {
    throw new Error("Officer not found");
  }

  const updated = await prisma.officer.update({
    where: { id: officerId },
    data: {
      position: data.position !== undefined ? data.position : officer.position,
      department: data.department !== undefined ? data.department : officer.department,
    },
    include: { profile: true, authority: true },
  });

  return updated;
};

export const deleteOfficer = async (officerId) => {
  const officer = await prisma.officer.findUnique({
    where: { id: officerId },
    include: { profile: true },
  });

  if (!officer) {
    throw new Error("Officer not found");
  }

  // Delete from Supabase auth
  const supabaseAdmin = getSupabaseAdmin();
  await supabaseAdmin.auth.admin.deleteUser(officer.profile.id);

  // Delete officer (cascade will handle profile)
  await prisma.officer.delete({
    where: { id: officerId },
  });

  return { success: true, message: "Officer deleted successfully" };
};

export { profileInclude, INVITE_EXPIRY_DAYS };
