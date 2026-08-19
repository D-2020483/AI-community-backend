import express from "express";
import cors from "cors";

import authRoutes from "./modules/auth/auth.routes.js";
import adminRoutes from "./modules/admin/admin.routes.js";
import complaintRoutes from "./modules/complaints/complaint.routes.js";
import { errorHandler } from "./middleware/error.middleware.js";
import testRoutes from "./routes/testRoutes.js";
import { authenticate } from "./middleware/auth.middleware.js";
import { getPublicCategories } from "./modules/admin/admin.controller.js";

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
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

app.use(errorHandler);

export default app;