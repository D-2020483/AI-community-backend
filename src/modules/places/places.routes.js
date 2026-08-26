import express from "express";
import { authenticate } from "../../middleware/auth.middleware.js";
import {
  reverseGeocodeHandler,
  searchPlacesHandler,
} from "./places.controller.js";

const router = express.Router();

router.get("/search", authenticate, searchPlacesHandler);
router.get("/reverse", authenticate, reverseGeocodeHandler);

export default router;
