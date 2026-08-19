import { Router } from "express";
import { authenticate } from "../../middleware/auth.middleware.js";
import { requireRole } from "../../middleware/role.middleware.js";
import {
  postAuthority,
  postOfficer,
  getAuthorities,
  getOfficers,
  postResetOfficerPassword,
  getCitizens,
  getCitizenById,
  patchCitizen,
  patchCitizenStatus,
  removeCitizen,
  getAuthorityById,
  patchAuthority,
  patchAuthorityStatus,
  removeAuthority,
  getOfficerById,
  patchOfficer,
  patchOfficerStatus,
  removeOfficer,
  getCategories,
  postCategory,
  patchCategory,
  patchCategoryStatus,
  removeCategory,
  getReports,
  getReportById,
  patchReport,
  removeReport,
  getInsights,
  getNotifications,
} from "./admin.controller.js";

const router = Router();

router.use(authenticate, requireRole("ADMIN"));

router.get("/users", getCitizens);
router.patch("/users/:userId/status", patchCitizenStatus);
router.get("/users/:userId", getCitizenById);
router.patch("/users/:userId", patchCitizen);
router.delete("/users/:userId", removeCitizen);

router.get("/authorities", getAuthorities);
router.post("/authorities", postAuthority);
router.patch("/authorities/:authorityId/status", patchAuthorityStatus);
router.get("/authorities/:authorityId", getAuthorityById);
router.patch("/authorities/:authorityId", patchAuthority);
router.delete("/authorities/:authorityId", removeAuthority);

router.get("/officers", getOfficers);
router.post("/officers", postOfficer);
router.post("/officers/:officerId/reset-password", postResetOfficerPassword);
router.patch("/officers/:officerId/status", patchOfficerStatus);
router.get("/officers/:officerId", getOfficerById);
router.patch("/officers/:officerId", patchOfficer);
router.delete("/officers/:officerId", removeOfficer);

router.get("/categories", getCategories);
router.post("/categories", postCategory);
router.patch("/categories/:categoryId/status", patchCategoryStatus);
router.patch("/categories/:categoryId", patchCategory);
router.delete("/categories/:categoryId", removeCategory);

router.get("/reports", getReports);
router.patch("/reports/:reportId", patchReport);
router.get("/reports/:reportId", getReportById);
router.delete("/reports/:reportId", removeReport);

router.get("/insights", getInsights);
router.get("/notifications", getNotifications);

export default router;
