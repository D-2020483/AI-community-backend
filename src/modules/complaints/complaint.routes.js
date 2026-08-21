import express from "express";
import {
  createAndTrackReport,
  getTrackedReport,
  getUserReports,
  getAssignedReports,
  updateAssignedReportStatus,
  getAuthorityOfficers,
  getWorkspaceNotifications,
} from "./complaint.controller.js";
import { authenticate } from "../../middleware/auth.middleware.js";
import { requireRole } from "../../middleware/role.middleware.js";

const router = express.Router();

router.get(
  "/",
  authenticate,
  requireRole("CITIZEN", "ADMIN"),
  getUserReports,
);

router.post(
  "/track",
  authenticate,
  requireRole("CITIZEN", "ADMIN"),
  createAndTrackReport,
);

router.get(
  "/assigned",
  authenticate,
  requireRole("AUTHORITY", "OFFICER"),
  getAssignedReports,
);

router.get(
  "/officers",
  authenticate,
  requireRole("AUTHORITY", "OFFICER"),
  getAuthorityOfficers,
);

router.get(
  "/notifications",
  authenticate,
  requireRole("AUTHORITY", "OFFICER"),
  getWorkspaceNotifications,
);

router.patch(
  "/:reportId/status",
  authenticate,
  requireRole("AUTHORITY", "OFFICER"),
  updateAssignedReportStatus,
);

router.get(
  "/:reportId",
  authenticate,
  requireRole("CITIZEN", "ADMIN", "AUTHORITY", "OFFICER"),
  getTrackedReport,
);

export default router;
