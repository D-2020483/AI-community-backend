import prisma from "../../config/database.js";

export function parseStoredCoords(report = {}) {
  const lat = report.latitude ?? report.lat;
  const lng = report.longitude ?? report.lng;
  const latitude = Number(lat);
  const longitude = Number(lng);
  if (
    !Number.isFinite(latitude) ||
    !Number.isFinite(longitude) ||
    latitude < -90 ||
    latitude > 90 ||
    longitude < -180 ||
    longitude > 180
  ) {
    return null;
  }
  return { lat: latitude, lng: longitude };
}

export function complaintLocationFields(report = {}) {
  const coords = parseStoredCoords(report);
  return {
    location: report.location || "",
    locationName: report.location || "",
    latitude: coords?.lat ?? null,
    longitude: coords?.lng ?? null,
    lat: coords?.lat ?? null,
    lng: coords?.lng ?? null,
  };
}

export function formatLabel(value, fallback) {
  if (!value) return fallback;
  const key = String(value).toUpperCase().replace(/[\s-]+/g, "_");
  const statusMap = {
    SUBMITTED: "Pending",
    PENDING: "Pending",
    ASSIGNED: "Assigned",
    ACCEPTED: "Accepted",
    IN_PROGRESS: "In Progress",
    RESOLVED: "Resolved",
    COMPLETED: "Resolved",
    REJECTED: "Rejected",
  };
  const priorityMap = {
    HIGH: "High",
    MEDIUM: "Medium",
    LOW: "Low",
  };
  return statusMap[key] || priorityMap[key] || value;
}

export function formatOfficerStatus(value) {
  const key = String(value || "").toUpperCase().replace(/[\s-]+/g, "_");
  const map = {
    SUBMITTED: "Assigned",
    PENDING: "Assigned",
    ASSIGNED: "Assigned",
    ACCEPTED: "Accepted",
    IN_PROGRESS: "In Progress",
    RESOLVED: "Completed",
    COMPLETED: "Completed",
    REJECTED: "Assigned",
  };
  return map[key] || "Assigned";
}

export function normalizeAuthorityName(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function authorityNamesMatch(assignedName, authorityName) {
  const assigned = normalizeAuthorityName(assignedName);
  const name = normalizeAuthorityName(authorityName);
  if (!assigned || !name) return false;
  if (assigned === name) return true;
  if (name.length >= 12 && assigned.includes(name)) return true;
  if (assigned.length >= 12 && name.includes(assigned)) return true;

  const stop = new Set(["the", "and", "of", "sri", "lanka"]);
  const tokens = (value) =>
    value.split(" ").filter((token) => token.length > 2 && !stop.has(token));
  const assignedTokens = tokens(assigned);
  const nameTokens = tokens(name);
  if (!assignedTokens.length || !nameTokens.length) return false;

  const [shorter, longer] =
    assignedTokens.length <= nameTokens.length
      ? [assignedTokens, nameTokens]
      : [nameTokens, assignedTokens];
  const longerSet = new Set(longer);
  return shorter.every((token) => longerSet.has(token));
}

export function getLoggedInAuthorityName(profile) {
  return (
    profile?.authority?.name ||
    profile?.officer?.authority?.name ||
    profile?.fullName ||
    ""
  );
}

export function getLoggedInAuthorityId(profile) {
  return profile?.authority?.id || profile?.officer?.authorityId || null;
}

export function getStaffActorName(profile) {
  if (profile?.role === "OFFICER") {
    return profile.fullName || "Field Officer";
  }
  return (
    profile?.authority?.name ||
    profile?.fullName ||
    getLoggedInAuthorityName(profile) ||
    "Authority"
  );
}

export function isAssignedToOfficer(report, profile) {
  const assigned = String(report?.assignedOfficer || "").trim().toLowerCase();
  if (!assigned) return false;

  const candidates = [
    profile?.officer?.id,
    profile?.fullName,
    profile?.email,
  ]
    .filter(Boolean)
    .map((value) => String(value).trim().toLowerCase());

  return candidates.includes(assigned);
}

export function formatClock(value) {
  return new Date(value).toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function timelineEvent(label, text, date = new Date(), actor = "") {
  const at = new Date(date).toISOString();
  return {
    label,
    text,
    time: formatClock(date),
    at,
    actor,
  };
}

export function defaultTimeline(report) {
  const citizenName = report.citizenName || report.citizen || "";
  return [
    timelineEvent(
      "Reported",
      citizenName
        ? `Report submitted by ${citizenName}`
        : "Report submitted by citizen",
      report.createdAt || new Date(),
      citizenName || "citizen",
    ),
    timelineEvent(
      "Assigned",
      `Assigned to ${report.assignedAuthority || "the relevant authority"}`,
      report.createdAt || new Date(),
      report.assignedAuthority || "system",
    ),
  ];
}

export function resolveTimelineActors(timeline = [], { citizenName, authorityName } = {}) {
  return timeline.map((event) => {
    const label = String(event.label || "").toLowerCase();
    const actor = String(event.actor || "").trim();
    const actorKey = actor.toLowerCase();
    const next = { ...event };

    if (
      label === "reported" ||
      actorKey === "citizen" ||
      actorKey === "reporter"
    ) {
      if (citizenName) {
        next.actor = citizenName;
        if (!event.text || /submitted by citizen$/i.test(String(event.text))) {
          next.text = `Report submitted by ${citizenName}`;
        }
      }
    } else if (actorKey === "system" && authorityName) {
      next.actor = authorityName;
    }

    return next;
  });
}

export function ensureTimeline(report, extras = {}) {
  const timeline = Array.isArray(report?.timeline) && report.timeline.length
    ? report.timeline
    : defaultTimeline({
        ...(report || {}),
        citizenName: extras.citizenName,
      });

  return resolveTimelineActors(timeline, extras);
}

export function relativeStamp(iso) {
  const created = new Date(iso);
  if (Number.isNaN(created.getTime())) {
    return { date: "—", time: "", diffDays: 99, createdAt: null };
  }
  const startToday = new Date();
  startToday.setHours(0, 0, 0, 0);
  const startCreated = new Date(created);
  startCreated.setHours(0, 0, 0, 0);
  const diffDays = Math.round((startToday - startCreated) / 86_400_000);
  let date = created.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
  });
  if (diffDays === 0) date = "Today";
  else if (diffDays === 1) date = "Yesterday";
  else if (diffDays === 2) date = "2 days ago";
  const time = created.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });
  return { date, time, diffDays, createdAt: created.toISOString() };
}

