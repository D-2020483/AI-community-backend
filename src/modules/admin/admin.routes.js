import { Router } from "express";
import { authenticate } from "../../middleware/auth.middleware.js";
import { requireRole } from "../../middleware/role.middleware.js";
import {
  postAuthority,
  postOfficer,
  getAuthorities,
  getOfficers,
  postResetOfficerPassword,
} from "./admin.controller.js";

const router = Router();

router.use(authenticate, requireRole("ADMIN"));

router.get("/authorities", getAuthorities);
router.post("/authorities", postAuthority);
router.get("/officers", getOfficers);
router.post("/officers", postOfficer);
router.post("/officers/:officerId/reset-password", postResetOfficerPassword);

export default router;
