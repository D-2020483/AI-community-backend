-- Citizen account fields used by Admin User Management
-- Run via: npx prisma db execute --file prisma/citizen_profiles_migration.sql

ALTER TABLE "profiles" ADD COLUMN IF NOT EXISTS "status" TEXT NOT NULL DEFAULT 'Active';
ALTER TABLE "profiles" ADD COLUMN IF NOT EXISTS "district" TEXT;
ALTER TABLE "profiles" ADD COLUMN IF NOT EXISTS "location" TEXT;
