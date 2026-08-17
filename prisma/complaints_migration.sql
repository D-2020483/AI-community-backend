-- Citizen reports / tracking table
-- Run via: npx prisma db execute --file prisma/complaints_migration.sql

CREATE TABLE IF NOT EXISTS "complaints" (
  "id" TEXT NOT NULL,
  "report_id" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "location" TEXT NOT NULL,
  "image_url" TEXT,
  "category" TEXT NOT NULL,
  "assigned_authority" TEXT NOT NULL,
  "detected_issue" TEXT NOT NULL,
  "priority" TEXT NOT NULL DEFAULT 'MEDIUM',
  "confidence" DOUBLE PRECISION,
  "reason" TEXT,
  "status" TEXT NOT NULL DEFAULT 'SUBMITTED',
  "user_id" TEXT,
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "complaints_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS "complaints_report_id_key" ON "complaints"("report_id");
CREATE INDEX IF NOT EXISTS "complaints_user_id_idx" ON "complaints"("user_id");
