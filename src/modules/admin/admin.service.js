import prisma from "../../config/database.js";
import { getSupabaseAdmin } from "../../config/supabaseAdmin.js";
import { sendInvitationEmail } from "../../utils/email.js";
import {
  generateInvitationToken,
  generateTemporaryPassword,
} from "../../utils/password.js";
import { randomUUID } from "crypto";
import { authorityNamesMatch } from "../complaints/complaint.helpers.js";

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
  markPasswordSet = false,
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

  try {
    const profile = await prisma.profile.create({
      data: {
        id: authData.user.id,
        fullName,
        email: normalizedEmail,
        phone: phone || null,
        role,
        invitationStatus: markPasswordSet ? "ACCEPTED" : "PENDING",
        invitationToken,
        isPasswordSet: markPasswordSet,
        createdBy,
        invitedAt,
        acceptedAt: markPasswordSet ? invitedAt : null,
      },
      include: profileInclude,
    });

    const frontendUrl = (process.env.FRONTEND_URL || "https://civic-link-frontkend.vercel.app").replace(
      /\/$/,
      "",
    );
    const roleParam = String(role || "").toLowerCase();
    const loginUrl = `${frontendUrl}/login?role=${roleParam}&invite=${invitationToken}`;
    const inviteUrl = loginUrl;

    return {
      profile,
      tempPassword,
      inviteUrl,
      loginUrl,
      invitationToken,
    };
  } catch (error) {
    await supabaseAdmin.auth.admin.deleteUser(authData.user.id).catch(() => {});
    throw error;
  }
}

export const createAuthority = async (adminId, data) => {
  const password = generateTemporaryPassword();
  const { profile, tempPassword, loginUrl } =
    await createInvitedUser({
      email: data.email,
      fullName: data.name,
      phone: data.phone,
      role: "AUTHORITY",
      createdBy: adminId,
      tempPassword: password,
      markPasswordSet: true,
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
  }).catch(async (error) => {
    await prisma.profile.delete({ where: { id: profile.id } }).catch(() => {});
    await getSupabaseAdmin().auth.admin.deleteUser(profile.id).catch(() => {});
    throw error;
  });

  const emailStatus = await sendInvitationEmail({
    to: data.email,
    fullName: data.name,
    tempPassword,
    inviteUrl: loginUrl,
    role: "AUTHORITY",
    authorityName: data.name,
  });

  return {
    authority: await attachAuthorityCardStats(authority),
    tempPassword,
    inviteUrl: loginUrl,
    loginUrl,
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
  const { profile, tempPassword: password, inviteUrl, loginUrl } =
    await createInvitedUser({
      email: data.email,
      fullName,
      phone: data.phone,
      role: "OFFICER",
      createdBy: adminId,
      tempPassword,
      markPasswordSet: true,
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
    inviteUrl: loginUrl || inviteUrl,
    role: "OFFICER",
    authorityName: authority.name,
  });

  return {
    officer: await attachOfficerReportStats(officer),
    tempPassword: password,
    inviteUrl: loginUrl || inviteUrl,
    loginUrl,
    emailStatus,
  };
};

function reportStatusKey(status) {
  return String(status || "")
    .toUpperCase()
    .replace(/[\s-]+/g, "_");
}

function isResolvedReport(status) {
  const key = reportStatusKey(status);
  return key === "RESOLVED" || key === "COMPLETED";
}

function isActiveReport(status) {
  const key = reportStatusKey(status);
  return !["RESOLVED", "COMPLETED", "REJECTED"].includes(key);
}

function complaintsForAuthority(complaints, authority) {
  return complaints.filter(
    (complaint) =>
      complaint.assignedAuthority === authority.id ||
      authorityNamesMatch(complaint.assignedAuthority, authority.name),
  );
}

function complaintMatchesOfficer(complaint, officer) {
  const assigned = String(complaint.assignedOfficer || "")
    .trim()
    .toLowerCase();
  if (!assigned) return false;

  const keys = [
    officer.id,
    officer.profileId,
    officer.profile?.fullName,
    officer.profile?.email,
  ]
    .filter(Boolean)
    .map((value) => String(value).trim().toLowerCase());

  return keys.includes(assigned);
}

function decorateOfficerWithReportStats(officer, complaints) {
  const related = complaints.filter((item) =>
    complaintMatchesOfficer(item, officer),
  );
  return {
    ...officer,
    activeReports: related.filter((item) => isActiveReport(item.status)).length,
    completedReports: related.filter((item) => isResolvedReport(item.status))
      .length,
  };
}

async function loadAssignmentComplaints() {
  return prisma.complaint.findMany({
    select: {
      assignedAuthority: true,
      assignedOfficer: true,
      status: true,
    },
  });
}

async function attachOfficerReportStats(officers) {
  const isList = Array.isArray(officers);
  const list = (isList ? officers : [officers]).filter(Boolean);
  if (!list.length) return isList ? [] : officers;

  const complaints = await loadAssignmentComplaints();
  const decorate = (officer) =>
    decorateOfficerWithReportStats(officer, complaints);

  return isList ? list.map(decorate) : decorate(officers);
}

async function attachAuthorityCardStats(authorities) {
  const isList = Array.isArray(authorities);
  const list = (isList ? authorities : [authorities]).filter(Boolean);
  if (!list.length) return isList ? [] : authorities;

  const complaints = await loadAssignmentComplaints();

  const decorate = (authority) => {
    const related = complaintsForAuthority(complaints, authority);
    const officers = (authority.officers || []).map((officer) =>
      decorateOfficerWithReportStats(officer, complaints),
    );
    return {
      ...authority,
      officers,
      officerCount: authority._count?.officers ?? officers.length,
      activeReports: related.filter((item) => isActiveReport(item.status)).length,
      resolvedReports: related.filter((item) => isResolvedReport(item.status)).length,
    };
  };

  return isList ? list.map(decorate) : decorate(authorities);
}

export const listAuthorities = async () => {
  const authorities = await prisma.authority.findMany({
    include: {
      profile: true,
      officers: { include: { profile: true } },
      _count: { select: { officers: true } },
    },
    orderBy: { createdAt: "desc" },
  });
  return attachAuthorityCardStats(authorities);
};

export const listOfficers = async () => {
  const officers = await prisma.officer.findMany({
    include: {
      profile: true,
      authority: true,
    },
    orderBy: { createdAt: "desc" },
  });
  return attachOfficerReportStats(officers);
};

export const resetOfficerPassword = async (officerId) => {
  const officer = await prisma.officer.findUnique({
    where: { id: officerId },
    include: { profile: true, authority: true },
  });

  if (!officer) {
    throw new Error("Officer not found");
  }

  const tempPassword = generateTemporaryPassword();
  const invitationToken = generateInvitationToken();
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
      invitationToken,
    },
  });

  const frontendUrl = (process.env.FRONTEND_URL || "https://civic-link-frontkend.vercel.app").replace(
    /\/$/,
    "",
  );
  const loginUrl = `${frontendUrl}/login?role=officer&invite=${invitationToken}`;
  const emailStatus = await sendInvitationEmail({
    to: officer.profile.email,
    fullName: officer.profile.fullName,
    tempPassword,
    inviteUrl: loginUrl,
    role: "OFFICER",
    authorityName: officer.authority?.name,
  });

  return {
    tempPassword,
    email: officer.profile.email,
    loginUrl,
    inviteUrl: loginUrl,
    emailStatus,
  };
};

