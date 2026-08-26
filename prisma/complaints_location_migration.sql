-- Incident coordinates for citizen reports
-- Run via: npx prisma db execute --file prisma/complaints_location_migration.sql

ALTER TABLE "complaints" ADD COLUMN IF NOT EXISTS "latitude" DOUBLE PRECISION;
ALTER TABLE "complaints" ADD COLUMN IF NOT EXISTS "longitude" DOUBLE PRECISION;
