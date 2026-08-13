import { Router } from "express";

import {
  register,
  login,
  logout,
  me,
  getInvite,
  postAcceptInvite,
  postChangePassword,
} from "./auth.controller.js";

import { authenticate } from "../../middleware/auth.middleware.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/invite/:token", getInvite);
router.post("/accept-invite", postAcceptInvite);

router.post("/logout", authenticate, logout);
router.get("/me", authenticate, me);
router.post("/change-password", authenticate, postChangePassword);

export default router;
