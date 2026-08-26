import prisma from "../../config/database.js";
import { isValidCoordPair } from "../../utils/geocode.js";
import {
  applyComplaintUpdate,
  attachCitizens,
  authorityNamesMatch,
  buildWorkspaceNotifications,
  complaintLocationFields,
  defaultTimeline,
  ensureTimeline,
  findComplaint,
  formatComplaintForStaff,
  formatLabel,
  getLoggedInAuthorityId,
  getLoggedInAuthorityName,
  isAssignedToOfficer,
  listAuthorityReports,
  parseStoredCoords,
  statusToDb,
} from "./complaint.helpers.js";

function parseConfidence(value) {
  if (value === null || value === undefined || value === "") return null;
  const numeric = Number.parseFloat(String(value).replace("%", ""));
  if (Number.isNaN(numeric)) return null;
  return numeric > 1 ? numeric / 100 : numeric;
}

export { authorityNamesMatch };

export const createAndTrackReport = async (req, res, next) => {
  try {
    const {
      reportId,
      description,
      location,
      locationName,
      latitude,
      longitude,
      lat,
      lng,
      imageUrl,
      category,
      authority,
      detectedIssue,
      priority,
      confidence,
      reason,
      status,
    } = req.body;

    const resolvedLocation = String(locationName || location || "").trim();
    const coords = parseStoredCoords({
      latitude,
      longitude,
      lat,
      lng,
    });

    if (!description?.trim() || !resolvedLocation) {
      return res.status(400).json({
        success: false,
        message: "Description and location are required.",
      });
    }

    if (!coords || !isValidCoordPair(coords.lat, coords.lng)) {
      return res.status(400).json({
        success: false,
        message: "A valid incident location with latitude and longitude is required.",
      });
    }

    const publicReportId =
      reportId || `RPT-${Math.floor(100000 + Math.random() * 900000)}`;

    const existing = await prisma.complaint.findUnique({
      where: { reportId: publicReportId },
    });

    const payload = {
      description: description.trim(),
      location: resolvedLocation,
      latitude: coords.lat,
      longitude: coords.lng,
      imageUrl: imageUrl || null,
      category: category || "OTHER",
      assignedAuthority: authority || "Manual Review Required",
      detectedIssue: detectedIssue || "Civic issue reported",
      priority: (priority || "MEDIUM").toUpperCase(),
      confidence: parseConfidence(confidence),
      reason: reason || null,
      status: (status || "ASSIGNED").toUpperCase(),
      userId: req.profile?.id || null,
      assignedOfficer: existing?.assignedOfficer || null,
      timeline:
        existing?.timeline ||
        defaultTimeline({
          createdAt: existing?.createdAt || new Date(),
          assignedAuthority: authority || "Manual Review Required",
          citizenName: req.profile?.fullName || "",
        }),
    };

    const newReport = await prisma.complaint.upsert({
      where: { reportId: publicReportId },
      create: {
        reportId: publicReportId,
        ...payload,
      },
      update: payload,
    });

    return res.status(201).json({
      success: true,
      message: "Report tracked and saved successfully.",
      data: newReport,
    });
  } catch (error) {
    next(error);
  }
};

export const getTrackedReport = async (req, res, next) => {
  try {
    const { reportId } = req.params;
    const report = await findComplaint(reportId);

    if (!report) {
      return res.status(404).json({
        success: false,
        message: "Report not found.",
      });
    }

    const isOwner = report.userId && report.userId === req.profile?.id;
    const isAdmin = req.profile?.role === "ADMIN";
    const isAssignedStaff =
      ["AUTHORITY", "OFFICER"].includes(req.profile?.role) &&
      authorityNamesMatch(
        report.assignedAuthority,
        getLoggedInAuthorityName(req.profile),
      );
    const isAssignedOfficer =
      req.profile?.role === "OFFICER" && isAssignedToOfficer(report, req.profile);

    if (
      !isOwner &&
      !isAdmin &&
      !(req.profile?.role === "AUTHORITY" && isAssignedStaff) &&
      !isAssignedOfficer
    ) {
      return res.status(404).json({
        success: false,
        message: "Report not found.",
      });
    }

    const citizen = report.userId
      ? await prisma.profile.findUnique({ where: { id: report.userId } })
      : null;

    return res.status(200).json({
      success: true,
      data: formatComplaintForStaff(report, citizen),
    });
  } catch (error) {
    next(error);
  }
};

