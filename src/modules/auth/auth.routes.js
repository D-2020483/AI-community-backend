import { Router } from "express";

import {
  register,
  login,
  refresh,
  logout,
  me,
  getInvite,
  getLoginInviteStatus,
  postAcceptInvite,
  postChangePassword,
  patchMe,
} from "./auth.controller.js";

import { authenticate } from "../../middleware/auth.middleware.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/refresh", refresh);
router.get("/invite/:token", getInvite);
router.get("/login-invite/:token", getLoginInviteStatus);
router.post("/accept-invite", postAcceptInvite);

router.post("/logout", authenticate, logout);
router.get("/me", authenticate, me);
router.patch("/me", authenticate, patchMe);
router.post("/change-password", authenticate, postChangePassword);

export default router;