const authorityInclude = {
  profile: true,
  officers: { include: { profile: true } },
  _count: { select: { officers: true } },
};

const officerInclude = {
  profile: true,
  authority: true,
};

async function setAuthBan(userId, inactive) {
  try {
    const supabaseAdmin = getSupabaseAdmin();
    const { error } = await supabaseAdmin.auth.admin.updateUserById(userId, {
      ban_duration: inactive ? "876000h" : "none",
    });
    if (error) console.error("Failed to update auth ban status:", error.message);
  } catch (error) {
    console.error("Failed to update auth ban status:", error.message);
  }
}

async function safeDeleteAuthUser(userId) {
  try {
    const supabaseAdmin = getSupabaseAdmin();
    const { error } = await supabaseAdmin.auth.admin.deleteUser(userId);
    if (error) console.error("Failed to delete auth user:", error.message);
  } catch (error) {
    console.error("Failed to delete auth user:", error.message);
  }
}

async function syncProfileEmailAndName(profile, { email, fullName, phone }) {
  const nextEmail = email?.toLowerCase().trim();
  const supabaseAdmin = getSupabaseAdmin();

  if (nextEmail && nextEmail !== profile.email) {
    const existing = await prisma.profile.findUnique({ where: { email: nextEmail } });
    if (existing && existing.id !== profile.id) {
      throw new Error("An account with this email already exists");
    }
    const { error } = await supabaseAdmin.auth.admin.updateUserById(profile.id, {
      email: nextEmail,
      user_metadata: { fullName: fullName || profile.fullName },
    });
    if (error) throw new Error(error.message);
  } else if (fullName && fullName !== profile.fullName) {
    await supabaseAdmin.auth.admin.updateUserById(profile.id, {
      user_metadata: { fullName },
    });
  }

  return prisma.profile.update({
    where: { id: profile.id },
    data: {
      fullName: fullName || profile.fullName,
      email: nextEmail || profile.email,
      phone: phone !== undefined ? phone || null : profile.phone,
    },
  });
}

async function findAuthorityOrThrow(authorityId) {
  const authority = await prisma.authority.findUnique({
    where: { id: authorityId },
    include: authorityInclude,
  });
  if (!authority) throw new Error("Authority not found");
  return authority;
}

export const getAuthority = async (authorityId) => {
  return attachAuthorityCardStats(await findAuthorityOrThrow(authorityId));
};

export const toggleAuthorityStatus = async (authorityId) => {
  const authority = await findAuthorityOrThrow(authorityId);
  const newStatus = authority.status === "Active" ? "Inactive" : "Active";

  await prisma.profile.update({
    where: { id: authority.profileId },
    data: { status: newStatus },
  });
  await setAuthBan(authority.profileId, newStatus === "Inactive");

  const updated = await prisma.authority.update({
    where: { id: authorityId },
    data: { status: newStatus },
    include: authorityInclude,
  });
  return attachAuthorityCardStats(updated);
};

export const updateAuthority = async (authorityId, data) => {
  const authority = await findAuthorityOrThrow(authorityId);

  await syncProfileEmailAndName(authority.profile, {
    email: data.email,
    fullName: data.name,
    phone: data.phone,
  });

  const updated = await prisma.authority.update({
    where: { id: authorityId },
    data: {
      name: data.name || authority.name,
      phone: data.phone !== undefined ? data.phone || null : authority.phone,
      address: data.address !== undefined ? data.address || null : authority.address,
      coverage: data.coverage !== undefined ? data.coverage || null : authority.coverage,
      district: data.district !== undefined ? data.district || null : authority.district,
      description:
        data.description !== undefined ? data.description || null : authority.description,
    },
    include: authorityInclude,
  });
  return attachAuthorityCardStats(updated);
};

export const deleteAuthority = async (authorityId) => {
  const authority = await findAuthorityOrThrow(authorityId);

  for (const officer of authority.officers || []) {
    await safeDeleteAuthUser(officer.profileId);
    await prisma.officer.delete({ where: { id: officer.id } });
    await prisma.profile.delete({ where: { id: officer.profileId } }).catch(() => {});
  }

  await safeDeleteAuthUser(authority.profileId);
  await prisma.authority.delete({ where: { id: authorityId } });
  await prisma.profile.delete({ where: { id: authority.profileId } }).catch(() => {});

  return { success: true, message: "Authority deleted successfully" };
};

export const getOfficer = async (officerId) => {
  const officer = await prisma.officer.findUnique({
    where: { id: officerId },
    include: officerInclude,
  });
  if (!officer) throw new Error("Officer not found");
  return attachOfficerReportStats(officer);
};

export const toggleOfficerStatus = async (officerId) => {
  const officer = await getOfficer(officerId);
  const newStatus = officer.status === "Active" ? "Inactive" : "Active";

  await prisma.profile.update({
    where: { id: officer.profileId },
    data: { status: newStatus },
  });
  await setAuthBan(officer.profileId, newStatus === "Inactive");

  const updated = await prisma.officer.update({
    where: { id: officerId },
    data: { status: newStatus },
    include: officerInclude,
  });
  return attachOfficerReportStats(updated);
};

