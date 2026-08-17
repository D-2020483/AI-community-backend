import prisma from "../../config/database.js";

function parseConfidence(value) {
  if (value === null || value === undefined || value === "") return null;
  const numeric = Number.parseFloat(String(value).replace("%", ""));
  if (Number.isNaN(numeric)) return null;
  return numeric > 1 ? numeric / 100 : numeric;
}

export const createAndTrackReport = async (req, res, next) => {
  try {
    const {
      reportId,
      description,
      location,
      imageUrl,
      category,
      authority,
      detectedIssue,
      priority,
      confidence,
      reason,
      status,
    } = req.body;

    if (!description?.trim() || !location?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Description and location are required.",
      });
    }

    const publicReportId =
      reportId || `RPT-${Math.floor(100000 + Math.random() * 900000)}`;

    const payload = {
      description: description.trim(),
      location: location.trim(),
      imageUrl: imageUrl || null,
      category: category || "OTHER",
      assignedAuthority: authority || "Manual Review Required",
      detectedIssue: detectedIssue || "Civic issue reported",
      priority: (priority || "MEDIUM").toUpperCase(),
      confidence: parseConfidence(confidence),
      reason: reason || null,
      status: (status || "ASSIGNED").toUpperCase(),
      userId: req.profile?.id || null,
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

    const report =
      (await prisma.complaint.findUnique({
        where: { reportId },
      })) ||
      (await prisma.complaint.findUnique({
        where: { id: reportId },
      }));

    if (!report) {
      return res.status(404).json({
        success: false,
        message: "Report not found.",
      });
    }

    const isOwner = report.userId && report.userId === req.profile?.id;
    const isStaff = ["ADMIN", "AUTHORITY", "OFFICER"].includes(
      req.profile?.role,
    );

    if (!isOwner && !isStaff) {
      return res.status(404).json({
        success: false,
        message: "Report not found.",
      });
    }

    return res.status(200).json({
      success: true,
      data: report,
    });
  } catch (error) {
    next(error);
  }
};

//find all reports submitted by the logged-in citizen user
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

    const formatLabel = (value, fallback) => {
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
        HIGH: "High",
        MEDIUM: "Medium",
        LOW: "Low",
      };
      if (statusMap[key]) return statusMap[key];
      if (priorityMap[key]) return priorityMap[key];
      return value;
    };

    const formattedReports = reports.map((r) => ({
      id: r.reportId || r.id,
      reportId: r.reportId || r.id,
      title: r.detectedIssue || r.category,
      description: r.description,
      location: r.location,
      imageUrl: r.imageUrl,
      category: r.category,
      authority: r.assignedAuthority,
      assignedAuthority: r.assignedAuthority,
      detectedIssue: r.detectedIssue,
      priority: formatLabel(r.priority, "Medium"),
      status: formatLabel(r.status, "Assigned"),
      date: new Date(r.createdAt).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      createdAt: r.createdAt,
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