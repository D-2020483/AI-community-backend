import express from "express";
import { authenticate } from "../../middleware/auth.middleware.js";
import { requireRole } from "../../middleware/role.middleware.js";
import {
  getMyNotifications,
  getMySummary,
  getMyTask,
  getMyTasks,
  getMyUpdates,
  patchMyTask,
} from "./officer.controller.js";

const router = express.Router();

router.use(authenticate, requireRole("OFFICER"));

router.get("/tasks", getMyTasks);
router.get("/tasks/:reportId", getMyTask);
router.patch("/tasks/:reportId", patchMyTask);
router.get("/updates", getMyUpdates);
router.get("/summary", getMySummary);
router.get("/notifications", getMyNotifications);

export default router;