export const getUserReports = async (req, res, next) => {
  try {
    const userId = req.profile?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized user profile.",
      });
    }

    const reports = await prisma.complaint.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    const formattedReports = reports.map((r) => ({
      id: r.reportId || r.id,
      reportId: r.reportId || r.id,
      title: r.detectedIssue || r.category,
      description: r.description,
      ...complaintLocationFields(r),
      imageUrl: r.imageUrl,
      category: r.category,
      authority: r.assignedAuthority,
      assignedAuthority: r.assignedAuthority,
      detectedIssue: r.detectedIssue,
      priority: formatLabel(r.priority, "Medium"),
      status:
        formatLabel(r.status, "Assigned") === "Accepted"
          ? "Assigned"
          : formatLabel(r.status, "Assigned"),
      date: new Date(r.createdAt).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      createdAt: r.createdAt,
      updatedAt: r.updatedAt,
      assignedOfficer: r.assignedOfficer || "",
      timeline: ensureTimeline(r, {
        citizenName: req.profile?.fullName || "",
        authorityName: r.assignedAuthority || "",
      }),
      confidence:
        r.confidence !== null && r.confidence !== undefined
          ? `${Math.round(r.confidence * 100)}%`
          : null,
    }));

    return res.status(200).json({
      success: true,
      data: formattedReports,
    });
  } catch (error) {
    next(error);
  }
};

export const getAssignedReports = async (req, res, next) => {
  try {
    const authorityName = getLoggedInAuthorityName(req.profile);

    if (!authorityName) {
      return res.status(400).json({
        success: false,
        message: "No authority is linked to this account.",
      });
    }

    const assigned = await listAuthorityReports(req.profile);

    return res.status(200).json({
      success: true,
      data: await attachCitizens(assigned),
    });
  } catch (error) {
    next(error);
  }
};

export const updateAssignedReportStatus = async (req, res, next) => {
  try {
    const { reportId } = req.params;
    const authorityName = getLoggedInAuthorityName(req.profile);
    const nextStatus = statusToDb(req.body?.status);
    const nextOfficer =
      req.body?.assignedOfficer === undefined
        ? undefined
        : String(req.body.assignedOfficer || "").trim();
    const note = req.body?.note;

    if (!authorityName) {
      return res.status(400).json({
        success: false,
        message: "No authority is linked to this account.",
      });
    }

    const existing = await findComplaint(reportId);

    if (
      !existing ||
      !authorityNamesMatch(existing.assignedAuthority, authorityName)
    ) {
      return res.status(404).json({
        success: false,
        message: "Report not found.",
      });
    }

    if (
      req.profile?.role === "OFFICER" &&
      !isAssignedToOfficer(existing, req.profile)
    ) {
      return res.status(404).json({
        success: false,
        message: "Report not found.",
      });
    }

    const updated = await applyComplaintUpdate({
      existing,
      profile: req.profile,
      nextStatus,
      nextOfficer: req.profile?.role === "OFFICER" ? undefined : nextOfficer,
      note,
    });

    const citizen = updated.userId
      ? await prisma.profile.findUnique({ where: { id: updated.userId } })
      : null;

    return res.status(200).json({
      success: true,
      message: "Report updated.",
      data: formatComplaintForStaff(updated, citizen),
    });
  } catch (error) {
    next(error);
  }
};

export const getAuthorityOfficers = async (req, res, next) => {
  try {
    const authorityId = getLoggedInAuthorityId(req.profile);
    if (!authorityId) {
      return res.status(400).json({
        success: false,
        message: "No authority is linked to this account.",
      });
    }

    const officers = await prisma.officer.findMany({
      where: { authorityId },
      include: { profile: true, authority: true },
      orderBy: { createdAt: "desc" },
    });

    return res.status(200).json({
      success: true,
      data: officers.map((officer) => ({
        id: officer.id,
        name: officer.profile?.fullName || "Officer",
        email: officer.profile?.email || "",
        phone: officer.profile?.phone || "",
        position: officer.position || "Field Officer",
        department: officer.department || officer.authority?.name || "",
        status: officer.status || "Active",
        authority: officer.authority?.name || "",
      })),
    });
  } catch (error) {
    next(error);
  }
};

export const getWorkspaceNotifications = async (req, res, next) => {
  try {
    const authorityName = getLoggedInAuthorityName(req.profile);
    if (!authorityName) {
      return res.status(400).json({
        success: false,
        message: "No authority is linked to this account.",
      });
    }

    const assigned = await listAuthorityReports(req.profile);

    return res.status(200).json({
      success: true,
      data: { notifications: buildWorkspaceNotifications(assigned) },
    });
  } catch (error) {
    next(error);
  }
};