export const updateOfficer = async (officerId, data) => {
  const officer = await getOfficer(officerId);

  if (data.authorityId && data.authorityId !== officer.authorityId) {
    const authority = await prisma.authority.findUnique({
      where: { id: data.authorityId },
    });
    if (!authority) throw new Error("Selected authority was not found");
  }

  const fullName = [data.firstName, data.lastName].filter(Boolean).join(" ").trim();
  await syncProfileEmailAndName(officer.profile, {
    email: data.email,
    fullName: fullName || officer.profile.fullName,
    phone: data.phone,
  });

  const updated = await prisma.officer.update({
    where: { id: officerId },
    data: {
      position: data.position !== undefined ? data.position || null : officer.position,
      department:
        data.department !== undefined ? data.department || null : officer.department,
      authorityId: data.authorityId || officer.authorityId,
    },
    include: officerInclude,
  });
  return attachOfficerReportStats(updated);
};

export const deleteOfficer = async (officerId) => {
  const officer = await getOfficer(officerId);
  await safeDeleteAuthUser(officer.profileId);
  await prisma.officer.delete({ where: { id: officerId } });
  await prisma.profile.delete({ where: { id: officer.profileId } }).catch(() => {});
  return { success: true, message: "Officer deleted successfully" };
};

function toCategoryCode(name) {
  return (
    String(name || "")
      .trim()
      .toUpperCase()
      .replace(/[^A-Z0-9]+/g, "_")
      .replace(/^_+|_+$/g, "") || "OTHER"
  );
}

const DEFAULT_CATEGORIES = [
  { code: "ROADS_INFRASTRUCTURE", name: "Roads & Infrastructure", icon: "TrafficCone", color: "#4f46e5" },
  { code: "GARBAGE_WASTE", name: "Garbage & Waste", icon: "Trash2", color: "#7c3aed" },
  { code: "WATER_LEAKAGE", name: "Water Leakage", icon: "Droplets", color: "#0ea5e9" },
  { code: "STREETLIGHT_ELECTRICAL", name: "Streetlight & Electrical", icon: "Lightbulb", color: "#0284c7" },
  { code: "DRAINAGE_FLOODING", name: "Drainage & Flooding", icon: "Waves", color: "#06b6d4" },
  { code: "ENVIRONMENTAL_ISSUES", name: "Environmental Issues", icon: "TreePine", color: "#16a34a" },
  { code: "PUBLIC_SAFETY", name: "Public Safety", icon: "ShieldAlert", color: "#d97706" },
  { code: "DISASTER_EMERGENCY", name: "Disaster & Emergency", icon: "ShieldAlert", color: "#e11d48" },
  { code: "AGRICULTURE", name: "Agriculture", icon: "TreePine", color: "#65a30d" },
  { code: "ANIMAL_HEALTH", name: "Animal Health", icon: "ShieldAlert", color: "#f59e0b" },
  { code: "FOREST_WILDLIFE", name: "Forest & Wildlife", icon: "TreePine", color: "#15803d" },
  { code: "COASTAL_ISSUES", name: "Coastal Issues", icon: "Waves", color: "#0284c7" },
  { code: "MARINE_POLLUTION", name: "Marine Pollution", icon: "Waves", color: "#1d4ed8" },
  { code: "CHILD_PROTECTION", name: "Child Protection", icon: "ShieldAlert", color: "#db2777" },
  { code: "HOUSING", name: "Housing", icon: "Tag", color: "#7c3aed" },
  { code: "CONSTRUCTION", name: "Construction", icon: "TrafficCone", color: "#ea580c" },
  { code: "TELECOMMUNICATION", name: "Telecommunication", icon: "Lightbulb", color: "#4f46e5" },
  { code: "OTHER", name: "Other", icon: "Tag", color: "#64748b" },
];

