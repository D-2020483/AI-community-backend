import {
  getOfficerSummary,
  getOfficerTask,
  listOfficerTasks,
  listOfficerUpdates,
  updateOfficerTask,
} from "./officer.service.js";
import { updateOfficerTaskSchema } from "./officer.validation.js";
import { buildWorkspaceNotifications, listAuthorityReports } from "../complaints/complaint.helpers.js";

export const getMyTasks = async (req, res, next) => {
  try {
    const tasks = await listOfficerTasks(req.profile);
    return res.status(200).json({
      success: true,
      data: tasks,
    });
  } catch (error) {
    next(error);
  }
};

export const getMyTask = async (req, res, next) => {
  try {
    const task = await getOfficerTask(req.profile, req.params.reportId);
    return res.status(200).json({
      success: true,
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

export const patchMyTask = async (req, res, next) => {
  try {
    const payload = updateOfficerTaskSchema.parse(req.body);
    const task = await updateOfficerTask(req.profile, req.params.reportId, payload);
    return res.status(200).json({
      success: true,
      message: "Task updated. Authority and citizen timelines were refreshed.",
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

export const getMyUpdates = async (req, res, next) => {
  try {
    const updates = await listOfficerUpdates(req.profile);
    return res.status(200).json({
      success: true,
      data: updates,
    });
  } catch (error) {
    next(error);
  }
};

export const getMySummary = async (req, res, next) => {
  try {
    const summary = await getOfficerSummary(req.profile);
    return res.status(200).json({
      success: true,
      data: summary,
    });
  } catch (error) {
    next(error);
  }
};

export const getMyNotifications = async (req, res, next) => {
  try {
    const reports = await listAuthorityReports(req.profile);
    return res.status(200).json({
      success: true,
      data: { notifications: buildWorkspaceNotifications(reports) },
    });
  } catch (error) {
    next(error);
  }
};