export function statusToDb(value) {
  if (!value) return undefined;
  const key = String(value).toUpperCase().replace(/[\s-]+/g, "_");
  const map = {
    PENDING: "SUBMITTED",
    SUBMITTED: "SUBMITTED",
    ASSIGNED: "ASSIGNED",
    ACCEPTED: "ACCEPTED",
    IN_PROGRESS: "IN_PROGRESS",
    RESOLVED: "RESOLVED",
    COMPLETED: "RESOLVED",
    REJECTED: "REJECTED",
  };
  return map[key] || key;
}

export function formatComplaintForStaff(report, citizen) {
  const confidence =
    report.confidence !== null && report.confidence !== undefined
      ? Math.round(
          Number(report.confidence) <= 1
            ? report.confidence * 100
            : report.confidence,
        )
      : null;

  return {
    id: report.reportId || report.id,
    reportId: report.reportId || report.id,
    dbId: report.id,
    title: report.detectedIssue || report.category,
    description: report.description,
    ...complaintLocationFields(report),
    imageUrl: report.imageUrl,
    image: report.imageUrl,
    category: report.category,
    type: report.category,
    authority: report.assignedAuthority,
    assignedAuthority: report.assignedAuthority,
    detectedIssue: report.detectedIssue,
    priority: formatLabel(report.priority, "Medium"),
    status: formatLabel(report.status, "Assigned"),
    officerStatus: formatOfficerStatus(report.status),
    date: new Date(report.createdAt).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }),
    createdAt: report.createdAt,
    updatedAt: report.updatedAt,
    confidence,
    reason: report.reason || null,
    citizen: citizen?.fullName || "Citizen",
    citizenEmail: citizen?.email || null,
    userId: report.userId,
    assignedOfficer: report.assignedOfficer || "",
    timeline: ensureTimeline(report, {
      citizenName: citizen?.fullName || "",
      authorityName: report.assignedAuthority || "",
    }),
  };
}

export function formatComplaintForOfficer(report, citizen) {
  const staff = formatComplaintForStaff(report, citizen);
  const timeline = staff.timeline || [];
  return {
    ...staff,
    status: staff.officerStatus,
    image: staff.imageUrl || "",
    type: staff.category,
    updates: timeline
      .filter((event) => {
        const label = String(event.label || "").toLowerCase();
        return (
          label === "update" ||
          label === "accepted" ||
          label === "in progress" ||
          label === "completed" ||
          label === "resolved"
        );
      })
      .map((event, index) => ({
        id: `${staff.id}-upd-${index}`,
        author: event.actor || "Field Officer",
        text: event.text,
        time: event.time,
        at: event.at,
        label: event.label,
      })),
  };
}

export async function attachCitizens(reports, formatter = formatComplaintForStaff) {
  const userIds = [...new Set(reports.map((r) => r.userId).filter(Boolean))];
  const citizens = userIds.length
    ? await prisma.profile.findMany({ where: { id: { in: userIds } } })
    : [];
  const citizenMap = new Map(citizens.map((c) => [c.id, c]));
  return reports.map((report) =>
    formatter(report, citizenMap.get(report.userId)),
  );
}