async function ensureCategoriesTable() {
  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS "categories" (
      "id" TEXT NOT NULL,
      "name" TEXT NOT NULL,
      "icon" TEXT NOT NULL DEFAULT 'Tag',
      "color" TEXT NOT NULL DEFAULT '#4f46e5',
      "status" TEXT NOT NULL DEFAULT 'Active',
      "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
    )
  `);
  await prisma.$executeRawUnsafe(
    `ALTER TABLE "categories" ADD COLUMN IF NOT EXISTS "code" TEXT`,
  );
  await prisma.$executeRawUnsafe(
    `CREATE UNIQUE INDEX IF NOT EXISTS "categories_name_key" ON "categories"("name")`,
  );
}

async function fetchCategories() {
  return prisma.$queryRaw`
    SELECT id, name, icon, color, status, code, created_at AS "createdAt", updated_at AS "updatedAt"
    FROM "categories"
    ORDER BY created_at ASC
  `;
}

async function seedIssueCategories() {
  for (const item of DEFAULT_CATEGORIES) {
    await prisma.$executeRaw`
      INSERT INTO "categories" (id, name, icon, color, status, code, created_at, updated_at)
      VALUES (${randomUUID()}, ${item.name}, ${item.icon}, ${item.color}, ${"Active"}, ${item.code}, NOW(), NOW())
      ON CONFLICT (name) DO NOTHING
    `;
  }
  const rows = await fetchCategories();
  for (const row of rows) {
    if (!row.code) {
      const code = toCategoryCode(row.name);
      await prisma.$executeRaw`
        UPDATE "categories" SET code = ${code} WHERE id = ${row.id} AND (code IS NULL OR code = '')
      `;
    }
  }
}

async function withCategoryReportCounts(categories) {
  const reports = await prisma.complaint.groupBy({
    by: ["category"],
    _count: { _all: true },
  }).catch(() => []);

  const counts = new Map(
    reports.map((row) => [String(row.category).toLowerCase(), row._count._all]),
  );

  return categories.map((category) => ({
    ...category,
    code: category.code || toCategoryCode(category.name),
    reports:
      counts.get(String(category.name).toLowerCase()) ||
      counts.get(String(category.code || "").toLowerCase()) ||
      0,
  }));
}

export const listCategories = async () => {
  await ensureCategoriesTable();
  await seedIssueCategories();
  const categories = await fetchCategories();
  return withCategoryReportCounts(categories);
};

export const listActiveCategories = async () => {
  const categories = await listCategories();
  return categories.filter((category) => category.status === "Active");
};

export const createCategory = async (data) => {
  await ensureCategoriesTable();
  const name = data.name.trim();
  const code = toCategoryCode(name);
  const existing = await prisma.$queryRaw`
    SELECT id FROM "categories" WHERE name = ${name} OR code = ${code} LIMIT 1
  `;
  if (existing.length) throw new Error("A category with this name already exists");

  const id = randomUUID();
  await prisma.$executeRaw`
    INSERT INTO "categories" (id, name, icon, color, status, code, created_at, updated_at)
    VALUES (${id}, ${name}, ${data.icon || "Tag"}, ${data.color || "#4f46e5"}, ${"Active"}, ${code}, NOW(), NOW())
  `;
  const [category] = await prisma.$queryRaw`
    SELECT id, name, icon, color, status, code FROM "categories" WHERE id = ${id}
  `;
  return { ...category, reports: 0 };
};

export const updateCategory = async (categoryId, data) => {
  await ensureCategoriesTable();
  const rows = await prisma.$queryRaw`
    SELECT id, name, icon, color, status, code FROM "categories" WHERE id = ${categoryId} LIMIT 1
  `;
  if (!rows.length) throw new Error("Category not found");
  const category = rows[0];
  const name = data.name?.trim() || category.name;
  const icon = data.icon || category.icon;
  const color = data.color || category.color;
  const code = toCategoryCode(name);
  await prisma.$executeRaw`
    UPDATE "categories"
    SET name = ${name}, icon = ${icon}, color = ${color}, code = ${code}, updated_at = NOW()
    WHERE id = ${categoryId}
  `;
  const [updated] = await prisma.$queryRaw`
    SELECT id, name, icon, color, status, code FROM "categories" WHERE id = ${categoryId}
  `;
  const [withCounts] = await withCategoryReportCounts([updated]);
  return withCounts;
};

export const toggleCategoryStatus = async (categoryId) => {
  await ensureCategoriesTable();
  const rows = await prisma.$queryRaw`
    SELECT id, status FROM "categories" WHERE id = ${categoryId} LIMIT 1
  `;
  if (!rows.length) throw new Error("Category not found");
  const nextStatus = rows[0].status === "Active" ? "Inactive" : "Active";
  await prisma.$executeRaw`
    UPDATE "categories" SET status = ${nextStatus}, updated_at = NOW() WHERE id = ${categoryId}
  `;
  const [updated] = await prisma.$queryRaw`
    SELECT id, name, icon, color, status, code FROM "categories" WHERE id = ${categoryId}
  `;
  const [withCounts] = await withCategoryReportCounts([updated]);
  return withCounts;
};

export const deleteCategory = async (categoryId) => {
  await ensureCategoriesTable();
  const rows = await prisma.$queryRaw`
    SELECT id FROM "categories" WHERE id = ${categoryId} LIMIT 1
  `;
  if (!rows.length) throw new Error("Category not found");
  await prisma.$executeRaw`DELETE FROM "categories" WHERE id = ${categoryId}`;
  return { success: true, message: "Category deleted successfully" };
};

function formatReportLabel(value, fallback) {
  if (!value) return fallback;
  const key = String(value).toUpperCase().replace(/[\s-]+/g, "_");
  const statusMap = {
    SUBMITTED: "Pending",
    PENDING: "Pending",
    ASSIGNED: "Assigned",
    IN_PROGRESS: "In Progress",
    RESOLVED: "Resolved",
    REJECTED: "Rejected",
  };
  const priorityMap = {
    CRITICAL: "Critical",
    HIGH: "High",
    MEDIUM: "Medium",
    LOW: "Low",
  };
  return statusMap[key] || priorityMap[key] || value;
}

function formatJoinedDate(value) {
  if (!value) return "—";
  return new Date(value).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export const mapAdminReport = (report, citizen) => {
  const confidence =
    report.confidence !== null && report.confidence !== undefined
      ? Math.round(Number(report.confidence) <= 1 ? report.confidence * 100 : report.confidence)
      : 0;

  return {
    id: report.reportId || report.id,
    dbId: report.id,
    title: report.detectedIssue || report.category,
    image: report.imageUrl || "",
    category: report.category,
    citizen: citizen?.fullName || "Unknown citizen",
    citizenEmail: citizen?.email || "—",
    authority: report.assignedAuthority || "—",
    officer: "—",
    priority: formatReportLabel(report.priority, "Medium"),
    status: formatReportLabel(report.status, "Assigned"),
    created: formatJoinedDate(report.createdAt),
    updated: formatJoinedDate(report.updatedAt),
    district: citizen?.district || "—",
    location: report.location,
    lat: null,
    lng: null,
    aiCategory: report.category,
    confidence,
    description: report.description,
    reason: report.reason || "",
    userId: report.userId,
    createdAt: report.createdAt,
  };
};

export const listReports = async () => {
  const reports = await prisma.complaint.findMany({
    orderBy: { createdAt: "desc" },
  });
  const userIds = [...new Set(reports.map((r) => r.userId).filter(Boolean))];
  const citizens = userIds.length
    ? await prisma.profile.findMany({ where: { id: { in: userIds } } })
    : [];
  const citizenMap = new Map(citizens.map((c) => [c.id, c]));
  return reports.map((report) => mapAdminReport(report, citizenMap.get(report.userId)));
};

export const getReport = async (reportId) => {
  const report =
    (await prisma.complaint.findUnique({ where: { reportId } })) ||
    (await prisma.complaint.findUnique({ where: { id: reportId } }));
  if (!report) throw new Error("Report not found");
  const citizen = report.userId
    ? await prisma.profile.findUnique({ where: { id: report.userId } })
    : null;
  return mapAdminReport(report, citizen);
};

export const updateReport = async (reportId, data) => {
  const existing =
    (await prisma.complaint.findUnique({ where: { reportId } })) ||
    (await prisma.complaint.findUnique({ where: { id: reportId } }));
  if (!existing) throw new Error("Report not found");

  const toDbStatus = (value) => {
    if (!value) return undefined;
    const key = String(value).toUpperCase().replace(/[\s-]+/g, "_");
    const map = {
      PENDING: "SUBMITTED",
      SUBMITTED: "SUBMITTED",
      ASSIGNED: "ASSIGNED",
      IN_PROGRESS: "IN_PROGRESS",
      RESOLVED: "RESOLVED",
      REJECTED: "REJECTED",
    };
    return map[key] || key;
  };

  const updated = await prisma.complaint.update({
    where: { id: existing.id },
    data: {
      status: toDbStatus(data.status) || existing.status,
      priority: data.priority ? String(data.priority).toUpperCase() : existing.priority,
      assignedAuthority:
        data.assignedAuthority !== undefined
          ? data.assignedAuthority || existing.assignedAuthority
          : existing.assignedAuthority,
      category: data.category || existing.category,
    },
  });

  const citizen = updated.userId
    ? await prisma.profile.findUnique({ where: { id: updated.userId } })
    : null;
  return mapAdminReport(updated, citizen);
};

export const deleteReport = async (reportId) => {
  const existing =
    (await prisma.complaint.findUnique({ where: { reportId } })) ||
    (await prisma.complaint.findUnique({ where: { id: reportId } }));
  if (!existing) throw new Error("Report not found");
  await prisma.complaint.delete({ where: { id: existing.id } });
  return { success: true, message: "Report deleted successfully" };
};

function summarizeCitizenReports(reports = []) {
  const resolved = reports.filter(
    (r) => String(r.status).toUpperCase() === "RESOLVED",
  ).length;
  const inProgress = reports.filter(
    (r) => String(r.status).toUpperCase() === "IN_PROGRESS",
  ).length;
  const pending = reports.filter((r) => {
    const status = String(r.status).toUpperCase();
    return !["RESOLVED", "REJECTED", "IN_PROGRESS"].includes(status);
  }).length;

  return {
    reports: reports.length,
    totalReports: reports.length,
    resolvedReports: resolved,
    pendingReports: pending,
    inProgressReports: inProgress,
    recentActivity: reports.slice(0, 8).map((r) => ({
      id: r.id,
      action: String(r.status).toUpperCase() === "RESOLVED" ? "resolved" : "submitted",
      title:
        String(r.status).toUpperCase() === "RESOLVED"
          ? "Report resolved"
          : "Submitted a report",
      description: `${r.detectedIssue || r.category} (${r.reportId})`,
      time: formatJoinedDate(r.createdAt),
    })),
  };
}

export const mapCitizen = (profile, reports = []) => {
  const stats = summarizeCitizenReports(reports);
  return {
    id: profile.id,
    fullName: profile.fullName,
    email: profile.email,
    phone: profile.phone || "—",
    district: profile.district || "—",
    location: profile.location || profile.district || "—",
    joined: formatJoinedDate(profile.createdAt),
    createdAt: profile.createdAt,
    status: profile.status || "Active",
    ...stats,
  };
};

async function loadCitizenOrThrow(userId) {
  const profile = await prisma.profile.findUnique({
    where: { id: userId },
  });

  if (!profile || profile.role !== "CITIZEN") {
    throw new Error("Citizen user not found");
  }

  return profile;
}

async function reportsForUsers(userIds) {
  if (!userIds.length) return [];
  return prisma.complaint.findMany({
    where: { userId: { in: userIds } },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      userId: true,
      reportId: true,
      detectedIssue: true,
      category: true,
      status: true,
      createdAt: true,
    },
  });
}

export const listCitizens = async () => {
  const profiles = await prisma.profile.findMany({
    where: { role: "CITIZEN" },
    orderBy: { createdAt: "desc" },
  });

  let reports = [];
  try {
    reports = await reportsForUsers(profiles.map((p) => p.id));
  } catch (error) {
    console.error("Failed to load citizen reports:", error.message);
  }
  const reportsByUser = new Map();

  reports.forEach((report) => {
    if (!report.userId) return;
    const list = reportsByUser.get(report.userId) || [];
    list.push(report);
    reportsByUser.set(report.userId, list);
  });

  return profiles.map((profile) =>
    mapCitizen(profile, reportsByUser.get(profile.id) || []),
  );
};

export const getCitizen = async (userId) => {
  const profile = await loadCitizenOrThrow(userId);
  const reports = await reportsForUsers([profile.id]);
  return mapCitizen(profile, reports);
};

export const updateCitizen = async (userId, data) => {
  const profile = await loadCitizenOrThrow(userId);
  const nextEmail = data.email?.toLowerCase().trim();

  if (nextEmail && nextEmail !== profile.email) {
    const existing = await prisma.profile.findUnique({
      where: { email: nextEmail },
    });
    if (existing && existing.id !== profile.id) {
      throw new Error("An account with this email already exists");
    }

    const supabaseAdmin = getSupabaseAdmin();
    const { error } = await supabaseAdmin.auth.admin.updateUserById(profile.id, {
      email: nextEmail,
      user_metadata: { fullName: data.fullName || profile.fullName },
    });
    if (error) throw new Error(error.message);
  } else if (data.fullName && data.fullName !== profile.fullName) {
    const supabaseAdmin = getSupabaseAdmin();
    await supabaseAdmin.auth.admin.updateUserById(profile.id, {
      user_metadata: { fullName: data.fullName },
    });
  }

  const updated = await prisma.profile.update({
    where: { id: profile.id },
    data: {
      fullName: data.fullName || profile.fullName,
      email: nextEmail || profile.email,
      phone: data.phone !== undefined ? data.phone || null : profile.phone,
      district:
        data.district !== undefined ? data.district || null : profile.district,
      location:
        data.location !== undefined ? data.location || null : profile.location,
    },
  });

  const reports = await reportsForUsers([updated.id]);
  return mapCitizen(updated, reports);
};

export const toggleCitizenStatus = async (userId) => {
  const profile = await loadCitizenOrThrow(userId);
  const newStatus = profile.status === "Active" ? "Inactive" : "Active";

  const supabaseAdmin = getSupabaseAdmin();
  const { error } = await supabaseAdmin.auth.admin.updateUserById(profile.id, {
    ban_duration: newStatus === "Inactive" ? "876000h" : "none",
  });
  if (error) {
    console.error("Failed to update auth ban status:", error.message);
  }

  const updated = await prisma.profile.update({
    where: { id: profile.id },
    data: { status: newStatus },
  });

  const reports = await reportsForUsers([updated.id]);
  return mapCitizen(updated, reports);
};

export const deleteCitizen = async (userId) => {
  const profile = await loadCitizenOrThrow(userId);

  await prisma.complaint.updateMany({
    where: { userId: profile.id },
    data: { userId: null },
  });

  const supabaseAdmin = getSupabaseAdmin();
  const { error } = await supabaseAdmin.auth.admin.deleteUser(profile.id);
  if (error) {
    console.error("Failed to delete auth user:", error.message);
  }

  await prisma.profile.delete({
    where: { id: profile.id },
  });

  return { success: true, message: "Citizen deleted successfully" };
};

function periodStart(period) {
  const now = new Date();
  if (period === "Last 30 days") return new Date(now.getTime() - 30 * 86_400_000);
  if (period === "Last 90 days") return new Date(now.getTime() - 90 * 86_400_000);
  if (period === "This Year") return new Date(now.getFullYear(), 0, 1);
  return null;
}

function inPeriod(date, start) {
  if (!start) return true;
  return new Date(date) >= start;
}

function statusBucket(status) {
  const key = String(status || "").toUpperCase();
  if (key === "RESOLVED") return "Resolved";
  if (key === "REJECTED") return "Rejected";
  if (key === "IN_PROGRESS" || key === "ASSIGNED") return "In Progress";
  return "Pending";
}

function percentChange(current, previous) {
  if (!previous) return current ? 100 : 0;
  return Math.round(((current - previous) / previous) * 1000) / 10;
}

function lastTwelveMonths() {
  const months = [];
  const now = new Date();
  for (let i = 11; i >= 0; i -= 1) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    months.push({
      key: `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`,
      month: date.toLocaleString("en-GB", { month: "short" }),
      year: date.getFullYear(),
    });
  }
  return months;
}

function relativeStamp(iso) {
  const created = new Date(iso);
  if (Number.isNaN(created.getTime())) {
    return { date: "—", time: "", diffDays: 99 };
  }
  const startToday = new Date();
  startToday.setHours(0, 0, 0, 0);
  const startCreated = new Date(created);
  startCreated.setHours(0, 0, 0, 0);
  const diffDays = Math.round((startToday - startCreated) / 86_400_000);
  let date = created.toLocaleDateString("en-GB", { day: "2-digit", month: "short" });
  if (diffDays === 0) date = "Today";
  else if (diffDays === 1) date = "Yesterday";
  else if (diffDays === 2) date = "2 days ago";
  const time = created.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });
  return { date, time, diffDays, createdAt: created.toISOString() };
}

export const getAdminInsights = async (period = "This Year") => {
  const start = periodStart(period);
  const prevStart = start
    ? new Date(start.getTime() - (Date.now() - start.getTime()))
    : null;

  const [citizens, authorities, officers, complaints] = await Promise.all([
    prisma.profile.count({ where: { role: "CITIZEN" } }),
    prisma.authority.findMany({ include: { profile: true } }),
    prisma.officer.findMany({ include: { profile: true, authority: true } }),
    prisma.complaint.findMany({ orderBy: { createdAt: "desc" } }),
  ]);

  const userIds = [...new Set(complaints.map((c) => c.userId).filter(Boolean))];
  const citizensProfiles = userIds.length
    ? await prisma.profile.findMany({ where: { id: { in: userIds } } })
    : [];
  const citizenMap = new Map(citizensProfiles.map((c) => [c.id, c]));

  const scoped = complaints.filter((c) => inPeriod(c.createdAt, start));
  const previous = start
    ? complaints.filter(
        (c) =>
          prevStart &&
          new Date(c.createdAt) >= prevStart &&
          new Date(c.createdAt) < start,
      )
    : [];

  const countByBucket = (list) => {
    const buckets = {
      Pending: 0,
      "In Progress": 0,
      Resolved: 0,
      Rejected: 0,
    };
    list.forEach((item) => {
      buckets[statusBucket(item.status)] += 1;
    });
    return buckets;
  };

  const currentBuckets = countByBucket(scoped);
  const prevBuckets = countByBucket(previous);
  const totalReports = scoped.length;
  const resolutionRate = totalReports
    ? Math.round((currentBuckets.Resolved / totalReports) * 1000) / 10
    : 0;
  const prevTotal = previous.length;
  const prevResolution = prevTotal
    ? Math.round((prevBuckets.Resolved / prevTotal) * 1000) / 10
    : 0;

  const resolvedItems = scoped.filter((c) => statusBucket(c.status) === "Resolved");
  const avgResolutionDays = resolvedItems.length
    ? Math.round(
        (resolvedItems.reduce((sum, item) => {
          const end = new Date(item.updatedAt || item.createdAt);
          const begin = new Date(item.createdAt);
          return sum + Math.max(0, end - begin);
        }, 0) /
          resolvedItems.length /
          86_400_000) *
          10,
      ) / 10
    : 0;

  const months = lastTwelveMonths();
  const monthlyReports = months.map((month) => {
    const items = complaints.filter((c) => {
      const created = new Date(c.createdAt);
      const key = `${created.getFullYear()}-${String(created.getMonth() + 1).padStart(2, "0")}`;
      return key === month.key;
    });
    const resolved = items.filter((c) => statusBucket(c.status) === "Resolved").length;
    return {
      month: month.month,
      submitted: items.length,
      resolved,
      pending: items.length - resolved,
    };
  });

  const years = [...new Set(complaints.map((c) => new Date(c.createdAt).getFullYear()))]
    .sort()
    .slice(-4);
  const yearlyComparison = years.map((year) => {
    const items = complaints.filter((c) => new Date(c.createdAt).getFullYear() === year);
    return {
      year: String(year),
      submitted: items.length,
      resolved: items.filter((c) => statusBucket(c.status) === "Resolved").length,
    };
  });

  const categoryCounts = new Map();
  const districtCounts = new Map();
  const authorityCounts = new Map();
  const citizenCounts = new Map();

  scoped.forEach((item) => {
    const category = item.category || "Other";
    categoryCounts.set(category, (categoryCounts.get(category) || 0) + 1);

    const citizen = citizenMap.get(item.userId);
    const district =
      citizen?.district ||
      (item.location?.includes(",")
        ? item.location.split(",").pop().trim()
        : item.location) ||
      "Unspecified";
    districtCounts.set(district, (districtCounts.get(district) || 0) + 1);

    const authority = item.assignedAuthority || "Unassigned";
    const current = authorityCounts.get(authority) || { reports: 0, resolved: 0 };
    current.reports += 1;
    if (statusBucket(item.status) === "Resolved") current.resolved += 1;
    authorityCounts.set(authority, current);

    if (citizen) {
      const row = citizenCounts.get(citizen.id) || { name: citizen.fullName, reports: 0 };
      row.reports += 1;
      citizenCounts.set(citizen.id, row);
    }
  });

  const reportsByCategory = [...categoryCounts.entries()]
    .map(([category, value]) => ({ category, value }))
    .sort((a, b) => b.value - a.value);

  const reportsByDistrict = [...districtCounts.entries()]
    .map(([district, value]) => ({ district, value }))
    .sort((a, b) => b.value - a.value);

  const authorityPerformance = authorities.map((authority) => {
    const match =
      authorityCounts.get(authority.name) ||
      [...authorityCounts.entries()].find(([name]) =>
        name.toLowerCase().includes(authority.name.toLowerCase()),
      )?.[1] ||
      { reports: 0, resolved: 0 };
    const completionRate = match.reports
      ? Math.round((match.resolved / match.reports) * 100)
      : 0;
    const related = scoped.filter((c) =>
      String(c.assignedAuthority || "")
        .toLowerCase()
        .includes(authority.name.toLowerCase()),
    );
    const resolvedRelated = related.filter((c) => statusBucket(c.status) === "Resolved");
    const avgResolution = resolvedRelated.length
      ? Math.round(
          (resolvedRelated.reduce((sum, item) => {
            return sum + Math.max(0, new Date(item.updatedAt) - new Date(item.createdAt));
          }, 0) /
            resolvedRelated.length /
            86_400_000) *
            10,
        ) / 10
      : 0;
    return {
      id: authority.id,
      name: authority.name,
      reports: match.reports,
      resolved: match.resolved,
      completionRate,
      avgResolution,
      score: completionRate,
    };
  });

  const officerPerformance = officers.slice(0, 8).map((officer) => ({
    name: officer.profile?.fullName || "Officer",
    resolved: 0,
    authority: officer.authority?.name || "—",
  }));

  const assignedRate = totalReports
    ? Math.round(
        ((currentBuckets["In Progress"] + currentBuckets.Resolved) / totalReports) * 100,
      )
    : 0;
  const sevenDayResolved = resolvedItems.filter((item) => {
    return new Date(item.updatedAt) - new Date(item.createdAt) <= 7 * 86_400_000;
  }).length;
  const speedScore = resolvedItems.length
    ? Math.round((sevenDayResolved / resolvedItems.length) * 100)
    : 0;
  const coverageScore = authorities.length
    ? Math.round(
        (authorities.filter((a) =>
          scoped.some((c) =>
            String(c.assignedAuthority || "")
              .toLowerCase()
              .includes(a.name.toLowerCase()),
          ),
        ).length /
          authorities.length) *
          100,
      )
    : 0;

  const thisMonthKey = months[months.length - 1]?.key;
  const lastMonthKey = months[months.length - 2]?.key;
  const thisMonthCount = monthlyReports[monthlyReports.length - 1]?.submitted || 0;
  const lastMonthCount = monthlyReports[monthlyReports.length - 2]?.submitted || 0;

  const kpis = [
    {
      id: "total-users",
      label: "Total Users",
      value: String(citizens),
      change: 0,
      icon: "Users",
      iconBg: "bg-indigo-50 text-indigo-600 border-indigo-100",
      sparkColor: "#4f46e5",
      sparkData: monthlyReports.map((m) => m.submitted),
    },
    {
      id: "total-authorities",
      label: "Total Authorities",
      value: String(authorities.length),
      change: 0,
      icon: "Building2",
      iconBg: "bg-violet-50 text-violet-600 border-violet-100",
      sparkColor: "#7c3aed",
      sparkData: monthlyReports.map((m) => m.submitted),
    },
    {
      id: "total-officers",
      label: "Total Officers",
      value: String(officers.length),
      change: 0,
      icon: "ShieldCheck",
      iconBg: "bg-sky-50 text-sky-600 border-sky-100",
      sparkColor: "#0284c7",
      sparkData: monthlyReports.map((m) => m.resolved),
    },
    {
      id: "total-reports",
      label: "Total Reports",
      value: String(totalReports),
      change: percentChange(totalReports, prevTotal),
      icon: "ClipboardList",
      iconBg: "bg-blue-50 text-blue-600 border-blue-100",
      sparkColor: "#2563eb",
      sparkData: monthlyReports.map((m) => m.submitted),
    },
    {
      id: "reports-pending",
      label: "Reports Pending",
      value: String(currentBuckets.Pending),
      change: percentChange(currentBuckets.Pending, prevBuckets.Pending),
      icon: "Clock",
      iconBg: "bg-amber-50 text-amber-600 border-amber-100",
      sparkColor: "#d97706",
      sparkData: monthlyReports.map((m) => m.pending),
    },
    {
      id: "reports-in-progress",
      label: "Reports In Progress",
      value: String(currentBuckets["In Progress"]),
      change: percentChange(currentBuckets["In Progress"], prevBuckets["In Progress"]),
      icon: "Wrench",
      iconBg: "bg-indigo-50 text-indigo-600 border-indigo-100",
      sparkColor: "#4f46e5",
      sparkData: monthlyReports.map((m) => m.submitted - m.resolved),
    },
    {
      id: "reports-resolved",
      label: "Reports Resolved",
      value: String(currentBuckets.Resolved),
      change: percentChange(currentBuckets.Resolved, prevBuckets.Resolved),
      icon: "CheckCircle2",
      iconBg: "bg-emerald-50 text-emerald-600 border-emerald-100",
      sparkColor: "#059669",
      sparkData: monthlyReports.map((m) => m.resolved),
    },
    {
      id: "resolution-rate",
      label: "Resolution Rate",
      value: `${resolutionRate}%`,
      change: percentChange(resolutionRate, prevResolution),
      icon: "Gauge",
      iconBg: "bg-teal-50 text-teal-600 border-teal-100",
      sparkColor: "#0d9488",
      sparkData: monthlyReports.map((m) =>
        m.submitted ? Math.round((m.resolved / m.submitted) * 100) : 0,
      ),
    },
    {
      id: "avg-resolution-time",
      label: "Avg Resolution Time",
      value: avgResolutionDays ? `${avgResolutionDays} days` : "—",
      change: 0,
      icon: "Timer",
      iconBg: "bg-rose-50 text-rose-600 border-rose-100",
      sparkColor: "#e11d48",
      sparkData: monthlyReports.map((m) => m.resolved),
    },
    {
      id: "monthly-growth",
      label: "Monthly Growth",
      value: `${percentChange(thisMonthCount, lastMonthCount) >= 0 ? "+" : ""}${percentChange(thisMonthCount, lastMonthCount)}%`,
      change: percentChange(thisMonthCount, lastMonthCount),
      icon: "TrendingUp",
      iconBg: "bg-fuchsia-50 text-fuchsia-600 border-fuchsia-100",
      sparkColor: "#c026d3",
      sparkData: monthlyReports.map((m) => m.submitted),
    },
  ];

  const recentReports = scoped.slice(0, 6).map((item) => {
    const mapped = mapAdminReport(item, citizenMap.get(item.userId));
    const stamp = relativeStamp(item.createdAt);
    return {
      id: mapped.id,
      title: mapped.title,
      category: mapped.category,
      district: mapped.district,
      priority: mapped.priority,
      status: mapped.status,
      date: stamp.date,
      authority: mapped.authority,
    };
  });

  const statusDonut = [
    { name: "Pending", value: currentBuckets.Pending, color: "#f59e0b" },
    { name: "In Progress", value: currentBuckets["In Progress"], color: "#4f46e5" },
    { name: "Resolved", value: currentBuckets.Resolved, color: "#10b981" },
    { name: "Rejected", value: currentBuckets.Rejected, color: "#ef4444" },
  ];

  return {
    period,
    kpis,
    totals: {
      reports: totalReports,
      resolutionRate,
      avgResolutionDays,
      avgResponseHours: avgResolutionDays ? Math.round(avgResolutionDays * 24 * 10) / 10 : 0,
      monthlyGrowth: percentChange(thisMonthCount, lastMonthCount),
    },
    monthlyReports,
    yearlyComparison,
    statusDonut,
    reportsByCategory,
    reportsByDistrict,
    authorityPerformance,
    officerPerformance,
    recentReports,
    topCategories: reportsByCategory.slice(0, 8).map((row) => ({
      name: row.category,
      count: row.value,
    })),
    activeCitizens: [...citizenCounts.values()]
      .sort((a, b) => b.reports - a.reports)
      .slice(0, 6),
    activeAuthorities: [...authorityCounts.entries()]
      .map(([name, stats]) => ({ name, reports: stats.reports }))
      .sort((a, b) => b.reports - a.reports)
      .slice(0, 6),
    radarData: [
      { metric: "Resolution", score: Math.min(100, resolutionRate) },
      { metric: "Assignment", score: Math.min(100, assignedRate) },
      { metric: "Speed", score: Math.min(100, speedScore) },
      { metric: "Coverage", score: Math.min(100, coverageScore) },
      { metric: "Activity", score: Math.min(100, thisMonthCount * 10) },
    ],
    thisMonthKey,
    lastMonthKey,
  };
};

export const listAdminNotifications = async () => {
  const [complaints, authorities, officers] = await Promise.all([
    prisma.complaint.findMany({ orderBy: { createdAt: "desc" }, take: 40 }),
    prisma.authority.findMany({ orderBy: { createdAt: "desc" }, take: 12 }),
    prisma.officer.findMany({
      orderBy: { createdAt: "desc" },
      take: 12,
      include: { profile: true, authority: true },
    }),
  ]);

  const items = [];

  complaints.forEach((report) => {
    const stamp = relativeStamp(report.createdAt);
    const title = report.detectedIssue || report.category || "civic issue";
    const id = report.reportId || report.id;
    items.push({
      id: `${id}-new`,
      type: "new-report",
      title: "New report submitted",
      description: `${id} (${title}) was submitted from ${report.location}.`,
      date: stamp.date,
      time: stamp.time,
      createdAt: stamp.createdAt,
      diffDays: stamp.diffDays,
    });

    const priority = String(report.priority || "").toUpperCase();
    if (priority === "HIGH" || priority === "CRITICAL") {
      items.push({
        id: `${id}-critical`,
        type: "critical",
        title: "High priority report",
        description: `${id} was flagged as ${formatReportLabel(report.priority, "High")}. Immediate review may be needed.`,
        date: stamp.date,
        time: stamp.time,
        createdAt: stamp.createdAt,
        diffDays: stamp.diffDays,
      });
    }

    if (statusBucket(report.status) === "Resolved") {
      const resolvedStamp = relativeStamp(report.updatedAt || report.createdAt);
      items.push({
        id: `${id}-resolved`,
        type: "resolved",
        title: "Report resolved",
        description: `${id} was marked as resolved by ${report.assignedAuthority || "the assigned authority"}.`,
        date: resolvedStamp.date,
        time: resolvedStamp.time,
        createdAt: resolvedStamp.createdAt,
        diffDays: resolvedStamp.diffDays,
      });
    }

    const ageDays = (Date.now() - new Date(report.createdAt).getTime()) / 86_400_000;
    if (statusBucket(report.status) !== "Resolved" && ageDays >= 7) {
      items.push({
        id: `${id}-overdue`,
        type: "overdue",
        title: "Report overdue",
        description: `${id} has been open for ${Math.floor(ageDays)} days without resolution.`,
        date: stamp.date,
        time: stamp.time,
        createdAt: stamp.createdAt,
        diffDays: stamp.diffDays,
      });
    }
  });

  authorities.forEach((authority) => {
    const stamp = relativeStamp(authority.createdAt);
    items.push({
      id: `${authority.id}-authority`,
      type: "authority-created",
      title: "Authority added",
      description: `${authority.name} was added to the platform.`,
      date: stamp.date,
      time: stamp.time,
      createdAt: stamp.createdAt,
      diffDays: stamp.diffDays,
    });
  });

  officers.forEach((officer) => {
    const stamp = relativeStamp(officer.createdAt);
    const name = officer.profile?.fullName || "An officer";
    items.push({
      id: `${officer.id}-officer`,
      type: "officer-created",
      title: "Officer added",
      description: `${name} was created for ${officer.authority?.name || "an authority"}.`,
      date: stamp.date,
      time: stamp.time,
      createdAt: stamp.createdAt,
      diffDays: stamp.diffDays,
    });
  });

  return items.sort((a, b) => {
    const aTime = a.createdAt ? new Date(a.createdAt).getTime() : 0;
    const bTime = b.createdAt ? new Date(b.createdAt).getTime() : 0;
    return bTime - aTime;
  });
};

export { profileInclude, INVITE_EXPIRY_DAYS };
