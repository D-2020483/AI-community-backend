import { supabase } from "../../config/supabase.js";
import { getSupabaseAdmin } from "../../config/supabaseAdmin.js";
import prisma from "../../config/database.js";
import { INVITE_EXPIRY_DAYS, profileInclude } from "../admin/admin.service.js";

function buildLoginPayload(profile, session) {
  const requiresPasswordChange =
    profile.role !== "CITIZEN" &&
    profile.role !== "ADMIN" &&
    !profile.isPasswordSet;

  return {
    user: profile,
    session,
    requiresPasswordChange,
  };
}

function assertInviteNotExpired(profile) {
  if (!profile.invitedAt) return;

  const expiryMs = INVITE_EXPIRY_DAYS * 24 * 60 * 60 * 1000;
  const expired = Date.now() - new Date(profile.invitedAt).getTime() > expiryMs;

  if (expired && profile.invitationStatus === "PENDING") {
    throw new Error("Your invitation has expired. Contact your administrator.");
  }
}

export const loginUser = async ({ email, password }) => {
  const normalizedEmail = email.toLowerCase().trim();

  const { data: authData, error: authError } =
    await supabase.auth.signInWithPassword({
      email: normalizedEmail,
      password,
    });

  if (authError) {
    throw new Error(authError.message);
  }

  const profile = await prisma.profile.findUnique({
    where: { email: normalizedEmail },
    include: profileInclude,
  });

  if (!profile) {
    throw new Error("Profile not found for this account");
  }

  if (profile.invitationStatus === "REJECTED") {
    throw new Error("This account invitation was rejected");
  }

  if (profile.invitationStatus === "EXPIRED") {
    throw new Error("This account invitation has expired");
  }

  assertInviteNotExpired(profile);

  return buildLoginPayload(profile, authData.session);
};

export const getCurrentUser = async (accessToken) => {
  const { data, error } = await supabase.auth.getUser(accessToken);

  if (error || !data.user) {
    throw new Error("Invalid or expired access token");
  }

  const profile = await prisma.profile.findUnique({
    where: { id: data.user.id },
    include: profileInclude,
  });

  if (!profile) {
    throw new Error("Profile not found for this account");
  }

  return profile;
};

export const registerCitizen = async ({ fullName, email, phone, password }) => {
  const normalizedEmail = email.toLowerCase().trim();

  const existingProfile = await prisma.profile.findUnique({
    where: { email: normalizedEmail },
  });

  if (existingProfile) {
    throw new Error("An account with this email already exists");
  }

  const { data: authData, error: authError } = await supabase.auth.signUp({
    email: normalizedEmail,
    password,
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
      role: "CITIZEN",
      isPasswordSet: true,
    },
    include: profileInclude,
  });

  return {
    user: profile,
    session: authData.session,
  };
};

export const getInviteByToken = async (token) => {
  const profile = await prisma.profile.findUnique({
    where: { invitationToken: token },
    include: profileInclude,
  });

  if (!profile) {
    throw new Error("Invalid invitation link");
  }

  if (profile.invitationStatus === "ACCEPTED" && profile.isPasswordSet) {
    throw new Error("This invitation has already been accepted");
  }

  assertInviteNotExpired(profile);

  return {
    email: profile.email,
    fullName: profile.fullName,
    role: profile.role,
    authorityName: profile.authority?.name || profile.officer?.authority?.name,
  };
};

export const acceptInvite = async ({ token, password }) => {
  const profile = await prisma.profile.findUnique({
    where: { invitationToken: token },
  });

  if (!profile) {
    throw new Error("Invalid invitation link");
  }

  assertInviteNotExpired(profile);

  const supabaseAdmin = getSupabaseAdmin();
  const { error } = await supabaseAdmin.auth.admin.updateUserById(profile.id, {
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  await prisma.profile.update({
    where: { id: profile.id },
    data: {
      invitationStatus: "ACCEPTED",
      acceptedAt: new Date(),
      isPasswordSet: true,
      invitationToken: null,
    },
  });

  return { email: profile.email, role: profile.role };
};

export const changePassword = async (userId, { currentPassword, newPassword }) => {
  const profile = await prisma.profile.findUnique({
    where: { id: userId },
  });

  if (!profile) {
    throw new Error("Profile not found");
  }

  const { error: signInError } = await supabase.auth.signInWithPassword({
    email: profile.email,
    password: currentPassword,
  });

  if (signInError) {
    throw new Error("Current password is incorrect");
  }

  const supabaseAdmin = getSupabaseAdmin();
  const { error } = await supabaseAdmin.auth.admin.updateUserById(userId, {
    password: newPassword,
  });

  if (error) {
    throw new Error(error.message);
  }

  await prisma.profile.update({
    where: { id: userId },
    data: {
      isPasswordSet: true,
      invitationStatus: profile.invitationStatus === "PENDING" ? "ACCEPTED" : profile.invitationStatus,
      acceptedAt: profile.acceptedAt || new Date(),
      invitationToken: null,
    },
  });

  return { success: true };
};
