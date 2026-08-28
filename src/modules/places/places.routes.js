import express from "express";
import { authenticate } from "../../middleware/auth.middleware.js";
import {
  drivingRouteHandler,
  reverseGeocodeHandler,
  searchPlacesHandler,
} from "./places.controller.js";

const router = express.Router();

router.get("/search", authenticate, searchPlacesHandler);
router.get("/reverse", authenticate, reverseGeocodeHandler);
router.get("/route", authenticate, drivingRouteHandler);

export default router;
