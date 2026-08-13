-- Admin auth migration: invitation fields + authorities/officers tables
-- Run via: npx prisma db execute --file prisma/admin_auth_migration.sql
-- (with DATABASE_URL pointing at DIRECT_URL / port 5432)

DO $$ BEGIN
  CREATE TYPE "InvitationStatus" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED', 'EXPIRED');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

ALTER TABLE "profiles" ADD COLUMN IF NOT EXISTS "invitation_status" "InvitationStatus";
ALTER TABLE "profiles" ADD COLUMN IF NOT EXISTS "invitation_token" TEXT;
ALTER TABLE "profiles" ADD COLUMN IF NOT EXISTS "is_password_set" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "profiles" ADD COLUMN IF NOT EXISTS "password_reset_token" TEXT;
ALTER TABLE "profiles" ADD COLUMN IF NOT EXISTS "created_by" TEXT;
ALTER TABLE "profiles" ADD COLUMN IF NOT EXISTS "invited_at" TIMESTAMP(3);
ALTER TABLE "profiles" ADD COLUMN IF NOT EXISTS "accepted_at" TIMESTAMP(3);

CREATE UNIQUE INDEX IF NOT EXISTS "profiles_invitation_token_key" ON "profiles"("invitation_token");
CREATE UNIQUE INDEX IF NOT EXISTS "profiles_password_reset_token_key" ON "profiles"("password_reset_token");

UPDATE "profiles" SET "is_password_set" = true WHERE "role" = 'CITIZEN' AND "is_password_set" = false;

CREATE TABLE IF NOT EXISTS "authorities" (
  "id" TEXT NOT NULL,
  "profile_id" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "phone" TEXT,
  "address" TEXT,
  "coverage" TEXT,
  "district" TEXT,
  "description" TEXT,
  "status" TEXT NOT NULL DEFAULT 'Active',
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "authorities_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS "authorities_profile_id_key" ON "authorities"("profile_id");

CREATE TABLE IF NOT EXISTS "officers" (
  "id" TEXT NOT NULL,
  "profile_id" TEXT NOT NULL,
  "authority_id" TEXT NOT NULL,
  "position" TEXT,
  "department" TEXT,
  "status" TEXT NOT NULL DEFAULT 'Active',
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "officers_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS "officers_profile_id_key" ON "officers"("profile_id");

DO $$ BEGIN
  ALTER TABLE "authorities" ADD CONSTRAINT "authorities_profile_id_fkey"
    FOREIGN KEY ("profile_id") REFERENCES "profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  ALTER TABLE "officers" ADD CONSTRAINT "officers_profile_id_fkey"
    FOREIGN KEY ("profile_id") REFERENCES "profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  ALTER TABLE "officers" ADD CONSTRAINT "officers_authority_id_fkey"
    FOREIGN KEY ("authority_id") REFERENCES "authorities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;
