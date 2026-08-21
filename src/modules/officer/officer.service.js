import prisma from "../../config/database.js";
import {
  applyComplaintUpdate,
  attachCitizens,
  authorityNamesMatch,
  findComplaint,
  formatComplaintForOfficer,
  getLoggedInAuthorityName,
  isAssignedToOfficer,
  listAuthorityReports,
  statusToDb,
} from "../complaints/complaint.helpers.js";

function assertOfficerProfile(profile) {
  if (profile?.role !== "OFFICER" || !profile?.officer) {
    const error = new Error("No officer profile is linked to this account.");
    error.statusCode = 400;
    throw error;
  }
}

export async function listOfficerTasks(profile) {
  assertOfficerProfile(profile);
  const reports = await listAuthorityReports(profile);
  return attachCitizens(reports, formatComplaintForOfficer);
}

export async function getOfficerTask(profile, reportId) {
  assertOfficerProfile(profile);

  const existing = await findComplaint(reportId);
  if (!existing || !isAssignedToOfficer(existing, profile)) {
    const error = new Error("Task not found.");
    error.statusCode = 404;
    throw error;
  }

  const citizen = existing.userId
    ? await prisma.profile.findUnique({ where: { id: existing.userId } })
    : null;

  return formatComplaintForOfficer(existing, citizen);
}

export async function updateOfficerTask(profile, reportId, { status, note } = {}) {
  assertOfficerProfile(profile);

  const existing = await findComplaint(reportId);
  const authorityName = getLoggedInAuthorityName(profile);

  if (
    !existing ||
    !isAssignedToOfficer(existing, profile) ||
    !authorityNamesMatch(existing.assignedAuthority, authorityName)
  ) {
    const error = new Error("Task not found.");
    error.statusCode = 404;
    throw error;
  }

  const updated = await applyComplaintUpdate({
    existing,
    profile,
    nextStatus: statusToDb(status),
    note,
  });

  const citizen = updated.userId
    ? await prisma.profile.findUnique({ where: { id: updated.userId } })
    : null;

  return formatComplaintForOfficer(updated, citizen);
}

export async function listOfficerUpdates(profile) {
  const tasks = await listOfficerTasks(profile);
  const items = [];

  tasks.forEach((task) => {
    (task.timeline || []).forEach((event, index) => {
      items.push({
        id: `${task.id}-${index}-${event.label || "event"}`,
        taskId: task.id,
        reportId: task.reportId || task.id,
        taskTitle: task.title,
        location: task.location,
        label: event.label || "Update",
        text: event.text,
        time: event.time,
        at: event.at,
        author:
          event.actor &&
          !["citizen", "reporter", "system"].includes(
            String(event.actor).toLowerCase(),
          )
            ? event.actor
            : String(event.label || "").toLowerCase() === "reported"
              ? task.citizen || "Citizen"
              : event.actor === "system"
                ? task.authority || task.assignedAuthority || "Authority"
                : event.actor || profile.fullName || "Field Officer",
      });
    });
  });

  items.sort((a, b) => {
    const aTime = a.at ? new Date(a.at).getTime() : 0;
    const bTime = b.at ? new Date(b.at).getTime() : 0;
    return bTime - aTime;
  });

  return items;
}

export async function getOfficerSummary(profile) {
  const tasks = await listOfficerTasks(profile);
  const startToday = new Date();
  startToday.setHours(0, 0, 0, 0);

  const completedToday = tasks.filter((task) => {
    if (task.status !== "Completed") return false;
    const updated = new Date(task.updatedAt);
    return !Number.isNaN(updated.getTime()) && updated >= startToday;
  }).length;

  return {
    assigned: tasks.length,
    highPriority: tasks.filter((task) => task.priority === "High").length,
    completedToday,
    accepted: tasks.filter((task) => task.status === "Accepted").length,
    inProgress: tasks.filter((task) => task.status === "In Progress").length,
  };
}
