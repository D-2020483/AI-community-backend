import express from "express";
import {
  createAndTrackReport,
  getTrackedReport,
  getUserReports,
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
  "/:reportId",
  authenticate,
  requireRole("CITIZEN", "ADMIN", "AUTHORITY", "OFFICER"),
  getTrackedReport,
);

export default router;
