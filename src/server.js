import app from "./app.js";
import env from "./config/env.js";
import prisma from "./config/database.js";

const startServer = async () => {
  try {
    await prisma.$connect();

    console.log("Database connected successfully");

    app.listen(env.port, () => {
      console.log(
        `Civic Link API running on http://localhost:${env.port}`
      );
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();