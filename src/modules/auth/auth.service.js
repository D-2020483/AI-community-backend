import { supabase } from "../../config/supabase.js";
import { getSupabaseAdmin } from "../../config/supabaseAdmin.js";
import prisma from "../../config/database.js";
import { INVITE_EXPIRY_DAYS, profileInclude } from "../admin/admin.service.js";

function toPublicSession(session) {
  if (!session) return session;
  return {
    access_token: session.access_token,
    refresh_token: session.refresh_token,
    expires_at: session.expires_at,
    expires_in: session.expires_in,
    token_type: session.token_type,
  };
}

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

export const loginUser = async ({ email, password, expectedRole, inviteToken }) => {
  const normalizedEmail = email.toLowerCase().trim();
  const token = typeof inviteToken === "string" ? inviteToken.trim() : "";

  if (token) {
    const inviteProfile = await prisma.profile.findUnique({
      where: { invitationToken: token },
    });

    if (!inviteProfile) {
      throw new Error(
        "This login link has already been used. Open the login page, select your role, and sign in.",
      );
    }

    if (inviteProfile.email !== normalizedEmail) {
      throw new Error(
        "This login link does not match the email you entered.",
      );
    }
  }

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

  if (profile.status === "Inactive") {
    throw new Error(
      "This account has been deactivated. Contact your administrator.",
    );
  }

  assertInviteNotExpired(profile);

  const mappedRole = String(profile.role || "").toLowerCase();
  if (
    (profile.role === "AUTHORITY" || profile.role === "OFFICER") &&
    expectedRole &&
    expectedRole !== mappedRole
  ) {
    throw new Error(
      `Select ${profile.role === "AUTHORITY" ? "Authority" : "Officer"} on the login page before signing in.`,
    );
  }

  if (profile.role === "AUTHORITY" || profile.role === "OFFICER") {
    if (profile.invitationToken) {
      if (!token) {
        throw new Error(
          "Open the one-time invitation link from your email to sign in for the first time.",
        );
      }

      if (profile.invitationToken !== token) {
        throw new Error(
          "This login link has already been used. Open the login page, select your role, and sign in.",
        );
      }

      await prisma.profile.update({
        where: { id: profile.id },
        data: {
          invitationToken: null,
          invitationStatus: "ACCEPTED",
          acceptedAt: profile.acceptedAt || new Date(),
        },
      });
    } else if (token) {
      throw new Error(
        "This login link has already been used. Open the login page, select your role, and sign in.",
      );
    }
  }

  return buildLoginPayload(
    { ...profile, invitationToken: null, invitationStatus: "ACCEPTED" },
    toPublicSession(authData.session),
  );
};

export const getLoginInvite = async (token) => {
  const profile = await prisma.profile.findUnique({
    where: { invitationToken: token },
    include: profileInclude,
  });

  if (!profile) {
    throw new Error(
      "This login link has already been used. Open the login page, select your role, and sign in.",
    );
  }

  if (profile.role !== "AUTHORITY" && profile.role !== "OFFICER") {
    throw new Error("This login link is invalid.");
  }

  assertInviteNotExpired(profile);

  return {
    valid: true,
    email: profile.email,
    fullName: profile.fullName,
    role: profile.role,
    authorityName: profile.authority?.name || profile.officer?.authority?.name,
  };
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
    session: toPublicSession(authData.session),
  };
};

export const refreshAuthSession = async (refreshToken) => {
  const { data, error } = await supabase.auth.refreshSession({
    refresh_token: refreshToken,
  });

  if (error || !data.session) {
    throw new Error("Invalid or expired access token");
  }

  return { session: toPublicSession(data.session) };
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

export const updateCurrentUser = async (userId, data) => {
  const profile = await prisma.profile.findUnique({
    where: { id: userId },
  });

  if (!profile) {
    throw new Error("Account not found");
  }

  if (data.fullName && data.fullName !== profile.fullName) {
    const supabaseAdmin = getSupabaseAdmin();
    await supabaseAdmin.auth.admin.updateUserById(profile.id, {
      user_metadata: { fullName: data.fullName },
    });
  }

  return prisma.profile.update({
    where: { id: profile.id },
    data: {
      fullName: data.fullName || profile.fullName,
      phone: data.phone !== undefined ? data.phone || null : profile.phone,
      district:
        data.district !== undefined ? data.district || null : profile.district,
      location:
        data.location !== undefined ? data.location || null : profile.location,
    },
    include: profileInclude,
  });
};