export async function findComplaint(reportId) {
  return (
    (await prisma.complaint.findUnique({ where: { reportId } })) ||
    (await prisma.complaint.findUnique({ where: { id: reportId } }))
  );
}

export async function listAuthorityReports(profile) {
  const authorityName = getLoggedInAuthorityName(profile);
  if (!authorityName) return [];

  const reports = await prisma.complaint.findMany({
    orderBy: { createdAt: "desc" },
  });

  const assigned = reports.filter((report) =>
    authorityNamesMatch(report.assignedAuthority, authorityName),
  );

  if (profile?.role === "OFFICER") {
    return assigned.filter((report) => isAssignedToOfficer(report, profile));
  }

  return assigned;
}

export function buildWorkspaceNotifications(reports) {
  const items = [];

  reports.forEach((report) => {
    const id = report.reportId || report.id;
    const title = report.detectedIssue || report.category;
    const created = relativeStamp(report.createdAt);

    items.push({
      id: `${id}-new`,
      type: "new-report",
      title: "Task assigned",
      description: `${id} (${title}) at ${report.location} was assigned to you.`,
      date: created.date,
      time: created.time,
      createdAt: created.createdAt,
      diffDays: created.diffDays,
      reportId: id,
    });

    const priority = String(report.priority || "").toUpperCase();
    if (priority === "HIGH" || priority === "CRITICAL") {
      items.push({
        id: `${id}-critical`,
        type: "critical",
        title: "High priority report",
        description: `${id} needs immediate attention.`,
        date: created.date,
        time: created.time,
        createdAt: created.createdAt,
        diffDays: created.diffDays,
        reportId: id,
      });
    }

    if (report.assignedOfficer) {
      const stamp = relativeStamp(report.updatedAt || report.createdAt);
      items.push({
        id: `${id}-officer`,
        type: "officer",
        title: "Officer assigned",
        description: `${report.assignedOfficer} is assigned to ${id}.`,
        date: stamp.date,
        time: stamp.time,
        createdAt: stamp.createdAt,
        diffDays: stamp.diffDays,
        reportId: id,
      });
    }

    ensureTimeline(report)
      .slice(2)
      .forEach((event, index) => {
        const stamp = relativeStamp(event.at || report.updatedAt);
        items.push({
          id: `${id}-event-${index}`,
          type: String(event.label || "").toLowerCase().includes("resolved") ||
            String(event.label || "").toLowerCase().includes("completed")
            ? "resolved"
            : "status",
          title: event.label || "Status updated",
          description: event.text || `${id} was updated.`,
          date: stamp.date,
          time: stamp.time,
          createdAt: stamp.createdAt,
          diffDays: stamp.diffDays,
          reportId: id,
        });
      });
  });

  items.sort((a, b) => {
    const aTime = a.createdAt ? new Date(a.createdAt).getTime() : 0;
    const bTime = b.createdAt ? new Date(b.createdAt).getTime() : 0;
    return bTime - aTime;
  });

  return items.slice(0, 80);
}

export async function applyComplaintUpdate({
  existing,
  profile,
  nextStatus,
  nextOfficer,
  note,
}) {
  const actorName = getStaffActorName(profile);
  const data = {};
  const events = ensureTimeline(existing);

  if (
    profile?.role !== "OFFICER" &&
    nextOfficer !== undefined &&
    nextOfficer !== (existing.assignedOfficer || "")
  ) {
    data.assignedOfficer = nextOfficer || null;
    events.push(
      timelineEvent(
        "Officer Assigned",
        nextOfficer
          ? `${nextOfficer} was assigned to this report by ${actorName}.`
          : `Officer assignment was cleared by ${actorName}.`,
        new Date(),
        actorName,
      ),
    );
    if (!nextStatus && existing.status === "SUBMITTED") {
      data.status = "ASSIGNED";
    }
  }

  if (nextStatus && nextStatus !== existing.status) {
    data.status = nextStatus;
    events.push(
      timelineEvent(
        formatLabel(nextStatus, nextStatus),
        `Status updated to ${formatLabel(nextStatus, nextStatus)} by ${actorName}.`,
        new Date(),
        actorName,
      ),
    );
  }

  const trimmedNote = String(note || "").trim();
  if (trimmedNote) {
    events.push(
      timelineEvent("Update", trimmedNote, new Date(), actorName),
    );
    data.timeline = events;
  }

  if (!Object.keys(data).length && !trimmedNote) {
    return existing;
  }

  data.timeline = events;

  return prisma.complaint.update({
    where: { id: existing.id },
    data,
  });
}
