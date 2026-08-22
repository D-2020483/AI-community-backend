import express from "express";
import cors from "cors";

import authRoutes from "./modules/auth/auth.routes.js";
import adminRoutes from "./modules/admin/admin.routes.js";
import complaintRoutes from "./modules/complaints/complaint.routes.js";
import officerRoutes from "./modules/officer/officer.routes.js";
import { errorHandler } from "./middleware/error.middleware.js";
import testRoutes from "./routes/testRoutes.js";
import { authenticate } from "./middleware/auth.middleware.js";
import { getPublicCategories } from "./modules/admin/admin.controller.js";

const app = express();

const DEFAULT_ORIGINS = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "https://civic-link-frontkend.vercel.app",
];

function allowedOrigins() {
  const fromEnv = (process.env.FRONTEND_URL || "")
    .split(",")
    .map((value) => value.trim().replace(/\/$/, ""))
    .filter(Boolean);

  return [...new Set([...DEFAULT_ORIGINS, ...fromEnv])];
}

function isAllowedOrigin(origin) {
  if (allowedOrigins().includes(origin)) return true;
  return /^https:\/\/civic-link-frontkend(-[a-z0-9-]+)?\.vercel\.app$/.test(
    origin
  );
}

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || isAllowedOrigin(origin)) {
        callback(null, true);
        return;
      }
      callback(null, false);
    },
    credentials: true,
  })
);

app.use(express.json({ limit: "15mb" }));

app.use(express.urlencoded({ extended: true, limit: "15mb" }));

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Civic Link API is running",
  });
});

app.use("/api/test", testRoutes);

app.use("/api/auth", authRoutes);

app.get("/api/categories", authenticate, getPublicCategories);

app.use("/api/admin", adminRoutes);

app.use("/api/complaints", complaintRoutes);

app.use("/api/officer", officerRoutes);

app.use(errorHandler);

export default app;