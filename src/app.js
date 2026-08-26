import express from "express";
import cors from "cors";

import {
  isAllowedFrontendOrigin,
} from "./utils/frontendUrl.js";
import authRoutes from "./modules/auth/auth.routes.js";
import adminRoutes from "./modules/admin/admin.routes.js";
import complaintRoutes from "./modules/complaints/complaint.routes.js";
import officerRoutes from "./modules/officer/officer.routes.js";
import placesRoutes from "./modules/places/places.routes.js";
import { errorHandler } from "./middleware/error.middleware.js";
import { authenticate } from "./middleware/auth.middleware.js";
import { getPublicCategories } from "./modules/admin/admin.controller.js";

const app = express();

const corsOptions = {
  origin(origin, callback) {
    if (!origin || isAllowedFrontendOrigin(origin)) {
      callback(null, true);
      return;
    }
    callback(null, false);
  },
  credentials: true,
  methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-App-Origin"],
};

app.use(cors(corsOptions));

app.use(express.json({ limit: "15mb" }));

app.use(express.urlencoded({ extended: true, limit: "15mb" }));

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Civic Link API is running",
  });
});

app.use("/api/auth", authRoutes);

app.get("/api/categories", authenticate, getPublicCategories);

app.use("/api/admin", adminRoutes);

app.use("/api/complaints", complaintRoutes);

app.use("/api/officer", officerRoutes);

app.use("/api/places", placesRoutes);

app.use(errorHandler);

export default app;